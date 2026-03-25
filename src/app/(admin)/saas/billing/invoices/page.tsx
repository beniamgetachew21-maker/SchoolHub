import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, DollarSign, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function InvoicesDashboardPage() {
    // Dummy Data for platform invoices
    const invoices = [
        { id: "INV-2026-8921", school: "Addis Academy", plan: "Growth", amount: "Br 59,880.00", date: "Mar 22, 2026", status: "Paid" },
        { id: "INV-2026-8920", school: "Lideta Catholic School", plan: "Enterprise", amount: "Br 150,000.00", date: "Mar 21, 2026", status: "Paid" },
        { id: "INV-2026-8919", school: "Safari International", plan: "Growth", amount: "Br 59,880.00", date: "Mar 20, 2026", status: "Pending" },
        { id: "INV-2026-8918", school: "Future Leaders", plan: "Starter", amount: "Br 23,880.00", date: "Mar 19, 2026", status: "Overdue" },
        { id: "INV-2026-8917", school: "Ethiopian Aviation Academy", plan: "Enterprise", amount: "Br 300,000.00", date: "Mar 15, 2026", status: "Paid" },
    ];

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Billing & Invoices</h1>
                    <p className="text-slate-500 mt-1">Platform revenue, school payment history, and expected MRR.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="text-slate-600 bg-white">
                        <Download className="h-4 w-4 mr-2" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* MRR Dashboard Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500 to-blue-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100 uppercase tracking-wider">Total MRR</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold">Br 1,708,800</div>
                        <p className="text-xs font-medium text-emerald-300 mt-2 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +8.4% from last month
                        </p>
                    </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Payments Uncollected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-slate-900">Br 294,000</div>
                        <p className="text-xs font-semibold text-rose-500 mt-2">
                            3 schools overdue
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Upcoming Renewals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-slate-900">18</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">
                            Expected total: <span className="text-blue-600">Br 576,000</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg">Recent Invoices</CardTitle>
                        <CardDescription>Payment history across all domains</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search invoice or school..." className="pl-9 h-9" />
                        </div>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                            <Filter className="h-4 w-4 text-slate-500" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-600">Invoice ID</TableHead>
                                <TableHead className="font-semibold text-slate-600">School (Tenant)</TableHead>
                                <TableHead className="font-semibold text-slate-600">Plan</TableHead>
                                <TableHead className="font-semibold text-slate-600">Date Issued</TableHead>
                                <TableHead className="font-semibold text-slate-600 text-right">Amount</TableHead>
                                <TableHead className="font-semibold text-slate-600 text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((inv) => (
                                <TableRow key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-mono text-xs font-medium text-slate-500">
                                        {inv.id}
                                    </TableCell>
                                    <TableCell className="font-bold text-slate-900">
                                        {inv.school}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200">
                                            {inv.plan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {inv.date}
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-slate-900">
                                        {inv.amount}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className={
                                                inv.status === 'Paid'
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                    : inv.status === 'Pending' 
                                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                                    : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                                            }
                                        >
                                            {inv.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
