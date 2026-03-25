import * as React from "react"
import { getTimetableBySection } from "@/lib/actions"
import { CalendarCheck, MapPin, Clock } from "lucide-react"

export default async function StudentTimetablePage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
    // Ideally from student's session. Using default "test-section-id" or parameter
    const resolvedParams = await searchParams;
    const sectionId = resolvedParams.section || "f2496a75-b6d2-4e45-86b2-cc3ff9c83693"; 
    
    let schedule: any[] = [];
    try {
        schedule = await getTimetableBySection(sectionId);
    } catch (e) {
        console.warn("Could not load section timetable", e);
    }

    const DAYS = [
        { id: 1, name: "Monday" },
        { id: 2, name: "Tuesday" },
        { id: 3, name: "Wednesday" },
        { id: 4, name: "Thursday" },
        { id: 5, name: "Friday" }
    ];

    const TIME_SLOTS = [
        "08:00 - 08:45",
        "08:45 - 09:30",
        "09:30 - 10:15",
        "10:15 - 10:30 (Break)",
        "10:30 - 11:15",
        "11:15 - 12:00",
        "12:00 - 13:00 (Lunch)",
        "13:00 - 13:45",
        "13:45 - 14:30",
        "14:30 - 15:15"
    ];

    return (
        <div className="flex flex-col min-h-[80vh] bg-[#F8FAFC]">
            {/* ── Deep Green Header ── */}
            <div className="bg-[#163D2D] text-white pt-10 pb-16 px-4 sm:px-8 w-full relative overflow-hidden shrink-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-50%] left-[-10%] w-[40%] h-[150%] bg-[#0B2117]/50 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="max-w-[1600px] mx-auto w-full relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="h-16 w-16 bg-white/10 rounded-[20px] backdrop-blur-md flex items-center justify-center text-emerald-300 shadow-xl border border-white/10">
                                <CalendarCheck className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">Master Schedule</h1>
                                <p className="text-emerald-100/70 font-medium text-sm mt-1 sm:mt-2">
                                    Weekly structure • Term 3 • Active Cohort
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Timetable Grid ── */}
            <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 -mt-10 relative z-20 pb-12">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border-transparent overflow-hidden border border-slate-100 premium-glass-card">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-[1024px]">
                            {/* Header Row */}
                            <div className="grid grid-cols-6 border-b-2 border-slate-100 bg-slate-50/50">
                                <div className="p-5 font-black text-center border-r border-slate-100 text-slate-400 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                                    <Clock className="h-4 w-4" /> Time Slot
                                </div>
                                {DAYS.map(d => (
                                    <div key={d.id} className="p-5 font-black text-center border-r border-slate-100 last:border-r-0 text-slate-900 uppercase tracking-tight">
                                        {d.name}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Time Slots Rows */}
                            {TIME_SLOTS.map((slot, index) => {
                                const isBreak = slot.includes("Break") || slot.includes("Lunch");
                                const [start, end] = slot.split(" - ");
                                
                                if (isBreak) {
                                    return (
                                        <div key={slot} className="grid grid-cols-6 border-b border-slate-100 bg-emerald-50/50 group">
                                            <div className="p-4 flex items-center justify-center font-black text-xs text-slate-500 border-r border-slate-100 whitespace-nowrap bg-white/50 group-hover:bg-emerald-50 transition-colors">
                                                {slot.replace(/ \(.+\)/, "")}
                                            </div>
                                            <div className="col-span-5 p-4 flex items-center justify-center text-sm font-black text-emerald-600/50 uppercase tracking-[0.3em] italic">
                                                {slot.includes("Break") ? "Recess Break" : "Lunch Period"}
                                            </div>
                                        </div>
                                    )
                                }

                                return (
                                    <div key={slot} className="grid grid-cols-6 border-b border-slate-100 group">
                                        <div className="p-4 flex flex-col items-center justify-center font-black text-xs text-slate-900 border-r border-slate-100 whitespace-nowrap bg-slate-50/30 group-hover:bg-slate-50 transition-colors">
                                            <span>{start}</span>
                                            <span className="text-[10px] text-slate-400 font-bold">to {end.replace(/ \(.+\)/, "")}</span>
                                        </div>
                                        
                                        {DAYS.map(d => {
                                            const period = schedule.find(p => p.dayOfWeek === d.id && p.startTime === start);
                                            const isCurrent = index === 1 && d.id === 3; // Mocking Wednesday Period 2 as "Happening Now"

                                            return (
                                                <div key={`${d.id}-${slot}`} className="p-3 border-r border-slate-100 last:border-r-0 min-h-[120px] bg-white group-hover:bg-slate-50/30 transition-colors">
                                                    {period ? (
                                                        <div className={`h-full w-full rounded-[16px] p-4 flex flex-col justify-between transition-all duration-300 cursor-default shadow-sm hover:shadow-md border ${
                                                            isCurrent 
                                                            ? "bg-[#163D2D] border-[#163D2D] text-white scale-105 shadow-emerald-900/20 z-10 relative" 
                                                            : "bg-emerald-50/80 border-emerald-100/50 hover:bg-emerald-50 hover:border-emerald-200 hover:-translate-y-1"
                                                        }`}>
                                                            <div>
                                                                <p className={`font-black text-sm tracking-tight leading-tight line-clamp-2 ${isCurrent ? "text-white" : "text-emerald-900"}`}>{period.course.name}</p>
                                                                <p className={`text-xs font-bold mt-1 truncate max-w-full ${isCurrent ? "text-emerald-100/80" : "text-emerald-600/70"}`}>
                                                                    {period.teacher.name}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-3">
                                                                <MapPin className={`h-3 w-3 ${isCurrent ? "text-emerald-400" : "text-emerald-500"}`} />
                                                                <p className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? "text-emerald-100" : "text-emerald-700"}`}>
                                                                    {period.room.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="h-full flex items-center justify-center text-slate-300/50 text-[10px] font-black uppercase tracking-widest hover:text-slate-300 transition-colors">
                                                            Free Period
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* Bottom Legend */}
                    <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-50 border border-emerald-200" /> Planned Session
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#163D2D]" /> Happening Now
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white border border-slate-200" /> Free Block
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
