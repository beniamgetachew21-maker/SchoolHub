import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    PenTool, Wrench, Clock, AlertTriangle, CheckCircle2,
    Plus, Search, Filter, ChevronRight, MessageSquare,
    User, Calendar, Box, ArrowRight, Settings
} from "lucide-react";
import Link from "next/link";

// Mock ticket data
const tickets = [
    { 
        id: "MNT-742", 
        title: "Server Room Cooling Failure", 
        location: "Block A - IT Hub", 
        priority: "Critical", 
        status: "In Progress",
        reportedBy: "Abebe Tech",
        date: "2h ago",
        category: "Infrastructure"
    },
    { 
        id: "MNT-740", 
        title: "Microscope Calibration (Lab B)", 
        location: "Science Wing", 
        priority: "Medium", 
        status: "Pending",
        reportedBy: "Hirut Science",
        date: "5h ago",
        category: "Laboratory"
    },
    { 
        id: "MNT-738", 
        title: "Library Shelving Structural Repair", 
        location: "Main Library", 
        priority: "Low", 
        status: "Scheduled",
        reportedBy: "Library Admin",
        date: "1d ago",
        category: "Furniture"
    },
    { 
        id: "MNT-735", 
        title: "Auditorium Projector Bulb Replacement", 
        location: "Assembly Hall", 
        priority: "High", 
        status: "Resolved",
        reportedBy: "Events Coord",
        date: "2d ago",
        category: "AV/IT"
    },
];

export default function MaintenancePage() {
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
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Maintenance Hub</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Manage repair tickets and institutional asset maintenance schedules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Settings className="h-3.5 w-3.5 mr-1.5" /> Config
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5 shadow-sm">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Log Repair Request
                    </Button>
                </div>
            </div>

            {/* ── Stats Overview ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Tickets", count: 14, color: "text-slate-900", bg: "bg-white" },
                    { label: "Critical Urgent", count: 3, color: "text-rose-600", bg: "bg-rose-50" },
                    { label: "Pending Parts", count: 5, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Resolved (MTD)", count: 28, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((s, i) => (
                    <Card key={i} className={`rounded-[1.75rem] border-none shadow-sm ${s.bg} p-6 h-full flex flex-col justify-center`}>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
                        <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
                    </Card>
                ))}
            </div>

            {/* ── Ticket Feed ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Tickets List */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <h3 className="font-black text-lg uppercase tracking-tight text-slate-900 italic">Maintenance Stream</h3>
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black uppercase tracking-widest text-[#163D2D] bg-emerald-50">Active</Button>
                            <Button size="sm" variant="ghost" className="h-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Resolved</Button>
                        </div>
                    </div>
                    {tickets.map((ticket, i) => (
                        <Card key={i} className="rounded-[2rem] border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all cursor-pointer group">
                            <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
                                <div className={`h-16 w-1 rounded-full ${
                                    ticket.priority === 'Critical' ? 'bg-rose-500' :
                                    ticket.priority === 'High' ? 'bg-amber-500' :
                                    ticket.priority === 'Medium' ? 'bg-blue-500' : 'bg-slate-200'
                                } shrink-0`} />
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <Badge className="bg-slate-100 text-slate-500 border-none font-black text-[9px] uppercase tracking-widest">{ticket.id}</Badge>
                                        <Badge variant="outline" className={`font-black text-[9px] uppercase tracking-widest ${
                                            ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {ticket.status}
                                        </Badge>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto">{ticket.date}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 group-hover:text-[#163D2D] transition-colors">{ticket.title}</h4>
                                    <div className="flex flex-wrap items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1.5">
                                            <Box className="h-3.5 w-3.5 text-slate-400" />
                                            <span className="text-xs font-bold text-slate-500">{ticket.category}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="h-3.5 w-3.5 text-slate-400" />
                                            <span className="text-xs font-bold text-slate-500">{ticket.reportedBy}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-3">
                                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-[#163D2D] transition-all">
                                        <MessageSquare className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#163D2D] group-hover:text-white transition-all">
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <Button variant="outline" className="w-full rounded-2xl border-slate-100 h-14 font-black uppercase text-xs tracking-widest text-slate-400 hover:text-[#163D2D] transition-all">
                        Load Older Tickets
                    </Button>
                </div>

                {/* Sidebar: Calendar & Quick Requisition */}
                <div className="space-y-6">
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white p-7">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-black text-base uppercase tracking-tight text-slate-900">Preventive Maint.</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Schedules</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { date: "Mar 15", item: "HVAC System Flush", type: "Semi-Annual" },
                                { date: "Mar 18", item: "IT Firewall Audit", type: "Security" },
                                { date: "Mar 22", item: "Solar Panel Cleaning", type: "Quarterly" },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                    <div className="h-12 w-12 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-[#163D2D] group-hover:text-white transition-all shrink-0">
                                        <span className="text-[9px] font-black uppercase">{s.date.split(' ')[0]}</span>
                                        <span className="text-sm font-black italic">{s.date.split(' ')[1]}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-xs text-slate-800 truncate">{s.item}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{s.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="rounded-[2.5rem] bg-gradient-to-br from-indigo-900 to-slate-900 border-none p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                        <h3 className="text-xl font-black italic leading-tight mb-4">Urgent Part Requisition</h3>
                        <p className="text-xs text-indigo-200/70 font-medium mb-6 leading-relaxed">Need replacement parts for an active repair? Launch the procurement wizard directly from here.</p>
                        <Button className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-widest h-12 shadow-lg shadow-indigo-500/20">
                            Open Parts Wizard <Plus className="h-4 w-4 ml-2" />
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
