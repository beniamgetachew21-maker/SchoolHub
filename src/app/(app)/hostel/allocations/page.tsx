
"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, UserX } from "lucide-react"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
    getRooms, 
    getStudents, 
    getHostels, 
    allocateRoom, 
    deallocateRoom, 
    type Room, 
    type Student, 
    type Hostel 
} from "@/app/lib/data"
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AllocateRoomForm } from "@/components/forms/allocate-room-form"
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

export default function AllocationsPage() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [hostels, setHostels] = React.useState<Hostel[]>([]);
  const [isAllocateSheetOpen, setIsAllocateSheetOpen] = React.useState(false);
  const [roomToDeallocate, setRoomToDeallocate] = React.useState<Room | null>(null);

  const refreshData = () => {
    setRooms(getRooms());
    setStudents(getStudents());
    setHostels(getHostels());
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const hostelMap = React.useMemo(() => hostels.reduce((acc, h) => ({ ...acc, [h.hostelId]: h }), {} as Record<string, Hostel>), [hostels]);
  const studentMap = React.useMemo(() => students.reduce((acc, s) => ({ ...acc, [s.studentId]: s }), {} as Record<string, Student>), [students]);

  const allocatedRooms = React.useMemo(() => rooms.filter(r => r.status === 'Occupied' && r.studentId), [rooms]);
  const unallocatedStudents = React.useMemo(() => students.filter(s => !rooms.some(r => r.studentId === s.studentId)), [students, rooms]);
  const vacantRooms = React.useMemo(() => rooms.filter(r => r.status === 'Vacant'), [rooms]);

  const handleAllocateRoom = (data: { studentId: string, roomId: string }) => {
    try {
      allocateRoom(data.roomId, data.studentId);
      toast({
        title: "Room Allocated",
        description: "The student has been successfully assigned to the room.",
      });
      refreshData();
      setIsAllocateSheetOpen(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Allocation Failed", description: error.message });
    }
  };

  const handleConfirmDeallocate = () => {
    if (!roomToDeallocate) return;
    try {
      deallocateRoom(roomToDeallocate.roomId);
      toast({
        title: "Room De-allocated",
        description: "The student has been unassigned from the room.",
      });
      refreshData();
      setRoomToDeallocate(null);
    } catch (error: any) {
      toast({ variant: "destructive", title: "De-allocation Failed", description: error.message });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline">Room Allocations</CardTitle>
              <CardDescription>
                Assign students to vacant rooms and manage existing allocations.
              </CardDescription>
            </div>
            <Sheet open={isAllocateSheetOpen} onOpenChange={setIsAllocateSheetOpen}>
              <SheetTrigger asChild>
                  <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Allocate Room
                  </Button>
              </SheetTrigger>
              <SheetContent>
                  <SheetHeader>
                      <SheetTitle>Allocate a Room</SheetTitle>
                      <SheetDescription>Assign a student to a vacant room.</SheetDescription>
                  </SheetHeader>
                  <AllocateRoomForm 
                      students={unallocatedStudents} 
                      rooms={vacantRooms} 
                      hostels={hostels}
                      onFormSubmit={handleAllocateRoom} 
                  />
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No.</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocatedRooms.map((room) => {
                  const student = room.studentId ? studentMap[room.studentId] : null;
                  const hostel = hostelMap[room.hostelId];
                  return (
                    <TableRow key={room.roomId}>
                      <TableCell className="font-medium">{room.roomNumber}</TableCell>
                      <TableCell>{hostel?.name}</TableCell>
                      <TableCell>{student?.name || 'N/A'}</TableCell>
                      <TableCell>{student?.class || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => setRoomToDeallocate(room)}>
                            <UserX className="mr-2 h-4 w-4" />
                            De-allocate
                          </Button>
                      </TableCell>
                    </TableRow>
                  )
              })}
               {allocatedRooms.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                          No rooms are currently allocated to students.
                      </TableCell>
                  </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {roomToDeallocate && (
          <AlertDialog open={!!roomToDeallocate} onOpenChange={() => setRoomToDeallocate(null)}>
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                          This will de-allocate {studentMap[roomToDeallocate.studentId!]?.name} from room {roomToDeallocate.roomNumber}. The room will become vacant.
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                          onClick={handleConfirmDeallocate}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          De-allocate
                      </AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
      )}
    </>
  )
}
