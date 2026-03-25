import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    ClipboardCheck, Filter, Plus, Search, 
    ArrowRight, ChevronRight, FileText, Download,
    Clock, CheckCircle2, AlertCircle, MessageSquare,
    Calendar, User, BookOpen, ExternalLink
} from "lucide-react";
import Link from "next/link";

// Mock assignment data
const assignments = [
    { 
        id: "ASGN-552", 
        title: "Differential Equations Problem Set", 
        course: "MATH-201", 
        submissions: 42, 
        totalStudents: 45, 
        dueDate: "Mar 15, 2026", 
        status: "Active",
        priority: "High"
    },
    { 
        id: "ASGN-548", 
        title: "Historical Analysis: Adwa Victory", 
        course: "HIST-105", 
        submissions: 38, 
        totalStudents: 40, 
        dueDate: "Mar 18, 2026", 
        status: "Active",
        priority: "Medium"
    },
    { 
        id: "ASGN-540", 
        title: "Python Data Structures Final", 
        course: "CS-101", 
        submissions: 198, 
        totalStudents: 200, 
        dueDate: "Mar 10, 2026", 
        status: "Grading",
        priority: "Critical"
    },
    { 
        id: "ASGN-535", 
        title: "Quantum Physics Lab Report", 
        course: "PHYS-301", 
        submissions: 12, 
        totalStudents: 15, 
        dueDate: "Mar 22, 2026", 
        status: "Draft",
        priority: "Low"
    },
];

export default function AssignmentsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Link href="/lms" className="text-muted-foreground hover:text-[#163D2D] transition-colors">
                            <h2 className="text-sm font-bold uppercase tracking-widest italic text-slate-400">LMS</h2>
                        </Link>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Assignments Hub</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Coordinate student submissions and provide feedback.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Plus className="h-4 w-4 mr-2" /> Create Assignment
                    </Button>
                </div>
            </div>

            {/* ── Submission Pipeline ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Assign.", count: 12, color: "text-slate-900", bg: "bg-white border-slate-100" },
                    { label: "Pending Subm.", count: 245, color: "text-blue-600", bg: "bg-blue-50/50" },
                    { label: "Urgent Grading", count: 8, color: "text-amber-600", bg: "bg-amber-50/50" },
                    { label: "Completed (MTD)", count: 42, color: "text-emerald-600", bg: "bg-emerald-50/50" },
                ].map((s, i) => (
                    <Card key={i} className={`rounded-[1.75rem] border shadow-sm ${s.bg} p-6 h-full flex flex-col justify-center`}>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
                        <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
                    </Card>
                ))}
            </div>

            {/* ── Assignment Table/List ── */}
            <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                <CardHeader className="p-8 pb-3 border-b border-slate-50">
                    <CardTitle className="font-black text-2xl text-slate-900 italic">Submission Pipeline</CardTitle>
                    <CardDescription className="font-medium text-sm mt-0.5 text-slate-400">Review real-time data on every active academic task.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Task Details</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Progress</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Due Date</th>
                                    <th className="px-8 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {assignments.map((asgn, i) => (
                                    <tr key={i} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#163D2D] group-hover:bg-[#163D2D] group-hover:text-white transition-all duration-500">
                                                    <ClipboardCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm text-slate-900 line-clamp-1">{asgn.title}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{asgn.course}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                                asgn.status === 'Grading' ? 'bg-amber-100 text-amber-700' :
                                                asgn.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-slate-100 text-slate-500'
                                            }`}>
                                                {asgn.status}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-2 w-32">
                                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tight">
                                                    <span className="text-slate-900">{asgn.submissions}/{asgn.totalStudents}</span>
                                                    <span className="text-slate-400">{Math.round((asgn.submissions/asgn.totalStudents)*100)}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(asgn.submissions/asgn.totalStudents)*100}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-slate-900">
                                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                    <p className="text-xs font-bold">{asgn.dueDate}</p>
                                                </div>
                                                <Badge variant="outline" className={`w-fit h-4 p-0 px-1 border-none font-black text-[8px] uppercase tracking-tighter ${
                                                    asgn.priority === 'High' || asgn.priority === 'Critical' ? 'text-rose-500 bg-rose-50' : 'text-slate-400 bg-slate-50'
                                                }`}>
                                                    {asgn.priority} Priority
                                                </Badge>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#163D2D] hover:bg-emerald-50">
                                                    <MessageSquare className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#163D2D] hover:bg-emerald-50">
                                                    <FileText className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#163D2D] hover:bg-emerald-50">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-center">
                    <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">
                        Show Older Assignments
                    </Button>
                </div>
            </Card>

            {/* ── Bottom Section: Feedback & Activity ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <Card className="rounded-[2.5rem] bg-[#163D2D] p-8 text-white relative overflow-hidden shadow-2xl md:col-span-1">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                      <h3 className="text-xl font-black italic mb-4">Feedback Intelligence</h3>
                      <p className="text-xs text-white/60 font-medium leading-relaxed mb-6">Use automated grading assist for routine quizzes and bulk feedback generation for standard problem sets.</p>
                      <Button className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-[10px] uppercase h-11">
                           Configure AI Grading
                      </Button>
                 </Card>

                 <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-8 md:col-span-2">
                      <h3 className="font-black text-xl text-slate-900 uppercase italic mb-6">Recent Submissions</h3>
                      <div className="space-y-4">
                           {[
                               { user: "Dawit Hailu", course: "MATH-201", time: "2m ago", size: "1.4MB" },
                               { user: "Aster Kassa", course: "CS-101", time: "5m ago", size: "2.8MB" },
                               { user: "Sara Belay", course: "HIST-105", time: "15m ago", size: "450KB" },
                           ].map((item, i) => (
                               <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                                    <div className="flex items-center gap-4">
                                         <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 italic">
                                            {item.user.split(' ').map(n => n[0]).join('')}
                                         </div>
                                         <div>
                                              <p className="font-black text-xs text-slate-900 uppercase tracking-tight">{item.user}</p>
                                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.course} • {item.size}</p>
                                         </div>
                                    </div>
                                    <div className="text-right">
                                         <p className="text-[10px] font-black text-slate-400 mb-1">{item.time}</p>
                                         <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-300 group-hover:text-emerald-500">
                                              <Download className="h-3.5 w-3.5" />
                                         </Button>
                                    </div>
                               </div>
                           ))}
                      </div>
                 </Card>
            </div>
        </div>
    );
}
