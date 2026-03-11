
"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, Pencil, Trash2, Users, MapPin } from "lucide-react"
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
import {
  getRoutes,
  getVehicles,
  getDrivers,
  addRoute,
  updateRoute,
  deleteRoute,
  getStudentsOnRoute,
  assignStudentToRoute,
  getStudents,
  type Route
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AddRouteForm } from "@/components/forms/add-route-form"

export default function RoutesPage() {
  const [routes, setRoutes] = React.useState(getRoutes());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
  const [isManageStudentsOpen, setIsManageStudentsOpen] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [selectedRoute, setSelectedRoute] = React.useState<Route | null>(null);
  const [routeStudents, setRouteStudents] = React.useState<any[]>([]);

  const vehicles = getVehicles();
  const drivers = getDrivers();
  const allStudents = getStudents();

  const refreshRoutes = () => setRoutes(getRoutes());

  const getVehicleNumber = (vehicleId: string) => {
    return vehicles.find(v => v.vehicleId === vehicleId)?.vehicleNumber || "N/A";
  }

  const getDriverName = (driverId: string) => {
    return drivers.find(d => d.driverId === driverId)?.name || "N/A";
  }

  const handleAddRoute = (data: any) => {
    addRoute(data);
    refreshRoutes();
    setIsAddSheetOpen(false);
  }

  const handleUpdateRoute = (data: any) => {
    if (selectedRoute) {
      updateRoute(selectedRoute.routeId, data);
      refreshRoutes();
      setIsEditSheetOpen(false);
      setSelectedRoute(null);
    }
  }

  const handleDeleteRoute = () => {
    if (selectedRoute) {
      deleteRoute(selectedRoute.routeId);
      refreshRoutes();
      setIsDeleteAlertOpen(false);
      setSelectedRoute(null);
      toast({
        title: "Route Deleted",
        description: "The route has been successfully removed.",
      });
    }
  }

  const handleManageStudents = (route: Route) => {
    setSelectedRoute(route);
    setRouteStudents(getStudentsOnRoute(route.routeId));
    setIsManageStudentsOpen(true);
  }

  const handleAssignStudent = (studentId: string) => {
    if (selectedRoute) {
      assignStudentToRoute(studentId, selectedRoute.routeId);
      setRouteStudents(getStudentsOnRoute(selectedRoute.routeId));
      refreshRoutes();
      toast({
        title: "Student Assigned",
        description: "The student has been added to the route.",
      });
    }
  }

  const filteredRoutes = React.useMemo(() => {
    if (!searchQuery) return routes;
    const query = searchQuery.toLowerCase();
    return routes.filter(route =>
      route.routeName.toLowerCase().includes(query) ||
      getVehicleNumber(route.vehicleId).toLowerCase().includes(query) ||
      getDriverName(route.driverId).toLowerCase().includes(query)
    );
  }, [routes, searchQuery]);


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Route Management</CardTitle>
            <CardDescription>
              Create, edit, and assign routes to vehicles & drivers.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search routes..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
              <SheetTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Route
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add New Route</SheetTitle>
                  <SheetDescription>Fill in the details for the new route.</SheetDescription>
                </SheetHeader>
                <AddRouteForm drivers={drivers} vehicles={vehicles} onFormSubmit={handleAddRoute} />
              </SheetContent>
            </Sheet>

            <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Route</SheetTitle>
                  <SheetDescription>Modify route details and assignments.</SheetDescription>
                </SheetHeader>
                {selectedRoute && (
                  <AddRouteForm
                    drivers={drivers}
                    vehicles={vehicles}
                    onFormSubmit={handleUpdateRoute}
                    initialData={selectedRoute}
                  />
                )}
              </SheetContent>
            </Sheet>

            <Sheet open={isManageStudentsOpen} onOpenChange={setIsManageStudentsOpen}>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Manage Students - {selectedRoute?.routeName}</SheetTitle>
                  <SheetDescription>Assign students to this route.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Add Student</label>
                    <Select onValueChange={handleAssignStudent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Search student to assign..." />
                      </SelectTrigger>
                      <SelectContent>
                        {allStudents.map(student => (
                          <SelectItem key={student.studentId} value={student.studentId}>
                            {student.name} ({student.class})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Currently Assigned ({routeStudents.length})</h4>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {routeStudents.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">No students assigned to this route yet.</p>
                      ) : (
                        routeStudents.map(student => (
                          <div key={student.studentId} className="flex items-center justify-between p-2 border rounded-md">
                            <div>
                              <p className="text-sm font-medium">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.class}</p>
                            </div>
                            <Button size="sm" variant="ghost" className="text-destructive h-8 w-8 p-0" onClick={() => {
                              // Implementation of removal would go here, for now just toast
                              toast({ title: "Removed", description: `${student.name} removed from route.` });
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the route
                    {selectedRoute && ` ${selectedRoute.routeName}`} and remove all student assignments.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRoute} className="bg-destructive text-destructive-foreground">
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
              <TableHead>Route Name</TableHead>
              <TableHead>Assigned Vehicle</TableHead>
              <TableHead>Assigned Driver</TableHead>
              <TableHead className="text-center">Stops</TableHead>
              <TableHead className="text-center">Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoutes.map((route) => (
              <TableRow key={route.routeId}>
                <TableCell className="font-medium">{route.routeName}</TableCell>
                <TableCell>{getVehicleNumber(route.vehicleId)}</TableCell>
                <TableCell>{getDriverName(route.driverId)}</TableCell>
                <TableCell className="text-center">{route.stops}</TableCell>
                <TableCell className="text-center">{route.students}</TableCell>
                <TableCell>
                  <Badge variant={route.status === 'Active' ? 'secondary' : 'outline'} className={route.status === 'Active' ? "bg-green-100 text-green-800" : ""}>
                    {route.status}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => { setSelectedRoute(route); setIsEditSheetOpen(true); }}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit Route
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleManageStudents(route)}>
                        <Users className="mr-2 h-4 w-4" /> Manage Students
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "View on Map", description: "Showing " + route.routeName + " on map..." })}>
                        <MapPin className="mr-2 h-4 w-4" /> View on Map
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => { setSelectedRoute(route); setIsDeleteAlertOpen(true); }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Route
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
