import assert from 'node:assert/strict';
import test from 'node:test';
import * as sanitizeHtmlModule from './sanitize-html';

type SanitizeHtmlExport = {
  sanitizeHtml?: (input: string) => string;
  default?: {
    sanitizeHtml?: (input: string) => string;
  };
};

const resolvedModule = sanitizeHtmlModule as unknown as SanitizeHtmlExport;
const sanitizeHtml =
  resolvedModule.sanitizeHtml ?? resolvedModule.default?.sanitizeHtml;

if (!sanitizeHtml) {
  throw new Error('sanitizeHtml export is not available');
}

test('sanitizeHtml removes unsafe tags and attributes', () => {
  const dirty =
    '<p class="x">Hello <script>alert(1)</script><img src="https://example.com/x.jpg" onerror="alert(1)" /><a href="javascript:alert(1)">click</a></p>';

  const clean = sanitizeHtml(dirty);

  assert.equal(
    clean,
    '<p>Hello <a rel="noopener noreferrer nofollow" target="_blank">click</a></p>'
  );
});

test('sanitizeHtml keeps safe links and hardens anchor attributes', () => {
  const clean = sanitizeHtml('<a href="https://example.com">visit</a>');

  assert.equal(
    clean,
    '<a href="https://example.com" rel="noopener noreferrer nofollow" target="_blank">visit</a>'
  );
});
