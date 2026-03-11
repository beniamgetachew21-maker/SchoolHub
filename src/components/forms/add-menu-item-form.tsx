
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type MenuItem } from "@/app/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  category: z.enum(['Main Course', 'Snacks', 'Beverage', 'Dessert']),
  price: z.coerce.number().min(0.01, "Price must be greater than 0."),
  isVegetarian: z.boolean().default(false),
});

type AddMenuItemFormValues = z.infer<typeof formSchema>;

interface AddMenuItemFormProps {
  onFormSubmit: (data: Omit<MenuItem, 'itemId' | 'allergens'>) => void;
}

export function AddMenuItemForm({ onFormSubmit }: AddMenuItemFormProps) {
  const form = useForm<AddMenuItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Snacks",
      price: 1.0,
      isVegetarian: false,
    },
  });

  function onSubmit(data: AddMenuItemFormValues) {
    onFormSubmit(data);
    toast({
      title: "Menu Item Added",
      description: `${data.name} has been successfully added to the menu.`,
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
                <Input placeholder="e.g. Vegetable Samosa" {...field} />
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
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                        <SelectItem value="Beverage">Beverage</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="isVegetarian"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Vegetarian
                </FormLabel>
                <FormDescription>
                  Check this box if the item is vegetarian.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Add Item
        </Button>
      </form>
    </Form>
  );
}
