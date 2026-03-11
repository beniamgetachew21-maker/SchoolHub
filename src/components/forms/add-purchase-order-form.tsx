
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type Vendor, type InventoryItem, type PurchaseOrder } from "@/app/lib/data";

const orderItemSchema = z.object({
  itemId: z.string().min(1, "Item is required."),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1."),
  unitPrice: z.coerce.number().min(0, "Unit price must be 0 or greater."),
});

const formSchema = z.object({
  vendorId: z.string().min(1, "A vendor must be selected."),
  items: z.array(orderItemSchema).min(1, "At least one item is required."),
});

type AddPurchaseOrderFormValues = z.infer<typeof formSchema>;

interface AddPurchaseOrderFormProps {
  vendors: Vendor[];
  items: InventoryItem[];
  onFormSubmit: (data: Omit<PurchaseOrder, 'poId' | 'status' | 'orderDate' | 'totalAmount'>) => void;
}

export function AddPurchaseOrderForm({ vendors, items, onFormSubmit }: AddPurchaseOrderFormProps) {
  const form = useForm<AddPurchaseOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorId: "",
      items: [{ itemId: "", quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(data: AddPurchaseOrderFormValues) {
    onFormSubmit(data);
    toast({
      title: "Requisition Created",
      description: "Your purchase requisition has been submitted for approval.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor/Supplier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a vendor" /></SelectTrigger></FormControl>
                <SelectContent>
                  {vendors.map(vendor => (
                    <SelectItem key={vendor.vendorId} value={vendor.vendorId}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Items to Order</FormLabel>
          <div className="space-y-4 mt-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2 p-3 border rounded-lg">
                <FormField
                  control={form.control}
                  name={`items.${index}.itemId`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">Item</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an item" />
                          </SelectTrigger>
                        </FormControl>
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
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <FormLabel className="text-xs">Quantity</FormLabel>
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
            onClick={() => append({ itemId: "", quantity: 1, unitPrice: 0 })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Submit Requisition
        </Button>
      </form>
    </Form>
  );
}
