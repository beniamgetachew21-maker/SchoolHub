
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import { type Assessment } from "@/app/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  type: z.enum(["Formative", "Summative", "Quiz", "Exam"]),
  subject: z.string().min(1, "Subject is required."),
  maxMarks: z.coerce.number().int().min(1, "Max marks must be at least 1."),
  date: z.date({ required_error: "A date is required." }),
});

type AddExaminationFormValues = z.infer<typeof formSchema>;

interface AddExaminationFormProps {
  onFormSubmit: (data: Omit<Assessment, 'assessmentId'>) => void;
}

export function AddExaminationForm({ onFormSubmit }: AddExaminationFormProps) {
  const form = useForm<AddExaminationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Exam",
      subject: "",
      maxMarks: 100,
    },
  });

  function onSubmit(data: AddExaminationFormValues) {
    const submissionData = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
    };
    onFormSubmit(submissionData);
    toast({
      title: "Examination Added",
      description: `${data.name} has been successfully created.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Examination Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Final Term Exam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Physics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Exam">Exam</SelectItem>
                        <SelectItem value="Summative">Summative</SelectItem>
                        <SelectItem value="Formative">Formative</SelectItem>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <FormField
          control={form.control}
          name="maxMarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Marks</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        )} />
        
        <Button type="submit" className="w-full">
          Add Examination
        </Button>
      </form>
    </Form>
  );
}
