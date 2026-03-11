
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
import { getExtracurricularEvents, type ExtracurricularEvent } from "@/app/lib/data"
import { Badge } from "@/components/ui/badge"

export default function ExtracurricularEventsPage() {
    const [events, setEvents] = React.useState(getExtracurricularEvents())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Events Management</CardTitle>
        <CardDescription>
          Schedule and track participation for extracurricular events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Participants</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map(event => (
                    <TableRow key={event.eventId}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.clubName}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center">
                            <Badge>{event.participantCount}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
