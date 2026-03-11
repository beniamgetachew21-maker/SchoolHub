"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Edit, Briefcase, Mail, Phone, Calendar, User, FileText, Anchor, BookUser, Building, UserSquare, Users, Heart, HeartPulse } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EditEmployeeForm } from "@/components/forms/edit-employee-form";
import * as React from "react";
import { type Employee, type LeaveRequest, type LeavePolicy, type AssetAllocation, type InventoryItem } from "@prisma/client";
import { updateEmployeeAction } from "@/lib/actions";

interface EmployeeProfileClientProps {
    employee: Employee;
    leaveRequests: LeaveRequest[];
    leavePolicies: LeavePolicy[];
    assetAllocations: AssetAllocation[];
    inventoryItems: InventoryItem[];
    managers: { employeeId: string; name: string }[];
}

export function EmployeeProfileClient({
    employee,
    leaveRequests,
    leavePolicies,
    assetAllocations,
    inventoryItems,
    managers
}: EmployeeProfileClientProps) {
    const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);

    const handleEditEmployee = async (updatedEmployee: any) => {
        await updateEmployeeAction(updatedEmployee);
        setIsEditSheetOpen(false);
    };

    const managerName = managers.find(m => m.employeeId === employee.lineManager)?.name || 'N/A';

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/hr/directory"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold font-headline">{employee.name}</h1>
                        <p className="text-muted-foreground">Employee ID: {employee.employeeCode}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
                        <SheetTrigger asChild>
                            <Button><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-3xl">
                            <SheetHeader>
                                <SheetTitle>Edit Employee</SheetTitle>
                                <SheetDescription>Update the details for the staff member.</SheetDescription>
                            </SheetHeader>
                            <EditEmployeeForm employee={employee as any} onFormSubmit={handleEditEmployee} />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="flex flex-col items-center text-center md:w-1/4">
                            <Avatar className="h-32 w-32 mb-4">
                                <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-semibold">{employee.name}</h2>
                            <p className="text-muted-foreground">{employee.designation}</p>
                            <Badge className={`mt-2 ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{employee.status}</Badge>
                        </div>

                        <div className="flex-1">
                            <Tabs defaultValue="personal" className="w-full">
                                <TabsList className="grid w-full grid-cols-6">
                                    <TabsTrigger value="personal">Personal</TabsTrigger>
                                    <TabsTrigger value="job">Job</TabsTrigger>
                                    <TabsTrigger value="contact">Contact</TabsTrigger>
                                    <TabsTrigger value="family">Family</TabsTrigger>
                                    <TabsTrigger value="health">Health</TabsTrigger>
                                    <TabsTrigger value="leave_assets">Leave & Assets</TabsTrigger>
                                </TabsList>
                                <TabsContent value="personal" className="mt-4 space-y-4">
                                    <InfoItem icon={User} label="Gender" value={employee.gender} />
                                    <InfoItem icon={Calendar} label="Date of Birth" value={new Date(employee.dob).toLocaleDateString()} />
                                    <InfoItem icon={User} label="Nationality" value={employee.nationality || 'N/A'} />
                                    <InfoItem icon={FileText} label="National ID" value={employee.nationalId || 'N/A'} />
                                    <InfoItem icon={FileText} label="Passport No." value={employee.passport || 'N/A'} />
                                </TabsContent>
                                <TabsContent value="job" className="mt-4 space-y-4">
                                    <InfoItem icon={Building} label="Department" value={employee.department} />
                                    <InfoItem icon={Briefcase} label="Designation" value={employee.designation} />
                                    <InfoItem icon={UserSquare} label="Reports To" value={managerName} />
                                    <InfoItem icon={Calendar} label="Date of Joining" value={new Date(employee.dateOfJoining).toLocaleDateString()} />
                                    <InfoItem icon={Briefcase} label="Job Type" value={employee.jobType || 'N/A'} />
                                    <InfoItem icon={Building} label="Branch" value={employee.branch || 'N/A'} />
                                </TabsContent>
                                <TabsContent value="contact" className="mt-4 space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-md mb-2">Contact Details</h4>
                                        <div className="space-y-4">
                                            <InfoItem icon={Mail} label="Email Address" value={employee.email} />
                                            <InfoItem icon={Phone} label="Mobile Phone" value={employee.mobilePhone || 'N/A'} />
                                            <InfoItem icon={Phone} label="Office Phone" value={employee.officePhone || 'N/A'} />
                                            <InfoItem icon={Anchor} label="Address" value={`${employee.address1 || ''} ${employee.city || ''}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-md mb-2">Emergency Contact</h4>
                                        <div className="space-y-4">
                                            <InfoItem icon={User} label="Name" value={`${employee.emergencyFirstName || ''} ${employee.emergencyLastName || ''}`} />
                                            <InfoItem icon={User} label="Relationship" value={employee.emergencyRelationship || 'N/A'} />
                                            <InfoItem icon={Phone} label="Mobile Phone" value={employee.emergencyMobile || 'N/A'} />
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="family" className="mt-4 space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-md mb-2">Marital & Spouse Details</h4>
                                        <div className="space-y-4">
                                            <InfoItem icon={Heart} label="Marital Status" value={employee.maritalStatus || 'N/A'} />
                                            {employee.maritalStatus === 'Married' && (
                                                <>
                                                    <InfoItem icon={User} label="Spouse Name" value={`${employee.spouseFirstName || ''} ${employee.spouseLastName || ''}`} />
                                                    <InfoItem icon={Briefcase} label="Spouse Working" value={employee.spouseWorking ? 'Yes' : 'No'} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-md mb-2">Children</h4>
                                        <div className="space-y-4">
                                            <InfoItem icon={Users} label="Number of Children" value={String(employee.childrenCount ?? 0)} />
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="health" className="mt-4 space-y-4">
                                    <InfoItem icon={HeartPulse} label="Blood Type" value={employee.bloodType || 'N/A'} />
                                    <InfoItem icon={HeartPulse} label="Height (cm)" value={String(employee.height || 'N/A')} />
                                    <InfoItem icon={HeartPulse} label="Weight (kg)" value={String(employee.weight || 'N/A')} />
                                </TabsContent>
                                <TabsContent value="leave_assets" className="mt-4 space-y-6">
                                    <LeaveHistoryComponent employeeId={employee.employeeId} leaveRequests={leaveRequests} leavePolicies={leavePolicies} />
                                    <div>
                                        <h4 className="font-semibold text-md mb-2 pt-4 border-t">Assigned Assets</h4>
                                        <AssignedAssetsComponent employeeId={employee.employeeId} assetAllocations={assetAllocations} inventoryItems={inventoryItems} />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
    return (
        <div className="flex items-start text-sm">
            <div className="flex items-center w-40 text-muted-foreground">
                <Icon className="h-4 w-4 mr-2" />
                <span className="font-medium">{label}</span>
            </div>
            <p className="font-medium text-foreground">{value}</p>
        </div>
    );
}

function LeaveHistoryComponent({ employeeId, leaveRequests, leavePolicies }: { employeeId: string, leaveRequests: LeaveRequest[], leavePolicies: LeavePolicy[] }) {
    const leaveHistory = leaveRequests.filter(req => req.employeeId === employeeId);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Approved":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
            case "Pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
            case "Rejected":
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const calculateLeaveBalance = (policy: LeavePolicy) => {
        const daysTaken = leaveHistory
            .filter(req => req.leaveType === policy.name && req.status === 'Approved')
            .reduce((acc, req) => acc + req.daysCount, 0);
        return policy.days - daysTaken;
    };

    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-md mb-2">Leave Balances</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {leavePolicies.map(policy => (
                        <Card key={policy.id}>
                            <CardHeader className="pb-2">
                                <CardDescription className="flex items-center gap-1 text-xs"><BookUser className="h-3 w-3" />{policy.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p><span className="text-xl font-bold">{calculateLeaveBalance(policy)}</span> / {policy.days} days</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-md mb-2">Request History</h4>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Leave Type</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Days</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaveHistory.length > 0 ? leaveHistory.map(req => (
                            <TableRow key={req.requestId}>
                                <TableCell>{req.leaveType}</TableCell>
                                <TableCell>{new Date(req.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(req.endDate).toLocaleDateString()}</TableCell>
                                <TableCell>{req.daysCount}</TableCell>
                                <TableCell>{getStatusBadge(req.status)}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No leave history found for this employee.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function AssignedAssetsComponent({ employeeId, assetAllocations, inventoryItems }: { employeeId: string, assetAllocations: AssetAllocation[], inventoryItems: InventoryItem[] }) {
    const allocations = assetAllocations.filter(a => a.assigneeId === employeeId && a.assigneeType === 'Employee');
    const itemMap = React.useMemo(() => {
        return inventoryItems.reduce((acc, item) => {
            acc[item.itemId] = item;
            return acc;
        }, {} as Record<string, InventoryItem>);
    }, [inventoryItems]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allocations.length > 0 ? allocations.map(alloc => {
                    const item = itemMap[alloc.itemId];
                    return (
                        <TableRow key={alloc.allocationId}>
                            <TableCell>{item?.name || 'N/A'}</TableCell>
                            <TableCell className="font-mono text-xs">{alloc.itemId}</TableCell>
                            <TableCell>{new Date(alloc.issueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(alloc.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge variant={alloc.returnDate ? 'secondary' : 'default'} className={!alloc.returnDate ? "bg-yellow-100 text-yellow-800" : ""}>
                                    {alloc.returnDate ? 'Returned' : 'Issued'}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    );
                }) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No assets are currently assigned to this employee.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
