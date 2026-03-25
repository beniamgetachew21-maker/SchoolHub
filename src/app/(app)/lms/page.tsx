import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    BookOpen, GraduationCap, ClipboardCheck, LayoutDashboard, 
    PlayCircle, Clock, Star, Users, ArrowUpRight, Plus,
    Search, Filter, ChevronRight, FileText, BarChart3,
    BookMarked, Sparkles, CheckCircle2, AlertCircle
} from "lucide-react";
import Link from "next/link";

// Mock data for LMS categories/courses
const featuredCourses = [
    { 
        id: "C-101", 
        title: "Advanced Mathematics: Calculus II", 
        instructor: "Dr. Elias Zewdu", 
        students: 142, 
        rating: 4.8, 
        progress: 65,
        color: "bg-blue-500",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60"
    },
    { 
        id: "C-204", 
        title: "World History: The Renaissance", 
        instructor: "Ms. Selamawit T.", 
        students: 86, 
        rating: 4.9, 
        progress: 42,
        color: "bg-amber-500",
        image: "https://images.unsplash.com/photo-1461360228754-6e81c478585b?w=800&auto=format&fit=crop&q=60"
    },
    { 
        id: "C-302", 
        title: "Intro to Computer Science (Python)", 
        instructor: "Abebe Bekele", 
        students: 215, 
        rating: 4.7, 
        progress: 88,
        color: "bg-emerald-500",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
    },
];

// Mock data for upcoming assignments
const upcomingAssignments = [
    { id: "A-55", title: "calculus_problems_set_4.pdf", course: "Math 101", due: "Tomorrow, 11:59 PM", status: "Incomplete" },
    { id: "A-56", title: "renaissance_essay_draft.docx", course: "History 204", due: "Friday, 4:00 PM", status: "Submitted" },
    { id: "A-57", title: "python_final_project.zip", course: "CS 302", due: "Next Monday", status: "In Progress" },
];

export default function LMSDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ── Compact page header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Learning Command Center</h1>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Institutional academic content & learning management hub.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {[
                        { label: "Active Courses", value: "24", color: "text-slate-900" },
                        { label: "Enrolled Students", value: "1.2k", color: "text-emerald-600" },
                        { label: "Avg. Completion", value: "84%", color: "text-blue-600" },
                        { label: "Pending Grades", value: "12", color: "text-amber-600" },
                    ].map(k => (
                        <div key={k.label} className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-center shadow-sm">
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-0.5">{k.label}</p>
                            <p className={`text-xl font-black ${k.color}`}>{k.value}</p>
                        </div>
                    ))}
                    <Link href="/lms/builder">
                        <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                            <Plus className="h-3.5 w-3.5 mr-1.5" /> New Course
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ── Quick Nav Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    {href: "/lms/courses", icon: BookMarked, label: "Course Catalog", count: "48 Courses" },
                    { href: "/lms/assignments", icon: ClipboardCheck, label: "Assignments", count: "12 Pending" },
                    { href: "/lms/quizzes/interface", icon: GraduationCap, label: "Quiz Engine", count: "8 Active" },
                    { href: "/lms/forums", icon: GraduationCap, label: "Student Forums", count: "256 Posts" },
                ].map((a, i) => (
                    <Link key={i} href={a.href} className="group">
                        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 p-5 flex flex-col items-center text-center gap-3">
                            <div className="p-3.5 rounded-2xl text-emerald-600 bg-emerald-50 group-hover:scale-110 group-hover:bg-[#163D2D] group-hover:text-white transition-all">
                                <a.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-black text-[10px] tracking-tight uppercase text-slate-700">{a.label}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{a.count}</p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* ── Main Dashboard Content ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* LEFT: Featured Courses & Analytics */}
                <div className="xl:col-span-2 space-y-8">
                    
                    {/* Featured Courses Horizontal Scroll/Grid */}
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-black text-xl uppercase tracking-tight text-slate-900 italic">Faculty Picks & Trending</h3>
                        <Link href="/lms/courses">
                            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">View Catalog →</Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredCourses.map((course, i) => (
                            <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 bg-white hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 group overflow-hidden flex flex-col">
                                <div className="h-40 relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                     <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                     <div className="absolute bottom-4 left-6 z-20">
                                          <Badge className="bg-emerald-500 text-white border-none font-black text-[8px] uppercase tracking-widest mb-1">Featured</Badge>
                                          <p className="text-white font-black text-sm leading-tight italic">{course.id}</p>
                                     </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h4 className="font-black text-base text-slate-900 group-hover:text-[#163D2D] transition-colors line-clamp-2 leading-tight mb-2 italic">
                                        {course.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 italic">
                                            {course.instructor.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.instructor}</p>
                                    </div>

                                    <div className="mt-auto space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <span>Student Avg. Progress</span>
                                            <span className="text-[#163D2D]">{course.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#163D2D] transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1.5 text-amber-500">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="text-xs font-black text-slate-900">{course.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Users className="h-3 w-3" />
                                                <span className="text-[10px] font-bold">{course.students}</span>
                                            </div>
                                        </div>
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                         <Link href={`/lms/courses/${course.id}/lesson`} className="w-full">
                                              <Button variant="ghost" className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50 h-9">
                                                   Enter Classroom <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                              </Button>
                                         </Link>
                                    </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Learning Engagement Chart Placeholder */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden p-8">
                         <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center gap-4">
                                 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><BarChart3 className="h-5 w-5" /></div>
                                 <div>
                                     <h3 className="font-black text-2xl text-slate-900">Engagement Intelligence</h3>
                                     <p className="text-sm font-medium text-slate-400">Platform activity vs assignment submissions</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase tracking-widest">+12% vs LW</Badge>
                             </div>
                         </div>
                         <div className="h-[200px] w-full flex items-end gap-3 px-2">
                             {[40, 65, 45, 90, 75, 55, 80, 60, 45, 70, 85, 95].map((h, i) => (
                                 <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                     <div 
                                         className={`w-full rounded-t-xl transition-all duration-500 ${i === 11 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-100 group-hover:bg-blue-500/20'}`} 
                                         style={{ height: `${h}%` }} 
                                     />
                                     <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">W{i+1}</span>
                                 </div>
                             ))}
                         </div>
                    </Card>
                </div>

                {/* RIGHT: Assignments & Sidebar Widgets */}
                <div className="space-y-6">
                    {/* AI Course Assistant CTA */}
                    <Card className="rounded-[2.5rem] bg-[#163D2D] text-white p-7 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl flex items-center justify-center">
                            <Sparkles className="h-16 w-16 text-emerald-400/20 animate-pulse" />
                        </div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/10 rounded-xl text-emerald-400 shadow-inner">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">AI Content Hub</span>
                            </div>
                            <h3 className="text-xl font-black leading-tight italic">Draft lesson plans & quizzes in seconds</h3>
                            <p className="text-xs text-white/50 font-medium leading-relaxed">Leverage institutional knowledge to generate high-quality academic assets automatically.</p>
                            <Button className="w-full mt-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-xs uppercase tracking-widest h-11">
                                Launch Course AI <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </Card>

                    {/* Upcoming Deadlines */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                         <div className="flex items-center justify-between mb-6">
                             <h3 className="font-black text-base uppercase tracking-tight text-slate-900 flex items-center gap-2 italic">
                                 <Clock className="h-4 w-4 text-emerald-600" /> Deadline Portal
                             </h3>
                             <Link href="/lms/assignments">
                                 <Button variant="ghost" className="h-7 text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50">Manage All →</Button>
                             </Link>
                         </div>
                         <div className="space-y-4">
                             {upcomingAssignments.map((a, i) => (
                                 <div key={i} className="flex items-center gap-4 group cursor-pointer p-1">
                                     <div className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all ${
                                         a.status === 'Submitted' ? 'bg-emerald-50 text-emerald-600' : 
                                         a.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                                     }`}>
                                         {a.status === 'Submitted' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="font-black text-[11px] text-slate-800 truncate group-hover:text-[#163D2D] transition-colors uppercase italic tracking-tight">{a.title}</p>
                                         <div className="flex items-center justify-between mt-0.5">
                                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{a.course}</span>
                                             <span className={`text-[9px] font-black uppercase italic ${a.status === 'Incomplete' ? 'text-rose-500' : 'text-slate-400'}`}>Due {a.due}</span>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                         <Button className="w-full mt-6 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest h-10 border-none transition-all">
                             View Gradebook
                         </Button>
                    </Card>

                    {/* Quick Resource Access */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                         <h3 className="font-black text-base uppercase tracking-tight text-slate-900 mb-5 italic">Institutional Library</h3>
                         <div className="grid grid-cols-2 gap-3">
                             {[
                                 { label: "Research Archive", icon: FileText, bg: "bg-blue-50/50", text: "text-blue-600" },
                                 { label: "Lab Manuals", icon: PlayCircle, bg: "bg-rose-50/50", text: "text-rose-600" },
                                 { label: "Study Guides", icon: BookOpen, bg: "bg-amber-50/50", text: "text-amber-600" },
                                 { label: "Exam Papers", icon: ClipboardCheck, bg: "bg-emerald-50/50", text: "text-emerald-600" },
                             ].map((r, i) => (
                                 <div key={i} className={`p-4 rounded-3xl ${r.bg} ${r.text} flex flex-col items-center gap-2 hover:scale-105 transition-all cursor-pointer border border-transparent hover:border-current/10`}>
                                     <r.icon className="h-5 w-5" />
                                     <span className="text-[9px] font-black uppercase text-center tracking-tighter leading-tight">{r.label}</span>
                                 </div>
                             ))}
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
