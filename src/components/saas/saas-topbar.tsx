"use client";

import { Bell, Search, Menu, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SaasTopbar() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left Box: Global Search */}
            <div className="flex-1 max-w-xl flex items-center gap-4">
                <button className="lg:hidden text-slate-500 hover:text-slate-900">
                    <Menu className="h-5 w-5" />
                </button>
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Cmd+K to search schools, users, invoices..." 
                        className="w-full pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 rounded-xl"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-medium text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">
                        ⌘K
                    </div>
                </div>
            </div>

            {/* Right Box: Actions & Profile */}
            <div className="flex items-center gap-4 ml-auto">
                {/* System Status Alert Indicator */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-700">All Systems Operational</span>
                </div>

                <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                </button>

                <div className="h-6 w-px bg-slate-200 mx-2" />

                <button className="flex items-center gap-2 pl-2">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-slate-900">Platform Owner</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Super Admin</div>
                    </div>
                    <UserCircle className="h-8 w-8 text-slate-300" />
                </button>
            </div>
        </header>
    );
}
