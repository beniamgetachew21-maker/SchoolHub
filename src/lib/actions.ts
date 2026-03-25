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

export async function getTeacherDashboardDataAction() {
    return await acaService.getTeacherDashboardData();
}

export async function createAssignmentAction(data: any) {
    return await acaService.createAssignment(data);
}

export async function submitAssignmentAction(data: { assignmentId: string; studentId: string; contentUrl?: string }) {
    const result = await acaService.submitAssignment(data);
    revalidatePath("/student-portal");
    revalidatePath("/lms/assignments");
    return result;
}
// ── Student Portal ──────────────────────────────────────────────────────────

export async function getStudentById(studentId: string) {
    const { data } = await sisService.getStudentById(studentId);
    return data;
}

export async function getStudentDashboardDataAction(studentId: string) {
    return await sisService.getStudentDashboardData(studentId);
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

export async function getDisciplinaryRecords(studentId?: string) {
    const { data } = await sisService.getDisciplinaryRecords(studentId);
    return data || [];
}

export async function addDisciplinaryRecordAction(data: any) {
    const result = await sisService.addDisciplinaryRecord(data);
    revalidatePath("/students/discipline");
    return result;
}

export async function getStudentLeaveRequests(studentId?: string) {
    const { data } = await sisService.getStudentLeaveRequests(studentId);
    return data || [];
}

export async function addStudentLeaveRequestAction(data: any) {
    const result = await sisService.addStudentLeaveRequest(data);
    revalidatePath("/students/leave");
    return result;
}

export async function updateStudentLeaveRequestStatusAction(requestId: string, status: string) {
    const result = await sisService.updateStudentLeaveRequestStatus(requestId, status);
    revalidatePath("/students/leave");
    return result;
}

// ── SIS: Attendance ─────────────────────────────────────────────────────────

export async function getStudents(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    classFilter?: string;
} = {}) {
    const { data } = await sisService.getStudents(params);
    return data || { students: [], totalCount: 0, totalPages: 0 };
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

export async function getEmployees(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    department?: string;
    status?: string;
} = {}) {
    const { data } = await hrService.getEmployees(params);
    return data || { employees: [], totalCount: 0, totalPages: 0 };
}

export async function getEmployeeById(id: string) {
    const { data } = await hrService.getEmployeeById(id);
    return data;
}

export async function addEmployeeAction(data: any) {
    const result = await hrService.addEmployee(data);
    return result;
}

export async function updateEmployeeAction(data: any) {
    const { employeeId, ...rest } = data;
    const result = await hrService.updateEmployee(employeeId, rest);
    return result;
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

export async function getCandidates(params: {
    page?: number;
    pageSize?: number;
    search?: string;
} = {}) {
    const { data } = await hrService.getCandidates(params);
    return data || { candidates: [], totalCount: 0, totalPages: 0 };
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

export async function addBookAction(data: any) {
    const result = await infraService.addBook(data);
    revalidatePath("/library/books");
    return result;
}

export async function deleteBookAction(bookId: number) {
    const result = await infraService.deleteBook(bookId);
    revalidatePath("/library/books");
    return result;
}

export async function getBorrowRecordsForStudent(studentId: string): Promise<any> {
    return [];
}

export async function getRoomForStudent(studentId: string): Promise<any> {
    return null;
}

export async function getHostelById(hostelId: string): Promise<any> {
    return null;
}

export async function getRouteForStudent(studentId: string): Promise<any> {
    return null;
}

export async function getAssetAllocations(employeeId: string): Promise<any> {
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

export async function getVehicleById(id: string): Promise<any> {
    return null;
}

export async function getDriverById(id: string): Promise<any> {
    return null;
}


export async function getTransactions(): Promise<any> {
    return [];
}

export async function getAnnouncements(): Promise<any> {
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

export async function getEquityData(): Promise<any> {
    return {
        totalStudents: 0,
        genderDistribution: [],
        regionDistribution: [],
        specialNeedsCount: 0,
        refugeeCount: 0
    };
}

export async function getRoutes() {
    const { data } = await infraService.getRoutes();
    return data || [];
}

export async function getDrivers() {
    const { data } = await infraService.getDrivers();
    return data || [];
}

export async function getStudentsOnRoute(routeId: string) {
    const { data } = await infraService.getStudentsOnRoute(routeId);
    return data || [];
}

export async function getTransportLogs() {
    const { data } = await infraService.getTransportLogs();
    return data || [];
}

export async function getHostels() {
    const { data } = await infraService.getHostels();
    return data || [];
}

export async function getRooms(hostelId?: string) {
    const { data } = await infraService.getRooms(hostelId);
    return data || [];
}

export async function getBeds(roomId?: string) {
    const { data } = await infraService.getBeds(roomId);
    return data || [];
}

export async function getMaintenanceLogs() {
    const { data } = await infraService.getMaintenanceLogs();
    return data || [];
}

export async function getInventoryItems() {
    const { data } = await infraService.getInventoryItems();
    return data || [];
}

export async function getPurchaseOrders() {
    const { data } = await infraService.getPurchaseOrders();
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
