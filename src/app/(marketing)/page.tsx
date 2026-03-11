"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  BookOpen,
  LineChart,
  ShieldCheck,
  Smartphone,
  Globe,
  Star,
  DollarSign,
  Briefcase,
  Library,
  Package,
  Bus,
  Megaphone,
  LayoutGrid,
  HeartPulse,
  Sparkles,
  Activity,
  HeartHandshake,
  CreditCard,
  Edit
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const appFeatures = [
  { icon: Users, title: "Student Information System", description: "Centralized student profiles, admissions, records, and disciplinary tracking." },
  { icon: BookOpen, title: "Academics Management", description: "Manage gradebooks, attendance, examinations, timetables, and class subjects." },
  { icon: DollarSign, title: "Finance & Payroll", description: "Handle fee collection, invoicing, expense tracking, and automated payroll generation." },
  { icon: Briefcase, title: "HR Management", description: "Full employee lifecycle management from recruitment and onboarding to leave." },
  { icon: Library, title: "Library Management", description: "Digital book catalog with streamlined borrowing, returns, and request management." },
  { icon: Package, title: "Inventory & Procurement", description: "Track all school assets, manage vendors, and process purchase orders." },
  { icon: Bus, title: "Transport & Hostel", description: "Oversee transport routes, vehicles, drivers, and manage hostel room allocations." },
  { icon: Megaphone, title: "Communication Suite", description: "Engage your community with announcements, newsletters, and targeted subscriber lists." },
  { icon: LayoutGrid, title: "User Portals", description: "Dedicated dashboards for Parents, Students, and Teachers to access relevant information." },
  { icon: HeartPulse, title: "Health & Wellness", description: "Track student medical records and log all visits to the school infirmary." },
  { icon: Sparkles, title: "AI-Powered Tools", description: "Leverage AI to automatically generate assessments, job descriptions, and verify documents." },
  { icon: Activity, title: "Extracurricular Activities", description: "Manage student clubs, events, and track achievements outside the classroom." },
  { icon: HeartHandshake, title: "Alumni & Community", description: "Keep graduates connected with a dedicated alumni directory, job board, and events page." },
  { icon: CreditCard, title: "ID Card Generation", description: "Design and print official ID cards for students, staff, and visitors on-demand." },
  { icon: Edit, title: "Customizable UI", description: "Tailor the interface to fit your institution's branding and workflow needs with a flexible theme." }
];

export default function LandingPage() {
  const tHero = useTranslations("Marketing.Hero");
  const tStakeholders = useTranslations("Marketing.Stakeholders");
  const tLanding = useTranslations("Marketing.Landing");
  const tNav = useTranslations("Marketing.Nav");

  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % appFeatures.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentFeature = appFeatures[currentFeatureIndex];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with darker overlay for text readability */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/brand-hero.png"
            alt="Students in a modern classroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8">
          <Badge className="bg-brand-orange hover:bg-brand-orange/90 text-white border-none px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
            {tHero("badge")}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            {tHero.rich("title", {
              spanTag: (chunks) => <span className="text-brand-orange">{chunks}</span>,
              br: () => <br className="hidden md:block" />
            })}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed">
            {tHero("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/request-demo">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg font-bold px-10 py-7 rounded-lg shadow-2xl h-auto transition-transform hover:scale-105 active:scale-95">
                {tHero("getDemo")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-bold px-10 py-7 rounded-lg h-auto transition-all">
                {tHero("explore")}
              </Button>
            </Link>
          </div>
        </div>


      </section>

      {/* Stakeholder Selection Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">{tStakeholders("title")}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{tStakeholders("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-2xl transition-all border-none bg-slate-50 group overflow-hidden">
              <div className="h-2 bg-brand-dark w-full" />
              <div className="p-8">
                <div className="bg-brand-light/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <ShieldCheck className="h-7 w-7 text-brand-dark" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{tStakeholders("admins")}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {tStakeholders("adminsDesc")}
                </p>
                <Link href="/request-demo" className="text-brand-dark font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {tStakeholders("adminsLink")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card className="hover:shadow-2xl transition-all border-none bg-slate-50 group overflow-hidden">
              <div className="h-2 bg-brand-orange w-full" />
              <div className="p-8">
                <div className="bg-brand-orange/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <BookOpen className="h-7 w-7 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{tStakeholders("educators")}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {tStakeholders("educatorsDesc")}
                </p>
                <Link href="/request-demo" className="text-brand-orange font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {tStakeholders("educatorsLink")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card className="hover:shadow-2xl transition-all border-none bg-brand-dark text-white group overflow-hidden">
              <div className="h-2 bg-brand-light w-full" />
              <div className="p-8">
                <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{tStakeholders("parents")}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {tStakeholders("parentsDesc")}
                </p>
                <Link href="/parents-students" className="text-brand-orange font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {tStakeholders("parentsLink")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="py-24 bg-slate-50 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 relative">
            <div className="absolute -left-12 -top-12 text-slate-200/50 -z-10">
              <Globe className="h-64 w-64" />
            </div>
            <Badge variant="outline" className="border-brand-light text-brand-dark font-bold uppercase tracking-widest px-4">{tLanding("platformBadge")}</Badge>
            <h2 className="text-5xl font-extrabold text-brand-dark leading-tight">
              {tLanding.rich("platformTitle", {
                br: () => <br />
              })}
            </h2>
            <div className="space-y-6">
              {[
                { icon: LineChart, color: "text-brand-light", key: "analytics" },
                { icon: Smartphone, color: "text-brand-orange", key: "mobile" },
                { icon: ShieldCheck, color: "text-emerald-500", key: "security" }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm h-fit">
                    <feat.icon className={`h-6 w-6 ${feat.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{tLanding(`${feat.key}Title`)}</h4>
                    <p className="text-slate-500 text-sm">{tLanding(`${feat.key}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/request-demo">
              <Button className="mt-4 bg-brand-dark hover:bg-brand-dark/90 text-white px-8 py-6 h-auto font-bold rounded-xl shadow-xl uppercase tracking-wider text-xs">
                {tLanding("platformLink")}
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-dark/20 to-brand-orange/20 rounded-3xl blur-3xl opacity-50 transition-all duration-1000" />
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 h-full flex flex-col justify-center min-h-[400px] overflow-hidden">
              {/* Background with overlay */}
              <div className="absolute inset-0 z-0 opacity-10">
                <Image
                  src="/school-hero.png"
                  alt="Background"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-brand-orange/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <Badge className="bg-brand-light/10 text-brand-dark border-brand-light/30 transition-all duration-500">
                    Application Features
                  </Badge>
                </div>

                <div
                  key={currentFeatureIndex}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-700 ease-out"
                >
                  <div className="h-24 w-24 bg-brand-light/10 rounded-2xl flex items-center justify-center text-brand-orange shadow-inner">
                    <currentFeature.icon className="h-12 w-12" />
                  </div>
                  <div className="space-y-4 max-w-sm">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {currentFeature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed min-h-[4.5rem]">
                      {currentFeature.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-8 flex-wrap max-w-xs mx-auto">
                {appFeatures.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentFeatureIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === currentFeatureIndex ? "w-6 bg-brand-orange" : "w-1.5 bg-slate-200 hover:bg-brand-light"
                      }`}
                    aria-label={`Go to feature ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-brand-dark text-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="flex justify-center gap-1 text-brand-orange mb-4">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="fill-current h-6 w-6" />)}
          </div>
          <h2 className="text-4xl italic font-light leading-relaxed">
            {tLanding.rich("testimonial", {
              spanTag: (chunks) => <span className="font-bold text-white uppercase not-italic">{chunks}</span>
            })}
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 border-2 border-white/20" />
            <p className="font-bold text-lg">{tLanding("testimonialAuthor")}</p>
            <p className="text-slate-300 text-sm uppercase tracking-widest font-semibold">{tLanding("testimonialRole")}</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-brand-light/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-5xl font-extrabold text-brand-dark">{tLanding("ctaTitle")}</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {tLanding("ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request-demo">
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-6 px-10 h-auto text-lg rounded-xl shadow-xl">
                {tLanding("ctaPrimary")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-slate-200 text-slate-600 font-bold py-6 px-10 h-auto text-lg rounded-xl">
                {tLanding("ctaSecondary")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-3xl border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
}
