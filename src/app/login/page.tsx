import { Suspense } from "react";
import LoginForm from "./login-form";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function LoginPage() {
  const headersList = await headers();
  const domain = headersList.get('x-tenant-domain');
  
  let tenantName = "EthioEdu Partner";
  if (domain && domain !== 'default') {
      try {
        const tenant = await prisma.tenant.findUnique({ where: { domain } });
        if (tenant) {
            tenantName = tenant.name;
        }
      } catch (err) {
        console.error("Failed to query tenant name for login screen:", err);
      }
  }

  return (
    <Suspense fallback={<div className="text-white text-center w-full h-screen flex items-center justify-center">Loading portal secure gateway...</div>}>
      <LoginForm tenantName={tenantName} domain={domain || 'default'} />
    </Suspense>
  );
}