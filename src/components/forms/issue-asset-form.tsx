
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type InventoryItem, type Student, type Employee, type AssetAllocation } from "@/app/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  itemId: z.string().min(1, "An item must be selected."),
  assignee: z.string().min(1, "An assignee must be selected."),
  dueDate: z.date({ required_error: "A due date is required." }),
});

type IssueAssetFormValues = z.infer<typeof formSchema>;

interface IssueAssetFormProps {
  items: InventoryItem[];
  students: Student[];
  employees: Employee[];
  onFormSubmit: (data: Omit<AssetAllocation, 'allocationId' | 'issueDate' | 'returnDate'>) => void;
}

export function IssueAssetForm({ items, students, employees, onFormSubmit }: IssueAssetFormProps) {
  const form = useForm<IssueAssetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemId: "",
      assignee: "",
    },
  });

  function onSubmit(data: IssueAssetFormValues) {
    const [assigneeType, assigneeId] = data.assignee.split(':');
    
    const submissionData = {
        itemId: data.itemId,
        assigneeId: assigneeId,
        assigneeType: assigneeType as 'Student' | 'Employee',
        dueDate: format(data.dueDate, "yyyy-MM-dd"),
    };

    onFormSubmit(submissionData as any); // Type assertion as component logic ensures correctness
    toast({
      title: "Asset Issued",
      description: "The item has been successfully allocated.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item to Issue</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select an item" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {items.filter(i => i.status !== 'Out of Stock').map(item => (
                            <SelectItem key={item.itemId} value={item.itemId}>
                                {item.name} (Available: {item.quantity})
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
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign To</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a person" /></SelectTrigger></FormControl>
                    <SelectContent>
                       <SelectGroup>
                            <SelectLabel>Students</SelectLabel>
                             {students.map(student => (
                                <SelectItem key={student.studentId} value={`Student:${student.studentId}`}>
                                    {student.name} ({student.class})
                                </SelectItem>
                            ))}
                       </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Employees</SelectLabel>
                            {employees.map(employee => (
                                <SelectItem key={employee.employeeId} value={`Employee:${employee.employeeId}`}>
                                    {employee.name} ({employee.designation})
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
          Issue Asset
        </Button>
      </form>
    </Form>
  );
}
