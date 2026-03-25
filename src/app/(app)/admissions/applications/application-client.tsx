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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Search,
    MoreHorizontal,
    Eye,
    CheckCircle,
    XCircle,
    Calendar,
    User,
    Mail,
    Phone,
    MapPin,
    GraduationCap
} from "lucide-react";
import Link from "next/link";
import { updateApplicationStatusAction } from "@/lib/actions";
import { enrollApprovedApplicantAction } from "@/lib/flow-actions";
import { toast } from "@/hooks/use-toast";

export function ApplicationClient({ initialApplications }: { initialApplications: any[] }) {
    const [applications, setApplications] = useState(initialApplications);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredApplications = applications.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleStatusUpdate(id: string, status: string) {
        try {
            if (status === "Approved") {
                const res = await enrollApprovedApplicantAction(id);
                if (!res.success) throw new Error(res.error || "Enrollment failed");
                toast({
                    title: "Student Enrolled",
                    description: `Application ${id} approved. Student profile, guardian, and initial invoice generated.`,
                });
            } else {
                await updateApplicationStatusAction(id, status);
                toast({
                    title: "Status Updated",
                    description: `Application ${id} is now ${status}.`,
                });
            }

            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status: status === "Approved" ? "Enrolled" : status } : app
            ));
        } catch (error: any) {
            toast({
                title: "Action Failed",
                description: error.message || "Failed to update status.",
                variant: "destructive"
            });
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Approved": return <Badge className="bg-emerald-500 hover:bg-emerald-600 font-bold uppercase tracking-widest text-[10px]">Approved</Badge>;
            case "Rejected": return <Badge variant="destructive" className="font-bold uppercase tracking-widest text-[10px]">Rejected</Badge>;
            case "Pending": return <Badge variant="secondary" className="font-bold uppercase tracking-widest text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">Pending</Badge>;
            default: return <Badge variant="outline" className="font-bold uppercase tracking-widest text-[10px]">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                    <Input
                        placeholder="Search applications by name or ID..."
                        className="pl-10 h-12 bg-muted/20 border-border/30 focus:border-emerald-500/50 transition-all rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-12 border-border/30 rounded-xl">Export CSV</Button>
                    <Button className="h-12 emerald-gradient text-white font-bold rounded-xl px-6">New Filter</Button>
                </div>
            </div>

            <Card className="glass-card overflow-hidden border-border/20 shadow-2xl">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="border-border/10">
                            <TableHead className="font-bold uppercase tracking-widest text-[10px] py-6 pl-8">ID / DATE</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">CANDIDATE</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">ACADEMIC TIER</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">GUARDIAN</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px]">STATUS</TableHead>
                            <TableHead className="font-bold uppercase tracking-widest text-[10px] text-right pr-8">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredApplications.map((app) => (
                            <TableRow key={app.id} className="border-border/5 hover:bg-emerald-500/[0.02] transition-colors group">
                                <TableCell className="py-6 pl-8">
                                    <p className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{app.id}</p>
                                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(app.date).toLocaleDateString()} {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-black text-xs uppercase">
                                            {app.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{app.name}</p>
                                            <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Mail className="h-2.5 w-2.5" /> {app.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4 text-emerald-500/50" />
                                        <p className="text-sm font-medium">{app.className}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="text-sm font-medium">{app.parent}</p>
                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Phone className="h-2.5 w-2.5" /> {app.parentPhone}</p>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(app.status)}
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-emerald-500/10 hover:text-emerald-600">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 glass-card border-border/30 rounded-xl shadow-2xl p-2">
                                            <DropdownMenuLabel className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground px-2 py-1.5">Decision Matrix</DropdownMenuLabel>
                                            <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-lg font-medium py-3 px-3 hover:bg-emerald-500/10 hover:text-emerald-600">
                                                <Link href={`/admissions/applications/${app.id}`}>
                                                    <Eye className="h-4 w-4" /> View Full Case File
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-border/10 my-1" />
                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(app.id, "Approved")}
                                                className="cursor-pointer gap-2 rounded-lg font-medium py-3 px-3 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
                                            >
                                                <CheckCircle className="h-4 w-4" /> Approve Enrollment
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(app.id, "Rejected")}
                                                className="cursor-pointer gap-2 rounded-lg font-medium py-3 px-3 text-red-600 hover:bg-red-500/10"
                                            >
                                                <XCircle className="h-4 w-4" /> Decline Application
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-border/10 my-1" />
                                            <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg font-medium py-3 px-3">
                                                <Calendar className="h-4 w-4" /> Schedule Interview
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredApplications.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <Search className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-bold text-xl tracking-tighter">No matching candidates found</p>
                        <p className="text-sm">Adjust your search parameters to find the candidate of choice.</p>
                    </div>
                )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card p-6 border-border/20 shadow-xl bg-emerald-500/5 group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Yield Progress</p>
                    <p className="text-3xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-all origin-left">84%</p>
                    <div className="h-1.5 w-full bg-muted mt-4 rounded-full overflow-hidden">
                        <div className="h-full emerald-gradient w-[84%]" />
                    </div>
                </Card>
                <Card className="glass-card p-6 border-border/20 shadow-xl group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Pending Review</p>
                    <p className="text-3xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-all origin-left">12</p>
                    <p className="text-[10px] text-muted-foreground mt-2 italic">Requires immediate institutional directive.</p>
                </Card>
                <Card className="glass-card p-6 border-border/20 shadow-xl group underline-offset-4 decoration-emerald-500 hover:decoration-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Average Score</p>
                    <p className="text-3xl font-black mt-2 tracking-tighter group-hover:scale-105 transition-all origin-left">82.4</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-2 font-bold">+5.2% from previous cycle</p>
                </Card>
            </div>
        </div>
    );
}
