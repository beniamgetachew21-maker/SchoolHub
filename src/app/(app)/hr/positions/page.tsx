
"use client"
import * as React from "react"
import { MoreHorizontal, PlusCircle, Sparkles, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCandidates } from "@/app/lib/data"
import { toast } from "@/hooks/use-toast"
import { JobDescriptionGeneratorSheet } from "@/components/job-description-generator"
import Link from "next/link"

const jobPositions = [
    { id: "POS01", title: "Physics Teacher", department: "Academics", status: "Open" },
    { id: "POS02", title: "Librarian", department: "Administration", status: "Open" },
    { id: "POS03", title: "IT Administrator", department: "Administration", status: "Closed" },
];


export default function PositionsPage() {
  const [isGeneratorOpen, setIsGeneratorOpen] = React.useState(false);
  const candidates = getCandidates();

  const getCandidateCount = (positionTitle: string) => {
    return candidates.filter(c => c.position === positionTitle).length;
  }

  const handleNotImplemented = () => {
    toast({
        title: "Feature Coming Soon",
        description: "This functionality is currently under development.",
    });
  }

  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Job Positions</CardTitle>
            <CardDescription>
              Manage open job positions and generate job descriptions.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsGeneratorOpen(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              New Position with AI
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Candidates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobPositions.map((pos) => (
              <TableRow key={pos.id}>
                <TableCell className="font-medium">{pos.title}</TableCell>
                <TableCell>{pos.department}</TableCell>
                <TableCell className="text-center">
                    <Badge variant="secondary">{getCandidateCount(pos.title)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={pos.status === 'Open' ? 'default' : 'outline'} className={pos.status === 'Open' ? "bg-green-100 text-green-800" : ""}>
                    {pos.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href="/hr/recruitment">View Candidates</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleNotImplemented}>Edit Position</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleNotImplemented}>
                        {pos.status === 'Open' ? 'Close Position' : 'Re-open Position'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <JobDescriptionGeneratorSheet 
        isOpen={isGeneratorOpen}
        onOpenChange={setIsGeneratorOpen}
    />
    </>
  )
}
