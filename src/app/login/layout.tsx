import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login – EthioEdu",
  description: "Administrator login for EthioEdu EMS.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full-screen background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand-hero.png"
          alt="EthioEdu campus background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/70 to-[#0c1a0a]/90" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-5 px-8 flex items-center gap-3">
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Campus Hub</h1>
          <p className="text-xs text-white/80 font-medium">Global Academy</p>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 text-center text-sm font-medium text-white">
        © 2026 Global Academy. All rights reserved.
      </footer>
    </div>
  );
}
