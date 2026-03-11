import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { revalidatePath } from "next/cache";

export class AdmissionsService extends BaseService {
    async getApplications(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const applications = await prisma.application.findMany({
                where: { tenantId: tenant.id },
                orderBy: { date: "desc" },
                include: {
                    interviews: { where: { tenantId: tenant.id } },
                    exams: { where: { tenantId: tenant.id } },
                },
            });
            return this.response(applications);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getApplicationById(id: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const application = await prisma.application.findUnique({
                where: { id, tenantId: tenant.id },
                include: {
                    interviews: { where: { tenantId: tenant.id } },
                    exams: { where: { tenantId: tenant.id } },
                },
            });
            return this.response(application);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async submitApplication(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const id = "REG" + Math.floor(Math.random() * 100000).toString().padStart(6, "0");
            const application = await prisma.application.create({
                data: {
                    ...data,
                    tenantId: tenant.id,
                    id,
                    date: new Date().toISOString(),
                    status: "Pending",
                    dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
                    isRefugee: data.isRefugee || false,
                },
            });
            return this.response({ success: true, applicationId: id });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async updateApplicationStatus(id: string, status: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const application = await prisma.application.update({
                where: { id, tenantId: tenant.id },
                data: { status },
            });
            revalidatePath("/admissions/applications");
            return this.response(application);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async getInterviews(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const interviews = await prisma.admissionInterview.findMany({
                where: { tenantId: tenant.id },
                orderBy: { date: "desc" },
                include: { application: true },
            });
            return this.response(interviews);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getEntranceExams(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const exams = await prisma.entranceExam.findMany({
                where: { tenantId: tenant.id },
                orderBy: { date: "desc" },
                include: { application: true },
            });
            return this.response(exams);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }
}

export const admissionsService = new AdmissionsService();
