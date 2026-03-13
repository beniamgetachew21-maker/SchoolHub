import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AcademicCalendarPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Academic Calendar</h1>
          <p className="text-muted-foreground">Manage institutional terms, holidays, and campus-wide events.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
           <Button variant="outline" className="px-6 font-bold">March 2026</Button>
           <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
           <Button className="ml-4 bg-emerald-600 hover:bg-emerald-700"><Plus className="mr-2 h-4 w-4" /> Add Event</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-[32px] overflow-hidden shadow-sm border-slate-200">
           <div className="aspect-square bg-slate-50 flex items-center justify-center border-b border-slate-100">
              <div className="flex flex-col items-center gap-4 text-slate-300">
                 <CalendarIcon className="h-20 w-20" />
                 <p className="text-xl font-bold font-headline">Interactive Calendar View</p>
                 <p className="text-sm max-w-xs text-center font-medium">Full calendar integration pending data connection.</p>
              </div>
           </div>
        </Card>

        <div className="space-y-6">
           <Card className="rounded-3xl shadow-sm border-slate-200">
              <CardHeader>
                 <CardTitle>Upcoming Milestones</CardTitle>
                 <CardDescription>Key institutional dates for the current term.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <MilestoneItem date="Mar 15" title="Mid-Term Exams Begin" type="Exam" />
                 <MilestoneItem date="Mar 22" title="Spring Break Start" type="Holiday" />
                 <MilestoneItem date="Apr 05" title="Parent-Teacher Conf" type="Event" />
              </CardContent>
           </Card>

           <Card className="rounded-3xl bg-emerald-900 text-white border-none">
              <CardHeader>
                 <CardTitle className="text-emerald-100">Term Progress</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-4xl font-black mb-2">68%</div>
                 <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: '68%' }} />
                 </div>
                 <p className="text-[10px] uppercase font-black tracking-widest mt-4 text-emerald-300">Week 12 of 18</p>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function MilestoneItem({ date, title, type }: { date: string, title: string, type: string }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer">
       <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-slate-100">
          <span className="text-[8px] font-black text-slate-400 leading-none mb-1">{date.split(' ')[0]}</span>
          <span className="text-sm font-black text-slate-900 leading-none">{date.split(' ')[1]}</span>
       </div>
       <div>
          <p className="font-bold text-sm tracking-tight">{title}</p>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{type}</p>
       </div>
    </div>
  );
}
