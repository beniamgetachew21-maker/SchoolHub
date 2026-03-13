import * as React from "react"
import { getEmployees, getTeacher } from "@/lib/actions"
import { DirectoryClient } from "./directory-client"

export default async function EmployeeDirectoryPage() {
    // In a real app we'd get the current user, mock it out similar to the rest
    const currentUser = { name: "Admin Alex", role: "Admin", branch: "Addis Ababa" };
    const employees = await getEmployees();

    return <DirectoryClient employees={employees} currentUser={currentUser} />
}
