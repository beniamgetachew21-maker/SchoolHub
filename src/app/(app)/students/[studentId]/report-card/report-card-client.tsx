"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { type Student, type AttendanceSummary } from "@prisma/client";

interface ReportCardClientProps {
    student: Student;
    results: any[];
    attendance: AttendanceSummary | null;
}

export function ReportCardClient({ student, results, attendance }: ReportCardClientProps) {
    const totalMarks = results.reduce((acc, result) => acc + result.marksObtained, 0);
    const totalMaxMarks = results.reduce((acc, result) => acc + (result.maxMarks || 0), 0);
    const overallPercentage = totalMaxMarks > 0 ? (totalMarks / totalMaxMarks) * 100 : 0;

    const getOverallGrade = (percentage: number) => {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        if (percentage >= 40) return 'D';
        return 'F';
    }

    return (
        <div className="bg-muted/30 p-4 sm:p-8 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto bg-background shadow-2xl rounded-lg">
                <div className="p-8 print:p-0">
                    <div className="flex justify-between items-center mb-8 print:mb-4">
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                            <div>
                                <h1 className="text-2xl font-bold font-headline text-primary">EthioEdu</h1>
                                <p className="text-muted-foreground">Academic Report Card - Fall 2024</p>
                            </div>
                        </div>
                        <div className="print:hidden flex items-center gap-2">
                            <Button variant="outline" size="icon" asChild>
                                <Link href={`/students/${student.studentId}`}><ArrowLeft className="h-4 w-4" /></Link>
                            </Button>
                            <Button onClick={() => window.print()}>
                                <Printer className="mr-2 h-4 w-4" /> Print Report
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <Card className="border-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Student Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-sm">
                                <InfoItem label="Student Name" value={student.name} />
                                <InfoItem label="Admission No." value={student.admissionNumber} />
                                <InfoItem label="Class" value={student.className} />
                                <InfoItem label="Student ID" value={student.studentId} />
                            </div>
                        </CardContent>
                    </Card>

                    <Separator className="my-6" />

                    <Card className="border-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Academic Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Assessment</TableHead>
                                        <TableHead className="text-right">Marks</TableHead>
                                        <TableHead className="text-center">Grade</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {results.map(result => {
                                        return (
                                            <TableRow key={result.resultId}>
                                                <TableCell className="font-medium">{result.subject}</TableCell>
                                                <TableCell>{result.assessmentName}</TableCell>
                                                <TableCell className="text-right font-mono">{result.marksObtained} / {result.maxMarks}</TableCell>
                                                <TableCell className="text-center font-semibold">{result.grade}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Separator className="my-6" />

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">Summary & Attendance</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Overall Percentage</p>
                                        <p className="text-2xl font-bold font-headline">{overallPercentage.toFixed(2)}%</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Overall Grade</p>
                                        <p className="text-2xl font-bold font-headline text-primary">{getOverallGrade(overallPercentage)}</p>
                                    </div>
                                </div>
                                {attendance && (
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-muted/50 p-3 rounded-md">
                                            <p className="text-sm text-muted-foreground">Total Days</p>
                                            <p className="text-lg font-bold">{attendance.totalDays}</p>
                                        </div>
                                        <div className="bg-muted/50 p-3 rounded-md">
                                            <p className="text-sm text-muted-foreground">Present</p>
                                            <p className="text-lg font-bold text-green-600">{attendance.presentDays}</p>
                                        </div>
                                        <div className="bg-muted/50 p-3 rounded-md">
                                            <p className="text-sm text-muted-foreground">Absent</p>
                                            <p className="text-lg font-bold text-red-600">{attendance.absentDays}</p>
                                        </div>
                                        <div className="bg-muted/50 p-3 rounded-md">
                                            <p className="text-sm text-muted-foreground">On Leave</p>
                                            <p className="text-lg font-bold text-yellow-600">{attendance.leaveDays}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">Remarks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg p-4 min-h-[150px] text-sm">
                                    <p className="font-semibold">Class Teacher's Remarks:</p>
                                    <p className="text-muted-foreground italic mt-2">{student.name} has shown excellent progress this term, especially in Science. They are a diligent and focused student. They are encouraged to participate more in class discussions.</p>

                                    <p className="font-semibold mt-4">Principal's Remarks:</p>
                                    <p className="text-muted-foreground italic mt-2">A commendable performance. Keep up the great work.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-16 text-center text-xs text-muted-foreground space-y-4">
                        <div className="grid grid-cols-3 gap-8 items-end">
                            <div>
                                <div className="border-t w-3/4 mx-auto my-2"></div>
                                <p>Class Teacher's Signature</p>
                            </div>
                            <div>
                                <div className="border-t w-3/4 mx-auto my-2"></div>
                                <p>Principal's Signature</p>
                            </div>
                            <div>
                                <div className="border-t w-3/4 mx-auto my-2"></div>
                                <p>Date of Issue: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                        <p className="pt-4">This is a computer-generated report and does not require a physical signature.</p>
                    </div>
                </div>
            </div>
            <style jsx global>{`
            @media print {
                body {
                    background-color: #fff;
                }
                .print\\:hidden {
                    display: none;
                }
                .print\\:p-0 {
                    padding: 0;
                }
                .print\\:mb-4 {
                    margin-bottom: 1rem;
                }
                .print\\:shadow-none {
                    box-shadow: none;
                }
                @page {
                    size: A4;
                    margin: 20mm;
                }
            }
        `}</style>
        </div>
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}
