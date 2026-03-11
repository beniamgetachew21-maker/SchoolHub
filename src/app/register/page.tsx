
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { submitApplicationAction } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
    // Personal Details
    name: z.string().min(2, "Full legal name is required."),
    dob: z.date({ required_error: "Date of birth is required." }),
    gender: z.enum(["Male", "Female", "Other"], { required_error: "Please select a gender." }),

    // Contact & Guardian
    email: z.string().email("A valid email is required for communication."),
    phone: z.string().min(1, "Contact number is crucial."),
    address: z.string().min(1, "Residential address is required."),
    parent: z.string().min(2, "Parent or guardian name is required."),
    parentPhone: z.string().min(1, "Guardian's phone number is required."),

    // Academic Info
    class: z.string({ required_error: "Select the intended class or program." }).min(1, "Select a class."),

    // Documents (simplified for demo as we don't have a file upload service yet)
    birthCertificate: z.any().optional(),
    previousMarksheet: z.any().optional(),
});

type RegistrationFormValues = z.infer<typeof formSchema>;

const steps = [
    { id: 'personal', title: 'Identity', fields: ['name', 'dob', 'gender'] },
    { id: 'contact', title: 'Connectivity', fields: ['email', 'phone', 'address', 'parent', 'parentPhone'] },
    { id: 'academic', title: 'Academic', fields: ['class'] },
    { id: 'documents', title: 'Documents', fields: ['birthCertificate', 'previousMarksheet'] },
]

export default function RegistrationPage() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [applicationId, setApplicationId] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<RegistrationFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            dob: undefined,
            gender: undefined,
            email: "",
            phone: "",
            address: "",
            parent: "",
            parentPhone: "",
            class: "",
        },
    });

    async function processForm(values: RegistrationFormValues) {
        setIsSubmitting(true);
        try {
            const result = await submitApplicationAction({
                ...values,
                className: values.class, // Map class to className in DB
            });
            if (result.success) {
                setApplicationId(result.applicationId);
                setIsSubmitted(true);
                toast({
                    title: "Application Received",
                    description: "Your registration has been successfully logged in our system.",
                });
            }
        } catch (error) {
            console.error("Submission failed:", error);
            toast({
                title: "Submission Error",
                description: "There was a technical issue processing your request. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const next = async () => {
        const fields = steps[currentStep].fields as (keyof RegistrationFormValues)[];
        const output = await form.trigger(fields, { shouldFocus: true });
        if (output) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(step => step + 1);
            }
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-muted/30">
                <Card className="max-w-2xl w-full glass-card shadow-2xl overflow-hidden border-t-8 border-t-emerald-500 animate-in zoom-in-95 duration-500">
                    <CardHeader className="text-center pt-10">
                        <div className="mx-auto w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center animate-pulse">
                            <CheckCircle className="h-12 w-12 text-emerald-600" />
                        </div>
                        <CardTitle className="text-4xl font-black font-headline mt-6 tracking-tighter">Gateway to Excellence</CardTitle>
                        <CardDescription className="text-lg mt-2 font-medium">
                            Your academic Odyssey begins here. Your application is being processed by our elite faculty.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pb-10 space-y-6">
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900 mx-auto w-fit">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Application Identifier</p>
                            <p className="text-3xl font-mono text-emerald-700 dark:text-emerald-400 font-bold tracking-widest">{applicationId}</p>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto italic">
                            An confirmation directive has been dispatched to your provided contact coordinates.
                            Please monitor your portal for assessment and interview directives.
                        </p>
                        <div className="pt-4">
                            <Button asChild size="lg" className="emerald-gradient text-white font-bold px-10 shadow-lg shadow-emerald-500/20">
                                <a href="/">Return to Institutional Portal</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-6 bg-muted/20">
            <div className="max-w-4xl mx-auto space-y-6 mb-12">
                <div className="flex flex-col gap-2 items-center text-center">
                    <h1 className="text-5xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">Global Scholars Enrollment</h1>
                    <p className="text-muted-foreground max-w-lg">Initiate your path towards a transformative educational experience at our prestigious campus.</p>
                </div>
            </div>

            <Card className="max-w-3xl mx-auto glass-card shadow-2xl border-border/30 overflow-hidden mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="h-2 emerald-gradient" />
                <CardHeader className="pb-10 pt-10 border-b border-border/10 bg-muted/5">
                    <CardTitle className="font-headline text-3xl font-black tracking-tighter">Registration Protocol</CardTitle>
                    <CardDescription className="text-base">Please fulfill all institutional mandates to facilitate your formal application.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-12">
                    {/* Enhanced Stepper */}
                    <div className="flex justify-between items-start mb-16 relative">
                        {/* Background line */}
                        <div className="absolute top-5 left-10 right-10 h-0.5 bg-muted/50 -z-10" />

                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center text-center w-24 relative group">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ring-4 ring-background shadow-xl",
                                    currentStep > index ? "bg-emerald-500 text-white shadow-emerald-500/20" :
                                        currentStep === index ? "emerald-gradient text-white animate-pulse" : "bg-muted text-muted-foreground"
                                )}>
                                    {currentStep > index ? '✔' : index + 1}
                                </div>
                                <p className={cn("text-[10px] mt-3 uppercase tracking-widest font-bold transition-colors duration-300",
                                    currentStep >= index ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground")}>
                                    {step.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(processForm)} className="space-y-10">

                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                {/* Personal Details Step */}
                                {currentStep === 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Candidate Full Designation</FormLabel>
                                                <FormControl><Input placeholder="Legal name as per passport" className="h-12 bg-muted/20 border-border/50 focus:border-emerald-500 transition-all" {...field} /></FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="dob" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Chronological Origin</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={"outline"} className={cn("w-full h-12 pl-3 text-left font-normal bg-muted/20 border-border/50", !field.value && "text-muted-foreground")}>
                                                                {field.value ? format(field.value, "PPP") : <span>Date of Birth</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 border-border/50 shadow-2xl" align="start">
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="gender" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Gender Identification</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl><SelectTrigger className="h-12 bg-muted/20 border-border/50"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}

                                {/* Contact & Guardian Step */}
                                {currentStep === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Primary Communication Channel</FormLabel>
                                                <FormControl><Input type="email" placeholder="email@address.center" className="h-12 bg-muted/20 border-border/50" {...field} /></FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Direct Vocal Link</FormLabel>
                                                <FormControl><Input placeholder="+251 9XX XXX XXX" className="h-12 bg-muted/20 border-border/50" {...field} /></FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="address" render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Geospatial Residence Coordinates</FormLabel>
                                                <FormControl><Input placeholder="Street, City, Zone" className="h-12 bg-muted/20 border-border/50" {...field} /></FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="parent" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Guardian/Executive Sponsor</FormLabel>
                                                <FormControl><Input placeholder="Guardian Full Name" className="h-12 bg-muted/20 border-border/50" {...field} /></FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="parentPhone" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Sponsor Vocal Link</FormLabel>
                                                <FormControl><Input placeholder="+251 9XX XXX XXX" className="h-12 bg-muted/20 border-border/50" {...field} /></FormControl>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}

                                {/* Academic Info Step */}
                                {currentStep === 2 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="class" render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Intended Academic Tier</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl><SelectTrigger className="h-14 bg-emerald-500/5 border-emerald-500/30 text-emerald-900 dark:text-emerald-100 font-bold"><SelectValue placeholder="Select Achievement Class" /></SelectTrigger></FormControl>
                                                    <SelectContent className="max-h-80 shadow-2xl border-border/50">
                                                        <SelectItem value="Kindergarten" className="font-bold">Kindergarten</SelectItem>
                                                        <SelectItem value="Grade 1-8" className="font-bold">Primary Academy (1-8)</SelectItem>
                                                        <SelectItem value="Grade 9" className="font-bold">Secondary Hub (9)</SelectItem>
                                                        <SelectItem value="Grade 10" className="font-bold">Secondary Hub (10)</SelectItem>
                                                        <SelectItem value="Grade 11" className="font-bold">Advanced Academy (11)</SelectItem>
                                                        <SelectItem value="Grade 12" className="font-bold">Advanced Academy (12)</SelectItem>
                                                        <SelectItem value="University - B.Sc. CompSci" className="font-bold">Univ - B.Sc. Applied Computing</SelectItem>
                                                        <SelectItem value="University - M.B.A." className="font-bold">Univ - Masters in Administration</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription className="text-[10px] mt-2 italic">Ensure your selected tier aligns with your previous academic credentials.</FormDescription>
                                                <FormMessage className="text-[10px] font-bold" />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}

                                {/* Document Upload Step (Placeholder UI for now) */}
                                {currentStep === 3 && (
                                    <div className="p-8 border-2 border-dashed border-emerald-500/20 rounded-3xl bg-emerald-500/[0.02] flex flex-col items-center justify-center text-center gap-4">
                                        <div className="p-5 bg-emerald-500/10 rounded-2xl">
                                            <CheckCircle className="h-10 w-10 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl tracking-tighter">Document Verification Readiness</p>
                                            <p className="text-sm text-muted-foreground mt-1">Please ensure scanned duplicates of your Birth Certificate and Academic Transcripts are available. You will be prompted to transmit these upon initial review.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-8 items-center">
                                {currentStep > 0 ? (
                                    <Button type="button" variant="ghost" onClick={prev} className="font-bold text-muted-foreground hover:text-emerald-600 transition-colors">
                                        ← Internal Phase
                                    </Button>
                                ) : <div />}

                                {currentStep < steps.length - 1 ? (
                                    <Button type="button" onClick={next} className="emerald-gradient text-white font-bold h-14 px-10 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">
                                        Progress Protocol →
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={isSubmitting} className="emerald-gradient text-white font-black h-16 px-12 shadow-2xl shadow-emerald-600/30 hover:scale-105 transition-all group">
                                        {isSubmitting ? "TRANSMITTING..." : "FINALIZE ENROLLMENT PROTOCOL"}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black pb-20 opacity-50">
                Institutional Secure Registration Infrastructure © 2024
            </div>
        </div>
    )
}
