"use server";

import { calendarService } from "@/services/calendar-service";

export async function getTenantCalendarSystem() {
    const { data } = await calendarService.getTenantCalendarSystem();
    return data || "Gregorian";
}

export async function updateTenantCalendarSystem(system: string) {
    return await calendarService.updateTenantCalendarSystem(system);
}

export async function getCalendarEvents() {
    const { data } = await calendarService.getCalendarEvents();
    return data || [];
}

export async function addCalendarEvent(data: any) {
    return await calendarService.addCalendarEvent(data);
}

export async function deleteCalendarEvent(id: string) {
    return await calendarService.deleteCalendarEvent(id);
}
