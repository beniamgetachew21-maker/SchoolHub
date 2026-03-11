
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
import { getBorrowRequests, getStudentById, getBookById, type BorrowRequest, borrowBook } from "@/app/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function BorrowRequestsPage() {
    const [requests, setRequests] = React.useState<BorrowRequest[]>(getBorrowRequests())

    const handleApprove = (request: BorrowRequest) => {
        try {
            borrowBook(request.bookId, request.studentId);
            // In a real app, you'd also update the request status to 'Fulfilled'
             toast({
                title: "Request Approved",
                description: `Book has been issued.`,
            });
            // Refresh data
            setRequests(requests.filter(r => r.requestId !== request.requestId));
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Approval Failed",
                description: error.message,
            });
        }
    }

    const handleReject = (request: BorrowRequest) => {
        // In a real app, you'd update the request status to 'Cancelled'
        toast({
            title: "Request Cancelled",
        });
        setRequests(requests.filter(r => r.requestId !== request.requestId));
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Manage Borrow Requests</CardTitle>
        <CardDescription>
          Approve or reject book borrowing requests from students and teachers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.length > 0 ? requests.map(request => {
                    const student = getStudentById(request.studentId);
                    const book = getBookById(request.bookId);

                    return (
                        <TableRow key={request.requestId}>
                            <TableCell className="font-medium">{student?.name}</TableCell>
                            <TableCell>{book?.title}</TableCell>
                            <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{request.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {request.status === 'Pending' && (
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" onClick={() => handleReject(request)}>Reject</Button>
                                        <Button size="sm" onClick={() => handleApprove(request)}>Approve & Issue</Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    )
                }) : (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No pending borrow requests.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
