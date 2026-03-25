import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Flag, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFeatureFlags } from "@/lib/saas/feature-actions";
import { FeatureToggle } from "./feature-toggle";

export default async function FeatureFlagsPage() {
    const flags = await getFeatureFlags();

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Feature Flags & Releases</h1>
                    <p className="text-slate-500 mt-1">Control gradual rollouts and beta feature access across tenants.</p>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Flag className="h-4 w-4 mr-2" /> Create Flag
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg">Current Web Toggles</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search flag key..." className="pl-9 h-9" />
                        </div>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                            <Filter className="h-4 w-4 text-slate-500" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {flags.map((flag: any) => (
                            <div key={flag.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-slate-900 leading-none">{flag.name}</h3>
                                        <Badge variant="secondary" className="font-mono text-[10px] bg-slate-100 text-slate-500">
                                            {flag.id}
                                        </Badge>
                                        <Badge className={
                                            flag.status === 'GA' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                                            flag.status === 'Beta' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                                            "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                        }>
                                            {flag.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-slate-500">{flag.description}</p>
                                </div>
                                
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Rollout</div>
                                        <div className="text-sm font-bold text-slate-900">{flag.rollout}</div>
                                    </div>
                                    <FeatureToggle flagId={flag.id} initialActive={flag.active} />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
