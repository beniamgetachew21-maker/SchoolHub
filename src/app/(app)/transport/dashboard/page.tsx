import { getRoutes, getVehicles, getDrivers, getTransportLogs } from "@/lib/actions";
import TransportDashboardClient from "./dashboard-client";

export default async function TransportDashboardPage() {
  const routes = await getRoutes();
  const vehicles = await getVehicles();
  const drivers = await getDrivers();
  const logs = await getTransportLogs();

  return (
    <TransportDashboardClient 
      initialRoutes={routes}
      vehicles={vehicles}
      drivers={drivers}
      initialLogs={logs}
    />
  );
}
