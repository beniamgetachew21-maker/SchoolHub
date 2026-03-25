
require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
    const connectionString = process.env.DATABASE_URL;
    console.log("Using Database URL:", connectionString ? "Found" : "NOT FOUND");
    
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

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
            console.log("First tenant Domain:", tenants[0].domain);
        } else {
            console.warn("WARNING: No active tenants found!");
        }

    } catch (error) {
        console.error("Database connection failed!");
        console.error(error);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

testConnection();
