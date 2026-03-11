
"use client";

import * as React from "react";
import {
  Archive,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Loader2,
  Wallet,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { verifyBirthCertificate } from "@/ai/flows/verify-document-flow";
import { type Application, getApplications, updateApplicationStatus, approveRegistration, type VerificationOutput, type Invoice, getInvoices, payInvoices } from "@/app/lib/data";
import { PaymentDialog } from "@/components/payment-dialog";


export default function PendingRegistrationsPage() {
  const [applications, setApplications] =
    React.useState<Application[]>([]);
  const [action, setAction] = React.useState<"approve" | "reject" | null>(null);
  const [selectedApplication, setSelectedApplication] =
    React.useState<Application | null>(null);

  React.useEffect(() => {
    setApplications(getApplications());
  }, []);

  const refreshData = () => {
    setApplications(getApplications());
  };

  const handleActionClick = (
    application: Application,
    actionType: "approve" | "reject"
  ) => {
    setSelectedApplication(application);
    setAction(actionType);
  };

  const handleConfirmAction = () => {
    if (!selectedApplication || !action) return;

    if (action === 'approve') {
        const result = approveRegistration(selectedApplication);
        if (result.status === 'pending_payment') {
            toast({
                title: `Application Approved`,
                description: `${selectedApplication.name}'s application has been approved. An invoice for the admission fee has been generated.`,
            });
        } else {
             toast({
                title: `Registration Complete`,
                description: `${selectedApplication.name} has been enrolled as a student.`,
            });
        }
    } else { // reject
        updateApplicationStatus(selectedApplication.id, "Rejected");
        toast({
            title: `Application Rejected`,
            description: `${selectedApplication.name}'s application for ${selectedApplication.class} has been rejected.`,
        });
    }

    refreshData();
    setSelectedApplication(null);
    setAction(null);
  };

  const pendingApplications = applications.filter(
    (app) => app.status === "Pending" || app.status === "Approved - Pending Payment"
  );
  const archivedApplications = applications.filter(
    (app) => app.status !== "Pending" && app.status !== "Approved - Pending Payment"
  );

  return (
    <div className="space-y-6">
       <TooltipProvider>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Pending Registrations
            </CardTitle>
            <CardDescription>
              Review and process new student applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationsTable
              applications={pendingApplications}
              onActionClick={handleActionClick}
              onRefresh={refreshData}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Archive className="h-5 w-5" />
              Archived Applications
            </CardTitle>
            <CardDescription>
              View applications that have already been processed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationsTable applications={archivedApplications} onRefresh={refreshData} />
          </CardContent>
        </Card>
      </TooltipProvider>

      <AlertDialog
        open={!!(selectedApplication && action)}
        onOpenChange={() => {
          setSelectedApplication(null);
          setAction(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to {action} the application for{" "}
              <strong>{selectedApplication?.name}</strong>.
              {action === 'approve' && selectedApplication?.status === 'Pending' && " This will generate an admission fee invoice."}
              {action === 'approve' && selectedApplication?.status !== 'Pending' && " This cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={
                action === "reject"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              Confirm {action === "approve" ? "Approval" : "Rejection"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ApplicationsTable({
  applications,
  onActionClick,
  onRefresh,
}: {
  applications: Application[];
  onActionClick?: (
    app: Application,
    action: "approve" | "reject"
  ) => void;
  onRefresh: () => void;
}) {
  const [openRow, setOpenRow] = React.useState<string | null>(null);

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "Approved - Pending Payment":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Pending Payment</Badge>;
      case "Approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Applicant Name</TableHead>
          <TableHead>Applying for</TableHead>
          <TableHead>Submission Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.length > 0 ? (
          applications.map((app) => (
              <React.Fragment key={app.id}>
                <TableRow className="cursor-pointer" onClick={() => setOpenRow(openRow === app.id ? null : app.id)}>
                    <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            {openRow === app.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            <span className="sr-only">Toggle details</span>
                        </Button>
                    </TableCell>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.class}</TableCell>
                    <TableCell>{app.date}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-right">
                        {app.status === "Pending" && onActionClick && (
                        <div className="space-x-2">
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onActionClick(app, "reject");
                            }}
                            >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                            </Button>
                            <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onActionClick(app, "approve");
                            }}
                            >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                            </Button>
                        </div>
                        )}
                    </TableCell>
                </TableRow>
                {openRow === app.id && (
                  <tr>
                      <td colSpan={6} className="p-0">
                          <ApplicationDetails app={app} onRefresh={onRefresh} />
                      </td>
                  </tr>
                )}
              </React.Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No applications to display.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function ApplicationDetails({ app, onRefresh }: { app: Application, onRefresh: () => void }) {
    const [invoices, setInvoices] = React.useState<Invoice[]>([]);
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (app.status === 'Approved - Pending Payment') {
            const allInvoices = getInvoices();
            const appInvoice = allInvoices.find(inv => inv.studentId === app.id && inv.description === "Admission Fee");
            setInvoices(appInvoice ? [appInvoice] : []);
        }
    }, [app]);

    const handleBankSlipUpload = () => {
        // This is a simulation. In a real app, you would open a file picker.
        // For now, we will just confirm the payment as if a slip was uploaded.
        if (invoices.length > 0) {
            payInvoices([invoices[0].invoiceId], app.name);
            approveRegistration(app); // Finalize registration
            toast({
                title: "Registration Complete",
                description: `${app.name} has been enrolled. Payment confirmed via bank slip.`,
            });
            onRefresh();
        }
    }

    const onPaymentSuccess = () => {
        approveRegistration(app); // Finalize registration
        onRefresh();
    };

    return (
        <div className="bg-muted/50 p-6">
           <h4 className="font-semibold text-lg mb-4">Application Details</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                <InfoItem label="Date of Birth" value={app.dob} />
                <InfoItem label="Gender" value={app.gender} />
                <InfoItem label="Applicant Email" value={app.email} />
                <InfoItem label="Applicant Phone" value={app.phone} />
                <InfoItem label="Parent's Name" value={app.parent} />
                <InfoItem label="Parent's Phone" value={app.parentPhone} />
                <InfoItem label="Address" value={app.address} className="lg:col-span-2" />
                 <div className="lg:col-span-3">
                    <h5 className="font-semibold mb-2 mt-2">Uploaded Documents</h5>
                    <div className="space-y-2">
                        <DocumentItem 
                            name={app.documents.birthCertificate} 
                            applicantName={app.name} 
                            applicantDob={app.dob}
                            docUrl={app.documents.birthCertificateUrl}
                        />
                        {app.documents.previousMarksheet && <DocumentItem name={app.documents.previousMarksheet} />}
                    </div>
                </div>

                {app.status === 'Approved - Pending Payment' && invoices.length > 0 && (
                     <div className="lg:col-span-3 mt-4">
                        <Card className="bg-background">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-primary" />
                                    Admission Fee Payment
                                </CardTitle>
                                <CardDescription>
                                    An invoice has been generated for the admission fee. Please complete the payment to finalize the registration.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 rounded-lg border bg-muted flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{invoices[0].description}</p>
                                        <p className="text-2xl font-bold font-headline">${invoices[0].amount.toFixed(2)}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button onClick={() => setIsPaymentDialogOpen(true)}>Pay Online Now</Button>
                                        <Button variant="outline" onClick={handleBankSlipUpload}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Bank Slip
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                         <PaymentDialog
                            isOpen={isPaymentDialogOpen}
                            onOpenChange={setIsPaymentDialogOpen}
                            invoices={invoices.map(inv => ({ id: inv.invoiceId, description: inv.description || 'Admission Fee', amount: inv.amount }))}
                            studentName={app.name}
                            onPaymentSuccess={onPaymentSuccess}
                        />
                     </div>
                )}
            </div>
        </div>
    );
}

function InfoItem({ label, value, className }: { label: string, value: string, className?: string }) {
    return (
        <div className={cn("text-sm", className)}>
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    )
}

function DocumentItem({ name, applicantName, applicantDob, docUrl }: { name: string, applicantName?: string, applicantDob?: string, docUrl?: string }) {
    const [verificationState, setVerificationState] = React.useState<"idle" | "loading" | "verified" | "mismatch" | "error">("idle");
    const [verificationResult, setVerificationResult] = React.useState<VerificationOutput | null>(null);

    React.useEffect(() => {
        const verify = async () => {
            if (verificationState !== "loading") return;

            if (docUrl && applicantName && applicantDob) {
                try {
                    const result = await verifyBirthCertificate({
                        photoDataUri: docUrl,
                        name: applicantName,
                        dob: applicantDob,
                    });
                    setVerificationResult(result);
                    if (!result.isBirthCertificate) {
                        setVerificationState("error");
                    } else if (result.nameMatches && result.dobMatches) {
                        setVerificationState("verified");
                    } else {
                        setVerificationState("mismatch");
                    }
                } catch(e) {
                    console.error("Verification failed:", e);
                    setVerificationResult({
                        isBirthCertificate: false,
                        nameMatches: false,
                        dobMatches: false,
                        failureReason: "An unexpected error occurred during AI verification."
                    });
                    setVerificationState("error");
                }
            }
        };
        verify();
    }, [verificationState, docUrl, applicantName, applicantDob]);


    const handleVerificationClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (docUrl && verificationState === "idle") {
            setVerificationState("loading");
        } else if (!docUrl) {
            toast({
                variant: "destructive",
                title: "Cannot Verify Document",
                description: "No document URL available for AI verification.",
            })
        }
    }
    
    const getStatusContent = () => {
        switch (verificationState) {
            case "loading":
                return { icon: <Loader2 className="h-4 w-4 animate-spin text-primary" />, text: "AI is verifying...", tooltip: "The AI is analyzing the document. This may take a moment." };
            case "verified":
                return { icon: <ShieldCheck className="h-4 w-4 text-green-600" />, text: "AI Verified", tooltip: "AI analysis confirmed that the document is a birth certificate and the name and DOB match the application." };
            case "mismatch":
                return { icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />, text: "AI Flagged Mismatch", tooltip: verificationResult?.failureReason || "AI analysis found a mismatch between the document and the application data." };
            case "error":
                return { icon: <XCircle className="h-4 w-4 text-destructive" />, text: "AI Verification Failed", tooltip: verificationResult?.failureReason || "AI could not verify the document. It might not be a valid birth certificate or the image is unclear." };
            default: // idle
                return { icon: <HelpCircle className="h-4 w-4 text-muted-foreground" />, text: "Click to verify with AI", tooltip: "Run AI analysis to verify this document and compare it to the application data." };
        }
    }
    
    const { icon, text, tooltip } = getStatusContent();

    return (
         <div className="flex items-center gap-4 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <a href={docUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                {name}
            </a>
             {applicantName && ( // Only show verification for birth certificate
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button 
                             className={cn(
                                "flex items-center gap-1 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
                                verificationState !== 'idle' && "cursor-default"
                              )}
                             onClick={handleVerificationClick}
                             disabled={verificationState !== 'idle'}
                        >
                           {icon}
                           <span className="text-xs">{text}</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="max-w-xs">{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
             )}
        </div>
    )
}
