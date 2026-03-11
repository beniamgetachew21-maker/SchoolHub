import { getDisciplinaryRecords, getStudents } from "@/lib/actions"
import { DisciplineClient } from "./discipline-client"

export default async function DisciplinePage() {
  const [records, students] = await Promise.all([
    getDisciplinaryRecords(),
    getStudents()
  ])

  return <DisciplineClient initialRecords={records} students={students} />
}
