import { OnboardingData } from "../onboarding-wizard";
import { Input } from "@/components/ui/input";
import { StepShell, StepFooter } from "../step-shell";
import { CreditCard, CopyCheck } from "lucide-react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };

export function FeesSetupStep({ data, updateData, onNext, onBack }: Props) {
  const { grades, fees } = data;

  // Initialize fees for selected grades if empty
  const getFee = (grade: string, type: string) => {
    return fees.find(f => f.grade === grade && f.type === type)?.amount || 0;
  };

  const setFee = (grade: string, type: string, amount: number) => {
    const existing = fees.filter(f => !(f.grade === grade && f.type === type));
    updateData({ 
      fees: [...existing, { grade, name: `${grade} ${type}`, type, amount }]
    });
  };

  const applyFirstToAll = () => {
    if (grades.length < 2) return;
    const firstGrade = grades[0];
    const tuition = getFee(firstGrade, "Tuition");
    const reg = getFee(firstGrade, "Registration");
    const transport = getFee(firstGrade, "Transport");

    const newFees = grades.flatMap(g => [
      { grade: g, name: `${g} Tuition`, type: "Tuition", amount: tuition },
      { grade: g, name: `${g} Registration`, type: "Registration", amount: reg },
      { grade: g, name: `${g} Transport`, type: "Transport", amount: transport },
    ]);
    
    updateData({ fees: newFees });
  };

  return (
    <StepShell icon={<CreditCard className="h-6 w-6 text-emerald-400" />} title="Fees Setup" subtitle="Set your base fees per grade level. You can add more specific fees later.">
      
      {grades.length === 0 ? (
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-amber-200/80 text-center text-sm">
          You need to select Grades in Step 4 before setting up fees.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl">
            <div className="text-xs text-white/50">Save time if fees are similar:</div>
            <button onClick={applyFirstToAll} className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
              <CopyCheck className="h-4 w-4" /> Apply {grades[0]} fees to all
            </button>
          </div>

          <div className="max-h-[50vh] overflow-y-auto pr-2 no-scrollbar space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-3 px-4 text-xs font-bold uppercase tracking-widest text-white/40">
              <div>Grade</div>
              <div className="text-center">Tuition (ETB)</div>
              <div className="text-center">Reg. (ETB)</div>
              <div className="text-center">Annual Total</div>
            </div>

            {/* Data rows */}
            {grades.map(grade => {
              const tuition = getFee(grade, "Tuition");
              const reg = getFee(grade, "Registration");
              const annualTotal = (tuition * 10) + reg; // Assuming 10 months tuition + 1 time reg

              return (
                <div key={grade} className="grid grid-cols-4 gap-3 items-center bg-white/5 border border-white/10 p-3 rounded-2xl group focus-within:border-emerald-500/40 focus-within:bg-emerald-500/5 transition-colors">
                  <div className="font-bold text-white pl-2">{grade}</div>
                  <div>
                    <Input 
                      type="number" 
                      value={tuition || ""} 
                      onChange={e => setFee(grade, "Tuition", Number(e.target.value))} 
                      placeholder="0"
                      className="bg-black/20 border-white/10 text-center text-white rounded-xl h-10" 
                    />
                  </div>
                  <div>
                    <Input 
                      type="number" 
                      value={reg || ""} 
                      onChange={e => setFee(grade, "Registration", Number(e.target.value))} 
                      placeholder="0"
                      className="bg-black/20 border-white/10 text-center text-white rounded-xl h-10" 
                    />
                  </div>
                  <div className="text-center font-bold text-emerald-400">
                    {annualTotal > 0 ? annualTotal.toLocaleString() : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <StepFooter onBack={onBack} onNext={onNext} />
    </StepShell>
  );
}
