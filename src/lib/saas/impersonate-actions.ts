"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const IMPERSONATION_COOKIE = "impersonated_tenant_id";

export async function impersonateTenantAction(tenantId: string) {
    // 1. Verify that the requester is actually a Super Admin
    // For now, we assume if they hit this server action, they are authorized in the Super Admin route.
    // In production, we'd check their session role.

    const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
    });

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    // 2. Set the impersonation cookie
    (await cookies()).set(IMPERSONATION_COOKIE, tenantId, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    // 3. Redirect to the tenant-specific dashboard
    // Note: We need to construct the subdomain URL.
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const targetUrl = `${protocol}://${tenant.domain}.${rootDomain}`;

    redirect(targetUrl);
}

export async function stopImpersonatingAction() {
    (await cookies()).delete(IMPERSONATION_COOKIE);
    
    // Redirect back to the Super Admin dashboard
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const targetUrl = `${protocol}://${rootDomain}/saas/tenants`;
    
    redirect(targetUrl);
}
