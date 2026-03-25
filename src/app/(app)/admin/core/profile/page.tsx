import { getCurrentTenant } from "@/lib/tenant";
import { ProfileForm } from "./profile-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
    title: "School Profile - Campus Admin",
    description: "Manage your institution's public identity.",
};

export default async function SchoolProfilePage() {
    const tenant = await getCurrentTenant();

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <Link href="/admin/core" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 mb-2 transition-colors">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Institutional Setup
                </Link>
                <h1 className="text-3xl font-black font-headline tracking-tighter text-slate-900 uppercase">School Profile</h1>
                <p className="text-slate-500 font-medium italic">Manage your institution's public identity and contact information.</p>
            </div>

            <ProfileForm tenant={tenant} />
        </div>
    );
}
