
"use client"
import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts"
import { getTransactions, type Transaction } from "@/app/lib/data"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react"

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function FinanceReportsPage() {
    const transactions = React.useMemo(() => getTransactions(), []);

    const totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'Expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    const incomeByCategory = transactions
        .filter(t => t.type === 'Income')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

    const expenseByCategory = transactions
        .filter(t => t.type === 'Expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

    const barChartData = [
        { name: 'Income', amount: totalIncome },
        { name: 'Expenses', amount: totalExpenses },
    ];

    const pieChartData = Object.entries(incomeByCategory).map(([name, value]) => ({ name, value }));
    const expensePieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }

    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center justify-between">
                            Total Income
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{formatCurrency(totalIncome)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total revenue collected this session</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center justify-between">
                            Total Expenses
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{formatCurrency(totalExpenses)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total operational costs logged</p>
                    </CardContent>
                </Card>
                <Card className={`border-l-4 ${netBalance >= 0 ? 'border-l-blue-500' : 'border-l-orange-500'}`}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center justify-between">
                            Net Balance
                            {netBalance >= 0 ? <Wallet className="h-4 w-4 text-blue-500" /> : <TrendingDown className="h-4 w-4 text-orange-500" />}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-3xl font-bold ${netBalance < 0 ? 'text-red-500' : 'text-blue-500'}`}>
                            {formatCurrency(netBalance)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Total profit or loss for the period</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Cash Flow Overview</CardTitle>
                        <CardDescription>Comparison of total income and expenses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `$${value}`} />
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                        {barChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Income by Category</CardTitle>
                        <CardDescription>Breakdown of revenue sources.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Recent Transactions</CardTitle>
                    <CardDescription>Latest financial activities across the institution.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.slice(0, 5).map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell className="text-sm">{t.date}</TableCell>
                                    <TableCell className="font-medium">{t.description}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{t.category}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm font-mono">{t.method}</TableCell>
                                    <TableCell className={`text-right font-bold ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
