"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { QrCode, CreditCard, TrendingUp, Lock, ChevronRight, FileText, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UnpaidInvoice {
    id: string;
    description: string;
    amount: number;
}

interface Props {
    unpaidInvoices: UnpaidInvoice[];
    studentName: string;
}

export default function ParentPortalClientWrapper({ unpaidInvoices, studentName }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [paidMethod, setPaidMethod] = React.useState<string | null>(null);

    const total = unpaidInvoices.reduce((acc, inv) => acc + inv.amount, 0);

    const handlePay = async (method: string) => {
        setIsProcessing(true);
        setPaidMethod(method);
        await new Promise(r => setTimeout(r, 2000));
        setIsProcessing(false);
        setIsOpen(false);
        toast({
            title: "Payment Successful",
            description: `${total.toLocaleString()} ETB paid via ${method} for ${studentName}.`,
        });
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="w-full mt-1 rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] font-black h-12 text-sm text-white shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 border border-emerald-700/30"
            >
                Pay Fees Online
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="sm:max-w-md rounded-l-[2.5rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-[#163D2D] p-8 text-white relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                        <SheetHeader className="relative z-10">
                            <SheetTitle className="text-3xl font-black tracking-tighter uppercase text-white italic">Secure Checkout</SheetTitle>
                            <SheetDescription className="text-emerald-100/70 font-medium text-sm mt-1">EthioEdu Official Digital Gateway</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 bg-white/10 border border-white/10 rounded-2xl p-4">
                            <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Total Payable for {studentName}</p>
                            <p className="text-4xl font-black text-white">{total.toLocaleString()} <span className="text-lg text-white/50">ETB</span></p>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 flex-1 flex flex-col bg-slate-50 overflow-y-auto">
                        {/* Invoice list */}
                        <div className="mb-6 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice Breakdown</p>
                            {unpaidInvoices.map(inv => (
                                <div key={inv.id} className="flex items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><FileText className="h-3.5 w-3.5" /></div>
                                        <p className="font-bold text-sm text-slate-700 line-clamp-1">{inv.description}</p>
                                    </div>
                                    <p className="font-black text-sm text-slate-900 shrink-0">{inv.amount.toLocaleString()} ETB</p>
                                </div>
                            ))}
                        </div>

                        {/* Payment methods */}
                        <div className="space-y-3 flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Payment Method</p>
                            {[
                                { label: "Telebirr SuperApp", icon: QrCode, color: "bg-[#00AEEF]", method: "Telebirr", badge: "Preferred" },
                                { label: "CBE Birr", icon: TrendingUp, color: "bg-[#5E2B85]", method: "CBE Birr" },
                                { label: "Credit / Debit Card", icon: CreditCard, color: "bg-slate-900", method: "Card" },
                            ].map(pm => (
                                <button
                                    key={pm.method}
                                    disabled={isProcessing}
                                    onClick={() => handlePay(pm.method)}
                                    className="w-full flex items-center gap-4 p-5 rounded-[1.5rem] border-2 border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all disabled:opacity-50 group text-left relative"
                                >
                                    <div className={`p-3.5 ${pm.color} text-white rounded-[14px] shrink-0 group-hover:scale-110 transition-transform`}>
                                        {isProcessing && paidMethod === pm.method ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <pm.icon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-black text-slate-900 text-sm block">{pm.label}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Instant Processing</span>
                                    </div>
                                    {pm.badge && (
                                        <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] uppercase tracking-widest hidden sm:flex">
                                            {pm.badge}
                                        </Badge>
                                    )}
                                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                </button>
                            ))}
                        </div>

                        {/* Security badge */}
                        <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-center gap-2 text-slate-400">
                            <Lock className="h-3.5 w-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">256-bit Encrypted & Secure</span>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
