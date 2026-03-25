import { headers } from 'next/headers';
import { prisma } from './prisma';
import { cache } from 'react';

/**
 * Retrieves the current tenant's subdomain from the request headers
 * injected by the middleware.
 */
export const getTenantDomain = cache(async (): Promise<string> => {
    const headersList = await headers();
    const domain = headersList.get('x-tenant-domain') || 'default';
    return domain;
});

/**
 * Fetches the active Tenant record from the database based on the subdomain.
 */
export const getCurrentTenant = cache(async () => {
    const domain = await getTenantDomain();

    // If it's the default development domain, we can either return a mock tenant
    // or fetch the first active tenant.
    if (domain === 'default') {
        const defaultTenant = await prisma.tenant.findFirst({
            where: { status: 'Active' },
            orderBy: { createdAt: 'asc' } // Get the oldest/primary tenant
        });

        if (!defaultTenant) {
            throw new Error("No active tenants found. Please seed the database.");
        }
        return defaultTenant;
    }

    // Production: Look up the tenant explicitly by their domain
    const tenant = await prisma.tenant.findUnique({
        where: { domain }
    });

    if (!tenant) {
        throw new Error(`Tenant not found for domain: ${domain}`);
    }

    if (tenant.status !== 'Active') {
        throw new Error(`Tenant account is inactive: ${domain}`);
    }

    return tenant;
});

/**
 * A helper function to wrap Prisma queries with the current tenantId.
 * Usage: const students = await prisma.student.findMany({ ...withTenantCondition(tenant.id) });
 */
export function withTenant(tenantId: string, conditions: Record<string, any> = {}) {
    return {
        ...conditions,
        where: {
            ...conditions.where,
            tenantId,
        }
    };
}
