export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getAllTenantsWithSubscriptions, getAllSubscriptionPlans } from "@/lib/saas-actions";
import { Building, Users, CreditCard, Activity, TrendingUp, ShieldAlert, HeartPulse } from "lucide-react";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function GlobalDashboard() {
  // Guard
  const session = (await cookies()).get("session")?.value;
  if (!session) {
      redirect("/login");
  }

  const payload = await decrypt(session);
  if (!payload || payload.role !== "SUPER_ADMIN") {
      redirect("/login");
  }

  let tenants: any[] = [];
  let plans: any[] = [];
  let error = null;

  try {
    tenants = await getAllTenantsWithSubscriptions();
    plans = await getAllSubscriptionPlans();
  } catch (e: any) {
    console.error("SaaS Dashboard Fetch Error:", e);
    error = e.message;
  }

  const activeTenants = tenants.filter(t => t.status === "Active");
  const threatTenants = tenants.filter(t => t.status !== "Active");

  if (error) {
      return (
          <div className="p-8 text-center space-y-4">
              <h1 className="text-2xl font-bold text-red-600">Database Connection Error</h1>
              <p className="text-slate-500">The platform was unable to connect to the database. Please check your DATABASE_URL.</p>
              <pre className="p-4 bg-slate-100 rounded text-xs text-left max-w-xl mx-auto overflow-auto">{error}</pre>
          </div>
      );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Platform Command Center</h1>
        <p className="text-slate-500 mt-1">Global oversight of all institutions, revenue, and system health.</p>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Schools</CardTitle>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building className="h-4 w-4" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900">{tenants.length}</div>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +2 this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Global Users</CardTitle>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="h-4 w-4" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900">12,543</div>
            <p className="text-xs font-semibold text-slate-400 mt-2">Across all tenants</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Est. MRR</CardTitle>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard className="h-4 w-4" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900">Br 1.4M</div>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +8.4% MRR Growth
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">System Alerts</CardTitle>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><ShieldAlert className="h-4 w-4" /></div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-rose-600">2</div>
            <p className="text-xs font-semibold text-slate-400 mt-2">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed/Graph Area */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>New schools and student registrations over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center bg-slate-50/50 rounded-lg border border-slate-100 m-6 mb-8">
            <div className="text-center text-slate-400 flex flex-col items-center gap-2">
              <Activity className="h-8 w-8 text-blue-200" />
              <p className="text-sm font-medium">Analytics Chart Placeholder</p>
              <p className="text-xs">Recharts or Chart.js needed here</p>
            </div>
          </CardContent>
        </Card>

        {/* System Health Area */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 tracking-wide uppercase"><HeartPulse className="h-4 w-4 text-emerald-500" /> System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">Database Capacity (Supabase EU)</span>
                  <span className="text-emerald-600">12%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[12%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">File Storage (AWS S3)</span>
                  <span className="text-blue-600">45%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[45%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm tracking-wide uppercase">Recent Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { time: "10m ago", text: "New tenant 'Addis Academy' registered." },
                { time: "1h ago", text: "System daily backup completed successfully." },
                { time: "3h ago", text: "'Future School' subscription upgraded to Pro." }
              ].map((ev, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-700">{ev.text}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{ev.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
