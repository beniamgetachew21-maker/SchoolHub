"use server";

import { revalidatePath } from "next/cache";
import { sisService } from "@/services/sis-service";
import { acaService } from "@/services/aca-service";
import { hrService } from "@/services/hr-service";
import { schedulingService } from "@/services/scheduling-service";
import { infraService } from "@/services/infra-service";
import { admissionsService } from "@/services/admissions-service";
import { finService } from "@/services/fin-service";

// ── Teacher Portal ─────────────────────────────────────────────────────────

export async function getTeacher() {
    const { data } = await acaService.getTeacherContext();
    return data?.teacher || null;
}

export async function getAssignedClassesForTeacher(teacherId: string) {
    const { data } = await acaService.getTeacherContext();
    return data?.assigned || [];
}

export async function getAnnouncements() {
    return [
        { id: 1, title: "Annual Sports Day", date: "2024-08-15", postedBy: "Admin", content: "The annual sports day will be held on August 15th.", category: "General" },
        { id: 2, title: "Parent-Teacher Meeting", date: "2024-08-10", postedBy: "Admin", content: "A parent-teacher meeting is scheduled for August 10th.", category: "General" },
        { id: 3, title: "Mid-term Exams Schedule", date: "2024-09-01", postedBy: "Admin", content: "Mid-term exams will commence from September 1st.", category: "Exam" },
        { id: 4, title: "Homework: Maths Chapter 5", date: "2024-09-05", postedBy: "Mr. Robert Brown", content: "Please complete exercises 5.1 and 5.2 from Chapter 5.", category: "Homework", dueDate: "2024-09-12" },
    ];
}

// ── Student Portal ──────────────────────────────────────────────────────────

export async function getStudentById(studentId: string) {
    const { data } = await sisService.getStudentById(studentId);
    return data;
}

export async function getAttendanceSummaryForStudent(studentId: string) {
    const { data } = await sisService.getAttendanceSummary(studentId);
    return data;
}

export async function getResultsForStudent(studentId: string) {
    const { data } = await acaService.getResultsByStudent(studentId);
    return data || [];
}

export async function getAchievements(studentId: string) {
    return [];
}

export async function getDisciplinaryRecords(studentId: string) {
    return [];
}

export async function getStudentLeaveRequests(studentId?: string) {
    return [];
}

// ── SIS: Attendance ─────────────────────────────────────────────────────────

export async function getStudents() {
    const { data } = await sisService.getStudents();
    return data || [];
}

export async function addStudentAction(data: any) {
    const result = await sisService.addStudent(data);
    revalidatePath("/students");
    return result;
}

export async function updateStudentAction(studentId: string, data: any) {
    const result = await sisService.updateStudent(studentId, data);
    revalidatePath("/students");
    return result;
}

export async function deleteStudentAction(studentId: string) {
    const result = await sisService.deleteStudent(studentId);
    revalidatePath("/students");
    return result;
}

export async function getDistinctClasses() {
    const { data } = await sisService.getDistinctClasses();
    return data || [];
}

export async function getAttendanceByClass(className: string) {
    const { data } = await sisService.getAttendanceByClass(className);
    return data || [];
}

export async function bulkSaveAttendanceAction(records: { studentId: string; status: string; date: string }[]) {
    const result = await sisService.bulkSaveAttendance(records);
    revalidatePath("/academics/attendance");
    revalidatePath("/student-portal");
    return result;
}

export async function getAttendanceReport() {
    const { data } = await sisService.getAttendanceReport();
    return data || [];
}

// ── SIS: Examinations & GPA ──────────────────────────────────────────────────

export async function getAssessments() {
    const { data } = await acaService.getAssessments();
    return data || [];
}

export async function createAssessmentAction(data: any) {
    const result = await acaService.createAssessment(data);
    revalidatePath("/academics/examinations");
    return result;
}

export async function getResultsByAssessment(assessmentId: string) {
    const { data } = await acaService.getResultsByAssessment(assessmentId);
    return data || [];
}

export async function bulkSaveResultsAction(assessmentId: string, results: { studentId: string; marksObtained: number }[]) {
    const result = await acaService.bulkSaveResults(assessmentId, results);
    revalidatePath("/academics/examinations");
    revalidatePath("/student-portal");
    return result;
}

export async function getClassResultsSummary() {
    const { data } = await acaService.getClassResultsSummary();
    return data || [];
}

export async function calculateGPA(studentId: string) {
    const { data } = await acaService.calculateStudentGPA(studentId);
    return data;
}

// ── HR ──────────────────────────────────────────────────────────────────────

export async function getEmployees() {
    const { data } = await hrService.getEmployees();
    return data || [];
}

export async function getEmployeeById(id: string) {
    const { data } = await hrService.getEmployeeById(id);
    return data;
}

export async function getLeaveRequests() {
    const { data } = await hrService.getLeaveRequests();
    return data || [];
}

export async function getLeavePolicies() {
    const { data } = await hrService.getLeavePolicies();
    return data || [];
}

export async function addLeaveRequestAction(data: any) {
    return await hrService.addLeaveRequest(data);
}

export async function updateLeaveRequestStatusAction(requestId: string, status: string) {
    return await hrService.updateLeaveRequestStatus(requestId, status);
}

export async function getCandidates() {
    const { data } = await hrService.getCandidates();
    return data || [];
}

export async function getOnboardingTasks(employeeId?: string) {
    const { data } = await hrService.getOnboardingTasks(employeeId);
    return data || [];
}

export async function updateOnboardingTaskAction(taskId: string, status: string) {
    return await hrService.updateOnboardingTask(taskId, status);
}

export async function getPayrollRecords(month: string) {
    const { data } = await hrService.getPayrollRecords(month);
    return data || [];
}

export async function calculatePayrollAction(month: string) {
    return await hrService.calculatePayroll(month);
}

export async function processPayrollPaymentAction(month: string) {
    return await hrService.processPayrollPayment(month);
}

// ── Infrastructure & Library ───────────────────────────────────────────────

export async function getBooks() {
    const { data } = await infraService.getBooks();
    return data || [];
}

export async function getBorrowRecordsForStudent(studentId: string) {
    return [];
}

export async function getRoomForStudent(studentId: string) {
    return null;
}

export async function getHostelById(hostelId: string) {
    return null;
}

export async function getRouteForStudent(studentId: string) {
    return null;
}

export async function getAssetAllocations(employeeId: string) {
    return [];
}

export async function getBookById(id: string | number) {
    const { data } = await infraService.getBookById(id);
    return data;
}

export async function getVehicles() {
    const { data } = await infraService.getVehicles();
    return data || [];
}

export async function getVehicleById(id: string) {
    return null;
}

export async function getDriverById(id: string) {
    return null;
}

export async function getHostels() {
    const { data } = await infraService.getHostels();
    return data || [];
}

export async function getTransactions() {
    return [];
}

// ─── Timetable & Scheduling Actions ─────────────────────────────────────────

export async function getTimetableBySection(sectionId: string) {
    const { data, error } = await schedulingService.getTimetableBySection(sectionId);
    if (error) throw new Error(error);
    return data || [];
}

export async function getTimetableByTeacher(teacherId: string) {
    const { data, error } = await schedulingService.getTimetableByTeacher(teacherId);
    if (error) throw new Error(error);
    return data || [];
}

export async function saveClassPeriodAction(data: {
    id?: string, sectionId: string, courseId: string,
    teacherId: string, roomId: string, dayOfWeek: number,
    startTime: string, endTime: string
}) {
    const { data: period, error } = await schedulingService.saveClassPeriod(data);
    if (error) throw new Error(error);
    return period;
}

export async function removeClassPeriodAction(id: string) {
    const { error } = await schedulingService.removeClassPeriod(id);
    if (error) throw new Error(error);
}

export async function getEquityData() {
    return [];
}

export async function getRoutes() {
    const { data } = await infraService.getRoutes();
    return data || [];
}

export async function getInventoryItems() {
    const { data } = await infraService.getInventoryItems();
    return data || [];
}

// ── Admissions ──────────────────────────────────────────────────────────────

export async function getApplications() {
    const { data } = await admissionsService.getApplications();
    return data || [];
}

export async function getApplicationById(id: string) {
    const { data } = await admissionsService.getApplicationById(id);
    return data || null;
}

export async function submitApplicationAction(data: any) {
    return await admissionsService.submitApplication(data);
}

export async function updateApplicationStatusAction(id: string, status: string) {
    return await admissionsService.updateApplicationStatus(id, status);
}

export async function getInterviews() {
    const { data } = await admissionsService.getInterviews();
    return data || [];
}

export async function getEntranceExams() {
    const { data } = await admissionsService.getEntranceExams();
    return data || [];
}

// ── Finance ─────────────────────────────────────────────────────────────────

export async function getInvoices() {
    const { data } = await finService.getInvoices();
    return data || [];
}

export async function getFeeStructures() {
    const { data } = await finService.getFeeStructures();
    return data || [];
}

export async function createFeeStructureAction(data: any) {
    const result = await finService.createFeeStructure(data);
    revalidatePath("/finance/fees");
    return result;
}

export async function createInvoiceAction(data: any) {
    const result = await finService.createInvoice(data);
    revalidatePath("/finance/fees");
    return result;
}

export async function getInvoicesForStudent(studentId: string) {
    const { data } = await finService.getInvoicesForStudent(studentId);
    return data || [];
}

export async function getPayments() {
    const { data } = await finService.getPayments();
    return data || [];
}

export async function processDigitalPaymentAction(studentId: string, invoiceId: string, method: string, amount: number) {
    const result = await finService.processDigitalPayment(studentId, invoiceId, method, amount);
    revalidatePath("/student-portal");
    revalidatePath("/finance/fees");
    return result;
}
