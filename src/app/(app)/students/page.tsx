import { getStudents } from "@/lib/actions";
import { StudentsClient } from "./students-client";

export default async function StudentsPage() {
  const students = await getStudents();

  return <StudentsClient students={students} />;
}
