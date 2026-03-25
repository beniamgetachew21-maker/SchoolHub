import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Sparkles, CheckCircle, Clock, RefreshCw } from "lucide-react";

type Props = { onNext: () => void; onReset: () => void; hasSavedProgress: boolean };

export function WelcomeStep({ onNext, onReset, hasSavedProgress }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-10 text-white text-center space-y-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -inset-x-20 h-64 bg-emerald-500/10 blur-[100px] rounded-full point-events-none" />

      <div className="flex justify-center relative">
        <div className="h-20 w-20 rounded-3xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
          <GraduationCap className="h-10 w-10 text-emerald-400" />
        </div>
      </div>
      
      <div className="space-y-3 relative">
        <h1 className="text-4xl font-black tracking-tight">Welcome to School ERP 🚀</h1>
        <p className="text-white/60 text-lg max-w-lg mx-auto leading-relaxed">
          Let&apos;s set up your school in 10 minutes. We&apos;ll walk you through everything step by step.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto relative">
        {[
          { label: "10 mins", sub: "Quick setup", icon: Clock },
          { label: "100%", sub: "Customizable", icon: Sparkles },
          { label: "12 Steps", sub: "Guided flow", icon: CheckCircle },
        ].map(item => (
          <div key={item.label} className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
            <item.icon className="h-5 w-5 text-emerald-400 mb-2 opacity-80" />
            <div className="text-lg font-black text-white">{item.label}</div>
            <div className="text-xs text-white/40 mt-1">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-widest relative">
        <CheckCircle className="h-3 w-3" />
        Used by schools across Addis Ababa
      </div>

      <div className="space-y-3 pt-4 relative flex flex-col items-center gap-4">
        <Button
          onClick={onNext}
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl px-10 h-14 text-lg font-bold shadow-lg shadow-emerald-500/20 w-full max-w-sm group"
        >
          {hasSavedProgress ? "Resume Setup" : "Start Setup"} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        {hasSavedProgress && (
          <button 
            type="button"
            onClick={onReset}
            className="text-xs text-white/40 hover:text-rose-400 flex items-center justify-center gap-2 transition-colors mx-auto"
          >
            <RefreshCw className="h-3 w-3" /> Reset all progress and start over
          </button>
        )}
        
        <div>
          <a href="mailto:support@schools.et" className="text-sm font-semibold text-white/40 hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
            Book Assisted Setup
          </a>
        </div>
      </div>
    </div>
  );
}
