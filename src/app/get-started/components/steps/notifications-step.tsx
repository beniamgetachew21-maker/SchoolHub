import { OnboardingData } from "../onboarding-wizard";
import { StepShell, StepFooter } from "../step-shell";
import { Bell, Smartphone, MessageSquare, Mail } from "lucide-react";

type Props = { data: OnboardingData; updateData: (p: Partial<OnboardingData>) => void; onNext: () => void; onBack: () => void };

export function NotificationsStep({ data, updateData, onNext, onBack }: Props) {
  const { notifications = { sms: true, appPush: false, email: true } } = data;

  const toggle = (key: keyof typeof notifications) => {
    updateData({ notifications: { ...notifications, [key]: !notifications[key] } });
  };

  return (
    <StepShell icon={<Bell className="h-6 w-6 text-emerald-400" />} title="Notifications Setup" subtitle="How do you want to keep parents informed?">
      <div className="space-y-4 pt-2 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
        
        {/* SMS Toggle */}
        <div 
          onClick={() => toggle("sms")}
          className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
            notifications.sms 
              ? "bg-emerald-500/10 border-emerald-400/30 shadow-[inset_0_0_20px_rgba(52,211,153,0.05)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          }`}
        >
          <div className={`p-3 rounded-xl ${notifications.sms ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/40'}`}>
            <MessageSquare className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className={`font-bold text-lg ${notifications.sms ? 'text-white' : 'text-white/60'}`}>SMS Alerts</h3>
              {notifications.sms && <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest">Recommended</span>}
            </div>
            <p className="text-sm text-white/50">Instant delivery to all phones (no internet required). Works everywhere in Ethiopia.</p>
            <div className={`text-xs mt-2 pt-2 border-t ${notifications.sms ? 'border-emerald-500/20 text-emerald-200/70' : 'border-white/5 text-white/30'}`}>
              <span className="font-bold">Examples:</span> Urgent absence alerts, Fee reminders.
            </div>
          </div>
        </div>

        {/* In-App Push Toggle */}
        <div 
          onClick={() => toggle("appPush")}
          className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
            notifications.appPush 
              ? "bg-emerald-500/10 border-emerald-400/30 shadow-[inset_0_0_20px_rgba(52,211,153,0.05)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          }`}
        >
          <div className={`p-3 rounded-xl ${notifications.appPush ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/40'}`}>
            <Smartphone className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className={`font-bold text-lg ${notifications.appPush ? 'text-white' : 'text-white/60'}`}>Mobile App Push</h3>
            <p className="text-sm text-white/50">Free notifications sent directly to the Parent/Student App via internet.</p>
            <div className={`text-xs mt-2 pt-2 border-t ${notifications.appPush ? 'border-emerald-500/20 text-emerald-200/70' : 'border-white/5 text-white/30'}`}>
              <span className="font-bold">Examples:</span> Daily attendance, Exam results, Homework posted.
            </div>
          </div>
        </div>

        {/* Email Toggle */}
        <div 
          onClick={() => toggle("email")}
          className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
            notifications.email 
              ? "bg-emerald-500/10 border-emerald-400/30 shadow-[inset_0_0_20px_rgba(52,211,153,0.05)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          }`}
        >
          <div className={`p-3 rounded-xl ${notifications.email ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/40'}`}>
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className={`font-bold text-lg ${notifications.email ? 'text-white' : 'text-white/60'}`}>Email Reports</h3>
            <p className="text-sm text-white/50">Automated end-of-week digests and formal document delivery.</p>
            <div className={`text-xs mt-2 pt-2 border-t ${notifications.email ? 'border-emerald-500/20 text-emerald-200/70' : 'border-white/5 text-white/30'}`}>
              <span className="font-bold">Examples:</span> Report cards, Weekly progress summaries, Newsletters.
            </div>
          </div>
        </div>

      </div>
      <StepFooter onBack={onBack} onNext={onNext} 
        nextDisabled={!notifications.sms && !notifications.appPush && !notifications.email} 
      />
    </StepShell>
  );
}
