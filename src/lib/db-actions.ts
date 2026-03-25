"use server";

import { prisma } from "./prisma";

/**
 * Returns the actual global PostgreSQL database size from Supabase
 */
export async function getGlobalDatabaseSize() {
    try {
        const result: any = await prisma.$queryRawUnsafe('SELECT pg_database_size(current_database()) as exact_bytes');
        const bytes = Number(result[0].exact_bytes);
        
        // Convert to GB for UI
        const gb = bytes / (1024 * 1024 * 1024);
        return {
            formatted: gb.toFixed(2) + " GB",
            bytes,
            percentage: Math.min((gb / 10) * 100, 100) // Assuming a 10GB Supabase limit for free tier
        };
    } catch(err) {
        console.error("DB Size Query Error", err);
        return { formatted: "Unknown", bytes: 0, percentage: 0 };
    }
}

/**
 * Returns actual tenants and their computed/estimated row-level sizes
 */
export async function getTenantStorageUsage() {
    try {
        const tenants = await prisma.tenant.findMany({
            include: {
                _count: {
                    select: {
                        users: true,
                        students: true,
                        invoices: true,
                        globalAuditLogs: true
                    }
                }
            }
        });

        // Compute simulated but data-driven sizes based on row counts
        return tenants.map(t => {
            const calculatedBytes = 
                (t._count.students * 15360) + 
                (t._count.users * 5120) + 
                (t._count.invoices * 2048) + 
                (t._count.globalAuditLogs * 1024) + 
                250000; // Base schema overhead per tenant
            
            const mbSize = calculatedBytes / (1024 * 1024);
            const queryLoad = (t._count.users * 15) + (t._count.globalAuditLogs);

            let status = 'Healthy';
            if(mbSize > 500) status = 'Warning - High Load';
            if(mbSize > 1000) status = 'Degraded';

            return {
                id: (t.id.split('-')[0] || t.id).toUpperCase(),
                name: t.name,
                domain: t.domain || 'N/A',
                sizeMb: mbSize,
                formattedSize: mbSize < 1 ? (mbSize * 1024).toFixed(0) + " KB" : mbSize.toFixed(2) + " MB",
                queries: queryLoad + " reqs/day",
                status,
                rawStudentsCount: t._count.students
            };
        }).sort((a, b) => b.sizeMb - a.sizeMb);

    } catch(err) {
        console.error("Tenant Storage Error", err);
        return [];
    }
}
