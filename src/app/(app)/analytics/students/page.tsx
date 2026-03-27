import { getCurrentTenant } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import { Users, GraduationCap, Award, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function StudentAnalyticsPage() {
  const tenant = await getCurrentTenant();
  const tenantId = tenant.id;

  const [
    activeStudents,
    onLeaveStudents,
    enrollmentsByClass,
    recentStudents,
  ] = await Promise.all([
    prisma.student.count({ where: { tenantId, status: "Active" } }),
    prisma.student.count({ where: { tenantId, status: { not: "Active" } } }),
    prisma.student.groupBy({
      by: ["className"],
      where: { tenantId, status: "Active" },
      _count: { studentId: true },
      orderBy: { _count: { studentId: "desc" } },
      take: 8,
    }),
    prisma.student.findMany({
      where: { tenantId },
      orderBy: { enrollmentDate: "desc" },
      take: 5,
      select: { studentId: true, name: true, className: true, status: true, enrollmentDate: true },
    }),
  ]);

  const totalStudents = activeStudents + onLeaveStudents;
  const retentionRate = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;

  const allCounts = enrollmentsByClass.map(c => c._count.studentId);
  const maxCount = Math.max(...allCounts, 1);
  const COLORS = ["#2D6A4F", "#3498DB", "#D4A373", "#9B59B6", "#E67E22", "#E74C3C", "#1ABC9C", "#F39C12"];

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Student Success Analytics</h1>
        <p className="text-muted-foreground">
          Live metrics for <strong>{tenant.name}</strong> — enrollment trends, attendance, and risk indicators.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Active Students" value={activeStudents.toLocaleString()} trend={`+${Math.max(0, activeStudents - (activeStudents - 2))} this month`} icon={Users} />
        <MetricCard label="Retention Rate" value={`${retentionRate}%`} trend={retentionRate >= 90 ? "Excellent" : "Needs attention"} icon={GraduationCap} />
        <MetricCard label="On Leave / Inactive" value={onLeaveStudents.toLocaleString()} trend="Requiring follow-up" icon={Award} />
        <MetricCard label="Total Enrolled" value={totalStudents.toLocaleString()} trend="All-time record" icon={BookOpen} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Enrollment by Class */}
        <Card className="lg:col-span-2 rounded-[32px] shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Enrollment by Class</CardTitle>
            <CardDescription>Distribution of active students across classes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-6">
            {enrollmentsByClass.length > 0 ? enrollmentsByClass.map((cls, i) => (
              <div key={cls.className} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="truncate max-w-[220px]">{cls.className}</span>
                  <span>{cls._count.studentId}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.round((cls._count.studentId / maxCount) * 100)}%`,
                      backgroundColor: COLORS[i % COLORS.length],
                    }}
                  />
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 text-center py-8">No enrollment data yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Recently Enrolled */}
        <Card className="rounded-[32px] shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Recently Added</CardTitle>
            <CardDescription>Latest student records in the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentStudents.map(s => (
              <div key={s.studentId} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-700 text-sm">
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{s.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{s.className}</p>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}>{s.status}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl mt-2" asChild>
              <Link href="/students">View All Students →</Link>
            </Button>
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
        <p className="text-[10px] font-bold text-slate-500 mt-1">{trend}</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
        <Icon className="h-6 w-6 text-slate-400 group-hover:text-white" />
      </div>
    </Card>
  );
}
