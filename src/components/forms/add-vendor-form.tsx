
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
import { type Vendor } from "@/app/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Vendor name is required."),
  contactPerson: z.string().min(2, "Contact person is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required."),
});

type AddVendorFormValues = z.infer<typeof formSchema>;

interface AddVendorFormProps {
  onFormSubmit: (data: Omit<Vendor, 'vendorId'>) => void;
  initialData?: Vendor;
}

export function AddVendorForm({ onFormSubmit, initialData }: AddVendorFormProps) {
  const form = useForm<AddVendorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      contactPerson: initialData?.contactPerson || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
    },
  });

  function onSubmit(data: AddVendorFormValues) {
    onFormSubmit(data);
    toast({
      title: "Vendor Added",
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
              <FormLabel>Vendor/Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Acme Office Supplies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John Doe" {...field} />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="e.g. sales@acme.com" {...field} />
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
                <Input placeholder="e.g. +1 555-987-6543" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "Update Vendor" : "Add Vendor"}
        </Button>
      </form>
    </Form>
  );
}
