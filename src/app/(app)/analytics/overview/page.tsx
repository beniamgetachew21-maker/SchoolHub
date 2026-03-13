import { BarChart3, TrendingUp, Users, DollarSign, PieChart, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalyticsOverviewPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Institutional Analytics</h1>
        <p className="text-muted-foreground">Strategic KPIs and data-driven insights for school performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsStat label="Student Retention" value="98.2%" trend="+0.4%" icon={Users} />
        <AnalyticsStat label="Academic Growth" value="12.5%" trend="+3.1%" icon={TrendingUp} />
        <AnalyticsStat label="Revenue Growth" value="+15%" trend="+2.2%" icon={DollarSign} />
        <AnalyticsStat label="System Utilization" value="89%" trend="+5.0%" icon={PieChart} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Strategic Trends</CardTitle>
            <CardDescription>Comparative growth analysis across departments.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 mx-6 mb-6">
             <div className="flex flex-col items-center gap-2 text-slate-400">
               <LineChart className="h-10 w-10" />
               <p className="font-bold">Real-time charts pending integration</p>
             </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Departmental KPIs</CardTitle>
            <CardDescription>Performance metrics by academic unit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <KPIMeter label="Science Department" value={85} />
             <KPIMeter label="Arts & Humanities" value={92} />
             <KPIMeter label="Sports & Athletics" value={78} />
             <KPIMeter label="Administration" value={95} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsStat({ label, value, trend, icon: Icon }: { label: string, value: string, trend: string, icon: any }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-100 hover:border-primary/20 transition-colors cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        <Icon className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black font-headline tracking-tighter">{value}</div>
        <p className="text-[10px] font-bold text-emerald-600 mt-0.5">{trend} from last term</p>
      </CardContent>
    </Card>
  );
}

function KPIMeter({ label, value }: { label: string, value: number }) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between text-xs font-bold">
          <span>{label}</span>
          <span>{value}%</span>
       </div>
       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${value}%` }} />
       </div>
    </div>
  );
}
