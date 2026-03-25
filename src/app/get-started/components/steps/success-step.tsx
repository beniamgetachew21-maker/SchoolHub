import { Button } from "@/components/ui/button";
import { PartyPopper, Users, UserPlus, LayoutDashboard, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SuccessStep() {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-10 text-white text-center space-y-8 relative overflow-hidden">
      <div className="absolute -top-40 -inset-x-20 h-80 bg-emerald-500/20 blur-[120px] rounded-full point-events-none" />

      <div className="flex justify-center relative">
        <div className="h-24 w-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(52,211,153,0.3)]">
          <PartyPopper className="h-12 w-12 text-emerald-400" />
        </div>
      </div>
      
      <div className="space-y-3 relative">
        <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          Your School is Live! 🎉
        </h1>
        <p className="text-white/60 text-lg max-w-lg mx-auto leading-relaxed">
          The database has been provisioned, configurations applied, and your ERP is now strictly isolated and ready for action.
        </p>
      </div>

      <div className="space-y-4 pt-4 relative">
        <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Recommended Next Steps</div>
        
        <Link href="/admin/hr" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">Invite Teachers</div>
              <div className="text-xs text-white/50">Send login links to your staff</div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
        </Link>
        
        <Link href="/admin/students" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">Invite Parents</div>
              <div className="text-xs text-white/50">Grant access to the Parent Portal</div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
        </Link>

        <Link href="/admin" className="flex items-center justify-between p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl transition-all group mt-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-emerald-400 text-lg">Open Admin Dashboard</div>
              <div className="text-xs text-emerald-100/60">Start managing your school</div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
