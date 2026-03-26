export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            select: {
                employeeId: true,
                name: true,
                tenantId: true
            }
        });
        const tenants = await prisma.tenant.findMany();
        return NextResponse.json({ employees, tenants });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
