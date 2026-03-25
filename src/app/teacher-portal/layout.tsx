
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, BookOpen } from "lucide-react";
import Link from "next/link";
import { getTeacher } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Teacher Portal - Campus Hub",
  description: "Manage classes, attendance, and student performance.",
};

export default async function TeacherPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teacher = await getTeacher();

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative selection:bg-emerald-500/30">
      {/* Sticky glassmorphic nav bar */}
      <div className="p-4 md:p-6 sticky top-0 z-50">
        <header className="w-full max-w-[1600px] mx-auto rounded-[2rem] border border-white/40 dark:border-white/10 bg-white/70 backdrop-blur-2xl shadow-xl shadow-slate-200/50 transition-all duration-300">
          <div className="flex h-20 items-center justify-between px-6 md:px-8">
            {/* Logo */}
            <Link href="/teacher-portal" className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-[#163D2D] rounded-2xl shadow-lg ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black font-headline tracking-tight text-slate-900 uppercase group-hover:text-emerald-700 transition-colors">
                  Campus Hub
                </h1>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">
                  Faculty Portal
                </p>
              </div>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 absolute left-1/2 -translate-x-1/2">
              {[
                { href: "/teacher-portal", label: "Dashboard" },
                { href: "/teacher-portal/timetable", label: "Schedule" },
                { href: "/academics/attendance", label: "Attendance" },
                { href: "/academics/examinations", label: "Grading" },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-bold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-full transition-all"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="group relative h-11 w-11 rounded-full hover:bg-slate-100 transition-all hidden sm:flex">
                <Bell className="h-5 w-5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-4 ring-white animate-pulse" />
              </Button>

              <div className="h-8 w-px bg-slate-200 hidden lg:block" />

              <div className="flex items-center gap-3">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-black text-slate-900 tracking-tight leading-none">{teacher?.name ?? "Faculty"}</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{teacher?.designation ?? "Educator"}</p>
                </div>
                <Avatar className="h-11 w-11 ring-2 ring-white shadow-md">
                  <AvatarImage src={teacher?.avatarUrl ?? undefined} alt={teacher?.name ?? "Teacher"} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-800 font-black">
                    {teacher?.name?.charAt(0) ?? "T"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all ml-1 hidden sm:flex" asChild>
                <Link href="/login">
                  <LogOut className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>
      </div>

      <main className="w-full">
        {children}
      </main>

      <footer className="py-10 border-t border-slate-100 mt-8">
        <div className="max-w-[1600px] mx-auto px-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
            Empowering Educators · © {new Date().getFullYear()} Global Academy
          </p>
        </div>
      </footer>
    </div>
  );
}
