
"use client"
import * as React from "react"
import { PlusCircle, Search, Trash2, Edit, Coins, Layers, Gavel } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { createFeeStructureAction } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function FeeStructuresClient({ initialStructures }: { initialStructures: any[] }) {
  const [structures, setStructures] = React.useState(initialStructures);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredStructures = React.useMemo(() => {
    if (!searchQuery) return structures;
    return structures.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [structures, searchQuery]);

  const handleAddStructure = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      baseAmount: parseFloat(formData.get('amount') as string),
      currency: "ETB",
      items: JSON.stringify([
        { name: "Tuition", amount: parseFloat(formData.get('amount') as string) }
      ])
    };

    const result = await createFeeStructureAction(data);
    if (result.success) {
      setStructures([...structures, result.data]);
      setIsAddOpen(false);
      toast({ title: "Protocol Established", description: "New fee structure has been digitized and stored." });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl font-black">Fee Structuring Engine</CardTitle>
              <CardDescription>Define institutional billing rules and automated fee templates.</CardDescription>
            </div>
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
              <SheetTrigger asChild>
                <Button className="emerald-gradient text-white font-black">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Establish New Rule
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-card">
                <form onSubmit={handleAddStructure} className="space-y-6">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-black font-headline">New Structure Definition</SheetTitle>
                    <SheetDescription>Configure parameters for automated institutional billing.</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-muted-foreground">Structure Identity</Label>
                      <Input name="name" placeholder="e.g., General Tuition - Grade 10" className="h-12 bg-muted/20 border-emerald-500/10" required />
                    </div>
                    <div className="space-y-2">
                       <Label className="uppercase text-[10px] font-black tracking-widest text-muted-foreground">Quantum Amount (ETB)</Label>
                       <Input name="amount" type="number" placeholder="50000" className="h-12 bg-muted/20 border-emerald-500/10" required />
                    </div>
                  </div>
                  <SheetFooter className="mt-10">
                    <Button type="submit" className="emerald-gradient text-white font-black w-full h-14">INITIALIZE RULE</Button>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
           <div className="mb-6 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search rule registry..." 
                className="pl-10 h-12 bg-muted/10 border-border/30 rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           <div className="rounded-2xl border border-border/50 overflow-hidden shadow-sm">
             <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                     <TableHead className="font-black uppercase text-[10px] tracking-widest">Rule ID</TableHead>
                     <TableHead className="font-black uppercase text-[10px] tracking-widest">Identity</TableHead>
                     <TableHead className="font-black uppercase text-[10px] tracking-widest text-right">Base Quantum</TableHead>
                     <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">Status</TableHead>
                     <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStructures.length > 0 ? filteredStructures.map((s: any) => (
                    <TableRow key={s.structureId} className="group hover:bg-muted/50 transition-all font-medium">
                       <TableCell className="font-mono text-xs">{s.structureId}</TableCell>
                       <TableCell className="font-black text-sm">{s.name}</TableCell>
                       <TableCell className="text-right font-mono font-black text-emerald-700 dark:text-emerald-400">
                          {s.baseAmount ? `${s.baseAmount.toLocaleString()} ETB` : "Variable"}
                       </TableCell>
                       <TableCell className="text-center">
                          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-[10px]">ACTIVE</Badge>
                       </TableCell>
                       <TableCell className="text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-500/10">
                                <Edit className="h-4 w-4 text-muted-foreground" />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-rose-500/10">
                                <Trash2 className="h-4 w-4 text-rose-500" />
                             </Button>
                          </div>
                       </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-40 text-center text-muted-foreground italic font-medium">
                         No active billing rules found in registry.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
             </Table>
           </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
         <Card className="bg-emerald-500/[0.03] border-emerald-500/10">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl"><Coins className="h-6 w-6 text-emerald-600" /></div>
              <div><CardTitle className="text-sm font-black uppercase tracking-widest">Quantum Yield</CardTitle><CardDescription>Base revenue projection</CardDescription></div>
            </CardHeader>
         </Card>
         <Card className="bg-amber-500/[0.03] border-amber-500/10">
            <CardHeader className="flex flex-row items-center gap-4">
               <div className="p-3 bg-amber-500/10 rounded-2xl"><Layers className="h-6 w-6 text-amber-600" /></div>
               <div><CardTitle className="text-sm font-black uppercase tracking-widest">Active Tiers</CardTitle><CardDescription>Rule diversity</CardDescription></div>
            </CardHeader>
         </Card>
         <Card className="bg-indigo-500/[0.03] border-indigo-500/10">
            <CardHeader className="flex flex-row items-center gap-4">
               <div className="p-3 bg-indigo-500/10 rounded-2xl"><Gavel className="h-6 w-6 text-indigo-600" /></div>
               <div><CardTitle className="text-sm font-black uppercase tracking-widest">Enforcements</CardTitle><CardDescription>Automated penalties</CardDescription></div>
            </CardHeader>
         </Card>
      </div>
    </div>
  )
}
