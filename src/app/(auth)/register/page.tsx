"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
    GraduationCap, 
    ArrowRight, 
    Smartphone, 
    Mail, 
    Lock, 
    User,
    CheckCircle2,
    Loader2,
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const [step, setStep] = useState(1); // 1: Info, 2: OTP, 3: Success
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleVerify = () => {
        setLoading(true);
        // Simulate OTP Verification
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1500);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-emerald-100 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="mb-12 flex flex-col items-center gap-4">
                <Link href="/admission" className="flex items-center gap-2 group mb-2">
                    <div className="bg-blue-600 p-2 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-3xl font-black text-[#0F172A] tracking-tight">EthioEdu</span>
                </Link>
                <div className="h-1 w-12 bg-blue-600 rounded-full" />
            </div>

            <Card className="max-w-md w-full border-none shadow-2xl shadow-blue-900/5 rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-xl">
                <div className="p-8 sm:p-12 relative">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="space-y-2 mb-8 text-center sm:text-left">
                                <h1 className="text-3xl font-black text-[#0F172A]">Create Your Account</h1>
                                <p className="text-slate-500 font-medium text-sm">Join thousands of students and parents today.</p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Parent / Student Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="name" 
                                            placeholder="Abebe Bikila" 
                                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-900" 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Phone Number</Label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="phone" 
                                            placeholder="+251 912 345 678" 
                                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-900" 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Email (Optional)</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="email" 
                                            type="email"
                                            placeholder="name@example.com" 
                                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-900" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input 
                                            id="password" 
                                            type="password"
                                            placeholder="••••••••" 
                                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold text-slate-900" 
                                            required
                                        />
                                    </div>
                                </div>

                                <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-lg shadow-xl shadow-blue-200/50 pt-1 group" disabled={loading}>
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                        <>
                                            Register <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-sm font-bold text-slate-500">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <button onClick={() => setStep(1)} className="mb-6 flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">
                                <ChevronLeft className="h-4 w-4 mr-1" /> Back
                            </button>
                            <div className="space-y-2 mb-10 text-center">
                                <div className="h-16 w-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <Smartphone className="h-8 w-8 text-blue-600" />
                                </div>
                                <h1 className="text-3xl font-black text-[#0F172A]">Verify Phone</h1>
                                <p className="text-slate-500 font-medium text-sm">We've sent a 4-digit code to your phone.</p>
                            </div>

                            <div className="grid grid-cols-4 gap-4 mb-10">
                                {otp.map((digit, i) => (
                                    <Input 
                                        key={i}
                                        id={`otp-${i}`}
                                        type="number"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        className="h-20 text-center text-3xl font-black rounded-3xl border-2 border-slate-100 bg-slate-50/50 focus:border-blue-600 focus:bg-white transition-all"
                                        placeholder="0"
                                    />
                                ))}
                            </div>

                            <Button onClick={handleVerify} className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl text-xl shadow-xl shadow-blue-200/50 group" disabled={loading}>
                                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Verify & Continue"}
                            </Button>

                            <div className="mt-8 text-center">
                                <button className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">
                                    Didn't receive code? <span className="text-blue-600">Resend</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-8">
                            <div className="h-24 w-24 bg-emerald-100 rounded-[40px] flex items-center justify-center mx-auto mb-8 animate-bounce">
                                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                            </div>
                            <h1 className="text-4xl font-black text-[#0F172A] mb-4">Account Ready!</h1>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10 max-w-sm mx-auto">
                                Welcome to the EthioEdu family. Your secure account has been established.
                            </p>
                            <Link href="/parent-portal/dashboard">
                                <Button className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-3xl text-xl shadow-xl shadow-emerald-200/50">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </Card>

            <div className="mt-12 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Secure Registration Portal Infrastructure 2026
            </div>
        </div>
    );
}
