import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalNotificationsPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Global Notifications</h1>
                    <p className="text-slate-500 mt-1">System alerts, billing failures, and critical tenant events.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="bg-white">
                        <Settings className="h-4 w-4 mr-2" /> Alert Preferences
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden p-12 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <Bell className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl mb-2">No active notifications</CardTitle>
                <CardDescription className="max-w-md mx-auto">
                    You're all caught up! The system will alert you here if any school tenants face critical downtime, billing failures, or massive data threshold breaches.
                </CardDescription>
            </Card>
        </div>
    );
}
