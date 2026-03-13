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
    Camera
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
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-24">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-3">
                        <Link href="/parent-portal/admission">
                            <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                                <ChevronLeft className="h-6 w-6" />
                            </div>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-[#0F172A]">Student Application</h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Academic Year 2026</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Badge className="bg-blue-50 text-blue-600 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                            New Admission
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-500 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                            Draft Saved
                        </Badge>
                    </div>
                </div>

                {/* Stepper */}
                <div className="grid grid-cols-5 gap-4 mb-12">
                    {steps.map((s) => (
                        <div key={s.id} className="relative">
                            <div className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                step >= s.id ? "bg-blue-600" : "bg-slate-200"
                            )} />
                            <div className="mt-4 flex flex-col items-center sm:items-start">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest mb-1 hidden sm:block",
                                    step >= s.id ? "text-blue-600" : "text-slate-400"
                                )}>Step 0{s.id}</span>
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "h-6 w-6 rounded-lg flex items-center justify-center transition-all",
                                        step === s.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200" :
                                        step > s.id ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                                    )}>
                                        {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold hidden md:block",
                                        step >= s.id ? "text-slate-900" : "text-slate-400"
                                    )}>{s.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-blue-900/5 bg-white overflow-hidden">
                    <CardContent className="p-8 sm:p-14">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-[#0F172A] mb-2">Personal Information</h2>
                                    <p className="text-slate-500 font-medium tracking-tight">Enter the legal details of the student applying.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">First Name</Label>
                                        <Input placeholder="Enter first name" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Last Name</Label>
                                        <Input placeholder="Enter last name" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Gender</Label>
                                        <div className="flex gap-4">
                                            {["Male", "Female"].map(g => (
                                                <button key={g} type="button" className="flex-1 h-14 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 font-bold transition-all">
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Date of Birth</Label>
                                        <Input type="date" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold px-5" />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Address / Home Location</Label>
                                        <Input placeholder="Bole, Woreda 03, Addis Ababa" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-[#0F172A] mb-2">Parent / Guardian Info</h2>
                                    <p className="text-slate-500 font-medium tracking-tight">Details of the primary contact for this student.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Father Name</Label>
                                        <Input placeholder="Enter father's full name" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Mother Name</Label>
                                        <Input placeholder="Enter mother's full name" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Primary Phone</Label>
                                        <Input placeholder="+251 9XX XXX XXX" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Occupation</Label>
                                        <Input placeholder="e.g. Engineer" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Emergency Contact Info</Label>
                                        <Input placeholder="Name and Phone of emergency contact" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-[#0F172A] mb-2">Academic Background</h2>
                                    <p className="text-slate-500 font-medium tracking-tight">Previous schooling and grade selection.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Previous School Name</Label>
                                        <Input placeholder="e.g. Sunshine Academy" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Previous Grade</Label>
                                            <Select>
                                                <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white font-bold">
                                                    <SelectValue placeholder="Select Grade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="kg">KG</SelectItem>
                                                    <SelectItem value="1">Grade 1</SelectItem>
                                                    <SelectItem value="2">Grade 2</SelectItem>
                                                    <SelectItem value="3">Grade 3</SelectItem>
                                                    <SelectItem value="4">Grade 4</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Applying for Grade</Label>
                                            <Select>
                                                <SelectTrigger className="h-14 rounded-2xl border-blue-100 bg-blue-50/50 focus:bg-white font-bold text-blue-600">
                                                    <SelectValue placeholder="Select Target Grade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Grade 1</SelectItem>
                                                    <SelectItem value="2">Grade 2</SelectItem>
                                                    <SelectItem value="3">Grade 3</SelectItem>
                                                    <SelectItem value="4">Grade 4</SelectItem>
                                                    <SelectItem value="5">Grade 5</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
                                    <Info className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-sm font-medium text-amber-700 leading-relaxed">
                                        Note: Applying for a grade significantly higher or lower than the previous grade may require a diagnostic assessment.
                                    </p>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-[#0F172A] mb-2">Document Vault</h2>
                                    <p className="text-slate-500 font-medium tracking-tight">Upload scanned copies of required documents.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Drag & Drop Required Files</Label>
                                    <div className="border-4 border-dashed border-slate-100 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-200 transition-all group cursor-pointer relative overflow-hidden">
                                        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                                        <div className="h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <UploadCloud className="h-10 w-10 text-blue-600" />
                                        </div>
                                        <h4 className="text-xl font-black text-[#0F172A] mb-2">Drop your files here</h4>
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">or browse from your device</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase">Allowed: PDF, JPG, PNG (Max 5MB)</p>
                                    </div>

                                    {/* File List */}
                                    <div className="space-y-3 mt-6">
                                        {["Birth Certificate", "Previous Report Card", "Student Photo", "Parent ID"].map((doc, idx) => {
                                            const isUploaded = files.some(f => f.name.toLowerCase().includes(doc.toLowerCase().split(' ')[0]));
                                            return (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "h-10 w-10 rounded-xl flex items-center justify-center",
                                                            isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"
                                                        )}>
                                                            <FileText className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900">{doc}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Required</p>
                                                        </div>
                                                    </div>
                                                    <Badge className={cn(
                                                        "border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest",
                                                        isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                                                    )}>
                                                        {isUploaded ? "Uploaded" : "Pending"}
                                                    </Badge>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-[#0F172A] mb-2">Review & Submit</h2>
                                    <p className="text-slate-500 font-medium tracking-tight">Final check before your application goes to review.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                                        <button onClick={() => setStep(1)} className="absolute top-6 right-6 h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600">
                                            <X className="h-4 w-4" />
                                        </button>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Student</p>
                                            <p className="text-lg font-black text-slate-900">Beniam Gebre</p>
                                            <p className="text-sm font-medium text-slate-500">Male • 12 Jan 2016</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Grade</p>
                                            <p className="text-lg font-black text-blue-600">Grade 5</p>
                                            <p className="text-sm font-medium text-slate-500">Academic Year 2026</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Documents</p>
                                            <p className="text-lg font-black text-emerald-600">4 / 4 Attached</p>
                                            <p className="text-sm font-medium text-slate-500">Ready for review</p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-600/5 rounded-3xl p-8 border border-blue-100 flex gap-6">
                                        <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                                            <Info className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="font-bold text-slate-900">By submitting, you agree to:</p>
                                            <ul className="text-sm font-medium text-slate-500 space-y-2 list-disc ml-4">
                                                <li>Academic assessment scheduled upon approval.</li>
                                                <li>Initial registration fee is non-refundable.</li>
                                                <li>Official documents must be presented during verification.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between items-center mt-16 pt-10 border-t border-slate-100">
                            {step > 1 ? (
                                <button onClick={prevStep} className="flex items-center gap-2 font-black text-slate-400 hover:text-slate-900 transition-colors">
                                    <ChevronLeft className="h-5 w-5" /> Back
                                </button>
                            ) : <div />}

                            {step < 5 ? (
                                <Button onClick={nextStep} className="h-16 px-12 bg-[#0F172A] hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-200 group">
                                    Next Step <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            ) : (
                                <Link href="/parent-portal/admission">
                                    <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 group">
                                        Submit Application <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    EthioEdu Admission Portal Support: +251 11 123 4567
                </p>
            </div>
        </div>
    );
}
