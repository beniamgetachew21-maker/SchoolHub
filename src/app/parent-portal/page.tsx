
import { getStudentById, getAttendanceSummaryForStudent, getInvoicesForStudent } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarCheck, FileText, MessageSquare, ShoppingCart, Wallet, CheckCircle, BookOpen, HeartHandshake, GraduationCap, TrendingUp, Plus, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ParentPortalClient from "./client";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MapPin, Navigation } from "lucide-react";

// Hardcoded for demonstration. In a real app, this would come from the parent's session.
const STUDENT_ID = "S001";

const announcements = [
    { id: 1, title: "Annual Sports Day", date: "2024-08-15", content: "The annual sports day will be held on August 15th." },
    { id: 2, title: "Parent-Teacher Meeting", date: "2024-08-10", content: "A parent-teacher meeting is scheduled for August 10th." },
];

export default async function ParentPortalPage() {
    const [student, attendance, invoices] = await Promise.all([
        getStudentById(STUDENT_ID),
        getAttendanceSummaryForStudent(STUDENT_ID),
        getInvoicesForStudent(STUDENT_ID),
    ]);

    if (!student) {
        notFound();
    }

    const unpaidInvoices = invoices.filter(inv => inv.status !== "Paid");
    const totalDue = unpaidInvoices.reduce((acc, curr) => acc + curr.amount, 0);
    const attendancePercentage = attendance
        ? (attendance.presentDays / attendance.totalDays) * 100
        : 94; // fallback for demo

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 relative z-10 w-full max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-slate-900 to-emerald-900/40 pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live Updates Secure
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter text-white uppercase leading-tight">
                            Welcome Back,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Ato Bekele</span>
                        </h1>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed">
                            Monitoring academic excellence and campus involvement for <strong className="text-white">{student.name}</strong>.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outline" className="rounded-2xl border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white text-slate-300 font-bold h-12 px-6 backdrop-blur-md transition-all duration-300">
                            Generate Report
                        </Button>
                        <Button className="rounded-2xl emerald-gradient font-black h-12 px-6 text-white shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300">
                            Campus News
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Column: Student Profile & Key Stats */}
                <div className="xl:col-span-4 space-y-8">
                    {/* Glass Profile Card */}
                    <Card className="rounded-[2.5rem] border border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative group">
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
                        <div className="absolute top-4 right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                            <GraduationCap className="h-24 w-24 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        
                        <CardHeader className="p-8 pb-6 relative z-10">
                            <div className="flex flex-col items-center text-center gap-5">
                                <div className="relative group/avatar cursor-pointer">
                                    <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20 group-hover/avatar:opacity-40 transition-opacity duration-500" />
                                    <Avatar className="relative h-32 w-32 ring-4 ring-white dark:ring-slate-800 shadow-2xl transition-transform duration-500 group-hover/avatar:scale-105">
                                        <AvatarImage src={student.avatarUrl ?? undefined} alt={student.name} />
                                        <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-900 dark:to-slate-800 text-emerald-800 dark:text-emerald-300 text-4xl font-black">{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                                       <CheckCircle className="h-4 w-4 text-white" />
                                    </span>
                                </div>
                                <div>
                                    <CardTitle className="font-headline text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">{student.name}</CardTitle>
                                    <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-none font-black uppercase text-[10px] tracking-widest mt-3 px-3 py-1 rounded-full shadow-sm">{student.className || "Grade 10-A"}</Badge>
                                </div>
                                
                                <div className="w-full grid grid-cols-2 gap-4 mt-2">
                                    <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 text-left">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Student ID</p>
                                        <p className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-200 mt-0.5">{student.studentId}</p>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 text-right">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">House</p>
                                        <p className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-200 mt-0.5">Red Lion</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 relative z-10">
                           <Button variant="outline" className="w-full rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-black py-6 mt-2 transition-all duration-300 child:hover:text-emerald-600">VIEW FULL PROFILE</Button>
                        </CardContent>
                    </Card>

                    {/* Premium Attendance Widget */}
                    <Card className="rounded-[2.5rem] border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl ring-1 ring-blue-100 dark:ring-blue-500/20 shadow-inner">
                                    <CalendarCheck className="h-5 w-5" />
                                </div>
                                <h3 className="font-black font-headline text-lg uppercase tracking-tight text-slate-900 dark:text-white">Attendance</h3>
                            </div>
                            <Badge variant="outline" className="border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black text-[10px] tracking-widest px-3 py-1">ON TRACK</Badge>
                        </div>
                        <div className="space-y-8">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{attendancePercentage.toFixed(1)}</p>
                                        <span className="text-2xl font-bold text-slate-400">%</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Global Term Presence</p>
                                </div>
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
                                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                                </div>
                            </div>
                            <Progress value={attendancePercentage} className="h-3 bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700/50 shadow-inner">
                                <div className="h-full emerald-gradient transition-all duration-1000 ease-out" style={{ width: `${attendancePercentage}%` }} />
                            </Progress>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex flex-col justify-center">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Present</p>
                                    <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{attendance?.presentDays || 0}</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex flex-col justify-center">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Absent</p>
                                    <p className="text-2xl font-black text-rose-500">{attendance?.absentDays || 0}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Financial Summary */}
                    <Card className="rounded-[2.5rem] border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 relative overflow-hidden group">
                        <div className="absolute -bottom-10 -right-10 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 rotate-12">
                            <Wallet className="h-40 w-40 text-rose-500" />
                        </div>
                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl ring-1 ring-rose-100 dark:ring-rose-500/20 shadow-inner">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <h3 className="font-black font-headline text-lg uppercase tracking-tight text-slate-900 dark:text-white">Financials</h3>
                        </div>
                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Due Balance</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-400">$</span>
                                    <p className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{totalDue.toLocaleString()}</p>
                                </div>
                            </div>
                            {unpaidInvoices.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-bold bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl">
                                        <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                        <span>{unpaidInvoices.length} pending obligations found.</span>
                                    </div>
                                    <ParentPortalClient
                                        unpaidInvoices={unpaidInvoices.map(inv => ({ id: inv.invoiceId, description: inv.description || "School Fee", amount: inv.amount }))}
                                        studentName={student.name}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                                    <CheckCircle className="h-6 w-6" />
                                    <span>All obligations settled for the term.</span>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Actions & Feed */}
                <div className="xl:col-span-8 space-y-8">
                    {/* Premium Quick Actions Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        <PremiumActionCard href={`/students/${student.studentId}/report-card`} icon={FileText} label="Transcripts" sub="Official Grades" gradient="from-blue-500 to-indigo-600" glow="shadow-blue-500/30" />
                        <PremiumActionCard href="/lms/courses" icon={BookOpen} label="E-Learning" sub="Course Materials" gradient="from-emerald-400 to-teal-600" glow="shadow-emerald-500/30" />
                        <PremiumActionCard href="/academics/examinations" icon={CalendarCheck} label="Exams" sub="Live Tracking" gradient="from-amber-400 to-orange-500" glow="shadow-amber-500/30" />
                        <PremiumActionCard href="/parent-portal/store" icon={ShoppingCart} label="Campus Store" sub="Order Supplies" gradient="from-purple-500 to-fuchsia-600" glow="shadow-purple-500/30" />
                        <PremiumActionCard href="#" icon={MessageSquare} label="Messages" sub="Contact Faculty" gradient="from-pink-500 to-rose-500" glow="shadow-pink-500/30" />
                        <PremiumActionCard href="#" icon={HeartHandshake} label="Alumni" sub="Stay Connected" gradient="from-slate-600 to-slate-800" glow="shadow-slate-500/30" />
                    </div>

                    {/* Announcements Feed (Modernized) */}
                    <Card className="rounded-[2.5rem] border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                        <CardHeader className="p-8 pb-5 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-900 dark:bg-white rounded-2xl text-white dark:text-slate-900 shadow-md">
                                    <Bell className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <CardTitle className="font-headline text-2xl font-black text-slate-900 dark:text-white">Campus Pulse</CardTitle>
                                    <CardDescription className="font-medium text-slate-500">Strategic highlights and institutional updates.</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-emerald-600 hidden sm:flex">VIEW ALL ARCHIVES</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {announcements.map((ann) => (
                                    <div key={ann.id} className="p-8 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-300 cursor-pointer group">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="space-y-1 relative">
                                                <h3 className="font-black text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors pr-8">{ann.title}</h3>
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{new Date(ann.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                            <Badge variant="outline" className="rounded-full border-slate-200 dark:border-slate-700 text-slate-400 font-bold px-3 py-1 text-[10px] uppercase tracking-widest shrink-0 hidden sm:flex">OFFICIAL</Badge>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">{ann.content}</p>
                                        <div className="flex items-center gap-2 mt-5 text-emerald-600 dark:text-emerald-400 font-black text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                                            READ FULL ARTICLE <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Secondary Insights Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Term Progress Widget */}
                        <Card className="rounded-[2.5rem] p-8 border-slate-800 bg-slate-900 text-white overflow-hidden relative shadow-2xl">
                             <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />
                             <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-48 w-48 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />
                             
                             <div className="relative z-10">
                                 <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-8 flex items-center gap-2">
                                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                     Term Progress
                                 </h4>
                                 <div className="flex items-end justify-between mb-5">
                                    <div className="text-6xl font-black tracking-tighter">W12 <span className="text-2xl text-slate-500 font-bold">/ 18</span></div>
                                    <div className="text-emerald-400 font-black text-sm tracking-widest uppercase">68% Done</div>
                                 </div>
                                 <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full relative" style={{ width: '68%' }}>
                                        <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-white/30 to-transparent" />
                                    </div>
                                 </div>
                             </div>
                        </Card>

                        {/* Health Status Widget */}
                        <Card className="rounded-[2.5rem] p-8 border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 backdrop-blur-sm flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-40 w-40 bg-emerald-200/40 dark:bg-emerald-800/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-300/40 transition-colors duration-500" />
                            <div className="space-y-2 relative z-10 w-full flex justify-between items-start">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                                         <HeartHandshake className="h-3.5 w-3.5" />
                                         Health Status
                                    </h4>
                                    <p className="text-3xl font-black text-emerald-900 dark:text-white tracking-tight">Optimal <span className="text-emerald-500">(A+)</span></p>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-md text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                    <Plus className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-emerald-200/50 dark:border-emerald-800/30 relative z-10">
                                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex justify-between items-center">
                                    <span>Regular Checkup</span>
                                    <span className="text-emerald-800 dark:text-emerald-200">Mar 22</span>
                                </p>
                            </div>
                        </Card>

                        {/* Live Route Map Widget */}
                        <Card className="rounded-[2.5rem] border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 overflow-hidden relative group cursor-pointer lg:col-span-2">
                             <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl ring-1 ring-amber-100 dark:ring-amber-500/20 shadow-inner">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-black font-headline text-lg uppercase tracking-tight text-slate-900 dark:text-white">Live Route Map</h3>
                                </div>
                                <Badge className="bg-amber-500 dark:bg-amber-600 text-white font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full shadow-md shadow-amber-500/30 animate-pulse border-none">LIVE TRACKING</Badge>
                             </div>
                             <div className="relative h-64 bg-slate-100 dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner group-hover:shadow-lg transition-all duration-500">
                                 {/* Mock Map Background */}
                                 <div className="absolute inset-0 opacity-50 dark:opacity-30 grayscale group-hover:grayscale-[50%] transition-all duration-700 scale-105 group-hover:scale-100" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Addis_Ababa_administrative_map.png/800px-Addis_Ababa_administrative_map.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                 <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-900" />
                                 <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
                                 
                                 {/* Map Path Line (Mock) */}
                                 <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                                     <path d="M 0,100 Q 150,150 300,50 T 600,100" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8,8" className="text-amber-500" />
                                 </svg>
                                 
                                 {/* Moving Bus Marker */}
                                 <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2">
                                     <div className="relative">
                                         <div className="absolute -inset-4 bg-amber-500/20 rounded-full animate-ping" />
                                         <div className="bg-amber-500 p-3 rounded-full shadow-2xl ring-4 ring-white dark:ring-slate-800 z-10 relative transform hover:scale-110 transition-transform">
                                             <Navigation className="h-5 w-5 text-white fill-current md:rotate-45" />
                                         </div>
                                     </div>
                                 </div>
                                 
                                 {/* Map Overlay Panel */}
                                 <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50">
                                     <div className="flex items-center gap-4">
                                         <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                             <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                         </div>
                                         <div>
                                             <p className="text-[10px] font-black uppercase text-slate-400">Current Zone</p>
                                             <p className="text-sm font-black text-slate-900 dark:text-white">Bole, Addis Ababa</p>
                                         </div>
                                     </div>
                                     <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
                                     <div className="sm:text-right flex items-center justify-between sm:block">
                                         <p className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">Est. Arrival</p>
                                         <p className="text-lg font-black text-slate-900 dark:text-white">8 MINS</p>
                                     </div>
                                 </div>
                             </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PremiumActionCard({ href, icon: Icon, label, sub, gradient, glow }: { href: string, icon: any, label: string, sub: string, gradient: string, glow: string }) {
    return (
        <Link href={href} className="block group">
            <Card className="h-full rounded-[2rem] border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 flex flex-col items-center text-center gap-5 hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b from-white/60 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className={cn("p-4 rounded-2xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg relative z-10", glow, `bg-gradient-to-br ${gradient}`)}>
                    <Icon className="h-7 w-7" />
                </div>
                <div className="relative z-10">
                    <p className="font-black text-sm tracking-tight uppercase group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-none mb-1.5 text-slate-900 dark:text-white">{label}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{sub}</p>
                </div>
            </Card>
        </Link>
    );
}
