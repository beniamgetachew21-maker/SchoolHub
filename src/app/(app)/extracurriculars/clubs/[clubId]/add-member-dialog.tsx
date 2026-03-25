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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Loader2 } from "lucide-react"
import { registerClubMembershipAction, getStudentsAction } from "@/lib/flow-actions"
import { toast } from "@/hooks/use-toast"

interface AddMemberDialogProps {
  clubId: string
  clubName: string
}

export function AddMemberDialog({ clubId, clubName }: AddMemberDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [fetchingStudents, setFetchingStudents] = React.useState(false)
  const [students, setStudents] = React.useState<any[]>([])
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>("")

  const loadStudents = async () => {
    setFetchingStudents(true)
    const data = await getStudentsAction()
    setStudents(data)
    setFetchingStudents(false)
  }

  React.useEffect(() => {
    if (open) {
      loadStudents()
    }
  }, [open])

  const handleAddMember = async () => {
    if (!selectedStudentId) {
      toast({
        title: "Selection Required",
        description: "Please select a student to add to the club.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    const result = await registerClubMembershipAction(selectedStudentId, clubId)
    setLoading(false)

    if (result.success) {
      toast({
        title: "Success",
        description: "Student has been added to the club.",
      })
      setOpen(false)
      setSelectedStudentId("")
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add student.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
         <Button className="rounded-2xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black text-xs uppercase tracking-widest h-11 px-6 shadow-lg shadow-emerald-900/10">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Member
         </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-transparent shadow-2xl overflow-hidden bg-white">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-black text-2xl uppercase tracking-tighter italic text-slate-900">Add New Member</DialogTitle>
          <DialogDescription className="text-sm font-medium">
            Register a student for the {clubName}.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Student</label>
            <Select 
              value={selectedStudentId} 
              onValueChange={setSelectedStudentId}
              disabled={fetchingStudents || loading}
            >
              <SelectTrigger className="rounded-2xl border-slate-200 h-12">
                <SelectValue placeholder={fetchingStudents ? "Loading students..." : "Choose a student"} />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 shadow-xl overflow-y-auto max-h-[200px]">
                {students.map((student) => (
                  <SelectItem key={student.studentId} value={student.studentId} className="rounded-xl">
                    <div className="flex flex-col">
                      <span className="font-bold">{student.name}</span>
                      <span className="text-[10px] text-slate-400">{student.className || "No Class"}</span>
                    </div>
                  </SelectItem>
                ))}
                {students.length === 0 && !fetchingStudents && (
                   <div className="p-4 text-center text-xs text-slate-400">No students available</div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="bg-slate-50 p-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl font-bold text-slate-500">Cancel</Button>
          <Button 
            onClick={handleAddMember} 
            disabled={loading || !selectedStudentId}
            className="rounded-xl bg-[#163D2D] hover:bg-[#1e5240] text-white font-black px-8"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Registration"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
