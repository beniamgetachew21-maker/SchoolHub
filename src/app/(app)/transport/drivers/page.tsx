import { getDrivers, getRoutes } from "@/lib/actions";
import DriversClient from "./drivers-client";

export default async function DriversPage() {
  const drivers = await getDrivers();
  const routes = await getRoutes();

  return (
    <DriversClient 
      initialDrivers={drivers}
      routes={routes}
    />
  );
}
