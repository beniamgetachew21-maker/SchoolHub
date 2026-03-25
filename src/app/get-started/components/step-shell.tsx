import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export function StepShell({ icon, title, subtitle, children }: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 text-white space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="space-y-0.5">
          <h2 className="text-xl font-black tracking-tight">{title}</h2>
          <p className="text-white/50 text-sm">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function StepFooter({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex gap-3 pt-2">
      <Button
        onClick={onBack}
        variant="outline"
        className="border-white/10 text-white/60 hover:text-white bg-transparent rounded-xl h-12 px-5"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Button
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl h-12 shadow-lg shadow-emerald-500/20 disabled:opacity-40"
      >
        {nextLabel} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
