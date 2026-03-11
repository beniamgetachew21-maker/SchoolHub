
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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getStudents, type Student } from "@/app/lib/data"
import { HeartPulse, ShieldAlert } from "lucide-react"

export default function HealthDashboardPage() {
  const [students, setStudents] = React.useState<Student[]>(getStudents())
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredStudents = React.useMemo(() => {
    if (!searchQuery) return students
    const query = searchQuery.toLowerCase()
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.class.toLowerCase().includes(query)
    )
  }, [students, searchQuery])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline flex items-center gap-2">
              <HeartPulse className="h-6 w-6" />
              Student Medical Records
            </CardTitle>
            <CardDescription>
              Overview of student health information and emergency contacts.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search students..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Allergies</TableHead>
              <TableHead>Medical Conditions</TableHead>
              <TableHead>Emergency Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  {student.medical?.allergies.length ? (
                    student.medical.allergies.map((allergy, i) => (
                      <Badge key={i} variant="destructive" className="mr-1 mb-1">
                        <ShieldAlert className="h-3 w-3 mr-1" />
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-xs">None</span>
                  )}
                </TableCell>
                <TableCell>
                   {student.medical?.conditions.length ? (
                    student.medical.conditions.map((condition, i) => (
                      <Badge key={i} variant="outline" className="mr-1 mb-1 border-yellow-600 text-yellow-700">
                        {condition}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-xs">None</span>
                  )}
                </TableCell>
                <TableCell>
                    {student.medical?.emergencyContact ? (
                        <div className="text-sm">
                            <p className="font-medium">{student.medical.emergencyContact.name} ({student.medical.emergencyContact.relation})</p>
                            <p className="text-muted-foreground">{student.medical.emergencyContact.phone}</p>
                        </div>
                    ) : (
                         <span className="text-muted-foreground text-xs">N/A</span>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
