"use client";

import {
  Bell,
  Search,
  MapPin,
  Sun,
  CloudSun,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  LogOut,
  User,
  Settings,
  ChevronDown
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long' });

  return (
    <header className="relative z-50 bg-[#172D13] text-white p-6 shadow-2xl min-h-[180px]">
      <div className="flex flex-col gap-6">
        {/* Top Row: Title, Search, and Profile */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <SidebarTrigger className="text-white" />
            </div>
            <h1 className="text-2xl font-black font-headline tracking-tighter uppercase">
              EMS DASHBOARD
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              <Search className="h-4 w-4" />
            </div>
            <input 
              type="text" 
              placeholder="Quick Search (Students, Staff...)" 
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-white/40"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-white/50 border border-white/10">Cmd + K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white hover:bg-white/10">
                 <Zap className="h-5 w-5" />
               </Button>
               <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white hover:bg-white/10 relative">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-[#172D13]" />
               </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <Avatar className="h-10 w-10 border-2 border-white/20 transition-all group-hover:border-white/40">
                    <AvatarImage src="https://ui-avatars.com/api/?name=Admin+Alex&background=6BB77B&color=fff" alt="@admin" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-sm font-bold leading-none flex items-center gap-1">Admin Alex <ChevronDown className="h-3 w-3 opacity-50" /></span>
                    <span className="text-[10px] text-white/60 font-medium">Head Administrator</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Institutional Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Administrative Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>System Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bottom Row: Welcome Info, Insight Pills, and Weather */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <span>Welcome, </span>
              <span className="text-white font-bold">Admin Alex</span>
              <span className="flex items-center gap-1 ml-2 text-white/50">
                <MapPin className="h-3.5 w-3.5" />
                Addis Ababa
              </span>
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">Welcome to Campus Hub</h2>
            <p className="text-sm text-white/60 max-w-xl">
              Here's your institutional overview for March 2026. Manage students, monitor finances, and broadcast announcements seamlessly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-black text-white/40 text-left">Admin Insight Pills</span>
              <div className="flex gap-2">
                <InsightPill label="5 Pending Admissions" color="emerald" count="5" />
                <InsightPill label="3 Overdue Invoices" color="orange" count="3" />
                <InsightPill label="2 System Alerts" color="red" count="2" />
              </div>
            </div>

            <div className="ml-4 pl-4 border-l border-white/10 flex items-center gap-4">
               <div className="flex flex-col text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Sun className="h-5 w-5 text-yellow-400" />
                    <CloudSun className="h-5 w-5 text-white/40" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">Today</span>
                  <span className="text-sm font-bold truncate">{currentDate}</span>
                  <span className="text-[10px] text-white/50 flex items-center justify-end gap-1"><MapPin className="h-2 w-2" /> Addis Ababa</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function InsightPill({ label, color, count }: { label: string, color: 'emerald' | 'orange' | 'red', count: string }) {
  const colors = {
    emerald: 'bg-emerald-500/20 text-emerald-100 border-emerald-500/30',
    orange: 'bg-orange-500/20 text-orange-100 border-orange-500/30',
    red: 'bg-red-500/20 text-red-100 border-red-500/30'
  };

  const bulletColors = {
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors[color]} text-[10px] font-bold shadow-sm whitespace-nowrap`}>
      <span className={`h-4 w-4 flex items-center justify-center rounded-full text-[8px] text-white ${bulletColors[color]}`}>
        {count}
      </span>
      {label}
    </div>
  );
}
