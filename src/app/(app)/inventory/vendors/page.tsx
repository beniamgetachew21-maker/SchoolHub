import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Truck, Search, Filter, Plus, Phone, Mail, 
    Globe, MapPin, Star, MoreHorizontal, ChevronRight,
    Building2, Activity, ShieldCheck
} from "lucide-react";
import Link from "next/link";

// Mock vendor data
const vendors = [
    { 
        name: "Ethio Stationery PLC", 
        category: "Office Supplies", 
        rating: 4.8, 
        status: "Preferred", 
        contact: "Abebe Bekele", 
        phone: "+251 911 123 456", 
        email: "info@ethiostationery.com",
        location: "Addis Ababa, Piazza",
        activeOrders: 2
    },
    { 
        name: "Scientific Solutions Ltd", 
        category: "Lab Equipment", 
        rating: 4.5, 
        status: "Active", 
        contact: "Hirut Tadesse", 
        phone: "+251 912 234 567", 
        email: "sales@scisolutions.com",
        location: "Addis Ababa, Bole",
        activeOrders: 1
    },
    { 
        name: "Samsung Electronics", 
        category: "IT & Electronics", 
        rating: 4.9, 
        status: "Preferred", 
        contact: "Korean Sales Team", 
        phone: "+251 116 789 012", 
        email: "support@samsung-et.com",
        location: "Global / Addis distribution",
        activeOrders: 1
    },
    { 
        name: "Modern Furniture Co.", 
        category: "Classroom Furniture", 
        rating: 3.8, 
        status: "Under Review", 
        contact: "Dawit Hailu", 
        phone: "+251 920 345 678", 
        email: "dawit@modernfurniture.com",
        location: "Addis Ababa, Kaliti",
        activeOrders: 0
    },
];

export default function VendorsPage() {
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
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Vendor Registry</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Manage institutional suppliers and procurement partners.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Filter className="h-3.5 w-3.5 mr-1.5" /> Filter
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Onboard Vendor
                    </Button>
                </div>
            </div>

            {/* ── Search & Stats ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="md:col-span-3 rounded-[2rem] border-slate-100 shadow-sm overflow-hidden bg-white">
                    <div className="flex items-center px-6 py-4">
                        <Search className="h-5 w-5 text-slate-400 mr-3" />
                        <Input 
                            placeholder="Search by vendor name, category, or contact personnel..." 
                            className="border-none shadow-none focus-visible:ring-0 text-slate-900 font-medium placeholder:text-slate-400 px-0 h-10"
                        />
                    </div>
                </Card>
                <Card className="rounded-[2rem] border-slate-100 shadow-sm bg-[#163D2D] text-white p-5 flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl text-emerald-400">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Vendors</p>
                        <p className="text-2xl font-black">{vendors.length}</p>
                    </div>
                </Card>
            </div>

            {/* ── Vendor Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {vendors.map((vendor, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 bg-white hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 group overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                                    <Truck className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <Badge className={`font-black text-[9px] uppercase tracking-widest border-none ${
                                        vendor.status === 'Preferred' ? 'bg-emerald-100 text-emerald-700' :
                                        vendor.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                        'bg-amber-100 text-amber-700'
                                    }`}>
                                        {vendor.status}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <Star className="h-3.5 w-3.5 fill-current" />
                                        <span className="text-sm font-black text-slate-900">{vendor.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">{vendor.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{vendor.category}</p>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                                    <span className="text-xs font-bold">{vendor.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                                    <span className="text-xs font-bold truncate">{vendor.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                                    <span className="text-xs font-bold">{vendor.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-4 bg-slate-50 flex items-center justify-between group-hover:bg-emerald-50 transition-colors">
                            <div className="flex items-center gap-2">
                                <Activity className="h-3.5 w-3.5 text-slate-400" />
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-tight">
                                    {vendor.activeOrders} Active Orders
                                </span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 rounded-xl font-black text-[10px] uppercase tracking-widest text-[#163D2D] hover:bg-white">
                                View Vendor Profile
                            </Button>
                        </div>
                    </Card>
                ))}

                {/* Onboard New Vendor CTA */}
                <Card className="rounded-[2.5rem] border-dashed border-2 border-slate-200 bg-slate-50/50 p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                    <div className="p-5 rounded-full bg-white shadow-md text-slate-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all">
                        <Plus className="h-8 w-8" />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 uppercase italic">Onboard Partner</h4>
                        <p className="text-[11px] font-medium text-slate-400 mt-1 max-w-[200px]">Add new suppliers to the institutional procurement network.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
