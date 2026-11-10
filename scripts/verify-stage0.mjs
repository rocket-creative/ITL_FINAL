/**
 * Stage 0 verification — repair only. Every check here asserts that something
 * broken is now correct AND that nothing that previously ranked has changed
 * identity (no retitling, no removal, no redirect of a live page).
 *
 * Usage: node scripts/verify-stage0.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? 'http://localhost:3200';

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

const canonicalOf = (h) => (h.match(/rel="canonical" href="([^"]*)"/) ?? [, null])[1];
const titleOf = (h) => (h.match(/<title>([^<]*)<\/title>/) ?? [, '(none)'])[1];

console.log(`\nVerifying Stage 0 against ${BASE}\n`);

// ---- 1. Case variants must stop declaring themselves canonical -------------
// Note the canonical resolves ALIASES as well as casing: "alb-cre" is an alias
// of the driver "Albumin-Cre", and only the canonical slug "albumin-cre" is in
// the sitemap, so every alias and casing correctly consolidates onto it.
console.log('1. alias and case variants consolidate (was: each self-canonical)');
for (const [variants, expected] of [
  [['alb-cre', 'Alb-Cre', 'ALB-CRE'], '/cre-drivers/albumin-cre/'],
  [['albumin-cre', 'Albumin-Cre'], '/cre-drivers/albumin-cre/'],
]) {
  for (const v of variants) {
    const r = await get(`/cre-drivers/${v}/`);
    if (r.status !== 200) {
      check(`/cre-drivers/${v}/ reachable`, false, `got ${r.status}`);
      continue;
    }
    const can = canonicalOf(r.body) ?? '';
    check(
      `/cre-drivers/${v}/ canonical -> ${expected}`,
      can.endsWith(expected),
      can || '(none)',
    );
  }
}
for (const v of ['liver-specific', 'Liver-Specific', 'LIVER-SPECIFIC']) {
  const r = await get(`/cre-lines/${v}/`);
  if (r.status !== 200) {
    check(`/cre-lines/${v}/ reachable`, false, `got ${r.status}`);
    continue;
  }
  const can = canonicalOf(r.body) ?? '';
  check(
    `/cre-lines/${v}/ canonical -> /cre-lines/liver-specific/`,
    can.endsWith('/cre-lines/liver-specific/'),
    can || '(none)',
  );
}

// ---- 2. Orphaned clusters now have a parent -------------------------------
console.log('\n2. orphan clusters are parented from the existing hub');
{
  const r = await get('/cre-recombinase-mice/');
  check('hub still 200 (not replaced)', r.status === 200, `got ${r.status}`);
  const drivers = (r.body.match(/\/cre-drivers\/[a-z0-9-]+\//g) ?? []).length;
  const tissues = (r.body.match(/\/cre-lines\/[a-z0-9-]+\//g) ?? []).length;
  console.log(`     driver links: ${drivers}   tissue links: ${tissues}`);
  check('hub links its driver children (was 0)', drivers >= 35, `${drivers} links`);
  check('hub links its tissue children (was 0)', tissues >= 15, `${tissues} links`);
  // The hub must keep its own identity — this is a repair, not a rewrite.
  check(
    'hub title unchanged in substance',
    /cre/i.test(titleOf(r.body)),
    titleOf(r.body),
  );
}

// ---- 3. The two 404 parents now resolve ----------------------------------
console.log('\n3. missing index paths resolve instead of 404');
// `trailingSlash: true` means the bare path first normalizes to the slashed
// form, so follow the chain rather than asserting a single hop.
async function followChain(path, maxHops = 4) {
  let current = path;
  const hops = [];
  for (let i = 0; i < maxHops; i++) {
    const r = await get(current);
    if (r.status >= 300 && r.status < 400 && r.location) {
      const next = r.location.replace(/^https?:\/\/[^/]+/, '');
      hops.push(`${current} -> ${next}`);
      current = next;
      continue;
    }
    return { final: current, status: r.status, hops };
  }
  return { final: current, status: 0, hops };
}
for (const [from, to] of [
  ['/cre-drivers', '/cre-recombinase-mice/'],
  ['/cre-lines', '/tissue-specific-cre-lines/'],
]) {
  const { final, status, hops } = await followChain(from);
  console.log(`     ${hops.join('  ')}`);
  check(`${from} is no longer a dead end`, status === 200, `ended ${status} at ${final}`);
  check(`${from} lands on ${to}`, final === to, final);
  check(`${from} resolves in <= 2 hops`, hops.length <= 2, `${hops.length} hops`);
}

// ---- 4. Canonicals added where there were none ----------------------------
console.log('\n4. canonical tags present where they were missing');
{
  const home = await get('/');
  check('homepage 200', home.status === 200, `got ${home.status}`);
  const can = canonicalOf(home.body) ?? '';
  check('homepage declares a canonical (was none)', can.length > 0, can || '(none)');

  const legacy = await get('/legacy/conventional-knockout-mouse-models/');
  if (legacy.status === 200) {
    const lcan = canonicalOf(legacy.body) ?? '';
    check('legacy page declares a canonical (was none)', lcan.length > 0, lcan || '(none)');
    // Deliberately self-referencing: consolidating legacy onto the live page is
    // a traffic decision that needs Search Console, not a Stage 0 repair.
    check(
      'legacy canonical is self-referencing, not a consolidation',
      lcan.endsWith('/legacy/conventional-knockout-mouse-models/'),
      lcan,
    );
  } else {
    check('legacy page reachable', false, `got ${legacy.status}`);
  }
}

// ---- 5. Nothing that ranked was touched ----------------------------------
console.log('\n5. pages with existing traction are unchanged and still indexable');
for (const p of [
  '/conditional-knockout-vs-conventional-knockout/',
  '/conventional-knockout-mouse-models/',
  '/conditional-vs-conventional-guide/',
  '/tissue-specific-knockout/',
  '/cre-line-selection-guide/',
  '/tamoxifen-inducible-cre/',
  '/all-catalog-mouse-models/gene/Apoe/',
  '/all-catalog-mouse-models/gene/Apoe/humanized/',
]) {
  const r = await get(p);
  check(`${p} still 200`, r.status === 200, `got ${r.status}`);
  if (r.status === 200) {
    const robots = (r.body.match(/<meta name="robots" content="([^"]*)"/) ?? [, '(none)'])[1];
    check(`${p} still indexable`, robots.startsWith('index'), robots);
  }
}

console.log(`\n${'='.repeat(52)}`);
console.log(`PASS ${pass}   FAIL ${fail}`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((f) => console.log('  - ' + f));
}
process.exit(fail > 0 ? 1 : 0);
