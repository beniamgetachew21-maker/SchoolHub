
'use server';
/**
 * @fileOverview A Genkit flow to create a Stripe Payment Intent.
 *
 * - createPaymentIntent - Creates a payment intent for a given amount.
 */

import {ai} from '@/ai/genkit';
import {stripe} from '@/app/lib/stripe';
import { PaymentIntentInputSchema, PaymentIntentOutputSchema, type PaymentIntentInput, type PaymentIntentOutput } from '@/app/lib/data';


export async function createPaymentIntent(input: PaymentIntentInput): Promise<PaymentIntentOutput> {
    return createPaymentIntentFlow(input);
}


const createPaymentIntentFlow = ai.defineFlow(
  {
    name: 'createPaymentIntentFlow',
    inputSchema: PaymentIntentInputSchema,
    outputSchema: PaymentIntentOutputSchema,
  },
  async ({ amount, description, metadata }) => {
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      description: description,
      metadata: metadata,
    });

    if (!paymentIntent.client_secret) {
        throw new Error('Failed to create Payment Intent.');
    }

    return { clientSecret: paymentIntent.client_secret };
  }
);
