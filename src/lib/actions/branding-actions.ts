"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTenantBrandingAction(tenantId: string, data: {
    logoUrl?: string;
    language?: string;
    calendarSystem?: string;
    themeColor?: string;
}) {
    try {
        await prisma.tenant.update({
            where: { id: tenantId },
            data: {
                logoUrl: data.logoUrl,
                language: data.language,
                calendarSystem: data.calendarSystem,
                // themeColor: data.themeColor, // Note: Add to schema if needed
            },
        });

        revalidatePath("/admin/core");
        revalidatePath("/admin/core/settings");
        revalidatePath("/admin/core/profile");
        
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update branding:", error);
        return { success: false, error: error.message };
    }
}

export async function updateTenantProfileAction(tenantId: string, data: {
    name: string;
    contactEmail: string;
    contactPhone?: string | null;
    address?: string | null;
}) {
    try {
        await prisma.tenant.update({
            where: { id: tenantId },
            data: {
                name: data.name,
                contactEmail: data.contactEmail,
                contactPhone: data.contactPhone,
                address: data.address,
            },
        });

        revalidatePath("/admin/core");
        revalidatePath("/admin/core/profile");

        return { success: true };
    } catch (error: any) {
        console.error("Failed to update profile:", error);
        return { success: false, error: error.message };
    }
}
