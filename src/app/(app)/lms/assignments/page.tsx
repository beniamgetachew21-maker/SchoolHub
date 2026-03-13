import { ClipboardList, Clock, FileCheck, Search, Plus, Filter, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LMSAssignmentsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Assignment Management</h1>
          <p className="text-muted-foreground">Track student submissions, grading status, and upcoming deadlines.</p>
        </div>
        <Button className="rounded-full px-6 bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" /> New Assignment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AssignmentSummaryCard label="Pending Grading" count={28} icon={Clock} color="text-orange-600" bgColor="bg-orange-50" />
        <AssignmentSummaryCard label="Active Assignments" count={12} icon={ClipboardList} color="text-blue-600" bgColor="bg-blue-50" />
        <AssignmentSummaryCard label="Completed" count={145} icon={FileCheck} color="text-emerald-600" bgColor="bg-emerald-50" />
      </div>

      <Card className="rounded-[32px] shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
           <CardTitle className="text-xl">Submission Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <div className="divide-y divide-slate-100">
              <SubmissionRow title="Final Thesis Proposal" student="ID: #1021" date="2h ago" status="Submitted" />
              <SubmissionRow title="Calculus Homework #4" student="ID: #8821" date="5h ago" status="Late" />
              <SubmissionRow title="Bio Lab Report" student="ID: #3312" date="Today" status="Graded" />
              <SubmissionRow title="History Essay - Renaissance" student="ID: #0921" date="Yesterday" status="In Review" />
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AssignmentSummaryCard({ label, count, icon: Icon, color, bgColor }: { label: string, count: number, icon: any, color: string, bgColor: string }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden group hover:shadow-md transition-all cursor-pointer">
       <CardContent className="p-6 flex items-center justify-between">
          <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
             <div className="text-3xl font-black">{count}</div>
          </div>
          <div className={`p-4 rounded-2xl ${bgColor} ${color} group-hover:scale-110 transition-transform`}>
             <Icon className="h-6 w-6" />
          </div>
       </CardContent>
    </Card>
  );
}

function SubmissionRow({ title, student, date, status }: { title: string, student: string, date: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
       <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm">
             <ClipboardList className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
          </div>
          <div>
             <p className="font-bold text-sm tracking-tight">{title}</p>
             <p className="text-[10px] font-black text-slate-400 tracking-wider">Student: {student}</p>
          </div>
       </div>
       <div className="flex items-center gap-6">
          <div className="text-right">
             <p className="text-xs font-bold text-slate-500">{date}</p>
             <p className={`text-[10px] font-black uppercase tracking-widest ${
               status === 'Submitted' ? 'text-blue-600' :
               status === 'Late' ? 'text-red-500' :
               status === 'Graded' ? 'text-emerald-600' : 'text-orange-500'
             }`}>{status}</p>
          </div>
          <Button variant="ghost" size="sm" className="font-black text-primary hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-lg">View</Button>
       </div>
    </div>
  );
}
