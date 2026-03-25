"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useTransition } from "react";
import { resolveTicket } from "@/lib/saas/ticket-actions";

export function ResolveTicketButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleResolve = () => {
        startTransition(async () => {
            await resolveTicket(id);
        });
    };

    return (
        <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResolve} 
            disabled={isPending}
            className="h-7 text-xs font-semibold bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
        >
            <CheckCircle2 className="h-3 w-3 mr-1" /> {isPending ? "..." : "Resolve"}
        </Button>
    );
}
