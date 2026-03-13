import { Lock, ShieldAlert, Key, Fingerprint, Eye, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminSecurityPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Security & Access</h1>
        <p className="text-muted-foreground">Manage user roles, permissions, and institutional security protocols.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SecurityCard 
          title="Role Management" 
          description="Define access levels for Admins, Teachers, and Staff."
          icon={ShieldAlert}
        />
        <SecurityCard 
          title="2FA Settings" 
          description="Enforce multi-factor authentication for sensitive accounts."
          icon={ShieldCheck}
        />
        <SecurityCard 
          title="Audit Logs" 
          description="Track all administrative actions and system changes."
          icon={Eye}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Password Policy</CardTitle>
            <CardDescription>Configure institutional password requirements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">Minimum Length</span>
                <span className="text-sm font-bold">12 Characters</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">Require Special Characters</span>
                <span className="text-sm font-bold text-emerald-600">Enabled</span>
             </div>
             <Button className="w-full">Update Policy</Button>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
             <CardTitle>Session Security</CardTitle>
             <CardDescription>Manage active institutional sessions and timeouts.</CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-xl border-slate-100">
              <Lock className="h-10 w-10 text-slate-200 mb-4" />
              <p className="text-sm text-slate-400 mb-4">No critical session alerts at this time.</p>
              <Button variant="outline" size="sm">Review Active Sessions</Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SecurityCard({ title, description, icon: Icon }: { title: string, description: string, icon: any }) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer group">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="link" className="px-0 mt-2 text-red-600">Manage →</Button>
      </CardContent>
    </Card>
  );
}
