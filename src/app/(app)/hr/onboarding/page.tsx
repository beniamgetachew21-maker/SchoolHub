import * as React from "react"
import { getOnboardingTasks, getEmployees } from "@/lib/actions"
import { OnboardingClient } from "./onboarding-client"

export default async function OnboardingPage() {
    const [tasks, employees] = await Promise.all([
        getOnboardingTasks(),
        getEmployees()
    ]);

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Onboarding Tasks
                </h1>
                <p className="text-muted-foreground font-medium">
                    Ensure a smooth transition for new hires by tracking required setup activities.
                </p>
            </div>
            <OnboardingClient tasks={tasks} employees={employees} />
        </div>
    )
}
