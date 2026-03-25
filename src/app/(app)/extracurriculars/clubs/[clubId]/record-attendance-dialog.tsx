"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ClipboardCheck, Loader2 } from "lucide-react"
import { recordClubAttendanceAction } from "@/lib/flow-actions"
import { toast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecordAttendanceDialogProps {
  clubId: string
  clubName: string
  members: any[]
}

export function RecordAttendanceDialog({ clubId, clubName, members }: RecordAttendanceDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [attendance, setAttendance] = React.useState<Record<string, boolean>>(
    members.reduce((acc, member) => ({ ...acc, [member.studentId]: true }), {})
  )

  const toggleStudent = (studentId: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: !prev[studentId] }))
  }

  const handleSaveAttendance = async () => {
    setLoading(true)
    const attendanceData = members.map(m => ({
      studentId: m.studentId,
      status: attendance[m.studentId] ? "Present" : "Absent"
    }))
    
    // Using current date for the session
    const today = new Date().toISOString().split('T')[0]
    
    const result = await recordClubAttendanceAction(clubId, attendanceData, today)
    setLoading(false)

    if (result.success) {
      toast({
        title: "Attendance Recorded",
        description: `Attendance for ${clubName} has been saved for today.`,
      })
      setOpen(false)
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to record attendance.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest h-9 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100">
            <ClipboardCheck className="mr-2 h-3.5 w-3.5" /> Take Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] border-transparent shadow-2xl overflow-hidden bg-white p-0">
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="font-black text-2xl uppercase tracking-tighter italic text-slate-900 flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-emerald-500" />
            Daily Attendance
          </DialogTitle>
          <DialogDescription className="text-sm font-medium">
            Recording attendance for <strong>{clubName}</strong> - {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[400px] overflow-y-auto px-8">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-50 bg-slate-50/50">
                        <TableHead className="px-4 h-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Student</TableHead>
                        <TableHead className="w-24 text-center h-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.studentId} className="border-slate-50 group hover:bg-slate-50/50 transition-colors">
                            <TableCell className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 ring-2 ring-white">
                                        <AvatarImage src={member.avatarUrl} />
                                        <AvatarFallback className="text-[10px] font-bold">{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-black text-sm text-slate-900 italic">{member.name}</span>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{member.className || "No Class"}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center">
                                    <Checkbox 
                                        checked={attendance[member.studentId]} 
                                        onCheckedChange={() => toggleStudent(member.studentId)}
                                        className="h-5 w-5 rounded-md border-slate-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {members.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={2} className="h-32 text-center text-slate-400 italic">No members found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

        <DialogFooter className="bg-slate-50 p-8 flex items-center justify-between mt-4">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl font-bold text-slate-500">Cancel</Button>
          <Button 
            onClick={handleSaveAttendance} 
            disabled={loading || members.length === 0}
            className="rounded-xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black px-10 h-12 shadow-lg shadow-emerald-900/10"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Session Records"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
