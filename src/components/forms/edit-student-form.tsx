
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, parseISO } from "date-fns";
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
import { type Student } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  studentId: z.string(),
  admissionNumber: z.string(),
  avatarUrl: z.string().url(),
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  class: z.string().min(1, "Class is required."),
  parent: z.string().min(2, "Parent's name is required."),
  status: z.string(),
  dob: z.date().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  enrollmentDate: z.date().optional(),
  motherTongue: z.string().optional(),
  region: z.string().optional(),
  specialNeedsType: z.string().optional(),
  isRefugee: z.boolean().default(false),
});

type EditStudentFormValues = z.infer<typeof formSchema>;

interface EditStudentFormProps {
  student: Student;
  onFormSubmit: (data: Student) => void;
}

export function EditStudentForm({ student, onFormSubmit }: EditStudentFormProps) {
  const form = useForm<EditStudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...student,
      class: student.className, // map DB field
      dob: student.dob ? parseISO(student.dob) : undefined,
      gender: student.gender ?? "",
      address: student.address ?? "",
      enrollmentDate: student.enrollmentDate ? parseISO(student.enrollmentDate) : undefined,
      motherTongue: student.motherTongue ?? undefined,
      region: student.region ?? undefined,
      specialNeedsType: student.specialNeedsType ?? undefined,
    },
  });

  function onSubmit(data: EditStudentFormValues) {
    const submissionData = {
      ...student, // Preserve existing data not in the form
      ...data,
      dob: data.dob ? format(data.dob, "yyyy-MM-dd") : undefined,
      enrollmentDate: data.enrollmentDate ? format(data.enrollmentDate, "yyyy-MM-dd") : undefined,
    };
    onFormSubmit(submissionData as Student);
    toast({
      title: "Student Updated",
      description: `${data.name}\'s profile has been successfully updated.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian's Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. parent@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Grade 9 - A">Grade 9 - A</SelectItem>
                    <SelectItem value="Grade 10 - A">Grade 10 - A</SelectItem>
                    <SelectItem value="Grade 10 - B">Grade 10 - B</SelectItem>
                    <SelectItem value="Grade 11 - Science">
                      Grade 11 - Science
                    </SelectItem>
                    <SelectItem value="Grade 12 - Commerce">
                      Grade 12 - Commerce
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
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
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select Region" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                    <SelectItem value="Oromia">Oromia</SelectItem>
                    <SelectItem value="Amhara">Amhara</SelectItem>
                    <SelectItem value="Tigray">Tigray</SelectItem>
                    <SelectItem value="Sidama">Sidama</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isRefugee"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} className="h-4 w-4" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Refugee Status</FormLabel>
                  <p className="text-xs text-muted-foreground italic">Inclusive support tracking</p>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full md:w-auto">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
