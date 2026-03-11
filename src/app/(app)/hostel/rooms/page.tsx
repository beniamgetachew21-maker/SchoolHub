
"use client"
import { MoreHorizontal, PlusCircle } from "lucide-react"
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
import { getRooms, getHostels, getStudentById, type Room, addRoom, allocateRoom, deallocateRoom, getStudents } from "@/app/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as React from "react"
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddRoomForm } from "@/components/forms/add-room-form"
import Link from "next/link"
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

export default function RoomsPage() {
  const [rooms, setRooms] = React.useState(getRooms());
  const hostels = getHostels();
  const students = getStudents();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isAllocateSheetOpen, setIsAllocateSheetOpen] = React.useState(false);
  const [roomToDeallocate, setRoomToDeallocate] = React.useState<Room | null>(null);

  const refreshData = () => {
    setRooms(getRooms());
  };

  const hostelMap = React.useMemo(() => {
    return hostels.reduce((acc, hostel) => {
      acc[hostel.hostelId] = hostel;
      return acc;
    }, {} as Record<string, typeof hostels[0]>);
  }, [hostels]);
  
  const filteredRooms = React.useMemo(() => {
    if (!searchQuery) return rooms;
    const query = searchQuery.toLowerCase();
    return rooms.filter(room => 
        room.roomNumber.toLowerCase().includes(query) ||
        (hostelMap[room.hostelId]?.name || '').toLowerCase().includes(query) ||
        (room.studentId ? (getStudentById(room.studentId)?.name || '') : '').toLowerCase().includes(query)
    );
  }, [rooms, searchQuery, hostelMap]);

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case "Occupied":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Occupied</Badge>;
      case "Vacant":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Vacant</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const handleNotImplemented = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This functionality is currently under development.",
    });
  }

  const handleAddRoom = (data: Omit<Room, 'roomId' | 'status' | 'studentId'>) => {
    addRoom(data);
    refreshData();
    setIsAddSheetOpen(false);
  }

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

  const unallocatedStudents = React.useMemo(() => students.filter(s => !rooms.some(r => r.studentId === s.studentId)), [students, rooms]);
  const vacantRooms = React.useMemo(() => rooms.filter(r => r.status === 'Vacant'), [rooms]);


  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Room Management</CardTitle>
            <CardDescription>
              View room status and manage allocations.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input 
                placeholder="Search rooms..." 
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Room
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Room</SheetTitle>
                        <SheetDescription>Fill in the details for the new room.</SheetDescription>
                    </SheetHeader>
                    <AddRoomForm hostels={hostels} onFormSubmit={handleAddRoom} />
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Rooms</TabsTrigger>
            <TabsTrigger value="vacant">Vacant</TabsTrigger>
            <TabsTrigger value="occupied">Occupied</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <RoomsTable rooms={filteredRooms} hostelMap={hostelMap} getStatusBadge={getStatusBadge} onDeallocateClick={setRoomToDeallocate} onAllocateClick={() => setIsAllocateSheetOpen(true)} />
          </TabsContent>
          <TabsContent value="vacant" className="mt-4">
            <RoomsTable rooms={filteredRooms.filter(r => r.status === 'Vacant')} hostelMap={hostelMap} getStatusBadge={getStatusBadge} onDeallocateClick={setRoomToDeallocate} onAllocateClick={() => setIsAllocateSheetOpen(true)} />
          </TabsContent>
          <TabsContent value="occupied" className="mt-4">
            <RoomsTable rooms={filteredRooms.filter(r => r.status === 'Occupied')} hostelMap={hostelMap} getStatusBadge={getStatusBadge} onDeallocateClick={setRoomToDeallocate} onAllocateClick={() => setIsAllocateSheetOpen(true)} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>

    <Sheet open={isAllocateSheetOpen} onOpenChange={setIsAllocateSheetOpen}>
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

    {roomToDeallocate && (
        <AlertDialog open={!!roomToDeallocate} onOpenChange={() => setRoomToDeallocate(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will de-allocate {getStudentById(roomToDeallocate.studentId!)?.name} from room {roomToDeallocate.roomNumber}. The room will become vacant.
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

function RoomsTable({ rooms, hostelMap, getStatusBadge, onDeallocateClick, onAllocateClick }: { rooms: Room[], hostelMap: Record<string, any>, getStatusBadge: (status: Room['status']) => JSX.Element, onDeallocateClick: (room: Room) => void, onAllocateClick: () => void }) {
    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room Number</TableHead>
              <TableHead>Hostel</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Occupant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => {
              const student = room.studentId ? getStudentById(room.studentId) : null;
              return (
                <TableRow key={room.roomId}>
                  <TableCell className="font-medium">{room.roomNumber}</TableCell>
                  <TableCell>{hostelMap[room.hostelId]?.name || 'N/A'}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{student?.name || "N/A"}</TableCell>
                  <TableCell>{getStatusBadge(room.status)}</TableCell>
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
                        {room.status === 'Vacant' && (
                            <DropdownMenuItem onClick={onAllocateClick}>Allocate Student</DropdownMenuItem>
                        )}
                        {room.status === 'Occupied' && (
                            <DropdownMenuItem className="text-destructive" onClick={() => onDeallocateClick(room)}>
                                De-allocate Student
                            </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
             {rooms.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No rooms to display in this category.
                    </TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
    )
}
