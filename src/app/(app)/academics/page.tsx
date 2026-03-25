import { getTeacherDashboardDataAction } from "@/lib/actions";
import TeacherHubClient from "./teacher-hub-client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function AcademicsPage() {
    const { data, error } = await getTeacherDashboardDataAction();
    
    if (error || !data) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                 <Alert variant="destructive" className="rounded-3xl shadow-2xl border-rose-100 bg-rose-50/50">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="font-black uppercase tracking-tight italic">Access Error</AlertTitle>
                    <AlertDescription className="font-medium text-xs">
                        {error || "Failed to load teacher context. Please ensure you are logged in as a faculty member."}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return <TeacherHubClient data={data} />;
}
