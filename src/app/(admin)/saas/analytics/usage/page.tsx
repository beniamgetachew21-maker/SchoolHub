import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MousePointerClick, TrendingUp, MonitorPlay, LogIn, Download } from "lucide-react";

export default function UsageAnalyticsPage() {
    // Dummy Data for feature adoption
    const featureUsage = [
        { id: "FEAT-101", feature: "Student Information System (SIS)", category: "Core Operations", adoption: "98%", trend: "+2.1%", status: "High Adoption" },
        { id: "FEAT-102", feature: "Attendance Tracking App", category: "Core Operations", adoption: "85%", trend: "+12.4%", status: "High Adoption" },
        { id: "FEAT-103", feature: "Parent Communication Portal", category: "Engagement", adoption: "64%", trend: "+34.2%", status: "Growing Fast" },
        { id: "FEAT-104", feature: "Library Management", category: "Campus Life", adoption: "42%", trend: "-1.5%", status: "Low Engagement" },
        { id: "FEAT-105", feature: "School Transport Tracking", category: "Logistics", adoption: "28%", trend: "+5.8%", status: "Niche Use" },
    ];

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Feature Usage & Adoption</h1>
                    <p className="text-slate-500 mt-1">Identify which modules schools are actively using to drive product decisions.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="text-slate-600 bg-white">
                        <Download className="h-4 w-4 mr-2" /> Export Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-indigo-100 uppercase tracking-wider flex items-center justify-between">
                            Daily Active Users <LogIn className="h-4 w-4" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-white">124.5K</div>
                        <p className="text-xs font-medium text-indigo-200 mt-2 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> Across all schools globally
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Total Interactions <MousePointerClick className="h-4 w-4 text-emerald-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">12.8M</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">Clicks & actions this week</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Avg Session Time <MonitorPlay className="h-4 w-4 text-blue-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">14m 22s</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">Per unique user</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white flex flex-col justify-center items-center text-center p-6 border-dashed border-2 border-slate-200">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">Connect Google Analytics</div>
                    <div className="text-xs text-slate-500 mt-1">For deeper funnels</div>
                </Card>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg">Module Adoption Breakdown</CardTitle>
                        <CardDescription>Percentage of active schools utilizing each module.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-600">Module ID</TableHead>
                                <TableHead className="font-semibold text-slate-600">Feature Name</TableHead>
                                <TableHead className="font-semibold text-slate-600">Category</TableHead>
                                <TableHead className="font-semibold text-slate-600 text-right">Adoption Rate</TableHead>
                                <TableHead className="font-semibold text-slate-600 text-right">WoW Trend</TableHead>
                                <TableHead className="font-semibold text-slate-600 text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {featureUsage.map((feat) => (
                                <TableRow key={feat.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-mono text-xs font-medium text-slate-500">
                                        {feat.id}
                                    </TableCell>
                                    <TableCell className="font-bold text-slate-900">
                                        {feat.feature}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                                            {feat.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-slate-900">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: feat.adoption }} />
                                            </div>
                                            {feat.adoption}
                                        </div>
                                    </TableCell>
                                    <TableCell className={`text-right font-bold ${feat.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {feat.trend}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className={
                                                feat.status === 'High Adoption'
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                    : feat.status === 'Growing Fast' 
                                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                                    : feat.status === 'Low Engagement'
                                                    ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                                                    : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                            }
                                        >
                                            {feat.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
