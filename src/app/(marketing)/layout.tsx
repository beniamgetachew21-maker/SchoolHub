import { GraduationCap, LogIn, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/layout/language-switcher";
import { useTranslations } from "next-intl";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Marketing.Nav");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Utility Bar - Topmost */}
      <div className="bg-brand-dark text-white py-2 px-6 flex justify-between items-center text-xs font-medium border-b border-white/10">
        <div className="flex items-center gap-6">
          <Link href="/parents-students" className="hover:text-brand-orange transition-colors flex items-center gap-1">
            {t("parentsStudents")}
          </Link>
          <Link href="/support" className="hover:text-brand-orange transition-colors">
            Support
          </Link>
          <Link href="/community" className="hover:text-brand-orange transition-colors">
            Community
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="flex items-center gap-1 hover:text-brand-orange transition-colors">
            <LogIn className="h-3.5 w-3.5" /> {t("login")}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-brand-dark backdrop-blur-md shadow-lg py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-white p-1.5 rounded-lg shadow-md group-hover:scale-110 transition-transform">
              <GraduationCap className="h-7 w-7 text-brand-dark" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">EthioEdu</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1 text-white/90 font-semibold hover:text-white cursor-pointer group">
              {t("solutions")} <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
            </div>
            <div className="flex items-center gap-1 text-white/90 font-semibold hover:text-white cursor-pointer group">
              {t("impact")} <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
            </div>
            <Link href="/plans" className="text-white/90 font-semibold hover:text-white">
              {t("plans")}
            </Link>
            <div className="flex items-center gap-1 text-white/90 font-semibold hover:text-white cursor-pointer group">
              {t("resources")} <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/request-demo">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-6 shadow-lg transform hover:-translate-y-0.5 transition-all">
              {t("getDemo")}
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="border-white !bg-transparent text-white hover:bg-white/10 hover:text-white font-bold hidden md:inline-flex">
              {t("signup")}
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-10 w-10 text-brand-orange" />
              <span className="text-2xl font-bold">EthioEdu</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering educators, students, and parents with connected technology to advance the potential of every learner.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Our Solutions</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Student Information System</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Learning Management</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Unified Finance & HR</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Analytics & Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Stakeholders</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">For Districts</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">For Teachers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">For Parents</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">For Students</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Connect</h4>
            <Link href="/request-demo">
              <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 mb-6">
                GET A DEMO
              </Button>
            </Link>
            <div className="text-slate-400 text-sm">
              <p>123 Education Way</p>
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 EthioEdu. All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-widest font-bold">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Use</Link>
            <Link href="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
