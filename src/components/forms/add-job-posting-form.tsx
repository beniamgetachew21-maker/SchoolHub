
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
import { type JobPosting } from "@/app/lib/data";

const formSchema = z.object({
  title: z.string().min(2, "Position title is required."),
  company: z.string().min(2, "Company name is required."),
  location: z.string().min(2, "Location is required."),
  applyLink: z.string().url("Please enter a valid URL."),
});

type AddJobPostingFormValues = z.infer<typeof formSchema>;

interface AddJobPostingFormProps {
  onFormSubmit: (data: Omit<JobPosting, 'jobId' | 'postedDate'>) => void;
}

export function AddJobPostingForm({ onFormSubmit }: AddJobPostingFormProps) {
  const form = useForm<AddJobPostingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      applyLink: "",
    },
  });

  function onSubmit(data: AddJobPostingFormValues) {
    onFormSubmit(data);
    toast({
      title: "Job Posted",
      description: `The job "${data.title}" has been successfully posted.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Mountain View, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="applyLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Post Job
        </Button>
      </form>
    </Form>
  );
}
