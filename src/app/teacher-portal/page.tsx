import { getAnnouncements, getAssignedClassesForTeacher, getTeacher } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
    GraduationCap, Users, CalendarCheck, PenTool, MessageSquare,
    BookOpen, ArrowRight, Bell, TrendingUp, Star, Clock, CheckCircle2,
    FileText, ChevronRight, Award, Target, Zap
} from "lucide-react";

const TEACHER_ID = "E002";

// Mock weekly schedule data
const weekSchedule = [
    { day: "Mon", date: "Mar 10", slots: [
        { time: "8:00", subject: "Mathematics", class: "Grade 10-A", room: "R101", color: "bg-blue-500" },
        { time: "10:00", subject: "Mathematics", class: "Grade 11-B", room: "R101", color: "bg-blue-500" },
        { time: "14:00", subject: "Statistics", class: "Grade 12-A", room: "R203", color: "bg-indigo-500" },
    ]},
    { day: "Tue", date: "Mar 11", slots: [
        { time: "9:00", subject: "Mathematics", class: "Grade 10-B", room: "R101", color: "bg-blue-500" },
        { time: "13:00", subject: "Free Period", class: "Prep Time", room: "—", color: "bg-slate-300" },
    ]},
    { day: "Wed", date: "Mar 12", slots: [
        { time: "8:00", subject: "Mathematics", class: "Grade 11-A", room: "R101", color: "bg-blue-500" },
        { time: "10:00", subject: "Statistics", class: "Grade 12-B", room: "R203", color: "bg-indigo-500" },
        { time: "15:00", subject: "Dept. Meeting", class: "Faculty", room: "Hall", color: "bg-amber-500" },
    ]},
    { day: "Thu", date: "Mar 13", slots: [
        { time: "8:00", subject: "Mathematics", class: "Grade 10-A", room: "R101", color: "bg-blue-500" },
        { time: "11:00", subject: "Mathematics", class: "Grade 10-C", room: "R102", color: "bg-blue-500" },
    ]},
    { day: "Fri", date: "Mar 14", slots: [
        { time: "9:00", subject: "Statistics", class: "Grade 12-A", room: "R203", color: "bg-indigo-500" },
        { time: "13:00", subject: "Parent Mtg", class: "Parents", room: "Office", color: "bg-rose-500" },
    ]},
];

// Mock recent grades to enter
const pendingGrades = [
    { class: "Grade 10-A", subject: "Mathematics", exam: "Mid-Term", submitted: 28, total: 35, due: "Mar 15" },
    { class: "Grade 11-B", subject: "Mathematics", exam: "Assignment 4", submitted: 22, total: 30, due: "Mar 16" },
    { class: "Grade 12-A", subject: "Statistics", exam: "Term Test", submitted: 0, total: 25, due: "Mar 18" },
];

const todaySlots = weekSchedule[3].slots; // Thursday

export default async function TeacherPortalPage() {
    const [assignedClasses, announcements, teacher] = await Promise.all([
        getAssignedClassesForTeacher(TEACHER_ID),
        getAnnouncements(),
        getTeacher(),
    ]);
    const recentAnnouncements = announcements.slice(0, 3);

    const totalStudents = assignedClasses.reduce((a: number, c: any) => a + (c.studentCount ?? 0), 0);

    return (
        <div className="flex flex-col min-h-[calc(100vh-120px)] bg-[#F8FAFC] w-full">
            {/* ── Full-bleed emerald header ── */}
            <div className="bg-[#163D2D] text-white pt-6 pb-0 px-6 sm:px-8 w-full relative overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[50%] h-full bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-[-5%] w-[30%] h-full bg-blue-700/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="max-w-[1600px] mx-auto w-full relative z-10">
                    {/* Topbar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <span className="text-xl font-black tracking-wide text-white uppercase italic">
                            CAMPUS HUB <span className="text-emerald-400 font-bold not-italic">FACULTY PORTAL</span>
                        </span>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black text-[10px] uppercase tracking-widest">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                                Term 3 Active
                            </Badge>
                        </div>
                    </div>

                    {/* Hero row */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
                        <div className="flex items-center gap-6">
                            <Avatar className="hidden sm:block h-24 w-24 rounded-[28px] border-4 border-white/10 shadow-2xl">
                                <AvatarImage src={teacher?.avatarUrl ?? undefined} alt={teacher?.name ?? "Teacher"} className="object-cover" />
                                <AvatarFallback className="text-3xl font-black bg-emerald-700 text-white">{teacher?.name?.[0] ?? "T"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-emerald-400 font-black text-xs tracking-widest uppercase mb-1">Welcome back</p>
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">
                                    {teacher?.name ?? "Educator"}
                                </h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <Badge className="bg-white/10 text-white border border-white/20 font-black text-[10px] uppercase tracking-widest px-3 py-1">
                                        {teacher?.designation ?? "Faculty Member"}
                                    </Badge>
                                    <p className="text-white/50 text-sm font-bold uppercase tracking-widest">
                                        ID: {TEACHER_ID}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* KPI chips */}
                        <div className="flex gap-3 flex-wrap">
                            {[
                                { label: "Classes", value: assignedClasses.length, color: "text-emerald-400" },
                                { label: "Students", value: totalStudents, color: "text-blue-400" },
                                { label: "Pending Grades", value: pendingGrades.filter(p => p.submitted < p.total).length, color: "text-amber-400" },
                                { label: "Today's Classes", value: todaySlots.length, color: "text-purple-400" },
                            ].map(k => (
                                <div key={k.label} className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-center backdrop-blur-sm">
                                    <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-0.5">{k.label}</p>
                                    <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tab links styled like student portal */}
                    <div className="flex gap-1 overflow-x-auto no-scrollbar">
                        {[
                            { label: "Dashboard", href: "/teacher-portal", active: true },
                            { label: "My Schedule", href: "/teacher-portal/timetable" },
                            { label: "Attendance", href: "/academics/attendance" },
                            { label: "Grading", href: "/academics/examinations" },
                        ].map(tab => (
                            <Link
                                key={tab.label}
                                href={tab.href}
                                className={`px-6 sm:px-8 py-4 font-black text-xs sm:text-sm uppercase tracking-widest rounded-t-2xl rounded-b-none whitespace-nowrap transition-all
                                    ${tab.active
                                        ? "bg-[#F8FAFC] text-[#163D2D]"
                                        : "text-emerald-100/80 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">

                {/* Quick Action Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { href: "/academics/attendance", icon: CalendarCheck, label: "Mark Attendance", sub: "Daily Register", gradient: "from-blue-500 to-indigo-600", glow: "shadow-blue-500/30" },
                        { href: "/academics/examinations", icon: PenTool, label: "Enter Grades", sub: "Gradebook", gradient: "from-amber-400 to-orange-500", glow: "shadow-amber-500/30" },
                        { href: "/teacher-portal/timetable", icon: BookOpen, label: "My Timetable", sub: "Weekly Schedule", gradient: "from-emerald-500 to-teal-600", glow: "shadow-emerald-500/30" },
                        { href: "#", icon: MessageSquare, label: "Parent Comms", sub: "Send Messages", gradient: "from-purple-500 to-fuchsia-600", glow: "shadow-purple-500/30" },
                    ].map(a => (
                        <Link key={a.label} href={a.href} className="group">
                            <Card className="rounded-[1.75rem] border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 p-5 flex flex-col items-center text-center gap-3">
                                <div className={`p-3.5 rounded-2xl text-white bg-gradient-to-br ${a.gradient} shadow-lg ${a.glow} group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                                    <a.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-black text-xs tracking-tight uppercase text-slate-700 group-hover:text-emerald-700 transition-colors">{a.label}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{a.sub}</p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Main grid: 2/3 + 1/3 */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* LEFT: schedule + announcements */}
                    <div className="xl:col-span-2 space-y-8">

                        {/* Weekly Class Schedule Calendar */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="font-black text-2xl text-slate-900">Weekly Schedule</CardTitle>
                                    <CardDescription className="font-medium text-sm mt-0.5">March 10 – 14, 2026 — Term 3</CardDescription>
                                </div>
                                <Link href="/teacher-portal/timetable">
                                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-9">
                                        Full View <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-5 gap-3">
                                    {weekSchedule.map((day, di) => (
                                        <div key={day.day} className={`space-y-2 ${di === 3 ? "ring-2 ring-emerald-500/30 bg-emerald-50/50 rounded-2xl p-2 -m-2" : ""}`}>
                                            <div className="text-center pb-2 border-b border-slate-100">
                                                <p className={`font-black text-xs uppercase tracking-widest ${di === 3 ? "text-emerald-700" : "text-slate-400"}`}>{day.day}</p>
                                                <p className={`font-black text-sm mt-0.5 ${di === 3 ? "text-emerald-900" : "text-slate-600"}`}>{day.date.split(" ")[1]}</p>
                                                {di === 3 && <div className="h-1 w-4 bg-emerald-500 rounded-full mx-auto mt-1" />}
                                            </div>
                                            {day.slots.map((slot, si) => (
                                                <div key={si} className={`p-2.5 rounded-xl text-white group hover:scale-105 transition-transform cursor-pointer ${slot.color}`}>
                                                    <p className="font-black text-[10px] uppercase tracking-wide leading-none">{slot.time}</p>
                                                    <p className="font-black text-xs mt-1 leading-tight line-clamp-2">{slot.subject}</p>
                                                    <p className="text-white/70 text-[9px] font-bold mt-1">{slot.class}</p>
                                                </div>
                                            ))}
                                            {day.slots.length === 0 && (
                                                <div className="p-2.5 rounded-xl bg-slate-100 text-center">
                                                    <p className="text-[10px] text-slate-400 font-bold">Free</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pending Grades */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shadow-sm">
                                        <PenTool className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-black text-2xl text-slate-900">Grading Queue</CardTitle>
                                        <CardDescription className="font-medium text-sm mt-0.5">Assessments awaiting your marks</CardDescription>
                                    </div>
                                </div>
                                <Link href="/academics/examinations">
                                    <Button variant="outline" className="rounded-2xl border-amber-200 text-amber-700 font-black text-xs uppercase tracking-widest h-9 hidden sm:flex hover:bg-amber-50">
                                        Gradebook
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="p-0">
                                {pendingGrades.map((pg, idx) => {
                                    const pct = Math.round((pg.submitted / pg.total) * 100);
                                    const barColor = pct === 100 ? "bg-emerald-500" : pct > 50 ? "bg-amber-500" : "bg-rose-500";
                                    return (
                                        <div key={idx} className="flex items-center gap-5 px-8 py-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
                                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors shrink-0">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-black text-sm text-slate-900">{pg.exam}</p>
                                                    <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold text-[9px] uppercase tracking-widest rounded-full">{pg.class}</Badge>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
                                                    </div>
                                                    <p className="text-[10px] font-black text-slate-400 shrink-0">{pg.submitted}/{pg.total}</p>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Due {pg.due}</p>
                                                {pct === 100 && <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-auto mt-1" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* Institutional Briefing */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-md">
                                        <Bell className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-black text-2xl text-slate-900">Institutional Briefing</CardTitle>
                                        <CardDescription className="font-medium text-sm mt-0.5">Directives and operational updates</CardDescription>
                                    </div>
                                </div>
                                <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 hidden sm:flex">ARCHIVE</Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                {recentAnnouncements.map((ann: any, idx: number) => (
                                    <div key={ann.id} className="p-8 hover:bg-slate-50 transition-colors cursor-pointer group border-b border-slate-50 last:border-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="font-black text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">{ann.title}</h3>
                                            <Badge variant="outline" className="shrink-0 border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-full">UPDATE</Badge>
                                        </div>
                                        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-2">{ann.date}</p>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2">{ann.content}</p>
                                        <div className="flex items-center gap-1.5 mt-4 text-emerald-600 font-black text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
                                            READ MORE <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT: Assigned classes + today's schedule + stats */}
                    <div className="space-y-6">
                        {/* Today's Schedule */}
                        <Card className="rounded-[2.5rem] border-slate-800 bg-slate-900 text-white p-7 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Thursday, Mar 13
                                    </p>
                                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black text-[10px] uppercase">Today</Badge>
                                </div>
                                <p className="font-black text-2xl mb-5 tracking-tight">Today's Classes</p>
                                <div className="space-y-3">
                                    {todaySlots.map((slot, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                                            <div className={`w-1 h-12 rounded-full ${slot.color} shrink-0`} />
                                            <div className="flex-1">
                                                <p className="font-black text-sm text-white">{slot.subject}</p>
                                                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{slot.class} · {slot.room}</p>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="font-black text-xs text-white/70">{slot.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Assigned Classes */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                                    <GraduationCap className="h-4 w-4" />
                                </div>
                                <h3 className="font-black text-base uppercase tracking-tight text-slate-900">Assigned Classes</h3>
                            </div>
                            <div className="space-y-3">
                                {assignedClasses.slice(0, 5).map((c: any) => (
                                    <div key={c.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-colors group cursor-pointer">
                                        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-emerald-100 transition-colors text-slate-400 group-hover:text-emerald-700 shrink-0">
                                            <BookOpen className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">{c.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.subject}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-400 shrink-0">
                                            <Users className="h-3.5 w-3.5" />
                                            <span className="font-black text-xs">{c.studentCount}</span>
                                        </div>
                                    </div>
                                ))}
                                {assignedClasses.length === 0 && (
                                    <div className="text-center py-8 text-slate-400 italic text-sm">No active classroom assignments.</div>
                                )}
                            </div>
                        </Card>

                        {/* Performance Snapshot */}
                        <Card className="rounded-[2.5rem] border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-7 shadow-md relative overflow-hidden">
                            <div className="absolute -right-6 -top-6 h-24 w-24 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />
                            <h3 className="font-black text-base uppercase tracking-tight text-emerald-900 mb-5 flex items-center gap-2">
                                <Target className="h-4 w-4 text-emerald-600" /> Performance Snapshot
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Avg. Class Score", value: "78%", icon: TrendingUp, color: "text-emerald-600" },
                                    { label: "Attendance Marked", value: "94%", icon: CalendarCheck, color: "text-blue-600" },
                                    { label: "Grading Complete", value: "67%", icon: CheckCircle2, color: "text-amber-600" },
                                    { label: "Top Student", value: "Aida M.", icon: Star, color: "text-amber-500" },
                                ].map(s => (
                                    <div key={s.label} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
                                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                                        </div>
                                        <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Lesson Plan CTA */}
                        <Card className="rounded-[2.5rem] border-purple-100 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-7 shadow-md group cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-2 flex items-center gap-2">
                                        <Zap className="h-3.5 w-3.5" /> AI Lesson Planner
                                    </p>
                                    <p className="font-black text-xl text-purple-900 tracking-tight leading-tight">Generate this week's lesson plan instantly</p>
                                </div>
                                <div className="p-3 bg-white rounded-2xl shadow-md text-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
                                    <Zap className="h-5 w-5" />
                                </div>
                            </div>
                            <Button className="w-full rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest h-10 mt-2">
                                Open AI Planner <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
