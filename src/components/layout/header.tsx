"use client";

import {
  Bell, Search, MapPin, Sun, CloudSun, ShieldCheck, Zap, LogOut,
  User, Settings, ChevronDown, ArrowLeft
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// ─── Route metadata map ─────────────────────────────────────────────────────
// Add or extend entries here whenever a new page is added.
const PAGE_INFO: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Welcome to Campus Hub",
    subtitle:
      "Here's your institutional overview for March 2026. Manage students, monitor finances, and broadcast announcements seamlessly.",
  },
  // Administration
  "/admin/core": { title: "Core Admin", subtitle: "Manage system-wide settings, roles, and configurations." },
  "/admin/security": { title: "Security & Access", subtitle: "Monitor access policies, roles, and audit trails." },
  "/admin/docs": { title: "Institutional Documents", subtitle: "Secure repository for legal, academic, and administrative records." },
  // HR
  "/hr/directory": { title: "Welcome to Campus Hub", subtitle: "Here's your institutional overview for March 2026. Manage staff records, monitor human capital metrics, and coordinate operations seamlessly." },
  "/hr/leave": { title: "Leave Management", subtitle: "Approve and track staff leave requests and entitlements." },
  "/hr/onboarding": { title: "Staff Onboarding", subtitle: "Streamline the onboarding process for new employees." },
  "/hr/recruitment": { title: "Recruitment", subtitle: "Post vacancies, shortlist candidates, and manage interviews." },
  "/hr/positions": { title: "Positions & Grades", subtitle: "Define job positions, pay grades, and organisational hierarchy." },
  // Student Lifecycle
  "/students": { title: "SIS — Student Profiles", subtitle: "Search, manage, and review student academic records and personal details." },
  "/students/leave": { title: "Student Leave", subtitle: "Review and approve student leave applications." },
  "/students/discipline": { title: "Discipline Records", subtitle: "Track and manage student conduct and disciplinary actions." },
  "/admissions/applications": { title: "Admissions", subtitle: "Review applications, manage enrolments, and generate admission letters." },
  "/admissions/enquiries": { title: "Admission Enquiries", subtitle: "Handle prospective student enquiries and follow-ups." },
  "/alumni/directory": { title: "Alumni Hub", subtitle: "Stay connected with graduates and manage alumni relations." },
  // Academic Excellence
  "/lms/courses": { title: "LMS — Courses", subtitle: "Manage learning content, assignments, and course delivery." },
  "/lms/assignments": { title: "LMS — Assignments", subtitle: "Track and grade student assignment submissions." },
  "/lms/resources": { title: "LMS — Resources", subtitle: "Upload and organise learning materials and digital assets." },
  "/academics/timetable": { title: "Timetable Builder", subtitle: "Schedule classes, assign teachers, and manage room allocations." },
  "/academics/attendance": { title: "Attendance Tracking", subtitle: "Monitor and report student daily and per-subject attendance." },
  "/academics/examinations": { title: "Examinations & Grading", subtitle: "Schedule exams, enter marks, and publish results." },
  "/academics/classes": { title: "Classes & Subjects", subtitle: "Manage academic classes, streams, and subject allocations." },
  "/academics/pending-registrations": { title: "Term Enrolments", subtitle: "Review and confirm student course registrations each term." },
  "/analytics": { title: "Analytics & Reports", subtitle: "Gain insights through data-driven dashboards and exportable reports." },
  // Campus Operations
  "/finance": { title: "Financial Overview", subtitle: "Monitor income, expenditure, and institutional financial health." },
  "/finance/fees": { title: "Fees & Billing", subtitle: "Generate invoices, record payments, and manage fee structures." },
  "/finance/payroll": { title: "Payroll", subtitle: "Process staff salaries, deductions, and payslip generation." },
  "/finance/budget": { title: "Budget Planning", subtitle: "Set, monitor, and adjust departmental budgets." },
  "/inventory/dashboard": { title: "Inventory Management", subtitle: "Track assets, manage stock levels, and handle procurement requests." },
  "/transport/dashboard": { title: "Transport Management", subtitle: "Coordinate school vehicles, routes, and student travel assignments." },
  "/hostel/dashboard": { title: "Hostel & Dorms", subtitle: "Manage dormitory allocations, occupancy, and residential services." },
  "/library/books": { title: "Library System", subtitle: "Catalogue books, manage borrow records, and track overdue items." },
  // Other
  "/settings": { title: "System Settings", subtitle: "Configure application preferences, integrations, and data management." },
  "/id-cards": { title: "ID Card Generator", subtitle: "Design, print, and distribute digital student identity cards." },
  "/health/dashboard": { title: "Health & Medical", subtitle: "Maintain student and staff health records and medical incidents." },
  "/cafeteria/menu": { title: "Cafeteria & Catering", subtitle: "Manage daily menu, dietary information, and cafeteria finances." },
  "/extracurriculars": { title: "Extracurricular Activities", subtitle: "Administer clubs, sports teams, and after-school programmes." },
  "/communication/messages": { title: "Communications Hub", subtitle: "Send announcements, messages, and notifications campus-wide." },
  "/onboarding": { title: "Onboarding Wizard", subtitle: "Set up your institution step by step before going live." },
};

/** Resolve page info for the current pathname, supporting nested routes. */
function resolvePageInfo(pathname: string) {
  // Exact match first
  if (PAGE_INFO[pathname]) return PAGE_INFO[pathname];
  // Then longest prefix match (e.g. /hr/directory/123 → /hr/directory)
  const sorted = Object.keys(PAGE_INFO).sort((a, b) => b.length - a.length);
  for (const key of sorted) {
    if (pathname.startsWith(key + "/") || pathname.startsWith(key)) {
      return PAGE_INFO[key];
    }
  }
  // Fallback: humanise the last path segment
  const segment = pathname.split("/").filter(Boolean).pop() ?? "Page";
  const title = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title, subtitle: "" };
}

function isDashboard(pathname: string) {
  return pathname === "/dashboard" || pathname === "/";
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const currentDate = new Date().toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "long" });

  const pageInfo = resolvePageInfo(pathname);
  const onDashboard = isDashboard(pathname);
  const onHrDirectory = pathname === "/hr/directory";

  // Client-side fetch for HR Insight Pills
  const [hrStats, setHrStats] = useState({ total: 0, onLeave: 0, activeRoles: 0 });
  
  // Hide global header on specific profile pages that have their own bespoke 360 headers
  const isEmployeeProfile = pathname.startsWith("/hr/directory/") && pathname !== "/hr/directory";
  
  useEffect(() => {
    if (onHrDirectory && !isEmployeeProfile) {
      import("@/lib/actions").then(({ getEmployees }) => {
        getEmployees().then(emps => {
          if (Array.isArray(emps)) {
            const activeRoles = new Set(emps.filter((e: any) => e.status === "Active").map((e: any) => e.designation)).size;
            setHrStats({
              total: emps.length,
              onLeave: emps.filter((e: any) => e.status === "OnLeave").length,
              activeRoles
            });
          }
        });
      });
    }
  }, [onHrDirectory, isEmployeeProfile]);

  if (isEmployeeProfile) {
      return null; // Return nothing, let the 360 view handle the header
  }

  return (
    <header className="relative z-50 bg-[#172D13] text-white p-6 shadow-2xl min-h-[180px]">
      <div className="flex flex-col gap-6">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <SidebarTrigger className="text-white" />
            </div>
            {!onDashboard ? (
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-widest hidden sm:block">Back</span>
              </button>
            ) : (
              <h1 className="text-2xl font-black font-headline tracking-tighter uppercase">
                EMS DASHBOARD
              </h1>
            )}
          </div>

          {/* Search */}
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
              <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-white/50 border border-white/10">
                Cmd + K
              </kbd>
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
                    <AvatarImage src="/avatars/tadesse.jpg" alt="@admin" className="object-cover" />
                    <AvatarFallback className="bg-emerald-700 text-white font-bold">TW</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-sm font-bold leading-none flex items-center gap-1">
                      Tadesse Worku <ChevronDown className="h-3 w-3 opacity-50" />
                    </span>
                    <span className="text-[10px] text-white/60 font-medium">Senior HR Manager</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Tadesse Worku</DropdownMenuLabel>
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

        {/* Bottom Row: dynamic content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-1">
            {!onDashboard && (
              <div className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                {/* Breadcrumb trail */}
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <span>/</span>
                <span className="text-white/80">{pageInfo.title}</span>
              </div>
            )}
            {(onDashboard || onHrDirectory) && (
              <div className="flex items-center gap-2 text-white/70 text-sm font-medium mb-1">
                <span>Welcome, </span>
                <span className="text-white font-bold">Tadesse Worku</span>
                <span className="flex items-center gap-1 ml-2 text-white/50">
                  <MapPin className="h-3.5 w-3.5" />
                  Addis Ababa
                </span>
              </div>
            )}
            <h2 className="text-3xl font-bold font-headline tracking-tight">{pageInfo.title}</h2>
            {pageInfo.subtitle && (
              <p className="text-sm text-white/60 max-w-xl">{pageInfo.subtitle}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            {onDashboard && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest font-black text-white/40 text-left">
                  Admin Insight Pills
                </span>
                <div className="flex gap-2">
                  <InsightPill label="5 Pending Admissions" color="emerald" count="5" />
                  <InsightPill label="3 Overdue Invoices" color="orange" count="3" />
                  <InsightPill label="2 System Alerts" color="red" count="2" />
                </div>
              </div>
            )}

            {onHrDirectory && (
               <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest font-black text-white/40 text-right">
                  HR Insight Pills
                </span>
                <div className="flex gap-3">
                    <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20 flex items-center gap-2">
                        <div className="bg-emerald-500 rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-black shadow-inner pb-0.5">
                            S
                        </div>
                        <span className="text-sm font-bold text-white">Total Staff: {hrStats.total}</span>
                    </div>
                    <div className="bg-amber-500/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-amber-500/30 flex items-center gap-2">
                        <div className="bg-amber-500 rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-black shadow-inner pb-0.5 text-amber-950">
                            L
                        </div>
                        <span className="text-sm font-bold text-amber-50">On Leave: {hrStats.onLeave}</span>
                    </div>
                    <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-blue-500/30 flex items-center gap-2">
                        <div className="bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-black shadow-inner pb-0.5 text-blue-950">
                            R
                        </div>
                        <span className="text-sm font-bold text-blue-50">Active Roles: {hrStats.activeRoles}</span>
                    </div>
                </div>
               </div>
            )}

            <div className={`${(onDashboard || onHrDirectory) ? "ml-4 pl-4 border-l border-white/10" : ""} flex items-center gap-4`}>
              <div className="flex flex-col text-right">
                <div className="flex items-center justify-end gap-2">
                  <Sun className="h-5 w-5 text-yellow-400" />
                  <CloudSun className="h-5 w-5 text-white/40" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">Today</span>
                <span className="text-sm font-bold truncate">{currentDate}</span>
                <span className="text-[10px] text-white/50 flex items-center justify-end gap-1">
                  <MapPin className="h-2 w-2" /> Addis Ababa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function InsightPill({ label, color, count }: { label: string; color: "emerald" | "orange" | "red"; count: string }) {
  const colors = {
    emerald: "bg-emerald-500/20 text-emerald-100 border-emerald-500/30",
    orange: "bg-orange-500/20 text-orange-100 border-orange-500/30",
    red: "bg-red-500/20 text-red-100 border-red-500/30",
  };
  const bulletColors = { emerald: "bg-emerald-500", orange: "bg-orange-500", red: "bg-red-500" };
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors[color]} text-[10px] font-bold shadow-sm whitespace-nowrap`}>
      <span className={`h-4 w-4 flex items-center justify-center rounded-full text-[8px] text-white ${bulletColors[color]}`}>{count}</span>
      {label}
    </div>
  );
}

