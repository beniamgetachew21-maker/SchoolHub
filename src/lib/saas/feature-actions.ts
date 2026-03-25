"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getFeatureFlags() {
    try {
        let flags = await prisma.featureFlag.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Seed some defaults if empty so it matches our UI design
        if (flags.length === 0) {
            const defaults = [
                { id: "FF-MULTI-CURRENCY", name: "Multi-Currency Billing", description: "Allows schools in different regions to bill parents in local currency.", status: "Beta", rollout: "25%", active: true },
                { id: "FF-AI-GRADING", name: "AI Automated Grading", description: "Experimental LLM integration for auto-grading subjective assignments.", status: "Alpha", rollout: "5%", active: false },
                { id: "FF-NEW-DASH", name: "v2 Student Portal", description: "The completely redesigned student interface.", status: "GA", rollout: "100%", active: true },
                { id: "FF-SSO-SAML", name: "Enterprise SSO (SAML)", description: "Allows Enterprise tenants to use Azure AD or Okta.", status: "Beta", rollout: "Enterprise Only", active: true },
            ];

            for (const flag of defaults) {
                await prisma.featureFlag.create({ data: flag });
            }
            flags = await prisma.featureFlag.findMany({ orderBy: { createdAt: 'desc' } });
        }

        return flags;
    } catch (err) {
        console.error("Error fetching feature flags", err);
        return [];
    }
}

export async function toggleFeatureFlag(id: string, active: boolean) {
    try {
        await prisma.featureFlag.update({
            where: { id },
            data: { active }
        });
        
        revalidatePath("/saas/settings/features");
        return { success: true };
    } catch (err) {
        console.error("Error toggling flag", err);
        return { success: false, error: "Failed to update flag" };
    }
}
