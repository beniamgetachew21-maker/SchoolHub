"use client"
import * as React from "react"
import {
    CalendarCheck, UserCheck, UserX, Clock, TrendingUp,
    AlertTriangle, CheckCircle2, FileBarChart, RefreshCw
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { getAttendanceByClass } from "@/lib/actions"
import { markAttendanceWithAlertsAction } from "@/lib/flow-actions"
import { cn } from "@/lib/utils"

type AttendanceStatus = "Present" | "Absent" | "Late" | "Leave";

const STATUS_CONFIG: Record<AttendanceStatus, { label: string; color: string; icon: React.ElementType }> = {
    Present: { label: "Present", color: "text-emerald-600", icon: CheckCircle2 },
    Absent:  { label: "Absent",  color: "text-rose-600",    icon: UserX },
    Late:    { label: "Late",    color: "text-amber-600",   icon: Clock },
    Leave:   { label: "Leave",   color: "text-blue-600",    icon: CalendarCheck },
};

export function AttendanceClient({ classes, report }: { classes: string[]; report: any[] }) {
    const [selectedClass, setSelectedClass] = React.useState("");
    const [roster, setRoster] = React.useState<any[]>([]);
    const [attendance, setAttendance] = React.useState<Record<string, AttendanceStatus>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const today = new Date().toISOString().split("T")[0];

    React.useEffect(() => {
        if (!selectedClass) { setRoster([]); setAttendance({}); return; }
        setIsLoading(true);
        getAttendanceByClass(selectedClass).then(data => {
            setRoster(data);
            const initial: Record<string, AttendanceStatus> = {};
            data.forEach((s: any) => { initial[s.studentId] = "Present"; });
            setAttendance(initial);
            setIsLoading(false);
        });
    }, [selectedClass]);

    const stats = React.useMemo(() => {
        const values = Object.values(attendance);
        return {
            present: values.filter(v => v === "Present").length,
            absent:  values.filter(v => v === "Absent").length,
            late:    values.filter(v => v === "Late").length,
            leave:   values.filter(v => v === "Leave").length,
            total:   values.length,
        };
    }, [attendance]);

    const handleSubmit = async () => {
        if (!selectedClass) { toast({ variant: "destructive", title: "No class selected" }); return; }
        setIsSubmitting(true);
        const records = Object.entries(attendance).map(([studentId, status]) => ({ studentId, status, date: today }));
        const result = await markAttendanceWithAlertsAction(records, selectedClass);
        setIsSubmitting(false);
        if (result.success) {
            toast({ title: "✅ Attendance Submitted", description: `${records.length} student records saved for ${selectedClass}.` });
        } else {
            toast({ variant: "destructive", title: "Save Failed", description: result.error });
        }
    };

    return (
        <Tabs defaultValue="take" className="space-y-6">
            <TabsList className="bg-muted/50 border border-emerald-500/10 p-1">
                <TabsTrigger value="take" className="font-black uppercase text-xs">Take Attendance</TabsTrigger>
                <TabsTrigger value="report" className="font-black uppercase text-xs">Attendance Report</TabsTrigger>
            </TabsList>

            {/* ── Take Attendance Tab ── */}
            <TabsContent value="take" className="animate-in fade-in duration-500 space-y-6">
                {/* KPI Bar */}
                {roster.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Present",   value: stats.present, color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700" },
                            { label: "Absent",    value: stats.absent,  color: "bg-rose-500/10 border-rose-500/20 text-rose-700" },
                            { label: "Late",      value: stats.late,    color: "bg-amber-500/10 border-amber-500/20 text-amber-700" },
                            { label: "On Leave",  value: stats.leave,   color: "bg-blue-500/10 border-blue-500/20 text-blue-700" },
                        ].map(item => (
                            <div key={item.label} className={cn("p-5 rounded-2xl border font-black", item.color)}>
                                <p className="text-3xl">{item.value}</p>
                                <p className="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1">{item.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                <Card className="glass-card">
                    <CardHeader>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <CardTitle className="font-black text-xl">Daily Roll Call</CardTitle>
                                <CardDescription>Date: <strong>{today}</strong></CardDescription>
                            </div>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger className="w-56 bg-muted/20 border-border/50 font-bold">
                                    <SelectValue placeholder="Select a class…" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classes.map(c => (
                                        <SelectItem key={c} value={c} className="font-bold">{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!selectedClass ? (
                            <div className="h-48 flex flex-col items-center justify-center gap-2 text-muted-foreground border-2 border-dashed rounded-2xl">
                                <CalendarCheck className="h-10 w-10 opacity-30" />
                                <p className="font-bold text-sm">Select a class to begin the roll call.</p>
                            </div>
                        ) : isLoading ? (
                            <div className="h-48 flex items-center justify-center">
                                <RefreshCw className="h-8 w-8 animate-spin text-emerald-500" />
                            </div>
                        ) : (
                            <>
                                <div className="rounded-2xl border border-border/50 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-muted/30">
                                            <TableRow>
                                                <TableHead className="pl-6 font-black uppercase text-[10px] tracking-widest">Student</TableHead>
                                                <TableHead className="font-black uppercase text-[10px] tracking-widest">ID</TableHead>
                                                <TableHead className="text-right pr-6 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {roster.map((student: any) => (
                                                <TableRow key={student.studentId} className={cn(
                                                    "transition-colors",
                                                    attendance[student.studentId] === "Absent" && "bg-rose-500/5",
                                                    attendance[student.studentId] === "Late" && "bg-amber-500/5",
                                                )}>
                                                    <TableCell className="pl-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center font-black text-emerald-700">
                                                                {student.name?.[0]}
                                                            </div>
                                                            <span className="font-black text-sm">{student.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs text-muted-foreground">{student.studentId}</TableCell>
                                                    <TableCell className="text-right pr-6">
                                                        <RadioGroup
                                                            value={attendance[student.studentId]}
                                                            onValueChange={val => setAttendance(prev => ({ ...prev, [student.studentId]: val as AttendanceStatus }))}
                                                            className="flex justify-end gap-3"
                                                        >
                                                            {(["Present", "Absent", "Late", "Leave"] as AttendanceStatus[]).map(status => (
                                                                <div key={status} className="flex items-center gap-1.5">
                                                                    <RadioGroupItem value={status} id={`${status}-${student.studentId}`} />
                                                                    <Label htmlFor={`${status}-${student.studentId}`} className={cn("text-xs font-bold cursor-pointer", STATUS_CONFIG[status].color)}>
                                                                        {status}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <p className="text-sm font-bold text-muted-foreground">{roster.length} students in {selectedClass}</p>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="h-11 px-8 emerald-gradient text-white font-black rounded-xl"
                                    >
                                        {isSubmitting ? "Saving…" : `Submit Attendance for ${selectedClass}`}
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* ── Report Tab ── */}
            <TabsContent value="report" className="animate-in fade-in duration-500">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="font-black text-xl flex items-center gap-2">
                            <FileBarChart className="h-5 w-5 text-emerald-600" />
                            Term Attendance Report
                        </CardTitle>
                        <CardDescription>Students flagged below 75% are considered &quot;At Risk&quot; and may require intervention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {report.length === 0 ? (
                            <div className="h-48 flex items-center justify-center text-muted-foreground font-medium italic">
                                No attendance data recorded yet. Submit a roll call to generate the report.
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-border/50 overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-muted/30">
                                        <TableRow>
                                            <TableHead className="pl-6 font-black uppercase text-[10px] tracking-widest">Student</TableHead>
                                            <TableHead className="font-black uppercase text-[10px] tracking-widest">Class</TableHead>
                                            <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Present</TableHead>
                                            <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Absent</TableHead>
                                            <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Attendance</TableHead>
                                            <TableHead className="pr-6 text-right font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {report.map(row => (
                                            <TableRow key={row.studentId} className={cn(
                                                "hover:bg-muted/10 transition-colors",
                                                row.risk === "At Risk" && "bg-rose-500/5"
                                            )}>
                                                <TableCell className="pl-6 font-black text-sm">{row.studentName}</TableCell>
                                                <TableCell className="text-xs font-bold text-muted-foreground">{row.class}</TableCell>
                                                <TableCell className="text-center font-bold text-emerald-600">{row.presentDays}</TableCell>
                                                <TableCell className="text-center font-bold text-rose-600">{row.absentDays}</TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center gap-3">
                                                        <Progress value={row.percentage} className="h-2 flex-1" />
                                                        <span className="font-black text-sm w-12 text-right">{row.percentage}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="pr-6 text-right">
                                                    <Badge className={cn(
                                                        "font-bold text-[10px] px-3",
                                                        row.risk === "At Risk" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" :
                                                        row.risk === "Borderline" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                                        "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                                    )}>
                                                        {row.risk}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
