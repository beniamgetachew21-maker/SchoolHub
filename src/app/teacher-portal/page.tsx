
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Book, CalendarCheck, Users, Calendar as CalendarIcon, ClipboardList, PenTool, MessageSquare, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAnnouncements, getAssignedClassesForTeacher } from "@/lib/actions";

// In a real app, this would be fetched based on the logged-in teacher
const TEACHER_ID = "E002";

export default async function TeacherPortalPage() {
    const assignedClasses = await getAssignedClassesForTeacher(TEACHER_ID);
    const announcements = (await getAnnouncements()).slice(0, 3);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-headline tracking-tighter">Faculty Command Center</h1>
                <p className="text-muted-foreground">Orchestrating academic excellence and student growth.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <Card className="glass-card border-l-4 border-l-emerald-500">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-emerald-600" />
                                Assigned Classes
                            </CardTitle>
                            <CardDescription>Academic responsibilities for the current term.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {assignedClasses.map(c => (
                                <div key={c.id} className="p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-all group">
                                    <p className="font-black text-foreground group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{c.name}</p>
                                    <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1">
                                        <Badge variant="outline" className="font-bold">{c.subject}</Badge>
                                        <div className="flex items-center gap-1 font-mono uppercase">
                                            <Users className="h-3 w-3" />
                                            <span>{c.studentCount} Enrollments</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {assignedClasses.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground italic">
                                    No active classroom assignments.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <ActionCard href="/academics/attendance" icon={CalendarCheck} label="Register" description="Daily attendance" />
                        <ActionCard href="/academics/examinations" icon={PenTool} label="Grading" description="Enter marks" />
                        <ActionCard href="/teacher-portal/timetable" icon={CalendarIcon} label="Schedule" description="My timetable" />
                        <ActionCard href="#" icon={MessageSquare} label="Connect" description="Parent comms" />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <Card className="glass-card shadow-xl overflow-hidden">
                        <div className="h-2 emerald-gradient" />
                        <CardHeader className="border-b border-border/30">
                            <CardTitle className="font-headline text-xl text-emerald-900 dark:text-emerald-100">Institutional Briefing</CardTitle>
                            <CardDescription>Latest directives and operational updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {announcements.map((ann, index) => (
                                <div key={ann.id} className="p-6 transition-colors hover:bg-muted/30 group">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <h3 className="font-bold text-lg group-hover:text-emerald-600 transition-colors">{ann.title}</h3>
                                        <Badge variant="secondary" className="font-mono text-[10px]">{ann.date}</Badge>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{ann.content}</p>
                                    {index < announcements.length - 1 && <Separator className="mt-6 opacity-30" />}
                                </div>
                            ))}
                            <div className="p-6 bg-muted/10 border-t border-border/30">
                                <Button variant="link" className="w-full text-emerald-600 hover:text-emerald-700 group">
                                    Institutional Archive <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                    <p className="font-bold text-foreground group-hover:text-emerald-600 transition-colors uppercase tracking-tight text-[10px]">{label}</p>
                    <p className="text-[10px] text-muted-foreground line-clamp-1 mt-1">{description}</p>
                </div>
            </div>
        </Link>
    );
}
