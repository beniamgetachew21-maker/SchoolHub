import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Music2, FlaskConical, Globe, Trophy, Code2, Palette,
    Dumbbell, BookOpen, ChevronRight, Plus, Users, Star,
    CalendarCheck, Award, Sparkles, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { getClubsAction } from "@/lib/flow-actions";

const iconMap: Record<string, any> = {
    Code2, Globe, Palette, Music2, FlaskConical, Dumbbell, BookOpen, Trophy, Users
};

const achievements = [
    { title: "National Robotics Champions", club: "Robotics & AI Club", year: "2025", medal: "🥇" },
    { title: "Regional Debate Winners", club: "Debate Society", year: "2025", medal: "🥇" },
    { title: "Arts Exhibition Gold", club: "Fine Arts", year: "2024", medal: "🥈" },
];

export default async function ExtracurricularsClubsPremium() {
    const clubsData = await getClubsAction();
    const totalMembers = clubsData.reduce((a: number, c: any) => a + (c.memberCount || 0), 0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Clubs & Societies</h1>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Student-led extracurricular ecosystem — {clubsData.length} active clubs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/extracurriculars/events">
                        <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5">
                            <CalendarCheck className="h-3.5 w-3.5 mr-1.5" /> Events
                        </Button>
                    </Link>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> New Club
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Active Clubs", value: clubsData.length, icon: Trophy, color: "text-amber-600 bg-amber-50" },
                    { label: "Total Members", value: totalMembers, icon: Users, color: "text-emerald-600 bg-emerald-50" },
                    { label: "Events This Month", value: "12", icon: CalendarCheck, color: "text-blue-600 bg-blue-50" },
                    { label: "Championships Won", value: "7", icon: Award, color: "text-rose-600 bg-rose-50" },
                ].map((k) => (
                    <Card key={k.label} className="rounded-[2rem] border-transparent shadow-xl shadow-slate-200/50 bg-white">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("p-3 rounded-xl shrink-0", k.color)}>
                                <k.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black tracking-tight text-slate-900">{k.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{k.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Clubs Grid */}
                <div className="xl:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-xl uppercase tracking-tight text-slate-900 italic">All Clubs</h3>
                        <Link href="/extracurriculars/achievements">
                            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">Hall of Fame →</Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {clubsData.map((club: any) => {
                            const Icon = iconMap[club.iconName || "Users"] || Users;
                            return (
                                <Card key={club.clubId} className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/40 bg-white hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                                    {/* Color band top */}
                                    <div className={cn("h-2 w-full bg-gradient-to-r", club.color || "from-blue-500 to-indigo-600")} />

                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={cn("p-3.5 rounded-2xl text-white bg-gradient-to-br shadow-lg", club.color || "from-blue-500 to-indigo-600")}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    <span className="text-xs font-black text-slate-900">4.8</span>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="font-black text-base text-slate-900 group-hover:text-[#163D2D] transition-colors italic mb-1">{club.name}</h4>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{club.category || "General"}</p>

                                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="h-3.5 w-3.5 text-emerald-500" />
                                                <span className="font-black text-slate-600">{club.memberCount} members</span>
                                            </div>
                                            <span className="text-slate-300">|</span>
                                            <div className="flex items-center gap-1.5">
                                                <CalendarCheck className="h-3.5 w-3.5 text-blue-500" />
                                                <span className="italic">Next meeting: Friday</span>
                                            </div>
                                        </div>

                                        <Link href={`/extracurriculars/clubs/${club.clubId}`} className="w-full mt-4 block">
                                            <Button variant="ghost" className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50 h-9">
                                                View Club <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar: Hall of Fame + Featured */}
                <div className="space-y-6">
                    {/* Hall of Fame */}
                    <Card className="rounded-[2.5rem] border-transparent bg-[#163D2D] text-white shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
                        <CardHeader className="p-7 pb-4 relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-300 mb-2 flex items-center gap-2">
                                <Trophy className="h-3.5 w-3.5" /> Hall of Fame
                            </p>
                            <CardTitle className="font-black text-2xl text-white italic">School Champions</CardTitle>
                        </CardHeader>
                        <CardContent className="px-7 pb-7 space-y-3 relative z-10">
                            {achievements.map((a, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10">
                                    <span className="text-2xl">{a.medal}</span>
                                    <div>
                                        <p className="font-black text-sm text-white italic">{a.title}</p>
                                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{a.club} · {a.year}</p>
                                    </div>
                                </div>
                            ))}
                            <Link href="/extracurriculars/achievements">
                                <Button className="w-full mt-2 bg-amber-500 hover:bg-amber-400 text-white font-black text-[10px] uppercase tracking-widest h-10 rounded-2xl border-none">
                                    View All Trophies <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Upcoming Events */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white">
                        <CardHeader className="p-6 pb-3">
                            <CardTitle className="font-black text-lg text-slate-900 flex items-center gap-2 italic">
                                <CalendarCheck className="h-4 w-4 text-blue-500" /> Upcoming Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-3">
                            {[
                                { date: "Mar 15", title: "Sports Day", club: "Athletics", dot: "bg-slate-600" },
                                { date: "Mar 18", title: "Science Expo", club: "Robotics Club", dot: "bg-blue-500" },
                                { date: "Mar 20", title: "Inter-School Debate", club: "Debate Soc.", dot: "bg-emerald-500" },
                                { date: "Mar 22", title: "Annual Concert", club: "School Band", dot: "bg-amber-500" },
                            ].map((ev, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="w-10 text-center shrink-0">
                                        <p className="text-[9px] font-black text-slate-400 uppercase">Mar</p>
                                        <p className="text-lg font-black text-slate-900 leading-tight">{ev.date.split(" ")[1]}</p>
                                    </div>
                                    <div className={cn("h-8 w-1 rounded-full shrink-0", ev.dot)} />
                                    <div>
                                        <p className="font-black text-[12px] text-slate-900 italic">{ev.title}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ev.club}</p>
                                    </div>
                                </div>
                            ))}
                            <Link href="/extracurriculars/events">
                                <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50 h-9 rounded-xl">
                                    All Events →
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
