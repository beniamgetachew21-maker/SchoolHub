import { getEntranceExams } from "@/lib/actions";
import { ExamClient } from "./exam-client";

export default async function ExamsPage() {
    const exams = await getEntranceExams();

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50 text-wrap">ADMISSIONS: ENTRANCE EXAMS</h1>
                <p className="text-muted-foreground">Monitor and record academic competency assessments for incoming candidates.</p>
            </div>

            <ExamClient initialExams={exams} />
        </div>
    );
}
