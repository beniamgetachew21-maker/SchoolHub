"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, Box, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { allocateInventoryItemAction } from "@/lib/flow-actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function InventoryClient({ initialItems }: { initialItems: any[] }) {
    const [items, setItems] = React.useState(initialItems);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isAllocateDialogOpen, setIsAllocateDialogOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [assigneeId, setAssigneeId] = React.useState("");
    const [assigneeType, setAssigneeType] = React.useState("Employee");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const filteredItems = React.useMemo(() => {
        if (!searchQuery) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
    }, [items, searchQuery]);

    const handleAllocate = async () => {
        if (!assigneeId) {
            toast({ variant: "destructive", title: "Missing ID", description: "Please enter an Assignee ID." });
            return;
        }

        setIsSubmitting(true);
        const result = await allocateInventoryItemAction(selectedItem.itemId, assigneeId, assigneeType);
        setIsSubmitting(false);

        if (result.success) {
            toast({
                title: "✅ Asset Allocated",
                description: `Successfully assigned ${selectedItem.name} to ${assigneeId}.`
            });
            // Update local state
            setItems(prev => prev.map(item => 
                item.itemId === selectedItem.itemId ? { ...item, quantity: item.quantity - 1 } : item
            ));
            setIsAllocateDialogOpen(false);
            setAssigneeId("");
        } else {
            toast({
                variant: "destructive",
                title: "Allocation Failed",
                description: result.error
            });
        }
    };

    const getStatusBadge = (quantity: number) => {
        if (quantity <= 0) return <Badge variant="destructive">Out of Stock</Badge>;
        if (quantity < 10) return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Low Stock</Badge>;
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">In Stock</Badge>;
    };

    return (
        <>
            <Card className="rounded-[2rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                <CardHeader className="p-8 pb-5 border-b border-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="font-black text-2xl text-slate-900 italic tracking-tighter uppercase">Inventory Items</CardTitle>
                            <CardDescription className="font-medium text-sm mt-0.5">Real-time stock levels and asset positions.</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                            <Input 
                                placeholder="Search inventory..." 
                                className="w-64 rounded-xl border-slate-200 h-10 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button className="rounded-xl bg-[#163D2D] hover:bg-[#1e5240] h-10 px-5 font-black text-[10px] uppercase tracking-widest text-white shadow-sm">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-50">
                                <TableHead className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Item Details</TableHead>
                                <TableHead className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</TableHead>
                                <TableHead className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">In Stock</TableHead>
                                <TableHead className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</TableHead>
                                <TableHead className="px-8 py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-8 py-10 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">No matching items found</TableCell>
                                </TableRow>
                            ) : (
                                filteredItems.map((item) => (
                                    <TableRow key={item.itemId} className="group hover:bg-slate-50/80 transition-all border-slate-50">
                                        <TableCell className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#163D2D] group-hover:bg-[#163D2D] group-hover:text-white transition-all">
                                                    <Box className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm text-slate-900">{item.name}</p>
                                                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-1">{item.itemId}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-8 py-6">
                                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg">{item.category}</span>
                                        </TableCell>
                                        <TableCell className="px-8 py-6 text-center">
                                            <p className="font-black text-sm text-slate-900">{item.quantity}</p>
                                        </TableCell>
                                        <TableCell className="px-8 py-6">
                                            {getStatusBadge(item.quantity)}
                                        </TableCell>
                                        <TableCell className="px-8 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-900">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 shadow-xl p-2 min-w-[160px]">
                                                    <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Quick Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem 
                                                        className="rounded-xl px-3 py-2 cursor-pointer focus:bg-emerald-50 focus:text-emerald-700"
                                                        onClick={() => {
                                                            setSelectedItem(item);
                                                            setIsAllocateDialogOpen(true);
                                                        }}
                                                    >
                                                        <User className="mr-2 h-4 w-4" /> Allocate Asset
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer">Edit Info</DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer text-rose-600 focus:bg-rose-50 focus:text-rose-700">Write Off</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isAllocateDialogOpen} onOpenChange={setIsAllocateDialogOpen}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8 max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Allocate Asset</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500 mt-2">
                            Assign <strong>{selectedItem?.name}</strong> to a specific member of the institution.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assignee Type</Label>
                            <Select value={assigneeType} onValueChange={setAssigneeType}>
                                <SelectTrigger className="rounded-xl border-slate-200 h-11 font-bold">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                    <SelectItem value="Employee" className="rounded-lg">Professional Staff</SelectItem>
                                    <SelectItem value="Student" className="rounded-lg">Student / Pupil</SelectItem>
                                    <SelectItem value="Department" className="rounded-lg">Institutional Unit</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assignee ID / Email</Label>
                            <div className="relative">
                                <Input 
                                    placeholder="Enter identifier..." 
                                    className="rounded-xl border-slate-200 h-11 font-bold pl-10"
                                    value={assigneeId}
                                    onChange={(e) => setAssigneeId(e.target.value)}
                                />
                                <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-300" />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button 
                            variant="ghost" 
                            className="rounded-xl h-11 px-6 font-black text-xs uppercase tracking-widest text-slate-400"
                            onClick={() => setIsAllocateDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="rounded-xl bg-[#163D2D] hover:bg-[#1e5240] h-11 px-8 font-black text-xs uppercase tracking-widest text-white shadow-lg shadow-emerald-900/10"
                            onClick={handleAllocate}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Allocating..." : "Confirm Allocation"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
