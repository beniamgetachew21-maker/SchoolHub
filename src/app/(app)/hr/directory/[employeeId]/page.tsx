import { getEmployeeById, getLeaveRequests, getLeavePolicies, getAssetAllocations, getInventoryItems, getEmployees } from "@/lib/actions";
import { notFound } from "next/navigation";
import { EmployeeProfileClient } from "./employee-profile-client";
import { type Employee } from "@prisma/client";

export default async function EmployeeProfilePage({ params: paramsProp }: { params: Promise<{ employeeId: string }> }) {
    const { employeeId } = await paramsProp;
    const employee = await getEmployeeById(employeeId);

    if (!employee) {
        notFound();
    }

    const [leaveRequests, leavePolicies, assetAllocations, inventoryItems, allEmployees] = await Promise.all([
        getLeaveRequests(),
        getLeavePolicies(),
        getAssetAllocations(employeeId),
        getInventoryItems(),
        getEmployees()
    ]);

    const managers = (allEmployees.employees || []).map((e: Employee) => ({ employeeId: e.employeeId, name: e.name }));

    return (
        <EmployeeProfileClient
            employee={employee}
            leaveRequests={leaveRequests}
            leavePolicies={leavePolicies}
            assetAllocations={assetAllocations}
            inventoryItems={inventoryItems}
            managers={managers}
        />
    );
}
