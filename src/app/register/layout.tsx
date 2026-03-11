import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Registration - Campus Hub",
  description: "Register a new student at Global Academy.",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center gap-3 px-4 md:px-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold font-headline">Campus Hub</h1>
                <p className="text-sm text-muted-foreground">Global Academy</p>
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
