
"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"
import Link from "next/link"
import { getEmployeeById, getTimetableSlotsForTeacher, getClassById, getSubjectById, type Employee, getClassroomById } from "@/app/lib/data"

// Hardcoded for demonstration. In a real app, this would come from the teacher's session.
const TEACHER_ID = "E002"; 

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00", // Lunch
  "01:00 - 02:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
];

export default function TeacherTimetablePage() {
  const teacher = getEmployeeById(TEACHER_ID);
  const timetableSlots = getTimetableSlotsForTeacher(TEACHER_ID);

  const getSlot = (day: string, period: number) => {
    if (period === 4) return { subject: 'Lunch', className: '', room: null };
    
    const slot = timetableSlots.find(s => s.day === day && s.period === period);
    if (!slot) return null;
    
    const classInfo = getClassById(slot.classId);
    const subjectInfo = getSubjectById(slot.subjectId);
    const room = slot.roomId ? getClassroomById(slot.roomId) : null;

    return {
        subject: subjectInfo?.name || 'N/A',
        className: classInfo?.name || 'N/A',
        room: room,
    }
  }

  return (
     <Card>
      <CardHeader className="print:hidden">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/teacher-portal"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <CardTitle className="font-headline">My Weekly Timetable</CardTitle>
                    <CardDescription>Your teaching schedule for the week, {teacher?.name}.</CardDescription>
                </div>
            </div>
            <Button onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print Timetable
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="print:hidden border rounded-lg overflow-hidden">
            <div className="grid grid-cols-6">
                <div className="font-semibold p-3 border-b border-r bg-muted/50 text-center">Time</div>
                {daysOfWeek.map(day => (
                    <div key={day} className="font-semibold p-3 border-b border-r bg-muted/50 text-center">{day}</div>
                ))}

                {timeSlots.map((time, index) => {
                    const period = index + 1;
                    return (
                        <React.Fragment key={time}>
                            <div className="font-semibold p-3 border-b border-r bg-muted/50 text-center">{time}</div>
                            {daysOfWeek.map(day => {
                                const slot = getSlot(day, period);
                                const isLunch = period === 4;
                                return (
                                    <div key={`${day}-${time}`} className={`p-3 border-b border-r text-center flex flex-col justify-center items-center min-h-[80px] ${isLunch ? 'bg-secondary font-bold' : ''}`}>
                                        {slot ? (
                                            <div>
                                                <p className="font-semibold">{slot.subject}</p>
                                                <p className="text-xs text-muted-foreground">{slot.className}</p>
                                                {slot.room && <p className="text-xs font-bold text-primary mt-1">{slot.room.name}</p>}
                                            </div>
                                        ) : (
                                            <div className="text-muted-foreground text-xs opacity-50">Free Period</div>
                                        )}
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
         <div className="hidden print:block">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold font-headline">Global Academy</h1>
                <p className="text-lg font-semibold">Weekly Timetable for {teacher?.name}</p>
              </div>
               <table className="w-full border-collapse border text-sm">
                <thead>
                    <tr>
                        <th className="border p-2 font-semibold text-center bg-gray-100">Time</th>
                        {daysOfWeek.map(day => <th key={day} className="border p-2 font-semibold text-center bg-gray-100">{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                     {timeSlots.map((time, index) => {
                        const period = index + 1;
                        return (
                            <tr key={time}>
                                <td className="border p-2 font-semibold text-center bg-gray-100">{time}</td>
                                {daysOfWeek.map(day => {
                                    const slot = getSlot(day, period);
                                    const isLunch = period === 4;
                                    return (
                                        <td key={`${day}-${time}`} className={`border p-2 text-center ${isLunch ? 'bg-gray-200 font-bold' : ''}`}>
                                            {isLunch ? (
                                                <div>Lunch</div>
                                            ) : slot ? (
                                                <div>
                                                    <p className="font-semibold">{slot.subject}</p>
                                                    <p className="text-xs text-gray-600">{slot.className}</p>
                                                     {slot.room && <p className="text-xs font-bold text-gray-800 mt-1">{slot.room.name}</p>}
                                                </div>
                                            ) : (
                                                <div className="text-gray-400">-</div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
         </div>
      </CardContent>
       <style jsx global>{`
            @media print {
                body { background-color: #fff; }
                .print\\:hidden { display: none; }
                .print\\:block { display: block; }
                header, footer, .p-4.lg\\:p-6, .print-hidden {
                    display: none !important;
                }
                 main, .card-content {
                   padding: 0 !important;
                }
                .card {
                    border: none !important;
                    box-shadow: none !important;
                }
                .rounded-lg {
                    border-radius: 0 !important;
                }
                @page {
                    size: A4 landscape;
                    margin: 20mm;
                }
            }
        `}</style>
    </Card>
  )
}
