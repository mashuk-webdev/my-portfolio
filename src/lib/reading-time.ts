const WORDS_PER_MINUTE = 220;

function stripHtml(input: string): string {
  return input
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function estimateReadingTimeMinutesFromHtml(html: string): number {
  if (!html) return 1;

  const text = stripHtml(html);
  const wordCount = text.length === 0 ? 0 : text.split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
