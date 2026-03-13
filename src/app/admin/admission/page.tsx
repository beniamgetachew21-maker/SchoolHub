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
        { label: "Total Applicants", value: "1,280", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Pending Review", value: "42", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Approved Today", value: "15", icon: FileCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Missing Docs", value: "08", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    const applicants = [
        { id: "APP-001", name: "Saron Abiy", grade: "Grade 5", date: "12 Mar 2026", status: "Pending", email: "saron@family.com" },
        { id: "APP-002", name: "Dawit Tekle", grade: "Grade 1", date: "11 Mar 2026", status: "Reviewing", email: "dawit@mail.et" },
        { id: "APP-003", name: "Meklit Belay", grade: "KG", date: "10 Mar 2026", status: "Approved", email: "belay@work.com" },
        { id: "APP-004", name: "Yonas Kassa", grade: "Grade 10", date: "10 Mar 2026", status: "Rejected", email: "kassa@home.et" },
    ];

    return (
        <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-[#0F172A]">Admissions Overview</h1>
                    <p className="text-slate-500 font-medium">Manage and review student enrollment applications.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold">Export CSV</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-200 px-6">New Application</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <Card key={i} className="rounded-3xl border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0", s.bg)}>
                                <s.icon className={cn("h-7 w-7", s.color)} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                                <p className="text-2xl font-black text-[#0F172A]">{s.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Applicant Table */}
                <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between border-b border-slate-50">
                        <CardTitle className="text-xl font-black text-[#0F172A]">Recent Applications</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input placeholder="Search applicants..." className="pl-10 h-10 w-64 rounded-xl border-slate-100 bg-slate-50 focus:bg-white font-medium text-sm" />
                            </div>
                            <Button variant="outline" size="icon" className="rounded-xl border-slate-100"><Filter className="h-4 w-4" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-none">
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest pl-8">Applicant</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Grade</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-right pr-8">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applicants.map((app) => (
                                    <TableRow key={app.id} className="hover:bg-slate-50/30 border-b border-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedApplicant(app)}>
                                        <TableCell className="pl-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                                                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xs">{app.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-black text-[#0F172A] text-sm group-hover:text-blue-600 transition-colors">{app.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">{app.id} • {app.date}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] px-2.5 py-1">
                                                {app.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "border-none font-black text-[10px] px-2.5 py-1",
                                                app.status === "Approved" ? "bg-emerald-100 text-emerald-600" :
                                                app.status === "Pending" ? "bg-amber-100 text-amber-600" :
                                                app.status === "Reviewing" ? "bg-blue-100 text-blue-600" : "bg-rose-100 text-rose-600"
                                            )}>
                                                {app.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600"><MoreVertical className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="p-8 flex justify-center border-t border-slate-50">
                            <Button variant="ghost" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600">View All Applications</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Document Review Section (Conditional) */}
                <div className="lg:col-span-1 space-y-6">
                    {selectedApplicant ? (
                        <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-blue-900/5 bg-white overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500">
                            <CardHeader className="p-8 pb-4 border-b border-slate-50 relative">
                                <button onClick={() => setSelectedApplicant(null)} className="absolute top-8 right-8 text-slate-400 hover:text-rose-600 transition-colors"><XCircle className="h-6 w-6" /></button>
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="h-24 w-24 border-4 border-blue-50 shadow-xl mb-4">
                                        <AvatarFallback className="bg-blue-600 text-white font-black text-3xl">{selectedApplicant.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-2xl font-black text-[#0F172A]">{selectedApplicant.name}</CardTitle>
                                    <Badge className="mt-2 bg-blue-50 text-blue-600 border-none font-black text-xs px-4 py-1.5 rounded-full">{selectedApplicant.id}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Grade</p>
                                        <p className="font-black text-[#0F172A]">{selectedApplicant.grade}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Submitted</p>
                                        <p className="font-black text-[#0F172A]">{selectedApplicant.date}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <FileCheck className="h-4 w-4 text-blue-600" /> Documents
                                    </h4>
                                    <div className="space-y-2">
                                        {["Birth Certificate", "Transcript", "Passport Photo"].map((doc, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-white transition-colors cursor-pointer group">
                                                <span className="text-xs font-bold text-slate-600">{doc}</span>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-400 hover:text-blue-600"><Eye className="h-3.5 w-3.5" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-400 hover:text-blue-600"><Download className="h-3.5 w-3.5" /></Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="rounded-2xl border-rose-200 text-rose-600 font-black hover:bg-rose-50 h-14">REJECT</Button>
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 h-14">APPROVE</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-40 grayscale pointer-events-none">
                            <div className="h-32 w-32 bg-slate-100 rounded-[40px] flex items-center justify-center mb-6">
                                <Users className="h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Select an Applicant</h3>
                            <p className="text-sm font-medium text-slate-500 mt-2">Click on a row to review documents and take action.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
