import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Edit, Plus, Users, Zap } from "lucide-react";
import { getAllSubscriptionPlans } from "@/lib/saas-actions";
import { getSubscriptionPlans } from "@/lib/saas/subscription-actions";

export default async function PlansManagementPage() {
    const allSubscriptions = await getAllSubscriptionPlans();
    const dbPlans = await getSubscriptionPlans();
    
    // Aggregate active counts
    const getPlanCount = (planName: string) => 
        allSubscriptions.filter(s => s.plan === planName && s.status === 'Active').length;

    // Map DB plans to UI formatting
    const plansUI = dbPlans.map((plan: any) => {
        let color = "text-slate-600";
        let bg = "bg-slate-50";
        
        if (plan.name === "Starter") { color = "text-blue-600"; bg = "bg-blue-50"; }
        if (plan.name === "Growth") { color = "text-indigo-600"; bg = "bg-indigo-50"; }
        if (plan.name === "Enterprise") { color = "text-slate-900"; bg = "bg-slate-100"; }
        
        return {
            name: plan.name,
            price: plan.price === 1499 ? "Custom" : `Br ${plan.price * 120}`,
            period: plan.period,
            description: plan.description,
            features: plan.features,
            color,
            bg,
            badge: plan.badge,
            activeCount: getPlanCount(plan.name) || (plan.name === "Starter" ? 12 : plan.name === "Growth" ? 28 : 2)
        };
    });

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription Plans</h1>
                    <p className="text-slate-500 mt-1">Manage platform pricing tiers, features, and active subscribers.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="bg-white">
                        <Zap className="h-4 w-4 mr-2" /> View active licenses
                    </Button>
                    <Button className="bg-[#635BFF] hover:bg-[#5249E5] text-white tracking-wide">
                        <Plus className="h-4 w-4 mr-2" /> Add New Plan
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {plansUI.map((plan: any, idx: number) => (
                    <Card key={idx} className={`border-slate-200 shadow-sm relative overflow-hidden ${plan.badge ? 'ring-2 ring-indigo-500' : ''}`}>
                        {plan.badge && (
                            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                                {plan.badge}
                            </div>
                        )}
                        <CardHeader className={`pb-4 ${plan.bg}`}>
                            <CardTitle className="flex justify-between items-center text-xl">
                                {plan.name}
                            </CardTitle>
                            <div className="mt-4">
                                <span className={`text-4xl font-extrabold ${plan.color}`}>{plan.price}</span>
                                <span className="text-slate-500 font-medium">{plan.period}</span>
                            </div>
                            <CardDescription className="pt-2 text-slate-600">
                                {plan.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ul className="space-y-3">
                                {plan.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                        <div className="bg-emerald-100 rounded-full p-0.5 mt-0.5 shrink-0">
                                            <Check className="h-3 w-3 text-emerald-600" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 pt-5">
                            <div className="w-full flex justify-between items-center">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Schools</span>
                                <Badge variant="secondary" className="bg-white font-mono shadow-sm">
                                    <Users className="h-3 w-3 mr-1 text-slate-400" /> {plan.activeCount}
                                </Badge>
                            </div>
                            <Button variant="outline" className="w-full bg-white text-slate-700 font-semibold shadow-sm">
                                <Edit className="h-4 w-4 mr-2" /> Edit Configuration
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
