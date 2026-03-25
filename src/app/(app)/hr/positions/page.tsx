"use client";

import * as React from "react";
import { Sparkles, PlusCircle, Briefcase, Users, CheckCircle2, XCircle, Clock, ChevronRight, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobDescriptionGeneratorSheet } from "@/components/job-description-generator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const jobPositions = [
    {
        id: "POS01", title: "Physics Teacher", department: "Academics",
        status: "Open", candidates: 8, posted: "Mar 1, 2026",
        priority: "High", icon: "🔬", color: "from-blue-500 to-indigo-600"
    },
    {
        id: "POS02", title: "Librarian", department: "Administration",
        status: "Open", candidates: 4, posted: "Mar 5, 2026",
        priority: "Medium", icon: "📚", color: "from-emerald-500 to-teal-600"
    },
    {
        id: "POS03", title: "IT Administrator", department: "Administration",
        status: "Closed", candidates: 12, posted: "Feb 10, 2026",
        priority: "Low", icon: "💻", color: "from-slate-500 to-slate-700"
    },
    {
        id: "POS04", title: "School Counselor", department: "Student Welfare",
        status: "Open", candidates: 6, posted: "Mar 8, 2026",
        priority: "High", icon: "🧠", color: "from-purple-500 to-fuchsia-600"
    },
    {
        id: "POS05", title: "Sports Coach", department: "Extracurriculars",
        status: "Open", candidates: 3, posted: "Mar 10, 2026",
        priority: "Medium", icon: "🏆", color: "from-amber-500 to-orange-500"
    },
    {
        id: "POS06", title: "Finance Officer", department: "Finance",
        status: "On Hold", candidates: 9, posted: "Feb 20, 2026",
        priority: "Low", icon: "💰", color: "from-rose-500 to-pink-600"
    },
];

const statusConfig: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
    Open:    { label: "Open",    cls: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    Closed:  { label: "Closed", cls: "bg-slate-100 text-slate-500",     icon: XCircle },
    "On Hold": { label: "On Hold", cls: "bg-amber-100 text-amber-700",  icon: Clock },
};

const priorityConfig: Record<string, string> = {
    High:   "bg-rose-100 text-rose-700",
    Medium: "bg-blue-100 text-blue-700",
    Low:    "bg-slate-100 text-slate-500",
};

export default function PositionsPage() {
    const [isGeneratorOpen, setIsGeneratorOpen] = React.useState(false);

    const open   = jobPositions.filter(p => p.status === "Open").length;
    const closed = jobPositions.filter(p => p.status === "Closed").length;
    const total  = jobPositions.reduce((a, p) => a + p.candidates, 0);

    return (
        <>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">
                            Job Positions
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                            Manage open roles, track apply pipelines, and generate AI job descriptions.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/hr/recruitment">
                            <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5">
                                <Users className="h-3.5 w-3.5 mr-1.5" /> View Candidates
                            </Button>
                        </Link>
                        <Button
                            onClick={() => setIsGeneratorOpen(true)}
                            className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5"
                        >
                            <Sparkles className="h-3.5 w-3.5 mr-1.5" /> New with AI
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Total Positions",    value: jobPositions.length, icon: Briefcase,   color: "text-slate-600 bg-slate-50" },
                        { label: "Open Roles",         value: open,                icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
                        { label: "Closed / On Hold",   value: jobPositions.length - open, icon: XCircle, color: "text-rose-600 bg-rose-50" },
                        { label: "Total Candidates",   value: total,               icon: Users,        color: "text-blue-600 bg-blue-50" },
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

                {/* Position Cards Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-xl uppercase tracking-tight text-slate-900 italic">All Positions</h3>
                            <Button onClick={() => setIsGeneratorOpen(true)} variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">
                                + Add Position
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {jobPositions.map((pos) => {
                                const s = statusConfig[pos.status];
                                return (
                                    <Card key={pos.id} className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/40 bg-white hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                                        <div className={cn("h-2 w-full bg-gradient-to-r", pos.color)} />
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br shadow-md", pos.color)}>
                                                    {pos.icon}
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <Badge className={cn("font-black text-[9px] uppercase tracking-widest border-none", s.cls)}>
                                                        <s.icon className="h-2.5 w-2.5 mr-1" />{s.label}
                                                    </Badge>
                                                    <Badge className={cn("font-black text-[9px] uppercase tracking-widest border-none", priorityConfig[pos.priority])}>
                                                        {pos.priority} Priority
                                                    </Badge>
                                                </div>
                                            </div>

                                            <h4 className="font-black text-base text-slate-900 group-hover:text-[#163D2D] transition-colors italic mb-1">{pos.title}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{pos.department}</p>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                    <Users className="h-3.5 w-3.5 text-emerald-500" />
                                                    <span className="font-black text-slate-700">{pos.candidates}</span> candidates
                                                </div>
                                                <Link href="/hr/recruitment">
                                                    <Button variant="ghost" className="h-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50">
                                                        Pipeline <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* AI CTA */}
                        <Card className="rounded-[2.5rem] border-transparent bg-[#163D2D] text-white shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
                            <CardHeader className="p-7 pb-4 relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2 flex items-center gap-2">
                                    <Sparkles className="h-3.5 w-3.5" /> AI Assist
                                </p>
                                <CardTitle className="font-black text-2xl text-white italic">Job Description Generator</CardTitle>
                                <CardDescription className="text-white/50 text-xs font-medium mt-1">
                                    Auto-generate role descriptions, responsibilities, and requirements in seconds.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-7 pb-7 relative z-10">
                                <Button
                                    onClick={() => setIsGeneratorOpen(true)}
                                    className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-widest h-12 border-none"
                                >
                                    <Sparkles className="h-3.5 w-3.5 mr-2" /> Generate Description
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Open Roles Summary */}
                        <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-6 pb-3">
                                <CardTitle className="font-black text-lg tracking-tight text-slate-900 italic flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-emerald-500" /> Hiring Pipeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                {jobPositions.filter(p => p.status === "Open").map((pos, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                        <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center text-lg shrink-0 bg-gradient-to-br", pos.color)}>
                                            {pos.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-[11px] text-slate-900 uppercase italic truncate">{pos.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{pos.candidates} candidates · Posted {pos.posted}</p>
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#163D2D] shrink-0" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <JobDescriptionGeneratorSheet
                isOpen={isGeneratorOpen}
                onOpenChange={setIsGeneratorOpen}
            />
        </>
    );
}
