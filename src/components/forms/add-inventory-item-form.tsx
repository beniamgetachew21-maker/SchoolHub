
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import { type InventoryItem } from "@/app/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Item name is required."),
  category: z.enum(['Office Supplies', 'Lab Equipment', 'Sports Gear', 'Electronics', 'Furniture', 'Uniform']),
  quantity: z.coerce.number().int().min(0, "Quantity cannot be negative."),
  purchasePrice: z.coerce.number().optional(),
  purchaseDate: z.date().optional(),
});

type AddInventoryItemFormValues = z.infer<typeof formSchema>;

interface AddInventoryItemFormProps {
  onFormSubmit: (data: Omit<InventoryItem, 'itemId' | 'status' | 'isForSale'>) => void;
}

export function AddInventoryItemForm({ onFormSubmit }: AddInventoryItemFormProps) {
  const form = useForm<AddInventoryItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Office Supplies",
      quantity: 1,
      purchasePrice: 0,
    },
  });

  function onSubmit(data: AddInventoryItemFormValues) {
    const submissionData = {
        ...data,
        purchaseDate: data.purchaseDate ? format(data.purchaseDate, "yyyy-MM-dd") : undefined,
    }
    onFormSubmit(submissionData);
    toast({
      title: "Item Added",
      description: `${data.name} has been successfully added to the inventory.`,
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
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. A4 Paper Ream" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                        <SelectItem value="Lab Equipment">Lab Equipment</SelectItem>
                        <SelectItem value="Sports Gear">Sports Gear</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Uniform">Uniform</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Quantity</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price (per item)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Purchase Date</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        )} />
        
        <Button type="submit" className="w-full">
          Add Item to Inventory
        </Button>
      </form>
    </Form>
  );
}
