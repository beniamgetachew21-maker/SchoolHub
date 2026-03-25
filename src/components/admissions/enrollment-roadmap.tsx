"use client";

import React from "react";
import { 
    CheckCircle2, 
    Clock, 
    Circle, 
    ChevronRight,
    LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export type EnrollmentStatus = "complete" | "current" | "pending";

export interface RoadmapStep {
    id: string;
    title: string;
    description?: string;
    status: EnrollmentStatus;
    icon: LucideIcon;
    estimatedDate?: string;
}

interface EnrollmentRoadmapProps {
    steps: RoadmapStep[];
    className?: string;
}

export function EnrollmentRoadmap({ steps, className }: EnrollmentRoadmapProps) {
    const currentStepIndex = steps.findIndex(s => s.status === "current");
    const progressPercentage = ((steps.filter(s => s.status === "complete").length) / (steps.length - 1)) * 100;

    return (
        <div className={cn("premium-glass-card rounded-[3rem] p-8 lg:p-12 border border-white/80 shadow-2xl shadow-emerald-900/5 relative overflow-hidden group", className)}>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] -z-10 group-hover:scale-110 transition-transform duration-700">
                <CheckCircle2 className="h-64 w-64 text-emerald-600" />
            </div>

            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">Enrollment Progress</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Path to successful admission</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full tracking-widest">
                        Step {currentStepIndex + 1} of {steps.length}
                    </span>
                </div>
            </div>

            <div className="space-y-10 relative">
                {/* Progress Track Line */}
                <div className="absolute left-[1.4rem] top-4 bottom-4 w-1 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 w-full bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-1000 ease-in-out" 
                        style={{ height: `${progressPercentage}%` }}
                    />
                </div>

                {steps.map((step, i) => (
                    <div key={step.id} className="flex items-start gap-8 relative group/item">
                        <div className={cn(
                            "h-12 w-12 rounded-[20px] flex items-center justify-center relative z-10 transition-all duration-500 shadow-xl shrink-0",
                            step.status === "complete" ? "bg-emerald-500 text-white shadow-emerald-500/20" :
                            step.status === "current" ? "bg-[#0F172A] text-white shadow-[#0F172A]/20 scale-110 ring-4 ring-emerald-50" : 
                            "bg-white border-2 border-slate-50 text-slate-300 shadow-sm"
                        )}>
                            <step.icon className={cn("h-6 w-6", step.status === "current" && "animate-pulse")} />
                        </div>
                        
                        <div className="flex-1 pt-1">
                            <div className="flex items-center gap-3">
                                <p className={cn(
                                    "text-lg font-black tracking-tight transition-colors",
                                    step.status === "complete" ? "text-slate-900" :
                                    step.status === "current" ? "text-emerald-600" : "text-slate-400"
                                )}>{step.title}</p>
                                {step.status === "complete" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                            </div>
                            
                            {step.description && (
                                <p className="text-sm text-slate-500 mt-1 font-medium leading-relaxed max-w-md">
                                    {step.description}
                                </p>
                            )}

                            {step.status === "current" && step.estimatedDate && (
                                <div className="mt-3 text-[11px] font-bold text-slate-400 flex items-center gap-2 bg-slate-50 w-fit px-3 py-1 rounded-lg">
                                    <Clock className="h-3.5 w-3.5" />
                                    Expected completion: {step.estimatedDate}
                                </div>
                            )}
                        </div>

                        <ChevronRight className={cn(
                            "h-6 w-6 transition-all shrink-0",
                            step.status === "current" ? "text-emerald-600 translate-x-1" : "text-slate-200 opacity-0 group-hover/item:opacity-100"
                        )} />
                    </div>
                ))}
            </div>
        </div>
    );
}
