"use client"
import * as React from "react"
import { 
    Calendar, CheckCircle2, Clock, XCircle, FileText, Filter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { updateLeaveRequestStatusAction } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function LeaveClient({ requests, policies }: { requests: any[], policies: any[] }) {
    const { toast } = useToast();
    const router = useRouter();
    const [isUpdating, setIsUpdating] = React.useState<string | null>(null);

    const pendingRequests = requests.filter(r => r.status === "Pending");
    const historicalRequests = requests.filter(r => r.status !== "Pending");

    const handleAction = async (requestId: string, status: string) => {
        setIsUpdating(requestId);
        try {
            await updateLeaveRequestStatusAction(requestId, status);
            toast({
                title: "Request Updated",
                description: `Leave request ${requestId} marked as ${status}.`,
            });
            router.refresh();
        } catch (e: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: e.message || "Failed to update status."
            });
        } finally {
            setIsUpdating(null);
        }
    };

    const statusBadge = (status: string) => {
        switch (status) {
            case "Approved": return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge>;
            case "Rejected": return <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
            default: return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
        }
    };

    const RequestCard = ({ req }: { req: any }) => (
        <Card className="glass-card flex flex-col justify-between">
            <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <img src={req.employeeInfo?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${req.employeeInfo?.name || "U"}`} alt="avatar" className="w-10 h-10 rounded-full border-2 border-background shadow-sm" />
                        <div>
                            <CardTitle className="text-base font-black">{req.employeeInfo?.name || req.employeeId}</CardTitle>
                            <span className="text-xs font-bold text-muted-foreground">{req.employeeInfo?.department || "Staff"}</span>
                        </div>
                    </div>
                    {statusBadge(req.status)}
                </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-bold flex items-center gap-1.5"><FileText className="w-4 h-4 text-primary" /> {req.leaveType}</span>
                    <span className="font-bold text-muted-foreground px-2 py-0.5 bg-muted rounded-md">{req.daysCount} Days</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-muted-foreground bg-muted/30 p-2 rounded-lg border border-border/50">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        From: {new Date(req.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        To: {new Date(req.endDate).toLocaleDateString()}
                    </div>
                </div>
                <div className="text-sm">
                    <strong className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Reason:</strong>
                    <span className="text-muted-foreground line-clamp-2">{req.reason}</span>
                </div>
            </CardContent>
            {req.status === "Pending" && (
                <CardFooter className="pt-3 pb-4 px-6 border-t border-border/50 bg-muted/5 flex gap-3">
                    <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold"
                        onClick={() => handleAction(req.requestId, "Rejected")}
                        disabled={isUpdating === req.requestId}
                    >
                        Reject
                    </Button>
                    <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full emerald-gradient text-white font-bold tracking-wide"
                        onClick={() => handleAction(req.requestId, "Approved")}
                        disabled={isUpdating === req.requestId}
                    >
                        Approve
                    </Button>
                </CardFooter>
            )}
        </Card>
    );

    return (
        <Tabs defaultValue="pending" className="space-y-6">
            <div className="flex items-center justify-between">
                <TabsList className="bg-muted/30 p-1 border border-border/50">
                    <TabsTrigger value="pending" className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold">
                        Pending Approvals
                        <Badge variant="secondary" className="ml-2 bg-amber-500/20 text-amber-700">{pendingRequests.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold">
                        Leave History
                    </TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="font-bold hidden sm:flex">
                    <Filter className="w-4 h-4 mr-2" /> Filter List
                </Button>
            </div>

            <TabsContent value="pending" className="mt-0">
                {pendingRequests.length === 0 ? (
                    <div className="h-48 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-2xl bg-muted/5">
                        <CheckCircle2 className="h-10 w-10 opacity-20 mb-2" />
                        <p className="font-bold">Hooray! No pending leave requests.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingRequests.map(req => <RequestCard key={req.requestId} req={req} />)}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="history" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {historicalRequests.map(req => <RequestCard key={req.requestId} req={req} />)}
                </div>
            </TabsContent>
        </Tabs>
    )
}
