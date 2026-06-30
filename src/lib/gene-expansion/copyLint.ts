/**
 * Copy lint for build_inquiry pages — spec §8.
 */

export interface CopyLintInput {
  title: string;
  h1: string;
  headings: string[];
  bodyParagraphs: string[];
}

export interface CopyLintResult {
  pass: boolean;
  errors: string[];
}

const PROHIBITED_TERMS = [
  'cutting edge',
  'state of the art',
  'best',
  'leading',
  'validated',
  'purchase today',
  'innovative',
  'novel',
  'breakthrough',
  'revolutionary',
];

const HYPHEN_IN_PROSE = /(?<![/\w])[\w]+-[\w]+(?![/\w])/;

function checkBannedCustom(text: string, field: string, errors: string[]) {
  if (/\bcustom\b/i.test(text)) {
    errors.push(`${field}: contains banned word "custom"`);
  }
  if (/custom models/i.test(text)) {
    errors.push(`${field}: framed as Custom Models`);
  }
}

function checkProhibited(text: string, field: string, errors: string[]) {
  const lower = text.toLowerCase();
  for (const term of PROHIBITED_TERMS) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`, 'i');
    if (re.test(lower)) {
      errors.push(`${field}: prohibited term "${term}"`);
    }
  }
}

/** Prose hyphens: allow URLs, slugs in paths, gene symbols with hyphens rare — flag word-word patterns. */
function checkProseHyphens(text: string, field: string, errors: string[]) {
  if (text.includes('http') || text.includes('/all-catalog')) return;
  const matches = text.match(/\b[a-z]+-[a-z]+\b/gi);
  if (matches?.length) {
    errors.push(`${field}: hyphen in prose (${matches.slice(0, 3).join(', ')})`);
  }
}

export function lintBuildInquiryCopy(input: CopyLintInput): CopyLintResult {
  const errors: string[] = [];

  checkBannedCustom(input.title, 'title', errors);
  checkBannedCustom(input.h1, 'h1', errors);

  for (const h of input.headings) {
    checkBannedCustom(h, 'heading', errors);
    checkProhibited(h, 'heading', errors);
    checkProseHyphens(h, 'heading', errors);
  }

  for (const p of input.bodyParagraphs) {
    checkProhibited(p, 'body', errors);
    checkProseHyphens(p, 'body', errors);
  }

  checkProhibited(input.title, 'title', errors);

  if (!input.title.toLowerCase().includes('ingenious targeting laboratory')) {
    errors.push('title: must include full brand name ingenious targeting laboratory');
  }

  if (/\bITL\b/.test(input.title)) {
    errors.push('title: must not contain ITL');
  }

  return { pass: errors.length === 0, errors };
}

export function shouldForceNoindex(lint: CopyLintResult, dbIndexable: boolean): boolean {
  if (!dbIndexable) return true;
  return !lint.pass;
}
