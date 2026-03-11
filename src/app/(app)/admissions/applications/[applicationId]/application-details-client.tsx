"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
    Calendar, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    GraduationCap, 
    ArrowLeft, 
    CheckCircle, 
    XCircle,
    FileText,
    Clock,
    Activity
} from "lucide-react";
import Link from "next/link";
import { updateApplicationStatusAction } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApplicationDetailsClient({ application: initialApplication }: { application: any }) {
    const [application, setApplication] = useState(initialApplication);
    const [isUpdating, setIsUpdating] = useState(false);

    async function handleStatusUpdate(status: string) {
        setIsUpdating(true);
        try {
            await updateApplicationStatusAction(application.id, status);
            setApplication({ ...application, status });
            toast({
                title: "Status Updated",
                description: `Application is now ${status}.`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update status.",
                variant: "destructive"
            });
        } finally {
            setIsUpdating(false);
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
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-emerald-500/10">
                        <Link href="/admissions/applications"><ArrowLeft className="h-5 w-5 text-emerald-600" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black font-headline tracking-tighter text-emerald-900 border-b-4 border-emerald-500 w-fit">
                            CASE FILE: {application.name}
                        </h1>
                        <p className="text-muted-foreground mt-1 font-mono text-xs uppercase tracking-widest">
                            Ref ID: {application.id} • Submitted {new Date(application.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {getStatusBadge(application.status)}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 gap-8">
                            <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent font-bold uppercase tracking-widest text-xs">Profile</TabsTrigger>
                            <TabsTrigger value="documents" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent font-bold uppercase tracking-widest text-xs">Documents</TabsTrigger>
                            <TabsTrigger value="evaluation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent font-bold uppercase tracking-widest text-xs">Evaluation</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2">
                            <section>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
                                    <User className="h-4 w-4" /> Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InfoField label="Full Name" value={application.name} icon={User} />
                                    <InfoField label="Date of Birth" value={new Date(application.dob).toLocaleDateString()} icon={Calendar} />
                                    <InfoField label="Gender" value={application.gender} icon={Activity} />
                                    <InfoField label="Email Address" value={application.email} icon={Mail} />
                                    <InfoField label="Phone Number" value={application.phone} icon={Phone} />
                                    <InfoField label="Residential Address" value={application.address} icon={MapPin} />
                                </div>
                            </section>

                            <Separator />

                            <section>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4" /> Academic Targeting
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InfoField label="Applying For" value={application.className} icon={GraduationCap} />
                                    <InfoField label="Institutional Type" value={application.isRefugee ? "Special Support (Refugee)" : "Regular Admission"} icon={Activity} />
                                </div>
                            </section>

                            <Separator />

                            <section>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
                                    <User className="h-4 w-4" /> Guardian Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InfoField label="Primary Guardian" value={application.parent} icon={User} />
                                    <InfoField label="Guardian Phone" value={application.parentPhone} icon={Phone} />
                                </div>
                            </section>
                        </TabsContent>

                        <TabsContent value="documents" className="mt-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DocumentCard 
                                    title="Birth Certificate" 
                                    status={application.birthCertificate} 
                                    url={application.birthCertificateUrl} 
                                />
                                <DocumentCard 
                                    title="Previous Marksheet" 
                                    status={application.previousMarksheet ? "Provided" : "Missing"} 
                                    url={application.previousMarksheet} 
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="evaluation" className="mt-8 space-y-6">
                            <Card className="border-emerald-100 bg-emerald-50/20">
                                <CardHeader>
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-800">Interviews & Exams</CardTitle>
                                    <CardDescription>Scheduled evaluations for this candidate.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {application.interviews?.length > 0 ? (
                                            application.interviews.map((interview: any) => (
                                                <div key={interview.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                                            <Calendar className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm">Interview: {new Date(interview.date).toLocaleDateString()}</p>
                                                            <p className="text-xs text-muted-foreground">Status: {interview.status}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline">{interview.score ? `Score: ${interview.score}` : "Evaluating"}</Badge>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-muted-foreground italic">No interviews scheduled yet.</p>
                                        )}
                                        <Button className="w-full emerald-gradient text-white font-bold h-12 rounded-xl mt-4">
                                            Schedule Evaluation
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <Card className="glass-card border-emerald-500/20 shadow-2xl p-6 bg-emerald-500/[0.02]">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Decision Matrix
                        </h3>
                        <div className="space-y-3">
                            <Button 
                                onClick={() => handleStatusUpdate("Approved")} 
                                disabled={isUpdating || application.status === "Approved"}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl gap-2 shadow-lg shadow-emerald-500/20"
                            >
                                <CheckCircle className="h-5 w-5" /> Approve Enrollment
                            </Button>
                            <Button 
                                onClick={() => handleStatusUpdate("Rejected")} 
                                disabled={isUpdating || application.status === "Rejected"}
                                variant="outline" 
                                className="w-full text-red-600 border-red-200 hover:bg-red-50 font-bold h-12 rounded-xl gap-2"
                            >
                                <XCircle className="h-5 w-5" /> Decline Application
                            </Button>
                            <Separator className="my-4" />
                            <p className="text-[10px] text-muted-foreground italic text-center px-4 leading-relaxed">
                                Updating application status will immediately trigger notification protocols and update institutional registries.
                            </p>
                        </div>
                    </Card>

                    <Card className="glass-card border-border/20 shadow-xl p-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Audit History
                        </h3>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500/20 before:to-transparent">
                            <AuditItem date={new Date(application.date).toLocaleDateString()} label="Application Received" status="System Automated" />
                            <AuditItem date="--/--/--" label="Document Review" status="Pending Coordinator" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function InfoField({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="space-y-2 group">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-emerald-500 transition-colors">{label}</p>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:text-emerald-600 group-hover:bg-emerald-500/10 transition-all">
                    <Icon className="h-4 w-4" />
                </div>
                <p className="font-bold tracking-tight text-emerald-950">{value || "N/A"}</p>
            </div>
        </div>
    );
}

function DocumentCard({ title, status, url }: { title: string, status: string, url?: string | null }) {
    return (
        <Card className="border-border/30 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all group overflow-hidden">
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted/20 flex items-center justify-center text-muted-foreground group-hover:bg-emerald-500/10 group-hover:text-emerald-600 transition-all">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-bold text-sm tracking-tight">{title}</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{status}</p>
                    </div>
                </div>
                {url && (
                    <Button variant="ghost" size="sm" asChild className="text-emerald-600 font-bold hover:bg-emerald-50">
                        <Link href={url} target="_blank">View File</Link>
                    </Button>
                )}
            </div>
        </Card>
    );
}

function AuditItem({ date, label, status }: { date: string, label: string, status: string }) {
    return (
        <div className="relative pl-8">
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-emerald-500/20 border-4 border-white shadow-sm" />
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{date}</p>
            <p className="text-sm font-bold mt-1 tracking-tight">{label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{status}</p>
        </div>
    );
}
