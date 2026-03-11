"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet"
import { AddStudentLeaveForm } from "@/components/forms/add-student-leave-form"
import { type StudentLeaveRequest, type Student } from "@prisma/client"
import { updateStudentLeaveRequestStatusAction, addStudentLeaveRequestAction } from "@/lib/actions"

interface LeaveClientProps {
    initialRequests: StudentLeaveRequest[]
    students: Student[]
}

export function LeaveClient({ initialRequests, students }: LeaveClientProps) {
    const [requests, setRequests] = React.useState<StudentLeaveRequest[]>(initialRequests)
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    React.useEffect(() => {
        setRequests(initialRequests)
    }, [initialRequests])

    const studentMap = React.useMemo(() => {
        return students.reduce((acc, student) => {
            acc[student.studentId] = student;
            return acc;
        }, {} as Record<string, Student>);
    }, [students]);

    const filteredRequests = React.useMemo(() => {
        if (!searchQuery) return requests;
        const query = searchQuery.toLowerCase();
        return requests.filter(req => {
            const studentName = (studentMap[req.studentId]?.name || '').toLowerCase();
            return studentName.includes(query) || req.leaveType.toLowerCase().includes(query);
        });
    }, [requests, searchQuery, studentMap]);


    const handleStatusChange = async (requestId: string, status: string) => {
        try {
            await updateStudentLeaveRequestStatusAction(requestId, status);
            toast({
                title: `Request ${status}`,
                description: `The leave request has been ${status.toLowerCase()}.`
            })
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to update request status.`,
                variant: "destructive"
            })
        }
    }

    const handleAddRequest = async (data: any) => {
        try {
            await addStudentLeaveRequestAction(data);
            setIsAddSheetOpen(false);
            toast({
                title: "Request Added",
                description: "The leave request has been submitted successfully."
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit leave request.",
                variant: "destructive"
            })
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
            case "Approved":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
            case "Rejected":
                return <Badge variant="destructive">Rejected</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">Student Leave Management</CardTitle>
                        <CardDescription>
                            Review and approve student leave requests.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Search requests..."
                            className="w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                            <SheetTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Request
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Add Student Leave Request</SheetTitle>
                                    <SheetDescription>Submit a leave request on behalf of a student.</SheetDescription>
                                </SheetHeader>
                                <AddStudentLeaveForm students={students as any} onFormSubmit={handleAddRequest} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Leave Type</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead className="text-center">Days</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRequests.map((request) => {
                            const student = studentMap[request.studentId];
                            return (
                                <TableRow key={request.requestId}>
                                    <TableCell className="font-medium">{student?.name || 'N/A'}</TableCell>
                                    <TableCell>{student?.className || 'N/A'}</TableCell>
                                    <TableCell>{request.leaveType}</TableCell>
                                    <TableCell>{new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center">{request.daysCount}</TableCell>
                                    <TableCell>{request.reason}</TableCell>
                                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                                    <TableCell className="text-right">
                                        {request.status === 'Pending' ? (
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" onClick={() => handleStatusChange(request.requestId, 'Rejected')}>
                                                    <X className="mr-2 h-4 w-4" /> Reject
                                                </Button>
                                                <Button size="sm" onClick={() => handleStatusChange(request.requestId, 'Approved')}>
                                                    <Check className="mr-2 h-4 w-4" /> Approve
                                                </Button>
                                            </div>
                                        ) : (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem disabled>View Details</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {filteredRequests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No leave requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
