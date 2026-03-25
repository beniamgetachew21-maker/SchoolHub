"use server";

import { revalidatePath } from "next/cache";
import { flowService } from "@/services/flow-service";
import { getCurrentTenant } from "./tenant";
import { prisma } from "@/lib/prisma";

// ── 1. Admission to Enrollment Flow Action ─────────────────────────────────

export async function enrollApprovedApplicantAction(applicationId: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.enrollApprovedApplicant(applicationId, tenantId);
        
        // Revalidate the caching for SIS & Admissions so the new student appears
        revalidatePath("/admissions");
        revalidatePath("/students");
        revalidatePath("/finance/fees"); // Invoice was generated
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Enrollment Flow Error:", error);
        return { success: false, error: error.message };
    }
}

// ── 2. Academic Submission & Grading Lifecycle Action ──────────────────────

export async function submitAndGradeQuizAction(studentId: string, quizId: string, answers: { questionId: string, answerText: string }[]) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.submitAndGradeQuiz(studentId, quizId, answers, tenantId);
        
        revalidatePath("/student-portal"); // Refresh grades
        revalidatePath("/lms/quizzes");
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Quiz Grading Flow Error:", error);
        return { success: false, error: error.message };
    }
}

// ── 3. Financial Billing & Payment Loop Action ─────────────────────────────

export async function processFeePaymentFlowAction(invoiceId: string, studentId: string, amount: number, method: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.processFeePayment(invoiceId, studentId, amount, method, tenantId);
        
        revalidatePath("/finance/fees");
        revalidatePath("/student-portal"); 
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Payment Flow Error:", error);
        return { success: false, error: error.message };
    }
}

// ── 4. Staff Onboarding to Academic Access Action ──────────────────────────

export async function onboardAcademicStaffAction(employeeId: string, classSectionId: string, courseId: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.onboardAcademicStaff(employeeId, classSectionId, courseId, tenantId);
        
        revalidatePath("/hr/directory");
        revalidatePath("/scheduling/timetable");
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Staff Academic Onboarding Error:", error);
        return { success: false, error: error.message };
    }
}

// ── 5. 360° Visibility Flow (Parent Pulse) ─────────────────────────────

export async function markAttendanceWithAlertsAction(records: { studentId: string; status: string; date: string }[], className?: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        // Lazy load getTeacher to avoid circular deps if any
        const { getTeacher } = await import("./actions");
        const teacher = await getTeacher();
        const recordedBy = teacher ? `${teacher.firstName} ${teacher.lastName}` : "System";

        const result = await flowService.markAttendanceWithAlerts(records, tenantId, className, recordedBy);
        
        revalidatePath("/academics/attendance");
        revalidatePath("/academics");
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Attendance Alert Flow Error:", error);
        return { success: false, error: error.message };
    }
}

// ── 6. Inventory & Store Lifecycle Action ─────────────────────────────

export async function processProcurementPOAction(poId: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.processProcurementPO(poId, tenantId);
        revalidatePath("/inventory/procurement");
        revalidatePath("/inventory/store");
        return { success: true, data: result };
    } catch (error: any) {
        console.error("PO Processing Flow Error:", error);
        return { success: false, error: error.message };
    }
}

export async function allocateInventoryItemAction(itemId: string, assigneeId: string, assigneeType: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.allocateInventoryItem(itemId, assigneeId, assigneeType, tenantId);
        revalidatePath("/inventory/allocations");
        revalidatePath("/inventory/store");
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Asset Allocation Flow Error:", error);
        return { success: false, error: error.message };
    }
}

// ── 7. Transportation & Live Tracking Actions ───────────────────────────

export async function assignStudentToRouteAction(studentId: string, routeId: string, pickupPoint?: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.assignStudentToRoute(studentId, routeId, pickupPoint, tenantId);
        revalidatePath("/transport/dashboard");
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Transport Assignment Flow Error:", error);
        return { success: false, error: error.message };
    }
}

export async function logTransportEventAction(routeId: string, event: string, location?: string, studentId?: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.logTransportEvent(routeId, event, location, studentId, tenantId);
        revalidatePath("/transport/dashboard");
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Transport Log Flow Error:", error);
        return { success: false, error: error.message };
    }
}

export async function assignStudentToBedAction(studentId: string, bedId: string, tenantId?: string) {
    try {
        const log = await flowService.assignStudentToBed(studentId, bedId, tenantId);
        revalidatePath("/hostel/allocations");
        revalidatePath("/hostel/rooms");
        revalidatePath("/hostel/dashboard");
        return { success: true, data: log };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function logMaintenanceIssueAction(hostelId: string, issue: string, tenantId?: string) {
    try {
        const maintenance = await flowService.logMaintenanceIssue(hostelId, issue, tenantId);
        revalidatePath("/hostel/dashboard");
        return { success: true, data: maintenance };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function unassignStudentFromBedAction(bedId: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const res = await flowService.unassignStudentFromBed(bedId, tenantId);
        revalidatePath("/hostel/dashboard");
        revalidatePath("/hostel/rooms");
        revalidatePath("/hostel/allocations");
        return { success: true, data: res };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ── 9. Extra-Curriculars & Social Clubs Actions ──────────────────────────

export async function registerClubMembershipAction(studentId: string, clubId: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.registerClubMembership(studentId, clubId, tenantId);
        
        revalidatePath("/extracurriculars/clubs");
        revalidatePath(`/extracurriculars/clubs/${clubId}`);
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Club Registration Error:", error);
        return { success: false, error: error.message };
    }
}

export async function recordClubAttendanceAction(clubId: string, attendanceData: { studentId: string, status: string }[], date: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.recordClubAttendance(clubId, attendanceData, new Date(date), tenantId);
        
        revalidatePath(`/extracurriculars/clubs/${clubId}`);
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Club Attendance Error:", error);
        return { success: false, error: error.message };
    }
}

export async function getClubsAction() {
  try {
    const tenant = await getCurrentTenant();
    const tenantId = tenant.id;
    return await (prisma as any).club.findMany({
      where: { tenantId: tenantId || null },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Get Clubs Error:", error);
    return [];
  }
}

export async function getClubDetailsAction(clubId: string) {
  try {
    const tenant = await getCurrentTenant();
    const tenantId = tenant.id;
    return await (prisma as any).club.findUnique({
      where: { clubId },
      include: {
        advisor: true,
        memberships: {
          include: {
            student: true
          }
        },
        attendance: true
      }
    });
  } catch (error) {
    console.error("Get Club Details Error:", error);
    return null;
  }
}

export async function getStudentsAction() {
  try {
    const tenant = await getCurrentTenant();
    const tenantId = tenant.id;
    return await prisma.student.findMany({
      where: { tenantId: tenantId || null },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Get Students Error:", error);
    return [];
  }
}

// ── 10. Cafeteria & Meal Planning Actions ──────────────────────────

export async function issueMealTokenAction(studentId: string, itemId: string) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.issueMealToken(studentId, itemId, tenantId);
        
        revalidatePath("/cafeteria");
        revalidatePath("/student-portal"); // Student should see their tokens
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Meal Token Flow Error:", error);
        return { success: false, error: error.message };
    }
}

export async function getCafeteriaMenuAction() {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        return await (prisma as any).cafeteriaItem.findMany({
            where: { tenantId: tenantId || null },
            orderBy: { name: 'asc' }
        });
    } catch (error) {
        console.error("Get Cafeteria Menu Error:", error);
        return [];
    }
}

// ── 11. Student Health & Infirmary Actions ──────────────────────────

export async function logHealthVisitAction(studentId: string, visitData: { reason: string, treatment: string, notes?: string, status?: string }) {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        if (!tenantId) throw new Error("Tenant ID is required");

        const result = await flowService.logHealthVisit(studentId, visitData, tenantId);
        
        revalidatePath("/health/visit-logs");
        revalidatePath("/health/dashboard");
        revalidatePath("/students"); // 360 view
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Health Visit Flow Error:", error);
        return { success: false, error: error.message };
    }
}

export async function getHealthVisitLogsAction() {
    try {
        const tenant = await getCurrentTenant();
        const tenantId = tenant.id;
        return await (prisma as any).healthVisitLog.findMany({
            where: { tenantId: tenantId || null },
            include: { student: true },
            orderBy: { date: 'desc' }
        });
    } catch (error) {
        console.error("Get Health Visit Logs Error:", error);
        return [];
    }
}
