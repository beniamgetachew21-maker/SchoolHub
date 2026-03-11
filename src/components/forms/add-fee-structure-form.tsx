
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash } from "lucide-react";

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
import { type FeeStructure } from "@/app/lib/data";

const feeItemSchema = z.object({
  name: z.string().min(1, "Item name is required."),
  amount: z.coerce.number().min(1, "Amount must be at least 1."),
});

const formSchema = z.object({
  name: z.string().min(2, "Structure name is required."),
  items: z.array(feeItemSchema).min(1, "At least one fee item is required."),
});

type AddFeeStructureFormValues = z.infer<typeof formSchema>;

interface AddFeeStructureFormProps {
  onFormSubmit: (data: Omit<FeeStructure, 'structureId'>) => void;
}

export function AddFeeStructureForm({ onFormSubmit }: AddFeeStructureFormProps) {
  const form = useForm<AddFeeStructureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      items: [{ name: "Tuition Fee", amount: 1000 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(data: AddFeeStructureFormValues) {
    onFormSubmit(data);
    toast({
      title: "Fee Structure Created",
      description: `The "${data.name}" structure has been successfully created.`,
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
              <FormLabel>Structure Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Grade 10 - Standard" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
            <FormLabel>Fee Items</FormLabel>
            <div className="space-y-4 mt-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-2 p-3 border rounded-lg">
                        <FormField
                            control={form.control}
                            name={`items.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="text-xs">Fee Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Tuition Fee" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`items.${index}.amount`}
                            render={({ field }) => (
                                <FormItem className="w-32">
                                     <FormLabel className="text-xs">Amount ($)</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={1} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ name: "", amount: 0 })}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
            </Button>
        </div>
        
        <Button type="submit" className="w-full">
          Create Fee Structure
        </Button>
      </form>
    </Form>
  );
}
