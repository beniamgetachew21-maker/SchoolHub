
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
import { getHostelVisitors, getStudentById, checkoutVisitor, type HostelVisitor, type Student, getStudents, addHostelVisitor } from "@/app/lib/data"
import { PlusCircle, LogIn, LogOut } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddHostelVisitorForm } from "@/components/forms/add-hostel-visitor-form"
import { Badge } from "@/components/ui/badge"

export default function HostelVisitorsPage() {
  const [visitors, setVisitors] = React.useState<HostelVisitor[]>(getHostelVisitors())
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const students = getStudents();

  const studentMap = React.useMemo(() => {
    const map: Record<string, Student> = {};
    students.forEach(student => {
        map[student.studentId] = student;
    });
    return map;
  },[students]);
  
  const refreshData = () => {
    setVisitors(getHostelVisitors());
  }

  const filteredVisitors = React.useMemo(() => {
    if (!searchQuery) return visitors
    const query = searchQuery.toLowerCase()
    return visitors.filter(
      (visitor) =>
        visitor.visitorName.toLowerCase().includes(query) ||
        (studentMap[visitor.studentId]?.name.toLowerCase() || '').includes(query)
    )
  }, [visitors, searchQuery, studentMap])
  
   const handleAddVisitor = (data: Omit<HostelVisitor, 'visitorId' | 'checkInTime' | 'checkOutTime' | 'status'>) => {
    addHostelVisitor(data);
    refreshData();
    setIsAddSheetOpen(false);
  }

  const handleCheckout = (visitorId: string) => {
    checkoutVisitor(visitorId);
    refreshData();
    toast({
        title: "Visitor Checked Out",
        description: "The visitor's check-out time has been recorded.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline flex items-center gap-2">
                <LogIn className="h-6 w-6" />
                Hostel Visitor Logs
            </CardTitle>
            <CardDescription>
                Track all visitors entering and leaving the hostels.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by visitor or student..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
             <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Log New Visitor
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Log New Visitor</SheetTitle>
                        <SheetDescription>Fill in the details for the new visitor.</SheetDescription>
                    </SheetHeader>
                    <AddHostelVisitorForm students={students} onFormSubmit={handleAddVisitor} />
                  </SheetContent>
              </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor Name</TableHead>
              <TableHead>Visiting Student</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead>Check-out Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.map((visitor) => {
                const student = studentMap[visitor.studentId];
                return (
                    <TableRow key={visitor.visitorId}>
                        <TableCell className="font-medium">{visitor.visitorName}</TableCell>
                        <TableCell>{student?.name || 'N/A'}</TableCell>
                        <TableCell>{new Date(visitor.checkInTime).toLocaleString()}</TableCell>
                        <TableCell>{visitor.checkOutTime ? new Date(visitor.checkOutTime).toLocaleString() : '-'}</TableCell>
                        <TableCell>
                            <Badge variant={visitor.status === 'Checked In' ? 'default' : 'outline'} className={visitor.status === 'Checked In' ? "bg-green-100 text-green-800" : ""}>
                                {visitor.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {visitor.status === 'Checked In' && (
                                <Button variant="outline" size="sm" onClick={() => handleCheckout(visitor.visitorId)}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Check Out
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                )
            })}
             {filteredVisitors.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        No visitor logs found.
                    </TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
