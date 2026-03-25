import * as React from "react"
import { getStudents, getStudentDashboardDataAction } from "@/lib/actions"
import { StudentPortalClient } from "./student-portal-client"
import { notFound } from "next/navigation"

export default async function StudentPortalPage() {
  const students = await getStudents();
  
  // For the demo, we pick a student to simulate "logged in" user 
  const defaultStudent = students.find(s => s.name.includes("Aida")) || students[0];

  if (!defaultStudent) {
    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">No students found in the system.</h1>
            <p className="text-muted-foreground">Please ensure the SIS module has initialized student records.</p>
        </div>
    );
  }

  const { data: dashboardData } = await getStudentDashboardDataAction(defaultStudent.studentId);

  if (!dashboardData) return notFound();

  return (
    <div className="w-full">
      <StudentPortalClient 
        student={dashboardData.student}
        invoices={dashboardData.invoices}
        attendance={dashboardData.attendance}
        results={dashboardData.results || []} 
        gpa={dashboardData.gpa}
        timetable={dashboardData.timetable}
        assignments={dashboardData.assignments}
        allStudents={students} 
      />
    </div>
  )
}
