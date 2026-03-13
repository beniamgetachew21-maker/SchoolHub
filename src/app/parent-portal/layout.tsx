
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parent Portal - Campus Hub",
  description: "View your child's progress and stay updated.",
};

export default function ParentPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative selection:bg-emerald-500/30">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        
      <div className="p-4 md:p-6 sticky top-0 z-50">
        <header className="w-full max-w-7xl mx-auto rounded-[2rem] border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
          <div className="flex h-20 items-center justify-between px-6 md:px-8">
              <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 emerald-gradient rounded-2xl shadow-lg shadow-emerald-500/30 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                  </div>
                  <div className="flex flex-col">
                      <h1 className="text-xl font-black font-headline tracking-tight text-slate-900 dark:text-white uppercase group-hover:text-emerald-700 transition-colors">Campus Hub</h1>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Global Academy • Parent</p>
                  </div>
              </div>
              
              <nav className="hidden md:flex items-center gap-2 lg:gap-4 absolute left-1/2 -translate-x-1/2">
                  <Link href="/parent-portal" className="text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-5 py-2.5 rounded-full transition-all">Dashboard</Link>
                  <Link href="#" className="text-sm font-bold text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800/50 px-5 py-2.5 rounded-full transition-all">Messages</Link>
                  <Link href="#" className="text-sm font-bold text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800/50 px-5 py-2.5 rounded-full transition-all">Fees</Link>
                  <Link href="#" className="text-sm font-bold text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800/50 px-5 py-2.5 rounded-full transition-all">Calendar</Link>
              </nav>

              <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="group relative h-11 w-11 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hidden sm:flex">
                      <Bell className="h-5 w-5 text-slate-500 group-hover:text-emerald-600 transition-colors"/>
                      <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-4 ring-white dark:ring-slate-900 animate-pulse" />
                  </Button>
                  
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden lg:block mx-1" />

                  <div className="flex items-center gap-3">
                      <div className="text-right hidden lg:block">
                          <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-none">Ato Bekele Abiy</p>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Primary Parent</p>
                      </div>
                      <div className="relative group cursor-pointer">
                          <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                          <Avatar className="relative h-11 w-11 ring-2 ring-white dark:ring-slate-800 shadow-md transition-transform duration-300 group-hover:scale-105">
                              <AvatarImage src="/avatars/abiy.jpg" alt="@parent" className="object-cover" />
                              <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-800 font-black">B</AvatarFallback>
                          </Avatar>
                      </div>
                  </div>

                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 transition-all ml-1 hidden sm:flex" asChild>
                      <Link href="/login">
                          <LogOut className="h-5 w-5" />
                      </Link>
                  </Button>
              </div>
          </div>
        </header>
      </div>
      <main className="container mx-auto px-4 py-10 md:px-8">
        {children}
      </main>
      <footer className="py-10 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
                Empowering Education through Excellence • © {new Date().getFullYear()} Global Academy
            </p>
        </div>
      </footer>
    </div>
  );
}
