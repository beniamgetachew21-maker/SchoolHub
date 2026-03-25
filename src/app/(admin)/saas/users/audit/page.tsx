import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Download, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AuditLogsPage() {
    const logs = await prisma.globalAuditLog.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
        include: { tenant: true }
    });

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Global Audit Logs</h1>
                    <p className="text-slate-500 mt-1">Immutable record of high-privilege actions and system events.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="bg-white">
                        <Download className="h-4 w-4 mr-2" /> Export CSV
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">Timestamp</th>
                                <th className="px-6 py-4 font-medium">Action</th>
                                <th className="px-6 py-4 font-medium">Actor ID</th>
                                <th className="px-6 py-4 font-medium">Target Tenant</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                        {log.createdAt.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">{log.actionType}</div>
                                        <div className="text-slate-500 text-xs truncate max-w-[250px]">{log.details}</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                                        {log.actorId}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-700">
                                        {log.tenant?.name || 'System / Platform'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Success</Badge>
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 flex flex-col items-center justify-center">
                                        <ShieldCheck className="h-8 w-8 text-slate-300 mb-3" />
                                        <span>No global audit logs found in the system yet.</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
