"use client";

import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toggleFeatureFlag } from "@/lib/saas/feature-actions";

interface FeatureToggleProps {
    flagId: string;
    initialActive: boolean;
}

export function FeatureToggle({ flagId, initialActive }: FeatureToggleProps) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = (checked: boolean) => {
        startTransition(async () => {
            await toggleFeatureFlag(flagId, checked);
        });
    };

    return (
        <Switch 
            checked={initialActive} 
            onCheckedChange={handleToggle} 
            disabled={isPending}
        />
    );
}
