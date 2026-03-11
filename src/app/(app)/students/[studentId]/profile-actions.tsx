
"use client";
import * as React from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EditStudentForm } from "@/components/forms/edit-student-form";
// updateStudent is called via updateStudentAction from actions.ts
import { useRouter } from "next/navigation";

interface ProfileActionsProps {
    student: any;
}

export function ProfileActions({ student }: ProfileActionsProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();

    const handleEditSubmit = async (updatedData: any) => {
        // In a real app, we'd call a server action here
        // await updateStudent(updatedData);
        setIsOpen(false);
        router.refresh();
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Student Profile</SheetTitle>
                    <SheetDescription>
                        Update enrollment details and national policy alignment fields.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <EditStudentForm student={student} onFormSubmit={handleEditSubmit} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
