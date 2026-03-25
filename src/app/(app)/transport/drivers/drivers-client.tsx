
"use client"
import * as React from "react"
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
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddDriverForm } from "@/components/forms/add-driver-form"

interface DriversClientProps {
  initialDrivers: any[];
  routes: any[];
}

export default function DriversClient({ initialDrivers, routes }: DriversClientProps) {
  const [drivers, setDrivers] = React.useState(initialDrivers);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "On Leave":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">On Leave</Badge>;
      case "Inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const findRouteForDriver = (driverId: string) => {
    return routes.find(r => r.driverId === driverId && r.status === 'Active');
  }
  
  const handleNotImplemented = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This functionality is currently under development.",
    });
  }

  const handleAddDriver = (data: any) => {
    // addDriver(data);
    // setDrivers(getDrivers());
    toast({ title: "Note", description: "Driver creation backend pending." });
    setIsAddSheetOpen(false);
  }

  const filteredDrivers = React.useMemo(() => {
    if (!searchQuery) return drivers;
    const query = searchQuery.toLowerCase();
    return drivers.filter(driver => 
        driver.name.toLowerCase().includes(query) ||
        driver.licenseNumber.toLowerCase().includes(query)
    );
  }, [drivers, searchQuery]);


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Driver Management</CardTitle>
            <CardDescription>
              Add, edit, and manage driver profiles and assignments.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input 
                placeholder="Search drivers..." 
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Driver
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Driver</SheetTitle>
                        <SheetDescription>Fill in the details for the new driver.</SheetDescription>
                    </SheetHeader>
                    <AddDriverForm onFormSubmit={handleAddDriver} />
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver Name</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Assigned Route</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.map((driver) => {
                const assignedRoute = findRouteForDriver(driver.driverId);
                return (
                  <TableRow key={driver.driverId}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.licenseNumber}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{assignedRoute?.routeName || 'N/A'}</TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
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
                          <DropdownMenuItem onClick={handleNotImplemented}>Edit Driver</DropdownMenuItem>
                          <DropdownMenuItem onClick={handleNotImplemented}>View Schedule</DropdownMenuItem>
                          <DropdownMenuItem onClick={handleNotImplemented}>Assign Route</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
