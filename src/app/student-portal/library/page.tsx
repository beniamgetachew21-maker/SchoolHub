
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBooks } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Hardcoded for demonstration.
const STUDENT_ID = "S001";

export default function StudentLibraryPage() {
  const [booksData, setBooksData] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [requestStatuses, setRequestStatuses] = React.useState<Record<number, string | undefined>>({});

  React.useEffect(() => {
    const fetchBooks = async () => {
        const books = await getBooks();
        setBooksData(books);
    };
    fetchBooks();
  }, []);

  const handleRequestBook = (bookId: number) => {
    // Mock request logic for now
    toast({
      title: "Request Sent",
      description: "Your request has been sent to the librarian for approval.",
    });
    setRequestStatuses(prev => ({ ...prev, [bookId]: "Pending" }));
  };

  const filteredBooks = React.useMemo(() => {
    if (!searchQuery) return booksData;
    return booksData.filter((book) => {
      const query = searchQuery.toLowerCase();
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query)
      );
    });
  }, [booksData, searchQuery]);

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
        case "Pending":
            return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
        case "Ready for Pickup":
            return <Badge className="bg-blue-100 text-blue-800">Ready for Pickup</Badge>;
        default:
            return null;
    }
  }


  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/student-portal"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <CardTitle className="font-headline font-black text-2xl">Library Catalog</CardTitle>
                    <CardDescription>
                    Browse and request books from the school library.
                    </CardDescription>
                </div>
            </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by title, author, ISBN..."
              className="w-64 bg-muted/20 border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-border/50 overflow-hidden">
            <Table>
            <TableHeader className="bg-muted/30">
                <TableRow>
                <TableHead className="font-black uppercase text-[10px] tracking-widest pl-6">Title</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Author</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Genre</TableHead>
                <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Available Copies</TableHead>
                <TableHead className="text-right pr-6 font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                    <TableRow key={book.bookId} className="hover:bg-muted/20 transition-colors group">
                    <TableCell className="font-black text-sm pl-6">{book.title}</TableCell>
                    <TableCell className="text-sm font-medium">{book.author}</TableCell>
                    <TableCell className="text-xs font-bold text-muted-foreground uppercase">{book.genre}</TableCell>
                    <TableCell className="text-center font-mono font-bold">
                        {book.availableCopies} / {book.totalCopies}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                        {requestStatuses[book.bookId] ? (
                            getStatusBadge(requestStatuses[book.bookId])
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 font-black text-[10px] uppercase tracking-widest border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-600"
                                onClick={() => handleRequestBook(book.bookId)}
                                disabled={book.availableCopies === 0}
                            >
                                Request Member Access
                            </Button>
                        )}
                    </TableCell>
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center text-muted-foreground italic font-medium">
                    No matching volumes discovered in the archives.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
