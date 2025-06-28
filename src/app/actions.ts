'use server';

import { summarizeServiceUpdates } from '@/ai/flows/summarize-service-updates';

export async function getSummaryAction(updates: string): Promise<{ summary?: string; error?: string }> {
  try {
    if (!updates) {
      return { error: 'No updates provided to summarize.' };
    }
    const { summary } = await summarizeServiceUpdates({ updates });
    return { summary };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to generate summary: ${errorMessage}` };
  }
}
