"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PaymentDialog } from "@/components/payment-dialog";

interface UnpaidInvoice {
    id: string;
    description: string;
    amount: number;
}

interface ParentPortalClientProps {
    unpaidInvoices: UnpaidInvoice[];
    studentName: string;
}

export default function ParentPortalClient({ unpaidInvoices, studentName }: ParentPortalClientProps) {
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);

    return (
        <>
            <Button className="w-full mt-2" onClick={() => setIsPaymentDialogOpen(true)}>
                Pay Fees Online
            </Button>
            {isPaymentDialogOpen && (
                <PaymentDialog
                    isOpen={isPaymentDialogOpen}
                    onOpenChange={setIsPaymentDialogOpen}
                    invoices={unpaidInvoices}
                    studentName={studentName}
                    onPaymentSuccess={() => {
                        setIsPaymentDialogOpen(false);
                        // In a full refactor, we'd call `router.refresh()` here
                    }}
                />
            )}
        </>
    );
}
