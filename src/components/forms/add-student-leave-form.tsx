
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type Student, type StudentLeaveRequest } from "@/app/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import * as React from "react";

const formSchema = z.object({
  studentId: z.string().min(1, "A student must be selected."),
  leaveType: z.enum(["Sick", "Vacation", "Family Event"]),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  reason: z.string().min(1, "A reason for leave is required."),
}).refine(data => data.endDate >= data.startDate, {
    message: "End date cannot be before start date.",
    path: ["endDate"],
});

type AddStudentLeaveFormValues = z.infer<typeof formSchema>;

interface AddStudentLeaveFormProps {
  students: Student[];
  onFormSubmit: (data: Omit<StudentLeaveRequest, 'requestId' | 'status'>) => void;
}

export function AddStudentLeaveForm({ students, onFormSubmit }: AddStudentLeaveFormProps) {
  const form = useForm<AddStudentLeaveFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      leaveType: "Sick",
      reason: "",
    },
  });
  
  const { watch } = form;
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const daysCount = React.useMemo(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  }, [startDate, endDate]);


  function onSubmit(data: AddStudentLeaveFormValues) {
    if (daysCount <= 0) {
        form.setError("endDate", { message: "End date must be on or after the start date."});
        return;
    }

    const submissionData = {
        ...data,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        daysCount: daysCount,
    };
    onFormSubmit(submissionData as any);
    toast({
      title: "Leave Request Added",
      description: `The leave request has been submitted for approval.`,
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
            name="leaveType"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Leave Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Sick">Sick Leave</SelectItem>
                        <SelectItem value="Vacation">Vacation</SelectItem>
                        <SelectItem value="Family Event">Family Event</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
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
                name="endDate"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
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
        </div>
         <div className="text-sm text-muted-foreground">Total days: <span className="font-semibold">{daysCount > 0 ? daysCount : '-'}</span></div>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Leave</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. Attending a family wedding out of town." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Submit Request
        </Button>
      </form>
    </Form>
  );
}
