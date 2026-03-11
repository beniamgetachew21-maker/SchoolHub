import * as React from "react"
import { getAnnouncements, getEmployees, getStudents } from "@/lib/actions"
import { CommunicationClient } from "./communication-client"

export default async function CommunicationHubPage() {
    const [announcements, teachers, students] = await Promise.all([
        getAnnouncements(),
        getEmployees(),
        getStudents(),
    ]);

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Communication Hub
                </h1>
                <p className="text-muted-foreground font-medium">
                    Send SMS and email alerts, post announcements, and manage parent–teacher messaging.
                </p>
            </div>
            <CommunicationClient 
                announcements={announcements} 
                teachers={teachers.filter((e: any) => e.designation?.toLowerCase().includes("teacher"))} 
                students={students} 
            />
        </div>
    )
}
