import { Users, GraduationCap, Award, BookOpen, Search, Filter, MoreVertical, LineChart, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Student Success Analytics</h1>
        <p className="text-muted-foreground">Monitoring academic trends, attendance patterns, and student performance metrics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Average GPA" value="3.42" trend="+0.12" icon={GraduationCap} />
        <MetricCard label="Attendance Rate" value="94.8%" trend="-0.2%" icon={Users} />
        <MetricCard label="Pass Rate" value="92%" trend="+2.5%" icon={Award} />
        <MetricCard label="Active Students" value="1,248" trend="+15" icon={BookOpen} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-[32px] shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>Academic grading distribution across the current term.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 mx-6 mb-6">
             <div className="flex flex-col items-center gap-4 text-slate-300">
                <PieChart className="h-12 w-12" />
                <p className="font-bold">Grading Distribution Charts Pending</p>
             </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] shadow-sm border-slate-200">
           <CardHeader>
              <CardTitle>At-Risk Students</CardTitle>
              <CardDescription>Automated alerts based on attendance and performance.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <RiskStudent name="Abebe Bikila" id="ST-102" risk="High" />
              <RiskStudent name="Sara Tefera" id="ST-088" risk="Medium" />
              <RiskStudent name="Daniel Kassahun" id="ST-156" risk="Medium" />
              <Button variant="outline" className="w-full rounded-xl">View All Risk Alerts</Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, icon: Icon }: { label: string, value: string, trend: string, icon: any }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-100 p-6 flex items-center justify-between group hover:border-emerald-200 transition-colors cursor-pointer">
       <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
          <div className="text-3xl font-black">{value}</div>
          <p className={`text-[10px] font-bold mt-1 ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{trend} from prev. year</p>
       </div>
       <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
          <Icon className="h-6 w-6 text-slate-400 group-hover:text-white" />
       </div>
    </Card>
  );
}

function RiskStudent({ name, id, risk }: { name: string, id: string, risk: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-transparent hover:border-red-100 transition-all cursor-pointer">
       <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div>
             <p className="font-bold text-sm tracking-tight">{name}</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{id}</p>
          </div>
       </div>
       <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
         risk === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
       }`}>
          {risk}
       </span>
    </div>
  );
}
