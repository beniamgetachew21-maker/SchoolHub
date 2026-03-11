
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  studentId: z.string().min(1, "A student must be selected."),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0."),
  dueDate: z.date({ required_error: "A due date is required." }),
});

type AddInvoiceFormValues = z.infer<typeof formSchema>;

interface AddInvoiceFormProps {
  students: any[];
  onFormSubmit: (data: any) => void;
}

export function AddInvoiceForm({ students, onFormSubmit }: AddInvoiceFormProps) {
  const form = useForm<AddInvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      amount: 0,
    },
  });

  function onSubmit(data: AddInvoiceFormValues) {
    const submissionData = {
        ...data,
        dueDate: format(data.dueDate, "yyyy-MM-dd"),
    };
    onFormSubmit(submissionData);
    toast({
      title: "Invoice Generated",
      description: `A new invoice for ${data.amount} has been generated.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a student" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {students.map(student => (
                            <SelectItem key={student.studentId} value={student.studentId}>
                                {student.name} ({student.class})
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 1250.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
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
          Generate Invoice
        </Button>
      </form>
    </Form>
  );
}
