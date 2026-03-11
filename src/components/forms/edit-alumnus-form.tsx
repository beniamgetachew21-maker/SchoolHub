
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
import { type Alumni } from "@/app/lib/data";

const formSchema = z.object({
  alumniId: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters."),
  graduationYear: z.coerce.number().int().min(1900).max(new Date().getFullYear(), "Invalid year."),
  major: z.string().min(2, "Major is required."),
  currentCompany: z.string().min(1, "Company is required."),
  currentPosition: z.string().min(1, "Position is required."),
  email: z.string().email(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  avatarUrl: z.string().url(),
});

type EditAlumnusFormValues = z.infer<typeof formSchema>;

interface EditAlumnusFormProps {
  alumnus: Alumni;
  onFormSubmit: (data: EditAlumnusFormValues) => void;
}

export function EditAlumnusForm({ alumnus, onFormSubmit }: EditAlumnusFormProps) {
  const form = useForm<EditAlumnusFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: alumnus,
  });

  function onSubmit(data: EditAlumnusFormValues) {
    onFormSubmit(data);
    toast({
      title: "Alumnus Updated",
      description: `${data.name}'s profile has been successfully updated.`,
    });
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
                <Input {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
