"use client"
import * as React from "react"
import {
    GraduationCap, PlusCircle, Sparkles, ChevronDown,
    ChevronUp, BarChart3, BookOpen, Award
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { createAssessmentAction, getResultsByAssessment, bulkSaveResultsAction } from "@/lib/actions"
import { cn } from "@/lib/utils"

const GRADE_COLOR: Record<string, string> = {
    "A+": "bg-emerald-500 text-white",
    "A":  "bg-emerald-400 text-white",
    "A-": "bg-emerald-300 text-emerald-900",
    "B+": "bg-blue-400 text-white",
    "B":  "bg-blue-300 text-blue-900",
    "B-": "bg-blue-200 text-blue-900",
    "C+": "bg-amber-400 text-white",
    "C":  "bg-amber-300 text-amber-900",
    "D":  "bg-orange-400 text-white",
    "F":  "bg-rose-500 text-white",
};

export function ExaminationsClient({ summaries, students, assessments: initialAssessments }: {
    summaries: any[];
    students: any[];
    assessments: any[];
}) {
    const [assessments, setAssessments] = React.useState(initialAssessments);
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [isMarksOpen, setIsMarksOpen] = React.useState(false);
    const [selectedAssessment, setSelectedAssessment] = React.useState<any>(null);
    const [assessmentResults, setAssessmentResults] = React.useState<any[]>([]);
    const [marksInput, setMarksInput] = React.useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = React.useState(false);

    // New assessment form state
    const [form, setForm] = React.useState({ name: "", subject: "", type: "Formative", maxMarks: "100", date: new Date().toISOString().split("T")[0] });

    const statsTotal = summaries.reduce((acc, s) => acc + s.studentCount, 0);
    const statsAvgPass = summaries.length > 0
        ? Math.round(summaries.reduce((acc, s) => acc + s.passRate, 0) / summaries.length)
        : 0;

    const handleOpenMarks = async (assessment: any) => {
        const results = await getResultsByAssessment(assessment.assessmentId);
        setSelectedAssessment(assessment);
        setAssessmentResults(results);
        // Pre-fill existing marks
        const preMap: Record<string, string> = {};
        results.forEach((r: any) => { preMap[r.studentId] = String(r.marksObtained); });
        students.forEach((s: any) => { if (!preMap[s.studentId]) preMap[s.studentId] = ""; });
        setMarksInput(preMap);
        setIsMarksOpen(true);
    };

    const handleSaveMarks = async () => {
        if (!selectedAssessment) return;
        setIsSaving(true);
        const records = Object.entries(marksInput)
            .filter(([, v]) => v !== "" && !isNaN(Number(v)))
            .map(([studentId, marks]) => ({ studentId, marksObtained: Number(marks) }));
        const result = await bulkSaveResultsAction(selectedAssessment.assessmentId, records);
        setIsSaving(false);
        if (result.success) {
            toast({ title: "✅ Marks Saved", description: `${records.length} student results saved with GPA computed.` });
            setIsMarksOpen(false);
        } else {
            toast({ variant: "destructive", title: "Save Failed", description: result.error });
        }
    };

    const handleCreateAssessment = async () => {
        const result = await createAssessmentAction(form);
        if (result.success) {
            toast({ title: "✅ Assessment Created", description: `${form.name} added to the system.` });
            setAssessments(prev => [...prev, result.data]);
            setIsAddOpen(false);
            setForm({ name: "", subject: "", type: "Formative", maxMarks: "100", date: new Date().toISOString().split("T")[0] });
        } else {
            toast({ variant: "destructive", title: "Failed", description: result.error });
        }
    };

    return (
        <div className="space-y-6">
            {/* KPI Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Assessments", value: assessments.length, icon: BookOpen, color: "text-emerald-600" },
                    { label: "Results Entered",   value: statsTotal,          icon: GraduationCap, color: "text-blue-600" },
                    { label: "Avg Pass Rate",     value: `${statsAvgPass}%`,  icon: Award, color: "text-amber-600" },
                    { label: "Subjects Tracked",  value: new Set(assessments.map(a => a.subject)).size, icon: BarChart3, color: "text-indigo-600" },
                ].map(item => (
                    <Card key={item.label} className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <item.icon className={cn("h-5 w-5", item.color)} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p>
                        </div>
                        <p className="text-3xl font-black tracking-tighter">{item.value}</p>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="assessments" className="space-y-6">
                <div className="flex items-center justify-between">
                    <TabsList className="bg-muted/50 border border-emerald-500/10 p-1">
                        <TabsTrigger value="assessments" className="font-black uppercase text-xs">Assessments</TabsTrigger>
                        <TabsTrigger value="summary" className="font-black uppercase text-xs">Class Summary</TabsTrigger>
                    </TabsList>
                    <Button className="emerald-gradient text-white font-black h-10 px-6 rounded-xl" onClick={() => setIsAddOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> New Assessment
                    </Button>
                </div>

                {/* ── Assessments Tab ── */}
                <TabsContent value="assessments" className="animate-in fade-in duration-500 space-y-4">
                    {assessments.map(a => (
                        <AssessmentRow key={a.assessmentId} assessment={a} onEnterMarks={() => handleOpenMarks(a)} />
                    ))}
                    {assessments.length === 0 && (
                        <div className="h-48 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-2xl font-medium italic">
                            No assessments scheduled yet. Create the first one.
                        </div>
                    )}
                </TabsContent>

                {/* ── Summary Tab ── */}
                <TabsContent value="summary" className="animate-in fade-in duration-500">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="font-black text-xl">Class Performance Summary</CardTitle>
                            <CardDescription>GPA-weighted performance overview across all completed assessments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-2xl border border-border/50 overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-muted/30">
                                        <TableRow>
                                            <TableHead className="pl-6 font-black uppercase text-[10px] tracking-widest">Assessment</TableHead>
                                            <TableHead className="font-black uppercase text-[10px] tracking-widest">Subject</TableHead>
                                            <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Students</TableHead>
                                            <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Avg Score</TableHead>
                                            <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Avg Grade</TableHead>
                                            <TableHead className="pr-6 text-right font-black uppercase text-[10px] tracking-widest">Pass Rate</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {summaries.map(row => (
                                            <TableRow key={row.assessmentId} className="hover:bg-muted/10 transition-colors">
                                                <TableCell className="pl-6 font-black text-sm">{row.name}</TableCell>
                                                <TableCell className="text-xs font-bold text-muted-foreground">{row.subject}</TableCell>
                                                <TableCell className="text-center font-bold">{row.studentCount}</TableCell>
                                                <TableCell className="text-center font-mono font-black">{row.avgScore}/{row.maxMarks}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge className={cn("font-bold text-[10px] px-3", GRADE_COLOR[row.avgGrade] || "bg-muted")}>
                                                        {row.avgGrade}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="pr-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Progress value={row.passRate} className="h-2 w-20" />
                                                        <span className="font-black text-sm">{row.passRate}%</span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* ── New Assessment Sheet ── */}
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="glass-card">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-black font-headline tracking-tight">New Assessment</SheetTitle>
                        <SheetDescription>Schedule a new exam, quiz, or assessment.</SheetDescription>
                    </SheetHeader>
                    <div className="pt-6 space-y-5">
                        {[
                            { label: "Assessment Name", key: "name", type: "text", placeholder: "e.g. Mid-Term Mathematics" },
                            { label: "Subject",         key: "subject", type: "text", placeholder: "e.g. Mathematics" },
                            { label: "Max Marks",       key: "maxMarks", type: "number", placeholder: "100" },
                            { label: "Date",            key: "date", type: "date", placeholder: "" },
                        ].map(field => (
                            <div key={field.key} className="space-y-2">
                                <Label className="font-black uppercase text-[10px] tracking-widest">{field.label}</Label>
                                <Input type={field.type} placeholder={field.placeholder} value={(form as any)[field.key]}
                                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                    className="bg-muted/20 border-border/50" />
                            </div>
                        ))}
                        <div className="space-y-2">
                            <Label className="font-black uppercase text-[10px] tracking-widest">Type</Label>
                            <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                                <SelectTrigger className="bg-muted/20 border-border/50">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Formative", "Summative", "Quiz", "Exam", "Practical"].map(t => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full h-12 emerald-gradient text-white font-black rounded-xl mt-4" onClick={handleCreateAssessment}>
                            Create Assessment
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* ── Enter Marks Sheet ── */}
            <Sheet open={isMarksOpen} onOpenChange={setIsMarksOpen}>
                <SheetContent className="sm:max-w-2xl glass-card flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-black font-headline tracking-tight">
                            Enter Marks: {selectedAssessment?.name}
                        </SheetTitle>
                        <SheetDescription>
                            {selectedAssessment?.subject} | Max Marks: {selectedAssessment?.maxMarks} | Grades computed automatically via GPA scale.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto pt-4 space-y-2">
                        {students.map(student => (
                            <div key={student.studentId} className="flex items-center gap-4 p-3 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors">
                                <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center font-black text-xs text-emerald-700 flex-shrink-0">
                                    {student.name?.[0]}
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-sm">{student.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold">{student.class}</p>
                                </div>
                                <Input
                                    type="number"
                                    min={0}
                                    max={selectedAssessment?.maxMarks}
                                    placeholder="—"
                                    value={marksInput[student.studentId] || ""}
                                    onChange={e => setMarksInput(prev => ({ ...prev, [student.studentId]: e.target.value }))}
                                    className="w-24 text-center font-black bg-muted/20 border-border/50"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-border/10">
                        <Button className="w-full h-12 emerald-gradient text-white font-black rounded-xl" onClick={handleSaveMarks} disabled={isSaving}>
                            {isSaving ? "Saving & Computing GPA…" : `Save Results for ${students.length} Students`}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

function AssessmentRow({ assessment, onEnterMarks }: { assessment: any; onEnterMarks: () => void }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const typeColors: Record<string, string> = {
        Formative: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        Summative: "bg-purple-500/10 text-purple-600 border-purple-500/20",
        Quiz: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        Exam: "bg-rose-500/10 text-rose-600 border-rose-500/20",
        Practical: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    };
    return (
        <Card className="glass-card overflow-hidden">
            <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => setIsOpen(o => !o)}
            >
                <div className="flex items-center gap-4">
                    {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                    <div>
                        <h3 className="font-black text-lg tracking-tight">{assessment.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge className={cn("font-bold text-[10px] px-2", typeColors[assessment.type] || "bg-muted text-muted-foreground")}>
                                {assessment.type?.toUpperCase()}
                            </Badge>
                            <span className="text-xs font-bold text-muted-foreground">{assessment.subject}</span>
                            <span className="text-xs font-bold text-muted-foreground">Max: {assessment.maxMarks}</span>
                            <span className="text-xs font-bold text-muted-foreground">{new Date(assessment.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="font-black text-[10px] uppercase tracking-widest h-9 border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-600"
                    onClick={e => { e.stopPropagation(); onEnterMarks(); }}
                >
                    Enter Marks
                </Button>
            </div>
        </Card>
    );
}
