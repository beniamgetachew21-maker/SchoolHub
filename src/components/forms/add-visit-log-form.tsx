
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
import { type Student, type InfirmaryVisit } from "@/app/lib/data";

const formSchema = z.object({
  studentId: z.string().min(1, "A student must be selected."),
  reason: z.string().min(2, "Reason for visit is required."),
  treatment: z.string().min(2, "Treatment given is required."),
  notes: z.string().optional(),
});

type AddVisitLogFormValues = z.infer<typeof formSchema>;

interface AddVisitLogFormProps {
  students: Student[];
  onFormSubmit: (data: Omit<InfirmaryVisit, 'visitId' | 'date'>) => void;
}

export function AddVisitLogForm({ students, onFormSubmit }: AddVisitLogFormProps) {
  const form = useForm<AddVisitLogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      reason: "",
      treatment: "",
      notes: "",
    },
  });

  function onSubmit(data: AddVisitLogFormValues) {
    onFormSubmit(data as any);
    toast({
      title: "Visit Logged",
      description: `The infirmary visit has been successfully logged.`,
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
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Headache, scraped knee" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="treatment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Treatment Given</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Gave Paracetamol, cleaned wound" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. Advised to rest, monitored for 30 mins" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Log Visit
        </Button>
      </form>
    </Form>
  );
}
