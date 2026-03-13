import { BookOpen, BookText, FileSpreadsheet, MessageSquare, Plus, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LMSCoursesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Course Materials</h1>
          <p className="text-muted-foreground">Digital curriculum repository and classroom content management.</p>
        </div>
        <Button className="rounded-full px-6 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" /> Create Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CourseCard 
          title="Advanced Mathematics" 
          code="MATH-401" 
          instructor="Dr. Sarah Johnson" 
          students={42} 
          materials={15} 
        />
        <CourseCard 
          title="Organic Chemistry" 
          code="CHEM-302" 
          instructor="Prof. Michael Chen" 
          students={38} 
          materials={12} 
        />
        <CourseCard 
          title="World History" 
          code="HIST-205" 
          instructor="Ms. Emily Rodriguez" 
          students={45} 
          materials={10} 
        />
      </div>

      <Card className="rounded-3xl shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle>Recent Resource Uploads</CardTitle>
          <CardDescription>Track latest additions to the digital library.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
              <ResourceItem title="Chapter 5: Integration Practice.pdf" type="Assignment" instructor="Dr. Sarah Johnson" time="2h ago" />
              <ResourceItem title="Periodic Table High-Res.png" type="Study Material" instructor="Prof. Michael Chen" time="5h ago" />
              <ResourceItem title="Renaissance Artists Slide Deck" type="Lecture Notes" instructor="Ms. Emily Rodriguez" time="Yesterday" />
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CourseCard({ title, code, instructor, students, materials }: { title: string, code: string, instructor: string, students: number, materials: number }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all border-slate-200 group rounded-[32px]">
      <div className="h-24 bg-gradient-to-br from-emerald-500 to-emerald-800 p-6 flex items-end">
         <span className="text-xs font-black text-white/80 tracking-widest">{code}</span>
      </div>
      <CardContent className="pt-6">
        <CardTitle className="mb-1 text-xl">{title}</CardTitle>
        <p className="text-xs text-muted-foreground mb-4">Instructor: {instructor}</p>
        
        <div className="flex items-center gap-6 border-t pt-4 border-slate-50">
           <div className="flex items-center gap-2">
             <GraduationCap className="h-4 w-4 text-emerald-600" />
             <span className="text-xs font-bold">{students} Students</span>
           </div>
           <div className="flex items-center gap-2">
             <BookOpen className="h-4 w-4 text-emerald-600" />
             <span className="text-xs font-bold">{materials} Materials</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ResourceItem({ title, type, instructor, time }: { title: string, type: string, instructor: string, time: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
       <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-emerald-50 transition-colors">
             <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
             <p className="font-bold text-sm tracking-tight">{title}</p>
             <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
               {type} • Added by {instructor}
             </p>
          </div>
       </div>
       <span className="text-xs font-bold text-slate-400">{time}</span>
    </div>
  );
}
