
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { type InventoryItem, type MaintenanceLog } from "@/app/lib/data";

const formSchema = z.object({
  itemId: z.string().min(1, "An item must be selected."),
  type: z.enum(['Scheduled', 'Repair', 'Upgrade']),
  description: z.string().min(5, "Description must be at least 5 characters long."),
  cost: z.coerce.number().min(0, "Cost cannot be negative."),
});

type AddMaintenanceLogFormValues = z.infer<typeof formSchema>;

interface AddMaintenanceLogFormProps {
  items: InventoryItem[];
  onFormSubmit: (data: Omit<MaintenanceLog, 'logId' | 'date'>) => void;
}

export function AddMaintenanceLogForm({ items, onFormSubmit }: AddMaintenanceLogFormProps) {
  const form = useForm<AddMaintenanceLogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemId: "",
      type: "Repair",
      description: "",
      cost: 0,
    },
  });

  function onSubmit(data: AddMaintenanceLogFormValues) {
    onFormSubmit(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inventory Item</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select an item" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {items.map(item => (
                            <SelectItem key={item.itemId} value={item.itemId}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Maintenance Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Repair">Repair</SelectItem>
                        <SelectItem value="Upgrade">Upgrade</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description of Work</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Replaced faulty power supply." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Log Activity
        </Button>
      </form>
    </Form>
  );
}
