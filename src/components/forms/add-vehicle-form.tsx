
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
import { type Vehicle, type Driver } from "@/app/lib/data";

const formSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required."),
  model: z.string().min(2, "Model is required."),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1."),
  status: z.enum(["Active", "Maintenance", "Inactive"]),
  driverId: z.string().nullable().optional(),
});

type AddVehicleFormValues = z.infer<typeof formSchema>;

interface AddVehicleFormProps {
  onFormSubmit: (data: any) => void;
  initialData?: Vehicle;
  drivers?: Driver[];
}

export function AddVehicleForm({ onFormSubmit, initialData, drivers = [] }: AddVehicleFormProps) {
  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleNumber: initialData?.vehicleNumber || "",
      model: initialData?.model || "",
      capacity: initialData?.capacity || 40,
      status: initialData?.status || "Active",
      driverId: initialData?.driverId || "unassigned",
    },
  });

  function onSubmit(values: AddVehicleFormValues) {
    const submitData = {
      ...values,
      driverId: values.driverId === "unassigned" ? null : values.driverId,
    };
    onFormSubmit(submitData);
    toast({
      title: initialData ? "Vehicle Updated" : "Vehicle Added",
      description: `Vehicle ${values.vehicleNumber} has been successfully ${initialData ? "updated" : "registered"}.`,
    });
    if (!initialData) form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="vehicleNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. BUS-04" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Tata Starbus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign Driver</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "unassigned"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a driver" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.driverId} value={driver.driverId}>
                      {driver.name} ({driver.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "Update Vehicle" : "Add Vehicle"}
        </Button>
      </form>
    </Form>
  );
}
