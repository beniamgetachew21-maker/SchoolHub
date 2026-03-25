import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Search, HardDrive, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

import { getGlobalDatabaseSize, getTenantStorageUsage } from "@/lib/db-actions";

export default async function DatabaseOverviewPage() {
    const globalSize = await getGlobalDatabaseSize();
    const dbUsage = await getTenantStorageUsage();

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Database & Isolation Control</h1>
                    <p className="text-slate-500 mt-1">Monitor Postgres schemas, storage size, and query load per school.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="text-slate-600 bg-white">
                        <RefreshCw className="h-4 w-4 mr-2" /> Sync Storage Metrics
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-400 uppercase tracking-wider">
                            <Database className="h-4 w-4" /> Global Cluster Storage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-white">{globalSize.formatted}</div>
                        <div className="mt-4 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all rounded-full" style={{ width: globalSize.percentage + "%" }} />
                        </div>
                        <p className="text-xs font-medium text-slate-400 mt-2">
                            {globalSize.percentage.toFixed(1)}% of 10 GB allocated capacity used.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-500 uppercase tracking-wider">
                            <HardDrive className="h-4 w-4" /> File Storage (S3 / CDN)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-slate-900">8.4 TB</div>
                        <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[84%]" />
                        </div>
                        <p className="text-xs font-semibold text-slate-500 mt-2">
                            84% of 10 TB limit. High consumption from Video Assets.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg">Tenant Isolation Viewer</CardTitle>
                        <CardDescription>Analyze storage and database health for specific tenants.</CardDescription>
                    </div>
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search by school or schema (tenant_)..." className="pl-9 h-9" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-600">Tenant ID</TableHead>
                                <TableHead className="font-semibold text-slate-600">School</TableHead>
                                <TableHead className="font-semibold text-slate-600">DB Schema</TableHead>
                                <TableHead className="font-semibold text-slate-600">Size</TableHead>
                                <TableHead className="font-semibold text-slate-600">Query Load</TableHead>
                                <TableHead className="font-semibold text-slate-600 text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dbUsage.map((db) => (
                                <TableRow key={db.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-mono text-xs font-medium text-slate-500">
                                        {db.id}
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">
                                        {db.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono text-[10px] bg-slate-50 text-slate-600">
                                            public (row-level limit)
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-700 font-medium text-sm">
                                        {db.formattedSize}
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {db.queries}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className={
                                                db.status === 'Healthy'
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                    : db.status.includes('Warning') 
                                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                                    : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                                            }
                                        >
                                            {db.status}
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
