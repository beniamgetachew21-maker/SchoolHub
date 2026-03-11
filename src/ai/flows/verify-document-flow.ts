
'use server';
/**
 * @fileOverview An AI flow to verify student registration documents.
 *
 * - verifyBirthCertificate - A function that handles the document verification process.
 */

import {ai} from '@/ai/genkit';
import { VerificationInputSchema, VerificationOutputSchema, type VerificationInput, type VerificationOutput } from '@/app/lib/data';


export async function verifyBirthCertificate(input: VerificationInput): Promise<VerificationOutput> {
    return await verifyBirthCertificateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyBirthCertificatePrompt',
  input: {schema: VerificationInputSchema},
  output: {schema: VerificationOutputSchema},
  prompt: `You are an expert document verification agent for a school. Your task is to analyze the provided image and determine if it is a birth certificate.

You must extract the full name and date of birth from the document.

Compare the extracted information with the student's submitted name and date of birth.

- The name should be a close match. Minor variations or missing middle names are acceptable.
- The date of birth must be an exact match. Convert the extracted date to YYYY-MM-DD format for comparison.

Based on your analysis, set the boolean flags 'isBirthCertificate', 'nameMatches', and 'dobMatches' in the output.

If the document is not a birth certificate or if the information does not match, provide a brief 'failureReason'.

Submitted Name: {{{name}}}
Submitted DOB: {{{dob}}}
Document Image: {{media url=photoDataUri}}`,
});

const verifyBirthCertificateFlow = ai.defineFlow(
  {
    name: 'verifyBirthCertificateFlow',
    inputSchema: VerificationInputSchema,
    outputSchema: VerificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid response.");
    }
    return output;
  }
);
