
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
import { type Candidate } from "@/app/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  position: z.string().min(1, "Position is required."),
});

type AddCandidateFormValues = z.infer<typeof formSchema>;

interface AddCandidateFormProps {
  positions: string[];
  onFormSubmit: (data: Omit<Candidate, 'candidateId' | 'stage' | 'appliedDate'>) => void;
}

export function AddCandidateForm({ positions, onFormSubmit }: AddCandidateFormProps) {
  const form = useForm<AddCandidateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
    },
  });

  function onSubmit(data: AddCandidateFormValues) {
    onFormSubmit(data);
    toast({
      title: "Candidate Added",
      description: `${data.name} has been successfully added to the pipeline.`,
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
            name="position"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Applying for Position</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a position" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {positions.map(pos => (
                            <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        
        <Button type="submit" className="w-full">
          Add Candidate
        </Button>
      </form>
    </Form>
  );
}
