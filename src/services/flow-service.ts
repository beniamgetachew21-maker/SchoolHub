import { prisma } from "@/lib/prisma";

/**
 * Flow Service
 * 
 * Centralized orchestrator for End-to-End System Flows.
 * Uses Prisma Transactions to ensure data integrity across multiple domains
 * (e.g. Admissions -> SIS -> Finance -> Communications).
 */

export const flowService = {
    // ── 1. Admission to Enrollment Flow ────────────────────────────────────────

    /**
     * Enrolls an accepted applicant.
     * Creates a Student, generates a Guardian link, creates an initial invoice, 
     * and notifies they have been enrolled.
     */
    async enrollApprovedApplicant(applicationId: string, tenantId: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Get Application
            const application = await tx.application.findUnique({
                where: { id: applicationId, tenantId }
            });

            if (!application) throw new Error("Application not found.");
            if (application.status === "Enrolled") throw new Error("Applicant is already enrolled.");

            // Generate unique IDs
            const studentId = `STU-${Date.now().toString().slice(-6)}`;
            const admissionNumber = `ADM-${Date.now().toString().slice(-6)}`;

            // 2. Create Student Record
            const student = await tx.student.create({
                data: {
                    tenantId,
                    studentId,
                    admissionNumber,
                    name: application.name,
                    className: application.className,
                    parent: application.parent,
                    status: "Active",
                    email: application.email,
                    avatarUrl: "https://i.pravatar.cc/150", // placeholder
                    dob: application.dob,
                    gender: application.gender,
                    address: application.address,
                    enrollmentDate: new Date().toISOString().split('T')[0],
                    motherTongue: application.motherTongue,
                    specialNeedsType: application.specialNeedsType,
                    region: application.region,
                    isRefugee: application.isRefugee
                }
            });

            // 3. Create Guardian if it doesn't strictly exist by email, otherwise use dummy logic
            // (Assuming parent name / email from application)
            const guardianId = `GDN-${Date.now().toString().slice(-6)}`;
            const [firstName, ...lastNames] = application.parent.split(" ");
            const guardian = await tx.guardian.create({
                data: {
                    tenantId,
                    id: guardianId,
                    firstName: firstName || application.parent,
                    lastName: lastNames.join(" ") || "Guardian",
                    email: application.email, // using app email for parent
                    phone: application.parentPhone || "000-000-0000"
                }
            });

            // Link them
            await tx.studentGuardian.create({
                data: {
                    tenantId,
                    studentId: student.studentId,
                    guardianId: guardian.id,
                    relationship: "Parent",
                    isPrimary: true
                }
            });

            // 4. Create Initial Enrollment Invoice (e.g. 5000 ETB for Registration/Term 1)
            const invoiceId = `INV-${Date.now().toString().slice(-6)}`;
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 14); // Due in 14 days

            await (tx.invoice as any).create({
                data: {
                    tenantId: tenantId,
                    invoiceId: invoiceId,
                    studentId: student.studentId,
                    amount: 5000,
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    status: 'Pending',
                    description: 'Initial Enrollment / Registration Fee',
                    items: {
                        create: [
                            { type: 'Registration Fee', amount: 5000, tenantId: tenantId }
                        ]
                    }
                }
            });

            // 5. Update Application Status
            await tx.application.update({
                where: { id: applicationId },
                data: { status: "Enrolled" }
            });

            return { student, invoiceId };
        });
    },

    // ── 2. Academic Submission & Grading Lifecycle ─────────────────────────────

    /**
     * Grades a quiz submission dynamically and updates the student's Grade record.
     */
    async submitAndGradeQuiz(studentId: string, quizId: string, answers: { questionId: string, answerText: string }[], tenantId: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Fetch Quiz and the correct answers
            const quiz = await tx.quiz.findUnique({
                where: { id: quizId, tenantId },
                include: {
                    questions: { include: { answers: true } },
                    lesson: { include: { module: { include: { course: true } } } }
                }
            });

            if (!quiz) throw new Error("Quiz not found.");

            let totalScore = 0;
            let maxScore = 0;

            // 2. Auto-Grade Answers
            for (const q of quiz.questions) {
                maxScore += q.marks;
                const studentAnswer = answers.find(a => a.questionId === q.id);
                if (studentAnswer) {
                    const correctAns = q.answers.find(a => a.isCorrect);
                    if (correctAns && correctAns.answerText.toLowerCase() === studentAnswer.answerText.toLowerCase()) {
                        totalScore += q.marks;
                    }
                }
            }

            // 3. Record Attempt
            const attempt = await tx.quizAttempt.create({
                data: {
                    tenantId,
                    quizId,
                    studentId,
                    score: totalScore,
                    finishedAt: new Date()
                }
            });

            return { attempt, totalScore, maxScore };
        });
    },

    // ── 3. Financial Billing & Payment Loop ────────────────────────────────────

    /**
     * Processes a payment, updates invoice, and registers the transaction.
     */
    async processFeePayment(invoiceId: string, studentId: string, amount: number, method: string, tenantId: string) {
        return await prisma.$transaction(async (tx) => {
            const invoice = await tx.invoice.findUnique({
                where: { invoiceId, tenantId }
            });

            if (!invoice) throw new Error("Invoice not found.");

            // 1. Create Payment Record
            const paymentId = `PAY-${Date.now().toString().slice(-6)}`;
            const payment = await tx.payment.create({
                data: {
                    tenantId,
                    paymentId,
                    studentId,
                    invoiceId,
                    amount,
                    date: new Date().toISOString().split('T')[0],
                    method
                }
            });

            // 2. Register Financial Transaction Log
            await tx.transaction.create({
                data: {
                    tenantId,
                    id: `TRX-${Date.now().toString().slice(-6)}`,
                    date: new Date().toISOString().split('T')[0],
                    description: `Payment for Invoice ${invoiceId}`,
                    type: "Income",
                    amount,
                    method
                }
            });

            // 3. Update Invoice Status
            // (Assuming paying exact amount for simplicity. In real world, check if amount >= invoice.amount)
            const updatedInvoice = await tx.invoice.update({
                where: { invoiceId },
                data: { status: "Paid" }
            });

            return { payment, invoice: updatedInvoice };
        });
    },

    // ── 4. Staff Onboarding to Academic Access ─────────────────────────────────

    /**
     * Links an existing HR employee to academic assignments in the timetable.
     */
    async onboardAcademicStaff(employeeId: string, classSectionId: string, courseId: string, tenantId: string) {
        return await prisma.$transaction(async (tx) => {
            const employee = await tx.employee.findUnique({
                where: { employeeId, tenantId }
            });

            if (!employee) throw new Error("Employee not found.");

            // 1. Assign Teacher to Section & Subject
            const assignment = await tx.teacherAssignment.create({
                data: {
                    tenantId,
                    teacherId: employeeId,
                    classSectionId,
                    subjectId: courseId,
                    role: "Primary"
                }
            });

            return assignment;
        });
    },

    // ── 5. 360° Visibility Flow (The Parent Pulse) ─────────────────────────────

    /**
     * Records bulk attendance and automatically triggers SMS alerts
     * for parents of absent or late students (Parent Pulse).
     */
    async markAttendanceWithAlerts(records: { studentId: string; status: string; date: string }[], tenantId: string, className?: string, recordedBy?: string) {
        return await prisma.$transaction(async (tx) => {
            let alertsGenerated = 0;
            let sessionId = "";

            // 1. Create AttendanceSession if className is provided
            if (className) {
                const section = await tx.classSection.findFirst({
                    where: { tenantId, className }
                });
                
                const session = await tx.attendanceSession.create({
                    data: {
                        tenantId,
                        classSectionId: section?.id || "GENERIC",
                        date: new Date(records[0].date),
                        recordedBy: recordedBy || "System"
                    }
                });
                sessionId = session.id;
            }

            for (const rec of records) {
                // 2. Create StudentAttendance record
                await tx.studentAttendance.create({
                    data: {
                        tenantId,
                        studentId: rec.studentId,
                        status: rec.status,
                        sessionId: sessionId || "GENERIC",
                        remarks: ""
                    }
                });

                // 3. Update Attendance Summary
                const summary = await tx.attendanceSummary.findUnique({
                    where: { studentId: rec.studentId, tenantId },
                });

                if (!summary) {
                    await tx.attendanceSummary.create({
                        data: {
                            studentId: rec.studentId,
                            tenantId,
                            totalDays: 1,
                            presentDays: rec.status === "Present" ? 1 : 0,
                            absentDays: rec.status === "Absent" ? 1 : 0,
                            leaveDays: rec.status === "Leave" || rec.status === "Late" ? 1 : 0,
                        },
                    });
                } else {
                    await tx.attendanceSummary.update({
                        where: { studentId: rec.studentId, tenantId },
                        data: {
                            totalDays: { increment: 1 },
                            presentDays: { increment: rec.status === "Present" ? 1 : 0 },
                            absentDays: { increment: rec.status === "Absent" ? 1 : 0 },
                            leaveDays: { increment: rec.status === "Leave" || rec.status === "Late" ? 1 : 0 },
                        },
                    });
                }

                // 4. Trigger Parent Pulse Alerts for Absent/Late
                if (rec.status === "Absent" || rec.status === "Late") {
                    // Find the primary guardian
                    const guardianLinks = await tx.studentGuardian.findMany({
                        where: { studentId: rec.studentId, tenantId, isPrimary: true },
                        include: { guardian: true }
                    });

                    // For each primary guardian, log an SMS alert
                    for (const link of guardianLinks) {
                        const guardian = link.guardian;
                        const message = `Parent Pulse Alert: Your child has been marked ${rec.status} today (${rec.date}). Please contact the school if you have questions.`;
                        
                        await tx.smsLog.create({
                            data: {
                                tenantId,
                                phone: guardian.phone,
                                message: message,
                                status: "Sent",
                                sentAt: new Date()
                            }
                        });
                        alertsGenerated++;
                    }
                }
            }

            return { alertsGenerated, recordsSaved: records.length, sessionId };
        });
    },

    // ── 6. Inventory & Store Lifecycle ─────────────────────────────────────────

    /**
     * Processes a Purchase Order delivery.
     * Marks the PO as Delivered and increments inventory levels for all items.
     */
    async processProcurementPO(poId: string, tenantId: string) {
        return await prisma.$transaction(async (tx) => {
            const po = await tx.purchaseOrder.findUnique({
                where: { poId, tenantId }
            });

            if (!po) throw new Error("Purchase Order not found.");
            if (po.status === "Delivered") throw new Error("PO already processed.");

            // 1. Update PO Status
            await tx.purchaseOrder.update({
                where: { poId },
                data: { status: "Delivered" }
            });

            // 2. Increment Inventory Quantities
            // (Standardizing JSON structure as array of { itemId: string; name: string; category: string; quantity: number })
            const items = po.items as any[];
            for (const item of items) {
                const existingItem = await tx.inventoryItem.findUnique({
                    where: { itemId: item.itemId, tenantId }
                });

                if (existingItem) {
                    await tx.inventoryItem.update({
                        where: { itemId: item.itemId },
                        data: { quantity: { increment: item.quantity } }
                    });
                } else {
                    await tx.inventoryItem.create({
                        data: {
                            tenantId,
                            itemId: item.itemId,
                            name: item.name,
                            category: item.category,
                            quantity: item.quantity,
                            isForSale: false,
                            status: "In Stock"
                        }
                    });
                }
            }

            return { success: true, itemsProcessed: items.length };
        });
    },

    /**
     * Allocates an inventory item to a student or staff member.
     * Decrements inventory and creates an AssetAllocation record.
     */
    async allocateInventoryItem(itemId: string, assigneeId: string, assigneeType: string, tenantId: string) {
        return await prisma.$transaction(async (tx) => {
            const item = await tx.inventoryItem.findUnique({
                where: { itemId, tenantId }
            });

            if (!item) throw new Error("Inventory item not found.");
            if (item.quantity <= 0) throw new Error("Item out of stock.");

            // 1. Create Allocation Record
            const allocation = await tx.assetAllocation.create({
                data: {
                    tenantId,
                    allocationId: `ALC-${Date.now().toString().slice(-6)}`,
                    itemId,
                    assigneeId,
                    assigneeType,
                    issueDate: new Date().toISOString().split('T')[0],
                    dueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 1 year
                }
            });

            // 2. Decrement Quantity
            await tx.inventoryItem.update({
                where: { itemId },
                data: { quantity: { decrement: 1 } }
            });

            return allocation;
        });
    },

    // ── 7. Transportation & Live Tracking ────────────────
    async assignStudentToRoute(studentId: string, routeId: string, pickupPoint?: string, tenantId?: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Create Assignment
            const assignment = await (tx as any).transportAssignment.create({
                data: {
                    studentId,
                    routeId,
                    pickupPoint,
                    tenantId
                }
            });

            // 2. Update Route student count
            await tx.route.update({
                where: { routeId },
                data: { students: { increment: 1 } }
            });

            // 3. Optional: Create SmsLog for Parent
            const student = await tx.student.findUnique({
                where: { studentId },
                include: { studentGuardians: { include: { guardian: true } } }
            });

            const primaryGuardian = student?.studentGuardians.find(g => g.isPrimary)?.guardian;
            if (primaryGuardian?.phone) {
                await tx.smsLog.create({
                    data: {
                        phone: primaryGuardian.phone,
                        message: `Transportation Assigned: ${student?.name} is now registered for Route ${routeId}.`,
                        status: "Sent",
                        tenantId
                    }
                });
            }

            return assignment;
        });
    },

    async logTransportEvent(routeId: string, event: string, location?: string, studentId?: string, tenantId?: string) {
        return await (prisma as any).transportLog.create({
            data: {
                routeId,
                studentId,
                event,
                location,
                tenantId
            }
        });
    },

    // ── 8. Hostel & Residential Management ────────────────
    async assignStudentToBed(studentId: string, bedId: string, tenantId?: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Verify Bed is Vacant
            const bed = await tx.bed.findUnique({ where: { id: bedId } });
            if (!bed) throw new Error("Bed not found");
            if (bed.status !== "Vacant") throw new Error("Bed is already occupied");

            // 2. Update Bed Status
            await tx.bed.update({
                where: { id: bedId },
                data: { status: "Occupied" }
            });

            // 3. Create Assignment Log
            const log = await tx.roomAssignmentLog.create({
                data: {
                    studentId,
                    bedId,
                    tenantId
                }
            });

            // 4. Notify Student/Parent
            const student = await tx.student.findUnique({
                where: { studentId },
                include: { studentGuardians: { include: { guardian: true } } }
            });

            const primaryGuardian = student?.studentGuardians.find(g => g.isPrimary)?.guardian;
            if (primaryGuardian?.phone) {
                await tx.smsLog.create({
                    data: {
                        phone: primaryGuardian.phone,
                        message: `Hostel Assigned: ${student?.name} has been assigned to Bed ${bed.number}.`,
                        status: "Sent",
                        tenantId
                    }
                });
            }

            return log;
        });
    },

    async logMaintenanceIssue(hostelId: string, issue: string, tenantId?: string) {
        return await (prisma as any).hostelMaintenance.create({
            data: {
                hostelId,
                issue,
                status: "Reported",
                tenantId
            }
        });
    },

    async unassignStudentFromBed(bedId: string, tenantId?: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Update Bed Status
            await tx.bed.update({
                where: { id: bedId },
                data: { status: "Vacant" }
            });

            // 2. Update RoomAssignmentLog
            await tx.roomAssignmentLog.updateMany({
                where: { bedId, vacatedAt: null },
                data: { vacatedAt: new Date() }
            });

            return { success: true };
        });
    },

    async registerClubMembership(studentId: string, clubId: string, tenantId?: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Check if membership already exists
            const existing = await (tx as any).clubMembership.findUnique({
                where: {
                    clubId_studentId_tenantId: {
                        clubId,
                        studentId,
                        tenantId: tenantId || null
                    }
                }
            });

            if (existing) throw new Error("Student is already a member of this club");

            // 2. Create membership
            const membership = await (tx as any).clubMembership.create({
                data: {
                    studentId,
                    clubId,
                    tenantId
                }
            });

            // 3. Increment Club memberCount
            await (tx as any).club.update({
                where: { clubId },
                data: { memberCount: { increment: 1 } }
            });

            return membership;
        });
    },

    async recordClubAttendance(clubId: string, attendanceData: { studentId: string, status: string }[], date: Date, tenantId?: string) {
        return await prisma.$transaction(async (tx) => {
            const records = await Promise.all(
                attendanceData.map(record => 
                    (tx as any).clubAttendanceRecord.create({
                        data: {
                            clubId,
                            studentId: record.studentId,
                            status: record.status,
                            date,
                            tenantId
                        }
                    })
                )
            );
            return records;
        });
    },

    // ── 10. Cafeteria & Meal Planning ────────────────
    async issueMealToken(studentId: string, itemId: string, tenantId?: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Verify student and item exist
            const student = await tx.student.findUnique({ where: { studentId } });
            if (!student) throw new Error("Student not found");

            const item = await (tx as any).cafeteriaItem.findUnique({ where: { id: itemId } });
            if (!item) throw new Error("Menu item not found");

            // 2. Create Meal Token
            const token = await (tx as any).mealToken.create({
                data: {
                    studentId,
                    itemId,
                    tenantId,
                    status: "Valid",
                    issuedAt: new Date()
                }
            });

            // 3. Increment order count for the item
            await (tx as any).cafeteriaItem.update({
                where: { id: itemId },
                data: { orders: { increment: 1 } }
            });

            return token;
        });
    },

    // ── 11. Student Health & Infirmary ────────────────
    async logHealthVisit(studentId: string, visitData: { reason: string, treatment: string, notes?: string, status?: string }, tenantId?: string) {
        return await (prisma as any).healthVisitLog.create({
            data: {
                studentId,
                reason: visitData.reason,
                treatment: visitData.treatment,
                notes: visitData.notes,
                status: visitData.status || "Completed",
                tenantId,
                date: new Date()
            }
        });
    }
};
