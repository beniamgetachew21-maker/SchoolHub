"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
    User, 
    Users, 
    BookOpen, 
    UploadCloud, 
    Eye, 
    ChevronRight, 
    ChevronLeft,
    CheckCircle2,
    GraduationCap,
    Info,
    AlertCircle,
    X,
    FileText,
    Camera,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StudentApplicationForm() {
    const [step, setStep] = useState(1);
    const [files, setFiles] = useState<{name: string, status: string}[]>([]);

    const steps = [
        { id: 1, name: "Personal Info", icon: User },
        { id: 2, name: "Parent Info", icon: Users },
        { id: 3, name: "Academic", icon: BookOpen },
        { id: 4, name: "Documents", icon: UploadCloud },
        { id: 5, name: "Review", icon: Eye },
    ];

    const nextStep = () => setStep(s => Math.min(s + 1, 5));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map(f => ({ name: f.name, status: "Uploaded" }));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 lg:px-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-100 rounded-full opacity-30 -z-10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] mesh-gradient opacity-10 -z-10 blur-3xl" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/parent-portal/admission">
                            <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all hover:shadow-md">
                                <ChevronLeft className="h-6 w-6" />
                            </div>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Student Application</h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Academic Year 2026/27</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-2 rounded-full shadow-sm border border-slate-100">
                        <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-none">
                            New Admission
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-500 border-none px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-none">
                            Draft Saved
                        </Badge>
                    </div>
                </div>

                {/* Stepper */}
                <div className="grid grid-cols-5 gap-4 mb-12">
                    {steps.map((s) => (
                        <div key={s.id} className="relative">
                            <div className={cn(
                                "h-1.5 rounded-full transition-all duration-700 ease-in-out",
                                step >= s.id ? "bg-emerald-500" : "bg-slate-200"
                            )} />
                            <div className="mt-4 flex flex-col items-center sm:items-start group">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest mb-1 hidden sm:block transition-colors",
                                    step >= s.id ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                                )}>Step 0{s.id}</span>
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-500",
                                        step === s.id ? "bg-[#172D13] text-white shadow-xl shadow-emerald-900/20 scale-110" :
                                        step > s.id ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                                    )}>
                                        {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold hidden md:block transition-colors",
                                        step === s.id ? "text-[#172D13] scale-105" :
                                        step > s.id ? "text-slate-900" : "text-slate-400"
                                    )}>{s.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <Card className="rounded-[3rem] border border-white/80 shadow-2xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl overflow-hidden relative">
                    {/* Corner Decoration */}
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none -z-10">
                        <GraduationCap className="h-48 w-48 text-emerald-600" />
                    </div>

                    <CardContent className="p-10 sm:p-16 relative z-10">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                                        <User className="h-4 w-4 text-emerald-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Applicant Details</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-[#0F172A] tracking-tight mb-3">Personal Information</h2>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">Please provide the legal details of the student applicant as they appear on official documents.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">First Name (Legal)</Label>
                                        <Input placeholder="e.g. Dawit" className="h-14 rounded-2xl border-slate-200 bg-white focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Last Name (Family Name)</Label>
                                        <Input placeholder="e.g. Mekonnen" className="h-14 rounded-2xl border-slate-200 bg-white focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Gender</Label>
                                        <div className="flex gap-4">
                                            {["Male", "Female"].map(g => (
                                                <button key={g} type="button" className="flex-1 h-14 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 focus:border-emerald-600 focus:bg-emerald-50 hover:bg-emerald-50/50 font-bold text-slate-700 hover:text-emerald-700 transition-all shadow-sm">
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Date of Birth</Label>
                                        <Input type="date" className="h-14 rounded-2xl border-slate-200 bg-white focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all text-slate-700" />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Primary Residence / Home Address</Label>
                                        <Input placeholder="e.g. Bole Subcity, Woreda 03, House No. 124, Addis Ababa" className="h-14 rounded-2xl border-slate-200 bg-white focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                                        <Users className="h-4 w-4 text-emerald-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Guardianship</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-[#0F172A] tracking-tight mb-3">Parent Information</h2>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">Enter the contact details for the primary guardians. These will be used for official communications.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Father's Full Name</Label>
                                        <Input placeholder="" className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Mother's Full Name</Label>
                                        <Input placeholder="" className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Primary Phone Number</Label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+251</span>
                                            <Input placeholder="9XX XXX XXX" className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg pl-16 pr-5 shadow-sm transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Primary Email Address</Label>
                                        <Input type="email" placeholder="email@example.com" className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all" />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Emergency Contact (Different from above)</Label>
                                        <div className="flex gap-4">
                                            <Input placeholder="Contact Name" className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all flex-[2]" />
                                            <Input placeholder="Phone Number" className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all flex-[1]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                                        <BookOpen className="h-4 w-4 text-emerald-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Educational History</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-[#0F172A] tracking-tight mb-3">Academic Details</h2>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">Provide details about the applicant's previous schooling and the grade they are applying for.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Previous School Attended</Label>
                                        <Input placeholder="e.g. International Community School" className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Last Grade Completed</Label>
                                            <Select>
                                                <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 font-bold text-lg px-5 shadow-sm transition-all">
                                                    <SelectValue placeholder="Select Grade" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-slate-200 shadow-xl">
                                                    <SelectItem value="kg">Kindergarten</SelectItem>
                                                    <SelectItem value="1">Grade 1</SelectItem>
                                                    <SelectItem value="2">Grade 2</SelectItem>
                                                    <SelectItem value="3">Grade 3</SelectItem>
                                                    <SelectItem value="4">Grade 4</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3 relative">
                                            <Label className="text-[11px] font-black uppercase text-emerald-600 tracking-widest ml-1">Applying For Year/Grade</Label>
                                            <Select>
                                                <SelectTrigger className="h-14 rounded-2xl border-emerald-200 bg-emerald-50 focus:border-emerald-600 focus:ring-emerald-500/30 font-black text-lg text-emerald-800 px-5 shadow-sm transition-all">
                                                    <SelectValue placeholder="Select Target Grade" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-emerald-100 shadow-xl">
                                                    <SelectItem value="1" className="font-bold">Grade 1</SelectItem>
                                                    <SelectItem value="2" className="font-bold">Grade 2</SelectItem>
                                                    <SelectItem value="3" className="font-bold">Grade 3</SelectItem>
                                                    <SelectItem value="4" className="font-bold">Grade 4</SelectItem>
                                                    <SelectItem value="5" className="font-bold">Grade 5</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200 flex gap-5 shadow-sm mt-8 items-start">
                                    <Info className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-bold text-amber-900 mb-1">Assessment Notice</h4>
                                        <p className="text-sm font-medium text-amber-700/80 leading-relaxed">
                                            Applying for a grade that skips the typical sequence (e.g., from Grade 2 directly to Grade 4) will trigger a mandatory academic diagnostic assessment to ensure the student's success.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                                        <UploadCloud className="h-4 w-4 text-emerald-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Verification</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-[#0F172A] tracking-tight mb-3">Document Vault</h2>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">Upload clear, legible scans or photos of the required official documents to expedite your application.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="border-2 border-dashed border-emerald-200/60 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center bg-emerald-50/30 hover:bg-emerald-50/80 hover:border-emerald-400 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                                        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileUpload} />
                                        <div className="h-20 w-20 bg-white rounded-3xl shadow-xl shadow-emerald-900/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative">
                                            <div className="absolute inset-0 bg-emerald-400 opacity-20 blur-xl rounded-full scale-150 group-hover:opacity-40 transition-opacity" />
                                            <UploadCloud className="h-10 w-10 text-emerald-600 relative z-10" />
                                        </div>
                                        <h4 className="text-xl font-black text-[#0F172A] mb-2">Drop your files here</h4>
                                        <p className="text-sm font-medium text-slate-500">or click to browse from your device</p>
                                        <div className="mt-6 flex gap-3 justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">PDF</span>
                                            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">JPG</span>
                                            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">PNG</span>
                                        </div>
                                    </div>

                                    {/* Required Documents List */}
                                    <div className="space-y-4 mt-8">
                                        <h4 className="text-sm font-bold text-slate-900 mb-2">Required Submissions</h4>
                                        {["Valid Birth Certificate", "Recent Academic Transcript", "Student Passport Photo", "Parent/Guardian ID Card"].map((doc, idx) => {
                                            const isUploaded = files.some(f => f.name.toLowerCase().includes(doc.toLowerCase().split(' ')[0]));
                                            return (
                                                <div key={idx} className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors group">
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "h-12 w-12 rounded-[16px] flex items-center justify-center transition-colors",
                                                            isUploaded ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                                                        )}>
                                                            {idx === 2 ? <Camera className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                                                        </div>
                                                        <div>
                                                            <p className="text-base font-black text-slate-900 tracking-tight">{doc}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mandatory</p>
                                                        </div>
                                                    </div>
                                                    <Badge className={cn(
                                                        "px-4 py-2 font-black text-[10px] uppercase tracking-widest transition-all",
                                                        isUploaded 
                                                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 border-none" 
                                                            : "bg-white border border-slate-200 text-slate-400 shadow-sm"
                                                    )}>
                                                        {isUploaded ? (
                                                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Uploaded</span>
                                                        ) : "Pending"}
                                                    </Badge>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                                        <Eye className="h-4 w-4 text-emerald-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Final Confirmation</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-[#0F172A] tracking-tight mb-3">Review & Submit</h2>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">Please review the critical details of your application before submitting it to the admissions board.</p>
                                </div>

                                <div className="space-y-8">
                                    {/* Summary Card */}
                                    <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-700" />
                                        <button onClick={() => setStep(1)} className="absolute top-8 right-8 h-10 w-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all z-10">
                                            <X className="h-5 w-5" />
                                        </button>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                                            <div>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><User className="h-3.5 w-3.5"/> Applicant</p>
                                                <p className="text-2xl font-black text-slate-900 tracking-tight">Dawit Mekonnen</p>
                                                <p className="text-sm font-bold text-slate-500 mt-1">Male • Born 12-Jan-2016</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5"/> Applying For</p>
                                                <p className="text-2xl font-black text-emerald-700 tracking-tight">Grade 5</p>
                                                <p className="text-sm font-bold text-slate-500 mt-1">Academic Year 2026/27</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><UploadCloud className="h-3.5 w-3.5"/> Documentation</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-2xl font-black text-slate-900 tracking-tight">{files.length}</p>
                                                    <span className="text-sm font-bold text-slate-500 self-end mb-1">Files Attached</span>
                                                </div>
                                                <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Ready for review</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms Agreement */}
                                    <div className="bg-[#172D13] rounded-3xl p-8 sm:p-10 flex gap-6 sm:gap-8 items-start relative overflow-hidden shadow-2xl shadow-emerald-900/20">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <ShieldCheck className="h-32 w-32 text-emerald-200" />
                                        </div>
                                        <div className="h-14 w-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30 relative z-10">
                                            <Info className="h-7 w-7" />
                                        </div>
                                        <div className="space-y-4 relative z-10">
                                            <p className="text-lg font-black text-white">Application Agreement</p>
                                            <div className="text-sm font-medium text-emerald-100/70 space-y-3">
                                                <p>By submitting this formal application, you acknowledge and agree to the following conditions:</p>
                                                <ul className="space-y-2 list-disc ml-5 pl-1">
                                                    <li>All submitted information is entirely accurate to the best of your knowledge.</li>
                                                    <li>An academic diagnostic assessment will be scheduled subject to initial approval.</li>
                                                    <li>Original physical documents must be presented during the final registration phase.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Footer */}
                        <div className="flex justify-between items-center mt-16 pt-10 border-t border-slate-100">
                            {step > 1 ? (
                                <button onClick={prevStep} className="flex items-center gap-3 font-black text-slate-400 hover:text-slate-900 transition-colors h-14 px-6 rounded-2xl hover:bg-slate-50">
                                    <ChevronLeft className="h-5 w-5" /> Go Back
                                </button>
                            ) : <div />}

                            {step < 5 ? (
                                <Button onClick={nextStep} className="h-16 px-12 bg-[#0F172A] hover:bg-slate-800 text-white font-black text-base rounded-[20px] shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 transition-all group">
                                    Continue <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                                </Button>
                            ) : (
                                <Link href="/parent-portal/admission">
                                    <Button className="h-16 px-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-[20px] shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-1 transition-all duration-300 group">
                                        Submit Application <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-12 text-center flex flex-col items-center justify-center gap-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        EthioEdu Admission Portal • Secure 256-bit Encryption
                    </p>
                    <div className="flex gap-2">
                        <div className="h-1 w-1 bg-slate-300 rounded-full" />
                        <div className="h-1 w-1 bg-slate-300 rounded-full" />
                        <div className="h-1 w-1 bg-slate-300 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

import { ShieldCheck } from "lucide-react";
