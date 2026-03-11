
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
  getAssetAllocations,
  getInventoryItems,
  getStudents,
  getEmployees,
  issueAsset,
  returnAsset,
  type AssetAllocation,
  type InventoryItem,
  type Student,
  type Employee
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
import { IssueAssetForm } from "@/components/forms/issue-asset-form"

export default function AssetAllocationsPage() {
  const [allocations, setAllocations] = React.useState(getAssetAllocations());
  const [isIssueSheetOpen, setIsIssueSheetOpen] = React.useState(false);

  const allItems = React.useMemo(() => getInventoryItems(), []);
  const allStudents = React.useMemo(() => getStudents(), []);
  const allEmployees = React.useMemo(() => getEmployees(), []);

  const refreshData = () => {
    setAllocations(getAssetAllocations());
  }

  const getAssignee = (assigneeId: string, assigneeType: 'Student' | 'Employee') => {
    if (assigneeType === 'Student') {
      return allStudents.find(s => s.studentId === assigneeId);
    }
    return allEmployees.find(e => e.employeeId === assigneeId);
  }

  const getItem = (itemId: string) => {
    return allItems.find(i => i.itemId === itemId);
  }

  const getStatusBadge = (allocation: AssetAllocation) => {
    if (allocation.returnDate) {
      return <Badge className="bg-blue-100 text-blue-800">Returned</Badge>;
    }
    if (new Date(allocation.dueDate) < new Date()) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Issued</Badge>;
  };

  const handleIssueAsset = (data: Omit<AssetAllocation, 'allocationId' | 'issueDate' | 'returnDate'>) => {
    issueAsset(data);
    refreshData();
    setIsIssueSheetOpen(false);
  }

  const handleReturnAsset = (allocationId: string) => {
    returnAsset(allocationId);
    refreshData();
    toast({
      title: "Asset Returned",
      description: "The item has been marked as returned.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Asset Allocations</CardTitle>
            <CardDescription>
              Track items issued to students, staff, and departments.
            </CardDescription>
          </div>
          <Sheet open={isIssueSheetOpen} onOpenChange={setIsIssueSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Issue Item
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>Issue a New Asset</SheetTitle>
                <SheetDescription>Select an item and assign it to a user or department.</SheetDescription>
              </SheetHeader>
              <IssueAssetForm
                items={allItems}
                students={allStudents}
                employees={allEmployees}
                onFormSubmit={handleIssueAsset}
              />
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocations.map((alloc) => {
              const item = getItem(alloc.itemId);
              const assignee = alloc.assigneeType !== 'Department' ? getAssignee(alloc.assigneeId, alloc.assigneeType as 'Student' | 'Employee') : null;
              return (
                <TableRow key={alloc.allocationId}>
                  <TableCell className="font-medium">{item?.name || 'N/A'}</TableCell>
                  <TableCell>{assignee?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(alloc.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(alloc.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(alloc)}</TableCell>
                  <TableCell className="text-right">
                    {!alloc.returnDate && (
                      <Button variant="outline" size="sm" onClick={() => handleReturnAsset(alloc.allocationId)}>
                        Mark as Returned
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
            {allocations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No assets are currently issued.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
