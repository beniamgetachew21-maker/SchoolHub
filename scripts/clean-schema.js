const fs = require('fs');
let lines = fs.readFileSync('prisma/schema.prisma', 'utf8').split(/\r?\n/);

let newLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Stop entirely when hitting the injected models
    if (line.includes('// --- 0. SAAS CORE: MULTI-TENANCY ---') || line.includes('// --- 1. CORE SYSTEM ADDITIONS ---')) {
        break;
    }

    // Skip tenant lines
    if (line.includes('tenantId String?') ||
        line.includes('tenant   Tenant?') ||
        line.includes('// Inverse Relations for Data Isolation')) {
        continue;
    }

    const trimmed = line.trim();
    // Skip duplicate relations that we know are injected by build-schema.js
    if (trimmed === 'notifications Notification[]' ||
        trimmed === 'auditLogs     AuditLog[]' ||
        trimmed === 'studentGuardians     StudentGuardian[]' ||
        trimmed === 'studentContact       StudentContact?' ||
        trimmed === 'documents            StudentDocument[]' ||
        trimmed === 'statusHistory        StudentStatusHistory[]' ||
        trimmed === 'healthRecords        StudentHealthRecord[]' ||
        trimmed === 'quizAttempts         QuizAttempt[]' ||
        trimmed === 'documents            ApplicationDocument[]' ||
        trimmed === 'decision             AdmissionDecision?' ||
        trimmed === 'offer                AdmissionOffer?' ||
        trimmed === 'waitlistEntry        Waitlist?' ||
        line.includes('@relation("CoursePrereqs")') ||
        line.includes('@relation("PrereqFor")') ||
        trimmed === 'offerings        CourseOffering[]' ||
        trimmed === 'forums           DiscussionForum[]' ||
        trimmed === 'courseOfferings CourseOffering[]' ||
        trimmed === 'quizzes Quiz[]') {
        continue;
    }

    newLines.push(line);
}

fs.writeFileSync('prisma/schema.prisma', newLines.join('\n'));
console.log('Cleaned schema file successfully.');
