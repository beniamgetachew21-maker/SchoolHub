"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, School, User, CreditCard, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createTenantAction } from "@/lib/saas/tenant-actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2, "School name is too short"),
    domain: z.string().min(2, "Subdomain is too short").regex(/^[a-z0-9-]+$/, "Only lowercase, numbers and hyphens"),
    contactEmail: z.string().email("Invalid contact email"),
    adminName: z.string().min(2, "Admin name is too short"),
    adminEmail: z.string().email("Invalid admin email"),
});

const STEPS = [
    { id: "school", title: "Institutional Identity", icon: School },
    { id: "admin", title: "Primary Administrator", icon: User },
    { id: "confirm", title: "Final Review", icon: CheckCircle2 },
];

export function OnboardingWizard() {
    const [step, setStep] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            domain: "",
            contactEmail: "",
            adminName: "",
            adminEmail: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        const result = await createTenantAction(values);
        setIsSubmitting(false);

        if (result.success) {
            toast({
                title: "School Provisioned!",
                description: `${values.name} has been successfully created.`,
            });
            router.push(`/saas/tenants/${result.tenantId}`);
        } else {
            toast({
                title: "Onboarding Failed",
                description: result.error,
                variant: "destructive",
            });
        }
    }

    const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="space-y-8">
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between px-2">
                {STEPS.map((s, idx) => (
                    <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
                        <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                            step >= idx ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-white border-slate-200 text-slate-400"
                        )}>
                            <s.icon className="h-5 w-5" />
                        </div>
                        <span className={cn(
                            "text-[10px] font-bold uppercase tracking-tighter transition-colors",
                            step >= idx ? "text-emerald-700" : "text-slate-400"
                        )}>{s.title}</span>
                    </div>
                ))}
                {/* Connector Line */}
                <div className="absolute top-[148px] left-[calc(50%-180px)] right-[calc(50%-180px)] h-0.5 bg-slate-100 -z-1" />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card className="border-none shadow-xl shadow-slate-200/50 bg-white overflow-hidden rounded-3xl">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                            <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">{STEPS[step].title}</CardTitle>
                            <CardDescription className="text-slate-500 font-medium italic">Step {step + 1} of {STEPS.length}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            {step === 0 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold uppercase text-slate-500">Official School Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. British International School" className="rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="domain"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold uppercase text-slate-500">Subdomain Handle</FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Input placeholder="e.g. british-school" className="rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all font-mono text-sm" {...field} />
                                                    </FormControl>
                                                    <span className="text-slate-400 font-bold text-sm">.ethioedu.com</span>
                                                </div>
                                                <FormDescription className="text-[10px] italic">Unique URL used to access the portal.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contactEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold uppercase text-slate-500">Primary Contact Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="billing@school.com" className="rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                    <FormField
                                        control={form.control}
                                        name="adminName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold uppercase text-slate-500">Full Name of Director/Admin</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Dr. Samuel Ayele" className="rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="adminEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold uppercase text-slate-500">Administrative Login Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="admin@school.com" className="rounded-xl h-12 border-slate-200 bg-slate-50/50 focus:bg-white transition-all" {...field} />
                                                </FormControl>
                                                <FormDescription className="text-[10px] italic">This user will receive initial access to configure the workspace.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4 animate-in fade-in zoom-in-95">
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                                        <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                                            <School className="h-4 w-4 text-emerald-600" /> Institution
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-slate-400 text-[10px] font-bold uppercase">School Name</p>
                                                <p className="font-semibold">{form.getValues("name")}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-[10px] font-bold uppercase">Subdomain</p>
                                                <p className="font-semibold text-emerald-600 underline">{form.getValues("domain")}.ethioedu.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                                        <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                                            <User className="h-4 w-4 text-blue-600" /> Administrator
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-slate-400 text-[10px] font-bold uppercase">Principal</p>
                                                <p className="font-semibold">{form.getValues("adminName")}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-[10px] font-bold uppercase">Login Email</p>
                                                <p className="font-semibold">{form.getValues("adminEmail")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 p-8 border-t border-slate-100 flex justify-between rounded-b-3xl">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={step === 0 || isSubmitting}
                                className="rounded-xl px-8 h-12 font-bold transition-all"
                            >
                                Previous
                            </Button>
                            
                            {step < STEPS.length - 1 ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-slate-900 hover:bg-black text-white rounded-xl px-12 h-12 font-bold shadow-lg transition-all"
                                >
                                    Continue
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-12 h-12 font-bold shadow-lg shadow-emerald-200 transition-all"
                                >
                                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Provisioning...</> : "Complete Onboarding"}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
