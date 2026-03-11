"use client";

import * as React from "react";
import { MoreHorizontal, PlusCircle, Check, X, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet";
import { AddEmployeeLeaveForm } from "@/components/forms/add-employee-leave-form";
import { type LeaveRequest, type Employee, type LeavePolicy } from "@prisma/client";
import { addLeaveRequestAction, updateLeaveRequestStatusAction } from "@/lib/actions";

interface LeaveManagementClientProps {
    initialRequests: LeaveRequest[];
    employees: Employee[];
    leavePolicies: LeavePolicy[];
}

export function LeaveManagementClient({ initialRequests, employees, leavePolicies }: LeaveManagementClientProps) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    const employeeMap = React.useMemo(() => {
        return employees.reduce((acc, employee) => {
            acc[employee.employeeId] = employee;
            return acc;
        }, {} as Record<string, Employee>);
    }, [employees]);

    const filteredRequests = React.useMemo(() => {
        if (!searchQuery) return initialRequests;
        const query = searchQuery.toLowerCase();
        return initialRequests.filter(req => {
            const employeeName = (employeeMap[req.employeeId]?.name || '').toLowerCase();
            return employeeName.includes(query) || req.leaveType.toLowerCase().includes(query);
        });
    }, [initialRequests, searchQuery, employeeMap]);

    const leaveStats = React.useMemo(() => {
        return initialRequests.reduce((acc, req) => {
            acc[req.status as any] = (acc[req.status as any] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [initialRequests]);


    const handleStatusChange = async (requestId: string, status: "Approved" | "Rejected") => {
        await updateLeaveRequestStatusAction(requestId, status);
        toast({
            title: `Request ${status}`,
            description: `The leave request has been ${status.toLowerCase()}.`
        });
    };

    const handleAddRequest = async (data: any) => {
        await addLeaveRequestAction(data);
        setIsAddSheetOpen(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
            case "Approved":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
            case "Rejected":
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                        <Clock className="h-5 w-5 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leaveStats.Pending || 0}</div>
                        <p className="text-xs text-muted-foreground">Awaiting review</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved Requests</CardTitle>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leaveStats.Approved || 0}</div>
                        <p className="text-xs text-muted-foreground">This academic year</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected Requests</CardTitle>
                        <XCircle className="h-5 w-5 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leaveStats.Rejected || 0}</div>
                        <p className="text-xs text-muted-foreground">This academic year</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="font-headline">All Leave Requests</CardTitle>
                            <CardDescription>
                                Review and approve employee leave requests.
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
                                        <SheetTitle>Add Employee Leave Request</SheetTitle>
                                        <SheetDescription>Submit a leave request on behalf of an employee.</SheetDescription>
                                    </SheetHeader>
                                    <AddEmployeeLeaveForm employees={employees as any} leavePolicies={leavePolicies as any} onFormSubmit={handleAddRequest} />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Department</TableHead>
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
                                const employee = employeeMap[request.employeeId];
                                return (
                                    <TableRow key={request.requestId}>
                                        <TableCell className="font-medium">{employee?.name || 'N/A'}</TableCell>
                                        <TableCell>{employee?.department || 'N/A'}</TableCell>
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
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
