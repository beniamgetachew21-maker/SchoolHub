"use client";

import { Check, X, Shield, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PlansPage() {
    const plans = [
        {
            name: "Starter",
            icon: <Zap className="h-6 w-6 text-blue-600" />,
            description: "Essential tools for small private schools and KG centers.",
            price: "Contact Sales",
            features: [
                "Up to 250 Students",
                "Student Information System (SIS)",
                "Attendance Management",
                "Basic Grading & Report Cards",
                "Parent Communication App",
                "Single Campus Support",
                "Standard Email Support",
            ],
            notIncluded: [
                "Advanced Analytics",
                "Finance & Payroll Management",
                "Hostel & Transport Modules",
                "LMS & Online Quizzes",
                "Custom Grading Scales",
            ],
            cta: "START FREE TRIAL",
            highlight: false,
        },
        {
            name: "Growth",
            icon: <Shield className="h-6 w-6 text-red-600" />,
            description: "The complete solution for growing primary and secondary schools.",
            price: "Contact Sales",
            features: [
                "Up to 1,000 Students",
                "Everything in Starter",
                "Finance, Fees & Payroll",
                "LMS & Digital Learning",
                "Library & Hostel Management",
                "Transport & Bus Tracking",
                "Basic Analytics Dashboard",
                "Priority Support",
            ],
            notIncluded: [
                "Multi-Campus Hierarchy",
                "API & Custom Integrations",
                "Dedicated Account Manager",
            ],
            cta: "GET STARTED",
            highlight: true,
        },
        {
            name: "Enterprise",
            icon: <Crown className="h-6 w-6 text-yellow-600" />,
            description: "Unlimited power for Universities and Large School Districts.",
            price: "Contact Sales",
            features: [
                "Unlimited Students",
                "Everything in Growth",
                "Multi-Campus Management",
                "Advanced Global Analytics",
                "Custom Grading & Academics",
                "API Access & SSO Integration",
                "White-label Branding Options",
                "Dedicated Success Manager",
                "24/7 Premium Support",
            ],
            notIncluded: [],
            cta: "TALK TO EXPERT",
            highlight: false,
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header Section */}
            <section className="bg-[#004c8c] text-white py-24 px-6 text-center shadow-xl">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="text-5xl font-extrabold tracking-tight">Flexible Plans for Every <span className="text-red-400">Scale</span></h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        From single-room KG centers to nation-wide school districts, we have the features to power your mission.
                    </p>
                </div>
            </section>

            {/* Plans Comparison */}
            <section className="py-24 px-6 relative -mt-16 z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative bg-white rounded-[2.5rem] p-10 shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                ${plan.highlight ? "border-2 border-red-500 ring-4 ring-red-500/10" : "border border-slate-100"}
              `}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-10 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-2xl">
                                    {plan.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900">{plan.name}</h3>
                            </div>
                            <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed">
                                {plan.description}
                            </p>

                            <div className="mb-10">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pricing From</p>
                                <p className="text-4xl font-extrabold text-[#003366]">{plan.price}</p>
                            </div>

                            <div className="space-y-4 mb-12">
                                {plan.features.map((feat, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                                            <Check className="h-3 w-3 text-emerald-600 stroke-[3px]" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">{feat}</span>
                                    </div>
                                ))}
                                {plan.notIncluded.map((feat, index) => (
                                    <div key={index} className="flex items-start gap-3 opacity-40">
                                        <div className="bg-slate-100 rounded-full p-1 mt-0.5">
                                            <X className="h-3 w-3 text-slate-400 stroke-[3px]" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-500">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/request-demo" className="block">
                                <Button
                                    className={`w-full py-7 h-auto text-lg font-bold rounded-2xl shadow-xl transition-all
                    ${plan.highlight ? "bg-[#d9534f] hover:bg-[#c9302c] text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-900"}
                  `}
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Enterprise CTA Area */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-[#004c8c] rounded-[3rem] p-12 lg:p-20 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -ml-20 -mb-20" />

                    <h2 className="text-4xl font-bold">University or Large District?</h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Our enterprise solutions provide deep customization, legacy system migration, and regional data centers for maximum compliance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-white text-[#004c8c] hover:bg-slate-100 font-bold px-10 py-7 h-auto text-lg rounded-2xl">
                            CUSTOM QUOTE
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-10 py-7 h-auto text-lg rounded-2xl">
                            SSO INTEGRATION GUIDE
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
