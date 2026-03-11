"use client"
import * as React from "react"
import { 
    Calendar, CheckCircle2, ChevronRight, Clock, Plus, 
    Trash2, Save, Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { 
    getTimetableBySection, 
    saveClassPeriodAction, 
    removeClassPeriodAction 
} from "@/lib/actions"
import { cn } from "@/lib/utils"

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

export function TimetableClient({ sections, teachers, courses, rooms }: any) {
    const { toast } = useToast();
    const [selectedSection, setSelectedSection] = React.useState<string>("");
    const [periods, setPeriods] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const [sheetOpen, setSheetOpen] = React.useState(false);
    const [activeCell, setActiveCell] = React.useState<{day: number, time: string} | null>(null);
    const [formData, setFormData] = React.useState({ courseId: "", teacherId: "", roomId: "" });
    const [formError, setFormError] = React.useState("");

    const loadTimetable = async (sectionId: string) => {
        setIsLoading(true);
        try {
            const data = await getTimetableBySection(sectionId);
            setPeriods(data);
        } catch (e: any) {
            toast({ variant: "destructive", title: "Error", description: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (selectedSection) {
            loadTimetable(selectedSection);
        } else {
            setPeriods([]);
        }
    }, [selectedSection]);

    const handleCellClick = (dayId: number, timeSlot: string) => {
        if (timeSlot.includes("Break") || timeSlot.includes("Lunch")) return;
        setActiveCell({ day: dayId, time: timeSlot });
        setFormError("");
        setFormData({ courseId: "", teacherId: "", roomId: "" });
        setSheetOpen(true);
    };

    const handleSavePeriod = async () => {
        if (!activeCell || !selectedSection || !formData.courseId || !formData.teacherId || !formData.roomId) {
            setFormError("Please select all fields.");
            return;
        }

        const [start, end] = activeCell.time.split(" - ");
        
        setIsLoading(true);
        setFormError("");
        try {
            await saveClassPeriodAction({
                sectionId: selectedSection,
                courseId: formData.courseId,
                teacherId: formData.teacherId,
                roomId: formData.roomId,
                dayOfWeek: activeCell.day,
                startTime: start,
                endTime: end
            });
            
            toast({ title: "Saved", description: "Class period assigned successfully." });
            setSheetOpen(false);
            loadTimetable(selectedSection);
        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePeriod = async (id: string) => {
        if (!confirm("Remove this class period?")) return;
        try {
            await removeClassPeriodAction(id);
            toast({ title: "Removed", description: "Period deleted." });
            loadTimetable(selectedSection);
        } catch (e: any) {
            toast({ variant: "destructive", title: "Error", description: e.message });
        }
    };

    return (
        <div className="space-y-6">
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-xl font-black">Timetable Grid</CardTitle>
                    <div className="flex items-center gap-3">
                        <Select value={selectedSection} onValueChange={setSelectedSection}>
                            <SelectTrigger className="w-[280px] font-bold">
                                <SelectValue placeholder="Select Class Section..." />
                            </SelectTrigger>
                            <SelectContent>
                                {sections.map((s: any) => (
                                    <SelectItem key={s.id} value={s.id} className="font-medium">
                                        {s.className} - {s.sectionName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    {!selectedSection ? (
                        <div className="p-12 text-center text-muted-foreground bg-muted/5 border-t border-border/50">
                            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="font-bold">Select a Class Section above to view or build its timetable.</p>
                        </div>
                    ) : (
                        <div className="min-w-[1000px]">
                            <div className="grid grid-cols-6 border-b border-border/50 bg-muted/20">
                                <div className="p-3 font-bold text-center border-r border-border/50 text-emerald-900/60 uppercase tracking-widest text-xs">
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
                                    <div key={slot} className={cn(
                                        "grid grid-cols-6 border-b border-border/50 transition-colors",
                                        isBreak ? "bg-muted/30" : "hover:bg-muted/5"
                                    )}>
                                        <div className="p-3 flex items-center justify-center font-bold text-xs text-muted-foreground border-r border-border/50 whitespace-nowrap">
                                            <Clock className="w-3.5 h-3.5 mr-1" /> {slot.replace(/ \(.+\)/, "")}
                                        </div>
                                        
                                        {DAYS.map(d => {
                                            if (isBreak) {
                                                return <div key={`${d.id}-${slot}`} className="p-3 border-r border-border/50 last:border-r-0 text-center text-xs font-bold text-muted-foreground/50 italic flex items-center justify-center">
                                                    {slot.includes("Break") ? "Recess" : "Lunch Time"}
                                                </div>
                                            }

                                            // Find if there's a mapped period here
                                            const period = periods.find(p => p.dayOfWeek === d.id && p.startTime === start);

                                            return (
                                                <div 
                                                    key={`${d.id}-${slot}`} 
                                                    className="p-2 border-r border-border/50 last:border-r-0 min-h-[90px] group relative"
                                                >
                                                    {period ? (
                                                        <div className="h-full w-full bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 relative flex flex-col justify-between overflow-hidden group-hover:bg-emerald-500/15 transition-colors">
                                                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" onClick={() => handleDeletePeriod(period.id)}>
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </Button>
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-emerald-800 dark:text-emerald-300 text-sm leading-tight truncate">{period.course.name}</p>
                                                                <p className="text-xs font-bold text-emerald-600/80 truncate">{period.teacher.name}</p>
                                                            </div>
                                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 bg-background/50 px-1 py-0.5 rounded w-max">
                                                                {period.room.name}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleCellClick(d.id, slot)}
                                                            className="w-full h-full rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all text-xs font-bold"
                                                        >
                                                            <Plus className="w-5 h-5 mb-1" />
                                                            Assign Class
                                                        </button>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="font-black text-2xl tracking-tight">Assign Period</SheetTitle>
                        <SheetDescription className="font-medium font-bold">
                            {activeCell && `${DAYS.find(d => d.id === activeCell.day)?.name} at ${activeCell.time}`}
                        </SheetDescription>
                    </SheetHeader>

                    {formError && (
                        <Alert variant="destructive" className="mt-6 border-rose-500/50 bg-rose-500/10 text-rose-700">
                            <AlertTitle className="font-bold">Booking Conflict</AlertTitle>
                            <AlertDescription className="font-medium text-xs">
                                {formError}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="mt-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold tracking-tight">Subject / Course</label>
                            <Select value={formData.courseId} onValueChange={(val) => setFormData({...formData, courseId: val})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select course..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((c: any) => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold tracking-tight">Teacher / Instructor</label>
                            <Select value={formData.teacherId} onValueChange={(val) => setFormData({...formData, teacherId: val})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select teacher..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.map((t: any) => (
                                        <SelectItem key={t.employeeId} value={t.employeeId}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full overflow-hidden bg-muted">
                                                    <img src={t.avatarUrl} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                {t.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold tracking-tight">Room Allocation</label>
                            <Select value={formData.roomId} onValueChange={(val) => setFormData({...formData, roomId: val})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select physical room..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {rooms.map((r: any) => (
                                        <SelectItem key={r.roomId} value={r.roomId}>
                                            {r.name} {r.isLab ? "(Lab)" : ""}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button 
                            className="w-full emerald-gradient font-black text-white hover:opacity-90 transition-opacity" 
                            disabled={isLoading}
                            onClick={handleSavePeriod}
                        >
                            <Save className="w-4 h-4 mr-2" /> {isLoading ? "Checking..." : "Confirm & Save Period"}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
