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
    Calendar as CalendarIcon,
    Clock,
    User,
    MessageSquare,
    Trophy,
    CheckCircle,
    XCircle,
    MoreHorizontal
} from "lucide-react";
import { format } from "date-fns";

export function InterviewClient({ initialInterviews }: { initialInterviews: any[] }) {
    const [interviews, setInterviews] = useState(initialInterviews);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Completed": return <Badge className="bg-emerald-500 font-bold uppercase tracking-widest text-[10px]">Completed</Badge>;
            case "Cancelled": return <Badge variant="destructive" className="font-bold uppercase tracking-widest text-[10px]">Cancelled</Badge>;
            case "Scheduled": return <Badge variant="secondary" className="font-bold uppercase tracking-widest text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">Scheduled</Badge>;
            default: return <Badge variant="outline" className="font-bold uppercase tracking-widest text-[10px]">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card p-6 border-border/20 shadow-xl bg-blue-500/5 group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Total Interviews</p>
                    <p className="text-3xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-all origin-left">{interviews.length}</p>
                </Card>
                <Card className="glass-card p-6 border-border/20 shadow-xl bg-amber-500/5 group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Scheduled Today</p>
                    <p className="text-3xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-all origin-left">4</p>
                </Card>
                <Card className="glass-card p-6 border-border/20 shadow-xl bg-emerald-500/5 group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Average Performance</p>
                    <p className="text-3xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-all origin-left">7.8/10</p>
                </Card>
                <Card className="glass-card p-6 border-border/20 shadow-xl bg-purple-500/5 group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">Conversion Rate</p>
                    <p className="text-3xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-all origin-left">62%</p>
                </Card>
            </div>

            <Card className="glass-card overflow-hidden border-border/20 shadow-2xl">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="border-border/10">
                            <TableHead className="font-bold uppercase tracking-widest text-[10px] py-6 pl-8">DATE & TIME</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">CANDIDATE</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">INTERVIEWER</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">EVALUATION SCORE</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">STATUS</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px] text-right pr-8">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {interviews.map((interview) => (
                            <TableRow key={interview.id} className="border-border/5 hover:bg-emerald-500/[0.02] transition-colors">
                                <TableCell className="py-6 pl-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                                            <CalendarIcon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{format(new Date(interview.date), "PPP")}</p>
                                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono"><Clock className="h-2.5 w-2.5" /> {format(new Date(interview.date), "HH:mm")}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-black text-[10px] uppercase">
                                            {interview.application?.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{interview.application?.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-50">{interview.application?.className}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm font-medium">{interview.interviewerId}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Trophy className="h-4 w-4 text-amber-500" />
                                        <p className="text-sm font-black">{interview.score ? `${interview.score}/10` : "PENDING"}</p>
                                    </div>
                                    {interview.comments && (
                                        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1 italic max-w-[150px]">"{interview.comments}"</p>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(interview.status)}
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <Button variant="ghost" className="h-10 px-4 gap-2 hover:bg-emerald-500/10 hover:text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-widest">
                                        <MessageSquare className="h-4 w-4" /> Evaluate
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {interviews.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-bold text-xl tracking-tighter">No interviews scheduled</p>
                        <p className="text-sm">Initiate the evaluation protocol by scheduling interactions with new candidates.</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
