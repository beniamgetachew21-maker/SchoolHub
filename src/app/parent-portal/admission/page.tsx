"use client";

import React from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    FileText,
    UploadCloud,
    CreditCard,
    MessageSquare,
    User,
    LogOut,
    GraduationCap,
    CheckCircle2,
    Clock,
    Circle,
    ChevronRight,
    ArrowRight,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { EnrollmentRoadmap, RoadmapStep } from "@/components/admissions/enrollment-roadmap";

export default function AdmissionDashboard() {
    const statusSteps: RoadmapStep[] = [
        { id: "1", title: "Account Created", status: "complete", icon: CheckCircle2, description: "Your basic profile and contact information have been verified." },
        { id: "2", title: "Application Submitted", status: "complete", icon: CheckCircle2, description: "Initial admission forms received and logged in the system." },
        { id: "3", title: "Document Review", status: "current", icon: Clock, description: "The admissions committee is evaluating your academic records.", estimatedDate: "Mar 15 - Mar 18" },
        { id: "4", title: "Admission Decision", status: "pending", icon: Circle, description: "Final decision notification and offer letter issuance." },
        { id: "5", title: "Registration Complete", status: "pending", icon: Circle, description: "Fee payment and final seat confirmation." },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
            {/* Background Decorative Mesh Cells */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] mesh-gradient opacity-20 -z-10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-100 rounded-full opacity-30 -z-10 blur-[120px]" />

            {/* Sidebar: Premium Glass */}
            <aside className="w-80 premium-glass border-r border-white/50 flex flex-col hidden lg:flex relative z-10">
                <div className="p-10">
                    <div className="flex items-center gap-3 mb-12 group cursor-pointer">
                        <div className="bg-blue-600 p-2.5 rounded-2xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
                            <GraduationCap className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-2xl font-black text-[#0F172A] tracking-tighter">EthioEdu</span>
                    </div>

                    <nav className="space-y-3">
                        {[
                            { name: "Dashboard", icon: LayoutDashboard, active: true },
                            { name: "My Applications", icon: FileText },
                            { name: "Documents", icon: UploadCloud },
                            { name: "Payments", icon: CreditCard },
                            { name: "Messages", icon: MessageSquare },
                            { name: "Support Hub", icon: User },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href="#"
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 rounded-[24px] font-black text-[13px] uppercase tracking-widest transition-all duration-300",
                                    item.active
                                        ? "bg-[#0F172A] text-white shadow-2xl shadow-slate-900/20 translate-x-1"
                                        : "text-slate-400 hover:text-blue-600 hover:translate-x-1"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", item.active ? "text-blue-400" : "")} />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-10">
                    <div className="premium-glass-card rounded-[32px] p-8 border border-white/80 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Identity Verified</p>
                        <ShieldCheck className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
                        <Button className="w-full bg-[#0F172A] text-white hover:bg-black font-black rounded-2xl shadow-lg text-xs py-5">
                            Security Settings
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-24 bg-white/40 backdrop-blur-md border-b border-white/50 px-12 flex items-center justify-between relative z-10">
                    <div>
                        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Admission Hub</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Academic Year 2026/27</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white/80 shadow-sm border border-slate-100 text-slate-400 hover:text-blue-600 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                        </Button>
                        <div className="h-10 w-px bg-slate-200" />
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="text-right">
                                <p className="text-sm font-black text-[#0F172A] group-hover:text-blue-600 transition-colors">Beniam G.</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Applicant</p>
                            </div>
                            <Avatar className="h-14 w-14 border-2 border-white shadow-xl group-hover:ring-4 group-hover:ring-blue-50 transition-all duration-500">
                                <AvatarImage src="/avatars/beniam.jpg" />
                                <AvatarFallback className="bg-blue-600 text-white font-black text-xl">B</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-0">
                    <div className="max-w-6xl mx-auto space-y-12">
                        {/* Hero Announcement */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-600 rounded-[4rem] blur-[80px] opacity-10 -z-10 group-hover:opacity-20 transition-opacity" />
                            <div className="bg-[#0F172A] rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-500/10">
                                <div className="absolute top-0 right-0 p-16 opacity-10 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-125">
                                    <GraduationCap className="h-72 w-72" />
                                </div>
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

                                <div className="relative z-10 space-y-8">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
                                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Application Integrity: 98% Complete</span>
                                    </div>
                                    <div className="max-w-2xl">
                                        <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-6">
                                            Ready for the <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">next chapter</span>, Beniam?
                                        </h1>
                                        <p className="text-slate-400 font-medium text-xl leading-relaxed">
                                            Your application for <span className="text-white font-black">Grade 5</span> has passed the initial screening. We're currently validating your academic transcripts.
                                        </p>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Link href="/parent-portal/admission/apply">
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-8 rounded-[24px] shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 text-lg group">
                                                Complete Details <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 px-10 py-8 rounded-[24px] font-black text-lg">
                                            Download Receipt
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Roadmap Component */}
                            <div className="lg:col-span-8">
                                <EnrollmentRoadmap steps={statusSteps} className="h-full" />
                            </div>

                            {/* Sidebar Widgets */}
                            <div className="lg:col-span-4 space-y-12">
                                <div className="premium-glass-card rounded-[3rem] p-10 border border-white/80 shadow-xl shadow-blue-900/5 hover:translate-y-[-8px] transition-all duration-500">
                                    <h3 className="text-xl font-black text-[#0F172A] tracking-tight mb-8">Recent Events</h3>
                                    <div className="space-y-8">
                                        {[
                                            { title: "Transcript Verified", icon: FileText, time: "4h", color: "text-blue-600", bg: "bg-blue-50" },
                                            { title: "Chat started", icon: MessageSquare, time: "1d", color: "text-emerald-600", bg: "bg-emerald-50" },
                                        ].map((event, i) => (
                                            <div key={i} className="flex gap-5 items-start">
                                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", event.bg, event.color)}>
                                                    <event.icon className="h-6 w-6" />
                                                </div>
                                                <div className="pt-1">
                                                    <p className="text-sm font-black text-[#0F172A] tracking-tight">{event.title}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{event.time} ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#0F172A] rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-900/10 overflow-hidden relative group cursor-pointer hover:scale-[1.02] transition-all duration-500">
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                                    <div className="absolute bottom-0 right-0 p-10 opacity-20 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700">
                                        <CreditCard className="h-32 w-32" />
                                    </div>
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                                                <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Financial Action</span>
                                        </div>
                                        <h4 className="text-2xl font-black tracking-tight leading-tight">Secure Final Seat Registration</h4>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-[10px] font-black uppercase text-slate-400">Initial Fee:</span>
                                            <span className="text-3xl font-black text-white">5,000 ETB</span>
                                        </div>
                                        <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 group">
                                            Pay Securely <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

import { ArrowUpRight, ShieldCheck } from "lucide-react";
