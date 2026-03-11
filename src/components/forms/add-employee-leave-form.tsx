
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type Employee, type LeaveRequest, type LeavePolicy, getLeaveRequests } from "@/app/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  employeeId: z.string().min(1, "An employee must be selected."),
  leaveType: z.string().min(1, "A leave type must be selected."),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  reason: z.string().min(1, "A reason for leave is required."),
}).refine(data => data.endDate >= data.startDate, {
    message: "End date cannot be before start date.",
    path: ["endDate"],
});

type AddEmployeeLeaveFormValues = z.infer<typeof formSchema>;

interface AddEmployeeLeaveFormProps {
  employees: Employee[];
  leavePolicies: LeavePolicy[];
  onFormSubmit: (data: Omit<LeaveRequest, 'requestId' | 'status'>) => void;
}

export function AddEmployeeLeaveForm({ employees, leavePolicies, onFormSubmit }: AddEmployeeLeaveFormProps) {
  const form = useForm<AddEmployeeLeaveFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      leaveType: "",
      reason: "",
    },
  });

  const { watch } = form;
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const selectedEmployeeId = watch("employeeId");
  const selectedLeaveType = watch("leaveType");

  const daysCount = React.useMemo(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  }, [startDate, endDate]);

  const availableDays = React.useMemo(() => {
    if (!selectedEmployeeId || !selectedLeaveType) return null;

    const policy = leavePolicies.find(p => p.name === selectedLeaveType);
    if (!policy) return null;

    const allRequests = getLeaveRequests();
    const daysTaken = allRequests
      .filter(req => req.employeeId === selectedEmployeeId && req.leaveType === selectedLeaveType && req.status === 'Approved')
      .reduce((acc, req) => acc + req.daysCount, 0);

    return policy.days - daysTaken;
  }, [selectedEmployeeId, selectedLeaveType, leavePolicies]);

  function onSubmit(data: AddEmployeeLeaveFormValues) {
    if (daysCount <= 0) {
        form.setError("endDate", { message: "End date must be on or after the start date."});
        return;
    }
    
    if (availableDays !== null && daysCount > availableDays) {
      form.setError("endDate", { message: `Exceeds available leave balance of ${availableDays} days.`});
      return;
    }

    const submissionData = {
        ...data,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        daysCount,
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
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select an employee" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {employees.map(employee => (
                            <SelectItem key={employee.employeeId} value={employee.employeeId}>
                                {employee.name} ({employee.designation})
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
                <div className="flex justify-between items-center">
                    <FormLabel>Leave Type</FormLabel>
                    {availableDays !== null && (
                        <div className="text-xs font-medium text-muted-foreground">
                            Available: <span className="font-bold text-primary">{availableDays} days</span>
                        </div>
                    )}
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedEmployeeId}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {leavePolicies.map(policy => (
                            <SelectItem key={policy.id} value={policy.name}>
                                {policy.name}
                            </SelectItem>
                        ))}
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
         <div className="text-sm text-muted-foreground">Total days requested: <span className="font-semibold">{daysCount > 0 ? daysCount : '-'}</span></div>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Leave</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Annual vacation" {...field} />
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
