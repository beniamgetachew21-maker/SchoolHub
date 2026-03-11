
"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getJobs, type JobPosting, addJob } from "@/app/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AddJobPostingForm } from "@/components/forms/add-job-posting-form"

export default function AlumniJobsPage() {
    const [jobs, setJobs] = React.useState(getJobs())
    const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);

    const refreshData = () => {
        setJobs(getJobs());
    };

    const handleAddJob = (data: Omit<JobPosting, 'jobId' | 'postedDate'>) => {
        addJob(data);
        refreshData();
        setIsAddSheetOpen(false);
    }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Jobs Portal</CardTitle>
                <CardDescription>
                Post and manage job opportunities for alumni.
                </CardDescription>
            </div>
             <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
                <SheetTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post Job
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Post New Job Opportunity</SheetTitle>
                        <SheetDescription>Fill in the details for the new job posting.</SheetDescription>
                    </SheetHeader>
                    <AddJobPostingForm onFormSubmit={handleAddJob} />
                </SheetContent>
            </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobs.map(job => (
                    <TableRow key={job.jobId}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="outline" size="sm" asChild>
                                <a href={job.applyLink} target="_blank" rel="noopener noreferrer">View & Apply</a>
                           </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
