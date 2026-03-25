"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Global Provisioning Actions (Bypasses tenant isolation)
 * These should ideally be protected by a SuperAdmin role check.
 */

export async function createSubscriptionPlan(data: {
    plan: string;
    startDate: Date;
    endDate: Date;
    maxStudents?: number;
}) {
    const subscription = await prisma.tenantSubscription.create({
        data: {
            plan: data.plan,
            startDate: data.startDate,
            endDate: data.endDate,
            maxStudents: data.maxStudents,
            status: "Active"
        }
    });

    return subscription;
}

export async function linkTenantToSubscription(tenantId: string, subscriptionId: string) {
    const updatedTenant = await prisma.tenant.update({
        where: { id: tenantId },
        data: { subscriptionId }
    });

    revalidatePath('/saas/tenants');
    return updatedTenant;
}

export async function getAllTenantsWithSubscriptions() {
    return prisma.tenant.findMany({
        include: {
            subscription: true
        }
    });
}

export async function getAllSubscriptionPlans() {
    return prisma.tenantSubscription.findMany({
        include: {
            _count: {
                select: { tenants: true }
            }
        }
    });
}

export async function updateTenantStatus(tenantId: string, status: "Active" | "Suspended") {
    await prisma.tenant.update({
        where: { id: tenantId },
        data: { status }
    });
    revalidatePath('/saas/tenants');
    revalidatePath(`/saas/tenants/${tenantId}`);
}

export async function getTenantDetails(tenantId: string) {
    return prisma.tenant.findUnique({
        where: { id: tenantId },
        include: {
            subscription: true,
            _count: {
                select: {
                    students: true,
                    employees: true,
                    users: true,
                    campuss: true,
                }
            }
        }
    });
}

/**
 * Tenant Lifecycle: Step 2 - Create Tenant
 * Handles registration, subscription provisioning, and admin setup.
 */
export async function registerInstitutionAction(data: {
    schoolName: string;
    adminName: string;
    email: string;
    passwordHash: string; // Ensure this is hashed before calling
    domain: string;
    contactPhone?: string;
}) {
    return await prisma.$transaction(async (tx: any) => {
        // 1. Create Trial Subscription
        const subscription = await tx.tenantSubscription.create({
            data: {
                plan: "Pro (Trial)",
                status: "Trial",
                startDate: new Date(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 day trial
                maxStudents: 100
            }
        });

        // 2. Create the Tenant
        const tenant = await tx.tenant.create({
            data: {
                name: data.schoolName,
                domain: data.domain,
                contactEmail: data.email,
                contactPhone: data.contactPhone,
                status: "Active",
                subscriptionId: subscription.id
            }
        });

        // 3. Create the Admin Role for this Tenant
        const adminRole = await tx.role.create({
            data: {
                tenantId: tenant.id,
                name: "ADMIN",
                description: "Super Administrator of the Institution"
            }
        });

        // 4. Create the initial Admin User
        const adminUser = await tx.user.create({
            data: {
                tenantId: tenant.id,
                email: data.email,
                passwordHash: data.passwordHash,
                roleId: adminRole.id,
                entityType: "Employee"
            }
        });

        return {
            success: true,
            tenantId: tenant.id,
            adminUserId: adminUser.id,
            subdomain: tenant.domain
        };
    });
}
