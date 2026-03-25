import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, TrendingUp, Users, CreditCard } from "lucide-react";

export default function RevenueAnalyticsPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Revenue & Growth Analytics</h1>
                <p className="text-slate-500 mt-1">Platform MRR, churn rates, and feature usage analytics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Total ARPA <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">Br 40,800</div>
                        <p className="text-xs font-semibold text-emerald-500 mt-2">Avg Rev Per Account</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Net Churn Rate <Users className="h-4 w-4 text-rose-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">1.2%</div>
                        <p className="text-xs font-semibold text-rose-500 mt-2">Down 0.4% from last quarter</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            LTV / CAC <CreditCard className="h-4 w-4 text-blue-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">4.5x</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">Healthy ratio (Target 3x+)</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Total Processed <BarChart className="h-4 w-4 text-indigo-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">Br 51M</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">All-time volume</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-white lg:col-span-2">
                    <CardHeader>
                        <CardTitle>MRR Growth (Last 12 Months)</CardTitle>
                        <CardDescription>Monthly Recurring Revenue expansion across the network.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg m-6 mb-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                        <div className="z-10 text-center flex flex-col items-center gap-3">
                            <TrendingUp className="h-10 w-10 text-slate-300" />
                            <p className="text-sm font-medium text-slate-500 bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm">
                                Beautiful Multi-line Area Chart Required
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle>Top Upgrades</CardTitle>
                        <CardDescription>Schools upgrading plans.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-slate-900">Addis Academy</p>
                                <p className="text-xs text-slate-500">Starter → Growth</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">+Br 36,000 MRR</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-slate-900">Safari International</p>
                                <p className="text-xs text-slate-500">Growth → Enterprise</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">+Br 180,000 MRR</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-slate-900">Bole Secondary</p>
                                <p className="text-xs text-slate-500">Starter → Growth</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">+Br 36,000 MRR</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
