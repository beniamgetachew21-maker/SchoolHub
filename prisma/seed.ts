import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
// @ts-ignore - Prisma adapter setup
import { PrismaClient } from '@prisma/client'
import {
    applications, students, employees, candidates, onboardingTasks,
    leaveRequests, leavePolicies, studentLeaveRequests, books,
    borrowRecords, borrowRequests, invoices, payments, transactions,
    feeStructures, drivers, vehicles, routes, studentRoutes,
    inventoryItems, vendors, purchaseOrders, subscriberLists,
    disciplinaryRecords, achievements, classrooms, subjects, hostels, rooms,
    assessments, assessmentResults, attendanceSummaries
} from '../src/lib/data'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Start seeding...')

    // Clear existing data to prevent unique constraint violations
    await prisma.application.deleteMany()
    await prisma.student.deleteMany()
    await prisma.employee.deleteMany()
    await prisma.candidate.deleteMany()
    await prisma.onboardingTask.deleteMany()

    console.log('Seeding SaaS Tenants...');

    // Create the Default Tenant (Fallback for localhost:3000 without subdomains)
    const defaultTenant = await prisma.tenant.upsert({
        where: { domain: 'default' },
        update: {},
        create: {
            name: 'Studio School HQ',
            domain: 'default',
            contactEmail: 'admin@hc.edu',
            contactPhone: '+251900000000',
            address: '123 HQ Street, Addis Ababa',
            status: 'Active',
        }
    });

    // Create a Demo Tenant (For testing demo.localhost:3000)
    const demoTenant = await prisma.tenant.upsert({
        where: { domain: 'demo' },
        update: {},
        create: {
            name: 'Demo Academy',
            domain: 'demo',
            contactEmail: 'demo@academy.com',
            contactPhone: '+254700000000',
            address: 'Demo Road, Nairobi',
            status: 'Active',
        }
    });

    const SYS_TENANT = defaultTenant.id;
    console.log(`Created Default Tenant: ${SYS_TENANT}`);
    await prisma.leaveRequest.deleteMany()
    await prisma.leavePolicy.deleteMany()
    await prisma.studentLeaveRequest.deleteMany()
    await prisma.book.deleteMany()
    await prisma.borrowRecord.deleteMany()
    await prisma.borrowRequest.deleteMany()
    await prisma.invoice.deleteMany()
    await prisma.payment.deleteMany()
    await prisma.transaction.deleteMany()
    await prisma.feeStructure.deleteMany()
    await prisma.vehicle.deleteMany()
    await prisma.driver.deleteMany()
    await prisma.route.deleteMany()
    await prisma.inventoryItem.deleteMany()
    await prisma.vendor.deleteMany()
    await prisma.purchaseOrder.deleteMany()
    await prisma.subscriberList.deleteMany()
    await prisma.achievement.deleteMany()
    await prisma.disciplinaryRecord.deleteMany()
    await prisma.classroom.deleteMany()
    await prisma.subject.deleteMany()
    await prisma.hostel.deleteMany()
    await prisma.room.deleteMany()
    await prisma.assessment.deleteMany()
    await prisma.assessmentResult.deleteMany()
    await prisma.attendanceSummary.deleteMany()

    for (const app of applications) {
        await prisma.application.create({
            data: {
                tenantId: SYS_TENANT,
                id: app.id,
                name: app.name,
                className: app.class,
                date: app.date,
                status: app.status,
                dob: app.dob,
                gender: app.gender,
                email: app.email,
                phone: app.phone,
                address: app.address,
                parent: app.parent,
                parentPhone: app.parentPhone,
                birthCertificate: app.documents.birthCertificate,
                birthCertificateUrl: app.documents.birthCertificateUrl,
                previousMarksheet: app.documents.previousMarksheet,
                motherTongue: (app as any).motherTongue,
                specialNeedsType: (app as any).specialNeedsType,
                region: (app as any).region,
                isRefugee: (app as any).isRefugee || false,
            },
        })
    }

    for (const s of students) {
        await prisma.student.create({
            data: {
                tenantId: SYS_TENANT,
                studentId: s.studentId,
                admissionNumber: s.admissionNumber,
                name: s.name,
                className: s.class,
                parent: s.parent,
                status: s.status,
                email: s.email,
                avatarUrl: s.avatarUrl,
                dob: s.dob,
                gender: s.gender,
                address: s.address,
                enrollmentDate: s.enrollmentDate,
                allergies: s.medical?.allergies || [],
                conditions: s.medical?.conditions || [],
                bloodGroup: s.medical?.bloodGroup,
                emergencyName: s.medical?.emergencyContact.name,
                emergencyRelation: s.medical?.emergencyContact.relation,
                emergencyPhone: s.medical?.emergencyContact.phone,
                motherTongue: (s as any).motherTongue,
                specialNeedsType: (s as any).specialNeedsType,
                region: (s as any).region,
                isRefugee: (s as any).isRefugee || false,
            },
        })
    }

    for (const e of employees) {
        await prisma.employee.create({
            data: {
                tenantId: SYS_TENANT,
                employeeId: e.employeeId,
                employeeCode: e.employeeCode,
                name: e.name,
                dob: e.dob,
                gender: e.gender,
                nationality: e.nationality,
                nationalId: e.nationalId,
                passport: e.passport,
                department: e.department,
                designation: e.designation,
                dateOfJoining: e.dateOfJoining,
                email: e.email,
                status: e.status,
                avatarUrl: e.avatarUrl,
                salary: e.salary,
                allowances: e.allowances,
                deductions: e.deductions,
                branch: e.branch,
                jobType: e.jobType,
                lineManager: e.lineManager,
                paymentMethod: e.paymentMethod,
                payPeriod: e.payPeriod,
                bankAccount: e.bankAccount,
                maritalStatus: e.family?.maritalStatus,
                spouseWorking: e.family?.spouseWorking,
                spouseFirstName: e.family?.spouseFirstName,
                spouseMiddleName: e.family?.spouseMiddleName,
                spouseLastName: e.family?.spouseLastName,
                spouseBirthDate: e.family?.spouseBirthDate,
                spouseNationality: e.family?.spouseNationality,
                spouseNationalId: e.family?.spouseNationalId,
                spousePassport: e.family?.spousePassport,
                spouseEthnicity: e.family?.spouseEthnicity,
                spouseReligion: e.family?.spouseReligion,
                childrenCount: e.family?.childrenCount,
                blog: e.contact?.blog,
                officePhone: e.contact?.officePhone,
                mobilePhone: e.contact?.mobilePhone,
                housePhone: e.contact?.housePhone,
                address1: e.address?.address1,
                address2: e.address?.address2,
                city: e.address?.city,
                postcode: e.address?.postcode,
                state: e.address?.state,
                country: e.address?.country,
                emergencyFirstName: e.emergencyContact?.firstName,
                emergencyMiddleName: e.emergencyContact?.middleName,
                emergencyLastName: e.emergencyContact?.lastName,
                emergencyRelationship: e.emergencyContact?.relationship,
                emergencyMobile: e.emergencyContact?.mobilePhone,
                emergencyHouse: e.emergencyContact?.housePhone,
                emergencyOffice: e.emergencyContact?.officePhone,
                height: e.health?.height,
                weight: e.health?.weight,
                bloodType: e.health?.bloodType,
            },
        })
    }

    for (const c of candidates) {
        await prisma.candidate.create({ data: { ...c, tenantId: SYS_TENANT } })
    }

    for (const t of onboardingTasks) {
        await prisma.onboardingTask.create({ data: { ...t, tenantId: SYS_TENANT } })
    }

    for (const lr of leaveRequests) {
        await prisma.leaveRequest.create({ data: { ...lr, tenantId: SYS_TENANT } })
    }

    for (const lp of leavePolicies) {
        await prisma.leavePolicy.create({ data: { ...lp, tenantId: SYS_TENANT } })
    }

    for (const slr of studentLeaveRequests) {
        await prisma.studentLeaveRequest.create({ data: { ...slr, tenantId: SYS_TENANT } })
    }

    for (const b of books) {
        await prisma.book.create({ data: { ...b, tenantId: SYS_TENANT } })
    }

    for (const br of borrowRecords) {
        await prisma.borrowRecord.create({ data: { ...br, tenantId: SYS_TENANT } })
    }

    for (const brq of borrowRequests) {
        await prisma.borrowRequest.create({ data: { ...brq, tenantId: SYS_TENANT } })
    }

    for (const inv of invoices) {
        await prisma.invoice.create({ data: { ...inv, tenantId: SYS_TENANT } })
    }

    for (const pay of payments) {
        await prisma.payment.create({ data: { ...pay, tenantId: SYS_TENANT } })
    }

    for (const tx of transactions) {
        await prisma.transaction.create({ data: { ...tx, tenantId: SYS_TENANT } })
    }

    for (const fs of feeStructures) {
        await prisma.feeStructure.create({
            data: {
                tenantId: SYS_TENANT,
                structureId: fs.structureId,
                name: fs.name,
                items: fs.items as any,
            },
        })
    }

    for (const v of vehicles) {
        await prisma.vehicle.create({ data: { ...v, tenantId: SYS_TENANT } })
    }

    for (const d of drivers) {
        await prisma.driver.create({ data: { ...d, tenantId: SYS_TENANT } })
    }

    for (const r of routes) {
        await prisma.route.create({ data: { ...r, tenantId: SYS_TENANT } })
    }

    for (const invItem of inventoryItems) {
        await prisma.inventoryItem.create({ data: { ...invItem, tenantId: SYS_TENANT } })
    }

    for (const ven of vendors) {
        await prisma.vendor.create({ data: { ...ven, tenantId: SYS_TENANT } })
    }

    for (const po of purchaseOrders) {
        await prisma.purchaseOrder.create({
            data: {
                tenantId: SYS_TENANT,
                ...po,
                items: po.items as any,
            },
        })
    }

    for (const sub of subscriberLists) {
        await prisma.subscriberList.create({ data: { ...sub, tenantId: SYS_TENANT } })
    }

    for (const ach of achievements) {
        await prisma.achievement.create({ data: { ...ach, tenantId: SYS_TENANT } })
    }

    for (const d of disciplinaryRecords) {
        await prisma.disciplinaryRecord.create({ data: { ...d, tenantId: SYS_TENANT } })
    }

    for (const room of classrooms) {
        await prisma.classroom.create({ data: { ...room, tenantId: SYS_TENANT } })
    }

    for (const sub of subjects) {
        await prisma.subject.create({ data: { ...sub, tenantId: SYS_TENANT } })
    }

    for (const h of hostels) {
        await prisma.hostel.create({
            data: {
                tenantId: SYS_TENANT,
                hostelId: h.hostelId,
                name: h.name,
                hostelType: h.type,
                wardenId: h.wardenId,
                totalRooms: h.totalRooms,
                occupiedRooms: h.occupiedRooms,
            }
        })
    }

    for (const r of rooms) {
        await prisma.room.create({
            data: {
                tenantId: SYS_TENANT,
                roomId: r.roomId,
                hostelId: r.hostelId,
                roomNumber: r.roomNumber,
                roomType: r.type,
                status: r.status,
                studentId: r.studentId,
            }
        })
    }

    for (const a of assessments) {
        await prisma.assessment.create({ data: { ...a, tenantId: SYS_TENANT } })
    }

    for (const ar of assessmentResults) {
        await prisma.assessmentResult.create({ data: { ...ar, tenantId: SYS_TENANT } })
    }

    for (const as of attendanceSummaries) {
        await prisma.attendanceSummary.create({ data: { ...as, tenantId: SYS_TENANT } })
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
