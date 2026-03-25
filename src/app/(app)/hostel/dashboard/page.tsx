import { getHostels, getRooms, getMaintenanceLogs } from "@/lib/actions";
import HostelDashboardClient from "./dashboard-client";

export default async function HostelDashboardPage() {
  const hostels = await getHostels();
  const rooms = await getRooms();
  const maintenanceLogs = await getMaintenanceLogs();

  return (
    <HostelDashboardClient 
      hostels={hostels}
      rooms={rooms}
      initialMaintenance={maintenanceLogs}
    />
  );
}
