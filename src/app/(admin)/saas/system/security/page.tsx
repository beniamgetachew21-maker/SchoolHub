import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, Key, Users, Lock, Download, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SecurityPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security & Access Control</h1>
                    <p className="text-slate-500 mt-1">Global platform compliance, audit logs summary, and Super Admin access.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="text-slate-600 bg-white border-slate-200">
                        <Download className="h-4 w-4 mr-2" /> Download Compliance Report (PDF)
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-emerald-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100 flex items-center justify-between uppercase tracking-wider">
                            Global Threat Level <Shield className="h-4 w-4" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-white">Secure</div>
                        <p className="text-xs font-semibold text-emerald-200 mt-2">No active DDOS or brute force detected.</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center justify-between uppercase tracking-wider">
                            Failed Login Attempts <Lock className="h-4 w-4 text-amber-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">423</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">Last 24 hours (Platform-wide)</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center justify-between uppercase tracking-wider">
                            Active Super Admins <Key className="h-4 w-4 text-indigo-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-slate-900">3</div>
                        <p className="text-xs font-semibold text-slate-400 mt-2">Requires hardware 2FA.</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg">Recent Security Events (Global)</CardTitle>
                        <CardDescription>Suspicious activity flagged by WAF and authentication layers.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white border-b border-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-600">Timestamp</TableHead>
                                <TableHead className="font-semibold text-slate-600">Event Type</TableHead>
                                <TableHead className="font-semibold text-slate-600">Source IP</TableHead>
                                <TableHead className="font-semibold text-slate-600">Target Tenant</TableHead>
                                <TableHead className="font-semibold text-slate-600">Severity</TableHead>
                                <TableHead className="font-semibold text-slate-600 text-right">Action Taken</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="text-sm text-slate-500">2026-03-23 07:14:22</TableCell>
                                <TableCell className="font-medium text-slate-900">Multiple Failed Logins</TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">192.168.4.15</TableCell>
                                <TableCell>Addis Academy</TableCell>
                                <TableCell><Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 gap-1"><ShieldAlert className="h-3 w-3" /> High</Badge></TableCell>
                                <TableCell className="text-right text-sm font-bold text-slate-900">IP Blocked (1hr)</TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="text-sm text-slate-500">2026-03-23 06:40:11</TableCell>
                                <TableCell className="font-medium text-slate-900">Mass Data Export</TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">45.23.11.90</TableCell>
                                <TableCell>Safari International</TableCell>
                                <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1"><AlertTriangle className="h-3 w-3" /> Medium</Badge></TableCell>
                                <TableCell className="text-right text-sm font-bold text-slate-900">Logged for Audit</TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-slate-50/50 transition-colors">
                                <TableCell className="text-sm text-slate-500">2026-03-23 04:12:05</TableCell>
                                <TableCell className="font-medium text-slate-900">Super Admin Login</TableCell>
                                <TableCell className="font-mono text-xs text-slate-500">10.0.0.8</TableCell>
                                <TableCell>SYSTEM</TableCell>
                                <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Info</Badge></TableCell>
                                <TableCell className="text-right text-sm font-bold text-slate-900">Success (2FA Auth)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
