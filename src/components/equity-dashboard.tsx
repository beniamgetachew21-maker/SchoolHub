
"use client";
import * as React from "react";
import {
    Users,
    TrendingUp,
    Globe,
    HeartPulse,
    Flag,
} from "lucide-react";
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
    Legend,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface EquityDashboardProps {
    data: {
        totalStudents: number;
        genderDistribution: { name: string; value: number }[];
        regionDistribution: { name: string; value: number }[];
        specialNeedsCount: number;
        refugeeCount: number;
    };
}

const chartConfig = {
    value: {
        label: "Count",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export default function EquityDashboard({ data }: EquityDashboardProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-t-4 border-t-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{data.totalStudents}</div>
                        <p className="text-xs text-muted-foreground mt-1 underline decoration-primary/30">Total enrollment</p>
                    </CardContent>
                </Card>

                <Card className="border-t-4 border-t-accent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Special Needs</CardTitle>
                        <HeartPulse className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{data.specialNeedsCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Students requiring support</p>
                    </CardContent>
                </Card>

                <Card className="border-t-4 border-t-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Refugee Students</CardTitle>
                        <Flag className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{data.refugeeCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Inclusive enrollment support</p>
                    </CardContent>
                </Card>

                <Card className="border-t-4 border-t-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Diversity Index</CardTitle>
                        <Globe className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">High</div>
                        <p className="text-xs text-muted-foreground mt-1">Across {data.regionDistribution.length} regions</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="font-headline flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Regional Distribution
                        </CardTitle>
                        <CardDescription>
                            Student origin distribution across Ethiopia.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ChartContainer config={chartConfig} className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.regionDistribution}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                    />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Gender Equity Tracking
                        </CardTitle>
                        <CardDescription>
                            Monitoring GEQIP-E gender parity goals.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.genderDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.genderDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-morphism overflow-hidden">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl font-headline">National Policy Compliance</CardTitle>
                    <CardDescription>Status update on Ethiopian Ministry of Education alignment.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100 italic">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Equity tracking for regional diversity (GEQIP-E standard) is active.</span>
                        </li>
                        <li className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100 italic">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Continuous Classroom Assessment (CCA) flags implemented in results portal.</span>
                        </li>
                        <li className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100 italic">
                            <Info className="h-4 w-4 text-blue-600" />
                            <span>Mother Tongue instruction support tracking enabled for Grade 1-8.</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

function CheckCircle(props: any) {
    return <Users {...props} />; // Placeholder icon if CheckCircle is not imported
}

function Info(props: any) {
    return <TrendingUp {...props} />; // Placeholder icon
}
