import { ShieldCheck, Settings, Building, Users, Lock, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminCorePage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Institutional Setup</h1>
        <p className="text-muted-foreground">Configure core school settings, campus details, and systemic preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AdminConfigCard 
          title="School Profile" 
          description="Manage school name, logo, address, and contact details."
          icon={Building}
          href="/admin/core/profile"
        />
        <AdminConfigCard 
          title="Academic Years" 
          description="Define terms, semesters, and academic sessions."
          icon={Database}
          href="/admin/core/academic-years"
        />
        <AdminConfigCard 
          title="Global Settings" 
          description="System-wide preferences, localization, and branding."
          icon={Settings}
          href="/admin/core/settings"
        />
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Current status of institutional modules and data sync.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <HealthStatus label="Database" status="Optimal" color="bg-emerald-500" />
            <HealthStatus label="SMS Gateway" status="Active" color="bg-emerald-500" />
            <HealthStatus label="Storage" status="85% Free" color="bg-emerald-500" />
            <HealthStatus label="API Performance" status="99.9%" color="bg-emerald-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminConfigCard({ title, description, icon: Icon, href }: { title: string, description: string, icon: any, href: string }) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="mt-4 text-sm font-medium text-primary flex items-center gap-1">
            Configure <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function HealthStatus({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <div>
        <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-900 leading-none">{status}</p>
      </div>
    </div>
  );
}
