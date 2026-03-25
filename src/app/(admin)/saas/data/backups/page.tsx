import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DatabaseBackupsPage() {
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Database Backups & Redundancy</h1>
                    <p className="text-slate-500 mt-1">Manage automated snapshots and disaster recovery policies for PostgreSQL.</p>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <RefreshCw className="h-4 w-4 mr-2" /> Force Snapshot Now
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden p-12 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-6">
                    <Database className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl mb-2">Automated PITI Backups Enabled</CardTitle>
                <CardDescription className="max-w-md mx-auto">
                    Point-in-time recovery is automatically managed via the managed Supabase cluster. Standard retention is 7 days.
                </CardDescription>
            </Card>
        </div>
    );
}
