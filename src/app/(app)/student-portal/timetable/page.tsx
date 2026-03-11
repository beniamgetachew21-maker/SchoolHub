import * as React from "react"
import { getTimetableBySection } from "@/lib/actions"

export default async function StudentTimetablePage({ searchParams }: { searchParams: { section?: string } }) {
    // Ideally from student's session. Using default "test-section-id" or parameter
    const sectionId = searchParams.section || "f2496a75-b6d2-4e45-86b2-cc3ff9c83693"; 
    
    let schedule = [];
    try {
        schedule = await getTimetableBySection(sectionId);
    } catch (e) {
        console.warn("Could not load section timetable", e);
    }

    const DAYS = [
        { id: 1, name: "Mon" },
        { id: 2, name: "Tue" },
        { id: 3, name: "Wed" },
        { id: 4, name: "Thu" },
        { id: 5, name: "Fri" }
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
        <div className="space-y-6 max-w-[1200px] mx-auto p-4 sm:p-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tighter text-blue-900 dark:text-blue-50">
                    Weekly Timetable
                </h1>
                <p className="text-muted-foreground font-medium text-sm">
                    View your daily class schedule and classroom assignments.
                </p>
            </div>

            <div className="glass-card rounded-xl border border-border/50 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-6 border-b border-border/50 bg-muted/20">
                            <div className="p-3 font-bold text-center border-r border-border/50 text-blue-900/60 uppercase tracking-widest text-xs">
                                Time
                            </div>
                            {DAYS.map(d => (
                                <div key={d.id} className="p-3 font-black text-center border-r border-border/50 last:border-r-0">
                                    {d.name}
                                </div>
                            ))}
                        </div>
                        
                        {TIME_SLOTS.map(slot => {
                            const isBreak = slot.includes("Break") || slot.includes("Lunch");
                            const [start, end] = slot.split(" - ");
                            
                            return (
                                <div key={slot} className={`grid grid-cols-6 border-b border-border/50 ${isBreak ? 'bg-muted/30' : 'hover:bg-muted/5'}`}>
                                    <div className="p-3 flex items-center justify-center font-bold text-xs text-muted-foreground border-r border-border/50 whitespace-nowrap">
                                        {slot.replace(/ \(.+\)/, "")}
                                    </div>
                                    
                                    {DAYS.map(d => {
                                        if (isBreak) {
                                            return <div key={`${d.id}-${slot}`} className="p-3 border-r border-border/50 last:border-r-0 text-center text-xs font-bold text-muted-foreground/50 italic flex items-center justify-center">
                                                {slot.includes("Break") ? "Recess" : "Lunch Break"}
                                            </div>
                                        }

                                        const period = schedule.find(p => p.dayOfWeek === d.id && p.startTime === start);

                                        return (
                                            <div key={`${d.id}-${slot}`} className="p-2 border-r border-border/50 last:border-r-0 min-h-[90px]">
                                                {period ? (
                                                    <div className="h-full w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200 cursor-default shadow-sm hover:shadow-md">
                                                        <div>
                                                            <p className="font-black text-blue-800 dark:text-blue-300 text-sm leading-tight">{period.course.name}</p>
                                                            <p className="text-xs font-bold text-blue-600/80 mt-0.5 truncate max-w-full">
                                                                {period.teacher.name}
                                                            </p>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 bg-background/50 px-1 py-0.5 rounded w-max border border-border/50">
                                                            {period.room.name}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex items-center justify-center text-muted-foreground/20 text-xs font-medium">
                                                        Free
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
            </div>
        </div>
    )
}
