"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import * as React from "react";
import {
    Plus, Calendar, Briefcase, Users, TrendingUp,
    ChevronRight, Clock, UserCheck, Sparkles, ArrowRight,
    Search, ChevronLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STAGES = ["Applied", "Screening", "Interview", "Offered", "Hired", "Rejected"] as const;
type Stage = typeof STAGES[number];

const STAGE_CONFIG: Record<Stage, { color: string; badge: string; bar: string }> = {
    Applied:   { color: "text-blue-600",   badge: "bg-blue-100 text-blue-700",     bar: "bg-blue-500" },
    Screening: { color: "text-purple-600", badge: "bg-purple-100 text-purple-700", bar: "bg-purple-500" },
    Interview: { color: "text-amber-600",  badge: "bg-amber-100 text-amber-700",   bar: "bg-amber-500" },
    Offered:   { color: "text-emerald-600",badge: "bg-emerald-100 text-emerald-700",bar:"bg-emerald-500" },
    Hired:     { color: "text-teal-600",   badge: "bg-teal-100 text-teal-700",     bar: "bg-teal-500" },
    Rejected:  { color: "text-rose-600",   badge: "bg-rose-100 text-rose-700",     bar: "bg-rose-500" },
};

function getInitials(name: string) {
    return (name || "??").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

function getDaysAgo(dateStr: string) {
    if (!dateStr) return "N/A";
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    return days <= 0 ? "Today" : `${days}d ago`;
}

interface RecruitmentClientProps {
    candidates: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export function RecruitmentClient({ candidates, totalCount, totalPages, currentPage }: RecruitmentClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const columns = STAGES.map(stage => ({
        stage,
        candidates: candidates.filter(c => c.stage === stage),
    }));

    // Stats based on current view (might be partial due to pagination, but usually enough for current page focus)
    // Actually, for real stats we'd want a getRecruitmentStats action. 
    // To keep it simple, we'll use the current paginated data for the UI visuals.
    const total     = totalCount;
    const hired     = candidates.filter(c => c.stage === "Hired").length;
    const inProcess = candidates.filter(c => !["Hired", "Rejected"].includes(c.stage)).length;
    const convRate  = total > 0 ? Math.round((hired / total) * 100) : 0;

    const createQueryString = useCallback(
        (params: Record<string, string | null>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(params)) {
                if (value === null) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, value);
                }
            }
            return newSearchParams.toString();
        },
        [searchParams]
    );

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (searchParams.get("q") || "")) {
                router.push(`?${createQueryString({ q: searchQuery || null, page: "1" })}`);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, router, createQueryString, searchParams]);

    const handlePageChange = (page: number) => {
        router.push(`?${createQueryString({ page: page.toString() })}`);
    };

    return (
        <div className="space-y-8">

            {/* Top Toolbar */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-3 flex items-center gap-4">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search candidates..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-11 bg-slate-50/50 border-slate-200 h-12 text-sm rounded-2xl focus-visible:ring-emerald-500"
                    />
                </div>
                
                <div className="flex items-center gap-2 ml-auto">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-xl h-10 w-10 border-slate-200"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-xl h-10 w-10 border-slate-200"
                        disabled={currentPage >= totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-12 px-6">
                    <Plus className="h-4 w-4 mr-2" /> Add Candidate
                </Button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Pool",        value: total,     icon: Users,      color: "text-blue-600 bg-blue-50" },
                    { label: "On Page",           value: candidates.length, icon: Clock,      color: "text-amber-600 bg-amber-50" },
                    { label: "Hired (View)",      value: hired,     icon: UserCheck,  color: "text-emerald-600 bg-emerald-50" },
                    { label: "Conversion (All)",  value: `${convRate}%`, icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
                ].map((k) => (
                    <Card key={k.label} className="rounded-[2rem] border-transparent shadow-xl shadow-slate-200/50 bg-white">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("p-3 rounded-xl shrink-0", k.color)}>
                                <k.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black tracking-tight text-slate-900">{k.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{k.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">

                {/* Kanban Board */}
                <div className="xl:col-span-3">
                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex gap-4 min-w-max items-start">
                            {columns.map(({ stage, candidates: cols }) => {
                                const cfg = STAGE_CONFIG[stage as Stage];
                                return (
                                    <div key={stage} className="w-72 flex flex-col gap-3">
                                        {/* Column Header */}
                                        <div className="flex items-center justify-between px-1 pb-3 border-b-2 border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("h-2.5 w-2.5 rounded-full", cfg.bar)} />
                                                <span className="font-black text-sm uppercase tracking-wide text-slate-900">{stage}</span>
                                            </div>
                                            <Badge className={cn("font-black text-[9px] border-none", cfg.badge)}>
                                                {cols.length}
                                            </Badge>
                                        </div>

                                        {/* Candidate Cards */}
                                        <div className="flex flex-col gap-3 min-h-[180px]">
                                            {cols.map(c => (
                                                <Card key={c.candidateId} className="rounded-[1.75rem] border-transparent shadow-lg shadow-slate-200/60 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group overflow-hidden">
                                                    <div className={cn("h-1 w-full", cfg.bar)} />
                                                    <CardContent className="p-5">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className={cn(
                                                                "h-10 w-10 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0",
                                                                cfg.bar
                                                            )}>
                                                                {getInitials(c.name)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-black text-sm text-slate-900 truncate group-hover:text-[#163D2D] transition-colors">{c.name}</p>
                                                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest truncate">{c.position}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mt-3 pt-3 border-t border-slate-50">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {getDaysAgo(c.appliedDate)}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Briefcase className="h-3 w-3" />
                                                                {c.candidateId?.slice(0, 8) ?? "—"}
                                                            </span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Pipeline Funnel */}
                <div className="space-y-6">
                    <Card className="rounded-[2.5rem] border-transparent bg-[#163D2D] text-white shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                        <CardHeader className="p-7 pb-4 relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2 flex items-center gap-2">
                                <TrendingUp className="h-3.5 w-3.5" /> Pipeline Funnel
                            </p>
                            <CardTitle className="font-black text-2xl text-white italic">Current View</CardTitle>
                        </CardHeader>
                        <CardContent className="px-7 pb-7 space-y-3 relative z-10">
                            {columns.map(({ stage, candidates: cols }) => {
                                const pageTotal = candidates.length;
                                const pct = pageTotal > 0 ? Math.round((cols.length / pageTotal) * 100) : 0;
                                const cfg = STAGE_CONFIG[stage as Stage];
                                return (
                                    <div key={stage} className="animate-in fade-in duration-500">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                                            <span className="text-white/70">{stage}</span>
                                            <span className="text-white">{cols.length}</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all duration-700", cfg.bar)} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white">
                        <CardContent className="p-7 flex flex-col items-center text-center gap-4">
                            <div className="p-4 bg-emerald-50 rounded-3xl">
                                <Sparkles className="h-8 w-8 text-[#163D2D]" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 italic">AI Auto-Screen</h4>
                                <p className="text-[11px] font-medium text-slate-400 mt-1">Review top {candidates.length} candidates with AI-generated summaries.</p>
                            </div>
                            <Button className="w-full rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10">
                                Configure Assistant
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center py-4">
                Total Applicants in Pool: {totalCount} • Optimized Data Stream active
            </div>
        </div>
    );
}
