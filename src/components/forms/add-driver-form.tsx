
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
import { type Driver } from "@/app/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  licenseNumber: z.string().min(1, "License number is required."),
  phone: z.string().min(1, "Phone number is required."),
});

type AddDriverFormValues = z.infer<typeof formSchema>;

interface AddDriverFormProps {
  onFormSubmit: (data: Omit<Driver, 'driverId' | 'status'>) => void;
}

export function AddDriverForm({ onFormSubmit }: AddDriverFormProps) {
  const form = useForm<AddDriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      licenseNumber: "",
      phone: "",
    },
  });

  function onSubmit(data: AddDriverFormValues) {
    onFormSubmit(data);
    toast({
      title: "Driver Added",
      description: `${data.name} has been successfully added.`,
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
                <Input placeholder="e.g. John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. DL123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. +1 555-123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Driver
        </Button>
      </form>
    </Form>
  );
}
