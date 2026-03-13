import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { Assessment, AssessmentResult } from "@prisma/client";

// GPA scale
const GPA_SCALE = [
    { min: 90, grade: "A+", points: 4.0 },
    { min: 85, grade: "A",  points: 4.0 },
    { min: 80, grade: "A-", points: 3.7 },
    { min: 75, grade: "B+", points: 3.3 },
    { min: 70, grade: "B",  points: 3.0 },
    { min: 65, grade: "B-", points: 2.7 },
    { min: 60, grade: "C+", points: 2.3 },
    { min: 50, grade: "C",  points: 2.0 },
    { min: 40, grade: "D",  points: 1.0 },
    { min: 0,  grade: "F",  points: 0.0 },
];

function computeGrade(marks: number, maxMarks: number): { grade: string; gpaPoints: number } {
    const percentage = (marks / maxMarks) * 100;
    const entry = GPA_SCALE.find(g => percentage >= g.min) || GPA_SCALE[GPA_SCALE.length - 1];
    return { grade: entry.grade, gpaPoints: entry.points };
}

/**
 * AcaService handles all Academics related logic:
 * Assessments, Grade Entry, GPA Calculation, and Result Publishing.
 */
export class AcaService extends BaseService {

    // ─── Assessments ─────────────────────────────────────────────────────────

    async getAssessments(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const assessments = await prisma.assessment.findMany({
                where: { tenantId: tenant.id },
                orderBy: { date: "desc" },
            });
            return this.response(assessments);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async createAssessment(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const assessmentId = "ASS" + Date.now().toString().slice(-6);
            const assessment = await prisma.assessment.create({
                data: { ...data, assessmentId, tenantId: tenant.id },
            });
            return this.response(assessment);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── Results & GPA ───────────────────────────────────────────────────────

    async getResultsByStudent(studentId: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const results = await prisma.assessmentResult.findMany({
                where: { studentId, tenantId: tenant.id },
            });
            const assessmentIds = [...new Set(results.map(r => r.assessmentId))];
            const assessments = await prisma.assessment.findMany({
                where: { assessmentId: { in: assessmentIds }, tenantId: tenant.id },
            });
            const formattedResults = results.map((r: AssessmentResult) => {
                const assessment = assessments.find((a: Assessment) => a.assessmentId === r.assessmentId);
                return {
                    ...r,
                    assessmentName: assessment?.name || "Unknown",
                    subject: assessment?.subject || "N/A",
                    maxMarks: assessment?.maxMarks || 100,
                    isCCA: assessment?.isCCA || false,
                };
            });
            return this.response(formattedResults);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getResultsByAssessment(assessmentId: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const [assessment, results] = await Promise.all([
                prisma.assessment.findUnique({ where: { assessmentId } }),
                prisma.assessmentResult.findMany({
                    where: { assessmentId, tenantId: tenant.id },
                }),
            ]);
            if (!assessment) return this.response([], "Assessment not found");

            const studentIds = results.map(r => r.studentId);
            const students = await prisma.student.findMany({
                where: { studentId: { in: studentIds }, tenantId: tenant.id },
            });
            const studentMap = Object.fromEntries(students.map(s => [s.studentId, s]));

            const enriched = results.map(r => ({
                ...r,
                studentName: studentMap[r.studentId]?.name || "Unknown",
                class: studentMap[r.studentId]?.className || "N/A",
                assessmentName: assessment.name,
                maxMarks: assessment.maxMarks,
                subject: assessment.subject,
            }));
            return this.response(enriched);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async bulkSaveResults(assessmentId: string, results: { studentId: string; marksObtained: number }[]): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const assessment = await prisma.assessment.findUnique({ where: { assessmentId } });
            if (!assessment) return this.response(null, "Assessment not found");

            const upsertOps = results.map(r => {
                const { grade, gpaPoints } = computeGrade(r.marksObtained, assessment.maxMarks);
                const resultId = `RES-${assessmentId}-${r.studentId}`;
                return prisma.assessmentResult.upsert({
                    where: { resultId },
                    update: { marksObtained: r.marksObtained, grade },
                    create: {
                        resultId,
                        assessmentId,
                        studentId: r.studentId,
                        tenantId: tenant.id,
                        marksObtained: r.marksObtained,
                        grade,
                    },
                });
            });

            const saved = await prisma.$transaction(upsertOps);
            return this.response({ saved: saved.length });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── GPA Calculation ─────────────────────────────────────────────────────

    async calculateStudentGPA(studentId: string): Promise<ServiceResponse<{ gpa: number; totalResults: number }>> {
        try {
            const { tenant } = await this.getContext();
            const results = await prisma.assessmentResult.findMany({
                where: { studentId, tenantId: tenant.id },
            });
            if (results.length === 0) return this.response({ gpa: 0, totalResults: 0 });

            const assessmentIds = [...new Set(results.map(r => r.assessmentId))];
            const assessments = await prisma.assessment.findMany({
                where: { assessmentId: { in: assessmentIds }, tenantId: tenant.id },
            });
            const assessmentMap = Object.fromEntries(assessments.map(a => [a.assessmentId, a]));

            let totalPoints = 0;
            let count = 0;
            for (const result of results) {
                const assessment = assessmentMap[result.assessmentId];
                if (!assessment) continue;
                const { gpaPoints } = computeGrade(result.marksObtained, assessment.maxMarks);
                totalPoints += gpaPoints;
                count++;
            }
            const gpa = count > 0 ? Math.round((totalPoints / count) * 100) / 100 : 0;
            return this.response({ gpa, totalResults: count });
        } catch (error: any) {
            return this.response(null as any, error.message);
        }
    }

    async getClassResultsSummary(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const assessments = await prisma.assessment.findMany({
                where: { tenantId: tenant.id },
                orderBy: { date: "desc" },
            });

            const summaries = await Promise.all(
                assessments.map(async (a) => {
                    const results = await prisma.assessmentResult.findMany({
                        where: { assessmentId: a.assessmentId, tenantId: tenant.id },
                    });
                    const count = results.length;
                    const avg = count > 0
                        ? Math.round(results.reduce((sum, r) => sum + r.marksObtained, 0) / count)
                        : 0;
                    const passCount = results.filter(r =>
                        computeGrade(r.marksObtained, a.maxMarks).grade !== "F"
                    ).length;
                    return {
                        ...a,
                        studentCount: count,
                        avgScore: avg,
                        passRate: count > 0 ? Math.round((passCount / count) * 100) : 0,
                        avgGrade: computeGrade(avg, a.maxMarks).grade,
                    };
                })
            );
            return this.response(summaries);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    // ─── Teacher Context ─────────────────────────────────────────────────────

    async getTeacherContext(): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const teacher = await prisma.employee.findFirst({
                where: { tenantId: tenant.id, designation: { contains: "Teacher" } },
            });
            if (!teacher) return this.response(null, "Teacher not found");

            const classSections = [
                { id: 1, teacherId: "E003", name: "Grade 10 - A", subject: "Mathematics", studentCount: 35 },
                { id: 2, teacherId: "E003", name: "Grade 10 - B", subject: "Mathematics", studentCount: 34 },
                { id: 3, teacherId: "E002", name: "Grade 9 - A",  subject: "Science",      studentCount: 40 },
                { id: 4, teacherId: "E002", name: "Grade 10 - A", subject: "Science",      studentCount: 35 },
            ];
            const assigned = classSections.filter(c => c.teacherId === teacher.employeeId);
            return this.response({ teacher, assigned });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── Courses & Subjects ──────────────────────────────────────────────────

    async getCourses(): Promise<ServiceResponse<any[]>> {
        try {
            // Mock courses for the timetable as they don't explicitly exist in the schema
            const dummyCourses = [
                { id: "C001", name: "Mathematics", code: "MAT101", credits: 4 },
                { id: "C002", name: "Science", code: "SCI101", credits: 4 },
                { id: "C003", name: "English Language", code: "ENG101", credits: 3 },
                { id: "C004", name: "History", code: "HIS101", credits: 3 },
                { id: "C005", name: "Physical Education", code: "PE101", credits: 2 },
            ];
            return this.response(dummyCourses);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }
}

export const acaService = new AcaService();
