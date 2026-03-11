
"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Printer } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getEmployees, type Employee } from "@/app/lib/data";

const formSchema = z.object({
  employeeId: z.string().min(1, "Please select an employee."),
  basicSalary: z.coerce.number().min(0, "Basic salary must be a positive number."),
  allowances: z.coerce.number().min(0, "Allowances must be a positive number."),
  deductions: z.coerce.number().min(0, "Deductions must be a positive number."),
});

type ManualPayrollFormValues = z.infer<typeof formSchema>;

type CalculationResult = {
    grossSalary: number;
    totalDeductions: number;
    netSalary: number;
} | null;


export default function ManualPayrollPage() {
    const [result, setResult] = React.useState<CalculationResult>(null);
    const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
    const employees = React.useMemo(() => getEmployees(), []);

    const form = useForm<ManualPayrollFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeId: "",
            basicSalary: 0,
            allowances: 0,
            deductions: 0,
        },
    });

    const { watch, setValue } = form;
    const selectedEmployeeId = watch("employeeId");

    React.useEffect(() => {
        if (selectedEmployeeId) {
            const employee = employees.find(e => e.employeeId === selectedEmployeeId);
            if (employee) {
                setSelectedEmployee(employee);
                setValue("basicSalary", employee.salary);
                // Reset allowances and deductions for manual entry
                setValue("allowances", 0);
                setValue("deductions", 0);
                setResult(null);
            }
        } else {
            setSelectedEmployee(null);
            form.reset();
        }
    }, [selectedEmployeeId, employees, setValue, form]);

    function onSubmit(data: ManualPayrollFormValues) {
        const grossSalary = data.basicSalary + data.allowances;
        const netSalary = grossSalary - data.deductions;
        setResult({
            grossSalary,
            totalDeductions: data.deductions,
            netSalary,
        });
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Manual Payroll Calculator</CardTitle>
        <CardDescription>
          Select an employee to pre-fill their details, then add any bonuses or extra deductions to calculate their net salary for a period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-lg font-semibold mb-4">Enter Details</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="employeeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Employee</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an employee" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {employees.map(e => (
                                            <SelectItem key={e.employeeId} value={e.employeeId}>
                                                {e.name} ({e.designation})
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
                        name="basicSalary"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Basic Salary</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" {...field} readOnly={!!selectedEmployee} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={form.control}
                        name="allowances"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Additional Allowances (e.g., Bonus)</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" {...field} disabled={!selectedEmployee} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={form.control}
                        name="deductions"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Additional Deductions (e.g., Advance)</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" {...field} disabled={!selectedEmployee} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full" disabled={!selectedEmployee}>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calculate Salary
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="print-area">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-lg font-semibold">Calculation Result</h3>
                     {result && (
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                        </Button>
                     )}
                </div>
                {result ? (
                    <div className="border rounded-lg p-6 space-y-4 bg-muted/30">
                        <h4 className="text-xl font-bold text-center font-headline">{selectedEmployee?.name}'s Payslip</h4>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Basic Salary</span>
                            <span className="font-mono">{formatCurrency(form.getValues('basicSalary'))}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Additional Allowances</span>
                            <span className="font-mono text-green-600">+ {formatCurrency(form.getValues('allowances'))}</span>
                        </div>
                         <Separator />
                         <div className="flex justify-between font-semibold">
                            <span>Gross Salary</span>
                            <span className="font-mono">{formatCurrency(result.grossSalary)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Additional Deductions</span>
                            <span className="font-mono text-destructive">- {formatCurrency(result.totalDeductions)}</span>
                        </div>
                         <Separator />
                        <div className="flex justify-between font-bold text-lg bg-primary/10 p-3 rounded-md">
                            <span className="font-headline text-primary">Net Salary</span>
                            <span className="font-mono text-primary">{formatCurrency(result.netSalary)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="border-2 border-dashed rounded-lg h-full flex items-center justify-center bg-muted/20">
                        <p className="text-muted-foreground text-center">
                            {selectedEmployee 
                                ? "Enter additional details and click 'Calculate Salary'."
                                : "Select an employee to begin."
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
         <style jsx global>{`
            @media print {
                body {
                    background-color: #fff;
                }
                .print\\:hidden {
                    display: none;
                }
                header, footer, .p-4.lg\\:p-6, .flex.items-center.justify-between, .grid.md\\:grid-cols-2.gap-12 > div:first-child, .card-header, .border-2.border-dashed {
                    display: none !important;
                }
                 main {
                   padding: 0 !important;
                }
                .border, .border-t {
                    border: none !important;
                    box-shadow: none !important;
                }
                 .rounded-lg {
                    border-radius: 0 !important;
                }
                .print-area {
                    width: 100%;
                }
            }
        `}</style>
      </CardContent>
    </Card>
  )
}
