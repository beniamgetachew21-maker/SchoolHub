"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect, useMemo } from "react";
import * as React from "react";
import Link from "next/link"
import {
    Briefcase, Building2, Calendar, Mail, Phone,
    Search, UserPlus, FileText, BadgeCheck, MoreHorizontal,
    GraduationCap, Plus, Save, User, ChevronLeft, ChevronRight, Loader2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast";
import { inviteStaffAction, getTenantRolesAction } from "@/lib/actions/user-actions";
import { Checkbox } from "@/components/ui/checkbox";

const STATUS_COLORS: Record<string, string> = {
    Active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    OnLeave: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Terminated: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    Probation: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Suspended: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

interface DirectoryClientProps {
    employees: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
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

export function DirectoryClient({ employees, totalCount, totalPages, currentPage, currentUser }: DirectoryClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Controlled search input with debounced URL update
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [roles, setRoles] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        dateOfJoining: new Date().toISOString().split('T')[0],
        gender: "Prefer not to say",
        dob: "1990-01-01",
        status: "Active"
    });

    const [systemAccess, setSystemAccess] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [invitedPassword, setInvitedPassword] = useState<string | null>(null);

    // Fetch roles on open
    useEffect(() => {
        if (isAddOpen) {
            getTenantRolesAction().then(res => {
                if (res.success) {
                    setRoles(res.roles);
                    if (res.roles.length > 0 && !selectedRoleId) {
                        setSelectedRoleId(res.roles[0].id);
                    }
                }
            });
        }
    }, [isAddOpen, selectedRoleId]);

    // Fetch departments once for the filter
    const [departments, setDepartments] = useState<string[]>(["All"]);
    useEffect(() => {
        // In a real app we'd fetch this from a distinct-query action
        // For now, we'll try to get it if we haven't already.
        const depts = ["All", "Academic", "Administration", "Finance", "IT Support", "Security", "Support Staff"];
        setDepartments(depts);
    }, []);

    const deptFilter = searchParams.get("dept") || "All";
    const statusFilter = searchParams.get("status") || "Active Status";

    const createQueryString = useCallback(
        (params: Record<string, string | null>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(params)) {
                if (value === null) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, value);
                }
            }
            return newSearchParams.toString();
        },
        [searchParams]
    );

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (searchParams.get("q") || "")) {
                router.push(`?${createQueryString({ q: searchQuery || null, page: "1" })}`);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, router, createQueryString, searchParams]);

    const handleDeptChange = (dept: string) => {
        router.push(`?${createQueryString({ dept: dept === "All" ? null : dept, page: "1" })}`);
    };

    const handleStatusChange = (status: string) => {
        router.push(`?${createQueryString({ status: status === "Active Status" ? null : status, page: "1" })}`);
    };

    const handlePageChange = (page: number) => {
        router.push(`?${createQueryString({ page: page.toString() })}`);
    };

    const handleInviteSubmit = async () => {
        if (!formData.name || !formData.email || !formData.department) {
            toast({ title: "Required Fields Missing", description: "Please enter name, email and department.", variant: "destructive" });
            return;
        }

        setSubmitting(true);
        try {
            const createAccount = systemAccess ? { roleId: selectedRoleId } : undefined;
            const res = await inviteStaffAction(formData, createAccount);
            
            if (res.success) {
                const tempPwd = (res.employee as any)?.tempPassword;
                if (tempPwd) {
                    setInvitedPassword(tempPwd);
                    toast({ 
                        title: "Account Created!", 
                        description: `Note: Temporary password is ${tempPwd}. Please copy it now.`,
                        duration: 10000 
                    });
                } else {
                    toast({ title: "Staff Member Onboarded", description: `${formData.name} has been added successfully.` });
                    setIsAddOpen(false);
                    setFormData({
                        name: "",
                        email: "",
                        department: "",
                        designation: "",
                        salary: "",
                        dateOfJoining: new Date().toISOString().split('T')[0],
                        gender: "Prefer not to say",
                        dob: "1990-01-01",
                        status: "Active"
                    });
                    setSystemAccess(false);
                    router.refresh();
                }
            } else {
                toast({ title: "Error", description: res.error || "Failed to add staff member.", variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

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
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-9 bg-slate-50/50 border-slate-200 h-11 text-sm rounded-xl pr-4"
                        />
                    </div>
                    
                    <Select value={deptFilter} onValueChange={handleDeptChange}>
                        <SelectTrigger className="w-[180px] bg-slate-50/50 border-slate-200 h-11 rounded-xl font-medium text-slate-600">
                            <SelectValue placeholder="Departments" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[180px] bg-slate-50/50 border-slate-200 h-11 rounded-xl font-medium text-slate-600">
                            <SelectValue placeholder="Active Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active Status">Active Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="OnLeave">On Leave</SelectItem>
                            <SelectItem value="Probation">Probation</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Button 
                        className="bg-[#114C35] hover:bg-[#0a2e20] text-white font-bold h-11 px-6 rounded-xl shrink-0 shadow-sm ml-auto" 
                        onClick={() => setIsAddOpen(true)}
                    >
                        <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {employees.map(emp => {
                        const isTeacher = emp.department?.toLowerCase().includes("academic");
                        const statusColor = STATUS_COLORS[emp.status] || STATUS_COLORS.Active;
                        const managerName = emp.lineManager ? currentUser.name : (emp.department === "Finance" ? "Tadesse Worku" : currentUser.name);
                        
                        return (
                            <Card key={emp.employeeId} className="bg-white border-slate-200 rounded-3xl hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group overflow-hidden flex flex-col h-full">
                                <CardHeader className="p-6 pb-2 relative flex-grow">
                                    <div className="absolute top-4 right-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className="bg-slate-50 hover:bg-slate-100 rounded-full p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 glass-card border-border/30 rounded-xl shadow-2xl p-2">
                                                <DropdownMenuLabel className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground px-2 py-1.5">Employee Actions</DropdownMenuLabel>
                                                <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-lg font-medium py-3 px-3 hover:bg-emerald-500/10 hover:text-emerald-600">
                                                    <Link href={`/hr/directory/${emp.employeeId}`}>
                                                        <User className="h-4 w-4" /> View Full Profile
                                                    </Link>
                                                </DropdownMenuItem>
                                                {isTeacher && (
                                                    <>
                                                        <DropdownMenuSeparator className="bg-border/10 my-1" />
                                                        <DropdownMenuItem
                                                            onClick={async () => {
                                                                try {
                                                                    const { onboardAcademicStaffAction } = await import("@/lib/flow-actions");
                                                                    const res = await onboardAcademicStaffAction(emp.employeeId, "SEC-10A", "CS-101");
                                                                    if (!res.success) throw new Error(res.error);
                                                                    toast({ title: "Academic Assignment Created", description: `${emp.name} is now assigned to CS-101 for Section 10A.`});
                                                                } catch(e: any) {
                                                                    console.error(e);
                                                                }
                                                            }}
                                                            className="cursor-pointer gap-2 rounded-lg font-medium py-3 px-3 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
                                                        >
                                                            <BadgeCheck className="h-4 w-4" /> Assign to Class (E2E)
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
                                            <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white" 
                                                 style={{ backgroundColor: emp.status === "Active" ? "#10B981" : emp.status === "OnLeave" ? "#F59E0B" : emp.status === "Probation" ? "#F59E0B" : "#EF4444" }}/>
                                        </div>
                                        
                                        <CardTitle className="font-black text-lg text-slate-900">{emp.name}</CardTitle>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5 mb-1.5">{emp.designation}</p>
                                        <Badge className={cn("text-[10px] font-bold bg-slate-100 px-2.5 py-0.5 border-none", 
                                            emp.department === "Finance" ? "text-amber-700 bg-amber-50" : 
                                            isTeacher ? "text-emerald-700 bg-emerald-50" : "text-blue-700 bg-blue-50"
                                        )}>
                                            {emp.department || "Support"}
                                        </Badge>
                                        
                                        <Badge className={cn("mt-3 text-[10px] font-bold border px-2 py-0", statusColor)}>
                                            {emp.status}
                                        </Badge>
                                    </div>

                                    <div className="mt-5 space-y-2.5 w-full text-xs font-medium text-slate-600">
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-1.5 text-emerald-700">
                                                <BadgeCheck className="h-3.5 w-3.5" />
                                                <span className="font-bold">{emp.employeeId}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5" title="Department">
                                                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                                <span className="truncate max-w-[80px]">{emp.department || "Admin"}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <User className="h-3.5 w-3.5" />
                                                <span className="text-[11px]">Manager</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                                                <User className="h-3 w-3 text-emerald-600" />
                                                {managerName}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Calendar className="h-3.5 w-3.5 text-purple-600" />
                                                <span>{emp.dateOfJoining ? new Date(emp.dateOfJoining).toLocaleDateString() : "N/A"}</span>
                                            </div>
                                            {!isTeacher && <PerformanceRating rating={(emp.name?.length % 5) * 0.3 + 3.8} />}
                                        </div>
                                        
                                        {isTeacher && <TeacherSparkline />}
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="p-4 pt-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
                                    <div className="flex justify-between items-center mb-3 px-1 text-slate-400">
                                        <div className="flex items-center gap-2 max-w-[75%]">
                                            <Mail className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                                            <span className="text-[11px] truncate">{emp.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3.5 w-3.5 text-blue-600" />
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

                {employees.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-white mt-6">
                        <Search className="h-10 w-10 opacity-20 mb-3" />
                        <p className="font-bold text-slate-600">No employees match this filter.</p>
                        <Button variant="link" onClick={() => router.push(window.location.pathname)}>Clear All Filters</Button>
                    </div>
                )}
                
                {/* Pagination Controls */}
                <div className="mt-10 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm text-slate-500 font-medium">
                        Showing <span className="text-slate-900 font-bold">{employees.length}</span> of <span className="text-slate-900 font-bold">{totalCount}</span> staff
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-xl border-slate-200 font-bold text-slate-600 h-10 px-4"
                            disabled={currentPage <= 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <div className="bg-slate-50 px-4 h-10 flex items-center justify-center rounded-xl border border-slate-100 text-sm font-black text-slate-900">
                            Page {currentPage} of {totalPages}
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-xl border-slate-200 font-bold text-slate-600 h-10 px-4"
                            disabled={currentPage >= totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>

                {/* Quick Add Sheet */}
                <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <SheetContent className="sm:max-w-xl bg-white border-l border-slate-200 overflow-y-auto">
                        <SheetHeader className="pb-6 border-b border-slate-100 mb-6">
                            <SheetTitle className="text-2xl font-black text-slate-900 tracking-tight">
                                {invitedPassword ? "Account Created!" : "Onboard New Employee"}
                            </SheetTitle>
                            <SheetDescription className="text-slate-500">
                                {invitedPassword 
                                    ? "Provide these credentials to the staff member so they can log in." 
                                    : "Enter base profile details to create an employee record."}
                            </SheetDescription>
                        </SheetHeader>

                        {invitedPassword ? (
                            <div className="space-y-6 py-6 border-2 border-emerald-100 rounded-3xl bg-emerald-50/50 p-6 animate-in fade-in zoom-in-95">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Email Address</Label>
                                        <div className="bg-white border-emerald-200 p-3 rounded-xl font-mono text-sm border flex items-center justify-between">
                                            <span>{formData.email}</span>
                                            <Button variant="ghost" size="sm" className="h-7 text-emerald-600 font-bold" onClick={() => navigator.clipboard.writeText(formData.email)}>Copy</Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Temporary Password</Label>
                                        <div className="bg-white border-emerald-200 p-3 rounded-xl font-mono text-sm border flex items-center justify-between">
                                            <span>{invitedPassword}</span>
                                            <Button variant="ghost" size="sm" className="h-7 text-emerald-600 font-bold" onClick={() => navigator.clipboard.writeText(invitedPassword)}>Copy</Button>
                                        </div>
                                    </div>
                                </div>
                                
                                <blockquote className="p-3 border-l-4 border-emerald-500 bg-emerald-100/50 text-[11px] font-medium text-emerald-800 leading-relaxed italic">
                                    "System credentials have been generated. The user will be prompted to update their profile after their first login."
                                </blockquote>

                                <Button 
                                    className="w-full bg-[#114C35] hover:bg-[#0a2e20] text-white font-bold h-12 rounded-xl mt-4"
                                    onClick={() => {
                                        setIsAddOpen(false);
                                        setInvitedPassword(null);
                                        setFormData({
                                            name: "",
                                            email: "",
                                            department: "",
                                            designation: "",
                                            salary: "",
                                            dateOfJoining: new Date().toISOString().split('T')[0],
                                            gender: "Prefer not to say",
                                            dob: "1990-01-01",
                                            status: "Active"
                                        });
                                        setSystemAccess(false);
                                        router.refresh();
                                    }}
                                >
                                    Finish & View Directory
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Full Name</Label>
                                        <Input 
                                            placeholder="John Doe" 
                                            className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" 
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Email</Label>
                                        <Input 
                                            type="email" 
                                            placeholder="john@example.com" 
                                            className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" 
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Department</Label>
                                        <Select value={formData.department} onValueChange={v => setFormData({ ...formData, department: v })}>
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
                                        <Input 
                                            placeholder="e.g. Senior Teacher" 
                                            className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" 
                                            value={formData.designation}
                                            onChange={e => setFormData({ ...formData, designation: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Base Salary (ETB)</Label>
                                        <Input 
                                            type="number" 
                                            placeholder="45000" 
                                            className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" 
                                            value={formData.salary}
                                            onChange={e => setFormData({ ...formData, salary: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-[#114C35]">Joining Date</Label>
                                        <Input 
                                            type="date" 
                                            className="border-slate-200 focus-visible:ring-[#114C35] h-10 shadow-sm" 
                                            value={formData.dateOfJoining}
                                            onChange={e => setFormData({ ...formData, dateOfJoining: e.target.value })}
                                        />
                                    </div>

                                    <div className="col-span-2 border-t border-slate-100 pt-4 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="systemAccess" checked={systemAccess} onCheckedChange={(v) => setSystemAccess(!!v)} />
                                            <div className="grid gap-1.5 leading-none">
                                                <label htmlFor="systemAccess" className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Grant System Access
                                                </label>
                                                <p className="text-[11px] text-muted-foreground italic">Creates a user account so this staff member can log in.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {systemAccess && (
                                        <div className="space-y-2 col-span-2 animate-in fade-in slide-in-from-top-2">
                                            <Label className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Assign System Role</Label>
                                            <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                                                <SelectTrigger className="border-emerald-200 bg-emerald-50/10 focus:ring-emerald-500 h-10 shadow-sm">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {roles.map(role => (
                                                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                                <Button 
                                    className="w-full h-11 bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold rounded-xl mt-4 shadow-sm" 
                                    onClick={handleInviteSubmit}
                                    disabled={submitting}
                                >
                                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    {submitting ? "Onboarding Staff..." : "Save Employee Profile"}
                                </Button>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
