import * as React from "react"
import { getTimetableByTeacher } from "@/lib/actions"
import { Calendar } from "lucide-react"

export default async function TeacherTimetablePage({ searchParams }: { searchParams: { id?: string } }) {
    // Ideally we get teacher ID from the session. For testing, we can pass it or use a default.
    const teacherId = searchParams.id || "EMP001"; 
    const schedule = await getTimetableByTeacher(teacherId);

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
        <div className="space-y-8 max-w-[1200px] mx-auto p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black font-headline tracking-tighter text-indigo-900 dark:text-indigo-50">
                    My Teaching Schedule
                </h1>
                <p className="text-muted-foreground font-medium">
                    Your weekly class assignments across all sections.
                </p>
            </div>

            <div className="glass-card rounded-xl border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                        <div className="grid grid-cols-6 border-b border-border/50 bg-muted/20">
                            <div className="p-3 font-bold text-center border-r border-border/50 text-indigo-900/60 uppercase tracking-widest text-xs">
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
                                                    <div className="h-full w-full bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-2 flex flex-col justify-between">
                                                        <div>
                                                            <p className="font-black text-indigo-800 dark:text-indigo-300 text-sm leading-tight">{period.course.name}</p>
                                                            <p className="text-xs font-bold text-indigo-600/80 mt-0.5">
                                                                {period.section.className} - {period.section.sectionName}
                                                            </p>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 bg-background/50 px-1 py-0.5 rounded w-max">
                                                            {period.room.name}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex items-center justify-center text-muted-foreground/30">
                                                        -
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
