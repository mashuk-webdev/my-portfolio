import sanitizeHtmlLibrary from 'sanitize-html';

const allowedTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'br',
  'hr',
  'strong',
  'em',
  'u',
  's',
  'blockquote',
  'ul',
  'ol',
  'li',
  'code',
  'pre',
  'a',
];

export function sanitizeHtml(input: string): string {
  if (!input) return '';

  return sanitizeHtmlLibrary(input, {
    allowedTags,
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
    transformTags: {
      a: sanitizeHtmlLibrary.simpleTransform('a', {
        rel: 'noopener noreferrer nofollow',
        target: '_blank',
      }),
    },
    disallowedTagsMode: 'discard',
  });
}
