"use client"
import * as React from "react"
import { 
    Calculator, CheckCircle2, ChevronLeft, ChevronRight, 
    Download, PlayCircle, Wallet, FileText 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { calculatePayrollAction, processPayrollPaymentAction } from "@/lib/actions"
import { useRouter } from "next/navigation"

export function PayrollClient({ records, initialMonth }: { records: any[], initialMonth: string }) {
    const { toast } = useToast();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = React.useState(false);

    const pendingCount = records.filter(r => r.status === "Pending").length;
    const paidCount = records.filter(r => r.status === "Paid").length;
    
    const totalPayroll = records.reduce((sum, r) => sum + r.netSalary, 0);
    const totalDeductions = records.reduce((sum, r) => sum + r.deductions, 0);

    const handleRunPayroll = async () => {
        setIsProcessing(true);
        try {
            await calculatePayrollAction(initialMonth);
            toast({ title: "Payroll Generated", description: `Computed salaries for ${initialMonth}.` });
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "Error", description: e.message });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleApprovePayments = async () => {
        setIsProcessing(true);
        try {
            await processPayrollPaymentAction(initialMonth);
            toast({ title: "Payments Approved", description: `Batch payment processed for ${initialMonth}.` });
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "Error", description: e.message });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 bg-background p-2 px-4 rounded-xl border border-border/50 shadow-sm">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="font-black text-lg tracking-wider uppercase text-emerald-900 dark:text-emerald-50 w-24 text-center">
                        {initialMonth}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronRight className="h-4 w-4" /></Button>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button 
                        variant="outline" 
                        onClick={handleRunPayroll}
                        disabled={isProcessing || records.length > 0}
                        className="font-bold whitespace-nowrap"
                    >
                        <Calculator className="h-4 w-4 mr-2 text-primary" /> Run Computation
                    </Button>
                    <Button 
                        className="emerald-gradient text-white font-black whitespace-nowrap"
                        onClick={handleApprovePayments}
                        disabled={isProcessing || pendingCount === 0}
                    >
                        <Wallet className="h-4 w-4 mr-2" /> Approve & Pay ({pendingCount})
                    </Button>
                </div>
            </div>

            {/* Metrics */}
            {records.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total Net Payroll</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black font-headline text-emerald-600">
                                {totalPayroll.toLocaleString()} ETB
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total Tax & Deductions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black font-headline text-rose-500">
                                {totalDeductions.toLocaleString()} ETB
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Payment Status</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-amber-500">{pendingCount}</span>
                                <span className="text-xs font-bold text-muted-foreground">Pending</span>
                            </div>
                            <div className="w-px h-10 bg-border/50" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-emerald-500">{paidCount}</span>
                                <span className="text-xs font-bold text-muted-foreground">Paid</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Table */}
            {records.length === 0 ? (
                <Card className="border-dashed border-2 bg-muted/5 flex flex-col items-center justify-center h-64 shadow-none">
                    <CardHeader className="text-center pb-0">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                            <PlayCircle className="h-8 w-8 text-emerald-500" />
                        </div>
                        <CardTitle className="text-xl font-black">Payroll Not Generated</CardTitle>
                        <CardDescription>Click "Run Computation" to calculate salaries for all active employees for {initialMonth}.</CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <Card className="glass-card overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-bold text-emerald-900/70">Employee</TableHead>
                                <TableHead className="font-bold text-emerald-900/70 text-right">Basic (ETB)</TableHead>
                                <TableHead className="font-bold text-emerald-900/70 text-right">Allowances</TableHead>
                                <TableHead className="font-bold text-emerald-900/70 text-right">Deductions</TableHead>
                                <TableHead className="font-black text-emerald-900 text-right">Net Salary</TableHead>
                                <TableHead className="font-bold text-emerald-900/70">Status</TableHead>
                                <TableHead className="text-right font-bold text-emerald-900/70">Slip</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <div className="font-black">{row.employee?.name}</div>
                                        <div className="text-xs text-muted-foreground font-medium">{row.employee?.designation}</div>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">{row.basicSalary.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-medium text-emerald-600">{row.allowances > 0 ? `+${row.allowances.toLocaleString()}` : "-"}</TableCell>
                                    <TableCell className="text-right font-medium text-rose-500">{row.deductions > 0 ? `-${row.deductions.toLocaleString()}` : "-"}</TableCell>
                                    <TableCell className="text-right font-black text-lg">{row.netSalary.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge className={row.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                                            {row.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-emerald-600">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    )
}
