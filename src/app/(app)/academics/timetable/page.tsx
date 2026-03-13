import * as React from "react"
import { getEmployees } from "@/lib/actions"
import { TimetableClient } from "./timetable-client"
import { infraService } from "@/services/infra-service"
import { acaService } from "@/services/aca-service"
import { sisService } from "@/services/sis-service"

export default async function TimetablePage() {
    const [sectionsData, employees, coursesData, roomsData] = await Promise.all([
        sisService.getClasses(),
        getEmployees(),
        acaService.getCourses(),
        infraService.getClassrooms()
    ]);

    const sections = sectionsData.data || [];
    const courses = coursesData.data || [];
    const rooms = roomsData.data || [];

    // Keep only active teachers
    const teachers = employees.filter((e: any) => e.department === "Academics" || e.designation.includes("Teacher"));

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black font-headline tracking-tighter text-emerald-900 dark:text-emerald-50">
                    Timetable Builder
                </h1>
                <p className="text-muted-foreground font-medium">
                    Schedule classes, assign teachers, and manage room allocations without conflicts.
                </p>
            </div>
            <TimetableClient 
                sections={sections} 
                teachers={teachers} 
                courses={courses} 
                rooms={roomsData} 
            />
        </div>
    )
}