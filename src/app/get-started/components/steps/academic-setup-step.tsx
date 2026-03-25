import { OnboardingData } from "../onboarding-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StepShell, StepFooter } from "../step-shell";
import { CalendarDays, Plus, Trash2 } from "lucide-react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };

export function AcademicSetupStep({ data, updateData, onNext, onBack }: Props) {
  const { academic } = data;

  const setAcademic = (key: keyof typeof academic, val: string) =>
    updateData({ academic: { ...academic, [key]: val } });

  const setTerm = (i: number, key: "name" | "startDate" | "endDate", val: string) => {
    const updated = academic.terms.map((t, idx) => idx === i ? { ...t, [key]: val } : t);
    updateData({ academic: { ...academic, terms: updated } });
  };

  const addTerm = () => updateData({ academic: { ...academic, terms: [...academic.terms, { name: "", startDate: "", endDate: "" }] } });
  const removeTerm = (i: number) => updateData({ academic: { ...academic, terms: academic.terms.filter((_, idx) => idx !== i) } });

  return (
    <StepShell icon={<CalendarDays className="h-6 w-6 text-emerald-400" />} title="Academic Setup" subtitle="Define your academic year and terms.">
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
          <p className="text-xs font-black text-white/50 uppercase tracking-widest">Academic Year</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">Year Name</Label>
              <Input value={academic.yearName} onChange={e => setAcademic("yearName", e.target.value)} placeholder="2025/2026" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">Start Date</Label>
              <Input type="date" value={academic.startDate} onChange={e => setAcademic("startDate", e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">End Date</Label>
              <Input type="date" value={academic.endDate} onChange={e => setAcademic("endDate", e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
            </div>
          </div>
        </div>

        <p className="text-xs font-black text-white/50 uppercase tracking-widest">Terms / Semesters</p>
        {academic.terms.map((term, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/50">Term {i + 1}</span>
              {academic.terms.length > 1 && (
                <button onClick={() => removeTerm(i)} className="text-rose-400 hover:text-rose-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Term Name</Label>
                <Input value={term.name} onChange={e => setTerm(i, "name", e.target.value)} placeholder="e.g. Term 1" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Start Date</Label>
                <Input type="date" value={term.startDate} onChange={e => setTerm(i, "startDate", e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">End Date</Label>
                <Input type="date" value={term.endDate} onChange={e => setTerm(i, "endDate", e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
            </div>
          </div>
        ))}
        <Button variant="ghost" onClick={addTerm} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/5 rounded-xl w-full border border-dashed border-white/10 h-11">
          <Plus className="mr-2 h-4 w-4" /> Add Term
        </Button>
      </div>
      <StepFooter onBack={onBack} onNext={onNext} />
    </StepShell>
  );
}
