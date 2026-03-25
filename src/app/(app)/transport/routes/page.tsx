import { getRoutes, getVehicles, getDrivers, getStudents } from "@/lib/actions";
import RoutesClient from "./routes-client";

export default async function RoutesPage() {
  const routes = await getRoutes();
  const vehicles = await getVehicles();
  const drivers = await getDrivers();
  const allStudents = await getStudents();

  return (
    <RoutesClient 
      initialRoutes={routes}
      vehicles={vehicles}
      drivers={drivers}
      allStudents={allStudents}
    />
  );
}
