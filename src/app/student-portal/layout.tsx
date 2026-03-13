import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Portal - Digital Campus",
  description: "Access your courses, assessments, and academic records.",
};

export default function StudentPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950">
      <header className="sticky top-0 z-50 w-full border-b border-emerald-500/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-black font-headline tracking-tight text-slate-900 dark:text-white uppercase">Digital Campus</h1>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Global Academy • Student Portal</p>
                </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 ml-12">
                <Link href="/student-portal" className="text-sm font-bold text-emerald-600 transition-colors">Dashboard</Link>
                <Link href="/student-portal/profile" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors">My Profile</Link>
                <Link href="/student-portal/id-cards" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors">Digital ID</Link>
                <Link href="/student-portal/timetable" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors">Schedule</Link>
            </nav>

            <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon" className="group relative h-10 w-10 rounded-xl hover:bg-emerald-50 transition-colors">
                    <Search className="h-4 w-4 text-slate-400 group-hover:text-emerald-600"/>
                </Button>

                 <Button variant="ghost" size="icon" className="group relative h-10 w-10 rounded-xl hover:bg-emerald-50 transition-colors">
                    <Bell className="h-5 w-5 text-slate-400 group-hover:text-emerald-600"/>
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border-2 border-white" />
                </Button>
                
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-slate-900 dark:text-white">Aida Bekele</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grade 11-A</p>
                    </div>
                    <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20 ring-offset-2 transition-transform hover:scale-110 cursor-pointer">
                        <AvatarImage src="/avatars/aida.jpg" alt="@student" className="object-cover" />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">A</AvatarFallback>
                    </Avatar>
                </div>

                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all" asChild>
                    <Link href="/login">
                        <LogOut className="h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </header>
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
