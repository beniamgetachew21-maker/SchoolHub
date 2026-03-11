"use client"
import * as React from "react"
import { CheckCircle2, Circle, Clock, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { updateOnboardingTaskAction } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function OnboardingClient({ tasks, employees }: { tasks: any[], employees: any[] }) {
    const { toast } = useToast();
    const router = useRouter();

    const empMap = Object.fromEntries(employees.map(e => [e.employeeId, e]));

    // Group tasks by Employee
    const employeeTasks = employees.map(emp => {
        const myTasks = tasks.filter(t => t.employeeId === emp.employeeId);
        if (myTasks.length === 0) return null;
        return {
            employee: emp,
            tasks: myTasks
        };
    }).filter(Boolean) as { employee: any, tasks: any[] }[];

    const toggleTask = async (taskId: string, currentStatus: string) => {
        const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
        try {
            await updateOnboardingTaskAction(taskId, newStatus);
            router.refresh();
        } catch (e: any) {
            toast({ variant: "destructive", title: "Update Failed", description: e.message });
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employeeTasks.map(({ employee, tasks }) => {
                    const completedCount = tasks.filter(t => t.status === "Completed").length;
                    const progress = Math.round((completedCount / tasks.length) * 100);
                    const isFullyOnboarded = completedCount === tasks.length;

                    return (
                        <Card key={employee.employeeId} className={cn("glass-card transition-all", isFullyOnboarded ? "border-emerald-500/30 bg-emerald-500/5" : "hover:border-primary/20")}>
                            <CardHeader className="pb-3 border-b border-border/50 bg-muted/5 relative">
                                {isFullyOnboarded && <div className="absolute top-4 right-4"><Badge className="bg-emerald-500/10 text-emerald-600 font-bold border-transparent">Onboarded</Badge></div>}
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="w-12 h-12 rounded-full border-2 border-background shadow-sm overflow-hidden flex items-center justify-center bg-muted font-bold text-muted-foreground">
                                        {employee.avatarUrl ? <img src={employee.avatarUrl} alt="" className="w-full h-full object-cover"/> : employee.name[0]}
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-black truncate max-w-[180px]">{employee.name}</CardTitle>
                                        <p className="text-xs font-bold text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <Building2 className="w-3 h-3" /> {employee.department}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className={isFullyOnboarded ? "text-emerald-600" : "text-primary"}>{progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className={cn("h-full transition-all duration-500", isFullyOnboarded ? "bg-emerald-500" : "emerald-gradient")} style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ul className="divide-y divide-border/50">
                                    {tasks.map(task => (
                                        <li 
                                            key={task.taskId} 
                                            className="group flex gap-3 p-4 hover:bg-muted/10 cursor-pointer transition-colors"
                                            onClick={() => toggleTask(task.taskId, task.status)}
                                        >
                                            <div className="mt-0.5 flex-shrink-0">
                                                {task.status === "Completed" ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                ) : (
                                                    <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn("text-sm font-bold transition-all", task.status === "Completed" ? "text-muted-foreground line-through opacity-70" : "text-foreground")}>
                                                    {task.taskName}
                                                </p>
                                                {task.dueDate && (
                                                    <div className="flex gap-1.5 items-center mt-1 text-xs text-muted-foreground font-medium">
                                                        <Clock className="w-3 h-3" /> Due: {new Date(task.dueDate).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            {employeeTasks.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-2xl bg-muted/5">
                    <p className="font-bold">No active onboarding checklists.</p>
                </div>
            )}
        </div>
    )
}
