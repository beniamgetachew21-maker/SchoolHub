"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import * as React from "react";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
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
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet"
import { AddStudentForm } from "@/components/forms/add-student-form"
import { EditStudentForm } from "@/components/forms/edit-student-form"
import { toast } from "@/hooks/use-toast";
import { type Student } from "@prisma/client";
import { addStudentAction, updateStudentAction } from "@/lib/actions";

interface StudentsClientProps {
    students: Student[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export function StudentsClient({ students, totalCount, totalPages, currentPage }: StudentsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    
    // Controlled search input with debounced URL update
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    
    // We still need all classes for the filter dropdown. 
    const [all_classes, setAllClasses] = useState<string[]>([]);

    useEffect(() => {
        // Fetch distinct classes once
        import("@/lib/actions").then(m => m.getDistinctClasses()).then(classes => setAllClasses(classes));
    }, []);

    const classFilter = searchParams.get("class") || "";

    const createQueryString = useCallback(
        (params: Record<string, string | null>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(params)) {
                if (value === null) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, value);
                }
            }
            return newSearchParams.toString();
        },
        [searchParams]
    );

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (searchParams.get("q") || "")) {
                router.push(`?${createQueryString({ q: searchQuery || null, page: "1" })}`);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, router, createQueryString, searchParams]);

    const handleAddStudent = async (newStudent: Omit<Student, 'studentId' | 'admissionNumber' | 'status' | 'avatarUrl'>) => {
        try {
            await addStudentAction(newStudent);
            setIsAddSheetOpen(false); // Close the sheet after adding
            toast({ title: "Student Registered", description: `${newStudent.name} has been successfully registered.` });
        } catch (e) {
            toast({ title: "Error", description: "Failed to add student.", variant: "destructive" });
        }
    };

    const handleEditStudent = async (updatedStudent: Student) => {
        try {
            await updateStudentAction(updatedStudent.studentId, updatedStudent);
            setIsEditSheetOpen(false);
            toast({ title: "Student Updated", description: `${updatedStudent.name}'s profile has been updated.` });
        } catch (e) {
            toast({ title: "Error", description: "Failed to update student.", variant: "destructive" });
        }
    }

    const handleNotImplemented = () => {
        toast({
            title: "Feature Coming Soon",
            description: "This functionality is currently under development.",
        });
    }

    const openEditSheet = (student: Student) => {
        setSelectedStudent(student);
        setIsEditSheetOpen(true);
    }

    const handleClassFilterChange = useCallback((className: string) => {
        const currentClass = searchParams.get("class");
        const nextClass = currentClass === className ? null : className;
        router.push(`?${createQueryString({ class: nextClass, page: "1" })}`);
    }, [searchParams, router, createQueryString]);

    const handlePageChange = useCallback((page: number) => {
        router.push(`?${createQueryString({ page: page.toString() })}`);
    }, [router, createQueryString]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Student Management</CardTitle>
                <CardDescription>
                    Manage student profiles, admissions, and records.
                </CardDescription>
                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search by name, email, admission no..."
                            className="w-80"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-10 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter by Class
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuLabel>Filter by class</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {all_classes.map(c => (
                                    <DropdownMenuCheckboxItem
                                        key={c}
                                        checked={classFilter === c}
                                        onCheckedChange={() => handleClassFilterChange(c)}
                                    >
                                        {c}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-10 gap-1" onClick={handleNotImplemented}>
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                            <SheetTrigger asChild>
                                <Button className="h-10 gap-1">
                                    <PlusCircle className="h-4 w-4" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        New Registration
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="sm:max-w-3xl">
                                <SheetHeader>
                                    <SheetTitle>New Student Registration</SheetTitle>
                                    <SheetDescription>Please complete all steps to register a new student.</SheetDescription>
                                </SheetHeader>
                                <AddStudentForm onFormSubmit={handleAddStudent as any} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Admission No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Parent's Name</TableHead>
                            <TableHead>Contact Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.length > 0 ? students.map((student) => (
                            <TableRow key={student.studentId}>
                                <TableCell className="font-medium">{student.admissionNumber}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.className}</TableCell>
                                <TableCell>{student.parent}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>
                                    <Badge variant={student.status === 'Active' ? 'secondary' : 'destructive'}
                                        className={student.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                                        {student.status}
                                    </Badge>
                                </TableCell>
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
                                                <Link href={`/students/${student.studentId}`}>View Profile</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => openEditSheet(student)}>
                                                Edit Student
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href="/id-cards">Generate ID Card</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleNotImplemented}>Generate Admission Letter</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No students found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
                    <SheetContent className="sm:max-w-2xl">
                        <SheetHeader>
                            <SheetTitle>Edit Student Profile</SheetTitle>
                            <SheetDescription>Update the details for the selected student.</SheetDescription>
                        </SheetHeader>
                        {selectedStudent && <EditStudentForm student={selectedStudent as any} onFormSubmit={handleEditStudent as any} />}
                    </SheetContent>
                </Sheet>

            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{students.length}</strong> of <strong>{totalCount}</strong> students
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <div className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentPage >= totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
