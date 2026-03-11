
'use server';
/**
 * @fileOverview An AI flow to generate a student ID card.
 *
 * - generateIdCard - A function that handles the ID card generation process.
 * - IdCardInput - The input type for the generation function.
 * - IdCardOutput - The return type for the generation function.
 */

import {ai} from '@/ai/genkit';
import { type IdCardInput, IdCardInputSchema, type IdCardOutput, IdCardOutputSchema } from '@/app/lib/data';


export async function generateIdCard(input: IdCardInput): Promise<IdCardOutput> {
    // This functionality has been replaced with a static template.
    // This file is no longer in use and can be safely deleted.
    throw new Error("AI ID Card generation is deprecated.");
}
