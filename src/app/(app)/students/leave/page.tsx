import { getStudentLeaveRequests, getStudents } from "@/lib/actions"
import { LeaveClient } from "./leave-client"

export default async function StudentLeavePage() {
  const [requests, students] = await Promise.all([
    getStudentLeaveRequests(),
    getStudents()
  ])

  return <LeaveClient initialRequests={requests} students={students} />
}
