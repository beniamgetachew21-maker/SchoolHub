
"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, Pencil, Trash2, UserPlus, ClipboardList } from "lucide-react"
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
  TableRow
} from "@/components/ui/table"
import {
  getVehicles,
  getDrivers,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  type Vehicle
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
import { AddVehicleForm } from "@/components/forms/add-vehicle-form"

interface VehiclesClientProps {
  initialVehicles: any[];
  drivers: any[];
}

export default function VehiclesClient({ initialVehicles, drivers }: VehiclesClientProps) {
  const [vehicles, setVehicles] = React.useState(initialVehicles);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);

  // Update local state when initialVehicles prop changes (e.g., after a parent re-fetch)
  React.useEffect(() => {
    setVehicles(initialVehicles);
  }, [initialVehicles]);

  const getDriverName = (driverId: string | null) => {
    if (!driverId) return "Unassigned";
    return drivers.find(d => d.driverId === driverId)?.name || "Unassigned";
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "Maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Maintenance</Badge>;
      case "Inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAddVehicle = (data: any) => {
    toast({ title: "Note", description: "Vehicle creation backend pending." });
    setIsAddSheetOpen(false);
  }

  const handleUpdateVehicle = (data: any) => {
    toast({ title: "Note", description: "Vehicle update backend pending." });
    setIsEditSheetOpen(false);
    setSelectedVehicle(null);
  }

  const handleDeleteVehicle = () => {
    toast({ title: "Note", description: "Vehicle deletion backend pending." });
    setIsDeleteAlertOpen(false);
    setSelectedVehicle(null);
  }

  const handleEditClick = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsEditSheetOpen(true);
  }

  const handleDeleteClick = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsDeleteAlertOpen(true);
  }

  const filteredVehicles = React.useMemo(() => {
    if (!searchQuery) return vehicles;
    const query = searchQuery.toLowerCase();
    return vehicles.filter(vehicle =>
      vehicle.vehicleNumber.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      getDriverName(vehicle.driverId).toLowerCase().includes(query)
    );
  }, [vehicles, searchQuery]);


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Vehicle Management</CardTitle>
            <CardDescription>
              Register vehicles, track maintenance, and manage assignments.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search vehicles..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
              <SheetTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Vehicle
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add New Vehicle</SheetTitle>
                  <SheetDescription>Fill in the details for the new vehicle.</SheetDescription>
                </SheetHeader>
                <AddVehicleForm onFormSubmit={handleAddVehicle} drivers={drivers} />
              </SheetContent>
            </Sheet>

            <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Vehicle</SheetTitle>
                  <SheetDescription>Modify vehicle details or change driver assignment.</SheetDescription>
                </SheetHeader>
                {selectedVehicle && (
                  <AddVehicleForm
                    onFormSubmit={handleUpdateVehicle}
                    initialData={selectedVehicle}
                    drivers={drivers}
                  />
                )}
              </SheetContent>
            </Sheet>

            <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the vehicle
                    {selectedVehicle && ` ${selectedVehicle.vehicleNumber}`} and remove its data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteVehicle} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle Number</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-center">Capacity</TableHead>
              <TableHead>Assigned Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.vehicleId}>
                <TableCell className="font-medium">{vehicle.vehicleNumber}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell className="text-center">{vehicle.capacity}</TableCell>
                <TableCell>{getDriverName(vehicle.driverId)}</TableCell>
                <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditClick(vehicle)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit Vehicle
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditClick(vehicle)}>
                        <UserPlus className="mr-2 h-4 w-4" /> Assign Driver
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "Opening Logs", description: "Maintenance logs for " + vehicle.vehicleNumber })}>
                        <ClipboardList className="mr-2 h-4 w-4" /> Maintenance Logs
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteClick(vehicle)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Vehicle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
