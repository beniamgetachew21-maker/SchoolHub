
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type Employee } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import * as React from "react";

const formSchema = z.object({
  employeeId: z.string(),
  employeeCode: z.string(),
  avatarUrl: z.string().url(),
  name: z.string().min(2, "Name is required."),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.date({ required_error: "Date of birth is required." }),
  nationality: z.string().optional(),
  nationalId: z.string().optional(),
  passport: z.string().optional(),
  email: z.string().email("Please enter a valid email for the web account."),
  blog: z.string().url().optional().or(z.literal('')),
  officePhone: z.string().optional(),
  mobilePhone: z.string().optional(),
  housePhone: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  emergencyFirstName: z.string().optional(),
  emergencyMiddleName: z.string().optional(),
  emergencyLastName: z.string().optional(),
  emergencyRelationship: z.string().optional(),
  emergencyMobilePhone: z.string().optional(),
  emergencyHousePhone: z.string().optional(),
  emergencyOfficePhone: z.string().optional(),
  dateOfJoining: z.date({ required_error: "Date of joining is required." }),
  probationEndDate: z.date().optional(),
  timeClockNeeded: z.boolean().default(false),
  placementEffectiveDate: z.date().optional(),
  designation: z.string().min(1, "Designation is required."),
  lineManager: z.string().optional(),
  department: z.string().min(1, "Department is required."),
  branch: z.string().optional(),
  level: z.string().optional(),
  termsEffectiveDate: z.date().optional(),
  jobType: z.string().optional(),
  status: z.enum(["Active", "OnLeave", "Probation", "Resigned"]),
  description: z.string().optional(),
  leaveWorkflow: z.string().optional(),
  workday: z.string().optional(),
  holiday: z.string().optional(),
  termStartDate: z.date().optional(),
  termEndDate: z.date().optional(),
  salaryEffectiveDate: z.date().optional(),
  salary: z.coerce.number().min(0, "Salary must be a positive number."),
  salaryCurrency: z.string().default('USD'),
  nextReviewDate: z.date().optional(),
  paymentMethod: z.enum(['Bank', 'Cash']).default('Bank'),
  bankAccount: z.string().optional(),
  payPeriod: z.enum(['Monthly', 'Weekly']).default('Monthly'),
  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']).optional(),
  spouseWorking: z.boolean().default(false),
  spouseFirstName: z.string().optional(),
  spouseMiddleName: z.string().optional(),
  spouseLastName: z.string().optional(),
  spouseBirthDate: z.date().optional(),
  spouseNationality: z.string().optional(),
  spouseNationalId: z.string().optional(),
  spousePassport: z.string().optional(),
  spouseEthnicity: z.string().optional(),
  spouseReligion: z.string().optional(),
  childrenCount: z.coerce.number().int().min(0).optional(),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  bloodType: z.string().optional(),
  visionLeft: z.string().optional(),
  visionRight: z.string().optional(),
  hearingLeft: z.string().optional(),
  hearingRight: z.string().optional(),
  handLeft: z.string().optional(),
  handRight: z.string().optional(),
  legLeft: z.string().optional(),
  legRight: z.string().optional(),
});

type EditEmployeeFormValues = z.infer<typeof formSchema>;

interface EditEmployeeFormProps {
  employee: Employee;
  onFormSubmit: (data: Employee) => void;
}

export function EditEmployeeForm({ employee, onFormSubmit }: EditEmployeeFormProps) {

  const form = useForm<EditEmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...employee,
      status: employee.status as "Active" | "OnLeave" | "Probation" | "Resigned",
      gender: employee.gender as "Male" | "Female" | "Other",
      dob: parseISO(employee.dob),
      dateOfJoining: parseISO(employee.dateOfJoining),
      nationality: employee.nationality || "",
      nationalId: employee.nationalId || "",
      passport: employee.passport || "",
      lineManager: employee.lineManager || "",
      branch: employee.branch || "",
      jobType: employee.jobType || "",
      bankAccount: employee.bankAccount || "",
      blog: employee.blog || "",
      officePhone: employee.officePhone || "",
      mobilePhone: employee.mobilePhone || "",
      housePhone: employee.housePhone || "",
      address1: employee.address1 || "",
      address2: employee.address2 || "",
      city: employee.city || "",
      postcode: employee.postcode || "",
      state: employee.state || "",
      country: employee.country || "",
      emergencyFirstName: employee.emergencyFirstName || "",
      emergencyMiddleName: employee.emergencyMiddleName || "",
      emergencyLastName: employee.emergencyLastName || "",
      emergencyRelationship: employee.emergencyRelationship || "",
      emergencyMobilePhone: employee.emergencyMobile || "",
      emergencyHousePhone: employee.emergencyHouse || "",
      emergencyOfficePhone: employee.emergencyOffice || "",
      maritalStatus: (employee.maritalStatus as any) || "Single",
      spouseWorking: employee.spouseWorking || false,
      spouseFirstName: employee.spouseFirstName || "",
      spouseMiddleName: employee.spouseMiddleName || "",
      spouseLastName: employee.spouseLastName || "",
      spouseBirthDate: employee.spouseBirthDate ? parseISO(employee.spouseBirthDate) : undefined,
      spouseNationality: employee.spouseNationality || "",
      spouseNationalId: employee.spouseNationalId || "",
      spousePassport: employee.spousePassport || "",
      spouseEthnicity: employee.spouseEthnicity || "",
      spouseReligion: employee.spouseReligion || "",
      childrenCount: employee.childrenCount || 0,
      height: employee.height || undefined,
      weight: employee.weight || undefined,
      paymentMethod: (employee.paymentMethod ?? 'Bank') as 'Bank' | 'Cash',
      payPeriod: (employee.payPeriod ?? 'Monthly') as 'Monthly' | 'Weekly',
      bloodType: employee.bloodType ?? "",
      visionLeft: "",
      visionRight: "",
      hearingLeft: "",
      hearingRight: "",
      handLeft: "",
      handRight: "",
      legLeft: "",
      legRight: "",
    },
  });

  const handleNotImplemented = () => {
    toast({
      title: "Feature In Progress",
      description: "This functionality is currently under development.",
    });
  }

  function onSubmit(data: EditEmployeeFormValues) {
    const {
      visionLeft, visionRight, hearingLeft, hearingRight,
      handLeft, handRight, legLeft, legRight,
      emergencyMobilePhone, emergencyHousePhone, emergencyOfficePhone,
      ...rest
    } = data;

    const updatedEmployeeData = {
      ...rest,
      dob: format(data.dob, "yyyy-MM-dd"),
      dateOfJoining: format(data.dateOfJoining, "yyyy-MM-dd"),
      spouseBirthDate: data.spouseBirthDate ? format(data.spouseBirthDate, 'yyyy-MM-dd') : undefined,
      emergencyMobile: emergencyMobilePhone,
      emergencyHouse: emergencyHousePhone,
      emergencyOffice: emergencyOfficePhone,
    };

    onFormSubmit(updatedEmployeeData as any as Employee);

    toast({
      title: "Employee Updated",
      description: `${data.name}'s profile has been successfully updated.`,
    });
  }

  const maritalStatus = form.watch('maritalStatus');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <Tabs defaultValue="employee_detail" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="employee_detail">Employee Detail</TabsTrigger>
            <TabsTrigger value="job">Job</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>
          <TabsContent value="employee_detail" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover><PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent></Popover>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Ethiopian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (for Web Account)</FormLabel>
                  <FormControl><Input type="email" placeholder="e.g. employee@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </TabsContent>
          <TabsContent value="job" className="pt-6 space-y-8">
            <div className="space-y-4">
              <h4 className="text-md font-medium">Job Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField
                  control={form.control}
                  name="dateOfJoining"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Joined</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField control={form.control} name="probationEndDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>End of Probation</FormLabel>
                    <Popover><PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="timeClockNeeded" render={({ field }) => (
                  <FormItem className="flex items-end">
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Time Clock Needed</FormLabel>
                    </div>
                  </FormItem>
                )} />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-medium">Placement</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="placementEffectiveDate" render={({ field }) => (
                  <FormItem><FormLabel>Effective Date</FormLabel>
                    <Popover><PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="designation" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Position</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="e.g. Science Teacher" {...field} />
                      </FormControl>
                      <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={handleNotImplemented}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lineManager" render={({ field }) => (
                  <FormItem><FormLabel>Line Manager</FormLabel>
                    <FormControl><Input placeholder="Manager's name" {...field} /></FormControl>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="department" render={({ field }) => (
                  <FormItem><FormLabel>Department</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Academics">Academics</SelectItem>
                          <SelectItem value="Administration">Administration</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Support Staff">Support Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={handleNotImplemented}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="branch" render={({ field }) => (
                  <FormItem><FormLabel>Branch</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a branch" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="Main Campus">Main Campus</SelectItem></SelectContent>
                      </Select>
                      <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={handleNotImplemented}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="level" render={({ field }) => (
                  <FormItem><FormLabel>Level</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a level" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="Junior">Junior</SelectItem><SelectItem value="Senior">Senior</SelectItem><SelectItem value="Lead">Lead</SelectItem></SelectContent>
                      </Select>
                      <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={handleNotImplemented}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="contact" className="pt-6 space-y-8">
            <div className="space-y-4">
              <h4 className="text-md font-medium">Phone</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="officePhone" render={({ field }) => (
                  <FormItem><FormLabel>Office Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="mobilePhone" render={({ field }) => (
                  <FormItem><FormLabel>Mobile Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="housePhone" render={({ field }) => (
                  <FormItem><FormLabel>House Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="address1" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address2" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Address Line 2</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="postcode" render={({ field }) => (
                  <FormItem><FormLabel>Postcode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium">In Case of Emergency</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="emergencyFirstName" render={({ field }) => (
                  <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyLastName" render={({ field }) => (
                  <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyRelationship" render={({ field }) => (
                  <FormItem><FormLabel>Relationship</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyMobilePhone" render={({ field }) => (
                  <FormItem><FormLabel>Mobile Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyHousePhone" render={({ field }) => (
                  <FormItem><FormLabel>House Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyOfficePhone" render={({ field }) => (
                  <FormItem><FormLabel>Office Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="salary" className="pt-6 space-y-8">
            <div className="space-y-4">
              <h4 className="text-md font-medium">Salary Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="salaryEffectiveDate" render={({ field }) => (
                  <FormItem><FormLabel>Effective Date</FormLabel>
                    <Popover><PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                    <FormMessage /></FormItem>
                )} />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Basic Salary</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="nextReviewDate" render={({ field }) => (
                  <FormItem><FormLabel>Next Review</FormLabel>
                    <Popover><PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                    <FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-md font-medium">Earnings & Deductions</h4>
                <div className="border p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-center text-sm text-muted-foreground"><p>Earning</p><Button variant="outline" size="sm" type="button" onClick={handleNotImplemented}>Add</Button></div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground"><p>Deduction</p><Button variant="outline" size="sm" type="button" onClick={handleNotImplemented}>Add</Button></div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground"><p>Bonus</p><Button variant="outline" size="sm" type="button" onClick={handleNotImplemented}>Add</Button></div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground"><p>Statutory Contribution</p><Button variant="outline" size="sm" type="button" onClick={handleNotImplemented}>Add</Button></div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-md font-medium">Payment Details</h4>
                <div className="border p-4 rounded-lg space-y-4">
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl><RadioGroupItem value="Bank" /></FormControl>
                            <FormLabel className="font-normal">Bank</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl><RadioGroupItem value="Cash" /></FormControl>
                            <FormLabel className="font-normal">Cash</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="bankAccount" render={({ field }) => (
                    <FormItem><FormLabel>IBAN / Bank Account</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="payPeriod" render={({ field }) => (
                    <FormItem><FormLabel>Pay Period</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Weekly">Weekly</SelectItem></SelectContent>
                      </Select>
                      <FormMessage /></FormItem>
                  )} />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="family" className="pt-6 space-y-8">
            <div className="space-y-4">
              <h4 className="text-md font-medium">Spouse</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                  <FormItem><FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="spouseWorking" render={({ field }) => (
                  <FormItem className="flex items-end">
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={maritalStatus !== 'Married'} /></FormControl>
                      <FormLabel className={cn(maritalStatus !== 'Married' && 'text-muted-foreground')}>Spouse Working</FormLabel>
                    </div>
                  </FormItem>
                )} />
                <FormField control={form.control} name="spouseFirstName" render={({ field }) => (
                  <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} disabled={maritalStatus !== 'Married'} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="spouseLastName" render={({ field }) => (
                  <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} disabled={maritalStatus !== 'Married'} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="spouseBirthDate" render={({ field }) => (
                  <FormItem><FormLabel>Birth Date</FormLabel>
                    <Popover><PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")} disabled={maritalStatus !== 'Married'}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="spouseNationality" render={({ field }) => (
                  <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input {...field} disabled={maritalStatus !== 'Married'} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium">Children</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="childrenCount" render={({ field }) => (
                  <FormItem><FormLabel>Number of Children</FormLabel><FormControl><Input type="number" min={0} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="health" className="pt-6 space-y-8">
            <div className="space-y-4">
              <h4 className="text-md font-medium">Physical</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="bloodType" render={({ field }) => (
                  <FormItem><FormLabel>Blood Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium">Sensory</h4>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="visionLeft" render={({ field }) => (
                  <FormItem><FormLabel>Vision (Left)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="visionRight" render={({ field }) => (
                  <FormItem><FormLabel>Vision (Right)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="hearingLeft" render={({ field }) => (
                  <FormItem><FormLabel>Hearing (Left)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="hearingRight" render={({ field }) => (
                  <FormItem><FormLabel>Hearing (Right)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium">Limbs</h4>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="handLeft" render={({ field }) => (
                  <FormItem><FormLabel>Hand (Left)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="handRight" render={({ field }) => (
                  <FormItem><FormLabel>Hand (Right)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="legLeft" render={({ field }) => (
                  <FormItem><FormLabel>Leg (Left)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="legRight" render={({ field }) => (
                  <FormItem><FormLabel>Leg (Right)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-8">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
