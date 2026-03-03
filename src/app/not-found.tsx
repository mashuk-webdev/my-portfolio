import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedDiv } from '@/components/shared/animated-div';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-screen text-center">
      <AnimatedDiv>
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">Page Not Found</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Go back home</Link>
        </Button>
      </AnimatedDiv>
    </div>
  );
}
