
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
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { getClassById, getTimetableForClass, getSubjectById, getTeacherById, type TimetableSlot, type Subject, type Employee, getSubjectsForClass, updateTimetableSlot, getClassroomById, getEmployeeById } from "@/app/lib/data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

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

export default function TimetablePage() {
  const params = useParams();
  const classId = Number(params.classId);

  const [classInfo, setClassInfo] = React.useState(() => getClassById(classId));
  const [timetableData, setTimetableData] = React.useState(() => getTimetableForClass(classId));
  const [classSubjects, setClassSubjects] = React.useState(() => getSubjectsForClass(classId));

  const refreshData = () => {
      setClassInfo(getClassById(classId));
      setTimetableData(getTimetableForClass(classId));
      setClassSubjects(getSubjectsForClass(classId));
  }

  const subjectMap = React.useMemo(() => {
    return classSubjects.reduce((acc, subject) => {
        const teacher = getEmployeeById(subject.teacherId);
        acc[subject.subjectId] = { ...subject, teacherName: teacher?.name || 'N/A' };
        return acc;
    }, {} as Record<string, Subject & { teacherName: string }>);
  }, [classSubjects])
  

  if (!classInfo) {
    notFound();
  }
  
  const getSlot = (day: string, period: number) => {
    if (period === 4) return { subject: 'Lunch', teacher: '', room: null }; // Lunch break
    const slot = timetableData.find(s => s.day === day && s.period === period);
    if (!slot) return null;
    const subject = subjectMap[slot.subjectId];
    const room = slot.roomId ? getClassroomById(slot.roomId) : null;
    return {
        subject: subject?.name || 'N/A',
        teacher: subject?.teacherName || 'N/A',
        room
    }
  }

  const handleSlotUpdate = (day: string, period: number, subjectId: string) => {
    try {
        updateTimetableSlot(classId, day, period, subjectId);
        toast({
            title: "Timetable Updated",
            description: `The slot for ${day} at period ${period} has been updated.`,
        });
        refreshData();
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Scheduling Conflict",
            description: error.message,
        });
    }
  }

  return (
     <Card>
      <CardHeader className="print-hidden">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/academics/timetable"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <CardTitle className="font-headline">Class Timetable</CardTitle>
                    <CardDescription>Weekly schedule for {classInfo.name}</CardDescription>
                </div>
            </div>
            <Button onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print Timetable
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="print-hidden border rounded-lg overflow-hidden">
            <div className="grid grid-cols-6">
                 {/* Header Row */}
                <div className="font-semibold p-3 border-b border-r bg-muted/50 text-center">Time</div>
                {daysOfWeek.map(day => (
                    <div key={day} className="font-semibold p-3 border-b border-r bg-muted/50 text-center">{day}</div>
                ))}

                {/* Data Rows */}
                {timeSlots.map((time, index) => {
                    const period = index + 1;
                    return (
                        <React.Fragment key={time}>
                            <div className="font-semibold p-3 border-b border-r bg-muted/50 text-center">{time}</div>
                            {daysOfWeek.map(day => {
                                const slot = getSlot(day, period);
                                const isLunch = period === 4;
                                return (
                                    <div key={`${day}-${time}`} className={`p-0 border-b border-r text-center ${isLunch ? 'bg-secondary font-bold' : ''}`}>
                                        {isLunch ? (
                                             <div className="p-3">
                                                <p className="font-semibold">Lunch</p>
                                            </div>
                                        ) : (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="w-full h-full p-3 hover:bg-muted/50 transition-colors flex flex-col justify-center items-center min-h-[80px]">
                                                        {slot ? (
                                                            <div>
                                                                <p className="font-semibold">{slot.subject}</p>
                                                                <p className="text-xs text-muted-foreground">{slot.teacher}</p>
                                                                {slot.room && <p className="text-xs font-bold text-primary mt-1">{slot.room.name}</p>}
                                                            </div>
                                                        ) : (
                                                            <div className="text-muted-foreground text-xs">Assign...</div>
                                                        )}
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>Assign Subject</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {classSubjects.map(subject => (
                                                        <DropdownMenuItem key={subject.subjectId} onSelect={() => handleSlotUpdate(day, period, subject.subjectId)}>
                                                            {subject.name}
                                                        </DropdownMenuItem>
                                                    ))}
                                                    <DropdownMenuSeparator />
                                                     <DropdownMenuItem className="text-destructive" onSelect={() => handleSlotUpdate(day, period, '')}>
                                                        Clear Slot
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
                <p className="text-lg font-semibold">Weekly Timetable for {classInfo.name}</p>
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
                                                    <p className="text-xs text-gray-600">{slot.teacher}</p>
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
                .print-hidden { display: none !important; }
                .print\\:hidden { display: none; }
                .print\\:block { display: block; }
                header, footer, .p-4.lg\\:p-6 {
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

    