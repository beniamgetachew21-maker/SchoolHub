import { GraduationCap, Users, BookOpen, ArrowRight, ShieldCheck, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentsStudentsGateway() {
  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* Hero Header */}
      <section className="relative py-20 px-6 overflow-hidden bg-brand-dark overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-brand-light/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
            <Badge className="bg-brand-orange text-white border-none px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                PORTAL GATEWAY
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
                Your Digital <span className="text-brand-orange">Campus </span> Connection
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                Access real-time academic insights, campus updates, and secure financial management from one unified interface.
            </p>
        </div>
      </section>

      {/* Gateway Grid */}
      <section className="py-20 px-6 bg-slate-50 flex-grow">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Parent Portal Path */}
            <Card className="rounded-[40px] border-none shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                <div className="h-4 bg-brand-orange w-full" />
                <div className="p-12 space-y-8">
                    <div className="h-20 w-20 bg-brand-orange/10 rounded-3xl flex items-center justify-center text-brand-orange group-hover:rotate-6 transition-transform">
                        <Users className="h-10 w-10" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Parent Portal</h2>
                        <p className="text-lg text-slate-500 leading-relaxed">
                            Monitor your child's progress, track attendance, and manage school fees securely. Stay connected with direct institutional alerts.
                        </p>
                    </div>
                    <ul className="space-y-4">
                        <FeatureItem text="Real-time grade & attendance alerts" />
                        <FeatureItem text="Secure fee payment gateway" />
                        <FeatureItem text="Direct teacher & admin communication" />
                        <FeatureItem text="Live bus route tracking" />
                    </ul>
                    <Link href="/login?role=parent" className="block">
                        <Button className="w-full h-16 bg-brand-dark hover:bg-black text-white font-black text-lg rounded-2xl shadow-xl shadow-brand-dark/20 uppercase tracking-widest">
                            ENTER PARENT PORTAL <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </Card>

            {/* Student Portal Path */}
            <Card className="rounded-[40px] border-none shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500 bg-brand-dark">
                <div className="h-4 bg-emerald-500 w-full" />
                <div className="p-12 space-y-8">
                    <div className="h-20 w-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-500 group-hover:-rotate-6 transition-transform">
                        <GraduationCap className="h-10 w-10" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-white tracking-tight uppercase">Student Portal</h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Access yours course materials, submit assessments, and track your academic mastery. Your personalized digital learning companion.
                        </p>
                    </div>
                    <ul className="space-y-4 text-slate-300">
                        <FeatureItem text="Course progress & material access" />
                        <FeatureItem text="Online assessment submission" />
                        <FeatureItem text="Digital student ID & library cards" />
                        <FeatureItem text="Club & activity management" />
                    </ul>
                    <Link href="/login?role=student" className="block">
                        <Button className="w-full h-16 bg-white hover:bg-slate-100 text-brand-dark font-black text-lg rounded-2xl shadow-xl shadow-white/10 uppercase tracking-widest">
                            ENTER STUDENT PORTAL <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
      </section>

      {/* Trust & Support */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <SupportStat icon={ShieldCheck} title="Verified Identity" desc="Enterprise-grade authentication ensures your data remains private and secure at all times." />
                  <SupportStat icon={Smartphone} title="Mobile Optimized" desc="Download our mobile app to receive instant push notifications for critical school announcements." />
                  <SupportStat icon={Globe} title="Global Access" desc="Access your portal from anywhere in the world with specialized offline support for low-bandwidth zones." />
              </div>
          </div>
      </section>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 font-bold text-sm">
            <div className="h-2 w-2 rounded-full bg-brand-orange group-hover:scale-150 transition-transform" />
            {text}
        </li>
    )
}

function SupportStat({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="space-y-4 flex flex-col items-center">
            <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:text-brand-orange transition-colors">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
        </div>
    )
}
