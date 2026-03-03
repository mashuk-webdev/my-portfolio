import { z } from 'zod';

const phoneRegex = /^[0-9+\s\-()]*$/;

export const contactFormFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must be at most 100 characters.' }),
  email: z
    .string()
    .trim()
    .max(254, { message: 'Email must be at most 254 characters.' })
    .email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .trim()
    .max(30, { message: 'Phone must be at most 30 characters.' })
    .regex(phoneRegex, {
      message: 'Phone number contains invalid characters.',
    })
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(2000, { message: 'Message must be at most 2000 characters.' }),
});

export const contactFormSubmissionSchema = contactFormFieldsSchema.extend({
  website: z.string().trim().max(200).optional(),
  formStartedAt: z.coerce.number().int().positive().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormFieldsSchema>;
