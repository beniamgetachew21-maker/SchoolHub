"use client"
import * as React from "react"
import { 
    ClipboardList, Filter, Plus, 
    ArrowRight, FileText, Download,
    Clock, CheckCircle2, Truck, ShoppingCart,
    Calendar, ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { processProcurementPOAction } from "@/lib/flow-actions"
import Link from "next/link"

export function PurchaseOrdersClient({ initialPOs }: { initialPOs: any[] }) {
    const [pos, setPOs] = React.useState(initialPOs);
    const [isProcessing, setIsProcessing] = React.useState<string | null>(null);

    const handleReceiveGoods = async (poId: string) => {
        setIsProcessing(poId);
        const result = await processProcurementPOAction(poId);
        setIsProcessing(null);
        
        if (result.success) {
            toast({
                title: "✅ Goods Received",
                description: `PO ${poId} has been delivered and inventory updated.`
            });
            // Update local state
            setPOs(prev => prev.map(po => po.poId === poId ? { ...po, status: "Delivered" } : po));
        } else {
            toast({
                variant: "destructive",
                title: "Process Failed",
                description: result.error
            });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Link href="/inventory" className="text-muted-foreground hover:text-[#163D2D] transition-colors">
                            <h2 className="text-sm font-bold uppercase tracking-widest italic">Inventory</h2>
                        </Link>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Purchase Orders</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Lifecycle management from requisition to goods receipt.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Filter className="h-3.5 w-3.5 mr-1.5" /> Filter
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Create New PO
                    </Button>
                </div>
            </div>

            {/* ── Active PO List ── */}
            <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                <CardHeader className="p-8 pb-3 border-b border-slate-50">
                    <CardTitle className="font-black text-2xl text-slate-900">Procurement Activity</CardTitle>
                    <CardDescription className="font-medium text-sm mt-0.5">Track every order's status and delivery timeline.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Order Details</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Financials</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timeline</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {pos.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-10 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">No purchase orders found</td>
                                    </tr>
                                ) : (
                                    pos.map((po, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#163D2D] group-hover:bg-[#163D2D] group-hover:text-white transition-all">
                                                        <ClipboardList className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm text-slate-900">{po.poId}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Vendor ID: {po.vendorId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <Badge className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                                    po.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                                    po.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                                    po.status === 'Draft' ? 'bg-slate-100 text-slate-500' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {po.status === 'Delivered' && <CheckCircle2 className="h-2.5 w-2.5 mr-1.5 inline" />}
                                                    {po.status === 'In Transit' && <Truck className="h-2.5 w-2.5 mr-1.5 inline" />}
                                                    {po.status === 'Pending Approval' && <Clock className="h-2.5 w-2.5 mr-1.5 inline" />}
                                                    {po.status}
                                                </Badge>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="font-black text-sm text-slate-900 italic tracking-tight">ETB {po.totalAmount.toLocaleString()}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: Procurement</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-slate-900">
                                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                    <p className="text-xs font-bold">{po.orderDate}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 px-6">
                                                    {po.status === "In Transit" && (
                                                        <Button 
                                                            size="sm" 
                                                            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest h-8"
                                                            onClick={() => handleReceiveGoods(po.poId)}
                                                            disabled={isProcessing === po.poId}
                                                        >
                                                            {isProcessing === po.poId ? "Processing..." : "Receive Goods"}
                                                        </Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50">
                                                        <FileText className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
