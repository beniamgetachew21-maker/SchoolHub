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

export default function AdmissionDashboard() {
    const statusSteps = [
        { title: "Account Created", status: "complete", icon: CheckCircle2 },
        { title: "Application Submitted", status: "complete", icon: CheckCircle2 },
        { title: "Under Review", status: "current", icon: Clock },
        { title: "Admission Approved", status: "pending", icon: Circle },
        { title: "Registration Complete", status: "pending", icon: Circle },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-100 flex flex-col hidden lg:flex">
                <div className="p-8">
                    <div className="flex items-center gap-2 mb-10">
                        <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-[#0F172A]">EthioEdu</span>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { name: "Dashboard", icon: LayoutDashboard, active: true },
                            { name: "My Applications", icon: FileText },
                            { name: "Documents", icon: UploadCloud },
                            { name: "Payments", icon: CreditCard },
                            { name: "Messages", icon: MessageSquare },
                            { name: "Profile", icon: User },
                        ].map((item) => (
                            <Link 
                                key={item.name} 
                                href="#" 
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all",
                                    item.active 
                                        ? "bg-blue-50 text-blue-600" 
                                        : "text-slate-400 hover:text-blue-600 hover:bg-slate-50"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-8 pt-0">
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Need Support?</p>
                        <Button className="w-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-black rounded-xl shadow-sm">
                            Chat with us
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between">
                    <h2 className="text-xl font-black text-[#0F172A]">Admission Hub</h2>
                    
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-blue-600">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white" />
                        </Button>
                        <div className="h-8 w-px bg-slate-100" />
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-black text-[#0F172A]">Beniam</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applicant</p>
                            </div>
                            <Avatar className="h-10 w-10 border-2 border-slate-50 shadow-sm">
                                <AvatarImage src="/avatars/beniam.jpg" />
                                <AvatarFallback className="bg-blue-600 text-white font-bold">B</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Welcome Card */}
                        <div className="bg-blue-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <GraduationCap className="h-64 w-64 rotate-12" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <h1 className="text-4xl font-black">Welcome back, Beniam 👋</h1>
                                <p className="text-blue-100 font-medium text-lg leading-relaxed max-w-xl">
                                    Your application for <span className="text-white font-black">Grade 5</span> is currently under review by our admissions committee. Keep an eye on your status below.
                                </p>
                                <div className="pt-4">
                                    <Link href="/parent-portal/admission/apply">
                                        <Button className="bg-white text-blue-600 hover:bg-blue-50 font-black px-8 py-6 rounded-2xl shadow-xl shadow-black/10 transition-transform hover:scale-105">
                                            Continue Application <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Status Timeline */}
                            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                                <h3 className="text-lg font-black text-[#0F172A] mb-8">Application Status</h3>
                                <div className="space-y-8 relative before:absolute before:left-[1.2rem] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                    {statusSteps.map((step, i) => (
                                        <div key={i} className="flex items-center gap-6 relative">
                                            <div className={cn(
                                                "h-10 w-10 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 shadow-sm",
                                                step.status === "complete" ? "bg-emerald-100 text-emerald-600" :
                                                step.status === "current" ? "bg-blue-600 text-white shadow-xl shadow-blue-200 group-pulse mesh-gradient" : "bg-white border-2 border-slate-50 text-slate-200"
                                            )}>
                                                <step.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn(
                                                    "text-sm font-black",
                                                    step.status === "complete" ? "text-slate-900" :
                                                    step.status === "current" ? "text-blue-600" : "text-slate-400"
                                                )}>{step.title}</p>
                                                {step.status === "current" && (
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Estimated 2-3 business days remaining</p>
                                                )}
                                            </div>
                                            {step.status === "complete" && (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Widgets */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                                    <h3 className="text-lg font-black text-[#0F172A] mb-6">Recent Activity</h3>
                                    <div className="space-y-6">
                                        {[1, 2].map(i => (
                                            <div key={i} className="flex gap-4">
                                                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900">Document Verified</p>
                                                    <p className="text-[10px] font-bold text-slate-400 capitalize whitespace-nowrap">{i * 6} hours ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 overflow-hidden relative group cursor-pointer">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
                                        <CreditCard className="h-24 w-24" />
                                    </div>
                                    <h4 className="text-sm font-black text-emerald-100 uppercase tracking-widest mb-2">Next Step</h4>
                                    <p className="text-xl font-black mb-4">Registration Payment</p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-100">
                                        Amount: <span className="text-white text-base">5,000 ETB</span>
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
