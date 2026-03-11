
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
import { type Employee, type ClassSection } from "@/app/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Class name must be at least 2 characters."),
  classTeacherId: z.string().min(1, "A class teacher must be selected."),
});

type AddClassFormValues = z.infer<typeof formSchema>;

interface AddClassFormProps {
  teachers: Employee[];
  onFormSubmit: (data: Omit<ClassSection, 'classId' | 'studentCount' | 'subjectCount'>) => void;
}

export function AddClassForm({ teachers, onFormSubmit }: AddClassFormProps) {
  const form = useForm<AddClassFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      classTeacherId: "",
    },
  });

  function onSubmit(data: AddClassFormValues) {
    onFormSubmit(data);
    toast({
      title: "Class Added",
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
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Grade 10 - C" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classTeacherId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Teacher</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a teacher" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {teachers.map(teacher => (
                            <SelectItem key={teacher.employeeId} value={teacher.employeeId}>
                                {teacher.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Add Class
        </Button>
      </form>
    </Form>
  );
}
