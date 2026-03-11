
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
import { Loader2, AlertTriangle, Sparkles, CheckCircle, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  type AssessmentInput,
  type AssessmentOutput,
  AssessmentInputSchema,
} from "@/app/lib/data";
import { generateAssessment } from "@/ai/flows/generate-assessment-flow";
import { toast } from "@/hooks/use-toast";

interface AssessmentGeneratorSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AssessmentGeneratorSheet({ isOpen, onOpenChange }: AssessmentGeneratorSheetProps) {
  const [generationState, setGenerationState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [generatedQuiz, setGeneratedQuiz] = React.useState<AssessmentOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<AssessmentInput>({
    resolver: zodResolver(AssessmentInputSchema),
    defaultValues: {
      subject: "",
      topic: "",
      numQuestions: 5,
      gradeLevel: "Grade 10",
    },
  });

  const handleGenerateClick = async (data: AssessmentInput) => {
    setGenerationState("loading");
    setError(null);
    setGeneratedQuiz(null);

    try {
      const result = await generateAssessment(data);
      setGeneratedQuiz(result);
      setGenerationState("success");
    } catch (e: any) {
      console.error("Assessment Generation failed", e);
      setError(e.message || "An unknown error occurred.");
      setGenerationState("error");
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: "Could not generate the assessment. Please try again.",
      });
    }
  };
  
  const handleCopyToClipboard = () => {
    if (!generatedQuiz) return;
    
    const textToCopy = generatedQuiz.questions.map((q, i) => {
        const options = q.options.map((opt, j) => `${String.fromCharCode(97 + j)}) ${opt}`).join('\n');
        return `Question ${i + 1}: ${q.question}\n${options}\nCorrect Answer: ${q.correctAnswer}\n`;
    }).join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
        toast({ title: "Copied to Clipboard", description: "The generated quiz has been copied." });
    }, (err) => {
        toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy the quiz to your clipboard."});
        console.error('Could not copy text: ', err);
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Assessment Generator
          </SheetTitle>
          <SheetDescription>
            Create a quiz or test in seconds. Just provide a topic and let AI do the rest.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateClick)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl><Input placeholder="e.g. Science" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="topic" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl><Input placeholder="e.g. Photosynthesis" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="numQuestions" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl><Input type="number" min={1} max={20} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="gradeLevel" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Grade Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a grade" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Grade 5">Grade 5</SelectItem>
                                <SelectItem value="Grade 8">Grade 8</SelectItem>
                                <SelectItem value="Grade 10">Grade 10</SelectItem>
                                <SelectItem value="Grade 12">Grade 12</SelectItem>
                                <SelectItem value="University Level">University Level</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>
              <Button type="submit" disabled={generationState === 'loading'} className="w-full">
                {generationState === 'loading' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  'Generate Assessment'
                )}
              </Button>
            </form>
          </Form>

          {generationState === "error" && (
            <Alert variant="destructive" className="mt-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Generation Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {generationState === "success" && generatedQuiz && (
            <div className="mt-8">
                <Separator />
                <div className="flex justify-between items-center my-4">
                    <h3 className="text-lg font-semibold">Generated Quiz</h3>
                    <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                        <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                    </Button>
                </div>
                <ScrollArea className="h-96 rounded-md border p-4">
                    <div className="space-y-6">
                        {generatedQuiz.questions.map((q, index) => (
                            <div key={index}>
                                <p className="font-semibold">{index + 1}. {q.question}</p>
                                <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                                    {q.options.map((option, i) => (
                                        <li key={i} className={option === q.correctAnswer ? "text-green-600 font-medium" : ""}>
                                           {option}
                                           {option === q.correctAnswer && <CheckCircle className="inline-block ml-2 h-4 w-4" />}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
          )}
           
           {generationState === 'loading' && (
                <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center h-64 border-2 border-dashed rounded-lg">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">AI is crafting your assessment... <br/>This may take a moment.</p>
                </div>
           )}
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
