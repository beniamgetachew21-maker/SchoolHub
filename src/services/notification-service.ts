import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";

export class NotificationService extends BaseService {
    async getNotifications(userId: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const notifications = await prisma.notification.findMany({
                where: { 
                    userId,
                    tenantId: tenant.id 
                },
                orderBy: { createdAt: 'desc' },
                take: 20
            });
            return this.response(notifications);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async markAsRead(notificationId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const notification = await prisma.notification.update({
                where: { 
                    id: notificationId,
                    tenantId: tenant.id
                },
                data: { isRead: true }
            });
            return this.response(notification);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async markAllAsRead(userId: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            await prisma.notification.updateMany({
                where: { 
                    userId,
                    tenantId: tenant.id,
                    isRead: false
                },
                data: { isRead: true }
            });
            return this.response({ success: true });
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async createNotification(userId: string, title: string, message: string): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    title,
                    message,
                    tenantId: tenant.id
                }
            });
            return this.response(notification);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }
}

export const notificationService = new NotificationService();
