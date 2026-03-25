"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSubscriptionPlans() {
    try {
        let plans = await prisma.subscriptionPlan.findMany({
            orderBy: { price: 'asc' }
        });

        if (plans.length === 0) {
            const defaults = [
                { name: "Starter", price: 199, period: "/month", description: "Perfect for single-campus schools just getting started.", features: ["Up to 500 Students", "Basic Core Modules", "Standard Support", "1 Admin Account"], maxStudents: 500 },
                { name: "Growth", price: 499, period: "/month", description: "Advanced features for expanding institutions.", features: ["Up to 2,000 Students", "All Core Modules + Transport", "Priority Support", "5 Admin Accounts", "API Access"], maxStudents: 2000, badge: "Most Popular" },
                { name: "Enterprise", price: 1499, period: "/month", description: "Full control for multi-campus networks & universities.", features: ["Unlimited Students", "Custom White-labeling", "Dedicated Success Manager", "Unlimited Admins", "SAML SSO"], maxStudents: null }
            ];

            for (const p of defaults) {
                await prisma.subscriptionPlan.create({ data: p });
            }
            plans = await prisma.subscriptionPlan.findMany({ orderBy: { price: 'asc' } });
        }

        return plans;
    } catch(err) {
        console.error("Error fetching Subscription Plans", err);
        return [];
    }
}
