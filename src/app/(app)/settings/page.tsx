
"use client"
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getFeeStructures, type FeeStructure, addFeeStructure, getLeavePolicies, type LeavePolicy, addLeavePolicy, updateLeavePolicy, getSubjects, addSubject, type Subject } from "@/app/lib/data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddFeeStructureForm } from "@/components/forms/add-fee-structure-form"
import { LeavePolicyForm } from "@/components/forms/leave-policy-form";
import { toast } from "@/hooks/use-toast";
import { AddSubjectForm } from "@/components/forms/add-subject-form";

export default function SettingsPage() {
  const [feeStructures, setFeeStructures] = React.useState(getFeeStructures());
  const [leavePolicies, setLeavePolicies] = React.useState(getLeavePolicies());
  const [subjects, setSubjects] = React.useState(getSubjects());
  const [isAddFeeSheetOpen, setIsAddFeeSheetOpen] = React.useState(false);
  const [isAddLeavePolicySheetOpen, setIsAddLeavePolicySheetOpen] = React.useState(false);
  const [isAddSubjectSheetOpen, setIsAddSubjectSheetOpen] = React.useState(false);
  const [editingPolicy, setEditingPolicy] = React.useState<LeavePolicy | null>(null);


  const refreshFeeData = () => {
    setFeeStructures(getFeeStructures());
  };
  
  const refreshLeaveData = () => {
    setLeavePolicies(getLeavePolicies());
  };

  const refreshSubjectData = () => {
    setSubjects(getSubjects());
  };

  const handleAddFeeStructure = (data: Omit<FeeStructure, 'structureId'>) => {
    addFeeStructure(data);
    refreshFeeData();
    setIsAddFeeSheetOpen(false);
  }
  
  const handleAddLeavePolicy = (data: Omit<LeavePolicy, 'id'>) => {
    addLeavePolicy(data);
    refreshLeaveData();
    setIsAddLeavePolicySheetOpen(false);
  }

  const handleUpdateLeavePolicy = (data: LeavePolicy) => {
    updateLeavePolicy(data);
    refreshLeaveData();
    setEditingPolicy(null);
  }

  const handleAddSubject = (data: { name: string }) => {
    addSubject(data);
    refreshSubjectData();
    setIsAddSubjectSheetOpen(false);
  }
  
  const handleNotImplemented = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This functionality is currently under development.",
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
            <CardTitle className="font-headline">General Settings</CardTitle>
            <CardDescription>Manage your institution's core settings and configurations.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="profile">Institute Profile</TabsTrigger>
                    <TabsTrigger value="subjects">Subjects</TabsTrigger>
                    <TabsTrigger value="fees">Fee Structures</TabsTrigger>
                    <TabsTrigger value="grading">Grading Policies</TabsTrigger>
                    <TabsTrigger value="leave">Leave Policies</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Institute Profile</CardTitle>
                            <CardDescription>Update your school's public information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Institute Name</Label>
                                <Input id="name" defaultValue="Global Academy" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" defaultValue="123 Education Lane, Knowledge City" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo">Logo</Label>
                                <Input id="logo" type="file" />
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="subjects" className="mt-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Subject Management</CardTitle>
                                    <CardDescription>Manage all subjects offered by the institution.</CardDescription>
                                </div>
                                <Sheet open={isAddSubjectSheetOpen} onOpenChange={setIsAddSubjectSheetOpen}>
                                    <SheetTrigger asChild>
                                        <Button>Add New Subject</Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Add New Subject</SheetTitle>
                                            <SheetDescription>Create a new subject that can be assigned to classes.</SheetDescription>
                                        </SheetHeader>
                                        <AddSubjectForm onFormSubmit={handleAddSubject} />
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject Name</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subjects.map(subject => (
                                        <TableRow key={subject.subjectId}>
                                            <TableCell className="font-medium">{subject.name}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={handleNotImplemented}>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="fees" className="mt-6">
                     <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Fee Structures</CardTitle>
                                    <CardDescription>Define fee categories and amounts for different classes.</CardDescription>
                                </div>
                                <Sheet open={isAddFeeSheetOpen} onOpenChange={setIsAddFeeSheetOpen}>
                                    <SheetTrigger asChild>
                                        <Button>Add New Fee Structure</Button>
                                    </SheetTrigger>
                                    <SheetContent className="sm:max-w-xl">
                                        <SheetHeader>
                                            <SheetTitle>Add New Fee Structure</SheetTitle>
                                            <SheetDescription>Define a new fee schedule with its items.</SheetDescription>
                                        </SheetHeader>
                                        <AddFeeStructureForm onFormSubmit={handleAddFeeStructure} />
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Structure Name</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead className="text-right">Total Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feeStructures.map(structure => (
                                        <TableRow key={structure.structureId}>
                                            <TableCell className="font-medium">{structure.name}</TableCell>
                                            <TableCell>{structure.items.map(item => item.name).join(', ')}</TableCell>
                                            <TableCell className="text-right font-mono">
                                                {formatCurrency(structure.items.reduce((acc, item) => acc + item.amount, 0))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                     {feeStructures.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="h-24 text-center">
                                                No fee structures defined yet.
                                            </TableCell>
                                        </TableRow>
                                     )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="grading" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Grading Policies</CardTitle>
                            <CardDescription>Set up the grading system and criteria.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="policy">Grading Policy Details</Label>
                                <Textarea id="policy" rows={5} defaultValue="A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: <60" />
                            </div>
                            <Button>Save Policy</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="leave" className="mt-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Leave Policies</CardTitle>
                                    <CardDescription>Define the rules for different types of employee leave.</CardDescription>
                                </div>
                                <Sheet open={isAddLeavePolicySheetOpen} onOpenChange={setIsAddLeavePolicySheetOpen}>
                                    <SheetTrigger asChild>
                                        <Button>Add New Policy</Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Add New Leave Policy</SheetTitle>
                                            <SheetDescription>Define a new type of leave and its rules.</SheetDescription>
                                        </SheetHeader>
                                        <LeavePolicyForm onFormSubmit={handleAddLeavePolicy} />
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Leave Type</TableHead>
                                        <TableHead>Days per Year</TableHead>
                                        <TableHead>Details</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leavePolicies.map(policy => (
                                        <TableRow key={policy.id}>
                                            <TableCell className="font-medium">{policy.name}</TableCell>
                                            <TableCell>{policy.days}</TableCell>
                                            <TableCell className="text-muted-foreground">{policy.description}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => setEditingPolicy(policy)}>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your login and password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="admin@globalacademy.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input id="password" type="password" />
                            </div>
                            <Button>Update Password</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>

        <Sheet open={!!editingPolicy} onOpenChange={(isOpen) => !isOpen && setEditingPolicy(null)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Leave Policy</SheetTitle>
                    <SheetDescription>Update the details for this leave policy.</SheetDescription>
                </SheetHeader>
                {editingPolicy && (
                    <LeavePolicyForm
                        policy={editingPolicy}
                        onFormSubmit={handleUpdateLeavePolicy}
                    />
                )}
            </SheetContent>
        </Sheet>
    </Card>
  )
}
