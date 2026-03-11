
"use client"
import { ArrowDownCircle, ArrowUpCircle, DollarSign, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as React from "react"
import { toast } from "@/hooks/use-toast"
import { getTransactions, addTransaction, type Transaction } from "@/app/lib/data"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddTransactionForm } from "@/components/forms/add-transaction-form"

export default function AccountsPage() {
    const [transactions, setTransactions] = React.useState(getTransactions());
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    const { totalIncome, totalExpenses, netBalance } = React.useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'Income')
            .reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions
            .filter(t => t.type === 'Expense')
            .reduce((acc, t) => acc + t.amount, 0);
        return {
            totalIncome: income,
            totalExpenses: expenses,
            netBalance: income - expenses,
        };
    }, [transactions]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }
    
    const handleAddTransaction = (data: Omit<Transaction, 'id'>) => {
        addTransaction(data);
        setTransactions(getTransactions());
        setIsAddSheetOpen(false);
    }

  return (
    <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                    <ArrowUpCircle className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
                    <p className="text-xs text-muted-foreground">For the current month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
                    <p className="text-xs text-muted-foreground">For the current month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${netBalance < 0 ? 'text-red-600' : ''}`}>
                        {formatCurrency(netBalance)}
                    </div>
                    <p className="text-xs text-muted-foreground">For the current month</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">Income / Expense Tracking</CardTitle>
                        <CardDescription>View and manage all financial transactions.</CardDescription>
                    </div>
                    <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                        <SheetTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Transaction
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Add New Transaction</SheetTitle>
                                <SheetDescription>Log a new income or expense item.</SheetDescription>
                            </SheetHeader>
                            <AddTransactionForm onFormSubmit={handleAddTransaction} />
                        </SheetContent>
                    </Sheet>
                </div>
            </CardHeader>
            <CardContent>
                 <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="income">Income</TabsTrigger>
                        <TabsTrigger value="expense">Expense</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                        <TransactionsTable transactions={transactions} />
                    </TabsContent>
                    <TabsContent value="income" className="mt-4">
                        <TransactionsTable transactions={transactions.filter(t => t.type === 'Income')} />
                    </TabsContent>
                    <TabsContent value="expense" className="mt-4">
                        <TransactionsTable transactions={transactions.filter(t => t.type === 'Expense')} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  )
}

function TransactionsTable({ transactions }: { transactions: {id: string, date:string, description:string, type:string, amount:number, method: string}[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>

                    <TableHead>Type</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map(transaction => (
                    <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={transaction.type === 'Income' ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}>
                                {transaction.type}
                            </Badge>
                        </TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell className="text-right font-mono">
                            ${transaction.amount.toFixed(2)}
                        </TableCell>
                    </TableRow>
                ))}
                 {transactions.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No transactions found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
