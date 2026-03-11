import * as React from "react"
import { getCandidates } from "@/lib/actions"
import { RecruitmentClient } from "./recruitment-client"

export default async function RecruitmentPage() {
    const candidates = await getCandidates();

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Recruitment Pipeline
                </h1>
                <p className="text-muted-foreground font-medium">
                    Track applicants and manage the interview process from sourcing to offer.
                </p>
            </div>
            <RecruitmentClient candidates={candidates} />
        </div>
    )
}
