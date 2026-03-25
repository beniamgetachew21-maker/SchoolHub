import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Clock, ThumbsUp, Plus, Search, Filter, Hash, MoreHorizontal, Shield, Paperclip, ChevronRight, MessageCircle, Star, Flame, Eye } from "lucide-react";
import Link from "next/link";

// Mock forum data
const recentTopics = [
    { 
        id: "TH-102", 
        title: "Tips for Calculus II Mid-term?", 
        author: "Dawit Hailu", 
        course: "MATH-201", 
        replies: 24, 
        views: 156, 
        time: "10m ago",
        category: "Study Tips"
    },
    { 
        id: "TH-098", 
        title: "Stuck on Python Dictionary Homework", 
        author: "Aster Kassa", 
        course: "CS-101", 
        replies: 8, 
        views: 42, 
        time: "45m ago",
        category: "Help Wanted"
    },
    { 
        id: "TH-085", 
        title: "The Industrial Revolution in Ethiopia Discussion", 
        author: "Ms. Selamawit T.", 
        course: "HIST-105", 
        replies: 112, 
        views: 890, 
        time: "2h ago",
        category: "Lectures"
    },
];

export default function ForumsPage() {
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
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Student Forums</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Peer-to-peer academic discussion and knowledge sharing.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Filter className="h-4 w-4 mr-2" /> Categories
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-11 px-6 shadow-sm">
                        <Plus className="h-4 w-4 mr-2" /> Start Discussion
                    </Button>
                </div>
            </div>

            {/* ── Forum Stats ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {[
                     { label: "Active Threads", count: 425, color: "text-slate-900", bg: "bg-white" },
                     { label: "Daily Posts", count: 86, color: "text-emerald-600", bg: "bg-emerald-50/50" },
                     { label: "Online Now", count: 24, color: "text-blue-600", bg: "bg-blue-50/50" },
                     { label: "Pinned Guides", count: 12, color: "text-amber-600", bg: "bg-amber-50/50" },
                 ].map((s, i) => (
                     <Card key={i} className={`rounded-[1.75rem] border-none shadow-sm ${s.bg} p-6 h-full flex flex-col justify-center`}>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
                         <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
                     </Card>
                 ))}
            </div>

            {/* ── Topic Stream ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 <div className="xl:col-span-2 space-y-4">
                      <div className="flex items-center justify-between px-2">
                           <h3 className="font-black text-lg uppercase tracking-tight text-slate-900 italic">Discussion Stream</h3>
                           <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-[#163D2D] bg-emerald-50">Latest</Button>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Popular</Button>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Unanswered</Button>
                           </div>
                      </div>

                      {recentTopics.map((topic, i) => (
                          <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white hover:shadow-2xl hover:border-emerald-100 transition-all cursor-pointer group">
                               <div className="p-8 flex items-center gap-8">
                                    <div className="h-16 w-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#163D2D] group-hover:text-white transition-all duration-500">
                                         <MessageCircle className="h-8 w-8" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                         <div className="flex items-center gap-2 mb-2">
                                              <Badge className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                                  topic.category === 'Help Wanted' ? 'bg-rose-100 text-rose-700' :
                                                  topic.category === 'Study Tips' ? 'bg-blue-100 text-blue-700' :
                                                  'bg-emerald-100 text-emerald-700'
                                              }`}>
                                                   {topic.category}
                                              </Badge>
                                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto">{topic.time}</span>
                                         </div>
                                         <h4 className="text-xl font-black text-slate-900 group-hover:text-[#163D2D] transition-colors leading-tight italic">{topic.title}</h4>
                                         <div className="flex items-center gap-6 mt-4">
                                              <div className="flex items-center gap-2">
                                                   <Users className="h-3.5 w-3.5 text-slate-300" />
                                                   <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{topic.author}</span>
                                              </div>
                                              <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
                                                   <Hash className="h-3.5 w-3.5 text-slate-300" />
                                                   <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{topic.course}</span>
                                              </div>
                                         </div>
                                    </div>

                                    <div className="text-right shrink-0 min-w-[80px]">
                                         <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-0.5">Replies</p>
                                         <p className="text-xl font-black text-slate-900">{topic.replies}</p>
                                         <Button variant="ghost" size="icon" className="h-9 w-9 bg-slate-50 text-slate-300 rounded-xl group-hover:text-[#163D2D] mt-2">
                                              <ChevronRight className="h-4 w-4" />
                                         </Button>
                                    </div>
                               </div>
                          </Card>
                      ))}
                      <Button variant="outline" className="w-full rounded-2xl border-slate-100 h-14 font-black uppercase text-xs tracking-widest text-slate-400 hover:text-[#163D2D] transition-all">
                          Load More Discussions
                      </Button>
                 </div>

                 {/* Sidebar: Communities & Trending */}
                 <div className="space-y-6">
                      <Card className="rounded-[2.5rem] bg-[#163D2D] p-8 text-white relative overflow-hidden shadow-2xl">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                           <h3 className="text-xl font-black italic leading-tight mb-4">Community Guidelines</h3>
                           <p className="text-xs text-white/50 font-medium mb-6 leading-relaxed">Ensure all academic discussions remain respectful and focused on peer knowledge exchange.</p>
                           <Button className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase h-11">
                                View Full Policy
                           </Button>
                      </Card>

                      <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                           <h3 className="font-black text-base uppercase tracking-tight text-slate-900 mb-6 italic">Featured Communities</h3>
                           <div className="space-y-3">
                                {[
                                     { name: "Science Society", members: "1.2k", color: "bg-blue-500" },
                                     { name: "Tech Innovators", members: "840", color: "bg-emerald-500" },
                                     { name: "History Buffs", members: "450", color: "bg-amber-500" },
                                     { name: "Math Olympiad", members: "320", color: "bg-indigo-500" },
                                ].map((c, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group">
                                         <div className="flex items-center gap-3">
                                              <div className={`h-8 w-8 rounded-xl ${c.color} opacity-20 group-hover:opacity-100 group-hover:rotate-6 transition-all`} />
                                              <div>
                                                   <p className="font-black text-xs text-slate-900 italic tracking-tight">{c.name}</p>
                                                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{c.members} Members</p>
                                              </div>
                                         </div>
                                         <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#163D2D]" />
                                    </div>
                                ))}
                           </div>
                      </Card>
                 </div>
            </div>
        </div>
    );
}
