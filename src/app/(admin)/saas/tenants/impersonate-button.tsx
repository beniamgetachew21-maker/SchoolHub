"use client";

import { Button } from "@/components/ui/button";
import { impersonateTenantAction } from "@/lib/saas/impersonate-actions";
import { UserCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function ImpersonateButton({ tenantId, tenantName }: { tenantId: string, tenantName: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleImpersonate = async () => {
        setIsLoading(true);
        try {
            await impersonateTenantAction(tenantId);
        } catch (error: any) {
            toast({
                title: "Impersonation Failed",
                description: error.message,
                variant: "destructive",
            });
            setIsLoading(false);
        }
    };

    return (
        <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 font-bold px-3 transition-all"
            disabled={isLoading}
            onClick={handleImpersonate}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <>
                    <UserCircle2 className="h-4 w-4 mr-2" />
                    Enter School
                </>
            )}
        </Button>
    );
}
