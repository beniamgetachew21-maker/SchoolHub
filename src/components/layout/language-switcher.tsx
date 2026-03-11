"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";
import { useTransition } from "react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleLanguageChange = (newLocale: string) => {
        startTransition(() => {
            // Set the NEXT_LOCALE cookie so middleware can pick it up
            document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
            router.refresh();
        });
    };

    const languages = [
        { code: "en", label: "English", native: "English" },
        { code: "am", label: "Amharic", native: "አማርኛ" },
        { code: "om", label: "Afaan Oromo", native: "Afaan Oromo" },
    ];

    const currentLanguage = languages.find((l) => l.code === locale) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 hover:text-red-400 transition-colors focus:outline-none outline-none">
                <Globe className={`h-4 w-4 ${isPending ? "animate-spin text-red-500" : ""}`} />
                <span className="font-bold uppercase tracking-wider">{currentLanguage.code}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-[#003366] border-white/10 text-white rounded-xl shadow-2xl">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        className={`flex flex-col items-start gap-0.5 p-3 focus:bg-white/10 cursor-pointer ${locale === lang.code ? "bg-white/10" : ""
                            }`}
                        onClick={() => handleLanguageChange(lang.code)}
                    >
                        <span className="font-bold text-xs">{lang.label}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{lang.native}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
