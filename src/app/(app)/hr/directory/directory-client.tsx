"use client"
import * as React from "react"
import {
    Briefcase, Building2, Calendar, Mail, Phone,
    Search, UserPlus, FileText, BadgeCheck, MoreHorizontal,
    GraduationCap, Plus, Save
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
    Suspended: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

export function DirectoryClient({ employees }: { employees: any[] }) {
    const [search, setSearch] = React.useState("");
    const [deptFilter, setDeptFilter] = React.useState("All");
    const [isAddOpen, setIsAddOpen] = React.useState(false);

    const departments = ["All", ...new Set(employees.map(e => e.department).filter(Boolean))] as string[];

    const filtered = employees.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.employeeCode.toLowerCase().includes(search.toLowerCase());
        const matchesDept = deptFilter === "All" || e.department === deptFilter;
        return matchesSearch && matchesDept;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search employees by name or ID..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9 bg-muted/20 border-border/50"
                        />
                    </div>
                    <Select value={deptFilter} onValueChange={setDeptFilter}>
                        <SelectTrigger className="w-48 bg-muted/20 border-border/50">
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full sm:w-auto emerald-gradient text-white font-black h-10 px-6 rounded-xl" onClick={() => setIsAddOpen(true)}>
                    <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                </Button>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(emp => (
                    <Card key={emp.employeeId} className="glass-card hover:border-emerald-500/20 transition-all group overflow-hidden">
                        <div className="absolute top-0 w-full h-1 emerald-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="pb-4 relative">
                            <div className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer">
                                <MoreHorizontal className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col items-center text-center pt-2">
                                <div className="h-20 w-20 rounded-full border-4 border-background bg-muted/50 flex items-center justify-center overflow-hidden mb-3">
                                    {emp.avatarUrl ? (
                                        <img src={emp.avatarUrl} alt={emp.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="font-black text-2xl text-muted-foreground">{emp.name?.[0]}</span>
                                    )}
                                </div>
                                <CardTitle className="font-black text-lg leading-tight">{emp.name}</CardTitle>
                                <p className="text-xs font-bold text-muted-foreground mt-1">{emp.designation}</p>
                                <Badge className={cn("mt-2 text-[10px] font-bold", STATUS_COLORS[emp.status] || "bg-muted")}>
                                    {emp.status || "Active"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0">
                            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-muted-foreground border-t border-border/50 pt-3">
                                <div className="flex items-center gap-1.5" title="Employee ID">
                                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                                    {emp.employeeCode}
                                </div>
                                <div className="flex items-center gap-1.5" title="Department">
                                    <Building2 className="h-3.5 w-3.5 text-blue-600" />
                                    <span className="truncate">{emp.department}</span>
                                </div>
                                <div className="flex items-center gap-1.5 col-span-2 mt-1" title="Email">
                                    <Mail className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                                    <span className="truncate">{emp.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 col-span-2" title="Joined Date">
                                    <Calendar className="h-3.5 w-3.5 text-purple-600 flex-shrink-0" />
                                    <span>Joined: {new Date(emp.dateOfJoining).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="pt-3 flex gap-2">
                                <Button variant="outline" className="w-full text-xs font-bold h-8">View Profile</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-2xl bg-muted/5">
                    <UserPlus className="h-10 w-10 opacity-20 mb-2" />
                    <p className="font-bold">No employees found.</p>
                </div>
            )}

            {/* Quick Add Sheet */}
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="sm:max-w-xl glass-card overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-black font-headline">Onboard New Employee</SheetTitle>
                        <SheetDescription>Enter base profile details to create an employee record.</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                <Input placeholder="John Doe" className="bg-muted/20" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email</Label>
                                <Input type="email" placeholder="john@example.com" className="bg-muted/20" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Department</Label>
                                <Select>
                                    <SelectTrigger className="bg-muted/20"><SelectValue placeholder="Select dept" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Academics">Academics</SelectItem>
                                        <SelectItem value="Admin">Administration</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="IT">IT Support</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Designation</Label>
                                <Input placeholder="e.g. Senior Teacher" className="bg-muted/20" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Base Salary (ETB)</Label>
                                <Input type="number" placeholder="45000" className="bg-muted/20" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Joining Date</Label>
                                <Input type="date" className="bg-muted/20" />
                            </div>
                        </div>
                        <Button className="w-full h-12 emerald-gradient text-white font-black rounded-xl" onClick={() => setIsAddOpen(false)}>
                            <Save className="mr-2 h-4 w-4" /> Save Employee Profile
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
