
import { getEquityData } from "@/lib/actions";
import EquityDashboard from "@/components/equity-dashboard";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default async function EquityTrackingPage() {
    const data = await getEquityData();

    return (
        <div className="flex flex-col gap-6 p-6">
            <Breadcrumbs
                items={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Equity Tracking", href: "/dashboard/equity" }
                ]}
            />
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-headline tracking-tight">Ethiopian Education Policy Alignment</h1>
                <p className="text-muted-foreground">National standards tracking for GEQIP-E and MoE equity goals.</p>
            </div>

            <EquityDashboard data={data} />
        </div>
    );
}
