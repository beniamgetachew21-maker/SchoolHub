"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, School, Calendar, BookOpen, Settings2, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingSetupPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="mb-8 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                    <Settings2 className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Setup</h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Wizard Mode</p>
                </div>
            </div>

            <Card className="max-w-2xl w-full border-none shadow-2xl overflow-hidden backdrop-blur-md bg-white/95">
                <div className="flex border-b border-slate-100">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider transition-colors
                ${step === s ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30" : "text-slate-400"}
              `}
                        >
                            Step {s}
                        </div>
                    ))}
                </div>

                {step === 1 && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <CardHeader>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                                <School className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Institution Profile</CardTitle>
                            <CardDescription>Define the educational nature of your campus.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label>What type of institution is this?</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Primary School', 'High School', 'University', 'Training Institute'].map((type) => (
                                        <div
                                            key={type}
                                            className="p-4 border-2 border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all flex items-center gap-3 group"
                                        >
                                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-blue-500" />
                                            <span className="text-sm font-semibold text-slate-700">{type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Primary Teaching Language</Label>
                                <Select defaultValue="English">
                                    <SelectTrigger className="h-12 border-slate-200">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="Amharic">Amharic</SelectItem>
                                        <SelectItem value="French">French</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <CardHeader>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Academic Calendar</CardTitle>
                            <CardDescription>Setup your first academic year and terms.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Active Academic Year</Label>
                                <Select defaultValue="2025-2026">
                                    <SelectTrigger className="h-12 border-slate-200">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2025-2026">2025-2026 Academic Year</SelectItem>
                                        <SelectItem value="2026-2027">2026-2027 Academic Year</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label>Term Structure</Label>
                                <div className="flex gap-3">
                                    {['Semester', 'Trimester', 'Quarterly'].map((struct) => (
                                        <Button key={struct} variant="outline" className="flex-1 h-16 border-2 hover:border-blue-600 font-bold active:bg-blue-50">
                                            {struct}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <CardHeader>
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Grading & Academics</CardTitle>
                            <CardDescription>Define how you measure student performance.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Default Grading Scale</Label>
                                <Select defaultValue="GPA">
                                    <SelectTrigger className="h-12 border-slate-200">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="GPA">4.0 GPA Scale</SelectItem>
                                        <SelectItem value="Percentage">Percentage (0-100%)</SelectItem>
                                        <SelectItem value="Letter">Letter Grades (A, B, C...)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-4">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-bold text-emerald-900">Auto-Provisioning Active</p>
                                    <p className="text-emerald-700 leading-tight">We will automatically create a base set of Grade Levels (1-12) based on your institution type.</p>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                )}

                <CardFooter className="bg-slate-50/50 p-6 flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1 || loading}
                    >
                        Previous
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 px-8"
                        onClick={handleNext}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (step === 3 ? "Launch Dashboard" : "Continue Setup")}
                        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
