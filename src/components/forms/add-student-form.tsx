"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { type Student } from "@/app/lib/data";

const formSchema = z.object({
  // Personal Details
  name: z.string().min(2, "Name must be at least 2 characters."),
  dob: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(["Male", "Female", "Other"]),
  
  // Contact & Guardian
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  parent: z.string().min(2, "Parent's name is required."),
  parentPhone: z.string().optional(),

  // Academic Info
  class: z.string().min(1, "Class is required."),
});

type AddStudentFormValues = z.infer<typeof formSchema>;

interface AddStudentFormProps {
  onFormSubmit: (data: Omit<Student, 'studentId' | 'admissionNumber' | 'status' | 'avatarUrl'>) => void;
}

const steps = [
  { id: 'personal', title: 'Personal Details', fields: ['name', 'dob', 'gender'] },
  { id: 'contact', title: 'Contact & Guardian', fields: ['email', 'phone', 'parent', 'parentPhone'] },
  { id: 'academic', title: 'Academic Information', fields: ['class'] },
]

export function AddStudentForm({ onFormSubmit }: AddStudentFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  
  const form = useForm<AddStudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      class: "",
      parent: "",
    },
  });

  async function processForm(data: AddStudentFormValues) {
    const { dob, gender, phone, parentPhone, ...submissionData } = data;
    onFormSubmit(submissionData as any); // The types are compatible
    toast({
      title: "Student Registered",
      description: `${data.name} has been successfully registered.`,
    });
  }

  const next = async () => {
    const fields = steps[currentStep].fields as (keyof AddStudentFormValues)[];
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


  return (
    <div className="py-6">
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm",
                            currentStep > index ? "bg-primary text-primary-foreground" : 
                            currentStep === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                           {currentStep > index ? '✔' : index + 1}
                        </div>
                        <p className={cn("text-xs mt-2", currentStep >= index ? "font-semibold" : "")}>{step.title}</p>
                    </div>
                     {index < steps.length - 1 && <div className="flex-1 h-px bg-border mx-4"></div>}
                </React.Fragment>
            ))}
        </div>


        <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            
            {/* Personal Details Step */}
            {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="dob" render={({ field }) => (
                         <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            )}

            {/* Contact & Guardian Step */}
            {currentStep === 1 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student's Email</FormLabel>
                            <FormControl><Input placeholder="e.g. john.doe@example.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student's Phone (Optional)</FormLabel>
                            <FormControl><Input placeholder="e.g. +1 123 456 7890" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="parent" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parent/Guardian's Name</FormLabel>
                            <FormControl><Input placeholder="e.g. Jane Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="parentPhone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parent/Guardian's Phone (Optional)</FormLabel>
                            <FormControl><Input placeholder="e.g. +1 987 654 3210" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            )}
            
            {/* Academic Info Step */}
            {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="class" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Class / Program</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a class" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                                    <SelectItem value="Grade 9 - A">Grade 9 - A</SelectItem>
                                    <SelectItem value="Grade 10 - A">Grade 10 - A</SelectItem>
                                    <SelectItem value="Grade 10 - B">Grade 10 - B</SelectItem>
                                    <SelectItem value="Grade 11 - Science">Grade 11 - Science</SelectItem>
                                    <SelectItem value="Grade 12 - Commerce">Grade 12 - Commerce</SelectItem>
                                    <SelectItem value="University - B.Sc. CompSci">University - B.Sc. CompSci</SelectItem>
                                    <SelectItem value="University - M.B.A.">University - M.B.A.</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
                {currentStep > 0 && <Button type="button" variant="outline" onClick={prev}>Previous</Button>}
                <div /> {/* Spacer */}
                {currentStep < steps.length - 1 && <Button type="button" onClick={next}>Next</Button>}
                {currentStep === steps.length - 1 && <Button type="submit">Register Student</Button>}
            </div>
        </form>
        </Form>
    </div>
  );
}
