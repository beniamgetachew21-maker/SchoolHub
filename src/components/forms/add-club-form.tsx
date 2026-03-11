
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
import { type Employee, type Club } from "@/app/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Club name is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  facultyAdvisorId: z.string().min(1, "A faculty advisor must be selected."),
});

type AddClubFormValues = z.infer<typeof formSchema>;

interface AddClubFormProps {
  teachers: Employee[];
  onFormSubmit: (data: Omit<Club, 'clubId' | 'memberCount' | 'imageUrl' | 'imageHint'>) => void;
}

export function AddClubForm({ teachers, onFormSubmit }: AddClubFormProps) {
  const form = useForm<AddClubFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      facultyAdvisorId: "",
    },
  });

  function onSubmit(data: AddClubFormValues) {
    onFormSubmit(data);
    toast({
      title: "Club Created",
      description: `The ${data.name} has been successfully created.`,
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
              <FormLabel>Club Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Science Club" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description of the club's activities and goals." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facultyAdvisorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty Advisor</FormLabel>
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
          Create Club
        </Button>
      </form>
    </Form>
  );
}
