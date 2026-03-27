"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Building2, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState("");

    const roles = [
        {
            id: "school_admin",
            icon: <Building2 className="h-8 w-8 text-brand-orange" />,
            title: "School Administrator",
            desc: "Set up and manage a full school management system for your institution.",
        },
        {
            id: "teacher",
            icon: <BookOpen className="h-8 w-8 text-blue-500" />,
            title: "Teacher / Staff",
            desc: "Access your school's platform using a code provided by your administrator.",
        },
        {
            id: "parent",
            icon: <Users className="h-8 w-8 text-emerald-500" />,
            title: "Parent / Student",
            desc: "Monitor academic progress and stay connected with your school.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16">
            <Link href="/" className="flex items-center gap-2 mb-12">
                <GraduationCap className="h-10 w-10 text-brand-orange" />
                <span className="text-2xl font-bold text-slate-800">EthioEdu</span>
            </Link>

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10">
                {step === 1 && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold text-slate-900">Get Started</h1>
                            <p className="text-slate-500 mt-2">Who are you signing up as?</p>
                        </div>
                        <div className="space-y-4">
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => { setRole(r.id); setStep(2); }}
                                    className={`w-full flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all hover:border-brand-orange hover:shadow-md ${role === r.id ? "border-brand-orange bg-orange-50" : "border-slate-200"}`}
                                >
                                    <div className="shrink-0">{r.icon}</div>
                                    <div>
                                        <div className="font-bold text-slate-800">{r.title}</div>
                                        <div className="text-sm text-slate-500 mt-0.5">{r.desc}</div>
                                    </div>
                                    <ArrowRight className="ml-auto h-5 w-5 text-slate-400 shrink-0" />
                                </button>
                            ))}
                        </div>
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-brand-orange font-semibold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-2">
                            ← Back
                        </button>
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold text-slate-900">Create Your Account</h1>
                            <p className="text-slate-500 mt-2 capitalize">{role.replace("_", " ")} Registration</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-1">Full Name</label>
                                <input type="text" placeholder="e.g. Abebe Bikila" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-1">Email Address</label>
                                <input type="email" placeholder="you@school.edu.et" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                            </div>
                            {role === "school_admin" && (
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1">Institution Name</label>
                                    <input type="text" placeholder="e.g. Kotebe High School" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                                </div>
                            )}
                            {(role === "teacher" || role === "parent") && (
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1">School Access Code</label>
                                    <input type="text" placeholder="Provided by your administrator" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-1">Password</label>
                                <input type="password" placeholder="Create a strong password" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                            </div>
                            <Button
                                onClick={() => alert("Registration submitted! Our team will contact you shortly to complete your setup.")}
                                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-4 h-auto rounded-2xl text-lg mt-2"
                            >
                                {role === "school_admin" ? "Request Your School Portal" : "Submit Registration"}
                            </Button>
                        </div>
                        <p className="text-center text-xs text-slate-400">
                            By continuing you agree to our{" "}
                            <Link href="/terms" className="underline">Terms of Use</Link> and{" "}
                            <Link href="/privacy" className="underline">Privacy Policy</Link>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
