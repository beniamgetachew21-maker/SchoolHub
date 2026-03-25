"use client";

import React, { useState } from "react";
import { 
    Check, 
    Navigation, 
    UserPlus, 
    GraduationCap, 
    FileText, 
    CreditCard,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Conceptual Steps
const steps = [
    { id: "path", label: "Path Selection", icon: Navigation, active: true },
    { id: "info", label: "Basic Info", icon: FileText, active: false },
    { id: "profile", label: "Student Profile", icon: UserPlus, active: false },
    { id: "vault", label: "Document Vault", icon: GraduationCap, active: false },
    { id: "payment", label: "Payment", icon: CreditCard, active: false },
];

export default function RegisterPage() {
    const [selection, setSelection] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <Image 
                    src="/assets/hero-bg.png" 
                    alt="Background Pattern" 
                    fill 
                    className="object-cover blur-[5px]"
                />
            </div>

            {/* Background Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-1" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Top Progress Indicator */}
            <div className="w-full max-w-4xl mb-16 relative z-10">
                <div className="flex justify-between items-center relative gap-4">
                    {steps.map((step, idx) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 group relative z-10">
                            <div className={cn(
                                "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                idx === 0 ? "bg-emerald-600 text-white shadow-xl scale-110" : "bg-slate-50 text-slate-400 border border-slate-100"
                            )}>
                                <step.icon className="h-6 w-6" />
                            </div>
                            <span className={cn(idx === 0 ? "block" : "hidden md:block", "text-[10px] font-black uppercase tracking-widest transition-colors", idx === 0 ? "text-emerald-700" : "text-slate-400")}>
                                {step.label}
                            </span>
                            {/* Connector Line */}
                            {idx < steps.length - 1 && (
                                <div className="absolute left-[calc(100%+0.5rem)] top-7 w-[calc(100%-1rem)] h-[1px] bg-slate-100 hidden md:block" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Selection Container */}
            <div className="w-full max-w-6xl relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="bg-white rounded-[64px] p-8 md:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden">
                    {/* Interior Background Glow */}
                    <div className="absolute -top-24 -left-24 h-64 w-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
                    
                    <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-16 relative z-10">Registration Path Selection</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">
                        {/* New Admissions Card */}
                        <div 
                            onClick={() => setSelection('new')}
                            className={cn(
                                "group relative overflow-hidden rounded-[48px] transition-all duration-700 cursor-pointer p-1",
                                selection === 'new' ? "bg-emerald-500/10 scale-[1.02]" : "bg-slate-50 hover:bg-slate-100/50"
                            )}
                        >
                            <div className="bg-white rounded-[46px] p-8 md:p-12 flex flex-col items-center gap-8 h-full min-h-[580px] relative overflow-hidden border border-slate-100 shadow-sm">
                                <div className="relative h-44 w-44 transition-transform duration-700 group-hover:scale-110">
                                    <div className="absolute inset-0 bg-emerald-100 rounded-full scale-90 blur-2xl opacity-40" />
                                    <Image 
                                        src="/assets/new-admission.png" 
                                        alt="New Admission" 
                                        fill 
                                        className="object-contain relative z-10"
                                    />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-[#0f172a] tracking-tighter">New Admissions</h3>
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Application Journey</p>
                                    </div>
                                    
                                    <ul className="space-y-3 pt-4 text-left inline-block">
                                        {["Fill application form", "Upload documents", "Track status"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
                                                <div className="h-5 w-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button className={cn(
                                    "w-full h-16 rounded-2xl font-black text-white uppercase tracking-widest shadow-xl transition-all duration-500",
                                    selection === 'new' ? "bg-emerald-600 scale-95 shadow-emerald-500/20" : "bg-emerald-600 group-hover:bg-emerald-700"
                                )}>
                                    Apply Now
                                </Button>
                                {selection === 'new' && (
                                    <div className="absolute top-8 right-8">
                                        <CheckCircle2 className="h-8 w-8 text-emerald-500 animate-in zoom-in" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Returning Student Card */}
                        <div 
                            onClick={() => setSelection('returning')}
                            className={cn(
                                "group relative overflow-hidden rounded-[48px] transition-all duration-700 cursor-pointer p-1",
                                selection === 'returning' ? "bg-blue-500/10 scale-[1.02]" : "bg-slate-50 hover:bg-slate-100/50"
                            )}
                        >
                            <div className="bg-white rounded-[46px] p-8 md:p-12 flex flex-col items-center gap-8 h-full min-h-[580px] relative overflow-hidden border border-slate-100 shadow-sm">
                                <div className="relative h-44 w-44 transition-transform duration-700 group-hover:scale-110">
                                    <div className="absolute inset-0 bg-blue-100 rounded-full scale-90 blur-2xl opacity-40" />
                                    <Image 
                                        src="/assets/returning-student.png" 
                                        alt="Returning Student" 
                                        fill 
                                        className="object-contain relative z-10"
                                    />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-[#0f172a] tracking-tighter">Returning Student</h3>
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Promotion Cycle</p>
                                    </div>

                                    <ul className="space-y-3 pt-4 text-left inline-block">
                                        {["Update information", "Register for next grade", "Pay fees"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
                                                <div className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button className={cn(
                                    "w-full h-16 rounded-2xl font-black text-white uppercase tracking-widest shadow-xl transition-all duration-500",
                                    selection === 'returning' ? "bg-blue-600 scale-95 shadow-blue-500/20" : "bg-blue-600 group-hover:bg-blue-700"
                                )}>
                                    Quick Re-enroll
                                </Button>
                                {selection === 'returning' && (
                                    <div className="absolute top-8 right-8">
                                        <CheckCircle2 className="h-8 w-8 text-blue-500 animate-in zoom-in" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Credits */}
            <div className="mt-16 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900/40 relative z-10">
                Studio School Global Architecture • 2026 Edition
            </div>
        </div>
    );
}
