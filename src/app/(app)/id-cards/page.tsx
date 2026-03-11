
"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getStudents,
  getEmployees,
  type Student,
  type Employee,
} from "@/app/lib/data";
import { IdCardDisplay } from "@/components/id-card-display";
import {
  Download,
  Printer,
  User,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function IdCardPage() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  const [selectedStudentId, setSelectedStudentId] = React.useState<string>("");
  const [selectedStaffId, setSelectedStaffId] = React.useState<string>("");

  const [visitorName, setVisitorName] = React.useState("");
  const [visitorPurpose, setVisitorPurpose] = React.useState("");

  const [generationState, setGenerationState] = React.useState<
    "idle" | "generated"
  >("idle");
  const [activeTab, setActiveTab] = React.useState("student");

  React.useEffect(() => {
    setStudents(getStudents());
    setEmployees(getEmployees());
  }, []);

  React.useEffect(() => {
    setGenerationState('idle');
  }, [activeTab, selectedStudentId, selectedStaffId, visitorName, visitorPurpose]);

  const selectedStudent = React.useMemo(
    () => students.find((s) => s.studentId === selectedStudentId),
    [students, selectedStudentId]
  );
  const selectedStaff = React.useMemo(
    () => employees.find((e) => e.employeeId === selectedStaffId),
    [employees, selectedStaffId]
  );

  const getActiveUser = () => {
    if (activeTab === 'student' && selectedStudent) {
      return {
        id: selectedStudent.studentId,
        name: selectedStudent.name,
        avatarUrl: selectedStudent.avatarUrl,
        role: selectedStudent.class,
        type: 'Student' as 'Student' | 'Staff' | 'Visitor',
        dob: "2008-05-12", // Placeholder
        address: "123 Maple Street", // Placeholder
        medical: selectedStudent.medical,
      };
    }
    if (activeTab === 'staff' && selectedStaff) {
      return {
        id: selectedStaff.employeeId,
        name: selectedStaff.name,
        avatarUrl: selectedStaff.avatarUrl,
        role: selectedStaff.designation,
        type: 'Staff' as 'Student' | 'Staff' | 'Visitor',
        dob: "1985-10-20", // Placeholder
        address: "456 Oak Avenue", // Placeholder
        medical: (selectedStaff as any).medical, // Casting as any for demo
      };
    }
    if (activeTab === 'visitor') {
      return {
        id: `VIS${Date.now()}`,
        name: visitorName,
        avatarUrl: '',
        role: visitorPurpose,
        type: 'Visitor' as 'Student' | 'Staff' | 'Visitor',
        dob: new Date().toLocaleDateString(),
        address: visitorPurpose,
      };
    }
    return null;
  }

  const activeUser = getActiveUser();

  const handleGenerate = () => {
    const user = getActiveUser();
    if (!user) {
      toast({ variant: "destructive", title: "Selection Required", description: `Please select a ${activeTab}.` });
      return;
    }
    if (user.type === 'Visitor' && (!user.name || !user.role)) {
      toast({ variant: "destructive", title: "Visitor Details Required", description: "Please enter the visitor's name and purpose of visit." });
      return;
    }
    setGenerationState("generated");
  };

  const handlePrint = () => {
    const cardElements = document.querySelectorAll('.id-card-print-area');
    if (cardElements.length > 0) {
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print ID Cards</title>');
        printWindow.document.write('<style>@media print { @page { size: landscape; margin: 10mm; } body { margin: 0; } .card-container { display: flex; flex-wrap: wrap; gap: 10px; } .card { page-break-inside: avoid; border: 1px solid #eee; } img { max-width: 100%; } }</style>');
        printWindow.document.write('</head><body><div class="card-container">');

        cardElements.forEach(el => {
          printWindow.document.write(el.outerHTML);
        });

        printWindow.document.write('</div></body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { // Timeout necessary for some browsers
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    }
  }

  const handleDownload = async (cardId: string, filename: string) => {
    const element = document.getElementById(cardId);
    if (!element) {
      toast({ variant: "destructive", title: "Download Failed", description: "Card element not found." });
      return;
    }
    const canvas = await html2canvas(element, { scale: 3 });
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">ID Card Generation</CardTitle>
        <CardDescription>
          Create and print official ID cards for students, staff, and
          visitors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6 md:col-span-1">
            <Tabs
              defaultValue="student"
              className="w-full"
              onValueChange={(value) => {
                setActiveTab(value);
                setGenerationState("idle");
              }}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="visitor">Visitor</TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="pt-4">
                <Label htmlFor="student-select">Select Student</Label>
                <Select
                  onValueChange={setSelectedStudentId}
                  value={selectedStudentId}
                >
                  <SelectTrigger id="student-select">
                    <SelectValue placeholder="Search for a student..." />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.studentId} value={s.studentId}>
                        {s.name} ({s.class})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="staff" className="pt-4">
                <Label htmlFor="staff-select">Select Staff Member</Label>
                <Select
                  onValueChange={setSelectedStaffId}
                  value={selectedStaffId}
                >
                  <SelectTrigger id="staff-select">
                    <SelectValue placeholder="Search for a staff member..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((e) => (
                      <SelectItem key={e.employeeId} value={e.employeeId}>
                        {e.name} ({e.designation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="visitor" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visitor-name">Visitor Name</Label>
                  <Input
                    id="visitor-name"
                    placeholder="e.g. John Doe"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visitor-purpose">Purpose of Visit</Label>
                  <Input
                    id="visitor-purpose"
                    placeholder="e.g. Guest Lecture"
                    value={visitorPurpose}
                    onChange={(e) => setVisitorPurpose(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex flex-col gap-2">
              <Button onClick={handleGenerate} disabled={!activeUser || (activeTab === 'visitor' && (!visitorName || !visitorPurpose))}>
                <User className="mr-2 h-4 w-4" />
                Generate Card
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full" onClick={handlePrint} disabled={generationState !== "generated"}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleDownload('id-card-front', `ID-Card-${activeUser?.id}-front.png`)} disabled={generationState !== "generated"}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-6 justify-center">
              <IdCardDisplay
                user={activeUser}
                generationState={generationState}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
