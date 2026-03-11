"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    FileText,
    Trophy,
    CheckCircle,
    XCircle,
    BookOpen,
    User,
    ArrowUpRight,
    Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export function ExamClient({ initialExams }: { initialExams: any[] }) {
    const [exams, setExams] = useState(initialExams);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExams = exams.filter(exam =>
        exam.application?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Passed": return <Badge className="bg-emerald-500 font-bold uppercase tracking-widest text-[10px]">Passed</Badge>;
            case "Failed": return <Badge variant="destructive" className="font-bold uppercase tracking-widest text-[10px]">Failed</Badge>;
            case "Pending": return <Badge variant="secondary" className="font-bold uppercase tracking-widest text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">Pending</Badge>;
            default: return <Badge variant="outline" className="font-bold uppercase tracking-widest text-[10px]">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                    <Input
                        placeholder="Search exam results by candidate or subject..."
                        className="pl-10 h-12 bg-muted/20 border-border/30 focus:border-emerald-500/50 transition-all rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Card className="glass-card overflow-hidden border-border/20 shadow-2xl">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="border-border/10">
                            <TableHead className="font-bold uppercase tracking-widest text-[10px] py-6 pl-8">ASSESSMENT DATE</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">CANDIDATE</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">SUBJECT / MODULE</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">SCORE (PERCENTILE)</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">STATUS</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px] text-right pr-8">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExams.map((exam) => (
                            <TableRow key={exam.id} className="border-border/5 hover:bg-emerald-500/[0.02] transition-colors">
                                <TableCell className="py-6 pl-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{format(new Date(exam.date), "PPP")}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-black text-[10px] uppercase">
                                            {exam.application?.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{exam.application?.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-50">{exam.application?.className}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-emerald-500/50" />
                                        <p className="text-sm font-black tracking-tighter uppercase">{exam.subject}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Trophy className="h-4 w-4 text-amber-500" />
                                        <p className="text-sm font-black tracking-tighter">
                                            {exam.marksObtained ? `${exam.marksObtained}/${exam.maxMarks}` : "TBD"}
                                            {exam.marksObtained && (
                                                <span className="text-[10px] text-muted-foreground ml-1">
                                                    ({Math.round((exam.marksObtained / exam.maxMarks) * 100)}%)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(exam.status)}
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <Button variant="ghost" className="h-10 px-4 gap-2 hover:bg-emerald-500/10 hover:text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-widest group">
                                        Input Marks <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredExams.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-bold text-xl tracking-tighter">No assessment data available</p>
                        <p className="text-sm">Academic evaluations will appear once candidates complete their designated modules.</p>
                    </div>
                )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card p-8 border-border/20 shadow-xl bg-emerald-500/5 flex items-center justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">High Scorer Profile</p>
                        <p className="text-3xl font-black mt-2 tracking-tighter">98.5% Quantitative</p>
                        <p className="text-sm text-muted-foreground mt-1">Jane Doe - Grade 11 Application</p>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4 group-hover:scale-110 transition-transform">
                        <Trophy className="h-32 w-32 text-emerald-600" />
                    </div>
                </Card>
                <Card className="glass-card p-8 border-border/20 shadow-xl bg-muted/20 flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">Batch Assessment Distribution</p>
                    <div className="flex gap-2 h-12 items-end">
                        {[40, 65, 80, 55, 90, 70, 45, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm hover:bg-emerald-500 transition-all cursor-pointer" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
