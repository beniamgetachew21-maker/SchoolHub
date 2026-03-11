
"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    Settings,
    Users,
    GraduationCap,
    DollarSign,
    LifeBuoy,
    BookMarked,
    PenSquare,
    Bus,
    Briefcase,
    HeartHandshake,
    Bed,
    UtensilsCrossed,
    Megaphone,
    Activity,
    HeartPulse,
    Sparkles,
    BadgeHelp,
    Contact,
    Package,
    CalendarCheck,
    Gavel,
    CreditCard,
    CalendarClock,
    ShieldCheck,
    UserPlus,
    BookOpen,
    BarChart3,
    Lock,
    Search,
    Bell,
    CheckSquare,
    MessageSquare, Receipt, Building, FileDigit, LineChart, Calendar,
    FileText, PenTool, Library
} from "lucide-react";

interface NavItem {
    href: string;
    label: string;
    icon: any;
    basePath?: string;
    isExternal?: boolean;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const navSections: NavSection[] = [
    {
        title: "Administration",
        items: [
            { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { href: "/admin/core", label: "Core Admin", icon: ShieldCheck, basePath: "/admin/core" },
            { href: "/hr/directory", label: "Human Resources", icon: Briefcase, basePath: "/hr" },
            { href: "/admin/security", label: "Security & Access", icon: Lock, basePath: "/admin/security" },
        ]
    },
    {
        title: "Student Lifecycle",
        items: [
            { href: "/students", label: "SIS (Profiles)", icon: Users, basePath: "/students" },
            { href: "/admissions/applications", label: "Admissions", icon: UserPlus, basePath: "/admissions" },
            { href: "/alumni/directory", label: "Alumni Hub", icon: HeartHandshake, basePath: "/alumni" },
        ]
    },
    {
        title: "Academic Excellence",
        items: [
            { href: "/lms/courses", label: "LMS (Learning)", icon: BookOpen, basePath: "/lms" },
            { href: "/academics/timetable", label: "Scheduling", icon: CalendarClock, basePath: "/academics/timetable" },
            { href: "/academics/attendance", label: "Attendance", icon: CalendarCheck, basePath: "/academics/attendance" },
            { href: "/academics/examinations", label: "Examinations", icon: PenSquare, basePath: "/academics/examinations" },
            { href: "/analytics", label: "Analytics & Reports", icon: BarChart3, basePath: "/analytics" },
        ]
    },
    {
        title: "Campus Operations",
        items: [
            { href: "/finance/fees", label: "Finance & Billing", icon: DollarSign, basePath: "/finance" },
            { href: "/inventory/dashboard", label: "Inventory", icon: Package, basePath: "/inventory" },
            { href: "/transport/dashboard", label: "Transportation", icon: Bus, basePath: "/transport" },
            { href: "/hostel/dashboard", label: "Hostel/Dorms", icon: Bed, basePath: "/hostel" },
            { href: "/library/books", label: "Library System", icon: BookMarked, basePath: "/library" },
        ]
    },
    {
        title: "Financial Management",
        items: [
            { href: "/finance", label: "Financial Overview", icon: DollarSign, basePath: "/finance" },
        ]
    }
];

const studentsSubmenu = [
    { href: "/students", label: "Student Directory" },
    { href: "/students/leave", label: "Leave Management" },
    { href: "/students/discipline", label: "Discipline" },
];

const academicsSubmenu = [
    { href: "/academics/classes", label: "Classes & Subjects" },
    { href: "/academics/timetable", label: "Timetable & Scheduling" },
    { href: "/academics/attendance", label: "Attendance Tracking" },
    { href: "/academics/examinations", label: "Exams & Grading" },
    { href: "/academics/pending-registrations", label: "Term Enrollments" },
];

const admissionsSubmenu = [
    { href: "/admissions/applications", label: "Applications Dashboard" },
    { href: "/admissions/interviews", label: "Interviews" },
    { href: "/admissions/exams", label: "Entrance Exams" },
    { href: "/register", label: "Registration Portal" },
];

const lmsSubmenu = [
    { href: "/lms/courses", label: "Course Materials" },
    { href: "/lms/assignments", label: "Assignments" },
    { href: "/lms/quizzes", label: "Quizzes & Exams" },
    { href: "/lms/forums", label: "Discussion Forums" },
];

const analyticsSubmenu = [
    { href: "/analytics/overview", label: "Institutional KPIs" },
    { href: "/analytics/students", label: "Student Trends" },
    { href: "/analytics/finance", label: "Financial Reports" },
];

const adminSubmenu = [
    { href: "/admin/core", label: "Institutional Setup" },
    { href: "/admin/calendar", label: "Academic Calendar" },
    { href: "/admin/docs", label: "Document Management" },
    { href: "/admin/security", label: "Security Controls" },
];

const financeSubmenu = [
    { href: "/finance/fees", label: "Fees Management" },
    { href: "/finance/payments", label: "Payments" },
    { href: "/finance/payroll", label: "Payroll" },
    { href: "/finance/manual-payroll", label: "Manual Calculator" },
    { href: "/finance/accounts", label: "Accounts" },
];

const hrSubmenu = [
    { href: "/hr/directory", label: "Employee Directory" },
    { href: "/hr/recruitment", label: "Recruitment" },
    { href: "/hr/onboarding", label: "Onboarding" },
    { href: "/hr/leave", label: "Leave Management" },
    { href: "/hr/positions", label: "Job Positions" },
];

const transportSubmenu = [
    { href: "/transport/dashboard", label: "Dashboard" },
    { href: "/transport/routes", label: "Route Management" },
    { href: "/transport/vehicles", label: "Vehicle Management" },
    { href: "/transport/drivers", label: "Driver Management" },
];

const hostelSubmenu = [
    { href: "/hostel/dashboard", label: "Dashboard" },
    { href: "/hostel/rooms", label: "Room Management" },
    { href: "/hostel/allocations", label: "Room Allocations" },
    { href: "/hostel/visitors", label: "Visitor Logs" },
];

const alumniSubmenu = [
    { href: "/alumni/directory", label: "Directory" },
    { href: "/alumni/events", label: "Events" },
    { href: "/alumni/jobs", label: "Jobs Portal" },
    { href: "/alumni/donations", label: "Donations" },
];

const extracurricularsSubmenu = [
    { href: "/extracurriculars/clubs", label: "Clubs & Societies" },
    { href: "/extracurriculars/events", label: "Events" },
    { href: "/extracurriculars/achievements", label: "Achievements" },
];

const communicationSubmenu = [
    { href: "/communication", label: "Communication Hub" },
    { href: "/communication/newsletter", label: "Newsletter" },
    { href: "/communication/subscribers", label: "Subscribers" },
]

const healthSubmenu = [
    { href: "/health/dashboard", label: "Dashboard" },
    { href: "/health/visit-logs", label: "Visit Logs" },
];

const librarySubmenu = [
    { href: "/library/books", label: "Book Inventory" },
    { href: "/library/borrow-requests", label: "Borrow Requests" },
];

const inventorySubmenu = [
    { href: "/inventory/dashboard", label: "Dashboard" },
    { href: "/inventory/management", label: "All Items" },
    { href: "/inventory/allocations", label: "Asset Allocations" },
    { href: "/inventory/maintenance", label: "Maintenance Logs" },
    { href: "/inventory/purchase-orders", label: "Purchase Orders" },
    { href: "/inventory/vendors", label: "Vendors" },
];


export function SidebarNavComponent() {
    const pathname = usePathname();

    const checkActive = React.useCallback((item: { href: string; basePath?: string }) => {
        if (item.basePath) {
            return pathname.startsWith(item.basePath);
        }
        return pathname === item.href;
    }, [pathname]);

    const renderSubmenu = React.useCallback((basePath: string) => {
        let submenu = [];
        if (basePath === "/students") submenu = studentsSubmenu;
        else if (basePath === "/academics") submenu = academicsSubmenu;
        else if (basePath === "/finance") submenu = financeSubmenu;
        else if (basePath === "/hr") submenu = hrSubmenu;
        else if (basePath === "/alumni") submenu = alumniSubmenu;
        else if (basePath === "/hostel") submenu = hostelSubmenu;
        else if (basePath === "/transport") submenu = transportSubmenu;
        else if (basePath === "/extracurriculars") submenu = extracurricularsSubmenu;
        else if (basePath === "/communication") submenu = communicationSubmenu;
        else if (basePath === "/health") submenu = healthSubmenu;
        else if (basePath === "/library") submenu = librarySubmenu;
        else if (basePath === "/inventory") submenu = inventorySubmenu;
        else if (basePath === "/admissions") submenu = admissionsSubmenu;
        else if (basePath === "/lms") submenu = lmsSubmenu;
        else if (basePath === "/analytics") submenu = analyticsSubmenu;
        else if (basePath.startsWith("/admin")) submenu = adminSubmenu;
        else return null;

        return (
            <ul className="pl-6 pt-1 space-y-1 border-l ml-4">
                {submenu.map(subItem => (
                    <li key={subItem.label}>
                        <Link href={subItem.href} prefetch={true} target={subItem.href.startsWith('http') ? '_blank' : undefined}>
                            <SidebarMenuButton
                                isActive={pathname === subItem.href || (subItem.href.includes('timetable') && pathname.includes('timetable'))}
                                className="w-full justify-start"
                            >
                                {subItem.label}
                            </SidebarMenuButton>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }, [pathname, checkActive]);

    return (
        <>
            <SidebarHeader className="border-b">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary font-bold"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold font-headline tracking-tight">EthioEdu</h2>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Global Academy</p>
                    </div>
                </div>
            </SidebarHeader>

            <div className="flex-1 overflow-y-auto p-2 space-y-4">
                {navSections.map(section => (
                    <div key={section.title}>
                        <p className="text-xs text-muted-foreground px-2 pt-2 pb-1 font-medium select-none">{section.title}</p>
                        <SidebarMenu>
                            {(section.items as NavItem[]).map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <Link href={item.href} prefetch={true} target={item.isExternal ? "_blank" : undefined}>
                                        <SidebarMenuButton
                                            isActive={checkActive(item)}
                                            tooltip={{ children: item.label }}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                    {item.basePath && checkActive(item) && renderSubmenu(item.basePath)}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </div>
                ))}
            </div>

            <SidebarFooter className="border-t p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LifeBuoy className="h-5 w-5" />
                            <span>Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    );
}

export const SidebarNav = React.memo(SidebarNavComponent);
