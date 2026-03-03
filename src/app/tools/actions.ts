'use server';

import { z } from 'zod';
import { seoEnhancementTool } from '@/ai/flows/seo-enhancement-tool';

const seoToolSchema = z.object({
  pageContent: z.string().min(50, { message: 'Content must be at least 50 characters.' }),
  keywords: z.string().min(3, { message: 'Please provide at least one keyword.' }),
});

export type SeoToolFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
  suggestions?: string;
  errors?: Record<string, string[] | undefined>;
};

export async function runSeoEnhancement(
  prevState: SeoToolFormState,
  formData: FormData
): Promise<SeoToolFormState> {
  const validatedFields = seoToolSchema.safeParse({
    pageContent: formData.get('pageContent'),
    keywords: formData.get('keywords'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await seoEnhancementTool(validatedFields.data);
    return {
      message: 'Analysis complete!',
      status: 'success',
      suggestions: result.suggestions,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error running SEO enhancement tool:', error);
    }

    return {
      message: 'An AI-related error occurred. Please try again later.',
      status: 'error',
    };
  }
}
