import * as React from "react"
import { getDistinctClasses, getAttendanceReport } from "@/lib/actions"
import { AttendanceClient } from "./attendance-client"

export default async function AttendancePage() {
    const [classes, report] = await Promise.all([
        getDistinctClasses(),
        getAttendanceReport(),
    ]);

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Attendance Management
                </h1>
                <p className="text-muted-foreground font-medium">
                    Mark daily attendance and track student presence across all classes.
                </p>
            </div>
            <AttendanceClient classes={classes} report={report} />
        </div>
    );
}
