"use client";

import { useState, useEffect } from "react";
import { OnboardingData } from "../onboarding-wizard";
import { StepShell, StepFooter } from "../step-shell";
import { BookOpen, Plus, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

// Ethiopian Curriculum mapping
const CURRICULUM = {
  "KG 1": ["Language", "Maths", "Environment", "Art", "Play"],
  "KG 2": ["Language", "Maths", "Environment", "Art", "Play"],
  "KG 3": ["Language", "Maths", "Environment", "Art", "Play"],
  "Grade 1": ["Amharic", "English", "Mother Tongue", "Maths", "Environmental Science", "Art", "PE"],
  "Grade 2": ["Amharic", "English", "Mother Tongue", "Maths", "Environmental Science", "Art", "PE"],
  "Grade 3": ["Amharic", "English", "Mother Tongue", "Maths", "Environmental Science", "Art", "PE"],
  "Grade 4": ["Amharic", "English", "Mother Tongue", "Maths", "Environmental Science", "Art", "PE"],
  "Grade 5": ["Amharic", "English", "Maths", "Science", "Social Studies", "Civics", "PE"],
  "Grade 6": ["Amharic", "English", "Maths", "Science", "Social Studies", "Civics", "PE"],
  "Grade 7": ["Amharic", "English", "Maths", "Science", "Social Studies", "Civics", "PE"],
  "Grade 8": ["Amharic", "English", "Maths", "Science", "Social Studies", "Civics", "PE"],
  "Grade 9": ["Amharic", "English", "Maths", "Physics", "Chemistry", "Biology", "History", "Geography", "Civics", "IT"],
  "Grade 10": ["Amharic", "English", "Maths", "Physics", "Chemistry", "Biology", "History", "Geography", "Civics", "IT"],
  "Grade 11": ["Amharic", "English", "Maths", "Physics", "Chemistry", "Biology", "History", "Geography", "Economics", "Business"],
  "Grade 12": ["Amharic", "English", "Maths", "Physics", "Chemistry", "Biology", "History", "Geography", "Economics", "Business"],
} as Record<string, string[]>;

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };

export function SubjectsStep({ data, updateData, onNext, onBack }: Props) {
  const { subjects, grades } = data;
  const [customInput, setCustomInput] = useState("");
  const [autoLoaded, setAutoLoaded] = useState(false);

  // Auto-load subjects based on selected grades (runs once when step mounts)
  useEffect(() => {
    if (grades.length > 0 && subjects.length === 0 && !autoLoaded) {
      const derivedSubjects = new Set<string>();
      grades.forEach(g => {
        const subjs = CURRICULUM[g] || [];
        subjs.forEach(s => derivedSubjects.add(s));
      });
      
      const newSubjects = Array.from(derivedSubjects);
      if (newSubjects.length > 0) {
        updateData({ subjects: newSubjects });
        setAutoLoaded(true);
      }
    }
  }, [grades, subjects.length, autoLoaded, updateData]);

  const toggle = (s: string) => {
    if (subjects.includes(s)) {
      updateData({ subjects: subjects.filter(x => x !== s) });
    } else {
      updateData({ subjects: [...subjects, s] });
    }
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !subjects.includes(trimmed)) {
      updateData({ subjects: [...subjects, trimmed] });
    }
    setCustomInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); addCustom(); }
  };

  return (
    <StepShell icon={<BookOpen className="h-6 w-6 text-emerald-400" />} title="Subjects" subtitle="Here are the standard subjects for your grades. Add or remove as needed.">
      
      {autoLoaded && (
        <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-400/20 p-3 rounded-xl mb-4">
          <Sparkles className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-100">
            <span className="font-bold text-blue-300">Magic Moment: </span>
            We auto-loaded the Ethiopian Curriculum subjects based on the grades you selected!
          </div>
        </div>
      )}

      {/* Active subjects */}
      <div className="flex flex-wrap gap-2 max-h-[30vh] overflow-y-auto pr-2 no-scrollbar">
        {subjects.map(s => (
          <span
            key={s}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300"
          >
            {s}
            <button type="button" onClick={() => toggle(s)} className="hover:text-white transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>

      {/* Custom subject adder */}
      <div className="border-t border-white/10 pt-4 space-y-3">
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Add Subject</p>
        <div className="flex gap-2">
          <Input
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Afaan Oromo, Robotics, Debate..."
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-10"
          />
          <button
            type="button"
            onClick={addCustom}
            disabled={!customInput.trim()}
            className="h-10 px-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-30 flex items-center gap-1.5 text-sm font-bold"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      <StepFooter onBack={onBack} onNext={onNext} nextDisabled={subjects.length === 0} />
    </StepShell>
  );
}
