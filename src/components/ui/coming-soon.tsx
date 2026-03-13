import { Card } from "@/components/ui/card";
import { Hammer, Sparkles } from "lucide-react";

export function ComingSoon({ title, description }: { title: string, description?: string }) {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Card className="max-w-md w-full rounded-[40px] shadow-2xl border-none overflow-hidden relative bg-white">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-48 w-48 bg-amber-500/10 rounded-full blur-3xl mix-blend-multiply" />
                
                <div className="p-12 flex flex-col items-center text-center space-y-6 relative z-10">
                    <div className="h-24 w-24 rounded-3xl bg-slate-50 flex items-center justify-center relative shadow-sm">
                        <Hammer className="h-10 w-10 text-emerald-600 animate-pulse" />
                        <div className="absolute -top-2 -right-2 p-2 bg-amber-100 rounded-xl rotate-12">
                            <Sparkles className="h-4 w-4 text-amber-600" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black font-headline tracking-tighter uppercase text-slate-900">{title}</h2>
                        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase">Under Construction</p>
                    </div>
                    
                    <p className="text-slate-500 font-medium leading-relaxed">
                        {description || "We are currently building this module to bring you powerful new capabilities. Check back soon for updates."}
                    </p>
                    
                    <div className="pt-6 w-full">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 emerald-gradient rounded-full animate-[progress_2s_ease-in-out_infinite] origin-left" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
