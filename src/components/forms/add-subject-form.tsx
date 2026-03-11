
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
  name: z.string().min(3, "Subject name must be at least 3 characters long."),
});

type AddSubjectFormValues = z.infer<typeof formSchema>;

interface AddSubjectFormProps {
  onFormSubmit: (data: AddSubjectFormValues) => void;
}

export function AddSubjectForm({ onFormSubmit }: AddSubjectFormProps) {
  const form = useForm<AddSubjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: AddSubjectFormValues) {
    onFormSubmit(data);
    toast({
      title: "Subject Created",
      description: `The subject "${data.name}" has been created.`,
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
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Geography" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Subject
        </Button>
      </form>
    </Form>
  );
}
