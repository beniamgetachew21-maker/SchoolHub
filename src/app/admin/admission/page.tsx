"use client";

import React, { useState } from "react";
import { 
    Users, 
    FileCheck, 
    Clock, 
    AlertCircle, 
    Search, 
    Filter, 
    MoreVertical, 
    CheckCircle, 
    XCircle, 
    Eye,
    Download,
    Mail,
    Phone,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function AdminAdmissionDashboard() {
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

    const stats = [
        { label: "Total Intake", value: "1,280", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Pending Verification", value: "42", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "Approved (24h)", value: "15", icon: FileCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Data Anomalies", value: "08", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
    ];

    const applicants = [
        { id: "APP-001", name: "Saron Abiy", grade: "Grade 5", date: "12 Mar 2026", status: "Pending", email: "saron@family.com" },
        { id: "APP-002", name: "Dawit Tekle", grade: "Grade 1", date: "11 Mar 2026", status: "Reviewing", email: "dawit@mail.et" },
        { id: "APP-003", name: "Meklit Belay", grade: "KG", date: "10 Mar 2026", status: "Approved", email: "belay@work.com" },
        { id: "APP-004", name: "Yonas Kassa", grade: "Grade 10", date: "10 Mar 2026", status: "Rejected", email: "kassa@home.et" },
    ];

    return (
        <div className="p-12 space-y-12 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
            {/* Mesh Background Cells */}
            <div className="absolute top-0 right-0 w-full h-full mesh-gradient opacity-10 -z-10 blur-3xl" />
            
            <div className="flex justify-between items-end relative z-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1 rounded-full border border-blue-100">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Admin Intelligence Active</span>
                    </div>
                    <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter">Admissions <span className="text-blue-600">Control</span></h1>
                    <p className="text-slate-500 font-medium text-lg italic">Orchestrating the next generation of academic excellence.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-white bg-white/50 backdrop-blur-md shadow-sm font-black text-sm uppercase tracking-widest">Global Export</Button>
                    <Button className="h-14 px-10 bg-[#0F172A] hover:bg-black text-white font-black rounded-2xl shadow-2xl shadow-slate-900/10 text-sm uppercase tracking-widest group">
                        New Application <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                    <Card key={i} className="premium-glass-card rounded-[32px] border-white/80 shadow-xl shadow-blue-900/5 overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-12 transition-transform duration-500", s.bg)}>
                                <s.icon className={cn("h-8 w-8", s.color)} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{s.label}</p>
                                <p className="text-3xl font-black text-[#0F172A] racking-tighter">{s.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                {/* Applicant Table */}
                <Card className="lg:col-span-8 premium-glass-card rounded-[4rem] border-white/80 shadow-2xl shadow-blue-900/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] -z-10">
                        <Users className="h-64 w-64" />
                    </div>
                    <CardHeader className="p-10 pb-6 flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-black text-[#0F172A] tracking-tight">Real-time Pipeline</CardTitle>
                        <div className="flex gap-3">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input placeholder="Identity Search..." className="pl-12 h-12 w-80 rounded-2xl border-slate-100 bg-white/50 focus:bg-white focus:ring-[8px] focus:ring-blue-50 transition-all font-bold text-sm" />
                            </div>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-slate-100 hover:bg-white"><Filter className="h-5 w-5" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50 backdrop-blur-sm">
                                <TableRow className="border-none">
                                    <TableHead className="py-6 font-black text-[11px] uppercase tracking-widest pl-10">Candidate Profile</TableHead>
                                    <TableHead className="py-6 font-black text-[11px] uppercase tracking-widest text-center">Grade</TableHead>
                                    <TableHead className="py-6 font-black text-[11px] uppercase tracking-widest text-center">Verification</TableHead>
                                    <TableHead className="py-6 font-black text-[11px] uppercase tracking-widest text-right pr-10">Management</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applicants.map((app) => (
                                    <TableRow key={app.id} className="hover:bg-blue-50/30 border-b border-white transition-colors group cursor-pointer" onClick={() => setSelectedApplicant(app)}>
                                        <TableCell className="pl-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-14 w-14 border-2 border-white shadow-xl transition-all group-hover:ring-4 group-hover:ring-blue-50">
                                                    <AvatarFallback className="bg-[#0F172A] text-white font-black text-sm">{app.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-black text-[#0F172A] text-lg group-hover:text-blue-600 transition-colors tracking-tight">{app.name}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{app.id} • Registered {app.date}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className="bg-blue-600 text-white border-none font-black text-[10px] px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/10">
                                                {app.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "border-none font-black text-[11px] px-4 py-2 rounded-xl uppercase tracking-tighter",
                                                app.status === "Approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                                app.status === "Pending" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                                app.status === "Reviewing" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                                            )}>
                                                {app.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-300 hover:text-blue-600 hover:bg-blue-50"><Eye className="h-5 w-5" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Detail View Pane */}
                <div className="lg:col-span-4 space-y-8">
                    {selectedApplicant ? (
                        <Card className="premium-glass-card rounded-[4rem] border-white/80 shadow-[0_32px_120px_rgba(0,0,0,0.06)] bg-white/60 overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-700">
                            <CardHeader className="p-12 pb-6 relative text-center">
                                <button onClick={() => setSelectedApplicant(null)} className="absolute top-10 right-10 h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:rotate-90 transition-all duration-500"><XCircle className="h-6 w-6" /></button>
                                <div className="space-y-6">
                                    <Avatar className="h-32 w-32 border-[6px] border-white shadow-2xl mx-auto ring-1 ring-slate-100">
                                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-4xl">{selectedApplicant.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-4xl font-black text-[#0F172A] tracking-tighter">{selectedApplicant.name}</CardTitle>
                                        <div className="flex items-center justify-center gap-2 mt-3">
                                            <Badge className="bg-blue-600 uppercase tracking-widest text-[9px] font-black px-3 py-1.5 rounded-full">{selectedApplicant.id}</Badge>
                                            <div className="h-1 w-1 rounded-full bg-slate-300" />
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{selectedApplicant.grade}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-12 space-y-12">
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Evidence Files</h4>
                                    <div className="space-y-3">
                                        {["Academic Record", "Identity Certificate", "Medical Clearance"].map((doc, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-50 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-0.5 transition-all cursor-pointer group">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                                        <FileCheck className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-sm font-black text-[#0F172A] tracking-tight">{doc}</span>
                                                </div>
                                                <div className="flex gap-1.5">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-300 hover:text-blue-600 hover:bg-blue-50"><Eye className="h-4.5 w-4.5" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-300 hover:text-blue-600 hover:bg-blue-50"><Download className="h-4.5 w-4.5" /></Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-slate-50 grid grid-cols-2 gap-6">
                                    <Button variant="outline" className="rounded-[24px] border-slate-200 text-[#0F172A] font-black hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 h-20 transition-all uppercase tracking-widest text-xs">Decline</Button>
                                    <Button className="bg-[#0F172A] hover:bg-black text-white font-black rounded-[24px] shadow-2xl shadow-slate-900/10 h-20 transition-all active:scale-95 uppercase tracking-widest text-xs">Verify Entry</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center relative">
                            <div className="absolute inset-0 bg-blue-50/30 rounded-[4rem] border-4 border-dashed border-slate-100 opacity-50" />
                            <div className="h-32 w-32 bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 flex items-center justify-center mb-8 relative z-10">
                                <Users className="h-12 w-12 text-blue-100 animate-pulse" />
                            </div>
                            <h3 className="text-3xl font-black text-[#0F172A] tracking-tighter relative z-10">Select Profile</h3>
                            <p className="text-slate-400 font-medium text-lg mt-3 max-w-xs relative z-10 leading-relaxed italic">Choose a candidate timeline to initiate verification protocols.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="pt-20 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                <span>System Architecture v4.2.0</span>
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    Secure Distributed Infrastructure
                </div>
            </div>
        </div>
    );
}
