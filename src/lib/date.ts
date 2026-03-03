import { format } from 'date-fns';

export function formatDateForDisplay(input: string): string {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return input;

  return format(parsed, 'MMMM dd, yyyy');
}
