import DashboardClient from "@/components/dashboard-client";
import { getCurrentTenant } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const tenant = await getCurrentTenant();
  const tenantId = tenant.id;

  // ─── Real Counts ─────────────────────────────────────────────────────
  const [totalStudents, totalStaff, feesSummary] = await Promise.all([
    prisma.student.count({ where: { tenantId, status: "Active" } }),
    prisma.employee.count({ where: { tenantId, status: "Active" } }),
    prisma.invoice.aggregate({
      where: { tenantId, status: { not: "Paid" } },
      _sum: { amount: true },
    }),
  ]);

  const feesDue = feesSummary._sum.amount ?? 0;

  // ─── Monthly Chart Data (last 7 months) ──────────────────────────────
  const today = new Date();
  const months: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "long" }));
  }

  // Aggregate payments per month as proxy for "collected"
  const payments = await prisma.payment.findMany({
    where: { tenantId },
    select: { amount: true, date: true },
  });

  const paymentByMonth: Record<string, number> = {};
  for (const p of payments) {
    try {
      const d = new Date(p.date);
      const monthName = d.toLocaleString("default", { month: "long" });
      paymentByMonth[monthName] = (paymentByMonth[monthName] || 0) + p.amount;
    } catch {}
  }

  // Aggregate payroll per month as proxy for "expenses"
  const payroll = await prisma.payrollRecord.findMany({
    where: { tenantId },
    select: { netSalary: true, month: true },
  });

  const payrollByMonth: Record<string, number> = {};
  for (const r of payroll) {
    // month format: "2024-09"
    const [year, monthNum] = r.month.split("-");
    const monthName = new Date(Number(year), Number(monthNum) - 1).toLocaleString("default", { month: "long" });
    payrollByMonth[monthName] = (payrollByMonth[monthName] || 0) + r.netSalary;
  }

  const chartData = months.map((month) => ({
    month,
    collected: Math.round(paymentByMonth[month] || 0),
    expenses: Math.round(payrollByMonth[month] || 0),
    other: 0,
  }));

  // ─── Announcements (recent applications as activity) ──────────────────
  const recentApplications = await prisma.application.findMany({
    where: { tenantId },
    orderBy: { date: "desc" },
    take: 3,
    select: { id: true, name: true, date: true },
  });

  const announcements = recentApplications.map((a) => ({
    id: a.id,
    title: `New Application: ${a.name}`,
    date: new Date().toISOString(), // use current time since date is a string
  }));

  const dashboardData = {
    totalStudents,
    totalStaff,
    feesDue,
    announcements: announcements as any,
    chartData,
  };

  return <DashboardClient data={dashboardData as any} />;
}
