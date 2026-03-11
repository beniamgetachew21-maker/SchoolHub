import * as React from "react"
import { getEmployees } from "@/lib/actions"
import { DirectoryClient } from "./directory-client"

export default async function EmployeeDirectoryPage() {
    const employees = await getEmployees();

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Employee Directory
                </h1>
                <p className="text-muted-foreground font-medium">
                    Manage profiles, view organizational structure, and track staff details.
                </p>
            </div>
            <DirectoryClient employees={employees} />
        </div>
    )
}
