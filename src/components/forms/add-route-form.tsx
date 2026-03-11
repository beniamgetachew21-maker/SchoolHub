
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
import { type Driver, type Vehicle, type Route } from "@/app/lib/data";

const formSchema = z.object({
  routeName: z.string().min(2, "Route name is required."),
  vehicleId: z.string().min(1, "A vehicle must be selected."),
  driverId: z.string().min(1, "A driver must be selected."),
  status: z.enum(["Active", "Inactive"]),
});

type AddRouteFormValues = z.infer<typeof formSchema>;

interface AddRouteFormProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  onFormSubmit: (data: any) => void;
  initialData?: Route;
}

export function AddRouteForm({ vehicles, drivers, onFormSubmit, initialData }: AddRouteFormProps) {
  const form = useForm<AddRouteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routeName: initialData?.routeName || "",
      vehicleId: initialData?.vehicleId || "",
      driverId: initialData?.driverId || "",
      status: initialData?.status || "Active",
    },
  });

  function onSubmit(data: AddRouteFormValues) {
    onFormSubmit(data);
    toast({
      title: initialData ? "Route Updated" : "Route Added",
      description: `The route ${data.routeName} has been successfully ${initialData ? "updated" : "created"}.`,
    });
    if (!initialData) form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="routeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Route Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Morning Route C" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Vehicle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a vehicle" /></SelectTrigger></FormControl>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.vehicleId} value={vehicle.vehicleId}>
                      {vehicle.vehicleNumber} ({vehicle.model}) - {vehicle.status}
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
          name="driverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Driver</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a driver" /></SelectTrigger></FormControl>
                <SelectContent>
                  {drivers.map(driver => (
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Update Route" : "Add Route"}
        </Button>
      </form>
    </Form>
  );
}
