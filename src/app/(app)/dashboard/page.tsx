import DashboardClient from "@/components/dashboard-client";

export default async function DashboardPage() {
  // Injecting presentation-ready sample data
  const totalStudents = 1248;
  const totalStaff = 86;
  const feesDue = 142500;

  const chartData = [
    { month: "September", collected: 450, expenses: 320, other: 120 },
    { month: "October", collected: 520, expenses: 380, other: 150 },
    { month: "November", collected: 480, expenses: 410, other: 100 },
    { month: "December", collected: 610, expenses: 350, other: 180 },
    { month: "January", collected: 550, expenses: 420, other: 130 },
    { month: "February", collected: 680, expenses: 390, other: 160 },
    { month: "March", collected: 720, expenses: 450, other: 200 },
  ];

  const announcements = [
    { id: "1", title: "Quarterly Academic Review Results", date: new Date().toISOString() },
    { id: "2", title: "Institutional Infrastructure Expansion", date: new Date().toISOString() },
    { id: "3", title: "Strategic Partnership with Global Academy", date: new Date().toISOString() },
  ];

  const dashboardData = {
    totalStudents,
    totalStaff,
    feesDue,
    announcements: announcements as any,
    chartData,
  };

  return <DashboardClient data={dashboardData as any} />;
}
