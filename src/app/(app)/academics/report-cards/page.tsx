
"use client"
import * as React from "react"
import { Printer, Download, Search, FileText, TrendingUp, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getStudents, getStudentPerformance, type Student } from "@/app/lib/data"
import { toast } from "@/hooks/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ReportCardsPage() {
    const allStudents = getStudents();
    const [selectedStudentId, setSelectedStudentId] = React.useState<string>("");
    const [performance, setPerformance] = React.useState<any>(null);

    React.useEffect(() => {
        if (selectedStudentId) {
            setPerformance(getStudentPerformance(selectedStudentId));
        } else {
            setPerformance(null);
        }
    }, [selectedStudentId]);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        toast({
            title: "Generating PDF",
            description: "Your report card is being generated and will download shortly.",
        });
    };

    const selectedStudent = allStudents.find(s => s.studentId === selectedStudentId);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="font-headline">Student Report Cards</CardTitle>
                            <CardDescription>
                                Generate and view official academic performance reports.
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-64">
                                <Select onValueChange={setSelectedStudentId} value={selectedStudentId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a student..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allStudents.map(student => (
                                            <SelectItem key={student.studentId} value={student.studentId}>
                                                {student.name} ({student.class})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button variant="outline" onClick={handlePrint} disabled={!performance}>
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                            </Button>
                            <Button onClick={handleDownload} disabled={!performance}>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {!performance ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-dashed">
                    <FileText className="h-12 w-12 mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">No Student Selected</h3>
                    <p className="max-w-xs">Select a student from the dropdown above to view their academic performance and generate a report card.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader className="bg-muted/30 border-b">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold font-headline">{selectedStudent?.name}</h2>
                                        <p className="text-sm text-muted-foreground">ID: {selectedStudent?.studentId} | Class: {selectedStudent?.class}</p>
                                    </div>
                                    <Badge className="text-lg py-1 px-3" variant={performance.grade.startsWith('A') ? 'default' : performance.grade.startsWith('B') ? 'secondary' : 'outline'}>
                                        Overall Grade: {performance.grade}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Assessment</TableHead>
                                            <TableHead className="text-right">Marks</TableHead>
                                            <TableHead className="text-right">Max Marks</TableHead>
                                            <TableHead className="text-center">Grade</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {performance.results.map((result: any) => (
                                            <TableRow key={result.resultId}>
                                                <TableCell className="font-medium">{result.subject}</TableCell>
                                                <TableCell>{result.assessmentName}</TableCell>
                                                <TableCell className="text-right">{result.marksObtained}</TableCell>
                                                <TableCell className="text-right">{result.maxMarks}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="outline">{result.grade}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="bg-muted/10 border-t flex justify-between p-6">
                                <div className="text-sm font-medium">
                                    Summary: {performance.results.length} Assessments recorded this term.
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-sm text-muted-foreground">Aggregate Percentage</p>
                                    <p className="text-2xl font-bold">{performance.percentage}%</p>
                                </div>
                            </CardFooter>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-blue-500" />
                                        Performance Analytics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[200px] flex items-center justify-center border rounded border-dashed text-muted-foreground text-xs">
                                        [ Subject Performance Chart ]
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                        <Award className="h-4 w-4 text-yellow-500" />
                                        Teacher Remarks
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold">General Remarks:</p>
                                        <p className="text-sm italic">"{selectedStudent?.name} has shown consistent improvement in Science and Mathematics. Participation in extracurricular activities is excellent."</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold">Attendance:</p>
                                        <p className="text-sm font-medium text-green-600">94.5% (Very Good)</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Report Card Preview</CardTitle>
                                <CardDescription>How the official document looks.</CardDescription>
                            </CardHeader>
                            <CardContent className="bg-zinc-800 rounded-lg p-4 text-zinc-300">
                                <div className="border border-zinc-700 p-4 aspect-[1/1.4] relative overflow-hidden text-[8px] bg-white text-black shadow-inner">
                                    <div className="text-center mb-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 mx-auto mb-1"></div>
                                        <h1 className="font-bold text-[10px]">EthioEdu Academy</h1>
                                        <p className="text-[6px]">Official Progress Report</p>
                                    </div>
                                    <div className="mb-4">
                                        <p><strong>Student:</strong> {selectedStudent?.name}</p>
                                        <p><strong>Class:</strong> {selectedStudent?.class}</p>
                                        <p><strong>Term:</strong> Academic Year 2026 - Term 1</p>
                                    </div>
                                    <div className="h-40 border border-black mb-4">
                                        <div className="bg-gray-200 border-b border-black grid grid-cols-3 p-1">
                                            <span>Subject</span>
                                            <span className="text-center">Marks</span>
                                            <span className="text-center">Grade</span>
                                        </div>
                                        {performance.results.slice(0, 8).map((r: any) => (
                                            <div key={r.resultId} className="grid grid-cols-3 p-1 border-b border-gray-100">
                                                <span>{r.subject}</span>
                                                <span className="text-center">{r.marksObtained}/{r.maxMarks}</span>
                                                <span className="text-center">{r.grade}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-8 left-4 right-4 flex justify-between">
                                        <div className="border-t border-black w-16 pt-1 text-center font-bold">Principal</div>
                                        <div className="border-t border-black w-16 pt-1 text-center font-bold">Teacher</div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-100/50 flex items-center justify-center rotate-45 transform translate-x-4 -translate-y-4">
                                        <span className="text-[4px] font-bold text-blue-800/20">OFFICIAL</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
