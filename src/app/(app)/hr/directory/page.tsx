import * as React from "react"
import { getEmployees, getTeacher } from "@/lib/actions"
import { DirectoryClient } from "./directory-client"

export default async function EmployeeDirectoryPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string; dept?: string; size?: string }>;
}) {
    const params = await searchParams;
    const page = parseInt(params.page || "1");
    const pageSize = parseInt(params.size || "20");
    const search = params.q || "";
    const department = params.dept || "";
    const status = params.status || "";

    const currentUser = { name: "Admin Alex", role: "Admin", branch: "Addis Ababa" };
    const data = await getEmployees({ page, pageSize, search, department, status });

    return <DirectoryClient 
        employees={data.employees} 
        totalCount={data.totalCount}
        totalPages={data.totalPages}
        currentPage={page}
        currentUser={currentUser} 
    />;
}
