import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActivityFeedPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Activity Feed</h1>
                    <p className="text-slate-500 mt-1">Real-time pulse of platform-wide events and metric thresholds.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="bg-white">
                        <Download className="h-4 w-4 mr-2" /> Export Logs
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden p-12 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <Activity className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl mb-2">Activity Stream Monitoring Active</CardTitle>
                <CardDescription className="max-w-md mx-auto">
                    This module provides a live chronological feed of high-volume events across all connected environments. Activity sync is currently operating nominally.
                </CardDescription>
            </Card>
        </div>
    );
}
