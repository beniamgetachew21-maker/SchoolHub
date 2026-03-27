"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-[#004c8c] text-white py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight">Get In <span className="text-red-400">Touch</span></h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Have questions about EthioEdu? Our team is here to help you find the right solution for your institution.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                {[
                                    { icon: <Mail className="h-6 w-6 text-brand-orange" />, label: "Email Us", value: "hello@ethioedu.et", href: "mailto:hello@ethioedu.et" },
                                    { icon: <Phone className="h-6 w-6 text-brand-orange" />, label: "Call Us", value: "+251 911 234 567", href: "tel:+251911234567" },
                                    { icon: <MapPin className="h-6 w-6 text-brand-orange" />, label: "Visit Us", value: "Bole Road, Addis Ababa, Ethiopia", href: "#" },
                                    { icon: <Clock className="h-6 w-6 text-brand-orange" />, label: "Business Hours", value: "Mon – Fri: 8AM – 6PM (EAT)", href: "#" },
                                ].map((item, i) => (
                                    <a key={i} href={item.href} className="flex items-start gap-4 group">
                                        <div className="bg-white shadow-md rounded-2xl p-3 group-hover:shadow-orange-200 transition-shadow">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</div>
                                            <div className="text-slate-800 font-semibold mt-0.5">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#004c8c] rounded-3xl p-8 text-white space-y-4">
                            <GraduationCap className="h-10 w-10 text-brand-orange" />
                            <h3 className="text-2xl font-bold">Want a Live Demo?</h3>
                            <p className="text-blue-200 text-sm leading-relaxed">
                                See EthioEdu in action with a personalized walkthrough for your team.
                            </p>
                            <Link href="/request-demo">
                                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold mt-2 w-full py-6 h-auto rounded-2xl">
                                    Schedule a Demo
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                                <div className="bg-emerald-100 rounded-full p-6">
                                    <Send className="h-12 w-12 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                                <p className="text-slate-500">Thank you for reaching out. We'll get back to you within one business day.</p>
                                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">Send Another Message</Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 block mb-1">First Name</label>
                                        <input type="text" placeholder="Abebe" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 block mb-1">Last Name</label>
                                        <input type="text" placeholder="Bikila" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1">Email</label>
                                    <input type="email" placeholder="you@school.edu.et" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1">Institution</label>
                                    <input type="text" placeholder="School or Organization Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1">Message</label>
                                    <textarea rows={4} placeholder="How can we help you?" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-orange transition resize-none" />
                                </div>
                                <Button
                                    onClick={() => setSubmitted(true)}
                                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-6 h-auto rounded-2xl text-lg"
                                >
                                    <Send className="mr-2 h-5 w-5" /> Send Message
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
