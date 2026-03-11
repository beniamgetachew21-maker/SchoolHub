"use client"
import * as React from "react"
import { Plus, MoreHorizontal, Calendar, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STAGES = ["Applied", "Screening", "Interview", "Offered", "Hired", "Rejected"];

const STAGE_COLORS: Record<string, string> = {
    Applied: "border-blue-500/50 bg-blue-500/10 text-blue-700",
    Screening: "border-purple-500/50 bg-purple-500/10 text-purple-700",
    Interview: "border-amber-500/50 bg-amber-500/10 text-amber-700",
    Offered: "border-emerald-500/50 bg-emerald-500/10 text-emerald-700",
    Hired: "border-teal-500/50 bg-teal-500/10 text-teal-700",
    Rejected: "border-rose-500/50 bg-rose-500/10 text-rose-700",
};

export function RecruitmentClient({ candidates }: { candidates: any[] }) {
    
    // Group candidates by stage
    const columns = STAGES.map(stage => ({
        stage,
        candidates: candidates.filter(c => c.stage === stage)
    }));

    return (
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex gap-6 min-w-max items-start">
                {columns.map(col => (
                    <div key={col.stage} className="w-80 flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b-2 border-border/50 pb-2">
                            <h3 className="font-black text-lg tracking-tight">{col.stage}</h3>
                            <Badge variant="secondary" className="font-bold">{col.candidates.length}</Badge>
                        </div>
                        
                        <div className="flex flex-col gap-4 min-h-[200px] p-2 -mx-2 bg-muted/20 rounded-xl border border-border/50">
                            {col.candidates.map(candidate => (
                                <Card key={candidate.candidateId} className="cursor-pointer glass-card hover:-translate-y-1 transition-transform border-l-4 border-l-emerald-500 hover:shadow-md">
                                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                                        <div>
                                            <CardTitle className="text-base font-black leading-tight">{candidate.name}</CardTitle>
                                            <p className="text-xs font-bold text-emerald-600 mt-0.5">{candidate.position}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2 opacity-50 hover:opacity-100">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="flex flex-col gap-2 mt-3 text-xs font-medium text-muted-foreground bg-muted/30 p-2 rounded border border-border/50">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" /> Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="h-3.5 w-3.5" /> ID: {candidate.candidateId.slice(0, 8)}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground font-bold border border-dashed border-border/50 bg-background/50">
                                <Plus className="w-4 h-4 mr-1" /> Add Candidate
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
