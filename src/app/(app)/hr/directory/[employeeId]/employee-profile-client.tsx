"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ArrowLeft, Edit, Briefcase, Mail, Phone, Calendar, User, FileText,
    BookUser, Building, UserSquare, Users, Heart, HeartPulse, TrendingUp,
    BadgeCheck, Clock, Wallet, Shield, ChevronRight, MapPin, Globe, CheckCircle2,
    AlertCircle, Lock, Download, Upload, ExternalLink, ChevronDown, Bell,
    Star, MessageSquare, BarChart2, GraduationCap, ClipboardList, Send, MoreHorizontal,
    Search, MousePointer2, Plus, CalendarDays, History
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EditEmployeeForm } from "@/components/forms/edit-employee-form";
import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type Employee, type LeaveRequest, type LeavePolicy, type AssetAllocation, type InventoryItem } from "@prisma/client";
import { updateEmployeeAction } from "@/lib/actions";
import { cn } from "@/lib/utils";

interface EmployeeProfileClientProps {
    employee: Employee;
    leaveRequests: LeaveRequest[];
    leavePolicies: LeavePolicy[];
    assetAllocations: AssetAllocation[];
    inventoryItems: InventoryItem[];
    managers: { employeeId: string; name: string }[];
}

function calculateTenure(dateOfJoining: string) {
    const start = new Date(dateOfJoining);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    const totalMonths = years * 12 + months;
    if (totalMonths < 12) return `${totalMonths} Months`;
    return `${Math.floor(totalMonths / 12)}.${Math.floor((totalMonths % 12) / 1.2)} Years`;
}

export function EmployeeProfileClient({
    employee,
    leaveRequests,
    leavePolicies,
    assetAllocations,
    inventoryItems,
    managers,
}: EmployeeProfileClientProps) {
    const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
    const managerName = managers.find((m) => m.employeeId === employee.lineManager)?.name || "Admin Alex";
    const tenure = calculateTenure(employee.dateOfJoining);

    const handleEditEmployee = async (updatedEmployee: any) => {
        await updateEmployeeAction(updatedEmployee);
        setIsEditSheetOpen(false);
    };

    return (
        <Tabs defaultValue="professional" className="flex flex-col min-h-screen bg-[#F8FAFC]">
            {/* ── Dark green header - single, full-bleed, no global header ── */}
            <div className="bg-[#163D2D] text-white pt-6 pb-0 px-8 w-full">
                <div className="max-w-[1600px] mx-auto w-full">

                    {/* Top nav row */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <div className="flex items-center gap-4">
                            <Link href="/hr/directory" className="md:hidden">
                                <ArrowLeft className="h-5 w-5 text-white/70" />
                            </Link>
                            <span className="text-xl font-bold tracking-wide text-white uppercase">
                                EMPLOYEE 360&deg; VIEW
                                <span className="text-white/50"> - {employee.name.toUpperCase()}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 rounded-md h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full relative h-8 w-8">
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 border border-[#163D2D] rounded-full" />
                            </Button>
                            <Avatar className="h-8 w-8 rounded-full border border-white/20">
                                <AvatarImage src="/avatars/tadesse.jpg" />
                                <AvatarFallback className="bg-emerald-600 font-bold text-xs text-white">TW</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    {/* Title + Insight Pills + Deactivate */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
                        {/* Left: breadcrumb + title + description */}
                        <div>
                            <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-3">
                                <Link href="/hr/directory" className="hover:text-white transition-colors">HR Module</Link>
                                <ChevronRight className="h-3 w-3" />
                                <Link href="/hr/directory" className="hover:text-white transition-colors">Directory</Link>
                                <ChevronRight className="h-3 w-3" />
                                <span className="text-white/90">Profile</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{employee.name}</h1>
                            <p className="text-white/70 text-sm max-w-xl leading-relaxed">
                                Here&apos;s your institutional overview for March 2026. Manage students, monitor, and assessments seamlessly.
                            </p>
                        </div>

                        {/* Right: Insight Pills + Deactivate button */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4">
                            {/* Insight Pills */}
                            <div className="flex flex-col gap-2">
                                <span className="text-[13px] font-medium text-white">Insight Pills</span>
                                <div className="flex flex-wrap gap-2">
                                    <div className="bg-[#D3E3DA] text-[#163D2D] rounded-full px-3 py-1.5 flex items-center gap-2 font-bold text-[11px] border border-[#163D2D]/20 shadow-sm">
                                        <div className="bg-[#163D2D] rounded-full h-4 w-4 flex items-center justify-center text-[9px] font-bold text-white">T</div>
                                        Tenure: {tenure}
                                    </div>
                                    <div className="bg-[#F8E7D3] text-[#4A2D1B] rounded-full px-3 py-1.5 flex items-center gap-1.5 font-bold text-[11px] border border-[#4A2D1B]/20 shadow-sm">
                                        Performance Rating: 4.2
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                    </div>
                                    <div className="bg-[#EBDCE0] text-[#3D2228] rounded-full px-3 py-1.5 flex items-center gap-2 font-bold text-[11px] border border-[#3D2228]/20 shadow-sm">
                                        Next Review: May 15
                                    </div>
                                </div>
                            </div>

                            {/* Deactivate Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="bg-white text-slate-800 font-bold hover:bg-slate-50 rounded-xl px-4 h-9 shadow-sm border-none flex items-center gap-2">
                                        Deactivate Profile <ChevronDown className="h-4 w-4 text-slate-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[180px] rounded-xl">
                                    <DropdownMenuItem className="text-rose-600 font-bold cursor-pointer py-2">Suspend Account</DropdownMenuItem>
                                    <DropdownMenuItem className="text-slate-700 font-bold cursor-pointer py-2">Mark as Resigned</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Tabs sit at the very bottom of the green header */}
                    <TabsList className="bg-transparent border-none p-0 flex justify-start gap-1 w-full rounded-none h-auto">
                        {[
                            { value: "professional", label: "Professional & Core HR" },
                            { value: "academic", label: "Academic Excellence (Performance)" },
                            { value: "time", label: "Time & Attendance" },
                            { value: "skills", label: "Skills & PD" },
                            { value: "payroll", label: "Payroll & Benefits" },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:bg-[#F8FAFC] data-[state=active]:text-[#163D2D] data-[state=active]:shadow-none text-emerald-100/80 hover:text-white rounded-t-xl rounded-b-none px-6 py-3.5 font-bold text-[14px] border-0 transition-all"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            </div>

            {/* ── Main two-column layout ── */}
            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 pt-6 pb-12">
                <div className="flex flex-col xl:flex-row gap-6 items-start">

                    {/* ── LEFT: Tab Content ── */}
                    <div className="flex-1 w-full min-w-0">
                        <TabsContent value="professional" className="mt-0 space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* ── Col 1 ── */}
                                <div className="space-y-6">

                                    {/* Employment Details */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-black text-slate-900">Employment Details</h3>
                                            <div className="h-6 w-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-200">
                                                <Edit className="h-3 w-3" />
                                            </div>
                                        </div>
                                        <div className="space-y-3 text-sm font-medium text-slate-700">
                                            <p>Contract type: <span className="font-bold text-slate-900">{employee.jobType || "Full-time"}</span></p>
                                            <p>Official work hours: <span className="font-bold text-slate-900">10:00 AM - 12:00 AM</span></p>
                                            <a href="#" className="inline-flex items-center text-[#114C35] hover:underline font-bold mt-2">
                                                <FileText className="h-4 w-4 mr-1.5 text-rose-500" /> Job Description PDF <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Required Documents */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-black text-slate-900">Required Documents (Checklist)</h3>
                                            <div className="h-6 w-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-200">
                                                <Edit className="h-3 w-3" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100/50">
                                                <p className="text-[11px] font-black uppercase text-slate-600 mb-1">Signed Contract</p>
                                                <p className="text-emerald-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Uploaded</p>
                                                <button className="text-[10px] font-bold text-slate-500 mt-2 flex items-center hover:text-slate-700"><Download className="h-3 w-3 mr-1" /> Download</button>
                                            </div>
                                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100/50">
                                                <p className="text-[11px] font-black uppercase text-slate-600 mb-1">Background Check</p>
                                                <p className="text-emerald-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Uploaded</p>
                                            </div>
                                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                                                <p className="text-[11px] font-black uppercase text-slate-600 mb-1">Tax Forms</p>
                                                <p className="text-amber-600 font-bold text-xs flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Pending Review</p>
                                                <button className="text-[10px] font-bold text-slate-500 mt-2 flex items-center hover:text-slate-700"><Upload className="h-3 w-3 mr-1" /> Upload New</button>
                                            </div>
                                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100/50">
                                                <p className="text-[11px] font-black uppercase text-slate-600 mb-1">Photo ID</p>
                                                <p className="text-emerald-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Uploaded</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* ── Col 2 ── */}
                                <div className="space-y-6">

                                    {/* Reporting Structure */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <h3 className="text-lg font-black text-slate-900 mb-6">Reporting Structure</h3>
                                        <div className="space-y-4">
                                           <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                               <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">AA</div>
                                               <div>
                                                   <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Manager</p>
                                                   <p className="text-sm font-black text-slate-900">{managerName}</p>
                                               </div>
                                           </div>
                                           <div className="ml-6 border-l-2 border-emerald-100 pl-6 space-y-4 pt-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">KA</div>
                                                    <p className="text-sm font-bold text-slate-700">{employee.name} (You)</p>
                                                </div>
                                           </div>
                                        </div>
                                    </div>

                                    {/* Internal Timeline */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <h3 className="text-lg font-black text-slate-900 mb-6">Recent Activity</h3>
                                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                            {[1, 2].map((i) => (
                                                <div key={i} className="relative flex items-center gap-4 group">
                                                    <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-emerald-500 shadow shrink-0" />
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">Profile Update - {employee.name.split(" ")[0]}</h4>
                                                        <span className="text-xs font-medium text-slate-500">{i * 2} days ago</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="academic" className="mt-0 space-y-6">
                            {/* Performance Snapshot Header */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                                        <Star className="h-8 w-8 fill-current" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-black text-slate-900">4.5★</h3>
                                            <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold text-[10px]">Consistent Over-performer</Badge>
                                        </div>
                                        <p className="text-sm font-medium text-slate-500">Recent review based on Q1 2026 milestones.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="text-right border-r border-slate-100 pr-4">
                                        <p className="text-[10px] font-black uppercase text-slate-400">Tenure</p>
                                        <p className="text-sm font-black text-slate-900">{tenure}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-slate-400">Milestones</p>
                                        <p className="text-sm font-black text-slate-900">12 Achieved</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                     {/* Goal Tracking & KPIs */}
                                     <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-black text-slate-900">Goal Tracking & KPIs</h3>
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><TrendingUp className="h-4 w-4" /></Button>
                                        </div>
                                        <div className="space-y-6">
                                            {[
                                                { label: "Student Engagement Rate", pct: 85, color: "bg-emerald-500", target: "90%" },
                                                { label: "Curriculum Completion", pct: 60, color: "bg-blue-500", target: "100%" },
                                                { label: "Assessment Turnaround", pct: 92, color: "bg-amber-500", target: "95%" },
                                            ].map((g, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                                                        <span>{g.label}</span>
                                                        <span className="text-slate-400">Target: {g.target}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-2.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className={cn("h-full rounded-full transition-all duration-1000", g.color)} style={{ width: `${g.pct}%` }} />
                                                        </div>
                                                        <span className="text-xs font-black text-slate-900 w-8">{g.pct}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Feedback & Growth */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <h3 className="text-lg font-black text-slate-900 mb-6">Feedback & Growth</h3>
                                        <div className="space-y-4">
                                            {[
                                                { author: "Sarah Johnson", role: "Peer Teacher", text: "Excellent collaboration on the Science Fair project. Very organized.", color: "bg-indigo-50 text-indigo-600" },
                                                { author: "Admin Alex", role: "Supervisor", text: "Exceptional improvement in digital curriculum delivery this semester.", color: "bg-emerald-50 text-emerald-600" }
                                            ].map((f, i) => (
                                                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className={cn("h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px]", f.color)}>
                                                                {f.author.split(' ').map(n=>n[0]).join('')}
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-black text-slate-900">{f.author}</p>
                                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{f.role}</p>
                                                            </div>
                                                        </div>
                                                        <MessageSquare className="h-3 w-3 text-slate-300" />
                                                    </div>
                                                    <p className="text-xs font-medium text-slate-600 italic leading-relaxed">"{f.text}"</p>
                                                </div>
                                            ))}
                                            <Button variant="outline" className="w-full border-dashed border-slate-300 text-slate-500 font-bold text-xs h-9">
                                                View All Feedback Logs
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Teacher Specific Metrics (Conditional Mock) */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-black text-slate-900">Academic Metrics (Teacher View)</h3>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600"><GraduationCap className="h-4 w-4" /></Button>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-[11px] font-black uppercase text-slate-400 mb-3">Currently Taught Subjects</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Biology - Grade 11", "General Science - Grade 9", "Life Sciences - Grade 12"].map(s => (
                                                        <Badge key={s} className="bg-emerald-50 text-emerald-700 border-none px-3 py-1 font-bold text-xs">{s}</Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[11px] font-black uppercase text-slate-400 mb-4">Student Outcomes Trend</p>
                                                <div className="h-32 w-full bg-slate-50/50 rounded-xl border border-slate-100 p-4 relative">
                                                    {/* SVG Line Graph Mock */}
                                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                                        <defs>
                                                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                                            </linearGradient>
                                                        </defs>
                                                        <path d="M0 35 Q 25 25, 50 28 T 100 10 V 40 H 0 Z" fill="url(#lineGrad)" />
                                                        <path d="M0 35 Q 25 25, 50 28 T 100 10" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                                                        {/* Points */}
                                                        <circle cx="0" cy="35" r="1.5" fill="#10b981" />
                                                        <circle cx="50" cy="28" r="1.5" fill="#10b981" />
                                                        <circle cx="100" cy="10" r="1.5" fill="#10b981" />
                                                    </svg>
                                                    <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                                                        <span>SEPT</span>
                                                        <span>JAN</span>
                                                        <span>MAR</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100">
                                                <p className="text-[11px] font-black uppercase text-slate-400 mb-3">Curriculum Contributions</p>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500"><ClipboardList className="h-4 w-4" /></div>
                                                        <div>
                                                            <p className="text-xs font-black text-slate-800">New Biology Resource Kit</p>
                                                            <p className="text-[10px] font-bold text-slate-400">Added to Global Curriculum Store</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Competencies */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <h3 className="text-lg font-black text-slate-900 mb-4">Core Competencies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {["Pedagogy", "Classroom Management", "Digital Literacy", "Curriculum Design", "Collaboration", "Student Mentorship"].map(skill => (
                                                <Badge key={skill} className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none px-3 py-1 font-bold text-xs">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="time" className="mt-0 space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Leave Overview Pills */}
                                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black text-slate-900">Leave Overview</h3>
                                        <Button variant="outline" className="text-xs font-bold h-8 border-slate-200 gap-2">
                                            <History className="h-3.5 w-3.5" /> Full History
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { type: "Annual Leave", used: 12, total: 20, color: "text-emerald-600", bg: "bg-emerald-50", fill: "bg-emerald-500" },
                                            { type: "Sick Leave", used: 4, total: 10, color: "text-rose-600", bg: "bg-rose-50", fill: "bg-rose-500" },
                                        ].map((l, i) => (
                                            <div key={i} className={cn("p-4 rounded-2xl border border-slate-100", l.bg)}>
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className={cn("text-xs font-black uppercase tracking-wider", l.color)}>{l.type}</span>
                                                    <span className="text-sm font-black text-slate-900">{l.used}/{l.total} Used</span>
                                                </div>
                                                <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                                                    <div className={cn("h-full rounded-full", l.fill)} style={{ width: `${(l.used / l.total) * 100}%` }} />
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-500 mt-2">{l.total - l.used} days remaining</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actionable Widget */}
                                <div className="bg-[#114C35] rounded-3xl p-6 shadow-xl text-white flex flex-col justify-between relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                        <Plus className="h-24 w-24" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-black mb-2">Need Time Off?</h3>
                                        <p className="text-emerald-100/70 text-sm font-medium leading-tight">Submit your leave request for approval in seconds.</p>
                                    </div>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button className="w-full bg-white text-[#114C35] hover:bg-emerald-50 font-black rounded-xl py-6 mt-8 relative z-10 shadow-lg">
                                                Submit Leave Request
                                            </Button>
                                        </SheetTrigger>
                                        {/* Leave request form content would go here */}
                                    </Sheet>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Absence Calendar Mock */}
                                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black text-slate-900">Absence Calendar</h3>
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-100">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                <span className="text-[10px] font-bold text-emerald-700">Planned</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-50 border border-rose-100">
                                                <div className="h-2 w-2 rounded-full bg-rose-500" />
                                                <span className="text-[10px] font-bold text-rose-700">Unplanned</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-2 mb-2">
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                                            <div key={d} className="text-center text-[10px] font-black text-slate-400 py-2">{d}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {Array.from({ length: 31 }).map((_, i) => {
                                            const day = i + 1;
                                            const isPlanned = day === 14 || day === 15;
                                            const isUnplanned = day === 3;
                                            return (
                                                <div key={i} className={cn(
                                                    "h-12 rounded-xl flex items-center justify-center text-xs font-bold transition-all border border-slate-50",
                                                    isPlanned ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : 
                                                    isUnplanned ? "bg-rose-500 text-white shadow-md shadow-rose-200" : 
                                                    "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                                )}>
                                                    {day}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Recent Timesheet Activity */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-black text-slate-900 mb-6">Recent Timesheets</h3>
                                    <div className="space-y-4">
                                        {[
                                            { date: "Today", in: "08:55 AM", out: "05:05 PM", status: "On-time" },
                                            { date: "Yesterday", in: "09:02 AM", out: "05:10 PM", status: "Late-In" },
                                            { date: "10 Mar", in: "08:58 AM", out: "05:00 PM", status: "On-time" },
                                            { date: "09 Mar", in: "08:45 AM", out: "04:55 PM", status: "On-time" },
                                        ].map((t, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/30">
                                                <div>
                                                    <p className="text-xs font-black text-slate-900">{t.date}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">{t.in} - {t.out}</p>
                                                </div>
                                                <Badge className={cn(
                                                    "border-none text-[9px] font-black",
                                                    t.status === "On-time" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                                                )}>{t.status.toUpperCase()}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-slate-900">
                                        View Full Timesheet Log
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="skills" className="mt-0 space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Skill Matrix */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-black text-slate-900 mb-6">Skill Matrix</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { name: "Advanced Excel", level: "Expert" },
                                            { name: "Student Counseling", level: "Advanced" },
                                            { name: "Curriculum Design", level: "Expert" },
                                            { name: "Amharic", level: "Native" },
                                            { name: "Digital Pedagogy", level: "Intermediate" },
                                            { name: "Public Speaking", level: "Advanced" },
                                            { name: "Python", level: "Beginner" },
                                        ].map((s, i) => (
                                            <div key={i} className="group relative">
                                                <Badge className="bg-slate-100 text-slate-700 hover:bg-emerald-500 hover:text-white border-none px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-default">
                                                    {s.name}
                                                </Badge>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                                                    {s.level}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* PD Opportunities */}
                                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 shadow-xl text-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-lg font-black">AI Recommendations</h3>
                                            <p className="text-indigo-100/70 text-[10px] font-bold uppercase tracking-widest mt-1">Growth Opportunities</p>
                                        </div>
                                        <TrendingUp className="h-6 w-6 text-indigo-300" />
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { title: "Inclusive Classroom Strategies", duration: "4 hrs", platform: "Coursera" },
                                            { title: "Advanced Student Psych", duration: "8 hrs", platform: "Internal PD" },
                                        ].map((o, i) => (
                                            <div key={i} className="p-3 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-xs font-black">{o.title}</p>
                                                        <p className="text-[10px] font-bold text-indigo-200">{o.duration} • {o.platform}</p>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-indigo-300 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Training History */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-black text-slate-900 mb-6">Training History</h3>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Digital Classroom Management", date: "Feb 2026", type: "Workshop" },
                                            { name: "Emergency First Aid Response", date: "Nov 2025", type: "Certification" },
                                            { name: "Advanced Pedagogy 2.0", date: "Aug 2025", type: "internal Course" },
                                        ].map((t, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 group hover:border-emerald-200 hover:bg-emerald-50/10 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-colors">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">{t.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400">{t.type} • {t.date}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Certifications Tracker */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-black text-slate-900 mb-6">Certifications Tracker</h3>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Regional Teaching License", id: "LIC-88291-ET", expires: "Jan 2028", status: "Active" },
                                            { name: "Advanced Math Instructor", id: "AMI-002-STUDIO", expires: "Sep 2026", status: "Active" },
                                        ].map((c, i) => (
                                            <div key={i} className="p-4 rounded-2xl border border-slate-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">{c.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400">ID: {c.id}</p>
                                                    </div>
                                                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] uppercase">Active</Badge>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-slate-50">
                                                    <Clock className="h-3 w-3 text-slate-400" />
                                                    <span className="text-[10px] font-bold text-slate-500">Expires: <span className="text-slate-900">{c.expires}</span></span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="payroll" className="mt-0 space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Direct Deposit Details */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 lg:col-span-1">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black text-slate-900">Direct Deposit</h3>
                                        <Lock className="h-4 w-4 text-slate-300" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Bank Name</p>
                                            <p className="text-sm font-black text-slate-900 italic">Chase Bank N.A.</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Account Number</p>
                                            <p className="text-sm font-black text-slate-900 tracking-widest">**** **** 8829</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Routing Number</p>
                                            <p className="text-sm font-black text-slate-900">021000021</p>
                                        </div>
                                        <Button variant="ghost" className="w-full text-xs font-bold text-emerald-600 hover:bg-emerald-50">
                                            Update Bank Details
                                        </Button>
                                    </div>
                                </div>

                                {/* Pay Stub History */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-black text-slate-900">Pay Stub History</h3>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold border-slate-200">
                                                    <Search className="h-3 w-3 mr-1.5" /> Search
                                                </Button>
                                                <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold border-slate-200">
                                                    Year: 2026 <ChevronDown className="h-3 w-3 ml-1.5" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="border-slate-100 hover:bg-transparent">
                                                        <TableHead className="font-black text-[11px] uppercase text-slate-400">Payroll Period</TableHead>
                                                        <TableHead className="font-black text-[11px] uppercase text-slate-400">Net Pay</TableHead>
                                                        <TableHead className="font-black text-[11px] uppercase text-slate-400">Status</TableHead>
                                                        <TableHead className="text-right font-black text-[11px] uppercase text-slate-400">Statement</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[
                                                        { period: "Feb 15 - Feb 28, 2026", amt: "$4,250.00", status: "Paid" },
                                                        { period: "Feb 01 - Feb 14, 2026", amt: "$4,250.00", status: "Paid" },
                                                        { period: "Jan 15 - Jan 31, 2026", amt: "$4,500.00", status: "Paid" },
                                                        { period: "Jan 01 - Jan 14, 2026", amt: "$4,500.00", status: "Paid" },
                                                    ].map((pay, i) => (
                                                        <TableRow key={i} className="border-slate-50 group hover:bg-slate-50/50 transition-colors">
                                                            <TableCell className="font-bold text-slate-900 py-4">{pay.period}</TableCell>
                                                            <TableCell className="font-black text-emerald-700">{pay.amt}</TableCell>
                                                            <TableCell>
                                                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[9px]">PAID</Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button variant="ghost" size="sm" className="h-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 content-center px-2">
                                                                    <Download className="h-4 w-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>

                                    {/* Benefits Enrollment Summary */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                        <h3 className="text-lg font-black text-slate-900 mb-6">Benefits Enrollment Summary</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { name: "Premium Health Coverage", provider: "Global Care", cost: "$0.00 (Employer Paid)", status: "Active" },
                                                { name: "Retirement Fund (403b)", provider: "SecureFuture", cost: "5% Contribution", status: "Active" },
                                                { name: "Life & AD&D Insurance", provider: "Reliance Standard", cost: "$5.20 / mo", status: "Active" },
                                                { name: "Vision & Dental", provider: "Guardian", cost: "$12.50 / mo", status: "Active" },
                                            ].map((ben, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 rounded-2xl border border-slate-50 bg-slate-50/30 group">
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 group-hover:text-[#114C35] transition-colors">{ben.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{ben.provider} • <span className="text-slate-600">{ben.cost}</span></p>
                                                    </div>
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </div>

                    {/* ── RIGHT: Profile Sidebar ── */}
                    <div className="w-full xl:w-[300px] shrink-0 space-y-5">

                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="h-28 bg-emerald-900 bg-cover bg-center relative" style={{ backgroundImage: "url('/covers/campus-cover.jpg')" }}>
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute top-3 right-3 h-6 w-6 rounded-md bg-black/30 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:bg-black/50">
                                    <Edit className="h-3 w-3" />
                                </div>
                            </div>

                            <div className="px-6 pb-6 pt-0 flex flex-col items-center">
                                <div className="relative -mt-14 mb-4">
                                    <div className="h-28 w-28 rounded-full border-[5px] border-white shadow-xl bg-slate-100 overflow-hidden">
                                        {employee.avatarUrl ? (
                                            <img src={employee.avatarUrl} alt={employee.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-emerald-50 text-emerald-600 font-bold text-3xl">
                                                {employee.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h2 className="text-xl font-black text-slate-900 text-center">{employee.name}</h2>
                                <p className="text-sm font-bold text-slate-500 text-center mt-0.5">
                                    {employee.designation} <span className="text-slate-400">[{employee.department}]</span>
                                </p>

                                <Badge className="mt-3 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 font-bold text-xs uppercase tracking-widest shadow-none">
                                    <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                                </Badge>

                                <div className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl py-2 mt-4 text-center">
                                    <span className="text-sm font-black text-[#114C35] tracking-tight">STATUS: On-Duty</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Facts */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <h3 className="font-black text-base text-slate-900 mb-1">Quick Facts</h3>
                            <div className="flex items-center text-sm font-medium text-slate-600">
                                <User className="h-4 w-4 mr-3 text-slate-400" />
                                EMP ID: <span className="font-bold text-slate-900 ml-1">{employee.employeeCode}</span>
                            </div>
                            <div className="flex items-center text-sm font-medium text-slate-600">
                                <Users className="h-4 w-4 mr-3 text-slate-400" />
                                Manager: <a href="#" className="font-bold text-blue-600 ml-1 hover:underline">{managerName}</a>
                            </div>
                            <div className="flex items-center text-sm font-medium text-slate-600">
                                <Wallet className="h-4 w-4 mr-3 text-slate-400" />
                                Salary Step: <span className="font-bold text-slate-900 ml-1">6/12</span>
                            </div>
                        </div>

                        {/* Contact Center */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <h3 className="font-black text-base text-slate-900 mb-1">Contact Center</h3>

                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-2">
                                <Mail className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                                <span className="text-sm font-medium text-slate-700 w-12 shrink-0">Email</span>
                                <div className="bg-white border border-slate-200 px-2 py-1 rounded text-sm text-slate-600 flex-1 truncate font-medium flex justify-between items-center">
                                    <span className="truncate">{employee.email}</span>
                                    <ChevronDown className="h-3 w-3 text-slate-400 ml-1 shrink-0" />
                                </div>
                            </div>

                            <div className="flex items-center text-sm font-medium text-emerald-600 cursor-pointer hover:bg-emerald-50 p-2 rounded-lg transition-colors -mx-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </div>

                            <div className="flex items-start text-sm">
                                <Phone className="h-4 w-4 text-slate-400 mr-2 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-medium text-slate-600">Emergency Contact:</p>
                                    <p className="font-bold text-slate-900 break-all">
                                        {employee.emergencyFirstName ? `${employee.emergencyFirstName.toLowerCase()}.1@mun.en` : "None"}
                                    </p>
                                    <p className="font-bold text-slate-900">
                                        {employee.emergencyMobile ? `+1(803) ${employee.emergencyMobile}` : "+1(803) 835-7770"}
                                    </p>
                                </div>
                            </div>

                            <Button className="w-full h-10 bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 shadow-sm rounded-xl mt-2">
                                Request Leave
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Employee Sheet */}
            <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
                <SheetContent className="sm:max-w-3xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-black">Edit Employee</SheetTitle>
                        <SheetDescription>Update the details for {employee.name}.</SheetDescription>
                    </SheetHeader>
                    <EditEmployeeForm employee={employee as any} onFormSubmit={handleEditEmployee} />
                </SheetContent>
            </Sheet>
        </Tabs>
    );
}
