import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Server, Cpu, Info } from "lucide-react";

export default function SystemHealthPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Health & Performance</h1>
                <p className="text-slate-500 mt-1">Global monitoring of server uptime, queue processing, and error logs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Server Uptime <Server className="h-4 w-4 text-emerald-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">99.99%</div>
                        <p className="text-xs font-semibold text-emerald-500 mt-2">All services operational</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            API Latency <Activity className="h-4 w-4 text-blue-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">124ms</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">Global Average (P95)</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Active Jobs <Cpu className="h-4 w-4 text-slate-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">4,120</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">In worker queues (Redis)</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center justify-between">
                            Error Rate <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">0.05%</div>
                        <p className="text-xs font-semibold text-amber-600 mt-2">412 failed reqs / 1 hr</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg text-slate-900">Live Server Error Logs (Global)</CardTitle>
                        <CardDescription>Recent uncaught exceptions across all tenants.</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-rose-500 animate-pulse" /> Live Updating
                    </Badge>
                </CardHeader>
                <CardContent className="p-0 font-mono text-xs text-slate-300 bg-slate-900">
                    <div className="h-96 overflow-y-auto p-4 space-y-2">
                        <div className="flex gap-4">
                            <span className="text-slate-500">[2026-03-23 07:44:12]</span>
                            <span className="text-rose-400">ERROR</span>
                            <span className="text-blue-300">[TENANT: Safari-Intl]</span>
                            <span className="text-white">PrismaClientKnownRequestError: Record not found in `updateAttendance`</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500">[2026-03-23 07:42:04]</span>
                            <span className="text-amber-400">WARN</span>
                            <span className="text-blue-300">[TENANT: SYSTEM]</span>
                            <span className="text-white">Rate limit approaching for POST /api/v1/auth/login from IP 192.168.1.4</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500">[2026-03-23 07:40:34]</span>
                            <span className="text-emerald-400">INFO</span>
                            <span className="text-blue-300">[TENANT: SYSTEM]</span>
                            <span className="text-white">Redis queue worker #442 gracefully restarted.</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500">[2026-03-23 07:38:11]</span>
                            <span className="text-rose-400">ERROR</span>
                            <span className="text-blue-300">[TENANT: Addis-Academy]</span>
                            <span className="text-white">AWS S3 Timeout: Failed to upload student avatar image.</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
