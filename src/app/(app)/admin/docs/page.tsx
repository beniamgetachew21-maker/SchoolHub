import { FileText, Search, Plus, Filter, MoreVertical, FileCode, FileImage, FileDigit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DocumentManagementPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Institutional Documents</h1>
          <p className="text-muted-foreground">Secure repository for legal, academic, and administrative records.</p>
        </div>
        <Button className="rounded-full px-6 bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <div className="flex flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input className="pl-10 rounded-xl border-slate-200" placeholder="Search by document name, tag, or uploader..." />
         </div>
         <Button variant="outline" className="rounded-xl border-slate-200"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         <DocTypeCard title="Student Records" count={2450} color="bg-blue-500" icon={FileDigit} />
         <DocTypeCard title="Legal Credentials" count={12} color="bg-red-500" icon={FileCode} />
         <DocTypeCard title="Academic Assets" count={580} color="bg-emerald-500" icon={FileText} />
      </div>

      <Card className="rounded-[40px] shadow-sm border-slate-200 overflow-hidden">
         <div className="p-0">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Document Name</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date Added</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                     <th className="p-6 text-right"></th>
                  </tr>
               </thead>
               <tbody>
                  <DocRow name="Institutional_Charter_2026.pdf" category="Legal" date="Oct 12, 2025" status="Verified" />
                  <DocRow name="Student_List_Grade10_Final.xlsx" category="Records" date="Jan 05, 2026" status="Active" />
                  <DocRow name="Campus_Expansion_Blueprint.png" category="Assets" date="Feb 20, 2026" status="Draft" />
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
}

function DocTypeCard({ title, count, color, icon: Icon }: { title: string, count: number, color: string, icon: any }) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer group rounded-3xl overflow-hidden border-slate-200">
       <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className={`p-4 rounded-2xl text-white ${color}`}>
                <Icon className="h-6 w-6" />
             </div>
             <div>
                <p className="font-bold text-slate-900">{title}</p>
                <p className="text-xs text-slate-400 font-medium">{count.toLocaleString()} Files</p>
             </div>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-200 group-hover:text-slate-900"><MoreVertical className="h-4 w-4" /></Button>
       </CardContent>
    </Card>
  );
}

function DocRow({ name, category, date, status }: { name: string, category: string, date: string, status: string }) {
  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
       <td className="p-6">
          <div className="flex items-center gap-3">
             <FileText className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
             <span className="font-bold text-sm text-slate-800">{name}</span>
          </div>
       </td>
       <td className="p-6 text-sm font-medium text-slate-500">{category}</td>
       <td className="p-6 text-sm font-medium text-slate-500">{date}</td>
       <td className="p-6">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 
            status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
          }`}>
             {status}
          </span>
       </td>
       <td className="p-6 text-right">
          <Button variant="ghost" size="sm" className="font-bold text-primary">Download</Button>
       </td>
    </tr>
  );
}
