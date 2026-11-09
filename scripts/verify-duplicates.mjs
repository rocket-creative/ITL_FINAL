/**
 * Verifies the duplicate-page and FAQ fixes against a running server.
 * Usage: node scripts/verify-duplicates.mjs [baseUrl]
 */
import crypto from 'node:crypto';

const BASE = process.argv[2] ?? 'http://localhost:3000';

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

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const h1 = (html) => {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  return m ? m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '(none)';
};
const robots = (html) => {
  const m = html.match(/<meta name="robots" content="([^"]*)"/);
  return m ? m[1] : '(none)';
};
const fingerprint = (html) => crypto.createHash('md5').update(strip(html)).digest('hex');

console.log(`\nVerifying against ${BASE}\n`);

// ---- 1. Knockin sub-type URLs must no longer be one page five times ----
// Cx3cr1 has 8 Knockin rows. Every one of these URLs used to serve the same
// body with the same H1 ("Cx3cr1 Knockin mouse models"), all indexable.
console.log('1. knockin sub-type URLs are distinct (Cx3cr1)');
{
  const slugs = ['knockin', 'reporter', 'point-mutation', 'tag-knockin', 'cdna-knockin'];
  const seen = new Map();
  for (const s of slugs) {
    const r = await get(`/all-catalog-mouse-models/gene/Cx3cr1/${s}/`);
    if (r.status !== 200) {
      check(`${s} reachable`, false, `got ${r.status}`);
      continue;
    }
    const fp = fingerprint(r.body);
    const head = h1(r.body);
    console.log(`     ${s.padEnd(15)} h1="${head}" robots=${robots(r.body)}`);
    const clash = [...seen.entries()].find(([, v]) => v.fp === fp);
    check(`${s} body differs from every other slug`, !clash, clash ? `identical to ${clash[0]}` : '');
    const h1Clash = [...seen.entries()].find(([, v]) => v.h1 === head);
    check(`${s} H1 differs from every other slug`, !h1Clash, h1Clash ? `same H1 as ${h1Clash[0]}` : '');
    seen.set(s, { fp, h1: head });
  }
}

// ---- 2. inducible-knockout must not present floxed lines as inducible ----
console.log('\n2. inducible-knockout does not borrow conditional stock (Apoe)');
{
  const ind = await get('/all-catalog-mouse-models/gene/Apoe/inducible-knockout/');
  const cond = await get('/all-catalog-mouse-models/gene/Apoe/conditional-knockout/');

  check('conditional page still 200', cond.status === 200, `got ${cond.status}`);
  check('conditional still lists CKO 220617', cond.body.includes('CKO 220617'));

  if (ind.status === 200) {
    check(
      'inducible page does NOT list the floxed line CKO 220617',
      !ind.body.includes('CKO 220617'),
      'still advertising a conditional line as inducible',
    );
    check(
      'inducible page body differs from conditional',
      fingerprint(ind.body) !== fingerprint(cond.body),
    );
    check('inducible H1 is not labelled Conditional', !/Conditional/i.test(h1(ind.body)), h1(ind.body));
    console.log(`     inducible h1="${h1(ind.body)}" robots=${robots(ind.body)}`);
  } else {
    // 404 / redirect is also an acceptable outcome: no inducible inventory.
    check('inducible page is 200, 3xx or 404', [301, 302, 308, 404].includes(ind.status), `got ${ind.status}`);
  }
}

// ---- 3. FAQ schema may only describe visible content ----
console.log('\n3. FAQPage schema matches visible copy (Apoe hub)');
{
  const r = await get('/all-catalog-mouse-models/gene/Apoe/');
  check('hub 200', r.status === 200, `got ${r.status}`);

  const questions = [];
  for (const m of r.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const walk = (n) => {
        if (Array.isArray(n)) return n.forEach(walk);
        if (n && typeof n === 'object') {
          if (n['@type'] === 'Question' && typeof n.name === 'string') questions.push(n.name);
          Object.values(n).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch {
      /* ignore malformed */
    }
  }

  check('FAQPage schema present', questions.length > 0, `${questions.length} questions`);

  const visible = strip(r.body);
  let missing = 0;
  for (const q of questions) {
    const needle = q.replace(/\s+/g, ' ').trim();
    if (!visible.includes(needle)) {
      missing++;
      console.log(`     MISSING FROM PAGE: ${needle}`);
    }
  }
  check(
    'every schema question appears in the rendered body',
    missing === 0,
    missing > 0 ? `${missing}/${questions.length} absent` : '',
  );
}

// ---- 4. Generated alias layer: humanized names fold onto the real gene ----
console.log('\n4. generated alias redirects');
for (const [from, to] of [
  ['/all-catalog-mouse-models/gene/hVEGFA/', '/all-catalog-mouse-models/gene/Vegfa/'],
  ['/all-catalog-mouse-models/gene/hTREM2/', '/all-catalog-mouse-models/gene/Trem2/'],
  ['/all-catalog-mouse-models/gene/hLDLR/', '/all-catalog-mouse-models/gene/Ldlr/'],
]) {
  const r = await get(from);
  const is3xx = r.status >= 300 && r.status < 400;
  check(`${from} -> 3xx`, is3xx, `got ${r.status}`);
  check(`${from} target`, (r.location ?? '').includes(to), r.location ?? '(no location)');
  if (is3xx) {
    const dest = await get(to);
    check(`${to} is a real page (not a 301 into a 404)`, dest.status === 200, `got ${dest.status}`);
  }
}

// ---- 5. Ambiguous/truncated names keep their own page, never a wrong parent --
console.log('\n5. truncated names are not mis-parented');
for (const p of ['/all-catalog-mouse-models/gene/hPD/', '/all-catalog-mouse-models/gene/h4/']) {
  const r = await get(p);
  // hPD is hPD-1 + hPD-L1 (two genes) and h4 is h4-1BB; neither may redirect
  // to the bogus parents "Pd" / "4" that naive de-prefixing produces.
  const loc = r.location ?? '';
  check(`${p} does not redirect to a de-prefixed parent`, !/gene\/(Pd|4)\/?$/.test(loc), loc || '(no redirect)');
}

console.log(`\n${'='.repeat(50)}`);
console.log(`PASS ${pass}   FAIL ${fail}`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log('  - ' + f));
}
process.exit(fail > 0 ? 1 : 0);
