"use server";

import { prisma } from "@/lib/prisma";

// Legacy alias for the old setup page at (app)/onboarding/setup/page.tsx
export async function setupInstitutionAction(config: any) {
  try {
    const domain = (config.name || "school").toLowerCase().replace(/\s+/g, "-") + ".localhost";
    const tenant = await prisma.tenant.create({
      data: {
        name: config.name || "My School",
        domain,
        contactEmail: config.contactEmail || "admin@school.com",
        institutionType: config.institutionType,
        language: config.language,
      },
    });
    return { success: true, tenantId: tenant.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

import { redirect } from "next/navigation";

export async function completeOnboardingAction(data: any) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update or create Tenant (using domain-less create for now)
      const domain = data.school.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") + ".localhost";

      let tenant = await tx.tenant.findFirst({ where: { domain } });
      if (tenant) {
        throw new Error("A school with this name is already registered. Please choose a different name or contact support.");
      }

      tenant = await tx.tenant.create({
        data: {
          name: data.school.name,
          domain,
          contactEmail: data.school.contactEmail,
          contactPhone: data.school.contactPhone,
          address: data.school.address,
          institutionType: data.school.schoolType, // "Private" | "Public"
          language: data.school.language,
          // Custom mapping if you add these to the schema later
        },
      });

      // 2. Create Academic Year
      const academicYear = await tx.academicYear.create({
        data: {
          tenantId: tenant.id,
          name: data.academic.yearName,
          startDate: new Date(data.academic.startDate),
          endDate: new Date(data.academic.endDate),
          status: "Active",
        },
      });

      // 3. Create Terms
      for (const term of data.academic.terms) {
        if (term.name && term.startDate && term.endDate) {
          await tx.academicTerm.create({
            data: {
              tenantId: tenant.id,
              yearId: academicYear.id,
              name: term.name,
              startDate: new Date(term.startDate),
              endDate: new Date(term.endDate),
            },
          });
        }
      }

      // 4. Create Subjects as Courses
      for (let i = 0; i < data.subjects.length; i++) {
        const subj = data.subjects[i];
        const code = subj.substring(0, 3).toUpperCase() + (100 + i).toString();
        await tx.course.upsert({
          where: { code },
          update: { tenantId: tenant.id },
          create: {
            tenantId: tenant.id,
            name: subj,
            code,
          },
        });
      }

      // 5. Create Campuses  
      for (const branch of data.branches) {
        if (branch.name) {
          await tx.campus.create({
            data: {
              tenantId: tenant.id,
              name: branch.name,
              address: branch.address,
            },
          });
        }
      }

      // 6. Create Staff as Employees
      for (let i = 0; i < data.staff.length; i++) {
        const s = data.staff[i];
        if (s.name && s.email) {
          await tx.employee.create({
            data: {
              tenantId: tenant.id,
              employeeId: `EMP-${tenant.id.slice(0, 4)}-${Date.now()}-${i}`,
              employeeCode: `EC-${(1001 + i).toString()}`,
              name: s.name,
              email: s.email,
              department: s.department || "General",
              designation: s.role,
              dateOfJoining: new Date().toISOString().split("T")[0],
              status: "Active",
              gender: "Unknown",
              dob: "1990-01-01",
              avatarUrl: "",
              salary: 0,
            },
          });
        }
      }

      // 6b. Create Students
      for (let i = 0; i < data.students.length; i++) {
        const s = data.students[i];
        if (s.name && s.className) {
          await tx.student.create({
            data: {
              tenantId: tenant.id,
              studentId: `STU-${tenant.id.slice(0, 4)}-${Date.now()}-${i}`,
              admissionNumber: `ADM-${(5001 + i).toString()}`,
              firstName: s.name.split(" ")[0] || "Unknown",
              lastName: s.name.split(" ")[1] || "Unknown",
              dateOfBirth: "2010-01-01",
              gender: "Unknown",
              grade: s.className,
              enrollmentDate: new Date().toISOString(),
              status: "Active",
              photoUrl: "",
            },
          });
        }
      }

      // 7. Create Fee Structures (Per Grade Support)
      for (const fee of data.fees) {
        if (fee.name && fee.amount) {
          await tx.feeStructure.create({
            data: {
              tenantId: tenant.id,
              structureId: `FS-${tenant.id.slice(0, 4)}-${Date.now()}-${fee.name.replace(/\s+/g,'-')}`,
              name: fee.name, // e.g. "Grade 1 Tuition"
              baseAmount: Number(fee.amount),
              currency: "ETB",
            },
          });
        }
      }

      // 8. Create Admin User
      if (data.admin?.name && data.admin?.email) {
        // Find or create admin role
        let adminRole = await tx.role.findFirst({ where: { name: "System Admin", tenantId: tenant.id } });
        if (!adminRole) {
          adminRole = await tx.role.create({ data: { name: "System Admin", tenantId: tenant.id } });
        }
        
        // Very basic mock hashing for demo purposes; standard bcrypt should be used in prod
        const generateHash = (pw: string) => `mock_hash_${pw}`; 
        
        await tx.user.create({
          data: {
            tenantId: tenant.id,
            email: data.admin.email,
            passwordHash: generateHash(data.admin.password),
            roleId: adminRole.id,
          }
        });
      }

      return { tenant };
    });

    return { success: true, tenantId: result.tenant.id };
  } catch (error: any) {
    console.error("[onboarding] Error:", error);
    return { success: false, error: error.message };
  }
}
