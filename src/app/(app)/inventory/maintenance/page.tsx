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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
    getMaintenanceLogs, 
    getInventoryItems, 
    addMaintenanceLog,
    type MaintenanceLog, 
    type InventoryItem, 
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
import { AddMaintenanceLogForm } from "@/components/forms/add-maintenance-log-form"

export default function MaintenanceLogsPage() {
  const [logs, setLogs] = React.useState(getMaintenanceLogs());
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  
  const allItems = React.useMemo(() => getInventoryItems(), []);

  const refreshData = () => {
    setLogs(getMaintenanceLogs());
  }

  const getItem = (itemId: string) => {
    return allItems.find(i => i.itemId === itemId);
  }

  const getTypeBadge = (type: MaintenanceLog['type']) => {
    switch(type) {
        case 'Repair':
            return <Badge variant="destructive">Repair</Badge>;
        case 'Scheduled':
            return <Badge variant="secondary">Scheduled</Badge>;
        case 'Upgrade':
            return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upgrade</Badge>;
        default:
            return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  const handleAddLog = (data: Omit<MaintenanceLog, 'logId' | 'date'>) => {
    addMaintenanceLog(data);
    refreshData();
    setIsAddSheetOpen(false);
    toast({
        title: "Maintenance Logged",
        description: "The maintenance activity has been successfully recorded.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Maintenance Logs</CardTitle>
            <CardDescription>
              Track repairs, upgrades, and scheduled maintenance for all assets.
            </CardDescription>
          </div>
          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Log Maintenance
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Log New Maintenance Activity</SheetTitle>
                    <SheetDescription>Select an item and describe the maintenance performed.</SheetDescription>
                </SheetHeader>
                <AddMaintenanceLogForm 
                    items={allItems} 
                    onFormSubmit={handleAddLog} 
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
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => {
                const item = getItem(log.itemId);
                return (
                  <TableRow key={log.logId}>
                    <TableCell className="font-medium">{item?.name || 'N/A'}</TableCell>
                    <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getTypeBadge(log.type)}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell className="text-right font-mono">${log.cost.toFixed(2)}</TableCell>
                  </TableRow>
                )
            })}
             {logs.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No maintenance logs found.
                    </TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
