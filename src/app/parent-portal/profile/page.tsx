"use client";

import { User, Mail, Phone, MapPin, ShieldCheck, CreditCard, Users, Heart, Bell, Briefcase, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ParentProfilePage() {
  // Mock data for the parent (Ato Bekele Abiy)
  const parent = {
    name: "Ato Bekele Abiy",
    email: "bekele.abiy@example.com",
    phone: "+251-911-223344",
    address: "Bole Sub-city, Woreda 03, Addis Ababa",
    avatar: "/avatars/abiy.jpg",
    occupation: "Senior Engineer",
    nationality: "Ethiopian",
    emergencyContact: true,
    linkedStudents: [
      { name: "Aida Bekele", id: "S001", class: "Grade 10 - A", avatar: "/avatars/aida.jpg" },
      { name: "Abiy Bekele", id: "S002", class: "Grade 8 - B", avatar: "/avatars/bekele.jpg" }
    ]
  };

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header Profile Section */}
      <section className="relative rounded-[40px] overflow-hidden bg-brand-dark shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/10 clip-path-slant" />
        <div className="p-10 lg:p-16 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <Avatar className="h-44 w-44 ring-8 ring-brand-orange/20 ring-offset-4 ring-offset-brand-dark shadow-2xl">
            <AvatarImage src={parent.avatar} className="object-cover" />
            <AvatarFallback className="text-4xl font-black bg-brand-orange text-white">BA</AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left space-y-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">{parent.name}</h1>
              <Badge className="bg-emerald-500 text-white border-none py-1.5 px-4 font-black uppercase text-[10px] tracking-widest">
                VERIFIED PARENT
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-slate-300">
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-brand-orange" />
                    <span className="font-bold">{parent.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-brand-orange" />
                    <span className="font-bold">{parent.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-brand-orange" />
                    <span className="font-semibold">{parent.occupation}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-brand-orange" />
                    <span className="font-semibold">{parent.nationality}</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Linked Students Section */}
        <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 border-l-8 border-brand-orange pl-6">Linked Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {parent.linkedStudents.map((child) => (
                    <Card key={child.id} className="rounded-[30px] border-none shadow-xl hover:scale-[1.02] transition-transform overflow-hidden group">
                        <div className="h-2 bg-brand-orange w-full" />
                        <CardContent className="p-8 flex items-center gap-6">
                            <Avatar className="h-20 w-20 rounded-2xl shadow-lg ring-2 ring-slate-100">
                                <AvatarImage src={child.avatar} className="object-cover" />
                                <AvatarFallback className="font-black bg-slate-100 text-slate-400">{child.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-900 uppercase italic leading-none">{child.name}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{child.class}</p>
                                <div className="pt-2">
                                    <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-none font-bold text-[8px] uppercase tracking-[0.2em]">ID: {child.id}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="rounded-[40px] border-none shadow-xl bg-slate-50 overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">Account Preferences</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-8">
                    <PreferenceItem icon={Bell} title="Instutional Alerts" desc="Receive real-time push notifications for grade updates and emergencies." active={true} />
                    <PreferenceItem icon={CreditCard} title="Automatic Billing" desc="Enable seamless fee payments via linked commercial bank accounts." active={false} />
                    <PreferenceItem icon={Heart} title="Medical Consent" desc="Allow school infirmary to access digital medical records for linked children." active={true} />
                </CardContent>
            </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-10">
            <Card className="rounded-[30px] border-none shadow-xl bg-white border border-slate-100">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter">Contact Registry</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-slate-50 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <MapPin className="h-3 w-3" /> Home Address
                            </p>
                            <p className="text-sm font-bold text-slate-700 leading-relaxed">{parent.address}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <ShieldCheck className="h-3 w-3" /> Digital Identity
                            </p>
                            <p className="text-sm font-bold text-slate-700">PA-992-001X</p>
                        </div>
                    </div>
                    
                    <button className="w-full py-5 bg-brand-dark text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-brand-dark/20 hover:bg-black transition-all active:scale-95">
                        UPDATE CONTACT INFO
                    </button>
                </CardContent>
            </Card>

            <div className="bg-brand-orange rounded-[40px] p-10 text-white space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:rotate-12 transition-transform">
                    <Users className="h-40 w-40" />
                </div>
                <h3 className="text-3xl font-black italic uppercase italic leading-none">Family Hub</h3>
                <p className="text-sm font-medium opacity-90 leading-relaxed text-slate-100">
                    Connect additional family members or guardians to your children's profiles for collaborative monitoring and notification management.
                </p>
                <button className="w-full py-4 bg-white text-brand-orange font-black rounded-xl text-xs uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all">
                    ADD GUARDIAN
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function PreferenceItem({ icon: Icon, title, desc, active }: { icon: any, title: string, desc: string, active: boolean }) {
    return (
        <div className="flex items-center justify-between gap-6 p-6 rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 group">
            <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl ${active ? 'bg-brand-orange/10 text-brand-orange' : 'bg-slate-100 text-slate-400'} transition-colors`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                    <h4 className="text-lg font-black tracking-tight uppercase italic text-slate-900">{title}</h4>
                    <p className="text-xs text-slate-500 font-medium italic leading-relaxed max-w-md">{desc}</p>
                </div>
            </div>
            <div className={`h-8 w-14 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-brand-orange' : 'bg-slate-200'}`}>
                <div className={`h-6 w-6 rounded-full bg-white shadow-md transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
        </div>
    )
}
