
"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from "@/ai/flows/create-payment-intent-flow";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");


interface PaymentItem {
    id: string;
    description: string;
    amount: number;
}
interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  invoices: PaymentItem[];
  studentName?: string; // Made optional
  onPaymentSuccess: () => void;
}


export function PaymentDialog({ isOpen, onOpenChange, invoices, studentName, onPaymentSuccess }: PaymentDialogProps) {
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const totalAmount = invoices.reduce((acc, item) => acc + item.amount, 0);
  const description = invoices.map(i => i.description).join(', ');
  const metadata = { 
    invoice_ids: invoices.map(i => i.id).join(','),
    ...(studentName && { studentName }), // Include studentName in metadata if it exists
  };

  React.useEffect(() => {
    if (isOpen && totalAmount > 0) {
      createPaymentIntent({
        amount: Math.round(totalAmount * 100),
        description: description,
        metadata: metadata
      }).then(data => {
        setClientSecret(data.clientSecret);
      }).catch(err => {
        console.error("Failed to create Payment Intent:", err);
        toast({ variant: "destructive", title: "Payment Error", description: "Could not initialize payment. Please try again." });
      });
    }
  }, [isOpen, totalAmount, description, metadata]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Online Payment</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to pay a total of{" "}
            <strong className="font-headline text-lg">${totalAmount.toFixed(2)}</strong> for: {description}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <CheckoutForm 
                    totalAmount={totalAmount}
                    onPaymentSuccess={onPaymentSuccess}
                    onClose={() => onOpenChange(false)}
                />
            </Elements>
        ) : (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}


function CheckoutForm({ totalAmount, onPaymentSuccess, onClose }: { totalAmount: number, onPaymentSuccess: () => void, onClose: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
            redirect: 'if_required',
        });

        if (stripeError) {
            setError(stripeError.message || "An unexpected error occurred.");
            setIsProcessing(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            // This is a simplification. In a real app, you'd use webhooks
            // to confirm payment and update your database. Here we just show success.
            
            toast({
                title: "Payment Successful",
                description: `Payment of $${totalAmount.toFixed(2)} has been processed.`,
            });

            onPaymentSuccess();
            onClose();
        } else {
             setError("Payment did not succeed. Please try again.");
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
                <div className="p-3 border rounded-md bg-muted/50">
                    <PaymentElement />
                </div>
                {error && <div className="text-destructive text-sm font-medium">{error}</div>}
            </div>
             <AlertDialogFooter>
              <AlertDialogCancel disabled={isProcessing} onClick={onClose}>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isProcessing || !stripe}>
                {isProcessing ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                    `Pay $${totalAmount.toFixed(2)}`
                )}
              </Button>
            </AlertDialogFooter>
        </form>
    );
}
