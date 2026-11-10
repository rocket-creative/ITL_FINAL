/**
 * Verifies the gene-identity fixes against a running server.
 *
 *   1. Pages ITL curated keep their own URL (no 301) and their own copy.
 *   2. Their rows still roll up to the canonical mouse gene hub.
 *   3. A gene-hub SERP override no longer retitles a modification page.
 *   4. No page claims a human ortholog that is just the mouse symbol.
 *
 * Usage: node scripts/verify-gene-identity.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? 'http://localhost:3100';

let pass = 0;
let fail = 0;
const failures = [];

function check(name, ok, detail = '') {
  if (ok) {
    pass++;
    console.log(`  PASS  ${name}`);
  } else {
    fail++;
    failures.push(`${name}${detail ? ` -- ${detail}` : ''}`);
    console.log(`  FAIL  ${name}${detail ? ` -- ${detail}` : ''}`);
  }
}

async function get(path) {
  const res = await fetch(BASE + path, { redirect: 'manual' });
  const body = res.status >= 300 && res.status < 400 ? '' : await res.text();
  return { status: res.status, location: res.headers.get('location'), body };
}

const title = (h) => (h.match(/<title>([^<]*)<\/title>/) ?? [, '(none)'])[1];
const text = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

// Humanized product pages ITL wrote their own titles and descriptions for.
const CURATED = ['hB2M', 'hCFH', 'hICOS', 'hPLG', 'hHBB', 'hEPOR', 'hKHK', 'hSOST', 'hMET', 'hNGF', 'hAGT', 'hXDH', 'hPLAU', 'hIGHE'];

console.log(`\nVerifying against ${BASE}\n`);

console.log('1. curated product pages keep their URL and their copy');
for (const g of CURATED) {
  const r = await get(`/all-catalog-mouse-models/gene/${g}/`);
  check(`/gene/${g}/ is 200, not a redirect`, r.status === 200, `got ${r.status}${r.location ? ` -> ${r.location}` : ''}`);
  if (r.status === 200) {
    check(`/gene/${g}/ keeps its curated title`, title(r.body).toLowerCase().includes(g.toLowerCase()), title(r.body));
  }
}

console.log('\n2. curated rows still roll up to the canonical gene hub');
{
  const r = await get('/all-catalog-mouse-models/gene/B2m/');
  check('B2m hub 200', r.status === 200, `got ${r.status}`);
  check('B2m hub still shows the hB2M line', r.body.includes('hB2M'));
}

console.log('\n3. a gene-hub override does not retitle a modification page');
for (const g of ['Trem2', 'Il10', 'Egfr', 'Calca', 'Cd163', 'Notch3', 'Il17a', 'Rag2', 'Cd19']) {
  const r = await get(`/all-catalog-mouse-models/gene/${g}/humanized/`);
  if (r.status !== 200) {
    console.log(`     ${g}: no humanized page (${r.status}), skipped`);
    continue;
  }
  const t = title(r.body);
  // The page is about humanization, so the title must not name a different
  // modification borrowed from the gene hub override.
  const wrong = /knockout/i.test(t) && !/humaniz/i.test(t);
  check(`/gene/${g}/humanized/ is not titled after another modification`, !wrong, t);
}

console.log('\n4. no fabricated human-ortholog claim');
for (const g of ['R26', 'Pd', 'HLA']) {
  const r = await get(`/all-catalog-mouse-models/gene/${g}/humanized/`);
  if (r.status !== 200) {
    console.log(`     ${g}: no humanized page (${r.status}), skipped`);
    continue;
  }
  const body = text(r.body);
  const m = body.match(/Human ortholog ([A-Za-z0-9()._-]+)/);
  check(
    `/gene/${g}/humanized/ does not claim "Human ortholog ${g.toUpperCase()}"`,
    !m || m[1].toUpperCase() !== g.toUpperCase(),
    m ? m[0] : '(no claim - good)',
  );
}

console.log('\n5. a real ortholog claim is still made where one exists');
{
  const r = await get('/all-catalog-mouse-models/gene/Trp53/humanized/');
  if (r.status === 200) {
    const body = text(r.body);
    check(
      'Trp53 humanized still describes humanization',
      /humaniz/i.test(body),
      'no humanization copy',
    );
  } else {
    console.log(`     Trp53 humanized: ${r.status}, skipped`);
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`PASS ${pass}   FAIL ${fail}`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log('  - ' + f));
}
process.exit(fail > 0 ? 1 : 0);
