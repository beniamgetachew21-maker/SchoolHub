
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, FileText, Calendar, User, Phone, Mail, MapPin, Briefcase, DollarSign, CheckCircle, XCircle, Clock, BookHeart, HeartPulse, Bed, Bus, Award, GraduationCap, Library, Building, Shield, CalendarCheck, Globe, Star, Flag } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getBookById, getBorrowRecordsForStudent, getResultsForStudent, getStudentById, getInvoices, getAttendanceSummaryForStudent, getRoomForStudent, getHostelById, getRouteForStudent, getVehicleById, getDriverById, getAchievements } from "@/lib/actions"
import { notFound } from "next/navigation"
import * as React from "react"
import { ProfileActions } from "./profile-actions"

export default async function StudentProfilePage({ params }: { params: Promise<{ studentId: string }> }) {
    const { studentId } = await params;
    const student = await getStudentById(studentId);

    if (!student) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="hover:bg-emerald-50 text-emerald-600">
                        <Link href="/students"><ArrowLeft className="h-5 w-5" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold font-headline tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {student.name}
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Shield className="h-3 w-3" /> Student ID: {student.studentId}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700" asChild>
                        <Link href={`/students/${student.studentId}/report-card`}>
                            <FileText className="mr-2 h-4 w-4" /> View Report Card
                        </Link>
                    </Button>
                    <ProfileActions student={student as any} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Info - Glass Card */}
                <Card className="lg:col-span-1 border-white/20 bg-white/40 backdrop-blur-xl shadow-xl overflow-hidden h-fit sticky top-6">
                    <div className="h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 relative">
                        <div className="absolute inset-0 bg-grid-white/10" />
                    </div>
                    <CardContent className="pt-0 relative">
                        <div className="flex flex-col items-center -mt-12 text-center">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105">
                                    <AvatarImage src={student.avatarUrl} alt={student.name} />
                                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl font-bold">{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full shadow-lg" title="Active Status" />
                            </div>

                            <div className="mt-4">
                                <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{student.className}</p>
                                <Badge className={`mt-3 px-4 py-1 rounded-full ${student.status === 'Active' ? 'bg-emerald-100/80 text-emerald-700 border-emerald-200' : 'bg-red-100/80 text-red-700 border-red-200'}`} variant="outline">
                                    {student.status}
                                </Badge>
                            </div>

                            <div className="w-full mt-8 space-y-4 text-left">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Building className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Admission No</p>
                                        <p className="font-semibold text-slate-700">{student.admissionNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Enrollment Date</p>
                                        <p className="font-semibold text-slate-700">{student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Email Address</p>
                                        <p className="font-semibold text-slate-700 truncate w-40">{student.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="w-full bg-emerald-50/50 p-1 border border-emerald-100/50 rounded-xl mb-6">
                            <TabsTrigger value="profile" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700">Personal</TabsTrigger>
                            <TabsTrigger value="academics" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700">Academics</TabsTrigger>
                            <TabsTrigger value="enrollment" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700">Enrollment</TabsTrigger>
                            <TabsTrigger value="billing" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700">Billing</TabsTrigger>
                            <TabsTrigger value="services" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-700">Services</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="m-0 space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-emerald-100/50 shadow-sm">
                                    <CardHeader className="pb-3 border-b border-slate-50">
                                        <CardTitle className="font-headline text-lg text-emerald-800 flex items-center gap-2">
                                            <User className="h-5 w-5" /> Detailed Profile
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <InfoItem icon={Globe} label="Region of Origin" value={student.region || "Addis Ababa"} />
                                        <InfoItem icon={HeartPulse} label="Mother Tongue" value={student.motherTongue || "Amharic"} />
                                        {student.dob && <InfoItem icon={Calendar} label="Date of Birth" value={new Date(student.dob).toLocaleDateString()} />}
                                        {student.gender && <InfoItem icon={User} label="Gender" value={student.gender} />}
                                        <Separator className="my-2 bg-slate-100" />
                                        <InfoItem icon={Shield} label="Education Mode" value="Full-Time" />
                                        <InfoItem icon={Flag} label="Institutional Status" value={student.isRefugee ? "Special Support Required" : "Regular"} />
                                    </CardContent>
                                </Card>

                                <Card className="border-emerald-100/50 shadow-sm">
                                    <CardHeader className="pb-3 border-b border-slate-50">
                                        <CardTitle className="font-headline text-lg text-emerald-800 flex items-center gap-2">
                                            <Phone className="h-5 w-5" /> Guardian & Emergency
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <InfoItem icon={User} label="Primary Guardian" value={student.parent} />
                                        <InfoItem icon={Mail} label="Contact Email" value={student.email} />
                                        {student.address && <InfoItem icon={MapPin} label="Home Address" value={student.address} />}
                                        <Separator className="my-4 bg-slate-100" />
                                        <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                                            <p className="text-xs font-bold text-emerald-700 uppercase mb-2">Emergency Hub</p>
                                            <div className="space-y-2">
                                                <InfoItem icon={User} label="Contact Person" value={student.emergencyName || "Parent"} />
                                                <InfoItem icon={Phone} label="Emergency Line" value={student.emergencyPhone || "+251 911 555 123"} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="academics" className="m-0 space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center">
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Current GPA</p>
                                    <p className="text-3xl font-bold text-emerald-600">3.85</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center">
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Rank in Class</p>
                                    <p className="text-3xl font-bold text-slate-800">4th</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center">
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Credits Earned</p>
                                    <p className="text-3xl font-bold text-emerald-600">32 / 32</p>
                                </div>
                            </div>

                            <Card className="border-emerald-100/50 shadow-sm overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5 text-emerald-600" /> Assessment Matrix
                                        </CardTitle>
                                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Term 1 Results</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <ExamsTabContent studentId={student.studentId} />
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-emerald-100/50 shadow-sm">
                                    <CardHeader><CardTitle className="font-headline text-lg flex items-center gap-2 text-emerald-800"><CalendarCheck className="h-5 w-5 text-emerald-600" /> Attendance</CardTitle></CardHeader>
                                    <CardContent><AttendanceTabContent studentId={student.studentId} /></CardContent>
                                </Card>
                                <Card className="border-emerald-100/50 shadow-sm">
                                    <CardHeader><CardTitle className="font-headline text-lg flex items-center gap-2 text-emerald-800"><Award className="h-5 w-5 text-emerald-600" /> Honors & Awards</CardTitle></CardHeader>
                                    <CardContent><AchievementsTabContent studentId={student.studentId} /></CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="enrollment" className="m-0 space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <Card className="border-emerald-100/50 shadow-sm">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-emerald-600" /> Academic Journey
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-50/50">
                                            <TableRow>
                                                <TableHead>Academic Year</TableHead>
                                                <TableHead>Level / Class</TableHead>
                                                <TableHead>Admission Date</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(student as any).enrollments && (student as any).enrollments.length > 0 ? (
                                                (student as any).enrollments.map((enrollment: any) => (
                                                    <TableRow key={enrollment.id} className="hover:bg-emerald-50/30 transition-colors">
                                                        <TableCell className="font-bold text-emerald-700">{enrollment.academicYear}</TableCell>
                                                        <TableCell>{enrollment.className} {enrollment.sectionName ? `- ${enrollment.sectionName}` : ''}</TableCell>
                                                        <TableCell>{new Date(enrollment.startDate).toLocaleDateString()}</TableCell>
                                                        <TableCell>
                                                            <Badge className={
                                                                enrollment.status === 'Active' ? "bg-green-100 text-green-700" :
                                                                    enrollment.status === 'Promoted' ? "bg-blue-100 text-blue-700" :
                                                                        "bg-slate-100 text-slate-700"
                                                            } variant="outline">
                                                                {enrollment.status}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">
                                                        No previous enrollment records found. Initial term active.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="billing" className="m-0 animate-in slide-in-from-right-4 duration-300">
                            <Card className="border-emerald-100/50 shadow-sm overflow-hidden">
                                <CardHeader className="bg-emerald-500 text-white">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                                            <DollarSign className="h-5 w-5" /> Financial Dashboard
                                        </CardTitle>
                                        <p className="text-emerald-50 text-xs font-medium">Billed to: {student.parent}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <FeesTabContent studentId={student.studentId} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="services" className="m-0 space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-emerald-100/50 shadow-sm">
                                    <CardHeader className="pb-3 border-b border-slate-50">
                                        <CardTitle className="font-headline text-lg flex items-center gap-2 text-emerald-800">
                                            <Shield className="h-5 w-5 text-emerald-600" /> Health & Medical
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <InfoItem icon={HeartPulse} label="Blood Type" value={student.bloodGroup || 'O+'} />
                                        <InfoItem icon={Shield} label="Active Allergies" value={student.allergies?.join(', ') || 'None Recorded'} />
                                        <InfoItem icon={Shield} label="Chronic Cond." value={student.conditions?.join(', ') || 'None Recorded'} />
                                    </CardContent>
                                </Card>

                                <Card className="border-emerald-100/50 shadow-sm overflow-hidden">
                                    <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                                        <CardTitle className="font-headline text-lg flex items-center gap-2 text-emerald-800">
                                            <Library className="h-5 w-5 text-emerald-600" /> Resource Access
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <BorrowHistoryTabContent studentId={student.studentId} />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-emerald-100/50 shadow-sm">
                                    <CardHeader className="pb-3 border-b border-slate-50">
                                        <CardTitle className="font-headline text-lg flex items-center gap-2 text-emerald-800">
                                            <Bed className="h-5 w-5 text-emerald-600" /> Accommodation
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <HostelTabContent studentId={student.studentId} />
                                    </CardContent>
                                </Card>
                                <Card className="border-emerald-100/50 shadow-sm">
                                    <CardHeader className="pb-3 border-b border-slate-50">
                                        <CardTitle className="font-headline text-lg flex items-center gap-2 text-emerald-800">
                                            <Bus className="h-5 w-5 text-emerald-600" /> Campus Transport
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <TransportTabContent studentId={student.studentId} />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
    return (
        <div className="flex items-start text-sm">
            <div className="flex items-center w-40 text-muted-foreground">
                <Icon className="h-4 w-4 mr-2" />
                <span className="font-medium">{label}</span>
            </div>
            <p className="font-medium text-foreground">{value}</p>
        </div>
    )
}

async function FeesTabContent({ studentId }: { studentId: string }) {
    const invoices = (await getInvoices()).filter((inv: any) => inv.studentId === studentId);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
            case "Unpaid":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Unpaid</Badge>;
            case "Overdue":
                return <Badge variant="destructive">Overdue</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.length > 0 ? invoices.map((invoice: any) => (
                    <TableRow key={invoice.invoiceId}>
                        <TableCell>{invoice.invoiceId}</TableCell>
                        <TableCell>{invoice.description || "N/A"}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No fee history found for this student.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

async function AttendanceTabContent({ studentId }: { studentId: string }) {
    const summary = await getAttendanceSummaryForStudent(studentId);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Present":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "Absent":
                return <XCircle className="h-5 w-5 text-red-500" />;
            case "Late":
                return <Clock className="h-5 w-5 text-yellow-500" />;
            default:
                return null;
        }
    }

    if (!summary) return <p className="text-center py-8">No attendance records found.</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Total Academic Days</TableCell>
                    <TableCell>{summary.totalDays}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Present Days</TableCell>
                    <TableCell className="text-green-600 font-bold">{summary.presentDays}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Absent Days</TableCell>
                    <TableCell className="text-red-600">{summary.absentDays}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Attendance Rate</TableCell>
                    <TableCell>{((summary.presentDays / summary.totalDays) * 100).toFixed(1)}%</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

async function ExamsTabContent({ studentId }: { studentId: string }) {
    const results = await getResultsForStudent(studentId);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Gr / Rmk</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.length > 0 ? results.map((result: any, index: number) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{result.assessmentName}</span>
                                    {result.isCCA && <Badge variant="secondary" className="w-fit text-[10px] px-1 py-0 bg-purple-50 text-purple-700 border-purple-200">CCA</Badge>}
                                </div>
                            </TableCell>
                            <TableCell>{result.subject}</TableCell>
                            <TableCell>{result.marksObtained} / {result.maxMarks}</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-bold">{result.grade}</span>
                                    <span className="text-[10px] text-muted-foreground">{result.remarks || '-'}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                }) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No exam results found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

async function BorrowHistoryTabContent({ studentId }: { studentId: string }) {
    const records = await getBorrowRecordsForStudent(studentId);

    const getStatusBadge = (record: any) => {
        if (record.returnDate) {
            return <Badge className="bg-blue-100 text-blue-800">Returned</Badge>;
        }
        if (new Date(record.dueDate) < new Date()) {
            return <Badge variant="destructive">Overdue</Badge>;
        }
        return <Badge className="bg-yellow-100 text-yellow-800">Borrowed</Badge>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {records.length > 0 ? records.map(async (record: any) => {
                    const book = await getBookById(record.bookId);
                    return (
                        <TableRow key={record.recordId}>
                            <TableCell className="font-medium">{book?.title || "Unknown Book"}</TableCell>
                            <TableCell>{new Date(record.borrowDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(record.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'N/A'}</TableCell>
                            <TableCell>{getStatusBadge(record)}</TableCell>
                        </TableRow>
                    )
                }) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No borrowing history found for this student.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

async function HostelTabContent({ studentId }: { studentId: string }) {
    const room = await getRoomForStudent(studentId);

    if (!room) {
        return <p className="text-muted-foreground text-center py-8">This student is not allocated to any hostel.</p>;
    }

    const hostel = await getHostelById(room.hostelId);

    return (
        <div className="space-y-4">
            <InfoItem icon={Building} label="Hostel" value={hostel?.name || 'N/A'} />
            <InfoItem icon={Bed} label="Room Number" value={room.roomNumber} />
            <InfoItem icon={Bed} label="Room Type" value={(room as any).roomType || (room as any).type || 'N/A'} />
        </div>
    );
}

async function TransportTabContent({ studentId }: { studentId: string }) {
    const routeInfo = await getRouteForStudent(studentId);

    if (!routeInfo) {
        return <p className="text-muted-foreground text-center py-8">This student is not assigned to any transport route.</p>;
    }

    const vehicle = await getVehicleById(routeInfo.vehicleId);
    const driver = await getDriverById(routeInfo.driverId);

    return (
        <div className="space-y-4">
            <InfoItem icon={MapPin} label="Route Name" value={routeInfo.routeName} />
            <InfoItem icon={Bus} label="Vehicle Number" value={vehicle?.vehicleNumber || 'N/A'} />
            <InfoItem icon={User} label="Driver" value={driver?.name || 'N/A'} />
        </div>
    );
}

async function AchievementsTabContent({ studentId }: { studentId: string }) {
    const achievements = (await getAchievements()).filter((ach: any) => ach.studentId === studentId);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {achievements.length > 0 ? achievements.map((ach: any) => (
                    <TableRow key={ach.achievementId}>
                        <TableCell className="font-medium">{ach.achievement}</TableCell>
                        <TableCell>
                            <Badge variant="secondary">{ach.category}</Badge>
                        </TableCell>
                        <TableCell>{new Date(ach.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                            No achievements recorded for this student.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
