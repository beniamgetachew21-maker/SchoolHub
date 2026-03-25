import { getStudents } from "@/lib/actions";
import { StudentsClient } from "./students-client";

export default async function StudentsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; q?: string; class?: string; size?: string }>;
}) {
    const params = await searchParams;
    const page = parseInt(params.page || "1");
    const pageSize = parseInt(params.size || "20");
    const search = params.q || "";
    const classFilter = params.class || "";

    const data = await getStudents({ page, pageSize, search, classFilter });

    return <StudentsClient 
        students={data.students} 
        totalCount={data.totalCount}
        totalPages={data.totalPages}
        currentPage={page}
    />;
}
