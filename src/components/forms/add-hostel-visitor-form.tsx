
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type Student, type HostelVisitor } from "@/app/lib/data";

const formSchema = z.object({
  visitorName: z.string().min(2, "Visitor name is required."),
  studentId: z.string().min(1, "A student must be selected."),
});

type AddHostelVisitorFormValues = z.infer<typeof formSchema>;

interface AddHostelVisitorFormProps {
  students: Student[];
  onFormSubmit: (data: Omit<HostelVisitor, 'visitorId' | 'checkInTime' | 'checkOutTime' | 'status'>) => void;
}

export function AddHostelVisitorForm({ students, onFormSubmit }: AddHostelVisitorFormProps) {
  const form = useForm<AddHostelVisitorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visitorName: "",
      studentId: "",
    },
  });

  function onSubmit(data: AddHostelVisitorFormValues) {
    onFormSubmit(data);
    toast({
      title: "Visitor Logged",
      description: `${data.visitorName} has been checked in.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="visitorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visitor's Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Maria Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student to Visit</FormLabel>
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
        
        <Button type="submit" className="w-full">
          Check In Visitor
        </Button>
      </form>
    </Form>
  );
}
