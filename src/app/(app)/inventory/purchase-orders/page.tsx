import { getPurchaseOrders } from "@/lib/actions";
import { PurchaseOrdersClient } from "./purchase-orders-client";

export default async function PurchaseOrdersPage() {
    const pos = await getPurchaseOrders();
    
    return <PurchaseOrdersClient initialPOs={pos} />;
}
