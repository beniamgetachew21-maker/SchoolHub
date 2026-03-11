
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Student } from "@/app/lib/data";

const formSchema = z.object({
  studentId: z.string().min(1, "You must select a student to add."),
});

type AddSubscriberToListFormValues = z.infer<typeof formSchema>;

interface AddSubscriberToListFormProps {
  students: Student[];
  onFormSubmit: (studentId: string) => void;
}

export function AddSubscriberToListForm({ students, onFormSubmit }: AddSubscriberToListFormProps) {
  const form = useForm<AddSubscriberToListFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
    },
  });

  function onSubmit(data: AddSubscriberToListFormValues) {
    onFormSubmit(data.studentId);
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
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a student to add" /></SelectTrigger></FormControl>
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
        <Button type="submit" className="w-full" disabled={students.length === 0}>
          {students.length > 0 ? "Add to List" : "No students to add"}
        </Button>
      </form>
    </Form>
  );
}
