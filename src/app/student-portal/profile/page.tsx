"use client";

import { GraduationCap, Mail, MapPin, Calendar, Heart, Phone, Award, BookOpen, Clock, ShieldCheck, User, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function StudentProfilePage() {
  // Mock data for the student (Aida Bekele)
  const student = {
    name: "Aida Bekele",
    id: "S001",
    admissionNo: "ADM001",
    class: "Grade 10 - A",
    email: "aida.b@example.et",
    avatar: "/avatars/aida.jpg",
    status: "Active",
    dob: "2008-05-12",
    gender: "Female",
    address: "123 Maple Street, Addis Ababa",
    enrollmentDate: "2022-04-01",
    bloodGroup: "A+",
    emergencyContact: {
        name: "Lydia Bekele",
        relation: "Mother",
        phone: "+251-911-555-0110"
    },
    academicStats: {
        attendance: 94,
        gpa: 3.8,
        credits: 24,
        rank: "5th in Class"
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header Profile Section */}
      <section className="relative rounded-[40px] overflow-hidden bg-brand-dark shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 clip-path-slant" />
        <div className="p-10 lg:p-16 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <Avatar className="h-48 w-48 ring-8 ring-brand-orange/20 ring-offset-4 ring-offset-brand-dark shadow-2xl shadow-orange-500/20">
            <AvatarImage src={student.avatar} className="object-cover" />
            <AvatarFallback className="text-4xl font-black bg-brand-orange text-white">AB</AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left space-y-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">{student.name}</h1>
              <Badge className="bg-brand-orange text-white border-none py-1.5 px-4 font-black uppercase text-[10px] tracking-widest">
                {student.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-slate-300">
                <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-brand-orange" />
                    <span className="font-bold">{student.class}</span>
                </div>
                <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-brand-orange" />
                    <span className="font-bold">ID: {student.id}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-brand-orange" />
                    <span className="font-bold">{student.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-brand-orange" />
                    <span className="font-bold tracking-tighter uppercase text-xs">Enrolled: {student.enrollmentDate}</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Academic Overview */}
        <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <StatCard icon={Clock} value={`${student.academicStats.attendance}%`} label="Attendance" color="emerald" />
                <StatCard icon={Award} value={student.academicStats.gpa.toString()} label="Current GPA" color="orange" />
                <StatCard icon={BookOpen} value={student.academicStats.credits.toString()} label="Total Credits" color="blue" />
                <StatCard icon={Info} value={student.academicStats.rank} label="Global Rank" color="purple" />
            </div>

            <Card className="rounded-[30px] border-none shadow-xl bg-white overflow-hidden">
                <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
                        Academic Mastery Path
                    </CardTitle>
                    <Badge variant="outline" className="border-slate-200 text-slate-500">AY 2024/25</Badge>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <ProgressItem label="Mathematics & Logic" value={88} color="bg-brand-orange" />
                    <ProgressItem label="Natural Sciences" value={92} color="bg-brand-dark" />
                    <ProgressItem label="Social Studies" value={76} color="bg-emerald-500" />
                    <ProgressItem label="Languages (Amharic/English)" value={84} color="bg-blue-600" />
                </CardContent>
            </Card>
        </div>

        {/* Secondary Info Column */}
        <div className="space-y-10">
            <Card className="rounded-[30px] border-none shadow-xl bg-slate-50">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                    <InfoRow icon={MapPin} label="Residential Address" value={student.address} />
                    <InfoRow icon={Calendar} label="Date of Birth" value={student.dob} />
                    <InfoRow icon={Heart} label="Clinical Record" value={`Blood Type ${student.bloodGroup}`} />
                    <div className="pt-6 border-t border-slate-200 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emergency Protocol</p>
                        <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2">
                            <p className="font-bold text-slate-900">{student.emergencyContact.name}</p>
                            <p className="text-xs text-slate-500">{student.emergencyContact.relation}</p>
                            <div className="flex items-center gap-2 text-brand-orange font-bold pt-2">
                                <Phone className="h-4 w-4" />
                                <span>{student.emergencyContact.phone}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-brand-orange rounded-[30px] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-32 w-32" />
                </div>
                <h3 className="text-2xl font-black italic uppercase leading-none">Security & Access</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed text-slate-100">
                    Your portal access uses enterprise-grade encryption. Change your security key periodically to ensure data privacy.
                </p>
                <button className="w-full py-4 bg-white text-brand-orange font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-orange-950/20 active:scale-[0.98] transition-all">
                    Reset Security Key
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: any, value: string, label: string, color: string }) {
    const colors: Record<string, string> = {
        emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        orange: "bg-orange-50 text-orange-600 ring-orange-100",
        blue: "bg-blue-50 text-blue-600 ring-blue-100",
        purple: "bg-purple-50 text-purple-600 ring-purple-100"
    };

    return (
        <div className={`p-6 rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 flex flex-col items-center text-center space-y-2`}>
            <div className={`p-3 rounded-2xl ${colors[color].split(' ')[0]} ${colors[color].split(' ')[1]}`}>
                <Icon className="h-6 w-6" />
            </div>
            <p className="text-2xl font-black text-slate-900">{value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        </div>
    )
}

function ProgressItem({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className="font-bold text-slate-700 text-sm tracking-tight">{label}</span>
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{value}% Proficiency</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-[2px]">
                <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}

function InfoRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-400 group-hover:text-brand-orange transition-colors shadow-sm">
                <Icon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="text-sm font-bold text-slate-700 leading-tight">{value}</p>
            </div>
        </div>
    )
}
