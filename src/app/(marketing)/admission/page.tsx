"use client";

import React from "react";
import Link from "next/link";
import { 
    UserPlus, 
    FileEdit, 
    UploadCloud, 
    ClipboardCheck, 
    CheckCircle2, 
    GraduationCap, 
    ChevronRight,
    Search,
    Globe,
    Phone,
    Mail,
    MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AdmissionLandingPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
            {/* Custom Header for Admission Flow */}
            <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 lg:px-24 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-[#0F172A] hidden sm:inline-block">EthioEdu Admissions</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="#programs" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Programs</Link>
                    <Link href="#process" className="text-sm font-semibold text-blue-600">Admission</Link>
                    <Link href="#contact" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border-r border-slate-200 pr-4 mr-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Globe className="h-3 w-3" /> EN | አማ | OR
                    </div>
                    <Link href="/login">
                        <Button variant="ghost" className="text-slate-600 font-bold hover:text-blue-600">Login</Button>
                    </Link>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative pt-20 pb-24 px-6 lg:px-24 mesh-gradient">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                            <Badge className="bg-blue-100 text-blue-600 border-none px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest animate-pulse">
                                Admissions 2026 Now Open
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-black text-[#0F172A] leading-[1.1]">
                                Shaping the <span className="text-blue-600">Future</span> of Education.
                            </h1>
                            <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
                                Join our thriving community where innovation meets tradition. Start your journey with EthioEdu's state-of-the-art learning environment.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link href="/signup">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-7 rounded-2xl shadow-xl shadow-blue-200/50 text-lg group">
                                        Apply Now
                                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="border-2 border-slate-200 bg-white text-slate-700 font-black px-10 py-7 rounded-2xl hover:bg-slate-50 text-lg shadow-sm">
                                        Student Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-blue-100/50 rounded-[40px] blur-3xl -z-10" />
                            <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-slate-100">
                                <img 
                                    src="/images/admissions/hero-illustration.png" 
                                    alt="Students Learning" 
                                    className="rounded-[32px] w-full h-auto object-cover"
                                />
                            </div>
                            {/* Floating Stats */}
                            <div className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-bounce cursor-default hidden xl:block">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Avg. Rating</p>
                                <p className="text-xl font-black text-amber-500">4.9 ★★★★★</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Admission Process */}
                <section id="process" className="py-24 px-6 lg:px-24 bg-white relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A]">Simple, Transparent Process</h2>
                            <p className="text-slate-500 font-medium">Your pathway to enrollment is clear and straightforward.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            {[
                                { step: "1", title: "Create Account", icon: UserPlus, desc: "Quick registration" },
                                { step: "2", title: "Fill Application", icon: FileEdit, desc: "Add your details" },
                                { step: "3", title: "Upload Docs", icon: UploadCloud, desc: "Secure vault" },
                                { step: "4", title: "Admin Review", icon: ClipboardCheck, desc: "Verify profile" },
                                { step: "5", title: "Complete", icon: CheckCircle2, desc: "Join EthioEdu" },
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center text-center group">
                                    <div className="h-16 w-16 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center relative mb-6 group-hover:bg-blue-600 transition-all duration-300">
                                        <s.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                                        <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-black text-[#0F172A] border border-slate-50">
                                            {s.step}
                                        </div>
                                    </div>
                                    <h4 className="font-black text-slate-900 mb-1">{s.title}</h4>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.desc}</p>
                                    {i < 4 && (
                                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
                                             <ChevronRight className="h-10 w-10" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section id="programs" className="py-24 px-6 lg:px-24 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-16">
                            <div className="space-y-4">
                                <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A]">Explore Our Programs</h2>
                                <p className="text-slate-500 font-medium max-w-xl">From early childhood to university preparation, we offer excellence at every stage.</p>
                            </div>
                            <Button variant="ghost" className="font-bold text-blue-600 hover:bg-blue-50">View All Packages <ChevronRight className="h-4 w-4 ml-1" /></Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { name: "Kindergarten", code: "KG", desc: "Foundation for growth", color: "bg-rose-50 text-rose-600" },
                                { name: "Primary School", code: "PRI", desc: "Building core skills", color: "bg-emerald-50 text-emerald-600" },
                                { name: "Secondary", code: "SEC", desc: "Expanding horizons", color: "bg-blue-50 text-blue-600" },
                                { name: "Preparatory", code: "PRE", desc: "College readiness", color: "bg-amber-50 text-amber-600" },
                            ].map((p, i) => (
                                <Card key={i} className="rounded-3xl border-none shadow-xl shadow-slate-200/50 overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                                    <div className={cn("h-40 flex items-center justify-center text-4xl font-black opacity-80", p.color)}>
                                        {p.code}
                                    </div>
                                    <CardContent className="p-6 bg-white">
                                        <h4 className="text-lg font-black text-[#0F172A] mb-1">{p.name}</h4>
                                        <p className="text-sm font-medium text-slate-500 mb-6">{p.desc}</p>
                                        <Button variant="outline" className="w-full rounded-xl border-slate-100 font-bold text-slate-500 hover:bg-slate-50">Learn More</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section id="contact" className="py-24 px-6 lg:px-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto bg-blue-600 rounded-[48px] p-12 lg:p-24 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative">
                        <div className="absolute top-0 right-0 p-12 opacity-10 blur-2xl">
                            <div className="h-64 w-64 rounded-full bg-white" />
                        </div>
                        <div className="space-y-6 relative z-10 lg:w-3/5">
                            <h2 className="text-4xl lg:text-6xl font-black leading-tight">Ready to join <br/> our community?</h2>
                            <p className="text-blue-100 text-lg font-medium opacity-80">
                                For inquiries about the admission process, financial aid, or to book a campus tour, reach out to our team.
                            </p>
                        </div>
                        <div className="lg:w-2/5 flex flex-col gap-4 relative z-10">
                            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-black py-8 rounded-2xl text-xl shadow-2xl">
                                Contact Admissions
                            </Button>
                            <p className="text-[11px] font-black text-center uppercase tracking-widest text-blue-200">
                                Respond time: &lt; 24 hours
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Premium Footer */}
            <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-8 w-8 text-blue-600" />
                                <span className="text-2xl font-black text-[#0F172A]">EthioEdu</span>
                            </div>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Redefining educational administration in Ethiopia through seamless technology and human-centric design.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Navigation</h4>
                            <ul className="space-y-4 font-bold text-slate-500 text-sm">
                                <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                                <li><Link href="#programs" className="hover:text-blue-600 transition-colors">Programs</Link></li>
                                <li><Link href="#process" className="hover:text-blue-600 transition-colors">Admission</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Reach Us</h4>
                            <ul className="space-y-4 font-bold text-slate-500 text-sm">
                                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-blue-600" /> adms@ethioedu.edu</li>
                                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-blue-600" /> +251 11 123 4567</li>
                                <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-blue-600" /> Bole, Addis Ababa</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">Socials</h4>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-10 w-10 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                                        <div className="h-4 w-4 bg-current" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-400 font-bold text-xs">© 2026 EthioEdu EMS. All rights reserved.</p>
                        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <Link href="#" className="hover:text-blue-600">Privacy Policy</Link>
                             <Link href="#" className="hover:text-blue-600">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
