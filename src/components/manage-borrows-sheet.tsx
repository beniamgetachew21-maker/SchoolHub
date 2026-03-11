
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
  type Book,
  type Student,
  type BorrowRecord,
  getBorrowRecordsForBook,
  borrowBook,
  returnBook,
} from "@/app/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "./ui/badge"

interface ManageBorrowsSheetProps {
  book: Book
  students: Student[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onDataChange: () => void
}

export function ManageBorrowsSheet({
  book,
  students,
  isOpen,
  onOpenChange,
  onDataChange,
}: ManageBorrowsSheetProps) {
  const [borrowRecords, setBorrowRecords] = React.useState<BorrowRecord[]>([]);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>("");

  const studentMap = React.useMemo(() => {
    return students.reduce((acc, student) => {
      acc[student.studentId] = student
      return acc
    }, {} as Record<string, Student>)
  }, [students])

  React.useEffect(() => {
    if (isOpen) {
      setBorrowRecords(getBorrowRecordsForBook(book.bookId))
    }
  }, [isOpen, book.bookId])

  const handleBorrow = () => {
    if (!selectedStudentId) {
      toast({
        variant: "destructive",
        title: "No Student Selected",
        description: "Please select a student to borrow the book.",
      })
      return
    }

    try {
      borrowBook(book.bookId, selectedStudentId)
      toast({
        title: "Book Borrowed",
        description: `"${book.title}" has been borrowed by ${studentMap[selectedStudentId].name}.`,
      })
      setSelectedStudentId("")
      setBorrowRecords(getBorrowRecordsForBook(book.bookId)) // Refresh records list
      onDataChange() // Refresh the main book list
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Borrow Failed",
        description: error.message,
      })
    }
  }
  
  const handleReturn = (recordId: number) => {
    try {
        returnBook(recordId);
        toast({
            title: "Book Returned",
            description: `"${book.title}" has been successfully returned.`,
        });
        setBorrowRecords(getBorrowRecordsForBook(book.bookId)); // Refresh records list
        onDataChange(); // Refresh the main book list
    } catch (error: any) {
         toast({
            variant: "destructive",
            title: "Return Failed",
            description: error.message,
        })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Manage Borrows for "{book.title}"</SheetTitle>
          <SheetDescription>
            Available Copies: {book.availableCopies} / {book.totalCopies}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Borrow This Book</h4>
            <div className="flex gap-2">
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a student..." />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.studentId} value={student.studentId}>
                      {student.name} ({student.class})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleBorrow} disabled={book.availableCopies === 0}>
                Borrow
              </Button>
            </div>
             {book.availableCopies === 0 && <p className="text-xs text-destructive mt-2">No copies available to borrow.</p>}
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-4">Currently Borrowed By</h4>
            <div className="space-y-3">
              {borrowRecords.length > 0 ? (
                borrowRecords.map((record) => (
                  <div
                    key={record.recordId}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {studentMap[record.studentId]?.name || "Unknown Student"}
                      </p>
                      <p className="text-muted-foreground">
                        Due: {new Date(record.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReturn(record.recordId)}
                    >
                        Return
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No one is currently borrowing this book.
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
