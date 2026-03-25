import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Header } from "@/components/layout/header";
import { getCurrentTenant } from "@/lib/tenant";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = await getCurrentTenant();
  const isImpersonating = (await cookies()).has("impersonated_tenant_id");

  // Fetch the primary admin specifically for this tenant to display their credentials
  const adminUser = await prisma.user.findFirst({
    where: { tenantId: tenant.id },
    orderBy: { createdAt: 'asc' }
  });

  const userStr = JSON.stringify(adminUser || { name: 'School Admin', role: 'ADMIN' });

  // 1. Check if the Institutional account is Suspended
  if (tenant.status === "Suspended") {
    redirect("/status/suspended");
  }

  // 2. Check Subscription status (if a subscription is linked)
  // We'll simulate the "Expired" logic or look up the relation
  // For now, if there's no subscription linked it's treated as "Active" 
  // until we enforce mandatory billing.
  if (tenant.subscriptionId) {
    // Fetch subscription details if needed, or check status on tenant object if relation loaded
    // For now, we trust the Tenant status for the first pass.
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav tenantName={tenant.name} logoUrl={tenant.logoUrl} />
      </Sidebar>
      <SidebarInset>
        <Header 
          tenantName={tenant.name} 
          userJson={userStr} 
          isImpersonating={isImpersonating} 
        />
        <main className="p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

