import { OnboardingData } from "../onboarding-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepShell, StepFooter } from "../step-shell";
import { School, Upload, Eye, EyeOff } from "lucide-react";
import { useState, useRef } from "react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };

const ADDIS_SUBCITIES = [
  "Addis Ketema", "Akaki-Kality", "Arada", "Bole", "Gullele", 
  "Kirkos", "Kolfe Keranio", "Lemi Kura", "Lideta", "Nefas Silk-Lafto", "Yeka"
];

export function SchoolSetupStep({ data, updateData, onNext, onBack }: Props) {
  const school = data.school;
  const admin = data.admin;
  
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setSch = (key: keyof typeof school) => (e: React.ChangeEvent<HTMLInputElement>) =>
    updateData({ school: { ...school, [key]: e.target.value } });
    
  const setAdm = (key: keyof typeof admin) => (e: React.ChangeEvent<HTMLInputElement>) =>
    updateData({ admin: { ...admin, [key]: e.target.value } });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary object URL for preview
      const url = URL.createObjectURL(file);
      updateData({ school: { ...school, logoUrl: url } });
    }
  };

  const isEmailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isPhoneValid = (p: string) => !p || /^\+?[\d\s-]{9,15}$/.test(p);

  const errors = {
    schoolName: !school.name,
    schoolEmail: !school.contactEmail || !isEmailValid(school.contactEmail),
    schoolPhone: !isPhoneValid(school.contactPhone),
    subcity: !school.subcity,
    adminName: !admin.name,
    adminEmail: !admin.email || !isEmailValid(admin.email),
    adminPassword: !admin.password || admin.password.length < 6,
  };

  const isComplete = !Object.values(errors).some(Boolean);

  return (
    <StepShell icon={<School className="h-6 w-6 text-emerald-400" />} title="School Information" subtitle="Tell us about your institution and create your admin account.">
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">

        {/* --- Logo Upload Section --- */}
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center shrink-0 cursor-pointer hover:border-emerald-400/50 hover:bg-white/20 transition-all overflow-hidden relative group"
          >
            {school.logoUrl ? (
              <>
                <img src={school.logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="h-5 w-5 text-white" />
                </div>
              </>
            ) : (
              <Upload className="h-6 w-6 text-white/40" />
            )}
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleLogoUpload} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">School Logo</h4>
            <p className="text-xs text-white/50">Upload your institution&apos;s crest or logo. (Optional)</p>
          </div>
        </div>

        {/* --- School Basics --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest">Institution Details</h3>
          </div>

          <div className="space-y-1.5">
            <Label className="text-white/70 text-xs">School Name *</Label>
            <Input 
              placeholder="e.g. Addis Ababa Academy" 
              value={school.name} 
              onChange={setSch("name")} 
              className={`bg-white/5 text-white placeholder:text-white/30 rounded-xl h-11 transition-colors ${
                school.name === "" ? "border-rose-400/50 focus-visible:ring-rose-400" : "border-white/10"
              }`} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">School Type</Label>
              <div className="flex bg-white/5 p-1 rounded-xl h-11 border border-white/10">
                {(["Private", "Public"] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateData({ school: { ...school, schoolType: type } })}
                    className={`flex-1 rounded-lg text-sm font-bold transition-all ${
                      school.schoolType === type ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">Primary Language</Label>
              <Select value={school.language} onValueChange={v => updateData({ school: { ...school, language: v } })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["English", "Amharic", "Afaan Oromo", "Tigrinya"].map(l => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">City</Label>
              <Select value={school.city || "Addis Ababa"} onValueChange={v => updateData({ school: { ...school, city: v } })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                  <SelectItem value="Adama">Adama</SelectItem>
                  <SelectItem value="Hawassa">Hawassa</SelectItem>
                  <SelectItem value="Bahir Dar">Bahir Dar</SelectItem>
                  <SelectItem value="Other">Other...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">Subcity *</Label>
              <Select value={school.subcity} onValueChange={v => updateData({ school: { ...school, subcity: v } })}>
                <SelectTrigger className={`bg-white/5 text-white rounded-xl h-11 transition-colors ${
                  errors.subcity ? "border-rose-400/50" : "border-white/10"
                }`}>
                  <SelectValue placeholder="Select Subcity" />
                </SelectTrigger>
                <SelectContent>
                  {ADDIS_SUBCITIES.map(sc => (
                    <SelectItem key={sc} value={sc}>{sc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">School Phone</Label>
              <Input 
                placeholder="+251 9XX XXX XXX" 
                value={school.contactPhone} 
                onChange={setSch("contactPhone")} 
                className={`bg-white/5 text-white placeholder:text-white/30 rounded-xl h-11 transition-colors ${
                  errors.schoolPhone ? "border-rose-400/50 focus-visible:ring-rose-400 text-rose-200" : "border-white/10"
                }`} 
              />
              {errors.schoolPhone && school.contactPhone && <p className="text-[10px] text-rose-400 absolute">Invalid format (e.g. +251 911...)</p>}
            </div>
            <div className="space-y-1.5 text-left">
              <Label className="text-white/70 text-xs">School Email *</Label>
              <Input 
                type="email" 
                placeholder="info@school.com" 
                value={school.contactEmail} 
                onChange={setSch("contactEmail")} 
                className={`bg-white/5 text-white placeholder:text-white/30 rounded-xl h-11 transition-colors ${
                  errors.schoolEmail && school.contactEmail ? "border-rose-400/50 focus-visible:ring-rose-400 text-rose-200" : "border-white/10"
                }`} 
              />
            </div>
          </div>
        </div>

        {/* --- System Admin Account --- */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest">System Administrator</h3>
          </div>
          <p className="text-xs text-white/50">This account will have full access to configure the ERP.</p>

          <div className="space-y-1.5">
            <Label className="text-white/70 text-xs">Admin Name *</Label>
            <Input 
              placeholder="Abebe Kebede" 
              value={admin.name} 
              onChange={setAdm("name")} 
              className={`bg-white/5 text-white placeholder:text-white/30 rounded-xl h-11 transition-colors ${
                admin.name === "" ? "border-rose-400/50 focus-visible:ring-rose-400" : "border-white/10"
              }`} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs">Admin Email *</Label>
              <Input 
                type="email" 
                placeholder="admin@school.com" 
                value={admin.email} 
                onChange={setAdm("email")} 
                className={`bg-white/5 text-white placeholder:text-white/30 rounded-xl h-11 transition-colors ${
                  errors.adminEmail && admin.email ? "border-rose-400/50 focus-visible:ring-rose-400 text-rose-200" : "border-white/10"
                }`} 
              />
            </div>
            <div className="space-y-1.5 relative mb-4">
              <Label className="text-white/70 text-xs">Password *</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={admin.password} 
                  onChange={setAdm("password")} 
                  className={`bg-white/5 text-white rounded-xl h-11 pr-10 transition-colors ${
                    errors.adminPassword && admin.password ? "border-amber-400/50 focus-visible:ring-amber-400" : "border-white/10"
                  }`} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.adminPassword && admin.password && <p className="text-[10px] text-amber-400 absolute">Must be at least 6 characters</p>}
            </div>
          </div>
        </div>

      </div>
      <StepFooter onBack={onBack} onNext={onNext} nextDisabled={!isComplete} />
    </StepShell>
  );
}
