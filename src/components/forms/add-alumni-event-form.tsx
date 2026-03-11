
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
import { toast } from "@/hooks/use-toast";
import { type AlumniEvent } from "@/app/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Event name is required."),
  date: z.date({ required_error: "A date for the event is required." }),
  location: z.string().min(2, "Location is required."),
});

type AddAlumniEventFormValues = z.infer<typeof formSchema>;

interface AddAlumniEventFormProps {
  onFormSubmit: (data: Omit<AlumniEvent, 'eventId' | 'rsvpCount'>) => void;
}

export function AddAlumniEventForm({ onFormSubmit }: AddAlumniEventFormProps) {
  const form = useForm<AddAlumniEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  function onSubmit(data: AddAlumniEventFormValues) {
    const submissionData = {
      ...data,
      date: format(data.date, "yyyy-MM-dd"),
    };
    onFormSubmit(submissionData);
    toast({
      title: "Event Created",
      description: `The event "${data.name}" has been successfully created.`,
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
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Annual Alumni Meet 2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
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
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. School Auditorium" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </Form>
  );
}
