'use server';

import { headers } from 'next/headers';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase-admin';
import {
  getClientIpFromHeaders,
  hashIdentifier,
  isSuspiciousSubmissionTiming,
} from '@/lib/contact-security';
import {
  evaluateUpstashFixedWindow,
  isUpstashRateLimitConfigured,
} from '@/lib/upstash-rate-limit';
import {
  getTurnstileConfigState,
  isTurnstileEnabled,
  verifyTurnstileToken,
} from '@/lib/turnstile';
import { contactFormSubmissionSchema } from '@/lib/validation/contact-form';

export type FormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
  reason?: 'fallback';
  fallbackMailto?: string;
  errors?: Record<string, string[] | undefined>;
};

const MIN_FILL_TIME_MS = 2500;
const FUTURE_TIMESTAMP_DRIFT_MS = 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS_BY_EMAIL = 3;
const RATE_LIMIT_MAX_SUBMISSIONS_BY_IP = 6;
const DEFAULT_CONTACT_EMAIL = 'mdmashuk042@gmail.com';
const DEFAULT_CONTACT_FROM_EMAIL = 'Portfolio Contact <onboarding@resend.dev>';
const CONTACT_RECEIVER_EMAIL =
  process.env.CONTACT_RECEIVER_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_CONTACT_FROM_EMAIL;
const RESEND_API_ENDPOINT = 'https://api.resend.com/emails';
const CONTACT_FALLBACK_MESSAGE = `Automatic form delivery is temporarily unavailable. Opening your email app with a draft to ${CONTACT_RECEIVER_EMAIL}.`;

type ContactEmailPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ResendEmailStatus = 'sent' | 'unconfigured' | 'failed';

function isAdminCredentialsLikelyAvailable(): boolean {
  const hasInlineServiceAccount = Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim()
  );
  const hasCredentialsPath = Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()
  );
  const isManagedGcpRuntime = Boolean(
    process.env.K_SERVICE?.trim() ||
      process.env.FUNCTION_TARGET?.trim() ||
      (process.env.NODE_ENV === 'production' &&
        process.env.GOOGLE_CLOUD_PROJECT?.trim())
  );

  return hasInlineServiceAccount || hasCredentialsPath || isManagedGcpRuntime;
}

const canUseFirestoreAdmin = Boolean(adminDb) && isAdminCredentialsLikelyAvailable();

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

function escapeHtml(value: unknown): string {
  const stringValue = String(value ?? '');
  return stringValue
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildFallbackMailto(params: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): string {
  const subject = `Portfolio enquiry from ${params.name}`;
  const body = [
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    `Phone: ${params.phone?.trim() ? params.phone.trim() : 'Not provided'}`,
    '',
    'Message:',
    params.message,
  ].join('\n');

  const receiver = encodeURIComponent(CONTACT_RECEIVER_EMAIL);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return `mailto:${receiver}?subject=${encodedSubject}&body=${encodedBody}`;
}

async function sendContactEmailWithResend(
  payload: ContactEmailPayload
): Promise<ResendEmailStatus> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return 'unconfigured';

  const senderName = escapeHtml(payload.name || 'Website Visitor');
  const senderEmail = escapeHtml(payload.email || 'Not provided');
  const senderPhone = escapeHtml(payload.phone || 'Not provided');
  const senderMessage = escapeHtml(payload.message || '');
  const subjectSenderName = payload.name.replace(/[\r\n]/g, ' ').trim() || 'Website Visitor';
  const replyTo =
    payload.email.replace(/[\r\n]/g, '').trim() || CONTACT_RECEIVER_EMAIL;

  const responseTextFallback = 'Failed to parse email provider response.';
  try {
    const response = await fetch(RESEND_API_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_RECEIVER_EMAIL],
        reply_to: replyTo,
        subject: `New Portfolio Message: ${subjectSenderName}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6C4CE5;">New Enquiry Received</h2>
            <p><strong>Name:</strong> ${senderName}</p>
            <p><strong>Email:</strong> ${senderEmail}</p>
            <p><strong>Phone:</strong> ${senderPhone}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${senderMessage}</p>
          </div>
        `,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== 'production') {
        const responseText = await response
          .text()
          .catch(() => responseTextFallback);
        console.error('Resend delivery failed:', response.status, responseText);
      }
      return 'failed';
    }

    return 'sent';
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Resend request error:', error);
    }
    return 'failed';
  }
}

function timestampToMillis(value: unknown): number | null {
  if (value instanceof Timestamp) {
    return value.toMillis();
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as { toDate: unknown }).toDate === 'function'
  ) {
    const date = (value as { toDate: () => Date }).toDate();
    return date.getTime();
  }

  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return '';
}

function isContactInfrastructureError(error: unknown): boolean {
  const normalized = getErrorMessage(error).toLowerCase();
  if (!normalized) return false;

  return [
    'unable to detect a project id',
    'could not load the default credentials',
    'missing or insufficient permissions',
    'permission_denied',
    'unauthenticated',
    'invalid_grant',
    'insufficient authentication scopes',
    'requested entity was not found',
  ].some((pattern) => normalized.includes(pattern));
}

async function countRecentSubmissionsByField(
  field: 'email' | 'ipHash',
  value: string
): Promise<number> {
  if (!adminDb || !canUseFirestoreAdmin) return 0;

  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  try {
    const countSnapshot = await adminDb
      .collection('enquiries')
      .where(field, '==', value)
      .where('createdAtMs', '>=', cutoff)
      .count()
      .get();

    const count = countSnapshot.data().count;
    if (typeof count === 'number') return count;
  } catch {
    try {
      // Backward-compatible fallback for older documents without createdAtMs.
      const snapshot = await adminDb.collection('enquiries').where(field, '==', value).get();
      let recentSubmissions = 0;

      for (const doc of snapshot.docs) {
        const createdAtMillis =
          timestampToMillis(doc.get('createdAtMs')) ??
          timestampToMillis(doc.get('createdAt'));

        if (createdAtMillis && createdAtMillis >= cutoff) {
          recentSubmissions += 1;
        }
      }

      return recentSubmissions;
    } catch {
      return 0;
    }
  }

  return 0;
}

async function hasTooManyRecentSubmissionsByEmail(email: string): Promise<boolean> {
  const recentSubmissions = await countRecentSubmissionsByField(
    'email',
    email.toLowerCase()
  );
  return recentSubmissions >= RATE_LIMIT_MAX_SUBMISSIONS_BY_EMAIL;
}

async function hasTooManyRecentSubmissionsByIp(ipHash: string): Promise<boolean> {
  const recentSubmissions = await countRecentSubmissionsByField('ipHash', ipHash);
  return recentSubmissions >= RATE_LIMIT_MAX_SUBMISSIONS_BY_IP;
}

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  void prevState;

  const asOptionalString = (value: FormDataEntryValue | null): string | undefined =>
    typeof value === 'string' ? value : undefined;

  const validatedFields = contactFormSubmissionSchema.safeParse({
    name: asOptionalString(formData.get('name')),
    email: asOptionalString(formData.get('email')),
    phone: asOptionalString(formData.get('phone')),
    message: asOptionalString(formData.get('message')),
    website: asOptionalString(formData.get('website')),
    formStartedAt: asOptionalString(formData.get('formStartedAt')),
    turnstileToken: asOptionalString(formData.get('cf-turnstile-response')),
  });

  if (!validatedFields.success) {
    const flattenedErrors = validatedFields.error.flatten().fieldErrors;
    const firstFieldError = Object.values(flattenedErrors)
      .flat()
      .find((error): error is string => Boolean(error));

    return {
      message: firstFieldError ?? 'Validation failed. Please check your input.',
      status: 'error',
      errors: flattenedErrors,
    };
  }

  const fallbackMailto = buildFallbackMailto({
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    phone: validatedFields.data.phone,
    message: validatedFields.data.message,
  });

  try {
    const { website, formStartedAt, turnstileToken, ...formValues } = validatedFields.data;

    // Honeypot: bots that fill hidden fields are silently accepted.
    if (website && website.trim().length > 0) {
      return {
        message: 'Message sent successfully! Thank you for reaching out.',
        status: 'success',
      };
    }

    // Very fast submission is likely automated.
    if (
      isSuspiciousSubmissionTiming({
        formStartedAt,
        minFillTimeMs: MIN_FILL_TIME_MS,
        maxFutureDriftMs: FUTURE_TIMESTAMP_DRIFT_MS,
      })
    ) {
      return {
        message: 'Please take a moment and try again.',
        status: 'error',
      };
    }

    const requestHeaders = await headers();
    const clientIp = getClientIpFromHeaders(requestHeaders);
    const clientIpHash = clientIp ? hashIdentifier(clientIp) : null;
    const normalizedEmail = formValues.email.trim().toLowerCase();
    const turnstileState = getTurnstileConfigState();

    if (turnstileState === 'misconfigured') {
      return {
        message:
          'Contact security is temporarily unavailable. Please try again later.',
        status: 'error',
      };
    }

    const turnstileValid = await verifyTurnstileToken({
      token: turnstileToken ?? null,
      remoteIp: clientIp,
    });

    if (isTurnstileEnabled() && !turnstileValid) {
      return {
        message: 'Captcha verification failed. Please try again.',
        status: 'error',
      };
    }

    const useUpstashRateLimit = isUpstashRateLimitConfigured();
    let useFirestoreFallback = !useUpstashRateLimit && canUseFirestoreAdmin;

    if (useUpstashRateLimit) {
      const emailRateKey = `contact:email:${hashIdentifier(normalizedEmail)}`;
      const emailRateStatus = await evaluateUpstashFixedWindow({
        key: emailRateKey,
        limit: RATE_LIMIT_MAX_SUBMISSIONS_BY_EMAIL,
        windowMs: RATE_LIMIT_WINDOW_MS,
      });

      if (emailRateStatus === 'blocked') {
        return {
          message: 'Too many recent submissions. Please try again later.',
          status: 'error',
        };
      }

      if (emailRateStatus === 'unavailable') {
        useFirestoreFallback = canUseFirestoreAdmin;
      }

      if (clientIpHash) {
        const ipRateKey = `contact:ip:${clientIpHash}`;
        const ipRateStatus = await evaluateUpstashFixedWindow({
          key: ipRateKey,
          limit: RATE_LIMIT_MAX_SUBMISSIONS_BY_IP,
          windowMs: RATE_LIMIT_WINDOW_MS,
        });

        if (ipRateStatus === 'blocked') {
          return {
            message: 'Too many recent submissions. Please try again later.',
            status: 'error',
          };
        }

        if (ipRateStatus === 'unavailable') {
          useFirestoreFallback = canUseFirestoreAdmin;
        }
      }
    }

    if (useFirestoreFallback) {
      if (await hasTooManyRecentSubmissionsByEmail(normalizedEmail)) {
        return {
          message: 'Too many recent submissions. Please try again later.',
          status: 'error',
        };
      }

      if (clientIpHash && (await hasTooManyRecentSubmissionsByIp(clientIpHash))) {
        return {
          message: 'Too many recent submissions. Please try again later.',
          status: 'error',
        };
      }
    }

    const cleanedPayload: ContactEmailPayload = {
      name: stripTags(formValues.name),
      email: normalizedEmail,
      phone: stripTags(formValues.phone || ''),
      message: stripTags(formValues.message),
    };

    const resendStatus = await sendContactEmailWithResend(cleanedPayload);
    if (resendStatus !== 'sent') {
      return {
        message: CONTACT_FALLBACK_MESSAGE,
        status: 'error',
        reason: 'fallback',
        fallbackMailto,
      };
    }

    if (adminDb && canUseFirestoreAdmin) {
      void adminDb
        .collection('enquiries')
        .add({
          ...cleanedPayload,
          ipHash: clientIpHash,
          deliveryProvider: 'resend',
          createdAtMs: Date.now(),
          createdAt: FieldValue.serverTimestamp(),
        })
        .catch((error) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Resend sent but Firestore logging failed:', error);
        }
        });
    }

    return {
      message: 'Message sent successfully! Thank you for reaching out.',
      status: 'success',
    };
  } catch (error) {
    if (isContactInfrastructureError(error)) {
      return {
        message: CONTACT_FALLBACK_MESSAGE,
        status: 'error',
        reason: 'fallback',
        fallbackMailto,
      };
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Error saving contact form submission:', error);
    }

    return {
      message: 'An unexpected error occurred. Please try again later.',
      status: 'error',
    };
  }
}
