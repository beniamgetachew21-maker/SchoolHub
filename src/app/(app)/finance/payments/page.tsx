
"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, FileText } from "lucide-react"

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
import { getPayments, getStudents, type Payment } from "@/app/lib/data"
import { toast } from "@/hooks/use-toast"


export default function PaymentsPage() {
  const [payments, setPayments] = React.useState<Payment[]>(getPayments());
  const [searchQuery, setSearchQuery] = React.useState("");
  const students = getStudents();
  
  const studentMap = React.useMemo(() => {
    return students.reduce((acc, student) => {
        acc[student.studentId] = student;
        return acc;
    }, {} as Record<string, typeof students[0]>);
  }, [students]);

  const filteredPayments = React.useMemo(() => {
    if (!searchQuery) return payments;
    const query = searchQuery.toLowerCase();
    return payments.filter(payment => {
        const student = studentMap[payment.studentId];
        const studentName = student?.name.toLowerCase() || '';
        return studentName.includes(query) || 
               payment.paymentId.toLowerCase().includes(query) ||
               payment.invoiceId.toLowerCase().includes(query);
    });
  }, [payments, searchQuery, studentMap]);
  
  const handleNotImplemented = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This functionality is currently under development.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Fee Payments</CardTitle>
            <CardDescription>View all successful fee payments and transactions.</CardDescription>
          </div>
           <div className="flex items-center gap-4">
            <Input 
                placeholder="Search payments..." 
                className="w-80" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
            <Button onClick={handleNotImplemented}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Record Manual Payment
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? filteredPayments.map(payment => {
                const student = studentMap[payment.studentId];
                return (
                 <TableRow key={payment.paymentId}>
                    <TableCell className="font-medium">{payment.paymentId}</TableCell>
                    <TableCell>{student?.name || 'N/A'}</TableCell>
                    <TableCell>{payment.invoiceId}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{payment.method}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={handleNotImplemented}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={handleNotImplemented}>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
            }) : (
                 <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No payments found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
