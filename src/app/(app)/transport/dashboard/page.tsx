
"use client"
import Image from "next/image";
import { AlertTriangle, Bus, Car, Route as RouteIcon, UserCheck, UserX, Map } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";

const kpiData = {
    activeRoutes: 2,
    vehiclesAvailable: 2,
    driversOnDuty: 2,
    studentsTransported: 77,
};

const recentAlerts = [
    { id: 1, type: "Delay", message: "Route A is running 15 minutes late due to traffic.", time: "5 mins ago", level: "warning" },
    { id: 2, type: "Breakdown", message: "Vehicle BUS-03 reported a breakdown.", time: "30 mins ago", level: "destructive" },
    { id: 3, type: "Info", message: "Driver John Smith has started Route A.", time: "1 hour ago", level: "info" },
];

export default function TransportDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
                    <RouteIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpiData.activeRoutes}</div>
                    <p className="text-xs text-muted-foreground">Currently operational</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vehicles Available</CardTitle>
                    <Bus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpiData.vehiclesAvailable} / 3</div>
                    <p className="text-xs text-muted-foreground">2 Active, 1 Maintenance</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Drivers On-Duty</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpiData.driversOnDuty} / 3</div>
                    <p className="text-xs text-muted-foreground">1 On Leave</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Students Transported</CardTitle>
                    <UserX className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpiData.studentsTransported}</div>
                    <p className="text-xs text-muted-foreground">Today so far</p>
                </CardContent>
            </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Live Alerts</CardTitle>
                    <CardDescription>Real-time updates and incidents from the transport fleet.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Type</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead className="w-[150px]">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentAlerts.map(alert => (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <Badge variant={alert.level === 'destructive' ? 'destructive' : 'outline'}>
                                            {alert.level === 'destructive' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                            {alert.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{alert.message}</TableCell>
                                    <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Map className="h-5 w-5"/>
                        Live Route Map
                    </CardTitle>
                    <CardDescription>Real-time overview of all active bus routes.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative aspect-video w-full">
                        <Image 
                            src="https://picsum.photos/seed/map1/800/450" 
                            alt="Map of bus routes" 
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="city map routes"
                            className="rounded-b-lg"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

    </div>
  )
}
