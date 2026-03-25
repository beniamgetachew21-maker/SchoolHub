import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    GraduationCap, Plus, Search, Filter, 
    ArrowRight, ChevronRight, Clock, 
    BarChart3, Settings, PlayCircle,
    Users, Star, CheckCircle2, Layout
} from "lucide-react";
import Link from "next/link";

// Mock quiz data
const quizzes = [
    { 
        id: "QZ-88", 
        title: "Calculus II: Mid-Term Assessment", 
        course: "MATH-201", 
        activeStudents: 142, 
        avgScore: "78%", 
        timeLimit: "90 min",
        status: "Active",
        type: "Multiple Choice"
    },
    { 
        id: "QZ-85", 
        title: "Empire History: Fast Quiz", 
        course: "HIST-105", 
        activeStudents: 86, 
        avgScore: "92%", 
        timeLimit: "20 min",
        status: "Completed",
        type: "Mixed"
    },
    { 
        id: "QZ-90", 
        title: "Python Basics: Week 4 Review", 
        course: "CS-101", 
        activeStudents: 215, 
        avgScore: "-", 
        timeLimit: "45 min",
        status: "Scheduled",
        type: "Coding Submission"
    },
    { 
        id: "QZ-72", 
        title: "Organic Chemistry: Lab Safety", 
        course: "CHEM-302", 
        activeStudents: 30, 
        avgScore: "85%", 
        timeLimit: "30 min",
        status: "Archive",
        type: "True/False"
    },
];

export default function QuizzesPage() {
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
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Quiz Engine</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Automated assessments and performance analytics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Settings className="h-4 w-4 mr-2" /> Global Config
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Plus className="h-4 w-4 mr-2" /> Design New Quiz
                    </Button>
                </div>
            </div>

            {/* ── Quiz Analytics Summary ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Quizzes", count: 42, icon: Layout, color: "text-slate-900", bg: "bg-white" },
                    { label: "Active Now", count: 3, icon: PlayCircle, color: "text-emerald-600", bg: "bg-emerald-50/50" },
                    { label: "Avg. Campus Score", count: "82%", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50/50" },
                    { label: "Review Required", count: 12, icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50/50" },
                ].map((s, i) => (
                    <Card key={i} className={`rounded-[1.75rem] border-none shadow-sm ${s.bg} p-6 flex flex-col justify-center`}>
                        <div className="flex items-center justify-between mb-2">
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{s.label}</p>
                             <s.icon className={`h-4 w-4 ${s.color} opacity-40`} />
                        </div>
                        <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
                    </Card>
                ))}
            </div>

            {/* ── All Quizzes List ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 <div className="xl:col-span-2 space-y-4">
                      <div className="flex items-center justify-between px-2">
                           <h3 className="font-black text-lg uppercase tracking-tight text-slate-900 italic">Assessment Registry</h3>
                           <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 text-slate-300 mr-2" />
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-[#163D2D] bg-emerald-50">All</Button>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Archived</Button>
                           </div>
                      </div>

                      {quizzes.map((quiz, i) => (
                          <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white hover:shadow-2xl hover:border-emerald-100 transition-all cursor-pointer group">
                               <div className="p-8 flex flex-col sm:flex-row sm:items-center gap-8">
                                    <div className="h-16 w-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#163D2D] group-hover:text-white transition-all duration-500">
                                         <GraduationCap className="h-8 w-8" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                         <div className="flex items-center gap-2 mb-2">
                                              <Badge className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                                  quiz.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                  quiz.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                                  'bg-slate-100 text-slate-500'
                                              }`}>
                                                   {quiz.status}
                                              </Badge>
                                              <Badge variant="outline" className="font-black text-[9px] uppercase tracking-tight text-slate-300 border-slate-100 italic">{quiz.type}</Badge>
                                         </div>
                                         <h4 className="text-xl font-black text-slate-900 group-hover:text-[#163D2D] transition-colors leading-tight italic">{quiz.title}</h4>
                                         <div className="flex items-center gap-6 mt-4">
                                              <div className="flex items-center gap-2">
                                                   <Clock className="h-3.5 w-3.5 text-slate-300" />
                                                   <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{quiz.timeLimit}</span>
                                              </div>
                                              <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
                                                   <Users className="h-3.5 w-3.5 text-slate-300" />
                                                   <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{quiz.activeStudents} Participated</span>
                                              </div>
                                         </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                         <div className="mb-2">
                                              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Avg Score</p>
                                              <p className={`text-2xl font-black italic ${quiz.avgScore === '-' ? 'text-slate-300' : 'text-slate-900 italic'}`}>{quiz.avgScore}</p>
                                         </div>
                                         <Button variant="ghost" size="icon" className="h-10 w-10 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-[#163D2D] group-hover:text-white transition-all">
                                              <ChevronRight className="h-5 w-5" />
                                         </Button>
                                    </div>
                               </div>
                          </Card>
                      ))}
                 </div>

                 {/* Sidebar: Performance Leaderboard & Templates */}
                 <div className="space-y-6">
                      <Card className="rounded-[2.5rem] bg-gradient-to-br from-indigo-900 to-slate-900 border-none p-8 text-white relative overflow-hidden shadow-2xl">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                           <h3 className="text-xl font-black italic leading-tight mb-4">Quiz Intelligence</h3>
                           <p className="text-xs text-indigo-200/70 font-medium mb-6 leading-relaxed">Design interactive, randomized assessments with institutional-level security and anti-cheat measures.</p>
                           <Button className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-widest h-12 shadow-lg shadow-indigo-500/20">
                                Launch Wizard <Plus className="h-4 w-4 ml-2" />
                           </Button>
                      </Card>

                      <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                           <h3 className="font-black text-base uppercase tracking-tight text-slate-900 mb-6 italic">Top Performers (MTD)</h3>
                           <div className="space-y-4">
                                {[
                                     { name: "Dawit Hailu", score: "98.5%", course: "CS-101" },
                                     { name: "Aster Kassa", score: "97.2%", course: "MATH-201" },
                                     { name: "Sara Belay", score: "95.8%", course: "HIST-105" },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                         <div className="flex items-center gap-3">
                                              <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black italic">
                                                   #{i+1}
                                              </div>
                                              <div>
                                                   <p className="font-black text-xs text-slate-900">{p.name}</p>
                                                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.course}</p>
                                              </div>
                                         </div>
                                         <span className="text-sm font-black text-emerald-600">{p.score}</span>
                                    </div>
                                ))}
                           </div>
                           <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#163D2D]">View Standings →</Button>
                      </Card>
                 </div>
            </div>
        </div>
    );
}
