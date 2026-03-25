import { getRooms, getStudents, getHostels } from "@/lib/actions";
import AllocationsClient from "./allocations-client";

export default async function AllocationsPage() {
  const rooms = await getRooms();
  const students = await getStudents();
  const hostels = await getHostels();

  return (
    <AllocationsClient 
      initialRooms={rooms}
      initialStudents={students}
      initialHostels={hostels}
    />
  );
}
