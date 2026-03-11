import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { revalidatePath } from "next/cache";

export class HrService extends BaseService {

    // ─── Employee Management ──────────────────────────────────────────────────

    async getEmployees(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const employees = await prisma.employee.findMany({
                where: { tenantId: tenant.id },
                orderBy: { name: "asc" }
            });
            return this.response(employees);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getEmployeeById(employeeId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const employee = await prisma.employee.findUnique({
                where: { employeeId, tenantId: tenant.id },
                include: {
                    payrollRecords: {
                        where: { tenantId: tenant.id },
                        orderBy: { month: "desc" }
                    }
                }
            });
            return this.response(employee);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── Leave Management ─────────────────────────────────────────────────────

    async getLeaveRequests(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const requests = await prisma.leaveRequest.findMany({
                where: { tenantId: tenant.id },
                orderBy: { startDate: "desc" }
            });
            
            const employeeIds = [...new Set(requests.map(r => r.employeeId))];
            const employees = await prisma.employee.findMany({
                where: { tenantId: tenant.id, employeeId: { in: employeeIds } },
                select: { employeeId: true, name: true, avatarUrl: true, department: true }
            });
            const empMap = Object.fromEntries(employees.map(e => [e.employeeId, e]));

            const enriched = requests.map(r => ({
                ...r,
                employeeInfo: empMap[r.employeeId] || null
            }));

            return this.response(enriched);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getLeavePolicies(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const policies = await prisma.leavePolicy.findMany({
                where: { tenantId: tenant.id }
            });
            return this.response(policies);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async addLeaveRequest(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const requestId = "LR" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const request = await prisma.leaveRequest.create({
                data: {
                    ...data,
                    tenantId: tenant.id,
                    requestId,
                    status: "Pending"
                }
            });
            revalidatePath('/hr/leave');
            return this.response(request);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async updateLeaveRequestStatus(requestId: string, status: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const request = await prisma.leaveRequest.update({
                where: { requestId, tenantId: tenant.id },
                data: { status }
            });
            revalidatePath('/hr/leave');
            return this.response(request);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── Payroll Engine ───────────────────────────────────────────────────────

    async getPayrollRecords(month: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const records = await prisma.payrollRecord.findMany({
                where: { month, tenantId: tenant.id },
                include: {
                    employee: {
                        select: { name: true, department: true, designation: true }
                    }
                }
            });
            return this.response(records);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async calculatePayroll(month: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            
            // Get all active employees
            const employees = await prisma.employee.findMany({
                where: { tenantId: tenant.id, status: "Active" }
            });

            const operations = employees.map(emp => {
                const basic = emp.salary || 0;
                const allowances = emp.allowances || 0;
                
                // Logic: Let's deduct 15% for income tax and pension generically for now.
                // In a real system, this would follow dynamic tax brackets.
                const taxRate = 0.15;
                const standardDeductions = (emp.deductions || 0) + (basic * taxRate);
                
                const net = basic + allowances - standardDeductions;

                return prisma.payrollRecord.upsert({
                    where: {
                        employeeId_month_tenantId: {
                            employeeId: emp.employeeId,
                            month,
                            tenantId: tenant.id
                        }
                    },
                    update: {
                        basicSalary: basic,
                        allowances: allowances,
                        deductions: standardDeductions,
                        netSalary: net,
                    },
                    create: {
                        tenantId: tenant.id,
                        employeeId: emp.employeeId,
                        month,
                        basicSalary: basic,
                        allowances: allowances,
                        deductions: standardDeductions,
                        netSalary: net,
                        status: "Pending" // requires Finance approval
                    }
                });
            });

            await prisma.$transaction(operations);
            revalidatePath('/finance/payroll');
            return this.response({ generated: employees.length });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async processPayrollPayment(month: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            
            // Mark all pending payroll records for this month as paid
            const result = await prisma.payrollRecord.updateMany({
                where: { month, tenantId: tenant.id, status: "Pending" },
                data: {
                    status: "Paid",
                    paidDate: new Date()
                }
            });

            // Note: In a complete system, we would also generate a massive ledger entry in the Transaction model here.
            
            revalidatePath('/finance/payroll');
            return this.response({ paidCount: result.count });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    // ─── Recruitment & Onboarding ──────────────────────────────────────────────

    async getCandidates(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const candidates = await prisma.candidate.findMany({
                where: { tenantId: tenant.id }
            });
            return this.response(candidates);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getOnboardingTasks(employeeId?: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const tasks = await prisma.onboardingTask.findMany({
                where: {
                    ...(employeeId ? { employeeId } : {}),
                    tenantId: tenant.id
                }
            });
            return this.response(tasks);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async updateOnboardingTask(taskId: string, status: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const task = await prisma.onboardingTask.update({
                where: { taskId, tenantId: tenant.id },
                data: { status }
            });
            revalidatePath('/hr/onboarding');
            return this.response(task);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }
}

export const hrService = new HrService();
