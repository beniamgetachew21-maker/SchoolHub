
'use server';
/**
 * @fileOverview An AI flow to generate a job description.
 *
 * - generateJobDescription - A function that handles the job description generation process.
 */

import {ai} from '@/ai/genkit';
import { JobDescriptionInputSchema, JobDescriptionOutputSchema, type JobDescriptionInput, type JobDescriptionOutput } from '@/app/lib/data';


export async function generateJobDescription(input: JobDescriptionInput): Promise<JobDescriptionOutput> {
  return generateJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJobDescriptionPrompt',
  input: {schema: JobDescriptionInputSchema},
  output: {schema: JobDescriptionOutputSchema},
  prompt: `You are an expert HR manager specializing in recruitment for educational institutions. Generate a comprehensive and professional job description for the following position at {{{companyName}}}.

Job Title: {{{jobTitle}}}
{{#if gradeLevel}}
Grade Level: {{{gradeLevel}}}
{{/if}}

The job description should be well-structured and formatted using Markdown. It must include the following sections:
- **About Us:** A brief, engaging paragraph about {{{companyName}}}.
- **Position Overview:** A summary of the role.
- **Key Responsibilities:** A bulleted list of the main duties.
- **Qualifications:** A bulleted list of required skills, experience, and educational background.
- **What We Offer:** A short section on benefits, like professional development or a collaborative environment.

Ensure the tone is professional, welcoming, and appealing to high-quality candidates.`,
});

const generateJobDescriptionFlow = ai.defineFlow(
  {
    name: 'generateJobDescriptionFlow',
    inputSchema: JobDescriptionInputSchema,
    outputSchema: JobDescriptionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid response.");
    }
    return output;
  }
);
