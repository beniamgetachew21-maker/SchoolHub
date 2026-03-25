"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, User, Briefcase, GraduationCap, DollarSign, Settings, Bell, LayoutDashboard } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="hidden lg:flex flex-1 max-w-xl relative cursor-pointer group"
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors">
          <Search className="h-4 w-4" />
        </div>
        <div className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-20 text-sm placeholder:text-white/40 text-white/60 flex items-center group-hover:bg-white/20 transition-all">
          Quick Search (Students, Staff, Modules)
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-white/50 border border-white/10 group-hover:bg-white/20 group-hover:text-white/80 transition-all">
            Cmd + K
          </kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Student Lifecycle">
            <CommandItem onSelect={() => runCommand(() => router.push("/students"))}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Student Directory</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admissions/applications"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Admissions & Applications</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandGroup heading="Administration & Staff">
            <CommandItem onSelect={() => runCommand(() => router.push("/hr/directory"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Staff & HR Directory</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/finance"))}>
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Financial Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>System Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Super Admin (Platform)">
            <CommandItem onSelect={() => runCommand(() => router.push("/saas"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>SaaS Command Center</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/saas/tenants"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Manage School Tenants</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/saas/support"))}>
              <Bell className="mr-2 h-4 w-4" />
              <span>Support Tickets</span>
            </CommandItem>
          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  );
}
