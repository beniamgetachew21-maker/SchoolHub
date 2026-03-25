"use client";
import * as React from "react"
import Link from "next/link"
import {
    BookOpen, CalendarCheck, GraduationCap, ChevronRight,
    Download, ArrowUpRight, TrendingUp, CheckCircle2, Lock,
    Wallet, QrCode, CreditCard, Music2, FlaskConical, Dumbbell,
    Palette, Users, Trophy, Clock, Star, Zap, Bell,
    MapPin, MessageSquare, FileText, Upload, ChevronDown, Award,
    PlayCircle, Sparkles
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"
import { processDigitalPaymentAction } from "@/lib/actions"
import { processFeePaymentFlowAction } from "@/lib/flow-actions"
import { cn } from "@/lib/utils"

const CLUBS = [
    { id: "c1", name: "Science & Tech Club", icon: FlaskConical, color: "bg-blue-500", members: 24, nextMeeting: "Thu, 14 Mar @ 3:30PM", joined: true },
    { id: "c2", name: "Music & Arts", icon: Music2, color: "bg-purple-500", members: 18, nextMeeting: "Fri, 15 Mar @ 2:00PM", joined: false },
    { id: "c3", name: "Sports Academy", icon: Dumbbell, color: "bg-rose-500", members: 42, nextMeeting: "Wed, 13 Mar @ 4:00PM", joined: true },
    { id: "c4", name: "Creative Arts", icon: Palette, color: "bg-amber-500", members: 15, nextMeeting: "Mon, 17 Mar @ 3:00PM", joined: false },
    { id: "c5", name: "Community Service", icon: Users, color: "bg-emerald-500", members: 31, nextMeeting: "Sat, 15 Mar @ 9:00AM", joined: false },
    { id: "c6", name: "Debate & Oratory", icon: MessageSquare, color: "bg-indigo-500", members: 20, nextMeeting: "Tue, 18 Mar @ 2:30PM", joined: true },
];

const ACHIEVEMENTS = [
    { title: "Top 5 in Class", desc: "Ranked 5th overall — Term 1", icon: Trophy, color: "text-amber-500 bg-amber-50", badge: "Academic" },
    { title: "Perfect Attendance", desc: "94.2% consistency this term", icon: Star, color: "text-emerald-500 bg-emerald-50", badge: "Lifestyle" },
    { title: "Science Fair Runner-Up", desc: "2nd Place, Regional Science Fair 2025", icon: FlaskConical, color: "text-blue-500 bg-blue-50", badge: "Extracurricular" },
];

export function StudentPortalClient({ student, invoices, attendance, results, gpa, timetable, assignments, allStudents }: {
    student: any, invoices: any[], attendance: any, results: any[], gpa: number, timetable: any[], assignments: any[], allStudents: any[]
}) {
    const [selectedInvoice, setSelectedInvoice] = React.useState<any | null>(null);
    const [isPaymentSheetOpen, setIsPaymentSheetOpen] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [joinedClubs, setJoinedClubs] = React.useState<string[]>(["c1", "c3", "c6"]);

    const handlePayNow = (invoice: any) => { setSelectedInvoice(invoice); setIsPaymentSheetOpen(true); };

    const handleProcessPayment = async (method: string) => {
        if (!selectedInvoice) return;
        setIsProcessing(true);
        await new Promise(r => setTimeout(r, 1500));
        const result = await processFeePaymentFlowAction(selectedInvoice.invoiceId, student.studentId, Number(selectedInvoice.amount), method);
        setIsProcessing(false);
        if (result.success) {
            toast({ title: "Payment Successful", description: `Paid ${selectedInvoice.amount.toLocaleString()} ETB via ${method}.` });
            setIsPaymentSheetOpen(false);
        } else {
            toast({ variant: "destructive", title: "Payment Failed", description: result.error || "Gateway timeout." });
        }
    };

    const toggleClub = (id: string) => {
        setJoinedClubs(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
        toast({ title: joinedClubs.includes(id) ? "Left club" : "Joined club!", description: "Your club memberships have been updated." });
    };

    const outstanding = invoices.filter(i => i.status !== "Paid").reduce((a, c) => a + c.amount, 0);

    return (
        <Tabs defaultValue="home" className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
            {/* ── Dark green header - single, full-bleed, high-fidelity ── */}
            <div className="bg-[#163D2D] text-white pt-6 pb-0 px-8 w-full relative overflow-hidden">
                {/* Decorative mesh gradient in header */}
                <div className="absolute top-0 right-[-10%] w-[50%] h-full bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[150%] bg-[#0B2117]/50 rounded-full blur-[80px] pointer-events-none" />

                <div className="max-w-[1600px] mx-auto w-full relative z-10">
                    {/* Top nav row */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-black tracking-wide text-white uppercase italic">
                                ETHIOEDU <span className="text-emerald-400 font-bold not-italic">STUDENT PORTAL</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/student-portal/id-cards" className="hidden sm:block">
                                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-xs uppercase tracking-widest h-8">
                                    <QrCode className="h-3.5 w-3.5 mr-2" /> Digital ID
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full relative h-9 w-9">
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 border border-[#163D2D] rounded-full" />
                            </Button>
                            <Link href="/student-portal/profile">
                                <Avatar className="h-9 w-9 rounded-xl border border-white/20 hover:scale-105 transition-transform shadow-lg cursor-pointer">
                                    <AvatarImage src="/avatars/aida.jpg" alt={student.name} className="object-cover" />
                                    <AvatarFallback className="bg-emerald-600 font-bold text-xs text-white">{student.name?.[0]}</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    </div>

                    {/* Title + Insight Pills */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
                        {/* Left: greeting + details */}
                        <div className="flex items-center gap-6">
                             <Avatar className="hidden sm:block h-24 w-24 rounded-[32px] border-[4px] border-white/10 shadow-2xl relative">
                                <AvatarImage src="/avatars/aida.jpg" alt={student.name} className="object-cover" />
                                <AvatarFallback className="text-3xl font-black bg-emerald-700 text-white">{student.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">{student.name}</h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 shadow-md shadow-emerald-900/40">
                                        Active Student
                                    </Badge>
                                    <p className="text-white/70 text-sm font-bold uppercase tracking-widest">
                                        ID: {student.studentId} • {student.class ?? "Grade 11 – A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Quick Stats */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-sm shadow-xl shadow-black/10">
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Current GPA</p>
                                <p className="text-3xl font-black text-amber-400">{gpa.toFixed(2)}</p>
                            </div>
                            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-sm shadow-xl shadow-black/10">
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Attendance</p>
                                <p className="text-3xl font-black text-emerald-400">
                                    {attendance ? ((attendance.presentDays / Math.max(attendance.totalDays, 1)) * 100).toFixed(1) : "0.0"}%
                                </p>
                            </div>
                            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-sm shadow-xl shadow-black/10">
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Class Rank</p>
                                <p className="text-3xl font-black text-blue-400">#5</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs - attached to header bottom */}
                    <TabsList className="bg-transparent border-none p-0 flex justify-start gap-1 w-full rounded-none h-auto overflow-x-auto no-scrollbar">
                        {[
                            { value: "home", label: "Dashboard" },
                            { value: "academics", label: "Academics & Grades" },
                            { value: "extracurriculars", label: "Extracurriculars" },
                            { value: "finance", label: "Financial Accounts" },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                id={`tab-${tab.value}`}
                                className="data-[state=active]:bg-[#F8FAFC] data-[state=active]:text-[#163D2D] data-[state=active]:shadow-none text-emerald-100/80 hover:text-white rounded-t-2xl rounded-b-none px-6 sm:px-8 py-4 font-black text-xs sm:text-sm uppercase tracking-widest border-0 transition-all whitespace-nowrap"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            </div>

            {/* ── Main Content Area ── */}
            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 py-8 md:py-12">
        {/* ── OVERVIEW ────────────────────────── */}
        <TabsContent value="home" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Action Row */}
            {outstanding > 0 && (
                <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-200 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="h-12 w-12 bg-amber-100 rounded-[16px] flex items-center justify-center text-amber-600 shadow-inner">
                            <Wallet className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-slate-900 tracking-tight">Financial Action Required</h4>
                            <p className="text-sm font-medium text-slate-500">You have an outstanding balance of <span className="font-bold text-amber-600">{outstanding.toLocaleString()} ETB</span> for the current term.</p>
                        </div>
                    </div>
                    <Button onClick={() => document.getElementById("tab-finance")?.click()} className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-xl shadow-amber-500/20 whitespace-nowrap relative z-10 shrink-0">
                        Review & Pay
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* 1. Schedule Wizard */}
                <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden lg:col-span-2 premium-glass-card">
                    <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between border-b border-slate-50">
                        <div>
                            <CardTitle className="font-black text-2xl tracking-tight text-slate-900">Today's Protocol</CardTitle>
                            <CardDescription className="font-medium text-sm mt-1">Wednesday, March 14, 2026</CardDescription>
                        </div>
                        <Link href="/student-portal/timetable">
                            <Button variant="ghost" className="h-10 px-4 font-black text-[10px] uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50 rounded-xl">View Master Schedule</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-50">
                            {timetable.length > 0 ? timetable.slice(0, 4).map((c: any, i: number) => (
                                <div key={i} className={cn("flex items-stretch gap-6 p-6 transition-colors relative group", i === 0 ? "bg-slate-50/50" : "hover:bg-slate-50/50")}>
                                    {i === 0 && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#163D2D]" />}
                                    <div className="w-24 shrink-0 flex flex-col items-end justify-center border-r border-slate-100 pr-6">
                                        <span className="font-black text-sm text-slate-900">{c.startTime}</span>
                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">AM/PM</span>
                                    </div>
                                    <div className="flex-1 py-1">
                                        <p className="font-black text-lg text-slate-900 tracking-tight">{c.course?.name || "Subject"}</p>
                                        <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-slate-500">
                                            <MapPin className="h-3.5 w-3.5 text-slate-400" /> {c.room?.name || "Room"}
                                        </div>
                                    </div>
                                    {i === 0 && (
                                        <div className="self-center hidden sm:flex shrink-0">
                                            <Badge className="bg-[#163D2D] text-white hover:bg-[#163D2D] border-none font-black text-[10px] uppercase tracking-widest px-4 py-1.5">Happening Now</Badge>
                                        </div>
                                    )}
                                </div>
                            )) : (
                                <div className="p-12 text-center text-slate-400 italic text-sm">No classes scheduled for today.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* 2. NEXT-GEN LEARNING JOURNEY */}
                <div className="space-y-6 lg:col-span-1 xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-6 items-start content-start">
                    
                    {/* Continue Learning Widget */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-[#163D2D] text-white overflow-hidden relative col-span-1 xl:col-span-2 group">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-400/10 rounded-full mix-blend-screen blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                        <CardContent className="p-8 relative z-10">
                             <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/10 rounded-[16px] backdrop-blur-md">
                                    <PlayCircle className="h-6 w-6 text-emerald-300" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-1">Continue Learning</p>
                                    <p className="font-black text-xl italic tracking-tight">Mathematics – Unit 1: Algebra</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-emerald-100/70">Syllabus Completion</span>
                                    <span className="text-white">80% Mastered</span>
                                </div>
                                <div className="h-3 bg-black/20 rounded-full overflow-hidden p-0.5 shadow-inner">
                                    <div className="h-full bg-emerald-400 rounded-full relative" style={{ width: "80%" }}>
                                        <div className="absolute inset-0 bg-white/20 w-1/2 rounded-full blur-sm" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <Link href="/lms/courses/algebra-101/lesson/1">
                                    <Button className="w-full bg-white text-[#163D2D] hover:bg-emerald-50 h-12 rounded-2xl font-black shadow-lg">Resume Lesson</Button>
                                </Link>
                                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 h-12 rounded-2xl font-black bg-transparent">Course Syllabus</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Today's Tasks & Deadlines */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden col-span-1">
                        <CardHeader className="p-6 pb-2">
                             <CardTitle className="font-black text-lg tracking-tight text-slate-900 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Today's Tasks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            {assignments.length > 0 ? assignments.map((a: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-[20px] bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl text-emerald-600 bg-emerald-50">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-black text-sm text-slate-900 group-hover:text-emerald-700">{a.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Due {new Date(a.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            )) : (
                                <div className="p-8 text-center text-slate-400 italic text-sm">No incoming assignments.</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Feedback Feed */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden col-span-1">
                        <CardHeader className="p-6 pb-2">
                             <CardTitle className="font-black text-lg tracking-tight text-slate-900 flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-amber-500" /> Instructor Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                             <div className="p-4 rounded-[20px] bg-amber-50 border border-amber-100 relative group cursor-pointer">
                                 <p className="text-[11px] font-bold text-amber-900 italic leading-relaxed">
                                     "Excellent work on the last quiz, Beniam. Focus on your notation in Chapter 3."
                                 </p>
                                 <div className="flex items-center gap-2 mt-3 text-[9px] font-black uppercase text-amber-700 tracking-widest">
                                     <Sparkles className="h-3 w-3" /> Dr. Elias Zewdu
                                 </div>
                             </div>
                             <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50 h-10 rounded-xl">View All Feedback →</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>

        {/* ── ACADEMICS & GRADES ───────────────── */}
        <TabsContent value="academics" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Grading Matrix */}
                <Card className="xl:col-span-2 rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden premium-glass-card">
                    <CardHeader className="p-8 pb-6 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="font-black text-3xl tracking-tight text-slate-900">Academic Matrix</CardTitle>
                            <CardDescription className="font-medium text-sm mt-1 text-slate-500">Continuous Assessment & Mid-Term Grades for Term 3</CardDescription>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <Button variant="outline" className="h-12 rounded-[16px] font-black text-xs uppercase tracking-widest border-slate-200">
                                <Download className="h-4 w-4 mr-2" /> Transcript
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                         {results.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {results.map((r: any) => (
                                    <div key={r.resultId} className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 md:p-8 hover:bg-emerald-50/20 transition-colors group">
                                        <div className="flex items-center gap-4 w-full sm:w-1/3">
                                            <div className="h-14 w-14 rounded-[18px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-colors shrink-0">
                                                <TrendingUp className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-lg text-slate-900 tracking-tight">{r.subject}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{r.assessmentName}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-xs font-bold text-slate-500">Score Achieved</span>
                                                <span className="font-black text-2xl tracking-tighter text-slate-900">
                                                    {r.marksObtained}<span className="text-slate-300 text-lg">/{r.maxMarks}</span>
                                                </span>
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        (r.marksObtained / r.maxMarks) >= 0.9 ? "bg-emerald-500" :
                                                        (r.marksObtained / r.maxMarks) >= 0.7 ? "bg-blue-500" :
                                                        (r.marksObtained / r.maxMarks) >= 0.5 ? "bg-amber-500" : "bg-rose-500"
                                                    )} 
                                                    style={{ width: `${(r.marksObtained / r.maxMarks) * 100}%` }} 
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-24 text-right sm:text-center mt-4 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest sm:mb-1">Grade</span>
                                            <Badge className={cn(
                                                "px-4 py-2 font-black text-lg shadow-none border-none",
                                                 (r.marksObtained / r.maxMarks) >= 0.9 ? "bg-emerald-100 text-emerald-700" :
                                                 (r.marksObtained / r.maxMarks) >= 0.7 ? "bg-blue-100 text-blue-700" :
                                                 (r.marksObtained / r.maxMarks) >= 0.5 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                                            )}>
                                                { (r.marksObtained / r.maxMarks) >= 0.9 ? "A" :
                                                  (r.marksObtained / r.maxMarks) >= 0.8 ? "B" :
                                                  (r.marksObtained / r.maxMarks) >= 0.7 ? "C" :
                                                  (r.marksObtained / r.maxMarks) >= 0.6 ? "D" : "F" }
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-20 text-center">
                                <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="h-8 w-8 text-slate-300" />
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-2">No Grades Posted Yet</h4>
                                <p className="text-sm font-medium text-slate-500">Assessment results for this term have not been published by the faculty.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Sidebar Metrics */}
                <div className="space-y-6">
                    {/* Course Progress */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-amber-50 rounded-[12px] flex items-center justify-center text-amber-500"><Zap className="h-5 w-5" /></div>
                            <h3 className="font-black text-xl tracking-tight text-slate-900">Course Progress</h3>
                        </div>
                        <div className="space-y-5">
                            {[
                                { name: "Advance Mathematics", pct: 75, color: "bg-blue-500" },
                                { name: "Organic Chemistry", pct: 42, color: "bg-purple-500" },
                                { name: "Modern History", pct: 90, color: "bg-emerald-500" },
                                { name: "English Literature", pct: 84, color: "bg-amber-500" },
                            ].map(c => (
                                <div key={c.name} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500">
                                        <span>{c.name}</span><span className="text-slate-900">{c.pct}%</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Instructor Meetings */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-[#163D2D] text-white p-8 relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500"><MessageSquare className="h-32 w-32" /></div>
                        <div className="relative z-10">
                            <h3 className="font-black text-xl mb-2">Instructor Consultations</h3>
                            <p className="text-sm font-medium text-emerald-100/70 mb-6 leading-relaxed">Schedule 1-on-1 time with your professors for academic support.</p>
                            <Button className="w-full h-12 bg-white text-[#163D2D] hover:bg-emerald-50 font-black rounded-2xl shadow-lg">Book Appointment</Button>
                        </div>
                    </Card>
                </div>
             </div>
        </TabsContent>

        {/* ── EXTRACURRICULARS ─────────────────── */}
        <TabsContent value="extracurriculars" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                     <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Extracurriculars</h2>
                     <p className="text-slate-500 font-medium text-sm mt-1">Discover, join, and manage your after-school societies and clubs.</p>
                </div>
                <Badge className="bg-[#163D2D] text-white border-none font-black text-xs px-5 py-2.5 rounded-xl uppercase tracking-widest shadow-lg">
                    {joinedClubs.length} Active Memberships
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {CLUBS.map(club => {
                    const joined = joinedClubs.includes(club.id);
                    return (
                        <Card key={club.id} className={cn(
                            "rounded-[2.5rem] border-2 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 relative group bg-white",
                             joined ? "border-emerald-400 shadow-emerald-900/10" : "border-transparent shadow-slate-200/50"
                        )}>
                            {joined && (
                                <div className="absolute top-0 right-0 p-6 z-10">
                                     <div className="bg-emerald-500 text-white rounded-full p-1.5 shadow-md shadow-emerald-500/20">
                                         <CheckCircle2 className="h-4 w-4" />
                                     </div>
                                </div>
                            )}
                            <CardContent className="p-8 space-y-6 relative z-0">
                                 <div className="flex items-center gap-5">
                                    <div className={`h-16 w-16 rounded-[20px] flex items-center justify-center text-white shadow-lg ${club.color} group-hover:scale-110 transition-transform`}>
                                        <club.icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xl text-slate-900 tracking-tight leading-tight">{club.name}</h4>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 flex items-center gap-1.5"><Users className="h-3.5 w-3.5"/> {club.members} Members</p>
                                    </div>
                                 </div>
                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                                     <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                                         <Clock className="h-4 w-4" />
                                     </div>
                                     <div>
                                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Next Session</p>
                                         <p className="font-bold text-sm text-slate-900 mt-0.5">{club.nextMeeting.split('@')[0]} <span className="text-slate-500">@ {club.nextMeeting.split('@')[1]}</span></p>
                                     </div>
                                 </div>
                                 <Button 
                                    onClick={() => toggleClub(club.id)}
                                    variant={joined ? "outline" : "default"}
                                    className={cn(
                                        "w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                                        joined ? "border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200" 
                                               : "bg-[#163D2D] hover:bg-emerald-800 text-white shadow-xl shadow-[#163D2D]/20"
                                    )}
                                 >
                                    {joined ? "Leave Program" : "Enroll Now"}
                                 </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </TabsContent>

        {/* ── FINANCIAL ACCOUNTS ─────────────────── */}
        <TabsContent value="finance" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                     <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Financial Accounts</h2>
                     <p className="text-slate-500 font-medium text-sm mt-1">Review invoices, process digital payments, and download receipts.</p>
                </div>
                <Button variant="outline" className="h-12 border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest bg-white shadow-sm hover:bg-slate-50">
                    <Download className="mr-2 h-4 w-4" /> Account Statement
                </Button>
            </div>

            {/* Premium Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={cn("rounded-[2.5rem] border-transparent shadow-xl overflow-hidden relative group", outstanding > 0 ? "bg-amber-500" : "bg-emerald-600")}>
                    <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <CardContent className="p-8 relative z-10 text-white flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/20 rounded-[16px] backdrop-blur-md text-white">
                                <Wallet className="h-6 w-6" />
                            </div>
                            <Badge className="bg-white/20 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">Due Now</Badge>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Total Outstanding</p>
                            <p className="text-4xl sm:text-5xl font-black tracking-tighter">{outstanding.toLocaleString()} ETB</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white md:col-span-2 overflow-hidden flex flex-col justify-center">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-slate-100 rounded-[12px] flex items-center justify-center text-slate-500"><CreditCard className="h-5 w-5" /></div>
                            <h3 className="font-black text-xl tracking-tight text-slate-900">Payment Progress</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cleared this term</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">
                                        {invoices.filter(i => i.status === "Paid").reduce((a, c) => a + c.amount, 0).toLocaleString()} <span className="text-sm text-slate-400">ETB</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Billed</p>
                                     <p className="text-lg font-bold text-slate-500">
                                        {invoices.reduce((a, c) => a + c.amount, 0).toLocaleString()} ETB
                                     </p>
                                </div>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5">
                                {(() => {
                                    const total = invoices.reduce((a, c) => a + c.amount, 0);
                                    const paid = invoices.filter(i => i.status === "Paid").reduce((a, c) => a + c.amount, 0);
                                    const pct = total > 0 ? (paid / total) * 100 : 0;
                                    return <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 relative" style={{ width: `${pct}%` }}>
                                        <div className="absolute inset-0 bg-white/20 w-1/2 rounded-full blur-sm" />
                                    </div>;
                                })()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Ledger Table */}
            <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                <CardHeader className="p-8 pb-4 border-b border-slate-50">
                     <CardTitle className="font-black text-xl tracking-tight text-slate-900">Billing Ledger</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-slate-100 hover:bg-transparent">
                                    <TableHead className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 h-16">Invoice Details</TableHead>
                                    <TableHead className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 h-16 text-right">Amount (ETB)</TableHead>
                                    <TableHead className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 h-16 text-center">Status</TableHead>
                                    <TableHead className="p-6 h-16" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((inv: any) => (
                                    <TableRow key={inv.invoiceId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                        <TableCell className="p-6 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-lg tracking-tight text-slate-900">{inv.description || "Tuition Fee"}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: INV-{inv.invoiceId.substring(0,6).toUpperCase()} • Due: {inv.dueDate || "Mar 30, 2026"}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-6 text-right font-black text-2xl tracking-tighter text-slate-900 align-middle">
                                            {inv.amount.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="p-6 text-center align-middle">
                                            <Badge className={cn("font-black text-[10px] uppercase tracking-widest border-none px-4 py-1.5 shadow-none",
                                                inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                                                {inv.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="p-6 text-right align-middle">
                                            {inv.status !== "Paid" ? (
                                                <Button className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[14px] shadow-lg shadow-emerald-600/20 uppercase text-xs tracking-widest"
                                                    onClick={() => handlePayNow(inv)}>
                                                    Pay Now
                                                </Button>
                                            ) : (
                                                <Button variant="outline" className="h-12 px-6 border-slate-200 text-slate-500 hover:bg-slate-50 font-black rounded-[14px] uppercase text-xs tracking-widest gap-2">
                                                    <Download className="h-4 w-4" /> Receipt
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
            </div>
            
            {/* Payment Gateway Modal (Unchanged functionality, premium styling) */}
            <Sheet open={isPaymentSheetOpen} onOpenChange={setIsPaymentSheetOpen}>
                <SheetContent className="sm:max-w-md rounded-l-[2.5rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col">
                    <div className="bg-[#163D2D] p-8 sm:p-10 text-white relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                        <SheetHeader className="relative z-10">
                            <SheetTitle className="text-3xl font-black tracking-tighter uppercase text-white italic">Secure Checkout</SheetTitle>
                            <SheetDescription className="text-emerald-100/70 font-medium text-sm mt-1">EthioEdu Official Digital Gateway</SheetDescription>
                        </SheetHeader>
                    </div>
                    {selectedInvoice && (
                        <div className="p-8 sm:p-10 flex-1 flex flex-col bg-slate-50 overflow-y-auto">
                            <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 mb-8 shrink-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><FileText className="h-4 w-4" /></div>
                                    <p className="font-black text-sm text-slate-400 uppercase tracking-widest">Invoice Summary</p>
                                </div>
                                <p className="font-black text-xl text-slate-900 mb-6">{selectedInvoice.description || "Tuition Fees"}</p>
                                <div className="pt-6 border-t border-slate-100 border-dashed flex justify-between items-end">
                                    <span className="text-sm font-black uppercase text-slate-400">Total Payable</span>
                                    <span className="text-4xl font-black text-emerald-600 tracking-tighter">{selectedInvoice.amount.toLocaleString()} <span className="text-lg text-slate-400">ETB</span></span>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Select Payment Method</p>
                                {[
                                    { label: "Telebirr SuperApp", icon: QrCode, color: "bg-[#00AEEF]", method: "Telebirr", badge: "Preferred" },
                                    { label: "CBE Birr", icon: TrendingUp, color: "bg-[#5E2B85]", method: "CBE Birr" },
                                    { label: "Credit/Debit Card", icon: CreditCard, color: "bg-slate-900", method: "Stripe" },
                                ].map(pm => (
                                    <button key={pm.method} disabled={isProcessing} onClick={() => handleProcessPayment(pm.method)}
                                        className="w-full flex items-center gap-4 p-5 rounded-[1.5rem] border-2 border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all disabled:opacity-50 group text-left relative overflow-hidden">
                                        <div className={`p-3.5 ${pm.color} text-white rounded-[14px] shadow-inner shrink-0 group-hover:scale-110 transition-transform`}><pm.icon className="h-6 w-6" /></div>
                                        <div className="flex-1">
                                            <span className="font-black text-slate-900 tracking-tight text-base mb-0.5 block">{pm.label}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Instant Processing</span>
                                        </div>
                                        {pm.badge && <Badge className="absolute top-1/2 -translate-y-1/2 right-12 hidden sm:flex bg-emerald-100 text-emerald-700 border-none font-black text-[9px] uppercase tracking-widest">Preferred</Badge>}
                                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0" />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-center gap-2 text-slate-400 shrink-0">
                                <Lock className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">256-bit Secure Encryption</span>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </Tabs>
    );
}
