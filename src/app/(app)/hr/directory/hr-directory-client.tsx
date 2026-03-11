"use client"
import * as React from "react"
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react"
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
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet"
import { EditEmployeeForm } from "@/components/forms/edit-employee-form"
import Link from "next/link"
import { type Employee } from "@prisma/client"
import { updateEmployeeAction } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

interface HrDirectoryClientProps {
    initialEmployees: Employee[]
}

export function HrDirectoryClient({ initialEmployees }: HrDirectoryClientProps) {
    const [employees, setEmployees] = React.useState<Employee[]>(initialEmployees);
    const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
    const [searchQuery, setSearchQuery] = React.useState("");

    React.useEffect(() => {
        setEmployees(initialEmployees);
    }, [initialEmployees]);

    const handleEditEmployee = async (updatedEmployee: any) => {
        try {
            await updateEmployeeAction(updatedEmployee);
            setIsEditSheetOpen(false);
            toast({
                title: "Employee Updated",
                description: "The employee record has been updated successfully."
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update employee record.",
                variant: "destructive"
            });
        }
    }

    const openEditSheet = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditSheetOpen(true);
    }

    const filteredEmployees = React.useMemo(() => {
        if (!searchQuery) return employees;
        const query = searchQuery.toLowerCase();
        return employees.filter(emp =>
            emp.name.toLowerCase().includes(query) ||
            emp.employeeCode.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query) ||
            emp.department.toLowerCase().includes(query)
        );
    }, [employees, searchQuery]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Active":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
            case "OnLeave":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">On Leave</Badge>;
            case "Probation":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Probation</Badge>;
            case "Resigned":
                return <Badge variant="destructive">Resigned</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="font-headline">Employee Directory</CardTitle>
                            <CardDescription>
                                Manage all employee profiles and records.
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <Input
                                placeholder="Search employees..."
                                className="w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button asChild>
                                <Link href="/hr/directory/add">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Employee
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployees.map((employee) => (
                                <TableRow key={employee.employeeId}>
                                    <TableCell className="font-medium">{employee.employeeCode}</TableCell>
                                    <TableCell>
                                        <Link href={`/hr/directory/${employee.employeeId}`} className="hover:underline font-medium">
                                            {employee.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{employee.department}</TableCell>
                                    <TableCell>{employee.designation}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
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
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/hr/directory/${employee.employeeId}`}>View Profile</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => openEditSheet(employee)}>Edit Employee</DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/inventory/allocations">Assign Assets</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredEmployees.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No employees found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
                <SheetContent className="sm:max-w-3xl">
                    <SheetHeader>
                        <SheetTitle>Edit Employee</SheetTitle>
                        <SheetDescription>Update the details for the staff member.</SheetDescription>
                    </SheetHeader>
                    {selectedEmployee && <EditEmployeeForm employee={selectedEmployee as any} onFormSubmit={handleEditEmployee} />}
                </SheetContent>
            </Sheet>
        </>
    )
}
