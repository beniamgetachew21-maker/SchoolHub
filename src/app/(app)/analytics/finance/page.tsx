import { BarChart3, TrendingUp, Users, DollarSign, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FinancialAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
        <p className="text-muted-foreground">Detailed revenue, expenditure, and fiscal stability reports.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FinStat label="Total Revenue" value="$842,500" trend="+12.5%" isUp />
        <AnalyticsStat label="Operating Costs" value="$312,000" trend="-2.4%" isUp={false} />
        <FinStat label="Scholarship Fund" value="$45,200" trend="+5.0%" isUp />
        <AnalyticsStat label="Net Margin" value="62.8%" trend="+1.2%" isUp />
      </div>

      <Card className="rounded-[40px] shadow-sm border-slate-200 overflow-hidden">
         <CardHeader className="p-8">
            <CardTitle className="text-2xl font-black">Institutional Cashflow</CardTitle>
            <CardDescription>Monthly comparison of collected fees vs. operational expenses.</CardDescription>
         </CardHeader>
         <CardContent className="h-[400px] flex items-center justify-center bg-slate-50 mx-8 mb-8 rounded-[32px] border-2 border-dashed border-slate-100">
            <div className="flex flex-col items-center gap-4 text-slate-300">
               <BarChart3 className="h-16 w-16" />
               <p className="text-lg font-bold">Financial Visualizations Pending Integration</p>
               <Button variant="outline" className="rounded-full">Load Fiscal Data</Button>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

function FinStat({ label, value, trend, isUp }: { label: string, value: string, trend: string, isUp: boolean }) {
  return (
    <Card className="rounded-3xl shadow-sm border-slate-100 bg-emerald-950 text-white overflow-hidden relative">
       <div className="absolute top-0 right-0 p-6 opacity-10">
          <DollarSign className="h-12 w-12" />
       </div>
       <CardContent className="p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300/60 mb-1">{label}</p>
          <div className="text-3xl font-black tracking-tighter mb-4">{value}</div>
          <div className="flex items-center gap-2">
             <div className={`p-1 rounded-full ${isUp ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'}`}>
                {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
             </div>
             <span className="text-[10px] font-black tracking-widest">{trend}</span>
          </div>
       </CardContent>
    </Card>
  );
}

function AnalyticsStat({ label, value, trend, isUp }: { label: string, value: string, trend: string, isUp: boolean }) {
  return (
    <Card className="rounded-3xl shadow-sm border-slate-100 p-6">
       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
       <div className="text-3xl font-black tracking-tighter mb-4">{value}</div>
       <div className="flex items-center gap-2">
          <div className={`p-1 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
             {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          </div>
          <span className={`text-[10px] font-black tracking-widest ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>{trend}</span>
       </div>
    </Card>
  );
}
