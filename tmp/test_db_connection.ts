
import { PrismaClient } from '@prisma/client';

async function testConnection() {
    const prisma = new PrismaClient();
    try {
        console.log("Checking database connection...");
        const result = await prisma.$queryRaw`SELECT 1`;
        console.log("Database connection successful:", result);

        console.log("Checking for active tenants...");
        const tenants = await prisma.tenant.findMany({
            where: { status: 'Active' }
        });
        console.log("Found tenants:", tenants.length);
        if (tenants.length > 0) {
            console.log("First tenant ID:", tenants[0].id);
        } else {
            console.warn("WARNING: No active tenants found!");
        }

    } catch (error) {
        console.error("Database connection failed!");
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
