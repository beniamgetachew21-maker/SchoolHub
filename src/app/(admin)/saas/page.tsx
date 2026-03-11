import { getAllTenantsWithSubscriptions, getAllSubscriptionPlans } from "@/lib/saas-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield, CreditCard, Users } from "lucide-react";

export default async function SaasAdminPage() {
    const tenants = await getAllTenantsWithSubscriptions();
    const plans = await getAllSubscriptionPlans();

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">SaaS Command Center</h1>
                    <p className="text-slate-500">Manage global institutions and billing plans</p>
                </div>
                <div className="flex gap-4">
                    <Badge variant="outline" className="px-3 py-1 bg-white shadow-sm border-slate-200 text-slate-700">
                        Total Tenants: {tenants.length}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1 bg-white shadow-sm border-slate-200 text-slate-700">
                        Active Plans: {plans.length}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase flex items-center gap-2">
                            <Globe className="h-4 w-4 text-blue-500" /> Infrastructure
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Multi-Region</div>
                        <p className="text-xs text-slate-400 mt-1">Supabase AWS EU-Central</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase flex items-center gap-2">
                            <Shield className="h-4 w-4 text-emerald-500" /> Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Subdomain RLS</div>
                        <p className="text-xs text-slate-400 mt-1">Isolation Active</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-purple-500" /> Billing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Unified Ledger</div>
                        <p className="text-xs text-slate-400 mt-1">Stripe Connected</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100">
                    <CardTitle>Onboarded Institutions</CardTitle>
                    <CardDescription>Real-time view of all tenants across the platform</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow>
                                <TableHead>Institution Name</TableHead>
                                <TableHead>Subdomain</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white">
                            {tenants.map((tenant) => (
                                <TableRow key={tenant.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{tenant.name}</span>
                                            <span className="text-xs text-slate-400 font-normal">{tenant.contactEmail}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-mono text-[10px] bg-blue-50 text-blue-700 border-blue-100">
                                            {tenant.domain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {tenant.subscription ? (
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-3 w-3 text-slate-400" />
                                                <span className="text-sm font-semibold text-slate-700">{tenant.subscription.plan}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-slate-300 italic">No Active Plan</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                tenant.status === 'Active'
                                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                    : "bg-red-100 text-red-700 border-red-200"
                                            }
                                        >
                                            {tenant.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                                            Manage Plan
                                        </button>
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
