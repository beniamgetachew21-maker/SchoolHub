
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { addEmployeeAction } from "@/lib/actions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  // Employee Detail
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  middleName: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.date({ required_error: "Date of birth is required." }),
  nationality: z.string().optional(),
  nationalId: z.string().optional(),
  passport: z.string().optional(),

  // Contact
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


  // Job
  dateOfJoining: z.date({ required_error: "Date of joining is required." }),
  probationEndDate: z.date().optional(),
  timeClockNeeded: z.boolean().default(false),
  placementEffectiveDate: z.date().optional(),
  designation: z.string().min(1, "Designation is required."),
  lineManager: z.string().optional(),
  department: z.string().min(1, "Department is required."),
  branch: z.string().optional(),
  level: z.string().optional(),

  // Employment Terms
  termsEffectiveDate: z.date().optional(),
  jobType: z.string().optional(),
  status: z.enum(["Active", "OnLeave", "Probation", "Resigned"]),
  description: z.string().optional(),
  leaveWorkflow: z.string().optional(),
  workday: z.string().optional(),
  holiday: z.string().optional(),
  termStartDate: z.date().optional(),
  termEndDate: z.date().optional(),

  // Salary
  salaryEffectiveDate: z.date().optional(),
  salary: z.coerce.number().min(0, "Salary must be a positive number."),
  salaryCurrency: z.string().default('USD'),
  nextReviewDate: z.date().optional(),
  paymentMethod: z.enum(['Bank', 'Cash']).default('Bank'),
  bankAccount: z.string().optional(),
  payPeriod: z.enum(['Monthly', 'Weekly']).default('Monthly'),

  // Family
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

  // Health
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

type AddEmployeeFormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 'employee_detail', title: 'Employee Detail', fields: ['firstName', 'lastName', 'gender', 'dob', 'nationality', 'nationalId', 'passport'] },
  { id: 'contact', title: 'Contact', fields: ['email', 'blog', 'officePhone', 'mobilePhone', 'housePhone', 'address1', 'city', 'country', 'emergencyFirstName', 'emergencyRelationship', 'emergencyMobilePhone'] },
  { id: 'job', title: 'Job', fields: ['dateOfJoining', 'designation', 'department', 'status'] },
  { id: 'salary', title: 'Salary', fields: ['salary', 'paymentMethod', 'payPeriod'] },
  { id: 'family', title: 'Family', fields: [] },
  { id: 'health', title: 'Health', fields: [] },
];

export function AddEmployeeForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);

  const form = useForm<AddEmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      department: "Academics",
      designation: "",
      salary: 3000,
      nationality: "Ethiopian",
      nationalId: "",
      passport: "",
      timeClockNeeded: false,
      branch: "Main Campus",
      level: "Junior",
      jobType: "Permanent",
      status: "Probation",
      leaveWorkflow: "DEFAULT",
      workday: "DEFAULT",
      holiday: "DEFAULT",
      salaryCurrency: "USD",
      paymentMethod: "Bank",
      payPeriod: "Monthly",
      maritalStatus: "Single",
      childrenCount: 0,
    },
  });

  const maritalStatus = form.watch('maritalStatus');

  const handleNotImplemented = () => {
    toast({
      title: "Feature In Progress",
      description: "This functionality is currently under development and will be available soon.",
    });
  }

  const next = async () => {
    const fields = steps[currentStep].fields as (keyof AddEmployeeFormValues)[];
    const output = await form.trigger(fields, { shouldFocus: true });
    if (output) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(step => step + 1);
      }
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  }

  function onSubmit(data: AddEmployeeFormValues) {
    const { firstName, middleName, lastName,
      visionLeft, visionRight, hearingLeft, hearingRight,
      handLeft, handRight, legLeft, legRight,
      emergencyMobilePhone, emergencyHousePhone, emergencyOfficePhone,
      ...rest
    } = data;
    const name = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();

    addEmployeeAction({
      name,
      ...rest,
      dob: format(data.dob, "yyyy-MM-dd"),
      dateOfJoining: format(data.dateOfJoining, "yyyy-MM-dd"),
      spouseBirthDate: data.spouseBirthDate ? format(data.spouseBirthDate, 'yyyy-MM-dd') : undefined,
      emergencyMobile: emergencyMobilePhone,
      emergencyHouse: emergencyHousePhone,
      emergencyOffice: emergencyOfficePhone,
    });

    toast({
      title: "Employee Added",
      description: `${name} has been successfully added to the directory.`,
    });
    form.reset();
    router.push("/hr/directory");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <div className="flex justify-between items-start mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center w-24">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  currentStep > index ? "bg-primary text-primary-foreground" :
                    currentStep === index ? "border-2 border-primary bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > index ? '✔' : index + 1}
                </div>
                <p className={cn("text-xs mt-2", currentStep >= index ? "font-semibold" : "")}>{step.title}</p>
              </div>
              {index < steps.length - 1 && <div className="flex-1 h-px bg-border mt-4 mx-4"></div>}
            </React.Fragment>
          ))}
        </div>

        {currentStep === 0 && (
          <div className="pt-6">
            <h3 className="text-lg font-medium mb-4">Employee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField name="firstName" render={({ field }) => (
                <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="e.g. Jane" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="middleName" render={({ field }) => (
                <FormItem><FormLabel>Middle Name (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="lastName" render={({ field }) => (
                <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="e.g. Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="gender" render={({ field }) => (
                <FormItem><FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />
              <FormField name="dob" render={({ field }) => (
                <FormItem><FormLabel>Date of Birth</FormLabel>
                  <Popover><PopoverTrigger asChild><FormControl>
                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent></Popover>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="nationality" render={({ field }) => (
                <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input placeholder="e.g. Ethiopian" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="nationalId" render={({ field }) => (
                <FormItem><FormLabel>National ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="passport" render={({ field }) => (
                <FormItem><FormLabel>Passport Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="pt-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (for Web Account)</FormLabel>
                    <FormControl><Input type="email" placeholder="e.g. employee@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="mobilePhone" render={({ field }) => (
                  <FormItem><FormLabel>Mobile Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField control={form.control} name="address1" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
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
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyRelationship" render={({ field }) => (
                  <FormItem><FormLabel>Relationship</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyMobilePhone" render={({ field }) => (
                  <FormItem><FormLabel>Mobile Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="pt-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Job Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField name="dateOfJoining" render={({ field }) => (
                  <FormItem><FormLabel>Date Joined</FormLabel>
                    <Popover><PopoverTrigger asChild><FormControl>
                      <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="designation" render={({ field }) => (
                  <FormItem><FormLabel>Job Position</FormLabel>
                    <FormControl><Input placeholder="e.g. Science Teacher" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="department" render={({ field }) => (
                  <FormItem><FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Academics">Academics</SelectItem>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Support Staff">Support Staff</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage /></FormItem>
                )} />
                <FormField name="status" render={({ field }) => (
                  <FormItem><FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Probation">Probation</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="OnLeave">On Leave</SelectItem>
                        <SelectItem value="Resigned">Resigned</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="pt-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Salary Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg">
                <FormField name="salary" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Basic Salary</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField name="payPeriod" render={({ field }) => (
                  <FormItem><FormLabel>Pay Period</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Weekly">Weekly</SelectItem></SelectContent>
                    </Select>
                    <FormMessage /></FormItem>
                )} />
                <FormField name="paymentMethod" render={({ field }) => (
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
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="pt-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Spouse & Children</h3>
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
                <FormField control={form.control} name="childrenCount" render={({ field }) => (
                  <FormItem><FormLabel>Number of Children</FormLabel><FormControl><Input type="number" min={0} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="pt-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Health Information</h3>
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
          </div>
        )}

        <div className="flex justify-between pt-8">
          {currentStep > 0 && <Button type="button" variant="outline" onClick={prev}>Previous</Button>}
          <div /> {/* Spacer */}
          {currentStep < steps.length - 1 && <Button type="button" onClick={next}>Next</Button>}
          {currentStep === steps.length - 1 && <Button type="submit">Add Employee</Button>}
        </div>
      </form>
    </Form>
  );
}
