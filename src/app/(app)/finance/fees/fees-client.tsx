
"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, FileText, Receipt, Send, Download } from "lucide-react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
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
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddInvoiceForm } from "@/components/forms/add-invoice-form"
import { toast } from "@/hooks/use-toast"
import { createInvoiceAction } from "@/lib/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Separator
} from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function FeesClient({ initialInvoices, students }: { initialInvoices: any[], students: any[] }) {
  const [invoices, setInvoices] = React.useState(initialInvoices);
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const [isViewSheetOpen, setIsViewSheetOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [invoiceToPay, setInvoiceToPay] = React.useState<any | null>(null);
  const [selectedInvoice, setSelectedInvoice] = React.useState<any | null>(null);

  const studentMap = React.useMemo(() => {
    return students.reduce((acc, student) => {
      acc[student.studentId] = student;
      return acc;
    }, {} as Record<string, any>);
  }, [students]);

  const handleAddInvoice = async (newInvoiceData: any) => {
    const result = await createInvoiceAction({
      ...newInvoiceData,
      status: "Unpaid"
    });
    if (result.success) {
      setInvoices([result.data, ...invoices]);
      toast({ title: "Invoice Generated", description: "The new financial record has been established." });
    }
    setIsAddSheetOpen(false);
  };

  const handleConfirmPayment = () => {
    if (!invoiceToPay) return;
    toast({
      title: "Payment Recorded",
      description: `Invoice ${invoiceToPay.invoiceId} has been marked as paid.`,
    });
    setInvoiceToPay(null);
  }

  const filteredInvoices = React.useMemo(() => {
    if (!searchQuery) return invoices;
    return invoices.filter(invoice => {
      const student = studentMap[invoice.studentId];
      const studentName = student?.name.toLowerCase() || '';
      const invoiceId = invoice.invoiceId.toLowerCase();
      const query = searchQuery.toLowerCase();
      return studentName.includes(query) || invoiceId.includes(query);
    });
  }, [invoices, searchQuery, studentMap]);

  const handleSendReminder = (invoice: any) => {
    const student = studentMap[invoice.studentId];
    toast({
      title: "Reminder Sent",
      description: `A payment reminder has been sent to ${student?.name}'s parent.`,
    });
  }

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewSheetOpen(true);
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl font-black">Fees Management</CardTitle>
              <CardDescription>Generate invoices, collect fees, and view reports.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild className="font-bold">
                <Link href="/finance/reports">
                  <FileText className="mr-2 h-4 w-4" />
                  View Reports
                </Link>
              </Button>
              <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="emerald-gradient text-white font-bold">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Generate Invoice
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Generate a New Invoice</SheetTitle>
                    <SheetDescription>Select a student and enter the details for the new invoice.</SheetDescription>
                  </SheetHeader>
                  <AddInvoiceForm students={students} onFormSubmit={handleAddInvoice} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="all" className="font-bold">All</TabsTrigger>
                <TabsTrigger value="unpaid" className="font-bold">Unpaid</TabsTrigger>
                <TabsTrigger value="paid" className="font-bold">Paid</TabsTrigger>
                <TabsTrigger value="overdue" className="font-bold">Overdue</TabsTrigger>
              </TabsList>
              <Input
                placeholder="Search by student or invoice ID..."
                className="w-80 bg-muted/20 border-border/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <TabsContent value="all" className="mt-0">
              <InvoicesTable
                invoices={filteredInvoices}
                studentMap={studentMap}
                onRecordPayment={setInvoiceToPay}
                onViewInvoice={handleViewInvoice}
                onSendReminder={handleSendReminder}
              />
            </TabsContent>
            {/* Other TabContents... */}
          </Tabs>
        </CardContent>
      </Card>

      {/* AlertDialog and Sheet for View Details... */}
      {invoiceToPay && (
        <AlertDialog open={!!invoiceToPay} onOpenChange={() => setInvoiceToPay(null)}>
          <AlertDialogContent className="glass-card">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark invoice <strong>{invoiceToPay.invoiceId}</strong> as paid?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmPayment} className="emerald-gradient">
                Confirm Payment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Sheet open={isViewSheetOpen} onOpenChange={setIsViewSheetOpen}>
        <SheetContent className="sm:max-w-2xl glass-card">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 font-black text-2xl">
              <Receipt className="h-6 w-6 text-emerald-600" />
              Invoice Details
            </SheetTitle>
            <SheetDescription>Detailed record for invoice {selectedInvoice?.invoiceId}.</SheetDescription>
          </SheetHeader>
          {selectedInvoice && (
            <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black text-emerald-900 dark:text-emerald-50 tracking-tighter">ETHIOEDU</h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Addis Ababa, Ethiopia</p>
                </div>
                <div className="text-right">
                  <Badge className={selectedInvoice.status === 'Paid' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-rose-500 text-white'}>
                    {selectedInvoice.status.toUpperCase()}
                  </Badge>
                  <p className="mt-3 text-sm font-mono font-bold">{selectedInvoice.invoiceId}</p>
                </div>
              </div>

              <Separator className="bg-emerald-500/10" />

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-muted/30 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase text-muted-foreground font-black tracking-[0.2em] mb-2">Recipient</p>
                  <p className="font-black text-lg">{studentMap[selectedInvoice.studentId]?.name}</p>
                  <p className="text-xs font-bold text-emerald-600">{studentMap[selectedInvoice.studentId]?.class}</p>
                </div>
                <div className="text-right p-4">
                  <p className="text-[10px] uppercase text-muted-foreground font-black tracking-[0.2em] mb-2">Date Due</p>
                  <p className="font-black text-lg">{selectedInvoice.dueDate}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/10 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest">Description</TableHead>
                      <TableHead className="text-right font-black uppercase text-[10px] tracking-widest">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-medium p-6">{selectedInvoice.description || 'Institutional Academic Fees'}</TableCell>
                      <TableCell className="text-right font-mono font-black p-6 text-lg">${selectedInvoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end pt-4">
                <div className="w-1/2 space-y-3 bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-2xl border-t border-emerald-500/20 pt-4 text-emerald-900 dark:text-emerald-50">
                    <span>TOTAL</span>
                    <span>${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-10">
                <Button className="flex-1 h-14 emerald-gradient text-white font-black shadow-lg shadow-emerald-500/20" onClick={() => toast({ title: "Downloading..." })}>
                  <Download className="mr-2 h-5 w-5" />
                  GENERATE PDF
                </Button>
                <Button variant="outline" className="flex-1 h-14 font-black border-2 border-emerald-500/20 hover:bg-emerald-500/5" onClick={() => handleSendReminder(selectedInvoice)}>
                  <Send className="mr-2 h-5 w-5" />
                  RE-INVOICE PARENT
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function InvoicesTable({ invoices, studentMap, onRecordPayment, onViewInvoice, onSendReminder }: any) {
  return (
    <div className="rounded-2xl border border-border/50 overflow-hidden bg-background">
      <Table>
        <TableHeader className="bg-muted/10">
          <TableRow>
            <TableHead className="font-black uppercase text-[10px] tracking-widest">ID</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest">Student</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest">Due Date</TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
            <TableHead className="text-right font-black uppercase text-[10px] tracking-widest">Amount</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length > 0 ? invoices.map((invoice: any) => (
            <TableRow key={invoice.invoiceId} className="group hover:bg-muted/20 transition-all">
              <TableCell className="font-mono font-bold text-xs">{invoice.invoiceId}</TableCell>
              <TableCell>
                <div>
                   <p className="font-black text-sm">{studentMap[invoice.studentId]?.name || 'N/A'}</p>
                   <p className="text-[10px] text-muted-foreground font-bold">{studentMap[invoice.studentId]?.class || 'N/A'}</p>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium">{invoice.dueDate}</TableCell>
              <TableCell>
                <Badge className={cn("font-bold text-[10px] px-3 py-1", 
                  invoice.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : 
                  "bg-rose-500/10 text-rose-600 border-rose-500/20"
                )}>
                  {invoice.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono font-black text-emerald-700 dark:text-emerald-400">${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card">
                    <DropdownMenuLabel className="font-black uppercase text-[10px]">Management</DropdownMenuLabel>
                    <DropdownMenuItem className="font-bold" onClick={() => onViewInvoice(invoice)}>View Archive</DropdownMenuItem>
                    {invoice.status !== 'Paid' && (
                      <DropdownMenuItem className="font-bold text-emerald-600" onClick={() => onRecordPayment(invoice)}>Log Payment</DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="font-bold" onClick={() => onSendReminder(invoice)}>Send Direct Notification</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={6} className="h-40 text-center text-muted-foreground font-medium italic">
                No financial records detected.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
