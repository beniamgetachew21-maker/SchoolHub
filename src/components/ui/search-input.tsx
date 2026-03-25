"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { Search } from "lucide-react";

export function SearchInput({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
          params.set("q", query);
        } else {
          params.delete("q");
        }
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="relative w-full">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isPending ? 'text-blue-500 animate-pulse' : 'text-slate-400'}`} />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
      />
    </div>
  );
}
