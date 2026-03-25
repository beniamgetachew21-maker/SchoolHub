"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Bed, Building, Users, UserCheck, Lock, KeyRound,
    ShieldCheck, AlertTriangle, LogIn, LogOut,
    ChevronRight, Plus, Sparkles, BedDouble
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardClientProps {
    hostels: any[];
    rooms: any[];
    initialMaintenance: any[];
}

export default function HostelDashboardClient({ hostels, rooms, initialMaintenance }: DashboardClientProps) {
    const totalCapacity = rooms.reduce((acc, r) => acc + (r.beds?.length || 0), 0) || 100; // fallback for visuals
    const totalOccupied = rooms.reduce((acc, r) => acc + (r.beds?.filter((b: any) => b.status === "Occupied").length || 0), 0);
    const totalAvailable = totalCapacity - totalOccupied;
    const occupancyPct = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

    const maintenanceLogs = initialMaintenance.map(log => ({
        icon: AlertTriangle,
        label: log.issue,
        student: log.hostel?.name || "Maintenance",
        time: new Date(log.reportedAt).toLocaleTimeString(),
        color: log.status === "Reported" ? "text-rose-500 bg-rose-50" : "text-amber-500 bg-amber-50"
    }));

    const quickNav = [
        { href: "/hostel/rooms", label: "Room Grid", icon: BedDouble, count: "Room Allocation" },
        { href: "/hostel/allocations", label: "Allocations", icon: UserCheck, count: "Student Assignments" },
        { href: "/hostel/visitors", label: "Visitor Log", icon: Users, count: "Entry/Exit Record" },
        { href: "#", label: "Gate Pass", icon: KeyRound, count: "Leave Requests" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Hostel Command</h1>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Residential management, occupancy analytics & safety.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5">
                        <KeyRound className="h-3.5 w-3.5 mr-1.5" /> Issue Gate Pass
                    </Button>
                    <Link href="/hostel/allocations">
                        <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5">
                            <Plus className="h-3.5 w-3.5 mr-1.5" /> Allocate Room
                        </Button>
                    </Link>
                </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Capacity", value: totalCapacity, sub: "Beds across all hostels", icon: Bed, color: "text-blue-600 bg-blue-50" },
                    { label: "Currently Occupied", value: totalOccupied, sub: `${occupancyPct}% occupancy rate`, icon: Users, color: "text-emerald-600 bg-emerald-50" },
                    { label: "Available Beds", value: totalAvailable, sub: "Ready for allocation", icon: BedDouble, color: "text-amber-600 bg-amber-50" },
                    { label: "Total Hostels", value: hostels.length, sub: "Registered units", icon: Building, color: "text-purple-600 bg-purple-50" },
                ].map((k) => (
                    <Card key={k.label} className="rounded-[2rem] border-transparent shadow-xl shadow-slate-200/50 bg-white">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("p-3 rounded-xl shrink-0", k.color)}>
                                <k.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black tracking-tight text-slate-900">{k.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-tight">{k.label}</p>
                                <p className="text-[10px] text-slate-400 italic mt-0.5">{k.sub}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Nav */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickNav.map((a) => (
                    <Link key={a.label} href={a.href} className="group">
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

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Hostel Cards */}
                <div className="xl:col-span-2 space-y-6">
                    <h3 className="font-black text-xl uppercase tracking-tight text-slate-900 italic">Hostel Overview</h3>
                    {hostels.length === 0 ? (
                        <p className="text-center py-12 text-slate-400 font-medium italic">No hostels registered yet.</p>
                    ) : hostels.map((h) => {
                        const hostelRooms = rooms.filter(r => r.hostelId === h.hostelId);
                        const totalBeds = hostelRooms.reduce((acc, r) => acc + (r.beds?.length || 0), 0);
                        const occupiedBeds = hostelRooms.reduce((acc, r) => acc + (r.beds?.filter((b: any) => b.status === "Occupied").length || 0), 0);
                        const pct = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
                        const status = pct >= 90 ? { label: "Near Full", cls: "bg-rose-100 text-rose-700" } : pct >= 70 ? { label: "High", cls: "bg-amber-100 text-amber-700" } : { label: "Available", cls: "bg-emerald-100 text-emerald-700" };
                        
                        return (
                            <Card key={h.hostelId} className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden group hover:shadow-2xl transition-all">
                                <CardContent className="p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-blue-500")}>
                                                <Building className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-lg text-slate-900 italic">{h.name}</h4>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{h.hostelType} Block</p>
                                            </div>
                                        </div>
                                        <Badge className={cn("font-black text-[9px] uppercase tracking-widest border-none", status.cls)}>{status.label}</Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                            <span className="text-slate-500">Occupancy</span>
                                            <span className="text-slate-900">{occupiedBeds} / {totalBeds} ({pct}%)</span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all duration-700 bg-blue-500")} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                            <span className="text-emerald-600">{totalBeds - occupiedBeds}</span> beds available
                                        </p>
                                        <Link href={`/hostel/rooms`}>
                                            <Button variant="ghost" className="h-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#163D2D] hover:bg-emerald-50">
                                                View Rooms <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recent Activity Sidebar */}
                <div className="space-y-6">
                    {/* Overall Occupancy Donut-esque */}
                    <Card className="rounded-[2.5rem] border-transparent bg-[#163D2D] text-white shadow-2xl overflow-hidden relative p-7">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-4 flex items-center gap-2">
                                <Sparkles className="h-3.5 w-3.5" /> Live Occupancy
                            </p>
                            <div className="text-6xl font-black tracking-tighter mb-2">{occupancyPct}<span className="text-2xl text-white/40">%</span></div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Campus Bed Usage</p>
                            <div className="mt-6 h-2 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${occupancyPct}%` }} />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="bg-white/10 rounded-2xl p-3 text-center">
                                    <p className="text-[9px] font-black uppercase text-white/50 tracking-widest">Occupied</p>
                                    <p className="text-xl font-black">{totalOccupied}</p>
                                </div>
                                <div className="bg-white/10 rounded-2xl p-3 text-center">
                                    <p className="text-[9px] font-black uppercase text-white/50 tracking-widest">Available</p>
                                    <p className="text-xl font-black">{totalAvailable}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Activity Feed */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                        <CardHeader className="p-6 pb-3">
                            <CardTitle className="font-black text-lg tracking-tight text-slate-900 flex items-center gap-2">
                                <Lock className="h-4 w-4 text-emerald-500" /> Maintenance Feed
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-3">
                            {maintenanceLogs.length === 0 ? (
                                <p className="text-center py-8 text-[10px] font-bold uppercase text-slate-400 tracking-widest">No recent reports</p>
                            ) : maintenanceLogs.map((a, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                    <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", a.color)}>
                                        <a.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-[11px] text-slate-900 uppercase italic truncate">{a.label}</p>
                                        <p className="text-[10px] font-bold text-slate-400 truncate">{a.student}</p>
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
