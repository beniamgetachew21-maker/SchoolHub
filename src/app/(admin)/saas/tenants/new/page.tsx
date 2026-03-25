import { Header } from "@/components/layout/header";
import { OnboardingWizard } from "./onboarding-wizard";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
    title: "Onboard New School - EMS Super Admin",
    description: "Provision a new educational institution platform instance.",
};

export default function NewSchoolOnboardingPage() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <Link href="/saas/tenants" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 mb-4 transition-colors">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Tenants List
                    </Link>
                    <h1 className="text-3xl font-black font-headline tracking-tighter text-slate-900 uppercase">Provision New School</h1>
                    <p className="text-slate-500 mt-2 font-medium italic">Create a new isolated tenant workspace, assign the primary administrator, and configure their subscription limits.</p>
                </div>

                <OnboardingWizard />
            </main>
        </div>
    );
}
