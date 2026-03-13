import { hrService } from "@/services/hr-service";

async function test() {
    console.log("Testing getEmployeeById('E004')...");
    const result = await hrService.getEmployeeById('E004');
    console.log("Result:", JSON.stringify(result, null, 2));
}

test();
