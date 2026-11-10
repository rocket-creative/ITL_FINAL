#!/usr/bin/env node
/**
 * Live verification of the citation graph and entity consolidation (074).
 *
 * Unlike a grep, this JSON.parses every ld+json block on the page, so a
 * malformed graph fails here instead of looking fine. Earlier passes in this
 * project asserted only status codes, canonicals, titles and indexability —
 * all of which a page with broken or false structured data passes.
 *
 * Usage: node scripts/verify-schema-live.mjs [baseUrl]
 *        default https://www.genetargeting.com
 */

const BASE = (process.argv[2] ?? 'https://www.genetargeting.com').replace(/\/$/, '');
const ORG_ID = 'https://www.genetargeting.com/#organization';

let pass = 0;
let fail = 0;
const ok = (m) => { pass++; console.log(`  PASS  ${m}`); };
const bad = (m) => { fail++; console.log(`  FAIL  ${m}`); };

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'follow' });
  return { status: res.status, html: await res.text() };
}

/** Every ld+json block on the page, parsed. Throws the offending block on bad JSON. */
function graphs(html) {
  const out = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    if (!raw) continue;
    try {
      out.push(JSON.parse(raw));
    } catch (e) {
      throw new Error(`unparseable ld+json (${e.message}): ${raw.slice(0, 160)}`);
    }
  }
  return out;
}

/** Flatten @graph wrappers so every node is inspectable. */
function nodes(parsed) {
  const flat = [];
  for (const g of parsed) {
    if (Array.isArray(g['@graph'])) flat.push(...g['@graph']);
    else flat.push(g);
  }
  return flat;
}

function deepFind(node, predicate, seen = new Set()) {
  const found = [];
  const walk = (v) => {
    if (!v || typeof v !== 'object' || seen.has(v)) return;
    seen.add(v);
    if (!Array.isArray(v) && predicate(v)) found.push(v);
    for (const child of Object.values(v)) walk(child);
  };
  walk(node);
  return found;
}

// ---------------------------------------------------------------------------

console.log(`\nverify-schema-live against ${BASE}\n`);

console.log('1. every ld+json block on key routes is valid JSON');
const ROUTES = [
  '/',
  '/publications/',
  '/mouse-breeding-services/',
  '/all-catalog-mouse-models/gene/Mapt/conditional-knockout/',
  '/all-catalog-mouse-models/gene/Apoe/humanized/',
];
const page = {};
for (const r of ROUTES) {
  try {
    const { status, html } = await get(r);
    const parsed = graphs(html);
    page[r] = { status, html, parsed, all: nodes(parsed) };
    if (status !== 200) bad(`${r} returned ${status}`);
    else ok(`${r} — ${parsed.length} block(s) parsed`);
  } catch (e) {
    page[r] = null;
    bad(`${r} — ${e.message}`);
  }
}

console.log('\n2. citation graph: real papers with real PMIDs');
const citePages = [
  '/all-catalog-mouse-models/gene/Mapt/conditional-knockout/',
  '/all-catalog-mouse-models/gene/Apoe/humanized/',
];
const pmidsSeen = new Set();
/** [route, pmid, {journal, firstAuthor}] for the cross-check in section 3. */
const citationsToCheck = [];
for (const r of citePages) {
  const p = page[r];
  if (!p) { bad(`${r} not fetched`); continue; }
  const articles = deepFind(p.parsed, (n) => n['@type'] === 'ScholarlyArticle');
  if (articles.length === 0) { bad(`${r} emits no ScholarlyArticle`); continue; }
  ok(`${r} cites ${articles.length} paper(s)`);

  for (const a of articles) {
    if (!a.headline) { bad(`${r} article with no headline`); continue; }
    const label = a.headline.slice(0, 48);
    if (!/^\d{4}$/.test(String(a.datePublished ?? ''))) bad(`"${label}" datePublished not a year: ${a.datePublished}`);
    if (!a.isPartOf?.name) bad(`"${label}" has no journal`);
    // A journal name must not keep the citation-format trailing period.
    else if (/\.$/.test(a.isPartOf.name)) bad(`"${label}" journal keeps trailing period: ${a.isPartOf.name}`);
    // An identifier is expected wherever the link embeds one. 10 of 713
    // records link to a publisher page (nature.com, sciencedirect, oup) that
    // carries no PMID, PMCID or DOI in the URL, so a node with a url and no
    // identifier is legitimate — asserting otherwise flagged three real,
    // correctly-formed citations on /gene/Apoe/humanized/.
    const id = a.identifier;
    if (id) {
      const { propertyID: kind, value } = id;
      if (kind === 'PMID') {
        if (!/^\d+$/.test(value)) bad(`"${label}" PMID is not numeric: ${value}`);
        else {
          pmidsSeen.add(value);
          citationsToCheck.push([
            r,
            value,
            {
              journal: a.isPartOf?.name ?? '',
              firstAuthor: Array.isArray(a.author) ? (a.author[0]?.name ?? '') : '',
            },
          ]);
        }
      } else if (kind === 'PMCID') {
        if (!/^PMC\d+$/.test(value)) bad(`"${label}" PMCID malformed: ${value}`);
      } else if (kind === 'DOI') {
        if (!/^10\.\d{4,9}\//.test(value)) bad(`"${label}" DOI malformed: ${value}`);
      } else {
        bad(`"${label}" unknown identifier type: ${kind}`);
      }
    }
    // @id must equal the article URL so one paper is one node across pages.
    if (a.url && a['@id'] !== a.url) bad(`"${label}" @id (${a['@id']}) != url (${a.url})`);
    // Patents must not be typed as scholarly articles.
    if (/patents\.google|freepatentsonline|patentimages/.test(a.url ?? '')) {
      bad(`"${label}" is a patent typed as ScholarlyArticle`);
    }
  }
}
if (pmidsSeen.size > 0) ok(`collected ${pmidsSeen.size} distinct PMID(s)`);

console.log('\n3. the cited PMIDs are real, and say what we claim they say');
// Checked against NCBI E-utilities, not pubmed.ncbi.nlm.nih.gov. The public
// page serves an interstitial to automated clients and returns an identical
// 203 and an identical 5,589-byte body for a real PMID and for 99999999999,
// so a status or body check there validates nothing — it passes for a
// fabricated citation. E-utilities returns the record, or an explicit
// "cannot get document summary" error, so it discriminates.
//
// This goes further than existence: it compares the journal and first author
// NCBI holds against what the page asserts. A citation can be well formed,
// resolvable, and still attached to the wrong paper.
//
// No contact address is sent. NCBI invites a tool and email parameter; the
// tool name is enough to identify the client and the email is not ours to
// share.
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * One esummary lookup, throttled and retried once.
 *
 * E-utilities allows 3 requests/second without an API key. Firing four in a
 * tight loop got the fourth throttled, and the verifier reported PMID
 * 20833395 as "not a real record" when a direct query returns it fine
 * (Atherosclerosis, Zack M). A verifier that cries wolf is as useless as one
 * that passes everything, so pace the requests and distinguish a throttle
 * from a genuine miss.
 */
async function esummary(pmid) {
  for (let attempt = 0; attempt < 2; attempt++) {
    await sleep(attempt === 0 ? 400 : 1500);
    try {
      const res = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json&tool=itl-schema-verifier`,
      );
      if (res.status === 429) continue;
      const json = await res.json();
      const rec = json?.result?.[pmid];
      if (rec && !rec.error) return rec;
      // An explicit error is a real answer; an absent record may be a throttle.
      if (rec?.error) return { error: rec.error };
    } catch {
      /* retry */
    }
  }
  return null;
}

for (const [r, pmid, claimed] of citationsToCheck.slice(0, 4)) {
  try {
    const rec = await esummary(pmid);
    if (!rec) {
      bad(`PMID ${pmid} (${r}) could not be checked after 2 attempts — treat as unverified, not as fake`);
      continue;
    }
    if (rec.error) {
      bad(`PMID ${pmid} (${r}) is not a real record: ${rec.error}`);
      continue;
    }
    ok(`PMID ${pmid} is a real record`);

    const ncbiJournal = (rec.source ?? '').replace(/\.$/, '').trim();
    if (claimed.journal && ncbiJournal && claimed.journal !== ncbiJournal) {
      bad(`PMID ${pmid} journal mismatch — page says "${claimed.journal}", NCBI says "${ncbiJournal}"`);
    } else if (ncbiJournal) {
      ok(`PMID ${pmid} journal matches NCBI ("${ncbiJournal}")`);
    }

    const ncbiFirst = rec.authors?.[0]?.name?.trim();
    if (claimed.firstAuthor && ncbiFirst && claimed.firstAuthor !== ncbiFirst) {
      bad(`PMID ${pmid} first author mismatch — page says "${claimed.firstAuthor}", NCBI says "${ncbiFirst}"`);
    } else if (ncbiFirst) {
      ok(`PMID ${pmid} first author matches NCBI ("${ncbiFirst}")`);
    }
  } catch (e) {
    bad(`PMID ${pmid} lookup failed: ${e.message}`);
  }
}

console.log('\n4. entity consolidation: one Organization, referenced not re-declared');
for (const r of ROUTES) {
  const p = page[r];
  if (!p) continue;
  const orgs = deepFind(p.parsed, (n) => n['@type'] === 'Organization');
  const named = orgs.filter((o) => o.name);
  const wrongId = named.filter((o) => o['@id'] && o['@id'] !== ORG_ID);
  if (wrongId.length > 0) bad(`${r} has Organization with a non-canonical @id: ${wrongId.map((o) => o['@id']).join(', ')}`);
  // One @id must not carry two different names.
  const namesOnOrgId = new Set(named.filter((o) => o['@id'] === ORG_ID).map((o) => o.name));
  if (namesOnOrgId.size > 1) bad(`${r} asserts ${namesOnOrgId.size} names on ${ORG_ID}: ${[...namesOnOrgId].join(' | ')}`);
  else ok(`${r} — Organization identity consistent`);
}

console.log('\n5. /publications/ states the real count, not a rounded claim');
{
  const p = page['/publications/'];
  if (!p) bad('/publications/ not fetched');
  else {
    const coll = deepFind(p.parsed, (n) => n['@type'] === 'CollectionPage')[0];
    if (!coll) bad('/publications/ has no CollectionPage node');
    else {
      if (/over 800/i.test(coll.description ?? '')) bad('/publications/ still claims "Over 800"');
      else ok('/publications/ no longer claims "Over 800"');
      const n = (coll.description ?? '').match(/(\d{3,4}) publications/);
      if (!n) bad('/publications/ description states no numeric count');
      else ok(`/publications/ states ${n[1]} publications`);
      if (coll.publisher?.['@id'] === ORG_ID) ok('/publications/ publisher references ORG_ID');
      else bad(`/publications/ publisher is ${JSON.stringify(coll.publisher)}`);
    }
    // The 499 KB decision: the index must NOT inline all 713 papers.
    const inlined = deepFind(p.parsed, (n) => n['@type'] === 'ScholarlyArticle').length;
    if (inlined > 50) bad(`/publications/ inlines ${inlined} ScholarlyArticle nodes (payload decision was to inline none)`);
    else ok(`/publications/ inlines ${inlined} ScholarlyArticle nodes`);
  }
}

console.log('\n6. no duplicate singleton nodes (the breadcrumb bug)');
for (const r of ROUTES) {
  const p = page[r];
  if (!p) continue;
  for (const type of ['BreadcrumbList', 'CollectionPage']) {
    const found = nodes(p.parsed).filter((n) => n['@type'] === type);
    if (found.length > 1) bad(`${r} emits ${found.length} top-level ${type} nodes`);
  }
  ok(`${r} — no duplicated singleton nodes`);
}

console.log('\n7. last pass has not regressed: curated humanized pages still 200');
for (const g of ['hB2M', 'hSOST', 'hXDH']) {
  const { status } = await get(`/all-catalog-mouse-models/gene/${g}/`);
  if (status === 200) ok(`${g} still 200`);
  else bad(`${g} returned ${status}`);
}

console.log(`\n${'='.repeat(52)}`);
console.log(`PASS ${pass}   FAIL ${fail}`);
process.exit(fail === 0 ? 0 : 1);
