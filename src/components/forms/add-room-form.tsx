
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
import { type Hostel, type Room } from "@/app/lib/data";

const formSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required."),
  hostelId: z.string().min(1, "A hostel must be selected."),
  type: z.enum(['Single', 'Double', 'Triple']),
});

type AddRoomFormValues = z.infer<typeof formSchema>;

interface AddRoomFormProps {
  hostels: Hostel[];
  onFormSubmit: (data: Omit<Room, 'roomId' | 'status' | 'studentId'>) => void;
}

export function AddRoomForm({ hostels, onFormSubmit }: AddRoomFormProps) {
  const form = useForm<AddRoomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: "",
      hostelId: "",
      type: "Double",
    },
  });

  function onSubmit(data: AddRoomFormValues) {
    onFormSubmit(data);
    toast({
      title: "Room Added",
      description: `Room ${data.roomNumber} has been successfully created.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. A-101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hostelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hostel</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a hostel" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {hostels.map(hostel => (
                            <SelectItem key={hostel.hostelId} value={hostel.hostelId}>
                                {hostel.name}
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
                <FormLabel>Room Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Double">Double</SelectItem>
                        <SelectItem value="Triple">Triple</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        
        <Button type="submit" className="w-full">
          Add Room
        </Button>
      </form>
    </Form>
  );
}
