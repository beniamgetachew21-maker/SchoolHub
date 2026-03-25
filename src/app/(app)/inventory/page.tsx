import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Package, AlertTriangle, ShoppingCart, Wrench, 
    Plus, ArrowUpRight, TrendingUp, History, 
    ArrowRight, ChevronRight, Filter, Search,
    Box, Truck, ClipboardList, PenTool, ExternalLink
} from "lucide-react";
import Link from "next/link";

// Mock data for inventory categories
const categories = [
    { name: "Laboratory Equipment", items: 142, value: "ETB 2.4M", trend: "+12%", color: "bg-blue-500" },
    { name: "Classroom Furniture", items: 856, value: "ETB 1.8M", trend: "0%", color: "bg-amber-500" },
    { name: "IT & Electronics", items: 324, value: "ETB 5.6M", trend: "-5%", color: "bg-emerald-500" },
    { name: "Stationery & Supplies", items: 1250, value: "ETB 450k", trend: "+8%", color: "bg-purple-500" },
];

// Mock data for low stock alerts
const alerts = [
    { item: "A4 Paper Reams", current: 12, min: 50, unit: "reams", severity: "high" },
    { item: "Microscope Slides", current: 8, min: 20, unit: "boxes", severity: "medium" },
    { item: "Dry Erase Markers", current: 15, min: 100, unit: "pcs", severity: "high" },
    { item: "Lab Coats (L)", current: 5, min: 15, unit: "pcs", severity: "medium" },
];

// Mock data for recent purchase orders
const recentPOs = [
    { id: "PO-2026-001", vendor: "Ethio Stationery", amount: "ETB 45,000", status: "Delivered", date: "Mar 10, 2026" },
    { id: "PO-2026-002", vendor: "Samsung Electronics", amount: "ETB 850,000", status: "In Transit", date: "Mar 12, 2026" },
    { id: "PO-2026-003", vendor: "Scientific Solutions", amount: "ETB 120,000", status: "Pending Approval", date: "Mar 13, 2026" },
];

export default function InventoryDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ── Compact page header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Inventory Command Center</h1>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Smart asset tracking & procurement lifecycle management.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {[
                        { label: "Asset Value", value: "ETB 10.2M", color: "text-slate-900" },
                        { label: "Low Stock", value: alerts.length, color: "text-rose-600" },
                        { label: "Pending POs", value: recentPOs.filter(p => p.status === "Pending Approval").length, color: "text-amber-600" },
                        { label: "Maintenance", value: "8 Active", color: "text-blue-600" },
                    ].map(k => (
                        <div key={k.label} className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-center shadow-sm">
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-0.5">{k.label}</p>
                            <p className={`text-xl font-black ${k.color}`}>{k.value}</p>
                        </div>
                    ))}
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Launch Procurement
                    </Button>
                </div>
            </div>

            {/* ── Quick Nav Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                    { href: "/inventory/management", icon: Package, label: "Stock Items", count: "2,560 Items" },
                    { href: "/inventory/vendors", icon: Truck, label: "Vendors", count: "42 Partners" },
                    { href: "/inventory/purchase-orders", icon: ClipboardList, label: "Purchase Orders", count: "12 Active" },
                    { href: "/inventory/maintenance", icon: PenTool, label: "Maintenance", count: "8 Tickets" },
                    { href: "/inventory/allocations", icon: Box, label: "Allocations", count: "18 Locations" },
                ].map((a, i) => (
                    <Link key={i} href={a.href} className="group">
                        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 p-5 flex flex-col items-center text-center gap-3">
                            <div className="p-3.5 rounded-2xl text-emerald-600 bg-emerald-50 group-hover:scale-110 group-hover:bg-[#163D2D] group-hover:text-white transition-all">
                                <a.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-black text-[10px] tracking-tight uppercase text-slate-700">{a.label}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{a.count}</p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* ── Main Dashboard Content ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* LEFT: Category View & Low Stock */}
                <div className="xl:col-span-2 space-y-8">
                    
                    {/* Category Distribution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((cat, i) => (
                            <Card key={i} className="rounded-[2rem] border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden relative p-6">
                                <div className={`absolute top-0 right-0 w-24 h-24 ${cat.color} opacity-5 rounded-full -mr-8 -mt-8`} />
                                <div className="flex items-start justify-between relative z-10">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{cat.name}</p>
                                        <h3 className="text-2xl font-black text-slate-900">{cat.items}</h3>
                                        <p className="text-[11px] font-bold text-slate-500 mt-0.5">Physical Units</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-emerald-600">{cat.value}</p>
                                        <Badge variant="outline" className={`mt-1 border-none font-black text-[9px] ${cat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : cat.trend === '0%' ? 'bg-slate-50 text-slate-500' : 'bg-rose-50 text-rose-600'}`}>
                                            <TrendingUp className="h-2.5 w-2.5 mr-1 inline" /> {cat.trend}
                                        </Badge>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Low Stock Watchlist */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                        <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><AlertTriangle className="h-5 w-5" /></div>
                                <div>
                                    <CardTitle className="font-black text-2xl text-slate-900">Critical Stock Alerts</CardTitle>
                                    <CardDescription className="font-medium text-sm mt-0.5">Review items below threshold levels</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">View Full Report</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {alerts.map((item, i) => (
                                <div key={i} className="flex items-center gap-6 px-8 py-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                                    <div className="flex-1">
                                        <p className="font-black text-sm text-slate-900">{item.item}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Inventory Unit: {item.unit}</p>
                                    </div>
                                    <div className="flex items-center gap-3 w-48 font-mono">
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${item.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`} 
                                                style={{ width: `${(item.current / item.min) * 100}%` }}
                                            />
                                        </div>
                                        <span className={`text-[11px] font-black ${item.severity === 'high' ? 'text-rose-600' : 'text-amber-600'}`}>
                                            {item.current} / {item.min}
                                        </span>
                                    </div>
                                    <Button size="sm" variant="outline" className="rounded-xl border-slate-200 h-8 font-black text-[9px] uppercase tracking-widest">
                                        Restock
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT: Procurement & Recent Activity */}
                <div className="space-y-6">
                    {/* Procurement CTA Card */}
                    <Card className="rounded-[2.5rem] bg-[#163D2D] text-white p-7 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/10 rounded-xl text-emerald-400 shadow-inner">
                                    <ShoppingCart className="h-5 w-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Procurement Module</span>
                            </div>
                            <h3 className="text-xl font-black leading-tight italic">Streamline your institution's purchase lifecycle</h3>
                            <p className="text-xs text-white/50 font-medium">Create POs, manage vendor bids, and track incoming shipments in one unified workflow.</p>
                            <Button className="w-full mt-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-xs uppercase tracking-widest h-11">
                                New Purchase Order <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </Card>

                    {/* Recent Purchase Orders */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-black text-base uppercase tracking-tight text-slate-900 flex items-center gap-2">
                                <History className="h-4 w-4 text-emerald-600" /> Recent POs
                            </h3>
                            <Link href="/inventory/purchase-orders">
                                <Button variant="ghost" className="h-7 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-700 px-2">Manage All →</Button>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentPOs.map((po, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:border-emerald-200 transition-all group cursor-pointer">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-black text-xs text-slate-900">{po.id}</p>
                                        <Badge className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                            po.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                            po.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            {po.status}
                                        </Badge>
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-500 truncate">{po.vendor}</p>
                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/50">
                                        <span className="text-[10px] font-black text-[#163D2D]">{po.amount}</span>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">{po.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Maintenance Ticket Summary */}
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                <Wrench className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-black text-base uppercase tracking-tight text-slate-900">Maintenance</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Repair Tickets</p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            {[
                                { title: "IT: Server Room Cooling", priority: "Critical", time: "2h ago" },
                                { title: "Furniture: Lab B Stools", priority: "Low", time: "1d ago" },
                                { title: "IT: 4th Floor WiFi Access", priority: "Medium", time: "4h ago" },
                            ].map((ticket, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-xs text-slate-800 truncate pr-2">{ticket.title}</p>
                                        <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{ticket.time}</p>
                                    </div>
                                    <Badge variant="outline" className={`shrink-0 border-none font-black text-[8px] uppercase tracking-widest ${
                                        ticket.priority === 'Critical' ? 'bg-rose-50 text-rose-600' :
                                        ticket.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                                        'bg-blue-50 text-blue-600'
                                    }`}>
                                        {ticket.priority}
                                    </Badge>
                                </div>
                            ))}
                            <Button className="w-full mt-2 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest h-9 border-none">
                                New Maintenance Request
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
