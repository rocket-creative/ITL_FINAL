/**
 * Copy lint for build_inquiry pages — spec §8 (shared with copyLint.ts).
 */

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

function checkBannedCustom(text, field, errors) {
  if (/\bcustom\b/i.test(text)) {
    errors.push(`${field}: contains banned word "custom"`);
  }
  if (/custom models/i.test(text)) {
    errors.push(`${field}: framed as Custom Models`);
  }
}

function checkProhibited(text, field, errors) {
  const lower = text.toLowerCase();
  for (const term of PROHIBITED_TERMS) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`, 'i');
    if (re.test(lower)) {
      errors.push(`${field}: prohibited term "${term}"`);
    }
  }
}

function checkProseHyphens(text, field, errors) {
  if (text.includes('http') || text.includes('/all-catalog')) return;
  const matches = text.match(/\b[a-z]+-[a-z]+\b/gi);
  if (matches?.length) {
    errors.push(`${field}: hyphen in prose (${matches.slice(0, 3).join(', ')})`);
  }
}

function lintBuildInquiryCopy(input) {
  const errors = [];
  const { title, h1, headings = [], bodyParagraphs = [] } = input;

  checkBannedCustom(title, 'title', errors);
  checkBannedCustom(h1, 'h1', errors);

  for (const h of headings) {
    checkBannedCustom(h, 'heading', errors);
    checkProhibited(h, 'heading', errors);
    checkProseHyphens(h, 'heading', errors);
  }

  for (const p of bodyParagraphs) {
    checkProhibited(p, 'body', errors);
    checkProseHyphens(p, 'body', errors);
  }

  checkProhibited(title, 'title', errors);

  if (!title.toLowerCase().includes('ingenious targeting laboratory')) {
    errors.push('title: must include full brand name ingenious targeting laboratory');
  }

  if (/\bITL\b/.test(title)) {
    errors.push('title: must not contain ITL');
  }

  return { pass: errors.length === 0, errors };
}

module.exports = { lintBuildInquiryCopy, PROHIBITED_TERMS };
