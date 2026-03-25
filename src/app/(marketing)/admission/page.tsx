"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    Check, 
    ChevronRight, 
    GraduationCap, 
    ArrowRight, 
    FileText, 
    Calendar, 
    CreditCard, 
    PhoneCall, 
    Globe,
    MessageSquare,
    CheckCircle2,
    MapPin,
    Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdmissionLandingPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
            {/* Header */}
            <header className="border-b border-slate-100 px-6 lg:px-24 py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-600 p-1.5 rounded-lg shadow-sm">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Your School</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        {['Admissions', 'Programs', 'Help', 'Contact'].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-6">
                            <span>EN</span> · <span>አማ</span> · <span>OR</span>
                        </div>
                        <Link href="/login">
                            <Button className="bg-[#064e3b] hover:bg-[#065f46] text-white font-bold px-8 rounded-xl h-10 transition-all active:scale-95 shadow-sm">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative px-6 lg:px-24 py-20 lg:py-32 bg-[#f8fafc] overflow-hidden">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-700">
                            <h1 className="text-5xl lg:text-7xl font-black text-[#0f172a] leading-[1.1] tracking-tighter">
                                Apply for the 2026 Academic Year
                            </h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                Register your child quickly and securely.
                            </p>
                            <Link href="/register" className="inline-block">
                                <Button size="lg" className="bg-[#064e3b] hover:bg-[#065f46] text-white font-bold px-10 py-7 rounded-2xl shadow-xl shadow-emerald-500/10 text-lg transition-all hover:scale-105 active:scale-95">
                                    Start New Application
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="w-full lg:w-1/2 relative animate-in fade-in slide-in-from-right-8 duration-1000">
                             <div className="relative aspect-[4/3] w-full rounded-[48px] overflow-hidden border-8 border-white shadow-2xl">
                                <Image 
                                    src="/assets/school-hero.png" 
                                    alt="Students at school" 
                                    fill 
                                    className="object-cover"
                                    priority
                                />
                             </div>
                             {/* Decorative Birds */}
                             <div className="absolute top-10 left-0 w-12 h-12 opacity-40">
                                <Image src="/assets/hero-bg.png" alt="" fill className="object-contain opacity-0" />
                             </div>
                        </div>
                    </div>
                </section>

                {/* Main Cards Section */}
                <section className="px-6 lg:px-24 py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        {/* New Admissions Card */}
                        <div className="premium-glass bg-white border border-slate-100 rounded-[48px] p-8 lg:p-14 flex flex-col items-center gap-8 shadow-2xl shadow-slate-200/50 hover:shadow-emerald-500/5 transition-all duration-700">
                            <div className="h-20 w-20 bg-emerald-50 rounded-3xl flex items-center justify-center">
                                <FileText className="h-10 w-10 text-emerald-600" />
                            </div>
                            <div className="text-center space-y-4">
                                <h3 className="text-3xl font-black text-[#0f172a] tracking-tight">New Student Admission</h3>
                                <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest">For students applying to the school</p>
                                <p className="text-slate-500 font-medium">For students applying to the school for the first time.</p>
                            </div>

                            <ul className="w-full max-w-xs space-y-4">
                                {[
                                    "Fill application form",
                                    "Upload required documents",
                                    "Track admission status"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold group">
                                        <div className="h-6 w-6 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/register?type=new" className="w-full">
                                <Button className="w-full h-16 rounded-2xl bg-[#064e3b] hover:bg-[#065f46] text-white font-bold text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                                    Start Application
                                </Button>
                            </Link>
                        </div>

                        {/* Returning Student Card */}
                        <div className="premium-glass bg-white border border-slate-100 rounded-[48px] p-8 lg:p-14 flex flex-col items-center gap-8 shadow-2xl shadow-slate-200/50 hover:shadow-blue-500/5 transition-all duration-700">
                            <div className="h-20 w-20 bg-blue-50 rounded-3xl flex items-center justify-center">
                                <CheckCircle2 className="h-10 w-10 text-blue-600" />
                            </div>
                            <div className="text-center space-y-4">
                                <h3 className="text-3xl font-black text-[#0f172a] tracking-tight">Returning Student Registration</h3>
                                <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest">For students already enrolled in the school</p>
                                <p className="text-slate-500 font-medium">For students already enrolled</p>
                            </div>

                            <ul className="w-full max-w-xs space-y-4">
                                {[
                                    "Update information",
                                    "Register for next grade",
                                    "Pay registration fees"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold group">
                                        <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/register?type=returning" className="w-full">
                                <Button className="w-full h-16 rounded-2xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                                    Re-Enroll Student
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Admission Process Section */}
                <section className="px-6 lg:px-24 py-24 bg-[#f8fafc]">
                    <div className="max-w-7xl mx-auto text-center space-y-20">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-[#0f172a] tracking-tight">Admission Process</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                            {[
                                { step: 1, label: "Create Account", color: "bg-emerald-500" },
                                { step: 2, label: "Fill Application", color: "bg-emerald-600" },
                                { step: 3, label: "Upload Documents", color: "bg-blue-500" },
                                { step: 4, label: "Admission Review", color: "bg-blue-600" },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500">
                                    <div className={cn("h-12 w-12 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg", s.color)}>
                                        {s.step}
                                    </div>
                                    <span className="text-lg font-bold text-slate-800 tracking-tight">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Important Information Section */}
                <section className="px-6 lg:px-24 py-32 bg-white">
                    <div className="max-w-7xl mx-auto space-y-20">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black text-[#0f172a] tracking-tight">Important Information</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 bg-slate-50 p-10 rounded-[48px] border border-slate-100">
                            {[
                                { title: "Admission Requirements", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
                                { title: "School Calendar", icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50" },
                                { title: "Registration Fees", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
                                { title: "Contact Admissions", icon: PhoneCall, color: "text-blue-600", bg: "bg-blue-50" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-6 hover:bg-white hover:rounded-[32px] hover:shadow-2xl transition-all duration-500 cursor-pointer group">
                                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", item.bg)}>
                                        <item.icon className={cn("h-7 w-7", item.color)} />
                                    </div>
                                    <span className="text-lg font-black text-[#0f172a] leading-tight">{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                            <div className="bg-emerald-50 border border-emerald-100 px-8 py-3 rounded-full flex items-center gap-2 group cursor-pointer hover:bg-emerald-100 transition-all">
                                <span className="text-sm font-bold text-emerald-800">Admissions close July 30</span>
                                <ChevronRight className="h-4 w-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-sm cursor-pointer hover:text-emerald-600 transition-all">
                                <MessageSquare className="h-5 w-5" />
                                <span>Need Help? Contact Us</span>
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#06201a] text-white pt-24 pb-12 px-6 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-20 border-b border-emerald-900/50">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-emerald-400" />
                                <span className="text-slate-300 font-semibold">123 Addis Ababa, Ethiopia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneCall className="h-5 w-5 text-emerald-400" />
                                <span className="text-slate-300 font-semibold">+251 987 654 321</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Mail className="h-5 w-5 text-emerald-400" />
                                <span className="text-slate-300 font-semibold">info@yourschool.et</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneCall className="h-5 w-5 text-emerald-400" />
                                <span className="text-slate-300 font-semibold">+231 997 654 321</span>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-end gap-6 items-center">
                            {['twitter', 'facebook'].map((social) => (
                                <div key={social} className="h-10 w-10 bg-emerald-900/40 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-800 cursor-pointer transition-all">
                                    <Globe className="h-5 w-5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-12 text-center text-emerald-800 text-[10px] font-bold uppercase tracking-[0.5em]">
                        Your School Global Education Network • 2026 Edition
                    </div>
                </div>
            </footer>
        </div>
    );
}
