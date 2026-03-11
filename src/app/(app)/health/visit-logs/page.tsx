
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
import { getInfirmaryVisits, getStudentById, type InfirmaryVisit, type Student, getStudents, addInfirmaryVisit } from "@/app/lib/data"
import { PlusCircle, Stethoscope } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddVisitLogForm } from "@/components/forms/add-visit-log-form"

export default function VisitLogsPage() {
  const [visits, setVisits] = React.useState<InfirmaryVisit[]>(getInfirmaryVisits())
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const students = getStudents();

  const studentMap = React.useMemo(() => {
    const map: Record<string, Student> = {};
    visits.forEach(visit => {
        if (!map[visit.studentId]) {
            const student = getStudentById(visit.studentId);
            if(student) map[visit.studentId] = student;
        }
    });
    return map;
  },[visits]);

  const filteredVisits = React.useMemo(() => {
    if (!searchQuery) return visits
    const query = searchQuery.toLowerCase()
    return visits.filter(
      (visit) =>
        (studentMap[visit.studentId]?.name.toLowerCase() || '').includes(query) ||
        visit.reason.toLowerCase().includes(query) ||
        visit.treatment.toLowerCase().includes(query)
    )
  }, [visits, searchQuery, studentMap])
  
   const handleAddVisit = (data: Omit<InfirmaryVisit, 'visitId' | 'date'>) => {
    addInfirmaryVisit(data);
    setVisits(getInfirmaryVisits());
    setIsAddSheetOpen(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline flex items-center gap-2">
                <Stethoscope className="h-6 w-6" />
                Infirmary Visit Logs
            </CardTitle>
            <CardDescription>
                Track all student visits to the school infirmary.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by student, reason..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
             <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Log New Visit
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Log New Infirmary Visit</SheetTitle>
                        <SheetDescription>Fill in the details for the student's visit.</SheetDescription>
                    </SheetHeader>
                    <AddVisitLogForm students={students} onFormSubmit={handleAddVisit} />
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
              <TableHead>Class</TableHead>
              <TableHead>Reason for Visit</TableHead>
              <TableHead>Treatment Given</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisits.map((visit) => {
                const student = studentMap[visit.studentId];
                return (
                    <TableRow key={visit.visitId}>
                        <TableCell>{new Date(visit.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{student?.name || 'N/A'}</TableCell>
                        <TableCell>{student?.class || 'N/A'}</TableCell>
                        <TableCell>{visit.reason}</TableCell>
                        <TableCell>{visit.treatment}</TableCell>
                        <TableCell className="text-muted-foreground">{visit.notes || '-'}</TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
