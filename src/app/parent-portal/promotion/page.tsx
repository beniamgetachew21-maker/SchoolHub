"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
    GraduationCap, 
    ChevronRight, 
    CheckCircle2, 
    ArrowRight,
    Award,
    Calendar,
    FileSignature,
    CreditCard,
    ChevronLeft,
    UserCircle,
    BadgeCheck,
    History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function PromotionRegistrationPage() {
    const [step, setStep] = useState(1); // 1: Welcome/Promotion, 2: Details Update, 3: Agreement, 4: Payment

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-24">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/parent-portal">
                            <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                                <ChevronLeft className="h-6 w-6" />
                            </div>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-[#0F172A]">Annual Re-Registration</h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Academic Year 2026-2027</p>
                        </div>
                    </div>
                </div>

                {/* Progress Mini Bar */}
                <div className="flex gap-2 mb-10">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={cn(
                            "h-1.5 flex-1 rounded-full transition-all duration-500",
                            step >= i ? "bg-emerald-500" : "bg-slate-200"
                        )} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Student Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="rounded-[3rem] border-none shadow-2xl shadow-emerald-900/5 bg-white overflow-hidden p-8 text-center ring-4 ring-emerald-50">
                            <div className="relative inline-block mb-6">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-xl mx-auto">
                                    <AvatarImage src="/avatars/student-1.jpg" />
                                    <AvatarFallback className="bg-emerald-600 text-white font-black text-4xl">S</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg ring-4 ring-white">
                                    <BadgeCheck className="h-6 w-6" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-[#0F172A]">Saron Abiy</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Student ID: #GS-2024-001</p>
                            
                            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-400">Current Grade</span>
                                    <span className="font-black text-slate-900">Grade 4 - Section B</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-400">Next Grade</span>
                                    <Badge className="bg-emerald-100 text-emerald-600 border-none font-black px-3 py-1">Grade 5</Badge>
                                </div>
                            </div>
                        </Card>

                        <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100">
                             <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Award className="h-24 w-24" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Achievement</h4>
                            <p className="text-xl font-black leading-tight">Promoted with Distinction!</p>
                            <p className="text-xs font-medium text-blue-100 mt-2">Rank: Top 5% of Class</p>
                        </div>
                    </div>

                    {/* Right: Flow Content */}
                    <div className="lg:col-span-2">
                        <Card className="rounded-[3rem] border-none shadow-2xl shadow-blue-900/5 bg-white overflow-hidden min-h-[500px] flex flex-col">
                            <CardContent className="p-10 lg:p-14 flex-1">
                                {step === 1 && (
                                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8">
                                        <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                                            <GraduationCap className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black text-[#0F172A] leading-tight mb-4">You're Promoted! 🎉</h2>
                                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                                Congratulations on completing Grade 4. Saron is now eligible to register for 
                                                <span className="text-emerald-600 font-black mx-1">Grade 5</span> for the upcoming Academic Year.
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                                <p className="text-sm font-bold text-slate-700">Registration Deadline: Aug 15, 2026</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <History className="h-5 w-5 text-blue-600" />
                                                <p className="text-sm font-bold text-slate-700">Early Bird Discount: 10% (Valid for 5 days)</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                                        <div>
                                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Update Core Details</h2>
                                            <p className="text-slate-500 font-medium tracking-tight">Ensure your contact and medical info is up to date.</p>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                                        <UserCircle className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">Contact Number</p>
                                                        <p className="text-xs font-bold text-slate-500">+251 912 345 678</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" className="text-blue-600 font-black text-xs">Edit</Button>
                                            </div>
                                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                                        <History className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">Medical Record</p>
                                                        <p className="text-xs font-bold text-slate-500">No allergies reported</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" className="text-blue-600 font-black text-xs">Update</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                                        <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                            <FileSignature className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Registration Agreement</h2>
                                            <p className="text-slate-500 font-medium tracking-tight">Please review the 2026-2027 academic year terms.</p>
                                        </div>
                                        <div className="h-64 overflow-y-auto p-6 bg-slate-50 rounded-3xl border border-slate-100 text-sm text-slate-600 leading-relaxed font-medium">
                                            <h4 className="font-black text-slate-900 mb-4">1. Academic Obligations</h4>
                                            <p className="mb-4">The student agrees to abide by the institutional code of conduct and maintain a minimum attendance of 85%.</p>
                                            <h4 className="font-black text-slate-900 mb-4">2. Financial Terms</h4>
                                            <p className="mb-4">Tuition fees are payable per semester. A late fee of 5% applies after the 10th of each month.</p>
                                            <p>By clicking "Accept", you electronically sign this agreement as the legal guardian.</p>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                                        <div className="text-center">
                                            <div className="h-20 w-20 bg-blue-600 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
                                                <CreditCard className="h-10 w-10 text-white" />
                                            </div>
                                            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Secure Renewal</h2>
                                            <p className="text-slate-500 font-medium">Complete the annual registration fee to finalize.</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-[2.5rem] p-10 text-center space-y-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount to Pay</p>
                                            <h2 className="text-5xl font-black text-slate-900">4,500 <span className="text-lg text-slate-400">ETB</span></h2>
                                            <Badge className="bg-emerald-100 text-emerald-600 border-none font-black px-4 py-1.5 rounded-full">10% Early Bird Applied</Badge>
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            <div className="p-10 lg:p-14 pt-0 border-t border-slate-50">
                                <div className="flex justify-between items-center">
                                    {step > 1 ? (
                                        <button onClick={() => setStep(s => s - 1)} className="font-black text-slate-400 hover:text-slate-900 transition-colors">
                                            Previous
                                        </button>
                                    ) : <div />}

                                    <Button 
                                        onClick={() => step < 4 ? setStep(s => s + 1) : null}
                                        className={cn(
                                            "h-16 px-12 font-black rounded-2xl shadow-xl transition-all group",
                                            step === 1 ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                                        )}
                                    >
                                        {step === 4 ? "Pay & Finish" : "Next Step"} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
