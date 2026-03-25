import { prisma } from "@/lib/prisma";
import { BaseService } from "./base-service";

export class OnboardingService extends BaseService {
    /**
     * Automated Institution Setup
     * Creates basic academic structure based on institution type.
     */
    async setupInstitution(tenantId: string, config: {
        institutionType: string,
        language?: string,
        academicYearName: string,
        termStructure: "Semester" | "Trimester" | "Quarterly",
        gradingScale: string
    }) {
        return await prisma.$transaction(async (tx) => {
            // 1. Update Tenant Profile
            await (tx.tenant as any).update({
                where: { id: tenantId },
                data: {
                    institutionType: config.institutionType,
                    language: config.language || "English"
                }
            });

            // 2. Create Initial Academic Year
            const startDate = new Date();
            const endDate = new Date();
            endDate.setFullYear(startDate.getFullYear() + 1);

            const academicYear = await tx.academicYear.create({
                data: {
                    tenantId,
                    name: config.academicYearName,
                    startDate,
                    endDate,
                    status: "Current"
                }
            });

            // 3. Create Terms based on structure
            const termsToCreate = [];
            if (config.termStructure === "Semester") {
                termsToCreate.push({ name: "Semester 1", offset: 0 }, { name: "Semester 2", offset: 5 });
            } else if (config.termStructure === "Trimester") {
                termsToCreate.push({ name: "Term 1", offset: 0 }, { name: "Term 2", offset: 4 }, { name: "Term 3", offset: 8 });
            }

            for (const t of termsToCreate) {
                const termStart = new Date(startDate);
                termStart.setMonth(termStart.getMonth() + t.offset);
                const termEnd = new Date(termStart);
                termEnd.setMonth(termEnd.getMonth() + 3);

                await tx.academicTerm.create({
                    data: {
                        tenantId,
                        yearId: academicYear.id,
                        name: t.name,
                        startDate: termStart,
                        endDate: termEnd
                    }
                });
            }

            // 4. Provision Academic Levels (Grade Levels)
            const levels = this.getLevelsForType(config.institutionType);
            for (let i = 0; i < levels.length; i++) {
                await tx.academicLevel.create({
                    data: {
                        tenantId,
                        name: levels[i],
                        order: i + 1
                    }
                });
            }

            return { success: true, academicYearId: academicYear.id };
        });
    }

    private getLevelsForType(type: string): string[] {
        if (type === 'University') {
            return ['Freshman', 'Sophomore', 'Junior', 'Senior'];
        }
        if (type === 'High School') {
            return ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
        }
        // Default School Path
        return Array.from({ length: 8 }, (_, i) => `Grade ${i + 1}`);
    }
}

export const onboardingService = new OnboardingService();
