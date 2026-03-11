import * as React from "react"
import { getPayrollRecords } from "@/lib/actions"
import { PayrollClient } from "./payroll-client"

export default async function PayrollPage({ searchParams }: { searchParams: { month?: string } }) {
    // Default to current month (e.g., "2024-03")
    const d = new Date();
    const currentMonth = searchParams.month || `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    
    const records = await getPayrollRecords(currentMonth);

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Payroll & Compensation
                </h1>
                <p className="text-muted-foreground font-medium">
                    Automate salary generation, review deductions, and approve batch payments.
                </p>
            </div>
            <PayrollClient records={records} initialMonth={currentMonth} />
        </div>
    )
}
