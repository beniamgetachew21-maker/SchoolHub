
import { AddEmployeeForm } from "@/components/forms/add-employee-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function AddEmployeePage() {

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/hr/directory"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold font-headline">New Employee Registration</h1>
                    <p className="text-muted-foreground">Please complete all steps to register a new staff member.</p>
                </div>
            </div>
            <Card>
                <CardContent>
                    <AddEmployeeForm />
                </CardContent>
            </Card>
        </div>
    )
}
