import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function SuspendedPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
            <Card className="max-w-md w-full border-t-4 border-t-red-500 shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="h-10 w-10 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Institution Suspended</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-slate-600 leading-relaxed">
                        Access to this institution's portal has been temporarily suspended by the system administrator.
                    </p>
                    <div className="p-4 bg-slate-100 rounded-lg text-sm text-slate-500 italic">
                        "Your data is safe, but administrative action is required to restore access."
                    </div>
                    <p className="text-sm text-slate-400">
                        Please contact **support@schoolsystem.com** or your regional representative for details.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
