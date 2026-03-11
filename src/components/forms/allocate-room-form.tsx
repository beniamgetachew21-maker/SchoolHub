
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Student, type Room, type Hostel } from "@/app/lib/data";

const formSchema = z.object({
  studentId: z.string().min(1, "You must select a student."),
  roomId: z.string().min(1, "You must select a room."),
});

type AllocateRoomFormValues = z.infer<typeof formSchema>;

interface AllocateRoomFormProps {
  students: Student[];
  rooms: Room[];
  hostels: Hostel[];
  onFormSubmit: (data: AllocateRoomFormValues) => void;
}

export function AllocateRoomForm({ students, rooms, hostels, onFormSubmit }: AllocateRoomFormProps) {
  const form = useForm<AllocateRoomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      roomId: "",
    },
  });
  
  const hostelMap = React.useMemo(() => hostels.reduce((acc, h) => ({ ...acc, [h.hostelId]: h }), {} as Record<string, Hostel>), [hostels]);

  function onSubmit(data: AllocateRoomFormValues) {
    onFormSubmit(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a student to allocate" /></SelectTrigger></FormControl>
                    <SelectContent>
                        {students.map(student => (
                            <SelectItem key={student.studentId} value={student.studentId}>
                                {student.name} ({student.class})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vacant Room</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a vacant room" /></SelectTrigger></FormControl>
                    <SelectContent>
                       <SelectGroup>
                            <SelectLabel>Boys Hostels</SelectLabel>
                            {rooms.filter(r => hostelMap[r.hostelId]?.type === 'Boys').map(room => (
                                <SelectItem key={room.roomId} value={room.roomId}>
                                    {room.roomNumber} ({hostelMap[room.hostelId]?.name}) - {room.type}
                                </SelectItem>
                            ))}
                       </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Girls Hostels</SelectLabel>
                            {rooms.filter(r => hostelMap[r.hostelId]?.type === 'Girls').map(room => (
                                <SelectItem key={room.roomId} value={room.roomId}>
                                    {room.roomNumber} ({hostelMap[room.hostelId]?.name}) - {room.type}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Allocate Room
        </Button>
      </form>
    </Form>
  );
}
