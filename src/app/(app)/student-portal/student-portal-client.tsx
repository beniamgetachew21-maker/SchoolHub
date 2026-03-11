
"use client"
import * as React from "react"
import { 
    CreditCard, 
    BookOpen, 
    CalendarCheck, 
    GraduationCap, 
    ChevronRight, 
    Download, 
    ArrowUpRight,
    TrendingUp,
    CheckCircle2,
    Lock,
    Wallet,
    QrCode
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"
import { processDigitalPaymentAction } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function StudentPortalClient({ student, invoices, attendance, results, allStudents }: { 
    student: any, 
    invoices: any[], 
    attendance: any, 
    results: any[],
    allStudents: any[]
}) {
  const [selectedInvoice, setSelectedInvoice] = React.useState<any | null>(null);
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayNow = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsPaymentSheetOpen(true);
  }

  const handleProcessPayment = async (method: string) => {
    if (!selectedInvoice) return;
    
    setIsProcessing(true);
    // Simulate gateway delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = await processDigitalPaymentAction(
        student.studentId, 
        selectedInvoice.invoiceId, 
        method, 
        selectedInvoice.amount
    );

    setIsProcessing(false);
    
    if (result.success) {
      toast({
        title: "Payment Successful",
        description: `Successfully paid ${selectedInvoice.amount.toLocaleString()} ETB via ${method}.`,
      });
      setIsPaymentSheetOpen(false);
      setSelectedInvoice(null);
      // In a real app, the page would revalidate
    } else {
        toast({
            variant: "destructive",
            title: "Payment Failed",
            description: result.error || "Gateway connection timeout."
        });
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2 glass-card overflow-hidden">
          <CardHeader className="p-0">
             <div className="bg-emerald-900 dark:bg-emerald-950 p-8 flex items-center gap-6">
                 <div className="h-24 w-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500/50 flex items-center justify-center text-emerald-100 font-bold text-4xl shadow-xl">
                    {student.name[0]}
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white font-headline tracking-tighter">{student.name}</h2>
                    <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-500 text-white border-0 font-bold uppercase text-[10px]">Active Student</Badge>
                        <span className="text-emerald-100/70 font-bold text-sm">{student.class} • SID: {student.studentId}</span>
                    </div>
                 </div>
             </div>
          </CardHeader>
          <CardContent className="p-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="p-4 bg-muted/30 rounded-2xl border border-border/10">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Attendance</p>
                    <div className="flex items-center gap-2">
                         <span className="text-2xl font-black">{attendance?.percentage || '94'}%</span>
                         <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                 </div>
                 <div className="p-4 bg-muted/30 rounded-2xl border border-border/10">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">GPA/Avg</p>
                    <span className="text-2xl font-black">3.85</span>
                 </div>
                 <div className="p-4 bg-muted/30 rounded-2xl border border-border/10">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Library</p>
                    <span className="text-2xl font-black">0 Due</span>
                 </div>
                 <div className="p-4 bg-muted/30 rounded-2xl border border-border/10">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Club</p>
                    <span className="text-xl font-bold truncate">Robotics</span>
                 </div>
             </div>
          </CardContent>
        </Card>

        {/* Financial Quick View */}
        <Card className="glass-card bg-emerald-500/[0.03] border-emerald-500/10 flex flex-col justify-center p-8">
            <div className="flex items-center gap-3 mb-4">
                <Wallet className="h-6 w-6 text-emerald-600" />
                <h3 className="font-black uppercase tracking-widest text-xs">Financial Standing</h3>
            </div>
            <p className="text-5xl font-black tracking-tighter text-emerald-900 dark:text-emerald-50 mb-2">
                ${invoices.filter(i => i.status !== 'Paid').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
            </p>
            <p className="text-sm font-bold text-muted-foreground mb-6">Total Outstanding Balance</p>
            <Button className="w-full h-12 emerald-gradient text-white font-black rounded-xl">VIEW LEDGER</Button>
        </Card>
      </div>

      <Tabs defaultValue="academics" className="w-full space-y-6">
        <TabsList className="bg-muted/50 p-1 border border-emerald-500/5">
          <TabsTrigger value="academics" className="font-black tracking-tighter uppercase text-xs">Academic Progress</TabsTrigger>
          <TabsTrigger value="finance" className="font-black tracking-tighter uppercase text-xs">Payments & Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="academics" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                 <CardHeader>
                    <CardTitle className="font-black text-xl">Recent Results</CardTitle>
                    <CardDescription>Official assessment performance summary.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       {results.length > 0 ? results.map((r: any) => (
                          <div key={r.resultId} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl hover:bg-muted/30 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm">{r.subject}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{r.assessmentName}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-lg">{r.marksObtained}/{r.maxMarks}</p>
                                    <div className="flex items-center gap-1 justify-end">
                                        <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${(r.marksObtained / r.maxMarks) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                          </div>
                       )) : (
                          <p className="text-center py-10 text-muted-foreground italic">No results released yet.</p>
                       )}
                    </div>
                 </CardContent>
              </Card>

              <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-black text-xl">Attendance Analytics</CardTitle>
                    <CardDescription>Presence track record for current term.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Term Attendance</span>
                        <span className="font-black text-emerald-600 text-xl">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-3 bg-emerald-500/10" />
                      <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                              <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Present</p>
                              <span className="text-2xl font-black">172 Days</span>
                          </div>
                          <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                              <p className="text-[10px] font-black uppercase text-rose-600 mb-1">Absent</p>
                              <span className="text-2xl font-black">4 Days</span>
                          </div>
                      </div>
                  </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="finance" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <Card className="glass-card">
              <CardHeader>
                 <CardTitle className="font-black text-xl">Outstanding Invoices</CardTitle>
                 <CardDescription>Review and settle your institutional fees online.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="rounded-2xl border border-border/50 overflow-hidden">
                    <Table>
                       <TableHeader className="bg-muted/30">
                          <TableRow>
                             <TableHead className="font-black uppercase text-[10px] tracking-widest">Invoice</TableHead>
                             <TableHead className="font-black uppercase text-[10px] tracking-widest">Description</TableHead>
                             <TableHead className="font-black uppercase text-[10px] tracking-widest text-right">Amount</TableHead>
                             <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">Status</TableHead>
                             <TableHead />
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {invoices.map((inv: any) => (
                             <TableRow key={inv.invoiceId} className="group font-medium">
                                <TableCell className="font-mono text-xs">{inv.invoiceId}</TableCell>
                                <TableCell className="font-bold text-sm">{inv.description || "Academic Tuition Fee"}</TableCell>
                                <TableCell className="text-right font-black text-emerald-700 dark:text-emerald-400">${inv.amount.toLocaleString()}</TableCell>
                                <TableCell className="text-center">
                                   <Badge className={cn("font-bold text-[10px] px-3 py-1", 
                                      inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : 
                                      "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                   )}>
                                      {inv.status.toUpperCase()}
                                   </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                   {inv.status !== 'Paid' ? (
                                      <Button size="sm" className="emerald-gradient text-white font-black h-8 px-4" onClick={() => handlePayNow(inv)}>
                                          PAY NOW
                                      </Button>
                                   ) : (
                                      <Button variant="ghost" size="sm" className="h-8 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-600">
                                          <Download className="mr-1 h-3 w-3" /> Receipt
                                      </Button>
                                   )}
                                </TableCell>
                             </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Gateway Modal */}
      <Sheet open={isPaymentSheetOpen} onOpenChange={setIsPaymentSheetOpen}>
        <SheetContent className="sm:max-w-md glass-card border-l-border/10">
          <SheetHeader className="pb-8 border-b border-border/10">
            <SheetTitle className="text-2xl font-black font-headline tracking-tight">Checkout</SheetTitle>
            <SheetDescription>Securely settle your institutional fees via digital gateways.</SheetDescription>
          </SheetHeader>
          
          {selectedInvoice && (
            <div className="pt-8 space-y-8 h-full flex flex-col">
              <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 space-y-4">
                 <div className="flex justify-between items-center text-xs font-black uppercase text-muted-foreground tracking-widest">
                    <span>Outstanding Invoice</span>
                    <span>{selectedInvoice.invoiceId}</span>
                 </div>
                 <h4 className="font-black text-2xl text-emerald-900 dark:text-emerald-50">{selectedInvoice.description || "Tuition Fees"}</h4>
                 <div className="flex justify-between items-end border-t border-emerald-500/10 pt-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Payable</span>
                    <span className="text-3xl font-black text-emerald-600">${selectedInvoice.amount.toLocaleString()}</span>
                 </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Select Transaction Channel</p>
                <div className="grid grid-cols-1 gap-3">
                   <button 
                    disabled={isProcessing}
                    onClick={() => handleProcessPayment('Telebirr')}
                    className="flex items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-muted/10 hover:border-emerald-500 transition-all group disabled:opacity-50"
                   >
                       <div className="flex items-center gap-4">
                           <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center text-white"><QrCode className="h-6 w-6" /></div>
                           <div className="text-left font-black tracking-tight">Telebirr / Mobile Money</div>
                       </div>
                       <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>

                   <button 
                    disabled={isProcessing}
                    onClick={() => handleProcessPayment('Stripe')}
                    className="flex items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-muted/10 hover:border-indigo-500 transition-all group disabled:opacity-50"
                   >
                       <div className="flex items-center gap-4">
                           <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><CreditCard className="h-6 w-6" /></div>
                           <div className="text-left font-black tracking-tight">International Card (Stripe)</div>
                       </div>
                       <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>

                   <button 
                    disabled={isProcessing}
                    onClick={() => handleProcessPayment('Bank Transfer')}
                    className="flex items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-muted/10 hover:border-amber-600 transition-all group disabled:opacity-50"
                   >
                       <div className="flex items-center gap-4">
                           <div className="h-10 w-10 bg-amber-600 rounded-xl flex items-center justify-center text-white"><TrendingUp className="h-6 w-6" /></div>
                           <div className="text-left font-black tracking-tight">Local Bank (CBE Birr)</div>
                       </div>
                       <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>
                </div>
              </div>

              <div className="mt-auto pb-10 flex items-center justify-center gap-2 text-muted-foreground">
                 <Lock className="h-4 w-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Bank-Grade Encryption Enabled</span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
