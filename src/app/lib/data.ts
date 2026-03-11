


// A simple in-memory data store to simulate a database for the prototype.
import placeholderImages from '@/lib/placeholder-images.json';
import { z } from 'zod';

export type Application = {
    id: string;
    name: string;
    class: string;
    date: string;
    status: "Pending" | "Approved" | "Rejected" | "Approved - Pending Payment" | "Completed";
    dob: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    parent: string;
    parentPhone: string;
    documents: {
        birthCertificate: string;
        birthCertificateUrl?: string;
        previousMarksheet?: string;
    };
};

export type Student = {
    studentId: string;
    admissionNumber: string;
    name: string;
    class: string;
    parent: string;
    status: "Active" | "Inactive";
    email: string;
    avatarUrl: string;
    dob?: string;
    gender?: string;
    address?: string;
    enrollmentDate?: string;
    medical?: {
        allergies: string[];
        conditions: string[];
        bloodGroup: string;
        emergencyContact: {
            name: string;
            relation: string;
            phone: string;
        }
    }
};

export type Employee = {
    employeeId: string;
    employeeCode: string;
    name: string;
    dob: string;
    gender: string;
    nationality?: string;
    nationalId?: string;
    passport?: string;
    department: string;
    designation: string;
    dateOfJoining: string;
    email: string;
    status: "Active" | "OnLeave" | "Probation" | "Resigned";
    avatarUrl: string;
    salary: number;
    allowances?: number;
    deductions?: number;
    branch?: string;
    jobType?: string;
    lineManager?: string;
    paymentMethod?: 'Bank' | 'Cash';
    payPeriod?: 'Monthly' | 'Weekly';
    bankAccount?: string;
    family?: {
        maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
        spouseWorking?: boolean;
        spouseFirstName?: string;
        spouseMiddleName?: string;
        spouseLastName?: string;
        spouseBirthDate?: string;
        spouseNationality?: string;
        spouseNationalId?: string;
        spousePassport?: string;
        spouseEthnicity?: string;
        spouseReligion?: string;
        childrenCount?: number;
    },
    contact?: {
        blog?: string;
        officePhone?: string;
        mobilePhone?: string;
        housePhone?: string;
    },
    address?: {
        address1?: string;
        address2?: string;
        city?: string;
        postcode?: string;
        state?: string;
        country?: string;
    },
    emergencyContact?: {
        firstName?: string;
        middleName?: string;
        lastName?: string;
        relationship?: string;
        mobilePhone?: string;
        housePhone?: string;
        officePhone?: string;
    },
    health?: {
        height?: number;
        weight?: number;
        bloodType?: string;
        vision?: { left?: string; right?: string; };
        hearing?: { left?: string; right?: string; };
        hand?: { left?: string; right?: string; };
        leg?: { left?: string; right?: string; };
    }
}

export type Candidate = {
    candidateId: string;
    name: string;
    position: string;
    stage: "Applied" | "Shortlisted" | "Interview" | "Offer" | "Hired" | "Rejected";
    appliedDate: string;
}

export type OnboardingTask = {
    taskId: string;
    employeeId: string;
    taskName: string;
    status: "Pending" | "Completed";
    dueDate: string | null;
}

export type LeaveRequest = {
    requestId: string;
    employeeId: string;
    leaveType: "Annual" | "Sick" | "Maternity" | "Unpaid";
    startDate: string;
    endDate: string;
    daysCount: number;
    reason: string;
    status: "Pending" | "Approved" | "Rejected";
}

export type LeavePolicy = {
    id: string;
    name: "Annual" | "Sick" | "Maternity" | "Unpaid";
    days: number;
    description: string;
};

export type StudentLeaveRequest = {
    requestId: string;
    studentId: string;
    leaveType: "Sick" | "Vacation" | "Family Event";
    startDate: string;
    endDate: string;
    daysCount: number;
    status: "Pending" | "Approved" | "Rejected";
    reason: string;
}


export type Book = {
    bookId: number;
    title: string;
    author: string;
    isbn: string;
    genre: string;
    totalCopies: number;
    availableCopies: number;
}

export type BorrowRecord = {
    recordId: number;
    studentId: string;
    bookId: number;
    borrowDate: string;
    dueDate: string;
    returnDate: string | null;
}

export type BorrowRequest = {
    requestId: string;
    studentId: string;
    bookId: number;
    requestDate: string;
    status: "Pending" | "Ready for Pickup" | "Fulfilled" | "Cancelled";
};


export type Invoice = {
    invoiceId: string;
    studentId: string;
    amount: number;
    dueDate: string;
    status: "Paid" | "Unpaid" | "Overdue";
    description?: string;
}

export type Payment = {
    paymentId: string;
    studentId: string;
    invoiceId: string;
    amount: number;
    date: string;
    method: "Online" | "Cash" | "Bank Transfer";
}

export type Transaction = {
    id: string;
    date: string;
    description: string;
    type: "Income" | "Expense";
    category: string;
    amount: number;
    method: string;
};

export type FeeStructure = {
    structureId: string;
    name: string;
    items: {
        name: string;
        amount: number;
    }[];
};


export type Vehicle = {
    vehicleId: string;
    vehicleNumber: string;
    model: string;
    capacity: number;
    status: "Active" | "Maintenance" | "Inactive";
    driverId: string | null;
}

export type Driver = {
    driverId: string;
    name: string;
    licenseNumber: string;
    phone: string;
    status: "Active" | "On Leave" | "Inactive";
}

export type Route = {
    routeId: string;
    routeName: string;
    vehicleId: string;
    driverId: string;
    stops: number;
    students: number;
    status: "Active" | "Inactive";
}

export type TimetableSlot = {
    day: string;
    period: number;
    subjectId: string;
    roomId?: string;
};

export type Assessment = {
    assessmentId: string;
    name: string;
    type: "Formative" | "Summative" | "Quiz" | "Exam";
    subject: string;
    maxMarks: number;
    date: string;
}

export type AssessmentResult = {
    resultId: string;
    assessmentId: string;
    studentId: string;
    marksObtained: number;
    grade: string;
    remarks: string | null;
}

export type AttendanceSummary = {
    studentId: string;
    totalDays: number;
    presentDays: number;
    absentDays: number;
    leaveDays: number;
};

export type Announcement = {
    id: number;
    title: string;
    date: string;
    postedBy: string;
    content: string;
    category: 'General' | 'Homework' | 'Exam';
    dueDate?: string;
}

export type ClassSection = {
    classId: number;
    name: string;
    classTeacherId: string;
    studentCount: number;
    subjectCount: number;
}

export type Subject = {
    subjectId: string;
    name: string;
    teacherId: string;
};

export type Classroom = {
    roomId: string;
    name: string;
    isLab: boolean;
};

export type ClassSubject = {
    classId: number;
    subjectId: string;
    teacherId: string;
};

export type Hostel = {
    hostelId: string;
    name: string;
    type: 'Boys' | 'Girls';
    wardenId: string;
    totalRooms: number;
    occupiedRooms: number;
}

export type Room = {
    roomId: string;
    hostelId: string;
    roomNumber: string;
    type: 'Single' | 'Double' | 'Triple';
    status: 'Vacant' | 'Occupied';
    studentId: string | null;
}

export type HostelVisitor = {
    visitorId: string;
    visitorName: string;
    studentId: string;
    checkInTime: string;
    checkOutTime: string | null;
    status: 'Checked In' | 'Checked Out';
}

export type MenuItem = {
    itemId: string;
    name: string;
    category: 'Main Course' | 'Snacks' | 'Beverage' | 'Dessert';
    price: number;
    isVegetarian: boolean;
    allergens: string[];
};

export type Alumni = {
    alumniId: string;
    name: string;
    graduationYear: number;
    major: string;
    currentCompany: string;
    currentPosition: string;
    email: string;
    linkedinUrl?: string;
    avatarUrl: string;
};

export type Club = {
    clubId: string;
    name: string;
    description: string;
    facultyAdvisorId: string;
    memberCount: number;
    imageUrl: string;
    imageHint: string;
}

export type ClubMember = {
    clubId: string;
    studentId: string;
}

export type InfirmaryVisit = {
    visitId: string;
    studentId: string;
    date: string;
    reason: string;
    treatment: string;
    notes: string | null;
}

export type Achievement = {
    achievementId: string;
    studentId: string;
    achievement: string;
    date: string;
    category: 'Academic' | 'Sports' | 'Arts';
};

export type ExtracurricularEvent = {
    eventId: string;
    name: string;
    clubName: string;
    date: string;
    participantCount: number;
};

export type Donation = {
    donationId: string;
    donorName: string;
    campaign: string;
    amount: number;
    date: string;
};

export type AlumniEvent = {
    eventId: string;
    name: string;
    date: string;
    location: string;
    description?: string;
    rsvpCount: number;
};

export type JobPosting = {
    jobId: string;
    title: string;
    company: string;
    location: string;
    type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    description?: string;
    postedDate: string;
    applyLink: string;
};

export type InventoryItem = {
    itemId: string;
    name: string;
    category: 'Office Supplies' | 'Lab Equipment' | 'Sports Gear' | 'Electronics' | 'Furniture' | 'Uniform';
    quantity: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    purchasePrice?: number;
    purchaseDate?: string;
    warrantyEndDate?: string;
    imageUrl?: string;
    imageHint?: string;
    isForSale: boolean;
};

export type Vendor = {
    vendorId: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
};

export type PurchaseOrder = {
    poId: string;
    vendorId: string;
    orderDate: string;
    items: { itemId: string; quantity: number; unitPrice: number }[];
    totalAmount: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Ordered' | 'Completed';
};

export type AssetAllocation = {
    allocationId: string;
    itemId: string;
    assigneeId: string;
    assigneeType: 'Student' | 'Employee' | 'Department';
    issueDate: string;
    dueDate: string;
    returnDate: string | null;
};

export type MaintenanceLog = {
    logId: string;
    itemId: string;
    date: string;
    type: 'Scheduled' | 'Repair' | 'Upgrade';
    description: string;
    cost: number;
};

export type SubscriberList = {
    id: string;
    name: string;
    subscriberCount: number;
};

export type Newsletter = {
    id: string;
    title: string;
    content: string;
    date: string;
    recipients: number;
    listId: string;
};

export type Subscription = {
    listId: string;
    studentId: string;
};

export type DisciplinaryRecord = {
    recordId: string;
    studentId: string;
    date: string;
    incident: string;
    actionTaken: string;
    reportedBy: string;
    severity: 'Low' | 'Medium' | 'High';
}


// AI Schema Types
export const VerificationInputSchema = z.object({
    photoDataUri: z
        .string()
        .describe(
            "A photo of the birth certificate, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    name: z.string().describe('The full name of the student as submitted in the form.'),
    dob: z.string().describe('The date of birth of the student as submitted in the form (YYYY-MM-DD).'),
});
export type VerificationInput = z.infer<typeof VerificationInputSchema>;

export const VerificationOutputSchema = z.object({
    isBirthCertificate: z.boolean().describe('Whether or not the document appears to be a birth certificate.'),
    extractedName: z.string().optional().describe('The full name extracted from the document.'),
    extractedDob: z.string().optional().describe('The date of birth extracted from the document in YYYY-MM-DD format.'),
    nameMatches: z.boolean().describe('Whether the extracted name matches the submitted name.'),
    dobMatches: z.boolean().describe('Whether the extracted date of birth matches the submitted date of birth.'),
    failureReason: z.string().optional().describe('The reason for verification failure, if any.')
});
export type VerificationOutput = z.infer<typeof VerificationOutputSchema>;

export const IdCardInputSchema = z.object({
    photoDataUri: z
        .string()
        .describe(
            "A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    name: z.string().describe('The full name of the user.'),
    userId: z.string().describe("The user's ID number."),
    className: z.string().describe("The user's class (for students) or designation (for staff)."),
    schoolName: z.string().describe('The name of the school.'),
    userType: z.enum(['Student', 'Staff']).describe('The type of user for whom the card is being generated.'),
});
export type IdCardInput = z.infer<typeof IdCardInputSchema>;

export const IdCardOutputSchema = z.object({
    idCardDataUri: z.string().describe('The generated ID card image as a data URI.'),
});
export type IdCardOutput = z.infer<typeof IdCardOutputSchema>;

export const AssessmentQuestionSchema = z.object({
    question: z.string().describe('The multiple-choice question.'),
    options: z.array(z.string()).describe('An array of 4 possible answers.'),
    correctAnswer: z.string().describe('The correct answer from the options.'),
});

export const AssessmentOutputSchema = z.object({
    questions: z.array(AssessmentQuestionSchema).describe('An array of generated questions.'),
});
export type AssessmentOutput = z.infer<typeof AssessmentOutputSchema>;


export const AssessmentInputSchema = z.object({
    subject: z.string().describe('The subject of the assessment (e.g., Mathematics, History).'),
    topic: z.string().describe('The specific topic for the assessment (e.g., "World War II", "Algebraic Equations").'),
    numQuestions: z.coerce.number().int().min(1).max(20).describe('The number of questions to generate.'),
    gradeLevel: z.string().describe('The grade level of the students (e.g., "Grade 10", "University Level").'),
});
export type AssessmentInput = z.infer<typeof AssessmentInputSchema>;

export const JobDescriptionInputSchema = z.object({
    jobTitle: z.string().describe('The title of the job position (e.g., "Physics Teacher", "Librarian").'),
    gradeLevel: z.string().optional().describe('The grade level the position is for (e.g., "High School", "Middle School").'),
    companyName: z.string().default('Global Academy').describe('The name of the school or institution.'),
});
export type JobDescriptionInput = z.infer<typeof JobDescriptionInputSchema>;

export const JobDescriptionOutputSchema = z.object({
    jobDescription: z.string().describe('The full, professionally written job description in markdown format.'),
});
export type JobDescriptionOutput = z.infer<typeof JobDescriptionOutputSchema>;

export const PaymentIntentInputSchema = z.object({
    amount: z.number().int().min(1, "Amount must be at least 1 cent."),
    description: z.string().min(1, "A description for the payment is required."),
    metadata: z.record(z.string()).optional(),
});
export type PaymentIntentInput = z.infer<typeof PaymentIntentInputSchema>;

export const PaymentIntentOutputSchema = z.object({
    clientSecret: z.string(),
});
export type PaymentIntentOutput = z.infer<typeof PaymentIntentOutputSchema>;


// Initial Data
let applications: Application[] = [
    {
        id: "REG001",
        name: "Sophia Lee",
        class: "Grade 9",
        date: "2024-08-15",
        status: "Pending",
        dob: "2009-03-22",
        gender: "Female",
        email: "sophia.lee@example.com",
        phone: "+1-202-555-0182",
        address: "789 Pine St, Anytown, USA",
        parent: "Grace Lee",
        parentPhone: "+1-202-555-0183",
        documents: {
            birthCertificate: "sophia_lee_birth_cert.pdf",
            birthCertificateUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // Placeholder
        },
    },
    {
        id: "REG002",
        name: "Liam Chen",
        class: "Grade 11",
        date: "2024-08-14",
        status: "Pending",
        dob: "2007-07-10",
        gender: "Male",
        email: "liam.chen@example.com",
        phone: "+1-202-555-0121",
        address: "456 Oak Ave, Anytown, USA",
        parent: "Wei Chen",
        parentPhone: "+1-202-555-0122",
        documents: {
            birthCertificate: "liam_chen_birth_cert.pdf",
            birthCertificateUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // Placeholder
            previousMarksheet: "liam_chen_marksheet.pdf",
        },
    },
    {
        id: "REG003",
        name: "Olivia Martinez",
        class: "Kindergarten",
        date: "2024-08-12",
        status: "Completed",
        dob: "2019-11-05",
        gender: "Female",
        email: "olivia.m@example.com",
        phone: "+1-202-555-0145",
        address: "321 Cedar Blvd, Anytown, USA",
        parent: "Sofia Martinez",
        parentPhone: "+1-202-555-0146",
        documents: {
            birthCertificate: "olivia_m_birth_cert.pdf",
        },
    },
];

let students: Student[] = [
    { studentId: "S001", admissionNumber: "ADM001", name: "Alice Johnson", class: "Grade 10 - A", parent: "Robert Johnson", status: "Active", email: "alice.j@example.com", avatarUrl: placeholderImages.student1.url, dob: "2008-05-12", gender: "Female", address: "123 Maple Street, Springfield, IL, 62704, USA", enrollmentDate: "2022-04-01", medical: { allergies: ["Peanuts"], conditions: ["Asthma"], bloodGroup: "A+", emergencyContact: { name: "Robert Johnson", relation: "Father", phone: "+1-202-555-0110" } } },
    { studentId: "S002", admissionNumber: "ADM002", name: "Bob Williams", class: "Grade 10 - B", parent: "Sarah Williams", status: "Active", email: "bob.w@example.com", avatarUrl: placeholderImages.student2.url, dob: "2008-02-18", gender: "Male", address: "456 Oak Avenue, Springfield, IL, 62704, USA", enrollmentDate: "2022-04-01", medical: { allergies: [], conditions: [], bloodGroup: "B-", emergencyContact: { name: "Sarah Williams", relation: "Mother", phone: "+1-202-555-0111" } } },
    { studentId: "S003", admissionNumber: "ADM003", name: "Charlie Brown", class: "Grade 9 - A", parent: "David Brown", status: "Active", email: "charlie.b@example.com", avatarUrl: placeholderImages.student3.url, dob: "2009-09-30", gender: "Male", address: "789 Pine Lane, Springfield, IL, 62704, USA", enrollmentDate: "2021-04-01", medical: { allergies: ["Pollen"], conditions: [], bloodGroup: "O+", emergencyContact: { name: "David Brown", relation: "Father", phone: "+1-202-555-0112" } } },
    { studentId: "S004", admissionNumber: "ADM004", name: "Diana Miller", class: "Grade 11 - Science", parent: "Laura Miller", status: "Inactive", email: "diana.m@example.com", avatarUrl: placeholderImages.student4.url, dob: "2007-11-22", gender: "Female", address: "101 Birch Road, Springfield, IL, 62704, USA", enrollmentDate: "2023-04-01", medical: { allergies: [], conditions: ["Diabetes"], bloodGroup: "AB+", emergencyContact: { name: "Laura Miller", relation: "Mother", phone: "+1-202-555-0113" } } },
    { studentId: "S005", admissionNumber: "ADM005", name: "Ethan Davis", class: "Grade 12 - Commerce", parent: "James Davis", status: "Active", email: "ethan.d@example.com", avatarUrl: placeholderImages.student5.url, dob: "2006-07-14", gender: "Male", address: "212 Elm Street, Springfield, IL, 62704, USA", enrollmentDate: "2024-04-01", medical: { allergies: [], conditions: [], bloodGroup: "A-", emergencyContact: { name: "James Davis", relation: "Father", phone: "+1-202-555-0114" } } },
    { studentId: "S006", admissionNumber: "ADM006", name: "Fiona Garcia", class: "Grade 10 - A", parent: "Maria Garcia", status: "Active", email: "fiona.g@example.com", avatarUrl: placeholderImages.student6.url, dob: "2008-08-08", gender: "Female", address: "333 Willow Way, Springfield, IL, 62704, USA", enrollmentDate: "2022-04-01", medical: { allergies: ["Shellfish"], conditions: [], bloodGroup: "O-", emergencyContact: { name: "Maria Garcia", relation: "Mother", phone: "+1-202-555-0115" } } },
];

let employees: Employee[] = [
    { employeeId: "E001", employeeCode: "EMP001", name: "John Doe", dob: "1980-01-01", gender: "Male", department: "Academics", designation: "Principal", dateOfJoining: "2015-08-01", email: "john.doe@example.com", status: "Active", avatarUrl: placeholderImages.defaultUser.url, salary: 6000, health: { bloodType: "O+" } },
    { employeeId: "E002", employeeCode: "EMP002", name: "Jane Smith", dob: "1985-05-10", gender: "Female", department: "Academics", designation: "Science Teacher", dateOfJoining: "2018-07-15", email: "jane.smith@example.com", status: "Active", avatarUrl: placeholderImages.defaultUser.url, salary: 4500, allowances: 500, deductions: 100, health: { bloodType: "A-" } },
    { employeeId: "E003", employeeCode: "EMP003", name: "Robert Brown", dob: "1990-02-20", gender: "Male", department: "Academics", designation: "Mathematics Teacher", dateOfJoining: "2019-01-20", email: "robert.brown@example.com", status: "Active", avatarUrl: placeholderImages.defaultUser.url, salary: 4500, health: { bloodType: "B+" } },
    { employeeId: "E004", employeeCode: "EMP004", name: "Emily White", dob: "1988-11-30", gender: "Female", department: "Administration", designation: "HR Manager", dateOfJoining: "2020-03-10", email: "emily.white@example.com", status: "OnLeave", avatarUrl: placeholderImages.defaultUser.url, salary: 5500, health: { bloodType: "AB-" } },
    { employeeId: "E005", employeeCode: "EMP005", name: "Michael Green", dob: "1992-09-05", gender: "Male", department: "Finance", designation: "Accountant", dateOfJoining: "2021-08-01", email: "michael.green@example.com", status: "Probation", avatarUrl: placeholderImages.defaultUser.url, salary: 3800, allowances: 200, deductions: 50, health: { bloodType: "O-" } },
    { employeeId: "E006", employeeCode: "EMP006", name: "David Wilson", dob: "1975-06-15", gender: "Male", department: "Administration", designation: "Hostel Warden", dateOfJoining: "2010-02-01", email: "david.wilson@example.com", status: "Active", avatarUrl: placeholderImages.defaultUser.url, salary: 3200, health: { bloodType: "A+" } },
    { employeeId: "E007", employeeCode: "EMP007", name: "Susan Taylor", dob: "1978-04-25", gender: "Female", department: "Administration", designation: "Hostel Warden", dateOfJoining: "2012-05-12", email: "susan.taylor@example.com", status: "Active", avatarUrl: placeholderImages.defaultUser.url, salary: 3200, health: { bloodType: "B+" } },
];

let candidates: Candidate[] = [
    { candidateId: "C001", name: "Aarav Sharma", position: "Physics Teacher", stage: "Interview", appliedDate: "2024-08-20" },
    { candidateId: "C002", name: "Priya Singh", position: "Librarian", stage: "Offer", appliedDate: "2024-08-18" },
    { candidateId: "C003", name: "Rohan Verma", position: "IT Administrator", stage: "Applied", appliedDate: "2024-09-01" },
    { candidateId: "C004", name: "Anika Gupta", position: "Physics Teacher", stage: "Shortlisted", appliedDate: "2024-08-25" },
    { candidateId: "C005", name: "Vikram Reddy", position: "Librarian", stage: "Rejected", appliedDate: "2024-08-15" },
];

let onboardingTasks: OnboardingTask[] = [
    // Michael Green is already on probation, so he has tasks.
    { taskId: 'T001', employeeId: 'E005', taskName: 'Sign Employment Contract', status: 'Completed', dueDate: '2024-08-10' },
    { taskId: 'T002', employeeId: 'E005', taskName: 'Submit Bank Account Details', status: 'Completed', dueDate: '2024-08-11' },
    { taskId: 'T003', employeeId: 'E005', taskName: 'Complete IT Security Training', status: 'Pending', dueDate: '2024-08-20' },
    { taskId: 'T004', employeeId: 'E005', taskName: 'Receive Office Laptop', status: 'Pending', dueDate: null },
];

let leaveRequests: LeaveRequest[] = [
    { requestId: 'L001', employeeId: 'E003', leaveType: 'Annual', startDate: '2024-09-10', endDate: '2024-09-12', daysCount: 3, reason: "Vacation", status: 'Approved' },
    { requestId: 'L002', employeeId: 'E002', leaveType: 'Sick', startDate: '2024-09-05', endDate: '2024-09-05', daysCount: 1, reason: "Fever", status: 'Approved' },
    { requestId: 'L003', employeeId: 'E004', leaveType: 'Annual', startDate: '2024-09-20', endDate: '2024-09-25', daysCount: 6, reason: "Family event", status: 'Pending' },
    { requestId: 'L004', employeeId: 'E001', leaveType: 'Unpaid', startDate: '2024-10-01', endDate: '2024-10-02', daysCount: 2, reason: "Personal work", status: 'Pending' },
    { requestId: 'L005', employeeId: 'E005', leaveType: 'Sick', startDate: '2024-08-30', endDate: '2024-08-30', daysCount: 1, reason: "Flu", status: 'Rejected' },
];

let leavePolicies: LeavePolicy[] = [
    { id: "annual", name: "Annual", days: 20, description: "Standard annual leave for all employees." },
    { id: "sick", name: "Sick", days: 10, description: "For personal illness." },
    { id: "maternity", name: "Maternity", days: 90, description: "For new mothers." },
    { id: "unpaid", name: "Unpaid", days: 30, description: "Unpaid leave for personal reasons." },
];

let studentLeaveRequests: StudentLeaveRequest[] = [
    { requestId: 'SL001', studentId: 'S001', leaveType: 'Sick', startDate: '2024-09-14', endDate: '2024-09-14', daysCount: 1, status: 'Approved', reason: 'Fever' },
    { requestId: 'SL002', studentId: 'S003', leaveType: 'Family Event', startDate: '2024-09-20', endDate: '2024-09-22', daysCount: 3, status: 'Pending', reason: 'Family wedding' },
    { requestId: 'SL003', studentId: 'S002', leaveType: 'Vacation', startDate: '2024-10-01', endDate: '2024-10-05', daysCount: 5, status: 'Rejected', reason: 'Conflict with exams' },
];


let books: Book[] = [
    { bookId: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genre: 'Classic', totalCopies: 10, availableCopies: 7 },
    { bookId: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', genre: 'Classic', totalCopies: 15, availableCopies: 12 },
    { bookId: 3, title: '1984', author: 'George Orwell', isbn: '9780451524935', genre: 'Dystopian', totalCopies: 20, availableCopies: 5 },
    { bookId: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769488', genre: 'Fiction', totalCopies: 12, availableCopies: 12 },
    { bookId: 5, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', genre: 'Romance', totalCopies: 8, availableCopies: 3 },
    { bookId: 6, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', isbn: '9780590353427', genre: 'Fantasy', totalCopies: 25, availableCopies: 20 },
];

let borrowRecords: BorrowRecord[] = [
    { recordId: 1, studentId: "S001", bookId: 3, borrowDate: "2024-08-01", dueDate: "2024-08-15", returnDate: "2024-08-14" },
    { recordId: 2, studentId: "S002", bookId: 3, borrowDate: "2024-08-20", dueDate: "2024-09-04", returnDate: null },
    { recordId: 3, studentId: "S003", bookId: 1, borrowDate: "2024-08-18", dueDate: "2024-09-02", returnDate: "2024-08-25" },
    { recordId: 4, studentId: "S005", bookId: 2, borrowDate: "2024-07-25", dueDate: "2024-08-09", returnDate: "2024-08-10" },
    { recordId: 5, studentId: "S001", bookId: 5, borrowDate: "2024-09-01", dueDate: "2024-09-15", returnDate: null },
    { recordId: 6, studentId: "S006", bookId: 3, borrowDate: "2024-09-05", dueDate: "2024-09-19", returnDate: null },
];

let borrowRequests: BorrowRequest[] = [
    { requestId: 'BR001', studentId: 'S001', bookId: 2, requestDate: '2024-09-10', status: 'Pending' },
];

let invoices: Invoice[] = [
    { invoiceId: "INV001", studentId: "S001", amount: 1250.00, dueDate: "2024-08-10", status: "Paid", description: "Tuition Fee" },
    { invoiceId: "INV002", studentId: "S002", amount: 1250.00, dueDate: "2024-08-10", status: "Unpaid", description: "Tuition Fee" },
    { invoiceId: "INV003", studentId: "S003", amount: 1100.00, dueDate: "2024-08-10", status: "Paid", description: "Tuition Fee" },
    { invoiceId: "INV004", studentId: "S004", amount: 1500.00, dueDate: "2024-08-10", status: "Unpaid", description: "Tuition Fee" },
    { invoiceId: "INV005", studentId: "S005", amount: 1600.00, dueDate: "2024-08-01", status: "Overdue", description: "Tuition Fee" },
]

let payments: Payment[] = [
    { paymentId: "PAY001", studentId: "S001", invoiceId: "INV001", amount: 1250.00, date: "2024-08-05", method: "Online" },
    { paymentId: "PAY002", studentId: "S003", invoiceId: "INV003", amount: 1100.00, date: "2024-08-12", method: "Bank Transfer" },
]

let transactions: Transaction[] = [
    { id: "PAY001", date: "2024-08-05", description: "Payment for INV001 (Alice Johnson)", type: "Income", category: "Tuition", amount: 1250.00, method: "Online" },
    { id: "PAY002", date: "2024-08-12", description: "Payment for INV003 (Charlie Brown)", type: "Income", category: "Tuition", amount: 1100.00, method: "Bank Transfer" },
    { id: "PAY003", date: "2024-08-01", description: "Library Book Sale", type: "Income", category: "Library", amount: 450.50, method: "Cash" },
    { id: "PAY004", date: "2024-08-20", description: "Transport Fees", type: "Income", category: "Transport", amount: 8000.00, method: "Online" },
    { id: "EXP001", date: "2024-08-24", description: "Office Supplies Purchase", type: "Expense", category: "Supplies", amount: 350.75, method: "Card" },
    { id: "EXP002", date: "2024-08-23", description: "Electricity Bill - August", type: "Expense", category: "Utilities", amount: 1200.00, method: "Bank Transfer" },
    { id: "EXP003", date: "2024-08-31", description: "Staff Salaries - August", type: "Expense", category: "Payroll", amount: 25000.00, method: "Bank Transfer" },
    { id: "EXP004", date: "2024-08-15", description: "Campus Maintenance", type: "Expense", category: "Maintenance", amount: 2500.00, method: "Cheque" },
]

let feeStructures: FeeStructure[] = [
    { structureId: 'FS001', name: 'Grade 10 - Standard', items: [{ name: 'Tuition Fee', amount: 1250 }, { name: 'Lab Fee', amount: 50 }] },
    { structureId: 'FS002', name: 'Grade 12 - Commerce', items: [{ name: 'Tuition Fee', amount: 1600 }, { name: 'Exam Fee', amount: 100 }] },
];


let drivers: Driver[] = [
    { driverId: "D001", name: "John Smith", licenseNumber: "DL12345", phone: "+1-202-555-0101", status: "Active" },
    { driverId: "D002", name: "Peter Jones", licenseNumber: "DL67890", phone: "+1-202-555-0102", status: "Active" },
    { driverId: "D003", name: "Sam Wilson", licenseNumber: "DL54321", phone: "+1-202-555-0103", status: "On Leave" },
];

let vehicles: Vehicle[] = [
    { vehicleId: "V001", vehicleNumber: "BUS-01", model: "Tata Starbus", capacity: 40, status: "Active", driverId: "D001" },
    { vehicleId: "V002", vehicleNumber: "BUS-02", model: "Ashok Leyland", capacity: 50, status: "Active", driverId: "D002" },
    { vehicleId: "V003", vehicleNumber: "BUS-03", model: "Eicher Starline", capacity: 40, status: "Maintenance", driverId: null },
];

let routes: Route[] = [
    { routeId: "R001", routeName: "Morning Route A", vehicleId: "V001", driverId: "D001", stops: 12, students: 35, status: "Active" },
    { routeId: "R002", routeName: "Evening Route B", vehicleId: "V002", driverId: "D002", stops: 15, students: 42, status: "Active" },
    { routeId: "R003", routeName: "Special Event Route", vehicleId: "V001", driverId: "D001", stops: 5, students: 20, status: "Inactive" },
];

let studentRoutes = [
    { studentId: "S003", routeId: "R001" },
    { studentId: "S005", routeId: "R002" },
]

let timetables: Record<number, TimetableSlot[]> = {
    1: [ // Grade 10 - A
        { day: 'Monday', period: 1, subjectId: 'SUB01', roomId: 'CR101' },
        { day: 'Monday', period: 2, subjectId: 'SUB02', roomId: 'CL' },
        { day: 'Tuesday', period: 1, subjectId: 'SUB02', roomId: 'CL' },
        { day: 'Tuesday', period: 2, subjectId: 'SUB01', roomId: 'CR101' },
    ],
    2: [ // Grade 10 - B
        { day: 'Monday', period: 1, subjectId: 'SUB03', roomId: 'CR102' },
        { day: 'Monday', period: 2, subjectId: 'SUB01', roomId: 'CR102' },
    ]
};

let assessments: Assessment[] = [
    { assessmentId: 'A001', name: 'Mid-Term Exam', type: 'Exam', subject: 'Mathematics', maxMarks: 100, date: '2024-10-15' },
    { assessmentId: 'A002', name: 'Mid-Term Exam', type: 'Exam', subject: 'Science', maxMarks: 100, date: '2024-10-17' },
    { assessmentId: 'A003', name: 'Mid-Term Exam', type: 'Exam', subject: 'English', maxMarks: 100, date: '2024-10-19' },
    { assessmentId: 'A004', name: 'First-Term Test', type: 'Summative', subject: 'History', maxMarks: 50, date: '2024-09-05' },
];

let assessmentResults: AssessmentResult[] = [
    { resultId: 'R001', assessmentId: 'A001', studentId: 'S001', marksObtained: 85, grade: 'A', remarks: 'Good work' },
    { resultId: 'R002', assessmentId: 'A002', studentId: 'S001', marksObtained: 92, grade: 'A+', remarks: 'Excellent' },
    { resultId: 'R003', assessmentId: 'A003', studentId: 'S001', marksObtained: 78, grade: 'B+', remarks: 'Could improve on grammar' },
    { resultId: 'R004', assessmentId: 'A004', studentId: 'S001', marksObtained: 44, grade: 'A-', remarks: 'Very good' },
    { resultId: 'R005', assessmentId: 'A001', studentId: 'S002', marksObtained: 72, grade: 'B', remarks: null },
    { resultId: 'R006', assessmentId: 'A002', studentId: 'S002', marksObtained: 65, grade: 'C+', remarks: 'Needs more effort' },
    { resultId: 'R007', assessmentId: 'A001', studentId: 'S003', marksObtained: 95, grade: 'A+', remarks: 'Outstanding performance' },
    { resultId: 'R008', assessmentId: 'A002', studentId: 'S003', marksObtained: 88, grade: 'A', remarks: null },
];

let attendanceSummaries: AttendanceSummary[] = [
    { studentId: 'S001', totalDays: 90, presentDays: 85, absentDays: 3, leaveDays: 2 },
    { studentId: 'S002', totalDays: 90, presentDays: 88, absentDays: 1, leaveDays: 1 },
    { studentId: 'S003', totalDays: 90, presentDays: 90, absentDays: 0, leaveDays: 0 },
];

let announcements: Announcement[] = [
    { id: 1, title: "Annual Sports Day", date: "2024-08-15", postedBy: "Admin", content: "The annual sports day will be held on August 15th. All students are requested to participate in various events.", category: "General" },
    { id: 2, title: "Parent-Teacher Meeting", date: "2024-08-10", postedBy: "Admin", content: "A parent-teacher meeting is scheduled for August 10th to discuss student progress.", category: "General" },
    { id: 3, title: "Mid-term Exams Schedule", date: "2024-09-01", postedBy: "Admin", content: "Mid-term exams will commence from September 1st. The detailed schedule is available on the notice board.", category: "Exam" },
    { id: 4, title: "Homework: Maths Chapter 5", date: "2024-09-05", postedBy: "Mr. Robert Brown", content: "Please complete exercises 5.1 and 5.2 from Chapter 5.", category: "Homework", dueDate: "2024-09-12" },
];

let assignedClasses = [
    { id: 1, teacherId: "E003", name: "Grade 10 - A", subject: "Mathematics", studentCount: 35 },
    { id: 2, teacherId: "E003", name: "Grade 10 - B", subject: "Mathematics", studentCount: 34 },
    { id: 3, teacherId: "E002", name: "Grade 9 - A", subject: "Science", studentCount: 40 },
    { id: 4, teacherId: "E002", name: "Grade 10 - A", subject: "Science", studentCount: 35 },
];

let classes: ClassSection[] = [
    { classId: 1, name: 'Grade 10 - A', classTeacherId: "E002", studentCount: 35, subjectCount: 2 },
    { classId: 2, name: 'Grade 10 - B', classTeacherId: "E003", studentCount: 34, subjectCount: 1 },
    { classId: 3, name: 'Grade 9 - A', classTeacherId: "E001", studentCount: 40, subjectCount: 0 },
    { classId: 4, name: 'Grade 11 - Science', classTeacherId: "E004", studentCount: 28, subjectCount: 0 },
    { classId: 5, name: 'Grade 12 - Commerce', classTeacherId: "E005", studentCount: 30, subjectCount: 0 },
];

let subjects: Subject[] = [
    { subjectId: 'SUB01', name: 'Mathematics', teacherId: '' },
    { subjectId: 'SUB02', name: 'Science', teacherId: '' },
    { subjectId: 'SUB03', name: 'English', teacherId: '' },
    { subjectId: 'SUB04', name: 'History', teacherId: '' },
    { subjectId: 'SUB05', name: 'Physics', teacherId: '' },
    { subjectId: 'SUB06', name: 'Chemistry', teacherId: '' },
    { subjectId: 'SUB07', name: 'Biology', teacherId: '' },
    { subjectId: 'SUB08', name: 'ICT', teacherId: '' },
    { subjectId: 'SUB09', name: 'Music', teacherId: '' },
];

let classrooms: Classroom[] = [
    { roomId: 'CR101', name: 'Classroom 101', isLab: false },
    { roomId: 'CR102', name: 'Classroom 102', isLab: false },
    { roomId: 'CL', name: 'Chemistry Lab', isLab: true },
    { roomId: 'PL', name: 'Physics Lab', isLab: true },
    { roomId: 'BL', name: 'Biology Lab', isLab: true },
    { roomId: 'ICTL', name: 'ICT Lab', isLab: true },
    { roomId: 'MR', name: 'Music Room', isLab: true },
];

let classSubjects: ClassSubject[] = [
    { classId: 1, subjectId: 'SUB01', teacherId: 'E003' },
    { classId: 1, subjectId: 'SUB02', teacherId: 'E002' },
    { classId: 2, subjectId: 'SUB01', teacherId: 'E003' },
];

let hostels: Hostel[] = [
    { hostelId: 'H01', name: 'Boys Hostel A', type: 'Boys', wardenId: 'E006', totalRooms: 50, occupiedRooms: 45 },
    { hostelId: 'H02', name: 'Girls Hostel A', type: 'Girls', wardenId: 'E007', totalRooms: 50, occupiedRooms: 48 },
];

let rooms: Room[] = [
    { roomId: 'R101', hostelId: 'H01', roomNumber: 'A-101', type: 'Double', status: 'Occupied', studentId: 'S001' },
    { roomId: 'R102', hostelId: 'H01', roomNumber: 'A-102', type: 'Double', status: 'Occupied', studentId: 'S002' },
    { roomId: 'R103', hostelId: 'H01', roomNumber: 'A-103', type: 'Single', status: 'Vacant', studentId: null },
    { roomId: 'R201', hostelId: 'H02', roomNumber: 'G-101', type: 'Double', status: 'Occupied', studentId: 'S004' },
    { roomId: 'R202', hostelId: 'H02', roomNumber: 'G-102', type: 'Triple', status: 'Occupied', studentId: 'S006' },
];

let hostelVisitors: HostelVisitor[] = [
    { visitorId: 'HV001', visitorName: 'John Doe Sr.', studentId: 'S001', checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), checkOutTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), status: 'Checked Out' },
    { visitorId: 'HV002', visitorName: 'Jane Williams', studentId: 'S002', checkInTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), checkOutTime: null, status: 'Checked In' },
];


let menuItems: MenuItem[] = [
    { itemId: 'M001', name: 'Vegetable Curry', category: 'Main Course', price: 5.00, isVegetarian: true, allergens: [] },
    { itemId: 'M002', name: 'Chicken Biryani', category: 'Main Course', price: 7.50, isVegetarian: false, allergens: [] },
    { itemId: 'S001', name: 'Samosa', category: 'Snacks', price: 1.50, isVegetarian: true, allergens: ['gluten'] },
    { itemId: 'S002', name: 'French Fries', category: 'Snacks', price: 2.50, isVegetarian: true, allergens: [] },
    { itemId: 'B001', name: 'Iced Tea', category: 'Beverage', price: 2.00, isVegetarian: true, allergens: [] },
    { itemId: 'D001', name: 'Gulab Jamun', category: 'Dessert', price: 3.00, isVegetarian: true, allergens: ['dairy', 'gluten'] },
];

let alumni: Alumni[] = [
    { alumniId: 'AL001', name: 'David Lee', graduationYear: 2018, major: 'Computer Science', currentCompany: 'Google', currentPosition: 'Software Engineer', email: 'david.lee@example.com', linkedinUrl: 'https://linkedin.com/in/david-lee', avatarUrl: 'https://picsum.photos/seed/alumni1/400/400' },
    { alumniId: 'AL002', name: 'Sarah Chen', graduationYear: 2019, major: 'Business Administration', currentCompany: 'Microsoft', currentPosition: 'Product Manager', email: 'sarah.chen@example.com', avatarUrl: 'https://picsum.photos/seed/alumni2/400/400' },
    { alumniId: 'AL003', name: 'Chris Evans', graduationYear: 2017, major: 'Mechanical Engineering', currentCompany: 'Tesla', currentPosition: 'Mechanical Engineer', email: 'chris.evans@example.com', linkedinUrl: 'https://linkedin.com/in/chris-evans', avatarUrl: 'https://picsum.photos/seed/alumni3/400/400' },
];

const todaysMealPlan = {
    breakfast: ['Oats', 'Toast with Jam', 'Milk'],
    lunch: ['Vegetable Curry', 'Rice', 'Salad'],
    dinner: ['Chapathi', 'Dal Fry', 'Yogurt'],
};

let clubs: Club[] = [
    { clubId: 'C01', name: 'Science Club', description: 'Explore the wonders of science through experiments and projects.', facultyAdvisorId: 'E002', memberCount: 45, imageUrl: 'https://picsum.photos/seed/science/600/400', imageHint: 'science experiment' },
    { clubId: 'C02', name: 'Debate Club', description: 'Sharpen your public speaking and critical thinking skills.', facultyAdvisorId: 'E003', memberCount: 30, imageUrl: 'https://picsum.photos/seed/debate/600/400', imageHint: 'public speaking' },
    { clubId: 'C03', name: 'Music Club', description: 'A place for musicians to collaborate, practice, and perform.', facultyAdvisorId: 'E001', memberCount: 50, imageUrl: 'https://picsum.photos/seed/music/600/400', imageHint: 'musical instruments' },
    { clubId: 'C04', name: 'Art Club', description: 'Express your creativity through various art forms.', facultyAdvisorId: 'E004', memberCount: 25, imageUrl: 'https://picsum.photos/seed/art/600/400', imageHint: 'paint brushes' },
    { clubId: 'C05', name: 'Sports Club', description: 'Promoting physical fitness and sportsmanship.', facultyAdvisorId: 'E005', memberCount: 80, imageUrl: 'https://picsum.photos/seed/sports/600/400', imageHint: 'sports equipment' },
    { clubId: 'C06', name: 'Coding Club', description: 'Learn to code, build projects, and compete in hackathons.', facultyAdvisorId: 'E002', memberCount: 40, imageUrl: 'https://picsum.photos/seed/coding/600/400', imageHint: 'code editor' },
]

let clubMembers: ClubMember[] = [
    { clubId: 'C01', studentId: 'S001' },
    { clubId: 'C01', studentId: 'S002' },
    { clubId: 'C01', studentId: 'S004' },
    { clubId: 'C02', studentId: 'S003' },
    { clubId: 'C02', studentId: 'S005' },
];


let infirmaryVisits: InfirmaryVisit[] = [
    { visitId: 'IV001', studentId: 'S002', date: '2024-09-10', reason: 'Headache', treatment: 'Gave Paracetamol', notes: 'Advised to rest.' },
    { visitId: 'IV002', studentId: 'S005', date: '2024-09-11', reason: 'Scraped knee from sports', treatment: 'Cleaned wound and applied bandage.', notes: null },
    { visitId: 'IV003', studentId: 'S001', date: '2024-09-12', reason: 'Feeling breathless', treatment: 'Administered inhaler.', notes: 'Asthma-related. Monitored for 30 mins.' },
];

let achievements: Achievement[] = [
    { achievementId: 'ACH001', studentId: 'S001', achievement: 'Won 1st place in Science Olympiad', date: '2024-05-20', category: 'Academic' },
    { achievementId: 'ACH002', studentId: 'S003', achievement: 'Best Speaker Award in Inter-School Debate', date: '2024-04-15', category: 'Arts' },
];

let extracurricularEvents: ExtracurricularEvent[] = [
    { eventId: 'EVT01', name: 'Inter-School Science Fair', clubName: 'Science Club', date: '2024-10-25', participantCount: 15 },
    { eventId: 'EVT02', name: 'Annual Sports Meet', clubName: 'Sports Club', date: '2024-11-10', participantCount: 120 },
];

let donations: Donation[] = [
    { donationId: 'DON001', donorName: 'David Lee (Alumni)', campaign: 'Library Expansion', amount: 500, date: '2024-08-01' },
    { donationId: 'DON002', donorName: 'Anonymous', campaign: 'Scholarship Fund', amount: 1000, date: '2024-08-05' },
];

let alumniEvents: AlumniEvent[] = [
    { eventId: 'AE01', name: 'Alumni Meet 2024', date: '2024-12-20', location: 'School Auditorium', rsvpCount: 150 },
];

let jobPostings: JobPosting[] = [
    { jobId: 'JOB01', title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', postedDate: '2024-09-01', applyLink: '#' },
    { jobId: 'JOB02', title: 'Product Manager', company: 'Microsoft', location: 'Redmond, WA', postedDate: '2024-08-28', applyLink: '#' },
];

let inventoryItems: InventoryItem[] = [
    { itemId: 'INV-SP-001', name: 'A4 Paper Ream (500 Sheets)', category: 'Office Supplies', quantity: 150, status: 'In Stock', purchasePrice: 5.50, purchaseDate: '2024-08-01', imageUrl: 'https://picsum.photos/seed/paper/400/400', imageHint: 'paper ream', isForSale: true },
    { itemId: 'INV-LE-001', name: 'Microscope', category: 'Lab Equipment', quantity: 15, status: 'In Stock', purchasePrice: 350.00, purchaseDate: '2024-07-15', warrantyEndDate: '2026-07-14', imageUrl: 'https://picsum.photos/seed/microscope/400/400', imageHint: 'science microscope', isForSale: false },
    { itemId: 'INV-SG-001', name: 'Basketball', category: 'Sports Gear', quantity: 8, status: 'Low Stock', purchasePrice: 20.00, purchaseDate: '2024-06-20', imageUrl: 'https://picsum.photos/seed/basketball/400/400', imageHint: 'basketball', isForSale: true },
    { itemId: 'INV-EL-001', name: 'Projector', category: 'Electronics', quantity: 0, status: 'Out of Stock', purchasePrice: 450.00, purchaseDate: '2024-05-10', warrantyEndDate: '2025-05-09', imageUrl: 'https://picsum.photos/seed/projector/400/400', imageHint: 'classroom projector', isForSale: false },
    { itemId: 'INV-FN-001', name: 'Student Desk', category: 'Furniture', quantity: 200, status: 'In Stock', purchasePrice: 120.00, purchaseDate: '2024-07-01', imageUrl: 'https://picsum.photos/seed/desk/400/400', imageHint: 'school desk', isForSale: false },
    { itemId: 'INV-SP-002', name: 'Whiteboard Markers (Box)', category: 'Office Supplies', quantity: 5, status: 'Low Stock', purchasePrice: 12.00, purchaseDate: '2024-08-15', imageUrl: 'https://picsum.photos/seed/markers/400/400', imageHint: 'whiteboard markers', isForSale: true },
    { itemId: 'INV-LE-002', name: 'Beakers (Set of 5)', category: 'Lab Equipment', quantity: 50, status: 'In Stock', purchasePrice: 25.00, purchaseDate: '2024-07-15', imageUrl: 'https://picsum.photos/seed/beakers/400/400', imageHint: 'science beakers', isForSale: false },
    { itemId: 'INV-UN-001', name: 'School Blazer (Size M)', category: 'Uniform', quantity: 30, status: 'In Stock', purchasePrice: 45.00, purchaseDate: '2024-08-01', imageUrl: 'https://picsum.photos/seed/blazer/400/400', imageHint: 'school blazer', isForSale: true },
    { itemId: 'INV-UN-002', name: 'School Tie', category: 'Uniform', quantity: 50, status: 'In Stock', purchasePrice: 15.00, purchaseDate: '2024-08-01', imageUrl: 'https://picsum.photos/seed/tie/400/400', imageHint: 'school tie', isForSale: true },
];

let vendors: Vendor[] = [
    { vendorId: 'VDR-001', name: 'Acme Office Supplies', contactPerson: 'John Doe', email: 'sales@acme.com', phone: '123-456-7890' },
    { vendorId: 'VDR-002', name: 'Stellar Science Equip.', contactPerson: 'Jane Smith', email: 'contact@stellarsci.com', phone: '987-654-3210' },
];

let purchaseOrders: PurchaseOrder[] = [
    { poId: 'PO-001', vendorId: 'VDR-001', orderDate: '2024-08-10', items: [{ itemId: 'INV-SP-001', quantity: 50, unitPrice: 5.50 }], totalAmount: 275, status: 'Completed' },
    { poId: 'PO-002', vendorId: 'VDR-002', orderDate: '2024-08-20', items: [{ itemId: 'INV-LE-002', quantity: 10, unitPrice: 25.00 }], totalAmount: 250, status: 'Ordered' },
    { poId: 'PO-003', vendorId: 'VDR-001', orderDate: '2024-09-01', items: [{ itemId: 'INV-SP-002', quantity: 20, unitPrice: 12.00 }], totalAmount: 240, status: 'Approved' },
    { poId: 'PO-004', vendorId: 'VDR-001', orderDate: '2024-09-05', items: [{ itemId: 'INV-SP-001', quantity: 100, unitPrice: 5.50 }], totalAmount: 550, status: 'Pending' },
];

let assetAllocations: AssetAllocation[] = [
    { allocationId: 'ALC-001', itemId: 'INV-LE-001', assigneeId: 'E002', assigneeType: 'Employee', issueDate: '2024-09-01', dueDate: '2025-06-01', returnDate: null },
    { allocationId: 'ALC-002', itemId: 'INV-SG-001', assigneeId: 'S001', assigneeType: 'Student', issueDate: '2024-09-05', dueDate: '2024-09-12', returnDate: null },
];

let maintenanceLogs: MaintenanceLog[] = [
    { logId: 'ML-001', itemId: 'INV-LE-001', date: '2024-08-15', type: 'Scheduled', description: 'Annual calibration and cleaning.', cost: 50 },
    { logId: 'ML-002', itemId: 'V003', date: '2024-09-02', type: 'Repair', description: 'Replaced faulty engine belt.', cost: 250 },
];

let disciplinaryRecords: DisciplinaryRecord[] = [
    { recordId: 'DR001', studentId: 'S002', date: '2024-09-05', incident: 'Uniform violation - incorrect shoes.', actionTaken: 'Verbal warning given.', reportedBy: 'Mr. John Doe', severity: 'Low' },
    { recordId: 'DR002', studentId: 'S005', date: '2024-09-02', incident: 'Disruptive behavior in library.', actionTaken: 'Detention assigned for 1 hour.', reportedBy: 'Mrs. Evans', severity: 'Medium' },
];

let subscriberLists: SubscriberList[] = [
    { id: "all_parents", name: "All Parents", subscriberCount: 6 },
    { id: "all_students", name: "All Students", subscriberCount: 6 },
    { id: "grade_10", name: "Grade 10 Students & Parents", subscriberCount: 3 },
    { id: "alumni_network", name: "Alumni Network", subscriberCount: 3 },
];

let subscriptions: Subscription[] = [
    // All Parents
    { listId: 'all_parents', studentId: 'S001' },
    { listId: 'all_parents', studentId: 'S002' },
    { listId: 'all_parents', studentId: 'S003' },
    { listId: 'all_parents', studentId: 'S004' },
    { listId: 'all_parents', studentId: 'S005' },
    { listId: 'all_parents', studentId: 'S006' },
    // All Students
    { listId: 'all_students', studentId: 'S001' },
    { listId: 'all_students', studentId: 'S002' },
    { listId: 'all_students', studentId: 'S003' },
    { listId: 'all_students', studentId: 'S004' },
    { listId: 'all_students', studentId: 'S005' },
    { listId: 'all_students', studentId: 'S006' },
    // Grade 10
    { listId: 'grade_10', studentId: 'S001' },
    { listId: 'grade_10', studentId: 'S002' },
    { listId: 'grade_10', studentId: 'S006' },
];

let newsletters: Newsletter[] = [
    { id: "nl_003", title: "October Recap & Upcoming Events", content: "Dear parents...", date: "2024-11-01", recipients: 546, listId: "parents" },
    { id: "nl_002", title: "Mid-Term Exam Schedule", content: "The exams will...", date: "2024-10-05", recipients: 546, listId: "parents" },
    { id: "nl_001", title: "Welcome Back to School!", content: "Welcome everyone...", date: "2024-09-02", recipients: 540, listId: "parents" },
];


// Application Functions
export const getApplications = () => applications;

export const updateApplicationStatus = (appId: string, status: Application['status']) => {
    applications = applications.map(app =>
        app.id === appId ? { ...app, status } : app
    );
};

// Student Functions
export const getStudents = () => students;
export const getStudentById = (id: string) => students.find(s => s.studentId === id);

export const addStudent = (student: Omit<Student, 'studentId' | 'admissionNumber' | 'status' | 'avatarUrl'>) => {
    const newStudentId = `S${String(students.length + 1).padStart(3, '0')}`;
    const newAdmissionNumber = `ADM${String(students.length + 1).padStart(3, '0')}`;
    const newStudent: Student = {
        ...student,
        studentId: newStudentId,
        admissionNumber: newAdmissionNumber,
        status: "Active",
        avatarUrl: placeholderImages.defaultUser.url,
    };
    students = [...students, newStudent];
    return newStudent;
};

export const updateStudent = (updatedStudent: Student) => {
    students = students.map(student =>
        student.studentId === updatedStudent.studentId ? updatedStudent : student
    );
};

// Employee Functions
export const getEmployees = () => employees;
export const getEmployeeById = (id: string) => employees.find(e => e.employeeId === id);
export const getOnboardingEmployees = () => employees.filter(e => e.status === 'Probation');

export const updateEmployee = (updatedEmployee: Employee) => {
    employees = employees.map(employee =>
        employee.employeeId === updatedEmployee.employeeId ? updatedEmployee : employee
    );
};

// Candidate & Onboarding Functions
export const getCandidates = () => candidates;

export const getOnboardingTasks = (employeeId: string) => {
    return onboardingTasks.filter(task => task.employeeId === employeeId);
}

export const updateOnboardingTask = (taskId: string, status: "Pending" | "Completed") => {
    onboardingTasks = onboardingTasks.map(task =>
        task.taskId === taskId ? { ...task, status } : task
    );
}

// Leave Request Functions
export const getLeaveRequests = () => leaveRequests;
export const getLeavePolicies = () => leavePolicies;

export const addLeavePolicy = (policy: Omit<LeavePolicy, 'id'>) => {
    const newId = policy.name.toLowerCase();
    const newPolicy: LeavePolicy = {
        id: newId,
        ...policy,
    };
    leavePolicies = [...leavePolicies, newPolicy];
    return newPolicy;
}

export const updateLeavePolicy = (updatedPolicy: LeavePolicy) => {
    leavePolicies = leavePolicies.map(p => p.id === updatedPolicy.id ? updatedPolicy : p);
}


export const updateLeaveRequestStatus = (requestId: string, status: "Approved" | "Rejected") => {
    leaveRequests = leaveRequests.map(req =>
        req.requestId === requestId ? { ...req, status } : req
    );
}

export const addEmployeeLeaveRequest = (requestData: Omit<LeaveRequest, 'requestId' | 'status'>) => {
    const newId = `L${String(leaveRequests.length + 1).padStart(3, '0')}`;
    const newRequest: LeaveRequest = {
        ...requestData,
        requestId: newId,
        status: "Pending",
    };
    leaveRequests = [newRequest, ...leaveRequests];
    return newRequest;
};


export const getStudentLeaveRequests = () => studentLeaveRequests;
export const updateStudentLeaveRequestStatus = (requestId: string, status: "Approved" | "Rejected") => {
    studentLeaveRequests = studentLeaveRequests.map(req =>
        req.requestId === requestId ? { ...req, status } : req
    );
}


export const addEmployee = (employee: Omit<Employee, 'employeeId' | 'employeeCode' | 'status' | 'avatarUrl' | 'email'>) => {
    const newId = `E${String(employees.length + 1).padStart(3, '0')}`;
    const newCode = `EMP${String(employees.length + 1).padStart(3, '0')}`;
    const newEmployee: Employee = {
        ...(employee as any),
        employeeId: newId,
        employeeCode: newCode,
        status: "Probation", // New hires start on probation
        avatarUrl: placeholderImages.defaultUser.url,
        email: `${employee.name.toLowerCase().replace(/\s/g, ".")}@example.com`,
    };
    employees = [...employees, newEmployee];
    return newEmployee;
}

const generateOnboardingTasks = (employeeId: string) => {
    const defaultTasks = [
        'Sign Employment Contract',
        'Submit Bank Account Details',
        'Complete IT Security Training',
        'Receive Office Laptop',
        'Attend HR Orientation'
    ];

    const newTasks: OnboardingTask[] = defaultTasks.map((taskName, index) => ({
        taskId: `T${String(onboardingTasks.length + index + 1).padStart(3, '0')}`,
        employeeId: employeeId,
        taskName: taskName,
        status: 'Pending',
        dueDate: null
    }));

    onboardingTasks = [...onboardingTasks, ...newTasks];
}

export const hireCandidate = (candidateId: string) => {
    const candidate = candidates.find(c => c.candidateId === candidateId);
    if (!candidate || candidate.stage === 'Hired') {
        throw new Error("Candidate not found or already hired.");
    }

    // 1. Update candidate stage
    candidates = candidates.map(c => c.candidateId === candidateId ? { ...c, stage: 'Hired' } : c);

    // 2. Create a new employee
    const positionParts = candidate.position.split(' ');
    const department = positionParts.length > 1 && positionParts[1] === 'Teacher' ? 'Academics' : 'Administration';

    const newEmployee = addEmployee({
        name: candidate.name,
        department: department,
        designation: candidate.position,
        salary: 3000, // Default salary for new hires
        dob: "1990-01-01", // Placeholder
        gender: "Other", // Placeholder
        dateOfJoining: new Date().toISOString().split('T')[0], // Placeholder
    });

    // 3. Generate onboarding tasks
    generateOnboardingTasks(newEmployee.employeeId);

    return newEmployee;
};

export const addCandidate = (candidate: Omit<Candidate, 'candidateId' | 'stage' | 'appliedDate'>) => {
    const newId = `C${String(candidates.length + 1).padStart(3, '0')}`;
    const newCandidate: Candidate = {
        ...candidate,
        candidateId: newId,
        stage: "Applied",
        appliedDate: new Date().toISOString().split('T')[0],
    };
    candidates = [newCandidate, ...candidates];
    return newCandidate;
};


// Workflow Function
export const approveRegistration = (application: Application): { status: 'pending_payment' | 'enrolled' } => {
    const existingStudent = students.find(s => s.email === application.email);
    if (existingStudent) {
        // If student already exists, maybe they were just re-enrolling or something.
        // For simplicity, we'll just mark the application as completed.
        updateApplicationStatus(application.id, "Completed");
        return { status: 'enrolled' };
    }

    if (application.status === "Pending") {
        // First-time approval: Change status and create an invoice
        updateApplicationStatus(application.id, "Approved - Pending Payment");
        addInvoice({
            studentId: application.id, // Use application ID as a temporary student ID
            amount: 250.00, // Standard admission fee
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'Admission Fee'
        });
        return { status: 'pending_payment' };
    }

    if (application.status === "Approved - Pending Payment") {
        // Final approval after payment
        updateApplicationStatus(application.id, "Completed");
        addStudent({
            name: application.name,
            class: application.class,
            parent: application.parent,
            email: application.email,
        });
        return { status: 'enrolled' };
    }

    // Should not happen, but as a fallback:
    return { status: 'enrolled' };
};

// Library Functions
export const getBooks = () => books;
export const getBookById = (id: number) => books.find(b => b.bookId === id);

export const addBook = (book: Omit<Book, 'bookId' | 'availableCopies'>) => {
    const newId = books.length > 0 ? Math.max(...books.map(b => b.bookId)) + 1 : 1;
    const newBook: Book = {
        ...book,
        bookId: newId,
        availableCopies: book.totalCopies,
    };
    books = [newBook, ...books];
    return newBook;
}

export const deleteBook = (bookId: number) => {
    books = books.filter(b => b.bookId !== bookId);
}


export const getBorrowRecords = () => borrowRecords;
export const getBorrowRequests = () => borrowRequests;

export const getBorrowRecordsForStudent = (studentId: string) => {
    return borrowRecords.filter(r => r.studentId === studentId);
}

export const getBorrowRecordsForBook = (bookId: number) => {
    return borrowRecords.filter(r => r.bookId === bookId && r.returnDate === null);
}

export const requestBook = (bookId: number, studentId: string) => {
    const book = books.find(b => b.bookId === bookId);
    if (!book || book.availableCopies <= 0) {
        throw new Error("Book not available for borrowing.");
    }
    const existingRequest = borrowRequests.find(req => req.bookId === bookId && req.studentId === studentId && (req.status === 'Pending' || req.status === 'Ready for Pickup'));
    if (existingRequest) {
        throw new Error("You have already requested this book.");
    }

    const newRequest: BorrowRequest = {
        requestId: `BR${String(borrowRequests.length + 1).padStart(3, '0')}`,
        bookId,
        studentId,
        requestDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
    };
    borrowRequests = [newRequest, ...borrowRequests];
    return newRequest;
}

export const getStudentBookRequestStatus = (bookId: number, studentId: string) => {
    const request = borrowRequests.find(req => req.bookId === bookId && req.studentId === studentId && (req.status === 'Pending' || req.status === 'Ready for Pickup'));
    return request?.status;
}


export const borrowBook = (bookId: number, studentId: string) => {
    const book = books.find(b => b.bookId === bookId);
    if (!book || book.availableCopies <= 0) {
        throw new Error("Book not available for borrowing.");
    }

    books = books.map(b => b.bookId === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b);

    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 14); // 2-week borrow period

    const newRecord: BorrowRecord = {
        recordId: borrowRecords.length + 1,
        bookId,
        studentId,
        borrowDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        returnDate: null,
    };
    borrowRecords = [newRecord, ...borrowRecords];
    return newRecord;
}

export const returnBook = (recordId: number) => {
    const record = borrowRecords.find(r => r.recordId === recordId);
    if (!record || record.returnDate !== null) {
        throw new Error("This book has already been returned or the record is invalid.");
    }

    const book = books.find(b => b.bookId === record.bookId);
    if (book) {
        books = books.map(b => b.bookId === record.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b);
    }

    borrowRecords = borrowRecords.map(r => r.recordId === recordId ? { ...r, returnDate: new Date().toISOString().split('T')[0] } : r);
}


// Finance Functions
export const getInvoices = () => invoices;
export const getPayments = () => payments;
export const getTransactions = () => transactions;
export const getFeeStructures = () => feeStructures;

export const addFeeStructure = (structure: Omit<FeeStructure, 'structureId'>) => {
    const newId = `FS${String(feeStructures.length + 1).padStart(3, '0')}`;
    const newStructure: FeeStructure = {
        ...structure,
        structureId: newId,
    };
    feeStructures = [newStructure, ...feeStructures];
    return newStructure;
}

export const addInvoice = (invoiceData: Omit<Invoice, 'invoiceId' | 'status'>) => {
    const newId = `INV${String(invoices.length + 1).padStart(3, '0')}`;
    const newInvoice: Invoice = {
        ...invoiceData,
        invoiceId: newId,
        status: "Unpaid"
    };
    invoices = [newInvoice, ...invoices];
    return newInvoice;
}

export const recordPayment = (invoiceId: string, studentName: string, method: "Cash" | "Bank Transfer" | "Online" = "Bank Transfer") => {
    const invoice = invoices.find(inv => inv.invoiceId === invoiceId);
    if (!invoice || invoice.status === 'Paid') {
        throw new Error("Invoice not found or already paid.");
    }

    // Mark invoice as paid
    invoices = invoices.map(inv => inv.invoiceId === invoiceId ? { ...inv, status: "Paid" } : inv);

    // Create a payment record
    const paymentId = `PAY${String(payments.length + 1).padStart(3, '0')}`;
    const newPayment: Payment = {
        paymentId: paymentId,
        studentId: invoice.studentId,
        invoiceId: invoice.invoiceId,
        amount: invoice.amount,
        date: new Date().toISOString().split('T')[0],
        method: method,
    };
    payments = [newPayment, ...payments];

    // Create a transaction record
    const newTransaction: Transaction = {
        id: paymentId,
        date: newPayment.date,
        description: `Payment for ${invoice.invoiceId} (${studentName})`,
        type: 'Income',
        category: 'Tuition',
        amount: invoice.amount,
        method: method,
    };
    transactions = [newTransaction, ...transactions];

    return newPayment;
};


export const payInvoices = (invoiceIds: string[], studentName: string) => {
    const invoicesToPay = invoices.filter(inv => invoiceIds.includes(inv.invoiceId));

    invoicesToPay.forEach(inv => {
        recordPayment(inv.invoiceId, studentName, "Online");
    });
};

export const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newId = `TXN${String(transactions.length + 1).padStart(3, '0')}`;
    const newTransaction: Transaction = {
        ...transaction,
        id: newId,
    };
    transactions = [newTransaction, ...transactions];
    return newTransaction;
}


// Transport Functions
export const getDrivers = () => drivers;
export const getVehicles = () => vehicles;
export const getRoutes = () => routes;
export const getDriverById = (id: string) => drivers.find(d => d.driverId === id);
export const getVehicleById = (id: string) => vehicles.find(v => v.vehicleId === id);
export const getRouteForStudent = (studentId: string) => {
    const studentRoute = studentRoutes.find(sr => sr.studentId === studentId);
    if (!studentRoute) return null;
    return routes.find(r => r.routeId === studentRoute.routeId);
};


export const addDriver = (driver: Omit<Driver, 'driverId' | 'status'>) => {
    const newId = `D${String(drivers.length + 1).padStart(3, '0')}`;
    const newDriver: Driver = {
        ...driver,
        driverId: newId,
        status: "Active",
    };
    drivers = [newDriver, ...drivers];
    return newDriver;
}

export const addVehicle = (vehicle: Omit<Vehicle, 'vehicleId' | 'status' | 'driverId'>) => {
    const newId = `V${String(vehicles.length + 1).padStart(3, '0')}`;
    const newVehicle: Vehicle = {
        ...vehicle,
        vehicleId: newId,
        status: "Active",
        driverId: null,
    };
    vehicles = [newVehicle, ...vehicles];
    return newVehicle;
}

export const updateVehicle = (vehicleId: string, data: Partial<Vehicle>) => {
    vehicles = vehicles.map(v => v.vehicleId === vehicleId ? { ...v, ...data } : v);
    return vehicles.find(v => v.vehicleId === vehicleId);
}

export const deleteVehicle = (vehicleId: string) => {
    vehicles = vehicles.filter(v => v.vehicleId !== vehicleId);
}

export const addRoute = (route: Omit<Route, 'routeId' | 'stops' | 'students' | 'status'>) => {
    const newId = `R${String(routes.length + 1).padStart(3, '0')}`;
    const newRoute: Route = {
        ...route,
        routeId: newId,
        stops: 0,
        students: 0,
        status: "Active",
    };
    routes = [newRoute, ...routes];
    return newRoute;
}

export const updateRoute = (routeId: string, data: Partial<Route>) => {
    routes = routes.map(r => r.routeId === routeId ? { ...r, ...data } : r);
    return routes.find(r => r.routeId === routeId);
}

export const deleteRoute = (routeId: string) => {
    routes = routes.filter(r => r.routeId !== routeId);
}

export const getStudentsOnRoute = (routeId: string) => {
    const studentIds = studentRoutes.filter(sr => sr.routeId === routeId).map(sr => sr.studentId);
    return students.filter(s => studentIds.includes(s.studentId));
}

export const assignStudentToRoute = (studentId: string, routeId: string) => {
    studentRoutes = studentRoutes.filter(sr => sr.studentId !== studentId);
    studentRoutes.push({ studentId, routeId });

    routes = routes.map(r => {
        const count = studentRoutes.filter(sr => sr.routeId === r.routeId).length;
        return { ...r, students: count };
    });
}


// Academics Functions
export const getAssessments = () => assessments;
export const getAssessmentById = (id: string) => assessments.find(a => a.assessmentId === id);
export const getAssessmentResults = () => assessmentResults;
export const getResultsForStudent = (studentId: string) => assessmentResults.filter(r => r.studentId === studentId);
export const getStudentPerformance = (studentId: string) => {
    const results = getResultsForStudent(studentId);
    if (results.length === 0) return null;

    const totalMarks = results.reduce((acc, r) => acc + r.marksObtained, 0);
    const maxTotalMarks = results.reduce((acc, r) => {
        const assessment = assessments.find(a => a.assessmentId === r.assessmentId);
        return acc + (assessment?.maxMarks || 100);
    }, 0);

    const percentage = (totalMarks / maxTotalMarks) * 100;

    // Simple grading logic
    let grade = "F";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 85) grade = "A";
    else if (percentage >= 75) grade = "B";
    else if (percentage >= 65) grade = "C";
    else if (percentage >= 50) grade = "D";

    return {
        totalMarks,
        maxTotalMarks,
        percentage: percentage.toFixed(2),
        grade,
        results: results.map(r => {
            const assessment = assessments.find(a => a.assessmentId === r.assessmentId);
            return {
                ...r,
                assessmentName: assessment?.name || "Unknown",
                subject: assessment?.subject || "Unknown",
                maxMarks: assessment?.maxMarks || 100
            };
        })
    };
};
export const getResultsForAssessment = (assessmentId: string) => assessmentResults.filter(r => r.assessmentId === assessmentId);
export const getAttendanceSummaryForStudent = (studentId: string) => attendanceSummaries.find(a => a.studentId === studentId);
export const getAssignedClassesForTeacher = (teacherId: string) => assignedClasses.filter(c => c.teacherId === teacherId);
export const getClasses = () => classes;
export const getStudentsByClass = (classId: number) => {
    const classInfo = classes.find(c => c.classId === classId);
    if (!classInfo) return [];
    // This is a simplified mock. In a real app, you'd have a proper mapping.
    // Here we just return a slice of students based on class name for demo.
    if (classInfo.name.includes("10 - A")) return students.filter(s => s.class === "Grade 10 - A");
    if (classInfo.name.includes("10 - B")) return students.filter(s => s.class === "Grade 10 - B");
    return students.slice(0, 10);
};

export const saveAttendance = (records: { studentId: string; status: string }[]) => {
    // This is a mock function. In a real application, you would save this data to a database.
    console.log("Saving attendance records:", records);
};

export const saveAssessmentResults = (assessmentId: string, results: Omit<AssessmentResult, 'resultId'>[]) => {
    // Remove existing results for this assessment
    assessmentResults = assessmentResults.filter(r => r.assessmentId !== assessmentId);

    // Add new results
    const newResults = results.map((r, index) => ({
        ...r,
        resultId: `RES${assessmentId}${index + 1}`
    }));

    assessmentResults = [...newResults, ...assessmentResults];
    return newResults;
}

export const getClassById = (id: number) => classes.find(c => c.classId === id);
export const getSubjectById = (id: string) => subjects.find(s => s.subjectId === id);
export const getSubjects = () => subjects;
export const getTeacherById = (id: string) => employees.find(e => e.employeeId === id);
export const getTimetableForClass = (classId: number) => timetables[classId] || [];
export const getClassroomById = (id: string) => classrooms.find(c => c.roomId === id);

export const getTimetableForTeacher = (teacherId: string): (TimetableSlot & { classId: number })[] => {
    const teacherSlots: (TimetableSlot & { classId: number })[] = [];
    for (const classId in timetables) {
        const classTimetable = timetables[classId];
        const assignedSubjectsForTeacher = classSubjects
            .filter(cs => cs.teacherId === teacherId && cs.classId === Number(classId))
            .map(cs => cs.subjectId);

        classTimetable.forEach(slot => {
            if (assignedSubjectsForTeacher.includes(slot.subjectId)) {
                teacherSlots.push({ classId: Number(classId), ...slot });
            }
        });
    }
    return teacherSlots;
};

export const getTimetableSlotsForTeacher = (teacherId: string): (TimetableSlot & { classId: number })[] => {
    const teacherSlots: (TimetableSlot & { classId: number })[] = [];
    const assignedClassSubjects = classSubjects.filter(cs => cs.teacherId === teacherId);

    for (const classIdStr in timetables) {
        const classId = Number(classIdStr);
        const isTeacherAssignedToClass = assignedClassSubjects.some(cs => cs.classId === classId);

        if (isTeacherAssignedToClass) {
            const classTimetable = timetables[classId];
            classTimetable.forEach(slot => {
                const isSubjectTaughtByTeacher = assignedClassSubjects.some(cs => cs.classId === classId && cs.subjectId === slot.subjectId);
                if (isSubjectTaughtByTeacher) {
                    teacherSlots.push({
                        ...slot,
                        classId: classId,
                    });
                }
            });
        }
    }
    return teacherSlots;
};


export const updateTimetableSlot = (classId: number, day: string, period: number, subjectId: string | null) => {
    if (!timetables[classId]) {
        timetables[classId] = [];
    }

    let roomId: string | undefined = undefined;

    // Conflict detection and auto-assignment of labs
    if (subjectId) {
        const subject = getSubjectsForClass(classId).find(s => s.subjectId === subjectId);
        if (subject) {
            const teacherId = subject.teacherId;
            const teacherTimetable = getTimetableForTeacher(teacherId);
            const conflict = teacherTimetable.find(slot => slot.day === day && slot.period === period);
            if (conflict) {
                for (const cId in timetables) {
                    if (Number(cId) === classId) continue;
                    const conflictingSlot = timetables[cId].find(s => s.day === day && s.period === period && classSubjects.find(cs => cs.classId === Number(cId) && cs.subjectId === s.subjectId)?.teacherId === teacherId);
                    if (conflictingSlot) {
                        const conflictingClass = getClassById(Number(cId));
                        throw new Error(`${getEmployeeById(teacherId)?.name} is already scheduled for ${conflictingClass?.name} at this time.`);
                    }
                }
            }

            // Auto-assign lab rooms based on subject name
            const subjectName = subject.name.toLowerCase();
            if (subjectName.includes('chemistry')) roomId = 'CL';
            else if (subjectName.includes('physics')) roomId = 'PL';
            else if (subjectName.includes('biology')) roomId = 'BL';
            else if (subjectName.includes('ict')) roomId = 'ICTL';
            else if (subjectName.includes('music')) roomId = 'MR';
            else roomId = 'CR101'; // Default classroom
        }
    }

    const existingSlotIndex = timetables[classId].findIndex(s => s.day === day && s.period === period);

    if (subjectId) { // Add or update
        if (existingSlotIndex !== -1) {
            timetables[classId][existingSlotIndex].subjectId = subjectId;
            timetables[classId][existingSlotIndex].roomId = roomId;
        } else {
            timetables[classId].push({ day, period, subjectId, roomId });
        }
    } else { // Remove
        if (existingSlotIndex !== -1) {
            timetables[classId].splice(existingSlotIndex, 1);
        }
    }
};

export const getSubjectsForClass = (classId: number): Subject[] => {
    const subjectIds = classSubjects.filter(cs => cs.classId === classId);
    return subjectIds.map(cs => {
        const subject = subjects.find(s => s.subjectId === cs.subjectId);
        return {
            ...(subject as Subject),
            teacherId: cs.teacherId, // Override with teacher assigned to this specific class
        };
    }).filter(Boolean); // Filter out any potential undefined values
}

export const addSubjectToClass = (classId: number, subjectId: string, teacherId: string) => {
    const existing = classSubjects.find(cs => cs.classId === classId && cs.subjectId === subjectId);
    if (existing) {
        throw new Error("This subject is already assigned to this class.");
    }
    const newClassSubject: ClassSubject = { classId, subjectId, teacherId };
    classSubjects.push(newClassSubject);

    // Also update the subjectCount on the class
    const classToUpdate = classes.find(c => c.classId === classId);
    if (classToUpdate) {
        classToUpdate.subjectCount++;
    }
}

export const removeSubjectFromClass = (classId: number, subjectId: string) => {
    classSubjects = classSubjects.filter(cs => !(cs.classId === classId && cs.subjectId === subjectId));
    // Also update the subjectCount on the class
    const classToUpdate = classes.find(c => c.classId === classId);
    if (classToUpdate && classToUpdate.subjectCount > 0) {
        classToUpdate.subjectCount--;
    }
}


export const addClass = (classData: Omit<ClassSection, 'classId' | 'studentCount' | 'subjectCount'>) => {
    const newId = classes.length > 0 ? Math.max(...classes.map(c => c.classId)) + 1 : 1;
    const newClass: ClassSection = {
        ...classData,
        classId: newId,
        studentCount: 0,
        subjectCount: 0,
    };
    classes = [newClass, ...classes];
    return newClass;
}

export const updateClass = (updatedClass: ClassSection) => {
    classes = classes.map(c => c.classId === updatedClass.classId ? updatedClass : c);
};

export const deleteClass = (classId: number) => {
    classes = classes.filter(c => c.classId !== classId);
}


export const addAssessment = (assessmentData: Omit<Assessment, 'assessmentId'>) => {
    const newId = `A${String(assessments.length + 1).padStart(3, '0')}`;
    const newAssessment: Assessment = {
        ...assessmentData,
        assessmentId: newId,
    };
    assessments = [newAssessment, ...assessments];
    return newAssessment;
}

export const addSubject = (subjectData: { name: string }) => {
    const newId = `SUB${String(subjects.length + 1).padStart(2, '0')}`;
    const newSubject: Subject = {
        subjectId: newId,
        name: subjectData.name,
        teacherId: '', // Default to unassigned
    };
    subjects = [newSubject, ...subjects];
    return newSubject;
};


// Communication Functions
export const getAnnouncements = () => announcements;
export const getSubscriberLists = () => subscriberLists;
export const getSubscriberListById = (listId: string) => subscriberLists.find(l => l.id === listId);

export const getSubscribersForList = (listId: string): Student[] => {
    const studentIds = subscriptions.filter(sub => sub.listId === listId).map(sub => sub.studentId);
    return students.filter(student => studentIds.includes(student.studentId));
};

export const addSubscriberList = (data: { name: string }) => {
    const newList: SubscriberList = {
        id: data.name.toLowerCase().replace(/\s+/g, '_'),
        name: data.name,
        subscriberCount: 0, // New lists start with 0 subscribers
    };
    subscriberLists.push(newList);
    return newList;
};

export const addSubscriberToList = (listId: string, studentId: string) => {
    const list = subscriberLists.find(l => l.id === listId);
    if (!list) {
        throw new Error("Mailing list not found.");
    }
    const student = students.find(s => s.studentId === studentId);
    if (!student) {
        throw new Error("Student not found.");
    }
    const existing = subscriptions.find(sub => sub.listId === listId && sub.studentId === studentId);
    if (existing) {
        throw new Error("This student is already subscribed to the list.");
    }
    subscriptions.push({ listId, studentId });
    list.subscriberCount++;
};

export const removeSubscriberFromList = (listId: string, studentId: string) => {
    const initialLength = subscriptions.length;
    subscriptions = subscriptions.filter(sub => !(sub.listId === listId && sub.studentId === studentId));

    if (subscriptions.length < initialLength) {
        const list = subscriberLists.find(l => l.id === listId);
        if (list) {
            list.subscriberCount--;
        }
    }
};

export const getNewsletters = () => newsletters;

export const sendNewsletter = (newsletter: Omit<Newsletter, 'id' | 'date' | 'recipients'>) => {
    const list = subscriberLists.find(l => l.id === newsletter.listId);
    const newNewsletter: Newsletter = {
        ...newsletter,
        id: `nl_${String(newsletters.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        recipients: list?.subscriberCount || 0,
    };
    newsletters = [newNewsletter, ...newsletters];
    return newNewsletter;
};


// Hostel Functions
export const getHostels = () => hostels;
export const getHostelById = (id: string) => hostels.find(h => h.hostelId === id);
export const getRooms = () => rooms;
export const getRoomForStudent = (studentId: string) => rooms.find(r => r.studentId === studentId);
export const getHostelVisitors = () => hostelVisitors;

export const addRoom = (roomData: Omit<Room, 'roomId' | 'status' | 'studentId'>) => {
    const newId = `R${String(rooms.length + 1).padStart(3, '0')}`;
    const newRoom: Room = {
        ...roomData,
        roomId: newId,
        status: "Vacant",
        studentId: null,
    };
    rooms = [newRoom, ...rooms];

    // Update totalRooms in the corresponding hostel
    const hostel = hostels.find(h => h.hostelId === roomData.hostelId);
    if (hostel) {
        hostel.totalRooms++;
    }

    return newRoom;
}

export const allocateRoom = (roomId: string, studentId: string) => {
    const room = rooms.find(r => r.roomId === roomId);
    if (!room || room.status !== 'Vacant') {
        throw new Error("Room is not vacant or does not exist.");
    }

    const studentAlreadyAllocated = rooms.some(r => r.studentId === studentId);
    if (studentAlreadyAllocated) {
        throw new Error("Student is already allocated to another room.");
    }

    room.status = 'Occupied';
    room.studentId = studentId;

    const hostel = hostels.find(h => h.hostelId === room.hostelId);
    if (hostel) {
        hostel.occupiedRooms++;
    }

    // Integration: Automatically generate a hostel fee invoice
    addInvoice({
        studentId: studentId,
        amount: 500, // Standard hostel fee
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: `Hostel Fee - ${hostel?.name}`
    });
};

export const deallocateRoom = (roomId: string) => {
    const room = rooms.find(r => r.roomId === roomId);
    if (!room || room.status !== 'Occupied') {
        throw new Error("Room is not occupied or does not exist.");
    }

    const hostel = hostels.find(h => h.hostelId === room.hostelId);
    if (hostel) {
        hostel.occupiedRooms--;
    }

    room.status = 'Vacant';
    room.studentId = null;
};

export const addHostelVisitor = (visitorData: Omit<HostelVisitor, 'visitorId' | 'checkInTime' | 'checkOutTime' | 'status'>) => {
    const newId = `HV${String(hostelVisitors.length + 1).padStart(3, '0')}`;
    const newVisitor: HostelVisitor = {
        ...visitorData,
        visitorId: newId,
        checkInTime: new Date().toISOString(),
        checkOutTime: null,
        status: 'Checked In',
    };
    hostelVisitors = [newVisitor, ...hostelVisitors];
    return newVisitor;
};

export const checkoutVisitor = (visitorId: string) => {
    hostelVisitors = hostelVisitors.map(v =>
        v.visitorId === visitorId
            ? { ...v, status: 'Checked Out', checkOutTime: new Date().toISOString() }
            : v
    );
};



// Cafeteria Functions
export const getMenuItems = () => menuItems;
export const getTodaysMealPlan = () => todaysMealPlan;

export const addMenuItem = (item: Omit<MenuItem, 'itemId' | 'allergens'>) => {
    const newId = `M${String(menuItems.length + 1).padStart(3, '0')}`;
    const newItem: MenuItem = {
        ...item,
        itemId: newId,
        allergens: [], // Default empty
    };
    menuItems = [newItem, ...menuItems];
    return newItem;
};

// Alumni Functions
export const getAlumni = () => alumni;
export const getAlumnusById = (id: string) => alumni.find(a => a.alumniId === id);
export const getDonations = () => donations;
export const getAlumniEvents = () => alumniEvents;
export const getJobs = () => jobPostings;

export const addAlumnus = (alumnus: Omit<Alumni, 'alumniId' | 'avatarUrl' | 'email'>) => {
    const newId = `AL${String(alumni.length + 1).padStart(3, '0')}`;
    const newAlumnus: Alumni = {
        ...(alumnus as any),
        alumniId: newId,
        email: `${alumnus.name.toLowerCase().replace(/\s/g, ".")}@alumni.example.com`,
        avatarUrl: `https://picsum.photos/seed/alumni${alumni.length + 1}/400/400`,
    };
    alumni = [newAlumnus, ...alumni];
    return newAlumnus;
}

export const updateAlumnus = (updatedAlumnus: Alumni) => {
    alumni = alumni.map(a => a.alumniId === updatedAlumnus.alumniId ? updatedAlumnus : a);
}

export const addAlumniEvent = (eventData: Omit<AlumniEvent, 'eventId' | 'rsvpCount'>) => {
    const newEvent: AlumniEvent = {
        ...eventData,
        eventId: `AEV${String(alumniEvents.length + 1).padStart(3, '0')}`,
        rsvpCount: 0,
    };
    alumniEvents = [newEvent, ...alumniEvents];
    return newEvent;
};

export const addJob = (jobData: Omit<JobPosting, 'jobId' | 'postedDate'>) => {
    const newJob: JobPosting = {
        ...jobData,
        jobId: `JOB${String(jobPostings.length + 1).padStart(3, '0')}`,
        postedDate: new Date().toISOString().split('T')[0],
    };
    jobPostings = [newJob, ...jobPostings];
    return newJob;
};



// Extracurricular Functions
export const getClubs = () => clubs;
export const getClubById = (clubId: string) => clubs.find(c => c.clubId === clubId);
export const getClubMembers = (clubId: string) => {
    const memberStudentIds = clubMembers.filter(m => m.clubId === clubId).map(m => m.studentId);
    return students.filter(s => memberStudentIds.includes(s.studentId));
};
export const getAchievements = () => achievements;
export const getExtracurricularEvents = () => extracurricularEvents;

export const addClub = (clubData: Omit<Club, 'clubId' | 'memberCount' | 'imageUrl' | 'imageHint'>) => {
    const newId = `C${String(clubs.length + 1).padStart(2, '0')}`;
    const imageHint = clubData.name.toLowerCase().split(' ')[0];
    const newClub: Club = {
        ...clubData,
        clubId: newId,
        memberCount: 0,
        imageUrl: `https://picsum.photos/seed/${imageHint}/600/400`,
        imageHint: imageHint,
    };
    clubs = [newClub, ...clubs];
    return newClub;
};

// Health Functions
export const getInfirmaryVisits = () => infirmaryVisits;

export const addInfirmaryVisit = (visitData: Omit<InfirmaryVisit, 'visitId' | 'date'>) => {
    const newId = `IV${String(infirmaryVisits.length + 1).padStart(3, '0')}`;
    const newVisit: InfirmaryVisit = {
        ...visitData,
        visitId: newId,
        date: new Date().toISOString().split('T')[0],
    };
    infirmaryVisits = [newVisit, ...infirmaryVisits];
    return newVisit;
}

export const addStudentLeaveRequest = (requestData: Omit<StudentLeaveRequest, 'requestId' | 'status'>) => {
    const newId = `SL${String(studentLeaveRequests.length + 1).padStart(3, '0')}`;
    const newRequest: StudentLeaveRequest = {
        ...requestData,
        requestId: newId,
        status: "Pending",
    };
    studentLeaveRequests = [newRequest, ...studentLeaveRequests];
    return newRequest;
};

// Inventory Functions
export const getInventoryItems = () => inventoryItems;
export const getVendors = () => vendors;
export const getPurchaseOrders = () => purchaseOrders;
export const getAssetAllocations = () => assetAllocations;
export const getMaintenanceLogs = () => maintenanceLogs;

export const addInventoryItem = (itemData: Omit<InventoryItem, 'itemId' | 'status' | 'isForSale'>) => {
    const newId = `INV-${itemData.category.substring(0, 2).toUpperCase()}-${String(inventoryItems.length + 1).padStart(3, '0')}`;
    const getStatus = (quantity: number): InventoryItem['status'] => {
        if (quantity === 0) return 'Out of Stock';
        if (quantity < 10) return 'Low Stock';
        return 'In Stock';
    }
    const newItem: InventoryItem = {
        ...itemData,
        itemId: newId,
        status: getStatus(itemData.quantity),
        isForSale: false,
    };
    inventoryItems = [newItem, ...inventoryItems];
    return newItem;
}

export const updateItemForSaleStatus = (itemId: string, isForSale: boolean) => {
    inventoryItems = inventoryItems.map(item =>
        item.itemId === itemId ? { ...item, isForSale } : item
    );
};


export const addVendor = (vendorData: Omit<Vendor, 'vendorId'>) => {
    const newId = `VDR-${String(vendors.length + 1).padStart(3, '0')}`;
    const newVendor: Vendor = {
        ...vendorData,
        vendorId: newId,
    };
    vendors = [newVendor, ...vendors];
    return newVendor;
}

export const updateVendor = (vendorId: string, data: Partial<Vendor>) => {
    vendors = vendors.map(v => v.vendorId === vendorId ? { ...v, ...data } : v);
    return vendors.find(v => v.vendorId === vendorId);
}

export const deleteVendor = (vendorId: string) => {
    vendors = vendors.filter(v => v.vendorId !== vendorId);
}

export const getPurchaseOrdersByVendor = (vendorId: string) => {
    return purchaseOrders.filter(po => po.vendorId === vendorId);
}
    ;

export const addPurchaseOrder = (orderData: Omit<PurchaseOrder, 'poId' | 'status' | 'orderDate' | 'totalAmount'>) => {
    const newId = `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`;
    const newOrder: PurchaseOrder = {
        ...orderData,
        poId: newId,
        status: "Pending",
        orderDate: new Date().toISOString().split('T')[0],
        totalAmount: orderData.items.reduce((acc, i) => acc + (i.quantity * i.unitPrice), 0),
    };
    purchaseOrders = [newOrder, ...purchaseOrders];
    return newOrder;
}

export const updatePurchaseOrderStatus = (poId: string, status: PurchaseOrder['status']) => {
    purchaseOrders = purchaseOrders.map(po => po.poId === poId ? { ...po, status } : po);
    return purchaseOrders.find(po => po.poId === poId);
}

export const issueAsset = (allocationData: Omit<AssetAllocation, 'allocationId' | 'issueDate' | 'returnDate'>) => {
    const item = inventoryItems.find(i => i.itemId === allocationData.itemId);
    if (!item || item.quantity <= 0) {
        throw new Error("Item not available in stock.");
    }

    inventoryItems = inventoryItems.map(i => i.itemId === allocationData.itemId ? { ...i, quantity: i.quantity - 1 } : i);

    const newAllocation: AssetAllocation = {
        ...allocationData,
        allocationId: `ALC-${String(assetAllocations.length + 1).padStart(3, '0')}`,
        issueDate: new Date().toISOString().split('T')[0],
        returnDate: null,
    };
    assetAllocations = [newAllocation, ...assetAllocations];
    return newAllocation;
}

export const returnAsset = (allocationId: string) => {
    const allocation = assetAllocations.find(a => a.allocationId === allocationId);
    if (!allocation || allocation.returnDate) {
        throw new Error("Allocation not found or item already returned.");
    }

    assetAllocations = assetAllocations.map(a => a.allocationId === allocationId ? { ...a, returnDate: new Date().toISOString().split('T')[0] } : a);

    const item = inventoryItems.find(i => i.itemId === allocation.itemId);
    if (item) {
        inventoryItems = inventoryItems.map(i => i.itemId === allocation.itemId ? { ...i, quantity: i.quantity + 1 } : i);
    }
}

export const addMaintenanceLog = (logData: Omit<MaintenanceLog, 'logId' | 'date'>) => {
    const newLog: MaintenanceLog = {
        ...logData,
        logId: `ML-${String(maintenanceLogs.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
    };
    maintenanceLogs = [newLog, ...maintenanceLogs];
    return newLog;
};

// Disciplinary Functions
export const getDisciplinaryRecords = () => disciplinaryRecords;

export const addDisciplinaryRecord = (recordData: Omit<DisciplinaryRecord, 'recordId' | 'date'>) => {
    const newId = `DR${String(disciplinaryRecords.length + 1).padStart(3, '0')}`;
    const newRecord: DisciplinaryRecord = {
        ...recordData,
        recordId: newId,
        date: new Date().toISOString().split('T')[0],
    };
    disciplinaryRecords = [newRecord, ...disciplinaryRecords];
    return newRecord;
};

