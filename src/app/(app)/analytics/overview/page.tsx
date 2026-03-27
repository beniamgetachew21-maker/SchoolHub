import { getCurrentTenant } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import { Users, DollarSign, TrendingUp, BookOpen, GraduationCap, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AnalyticsOverviewPage() {
  const tenant = await getCurrentTenant();
  const tenantId = tenant.id;

  // ─── Real KPI Data ────────────────────────────────────────────────────
  const [
    activeStudents,
    activeStaff,
    totalBooks,
    invoiceSummary,
    paidSummary,
    studentsByClass,
    staffByDept,
  ] = await Promise.all([
    prisma.student.count({ where: { tenantId, status: "Active" } }),
    prisma.employee.count({ where: { tenantId, status: "Active" } }),
    prisma.book.count({ where: { tenantId } }),
    prisma.invoice.aggregate({ where: { tenantId }, _sum: { amount: true } }),
    prisma.invoice.aggregate({ where: { tenantId, status: "Paid" }, _sum: { amount: true } }),
    prisma.student.groupBy({ by: ["className"], where: { tenantId }, _count: { studentId: true }, orderBy: { _count: { studentId: "desc" } }, take: 6 }),
    prisma.employee.groupBy({ by: ["department"], where: { tenantId }, _count: { employeeId: true }, orderBy: { _count: { employeeId: "desc" } }, take: 6 }),
  ]);

  const totalRevenue = invoiceSummary._sum.amount ?? 0;
  const collectedRevenue = paidSummary._sum.amount ?? 0;
  const collectionRate = totalRevenue > 0 ? Math.round((collectedRevenue / totalRevenue) * 100) : 0;

  // ─── Chart colors ─────────────────────────────────────────────────────
  const CLASS_COLORS = ["#2D6A4F", "#3498DB", "#D4A373", "#9B59B6", "#E67E22", "#E74C3C"];
  const allClassCounts = studentsByClass.map(c => c._count.studentId);
  const maxClassCount = Math.max(...allClassCounts, 1);

  const allDeptCounts = staffByDept.map(d => d._count.employeeId);
  const maxDeptCount = Math.max(...allDeptCounts, 1);

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Institutional Analytics</h1>
        <p className="text-muted-foreground">
          Live KPIs and data-driven insights for <strong>{tenant.name}</strong>.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsStat label="Active Students" value={activeStudents.toLocaleString()} sub="Currently enrolled" icon={Users} color="text-emerald-600" />
        <AnalyticsStat label="Active Staff" value={activeStaff.toLocaleString()} sub="Employees on record" icon={GraduationCap} color="text-blue-600" />
        <AnalyticsStat label="Fee Collection" value={`${collectionRate}%`} sub={`ETB ${collectedRevenue.toLocaleString()} collected`} icon={DollarSign} color="text-amber-600" />
        <AnalyticsStat label="Library Books" value={totalBooks.toLocaleString()} sub="Total catalog size" icon={BookOpen} color="text-purple-600" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Students by Class */}
        <Card className="rounded-3xl shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">Student Enrollment by Grade</CardTitle>
            <CardDescription>Distribution of active students across classes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-6">
            {studentsByClass.length > 0 ? studentsByClass.map((cls, i) => (
              <div key={cls.className} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="truncate max-w-[180px]">{cls.className}</span>
                  <span>{cls._count.studentId} students</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.round((cls._count.studentId / maxClassCount) * 100)}%`,
                      backgroundColor: CLASS_COLORS[i % CLASS_COLORS.length],
                    }}
                  />
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 text-center py-8">No enrollment data yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Staff by Department */}
        <Card className="rounded-3xl shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">Staff by Department</CardTitle>
            <CardDescription>Headcount distribution across departments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-6">
            {staffByDept.length > 0 ? staffByDept.map((dept, i) => (
              <div key={dept.department} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="truncate max-w-[180px]">{dept.department || "Unassigned"}</span>
                  <span>{dept._count.employeeId} staff</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.round((dept._count.employeeId / maxDeptCount) * 100)}%`,
                      backgroundColor: CLASS_COLORS[(i + 2) % CLASS_COLORS.length],
                    }}
                  />
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 text-center py-8">No staff data yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Revenue Summary */}
        <Card className="rounded-3xl shadow-sm border-slate-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Financial Health Summary</CardTitle>
            <CardDescription>Aggregate fee tracking across all students.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="bg-emerald-50 rounded-2xl p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Total Invoiced</p>
                <p className="text-2xl font-black text-slate-900">ETB {Math.round(totalRevenue).toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Total Collected</p>
                <p className="text-2xl font-black text-slate-900">ETB {Math.round(collectedRevenue).toLocaleString()}</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Outstanding</p>
                <p className="text-2xl font-black text-slate-900">ETB {Math.round(totalRevenue - collectedRevenue).toLocaleString()}</p>
              </div>
            </div>

            {/* Collection rate bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>Collection Rate</span>
                <span className={collectionRate >= 80 ? "text-emerald-600" : "text-amber-600"}>{collectionRate}%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                  style={{ width: `${collectionRate}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsStat({ label, value, sub, icon: Icon, color }: {
  label: string; value: string; sub: string; icon: any; color: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        <div className={`p-2.5 bg-slate-50 rounded-xl group-hover:bg-current/10 transition-colors`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black font-headline tracking-tighter">{value}</div>
        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  );
}
