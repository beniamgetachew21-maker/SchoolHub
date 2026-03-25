import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { revalidatePath } from "next/cache";

export class CalendarService extends BaseService {
    
    async getTenantCalendarSystem(): Promise<ServiceResponse<string>> {
        try {
            const { tenant } = await this.getContext();
            const config = await prisma.tenant.findUnique({
                where: { id: tenant.id },
                select: { calendarSystem: true }
            });
            return this.response(config?.calendarSystem || "Gregorian");
        } catch (error: any) {
            return this.response("Gregorian", error.message);
        }
    }

    async updateTenantCalendarSystem(system: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const updated = await prisma.tenant.update({
                where: { id: tenant.id },
                data: { calendarSystem: system }
            });
            revalidatePath("/admin/calendar");
            return this.response(updated);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async getCalendarEvents(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const events = await prisma.calendarEvent.findMany({
                where: { tenantId: tenant.id },
                orderBy: { startDate: "asc" }
            });
            return this.response(events);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async addCalendarEvent(data: any): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const event = await prisma.calendarEvent.create({
                data: {
                    ...data,
                    tenantId: tenant.id
                }
            });
            revalidatePath("/admin/calendar");
            return this.response(event);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async deleteCalendarEvent(id: string): Promise<ServiceResponse<boolean>> {
        try {
            const { tenant } = await this.getContext();
            await prisma.calendarEvent.delete({
                where: { id, tenantId: tenant.id }
            });
            revalidatePath("/admin/calendar");
            return this.response(true);
        } catch (error: any) {
            return this.response(false, error.message);
        }
    }
}

export const calendarService = new CalendarService();
