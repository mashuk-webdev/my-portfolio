'use server';
import 'server-only';

/**
 * @fileOverview An SEO enhancement tool that analyzes portfolio content and suggests improvements for SEO optimization.
 *
 * - seoEnhancementTool - A function that handles the SEO enhancement process.
 * - SEOEnhancementToolInput - The input type for the seoEnhancementTool function.
 * - SEOEnhancementToolOutput - The return type for the seoEnhancementTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SEOEnhancementToolInputSchema = z.object({
  pageContent: z
    .string()
    .describe('The content of the portfolio page to be analyzed.'),
  keywords: z.string().describe('The target keywords for SEO optimization.'),
});
export type SEOEnhancementToolInput = z.infer<typeof SEOEnhancementToolInputSchema>;

const SEOEnhancementToolOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of suggestions for improving the SEO of the portfolio content.'
    ),
});
export type SEOEnhancementToolOutput = z.infer<typeof SEOEnhancementToolOutputSchema>;

export async function seoEnhancementTool(input: SEOEnhancementToolInput): Promise<SEOEnhancementToolOutput> {
  return seoEnhancementToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoEnhancementToolPrompt',
  input: {schema: SEOEnhancementToolInputSchema},
  output: {schema: SEOEnhancementToolOutputSchema},
  prompt: `You are an SEO expert specializing in optimizing website content for search engines.

  Analyze the following portfolio page content and provide suggestions for improvement, targeting the specified keywords.

  Content: {{{pageContent}}}
  Keywords: {{{keywords}}}

  Suggestions:`,
});

const seoEnhancementToolFlow = ai.defineFlow(
  {
    name: 'seoEnhancementToolFlow',
    inputSchema: SEOEnhancementToolInputSchema,
    outputSchema: SEOEnhancementToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
