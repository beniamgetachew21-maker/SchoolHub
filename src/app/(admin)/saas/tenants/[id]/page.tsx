import { getTenantDetails, updateTenantStatus } from "@/lib/saas-actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    GraduationCap, 
    Building, 
    Activity, 
    Mail, 
    Phone, 
    Globe, 
    CreditCard, 
    CalendarDays, 
    ShieldAlert, 
    LogOut,
    UserCircle
} from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function TenantDetailView({ params }: { params: { id: string } }) {
    const tenant = await getTenantDetails(params.id);
    if (!tenant) notFound();

    // Server Action for suspending/activating
    const toggleStatus = async (formData: FormData) => {
        "use server";
        const newStatus = tenant.status === "Active" ? "Suspended" : "Active";
        await updateTenantStatus(tenant.id, newStatus);
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-5">
                    <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-inner border border-blue-100">
                        {tenant.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            {tenant.name}
                            <Badge className={tenant.status === 'Active' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-rose-100 text-rose-700 hover:bg-rose-100"}>
                                {tenant.status}
                            </Badge>
                        </h1>
                        <a href={`http://${tenant.domain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost'}:3000`} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1 mt-1">
                            <Globe className="h-3.5 w-3.5" />
                            {tenant.domain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost'}
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 flex-1 md:flex-none">
                        <UserCircle className="h-4 w-4 mr-2" /> Impersonate Admin
                    </Button>
                    <form action={toggleStatus}>
                        <Button 
                            variant="destructive" 
                            className={`w-full md:w-auto ${tenant.status === 'Suspended' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'}`}
                        >
                            {tenant.status === 'Suspended' ? 'Activate School' : 'Suspend School'}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Quick Stats */}
                <div className="space-y-6 md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-blue-500" /> Total Students
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900">{tenant._count.students}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-amber-500" /> Total Staff
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900">{tenant._count.employees}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-emerald-500" /> Active Users
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900">{tenant._count.users}</div>
                                <p className="text-[10px] text-slate-400 mt-1">Accounts with login access</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Usage Limits & Storage</CardTitle>
                            <CardDescription>Monitored directly via AWS S3 and Postgres</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-slate-700">Student Capacity ({tenant.subscription?.maxStudents || 'Unlimited'})</span>
                                    <span className={tenant._count.students > (tenant.subscription?.maxStudents || 1000) * 0.9 ? "text-rose-600" : "text-emerald-600"}>
                                        {Math.round((tenant._count.students / (tenant.subscription?.maxStudents || 1000)) * 100)}%
                                    </span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${tenant._count.students > (tenant.subscription?.maxStudents || 1000) * 0.9 ? "bg-rose-500" : "bg-emerald-500"}`} style={{ width: `${Math.min((tenant._count.students / (tenant.subscription?.maxStudents || 1000)) * 100, 100)}%` }} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-slate-700">File Storage Use (2.4 GB / 10 GB)</span>
                                    <span className="text-blue-600">24%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[24%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-slate-700">API Calls (This Month)</span>
                                    <span className="text-indigo-600">8.2k / 10k Rate Limit</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[82%]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Billing & Contact Info */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center justify-between">
                                Subscription Plan
                                <CreditCard className="h-5 w-5 text-blue-400" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-2">
                            <div>
                                <div className="text-3xl font-extrabold text-blue-400">{tenant.subscription?.plan || 'None'}</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Status: {tenant.subscription?.status || 'Inactive'}</div>
                            </div>
                            <div className="space-y-2 pt-4 border-t border-slate-700/50 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Billing Cycle</span>
                                    <span className="font-medium">Monthly / Stripe</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Next Invoice</span>
                                    <span className="font-medium">{tenant.subscription?.endDate ? new Date(tenant.subscription.endDate).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wider text-slate-500">Institution Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm mt-2">
                            <div className="flex gap-3 items-start">
                                <Mail className="h-4 w-4 text-slate-400 mt-0.5" />
                                <div>
                                    <div className="font-medium text-slate-900">Primary Contact</div>
                                    <a href={`mailto:${tenant.contactEmail}`} className="text-blue-600 hover:underline">{tenant.contactEmail}</a>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Phone className="h-4 w-4 text-slate-400 mt-0.5" />
                                <div>
                                    <div className="font-medium text-slate-900">Phone Directory</div>
                                    <div className="text-slate-600">{tenant.contactPhone || 'Not provided'}</div>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Building className="h-4 w-4 text-slate-400 mt-0.5" />
                                <div>
                                    <div className="font-medium text-slate-900">Registered Address</div>
                                    <div className="text-slate-600 max-w-[200px]">{tenant.address || 'Not provided'}</div>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <CalendarDays className="h-4 w-4 text-slate-400 mt-0.5" />
                                <div>
                                    <div className="font-medium text-slate-900">Onboarding Date</div>
                                    <div className="text-slate-600">{new Date(tenant.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
