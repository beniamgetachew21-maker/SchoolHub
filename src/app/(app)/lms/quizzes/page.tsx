import { PenTool, Clock, CheckCircle2, AlertCircle, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LMSQuizzesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Active Quizzes & Assessments</h1>
          <p className="text-muted-foreground">Manage digital assessments, automated grading, and question banks.</p>
        </div>
        <Button className="rounded-full px-6 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" /> Create Quiz
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuizCard 
           title="Weekly Biology Checkpoint" 
           subject="Grade 10 Biology" 
           questions={15} 
           time="20m" 
           status="Live" 
        />
        <QuizCard 
           title="Calculus Quiz #2" 
           subject="Grade 12 Math" 
           questions={10} 
           time="45m" 
           status="Scheduled" 
        />
        <QuizCard 
           title="History Mid-Term Pre-Quiz" 
           subject="World History" 
           questions={25} 
           time="30m" 
           status="Draft" 
        />
      </div>

      <Card className="rounded-[32px] shadow-sm border-slate-200 overflow-hidden">
         <CardHeader className="p-8 pb-4">
            <CardTitle>Recent Quiz Performance</CardTitle>
            <CardDescription>Average scores and participation rates for recent assessments.</CardDescription>
         </CardHeader>
         <CardContent className="p-8 pt-0">
            <div className="grid gap-4">
               <QuizResultRow quiz="Biology Checkpoint" average="78%" participation="98%" />
               <QuizResultRow quiz="Chemistry Lab Quiz" average="82%" participation="95%" />
               <QuizResultRow quiz="Math Diagnostic" average="65%" participation="100%" />
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

function QuizCard({ title, subject, questions, time, status }: { title: string, subject: string, questions: number, time: string, status: string }) {
  return (
    <Card className="rounded-[32px] overflow-hidden border-slate-200 group hover:shadow-lg transition-all cursor-pointer">
       <CardHeader className="p-6">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <PenTool className="h-5 w-5" />
             </div>
             <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                status === 'Live' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-400'
             }`}>{status}</span>
          </div>
          <CardTitle className="text-xl mb-1">{title}</CardTitle>
          <p className="text-xs text-muted-foreground">{subject}</p>
       </CardHeader>
       <CardContent className="p-6 pt-0 flex gap-6">
          <div className="flex items-center gap-2">
             <CheckCircle2 className="h-4 w-4 text-emerald-600" />
             <span className="text-xs font-bold">{questions} Questions</span>
          </div>
          <div className="flex items-center gap-2">
             <Clock className="h-4 w-4 text-emerald-600" />
             <span className="text-xs font-bold">{time} Limit</span>
          </div>
       </CardContent>
    </Card>
  );
}

function QuizResultRow({ quiz, average, participation }: { quiz: string, average: string, participation: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer">
       <span className="font-bold text-sm">{quiz}</span>
       <div className="flex gap-8">
          <div className="text-right">
             <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Avg Score</p>
             <p className="text-sm font-black text-emerald-600 leading-none">{average}</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Participation</p>
             <p className="text-sm font-black text-blue-600 leading-none">{participation}</p>
          </div>
       </div>
    </div>
  );
}
