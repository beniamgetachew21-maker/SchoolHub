import { OnboardingData } from "../onboarding-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepShell, StepFooter } from "../step-shell";
import { Layers } from "lucide-react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };

const ALL_GRADES = [
  "KG 1", "KG 2", "KG 3", 
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", 
  "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"
];

export function GradesStep({ data, updateData, onNext, onBack }: Props) {
  const { grades = [], sections = {} } = data;

  const toggleGrade = (grade: string) => {
    if (grades.includes(grade)) {
      updateData({ 
        grades: grades.filter(g => g !== grade),
        // Remove sections for deselected grade
        sections: Object.fromEntries(Object.entries(sections).filter(([k]) => k !== grade))
      });
    } else {
      updateData({ 
        grades: [...grades, grade],
        // Default to a single "A" section when a grade is selected
        sections: { ...sections, [grade]: ["A"] }
      });
    }
  };

  const selectFullKG_12 = () => {
    const fullSections: Record<string, string[]> = {};
    ALL_GRADES.forEach(g => fullSections[g] = ["A", "B", "C"]);
    updateData({ grades: ALL_GRADES, sections: fullSections });
  };

  const updateSections = (grade: string, val: string) => {
    // Convert "A, B, C" input into array ["A", "B", "C"]
    const newSections = val.split(",").map(s => s.trim()).filter(Boolean);
    updateData({ sections: { ...sections, [grade]: newSections } });
  };

  return (
    <StepShell icon={<Layers className="h-6 w-6 text-emerald-400" />} title="Grades & Structure" subtitle="Select the grades you offer and define sections (A, B, C) for each.">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <Label className="text-white/70 text-xs font-bold uppercase tracking-widest">Select Grades</Label>
          <button onClick={selectFullKG_12} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full transition-colors">
            👉 Select Full KG–12
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-[35vh] overflow-y-auto pr-2 no-scrollbar">
          {ALL_GRADES.map(grade => {
            const active = grades.includes(grade);
            return (
              <button
                key={grade}
                onClick={() => toggleGrade(grade)}
                className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
                  active
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-100 shadow-[inset_0_0_15px_rgba(52,211,153,0.1)]"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {grade}
              </button>
            );
          })}
        </div>

        {grades.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <Label className="text-white/70 text-xs font-bold uppercase tracking-widest">Sections Per Grade</Label>
            <p className="text-xs text-white/40 mb-3">Define the sections for your selected grades using comma separated values.</p>
            
            <div className="grid sm:grid-cols-2 gap-3 max-h-[25vh] overflow-y-auto pr-2 no-scrollbar">
              {ALL_GRADES.filter(g => grades.includes(g)).map(grade => (
                <div key={grade} className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10">
                  <div className="w-20 text-xs font-bold text-white/60 shrink-0 text-right">{grade}</div>
                  <Input 
                    value={(sections[grade] || []).join(", ")}
                    onChange={(e) => updateSections(grade, e.target.value)}
                    placeholder="A, B, C"
                    className="bg-black/20 border-white/10 text-white rounded-lg h-9 text-sm focus-visible:ring-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <StepFooter onBack={onBack} onNext={onNext} nextDisabled={grades.length === 0} />
    </StepShell>
  );
}
