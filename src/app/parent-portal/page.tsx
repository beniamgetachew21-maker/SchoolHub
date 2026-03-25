import { getStudentDashboardDataAction, getStudents, getResultsForStudent } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    ArrowRight, CalendarCheck, FileText, MessageSquare, ShoppingCart, Wallet,
    CheckCircle, BookOpen, HeartHandshake, GraduationCap, TrendingUp, Bell,
    MapPin, Navigation, Star, AlertCircle, CreditCard, QrCode, Lock, ChevronRight,
    Sparkles
} from "lucide-react";
import ParentPortalClientWrapper from "./parent-portal-client";

const announcements = [
    { id: 1, title: "Annual Sports Day", date: "2024-08-15", content: "The annual sports day will be held on August 15th at the main stadium. Students are encouraged to participate.", tag: "EVENT" },
    { id: 2, title: "Parent-Teacher Meeting", date: "2024-08-10", content: "A parent-teacher meeting is scheduled for August 10th. Please confirm your attendance with the administration.", tag: "IMPORTANT" },
];

export default async function ParentPortalPage() {
    const { students } = await getStudents({ pageSize: 50 });
    const studentToView = students.find((s: any) => s.name.includes("Aida")) || students[0];

    if (!studentToView) notFound();

    const [{ data: dashboardData }, rawResults] = await Promise.all([
        getStudentDashboardDataAction(studentToView.studentId),
        getResultsForStudent(studentToView.studentId),
    ]);

    if (!dashboardData) notFound();

    const { student, attendance, invoices, gpa } = dashboardData;

    // Map raw results to subject-level aggregates (latest result per subject)
    const subjectMap = new Map<string, { name: string; grade: string; score: number; teacher: string }>();
    for (const r of (rawResults as any[])) {
        const subject = r.subject || "Unknown";
        const score = r.maxMarks > 0 ? Math.round((r.marksObtained / r.maxMarks) * 100) : 0;
        const existing = subjectMap.get(subject);
        if (!existing || score > existing.score) {
            subjectMap.set(subject, {
                name: subject,
                grade: r.grade || (score >= 90 ? "A+" : score >= 85 ? "A" : score >= 80 ? "A-" : score >= 75 ? "B+" : score >= 70 ? "B" : score >= 65 ? "B-" : score >= 60 ? "C+" : "C"),
                score,
                teacher: "",
            });
        }
    }
    const subjects = Array.from(subjectMap.values()).slice(0, 8);

    const unpaidInvoices = invoices.filter((inv: any) => inv.status !== "Paid");
    const totalDue = unpaidInvoices.reduce((acc: number, curr: any) => acc + curr.amount, 0);
    const attendancePercentage = attendance
        ? Math.min(100, (attendance.presentDays / Math.max(attendance.totalDays, 1)) * 100)
        : 94;

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
            {/* ── Full-bleed emerald header ── */}
            <div className="bg-[#163D2D] text-white pt-6 pb-0 px-6 sm:px-8 w-full relative overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[50%] h-full bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-[1600px] mx-auto w-full relative z-10">
                    {/* Topbar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <span className="text-xl font-black tracking-wide text-white uppercase italic">
                            CAMPUS HUB <span className="text-emerald-400 font-bold not-italic">PARENT PORTAL</span>
                        </span>
                        <div className="flex items-center gap-3">
                            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-xs uppercase tracking-widest h-8 hidden sm:flex">
                                <QrCode className="h-3.5 w-3.5 mr-1.5" /> Digital Pass
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full relative h-9 w-9">
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 border border-[#163D2D] rounded-full" />
                            </Button>
                            <Avatar className="h-9 w-9 rounded-xl border border-white/20 cursor-pointer">
                                <AvatarImage src="/avatars/abiy.jpg" alt="Parent" />
                                <AvatarFallback className="bg-emerald-600 font-bold text-xs text-white">B</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    {/* Hero row */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
                        <div className="flex items-center gap-6">
                            <Avatar className="hidden sm:block h-24 w-24 rounded-[28px] border-4 border-white/10 shadow-2xl">
                                <AvatarImage src={student.avatarUrl ?? undefined} alt={student.name} className="object-cover" />
                                <AvatarFallback className="text-3xl font-black bg-emerald-700 text-white">{student.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-emerald-400 font-black text-xs tracking-widest uppercase mb-1">Welcome back, Ato Bekele</p>
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">{student.name}</h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                                        <CheckCircle className="h-3 w-3 mr-1" /> Enrolled
                                    </Badge>
                                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                                        {student.studentId} • {student.className ?? "Grade 11-A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* KPI chips */}
                        <div className="flex gap-3 flex-wrap">
                            {[
                                { label: "GPA", value: gpa.toFixed(2), color: "text-amber-400" },
                                { label: "Attendance", value: `${attendancePercentage.toFixed(1)}%`, color: "text-emerald-400" },
                                { label: "Class Rank", value: "#5", color: "text-blue-400" },
                                { label: "Term Due", value: totalDue > 0 ? `${totalDue.toLocaleString()} ETB` : "PAID", color: totalDue > 0 ? "text-rose-400" : "text-emerald-400" },
                            ].map(k => (
                                <div key={k.label} className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-center backdrop-blur-sm">
                                    <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-0.5">{k.label}</p>
                                    <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {[
                        { href: `/students/${student.studentId}/report-card`, icon: FileText, label: "Transcripts", gradient: "from-blue-500 to-indigo-600", glow: "shadow-blue-500/30" },
                        { href: "/lms/courses", icon: BookOpen, label: "E-Learning", gradient: "from-emerald-400 to-teal-600", glow: "shadow-emerald-500/30" },
                        { href: "/academics/examinations", icon: CalendarCheck, label: "Exams", gradient: "from-amber-400 to-orange-500", glow: "shadow-amber-500/30" },
                        { href: "/parent-portal/fees", icon: Wallet, label: "Fees", gradient: "from-rose-500 to-pink-600", glow: "shadow-rose-500/30" },
                        { href: "/parent-portal/store", icon: ShoppingCart, label: "Store", gradient: "from-purple-500 to-fuchsia-600", glow: "shadow-purple-500/30" },
                        { href: "#", icon: MessageSquare, label: "Messages", gradient: "from-slate-600 to-slate-800", glow: "shadow-slate-500/30" },
                    ].map(a => (
                        <Link key={a.label} href={a.href} className="group">
                            <Card className="rounded-[1.75rem] border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 p-5 flex flex-col items-center text-center gap-3">
                                <div className={`p-3.5 rounded-2xl text-white bg-gradient-to-br ${a.gradient} shadow-lg ${a.glow} group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                                    <a.icon className="h-5 w-5" />
                                </div>
                                <p className="font-black text-xs tracking-tight uppercase text-slate-700 group-hover:text-emerald-700 transition-colors">{a.label}</p>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Main 2-col grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* LEFT: Grades */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Academic Matrix */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-6 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="font-black text-2xl tracking-tight text-slate-900">Academic Matrix</CardTitle>
                                    <CardDescription className="text-sm font-medium mt-1">Term 3 Performance — All Subjects</CardDescription>
                                </div>
                                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2">
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                    <span className="font-black text-amber-700 text-sm">GPA {gpa}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-50">
                                    {subjects.length > 0 ? subjects.map((sub) => {
                                        const gradeColor = sub.score >= 90 ? "text-emerald-600 bg-emerald-50 border-emerald-200" : sub.score >= 80 ? "text-blue-600 bg-blue-50 border-blue-200" : "text-amber-600 bg-amber-50 border-amber-200";
                                        const barColor = sub.score >= 90 ? "bg-emerald-500" : sub.score >= 80 ? "bg-blue-500" : "bg-amber-500";
                                        return (
                                            <div key={sub.name} className="flex items-center gap-6 px-8 py-4 hover:bg-slate-50 transition-colors group">
                                                <div className="w-36 shrink-0">
                                                    <p className="font-black text-sm text-slate-800 group-hover:text-emerald-700 transition-colors">{sub.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{sub.teacher || "See report card"}</p>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                                        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${sub.score}%` }} />
                                                    </div>
                                                </div>
                                                <div className="shrink-0 flex items-center gap-3">
                                                    <span className="font-black text-sm text-slate-500">{sub.score}%</span>
                                                    <Badge className={`border font-black text-xs px-2 py-0.5 rounded-lg ${gradeColor}`}>{sub.grade}</Badge>
                                                </div>
                                            </div>
                                        );
                                    }) : (
                                        <div className="px-8 py-10 text-center">
                                            <p className="font-black text-slate-400 text-sm uppercase tracking-widest">No Grade Data Published Yet</p>
                                            <p className="text-xs text-slate-300 mt-1">Results will appear here once assessments are graded.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="px-8 py-5 border-t border-slate-50 flex items-center justify-between">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Continuous Assessment — Mid-Term</p>
                                    <Button variant="ghost" className="h-8 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-700">
                                        Full Report <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Announcements */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-md">
                                        <Bell className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-black text-2xl text-slate-900">Campus Pulse</CardTitle>
                                        <CardDescription className="text-sm font-medium mt-0.5">Institutional updates & highlights</CardDescription>
                                    </div>
                                </div>
                                <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 hidden sm:flex">VIEW ALL</Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                {announcements.map((ann) => (
                                    <div key={ann.id} className="p-8 hover:bg-slate-50 transition-colors cursor-pointer group border-b border-slate-50 last:border-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="font-black text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">{ann.title}</h3>
                                            <Badge variant="outline" className="shrink-0 border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-full">{ann.tag}</Badge>
                                        </div>
                                        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-2">{new Date(ann.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2">{ann.content}</p>
                                        <div className="flex items-center gap-1.5 mt-4 text-emerald-600 font-black text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
                                            READ MORE <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT: Sidebar */}
                    <div className="space-y-6">
                        {/* Learning Hub Widget */}
                        <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white p-7 overflow-hidden border-l-8 border-l-emerald-500">
                             <div className="flex items-center justify-between mb-6">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                         <GraduationCap className="h-4 w-4" />
                                     </div>
                                     <h3 className="font-black text-base uppercase tracking-tight text-slate-900">Learning Hub</h3>
                                 </div>
                                 <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] uppercase tracking-widest">Live Progress</Badge>
                             </div>
                             
                             <div className="space-y-5">
                                 <div>
                                     <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">
                                         <span>Math: Algebra</span><span className="text-emerald-600">80% Done</span>
                                     </div>
                                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                         <div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }} />
                                     </div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">
                                         <span>English Essay</span><span className="text-blue-600">Pending</span>
                                     </div>
                                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                         <div className="h-full bg-blue-400 rounded-full" style={{ width: "45%" }} />
                                     </div>
                                 </div>
                             </div>

                             <div className="mt-6 pt-6 border-t border-slate-50 space-y-4">
                                 <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 italic text-[11px] font-medium text-amber-900 leading-relaxed relative">
                                     <Sparkles className="h-4 w-4 text-amber-400 absolute -top-2 -right-2 bg-white rounded-full p-0.5" />
                                     "Aida is excelling in algebra but should focus more on her biology quiz prep this week."
                                 </div>
                                 <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50 h-10 rounded-xl">View Details →</Button>
                             </div>
                        </Card>

                        {/* Attendance Widget */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                        <CalendarCheck className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-black text-base uppercase tracking-tight text-slate-900">Attendance</h3>
                                </div>
                                <Badge variant="outline" className="border-emerald-200 text-emerald-600 font-black text-[10px] uppercase tracking-widest">ON TRACK</Badge>
                            </div>
                            <div className="flex items-baseline gap-1 mb-1">
                                <p className="text-5xl font-black tracking-tighter text-slate-900">{attendancePercentage.toFixed(1)}</p>
                                <span className="text-xl font-bold text-slate-400">%</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Term Presence Rate</p>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-5">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${attendancePercentage}%` }} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 rounded-2xl">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Present</p>
                                    <p className="text-2xl font-black text-slate-800 mt-0.5">{attendance?.presentDays ?? 112}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-2xl">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Absent</p>
                                    <p className="text-2xl font-black text-rose-500 mt-0.5">{attendance?.absentDays ?? 7}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Finance Card */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7 relative overflow-hidden">
                            <div className="absolute -bottom-8 -right-8 opacity-5">
                                <Wallet className="h-40 w-40 text-rose-500" />
                            </div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                                    <Wallet className="h-4 w-4" />
                                </div>
                                <h3 className="font-black text-base uppercase tracking-tight text-slate-900">Financials</h3>
                            </div>
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Due Balance</p>
                                <p className="text-4xl font-black tracking-tighter text-slate-900 mb-5">{totalDue.toLocaleString()} <span className="text-lg font-bold text-slate-400">ETB</span></p>

                                {unpaidInvoices.length > 0 ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-rose-600 text-xs font-bold bg-rose-50 border border-rose-100 p-3 rounded-xl">
                                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                            <span>{unpaidInvoices.length} pending invoice{unpaidInvoices.length > 1 ? "s" : ""} found</span>
                                        </div>
                                        <div className="space-y-2">
                                            {unpaidInvoices.slice(0, 3).map((inv: any) => (
                                                <div key={inv.invoiceId} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                                    <div>
                                                        <p className="font-bold text-xs text-slate-700 line-clamp-1">{inv.description || "School Fee"}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{inv.status}</p>
                                                    </div>
                                                    <p className="font-black text-sm text-slate-800 shrink-0">{inv.amount.toLocaleString()} ETB</p>
                                                </div>
                                            ))}
                                        </div>
                                        <ParentPortalClientWrapper
                                            unpaidInvoices={unpaidInvoices.map((inv: any) => ({ id: inv.invoiceId, description: inv.description || "School Fee", amount: inv.amount }))}
                                            studentName={student.name}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                                        <CheckCircle className="h-5 w-5" />
                                        <span className="text-sm">All obligations settled for the term.</span>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Term Progress */}
                        <Card className="rounded-[2.5rem] border-slate-800 bg-slate-900 text-white p-7 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-5 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Term Progress
                                </p>
                                <div className="flex items-end justify-between mb-4">
                                    <div className="text-5xl font-black tracking-tighter">W12 <span className="text-xl text-slate-500 font-bold">/ 18</span></div>
                                    <div className="text-emerald-400 font-black text-sm tracking-widest uppercase">68% Done</div>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full" style={{ width: "68%" }} />
                                </div>
                            </div>
                        </Card>

                        {/* Health Status */}
                        <Card className="rounded-[2.5rem] border-emerald-100 bg-emerald-50 p-7 relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 flex items-center gap-2 mb-2">
                                        <HeartHandshake className="h-3.5 w-3.5" /> Health Status
                                    </p>
                                    <p className="text-3xl font-black text-emerald-900 tracking-tight">Optimal <span className="text-emerald-500">(A+)</span></p>
                                </div>
                                <div className="p-4 bg-white rounded-2xl shadow-md text-emerald-600 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                    <HeartHandshake className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-emerald-200/50">
                                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest flex justify-between">
                                    <span>Next Checkup</span><span className="text-emerald-900">Mar 22</span>
                                </p>
                            </div>
                        </Card>

                        {/* Live Bus Tracker */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7 overflow-hidden">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-black text-base uppercase tracking-tight text-slate-900">Live Route</h3>
                                </div>
                                <Badge className="bg-amber-500 text-white font-black text-[10px] tracking-widest animate-pulse border-none rounded-full px-3">LIVE</Badge>
                            </div>
                            <div className="relative h-44 bg-slate-100 rounded-[1.5rem] overflow-hidden">
                                <div className="absolute inset-0 opacity-40 grayscale" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Addis_Ababa_administrative_map.png/800px-Addis_Ababa_administrative_map.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2">
                                    <div className="relative">
                                        <div className="absolute -inset-3 bg-amber-500/25 rounded-full animate-ping" />
                                        <div className="bg-amber-500 p-2.5 rounded-full shadow-xl ring-4 ring-white z-10 relative">
                                            <Navigation className="h-4 w-4 text-white fill-current rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Current Zone</p>
                                    <p className="font-black text-sm text-slate-900">Bole, Addis Ababa</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-amber-600">Est. Arrival</p>
                                    <p className="font-black text-lg text-slate-900">8 MINS</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
