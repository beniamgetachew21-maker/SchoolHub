"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, CheckCircle2, Loader2, PlayCircle, Star, Users } from "lucide-react";

export default function RequestDemoPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
                <div className="bg-emerald-100 p-6 rounded-full mb-6">
                    <CheckCircle2 className="h-16 w-16 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-extrabold text-[#003366] mb-4">Request Received!</h2>
                <p className="text-lg text-slate-500 max-w-md mx-auto mb-8">
                    Thank you for your interest in EthioEdu. One of our educational experts will reach out within 24 hours to schedule your personalized walkthrough.
                </p>
                <Button variant="outline" className="border-slate-200" onClick={() => window.location.href = "/"}>
                    Return to Homepage
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                {/* Left Column: Social Proof & Intro */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-extrabold text-[#003366] tracking-tight">
                            See the Future of <br /> <span className="text-red-500">Connected Education</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            Discover how EthioEdu's unified platform can transform your institution's efficiency and student outcomes.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="bg-blue-600 p-2 rounded-lg h-fit text-white">
                                <PlayCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Personalized Walkthrough</h4>
                                <p className="text-sm text-slate-500">A 30-minute deep dive into the modules that matter most to your role.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-red-500 p-2 rounded-lg h-fit text-white">
                                <Star className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Expert Consultation</h4>
                                <p className="text-sm text-slate-500">Get answers to specific technical and integration questions from our engineers.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-emerald-600 p-2 rounded-lg h-fit text-white">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Multi-Stakeholder View</h4>
                                <p className="text-sm text-slate-500">Preview the Parent, Student, and Teacher portals in action.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 flex gap-6 items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex-shrink-0" />
                        <div>
                            <p className="italic text-slate-600 text-sm">"The demo was clear, professional, and directly addressed our district's specific scaling challenges."</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900 uppercase tracking-widest leading-none">Abebe Bakala</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-l pl-2">IT Director, Harar Schools</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Lead Form */}
                <Card className="border-none shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm bg-white/90">
                    <CardHeader className="bg-[#004c8c] text-white p-8">
                        <CardTitle className="text-2xl font-bold">Request a Live Demo</CardTitle>
                        <CardDescription className="text-blue-100">Tell us a bit about your institution and we'll be in touch soon.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="Jane" required className="h-11 border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" required className="h-11 border-slate-200" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email</Label>
                                <Input id="email" type="email" placeholder="jane.doe@school.edu" required className="h-11 border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="institutionName">Institution Name</Label>
                                <Input id="institutionName" placeholder="Addis International" required className="h-11 border-slate-200" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Your Role</Label>
                                    <Select required>
                                        <SelectTrigger className="h-11 border-slate-200">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">District Administrator</SelectItem>
                                            <SelectItem value="principal">School Principal</SelectItem>
                                            <SelectItem value="it">IT Manager</SelectItem>
                                            <SelectItem value="teacher">Lead Teacher</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="students">Student Count</Label>
                                    <Select required>
                                        <SelectTrigger className="h-11 border-slate-200">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-500">1 - 500 Students</SelectItem>
                                            <SelectItem value="501-2000">501 - 2,000 Students</SelectItem>
                                            <SelectItem value="2001+">2,001+ Students</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message (Optional)</Label>
                                <Textarea id="message" placeholder="What are your primary goals?" className="min-h-[100px] border-slate-200" />
                            </div>
                            <Button type="submit" className="w-full bg-[#d9534f] hover:bg-[#c9302c] text-white h-14 text-lg font-bold shadow-xl" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "SCHEDULE MY DEMO"}
                            </Button>
                            <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                <ShieldCheck className="h-3 w-3 inline mr-1" /> Your data is secure and confidential.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
