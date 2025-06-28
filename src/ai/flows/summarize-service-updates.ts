'use server';

/**
 * @fileOverview Summarizes service request updates for team members.
 *
 * - summarizeServiceUpdates - A function that summarizes updates for a given service request.
 * - SummarizeServiceUpdatesInput - The input type for the summarizeServiceUpdates function.
 * - SummarizeServiceUpdatesOutput - The return type for the summarizeServiceUpdates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeServiceUpdatesInputSchema = z.object({
  updates: z
    .string()
    .describe('The complete history of updates for a service request.'),
});

export type SummarizeServiceUpdatesInput = z.infer<
  typeof SummarizeServiceUpdatesInputSchema
>;

const SummarizeServiceUpdatesOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the service request updates, highlighting the current status and key information.'
    ),
});

export type SummarizeServiceUpdatesOutput = z.infer<
  typeof SummarizeServiceUpdatesOutputSchema
>;

export async function summarizeServiceUpdates(
  input: SummarizeServiceUpdatesInput
): Promise<SummarizeServiceUpdatesOutput> {
  return summarizeServiceUpdatesFlow(input);
}

const summarizeServiceUpdatesPrompt = ai.definePrompt({
  name: 'summarizeServiceUpdatesPrompt',
  input: {schema: SummarizeServiceUpdatesInputSchema},
  output: {schema: SummarizeServiceUpdatesOutputSchema},
  prompt: `You are an expert service request summarizer. Your goal is to provide team members with a quick understanding of the current status of a service request without reading through all past communications.\n\nSummarize the following updates, focusing on the current status, key decisions, and any outstanding actions:\n\nUpdates: {{{updates}}}`,
});

const summarizeServiceUpdatesFlow = ai.defineFlow(
  {
    name: 'summarizeServiceUpdatesFlow',
    inputSchema: SummarizeServiceUpdatesInputSchema,
    outputSchema: SummarizeServiceUpdatesOutputSchema,
  },
  async input => {
    const {output} = await summarizeServiceUpdatesPrompt(input);
    return output!;
  }
);
