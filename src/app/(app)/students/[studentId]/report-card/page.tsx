import { getStudentById, getResultsForStudent, getAttendanceSummaryForStudent } from "@/lib/actions";
import { notFound } from "next/navigation";
import { ReportCardClient } from "./report-card-client";
import * as React from "react";

export default async function ReportCardPage({ params }: { params: Promise<{ studentId: string }> }) {
    const { studentId } = await params;

    const [student, results, attendance] = await Promise.all([
        getStudentById(studentId),
        getResultsForStudent(studentId),
        getAttendanceSummaryForStudent(studentId)
    ]);

    if (!student) {
        notFound();
    }

    return <ReportCardClient student={student} results={results} attendance={attendance} />;
}
