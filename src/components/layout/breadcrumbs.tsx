
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-2">
            <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1 transition-colors">
                <Home className="h-4 w-4" />
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
                    <Link
                        href={item.href}
                        className={`hover:text-foreground transition-colors ${index === items.length - 1 ? "text-foreground font-medium pointer-events-none" : ""
                            }`}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    );
}
