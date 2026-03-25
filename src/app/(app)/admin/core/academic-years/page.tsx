import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export default function AcademicYearsPage() {
    // Mock data for academic years
    const academicYears = [
        { id: "1", name: "2024/2025", startDate: "2024-09-01", endDate: "2025-06-30", status: "Active" },
        { id: "2", name: "2025/2026", startDate: "2025-09-01", endDate: "2026-06-30", status: "Upcoming" },
    ];

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black font-headline tracking-tighter text-slate-900 uppercase">Academic Years</h1>
                    <p className="text-slate-500 font-medium italic">Define and manage institutional cycles, terms, and semesters.</p>
                </div>
                <Button className="bg-slate-900 hover:bg-black text-white rounded-xl px-6 h-11 font-bold shadow-lg transition-all">
                    <Plus className="mr-2 h-4 w-4" /> Create New Year
                </Button>
            </div>

            <div className="grid gap-6">
                {academicYears.map((year) => (
                    <Card key={year.id} className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${year.status === "Active" ? "bg-emerald-600 shadow-emerald-200" : "bg-slate-400 shadow-slate-200"}`}>
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Year {year.name}</CardTitle>
                                    <CardDescription className="font-medium">{year.startDate} — {year.endDate}</CardDescription>
                                </div>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${year.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                                {year.status === "Active" ? (
                                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Current</span>
                                ) : (
                                    <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {year.status}</span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <TermCard name="Semester 1" dateRange="Sep 2024 - Jan 2025" status="Completed" />
                                <TermCard name="Semester 2" dateRange="Feb 2025 - Jun 2025" status="In Progress" active />
                                <div className="border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all cursor-pointer">
                                    <Plus className="h-6 w-6 mb-2" />
                                    <span className="text-sm font-bold uppercase tracking-tighter">Add Term</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function TermCard({ name, dateRange, status, active = false }: { name: string, dateRange: string, status: string, active?: boolean }) {
    return (
        <div className={`p-6 rounded-2xl border transition-all ${active ? "bg-white border-emerald-200 shadow-lg shadow-emerald-100/50 scale-[1.02]" : "bg-slate-50 border-slate-100"}`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{status}</p>
            <h4 className="font-black text-slate-900 uppercase tracking-tight">{name}</h4>
            <p className="text-xs text-slate-500 font-medium italic mt-1">{dateRange}</p>
        </div>
    );
}
