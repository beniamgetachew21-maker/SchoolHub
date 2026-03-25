import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Plus, Save, Trash2, GripVertical, FileText, 
    Video, PlayCircle, BookOpen, Layers, 
    Globe, Layout, ChevronRight, Settings,
    Languages, Sparkles, UploadCloud, Monitor
} from "lucide-react";
import Link from "next/link";

export default function CourseBuilderPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* ── Builder Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Link href="/lms" className="text-muted-foreground hover:text-[#163D2D] transition-colors">
                            <h2 className="text-sm font-bold uppercase tracking-widest italic text-slate-400">LMS</h2>
                        </Link>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Course Builder</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Design structured, multilingual academic modules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Settings className="h-4 w-4 mr-2" /> Global Config
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm shadow-emerald-500/20">
                        <Save className="h-4 w-4 mr-2" /> Publish Course
                    </Button>
                </div>
            </div>

            {/* ── Main Builder Interface ── */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                
                {/* LEFT: Course Settings & Metadata */}
                <div className="xl:col-span-1 space-y-6">
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                        <h3 className="font-black text-base uppercase tracking-tight text-slate-900 mb-6 italic">Course Info</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-1 block">Course Title</label>
                                <Input placeholder="e.g. Advanced Algebra" className="rounded-xl border-slate-100 focus:ring-[#163D2D]" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-1 block">Grade</label>
                                    <Input placeholder="Grade 7" className="rounded-xl border-slate-100" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-1 block">Term</label>
                                    <Input placeholder="Term 1" className="rounded-xl border-slate-100" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-1 block">Primary Language</label>
                                <div className="flex gap-2">
                                     <Button variant="ghost" className="rounded-xl h-10 flex-1 bg-emerald-50 text-emerald-700 font-black text-[10px] uppercase">English</Button>
                                     <Button variant="ghost" className="rounded-xl h-10 flex-1 bg-slate-50 text-slate-400 font-black text-[10px] uppercase">Amharic</Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] bg-[#163D2D] text-white p-7 relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />
                         <h3 className="text-xl font-black italic mb-4">AI Course Architect</h3>
                         <p className="text-xs text-white/50 font-medium leading-relaxed mb-6">Let AI generate a curriculum structure based on Ethiopian national standards.</p>
                         <Button className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-[10px] uppercase h-11">
                              Auto-Generate Units <Sparkles className="h-4 w-4 ml-2" />
                         </Button>
                    </Card>
                </div>

                {/* MIDDLE/RIGHT: Hierarchical Curriculum Builder */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                             <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Layers className="h-5 w-5" /></div>
                             <h3 className="font-black text-xl text-slate-900 uppercase italic">Curriculum Flow</h3>
                        </div>
                        <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">+ Add New Unit</Button>
                    </div>

                    {/* Unit 1 */}
                    <Card className="rounded-[3rem] border-slate-100 shadow-xl bg-white overflow-hidden border-l-8 border-l-[#163D2D]">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-4">
                                <GripVertical className="text-slate-200" />
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Unit 01</p>
                                    <h4 className="text-xl font-black text-slate-900 italic">Introduction to Variables & Constants</h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-rose-500"><Trash2 className="h-4 w-4" /></Button>
                                <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] uppercase tracking-widest border-slate-200">+ Lesson</Button>
                            </div>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            {/* Lesson 1.1 */}
                            <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-6 group hover:border-emerald-200 transition-all">
                                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-[#163D2D] shadow-sm shrink-0">
                                    <PlayCircle className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h5 className="font-black text-sm text-slate-900 italic uppercase">Lesson 1.1: Foundations of Algebra</h5>
                                        <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[8px] uppercase tracking-widest">Video Content</Badge>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supported Languages: EN, AM, OR</p>
                                </div>
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-[#163D2D]"><Settings className="h-4 w-4" /></Button>
                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-rose-500"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>

                            {/* Lesson 1.2 */}
                            <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-6 group hover:border-emerald-200 transition-all">
                                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-[#163D2D] shadow-sm shrink-0">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h5 className="font-black text-sm text-slate-900 italic uppercase">Lesson 1.2: Symbolic Representations</h5>
                                        <Badge className="bg-blue-100 text-blue-700 border-none font-black text-[8px] uppercase tracking-widest">PDF Notes</Badge>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supported Languages: EN, AM</p>
                                </div>
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-[#163D2D]"><Settings className="h-4 w-4" /></Button>
                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-rose-500"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>

                            <button className="w-full h-16 rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center gap-3 text-slate-300 hover:border-emerald-200 hover:text-[#163D2D] transition-all group">
                                <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">Add Resource to Unit 01</span>
                            </button>
                        </CardContent>
                    </Card>

                    {/* Unit 2 (Collapsed/Draft Style) */}
                    <Card className="rounded-[3rem] border-slate-100 shadow-xl bg-white overflow-hidden border-l-8 border-l-slate-200 bg-slate-50/50">
                        <div className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <GripVertical className="text-slate-200" />
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-200 tracking-widest">Unit 02</p>
                                    <h4 className="text-xl font-black text-slate-300 italic">Linear Equations & Inequalities</h4>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-300"><ChevronRight className="h-6 w-6" /></Button>
                        </div>
                    </Card>

                    {/* Quick Multilingual Content Asset Upload */}
                    <Card className="rounded-[3rem] border-none bg-gradient-to-br from-indigo-900 to-slate-900 p-8 text-white relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                         <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                              <div className="p-6 bg-white/10 rounded-[2.5rem] backdrop-blur-xl border border-white/10">
                                   <UploadCloud className="h-12 w-12 text-indigo-400" />
                              </div>
                              <div className="flex-1 text-center md:text-left">
                                   <h3 className="text-2xl font-black italic tracking-tight mb-2">Multilingual Content Sync</h3>
                                   <p className="text-sm text-indigo-200/60 font-medium">Batch upload Amharic, Oromo, and English versions of your slides. Our AI will automatically align them per lesson block.</p>
                              </div>
                              <Button className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 font-black text-xs uppercase h-14 px-8 shadow-xl shadow-indigo-500/20">
                                   Open Sync Tool <Languages className="h-4 w-4 ml-2" />
                              </Button>
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
