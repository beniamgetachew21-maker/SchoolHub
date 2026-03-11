
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
import { toast } from "@/hooks/use-toast";
import { type LeavePolicy } from "@/app/lib/data";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Policy name must be at least 3 characters long."),
  days: z.coerce.number().int().min(0, "Days must be a positive number."),
  description: z.string().min(1, "Description is required."),
});

type LeavePolicyFormValues = z.infer<typeof formSchema>;

interface LeavePolicyFormProps {
  policy?: LeavePolicy;
  onFormSubmit: (data: any) => void;
}

export function LeavePolicyForm({ policy, onFormSubmit }: LeavePolicyFormProps) {
  const form = useForm<LeavePolicyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: policy || {
      name: "",
      days: 0,
      description: "",
    },
  });

  function onSubmit(data: LeavePolicyFormValues) {
    onFormSubmit(data);
    toast({
      title: policy ? "Policy Updated" : "Policy Created",
      description: `The leave policy "${data.name}" has been saved.`,
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
              <FormLabel>Policy Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Annual Leave" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Days per Year</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
                <Textarea placeholder="Describe the policy rules..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {policy ? 'Save Changes' : 'Create Policy'}
        </Button>
      </form>
    </Form>
  );
}
