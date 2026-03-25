import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LifeBuoy, Search, Filter, Clock, CheckCircle2 } from "lucide-react";
import { getTicketStats } from "@/lib/saas/ticket-actions";
import { ResolveTicketButton } from "./resolve-button";
import { SearchInput } from "@/components/ui/search-input";
import { prisma } from "@/lib/prisma";

export default async function SupportTicketsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const q = params.q;

    const tickets = await prisma.supportTicket.findMany({
        where: q ? {
            OR: [
                { subject: { contains: q, mode: 'insensitive' } },
                { tenant: { name: { contains: q, mode: 'insensitive' } } }
            ]
        } : undefined,
        include: { tenant: true },
        orderBy: { createdAt: 'desc' },
    });

    const stats = await getTicketStats();

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Support & CRM</h1>
                    <p className="text-slate-500 mt-1">Manage global support tickets and tenant communications.</p>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <LifeBuoy className="h-4 w-4 mr-2" /> Create Ticket
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Unresolved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-blue-600">{stats.unresolved}</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Urgent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-rose-500">{stats.urgent}</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Avg First Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-slate-900">1h 14m</div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Resolved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold text-emerald-500">{stats.resolved}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg">Recent Tickets</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <SearchInput placeholder="Search tickets by subject or school..." />
                        </div>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                            <Filter className="h-4 w-4 text-slate-500" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-100">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-600">Ticket ID</TableHead>
                                <TableHead className="font-semibold text-slate-600">Tenant / User</TableHead>
                                <TableHead className="font-semibold text-slate-600">Subject</TableHead>
                                <TableHead className="font-semibold text-slate-600">Priority</TableHead>
                                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                                <TableHead className="text-right font-semibold text-slate-600">Last Updated</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.map((t: any) => (
                                <TableRow key={t.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                                    <TableCell className="font-mono text-xs font-medium text-slate-500">
                                        {t.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-slate-900">{t.school}</div>
                                        <div className="text-xs text-slate-500">{t.user}</div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-700">
                                        {t.subject}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            t.priority === 'Urgent' ? 'border-rose-200 text-rose-700 bg-rose-50' :
                                            t.priority === 'High' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                                            'border-blue-200 text-blue-700 bg-blue-50'
                                        }>
                                            {t.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {t.status === 'Resolved' ? (
                                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 gap-1"><CheckCircle2 className="h-3 w-3" /> Resolved</Badge>
                                            ) : t.status === 'In Progress' ? (
                                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>
                                            ) : (
                                                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">Open</Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-slate-500">
                                        {t.status !== 'Resolved' ? <ResolveTicketButton id={t.id} /> : <span className="mr-8">{t.time}</span>}
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
