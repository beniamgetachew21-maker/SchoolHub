
"use client"
import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import {
  type ClassSection,
  type Subject,
  type Employee,
  getSubjectsForClass,
  addSubjectToClass,
  removeSubjectFromClass,
} from "@/app/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash } from "lucide-react"

interface ManageSubjectsSheetProps {
  classSection: ClassSection
  allSubjects: Subject[]
  allTeachers: Employee[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onDataChange: () => void
}

export function ManageSubjectsSheet({
  classSection,
  allSubjects,
  allTeachers,
  isOpen,
  onOpenChange,
  onDataChange,
}: ManageSubjectsSheetProps) {
  const [assignedSubjects, setAssignedSubjects] = React.useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>("");
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<string>("");

  const teacherMap = React.useMemo(() => {
    return allTeachers.reduce((acc, teacher) => {
      acc[teacher.employeeId] = teacher
      return acc
    }, {} as Record<string, Employee>)
  }, [allTeachers])

  React.useEffect(() => {
    if (isOpen) {
      setAssignedSubjects(getSubjectsForClass(classSection.classId))
    }
  }, [isOpen, classSection.classId])

  const handleAddSubject = () => {
    if (!selectedSubjectId || !selectedTeacherId) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select both a subject and a teacher.",
      })
      return
    }

    try {
      addSubjectToClass(classSection.classId, selectedSubjectId, selectedTeacherId);
      toast({
        title: "Subject Assigned",
        description: "The subject has been assigned to the class.",
      })
      setSelectedSubjectId("")
      setSelectedTeacherId("")
      setAssignedSubjects(getSubjectsForClass(classSection.classId));
      onDataChange();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Assignment Failed",
        description: error.message,
      })
    }
  }
  
  const handleRemoveSubject = (subjectId: string) => {
     try {
        removeSubjectFromClass(classSection.classId, subjectId);
        toast({
            title: "Subject Removed",
        });
        setAssignedSubjects(getSubjectsForClass(classSection.classId));
        onDataChange();
    } catch (error: any) {
         toast({
            variant: "destructive",
            title: "Removal Failed",
            description: error.message,
        })
    }
  }

  const unassignedSubjects = allSubjects.filter(s => !assignedSubjects.some(as => as.subjectId === s.subjectId));


  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Manage Subjects for {classSection.name}</SheetTitle>
          <SheetDescription>
            Assign subjects and teachers to this class section.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Assign New Subject</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject..." />
                </SelectTrigger>
                <SelectContent>
                  {unassignedSubjects.map((subject) => (
                    <SelectItem key={subject.subjectId} value={subject.subjectId}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <Select value={selectedTeacherId} onValueChange={setSelectedTeacherId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher..." />
                </SelectTrigger>
                <SelectContent>
                  {allTeachers.map((teacher) => (
                    <SelectItem key={teacher.employeeId} value={teacher.employeeId}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <Button onClick={handleAddSubject} className="mt-2 w-full">
                Assign Subject
            </Button>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-4">Assigned Subjects</h4>
            <div className="space-y-3">
              {assignedSubjects.length > 0 ? (
                assignedSubjects.map((subject) => (
                  <div
                    key={subject.subjectId}
                    className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {subject.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Taught by: {teacherMap[subject.teacherId]?.name || 'N/A'}
                      </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemoveSubject(subject.subjectId)}
                    >
                       <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No subjects have been assigned to this class yet.
                </p>
              )}
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
