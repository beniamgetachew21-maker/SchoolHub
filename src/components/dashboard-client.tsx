"use client";
import * as React from "react";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  DollarSign,
  Megaphone,
  Users,
  Wallet,
  Globe,
  Sun,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  Calendar,
  Clock,
  ShieldCheck,
  UserPlus,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  ExternalLink
} from "lucide-react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  LineChart,
  Line,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { type Announcement } from "@/app/lib/data";

const chartConfig = {
  collected: {
    label: "Fees Collected",
    color: "#2D6A4F", // Dark Green
  },
  expenses: {
    label: "Expenses",
    color: "#3498DB", // Blue
  },
  other: {
    label: "Grants",
    color: "#D4A373", // Gold
  }
} satisfies ChartConfig;

interface DashboardData {
  totalStudents: number;
  totalStaff: number;
  feesDue: number;
  announcements: Announcement[];
  chartData: { month: string; collected: number; expenses: number; other: number }[];
}

interface DashboardClientProps {
  data: DashboardData;
}

export default function DashboardClient({ data }: DashboardClientProps) {
  const { totalStudents, totalStaff, feesDue, announcements, chartData } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Sparkline dummy data
  const sparklineData = [
    { value: 40 }, { value: 30 }, { value: 45 }, { value: 50 }, { value: 35 }, { value: 60 }, { value: 55 }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* KPI Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Students" 
          value={totalStudents.toString()} 
          trend="+2 this month" 
          data={sparklineData}
          icon={Users}
        />
        <StatCard 
          title="Total Staff" 
          value={totalStaff.toString()} 
          trend="+1 this month" 
          data={[...sparklineData].reverse()}
          icon={ClipboardList}
        />
        <StatCard 
          title="Fees Receivable" 
          value={formatCurrency(feesDue)} 
          trend="Current Term" 
          data={sparklineData.map(d => ({ value: d.value + 10 }))}
          icon={DollarSign}
        />
        <StatCard 
          title="Live Attendance" 
          value="94.5%" 
          trend="-1.2% variance" 
          trendColor="text-red-500"
          data={sparklineData.map(d => ({ value: 100 - d.value }))}
          icon={Globe}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-sm border border-slate-200 overflow-hidden rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-xl">Semester Fiscal Performance vs. Operational Cost</CardTitle>
                <CardDescription>
                  Strategic financial mapping for the current semester.
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400"><MoreHorizontal className="h-5 w-5" /></Button>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <ChartContainer config={chartConfig} className="h-96 w-full">
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }} />
                    <Legend verticalAlign="top" align="right" height={36} iconType="rect" />
                    <Bar dataKey="collected" stackId="a" fill="#172D13" radius={[0, 0, 0, 0]} barSize={40} />
                    <Bar dataKey="expenses" stackId="a" fill="#3498DB" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="other" stackId="a" fill="#D4A373" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Quick Actions Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-bold font-headline">Quick Actions</h3>
               <span className="text-xs text-slate-400 font-medium">Direct access to critical administrative modules.</span>
               <div className="bg-emerald-500/10 p-1 rounded-full">
                 <Globe className="h-4 w-4 text-emerald-600" />
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <QuickActionCard label="Student Profiles" sub="SIS" icon={Users} id="T1" />
              <QuickActionCard label="Submit Admissions" sub="Online" icon={UserPlus} id="T2" />
              <QuickActionCard label="Manage LMS" sub="Courses" icon={BookOpen} id="T3" />
              <QuickActionCard label="Finance Hub" sub="Digital" icon={Wallet} id="T4" />
              <QuickActionCard label="Log Staff Hours" sub="[new]" icon={Clock} id="T5" />
              <QuickActionCard label="System Health Check" sub="[new]" icon={ShieldCheck} id="T6" />
            </div>
          </div>
        </div>

        {/* Right Widgets Column */}
        <div className="space-y-6">
           {/* Upcoming Events */}
           <Card className="rounded-3xl shadow-sm border-slate-200">
             <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Upcoming Events</CardTitle>
                <MoreHorizontal className="h-4 w-4 text-slate-400" />
             </CardHeader>
             <CardContent className="space-y-4">
                <EventItem title="Student Council Elections" day="Fri" date="" icon={Calendar} />
                <EventItem title="Parent-Teacher Conf" day="Next Tue" date="" icon={Users} />
                <EventItem title="Annual Art Fair" day="Apr 15" date="15" isDateIcon />
             </CardContent>
           </Card>

           {/* Recent Activity */}
           <Card className="rounded-3xl shadow-sm border-slate-200">
             <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <MoreHorizontal className="h-4 w-4 text-slate-400" />
             </CardHeader>
             <CardContent className="space-y-4">
                <ActivityItem title="New Student Application" user="Samira A." time="10m ago" dotColor="bg-orange-400" />
                <ActivityItem title="Fees payment received" user="$500" time="2h ago" dotColor="bg-emerald-500" />
                <ActivityItem title="Inventory request" user="Markers" time="3h ago" dotColor="bg-blue-400" />
             </CardContent>
           </Card>

           {/* Task List */}
           <Card className="rounded-3xl shadow-sm border-slate-200">
             <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Task List</CardTitle>
                <MoreHorizontal className="h-4 w-4 text-slate-400" />
             </CardHeader>
             <CardContent className="space-y-3">
                <TaskItem label="To-Do: Review inventory requests (3)" checked={false} />
                <TaskItem label="To-Do: Review inventory requests (3)" checked={false} />
                <TaskItem label="To-Do: Review inventory requests (3)" checked={false} />
             </CardContent>
           </Card>

           {/* Live News Dummy */}
           <div className="relative rounded-3xl overflow-hidden aspect-video bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200">
              <span className="text-xl font-bold font-headline text-slate-400">Live News Feed</span>
              <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">LIVE</div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, data, icon: Icon, trendColor = "text-emerald-600" }: { title: string; value: string; trend: string; data: any[], icon: any, trendColor?: string }) {
  return (
    <Card className="bg-white shadow-sm border border-slate-200 overflow-hidden relative group hover:shadow-md transition-all duration-300 rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</CardTitle>
        <div className="p-2.5 bg-slate-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">
          <Icon className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-end justify-between">
           <div>
             <div className="text-3xl font-black font-headline tracking-tighter">{value}</div>
             <p className={`text-[10px] font-bold mt-1 ${trendColor}`}>{trend}</p>
           </div>
           <div className="h-10 w-24">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={trendColor.includes('red') ? '#EF4444' : '#10B981'} 
                    strokeWidth={2.5} 
                    dot={false} 
                  />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({ label, sub, icon: Icon, id }: { label: string, sub: string, icon: any, id: string }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[32px] hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute top-4 right-4 text-[10px] font-black text-slate-200">{id}</div>
      <div className="p-4 bg-slate-50 rounded-[24px] mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
        <Icon className="h-6 w-6" />
      </div>
      <p className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">{label}</p>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${sub.includes('new') ? 'text-emerald-500' : 'text-slate-400'}`}>{sub}</p>
    </div>
  );
}

function EventItem({ title, day, date, icon: Icon, isDateIcon }: { title: string, day: string, date: string, icon?: any, isDateIcon?: boolean }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer lg:p-1">
       {isDateIcon ? (
         <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center group-hover:bg-sky-50 transition-colors shadow-sm">
            <span className="text-[10px] font-black text-slate-400 leading-none mb-1">APR</span>
            <span className="text-lg font-black text-slate-900 leading-none">{date}</span>
         </div>
       ) : (
         <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 transition-colors shadow-sm">
            <Icon className="h-5 w-5 text-slate-400" />
         </div>
       )}
       <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-slate-900 truncate">{title}</p>
          <p className="text-xs text-slate-500">({day})</p>
       </div>
    </div>
  );
}

function ActivityItem({ title, user, time, dotColor }: { title: string, user: string, time: string, dotColor: string }) {
  return (
    <div className="flex items-start gap-4 p-1">
       <div className={`mt-2 h-2 w-2 rounded-full ${dotColor} flex-shrink-0 animate-pulse`} />
       <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 leading-tight">
            {title} <span className="text-slate-500 font-medium">({user})</span>
          </p>
          <p className="text-[10px] font-bold text-slate-400 mt-0.5">{time}</p>
       </div>
    </div>
  );
}

function TaskItem({ label, checked }: { label: string, checked: boolean }) {
  return (
    <div className="flex items-center gap-3 p-1 group cursor-pointer">
       {checked ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-slate-200 group-hover:text-slate-400 transition-colors" />}
       <p className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{label}</p>
    </div>
  )
}
