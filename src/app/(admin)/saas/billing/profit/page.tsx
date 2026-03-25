import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, PieChart } from "lucide-react";

export default function ProfitDashboardPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Platform Finance & Profit</h1>
                <p className="text-slate-500 mt-1">Breakdown of gross revenue, infrastructure expenses, and net profit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Gross Revenue (MRR)</CardTitle>
                        <div className="p-2 bg-slate-50 text-slate-400 rounded-lg"><DollarSign className="h-4 w-4" /></div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-slate-900">Br 1,708,800</div>
                        <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" /> +8.4% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Est. Infra Costs</CardTitle>
                        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Activity className="h-4 w-4" /></div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-slate-900">Br 222,000</div>
                        <p className="text-xs font-semibold text-rose-600 mt-2 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" /> +12.1% due to DB scaling
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100 uppercase tracking-wider">Net Profit (Est)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-white">Br 1,486,800</div>
                        <p className="text-xs font-semibold text-emerald-200 mt-2 flex items-center gap-1">
                            Gross Margin: 87%
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle>Expense Breakdown</CardTitle>
                        <CardDescription>Estimated infrastructure and third-party API costs.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700">Database Hosting (Supabase)</span>
                                <span className="text-slate-900">Br 102,000.00</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[45%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700">File Storage & CDN (AWS S3)</span>
                                <span className="text-slate-900">Br 50,400.00</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[22%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700">SMS / Email APIs (Twilio/SendGrid)</span>
                                <span className="text-slate-900">Br 45,600.00</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[20%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700">Server Compute (Vercel)</span>
                                <span className="text-slate-900">Br 24,000.00</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-800 w-[11%]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle>Margin Trends</CardTitle>
                        <CardDescription>Net profit margin over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72 flex items-center justify-center bg-slate-50/50 rounded-lg border border-slate-100 m-6 mb-8">
                        <div className="text-center text-slate-400 flex flex-col items-center gap-2">
                            <PieChart className="h-8 w-8 text-emerald-200" />
                            <p className="text-sm font-medium">Margin Trend Chart Placeholder</p>
                            <p className="text-xs">Recharts line chart needed here</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
