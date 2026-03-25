"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Building,
  CreditCard,
  Database,
  Users,
  BarChart,
  Activity,
  ShieldCheck,
  LifeBuoy,
  Plug,
  Flag,
  Palette,
  DollarSign,
  Search,
  Settings,
  Shield
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const SAAS_NAVIGATION = [
  {
    title: "A. Core",
    items: [
      { id: "dashboard", label: "Global Dashboard", href: "/saas", icon: Globe },
      { id: "notifications", label: "Global Notifications", href: "/saas/notifications", icon: Search },
      { id: "activity", label: "Activity Feed", href: "/saas/activity", icon: Activity },
    ]
  },
  {
    title: "B. Tenants (Schools)",
    items: [
      { id: "schools-list", label: "All Schools", href: "/saas/tenants", icon: Building },
      { id: "onboard-school", label: "Create New School", href: "/saas/tenants/new", icon: PlusCircle },
    ]
  },
  {
    title: "C. Billing & Finance",
    items: [
      { id: "plans", label: "Plans & Pricing", href: "/saas/billing/plans", icon: CreditCard },
      { id: "invoices", label: "Invoices & Payments", href: "/saas/billing/invoices", icon: DollarSign },
      { id: "profit", label: "Platform Finance", href: "/saas/billing/profit", icon: Activity },
    ]
  },
  {
    title: "D. Data & DB Control",
    items: [
      { id: "database", label: "Database Overview", href: "/saas/data", icon: Database },
      { id: "backups", label: "Backups & Restores", href: "/saas/data/backups", icon: Database },
    ]
  },
  {
    title: "E. Global Users",
    items: [
      { id: "users", label: "User Directory", href: "/saas/users", icon: Users },
      { id: "audit-logs", label: "Audit Logs", href: "/saas/users/audit", icon: ShieldCheck },
    ]
  },
  {
    title: "F. Analytics",
    items: [
      { id: "revenue", label: "Revenue Analytics", href: "/saas/analytics/revenue", icon: BarChart },
      { id: "usage", label: "Feature Usage", href: "/saas/analytics/usage", icon: BarChart },
    ]
  },
  {
    title: "G-H. Health & Security",
    items: [
      { id: "system-health", label: "System Status", href: "/saas/system", icon: Activity },
      { id: "security", label: "Access & Security", href: "/saas/system/security", icon: Shield },
    ]
  },
  {
    title: "I-L. Support & Config",
    items: [
      { id: "support", label: "Support Tickets", href: "/saas/support", icon: LifeBuoy },
      { id: "integrations", label: "Integrations & API", href: "/saas/settings/integrations", icon: Plug },
      { id: "features", label: "Feature Flags", href: "/saas/settings/features", icon: Flag },
      { id: "branding", label: "Brand Control", href: "/saas/settings/branding", icon: Palette },
    ]
  }
];

// Fallback for missing icon import
function PlusCircle(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>;
}

export function SaasSidebar() {
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === '/saas' && pathname === '/saas') return true;
    if (href !== '/saas' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="w-72 bg-[#0F172A] text-slate-300 border-r border-slate-800 flex flex-col h-screen fixed top-0 left-0 z-40 overflow-hidden">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-[#0B1120]">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-widest uppercase">EthioEdu</div>
            <div className="text-[10px] text-blue-400 uppercase tracking-widest">Command Center</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-4 space-y-8">
          {SAAS_NAVIGATION.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isCurrent(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active 
                          ? "bg-blue-600/10 text-blue-400" 
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${active ? "text-blue-400" : "text-slate-500"}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer Settings */}
      <div className="p-4 border-t border-slate-800 bg-[#0B1120]">
        <Link
          href="/saas/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Settings className="h-4 w-4 text-slate-500" />
          Platform Settings
        </Link>
      </div>
    </aside>
  );
}
