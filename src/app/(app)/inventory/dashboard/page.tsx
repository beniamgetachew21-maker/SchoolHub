
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartConfig, ChartTooltipContent } from "@/components/ui/chart"
import { Package, PackageOpen, AlertTriangle, DollarSign } from "lucide-react"
import { getInventoryItems, type InventoryItem } from "@/app/lib/data"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"

const chartConfig = {
  count: {
    label: "Items",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function InventoryDashboardPage() {
    const items = useMemo(() => getInventoryItems(), []);

    const totalItems = items.length;
    const totalValue = items.reduce((acc, item) => acc + (item.purchasePrice || 0) * item.quantity, 0);
    const lowStockItems = items.filter(item => item.status === 'Low Stock');

    const itemsByCategory = items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(itemsByCategory).map(([category, count]) => ({
        category,
        count,
    }));

     const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }

  return (
    <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Item Types</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalItems}</div>
                    <p className="text-xs text-muted-foreground">Unique items in inventory</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
                    <p className="text-xs text-muted-foreground">Estimated total asset value</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{lowStockItems.length}</div>
                    <p className="text-xs text-muted-foreground">Items needing re-order</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Out of Stock Items</CardTitle>
                    <PackageOpen className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{items.filter(i => i.status === 'Out of Stock').length}</div>
                    <p className="text-xs text-muted-foreground">Currently unavailable</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline">Items by Category</CardTitle>
                    <CardDescription>Distribution of inventory items across different categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-80 w-full">
                        <ResponsiveContainer>
                            <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid horizontal={false} />
                                <YAxis 
                                    dataKey="category" 
                                    type="category" 
                                    tickLine={false} 
                                    axisLine={false} 
                                    width={120} 
                                    tick={{ fontSize: 12 }}
                                />
                                <XAxis dataKey="count" type="number" hide />
                                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel />} />
                                <Legend />
                                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                 <CardHeader>
                    <CardTitle className="font-headline">Low Stock Alerts</CardTitle>
                    <CardDescription>These items are running low and may need to be re-ordered soon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {lowStockItems.length > 0 ? lowStockItems.map(item => (
                            <div key={item.itemId} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.category}</p>
                                </div>
                                <Badge variant="destructive">Qty: {item.quantity}</Badge>
                            </div>
                        )) : (
                            <p className="text-sm text-muted-foreground text-center py-10">No items are currently low on stock.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
