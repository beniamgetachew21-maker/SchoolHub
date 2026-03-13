"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
    CreditCard, 
    Smartphone, 
    Building2, 
    ChevronLeft, 
    CheckCircle2, 
    ArrowRight,
    ShieldCheck,
    Info,
    Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function RegistrationPaymentPage() {
    const [method, setMethod] = useState("telebirr");
    const [isPaid, setIsPaid] = useState(false);

    const handlePayment = () => {
        setIsPaid(true);
    };

    if (isPaid) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="h-24 w-24 bg-emerald-100 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100">
                        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-[#0F172A]">Payment Success!</h1>
                        <p className="text-slate-500 font-medium">Your registration fee of 5,000 ETB has been confirmed.</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-50">
                            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Receipt No</span>
                            <span className="text-sm font-black text-slate-900">#RX-2026-9901</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Student</span>
                            <span className="text-sm font-black text-slate-900">Beniam Gebre</span>
                        </div>
                    </div>
                    <Link href="/parent-portal/admission">
                        <Button className="w-full h-16 bg-[#0F172A] hover:bg-slate-800 text-white font-black rounded-2xl text-lg shadow-xl mt-4">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-24">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/parent-portal/admission">
                        <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                            <ChevronLeft className="h-6 w-6" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-[#0F172A]">Registration Payment</h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Complete your enrollment</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Methods */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-black text-[#0F172A]">Choose Payment Method</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { id: "telebirr", name: "Telebirr", icon: Smartphone, color: "bg-blue-600" },
                                    { id: "cbe", name: "CBE Birr", icon: Wallet, color: "bg-amber-500" },
                                    { id: "bank", name: "Bank Transfer", icon: Building2, color: "bg-slate-900" },
                                ].map((m) => (
                                    <button 
                                        key={m.id}
                                        onClick={() => setMethod(m.id)}
                                        className={cn(
                                            "flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all group",
                                            method === m.id ? "border-blue-600 bg-blue-50/50" : "border-slate-100 bg-white hover:border-blue-200"
                                        )}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg", m.color)}>
                                                <m.icon className="h-6 w-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-black text-slate-900 text-lg">{m.name}</p>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Instant Activation</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                            method === m.id ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200"
                                        )}>
                                            {method === m.id && <CheckCircle2 className="h-3.5 w-3.5" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-100/50 rounded-3xl p-6 border border-slate-100 flex gap-4">
                            <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                Your payment is processed through a secure encrypted gateway. No financial data is stored on our servers.
                            </p>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <Card className="rounded-[3rem] border-none shadow-2xl shadow-blue-900/5 bg-white overflow-hidden p-10 lg:p-14">
                        <div className="space-y-8">
                            <div className="text-center pb-8 border-b border-slate-50">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Total Amount Due</p>
                                <h2 className="text-6xl font-black text-[#0F172A]">5,000<span className="text-xl ml-2 text-slate-400 uppercase">ETB</span></h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Applicant</span>
                                    <span className="text-sm font-black text-[#0F172A]">Beniam Gebre</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Grade Level</span>
                                    <span className="text-sm font-black text-blue-600">Grade 5</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fee Type</span>
                                    <span className="text-sm font-black text-[#0F172A]">Registration Fee</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4">
                                <Info className="h-5 w-5 text-blue-600 shrink-0" />
                                <p className="text-xs font-medium text-blue-700 leading-relaxed">
                                    Please ensure you have sufficient balance in your <span className="font-bold capitalize">{method}</span> account.
                                </p>
                            </div>

                            <Button 
                                onClick={handlePayment}
                                className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xl shadow-xl shadow-blue-200 group"
                            >
                                Pay with <span className="capitalize ml-1.5">{method}</span>
                                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Transaction secured by SSL 256-bit
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
