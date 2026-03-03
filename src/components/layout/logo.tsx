import Link from 'next/link';
import { Code2 } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
        <Code2 className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="font-bold text-lg tracking-tight">Mashuk</span>
    </Link>
  );
}
