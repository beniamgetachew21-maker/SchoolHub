import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Search, Filter, Plus, BookOpen, Clock, 
    Star, Users, ChevronRight, LayoutGrid, 
    List, MoreVertical, BookMarked, Globe,
    FlaskConical, Calculator, Languages, History
} from "lucide-react";
import Link from "next/link";

// Mock course data
const allCourses = [
    { 
        id: "MATH-202", 
        title: "Advanced Calculus II", 
        category: "Mathematics", 
        instructor: "Dr. Elias Zewdu", 
        lessons: 24, 
        students: 142, 
        rating: 4.8, 
        level: "Advanced",
        status: "Active"
    },
    { 
        id: "HIST-105", 
        title: "The Ethiopian Empire & Modernity", 
        category: "History", 
        instructor: "Ms. Selamawit T.", 
        lessons: 18, 
        students: 86, 
        rating: 4.9, 
        level: "Intermediate",
        status: "Active"
    },
    { 
        id: "PHYS-301", 
        title: "Quantum Mechanics for Beginners", 
        category: "Science", 
        instructor: "Prof. Dawit Belay", 
        lessons: 30, 
        students: 54, 
        rating: 4.6, 
        level: "Expert",
        status: "Draft"
    },
    { 
        id: "ENG-210", 
        title: "Modern Literature & Analysis", 
        category: "Languages", 
        instructor: "Hirut Tadesse", 
        lessons: 12, 
        students: 198, 
        rating: 4.7, 
        level: "Intermediate",
        status: "Active"
    },
    { 
        id: "CS-101", 
        title: "Python for Scientific Research", 
        category: "Computer Science", 
        instructor: "Abebe Bekele", 
        lessons: 28, 
        students: 215, 
        rating: 4.9, 
        level: "Beginner",
        status: "Active"
    },
    { 
        id: "BIO-402", 
        title: "Molecular Biology & Genetics", 
        category: "Science", 
        instructor: "Dr. Aster K.", 
        lessons: 22, 
        students: 72, 
        rating: 4.5, 
        level: "Advanced",
        status: "Archive"
    },
];

export default function CoursesPage() {
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
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Course Catalog</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Browse and manage institutional learning modules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Filter className="h-4 w-4 mr-2" /> Categories
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Plus className="h-4 w-4 mr-2" /> Launch New Course
                    </Button>
                </div>
            </div>

            {/* ── Search & Filters ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="md:col-span-3 rounded-[2rem] border-slate-100 shadow-sm overflow-hidden bg-white">
                    <div className="flex items-center px-6 py-4">
                        <Search className="h-5 w-5 text-slate-400 mr-3" />
                        <Input 
                            placeholder="Search by course title, instructor name, or module ID..." 
                            className="border-none shadow-none focus-visible:ring-0 text-slate-900 font-medium placeholder:text-slate-400 px-0 h-10"
                        />
                    </div>
                </Card>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="rounded-2xl flex-1 h-full bg-slate-50 text-slate-400 hover:text-[#163D2D]">
                        <LayoutGrid className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" className="rounded-2xl flex-1 h-full bg-slate-50 text-slate-400 hover:text-[#163D2D]">
                        <List className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* ── Category Quick Filters ── */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                 {[
                     { name: "Mathematics", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50" },
                     { name: "Science", icon: FlaskConical, color: "text-emerald-600", bg: "bg-emerald-50" },
                     { name: "History", icon: History, color: "text-amber-600", bg: "bg-amber-50" },
                     { name: "Languages", icon: Languages, color: "text-purple-600", bg: "bg-purple-50" },
                     { name: "CS & Tech", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50" },
                 ].map((cat, i) => (
                     <Button key={i} variant="ghost" className={`rounded-2xl h-11 px-6 font-black text-[10px] uppercase tracking-widest ${cat.bg} ${cat.color} hover:bg-white hover:shadow-md transition-all`}>
                         <cat.icon className="h-4 w-4 mr-2" /> {cat.name}
                     </Button>
                 ))}
            </div>

            {/* ── Course Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {allCourses.map((course, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 bg-white hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 group overflow-hidden flex flex-col">
                        <div className="p-8 pb-4">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-[#163D2D] group-hover:text-white transition-all duration-500">
                                    <BookMarked className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <Badge className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                        course.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                        course.status === 'Draft' ? 'bg-blue-100 text-blue-700' :
                                        'bg-slate-100 text-slate-500'
                                    }`}>
                                        {course.status}
                                    </Badge>
                                    <Badge variant="outline" className="font-black text-[8px] uppercase tracking-tight text-slate-400 border-slate-100">
                                        ID: {course.id}
                                    </Badge>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-[#163D2D] transition-colors mb-2 italic leading-tight">{course.title}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.category}</p>
                            </div>

                            <div className="space-y-4 mb-4">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                                     <div className="flex items-center gap-2">
                                         <Users className="h-3.5 w-3.5 text-slate-300" />
                                         <span>{course.students} Learners</span>
                                     </div>
                                     <div className="flex items-center gap-2">
                                         <BookOpen className="h-3.5 w-3.5 text-slate-300" />
                                         <span>{course.lessons} Modules</span>
                                     </div>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                                     <div className="flex items-center gap-2">
                                         <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                         <span className="text-slate-900 font-black">{course.rating} Avg.</span>
                                     </div>
                                     <div className="flex items-center gap-2">
                                         <Clock className="h-3.5 w-3.5 text-slate-300" />
                                         <span>{course.level}</span>
                                     </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-5 bg-slate-50/50 mt-auto flex items-center justify-between border-t border-slate-50 group-hover:bg-emerald-50 transition-colors">
                            <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-slate-400 italic shadow-sm">
                                    {course.instructor.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-[11px] font-black uppercase text-slate-500 tracking-tight italic">
                                    {course.instructor}
                                </span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-300 hover:text-[#163D2D] hover:bg-white transition-all">
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </Card>
                ))}

                {/* Create New Course CTA */}
                <Card className="rounded-[2.5rem] border-dashed border-2 border-slate-200 bg-slate-50/50 p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group min-h-[300px]">
                    <div className="p-6 rounded-full bg-white shadow-md text-slate-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all">
                        <Plus className="h-10 w-10" />
                    </div>
                    <div>
                        <h4 className="font-black text-xl text-slate-900 uppercase italic">Add Course</h4>
                        <p className="text-xs font-medium text-slate-400 mt-2 max-w-[250px]">Start building an interactive academic module for students.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
