import * as React from "react"
import { getCandidates } from "@/lib/actions"
import { RecruitmentClient } from "./recruitment-client"

export default async function RecruitmentPage({ searchParams: searchParamsProp }: { searchParams: Promise<{ page?: string; q?: string }> }) {
    const params = await searchParamsProp;
    const page = parseInt(params.page || "1");
    const search = params.q || "";
    const pageSize = 50; // Kanban columns handle more data usually

    const data = await getCandidates({ page, pageSize, search });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">
                    Recruitment Pipeline
                </h1>
                <p className="text-sm text-muted-foreground font-medium mt-1">
                    Track applicants and manage the interview process from sourcing to offer.
                </p>
            </div>
            <RecruitmentClient 
                candidates={data.candidates} 
                totalCount={data.totalCount}
                totalPages={data.totalPages}
                currentPage={page}
            />
        </div>
    )
}
