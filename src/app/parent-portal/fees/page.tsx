import { getInvoicesForStudent, getStudents } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wallet, FileText, CheckCircle, AlertCircle, Clock, Download, CreditCard } from "lucide-react";
import ParentPortalClientWrapper from "../parent-portal-client";
import { notFound } from "next/navigation";

export default async function ParentFeesPage() {
    const { students } = await getStudents({ pageSize: 50 });
    const student = students.find((s: any) => s.name.includes("Aida")) || students[0];
    if (!student) return notFound();

    const invoices = await getInvoicesForStudent(student.studentId);
    const unpaid = invoices.filter((i: any) => i.status !== "Paid");
    const paid = invoices.filter((i: any) => i.status === "Paid");
    const totalDue = unpaid.reduce((a: number, c: any) => a + c.amount, 0);
    const totalPaid = paid.reduce((a: number, c: any) => a + c.amount, 0);

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full">
            {/* Header */}
            <div className="bg-[#163D2D] text-white px-6 sm:px-8 pt-10 pb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/10 rounded-2xl">
                            <Wallet className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Financial Accounts</h1>
                            <p className="text-white/50 font-bold text-xs tracking-widest uppercase mt-0.5">Student Fee Management — {student.name}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Total Due", value: `${totalDue.toLocaleString()} ETB`, color: totalDue > 0 ? "text-rose-400" : "text-emerald-400" },
                            { label: "Total Paid", value: `${totalPaid.toLocaleString()} ETB`, color: "text-emerald-400" },
                            { label: "Total Invoices", value: invoices.length, color: "text-blue-400" },
                        ].map(s => (
                            <div key={s.label} className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm">
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">{s.label}</p>
                                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
                {/* Outstanding */}
                {unpaid.length > 0 && (
                    <Card className="rounded-[2.5rem] border-rose-100 shadow-xl shadow-rose-100/30 bg-white overflow-hidden">
                        <CardHeader className="p-8 pb-5 border-b border-rose-50 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><AlertCircle className="h-5 w-5" /></div>
                                <div>
                                    <CardTitle className="font-black text-2xl text-slate-900">Outstanding Invoices</CardTitle>
                                    <CardDescription className="font-medium text-sm mt-0.5">{unpaid.length} invoice{unpaid.length > 1 ? "s" : ""} require attention</CardDescription>
                                </div>
                            </div>
                            <ParentPortalClientWrapper
                                unpaidInvoices={unpaid.map(i => ({ id: i.invoiceId, description: i.description || "School Fee", amount: i.amount }))}
                                studentName="Student"
                            />
                        </CardHeader>
                        <CardContent className="p-0">
                            {unpaid.map((inv, idx) => (
                                <div key={inv.invoiceId} className={`flex items-center gap-6 px-8 py-5 hover:bg-rose-50/50 transition-colors ${idx !== unpaid.length - 1 ? "border-b border-rose-50" : ""}`}>
                                    <div className="p-3 bg-rose-50 rounded-2xl text-rose-500 shrink-0"><FileText className="h-5 w-5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-slate-900 text-sm">{inv.description || "School Fee"}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Invoice #{inv.invoiceId}</p>
                                    </div>
                                    <Badge className="bg-rose-100 text-rose-700 border-none font-black text-[10px] uppercase tracking-widest">
                                        <Clock className="h-2.5 w-2.5 mr-1" /> {inv.status}
                                    </Badge>
                                    <p className="font-black text-lg text-slate-900 shrink-0">{inv.amount.toLocaleString()} <span className="text-sm text-slate-400 font-bold">ETB</span></p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Paid */}
                {paid.length > 0 && (
                    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                        <CardHeader className="p-8 pb-5 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle className="h-5 w-5" /></div>
                                <div>
                                    <CardTitle className="font-black text-2xl text-slate-900">Payment History</CardTitle>
                                    <CardDescription className="font-medium text-sm mt-0.5">{paid.length} completed payment{paid.length > 1 ? "s" : ""}</CardDescription>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-9 hidden sm:flex">
                                <Download className="h-3.5 w-3.5 mr-1.5" /> Export
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {paid.map((inv, idx) => (
                                <div key={inv.invoiceId} className={`flex items-center gap-6 px-8 py-5 hover:bg-slate-50 transition-colors ${idx !== paid.length - 1 ? "border-b border-slate-50" : ""}`}>
                                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shrink-0"><CreditCard className="h-5 w-5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-slate-900 text-sm">{inv.description || "School Fee"}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Invoice #{inv.invoiceId}</p>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] uppercase tracking-widest">
                                        <CheckCircle className="h-2.5 w-2.5 mr-1" /> Paid
                                    </Badge>
                                    <p className="font-black text-lg text-slate-500 shrink-0">{inv.amount.toLocaleString()} <span className="text-sm font-bold">ETB</span></p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {invoices.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="p-6 bg-emerald-50 rounded-[2rem] mb-6">
                            <Wallet className="h-12 w-12 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Invoices Found</h3>
                        <p className="text-slate-400 font-medium">No financial records are attached to this student account yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
