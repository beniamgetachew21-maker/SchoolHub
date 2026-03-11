const fs = require('fs');

let existingSchema = fs.readFileSync('prisma/schema.prisma', 'utf8');

// --- 1. CLEAN EXISTING SCHEMA ---
// Strip any appended SaaS/New models
if (existingSchema.includes('// --- 0. SAAS CORE: MULTI-TENANCY ---')) {
    existingSchema = existingSchema.split('// --- 0. SAAS CORE: MULTI-TENANCY ---')[0];
} else if (existingSchema.includes('// --- 1. CORE SYSTEM ADDITIONS ---')) {
    existingSchema = existingSchema.split('// --- 1. CORE SYSTEM ADDITIONS ---')[0];
}

// Strip injected tenantId
existingSchema = existingSchema.replace(/  tenantId String\?.*\n/g, '');
existingSchema = existingSchema.replace(/  tenant   Tenant\?.*\n/g, '');
existingSchema = existingSchema.replace(/  \/\/ Inverse Relations for Data Isolation.*\n/g, '');

// Strip duplicate injected relations from base models
const relationsToRemove = [
    /  notifications Notification\[\]\n/g,
    /  auditLogs     AuditLog\[\]\n/g,
    /  studentGuardians     StudentGuardian\[\]\n/g,
    /  studentContact       StudentContact\?\n/g,
    /  documents            StudentDocument\[\]\n/g,
    /  statusHistory        StudentStatusHistory\[\]\n/g,
    /  healthRecords        StudentHealthRecord\[\]\n/g,
    /  quizAttempts         QuizAttempt\[\]\n/g,
    /  documents            ApplicationDocument\[\]\n/g,
    /  decision             AdmissionDecision\?\n/g,
    /  offer                AdmissionOffer\?\n/g,
    /  waitlistEntry        Waitlist\?\n/g,
    /  prerequisitesFor CoursePrerequisite\[\] @relation\("CoursePrereqs"\)\n/g,
    /  prerequisites    CoursePrerequisite\[\] @relation\("PrereqFor"\)\n/g,
    /  offerings        CourseOffering\[\]\n/g,
    /  forums           DiscussionForum\[\]\n/g,
    /  courseOfferings CourseOffering\[\]\n/g,
    /  quizzes Quiz\[\]\n/g
];

for (const regex of relationsToRemove) {
    existingSchema = existingSchema.replace(regex, '');
}

// We will inject relations into existing models safely.
let modifiedSchema = existingSchema;

// Add inverse relations to User
modifiedSchema = modifiedSchema.replace(
    /model User \{([\s\S]*?)\}/,
    `model User {\n$1\n  notifications Notification[]\n  auditLogs     AuditLog[]\n}`
);

// Add inverse relations to Campus/School/etc (handled later as they are new)

// Add inverse relations to Student
modifiedSchema = modifiedSchema.replace(
    /model Student \{([\s\S]*?)\}/,
    `model Student {\n$1\n  studentGuardians     StudentGuardian[]\n  studentContact       StudentContact?\n  documents            StudentDocument[]\n  statusHistory        StudentStatusHistory[]\n  healthRecords        StudentHealthRecord[]\n  quizAttempts         QuizAttempt[]\n}`
);

// Add inverse relations to Application
modifiedSchema = modifiedSchema.replace(
    /model Application \{([\s\S]*?)\}/,
    `model Application {\n$1\n  documents            ApplicationDocument[]\n  decision             AdmissionDecision?\n  offer                AdmissionOffer?\n  waitlistEntry        Waitlist?\n}`
);

// Add inverse relations to Course
modifiedSchema = modifiedSchema.replace(
    /model Course \{([\s\S]*?)\}/,
    `model Course {\n$1\n  prerequisitesFor CoursePrerequisite[] @relation("CoursePrereqs")\n  prerequisites    CoursePrerequisite[] @relation("PrereqFor")\n  offerings        CourseOffering[]\n  forums           DiscussionForum[]\n}`
);

// Add inverse relations to AcademicTerm
modifiedSchema = modifiedSchema.replace(
    /model AcademicTerm \{([\s\S]*?)\}/,
    `model AcademicTerm {\n$1\n  courseOfferings CourseOffering[]\n}`
);

// Add inverse relations to Lesson
modifiedSchema = modifiedSchema.replace(
    /model Lesson \{([\s\S]*?)\}/,
    `model Lesson {\n$1\n  quizzes Quiz[]\n}`
);

const newModels = `
// --- 0. SAAS CORE: MULTI-TENANCY ---
model Tenant {
  id              String   @id @default(uuid())
  name            String   // e.g. "Addis Ababa Academy"
  domain          String?  @unique
  contactEmail    String
  contactPhone    String?
  address         String?
  logoUrl         String?
  status          String   @default("Active") // "Active", "Suspended"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  subscriptionId  String?
  subscription    TenantSubscription? @relation(fields: [subscriptionId], references: [id])
}

model TenantSubscription {
  id              String   @id @default(uuid())
  plan            String   // "Starter", "Growth", "Enterprise"
  status          String   @default("Active") // "Active", "Trial", "Expired"
  startDate       DateTime
  endDate         DateTime
  maxStudents     Int?     // null = unlimited
  tenants         Tenant[]
}

// --- 1. CORE SYSTEM ADDITIONS ---
model SystemSetting {
  id    String @id @default(uuid())
  key   String @unique
  value String
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  title     String
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

model AnnouncementBoard {
  id        String   @id @default(uuid())
  title     String
  content   String
  target    String   // "All", "Students", "Teachers", "Parents"
  authorId  String
  createdAt DateTime @default(now())
}

model AuditLog {
  id        String   @id @default(uuid())
  userId    String?
  action    String
  entity    String
  entityId  String?
  details   Json?
  createdAt DateTime @default(now())
  user      User?    @relation(fields: [userId], references: [id])
}

model Attachment {
  id         String   @id @default(uuid())
  entityType String
  entityId   String
  fileName   String
  fileUrl    String
  fileType   String
  uploadedAt DateTime @default(now())
}

// --- 2. INSTITUTION STRUCTURE ---
model Campus {
  id       String   @id @default(uuid())
  name     String
  address  String?
  schools  School[]
}

model School {
  id        String    @id @default(uuid())
  campusId  String
  name      String    // e.g. "Primary School", "High School"
  campus    Campus    @relation(fields: [campusId], references: [id])
  faculties Faculty[]
}

model Faculty {
  id          String       @id @default(uuid())
  schoolId    String
  name        String
  school      School       @relation(fields: [schoolId], references: [id])
  departments Department[]
}

model Department {
  id        String    @id @default(uuid())
  facultyId String
  name      String
  faculty   Faculty   @relation(fields: [facultyId], references: [id])
  programs  Program[]
}

model Program {
  id           String     @id @default(uuid())
  departmentId String
  name         String
  department   Department @relation(fields: [departmentId], references: [id])
}

model AcademicLevel {
  id    String @id @default(uuid())
  name  String // "Grade 1", "Freshman"
  order Int
}

model Semester {
  id        String   @id @default(uuid())
  yearId    String
  name      String
  startDate DateTime
  endDate   DateTime
  year      AcademicYear @relation(fields: [yearId], references: [id])
}

// --- 3. STUDENT MANAGEMENT (SIS) ADDITIONS ---
model Guardian {
  id               String            @id @default(uuid())
  firstName        String
  lastName         String
  email            String?
  phone            String
  profession       String?
  studentGuardians StudentGuardian[]
}

model StudentGuardian {
  id           String   @id @default(uuid())
  studentId    String
  guardianId   String
  relationship String
  isPrimary    Boolean  @default(false)
  student      Student  @relation(fields: [studentId], references: [studentId])
  guardian     Guardian @relation(fields: [guardianId], references: [id])
}

model StudentContact {
  id             String  @id @default(uuid())
  studentId      String  @unique
  emergencyPhone String?
  homePhone      String?
  addressLine1   String?
  addressLine2   String?
  city           String?
  state          String?
  zipCode        String?
  student        Student @relation(fields: [studentId], references: [studentId])
}

model StudentDocument {
  id         String   @id @default(uuid())
  studentId  String
  type       String   // "Birth Certificate", "Transcript"
  url        String
  uploadedAt DateTime @default(now())
  student    Student  @relation(fields: [studentId], references: [studentId])
}

model StudentStatusHistory {
  id        String   @id @default(uuid())
  studentId String
  status    String
  reason    String?
  changedAt DateTime @default(now())
  student   Student  @relation(fields: [studentId], references: [studentId])
}

model StudentHealthRecord {
  id          String   @id @default(uuid())
  studentId   String
  condition   String
  notes       String?
  recordedAt  DateTime @default(now())
  student     Student  @relation(fields: [studentId], references: [studentId])
}

// --- 4. ADMISSIONS SYSTEM ADDITIONS ---
model ApplicationDocument {
  id            String      @id @default(uuid())
  applicationId String
  type          String
  url           String
  application   Application @relation(fields: [applicationId], references: [id])
}

model AdmissionDecision {
  id            String      @id @default(uuid())
  applicationId String      @unique
  decision      String      // "Accepted", "Rejected", "Waitlisted"
  reason        String?
  date          DateTime    @default(now())
  application   Application @relation(fields: [applicationId], references: [id])
}

model AdmissionOffer {
  id            String      @id @default(uuid())
  applicationId String      @unique
  offerDetails  Json?
  expiresAt     DateTime
  status        String      // "Pending", "Accepted", "Declined"
  application   Application @relation(fields: [applicationId], references: [id])
}

model Waitlist {
  id            String      @id @default(uuid())
  applicationId String      @unique
  position      Int
  status        String      // "Active", "Admitted", "Removed"
  application   Application @relation(fields: [applicationId], references: [id])
}

// --- 5. ACADEMIC MANAGEMENT ADDITIONS ---
model CourseCategory {
  id   String @id @default(uuid())
  name String
}

model CoursePrerequisite {
  id             String @id @default(uuid())
  courseId       String
  prerequisiteId String
  course         Course @relation("CoursePrereqs", fields: [courseId], references: [id])
  prerequisite   Course @relation("PrereqFor", fields: [prerequisiteId], references: [id])
}

model CourseOffering {
  id       String @id @default(uuid())
  courseId String
  termId   String
  course   Course @relation(fields: [courseId], references: [id])
  term     AcademicTerm @relation(fields: [termId], references: [id])
}

// --- 6. TIMETABLE & SCHEDULING ---
model Schedule {
  id        String @id @default(uuid())
  name      String
  termId    String
  isDefault Boolean @default(false)
}

model TimetableSlot {
  id         String @id @default(uuid())
  scheduleId String
  dayOfWeek  Int
  startTime  String
  endTime    String
}

model TimetableEntry {
  id             String @id @default(uuid())
  slotId         String
  classSectionId String
  subjectId      String
  teacherId      String
  roomId         String?
}

model TeacherAssignment {
  id             String @id @default(uuid())
  teacherId      String
  classSectionId String
  subjectId      String
  role           String // "Primary", "Assistant"
}

model RoomAssignment {
  id             String @id @default(uuid())
  roomId         String
  classSectionId String
}

model ExamSchedule {
  id         String   @id @default(uuid())
  examId     String
  roomId     String
  startTime  DateTime
  endTime    DateTime
  supervisor String?
}

// --- 7. ATTENDANCE MANAGEMENT ---
model AttendanceSession {
  id             String   @id @default(uuid())
  classSectionId String
  date           DateTime
  recordedBy     String
}

model StudentAttendance {
  id          String   @id @default(uuid())
  sessionId   String
  studentId   String
  status      String   // "Present", "Absent", "Late", "Excused"
  remarks     String?
}

model TeacherAttendance {
  id        String   @id @default(uuid())
  teacherId String
  date      DateTime
  status    String
  checkIn   DateTime?
  checkOut  DateTime?
}

model AttendanceType {
  id   String @id @default(uuid())
  name String 
  code String @unique
}

model AttendanceReport {
  id        String   @id @default(uuid())
  type      String   // "Daily", "Weekly", "Monthly"
  date      DateTime
  summary   Json
}

// --- 8. EXAMINATION SYSTEM ---
model ExamType {
  id   String @id @default(uuid())
  name String // "Midterm", "Final", "Quiz"
}

model ExamSubject {
  id        String @id @default(uuid())
  examId    String
  subjectId String
  maxMarks  Float
}

model Grade {
  id          String   @id @default(uuid())
  studentId   String
  subjectId   String
  termId      String
  score       Float
  gradeLetter String
}

model GradingScale {
  id       String @id @default(uuid())
  name     String
  minScore Float
  maxScore Float
  grade    String
  gpaValue Float?
}

model Transcript {
  id          String   @id @default(uuid())
  studentId   String
  generatedAt DateTime @default(now())
  fileUrl     String?
}

model ReportCard {
  id          String   @id @default(uuid())
  studentId   String
  termId      String
  compiledAt  DateTime @default(now())
  isPublished Boolean  @default(false)
}

model GPARecord {
  id           String @id @default(uuid())
  studentId    String
  academicYear String
  gpa          Float
  cumulative   Float
}

// --- 9. LEARNING MANAGEMENT (LMS) ADDITIONS ---
model Quiz {
  id       String @id @default(uuid())
  lessonId String
  title    String
  timeLimit Int?
  lesson   Lesson @relation(fields: [lessonId], references: [id])
  questions QuizQuestion[]
  attempts QuizAttempt[]
}

model QuizQuestion {
  id       String @id @default(uuid())
  quizId   String
  question String
  type     String // "Multiple Choice", "True/False"
  marks    Float
  quiz     Quiz   @relation(fields: [quizId], references: [id])
  answers  QuizAnswer[]
}

model QuizAnswer {
  id         String       @id @default(uuid())
  questionId String
  answerText String
  isCorrect  Boolean
  question   QuizQuestion @relation(fields: [questionId], references: [id])
}

model QuizAttempt {
  id         String   @id @default(uuid())
  quizId     String
  studentId  String
  score      Float?
  startedAt  DateTime @default(now())
  finishedAt DateTime?
  quiz       Quiz     @relation(fields: [quizId], references: [id])
  student    Student  @relation(fields: [studentId], references: [studentId])
}

model DiscussionForum {
  id       String @id @default(uuid())
  courseId String
  title    String
  course   Course @relation(fields: [courseId], references: [id])
  posts    ForumPost[]
}

model ForumPost {
  id        String          @id @default(uuid())
  forumId   String
  authorId  String
  content   String
  createdAt DateTime        @default(now())
  forum     DiscussionForum @relation(fields: [forumId], references: [id])
}

// --- 10. FINANCE & BILLING ADDITIONS ---
model StudentFee {
  id          String @id @default(uuid())
  studentId   String
  feeTypeId   String
  amount      Float
  dueDate     DateTime
}

model PaymentMethod {
  id       String  @id @default(uuid())
  name     String
  isActive Boolean @default(true)
}

model Scholarship {
  id          String @id @default(uuid())
  name        String
  description String?
  amount      Float
}

model FinancialAid {
  id          String   @id @default(uuid())
  studentId   String
  amount      Float
  reason      String?
  grantedDate DateTime @default(now())
}

model Discount {
  id         String @id @default(uuid())
  name       String
  percentage Float
}

model Refund {
  id          String   @id @default(uuid())
  paymentId   String
  amount      Float
  reason      String
  processedAt DateTime @default(now())
}

model Payroll {
  id           String   @id @default(uuid())
  employeeId   String
  month        Int
  year         Int
  basicSalary  Float
  allowances   Float
  deductions   Float
  netPay       Float
  status       String   // "Pending", "Processed", "Paid"
  processedAt  DateTime?
}

// --- 11. HUMAN RESOURCES (HR) ADDITIONS ---
model StaffProfile {
  id             String  @id @default(uuid())
  employeeId     String  @unique
  qualifications String?
  experience     String?
  bio            String?
}

model StaffDepartment {
  id         String @id @default(uuid())
  employeeId String
  departmentId String
}

model StaffPosition {
  id         String @id @default(uuid())
  title      String
  level      Int
}

model Contract {
  id         String   @id @default(uuid())
  employeeId String
  startDate  DateTime
  endDate    DateTime?
  type       String   // "Full-Time", "Part-Time", "Contract"
  salary     Float
}

model StaffAttendance {
  id         String   @id @default(uuid())
  employeeId String
  date       DateTime
  status     String
}

model LeaveType {
  id   String @id @default(uuid())
  name String
  days Int
}

model PerformanceReview {
  id          String   @id @default(uuid())
  employeeId  String
  reviewerId  String
  score       Float
  comments    String?
  reviewDate  DateTime @default(now())
}

// --- 12. LIBRARY SYSTEM ---
model BookCategory {
  id   String @id @default(uuid())
  name String
}

model BookAuthor {
  id   String @id @default(uuid())
  name String
}

model BookCopy {
  id        String @id @default(uuid())
  bookId    Int
  barcode   String @unique
  condition String
  status    String // "Available", "Borrowed", "Lost"
}

model BookLoan {
  id         String   @id @default(uuid())
  copyId     String
  borrowerId String
  loanDate   DateTime @default(now())
  dueDate    DateTime
  returnDate DateTime?
}

model BookReservation {
  id         String   @id @default(uuid())
  bookId     Int
  borrowerId String
  status     String   // "Pending", "Fulfilled", "Cancelled"
  createdAt  DateTime @default(now())
}

model LibraryMember {
  id        String   @id @default(uuid())
  userId    String   @unique
  maxBooks  Int      @default(3)
  joinedAt  DateTime @default(now())
}

// --- 13. HOSTEL / DORMITORY ADDITIONS ---
model Bed {
  id      String @id @default(uuid())
  roomId  String
  number  String
  status  String // "Occupied", "Vacant"
}

model RoomAssignmentLog {
  id         String   @id @default(uuid())
  studentId  String
  bedId      String
  assignedAt DateTime @default(now())
  vacatedAt  DateTime?
}

model HostelFee {
  id        String   @id @default(uuid())
  hostelId  String
  amount    Float
  termId    String
}

model HostelMaintenance {
  id          String   @id @default(uuid())
  hostelId    String
  issue       String
  status      String   // "Reported", "In Progress", "Resolved"
  reportedAt  DateTime @default(now())
  resolvedAt  DateTime?
}

// --- 14. TRANSPORTATION ADDITIONS ---
model Bus {
  id           String @id @default(uuid())
  plateNumber  String @unique
  capacity     Int
  model        String?
}

model BusRouteInfo {
  id          String @id @default(uuid())
  name        String
  description String?
}

model BusStop {
  id        String @id @default(uuid())
  routeId   String
  name      String
  time      String
  latitude  Float?
  longitude Float?
}

model BusAssignment {
  id       String @id @default(uuid())
  busId    String
  routeId  String
  driverId String
}

model StudentTransportAssignment {
  id        String @id @default(uuid())
  studentId String
  stopId    String
  termId    String
}

// --- 15. COMMUNICATION SYSTEM ---
model Message {
  id         String   @id @default(uuid())
  threadId   String
  senderId   String
  content    String
  sentAt     DateTime @default(now())
}

model MessageThread {
  id        String   @id @default(uuid())
  subject   String
  createdAt DateTime @default(now())
}

model MessageRecipient {
  id        String   @id @default(uuid())
  threadId  String
  userId    String
  isRead    Boolean  @default(false)
}

model EmailLog {
  id         String   @id @default(uuid())
  recipient  String
  subject    String
  status     String
  sentAt     DateTime @default(now())
}

model SmsLog {
  id         String   @id @default(uuid())
  phone      String
  message    String
  status     String
  sentAt     DateTime @default(now())
}

model PushNotification {
  id         String   @id @default(uuid())
  userId     String
  title      String
  body       String
  sentAt     DateTime @default(now())
}

// --- 16. ANALYTICS & REPORTING ---
model Report {
  id          String   @id @default(uuid())
  name        String
  generatedBy String
  fileUrl     String
  createdAt   DateTime @default(now())
}

model ReportTemplate {
  id      String @id @default(uuid())
  name    String
  config  Json
}

model AnalyticsEvent {
  id        String   @id @default(uuid())
  eventType String
  userId    String?
  metadata  Json?
  timestamp DateTime @default(now())
}

model Dashboard {
  id      String @id @default(uuid())
  roleId  String
  layout  Json
}

model KpiMetric {
  id          String   @id @default(uuid())
  name        String
  value       Float
  calculatedAt DateTime @default(now())
}
`;

// Inject tenantId mapping
let finalSchema = modifiedSchema + newModels;

// Loop over all models and add tenantId, EXCEPT Tenant and TenantSubscription
const models = finalSchema.match(/model \w+ \{/g);

if (models) {
    for (const modelMatch of models) {
        const modelName = modelMatch.replace('model ', '').replace(' {', '');

        // Skip SaaS core models
        if (modelName === 'Tenant' || modelName === 'TenantSubscription') {
            continue;
        }

        // Replace the opening brace to insert the tenantId and relation.
        // Making it nullable ? during transition is safer, but SaaS usually requires it.
        // Let's make it mandatory with a default fallback or cascade.
        finalSchema = finalSchema.replace(
            new RegExp(`model ${modelName} \{([\\s\\S]*?)\}`),
            (match, content) => {
                // If it already has tenantId, skip
                if (content.includes('tenantId')) return match;

                // Add tenantId and Tenant relation immediately after the opening brace
                return `model ${modelName} {\n  tenantId String?\n  tenant   Tenant? @relation(fields: [tenantId], references: [id])\n${content}}`;
            }
        );
    }
}

// We also need to add all reverse relations to the Tenant model
const reverseRelations = [];
if (models) {
    for (const modelMatch of models) {
        const modelName = modelMatch.replace('model ', '').replace(' {', '');
        if (modelName !== 'Tenant' && modelName !== 'TenantSubscription') {
            const plural = modelName.charAt(0).toLowerCase() + modelName.slice(1) + 's';
            reverseRelations.push(`  ${plural} ${modelName}[]`);
        }
    }
}

finalSchema = finalSchema.replace(
    /model Tenant \{([\s\S]*?)\}/,
    (match, content) => {
        return `model Tenant {\n${content}\n  // Inverse Relations for Data Isolation\n${reverseRelations.join('\n')}\n}`;
    }
);

fs.writeFileSync('prisma/schema.prisma', finalSchema);
console.log('Schema written with Tenant isolation successfully!');
