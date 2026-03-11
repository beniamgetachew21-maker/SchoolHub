
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  getPurchaseOrders,
  getVendors,
  getInventoryItems,
  addPurchaseOrder,
  updatePurchaseOrderStatus,
  type PurchaseOrder,
  type Vendor,
  type InventoryItem
} from "@/app/lib/data"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddPurchaseOrderForm } from "@/components/forms/add-purchase-order-form"

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = React.useState(getPurchaseOrders());
  const [vendors, setVendors] = React.useState(getVendors());
  const [items, setItems] = React.useState(getInventoryItems());
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

  const vendorMap = React.useMemo(() => vendors.reduce((acc, v) => ({ ...acc, [v.vendorId]: v }), {} as Record<string, Vendor>), [vendors]);
  const itemMap = React.useMemo(() => items.reduce((acc, i) => ({ ...acc, [i.itemId]: i }), {} as Record<string, InventoryItem>), [items]);


  const getStatusBadge = (status: PurchaseOrder['status']) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "Approved":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Approved</Badge>;
      case "Ordered":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ordered</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleUpdateStatus = (poId: string, status: PurchaseOrder['status']) => {
    updatePurchaseOrderStatus(poId, status);
    setOrders(getPurchaseOrders());
    toast({
      title: `PO ${status}`,
      description: `Purchase order ${poId} has been ${status.toLowerCase()}.`,
    });
  }

  const handleAddOrder = (data: Omit<PurchaseOrder, 'poId' | 'status' | 'orderDate' | 'totalAmount'>) => {
    addPurchaseOrder(data);
    setOrders(getPurchaseOrders());
    setIsAddSheetOpen(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Purchase Orders</CardTitle>
            <CardDescription>
              Create, track, and manage all purchase requisitions and orders.
            </CardDescription>
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Requisition
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>Create New Purchase Requisition</SheetTitle>
                <SheetDescription>Select items and a vendor to create a new purchase order.</SheetDescription>
              </SheetHeader>
              <AddPurchaseOrderForm vendors={vendors} items={items} onFormSubmit={handleAddOrder} />
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.poId}>
                <TableCell className="font-mono text-xs">{order.poId}</TableCell>
                <TableCell className="font-medium">{vendorMap[order.vendorId]?.name || 'N/A'}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-mono">${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.poId, 'Approved')} disabled={order.status !== 'Pending'}>Approve</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.poId, 'Ordered')} disabled={order.status !== 'Approved'}>Mark as Ordered</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.poId, 'Completed')} disabled={order.status !== 'Ordered'}>Mark as Completed</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.poId, 'Rejected')} disabled={order.status !== 'Pending'} className="text-destructive">Reject</DropdownMenuItem>
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
