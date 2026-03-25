import { getHostels, getRooms, getStudents } from "@/lib/actions";
import RoomsClient from "./rooms-client";

export default async function RoomsPage() {
  const hostels = await getHostels();
  const rooms = await getRooms();
  const students = await getStudents();

  return (
    <RoomsClient 
      initialRooms={rooms}
      hostels={hostels}
      students={students}
    />
  );
}
