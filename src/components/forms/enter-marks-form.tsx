
"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { type Student, type Assessment, type AssessmentResult } from "@/app/lib/data"
import { ScrollArea } from "@/components/ui/scroll-area"

const markSchema = z.object({
    marks: z.record(z.string(), z.object({
        score: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "Must be a valid positive number",
        }),
        remarks: z.string().optional(),
    })),
})

type MarkFormValues = z.infer<typeof markSchema>

interface EnterMarksFormProps {
    assessment: Assessment
    students: Student[]
    existingResults: AssessmentResult[]
    onFormSubmit: (results: Omit<AssessmentResult, "resultId">[]) => void
}

export function EnterMarksForm({ assessment, students, existingResults, onFormSubmit }: EnterMarksFormProps) {
    const defaultValues: MarkFormValues = {
        marks: students.reduce((acc, student) => {
            const existing = existingResults.find(r => r.studentId === student.studentId);
            acc[student.studentId] = {
                score: existing ? String(existing.marksObtained) : "",
                remarks: existing ? existing.remarks || "" : "",
            };
            return acc;
        }, {} as Record<string, { score: string; remarks: string }>),
    }

    const form = useForm<MarkFormValues>({
        resolver: zodResolver(markSchema),
        defaultValues,
    })

    const calculateGrade = (score: number, maxMarks: number) => {
        const percentage = (score / maxMarks) * 100;
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B";
        if (percentage >= 60) return "C";
        if (percentage >= 50) return "D";
        return "F";
    }

    function onSubmit(values: MarkFormValues) {
        const results = Object.entries(values.marks).map(([studentId, data]) => ({
            assessmentId: assessment.assessmentId,
            studentId,
            marksObtained: Number(data.score),
            grade: calculateGrade(Number(data.score), assessment.maxMarks),
            remarks: data.remarks || null,
        }));
        onFormSubmit(results);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead className="w-[100px]">Marks</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.studentId}>
                                    <TableCell className="font-medium">
                                        {student.name}
                                        <p className="text-xs text-muted-foreground">{student.studentId}</p>
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            control={form.control}
                                            name={`marks.${student.studentId}.score`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} placeholder="0" className="h-8" />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            control={form.control}
                                            name={`marks.${student.studentId}.remarks`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Keep it up!" className="h-8" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button type="submit" className="w-full">Save All Marks</Button>
                </div>
            </form>
        </Form>
    )
}
