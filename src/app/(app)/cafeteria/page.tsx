import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Utensils, QrCode, Clock, TrendingUp, Leaf, Flame,
    ChevronRight, Plus, Star, Users, Coffee, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mealPlan = {
    breakfast: { time: "7:30–9:00 AM", items: ["Firfir with Egg", "Bread & Butter", "Fresh Juice", "Ethiopian Tea (Chai)"], calories: "~520 kcal" },
    lunch: { time: "12:30–2:00 PM", items: ["Injera with Tibs", "Shiro Wot", "Mixed Salad", "Water / Juice"], calories: "~780 kcal" },
    dinner: { time: "6:30–8:00 PM", items: ["Rice & Chicken Stew", "Lentil Soup", "Bread", "Fresh Fruit"], calories: "~640 kcal" },
};

import { getCafeteriaMenuAction } from "@/lib/flow-actions";

export default async function CafeteriaPage() {
    const popularItems = await getCafeteriaMenuAction();
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">School Cafeteria</h1>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Daily meal planning, menu management & digital meal tokens.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest h-10 px-5">
                        <QrCode className="h-3.5 w-3.5 mr-1.5" /> Issue Token
                    </Button>
                    <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10 px-5">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Item
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Meals Served Today", value: "487", icon: Utensils, color: "text-emerald-600 bg-emerald-50" },
                    { label: "Active Menu Items", value: "42", icon: Coffee, color: "text-blue-600 bg-blue-50" },
                    { label: "Tokens Issued", value: "124", icon: QrCode, color: "text-purple-600 bg-purple-50" },
                    { label: "Avg. Satisfaction", value: "4.7★", icon: Star, color: "text-amber-600 bg-amber-50" },
                ].map((k) => (
                    <Card key={k.label} className="rounded-[2rem] border-transparent shadow-xl shadow-slate-200/50 bg-white">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={cn("p-3 rounded-xl shrink-0", k.color)}>
                                <k.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black tracking-tight text-slate-900">{k.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{k.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* LEFT: Popular Items */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-black text-xl uppercase tracking-tight text-slate-900 italic">Menu Highlights</h3>
                        <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#163D2D]">
                            Full Menu →
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {popularItems.map((item: any, i: number) => (
                            <Card key={i} className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/40 bg-white hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-[#163D2D] group-hover:text-white transition-all">
                                            {item.isVeg ? <Leaf className="h-5 w-5" /> : <Utensils className="h-5 w-5" />}
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <Badge className={cn("font-black text-[9px] uppercase tracking-widest border-none", item.tagColor)}>{item.tag}</Badge>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="text-xs font-black text-slate-900">{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="font-black text-base text-slate-900 group-hover:text-[#163D2D] transition-colors italic mb-1">{item.name}</h4>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{item.category}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div>
                                            <p className="text-xl font-black text-slate-900">ETB {item.price}</p>
                                            <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                                                <Users className="h-3 w-3" />
                                                <span className="text-[10px] font-bold">{item.orders} orders today</span>
                                            </div>
                                        </div>
                                        <Button size="sm" className="rounded-xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-[10px] uppercase tracking-widest h-8 px-4">
                                            Order
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Today's Meal Plan */}
                <div className="space-y-5">
                    {/* Today's Menu */}
                    <Card className="rounded-[2.5rem] border-transparent bg-[#163D2D] text-white shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl" />
                        <CardHeader className="p-7 pb-4 relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-2 flex items-center gap-2">
                                <Flame className="h-3.5 w-3.5" /> Today's Plan
                            </p>
                            <CardTitle className="font-black text-2xl text-white italic">Daily Menu</CardTitle>
                            <CardDescription className="text-white/50 text-xs font-medium">Thursday, March 13</CardDescription>
                        </CardHeader>
                        <CardContent className="px-7 pb-7 space-y-5 relative z-10">
                            {Object.entries(mealPlan).map(([meal, data]) => (
                                <div key={meal} className="p-5 rounded-2xl bg-white/10 border border-white/10">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-black text-sm uppercase tracking-widest text-white capitalize">{meal}</p>
                                        <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-300 uppercase tracking-widest">
                                            <Clock className="h-3 w-3" /> {data.time}
                                        </div>
                                    </div>
                                    <ul className="space-y-1.5">
                                        {data.items.map((item, i) => (
                                            <li key={i} className="text-[11px] font-medium text-white/70 flex items-center gap-2">
                                                <span className="h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3 text-[9px] font-black text-white/40 uppercase tracking-widest">{data.calories}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* QR Token Card */}
                    <Card className="rounded-[2.5rem] border-transparent shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                        <CardContent className="p-7 flex flex-col items-center text-center gap-4">
                            <div className="p-5 bg-slate-50 rounded-3xl">
                                <QrCode className="h-12 w-12 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 italic">Digital Meal Token</h4>
                                <p className="text-[11px] font-medium text-slate-400 mt-1">Generate QR-based meal access for students on prepaid or subsidized plans.</p>
                            </div>
                            <Button className="w-full rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-10">
                                <QrCode className="h-3.5 w-3.5 mr-1.5" /> Generate Token
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
