
"use client"
import * as React from "react"
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddBookForm } from "@/components/forms/add-book-form"
import { getBooks, getStudents, type Book, deleteBook, addBook } from "@/app/lib/data"
import { ManageBorrowsSheet } from "@/components/manage-borrows-sheet"
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
import { toast } from "@/hooks/use-toast"

export default function BooksPage() {
  const [booksData, setBooksData] = React.useState(getBooks());
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isBorrowSheetOpen, setIsBorrowSheetOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = React.useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const students = getStudents();

  const refreshData = () => {
    setBooksData(getBooks());
  }

  const handleAddBook = (newBook: Omit<Book, 'bookId' | 'availableCopies'>) => {
    addBook(newBook);
    refreshData();
    setIsAddSheetOpen(false);
  }

  const handleOpenBorrowSheet = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowSheetOpen(true);
  }
  
  const confirmDeleteBook = () => {
    if (!bookToDelete) return;
    deleteBook(bookToDelete.bookId);
    refreshData();
    toast({
        title: "Book Deleted",
        description: `"${bookToDelete.title}" has been removed from the library.`,
    });
    setBookToDelete(null);
  }

  const filteredBooks = React.useMemo(() => {
    if (!searchQuery) return booksData;
    return booksData.filter(book => {
        const query = searchQuery.toLowerCase();
        return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.isbn.toLowerCase().includes(query)
        );
    });
  }, [booksData, searchQuery]);

  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Book Inventory</CardTitle>
                <CardDescription>Manage the library's book collection.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
                <Input 
                  placeholder="Search by title, author, ISBN..." 
                  className="w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Book
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add a New Book</SheetTitle>
                      <SheetDescription>Fill in the details to add a new book to the inventory.</SheetDescription>
                    </SheetHeader>
                    <AddBookForm onFormSubmit={handleAddBook} />
                  </SheetContent>
                </Sheet>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-center">Total Copies</TableHead>
              <TableHead className="text-center">Available</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.length > 0 ? filteredBooks.map(book => (
                 <TableRow key={book.bookId}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell className="text-center">{book.totalCopies}</TableCell>
                    <TableCell className="text-center">{book.availableCopies}</TableCell>
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
                          <DropdownMenuItem>Edit Book</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenBorrowSheet(book)}>Manage Borrows</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => setBookToDelete(book)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
            )) : (
              <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No books found.
                  </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    
    {bookToDelete && (
        <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the book "{bookToDelete.title}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={confirmDeleteBook}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete Book
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )}

    {selectedBook && (
        <ManageBorrowsSheet 
            book={selectedBook}
            students={students}
            isOpen={isBorrowSheetOpen}
            onOpenChange={setIsBorrowSheetOpen}
            onDataChange={refreshData}
        />
    )}
    </>
  )
}
