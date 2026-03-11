
"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, Linkedin, Mail, Edit } from "lucide-react"

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
import { getAlumni, addAlumnus, type Alumni, updateAlumnus } from "@/app/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddAlumnusForm } from "@/components/forms/add-alumnus-form"
import Link from "next/link"
import { EditAlumnusForm } from "@/components/forms/edit-alumnus-form"

export default function AlumniDirectoryPage() {
  const [alumniData, setAlumniData] = React.useState(getAlumni());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
  const [selectedAlumnus, setSelectedAlumnus] = React.useState<Alumni | null>(null);

  const refreshData = () => {
    setAlumniData(getAlumni());
  };

  const filteredAlumni = React.useMemo(() => {
    if (!searchQuery) return alumniData;
    const query = searchQuery.toLowerCase();
    return alumniData.filter(
      (alumnus) =>
        alumnus.name.toLowerCase().includes(query) ||
        alumnus.major.toLowerCase().includes(query) ||
        String(alumnus.graduationYear).includes(query) ||
        alumnus.currentCompany.toLowerCase().includes(query) ||
        alumnus.currentPosition.toLowerCase().includes(query)
    );
  }, [alumniData, searchQuery]);
  
  const handleAddAlumnus = (data: Omit<Alumni, 'alumniId' | 'avatarUrl' | 'email'>) => {
    addAlumnus(data as any); // Type assertion needed due to flexible fields
    refreshData();
    setIsAddSheetOpen(false);
  }
  
  const handleEditAlumnus = (data: Alumni) => {
    updateAlumnus(data);
    refreshData();
    setIsEditSheetOpen(false);
  }

  const openEditSheet = (alumnus: Alumni) => {
    setSelectedAlumnus(alumnus);
    setIsEditSheetOpen(true);
  }

  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Alumni Directory</CardTitle>
            <CardDescription>
              Connect with the network of Global Academy graduates.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by name, company, major..."
              className="w-72"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Alumnus
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Alumnus</SheetTitle>
                        <SheetDescription>Fill in the details for the new alumnus.</SheetDescription>
                    </SheetHeader>
                    <AddAlumnusForm onFormSubmit={handleAddAlumnus} />
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Graduation Year</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlumni.map((alumnus) => (
              <TableRow key={alumnus.alumniId}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={alumnus.avatarUrl} alt={alumnus.name} />
                        <AvatarFallback>{alumnus.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Link href={`/alumni/directory/${alumnus.alumniId}`} className="hover:underline">
                        {alumnus.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>{alumnus.graduationYear}</TableCell>
                <TableCell>{alumnus.major}</TableCell>
                <TableCell>
                    <div>
                        <p className="font-medium">{alumnus.currentPosition}</p>
                        <p className="text-sm text-muted-foreground">{alumnus.currentCompany}</p>
                    </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {alumnus.linkedinUrl && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={alumnus.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                     <Button variant="ghost" size="icon" asChild>
                        <a href={`mailto:${alumnus.email}`}>
                            <Mail className="h-4 w-4" />
                        </a>
                    </Button>
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
                            <Link href={`/alumni/directory/${alumnus.alumniId}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditSheet(alumnus)}>Edit Alumnus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
                <SheetTitle>Edit Alumnus</SheetTitle>
                <SheetDescription>Update the details for the alumnus.</SheetDescription>
            </SheetHeader>
            {selectedAlumnus && <EditAlumnusForm alumnus={selectedAlumnus} onFormSubmit={handleEditAlumnus} />}
        </SheetContent>
    </Sheet>
    </>
  )
}
