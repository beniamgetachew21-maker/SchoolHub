
"use client"
import { Bed, Building, Users, UserCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHostels, getEmployeeById, type Hostel } from "@/app/lib/data";
import { Badge } from "@/components/ui/badge";

export default function HostelDashboardPage() {
    const hostels = getHostels();

    const totalCapacity = hostels.reduce((acc, h) => acc + h.totalRooms, 0);
    const totalOccupancy = hostels.reduce((acc, h) => acc + h.occupiedRooms, 0);
    const occupancyPercentage = totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;
    const availableRooms = totalCapacity - totalOccupancy;

  return (
    <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalCapacity} Rooms</div>
                    <p className="text-xs text-muted-foreground">Across all hostels</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Occupancy</CardTitle>
                    <Bed className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{occupancyPercentage.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">{totalOccupancy} / {totalCapacity} rooms occupied</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
                    <Bed className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{availableRooms}</div>
                    <p className="text-xs text-muted-foreground">Ready for allocation</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{hostels.length}</div>
                    <p className="text-xs text-muted-foreground">{hostels.filter(h => h.type === 'Boys').length} Boys, {hostels.filter(h => h.type === 'Girls').length} Girls</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Hostel Overview</CardTitle>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Hostel Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Warden</TableHead>
                            <TableHead className="text-center">Occupancy</TableHead>
                            <TableHead className="text-right">Capacity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hostels.map(hostel => {
                            const warden = getEmployeeById(hostel.wardenId);
                            const occupancyRate = (hostel.occupiedRooms / hostel.totalRooms) * 100;
                            return (
                                <TableRow key={hostel.hostelId}>
                                    <TableCell className="font-medium">{hostel.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={hostel.type === 'Boys' ? 'default' : 'secondary'}>{hostel.type}</Badge>
                                    </TableCell>
                                    <TableCell>{warden?.name || 'N/A'}</TableCell>
                                    <TableCell className="text-center">{hostel.occupiedRooms} / {hostel.totalRooms} ({occupancyRate.toFixed(0)}%)</TableCell>
                                    <TableCell className="text-right">{hostel.totalRooms}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
