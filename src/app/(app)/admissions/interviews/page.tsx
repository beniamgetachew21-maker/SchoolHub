import { getInterviews } from "@/lib/actions";
import { InterviewClient } from "./interview-client";

export default async function InterviewsPage() {
    const interviews = await getInterviews();

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50 text-wrap">ADMISSIONS: INTERVIEWS</h1>
                <p className="text-muted-foreground">Orchestrate and evaluate candidate interactions for institutional suitability.</p>
            </div>

            <InterviewClient initialInterviews={interviews} />
        </div>
    );
}
