import { DollarSign, Wallet, CreditCard, Receipt, BarChart3, ArrowUpRight, ArrowDownRight, Plus, Filter, Search, MoreHorizontal, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FinanceRootPage() {
  return (
    <div className="flex flex-col gap-8 p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight font-headline">Financial Management</h1>
          <p className="text-muted-foreground text-lg">Central hub for institutional billing, revenue tracking, and payroll.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="rounded-2xl px-6 h-12 font-bold border-slate-200">Export Report</Button>
           <Button className="rounded-2xl px-6 h-12 font-bold bg-slate-900 text-white hover:bg-slate-800">
             <Plus className="mr-2 h-5 w-5" /> New Transaction
           </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Main Balance Card */}
        <Card className="lg:col-span-2 rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl relative overflow-hidden border-none p-2">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-white/5 rounded-full blur-3xl" />
           <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-start">
                 <div>
                    <CardTitle className="text-slate-400 text-sm font-black uppercase tracking-widest">Total Institutional Balance</CardTitle>
                    <div className="text-6xl font-black mt-2 tracking-tighter">$1,248,500.00</div>
                 </div>
                 <div className="bg-white/10 p-4 rounded-[24px] backdrop-blur-xl border border-white/10">
                    <Wallet className="h-8 w-8 text-white" />
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-8 pt-4 flex gap-12">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Fee Collections</p>
                 <div className="text-2xl font-black">$942.8k</div>
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Operational Grants</p>
                 <div className="text-2xl font-black">$305.7k</div>
              </div>
              <div className="ml-auto flex items-end">
                 <Button variant="link" className="text-white hover:text-emerald-400 px-0 h-auto font-bold">View Statements →</Button>
              </div>
           </CardContent>
        </Card>

        {/* Quick Insights */}
        <div className="flex flex-col gap-6">
           <Card className="rounded-[32px] shadow-sm border-slate-200 flex-1 hover:shadow-md transition-shadow group cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                       <Receipt className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Expenses</p>
                       <p className="text-2xl font-black">$240.5k</p>
                    </div>
                 </div>
                 <ArrowDownRight className="h-5 w-5 text-red-400" />
              </CardContent>
           </Card>

           <Card className="rounded-[32px] shadow-sm border-slate-200 flex-1 hover:shadow-md transition-shadow group cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                       <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Net Profit</p>
                       <p className="text-2xl font-black">$1.02M</p>
                    </div>
                 </div>
                 <ArrowUpRight className="h-5 w-5 text-emerald-400" />
              </CardContent>
           </Card>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         {/* Sub-modules Access */}
         <div className="space-y-4">
            <h3 className="text-xl font-black font-headline px-2">Financial Sub-Modules</h3>
            <div className="grid grid-cols-2 gap-4">
               <FinModuleLink title="Fees Management" sub="Billing & Invoices" icon={CreditCard} href="/finance/fees" />
               <FinModuleLink title="Payroll Center" sub="Salaries & Taxes" icon={Receipt} href="/finance/payroll" />
               <FinModuleLink title="Vendor Payments" sub="AP / Procurement" icon={Users} href="/finance/accounts" />
               <FinModuleLink title="Fiscal Reports" sub="Audit & Tax" icon={BarChart3} href="/finance/reports" />
            </div>
         </div>

         {/* Recent Transactions Placeholder */}
         <Card className="rounded-[40px] shadow-sm border-slate-200 overflow-hidden">
            <CardHeader className="p-8 pb-4 border-b border-slate-50 flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-xl">Global Transactions</CardTitle>
                  <CardDescription>Consolidated feed of all school fiscal activity.</CardDescription>
               </div>
               <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <TxRow title="Tuition Payment - Grade 10" user="ID: #ST-882" amount="+$1,200" date="2m ago" positive />
               <TxRow title="Server Maintenance Fee" user="AWS Cloud" amount="-$450" date="1h ago" positive={false} />
               <TxRow title="Staff Monthly Salary" user="86 Employees" amount="-$42,000" date="Today" positive={false} />
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function FinModuleLink({ title, sub, icon: Icon, href }: { title: string, sub: string, icon: any, href: string }) {
  return (
    <Card className="rounded-[28px] border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer group p-6">
       <div className="p-3 bg-slate-50 rounded-2xl w-min group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 mb-4">
          <Icon className="h-6 w-6" />
       </div>
       <p className="font-black text-sm tracking-tight">{title}</p>
       <p className="text-[10px] font-bold text-slate-400">{sub}</p>
    </Card>
  );
}

function TxRow({ title, user, amount, date, positive }: { title: string, user: string, amount: string, date: string, positive: boolean }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
       <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
             {positive ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
          </div>
          <div>
             <p className="font-bold text-sm tracking-tight">{title}</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user}</p>
          </div>
       </div>
       <div className="text-right">
          <p className={`font-black text-sm ${positive ? 'text-emerald-600' : 'text-slate-900'}`}>{amount}</p>
          <p className="text-[10px] font-bold text-slate-400">{date}</p>
       </div>
    </div>
  );
}
