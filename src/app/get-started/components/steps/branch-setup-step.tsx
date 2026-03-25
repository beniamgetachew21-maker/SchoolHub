import { OnboardingData } from "../onboarding-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepShell, StepFooter } from "../step-shell";
import { Building2, Plus, Trash2 } from "lucide-react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };

const ADDIS_SUBCITIES = [
  "Addis Ketema", "Akaki-Kality", "Arada", "Bole", "Gullele", 
  "Kirkos", "Kolfe Keranio", "Lemi Kura", "Lideta", "Nefas Silk-Lafto", "Yeka"
];

export function BranchSetupStep({ data, updateData, onNext, onBack }: Props) {
  const { branches } = data;

  const setField = (i: number, key: string, val: string | number) => {
    updateData({ branches: branches.map((b, idx) => idx === i ? { ...b, [key]: val } : b) });
  };

  const addBranch = () => updateData({ branches: [...branches, { name: "", subcity: "", capacity: 500 }] });
  const removeBranch = (i: number) => updateData({ branches: branches.filter((_, idx) => idx !== i) });

  return (
    <StepShell icon={<Building2 className="h-6 w-6 text-emerald-400" />} title="Branch Setup" subtitle="Add your campuses. If you only have one, just fill in the first location.">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
        {branches.map((branch, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Campus #{i + 1}</span>
              {branches.length > 1 && (
                <button onClick={() => removeBranch(i)} className="text-white/30 hover:text-rose-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-white/70 text-xs">Campus Name *</Label>
                <Input value={branch.name} onChange={e => setField(i, "name", e.target.value)} placeholder={i === 0 ? "e.g. Main Campus" : "e.g. Bole Branch"} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11" />
              </div>
              
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Subcity *</Label>
                <Select value={branch.subcity} onValueChange={v => setField(i, "subcity", v)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-11">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {ADDIS_SUBCITIES.map(sc => (
                      <SelectItem key={sc} value={sc}>{sc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Student Capacity</Label>
                <Input type="number" value={branch.capacity} onChange={e => setField(i, "capacity", Number(e.target.value))} placeholder="e.g. 1000" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11" />
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="ghost" onClick={addBranch} className="w-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/5 rounded-xl border border-dashed border-white/10 h-12">
          <Plus className="mr-2 h-4 w-4" /> Add Another Campus
        </Button>
      </div>

      <StepFooter onBack={onBack} onNext={onNext} nextDisabled={branches.some(b => !b.name || !b.subcity)} />
    </StepShell>
  );
}
