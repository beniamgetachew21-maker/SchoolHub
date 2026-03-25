"use server";

import { notificationService } from "@/services/notification-service";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getMyNotificationsAction() {
    const session = await getSession();
    if (!session || !session.userId) {
        return { data: [], error: "Not authenticated", success: false };
    }
    return await notificationService.getNotifications(session.userId);
}

export async function markNotificationAsReadAction(notificationId: string) {
    const res = await notificationService.markAsRead(notificationId);
    revalidatePath("/");
    return res;
}

export async function markAllNotificationsAsReadAction() {
    const session = await getSession();
    if (!session || !session.userId) {
        return { data: null, error: "Not authenticated", success: false };
    }
    const res = await notificationService.markAllAsRead(session.userId);
    revalidatePath("/");
    return res;
}

export async function createSystemNotificationAction(userId: string, title: string, message: string) {
    const res = await notificationService.createNotification(userId, title, message);
    revalidatePath("/");
    return res;
}
