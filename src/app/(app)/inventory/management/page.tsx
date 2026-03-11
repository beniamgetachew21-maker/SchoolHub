
"use client";
import * as React from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { getInventoryItems, addInventoryItem, type InventoryItem, updateItemForSaleStatus } from "@/app/lib/data";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { AddInventoryItemForm } from "@/components/forms/add-inventory-item-form";
import { Switch } from "@/components/ui/switch";

export default function InventoryManagementPage() {
  const [items, setItems] = React.useState(getInventoryItems());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

  const refreshData = () => {
    setItems(getInventoryItems());
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleNotImplemented = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This functionality is currently under development.",
    });
  };

  const handleAddItem = (data: Omit<InventoryItem, 'itemId' | 'status' | 'isForSale'>) => {
    addInventoryItem(data);
    setItems(getInventoryItems());
    setIsAddSheetOpen(false);
  };

  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const handleSaleStatusChange = (itemId: string, isForSale: boolean) => {
    updateItemForSaleStatus(itemId, isForSale);
    refreshData();
    toast({
        title: "Store Item Updated",
        description: `The item is now ${isForSale ? 'available' : 'unavailable'} in the online store.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">All Inventory Items</CardTitle>
            <CardDescription>
              Track and manage all school materials and supplies.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Input 
                placeholder="Search items..." 
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Item
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Inventory Item</SheetTitle>
                        <SheetDescription>Fill in the details for the new material or supply.</SheetDescription>
                    </SheetHeader>
                    <AddInventoryItemForm onFormSubmit={handleAddItem} />
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sell Online</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell className="font-mono text-xs">{item.itemId}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.isForSale}
                    onCheckedChange={(checked) => handleSaleStatusChange(item.itemId, checked)}
                    aria-label="Toggle item for sale"
                  />
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
                      <DropdownMenuItem onClick={handleNotImplemented}>Edit Item</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleNotImplemented}>Update Stock</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleNotImplemented}>View History</DropdownMenuItem>
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
