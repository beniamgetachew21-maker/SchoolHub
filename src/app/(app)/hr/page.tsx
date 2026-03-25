import { getEmployees } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
    Users, UserPlus, Briefcase, CalendarCheck, TrendingUp, DollarSign,
    ArrowRight, CheckCircle2, Clock, AlertCircle, Award, Shield,
    Building2, ChevronRight, Zap, FileText, Target, Activity
} from "lucide-react";

// Mock onboarding employees in pipeline
const onboardingPipeline = [
    { name: "Tigist Alemu", role: "Math Teacher", stage: "Offer Accepted", progress: 85, color: "bg-emerald-500", daysLeft: 3 },
    { name: "Dawit Belay", role: "Lab Technician", stage: "Documents Pending", progress: 55, color: "bg-amber-500", daysLeft: 7 },
    { name: "Sara Hailu", role: "Counselor", stage: "Background Check", progress: 35, color: "bg-blue-500", daysLeft: 12 },
    { name: "Yonas Tekeste", role: "PE Instructor", stage: "HR Interview", progress: 20, color: "bg-purple-500", daysLeft: 18 },
];

// Mock org chart nodes
const orgChart = [
    { id: "dir", name: "Dr. Abebe Girma", role: "School Director", level: 0, initials: "AG", color: "bg-[#163D2D]" },
    { id: "dep-a", name: "Hirut Tadesse", role: "Academic Director", level: 1, initials: "HT", color: "bg-blue-600" },
    { id: "dep-h", name: "Molla Wolde", role: "HR Manager", level: 1, initials: "MW", color: "bg-purple-600" },
    { id: "dep-f", name: "Sara Bekele", role: "Finance Director", level: 1, initials: "SB", color: "bg-amber-600" },
    { id: "hod-m", name: "Yonas Tekeste", role: "Math HOD", level: 2, initials: "YT", color: "bg-slate-600" },
    { id: "hod-s", name: "Tigist Alemu", role: "Science HOD", level: 2, initials: "TA", color: "bg-slate-600" },
    { id: "hod-e", name: "Dawit Hailu", role: "English HOD", level: 2, initials: "DH", color: "bg-slate-600" },
];

// Mock attendance summary
const deptAttendance = [
    { dept: "Academic", present: 42, absent: 3, late: 2, total: 47 },
    { dept: "Administration", present: 12, absent: 1, late: 0, total: 13 },
    { dept: "Support Staff", present: 18, absent: 4, late: 3, total: 25 },
    { dept: "Security", present: 8, absent: 0, late: 1, total: 9 },
];

// Mock payroll summary
const payrollItems = [
    { label: "Gross Payroll", value: "ETB 4,820,000", sub: "87 employees · Mar 2026", color: "text-slate-900" },
    { label: "Tax Deductions", value: "ETB 723,000", sub: "Income & pension tax", color: "text-rose-600" },
    { label: "Net Disbursement", value: "ETB 4,097,000", sub: "Scheduled Mar 28", color: "text-emerald-600" },
];

export default async function HRCommandCenterPage() {
    const data = await getEmployees({ pageSize: 1000 }); // Get a larger set for dashboard stats
    const employees = data.employees || [];
    const totalStaff = data.totalCount || employees.length;

    const activeStaff = employees.filter((e: any) => e.status === "Active").length;
    const onLeave = employees.filter((e: any) => e.status === "OnLeave").length;
    const recentHires = employees.slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ── Compact page header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">HR Command Center</h1>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Full lifecycle management — onboarding to payroll disbursement.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {[
                        { label: "Total Staff", value: totalStaff, color: "text-slate-900" },
                        { label: "Active", value: activeStaff, color: "text-emerald-600" },
                        { label: "On Leave", value: onLeave, color: "text-amber-600" },
                        { label: "Onboarding", value: onboardingPipeline.length, color: "text-blue-600" },
                    ].map(k => (
                        <div key={k.label} className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-center shadow-sm">
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-0.5">{k.label}</p>
                            <p className={`text-xl font-black ${k.color}`}>{k.value}</p>
                        </div>
                    ))}
                    <Link href="/hr/directory">
                        <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                            <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Add Employee
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="space-y-8">

                {/* Quick nav cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { href: "/hr/directory", icon: Users, label: "Staff Directory", sub: `${totalStaff} employees`, gradient: "from-blue-500 to-indigo-600", glow: "shadow-blue-500/30" },
                        { href: "/hr/recruitment", icon: UserPlus, label: "Recruitment", sub: "4 open positions", gradient: "from-purple-500 to-fuchsia-600", glow: "shadow-purple-500/30" },
                        { href: "/hr/leave", icon: CalendarCheck, label: "Leave Mgmt", sub: `${onLeave} on leave`, gradient: "from-amber-400 to-orange-500", glow: "shadow-amber-500/30" },
                        { href: "/hr/onboarding", icon: Zap, label: "Onboarding", sub: `${onboardingPipeline.length} in pipeline`, gradient: "from-emerald-500 to-teal-600", glow: "shadow-emerald-500/30" },
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

                {/* Main 2-col grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* LEFT (2/3) */}
                    <div className="xl:col-span-2 space-y-8">

                        {/* Interactive Org Chart */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="font-black text-2xl text-slate-900">Organization Structure</CardTitle>
                                    <CardDescription className="font-medium text-sm mt-0.5">Interactive org chart — Global Academy 2026</CardDescription>
                                </div>
                                <Badge className="bg-slate-100 text-slate-600 border-none font-black text-[10px] uppercase tracking-widest">Live Chart</Badge>
                            </CardHeader>
                            <CardContent className="p-8">
                                {/* Level 0 — Director */}
                                <div className="flex justify-center mb-4">
                                    <OrgNode node={orgChart[0]} />
                                </div>
                                {/* Connector */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-px h-6 bg-slate-200" />
                                </div>
                                {/* Level 1 — Department Heads */}
                                <div className="flex justify-center gap-4 mb-4 flex-wrap">
                                    {/* Connecting line above */}
                                    <div className="w-full flex justify-center mb-0">
                                        <div className="border-t-2 border-slate-200 w-2/3" />
                                    </div>
                                    {orgChart.filter(n => n.level === 1).map(n => (
                                        <div key={n.id} className="flex flex-col items-center">
                                            <div className="w-px h-5 bg-slate-200 mb-2" />
                                            <OrgNode node={n} />
                                        </div>
                                    ))}
                                </div>
                                {/* Level 2 — HODs */}
                                <div className="mt-2">
                                    <div className="flex justify-center mb-1">
                                        <div className="w-px h-5 bg-slate-200" />
                                    </div>
                                    <div className="border-t-2 border-slate-200 mx-auto w-3/4 mb-0" />
                                    <div className="flex justify-center gap-3 mt-0 flex-wrap pt-5">
                                        {orgChart.filter(n => n.level === 2).map(n => (
                                            <div key={n.id} className="flex flex-col items-center">
                                                <div className="w-px h-5 bg-slate-200 mb-2" />
                                                <OrgNode node={n} small />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Onboarding Pipeline */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Zap className="h-5 w-5" /></div>
                                    <div>
                                        <CardTitle className="font-black text-2xl text-slate-900">Onboarding Pipeline</CardTitle>
                                        <CardDescription className="font-medium text-sm mt-0.5">{onboardingPipeline.length} new hires in progress</CardDescription>
                                    </div>
                                </div>
                                <Link href="/hr/onboarding">
                                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-9 hidden sm:flex">
                                        Manage <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="p-0">
                                {onboardingPipeline.map((emp, idx) => (
                                    <div key={idx} className="flex items-center gap-5 px-8 py-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group cursor-pointer">
                                        <Avatar className="h-11 w-11 rounded-2xl ring-2 ring-slate-100 shrink-0">
                                            <AvatarFallback className={`${emp.color.replace("bg-", "bg-").replace("500", "100")} text-${emp.color.includes("emerald") ? "emerald" : emp.color.includes("amber") ? "amber" : emp.color.includes("blue") ? "blue" : "purple"}-700 font-black text-xs`}>
                                                {emp.name.split(" ").map(n => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">{emp.name}</p>
                                                <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold text-[9px] uppercase tracking-widest rounded-full">{emp.role}</Badge>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${emp.color} rounded-full`} style={{ width: `${emp.progress}%` }} />
                                                </div>
                                                <p className="text-[10px] font-black text-slate-400 shrink-0">{emp.progress}%</p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-black text-sm text-slate-700">{emp.stage}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{emp.daysLeft}d remaining</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Today's Attendance by Department */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                            <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Activity className="h-5 w-5" /></div>
                                    <div>
                                        <CardTitle className="font-black text-2xl text-slate-900">Biometric Attendance</CardTitle>
                                        <CardDescription className="font-medium text-sm mt-0.5">Today — March 13, 2026 by Department</CardDescription>
                                    </div>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] uppercase tracking-widest animate-pulse">Live</Badge>
                            </CardHeader>
                            <CardContent className="p-0">
                                {deptAttendance.map((dept, idx) => {
                                    const pct = Math.round((dept.present / dept.total) * 100);
                                    return (
                                        <div key={idx} className="flex items-center gap-6 px-8 py-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                                            <div className="w-36 shrink-0">
                                                <p className="font-black text-sm text-slate-800">{dept.dept}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dept.total} employees</p>
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                                    <div className={`h-full rounded-full ${pct >= 90 ? "bg-emerald-500" : pct >= 75 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${pct}%` }} />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 shrink-0 text-right">
                                                <div>
                                                    <span className="font-black text-sm text-emerald-600">{dept.present}</span>
                                                    <span className="text-slate-300 mx-1">/</span>
                                                    <span className="font-bold text-sm text-rose-500">{dept.absent} absent</span>
                                                </div>
                                                <Badge className={`font-black text-[10px] uppercase border-none ${pct >= 90 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{pct}%</Badge>
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-6">
                        {/* Payroll Summary */}
                        <Card className="rounded-[2.5rem] border-slate-800 bg-slate-900 text-white p-7 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Payroll — March 2026
                                    </p>
                                    <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 font-black text-[10px] uppercase">Pending</Badge>
                                </div>
                                <div className="space-y-4">
                                    {payrollItems.map((item, idx) => (
                                        <div key={idx} className={`${idx < payrollItems.length - 1 ? "pb-4 border-b border-white/10" : ""}`}>
                                            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">{item.label}</p>
                                            <p className={`text-2xl font-black tracking-tight ${idx === 2 ? "text-emerald-400" : idx === 1 ? "text-rose-400" : "text-white"}`}>{item.value}</p>
                                            <p className="text-white/30 text-[10px] font-bold mt-0.5">{item.sub}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-xs uppercase tracking-widest h-10">
                                    Process Payroll <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
                                </Button>
                            </div>
                        </Card>

                        {/* Recent Hires */}
                        <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-black text-base uppercase tracking-tight text-slate-900 flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-emerald-600" /> Recent Hires
                                </h3>
                                <Link href="/hr/directory">
                                    <Button variant="ghost" className="h-7 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-700 px-2">All →</Button>
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentHires.map((emp: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors group cursor-pointer">
                                        <Avatar className="h-10 w-10 rounded-xl ring-2 ring-white shrink-0">
                                            <AvatarImage src={emp.avatarUrl ?? undefined} className="object-cover" />
                                            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-black text-xs">{emp.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-sm text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">{emp.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{emp.designation}</p>
                                        </div>
                                        <Badge className={`shrink-0 border-none font-black text-[9px] uppercase tracking-widest ${emp.status === "Active" ? "bg-emerald-100 text-emerald-700" : emp.status === "OnLeave" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                                            {emp.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* HR KPI snapshot */}
                        <Card className="rounded-[2.5rem] border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-7 shadow-md">
                            <h3 className="font-black text-base uppercase tracking-tight text-emerald-900 mb-5 flex items-center gap-2">
                                <Target className="h-4 w-4 text-emerald-600" /> HR Metrics
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Avg. Tenure", value: "4.2 yrs", icon: Award, color: "text-emerald-600" },
                                    { label: "Retention Rate", value: "92%", icon: TrendingUp, color: "text-blue-600" },
                                    { label: "Training Hours (MTD)", value: "184 hrs", icon: Target, color: "text-purple-600" },
                                    { label: "Open Positions", value: "4", icon: Briefcase, color: "text-amber-600" },
                                    { label: "Policy Compliance", value: "98%", icon: Shield, color: "text-emerald-600" },
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

                        {/* AI Job Description Generator CTA */}
                        <Card className="rounded-[2.5rem] border-purple-100 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-7 shadow-md group cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-2 flex items-center gap-2">
                                        <Zap className="h-3.5 w-3.5" /> AI Powered
                                    </p>
                                    <p className="font-black text-xl text-purple-900 tracking-tight leading-tight">Generate a job description with AI instantly</p>
                                </div>
                                <div className="p-3 bg-white rounded-2xl shadow-md text-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
                                    <FileText className="h-5 w-5" />
                                </div>
                            </div>
                            <Link href="/hr/recruitment">
                                <Button className="w-full rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest h-10 mt-2">
                                    Open AI Recruitment <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OrgNode({ node, small = false }: { node: typeof orgChart[0]; small?: boolean }) {
    return (
        <div className={`flex flex-col items-center group cursor-pointer ${small ? "min-w-[90px]" : "min-w-[140px]"}`}>
            <div className={`${small ? "w-10 h-10 text-xs" : "w-14 h-14 text-sm"} rounded-2xl ${node.color} text-white font-black flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform`}>
                {node.initials}
            </div>
            <div className={`text-center mt-2 px-2 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm group-hover:border-emerald-200 transition-colors ${small ? "w-24" : "w-36"}`}>
                <p className={`font-black text-slate-900 leading-tight ${small ? "text-[9px]" : "text-[11px]"}`}>{node.name}</p>
                <p className={`font-bold text-slate-400 leading-tight mt-0.5 ${small ? "text-[8px]" : "text-[10px]"}`}>{node.role}</p>
            </div>
        </div>
    );
}
