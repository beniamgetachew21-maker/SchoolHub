"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGlobalIntegrations() {
    try {
        let integrations = await prisma.integrationConfig.findMany({
            where: { tenantId: null }
        });

        // Seed default if empty
        if (integrations.length === 0) {
            const defaults = [
                { provider: "Stripe", env: "Live", status: "Connected", webhookUrl: "https://api.studio-school.com/webhooks/stripe" },
                { provider: "Twilio", env: "Live", status: "Critical", webhookUrl: "" },
                { provider: "SendGrid", env: "Live", status: "Connected", webhookUrl: "" }
            ];
            for (const d of defaults) {
                await prisma.integrationConfig.create({ data: d });
            }
            integrations = await prisma.integrationConfig.findMany({ where: { tenantId: null } });
        }

        return integrations;
    } catch(err) {
        console.error("Error fetching integrations", err);
        return [];
    }
}
