import * as React from "react"
import { getInvoices, getFeeStructures, getStudents } from "@/lib/actions"
import { FeesClient } from "./fees-client"
import { FeeStructuresClient } from "./fee-structures-client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default async function FeesPage() {
  const [invoices, feeStructures, students] = await Promise.all([
    getInvoices(),
    getFeeStructures(),
    getStudents()
  ]);

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">Financial Operations</h1>
         <p className="text-muted-foreground font-medium">Manage institutional revenue, billing structures, and student accounts.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 border border-emerald-500/5">
          <TabsTrigger value="overview" className="font-black tracking-tighter uppercase text-xs">Ledger Overview</TabsTrigger>
          <TabsTrigger value="structures" className="font-black tracking-tighter uppercase text-xs">Fee Structuring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <FeesClient initialInvoices={invoices} students={students} />
        </TabsContent>

        <TabsContent value="structures" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <FeeStructuresClient initialStructures={feeStructures} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
