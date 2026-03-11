
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
  name: z.string().min(3, "List name must be at least 3 characters long."),
});

type AddSubscriberListFormValues = z.infer<typeof formSchema>;

interface AddSubscriberListFormProps {
  onFormSubmit: (data: AddSubscriberListFormValues) => void;
}

export function AddSubscriberListForm({ onFormSubmit }: AddSubscriberListFormProps) {
  const form = useForm<AddSubscriberListFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: AddSubscriberListFormValues) {
    onFormSubmit(data);
    toast({
      title: "List Created",
      description: `The mailing list "${data.name}" has been created.`,
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
              <FormLabel>List Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Grade 12 Parents" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create List
        </Button>
      </form>
    </Form>
  );
}
