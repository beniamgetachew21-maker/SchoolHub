import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { acaService } from "./aca-service";
import { schedulingService } from "./scheduling-service";
import { finService } from "./fin-service";

/**
 * SisService handles all Student Information System related logic,
 * including student data, attendance, and academic records.
 */
export class SisService extends BaseService {
    
    // ─── Class Sections ──────────────────────────────────────────────────────

    async getClasses(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const sections = await prisma.classSection.findMany({
                where: { tenantId: tenant.id },
                orderBy: [
                    { className: 'asc' },
                    { sectionName: 'asc' }
                ]
            });
            return this.response(sections);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    // ─── Existing Methods ────────────────────────────────────────────────────

    // ─── Student Management ──────────────────────────────────────────────────

    async getStudents(params: {
        page?: number;
        pageSize?: number;
        search?: string;
        classFilter?: string;
    } = {}): Promise<ServiceResponse<{ students: any[]; totalCount: number; totalPages: number }>> {
        try {
            const { tenant } = await this.getContext();
            const { page = 1, pageSize = 20, search = "", classFilter = "" } = params;
            
            const skip = (page - 1) * pageSize;

            const where: any = { 
                tenantId: tenant.id,
                AND: []
            };

            if (search) {
                where.AND.push({
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                        { admissionNumber: { contains: search, mode: 'insensitive' } },
                    ]
                });
            }

            if (classFilter) {
                where.AND.push({ className: classFilter });
            }

            const [students, totalCount] = await Promise.all([
                prisma.student.findMany({
                    where,
                    orderBy: { name: "asc" },
                    skip,
                    take: pageSize,
                }),
                prisma.student.count({ where })
            ]);

            return this.response({
                students,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
            });
        } catch (error: any) {
            return this.response({ students: [], totalCount: 0, totalPages: 0 }, error.message);
        }
    }

    async addStudent(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const student = await prisma.student.create({
                data: {
                    ...data,
                    tenantId: tenant.id,
                },
            });
            return this.response(student);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async updateStudent(studentId: string, data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const student = await prisma.student.update({
                where: { studentId, tenantId: tenant.id },
                data,
            });
            return this.response(student);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async getStudentDashboardData(studentId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            
            // 1. Fetch Student Core
            const student = await prisma.student.findUnique({
                where: { studentId, tenantId: tenant.id },
            });

            if (!student) return this.response(null, "Student not found");

            // 2. Aggregate Data
            const [attendance, gpaData, timetable, invoices, resultsData] = await Promise.all([
                this.getAttendanceSummary(studentId),
                acaService.calculateStudentGPA(studentId),
                // Sections usually have names like 'Grade 11-A', let's find the section by name or reference
                prisma.classSection.findFirst({
                    where: { tenantId: tenant.id },
                }).then(section => section ? schedulingService.getTimetableBySection(section.id) : { data: [], success: true, error: null } as ServiceResponse<any[]>),
                finService.getInvoicesForStudent(studentId),
                acaService.getResultsByStudent(studentId),
            ]);

            // 3. Fetch Active Assignments
            const assignments = await prisma.assignment.findMany({
                where: { 
                    tenantId: tenant.id,
                    dueDate: { gte: new Date(new Date().setHours(0,0,0,0)) }
                },
                orderBy: { dueDate: "asc" },
                take: 5
            });

            return this.response({
                student,
                attendance: attendance.data,
                invoices: invoices.data || [],
                gpa: gpaData.data?.gpa || 0,
                timetable: timetable?.data || [],
                assignments: assignments || [],
                results: resultsData || [],
            });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async deleteStudent(studentId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            await prisma.student.delete({
                where: { studentId, tenantId: tenant.id },
            });
            return this.response({ success: true });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async getStudentById(studentId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const student = await prisma.student.findUnique({
                where: { studentId, tenantId: tenant.id },
                include: {
                    enrollments: {
                        where: { tenantId: tenant.id },
                        orderBy: { startDate: "desc" },
                    },
                },
            });
            if (!student) return this.response(null, "Student not found");
            return this.response(student);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── Attendance Management ────────────────────────────────────────────────

    async getAttendanceSummary(studentId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const summary = await prisma.attendanceSummary.findUnique({
                where: { studentId, tenantId: tenant.id },
            });
            return this.response(summary);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async getAttendanceByClass(className: string, date?: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();

            // Fetch all students in the class
            const students = await prisma.student.findMany({
                where: { tenantId: tenant.id, className },
                orderBy: { name: "asc" },
            });

            // Fetch attendance summaries to derive recent status
            const summaries = await prisma.attendanceSummary.findMany({
                where: {
                    tenantId: tenant.id,
                    studentId: { in: students.map(s => s.studentId) },
                },
            });

            const summaryMap = Object.fromEntries(summaries.map(s => [s.studentId, s]));

            const roster = students.map(s => ({
                ...s,
                summary: summaryMap[s.studentId] || null,
                todayStatus: "Present", // Default for new session
            }));

            return this.response(roster);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async bulkSaveAttendance(records: { studentId: string; status: string; date: string }[]): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();

            // Upsert attendance summaries based on incoming data
            const updatePromises = records.map(async (rec) => {
                const summary = await prisma.attendanceSummary.findUnique({
                    where: { studentId: rec.studentId, tenantId: tenant.id },
                });

                if (!summary) {
                    return prisma.attendanceSummary.create({
                        data: {
                            studentId: rec.studentId,
                            tenantId: tenant.id,
                            totalDays: 1,
                            presentDays: rec.status === "Present" ? 1 : 0,
                            absentDays: rec.status === "Absent" ? 1 : 0,
                            leaveDays: rec.status === "Leave" || rec.status === "Late" ? 1 : 0,
                        },
                    });
                }

                return prisma.attendanceSummary.update({
                    where: { studentId: rec.studentId, tenantId: tenant.id },
                    data: {
                        totalDays: { increment: 1 },
                        presentDays: { increment: rec.status === "Present" ? 1 : 0 },
                        absentDays: { increment: rec.status === "Absent" ? 1 : 0 },
                        leaveDays: { increment: rec.status === "Leave" || rec.status === "Late" ? 1 : 0 },
                    },
                });
            });

            await Promise.all(updatePromises);
            return this.response({ saved: records.length });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async getAttendanceReport(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();

            const summaries = await prisma.attendanceSummary.findMany({
                where: { tenantId: tenant.id },
            });

            // Enrich with student names
            const studentIds = summaries.map(s => s.studentId);
            const students = await prisma.student.findMany({
                where: { tenantId: tenant.id, studentId: { in: studentIds } },
            });
            const studentMap = Object.fromEntries(students.map(s => [s.studentId, s]));

            const report = summaries.map(s => {
                const student = studentMap[s.studentId];
                const percentage = s.totalDays > 0
                    ? Math.round((s.presentDays / s.totalDays) * 100)
                    : 0;
                return {
                    ...s,
                    studentName: student?.name || "Unknown",
                    class: student?.className || "N/A",
                    percentage,
                    risk: percentage < 75 ? "At Risk" : percentage < 85 ? "Borderline" : "Good",
                };
            }).sort((a, b) => a.percentage - b.percentage);

            return this.response(report);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    // ─── Class Roster ─────────────────────────────────────────────────────────

    async getDistinctClasses(): Promise<ServiceResponse<string[]>> {
        try {
            const { tenant } = await this.getContext();
            const students = await prisma.student.findMany({
                where: { tenantId: tenant.id },
                select: { className: true },
                distinct: ["className"],
            });
            const classes = students.map(s => s.className).filter(Boolean).sort() as string[];
            return this.response(classes);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    // ─── Student Leave Management ──────────────────────────────────────────

    async getStudentLeaveRequests(studentId?: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const where: any = { tenantId: tenant.id };
            if (studentId) where.studentId = studentId;

            const requests = await prisma.studentLeaveRequest.findMany({
                where,
                orderBy: { startDate: "desc" },
            });
            return this.response(requests);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async addStudentLeaveRequest(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const request = await prisma.studentLeaveRequest.create({
                data: {
                    ...data,
                    tenantId: tenant.id,
                },
            });
            return this.response(request);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async updateStudentLeaveRequestStatus(requestId: string, status: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const request = await prisma.studentLeaveRequest.update({
                where: { requestId, tenantId: tenant.id },
                data: { status },
            });
            return this.response(request);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── Student Disciplinary Management ──────────────────────────────────

    async getDisciplinaryRecords(studentId?: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const where: any = { tenantId: tenant.id };
            if (studentId) where.studentId = studentId;

            const records = await prisma.disciplinaryRecord.findMany({
                where,
                orderBy: { date: "desc" },
            });
            return this.response(records);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async addDisciplinaryRecord(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const record = await prisma.disciplinaryRecord.create({
                data: {
                    ...data,
                    tenantId: tenant.id,
                },
            });
            return this.response(record);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }
}

export const sisService = new SisService();
