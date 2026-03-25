import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Users, PlusCircle, Star } from "lucide-react"
import Link from "next/link"
import { getClubDetailsAction } from "@/lib/flow-actions"
import { notFound } from "next/navigation"
import * as React from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddMemberDialog } from "./add-member-dialog"
import { RecordAttendanceDialog } from "./record-attendance-dialog"

export default async function ClubDetailsPage({ params }: { params: Promise<{ clubId: string }> }) {
    const clubId = (await params).clubId;
    const club = await getClubDetailsAction(clubId);
    
    if (!club) {
        notFound();
    }

    const advisor = (club as any).advisor;
    const members = (club as any).memberships.map((m: any) => m.student);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" asChild className="rounded-xl border-slate-200 shadow-sm">
                        <Link href="/extracurriculars/clubs"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black font-headline tracking-tighter text-slate-900 uppercase italic">{club.name}</h1>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">{club.category || "General"} · EST. 2024</p>
                    </div>
                </div>
                 <AddMemberDialog clubId={club.clubId} clubName={club.name} />
            </div>
            
            <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                <CardHeader className="p-0">
                    <div className="relative aspect-[21/9] w-full">
                        <Image 
                            src={club.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"} 
                            alt={club.name} 
                            fill
                            className="object-cover"
                            data-ai-hint={club.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-8 flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm font-black text-white">4.8 Rating</span>
                            </div>
                            <Badge className="bg-white/20 backdrop-blur-md text-white border-none font-black text-[10px] uppercase tracking-widest px-3">
                                {club.memberCount} Active Members
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-4">
                             <h2 className="text-xl font-black font-headline uppercase tracking-tight text-slate-900 italic">Vision & Mission</h2>
                             <p className="text-slate-600 leading-relaxed font-medium">{club.description}</p>
                        </div>
                        <div className="space-y-4">
                             <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Faculty Advisor</h3>
                             <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                                <Avatar className="h-14 w-14 ring-4 ring-white shadow-md">
                                    <AvatarImage src={advisor?.avatarUrl} alt={advisor?.name} />
                                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-black">{advisor?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-black text-slate-900 italic">{advisor?.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{advisor?.designation || "Staff Advisor"}</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                 <CardHeader className="p-8 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="font-black text-2xl uppercase tracking-tighter text-slate-900 italic flex items-center gap-3">
                                <Users className="h-6 w-6 text-emerald-500" />
                                Member Roster
                            </CardTitle>
                            <CardDescription className="text-xs font-medium mt-1">Founding members and active participants of {club.name}.</CardDescription>
                        </div>
                        <RecordAttendanceDialog clubId={club.clubId} clubName={club.name} members={members} />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-50 bg-slate-50/50">
                                <TableHead className="px-8 h-12 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Name</TableHead>
                                <TableHead className="h-12 text-[10px] font-black uppercase tracking-widest text-slate-400">Class</TableHead>
                                <TableHead className="h-12 text-[10px] font-black uppercase tracking-widest text-slate-400">Academic Status</TableHead>
                                <TableHead className="px-8 h-12 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member: any) => (
                                <TableRow key={member.studentId} className="hover:bg-slate-50/50 border-slate-50 transition-colors group">
                                    <TableCell className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={member.avatarUrl} />
                                                <AvatarFallback className="text-[10px] font-bold">{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-black text-sm text-slate-900 group-hover:text-emerald-600 transition-colors italic">{member.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge variant="outline" className="rounded-lg border-slate-200 font-bold text-[10px] lowercase">
                                            {member.className || member.class || "N/A"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{member.status || "Active"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-emerald-600">
                                            <Users className="h-3.5 w-3.5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                             {members.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-32 text-center text-slate-400 italic font-medium">No members found in the roster.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
