"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { convertToEthiopianString } from "@/lib/ethiopian-calendar";
import { addCalendarEvent, deleteCalendarEvent, updateTenantCalendarSystem } from "@/lib/calendar-actions";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarManager({ initialEvents, initialSystem }: { initialEvents: any[], initialSystem: string }) {
    const [events, setEvents] = useState(initialEvents);
    const [system, setSystem] = useState(initialSystem);
    const [isAdding, setIsAdding] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    
    // new event state
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [type, setType] = useState("Event");

    const router = useRouter();

    const isEthiopian = system === "Ethiopian";

    const handleSystemToggle = async (checked: boolean) => {
        const newSystem = checked ? "Ethiopian" : "Gregorian";
        setSystem(newSystem);
        await updateTenantCalendarSystem(newSystem);
        router.refresh();
    };

    const handleAddEvent = async () => {
        if (!title || !startDate) return;
        setIsAdding(true);
        const res = await addCalendarEvent({
            title,
            startDate: new Date(startDate),
            endDate: new Date(startDate),
            type,
            description: ""
        });
        if (res.data) {
            setEvents([...events, res.data]);
            setOpenAdd(false);
            setTitle("");
            setStartDate("");
        }
        setIsAdding(false);
    };

    const handleDelete = async (id: string) => {
        await deleteCalendarEvent(id);
        setEvents(events.filter(e => e.id !== id));
    };

    const formatDisplayDate = (d: Date | string) => {
        const dateObj = new Date(d);
        if (isEthiopian) {
            return convertToEthiopianString(dateObj);
        }
        return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Academic Calendar</h1>
                    <p className="text-muted-foreground">Manage institutional terms, holidays, and campus-wide events.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl">
                        <Switch id="ethiopian-calendar" checked={isEthiopian} onCheckedChange={handleSystemToggle} />
                        <Label htmlFor="ethiopian-calendar" className="text-sm font-bold cursor-pointer">Ethiopian Calendar</Label>
                    </div>

                    <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                        <DialogTrigger asChild>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-5 h-10 shadow-sm">
                                <Plus className="mr-2 h-4 w-4" /> Add Event
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-3xl">
                            <DialogHeader>
                                <DialogTitle>Create Calendar Event</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Event Title</Label>
                                    <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Spring Break" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Event Date</Label>
                                    <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select value={type} onValueChange={setType}>
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Holiday">Holiday</SelectItem>
                                            <SelectItem value="Event">Event</SelectItem>
                                            <SelectItem value="Exam">Exam</SelectItem>
                                            <SelectItem value="Schedule">Schedule</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl" onClick={handleAddEvent} disabled={isAdding}>
                                {isAdding ? "Saving..." : "Save Event"}
                            </Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 rounded-[32px] overflow-hidden shadow-sm border-slate-200 p-4 bg-white flex justify-center">
                    <Calendar 
                        mode="multiple"
                        selected={events.map(e => new Date(e.startDate))}
                        className="rounded-3xl border w-full h-full flex items-center justify-center p-8 bg-slate-50"
                        classNames={{
                            months: "w-full flex-col justify-center",
                            month: "w-full",
                            table: "w-full border-collapse",
                            head_row: "flex justify-between mt-4",
                            row: "flex justify-between mt-2",
                            cell: "h-12 w-full text-center p-0 flex items-center justify-center",
                            day: "h-10 w-10 p-0 font-medium hover:bg-slate-200 rounded-xl aria-selected:bg-emerald-600 aria-selected:text-white"
                        }}
                    />
                </Card>

                <div className="space-y-6">
                    <Card className="rounded-3xl shadow-sm border-slate-200">
                        <CardHeader>
                            <CardTitle>Upcoming Milestones</CardTitle>
                            <CardDescription>Key institutional dates for the current term.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                            {events.length === 0 ? (
                                <p className="text-sm text-center text-slate-500 py-4">No events scheduled.</p>
                            ) : (
                                events.map(e => (
                                    <div key={e.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all group">
                                        <div className="h-12 w-12 shrink-0 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-slate-100 px-1">
                                            <span className="text-[9px] font-black text-slate-400 text-center leading-none mt-1 line-clamp-2 break-words max-w-full truncate whitespace-normal">
                                                {formatDisplayDate(e.startDate)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm tracking-tight truncate">{e.title}</p>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{e.type}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(e.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl bg-emerald-900 text-white border-none">
                        <CardHeader>
                            <CardTitle className="text-emerald-100">Term Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black mb-2">68%</div>
                            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400" style={{ width: '68%' }} />
                            </div>
                            <p className="text-[10px] uppercase font-black tracking-widest mt-4 text-emerald-300">Week 12 of 18</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
