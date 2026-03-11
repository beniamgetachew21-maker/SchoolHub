
"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAlumniEvents, type AlumniEvent, addAlumniEvent } from "@/app/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AddAlumniEventForm } from "@/components/forms/add-alumni-event-form"

export default function AlumniEventsPage() {
    const [events, setEvents] = React.useState(getAlumniEvents())
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    const refreshData = () => {
        setEvents(getAlumniEvents());
    };

    const handleAddEvent = (data: Omit<AlumniEvent, 'eventId' | 'rsvpCount'>) => {
        addAlumniEvent(data);
        refreshData();
        setIsAddSheetOpen(false);
    }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Alumni Events</CardTitle>
                <CardDescription>
                Manage and view upcoming alumni events and reunions.
                </CardDescription>
            </div>
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Event
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Create New Alumni Event</SheetTitle>
                        <SheetDescription>Fill in the details for the new event.</SheetDescription>
                    </SheetHeader>
                    <AddAlumniEventForm onFormSubmit={handleAddEvent} />
                </SheetContent>
            </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">RSVPs</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map(event => (
                    <TableRow key={event.eventId}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell className="text-center">
                            <Badge>{event.rsvpCount}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
