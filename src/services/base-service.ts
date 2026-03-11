import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { getLocale } from "next-intl/server";
import { z } from "zod";

export type ServiceResponse<T> = {
    data: T | null;
    error: string | null;
    success: boolean;
};

/**
 * Base Service class to be extended by domain-specific services.
 * Automatically handles tenant isolation and locale context.
 */
export class BaseService {
    protected async getContext() {
        const tenant = await getCurrentTenant();
        const locale = await getLocale();
        return { tenant, locale };
    }

    protected async validate<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new Error(error.errors.map(e => e.message).join(", "));
            }
            throw error;
        }
    }

    protected response<T>(data: T | null = null, error: string | null = null): ServiceResponse<T> {
        return {
            data,
            error,
            success: !error,
        };
    }
}
