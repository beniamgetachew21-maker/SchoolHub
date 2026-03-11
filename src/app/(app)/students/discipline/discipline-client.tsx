"use client"
import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Gavel } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet"
import { AddDisciplinaryRecordForm } from "@/components/forms/add-disciplinary-record-form"
import { Badge } from "@/components/ui/badge"
import { type DisciplinaryRecord, type Student } from "@prisma/client"
import { addDisciplinaryRecordAction } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

interface DisciplineClientProps {
    initialRecords: DisciplinaryRecord[]
    students: Student[]
}

export function DisciplineClient({ initialRecords, students }: DisciplineClientProps) {
    const [records, setRecords] = React.useState<DisciplinaryRecord[]>(initialRecords)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    // Update records when initialRecords changes (due to revalidation)
    React.useEffect(() => {
        setRecords(initialRecords)
    }, [initialRecords])

    const studentMap = React.useMemo(() => {
        return students.reduce((acc, student) => {
            acc[student.studentId] = student;
            return acc;
        }, {} as Record<string, Student>);
    }, [students]);

    const filteredRecords = React.useMemo(() => {
        if (!searchQuery) return records;
        const query = searchQuery.toLowerCase();
        return records.filter(
            (record) =>
                (studentMap[record.studentId]?.name.toLowerCase() || '').includes(query) ||
                record.incident.toLowerCase().includes(query) ||
                record.actionTaken.toLowerCase().includes(query)
        );
    }, [records, searchQuery, studentMap]);

    const handleAddRecord = async (data: any) => {
        try {
            await addDisciplinaryRecordAction(data);
            setIsAddSheetOpen(false);
            toast({
                title: "Record Added",
                description: "The disciplinary incident has been logged successfully."
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to log disciplinary incident.",
                variant: "destructive"
            });
        }
    };

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case 'Low':
                return <Badge variant="secondary">Low</Badge>;
            case 'Medium':
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
            case 'High':
                return <Badge variant="destructive">High</Badge>;
            default:
                return <Badge variant="outline">{severity}</Badge>;
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Gavel className="h-6 w-6" />
                            Disciplinary Records
                        </CardTitle>
                        <CardDescription>
                            Track and manage all student disciplinary incidents.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Search by student, incident..."
                            className="w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                            <SheetTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Log New Incident
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Log New Disciplinary Incident</SheetTitle>
                                    <SheetDescription>Fill in the details for the student's infraction.</SheetDescription>
                                </SheetHeader>
                                {/* AddDisciplinaryRecordForm might need Adjustment for Prisma Student type */}
                                <AddDisciplinaryRecordForm students={students as any} onFormSubmit={handleAddRecord} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Incident</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Action Taken</TableHead>
                            <TableHead>Reported By</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRecords.map((record) => {
                            const student = studentMap[record.studentId];
                            return (
                                <TableRow key={record.recordId}>
                                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="font-medium">{student?.name || 'N/A'}</TableCell>
                                    <TableCell>{record.incident}</TableCell>
                                    <TableCell>{getSeverityBadge(record.severity)}</TableCell>
                                    <TableCell>{record.actionTaken}</TableCell>
                                    <TableCell>{record.reportedBy}</TableCell>
                                </TableRow>
                            )
                        })}
                        {filteredRecords.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No disciplinary records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
