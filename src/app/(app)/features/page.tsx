
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BarChart2, Edit, LayoutGrid, MessageSquare, BookOpen, Users, DollarSign, Briefcase, Library, Package, Bus, Bed, HeartPulse, Megaphone, Sparkles, HeartHandshake, Activity, CreditCard } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Student Information System",
        description: "Centralized student profiles, admissions, records, and disciplinary tracking.",
    },
    {
        icon: BookOpen,
        title: "Academics Management",
        description: "Manage gradebooks, attendance, examinations, timetables, and class subjects.",
    },
     {
        icon: DollarSign,
        title: "Finance & Payroll",
        description: "Handle fee collection, invoicing, expense tracking, and automated payroll generation.",
    },
    {
        icon: Briefcase,
        title: "HR Management",
        description: "Full employee lifecycle management from recruitment and onboarding to leave.",
    },
    {
        icon: Library,
        title: "Library Management",
        description: "Digital book catalog with streamlined borrowing, returns, and request management.",
    },
    {
        icon: Package,
        title: "Inventory & Procurement",
        description: "Track all school assets, manage vendors, and process purchase orders.",
    },
     {
        icon: Bus,
        title: "Transport & Hostel",
        description: "Oversee transport routes, vehicles, drivers, and manage hostel room allocations.",
    },
    {
        icon: Megaphone,
        title: "Communication Suite",
        description: "Engage your community with announcements, newsletters, and targeted subscriber lists.",
    },
    {
        icon: LayoutGrid,
        title: "User Portals",
        description: "Dedicated dashboards for Parents, Students, and Teachers to access relevant information.",
    },
    {
        icon: HeartPulse,
        title: "Health & Wellness",
        description: "Track student medical records and log all visits to the school infirmary.",
    },
    {
        icon: Sparkles,
        title: "AI-Powered Tools",
        description: "Leverage AI to automatically generate assessments, job descriptions, and verify documents.",
    },
    {
        icon: Activity,
        title: "Extracurricular Activities",
        description: "Manage student clubs, events, and track achievements outside the classroom.",
    },
    {
        icon: HeartHandshake,
        title: "Alumni & Community",
        description: "Keep graduates connected with a dedicated alumni directory, job board, and events page.",
    },
     {
        icon: CreditCard,
        title: "ID Card Generation",
        description: "Design and print official ID cards for students, staff, and visitors on-demand.",
    },
    {
        icon: Edit,
        title: "Customizable UI",
        description: "Tailor the interface to fit your institution's branding and workflow needs with a flexible theme.",
    },
];

export default function FeaturesPage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline">Application Features</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    A comprehensive suite of tools to manage and enhance every facet of your educational institution.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4 pb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
