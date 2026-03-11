import { getApplications } from "@/lib/actions";
import { ApplicationClient } from "./application-client";

export default async function ApplicationsPage() {
    const applications = await getApplications();

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50 text-wrap">ADMISSIONS: APPLICATIONS</h1>
                <p className="text-muted-foreground">Manage and evaluate new student admission requests with clinical precision.</p>
            </div>

            <ApplicationClient initialApplications={applications} />
        </div>
    );
}
