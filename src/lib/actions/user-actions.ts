"use server";

import { hrService } from "@/services/hr-service";
import { revalidatePath } from "next/cache";

export async function inviteStaffAction(formData: any, createAccount?: { roleId: string; password?: string }) {
    try {
        const result = await hrService.addEmployee(formData, createAccount);
        
        if (result.success) {
            revalidatePath("/hr/directory");
            return { success: true, employee: result.data };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getTenantRolesAction() {
    try {
        const result = await hrService.getRoles();
        return { success: true, roles: result.data || [] };
    } catch (error: any) {
        return { success: false, error: error.message, roles: [] };
    }
}
