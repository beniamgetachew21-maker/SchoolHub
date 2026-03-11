"use client"
import * as React from "react"
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
import { getSubscribersForList, getSubscriberListById, getStudents, type Student, addSubscriberToList, removeSubscriberFromList } from "@/app/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserPlus, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet"
import { AddSubscriberToListForm } from "@/components/forms/add-subscriber-to-list-form"
import { toast } from "@/hooks/use-toast"

export default function SubscriberListPage({ params: paramsProp }: { params: Promise<{ listId: string }> }) {
    const params = React.use(paramsProp);
    const list = getSubscriberListById(params.listId);

    const [subscribers, setSubscribers] = React.useState<Student[]>([]);
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    const allStudents = React.useMemo(() => getStudents(), []);

    const refreshData = React.useCallback(() => {
        setSubscribers(getSubscribersForList(params.listId));
    }, [params.listId]);

    React.useEffect(() => {
        refreshData();
    }, [refreshData]);

    if (!list) {
        notFound();
    }

    const handleAddSubscriber = (studentId: string) => {
        try {
            addSubscriberToList(list.id, studentId);
            toast({
                title: "Subscriber Added",
                description: `A new member has been added to "${list.name}".`
            });
            refreshData();
            setIsAddSheetOpen(false);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Failed to Add",
                description: error.message,
            });
        }
    }

    const handleRemoveSubscriber = (studentId: string) => {
        removeSubscriberFromList(params.listId, studentId);
        toast({
            title: "Subscriber Removed",
            description: "The student has been removed from this mailing list.",
        });
        refreshData();
    }

    const unSubscribedStudents = allStudents.filter(student => !subscribers.some(sub => sub.studentId === student.studentId));

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="/communication/subscribers"><ArrowLeft className="h-4 w-4" /></Link>
                            </Button>
                            <CardTitle className="font-headline">Subscribers in "{list.name}"</CardTitle>
                        </div>
                        <CardDescription className="mt-2 ml-14">
                            A list of all members subscribed to this mailing list.
                        </CardDescription>
                    </div>
                    <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                        <SheetTrigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Subscriber
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Add Subscriber to "{list.name}"</SheetTitle>
                                <SheetDescription>Select a student to add to this mailing list.</SheetDescription>
                            </SheetHeader>
                            <AddSubscriberToListForm
                                students={unSubscribedStudents}
                                onFormSubmit={handleAddSubscriber}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscribers.length > 0 ? subscribers.map(subscriber => (
                            <TableRow key={subscriber.studentId}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={subscriber.avatarUrl} alt={subscriber.name} />
                                            <AvatarFallback>{subscriber.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{subscriber.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{subscriber.class}</TableCell>
                                <TableCell>{subscriber.email}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => handleRemoveSubscriber(subscriber.studentId)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    This list has no subscribers yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
