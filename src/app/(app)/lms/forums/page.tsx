import { MessageSquare, Users, Hash, Plus, Trash2, Edit, Search, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LMSForums() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Institutional Discussion Forums</h1>
          <p className="text-muted-foreground">Collaborative space for students and faculty to engage in academic discourse.</p>
        </div>
        <Button className="rounded-full px-6 bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Start Discussion
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
         {/* Sidebar for Forum Categories */}
         <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Channels</h3>
            <div className="flex flex-col gap-1">
               <ForumChannel label="General Academics" count={12} active />
               <ForumChannel label="Research & Development" count={5} />
               <ForumChannel label="Student Life" count={28} />
               <ForumChannel label="Technical Support" count={3} />
            </div>
         </div>

         {/* Main Forum Feed */}
         <div className="lg:col-span-3 space-y-6">
            <ForumPost 
               title="Upcoming Inter-School Science Fair: Call for Projects" 
               author="ID: #ADM-01" 
               replies={15} 
               time="2h ago" 
               tags={["Academics", "Events"]} 
            />
            <ForumPost 
               title="Collaborative Study Group: Advanced Calculus" 
               author="ID: #ST-882" 
               replies={42} 
               time="5h ago" 
               tags={["Math", "Study"]} 
            />
            <ForumPost 
               title="New Digital Library Access Protocols" 
               author="ID: #LIB-02" 
               replies={8} 
               time="Yesterday" 
               tags={["Library", "Update"]} 
            />
         </div>
      </div>
    </div>
  );
}

function ForumChannel({ label, count, active }: { label: string, count: number, active?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-slate-50 text-slate-600'
    }`}>
       <div className="flex items-center gap-3">
          <Hash className={`h-4 w-4 ${active ? 'text-primary-foreground/60' : 'text-slate-300'}`} />
          <span className="text-sm font-bold tracking-tight">{label}</span>
       </div>
       <span className={`text-[10px] font-black ${active ? 'text-primary-foreground/60' : 'text-slate-400'}`}>{count}</span>
    </div>
  );
}

function ForumPost({ title, author, replies, time, tags }: { title: string, author: string, replies: number, time: string, tags: string[] }) {
  return (
    <Card className="rounded-[32px] shadow-sm border-slate-200 hover:shadow-md transition-all cursor-pointer overflow-hidden border">
       <CardContent className="p-8">
          <div className="flex gap-4 items-start">
             <div className="p-4 bg-slate-50 rounded-2xl">
                <MessageCircle className="h-6 w-6 text-slate-400" />
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   {tags.map(tag => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full border border-slate-200">{tag}</span>
                   ))}
                </div>
                <CardTitle className="text-xl leading-tight mb-2 hover:text-primary transition-colors">{title}</CardTitle>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Posted by {author}</span>
                      <span>•</span>
                      <span>{time}</span>
                   </div>
                   <div className="flex items-center gap-2 text-primary font-black text-sm">
                      <MessageSquare className="h-4 w-4" />
                      <span>{replies} Replies</span>
                   </div>
                </div>
             </div>
          </div>
       </CardContent>
    </Card>
  );
}
