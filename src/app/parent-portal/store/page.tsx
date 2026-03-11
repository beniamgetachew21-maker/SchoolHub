
"use client";
import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import { getInventoryItems, type InventoryItem } from "@/app/lib/data";
import { PaymentDialog } from "@/components/payment-dialog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function SchoolStorePage() {
  const [storeItems, setStoreItems] = React.useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<InventoryItem | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const allItems = getInventoryItems();
    // Only show items that are explicitly marked for sale
    const customerFacingItems = allItems.filter(item => item.isForSale);
    setStoreItems(customerFacingItems);
  }, []);

  const handleBuyNow = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsPaymentDialogOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // In a real app, you would update inventory count here after successful payment via webhook.
    // For this demo, we'll just show a success message.
    setIsPaymentDialogOpen(false);
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/parent-portal">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            School Store
          </h1>
          <p className="text-muted-foreground">Purchase uniforms, stationery, and other school supplies.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {storeItems.length > 0 ? (
          storeItems.map((item) => (
            <Card key={item.itemId} className="flex flex-col">
              <CardHeader className="p-0">
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.imageUrl || "https://placehold.co/400x400"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={item.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="font-bold text-lg font-headline">
                  ${item.purchasePrice?.toFixed(2) || '0.00'}
                </p>
                {item.quantity > 0 ? (
                    <Button onClick={() => handleBuyNow(item)}>Buy Now</Button>
                ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground mt-4">The school store is currently empty.</p>
            </div>
        )}
      </div>

       {selectedItem && (
            <PaymentDialog
                isOpen={isPaymentDialogOpen}
                onOpenChange={setIsPaymentDialogOpen}
                invoices={[{ id: selectedItem.itemId, description: `Purchase of ${selectedItem.name}`, amount: selectedItem.purchasePrice || 0 }]}
                onPaymentSuccess={handlePaymentSuccess}
            />
       )}
    </>
  );
}
