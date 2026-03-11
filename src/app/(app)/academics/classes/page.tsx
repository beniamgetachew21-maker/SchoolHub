
"use client"
import { MoreHorizontal, PlusCircle } from "lucide-react"
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
import { getClasses, getEmployees, type Employee, type ClassSection, addClass, updateClass, deleteClass, getSubjects, addSubjectToClass, removeSubjectFromClass } from "@/app/lib/data"
import { toast } from "@/hooks/use-toast"
import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AddClassForm } from "@/components/forms/add-class-form"
import { EditClassForm } from "@/components/forms/edit-class-form"
import { ManageSubjectsSheet } from "@/components/manage-subjects-sheet"
import Link from "next/link"

export default function ClassesPage() {
  const [classes, setClasses] = React.useState(getClasses());
  const [employees, setEmployees] = React.useState(getEmployees());
  const [subjects, setSubjects] = React.useState(getSubjects());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
  const [isSubjectsSheetOpen, setIsSubjectsSheetOpen] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<ClassSection | null>(null);
  const [classToDelete, setClassToDelete] = React.useState<ClassSection | null>(null);

  const refreshData = () => {
    setClasses(getClasses());
    // Also refresh subjects in case they are updated elsewhere, though not currently possible
    setSubjects(getSubjects()); 
  };

  const employeeMap = React.useMemo(() => {
    return employees.reduce((acc, employee) => {
      acc[employee.employeeId] = employee;
      return acc;
    }, {} as Record<string, Employee>);
  }, [employees]);
  
  const filteredClasses = React.useMemo(() => {
    if (!searchQuery) return classes;
    const query = searchQuery.toLowerCase();
    return classes.filter(c => 
        c.name.toLowerCase().includes(query) ||
        (employeeMap[c.classTeacherId]?.name || '').toLowerCase().includes(query)
    );
  }, [classes, searchQuery, employeeMap]);
  
  const handleNotImplemented = () => {
    toast({
        title: "Feature In Progress",
        description: "This functionality is currently under development and will be available soon.",
    });
  }

  const handleAddClass = (data: Omit<ClassSection, 'classId' | 'studentCount' | 'subjectCount'>) => {
    addClass(data);
    refreshData();
    setIsAddSheetOpen(false);
  };
  
  const handleEditClass = (data: ClassSection) => {
    updateClass(data);
    refreshData();
    setIsEditSheetOpen(false);
  }

  const openEditSheet = (cls: ClassSection) => {
    setSelectedClass(cls);
    setIsEditSheetOpen(true);
  }

  const openSubjectsSheet = (cls: ClassSection) => {
    setSelectedClass(cls);
    setIsSubjectsSheetOpen(true);
  }
  
  const confirmDeleteClass = () => {
    if (!classToDelete) return;
    deleteClass(classToDelete.classId);
    refreshData();
    toast({
        title: "Class Deleted",
        description: `"${classToDelete.name}" has been removed.`,
    });
    setClassToDelete(null);
  }


  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Classes & Subjects</CardTitle>
                <CardDescription>Manage class sections, and assign subjects.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
                <Input 
                    placeholder="Search classes..." 
                    className="w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                 <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                    <SheetTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Class
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add New Class</SheetTitle>
                            <SheetDescription>Fill in the details for the new class section.</SheetDescription>
                        </SheetHeader>
                        <AddClassForm teachers={employees.filter(e => e.department === 'Academics')} onFormSubmit={handleAddClass} />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead className="text-center">No. of Students</TableHead>
              <TableHead className="text-center">No. of Subjects</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.map(c => (
                 <TableRow key={c.classId}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{employeeMap[c.classTeacherId]?.name || 'N/A'}</TableCell>
                    <TableCell className="text-center">{c.studentCount}</TableCell>
                    <TableCell className="text-center">{c.subjectCount}</TableCell>
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
                          <DropdownMenuItem onClick={() => openEditSheet(c)}>Edit Class</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openSubjectsSheet(c)}>Manage Subjects</DropdownMenuItem>
                           <DropdownMenuItem asChild>
                                <Link href={`/academics/timetable/${c.classId}`}>View Timetable</Link>
                           </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => setClassToDelete(c)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    
    <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
      <SheetContent>
          <SheetHeader>
              <SheetTitle>Edit Class</SheetTitle>
              <SheetDescription>Update the details for the class section.</SheetDescription>
          </SheetHeader>
          {selectedClass && (
            <EditClassForm 
                classData={selectedClass}
                teachers={employees.filter(e => e.department === 'Academics')} 
                onFormSubmit={handleEditClass} 
            />
          )}
      </SheetContent>
    </Sheet>
    
    {classToDelete && (
        <AlertDialog open={!!classToDelete} onOpenChange={() => setClassToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the class "{classToDelete.name}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={confirmDeleteClass}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete Class
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )}

    {selectedClass && (
        <ManageSubjectsSheet
            classSection={selectedClass}
            allSubjects={subjects}
            allTeachers={employees.filter(e => e.department === 'Academics')}
            isOpen={isSubjectsSheetOpen}
            onOpenChange={setIsSubjectsSheetOpen}
            onDataChange={refreshData}
        />
    )}
    </>
  )
}
