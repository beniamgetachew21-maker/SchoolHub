"use client"
import * as React from "react"
import { 
    Calendar, Clock, BookOpen, ClipboardCheck, 
    ArrowUpRight, AlertCircle, Plus, ChevronRight,
    Users, Bookmark, Layout, Sparkles,
    GraduationCap, Target, Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function TeacherHubClient({ data }: { data: any }) {
    const { teacher, todaySchedule, activeAssignments, pendingAttendance } = data;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* ── Dynamic Welcome Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                         <Badge className="bg-[#163D2D] text-emerald-400 border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-emerald-900/10">
                             <Zap className="h-3 w-3 mr-1 fill-current" /> Faculty Hub
                         </Badge>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{today}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase italic leading-[0.85]">
                        Welcome Back,<br />
                        <span className="text-emerald-600">Prof. {teacher.firstName}</span>
                    </h1>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-tight mt-2 flex items-center gap-2">
                        {teacher.designation} <span className="h-1 w-1 rounded-full bg-slate-300" /> {teacher.department || "General Academics"}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/lms?mode=post">
                        <Button className="rounded-2xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 font-black text-xs uppercase tracking-widest h-12 px-6 shadow-sm group">
                             Post Asset <Plus className="h-4 w-4 ml-2 group-hover:rotate-90 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/academics/attendance">
                        <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-12 px-6 shadow-xl shadow-emerald-900/20">
                             Express Roll Call <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ── Status Alerts ── */}
            {pendingAttendance?.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                    <Alert className="rounded-[2.5rem] border-rose-100 bg-rose-50/50 p-6 flex items-center justify-between group cursor-pointer hover:bg-rose-50 transition-colors">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-3xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200">
                                <AlertCircle className="h-7 w-7" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-rose-900 uppercase tracking-tight italic">Pending Roll Calls</h3>
                                <p className="text-sm font-medium text-rose-700/80">You have {pendingAttendance.length} classes today without recorded attendance.</p>
                            </div>
                        </div>
                        <Link href="/academics/attendance">
                            <Button variant="ghost" className="rounded-2xl bg-white/50 text-rose-600 hover:bg-white font-black text-[10px] uppercase tracking-widest h-10 px-6 border border-rose-200">
                                Resolve Now
                            </Button>
                        </Link>
                    </Alert>
                </div>
            )}

            {/* ── Main Dashboard Layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* ── Today's Schedule (Center/Left) ── */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-black text-2xl uppercase tracking-tighter text-slate-900 italic flex items-center gap-3">
                            <Calendar className="h-6 w-6 text-emerald-600" /> Today&apos;s Lecture Path
                        </h3>
                        <Link href="/timetable" className="text-xs font-black uppercase tracking-widest text-emerald-600 hover:underline">Full Timetable</Link>
                    </div>

                    <div className="space-y-4">
                        {todaySchedule?.length > 0 ? todaySchedule.map((p: any, i: number) => (
                            <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 bg-white hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 group overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-50">
                                        <div className="p-8 sm:w-48 bg-slate-50/50 flex flex-col justify-center items-center text-center gap-1 group-hover:bg-emerald-50 transition-colors">
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Status</span>
                                            <span className="text-xl font-black text-emerald-600 italic leading-none">{p.startTime}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.endTime}</span>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="h-14 w-14 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                     <Bookmark className="h-7 w-7" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-xl text-slate-900 uppercase italic tracking-tight leading-none mb-1">{p.course.name}</h4>
                                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">{p.section.sectionName} <span className="mx-2 opacity-30">|</span> Room {p.room.roomId}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                 <Link href={`/academics/attendance?class=${p.section.sectionName}`}>
                                                      <Button variant="ghost" className="rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 h-11 px-6">
                                                          Roll Call
                                                      </Button>
                                                 </Link>
                                                 <Link href={`/lms/courses/${p.course.courseId}`}>
                                                      <Button variant="ghost" className="rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#163D2D] bg-slate-50 hover:bg-emerald-100 h-11 px-6">
                                                          Materials
                                                      </Button>
                                                 </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )) : (
                            <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400 border-2 border-dashed rounded-[3rem] border-slate-100 bg-slate-50/50">
                                 <BookOpen className="h-10 w-10 opacity-20" />
                                 <p className="font-black text-sm uppercase italic">No lectures scheduled for today.</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { icon: GraduationCap, label: "Gradebook", color: "bg-amber-50 text-amber-600", href: "/academics/report-cards" },
                            { icon: ClipboardCheck, label: "Exam Center", color: "bg-purple-50 text-purple-600", href: "/academics/examinations" },
                            { icon: Users, label: "My Students", color: "bg-blue-50 text-blue-600", href: "/students" },
                            { icon: Layout, label: "LMS Console", color: "bg-emerald-50 text-emerald-600", href: "/lms" },
                        ].map((m, i) => (
                            <Link key={i} href={m.href} className="group">
                                <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/30 bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center gap-4">
                                     <div className={cn("p-4 rounded-[1.5rem] group-hover:scale-110 transition-transform", m.color)}>
                                          <m.icon className="h-6 w-6" />
                                     </div>
                                     <span className="font-black text-[10px] uppercase tracking-widest text-slate-600">{m.label}</span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Sidebar: Assignments & Insights ── */}
                <div className="lg:col-span-4 space-y-8">
                    
                    {/* Insights Card */}
                    <Card className="rounded-[2.5rem] bg-[#163D2D] text-white p-8 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-400/20 rounded-xl text-emerald-400">
                                    <Target className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Weekly Intelligence</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black italic tracking-tighter leading-[0.85] mb-2 uppercase">Core Academic<br />Performance</h3>
                                <div className="flex items-end gap-2 text-emerald-400">
                                     <ArrowUpRight className="h-6 w-6" />
                                     <span className="text-xs font-bold uppercase tracking-tight">+12% vs last term</span>
                                </div>
                            </div>
                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                                        <span>Course Completion</span>
                                        <span>84%</span>
                                    </div>
                                    <Progress value={84} className="h-1 bg-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                                        <span>Avg. Attendance</span>
                                        <span>92%</span>
                                    </div>
                                    <Progress value={92} className="h-1 bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Active Assignments */}
                    <Card className="rounded-[3rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-8">
                         <div className="flex items-center justify-between mb-8">
                             <h3 className="font-black text-xl uppercase tracking-tighter text-slate-900 italic flex items-center gap-2">
                                 <Bookmark className="h-5 w-5 text-emerald-600" /> Active Tasks
                             </h3>
                             <Badge variant="outline" className="rounded-full font-black text-[9px] uppercase tracking-widest border-slate-100 text-slate-400">
                                 {activeAssignments?.length || 0} Total
                             </Badge>
                         </div>
                         <div className="space-y-6">
                             {activeAssignments?.length > 0 ? activeAssignments.map((a: any, i: number) => (
                                 <div key={i} className="flex gap-4 group cursor-pointer">
                                     <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                          <Bookmark className="h-4 w-4" />
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="font-black text-[11px] text-slate-800 uppercase italic truncate leading-none mb-1 group-hover:text-emerald-600 transition-colors">{a.title}</p>
                                         <div className="flex items-center justify-between">
                                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Due {new Date(a.dueDate).toLocaleDateString()}</span>
                                              <span className="text-[9px] font-black text-emerald-600 uppercase italic">Active</span>
                                         </div>
                                     </div>
                                 </div>
                             )) : (
                                <div className="py-8 text-center text-slate-300 font-bold text-[10px] uppercase italic tracking-widest">
                                     No active assignments.
                                </div>
                             )}
                         </div>
                         <Link href="/lms/assignments">
                             <Button className="w-full mt-8 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-black text-[10px] uppercase tracking-widest h-12 border-none">
                                 Manage LMS Catalog
                             </Button>
                         </Link>
                    </Card>

                    {/* AI Assistant CTA */}
                    <Card className="rounded-[3rem] border-slate-100 border-dashed bg-slate-50/50 p-8 text-center space-y-4">
                         <div className="h-16 w-16 bg-white rounded-3xl shadow-xl mx-auto flex items-center justify-center text-emerald-600">
                              <Sparkles className="h-8 w-8 animate-pulse" />
                         </div>
                         <div>
                             <h4 className="font-black text-lg text-slate-900 uppercase italic leading-none mb-1">Academics AI</h4>
                             <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Generate lesson plans & quizzes instantly.</p>
                         </div>
                         <Button variant="outline" className="w-full rounded-2xl font-black text-[9px] uppercase tracking-widest h-10 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                             Try Academy AI
                         </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
