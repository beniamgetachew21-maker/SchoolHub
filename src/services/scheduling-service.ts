import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { revalidatePath } from "next/cache";

export class SchedulingService extends BaseService {

    // ─── Fetching Timetables ────────────────────────────────────────────────

    async getTimetableBySection(sectionId: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const periods = await prisma.classPeriod.findMany({
                where: { sectionId, tenantId: tenant.id },
                include: {
                    course: { select: { name: true, code: true } },
                    teacher: { select: { name: true, employeeCode: true } },
                    room: { select: { name: true, isLab: true } },
                },
                orderBy: [
                    { dayOfWeek: 'asc' },
                    { startTime: 'asc' }
                ]
            });
            return this.response(periods);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getTimetableByTeacher(teacherId: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const periods = await prisma.classPeriod.findMany({
                where: { teacherId, tenantId: tenant.id },
                include: {
                    section: { select: { className: true, sectionName: true } },
                    course: { select: { name: true, code: true } },
                    room: { select: { name: true, isLab: true } },
                },
                orderBy: [
                    { dayOfWeek: 'asc' },
                    { startTime: 'asc' }
                ]
            });
            return this.response(periods);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    // ─── Conflict Resolution & Saving ───────────────────────────────────────

    /**
     * Attempts to save a ClassPeriod mapping and strictly checks for overlaps.
     */
    async saveClassPeriod(data: {
        id?: string,
        sectionId: string,
        courseId: string,
        teacherId: string,
        roomId: string,
        dayOfWeek: number,
        startTime: string,
        endTime: string
    }): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            
            // Conflict 1: Is Teacher double booked at this exact time?
            const teacherConflict = await prisma.classPeriod.findFirst({
                where: {
                    teacherId: data.teacherId,
                    dayOfWeek: data.dayOfWeek,
                    tenantId: tenant.id,
                    NOT: { id: data.id || "" }, // Exclude self if updating
                    OR: [
                        { startTime: { lte: data.startTime }, endTime: { gt: data.startTime } },
                        { startTime: { lt: data.endTime }, endTime: { gte: data.endTime } },
                        { startTime: { gte: data.startTime }, endTime: { lte: data.endTime } }
                    ]
                }
            });
            if (teacherConflict) return this.response(null, "Teacher Conflict: The selected teacher is already booked during this time.");

            // Conflict 2: Is Room already double booked?
            const roomConflict = await prisma.classPeriod.findFirst({
                where: {
                    roomId: data.roomId,
                    dayOfWeek: data.dayOfWeek,
                    tenantId: tenant.id,
                    NOT: { id: data.id || "" },
                    OR: [
                        { startTime: { lte: data.startTime }, endTime: { gt: data.startTime } },
                        { startTime: { lt: data.endTime }, endTime: { gte: data.endTime } },
                        { startTime: { gte: data.startTime }, endTime: { lte: data.endTime } }
                    ]
                }
            });
            if (roomConflict) return this.response(null, "Room Conflict: The selected classroom is occupied during this time.");

            // Conflict 3: Is Section already booked?
            const sectionConflict = await prisma.classPeriod.findFirst({
                where: {
                    sectionId: data.sectionId,
                    dayOfWeek: data.dayOfWeek,
                    tenantId: tenant.id,
                    NOT: { id: data.id || "" },
                    OR: [
                        { startTime: { lte: data.startTime }, endTime: { gt: data.startTime } },
                        { startTime: { lt: data.endTime }, endTime: { gte: data.endTime } },
                        { startTime: { gte: data.startTime }, endTime: { lte: data.endTime } }
                    ]
                }
            });
            if (sectionConflict) return this.response(null, "Section Conflict: This class section already has another class scheduled right now.");

            // Validation passed! Save the period block.
            let period;
            if (data.id) {
                period = await prisma.classPeriod.update({
                    where: { id: data.id },
                    data: { ...data }
                });
            } else {
                period = await prisma.classPeriod.create({
                    data: { ...data, tenantId: tenant.id }
                });
            }

            // Invalidate timetable caches
            revalidatePath('/academics/timetable');
            revalidatePath('/teacher-portal/timetable');
            
            return this.response(period);
        } catch (error: any) {
            return this.response(null, error.message || "Failed to save timetable block");
        }
    }

    async removeClassPeriod(id: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const period = await prisma.classPeriod.delete({
                where: { id, tenantId: tenant.id }
            });
            
            revalidatePath('/academics/timetable');
            return this.response(period);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }
}

export const schedulingService = new SchedulingService();
