/**
 * Regression check for the APOE gene-alias and humanized-indexing fixes.
 *
 *   node scripts/verify-apoe.mjs http://localhost:3000
 *   node scripts/verify-apoe.mjs https://www.genetargeting.com
 *
 * Asserts, against a running server: the Apoe hub carries the humanized
 * isoform inventory, /gene/Apoe/humanized/ is indexable and catalog-backed
 * (it was noindex + build_inquiry with catalog_count 0), alias gene URLs 301
 * onto the canonical hub, build_inquiry pages are indexable again, and the
 * indication pages link into the APOE cluster.
 */
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

async function get(path, redirect = 'manual') {
  const res = await fetch(BASE + path, { redirect });
  const body = res.status >= 300 && res.status < 400 ? '' : await res.text();
  return { status: res.status, location: res.headers.get('location'), body };
}

function robots(html) {
  const m = html.match(/<meta name="robots" content="([^"]*)"/);
  return m ? m[1] : '(none)';
}
function title(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1] : '(none)';
}
function h1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  return m ? m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '(none)';
}
function ldTypes(html) {
  const types = new Set();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const walk = (n) => {
        if (Array.isArray(n)) return n.forEach(walk);
        if (n && typeof n === 'object') {
          if (typeof n['@type'] === 'string') types.add(n['@type']);
          Object.values(n).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch { /* ignore malformed */ }
  }
  return types;
}

console.log(`\nVerifying against ${BASE}\n`);

// ---- 1. Canonical Apoe hub now carries the humanized inventory ----
console.log('1. /all-catalog-mouse-models/gene/Apoe/');
{
  const r = await get('/all-catalog-mouse-models/gene/Apoe/');
  check('hub 200', r.status === 200, `got ${r.status}`);
  check('hub indexable', robots(r.body).startsWith('index'), robots(r.body));
  check('title mentions humanized', /humanized/i.test(title(r.body)), title(r.body));
  check('H1 mentions Humanized', /humanized/i.test(h1(r.body)), h1(r.body));
  for (const sku of ['HU 190002', 'HU 190003', 'HU 190013']) {
    check(`hub lists ${sku}`, r.body.includes(sku));
  }
  check('hub lists HU 261708 (isoform switch)', r.body.includes('HU 261708'));
  check('hub still lists KO 190565', r.body.includes('KO 190565'));
  check('Product schema present', ldTypes(r.body).has('Product'));
  check('links to /Apoe/humanized/', r.body.includes('/all-catalog-mouse-models/gene/Apoe/humanized/'));
  // Raw alias strings SHOULD appear as model names (hAPOE2 is the product
  // name for HU 190013). What must not appear is a link to an alias gene
  // page, which would be a self-redirect.
  check('no link to an alias gene page', !/href="[^"]*gene\/hAPOE/.test(r.body));
}

// ---- 2. The humanized page: was noindex + build_inquiry, must be catalog-backed ----
console.log('\n2. /all-catalog-mouse-models/gene/Apoe/humanized/');
{
  const r = await get('/all-catalog-mouse-models/gene/Apoe/humanized/');
  check('humanized 200', r.status === 200, `got ${r.status}`);
  check('humanized INDEXABLE (was noindex)', robots(r.body).startsWith('index'), robots(r.body));
  check('Product schema (was Service)', ldTypes(r.body).has('Product'));
  check('no Service schema', !ldTypes(r.body).has('Service'));
  for (const sku of ['HU 190002', 'HU 190003', 'HU 190013']) {
    check(`humanized lists ${sku}`, r.body.includes(sku));
  }
}

// ---- 3. Alias URLs 301 onto the canonical gene ----
console.log('\n3. alias redirects');
for (const [from, to] of [
  ['/all-catalog-mouse-models/gene/hAPOE2/', '/all-catalog-mouse-models/gene/Apoe/'],
  ['/all-catalog-mouse-models/gene/hAPOE3/', '/all-catalog-mouse-models/gene/Apoe/'],
  ['/all-catalog-mouse-models/gene/hAPOE4/', '/all-catalog-mouse-models/gene/Apoe/'],
  ['/all-catalog-mouse-models/gene/hAPOE4(E1/', '/all-catalog-mouse-models/gene/Apoe/'],
  ['/all-catalog-mouse-models/gene/hAPOE4/humanized/', '/all-catalog-mouse-models/gene/Apoe/humanized/'],
]) {
  const r = await get(from);
  const is3xx = r.status >= 300 && r.status < 400;
  check(`${from} -> 3xx`, is3xx, `got ${r.status}`);
  check(`${from} target`, (r.location ?? '').includes(to), r.location ?? '(no location)');
}

// ---- 4. Canonical gene must NOT redirect (no loops) ----
console.log('\n4. no self-redirect on canonical');
{
  const r = await get('/all-catalog-mouse-models/gene/Apoe/');
  check('Apoe hub does not redirect', r.status === 200, `got ${r.status}`);
  const r2 = await get('/all-catalog-mouse-models/gene/Ldlr/');
  check('unaliased gene unaffected', r2.status === 200, `got ${r2.status}`);
}

// ---- 5. The copyLint noindex fix, on a gene with no humanized inventory ----
console.log('\n5. build_inquiry pages indexable again');
for (const p of [
  '/all-catalog-mouse-models/gene/Ldlr/humanized/',
  '/all-catalog-mouse-models/gene/App/humanized/',
]) {
  const r = await get(p);
  if (r.status !== 200) {
    check(`${p} 200`, false, `got ${r.status}`);
    continue;
  }
  check(`${p} indexable`, robots(r.body).startsWith('index'), robots(r.body));
}

// ---- 6. Indication pages link into the APOE cluster ----
console.log('\n6. indication page internal links');
for (const p of [
  '/atherosclerosis-mouse-models/',
  '/alzheimers-mouse-models/',
  '/cardiovascular-mouse-models/',
]) {
  const r = await get(p);
  check(`${p} 200`, r.status === 200, `got ${r.status}`);
  check(`${p} links to Apoe`, r.body.includes('/gene/Apoe'), 'no Apoe href');
  check(`${p} no longer defaults to Brca1`, !r.body.includes('/gene/Brca1'), 'still links Brca1');
}

console.log(`\n${'='.repeat(50)}`);
console.log(`PASS ${pass}   FAIL ${fail}`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log('  - ' + f));
}
process.exit(fail > 0 ? 1 : 0);
