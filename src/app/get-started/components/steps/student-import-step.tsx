import { useState } from "react";
import { OnboardingData } from "../onboarding-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StepShell, StepFooter } from "../step-shell";
import { GraduationCap, Upload, UserPlus, X, FileSpreadsheet, CheckCircle2, AlertTriangle, Plus } from "lucide-react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };
type Mode = "select" | "excel" | "manual";

export function StudentImportStep({ data, updateData, onNext, onBack }: Props) {
  const { students } = data;
  const [mode, setMode] = useState<Mode>("select");
  const [fileState, setFileState] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const setField = (i: number, key: string, val: string) => {
    updateData({ students: students.map((s, idx) => idx === i ? { ...s, [key]: val } : s) });
  };

  const addStudent = () => updateData({ students: [...students, { name: "", email: "", className: "" }] });
  const removeStudent = (i: number) => updateData({ students: students.filter((_, idx) => idx !== i) });

  const simulateUpload = () => {
    setFileState("uploading");
    setTimeout(() => {
      // Simulate an error file first, or just success
      setFileState("error"); // Show the Magic UX error preview first
      updateData({ students: [
        { name: "Yonas Mekonnen", email: "yonas@test.com", className: "Grade 10A" },
        { name: "Betelhem Assefa", email: "betty@test.com", className: "Grade 10B" },
      ]});
    }, 1500);
  };

  const forceSuccess = () => setFileState("success");

  if (mode === "select") {
    return (
      <StepShell icon={<GraduationCap className="h-6 w-6 text-emerald-400" />} title="Student Import (Important)" subtitle="Let's bring your students into the system.">
        <div className="grid sm:grid-cols-2 gap-4 pt-4">
          <button onClick={() => setMode("excel")} className="bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-left p-6 rounded-2xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 px-3 py-1 rounded-bl-xl text-[10px] font-black tracking-widest text-white uppercase">Recommended</div>
            <FileSpreadsheet className="h-8 w-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Upload Excel (CSV)</h3>
            <p className="text-sm text-emerald-100/70">Bulk create student accounts, assign classes & parents instantly.</p>
          </button>
          
          <button onClick={() => { setMode("manual"); if(students.length === 0) addStudent(); }} className="bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 text-left p-6 rounded-2xl transition-all group">
            <UserPlus className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Add Manually</h3>
            <p className="text-sm text-white/50">Add a few test students to see how the system works.</p>
          </button>
        </div>

        <div className="pt-4 text-center">
          <button onClick={onNext} className="text-sm font-bold text-white/40 hover:text-white transition-colors underline underline-offset-4">
            Skip for now (I&apos;ll do this later)
          </button>
        </div>
        <StepFooter onBack={onBack} onNext={() => {}} nextDisabled={true} />
      </StepShell>
    );
  }

  if (mode === "excel") {
    return (
      <StepShell icon={<GraduationCap className="h-6 w-6 text-emerald-400" />} title="Student Import" subtitle="Upload your student roster.">
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-blue-500/10 border border-blue-400/20 p-4 rounded-xl flex-wrap gap-2">
            <div className="text-sm text-blue-100">
              Columns: <span className="font-bold">Student Name, Parent Email, Grade, Section</span>
            </div>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4">
              Download Template
            </button>
          </div>

          {fileState === "idle" && (
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center hover:bg-white/5 hover:border-emerald-400/50 transition-colors cursor-pointer" onClick={simulateUpload}>
              <Upload className="h-10 w-10 text-white/40 mx-auto mb-4" />
              <p className="font-bold text-white">Click to Upload Roster</p>
              <p className="text-xs text-white/40 mt-1">.csv, .xlsx (Max 10MB)</p>
            </div>
          )}

          {fileState === "uploading" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4" />
              <p className="font-bold text-white animate-pulse">Scanning file...</p>
            </div>
          )}

          {fileState === "error" && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-rose-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-white">✔ 1,245 students ready, but found 2 errors</h3>
                  <p className="text-xs text-rose-200/70 mt-1">Please fix the issues below or ignore them to continue.</p>
                </div>
              </div>
              
              <div className="space-y-2 bg-black/20 rounded-xl p-3 border border-white/5">
                <div className="text-xs text-white/60 font-mono">Row 23 → <span className="text-rose-400">Missing Grade Level</span></div>
                <div className="text-xs text-white/60 font-mono">Row 89 → <span className="text-rose-400">Invalid Email Format ("no-email")</span></div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setFileState("idle")} className="text-xs font-bold text-white/60 hover:text-white px-4 py-2">Upload Fixed File</button>
                <button onClick={forceSuccess} className="text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded-lg">Ignore Errors & Continue</button>
              </div>
            </div>
          )}

          {fileState === "success" && (
            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Import Finalized!</h3>
              <p className="text-emerald-100">✔ 1,245 students successfully mapped.</p>
              <button onClick={() => setFileState("idle")} className="text-xs text-emerald-400 hover:underline mt-2">Start over</button>
            </div>
          )}
        </div>
        <StepFooter onBack={() => { setMode("select"); setFileState("idle"); }} onNext={onNext} nextDisabled={fileState !== "success"} />
      </StepShell>
    );
  }

  // Manual Mode
  return (
    <StepShell icon={<GraduationCap className="h-6 w-6 text-emerald-400" />} title="Student Import" subtitle="Manually add test students.">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
        {students.map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 relative group">
            <button onClick={() => removeStudent(i)} className="absolute top-4 right-4 text-white/30 hover:text-rose-400">
              <X className="h-4 w-4" />
            </button>
            <div className="grid sm:grid-cols-2 gap-3 pr-8">
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Student Name</Label>
                <Input value={s.name} onChange={e => setField(i, "name", e.target.value)} placeholder="e.g. Yonas" className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Class / Section</Label>
                <Input value={s.className} onChange={e => setField(i, "className", e.target.value)} placeholder="e.g. Grade 1A" className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-white/70 text-xs">Parent Email (Optional)</Label>
                <Input type="email" value={s.email} onChange={e => setField(i, "email", e.target.value)} placeholder="parent@mail.com" className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
            </div>
          </div>
        ))}

        <Button variant="ghost" onClick={addStudent} className="w-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/5 rounded-xl border border-dashed border-white/10 h-10">
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      <StepFooter onBack={() => setMode("select")} onNext={onNext} nextDisabled={students.some(s => !s.name || !s.className)} />
    </StepShell>
  );
}
