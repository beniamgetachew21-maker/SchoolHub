import { getHealthVisitLogsAction, getStudentsAction } from "@/lib/flow-actions";
import { VisitLogsClient } from "./visit-logs-client";

export default async function VisitLogsPage() {
  const visits = await getHealthVisitLogsAction();
  const students = await getStudentsAction();

  return <VisitLogsClient initialVisits={visits} students={students} />;
}
