export const dynamic = 'force-dynamic';
import { getAllTenantsWithSubscriptions } from "@/lib/saas-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, MoreVertical, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { prisma } from '@/lib/prisma';
import { ImpersonateButton } from "./impersonate-button";

export default async function TenantsPage({ searchParams }: { searchParams: { q?: string } }) {
    const q = searchParams.q;

    const tenantsReq = await prisma.tenant.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const tenants = tenantsReq.filter(t => !q || t.name.toLowerCase().includes(q.toLowerCase()));

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Institutions</h1>
                    <p className="text-slate-500 mt-1">Manage all registered schools, their plans, and status.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="text-slate-600 bg-white">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Link href="/saas/tenants/new">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            + Onboard School
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg">All Registered Tenants</CardTitle>
                        <CardDescription>Showing {tenants.length} institutions across all regions</CardDescription>
                    </div>
                    <div className="relative w-64">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <SearchInput placeholder="Search schools..." />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-600 w-[300px]">Institution Name</TableHead>
                                <TableHead className="font-semibold text-slate-600">Subdomain</TableHead>
                                <TableHead className="font-semibold text-slate-600">Subscription Plan</TableHead>
                                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                                <TableHead className="text-right font-semibold text-slate-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tenants.map((tenant) => (
                                <TableRow key={tenant.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <Link href={`/saas/tenants/${tenant.id}`} className="text-slate-900 font-bold hover:text-blue-600 transition-colors">
                                                {tenant.name}
                                            </Link>
                                            <span className="text-xs text-slate-400 font-normal">{tenant.contactEmail}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-mono text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                                            {tenant.domain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {tenant.subscriptionId ? (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="h-4 w-4 text-slate-400" />
                                                    <span className="text-sm font-semibold text-slate-700">PRO Plan</span>
                                                </div>
                                            </>
                                        ) : (
                                            <span className="text-sm text-slate-300 italic">No Active Plan</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                tenant.status === 'Active'
                                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm"
                                                    : "bg-rose-100 text-rose-700 border-rose-200 shadow-sm"
                                            }
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${tenant.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                            {tenant.status}
                                            {tenant.subscriptionId ? 'Billed Monthly' : '14 Days Left'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ImpersonateButton tenantId={tenant.id} tenantName={tenant.name} />
                                        <Link href={`/saas/tenants/${tenant.id}`}>
                                            <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                Manage
                                            </Button>
                                        </Link>
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
