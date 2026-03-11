
import { getStudentById, getAttendanceSummaryForStudent, getInvoicesForStudent } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarCheck, FileText, MessageSquare, ShoppingCart, Wallet, CheckCircle, BookOpen, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ParentPortalClient from "./client";

// Hardcoded for demonstration. In a real app, this would come from the parent's session.
const STUDENT_ID = "S001";

const announcements = [
    { id: 1, title: "Annual Sports Day", date: "2024-08-15", content: "The annual sports day will be held on August 15th." },
    { id: 2, title: "Parent-Teacher Meeting", date: "2024-08-10", content: "A parent-teacher meeting is scheduled for August 10th." },
];

export default async function ParentPortalPage() {
    const [student, attendance, invoices] = await Promise.all([
        getStudentById(STUDENT_ID),
        getAttendanceSummaryForStudent(STUDENT_ID),
        getInvoicesForStudent(STUDENT_ID),
    ]);

    if (!student) {
        notFound();
    }

    const unpaidInvoices = invoices.filter(inv => inv.status !== "Paid");
    const attendancePercentage = attendance
        ? (attendance.presentDays / attendance.totalDays) * 100
        : 0;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-headline tracking-tight">Parent Dashboard</h1>
                <p className="text-muted-foreground">Welcome back. Monitoring student excellence.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <Card className="glass-card overflow-hidden">
                        <div className="h-2 emerald-gradient" />
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6">
                            <div className="relative">
                                <Avatar className="h-20 w-20 ring-2 ring-emerald-500/20 ring-offset-2">
                                    <AvatarImage src={student.avatarUrl ?? undefined} alt={student.name} data-ai-hint="female student avatar" />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-2xl">{student.name}</CardTitle>
                                <CardDescription className="font-medium text-emerald-600">{student.className}</CardDescription>
                                <p className="text-sm text-muted-foreground">Student ID: {student.studentId}</p>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                                <CalendarCheck className="h-5 w-5 text-emerald-600" />
                                Attendance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {attendance ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                                        <p className="font-medium text-emerald-900 dark:text-emerald-100">Term Consistency</p>
                                        <p className="text-3xl font-black font-headline text-emerald-600">{attendancePercentage.toFixed(0)}%</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-muted/50 p-2 rounded-lg">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Present</p>
                                            <p className="text-xl font-bold text-emerald-600">{attendance.presentDays}</p>
                                        </div>
                                        <div className="bg-muted/50 p-2 rounded-lg">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Absent</p>
                                            <p className="text-xl font-bold text-rose-600">{attendance.absentDays}</p>
                                        </div>
                                        <div className="bg-muted/50 p-2 rounded-lg">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Leave</p>
                                            <p className="text-xl font-bold text-amber-600">{attendance.leaveDays}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center italic">Awaiting attendance logs...</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-emerald-600" />
                                Academic Fees
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {unpaidInvoices.length > 0 ? (
                                <div className="space-y-4">
                                    {unpaidInvoices.map(invoice => (
                                        <div key={invoice.invoiceId} className="flex justify-between items-center bg-muted/30 p-3 rounded-lg border border-border/50 transition-all hover:bg-muted/50">
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{invoice.invoiceId}</p>
                                                <p className="text-lg font-black font-mono text-foreground">${invoice.amount.toFixed(2)}</p>
                                                <p className="text-[10px] text-muted-foreground font-medium">Due: {invoice.dueDate}</p>
                                            </div>
                                            <Badge className={invoice.status === "Overdue" ? "bg-rose-500 hover:bg-rose-600" : "bg-emerald-500 hover:bg-emerald-600"}>{invoice.status}</Badge>
                                        </div>
                                    ))}
                                    <ParentPortalClient
                                        unpaidInvoices={unpaidInvoices.map(inv => ({ id: inv.invoiceId, description: inv.description || "School Fee", amount: inv.amount }))}
                                        studentName={student.name}
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-4 text-emerald-600 flex flex-col items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6" />
                                    </div>
                                    <p className="font-bold tracking-tight">Financial Status: Clear</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ActionCard href={`/students/${student.studentId}/report-card`} icon={FileText} label="Transcripts & Results" description="Official academic records" />
                        <ActionCard href="/lms/courses" icon={BookOpen} label="Learning LMS" description="Materials & activities" />
                        <ActionCard href="/academics/examinations" icon={CalendarCheck} label="Continuous Assessment" description="Live performance tracking" />
                        <ActionCard href="/parent-portal/store" icon={ShoppingCart} label="Merchandise Store" description="Uniforms & stationery" />
                        <ActionCard href="#" icon={MessageSquare} label="Campus Connect" description="Message faculty & staff" />
                        <ActionCard href="/alumni/directory" icon={HeartHandshake} label="Alumni Network" description="Connect with graduates" />
                    </div>

                    <Card className="glass-card shadow-2xl">
                        <CardHeader className="border-b border-border/50 pb-4">
                            <CardTitle className="font-headline text-xl text-emerald-900 dark:text-emerald-100">Live Campus Feed</CardTitle>
                            <CardDescription>Real-time updates, events, and strategic announcements.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {announcements.map((ann, index) => (
                                <div key={ann.id} className="p-6 transition-colors hover:bg-muted/30 group">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <h3 className="font-bold text-lg group-hover:text-emerald-600 transition-colors">{ann.title}</h3>
                                        <Badge variant="outline" className="font-mono text-[10px]">{ann.date}</Badge>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{ann.content}</p>
                                    {index < announcements.length - 1 && <Separator className="mt-6 opacity-50" />}
                                </div>
                            ))}
                            <div className="p-6 bg-muted/10 border-t border-border/50">
                                <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 group">
                                    Archive View <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function ActionCard({ href, icon: Icon, label, description }: { href: string; icon: React.ElementType; label: string; description?: string; }) {
    return (
        <Link href={href}>
            <div className="relative group overflow-hidden p-6 glass-card hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col gap-3">
                <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                    <Icon className="h-16 w-16" />
                </div>
                <div className="p-3 w-fit bg-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                    <p className="font-bold text-foreground group-hover:text-emerald-600 transition-colors uppercase tracking-tight text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{description}</p>
                </div>
            </div>
        </Link>
    );
}
