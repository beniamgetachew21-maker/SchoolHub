import { getInventoryItems } from "@/lib/actions";
import { InventoryClient } from "./inventory-client";

export default async function InventoryManagementPage() {
    const items = await getInventoryItems();
    
    return <InventoryClient initialItems={items} />;
}
