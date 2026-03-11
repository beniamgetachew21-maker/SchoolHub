
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type Student, type DisciplinaryRecord } from "@/app/lib/data";

const formSchema = z.object({
  studentId: z.string().min(1, "A student must be selected."),
  incident: z.string().min(5, "Incident description is required."),
  severity: z.enum(['Low', 'Medium', 'High']),
  actionTaken: z.string().min(2, "Action taken is required."),
  reportedBy: z.string().min(2, "Reporter's name is required."),
});

type AddDisciplinaryRecordFormValues = z.infer<typeof formSchema>;

interface AddDisciplinaryRecordFormProps {
  students: Student[];
  onFormSubmit: (data: Omit<DisciplinaryRecord, 'recordId' | 'date'>) => void;
}

export function AddDisciplinaryRecordForm({ students, onFormSubmit }: AddDisciplinaryRecordFormProps) {
  const form = useForm<AddDisciplinaryRecordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      incident: "",
      severity: "Low",
      actionTaken: "",
      reportedBy: "",
    },
  });

  function onSubmit(data: AddDisciplinaryRecordFormValues) {
    onFormSubmit(data);
    toast({
      title: "Incident Logged",
      description: `The disciplinary record has been successfully logged.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a student" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {students.map(student => (
                            <SelectItem key={student.studentId} value={student.studentId}>
                                {student.name} ({student.class})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incident"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incident Description</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Uniform violation, disruptive behavior in class." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Severity Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <FormField
          control={form.control}
          name="actionTaken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action Taken</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Verbal warning, detention." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reportedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reported By (Staff Name)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Mr. Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Log Incident
        </Button>
      </form>
    </Form>
  );
}
