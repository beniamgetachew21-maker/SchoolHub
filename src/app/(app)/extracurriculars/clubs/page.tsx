
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getClubs, getEmployeeById, type Club, getEmployees, addClub } from "@/app/lib/data";
import { PlusCircle, Users, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { AddClubForm } from "@/components/forms/add-club-form";
import Link from "next/link";

export default function ClubsPage() {
  const [clubs, setClubs] = React.useState<Club[]>(getClubs());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const employees = getEmployees();


  const filteredClubs = React.useMemo(() => {
    if (!searchQuery) return clubs;
    const query = searchQuery.toLowerCase();
    return clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(query) ||
        club.description.toLowerCase().includes(query)
    );
  }, [clubs, searchQuery]);
  
  const handleNotImplemented = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This functionality is currently under development.",
    });
  }

  const handleAddClub = (data: Omit<Club, 'clubId' | 'memberCount' | 'imageUrl' | 'imageHint'>) => {
    addClub(data);
    setClubs(getClubs());
    setIsAddSheetOpen(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline">
                Clubs & Societies
              </CardTitle>
              <CardDescription>
                Manage all extracurricular student clubs and societies.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search clubs..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Club
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Create New Club</SheetTitle>
                        <SheetDescription>Fill in the details for the new club.</SheetDescription>
                    </SheetHeader>
                    <AddClubForm teachers={employees.filter(e => e.department === 'Academics')} onFormSubmit={handleAddClub} />
                  </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <ClubCard key={club.clubId} club={club} />
        ))}
      </div>
      
      {filteredClubs.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
            <p>No clubs found matching your search.</p>
        </div>
      )}
    </div>
  );
}

function ClubCard({ club }: { club: Club }) {
    const facultyAdvisor = getEmployeeById(club.facultyAdvisorId);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="relative aspect-video w-full mb-4">
                    <Image 
                        src={club.imageUrl} 
                        alt={club.name} 
                        fill={true}
                        objectFit="cover" 
                        className="rounded-lg"
                        data-ai-hint={club.imageHint}
                    />
                </div>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription className="line-clamp-2">{club.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{facultyAdvisor?.name || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{club.memberCount} Members</span>
                    </div>
                </div>
            </CardContent>
             <div className="p-6 pt-0">
                <Button variant="outline" className="w-full" asChild>
                    <Link href={`/extracurriculars/clubs/${club.clubId}`}>View Details</Link>
                </Button>
            </div>
        </Card>
    )
}
