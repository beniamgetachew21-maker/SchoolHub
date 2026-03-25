import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";

export class FinService extends BaseService {
    async getInvoices(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const invoices = await prisma.invoice.findMany({
                where: { tenantId: tenant.id },
            });
            return this.response(invoices);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getInvoicesForStudent(studentId: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const invoices = await prisma.invoice.findMany({
                where: {
                    studentId,
                    tenantId: tenant.id
                }
            });
            return this.response(invoices);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getPayments(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const payments = await prisma.payment.findMany({
                where: { tenantId: tenant.id },
            });
            return this.response(payments);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getFeeStructures(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const structures = await prisma.feeStructure.findMany({
                where: { tenantId: tenant.id },
            });
            return this.response(structures);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async createFeeStructure(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const structureId = "FS" + Math.floor(Math.random() * 10000).toString().padStart(4, "0");
            const structure = await prisma.feeStructure.create({
                data: {
                    ...data,
                    structureId,
                    tenantId: tenant.id,
                },
            });
            return this.response(structure);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async createInvoice(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const invoiceId = "INV" + Math.floor(Math.random() * 100000).toString().padStart(6, "0");
            
            const totalAmount = data.items ? data.items.reduce((sum: number, item: any) => sum + item.amount, 0) : (data.amount || 0);
            
            const invoice = await prisma.invoice.create({
                data: {
                    invoiceId,
                    studentId: data.studentId,
                    amount: totalAmount,
                    dueDate: data.dueDate,
                    status: data.status || "Pending",
                    description: data.description,
                    tenantId: tenant.id,
                    items: data.items ? {
                        create: data.items.map((item: any) => ({
                            type: item.type,
                            amount: item.amount,
                            tenantId: tenant.id
                        }))
                    } : undefined
                } as any,
                include: { items: true } as any
            });
            return this.response(invoice);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async recordPayment(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const paymentId = "PAY" + Math.floor(Math.random() * 100000).toString().padStart(6, "0");
            
            // Start transaction: Create payment and update invoice status
            const [payment] = await prisma.$transaction([
                prisma.payment.create({
                    data: {
                        ...data,
                        paymentId,
                        tenantId: tenant.id,
                        date: new Date().toISOString().split('T')[0]
                    }
                }),
                prisma.invoice.update({
                    where: { invoiceId: data.invoiceId },
                    data: { status: "Paid" }
                })
            ]);
            
            return this.response(payment);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async processDigitalPayment(studentId: string, invoiceId: string, method: string, amount: number): Promise<ServiceResponse<any>> {
        try {
            // Mocking a digital payment gateway response (Telebirr/Stripe)
            // In a real scenario, this would involve a redirect URL or a session ID
            const isSuccessful = true; // Simulating success

            if (isSuccessful) {
                return await this.recordPayment({
                    studentId,
                    invoiceId,
                    amount,
                    method
                });
            }
            return this.response(null, "External Payment Gateway error");
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }
    async getLedgers(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const ledgers = await (prisma as any).ledger.findMany({
                where: { tenantId: tenant.id },
                include: { transactions: true }
            });
            return this.response(ledgers);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async createLedger(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const ledger = await (prisma as any).ledger.create({
                data: {
                    name: data.name,
                    type: data.type,
                    tenantId: tenant.id
                }
            });
            return this.response(ledger);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }
}

export const finService = new FinService();
