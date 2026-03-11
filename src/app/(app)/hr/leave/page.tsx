import * as React from "react"
import { getLeaveRequests, getLeavePolicies } from "@/lib/actions"
import { LeaveClient } from "./leave-client"

export default async function LeaveManagementPage() {
    const [requests, policies] = await Promise.all([
        getLeaveRequests(),
        getLeavePolicies()
    ]);

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Leave Management
                </h1>
                <p className="text-muted-foreground font-medium">
                    Review, approve, and track employee time-off requests.
                </p>
            </div>
            <LeaveClient requests={requests} policies={policies} />
        </div>
    )
}
