
"use client"
import dynamic from "next/dynamic";
import { AlertTriangle, Bus, Route as RouteIcon, UserCheck, UserX, Map, Clock } from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dynamically import the map so it doesn't run on the server (Leaflet needs window)
const TransportMap = dynamic(
  () => import("@/components/transport/transport-map").then((m) => m.TransportMap),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center bg-slate-50 animate-pulse rounded-b-lg"><span className="text-slate-400 font-medium text-sm">Loading map…</span></div> }
);

const kpiData = [
  { label: "Active Routes", value: "3", sub: "Currently operational", icon: RouteIcon, color: "text-emerald-600 bg-emerald-50" },
  { label: "Vehicles Available", value: "2 / 3", sub: "2 Active · 1 Maintenance", icon: Bus, color: "text-blue-600 bg-blue-50" },
  { label: "Drivers On-Duty", value: "2 / 3", sub: "1 On Leave", icon: UserCheck, color: "text-purple-600 bg-purple-50" },
  { label: "Students Transported", value: "77", sub: "Today so far", icon: UserX, color: "text-orange-600 bg-orange-50" },
];

const routes = [
  { id: "R01", name: "Bole – Kirkos – School", driver: "Alemayehu Tadesse", students: 32, status: "On Route", eta: "07:45 AM", color: "bg-orange-500" },
  { id: "R02", name: "Piassa – Sarbet – School", driver: "Yohannes Girma", students: 28, status: "On Route", eta: "07:50 AM", color: "bg-emerald-500" },
  { id: "R03", name: "Kaliti – Akaki – School", driver: "Dawit Bekele", students: 17, status: "Delayed", eta: "08:15 AM", color: "bg-indigo-500" },
];

const alerts = [
  { id: 1, type: "Delay", message: "Route R03 running 15 min late — traffic on Akaki road.", time: "5 mins ago", level: "warning" },
  { id: 2, type: "Breakdown", message: "Vehicle BUS-03 reported a flat tyre. Recovery dispatched.", time: "30 mins ago", level: "destructive" },
  { id: 3, type: "Info", message: "Driver Alemayehu Tadesse started Route R01 on schedule.", time: "1 hour ago", level: "info" },
];

export default function TransportDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} className="rounded-2xl border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${kpi.color}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight">{kpi.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">{kpi.label}</p>
                <p className="text-[10px] text-slate-400 italic">{kpi.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map + Route List */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map — spans 2 columns */}
        <Card className="lg:col-span-2 rounded-[28px] border-none shadow-xl overflow-hidden">
          <CardHeader className="p-6 border-b border-slate-50 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="font-black text-xl flex items-center gap-2">
                <Map className="h-5 w-5 text-emerald-600" /> Live Route Map
              </CardTitle>
              <CardDescription className="font-medium mt-1">
                Real-time overview of all active bus routes across Addis Ababa.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              LIVE
            </div>
          </CardHeader>
          <CardContent className="p-0" style={{ height: 480 }}>
            <TransportMap />
          </CardContent>
        </Card>

        {/* Route Status List */}
        <Card className="rounded-[28px] border-none shadow-xl bg-white">
          <CardHeader className="p-6 border-b border-slate-50">
            <CardTitle className="font-black text-xl">Active Routes</CardTitle>
            <CardDescription className="font-medium">Live status of all dispatched vehicles.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {routes.map((r) => (
              <div key={r.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className={`w-1.5 self-stretch rounded-full ${r.color}`} />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-black text-sm uppercase tracking-tight text-slate-900 truncate">{r.name}</p>
                    <Badge className={`text-[9px] font-black border-none flex-shrink-0 ${
                      r.status === "On Route" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>{r.status}</Badge>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">🚌 {r.driver}</p>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>👦 {r.students} students</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ETA {r.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="rounded-[28px] border-none shadow-sm bg-white">
        <CardHeader className="p-6 border-b border-slate-50">
          <CardTitle className="font-black text-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Live Fleet Alerts
          </CardTitle>
          <CardDescription className="font-medium">Real-time incidents and updates from the transport fleet.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className={`flex items-start gap-4 p-5 rounded-2xl border ${
                a.level === "destructive" ? "bg-red-50 border-red-100" :
                a.level === "warning" ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"
              }`}>
                <span className={`mt-0.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                  a.level === "destructive" ? "bg-red-500" :
                  a.level === "warning" ? "bg-amber-500" : "bg-slate-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800">{a.message}</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">{a.type} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
