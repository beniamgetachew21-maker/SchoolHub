
"use client";
import * as React from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getVendors, addVendor, updateVendor, deleteVendor, getPurchaseOrdersByVendor, type Vendor, type PurchaseOrder } from "@/app/lib/data";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { AddVendorForm } from "@/components/forms/add-vendor-form";

export default function VendorsPage() {
  const [vendors, setVendors] = React.useState(getVendors());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
  const [isHistorySheetOpen, setIsHistorySheetOpen] = React.useState(false);
  const [selectedVendor, setSelectedVendor] = React.useState<Vendor | null>(null);
  const [vendorHistory, setVendorHistory] = React.useState<PurchaseOrder[]>([]);

  const refreshVendors = () => {
    setVendors(getVendors());
  };

  const handleNotImplemented = () => {
    toast({
      title: "Feature Coming Soon",
      description: "This functionality is currently under development.",
    });
  };

  const handleAddVendor = (data: Omit<Vendor, 'vendorId'>) => {
    addVendor(data);
    refreshVendors();
    setIsAddSheetOpen(false);
  };

  const handleUpdateVendor = (data: Omit<Vendor, 'vendorId'>) => {
    if (selectedVendor) {
      updateVendor(selectedVendor.vendorId, data);
      refreshVendors();
      setIsEditSheetOpen(false);
    }
  };

  const handleDeleteVendor = (vendorId: string) => {
    deleteVendor(vendorId);
    refreshVendors();
    toast({
      title: "Vendor Deleted",
      description: "The vendor has been removed.",
    });
  }

  const handleViewHistory = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setVendorHistory(getPurchaseOrdersByVendor(vendor.vendorId));
    setIsHistorySheetOpen(true);
  }

  const handleEditClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsEditSheetOpen(true);
  }

  const filteredVendors = React.useMemo(() => {
    if (!searchQuery) return vendors;
    const query = searchQuery.toLowerCase();
    return vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(query) ||
      vendor.contactPerson.toLowerCase().includes(query)
    );
  }, [vendors, searchQuery]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Vendor Management</CardTitle>
            <CardDescription>
              Manage suppliers for procurement and purchasing.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search vendors..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
              <SheetTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Vendor
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add New Vendor</SheetTitle>
                  <SheetDescription>Fill in the details for the new supplier.</SheetDescription>
                </SheetHeader>
                <AddVendorForm onFormSubmit={handleAddVendor} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVendors.map((vendor) => (
              <TableRow key={vendor.vendorId}>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.contactPerson}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditClick(vendor)}>Edit Vendor</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewHistory(vendor)}>View PO History</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteVendor(vendor.vendorId)} className="text-destructive">Delete Vendor</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Vendor</SheetTitle>
            <SheetDescription>Update the details for {selectedVendor?.name}.</SheetDescription>
          </SheetHeader>
          {selectedVendor && <AddVendorForm onFormSubmit={handleUpdateVendor} initialData={selectedVendor} />}
        </SheetContent>
      </Sheet>

      <Sheet open={isHistorySheetOpen} onOpenChange={setIsHistorySheetOpen}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Purchase Order History: {selectedVendor?.name}</SheetTitle>
            <SheetDescription>View all past requisitions and orders for this supplier.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorHistory.length > 0 ? (
                  vendorHistory.map((po) => (
                    <TableRow key={po.poId}>
                      <TableCell className="font-mono text-xs">{po.poId}</TableCell>
                      <TableCell>{new Date(po.orderDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">${po.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{po.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">No order history found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
