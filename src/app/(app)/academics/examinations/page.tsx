import * as React from "react"
import { getClassResultsSummary, getStudents, getAssessments } from "@/lib/actions"
import { ExaminationsClient } from "./examinations-client"

export default async function ExaminationsPage() {
    const [summaries, students, assessments] = await Promise.all([
        getClassResultsSummary(),
        getStudents(),
        getAssessments(),
    ]);

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Examination & GPA Engine
                </h1>
                <p className="text-muted-foreground font-medium">
                    Schedule exams, enter marks, calculate GPA, and publish results.
                </p>
            </div>
            <ExaminationsClient summaries={summaries} students={students} assessments={assessments} />
        </div>
    )
}
