import { getVehicles, getDrivers } from "@/lib/actions";
import VehiclesClient from "./vehicles-client";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  const drivers = await getDrivers();

  return (
    <VehiclesClient 
      initialVehicles={vehicles}
      drivers={drivers}
    />
  );
}
