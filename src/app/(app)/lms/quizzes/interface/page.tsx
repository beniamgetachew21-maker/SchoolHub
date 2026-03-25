import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Clock, AlertCircle, CheckCircle2, ChevronRight, 
    ChevronLeft, GraduationCap, Timer, HelpCircle,
    Flag, Save, Info, Sparkles
} from "lucide-react";
import Link from "next/link";

export default function QuizInterfacePage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* ── Quiz Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Link href="/lms/quizzes" className="text-muted-foreground hover:text-[#163D2D] transition-colors">
                            <h2 className="text-sm font-bold uppercase tracking-widest italic text-slate-400">Quizzes</h2>
                        </Link>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Weekly Algebra Review</h1>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                         <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-100">
                              <Timer className="h-3.5 w-3.5" />
                              <span className="text-[10px] font-black uppercase tracking-widest">44:32 remaining</span>
                         </div>
                         <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                              <HelpCircle className="h-3.5 w-3.5" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Question 4 of 20</span>
                         </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Save className="h-4 w-4 mr-2" /> Save Progress
                    </Button>
                    <Button className="rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm shadow-rose-500/20">
                        Finish Attempt
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                
                {/* MIDDLE: Active Question Area */}
                <div className="xl:col-span-3 space-y-6">
                    <Card className="rounded-[3rem] border-slate-100 shadow-2xl bg-white p-10 overflow-hidden relative">
                         <div className="absolute top-0 right-0 p-8">
                              <Button variant="ghost" size="icon" className="text-slate-200 hover:text-rose-500"><Flag className="h-5 w-5" /></Button>
                         </div>

                         <div className="max-w-2xl mx-auto space-y-10">
                              <div className="space-y-4">
                                   <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[9px] uppercase tracking-widest">Part 1: Linear Variables</Badge>
                                   <h3 className="text-2xl font-black text-slate-900 leading-tight italic">What is the value of <span className="text-[#163D2D]">x</span> in the equation <span className="bg-slate-100 px-3 py-1 rounded-lg italic">5x + 3 = 18</span>?</h3>
                              </div>

                              <div className="space-y-4">
                                   {[
                                       { id: "A", label: "x = 2" },
                                       { id: "B", label: "x = 3" },
                                       { id: "C", label: "x = 5" },
                                       { id: "D", label: "x = 7" },
                                   ].map((opt, i) => (
                                       <button key={opt.id} className={`w-full group p-6 rounded-[2.5rem] border-2 transition-all flex items-center gap-6 ${i === 1 ? 'border-[#163D2D] bg-emerald-50' : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'}`}>
                                            <div className={`h-10 w-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${i === 1 ? 'bg-[#163D2D] text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'}`}>
                                                 {opt.id}
                                            </div>
                                            <span className={`text-lg font-black italic tracking-tight ${i === 1 ? 'text-slate-900' : 'text-slate-500'}`}>{opt.label}</span>
                                            {i === 1 && <CheckCircle2 className="h-6 w-6 text-emerald-500 ml-auto" />}
                                       </button>
                                   ))}
                              </div>

                              <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                                   <Button variant="ghost" className="rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400">
                                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                                   </Button>
                                   <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-12 px-10">
                                        Next Question <ChevronRight className="h-4 w-4 ml-2" />
                                   </Button>
                              </div>
                         </div>
                    </Card>

                    {/* AI Hint Section */}
                    <Card className="rounded-[2.5rem] bg-gradient-to-br from-[#163D2D] to-[#0a1f17] p-8 text-white relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                         <div className="flex items-start gap-6 relative z-10">
                              <div className="p-4 bg-white/10 rounded-[2rem] backdrop-blur-xl border border-white/10">
                                   <Sparkles className="h-6 w-6 text-emerald-400" />
                              </div>
                              <div>
                                   <h4 className="text-xl font-black italic mb-2">Need a Hint?</h4>
                                   <p className="text-sm text-white/60 font-medium leading-relaxed max-w-xl">
                                       Remember the inverse operations. To solve for `x`, you first need to isolate the term with the variable by subtracting the constant `3` from both sides.
                                   </p>
                              </div>
                         </div>
                    </Card>
                </div>

                {/* RIGHT: Quiz Overview & Navigation */}
                <div className="xl:col-span-1 space-y-6">
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                         <div className="flex items-center justify-between mb-6 px-1">
                              <h3 className="font-black text-base uppercase tracking-tight text-slate-900 italic">Jump to Question</h3>
                              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">20 Total</span>
                         </div>
                         <div className="grid grid-cols-5 gap-3">
                              {Array.from({ length: 20 }).map((_, i) => (
                                  <div key={i} className={`h-10 w-10 rounded-xl flex items-center justify-center text-[10px] font-black cursor-pointer transition-all ${
                                      i === 3 ? 'bg-[#163D2D] text-white shadow-lg shadow-emerald-500/20' : 
                                      i < 3 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'
                                  }`}>
                                      {i + 1}
                                  </div>
                              ))}
                         </div>
                         <div className="mt-8 pt-6 border-t border-slate-50 space-y-4">
                              <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Answered</span>
                                   </div>
                                   <span className="text-[11px] font-black text-slate-900">3 Questions</span>
                              </div>
                              <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Remaining</span>
                                   </div>
                                   <span className="text-[11px] font-black text-slate-900">17 Questions</span>
                              </div>
                         </div>
                    </Card>

                    <Card className="rounded-[2.5rem] bg-indigo-50 border-none p-8 text-indigo-900 relative overflow-hidden">
                         <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Info className="h-5 w-5" /></div>
                              <h4 className="font-black text-sm uppercase italic">Live Support</h4>
                         </div>
                         <p className="text-[10px] font-medium leading-relaxed italic border-l-2 border-indigo-200 pl-4 mb-4">
                             "Technical issues? Our automated assessment guard is monitoring your session for stability. Stay within this tab to avoid auto-submission."
                         </p>
                         <Button variant="ghost" className="w-full h-10 rounded-xl bg-indigo-100/50 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                             Contact Proctor
                         </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
