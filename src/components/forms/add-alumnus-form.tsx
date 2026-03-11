
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
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  graduationYear: z.coerce.number().int().min(1900).max(new Date().getFullYear(), "Invalid year."),
  major: z.string().min(2, "Major is required."),
  currentCompany: z.string().min(1, "Company is required."),
  currentPosition: z.string().min(1, "Position is required."),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
});

type AddAlumnusFormValues = z.infer<typeof formSchema>;

interface AddAlumnusFormProps {
  onFormSubmit: (data: AddAlumnusFormValues) => void;
}

export function AddAlumnusForm({ onFormSubmit }: AddAlumnusFormProps) {
  const form = useForm<AddAlumnusFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      graduationYear: new Date().getFullYear(),
      major: "",
      currentCompany: "",
      currentPosition: "",
      linkedinUrl: "",
    },
  });

  function onSubmit(data: AddAlumnusFormValues) {
    onFormSubmit(data);
    toast({
      title: "Alumnus Added",
      description: `${data.name} has been successfully added to the directory.`,
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
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graduation Year</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major / Field of Study</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="currentCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Position</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Alumnus
        </Button>
      </form>
    </Form>
  );
}
