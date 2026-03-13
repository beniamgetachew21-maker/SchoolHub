import { prisma } from "@/lib/prisma";
import { BaseService, ServiceResponse } from "./base-service";
import { revalidatePath } from "next/cache";

export class InfraService extends BaseService {
    /**
     * Library Management
     */
    async getBooks(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const books = await prisma.book.findMany({ where: { tenantId: tenant.id } });
            return this.response(books);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getBookById(id: string | number): Promise<ServiceResponse<any>> {
        try {
            const { tenant } = await this.getContext();
            const bookId = typeof id === "string" ? parseInt(id) : id;
            if (isNaN(bookId)) return this.response(null, "Invalid book ID");
            const book = await prisma.book.findUnique({
                where: { bookId, tenantId: tenant.id },
            });
            return this.response(book);
        } catch (error: any) {
            return this.response(null, error.message);
        }
    }

    async getBorrowRecordsForStudent(studentId: string): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const records = await prisma.borrowRecord.findMany({
                where: { studentId, tenantId: tenant.id },
            });
            return this.response(records);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    /**
     * Transport Management
     */
    async getVehicles(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const vehicles = await prisma.vehicle.findMany({ where: { tenantId: tenant.id } });
            return this.response(vehicles);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getRoutes(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const routes = await prisma.route.findMany({ where: { tenantId: tenant.id } });
            return this.response(routes);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    /**
     * Hostel Management
     */
    async getHostels(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const hostels = await prisma.hostel.findMany({ where: { tenantId: tenant.id } });
            return this.response(hostels);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getRooms(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const rooms = await prisma.room.findMany({ where: { tenantId: tenant.id } });
            return this.response(rooms);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    /**
     * Inventory & Asset Management
     */
    async getInventoryItems(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const items = await prisma.inventoryItem.findMany({ where: { tenantId: tenant.id } });
            return this.response(items);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getAssetAllocations(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const allocations = await prisma.assetAllocation.findMany({ where: { tenantId: tenant.id } });
            return this.response(allocations);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }

    async getClassrooms(): Promise<ServiceResponse<any[]>> {
        try {
            const { tenant } = await this.getContext();
            const classrooms = await prisma.classroom.findMany({ where: { tenantId: tenant.id } });
            return this.response(classrooms);
        } catch (error: any) {
            return this.response([], error.message);
        }
    }
}

export const infraService = new InfraService();
