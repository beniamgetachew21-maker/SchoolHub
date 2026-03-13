"use client"
import * as React from "react"
import Link from "next/link"
import {
    BookOpen, CalendarCheck, GraduationCap, ChevronRight,
    Download, ArrowUpRight, TrendingUp, CheckCircle2, Lock,
    Wallet, QrCode, CreditCard, Music2, FlaskConical, Dumbbell,
    Palette, Users, Trophy, Clock, Star, Zap, Bell,
    MapPin, MessageSquare, FileText
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
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const CLUBS = [
    { id: "c1", name: "Science & Tech Club", icon: FlaskConical, color: "bg-blue-500", members: 24, nextMeeting: "Thu, 14 Mar @ 3:30PM", joined: true },
    { id: "c2", name: "Music & Arts", icon: Music2, color: "bg-purple-500", members: 18, nextMeeting: "Fri, 15 Mar @ 2:00PM", joined: false },
    { id: "c3", name: "Sports Academy", icon: Dumbbell, color: "bg-rose-500", members: 42, nextMeeting: "Wed, 13 Mar @ 4:00PM", joined: true },
    { id: "c4", name: "Creative Arts", icon: Palette, color: "bg-amber-500", members: 15, nextMeeting: "Mon, 17 Mar @ 3:00PM", joined: false },
    { id: "c5", name: "Community Service", icon: Users, color: "bg-emerald-500", members: 31, nextMeeting: "Sat, 15 Mar @ 9:00AM", joined: false },
    { id: "c6", name: "Debate & Oratory", icon: MessageSquare, color: "bg-indigo-500", members: 20, nextMeeting: "Tue, 18 Mar @ 2:30PM", joined: true },
];

const ACHIEVEMENTS = [
    { title: "Top 5 in Class", desc: "Ranked 5th overall — Term 1", icon: Trophy, color: "text-amber-500 bg-amber-50" },
    { title: "Perfect Attendance", desc: "94.2% consistency this term", icon: Star, color: "text-emerald-500 bg-emerald-50" },
    { title: "Science Fair Runner-Up", desc: "2nd Place, Regional Science Fair 2025", icon: FlaskConical, color: "text-blue-500 bg-blue-50" },
];

export function StudentPortalClient({ student, invoices, attendance, results, allStudents }: {
    student: any, invoices: any[], attendance: any, results: any[], allStudents: any[]
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
        const result = await processDigitalPaymentAction(student.studentId, selectedInvoice.invoiceId, method, selectedInvoice.amount);
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
        <div className="space-y-8">
            {/* ── Hero Profile Card ─────────────────────────────────── */}
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0f2614] via-[#1a3d1f] to-[#0d1f10] shadow-2xl p-8">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-orange/5 rounded-full -ml-28 -mb-28 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar with aura ring */}
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl scale-110" />
                        <Avatar className="h-32 w-32 ring-4 ring-emerald-500/40 ring-offset-4 ring-offset-[#1a3d1f] shadow-2xl relative">
                            <AvatarImage src="/avatars/aida.jpg" alt={student.name} className="object-cover" />
                            <AvatarFallback className="text-4xl font-black bg-emerald-700 text-white">{student.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-2 border-[#1a3d1f]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                                <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                                    {student.name}
                                </h1>
                                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black text-[10px] tracking-widest uppercase">
                                    ACTIVE
                                </Badge>
                            </div>
                            <p className="text-emerald-400/70 font-bold text-sm uppercase tracking-widest">
                                {student.class ?? "Grade 11 – A"} &nbsp;·&nbsp; ID: {student.studentId}
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                            {[
                                { label: "GPA", value: "3.85", accent: "text-amber-400" },
                                { label: "Attendance", value: "94.2%", accent: "text-emerald-400" },
                                { label: "Class Rank", value: "#05", accent: "text-blue-400" },
                                { label: "Merit Points", value: "12", accent: "text-purple-400" },
                            ].map(s => (
                                <div key={s.label} className="bg-white/5 rounded-2xl px-4 py-3 border border-white/10 text-center">
                                    <p className={`text-2xl font-black ${s.accent}`}>{s.value}</p>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick action group */}
                    <div className="flex gap-3 md:flex-col flex-shrink-0">
                        <Link href="/student-portal/id-cards">
                            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-xs uppercase tracking-widest">
                                <QrCode className="h-4 w-4 mr-2" /> Digital ID
                            </Button>
                        </Link>
                        <Link href="/student-portal/profile">
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-bold text-xs uppercase tracking-widest bg-transparent">
                                <ArrowUpRight className="h-4 w-4 mr-2" /> My Profile
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Fee alert strip */}
                {outstanding > 0 && (
                    <div className="relative z-10 mt-6 flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded-2xl px-6 py-4">
                        <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-amber-400 flex-shrink-0 animate-bounce" />
                            <span className="text-amber-300 font-bold text-sm">Outstanding balance: <span className="font-black">{outstanding.toLocaleString()} ETB</span></span>
                        </div>
                        <button onClick={() => document.getElementById("tab-finance")?.click()}
                            className="text-amber-400 font-black text-xs uppercase tracking-widest hover:text-amber-300 transition-colors">
                            Pay Now →
                        </button>
                    </div>
                )}
            </div>

            {/* ── Main Tabs ──────────────────────────────────────────── */}
            <Tabs defaultValue="home" className="w-full">
                <TabsList className="bg-slate-100 p-1.5 h-14 rounded-2xl mb-6 flex gap-1">
                    {[
                        { value: "home", label: "Overview" },
                        { value: "academics", label: "Academics" },
                        { value: "clubs", label: "Clubs & Socs" },
                        { value: "finance", label: "Fees & Billing" },
                    ].map(t => (
                        <TabsTrigger key={t.value} value={t.value} id={`tab-${t.value}`}
                            className="flex-1 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                            {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* ── OVERVIEW ────────────────────────── */}
                <TabsContent value="home" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Quick Actions */}
                        <Card className="rounded-[28px] border-none shadow-sm bg-white overflow-hidden">
                            <CardHeader className="p-6 pb-3">
                                <CardTitle className="font-black text-lg uppercase tracking-tight">Quick Access</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 grid grid-cols-2 gap-3">
                                {[
                                    { href: "/student-portal/timetable", icon: CalendarCheck, label: "Schedule", color: "bg-emerald-500" },
                                    { href: "/student-portal/id-cards", icon: QrCode, label: "Digital ID", color: "bg-indigo-500" },
                                    { href: "/student-portal/library", icon: BookOpen, label: "Library", color: "bg-amber-500" },
                                    { href: "/student-portal/communication", icon: MessageSquare, label: "Messages", color: "bg-rose-500" },
                                ].map(a => (
                                    <Link href={a.href} key={a.label} className="group">
                                        <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-center">
                                            <div className={`p-3 rounded-xl ${a.color} text-white shadow group-hover:scale-110 transition-transform`}>
                                                <a.icon className="h-5 w-5" />
                                            </div>
                                            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{a.label}</span>
                                        </div>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Today's Schedule */}
                        <Card className="rounded-[28px] border-none shadow-sm bg-white overflow-hidden">
                            <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between">
                                <CardTitle className="font-black text-lg uppercase tracking-tight">Today's Schedule</CardTitle>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase">Wed</Badge>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                {[
                                    { time: "8:00", sub: "Mathematics", room: "B204", color: "bg-blue-500" },
                                    { time: "9:30", sub: "Physics", room: "Lab 1", color: "bg-purple-500" },
                                    { time: "11:00", sub: "English", room: "A101", color: "bg-emerald-500" },
                                    { time: "2:00", sub: "History", room: "A203", color: "bg-amber-500" },
                                ].map(c => (
                                    <div key={c.time} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 group hover:bg-slate-100 transition-colors">
                                        <div className={`w-1 self-stretch rounded-full ${c.color}`} />
                                        <div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{c.time}</p>
                                            <p className="font-black text-sm text-slate-900">{c.sub}</p>
                                        </div>
                                        <div className="ml-auto flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                            <MapPin className="h-3 w-3" />{c.room}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card className="rounded-[28px] border-none shadow-sm bg-white overflow-hidden md:col-span-2 xl:col-span-1">
                            <CardHeader className="p-6 pb-3">
                                <CardTitle className="font-black text-lg uppercase tracking-tight flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-amber-500" /> Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                {ACHIEVEMENTS.map(a => (
                                    <div key={a.title} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                                        <div className={`p-2.5 rounded-xl ${a.color}`}>
                                            <a.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-black text-sm text-slate-900">{a.title}</p>
                                            <p className="text-[11px] text-slate-400 font-medium italic">{a.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Term Progress */}
                    <Card className="rounded-[28px] border-none shadow-sm bg-slate-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <CardContent className="p-8 relative z-10">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Academic Term</p>
                                    <h3 className="text-4xl font-black tracking-tighter uppercase italic">Week 12 <span className="text-slate-500 text-2xl">/ 18</span></h3>
                                    <p className="text-slate-400 text-sm font-medium">3rd Term · 2025/26 Academic Year</p>
                                </div>
                                <div className="flex-1 max-w-md space-y-3">
                                    <div className="flex justify-between text-xs font-black uppercase text-slate-400">
                                        <span>Term Progress</span><span className="text-emerald-400">68%</span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: "68%" }} />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 pt-2">
                                        {[
                                            { label: "Exams Left", val: "2" },
                                            { label: "Assignments", val: "4" },
                                            { label: "Days to Break", val: "42" },
                                        ].map(s => (
                                            <div key={s.label} className="text-center">
                                                <p className="text-2xl font-black text-white">{s.val}</p>
                                                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── ACADEMICS ───────────────────────── */}
                <TabsContent value="academics" className="space-y-8">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <Card className="xl:col-span-2 rounded-[28px] border-none shadow-sm bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-4 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="font-black text-xl">Recent Assessments</CardTitle>
                                    <CardDescription className="font-medium mt-1">Continuous Assessment (CA) tracking</CardDescription>
                                </div>
                                <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest text-emerald-600">VIEW ALL</Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                {results.length > 0 ? results.map((r: any) => (
                                    <div key={r.resultId} className="flex items-center gap-6 p-6 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                                        <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-slate-900 uppercase tracking-tight truncate">{r.subject}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.assessmentName}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-black text-2xl tracking-tighter">{r.marksObtained}<span className="text-slate-200 text-base">/{r.maxMarks}</span></p>
                                            <div className="flex items-center gap-2 justify-end mt-1">
                                                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(r.marksObtained / r.maxMarks) * 100}%` }} />
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-600">{((r.marksObtained / r.maxMarks) * 100).toFixed(0)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-center py-20 text-slate-400 italic">No results released yet.</p>
                                )}
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            {/* Attendance */}
                            <Card className="rounded-[28px] border-none shadow-sm bg-white p-6 space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><CalendarCheck className="h-5 w-5" /></div>
                                    <h3 className="font-black text-lg uppercase tracking-tight">Attendance</h3>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="font-black text-5xl tracking-tighter text-emerald-600">94.2%</span>
                                    <span className="text-[10px] font-black uppercase text-slate-400">This Term</span>
                                </div>
                                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "94.2%" }} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 bg-emerald-50 rounded-2xl text-center">
                                        <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Present</p>
                                        <p className="text-2xl font-black">172</p>
                                    </div>
                                    <div className="p-4 bg-rose-50 rounded-2xl text-center">
                                        <p className="text-[10px] font-black text-rose-500 uppercase mb-1">Absent</p>
                                        <p className="text-2xl font-black">4</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Course progress */}
                            <Card className="rounded-[28px] border-none shadow-sm bg-white p-6 space-y-4">
                                <h3 className="font-black text-lg uppercase tracking-tight">Course Progress</h3>
                                {[
                                    { name: "Mathematics", pct: 75 },
                                    { name: "Chemistry", pct: 42 },
                                    { name: "History", pct: 90 },
                                    { name: "English", pct: 84 },
                                ].map(c => (
                                    <div key={c.name} className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                                            <span>{c.name}</span><span className="text-emerald-600">{c.pct}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* ── CLUBS & SOCS ─────────────────────── */}
                <TabsContent value="clubs" className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Clubs & Societies</h2>
                            <p className="text-slate-400 font-medium text-sm mt-1">Explore and join after-school programmes.</p>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-xs px-4 py-2">
                            {joinedClubs.length} Joined
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {CLUBS.map(club => {
                            const joined = joinedClubs.includes(club.id);
                            return (
                                <Card key={club.id} className={`rounded-[28px] border-2 shadow-sm bg-white overflow-hidden transition-all hover:shadow-lg ${joined ? "border-emerald-200" : "border-transparent"}`}>
                                    <CardContent className="p-6 space-y-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className={`p-4 rounded-2xl ${club.color} text-white shadow-lg`}>
                                                <club.icon className="h-6 w-6" />
                                            </div>
                                            {joined && (
                                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase tracking-widest">MEMBER</Badge>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-black text-lg text-slate-900 uppercase tracking-tight">{club.name}</h4>
                                            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{club.members} members</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 text-xs font-bold text-slate-500">
                                            <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                                            <span>Next: {club.nextMeeting}</span>
                                        </div>
                                        <button
                                            onClick={() => toggleClub(club.id)}
                                            className={cn(
                                                "w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98]",
                                                joined
                                                    ? "bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                                                    : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
                                            )}>
                                            {joined ? "Leave Club" : "Join Club"}
                                        </button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </TabsContent>

                {/* ── FEES & BILLING ─────────────────── */}
                <TabsContent value="finance" className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Fees & Billing</h2>
                            <p className="text-slate-400 font-medium text-sm mt-1">Consolidated institutional billing and payments.</p>
                        </div>
                        <Button variant="outline" className="rounded-xl border-slate-200 font-black text-xs uppercase tracking-widest">
                            <Download className="mr-2 h-4 w-4" /> Statement
                        </Button>
                    </div>

                    {/* Outstanding summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Card className={`rounded-[28px] border-none shadow-sm ${outstanding > 0 ? "bg-amber-50 border border-amber-100" : "bg-emerald-50 border border-emerald-100"} col-span-1`}>
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Outstanding</p>
                                <p className={`text-4xl font-black tracking-tighter ${outstanding > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                                    {outstanding.toLocaleString()} ETB
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-[28px] border-none shadow-sm bg-white sm:col-span-2">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Payment Progress</p>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-500">Paid this term</span>
                                    <span className="text-emerald-600 font-black">
                                        {invoices.filter(i => i.status === "Paid").reduce((a, c) => a + c.amount, 0).toLocaleString()} ETB
                                    </span>
                                </div>
                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                    {(() => {
                                        const total = invoices.reduce((a, c) => a + c.amount, 0);
                                        const paid = invoices.filter(i => i.status === "Paid").reduce((a, c) => a + c.amount, 0);
                                        const pct = total > 0 ? (paid / total) * 100 : 0;
                                        return <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />;
                                    })()}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="rounded-[28px] border-none shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow className="border-none">
                                            <TableHead className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400">Description</TableHead>
                                            <TableHead className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Amount</TableHead>
                                            <TableHead className="p-6 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Status</TableHead>
                                            <TableHead className="p-6" />
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoices.map((inv: any) => (
                                            <TableRow key={inv.invoiceId} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                                <TableCell className="p-6">
                                                    <p className="font-black text-sm uppercase tracking-tight text-slate-900">{inv.description || "Tuition Fee"}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due: {inv.dueDate || "Mar 30, 2026"}</p>
                                                </TableCell>
                                                <TableCell className="p-6 text-right font-black text-xl tracking-tighter">{inv.amount.toLocaleString()}</TableCell>
                                                <TableCell className="p-6 text-center">
                                                    <Badge className={cn("font-black text-[10px] uppercase tracking-widest border-none",
                                                        inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                                                        {inv.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="p-6 text-right">
                                                    {inv.status !== "Paid" ? (
                                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow shadow-emerald-500/20"
                                                            onClick={() => handlePayNow(inv)}>
                                                            Pay Now
                                                        </Button>
                                                    ) : (
                                                        <Button variant="ghost" size="icon" className="rounded-xl text-slate-300 hover:bg-slate-100 hover:text-slate-700">
                                                            <Download className="h-4 w-4" />
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
            </Tabs>

            {/* Payment Sheet */}
            <Sheet open={isPaymentSheetOpen} onOpenChange={setIsPaymentSheetOpen}>
                <SheetContent className="sm:max-w-md rounded-l-[32px] border-none shadow-2xl p-0 overflow-hidden">
                    <div className="bg-[#0f2614] p-8 text-white">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-black tracking-tighter uppercase text-white">Checkout</SheetTitle>
                            <SheetDescription className="text-emerald-400/70 font-medium">Digital payment gateway</SheetDescription>
                        </SheetHeader>
                    </div>
                    {selectedInvoice && (
                        <div className="p-8 space-y-8 bg-white h-full">
                            <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                                <p className="font-black text-lg text-slate-900 uppercase">{selectedInvoice.description || "Tuition Fees"}</p>
                                <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                                    <span className="text-xs font-black uppercase text-slate-400">Total Payable</span>
                                    <span className="text-4xl font-black text-emerald-600 tracking-tighter">{selectedInvoice.amount.toLocaleString()} ETB</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Choose Payment Channel</p>
                                {[
                                    { label: "Telebirr SuperApp", icon: QrCode, color: "bg-amber-500", method: "Telebirr" },
                                    { label: "Global Card (Stripe)", icon: CreditCard, color: "bg-indigo-600", method: "Stripe" },
                                    { label: "CBE Birr Transfer", icon: TrendingUp, color: "bg-amber-800", method: "Bank Transfer" },
                                ].map(pm => (
                                    <button key={pm.method} disabled={isProcessing} onClick={() => handleProcessPayment(pm.method)}
                                        className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-slate-50 transition-all disabled:opacity-50">
                                        <div className={`p-3 ${pm.color} text-white rounded-xl`}><pm.icon className="h-5 w-5" /></div>
                                        <span className="font-black text-slate-900 uppercase tracking-tight text-sm">{pm.label}</span>
                                        <ChevronRight className="ml-auto h-4 w-4 text-slate-300" />
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center justify-center gap-2 text-slate-400">
                                <Lock className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Bank-Grade Encryption</span>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
