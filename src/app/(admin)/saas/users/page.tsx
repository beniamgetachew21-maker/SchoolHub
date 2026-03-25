import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SearchInput } from "@/components/ui/search-input";

export default async function GlobalUsersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const q = params.q;

    const users = await prisma.user.findMany({
        where: q ? {
            email: { contains: q, mode: 'insensitive' }
        } : undefined,
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: { tenant: true, role: true }
    });

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Global User Directory</h1>
                    <p className="text-slate-500 mt-1">Manage and audit all users across every registered school tenant.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="bg-white">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Users className="h-4 w-4 mr-2" /> Invite Super Admin
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                    <SearchInput placeholder="Search users by name or email..." />
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Tenant (School)</th>
                                <th className="px-6 py-4 font-medium">Joined</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">{u.entityType || 'System Admin'}</div>
                                        <div className="text-slate-500 text-xs">{u.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className="bg-slate-50 text-slate-700">
                                            {u.role?.name || 'ADMIN'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-700">
                                        {u.tenant?.name || <span className="text-slate-400 font-normal">Super Admin</span>}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {u.createdAt.toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="text-blue-600 font-medium">Manage</Button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No users found in the global database.
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
