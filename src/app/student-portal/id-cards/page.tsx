"use client";

import { QrCode, ShieldCheck, Download, Printer, Share2, GraduationCap, MapPin, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function StudentIDCardPage() {
  const student = {
    name: "Aida Bekele",
    id: "S001",
    admissionNo: "ADM001",
    class: "Grade 10 - A",
    bloodGroup: "A+",
    expiryDate: "2025-06-30",
    avatar: "/avatars/aida.jpg",
  };

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
                Digital Identity <CreditCard className="h-8 w-8 text-brand-orange" />
            </h1>
            <p className="text-slate-500 font-medium italic">Secure digital credentials for campus access and library services.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 font-bold uppercase text-[10px] tracking-widest h-12">
                <Printer className="mr-2 h-4 w-4" /> Print Card
            </Button>
            <Button className="rounded-xl bg-brand-dark hover:bg-black font-black uppercase text-[10px] tracking-widest h-12 shadow-xl shadow-brand-dark/10">
                <Download className="mr-2 h-4 w-4" /> Download PKPASS
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
            {/* The ID Card Visual */}
            <div className="relative group perspective-1000">
                <div className="w-full aspect-[1.58/1] bg-gradient-to-br from-brand-dark via-slate-900 to-brand-dark rounded-[40px] shadow-2xl overflow-hidden p-10 flex flex-col justify-between border border-white/10 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full -ml-24 -mb-24 blur-3xl" />
                    
                    {/* Card Body */}
                    <div className="flex justify-between items-start z-10">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center p-2 shadow-inner">
                                    <img src="/logo.png" alt="School" className="h-full object-contain" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/50 tracking-[0.2em] uppercase leading-none">Global Academy</p>
                                    <p className="text-sm font-black text-white italic tracking-tighter uppercase">Studio School</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-[8px] font-black tracking-widest uppercase italic">STUDENT ACCESS</div>
                        </div>
                    </div>

                    <div className="flex gap-8 items-end z-10">
                        <Avatar className="h-32 w-32 rounded-3xl ring-4 ring-white/10 ring-offset-4 ring-offset-slate-900 shadow-2xl">
                            <AvatarImage src={student.avatar} className="object-cover" />
                            <AvatarFallback className="text-3xl font-black bg-brand-orange text-white">AB</AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-4 pb-2">
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-white/40 tracking-widest uppercase">Student Name</p>
                                <p className="text-3xl font-black text-white tracking-tighter italic uppercase truncate">{student.name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[8px] font-black text-white/40 tracking-widest uppercase">Roll Index</p>
                                    <p className="text-sm font-black text-emerald-400">{student.id}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-white/40 tracking-widest uppercase">Valid Period</p>
                                    <p className="text-sm font-black text-white">{student.expiryDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / QR Area */}
                    <div className="absolute right-10 bottom-10 flex flex-col items-end gap-2 text-right">
                        <div className="bg-white p-2 rounded-2xl shadow-xl hover:rotate-2 transition-transform cursor-pointer">
                            <QrCode className="h-16 w-16 text-slate-900" />
                        </div>
                        <p className="text-[7px] font-black text-white/30 tracking-[0.3em] uppercase">Scan for Verification</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Card Properties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PropertyRow icon={ShieldCheck} label="System Security" value="L3 Encrypted" />
                    <PropertyRow icon={MapPin} label="Access Zones" value="Full Campus + Labs" />
                    <PropertyRow icon={Calendar} label="Issued Date" value="Aug 15, 2024" />
                    <PropertyRow icon={GraduationCap} label="Academic Level" value={student.class} />
                </div>
            </div>

            <div className="bg-white rounded-[30px] p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-2xl">
                        <Share2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black tracking-tight uppercase italic text-slate-900">NFC Synchronization</h4>
                        <p className="text-xs text-slate-500 font-medium italic leading-none">Last synced 2 minutes ago</p>
                    </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">Link this digital ID with your smartphone's wallet to enjoy contactless entry at campus turnstiles and priority checkout in the cafeteria.</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pt-2 border-t border-slate-50">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Connection
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function PropertyRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-brand-orange/30 transition-colors">
            <Icon className="h-5 w-5 text-slate-400 group-hover:text-brand-orange transition-colors" />
            <div className="space-y-0.5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                <p className="text-sm font-black text-slate-900 italic tracking-tight">{value}</p>
            </div>
        </div>
    )
}
