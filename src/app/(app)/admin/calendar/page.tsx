import { getCalendarEvents, getTenantCalendarSystem } from "@/lib/calendar-actions";
import CalendarManager from "./calendar-manager";

export default async function AcademicCalendarPage() {
  const events = await getCalendarEvents();
  const system = await getTenantCalendarSystem();

  return <CalendarManager initialEvents={events} initialSystem={system} />;
}
