"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTenantAction(formData: {
    name: string;
    domain: string;
    contactEmail: string;
    adminEmail: string;
    adminName: string;
    planId?: string;
}) {
    try {
        // 1. Create the Tenant
        const tenant = await prisma.tenant.create({
            data: {
                name: formData.name,
                domain: formData.domain,
                contactEmail: formData.contactEmail,
                status: "Active",
            },
        });

        // 2. Create the Admin User for this tenant
        // Note: In a real app, we'd send an invite email. For now, we seed a default password.
        const adminUser = await prisma.user.create({
            data: {
                email: formData.adminEmail,
                passwordHash: "$2b$10$YourHashedPasswordHere", // Placeholder hash
                tenantId: tenant.id,
                role: {
                    connectOrCreate: {
                        where: { name_tenantId: { name: "ADMIN", tenantId: tenant.id } },
                        create: { name: "ADMIN", tenantId: tenant.id }
                    }
                },
                entityType: "Employee",
            },
        });

        // 3. Create a default employee record if needed (omitted for brevity)

        revalidatePath("/saas/tenants");
        return { success: true, tenantId: tenant.id };
    } catch (error: any) {
        console.error("Failed to create tenant:", error);
        return { success: false, error: error.message || "Failed to create tenant" };
    }
}
