import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plug, Flag, Palette, Bell, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PlatformSettingsOverviewPage() {
    const settingsModules = [
        { title: "Integrations & API", description: "Manage webhooks, Stripe, Twilio, and SendGrid.", icon: Plug, color: "text-blue-500", bg: "bg-blue-50", href: "/saas/settings/integrations" },
        { title: "Feature Flags", description: "Control global web toggles and beta rollouts.", icon: Flag, color: "text-amber-500", bg: "bg-amber-50", href: "/saas/settings/features" },
        { title: "Platform Branding", description: "Set default logos, colors, and whitelabeling.", icon: Palette, color: "text-emerald-500", bg: "bg-emerald-50", href: "/saas/settings/branding" },
        { title: "Notifications", description: "Global email sequences and alert thresholds.", icon: Bell, color: "text-rose-500", bg: "bg-rose-50", href: "/saas/settings/notifications" },
        { title: "Legal & Terms", description: "Update platform terms, privacy policy, and DPA.", icon: FileText, color: "text-indigo-500", bg: "bg-indigo-50", href: "/saas/settings/legal" }
    ];

    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
                <p className="text-slate-500 mt-1">Global command center configurations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingsModules.map((module, idx) => (
                    <Link key={idx} href={module.href}>
                        <Card className="border-none shadow-sm bg-white hover:bg-slate-50/80 transition-all cursor-pointer group h-full">
                            <CardHeader className="flex flex-row items-start gap-4 pb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${module.bg} ${module.color}`}>
                                    <module.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{module.title}</CardTitle>
                                    <CardDescription className="mt-1">{module.description}</CardDescription>
                                </div>
                                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
