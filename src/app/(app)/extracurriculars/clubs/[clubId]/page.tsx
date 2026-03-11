
"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, User, Users, Mail, Phone, Edit, PlusCircle } from "lucide-react"
import Link from "next/link"
import { getClubById, getClubMembers, getEmployeeById, getStudentById, type Club, type Student } from "@/app/lib/data"
import { notFound, useParams } from "next/navigation"
import * as React from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ClubDetailsPage() {
    const params = useParams();
    const clubId = params.clubId as string;

    const club = getClubById(clubId);
    
    if (!club) {
        notFound();
    }

    const facultyAdvisor = getEmployeeById(club.facultyAdvisorId);
    const members = getClubMembers(club.clubId);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" asChild>
                        <Link href="/extracurriculars/clubs"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold font-headline">{club.name}</h1>
                        <p className="text-muted-foreground">Club Details</p>
                    </div>
                </div>
                 <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Member</Button>
            </div>
            
            <Card>
                <CardHeader className="p-0">
                    <div className="relative aspect-h-3 aspect-w-8 w-full">
                        <Image 
                            src={club.imageUrl} 
                            alt={club.name} 
                            layout="fill" 
                            objectFit="cover" 
                            className="rounded-t-lg"
                            data-ai-hint={club.imageHint}
                        />
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                             <h2 className="text-xl font-semibold font-headline">About the Club</h2>
                             <p className="mt-2 text-muted-foreground">{club.description}</p>
                        </div>
                        <div>
                             <h3 className="font-semibold mb-2">Faculty Advisor</h3>
                             <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={facultyAdvisor?.avatarUrl} alt={facultyAdvisor?.name} />
                                    <AvatarFallback>{facultyAdvisor?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{facultyAdvisor?.name}</p>
                                    <p className="text-sm text-muted-foreground">{facultyAdvisor?.designation}</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Members ({members.length})
                    </CardTitle>
                    <CardDescription>List of all students who are part of this club.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Contact Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map(member => (
                                <TableRow key={member.studentId}>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{member.class}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                </TableRow>
                            ))}
                             {members.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">This club has no members yet.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
