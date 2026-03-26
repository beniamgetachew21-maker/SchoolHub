import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export class HrService extends BaseService {

    // ─── Employee Management ──────────────────────────────────────────────────

    async getEmployees(params: {
        page?: number;
        pageSize?: number;
        search?: string;
        department?: string;
        status?: string;
    } = {}): Promise<ServiceResponse<{ employees: any[]; totalCount: number; totalPages: number }>> {
        try {
            const { tenant } = await this.getContext();
            const { page = 1, pageSize = 20, search = "", department = "", status = "" } = params;

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
                        { employeeId: { contains: search, mode: 'insensitive' } },
                    ]
                });
            }

            if (department) {
                where.AND.push({ department });
            }

            if (status && status !== "Active Status" && status !== "All Statuses") {
                where.AND.push({ status });
            }

            const [employees, totalCount] = await Promise.all([
                prisma.employee.findMany({
                    where,
                    orderBy: { name: "asc" },
                    skip,
                    take: pageSize,
                }),
                prisma.employee.count({ where })
            ]);

            return this.response({
                employees,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
            });
        } catch (error: any) {
            return this.response({ employees: [], totalCount: 0, totalPages: 0 }, error.message);
        }
    }

    async getEmployeeById(employeeId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const employee = await prisma.employee.findFirst({
                where: { employeeId, tenantId: tenant.id }
            });
            console.log("getEmployeeById result for", employeeId, ":", employee ? "Found" : "Not Found");
            return this.response(employee);
        } catch (error: any) {
            console.error("GET_EMPLOYEE_ERROR:", error);
            return this.response(null, error.message);
        }
    }

    async addEmployee(data: any, createAccount?: { roleId: string; password?: string }): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const employeeId = "EMP" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const employeeCode = "EC" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

            const result = await prisma.$transaction(async (tx) => {
                const employee = await tx.employee.create({
                    data: {
                        ...data,
                        tenantId: tenant.id,
                        employeeId,
                        employeeCode,
                        salary: Number(data.salary || 0),
                        status: data.status || "Active"
                    }
                });

                if (createAccount) {
                    const password = createAccount.password || "School123!"; // Default temporary password
                    const passwordHash = await bcrypt.hash(password, 10);
                    
                    await tx.user.create({
                        data: {
                            tenantId: tenant.id,
                            email: data.email,
                            passwordHash,
                            roleId: createAccount.roleId,
                            entityId: employee.employeeId,
                            entityType: "Employee"
                        }
                    });
                }

                return employee;
            });

            revalidatePath('/hr/directory');
            return this.response(result);
        } catch (error: any) {
            console.error("ADD_EMPLOYEE_ERROR:", error);
            return this.response(null, error.message);
        }
    }

    async getRoles(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const roles = await prisma.role.findMany({
                where: {
                    OR: [
                        { tenantId: tenant.id },
                        { tenantId: null } // Global roles if any
                    ]
                }
            });
            return this.response(roles);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async updateEmployee(employeeId: string, data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const employee = await prisma.employee.update({
                where: { employeeId, tenantId: tenant.id },
                data
            });
            revalidatePath('/hr/directory');
            revalidatePath(`/hr/directory/${employeeId}`);
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

    async getCandidates(params: {
        page?: number;
        pageSize?: number;
        search?: string;
    } = {}): Promise<ServiceResponse<{ candidates: any[]; totalCount: number; totalPages: number }>> {
        try {
            const { tenant } = await this.getContext();
            const { page = 1, pageSize = 100, search = "" } = params;

            const skip = (page - 1) * pageSize;

            const where: any = {
                tenantId: tenant.id,
                AND: []
            };

            if (search) {
                where.AND.push({
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { position: { contains: search, mode: 'insensitive' } },
                        { candidateId: { contains: search, mode: 'insensitive' } }
                    ]
                });
            }

            const [candidates, totalCount] = await Promise.all([
                prisma.candidate.findMany({
                    where,
                    skip,
                    take: pageSize,
                    orderBy: { appliedDate: 'desc' }
                }),
                prisma.candidate.count({ where })
            ]);

            return this.response({
                candidates,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize)
            });
        } catch (error: any) {
            return this.response({ candidates: [], totalCount: 0, totalPages: 0 }, error.message);
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
