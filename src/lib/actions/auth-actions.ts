"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(tenantDomain: string, formData: any) {
    try {
        const { email, password } = formData;

    // 1. Find the tenant
    const tenant = await prisma.tenant.findUnique({
        where: { domain: tenantDomain }
    });

    if (!tenant) {
        return { success: false, error: "Invalid tenant workspace." };
    }

    // 2. Find the user within this tenant
    const user = await prisma.user.findFirst({
        where: { 
            email: email,
            tenantId: tenant.id
        },
        include: { role: true }
    });

    if (!user) {
        return { success: false, error: "Invalid credentials for this school." };
    }

    // 3. Verify password
    // Note: For existing seeded users, passwords might be plain text if they were manually inserted.
    // In a real app, we ALWAYS use bcrypt.
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash).catch(() => {
        // Fallback for plain text passwords in dev/seed
        return password === user.passwordHash;
    });

    if (!isPasswordValid) {
        return { success: false, error: "Invalid password." };
    }

    // 4. Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ 
        userId: user.id, 
        tenantId: tenant.id, 
        role: user.role?.name || "USER",
        expires 
    });

    // 5. Set cookie
    (await cookies()).set("session", session, { 
        expires, 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });

    // 6. Redirect Based on Role and Tenant
    if (user.role?.name === "SUPER_ADMIN") {
        return { success: true, redirect: "/saas" };
    }

    return { success: true, redirect: "/dashboard" };
    } catch (error: any) {
        console.error("Login Error:", error);
        return { success: false, error: `Server Error: ${error?.message || "Unknown error"}` };
    }
}

export async function logoutAction() {
    (await cookies()).delete("session");
    redirect("/login");
}
