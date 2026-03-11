import * as React from "react"
import { getStudents, getInvoicesForStudent, getAttendanceSummaryForStudent, getResultsForStudent } from "@/lib/actions"
import { StudentPortalClient } from "./student-portal-client"
import { redirect } from "next/navigation"

export default async function StudentPortalPage() {
  const students = await getStudents();
  
  // For the demo, we pick a student to simulate "logged in" user 
  // or provide a selection if none is found.
  const defaultStudent = students.find(s => s.name.includes("Tirunesh")) || students[0];

  if (!defaultStudent) {
    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">No students found in the system.</h1>
            <p className="text-muted-foreground">Please ensure the SIS module has initialized student records.</p>
        </div>
    );
  }

  const [invoices, attendance, results] = await Promise.all([
    getInvoicesForStudent(defaultStudent.studentId),
    getAttendanceSummaryForStudent(defaultStudent.studentId),
    getResultsForStudent(defaultStudent.studentId)
  ]);

  return (
    <div className="p-6 space-y-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">Student Portal</h1>
         <p className="text-muted-foreground font-medium">Academic excellence and financial transparency at your fingertips.</p>
      </div>

      <StudentPortalClient 
        student={defaultStudent}
        invoices={invoices}
        attendance={attendance}
        results={results}
        allStudents={students} // Allow switching for demo purposes
      />
    </div>
  )
}
