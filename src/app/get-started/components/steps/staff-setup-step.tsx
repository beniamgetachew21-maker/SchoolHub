import { useState } from "react";
import { OnboardingData } from "../onboarding-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StepShell, StepFooter } from "../step-shell";
import { Users, Upload, UserPlus, X, FileSpreadsheet, CheckCircle2, Plus } from "lucide-react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };
type Mode = "select" | "excel" | "manual";

export function StaffSetupStep({ data, updateData, onNext, onBack }: Props) {
  const { staff } = data;
  const [mode, setMode] = useState<Mode>("select");
  const [fileUploaded, setFileUploaded] = useState(false);

  const setField = (i: number, key: string, val: string) => {
    updateData({ staff: staff.map((s, idx) => idx === i ? { ...s, [key]: val } : s) });
  };

  const addStaff = () => updateData({ staff: [...staff, { name: "", email: "", role: "Teacher", department: "General" }] });
  const removeStaff = (i: number) => updateData({ staff: staff.filter((_, idx) => idx !== i) });

  const simulateUpload = () => {
    // In a real app, parse CSV here
    setTimeout(() => {
      setFileUploaded(true);
      // Dummy data just to show it worked
      updateData({ staff: [
        { name: "Abebe Kebede", email: "abebe@school.et", role: "Principal", department: "Administration" },
        { name: "Sara Tadesse", email: "sara@school.et", role: "Teacher", department: "Science" },
        { name: "Dawit Alemu", email: "dawit@school.et", role: "Finance Officer", department: "Finance" }
      ]});
    }, 1000);
  };

  if (mode === "select") {
    return (
      <StepShell icon={<Users className="h-6 w-6 text-emerald-400" />} title="Staff Setup" subtitle="How would you like to add your initial team?">
        <div className="grid sm:grid-cols-2 gap-4 pt-4">
          <button onClick={() => setMode("excel")} className="bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 text-left p-6 rounded-2xl transition-all group">
            <FileSpreadsheet className="h-8 w-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Upload Excel / CSV</h3>
            <p className="text-sm text-white/50">Fastest for 10+ employees. Download our template and upload.</p>
          </button>
          
          <button onClick={() => { setMode("manual"); if(staff.length === 0) addStaff(); }} className="bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 text-left p-6 rounded-2xl transition-all group">
            <UserPlus className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Add Manually</h3>
            <p className="text-sm text-white/50">Best for just a few key admins right now.</p>
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
      <StepShell icon={<Users className="h-6 w-6 text-emerald-400" />} title="Staff Setup" subtitle="Upload your staff roster.">
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-blue-500/10 border border-blue-400/20 p-4 rounded-xl">
            <div className="text-sm text-blue-100">
              Need the exact format? <span className="font-bold">Columns: Name, Email, Role, Department</span>
            </div>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4">
              Download Template
            </button>
          </div>

          {!fileUploaded ? (
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center hover:bg-white/5 hover:border-emerald-400/50 transition-colors cursor-pointer" onClick={simulateUpload}>
              <Upload className="h-10 w-10 text-white/40 mx-auto mb-4" />
              <p className="font-bold text-white">Click to Upload</p>
              <p className="text-xs text-white/40 mt-1">.csv, .xlsx (Max 5MB)</p>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Upload Successful!</h3>
              <p className="text-emerald-100">✔ {staff.length} staff members detected and ready for import.</p>
              <button onClick={() => setFileUploaded(false)} className="text-xs text-emerald-400 hover:underline mt-2">Upload a different file instead</button>
            </div>
          )}
        </div>
        <StepFooter onBack={() => { setMode("select"); setFileUploaded(false); }} onNext={onNext} nextDisabled={!fileUploaded} />
      </StepShell>
    );
  }

  // Manual Mode
  return (
    <StepShell icon={<Users className="h-6 w-6 text-emerald-400" />} title="Staff Setup" subtitle="Manually add key team members.">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
        {staff.map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 relative group">
            <button onClick={() => removeStaff(i)} className="absolute top-4 right-4 text-white/30 hover:text-rose-400">
              <X className="h-4 w-4" />
            </button>
            <div className="grid sm:grid-cols-2 gap-3 pr-8">
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Full Name</Label>
                <Input value={s.name} onChange={e => setField(i, "name", e.target.value)} placeholder="e.g. Abebe Kebede" className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Email</Label>
                <Input type="email" value={s.email} onChange={e => setField(i, "email", e.target.value)} placeholder="email@school.com" className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Role</Label>
                <Select value={s.role} onValueChange={v => setField(i, "role", v)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Principal", "Vice Principal", "Teacher", "Finance Officer", "Counselor"].map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Department</Label>
                <Input value={s.department} onChange={e => setField(i, "department", e.target.value)} placeholder="e.g. Science" className="bg-white/5 border-white/10 text-white rounded-xl h-10" />
              </div>
            </div>
          </div>
        ))}

        <Button variant="ghost" onClick={addStaff} className="w-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/5 rounded-xl border border-dashed border-white/10 h-10">
          <Plus className="mr-2 h-4 w-4" /> Add Person
        </Button>
      </div>

      <StepFooter onBack={() => setMode("select")} onNext={onNext} nextDisabled={staff.some(s => !s.name || !s.email)} />
    </StepShell>
  );
}
