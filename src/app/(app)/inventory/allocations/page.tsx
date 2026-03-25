import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Box, MapPin, Search, Filter, Plus, 
    ChevronRight, MoreHorizontal, ArrowRight, User, 
    Monitor, Pipette, Armchair, Hammer,
    Activity, History
} from "lucide-react";
import Link from "next/link";

// Mock allocation data
const allocations = [
    { 
        location: "Computer Lab 4", 
        type: "IT & Electronics", 
        count: 32, 
        manager: "Yonas Tekeste", 
        lastAudit: "Mar 01, 2026",
        itemsPreview: "OptiPlex 7090, Curved Monitors...",
        status: "Verified"
    },
    { 
        location: "Chemistry Lab B", 
        type: "Scientific Equipment", 
        count: 142, 
        manager: "Dawit Belay", 
        lastAudit: "Mar 05, 2026",
        itemsPreview: "Bunsen Burners, Micro-balances...",
        status: "Audit Pending"
    },
    { 
        location: "Senior Wing - Room 204", 
        type: "Classroom Furniture", 
        count: 45, 
        manager: "Sara Hailu", 
        lastAudit: "Feb 15, 2026",
        itemsPreview: "Adjustable Desks, Ergonomic Chairs...",
        status: "Verified"
    },
    { 
        location: "Staff Lounge", 
        type: "General Assets", 
        count: 12, 
        manager: "Admin Support", 
        lastAudit: "Jan 10, 2026",
        itemsPreview: "Coffee Station, Sofa Set, Fridge...",
        status: "Maintenance Required"
    },
];

export default function AllocationsPage() {
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
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Asset Allocations</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Track and audit institutional assets across campus locations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <History className="h-3.5 w-3.5 mr-1.5" /> Audit Log
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> New Allocation
                    </Button>
                </div>
            </div>

            {/* ── Location Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allocations.map((loc, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden group hover:shadow-2xl hover:border-emerald-100 transition-all duration-300">
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-[#163D2D] group-hover:text-white rounded-2xl transition-all">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-2xl font-black text-slate-900 leading-none group-hover:text-[#163D2D] transition-colors">{loc.location}</h3>
                                            <Badge variant="outline" className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                                loc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' :
                                                loc.status === 'Audit Pending' ? 'bg-amber-50 text-amber-600' :
                                                'bg-rose-50 text-rose-600'
                                            }`}>
                                                {loc.status}
                                            </Badge>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{loc.type}</p>
                                    </div>
                                </div>
                                <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-300 hover:text-slate-900 rounded-xl">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Total Units</p>
                                    <p className="text-xl font-black text-slate-900">{loc.count}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Custodian</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black">
                                            {loc.manager.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 truncate">{loc.manager}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">
                                <span className="text-[#163D2D] font-black italic mr-2 uppercase text-[10px] tracking-widest">Preview:</span>
                                {loc.itemsPreview}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-3.5 w-3.5 text-slate-300" />
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tight">Last Audited: {loc.lastAudit}</span>
                                </div>
                                <Button className="rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest h-9 px-4">
                                    Full Inventory <ArrowRight className="h-3.5 w-3.5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {/* New Location CTA */}
                <Card className="rounded-[2.5rem] border-dashed border-2 border-slate-200 p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                    <div className="p-6 rounded-full bg-white shadow-lg text-slate-300 group-hover:text-emerald-600 group-hover:scale-110 transition-all">
                        <MapPin className="h-10 w-10" />
                    </div>
                    <div>
                        <h4 className="font-black text-xl text-slate-900 uppercase italic">Add Location</h4>
                        <p className="text-xs font-medium text-slate-400 mt-2 max-w-[250px]">Define a new classroom, lab, or office for asset allocation tracking.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
