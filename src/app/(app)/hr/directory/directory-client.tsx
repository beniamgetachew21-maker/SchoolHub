"use client"
import * as React from "react"
import Link from "next/link"
import {
    Briefcase, Building2, Calendar, Mail, Phone,
    Search, UserPlus, FileText, BadgeCheck, MoreHorizontal,
    GraduationCap, Plus, Save, User
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const STATUS_COLORS: Record<string, string> = {
    Active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    OnLeave: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Terminated: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    Probation: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Suspended: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

interface DirectoryClientProps {
    employees: any[];
    currentUser: { name: string; role: string; branch: string; };
}

// Sparkline graph component for teachers
function TeacherSparkline() {
    return (
        <div className="flex flex-col items-end gap-1 w-full mt-2 border-t border-border/50 pt-2 pb-1">
            <div className="flex justify-between w-full text-[10px] text-muted-foreground font-medium mb-1">
                <span>Subject Mastery/Pass Rate</span>
                <span>100</span>
            </div>
            <div className="h-8 w-full relative flex items-end">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
                    <path
                        d="M0,25 L15,15 L30,20 L45,10 L60,18 L75,5 L90,12 L100,5"
                        fill="none"
                        stroke="rgba(16, 185, 129, 0.5)" // Emerald 500
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M0,25 L15,15 L30,20 L45,10 L60,18 L75,5 L90,12 L100,5 L100,30 L0,30 Z"
                        fill="url(#sparkline-gradient)"
                        stroke="none"
                    />
                    <defs>
                        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="flex justify-between w-full text-[9px] text-muted-foreground font-medium mt-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
        </div>
    );
}

// Performance Rating component (Stars)
function PerformanceRating({ rating = 4.2 }: { rating?: number }) {
    return (
        <div className="flex items-center gap-1 text-[11px] font-bold mt-1 text-slate-700">
            <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating.toFixed(1)}
        </div>
    );
}

export function DirectoryClient({ employees, currentUser }: DirectoryClientProps) {
    const [search, setSearch] = React.useState("");
    const [deptFilter, setDeptFilter] = React.useState("All");
    const [categoryFilter, setCategoryFilter] = React.useState("All Categories");
    const [statusFilter, setStatusFilter] = React.useState("Active Status");
    const [isAddOpen, setIsAddOpen] = React.useState(false);

    const departments = ["All", ...new Set(employees.map(e => e.department).filter(Boolean))] as string[];

    const filtered = employees.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.employeeCode.toLowerCase().includes(search.toLowerCase());
        const matchesDept = deptFilter === "All" || e.department === deptFilter;
        const matchesStatus = statusFilter === "Active Status" || statusFilter === "All Statuses" || e.status === statusFilter;
        return matchesSearch && matchesDept && matchesStatus;
    });

    // Calculate Insights
    const totalStaff = employees.length;
    const onLeave = employees.filter(e => e.status === "OnLeave").length;
    const activeRoles = new Set(employees.filter(e => e.status === "Active").map(e => e.designation)).size;

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            {/* Main Content Area */}
            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 pt-6 relative z-10 pb-12">
                
                {/* Advanced Filtering Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 flex flex-wrap lg:flex-nowrap items-center gap-3 mb-8">
                    <div className="relative flex-grow min-w-[250px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search Employees (Name, ID, Role)"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9 bg-slate-50/50 border-slate-200 h-11 text-sm rounded-xl"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">Cmd+K</div>
                    </div>
                    
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[160px] bg-slate-50/50 border-slate-200 h-11 rounded-xl font-medium text-slate-600">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Categories">All Categories</SelectItem>
                            <SelectItem value="Teaching">Teaching</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Support">Support</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={deptFilter} onValueChange={setDeptFilter}>
                        <SelectTrigger className="w-[160px] bg-slate-50/50 border-slate-200 h-11 rounded-xl font-medium text-slate-600">
                            <SelectValue placeholder="Departments" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[160px] bg-slate-50/50 border-slate-200 h-11 rounded-xl font-medium text-slate-600">
                            <SelectValue placeholder="Active Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active Status">Active Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="OnLeave">On Leave</SelectItem>
                            <SelectItem value="Probation">Probation</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select defaultValue="Joined Date">
                        <SelectTrigger className="w-[150px] bg-slate-50/50 border-slate-200 h-11 rounded-xl font-medium text-slate-600">
                            <SelectValue placeholder="Joined Date" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Joined Date">Joined Date</SelectItem>
                            <SelectItem value="Newest">Newest First</SelectItem>
                            <SelectItem value="Oldest">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button className="bg-[#114C35] hover:bg-[#0a2e20] text-white font-bold h-11 px-6 rounded-xl shrink-0 shadow-sm" onClick={() => setIsAddOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(emp => {
                        const isTeacher = emp.department?.toLowerCase().includes("academic");
                        const statusColor = STATUS_COLORS[emp.status] || STATUS_COLORS.Active;
                        const managerName = emp.lineManager ? currentUser.name : (emp.department === "Finance" ? "Tadesse Worku" : currentUser.name);
                        
                        return (
                            <Card key={emp.employeeId} className="bg-white border-slate-200 rounded-3xl hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group overflow-hidden flex flex-col">
                                <CardHeader className="p-6 pb-2 relative flex-grow">
                                    <div className="absolute top-4 right-4 bg-slate-50 hover:bg-slate-100 rounded-full p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-4">
                                            <div className="h-20 w-20 rounded-full p-1 bg-gradient-to-tr from-emerald-100 to-emerald-50">
                                                <div className="h-full w-full rounded-full overflow-hidden bg-white">
                                                    {emp.avatarUrl ? (
                                                        <img src={emp.avatarUrl} alt={emp.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold text-2xl">
                                                            {emp.name?.[0]}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Status Dot */}
                                            <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm" 
                                                 style={{ backgroundColor: emp.status === "Active" ? "#10B981" : emp.status === "OnLeave" ? "#F59E0B" : emp.status === "Probation" ? "#F59E0B" : "#EF4444" }}/>
                                        </div>
                                        
                                        <CardTitle className="font-black text-lg text-slate-900">{emp.name}</CardTitle>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5 mb-1.5">{emp.designation}</p>
                                        <Badge className={cn("text-[10px] font-bold bg-slate-100 text-blue-700 border-none px-2.5 py-0.5", 
                                            emp.department === "Finance" ? "text-amber-700 bg-amber-50" : 
                                            isTeacher ? "text-emerald-700 bg-emerald-50" : "text-blue-700 bg-blue-50"
                                        )}>
                                            {emp.department || "Support"}
                                        </Badge>
                                        
                                        <Badge className={cn("mt-3 text-[10px] font-bold border px-2 py-0", statusColor)}>
                                            {emp.status}
                                        </Badge>
                                    </div>

                                    {/* Detailed Metadata Grid */}
                                    <div className="mt-5 space-y-2.5 w-full text-xs font-medium text-slate-600">
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-1.5 text-emerald-700">
                                                <BadgeCheck className="h-3.5 w-3.5" />
                                                <span className="font-bold">{emp.employeeCode}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5" title="Department">
                                                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                                <span>{emp.department || "Admin"}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <User className="h-3.5 w-3.5" />
                                                <span className="text-[11px]">Direct Manager</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                                                <User className="h-3 w-3 text-emerald-600" />
                                                {managerName}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Calendar className="h-3.5 w-3.5 text-purple-600" />
                                                <span>{new Date(emp.dateOfJoining).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}</span>
                                            </div>
                                            {!isTeacher && <PerformanceRating rating={Math.random() * 1.5 + 3.5} />}
                                        </div>
                                        
                                        {/* Inject Sparkline for Teachers */}
                                        {isTeacher && <TeacherSparkline />}
                                    </div>
                                </CardHeader>
                                
                                {/* Bottom Action Strip */}
                                <CardContent className="p-4 pt-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
                                    <div className="flex justify-between items-center mb-3 px-1 text-slate-400">
                                        <div className="flex items-center gap-2 max-w-[75%]">
                                            <Mail className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                                            <span className="text-[11px] truncate">{emp.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3.5 w-3.5 text-blue-600" />
                                            <MoreHorizontal className="h-3 w-3 opacity-50 ml-1" />
                                        </div>
                                    </div>
                                    
                                    <Link href={`/hr/directory/${emp.employeeId}`} className="block w-full">
                                        <Button className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold h-9 rounded-xl shadow-sm border border-[#0D9488]">
                                            View Profile
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-white mt-6">
                        <Search className="h-10 w-10 opacity-20 mb-3" />
                        <p className="font-bold text-slate-600">No employees match this filter.</p>
                        <Button variant="link" onClick={() => { setSearch(""); setDeptFilter("All"); setCategoryFilter("All Categories"); setStatusFilter("Active Status"); }}>Clear Filters</Button>
                    </div>
                )}

                {/* Quick Add Sheet */}
                <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <SheetContent className="sm:max-w-xl bg-white border-l border-slate-200 overflow-y-auto">
                        <SheetHeader className="pb-6 border-b border-slate-100 mb-6">
                            <SheetTitle className="text-2xl font-black text-slate-900 tracking-tight">Onboard New Employee</SheetTitle>
                            <SheetDescription className="text-slate-500">Enter base profile details to create an employee record.</SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Full Name</Label>
                                    <Input placeholder="John Doe" className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" />
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Email</Label>
                                    <Input type="email" placeholder="john@example.com" className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" />
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Department</Label>
                                    <Select>
                                        <SelectTrigger className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm"><SelectValue placeholder="Select dept" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Academics">Academics</SelectItem>
                                            <SelectItem value="Admin">Administration</SelectItem>
                                            <SelectItem value="Finance">Finance</SelectItem>
                                            <SelectItem value="IT">IT Support</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Designation</Label>
                                    <Input placeholder="e.g. Senior Teacher" className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" />
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Base Salary (ETB)</Label>
                                    <Input type="number" placeholder="45000" className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" />
                                </div>
                                <div className="space-y-2 col-span-2 sm:col-span-1">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Joining Date</Label>
                                    <Input type="date" className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" />
                                </div>
                            </div>
                            <Button className="w-full h-11 bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold rounded-xl mt-4 shadow-sm" onClick={() => setIsAddOpen(false)}>
                                <Save className="mr-2 h-4 w-4" /> Save Employee Profile
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
