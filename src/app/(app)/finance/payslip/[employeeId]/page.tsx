
"use client";
import * as React from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getEmployeeById, getLeaveRequests, type Employee } from "@/app/lib/data";
import { Printer, ArrowLeft } from "lucide-react";

// This would typically be passed in or come from a global state
const PAYROLL_PERIOD = "August 2024";

const calculatePayrollForEmployee = (employee: Employee) => {
    const MOCK_OVERTIME_HOURS: Record<string, number> = {
        "E002": 5,
        "E003": 2,
        "E005": 10,
    };
    const overtimeHours = MOCK_OVERTIME_HOURS[employee.employeeId] || 0;

    const leaveRequests = getLeaveRequests();
    let allowanceRate = 0.10;

    switch (employee.department) {
        case 'Academics': allowanceRate = 0.15; break;
        case 'Administration': case 'Finance': allowanceRate = 0.12; break;
        case 'Support Staff': allowanceRate = 0.10; break;
    }

    const basicSalary = employee.salary;
    const standardAllowances = basicSalary * allowanceRate;
    const hourlyRate = basicSalary / (30 * 8);
    const overtimePay = overtimeHours * hourlyRate * 1.5;
    const totalAllowances = standardAllowances + overtimePay;
    const standardDeductions = basicSalary * 0.05;
    const unpaidLeaveDays = leaveRequests
        .filter(req => req.employeeId === employee.employeeId && req.leaveType === 'Unpaid' && req.status === 'Approved')
        .reduce((acc, req) => acc + req.daysCount, 0);

    const dailyRate = basicSalary / 30;
    const leaveDeductions = dailyRate * unpaidLeaveDays;
    const totalDeductions = standardDeductions + leaveDeductions;
    const netSalary = basicSalary + totalAllowances - totalDeductions;

    return {
        basicSalary,
        standardAllowances,
        overtimePay,
        totalAllowances,
        standardDeductions,
        leaveDeductions,
        totalDeductions,
        netSalary,
    }
}

export default function PayslipPage() {
    const params = useParams();
    const employeeId = params.employeeId as string;
    const employee = getEmployeeById(employeeId);

    if (!employee) {
        notFound();
    }

    const payroll = calculatePayrollForEmployee(employee);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    return (
        <div className="bg-muted/30 p-4 sm:p-8 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto bg-background shadow-2xl rounded-lg">
                <div className="p-8 print:p-0">
                    <div className="flex justify-between items-center mb-8 print:mb-4">
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                            <div>
                                <h1 className="text-2xl font-bold font-headline text-primary">EthioEdu Platform</h1>
                                <p className="text-muted-foreground">Payslip for {PAYROLL_PERIOD}</p>
                            </div>
                        </div>
                        <div className="print:hidden flex items-center gap-2">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="/finance/payroll"><ArrowLeft className="h-4 w-4" /></Link>
                            </Button>
                            <Button onClick={() => window.print()}>
                                <Printer className="mr-2 h-4 w-4" /> Print Payslip
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <Card className="border-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Employee Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                                <InfoItem label="Employee Name" value={employee.name} />
                                <InfoItem label="Employee ID" value={employee.employeeCode} />
                                <InfoItem label="Department" value={employee.department} />
                                <InfoItem label="Designation" value={employee.designation} />
                                <InfoItem label="Pay Period" value={PAYROLL_PERIOD} />
                                <InfoItem label="Pay Date" value={new Date().toLocaleDateString()} />
                            </div>
                        </CardContent>
                    </Card>

                    <Separator className="my-6" />

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">Earnings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Basic Salary</TableCell>
                                            <TableCell className="text-right font-mono">{formatCurrency(payroll.basicSalary)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Standard Allowances</TableCell>
                                            <TableCell className="text-right font-mono">{formatCurrency(payroll.standardAllowances)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Overtime Pay</TableCell>
                                            <TableCell className="text-right font-mono">{formatCurrency(payroll.overtimePay)}</TableCell>
                                        </TableRow>
                                        <TableRow className="font-bold bg-muted/50">
                                            <TableCell>Total Earnings</TableCell>
                                            <TableCell className="text-right font-mono">{formatCurrency(payroll.basicSalary + payroll.totalAllowances)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">Deductions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Standard Deductions (Tax, etc.)</TableCell>
                                            <TableCell className="text-right font-mono">{formatCurrency(payroll.standardDeductions)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Unpaid Leave</TableCell>
                                            <TableCell className="text-right font-mono">{formatCurrency(payroll.leaveDeductions)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="opacity-50">Loan</TableCell>
                                            <TableCell className="text-right font-mono opacity-50">{formatCurrency(0)}</TableCell>
                                        </TableRow>
                                        <TableRow className="font-bold bg-muted/50">
                                            <TableCell>Total Deductions</TableCell>
                                            <TableCell className="text-right font-mono text-destructive">{formatCurrency(payroll.totalDeductions)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 bg-primary/10 p-6 rounded-lg flex justify-between items-center">
                        <h3 className="text-xl font-bold font-headline text-primary">Net Salary</h3>
                        <p className="text-3xl font-bold font-headline text-primary">{formatCurrency(payroll.netSalary)}</p>
                    </div>


                    <div className="mt-16 text-center text-xs text-muted-foreground">
                        <p className="pt-4">This is a computer-generated payslip and does not require a physical signature.</p>
                    </div>
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
                .print\\:p-0 {
                    padding: 0;
                }
                .print\\:mb-4 {
                    margin-bottom: 1rem;
                }
                .print\\:shadow-none {
                    box-shadow: none;
                }
                @page {
                    size: A4;
                    margin: 20mm;
                }
            }
        `}</style>
        </div>
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}
