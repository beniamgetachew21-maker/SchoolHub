
"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Briefcase, Mail, Linkedin, GraduationCap, Calendar } from "lucide-react"
import Link from "next/link"
import { getAlumnusById, updateAlumnus, type Alumni } from "@/app/lib/data"
import { notFound } from "next/navigation"
import * as React from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { EditAlumnusForm } from "@/components/forms/edit-alumnus-form"

export default function AlumnusProfilePage({ params }: { params: Promise<{ alumniId: string }> }) {
    const { alumniId } = React.use(params);
    const [alumnus, setAlumnus] = React.useState(getAlumnusById(alumniId));
    const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);

    const refreshData = () => {
        setAlumnus(getAlumnusById(alumniId));
    };

    if (!alumnus) {
        notFound();
    }

    const handleEditAlumnus = (updatedAlumnus: Alumni) => {
        updateAlumnus(updatedAlumnus);
        refreshData();
        setIsEditSheetOpen(false);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/alumni/directory"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold font-headline">{alumnus.name}</h1>
                        <p className="text-muted-foreground">Alumni Profile</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
                        <SheetTrigger asChild>
                            <Button><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit Alumnus</SheetTitle>
                                <SheetDescription>Update the details for this alumnus.</SheetDescription>
                            </SheetHeader>
                            <EditAlumnusForm alumnus={alumnus} onFormSubmit={handleEditAlumnus} />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <Avatar className="h-32 w-32 mb-4">
                                <AvatarImage src={alumnus.avatarUrl} alt={alumnus.name} />
                                <AvatarFallback>{alumnus.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-semibold">{alumnus.name}</h2>
                            <p className="text-muted-foreground">{alumnus.currentPosition} at {alumnus.currentCompany}</p>
                            <div className="flex items-center gap-2 mt-4">
                                <a href={`mailto:${alumnus.email}`}>
                                    <Button variant="outline" size="icon"><Mail className="h-4 w-4" /></Button>
                                </a>
                                {alumnus.linkedinUrl && (
                                    <a href={alumnus.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="icon"><Linkedin className="h-4 w-4" /></Button>
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Alumnus Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <InfoItem icon={Calendar} label="Graduation Year" value={String(alumnus.graduationYear)} />
                            <InfoItem icon={GraduationCap} label="Major" value={alumnus.major} />
                            <InfoItem icon={Briefcase} label="Current Role" value={`${alumnus.currentPosition} at ${alumnus.currentCompany}`} />
                            <InfoItem icon={Mail} label="Email Address" value={alumnus.email} />
                            {alumnus.linkedinUrl && <InfoItem icon={Linkedin} label="LinkedIn" value={alumnus.linkedinUrl} isLink />}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ icon: Icon, label, value, isLink = false }: { icon: React.ElementType, label: string, value: string, isLink?: boolean }) {
    return (
        <div className="flex items-start">
            <div className="flex items-center w-40 text-muted-foreground">
                <Icon className="h-4 w-4 mr-2" />
                <span className="font-medium">{label}</span>
            </div>
            {isLink ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline break-all">{value}</a>
            ) : (
                <p className="font-medium text-foreground">{value}</p>
            )}
        </div>
    )
}
