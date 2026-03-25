import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    PlayCircle, FileText, CheckCircle2, ChevronLeft, 
    ChevronRight, Languages, Clock, BookOpen,
    MessageSquare, Download, Share2, Star,
    MoreVertical, Info, AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function LessonViewerPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* ── Navigation Breadcrumbs & Language Toggle ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/lms/courses">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-[#163D2D]">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Advanced Algebra • Unit 01</p>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 italic uppercase">Lesson 1.1: Introduction to Variables</h1>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-[1.5rem] w-fit">
                    <Button variant="ghost" className="rounded-[1.25rem] h-9 px-4 bg-white text-[#163D2D] font-black text-[10px] uppercase shadow-sm">English</Button>
                    <Button variant="ghost" className="rounded-[1.25rem] h-9 px-4 text-slate-400 font-black text-[10px] uppercase hover:text-slate-600">አማርኛ</Button>
                    <Button variant="ghost" className="rounded-[1.25rem] h-9 px-4 text-slate-400 font-black text-[10px] uppercase hover:text-slate-600">Oromo</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* LEFT: Content Viewer (Video/Notes) */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Main Video/Content Area */}
                    <Card className="rounded-[3rem] border-slate-100 shadow-2xl bg-black overflow-hidden aspect-video relative group">
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer">
                            <div className="h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40">
                                <PlayCircle className="h-10 w-10 ml-1" />
                            </div>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1635010185859-423588da9149?w=1200&auto=format&fit=crop&q=60" 
                            alt="Lesson Thumbnail" 
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 font-black text-[10px] uppercase tracking-widest px-3">12:45 Duration</Badge>
                                 <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] uppercase tracking-widest px-3">HD Streaming</Badge>
                             </div>
                        </div>
                    </Card>

                    {/* Lesson Description & Resources */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-8">
                         <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center gap-4">
                                 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Info className="h-5 w-5" /></div>
                                 <h3 className="font-black text-xl text-slate-900 uppercase italic">Concept Briefing</h3>
                             </div>
                             <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-slate-400"><Download className="h-4 w-4 mr-2" /> Download Slides</Button>
                         </div>
                         <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
                             <p>In this lesson, we explore the fundamental concept of **variables** in algebra. Students will learn how letters like `x` and `y` represent unknown quantities and how to manipulate them in basic linear equations.</p>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                     <FileText className="h-5 w-5 text-emerald-600" />
                                     <div>
                                         <p className="text-[11px] font-black uppercase text-slate-900 italic">lesson_summary_en.pdf</p>
                                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Portable Document • 1.2MB</p>
                                     </div>
                                 </div>
                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                     <PlayCircle className="h-5 w-5 text-blue-600" />
                                     <div>
                                         <p className="text-[11px] font-black uppercase text-slate-900 italic">interactive_exercise_1.1</p>
                                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">LMS Component • Web Module</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </Card>

                    {/* Discussion & Community */}
                    <div className="flex items-center justify-between px-4">
                        <h3 className="font-black text-lg text-slate-900 uppercase italic">Lesson Discussion (24)</h3>
                        <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">Ask a Teacher</Button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { user: "Dawit H.", comment: "I'm still a bit confused about negative constants in linear equations. Can we get more examples?", time: "2h ago" },
                            { user: "Hirut T.", comment: "Great explanation! The visualization of the balance scale really helped.", time: "4h ago" },
                        ].map((c, i) => (
                            <div key={i} className="p-6 rounded-[2rem] bg-white shadow-sm border border-slate-50 flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 italic shrink-0">
                                    {c.user[0]}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="font-black text-xs text-slate-900 uppercase italic">{c.user}</p>
                                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{c.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Course Progress & Playlist */}
                <div className="space-y-6">
                    {/* Mark as Complete CTA */}
                    <Card className="rounded-[2.5rem] bg-[#163D2D] p-8 text-white text-center shadow-2xl relative overflow-hidden group cursor-pointer">
                         <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-all duration-500" />
                         <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                         <h3 className="text-xl font-black italic mb-2 uppercase tracking-tight">Complete Lesson</h3>
                         <p className="text-xs text-white/50 font-medium mb-6">Gain 25 XP and unlock Lesson 1.2 Resource Hub.</p>
                         <Button className="w-full rounded-2xl bg-white text-[#163D2D] hover:bg-slate-100 font-black text-xs uppercase h-12">
                              Mark as Done
                         </Button>
                    </Card>

                    {/* Unit Playlist */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7 overflow-hidden">
                         <div className="flex items-center justify-between mb-6">
                              <h3 className="font-black text-base uppercase tracking-tight text-slate-900 italic">Curriculum Flow</h3>
                              <Badge variant="outline" className="border-slate-100 text-slate-400 font-black text-[9px] uppercase tracking-widest">4 / 12 Lessons</Badge>
                         </div>
                         <div className="space-y-2">
                              {[
                                  { title: "Introduction to Variables", status: "Active", type: "Video" },
                                  { title: "Algebraic Expressions", status: "Locked", type: "PDF" },
                                  { title: "Evaluating Constants", status: "Locked", type: "Quiz" },
                                  { title: "Solving Simple Equations", status: "Locked", type: "Video" },
                              ].map((l, i) => (
                                  <div key={i} className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${l.status === 'Active' ? 'bg-emerald-50 border border-emerald-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                                       <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${l.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                                            {l.type === 'Video' ? <PlayCircle className="h-4 w-4" /> : l.type === 'Quiz' ? <Star className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                       </div>
                                       <div className="flex-1 min-w-0">
                                            <p className={`text-[11px] font-black uppercase tracking-tight italic line-clamp-1 ${l.status === 'Active' ? 'text-slate-900' : 'text-slate-300'}`}>{l.title}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{l.type} Resource</p>
                                       </div>
                                       {l.status === 'Active' ? <ChevronRight className="h-4 w-4 text-emerald-500" /> : <Star className="h-4 w-4 text-slate-200" />}
                                  </div>
                              ))}
                         </div>
                    </Card>

                    {/* Teacher's Note Widget */}
                    <Card className="rounded-[2.5rem] border-none bg-amber-50 p-8 text-amber-900 relative overflow-hidden">
                         <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl"><AlertCircle className="h-5 w-5" /></div>
                              <h4 className="font-black text-sm uppercase italic">Instructor Feedback</h4>
                         </div>
                         <p className="text-[11px] font-medium leading-relaxed italic border-l-2 border-amber-200 pl-4">
                             "Pay close attention to how we distinguish between constants and variables in the second half of the video. This is the foundation for all future modules."
                         </p>
                         <div className="mt-4 flex items-center gap-3">
                              <div className="h-7 w-7 rounded-full bg-amber-200 flex items-center justify-center text-[10px] font-black text-amber-600 italic">EZ</div>
                              <div>
                                   <p className="text-[10px] font-black uppercase tracking-widest leading-none">Dr. Elias Zewdu</p>
                                   <p className="text-[8px] font-bold text-amber-600 uppercase tracking-widest mt-1">Assigned Teacher</p>
                              </div>
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
