'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Script from 'next/script';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { submitContactForm, type FormState } from '@/app/contact/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Loader2, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import {
  contactFormFieldsSchema,
  type ContactFormValues,
} from '@/lib/validation/contact-form';
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

function SuccessPulse({ visible }: { visible: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-12">
      <AnimatePresence>
        {visible && (
          <motion.div
            className="flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15">
              <motion.span
                className="absolute inset-0 rounded-full bg-emerald-500/20"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              />
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <motion.p
              className="text-sm font-medium"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.06, duration: shouldReduceMotion ? 0.01 : 0.28 }}
            >
              Message delivered successfully
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  const formStartedAtRef = useRef<number>(Date.now());
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showSuccessPulse, setShowSuccessPulse] = useState(false);
  const [state, formAction] = useActionState<FormState, FormData>(submitContactForm, {
    message: '',
    status: 'idle',
  });
  
  const { register, reset, formState: { errors: clientErrors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormFieldsSchema),
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Success!',
        description: state.message,
      });
      reset();
      setShowSuccessPulse(true);

      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }

      successTimerRef.current = setTimeout(() => {
        setShowSuccessPulse(false);
      }, 2200);
    } else if (state.status === 'error') {
      const isFallbackError = state.reason === 'fallback';
      toast({
        title: isFallbackError ? 'Setup Required' : 'Error',
        description: state.message,
        variant: isFallbackError ? undefined : 'destructive',
      });

      if (isFallbackError && state.fallbackMailto && typeof window !== 'undefined') {
        window.location.href = state.fallbackMailto;
      }

      setShowSuccessPulse(false);
    }
  }, [state, toast, reset]);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const serverErrors = state.errors;

  return (
    <Card className="w-full max-w-lg border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <form action={formAction} className="space-y-6">
          {turnstileSiteKey && (
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              async
              defer
              strategy="afterInteractive"
            />
          )}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <input type="hidden" name="formStartedAt" value={String(formStartedAtRef.current)} />
          <div>
            <h4 className="text-xl font-semibold tracking-tight">Project Brief Form</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Please include scope, timeline, and the outcome you expect.
            </p>
          </div>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                maxLength={100}
                minLength={2}
                required
                {...register('name')}
                placeholder="Your full name"
                className="pl-10"
                aria-invalid={Boolean(clientErrors.name || serverErrors?.name)}
              />
            </div>
            {(clientErrors.name || serverErrors?.name) && <p className="text-sm text-destructive mt-1">{clientErrors.name?.message || serverErrors?.name?.[0]}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                maxLength={254}
                required
                {...register('email')}
                placeholder="name@company.com"
                className="pl-10"
                aria-invalid={Boolean(clientErrors.email || serverErrors?.email)}
              />
            </div>
            {(clientErrors.email || serverErrors?.email) && <p className="text-sm text-destructive mt-1">{clientErrors.email?.message || serverErrors?.email?.[0]}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Phone (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                maxLength={30}
                inputMode="tel"
                {...register('phone')}
                placeholder="+91 98xxxxxx"
                className="pl-10"
                aria-invalid={Boolean(clientErrors.phone || serverErrors?.phone)}
              />
            </div>
            {(clientErrors.phone || serverErrors?.phone) && <p className="text-sm text-destructive mt-1">{clientErrors.phone?.message || serverErrors?.phone?.[0]}</p>}
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Project Details
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Textarea
                id="message"
                maxLength={2000}
                minLength={10}
                required
                {...register('message')}
                placeholder="What are you building? Share goals, timeline, current website, and what success looks like."
                rows={5}
                className="pl-10"
                aria-describedby="message-help"
                aria-invalid={Boolean(clientErrors.message || serverErrors?.message)}
              />
            </div>
            <p id="message-help" className="mt-1 text-xs text-muted-foreground">
              Tip: A clear brief helps me respond with a practical plan in one message.
            </p>
            {(clientErrors.message || serverErrors?.message) && <p className="text-sm text-destructive mt-1">{clientErrors.message?.message || serverErrors?.message?.[0]}</p>}
          </div>
          {turnstileSiteKey && (
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-theme="auto"
            />
          )}
          <SubmitButton />
          <SuccessPulse visible={showSuccessPulse} />
        </form>
      </CardContent>
    </Card>
  );
}
