
"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getMenuItems, getTodaysMealPlan, type MenuItem, addMenuItem } from "@/app/lib/data";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { AddMenuItemForm } from "@/components/forms/add-menu-item-form";

export default function CafeteriaPage() {
  const [menuItems, setMenuItems] = React.useState(getMenuItems());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const mealPlan = getTodaysMealPlan();

  const filteredMenuItems = React.useMemo(() => {
    if (!searchQuery) return menuItems;
    const query = searchQuery.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [menuItems, searchQuery]);

  const handleAddMenuItem = (data: Omit<MenuItem, 'itemId' | 'allergens'>) => {
    addMenuItem(data);
    setMenuItems(getMenuItems());
    setIsAddSheetOpen(false);
  };

  const getDietaryBadge = (item: MenuItem) => {
    if (item.isVegetarian) {
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Vegetarian</Badge>;
    }
    return null;
  }

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Breakfast</CardTitle>
            <CardDescription>7:30 AM - 9:00 AM</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {mealPlan.breakfast.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Lunch</CardTitle>
            <CardDescription>12:30 PM - 2:00 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {mealPlan.lunch.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Dinner</CardTitle>
            <CardDescription>7:30 PM - 9:00 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {mealPlan.dinner.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline">Full Menu</CardTitle>
              <CardDescription>
                Browse all available items in the cafeteria.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search menu items..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Menu Item
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Menu Item</SheetTitle>
                        <SheetDescription>Fill in the details for the new item.</SheetDescription>
                    </SheetHeader>
                    <AddMenuItemForm onFormSubmit={handleAddMenuItem} />
                  </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Dietary</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMenuItems.map((item) => (
                <TableRow key={item.itemId}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{getDietaryBadge(item)}</TableCell>
                  <TableCell className="text-right font-mono">
                    ${item.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
