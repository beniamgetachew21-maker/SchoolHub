
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
import { getSubscriberLists, type SubscriberList, addSubscriberList } from "@/app/lib/data"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { AddSubscriberListForm } from "@/components/forms/add-subscriber-list-form"
import Link from "next/link"

export default function SubscribersPage() {
    const [lists, setLists] = React.useState(getSubscriberLists())
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    const refreshData = () => {
        setLists(getSubscriberLists());
    }

    const handleNotImplemented = () => {
        toast({
            title: "Feature Coming Soon",
            description: "This functionality is currently under development.",
        });
    }

    const handleAddList = (data: { name: string }) => {
        addSubscriberList(data);
        refreshData();
        setIsAddSheetOpen(false);
    }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Subscriber Lists</CardTitle>
                <CardDescription>
                Manage your mailing lists for newsletters and announcements.
                </CardDescription>
            </div>
            <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New List
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Subscriber List</SheetTitle>
                        <SheetDescription>Create a new mailing list.</SheetDescription>
                    </SheetHeader>
                    <AddSubscriberListForm onFormSubmit={handleAddList} />
                </SheetContent>
            </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>List Name</TableHead>
                    <TableHead className="text-right">Subscribers</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {lists.map(list => (
                    <TableRow key={list.id}>
                        <TableCell className="font-medium">{list.name}</TableCell>
                        <TableCell className="text-right">{list.subscriberCount}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/communication/subscribers/${list.id}`}>View Subscribers</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleNotImplemented}>Export List</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
