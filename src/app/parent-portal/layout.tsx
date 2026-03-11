
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parent Portal - Campus Hub",
  description: "View your child's progress and stay updated.",
};

export default function ParentPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold font-headline">Campus Hub</h1>
                    <p className="text-sm text-muted-foreground">Global Academy - Parent Portal</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5"/>
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://placehold.co/100x100.png?text=P" alt="@parent" data-ai-hint="female avatar" />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                </Button>
                 <Button variant="outline" size="sm" asChild>
                    <Link href="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Link>
                </Button>
            </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Global Academy. All rights reserved.
      </footer>
    </div>
  );
}
