'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { runSeoEnhancement, type SeoToolFormState } from '@/app/tools/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, Sparkles } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        'Analyzing...'
      ) : (
        <>
          <Rocket className="mr-2 h-4 w-4" />
          Enhance SEO
        </>
      )}
    </Button>
  );
}

export function SeoToolForm() {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState<SeoToolFormState, FormData>(runSeoEnhancement, {
    message: '',
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'error' && !isPending) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, isPending]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Content Input</CardTitle>
          <CardDescription>Enter the content you want to optimize.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="pageContent">Page Content</Label>
              <Textarea
                id="pageContent"
                name="pageContent"
                placeholder="Paste your article, product description, or any web page content here..."
                rows={15}
                required
                disabled={isPending}
              />
              {state.errors?.pageContent && (
                <p className="text-sm text-destructive mt-1">{state.errors.pageContent[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="keywords">Target Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="e.g., Next.js development, portfolio website"
                required
                disabled={isPending}
              />
              {state.errors?.keywords && (
                <p className="text-sm text-destructive mt-1">{state.errors.keywords[0]}</p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary w-5 h-5" />
            AI-Powered Suggestions
          </CardTitle>
          <CardDescription>Recommendations will appear here after analysis.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : state.status === 'success' && state.suggestions ? (
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap animate-in fade-in">
              {state.suggestions}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Awaiting analysis...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
