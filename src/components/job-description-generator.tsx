
"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, Sparkles, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  type JobDescriptionInput,
  type JobDescriptionOutput,
  JobDescriptionInputSchema,
} from "@/app/lib/data";
import { generateJobDescription } from "@/ai/flows/generate-job-description-flow";
import { toast } from "@/hooks/use-toast";

interface JobDescriptionGeneratorSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function JobDescriptionGeneratorSheet({ isOpen, onOpenChange }: JobDescriptionGeneratorSheetProps) {
  const [generationState, setGenerationState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [generatedDescription, setGeneratedDescription] = React.useState<JobDescriptionOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<JobDescriptionInput>({
    resolver: zodResolver(JobDescriptionInputSchema),
    defaultValues: {
      jobTitle: "",
      gradeLevel: "High School",
    },
  });

  const handleGenerateClick = async (data: JobDescriptionInput) => {
    setGenerationState("loading");
    setError(null);
    setGeneratedDescription(null);

    try {
      const result = await generateJobDescription(data);
      setGeneratedDescription(result);
      setGenerationState("success");
    } catch (e: any) {
      console.error("Job Description Generation failed", e);
      setError(e.message || "An unknown error occurred.");
      setGenerationState("error");
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: "Could not generate the job description. Please try again.",
      });
    }
  };
  
  const handleCopyToClipboard = () => {
    if (!generatedDescription?.jobDescription) return;
    
    navigator.clipboard.writeText(generatedDescription.jobDescription).then(() => {
        toast({ title: "Copied to Clipboard", description: "The job description has been copied." });
    }, (err) => {
        toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy the text."});
        console.error('Could not copy text: ', err);
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Job Description Generator
          </SheetTitle>
          <SheetDescription>
            Quickly draft professional job descriptions for open positions.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Position Details</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleGenerateClick)} className="space-y-6">
                    <FormField control={form.control} name="jobTitle" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl><Input placeholder="e.g. Mathematics Teacher" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                     <FormField control={form.control} name="gradeLevel" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grade Level (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select applicable grades" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="All Grades">All Grades</SelectItem>
                                    <SelectItem value="Primary School">Primary School</SelectItem>
                                    <SelectItem value="Middle School">Middle School</SelectItem>
                                    <SelectItem value="High School">High School</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                  
                  <Button type="submit" disabled={generationState === 'loading'} className="w-full">
                    {generationState === 'loading' ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="mr-2 h-4 w-4" />Generate Description</>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Generated Description</h3>
                     {generationState === "success" && (
                        <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                            <Copy className="mr-2 h-4 w-4" /> Copy
                        </Button>
                     )}
                </div>

                <div className="h-[450px] rounded-md border bg-muted/30">
                    {generationState === 'idle' && (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                             <Sparkles className="h-10 w-10 mb-4" />
                            <p>The generated job description will appear here.</p>
                        </div>
                    )}
                    {generationState === 'loading' && (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                            <p>AI is writing your job description...</p>
                        </div>
                    )}
                     {generationState === "error" && (
                        <div className="flex flex-col items-center justify-center h-full text-center text-destructive p-8">
                            <AlertTriangle className="h-12 w-12 mb-4" />
                            <p className="font-semibold">Generation Failed</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                     {generationState === "success" && generatedDescription && (
                         <ScrollArea className="h-full">
                            <Textarea 
                                className="h-full min-h-[450px] bg-background resize-none border-0"
                                value={generatedDescription.jobDescription}
                                readOnly
                            />
                        </ScrollArea>
                     )}
                </div>

            </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
