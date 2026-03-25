import { SaasSidebar } from "@/components/saas/saas-sidebar";
import { SaasTopbar } from "@/components/saas/saas-topbar";

export const metadata = {
  title: "Super Admin Command Center | EthioEdu",
  description: "Platform management for EthioEdu SaaS architecture.",
};

export default function SaasAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed Sidebar */}
      <SaasSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-72 min-w-0">
        <SaasTopbar />
        
        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
