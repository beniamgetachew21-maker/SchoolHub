'use server';
/**
 * @fileOverview An AI flow to generate a student assessment.
 *
 * - generateAssessment - A function that handles the assessment generation process.
 * - AssessmentInput - The input type for the generation function.
 * - AssessmentOutput - The return type for the generation function.
 */

import {ai} from '@/ai/genkit';
import { AssessmentInputSchema, AssessmentOutputSchema, type AssessmentInput, type AssessmentOutput } from '@/app/lib/data';


export async function generateAssessment(input: AssessmentInput): Promise<AssessmentOutput> {
  return generateAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAssessmentPrompt',
  input: {schema: AssessmentInputSchema},
  output: {schema: AssessmentOutputSchema},
  prompt: `You are an expert educator and exam creator. Generate a multiple-choice quiz based on the following criteria.

Subject: {{{subject}}}
Topic: {{{topic}}}
Number of Questions: {{{numQuestions}}}
Grade Level: {{{gradeLevel}}}

For each question, provide 4 distinct options and clearly indicate the correct answer. Ensure the questions are appropriate for the specified grade level and accurately test knowledge on the given topic.`,
});

const generateAssessmentFlow = ai.defineFlow(
  {
    name: 'generateAssessmentFlow',
    inputSchema: AssessmentInputSchema,
    outputSchema: AssessmentOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid response.");
    }
    return output;
  }
);
