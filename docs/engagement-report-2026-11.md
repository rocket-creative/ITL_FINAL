# Engagement report — 9–10 November 2026

Eight commits, `069` through `076`, all on `ITL_MAIN` and live on
genetargeting.com. Everything below is verified against production as of
2026-11-10, not against a local build.

**Current state**: working tree clean, local level with `origin/ITL_MAIN` at
`29249448`. Nothing outstanding to commit or push.

---

## 1. Verification totals

Re-run against production immediately before writing this report.

| Suite | Result | What it covers |
|---|---|---|
| `verify-apoe` | **42 / 42** | APOE inventory surfacing, disease-page gene defaults |
| `verify-duplicates` | **29 / 29** | Distinctness across the five knockin slugs, FAQ visibility, alias 301s |
| `verify-stage0` | **38 / 38** | Canonicals, orphan links, no retitled or removed pages |
| `verify-gene-identity` | **43 / 43** | No fabricated ortholog claims, PD/Pd collision guard |
| `verify-schema-live` | **37 / 37** | JSON-LD parses, PMIDs real and correctly attributed |
| **Total live** | **189 / 189** | |

Local gates: vitest **156/156** (12 files), `tsc --noEmit` clean, eslint clean
on touched files, `next build` exit 0, `audit-schema` **0 errors** static and
**0 errors** across 309 routes in emitted HTML.

---

## 2. What was asked, and what was actually wrong

The brief was: why doesn't genetargeting.com rank for APOE queries?

The direct answer was a data-layer bug, fixed in `069`. Everything after that
is defects found while verifying the fix. They were worth fixing, and they are
**not** an answer to the original question — see §6.

---

## 3. Defects fixed

### 069 — APOE lines were invisible on their own gene hub

`catalog_models.gene_name` is vendor-supplied and not a clean symbol. The same
gene appears as `Apoe`, `hAPOE2`, `hAPOE3`, `hAPOE4`, `hAPOE4(E1` (a truncated
import of `hAPOE4(E1-E4)`), and crosses like `hAPOE4/hMAPT`. `getModelsByGene`
matched with strict equality, so the Apoe hub listed only rows literally named
`Apoe` and **every humanized APOE line was invisible to it**. Rows containing
`/` were additionally rejected by `isUrlSafeGeneName`, so those crosses had no
gene page at all.

Fixed with a hand-checked alias map; the hub now queries the whole alias set.

### 070 — the test suite had been silently unrunnable

Vitest had no config file, so the `@/*` alias from `tsconfig.json` was never
applied and three test files (37 tests) failed to *collect* rather than fail
visibly. The test script also ran through `npx --yes vitest@3.2.4`, downloading
an ephemeral copy each time and leaving `vitest/config` unresolvable.

Also implemented a lint rule the suite already asserted but which never
existed, so that assertion had been failing on main.

This is why it matters: the quality gate protecting everything else was not
running.

### 071 — three defects, two worse than first reported

**(a) ~9,000 duplicate indexable URLs, and a false inventory claim.** Several
modification slugs collapse onto one catalog `model_type`. The route compared
`model.modelType` to the slug's broad type, so `knockin`, `reporter`,
`point-mutation`, `tag-knockin` and `cdna-knockin` **all served every Knockin
row** — same table, same copy, five indexable URLs per gene. Worse,
`inducible-knockout` served every Conditional Knockout row, which advertised a
plain floxed line (`CKO 220617`) as inducible stock. That is a false inventory
claim to a buyer, not just an SEO problem.

Fixed by routing through `CATALOG_MATCH_BY_SLUG`, correcting two rules to the
catalog's real category vocabulary (it says `Fluorescent Model` where the rule
said `reporter`, so the reporter rule had been matching nothing), and
separating the display label from the match type.

**(b) FAQ schema describing invisible content.** Gene hubs emitted `FAQPage`
JSON-LD whose questions appeared nowhere in the rendered body. That is a
structured-data policy violation and a manual-action risk. Fixed by rendering
the FAQ and the schema from one array.

**(c) 516 humanized rows orphaned from their canonical gene.** Fixed with a
*generated* alias map under four guards. Deliberately excluded: names truncated
at a delimiter (`hPD` is `hPD-1`/`hPD-L1`, two different genes — Pdcd1 and
Cd274 — so no single parent is correct; `h4` is `h4-1BB`), and 237 candidates
whose de-prefixed parent has no catalog page, which would have turned working
pages into 301s into 404s.

### 072 — canonicals, orphans and gene identity

**Unbounded canonical self-reference.** `/cre-drivers/<driver>/` and
`/cre-lines/<tissue>/` built their canonical from the raw URL parameter, so
**every casing variant declared itself canonical** — `/AlB-cRe/` returned 200
and pointed at itself. Now canonicalised through `driverSlugToCanonical` /
`tissueSlugToCanonical`.

**Missing canonicals.** The 25 `/legacy/` pages and the homepage carried none.
Legacy pages deliberately self-reference rather than point at their live
counterparts, because several archived pages are longer than the live version
and may be the ones earning clicks — that needs Search Console to settle.

**Orphaned clusters.** `/cre-recombinase-mice/` was already the hub for both
crawled clusters but linked **none** of its 39 driver or 28 tissue children.
Orphaned pages are crawled rarely and inherit no authority. It now renders a
driver directory generated from `CRE_DRIVERS` so it cannot drift. `/cre-drivers`
and `/cre-lines` returned 404 to anyone trimming the URL; both now redirect.

**Fabricated ortholog claims.** `human_ortholog_symbol` was the mouse symbol
uppercased for 8,072 of the 8,073 rows that had one — nothing looked up an
ortholog. The page rendered "Human ortholog R26 guides humanization design" to
geneticists. `R26` is Gt(ROSA)26Sor, an engineered mouse locus with no human
counterpart. Replaced with `hasRealHumanOrtholog()`. Scope, measured: of 8,060
indexable pages carrying the claim, roughly **46 are demonstrably false** (14
`Gm`-prefixed mouse-only predicted genes, 26 miRNA genes, and `R26`, `Pd`,
`H2`, `Hc`, `Qk`, `Gh`), plus an unknown number where the human symbol differs
beyond capitalisation (mouse *Qk* → human **QKI**, *Hc* → **C5**). The rest
were correct by nomenclature convention but asserted without a source.

### 074–076 — citation graph and entity consolidation

**713 real publications had no structured data.** Every one is a peer-reviewed
paper citing an ITL-generated model, with a link. Four page types already
rendered matched papers as visible copy; none described them in the graph. Now
`ScholarlyArticle` nodes with journal, year, author list and **PMID**, keyed by
article URL so one paper is one node across pages. Live on **200 prerendered
pages**.

Deliberately **not** added to `/publications/`. Measured first: all 713, at an
average 104-character title and 9.9 authors each, is **~499 KB** of JSON-LD,
~35 KB even for the 50 most recent. Gene pages cap at 5 matches, so they stay a
few KB.

**Entity fragmentation.** There were **112 `Organization` declarations** in
`src`. The build-inquiry `Service` node re-declared the org as `provider`
instead of referencing `ORG_ID`; so did `/publications/`, with a divergent
capitalisation. Both now reference the canonical node. Added stable `@id`s and
a `CollectionPage` anchor to catalog gene pages, which previously emitted a bag
of `Product` nodes with nothing stating what the page was about.

**An overstated claim.** `/publications/` asserted "Over 800 publications"
against a list of 713. Now prints `getTotalPublicationCount()`.

---

## 4. Mistakes made during this work

Recorded because a report that omits them is not a report.

1. **A regression I shipped to production.** The alias redirect in `071` turned
   14 curated humanized pages (`hAGT hB2M hCFH hEPOR hHBB hICOS hIGHE hKHK
   hMET hNGF hPLAU hPLG hSOST hXDH`) from 200 to 308, discarding hand-written
   SERP copy, because `CATALOG_SERP_OVERRIDES` is keyed by the pre-redirect
   gene name. Live roughly a day. Fixed in `072` by separating "absorb rows"
   from "redirect URL" via `KEEPS_OWN_PAGE`. **My verify scripts missed it
   because they asserted that aliases *should* 301** — the bug was encoded as
   the success condition.
2. **Overstated the duplicate-page defect**, calling the pages "byte-identical"
   and the scale "5,356 URLs". Measured: 120,878 vs 118,699 bytes, ~9,000 URLs.
   I also had the content difference backwards.
3. **Overstated the ortholog fix** as removing "a false claim from ~8,060
   pages". It removed an *unverified* claim from 8,060, of which ~46 are
   demonstrably false. Corrected in §3 above.
4. **Trusted a tool over ground truth.** `audit-schema` flagged
   `/mouse-breeding-services/` as exporting a breadcrumb it never rendered. I
   rendered it — then read the built HTML and found **two identical
   `BreadcrumbList` blocks**. `layout.tsx` had been rendering it all along.
   Reverted, and fixed the rule.
5. **Shipped `074` with two thirds of citations carrying no identifier.**
   `pubmedId` matched only `pubmed.ncbi.nlm.nih.gov`; 453 of 713 records use
   the legacy `www.ncbi.nlm.nih.gov/pubmed/<id>` form. Coverage was 211/713.
   Fixed to **690 of 700** non-patent records.
6. **Typed 13 patents as `ScholarlyArticle`.** A patent is not a peer-reviewed
   paper and `citation` reads as research validation. Now excluded from the
   graph, still listed on the page.
7. **Wrote a verification step that validated nothing.** The first PMID check
   asked `pubmed.ncbi.nlm.nih.gov` whether a record existed. It returns an
   identical `203` and an identical 5,589-byte interstitial for a real PMID and
   for `99999999999`. It passed for fabricated citations. Now uses NCBI
   E-utilities and additionally cross-checks journal and first author, so a
   citation attached to the **wrong paper** fails.
8. **A poll loop with a false positive** — `grep -c` emits `0` *and* exits
   non-zero, so `|| echo 0` produced `"0\n0"`, which is not `"0"`, and the loop
   reported a deploy promoted when it had not.

---

## 5. Not fixed, and why

- **70 JSON-LD nodes assert `"Ingenious targeting laboratory"` on the same
  `@id` as the canonical lower-case `Organization` node.** One entity, two
  names. The fix is to replace each hand-written `provider` object with
  `organizationRef`, which also covers ~72 inline `Service` nodes lacking
  `@id`. Not done: 89 *further* occurrences of that string are sentence-start
  capitalisation in body copy on pages that rank and must not be rewritten, so
  a find-and-replace would damage visible content. A 70-file schema change on
  the production branch should be asked for, not assumed.
- **14 `FAQPage` blocks and 1 `HowTo` produce no search feature.** FAQ rich
  results were narrowed to government and health sites in Aug 2023 and stopped
  entirely on **7 May 2026**; HowTo went in Sept 2023. Harmless, and the
  questions are real visible copy — but not an asset, and not worth extending.
- **No named author or reviewer anywhere.** There is a `TODO(byline)` awaiting
  an assigned PhD scientist. This is the **largest remaining E-E-A-T gap** and
  it cannot be closed in code: it needs a real person with real credentials.
- **`organization.ts:141` claims "800+ peer reviewed publications"** against
  713 listed. May be true of reality; it is an overstatement relative to what
  the site can evidence.
- **40 truncated `gene_name` rows** need per-row decisions from ITL. `hPD` must
  be split between Pdcd1 and Cd274; no mechanical rule can do it.
- **The 6-page conventional-vs-conditional cluster** was left alone
  deliberately: ITL currently holds all ten results for that query. Touching it
  without Search Console data risks losing ground.
- **10 publications carry no extractable identifier** (publisher URLs on
  nature.com, sciencedirect, oup). They keep a node with a URL and no
  identifier, which is correct — inventing one would be a fabricated citation.

---

## 6. The honest assessment

**None of this is likely to make you rank for "APOE mouse model".** The APOE
fix was necessary — the hub genuinely could not show the inventory — but
ranking for a commercial query against JAX, Taconic and Charles River is a
function of authority, citations and differentiated content, not of data-layer
correctness.

**The single change most likely to move rankings** is the internal linking of
the 67 orphaned Cre pages in `072`. Orphaned pages rank poorly for mechanical
reasons, and that is now fixed.

**WITHDRAWN — this section recommended noindexing the thin tiers.** Search
Console was read on 2026-11-10, after this report was written, and contradicts
it. See `docs/search-console-baseline-2026-11.md` for the measured figures.

The catalog delivers **2,440 of the site's 3,900 clicks — 63%** — at a 1.6%
CTR against a site-wide 0.8%. Noindexing it would have removed most of the
organic clicks the site earns. The humanized tier specifically is weaker but
not dead: 234 clicks across ~8,061 pages at position 9.4.

The thin-content concern was real but pointed at the wrong target. What Google
actually reports is **24,345 URLs "Discovered – currently not indexed"** and
9,182 "Crawled – currently not indexed" — 33,527 it has seen and refused, most
without spending a crawl. Those are the safe thing to prune. Pages earning
clicks are not.

**And the real finding is elsewhere**: 475,000 impressions at **0.8% CTR**. The
site ranks for definitional queries — "point mutation" alone draws 17,228
impressions and 5 clicks — answered by glossary and blog pages, not by anyone
sourcing a mouse model. Nine of the top ten pages are explainers. The only
query converting properly is the brand name, at 49%.

APOE itself: **4 impressions, 0 clicks, average position 25.5.** Not a
click-through problem. The site is not in the running.

**Schema is not the lever.** It has never been a ranking factor; it makes a
page eligible for a rich result, which affects click-through, not position.
Google's May 2026 guidance states AEO/GEO needs no AI-specific markup and no
`llms.txt`, and a May 2026 study found adding JSON-LD produced no measurable
AI-citation lift for pages already surfacing. The citation graph is worth having
because it states a *checkable* fact to a technical audience — not because it
ranks. Full sourcing in `docs/seo-aeo-schema-framing-2026-11.md`.

---

## 7. What is needed from you

1. ~~**Search Console access.**~~ **Done** — read on 2026-11-10, baseline in
   `docs/search-console-baseline-2026-11.md`. It settled the APOE diagnosis
   (no impressions, not a snippet problem) and overturned the recommendation
   in §6.
2. ~~**A decision on CTR.**~~ **Struck 2026-11-10 after testing** — see §6b of
   the baseline. Titles and snippets will not fix it. Positions are fine (5.4
   to 9.3) and the homepage earns 9% CTR at position 8.5, so the site converts
   at that depth; `what-is-a-point-mutation` earns 0.125% at position 8.2
   because the SERP for "point mutation" is an AI Overview, a knowledge panel,
   an image block and People Also Ask before any organic result. Same for
   "tamoxifen inducible cre", where Nature and JAX hold the visible slots. Do
   not spend the four weeks here.
3. **A decision on what the educational content is for.** The glossary and
   blog pages earn almost all the visibility and almost none of the buyers.
   Either they are a brand-awareness play and the CTR does not matter, or they
   should route readers toward the catalog. Right now they appear to do
   neither. This is a positioning decision, not a technical one.
4. **A narrower pruning decision.** Not the 8,061 — the 33,527 URLs Google has
   already refused to index. Worth confirming what they are before deciding.
5. **A named scientist and reviewer** for the byline work.
6. **A decision on the 70-node Organization cleanup.**
7. **Node is not installed on this machine** — `which -a node npm npx` returns
   nothing in your own login shell. The toolchain used for this work lives in a
   temporary session directory and will disappear. Install Node properly before
   the next session.
8. **Two sessions worked on this branch.** Answers you give one can silently
   override what you told the other. Worth keeping to one session per branch.

### Four-week expectations

Baselines are the 10 Nov figures in `search-console-baseline-2026-11.md`.

| Signal | Week 0 | By week 4 |
|---|---|---|
| Cre driver/tissue cluster | 67 pages orphaned until 10 Nov | **Most likely real movement** — the clean before/after |
| Catalog clicks | 2,440 | The floor to protect. A drop here is a loss whatever indexing does |
| Discovered – currently not indexed | 24,345 | Falling = crawl budget recovering; rising = footprint outgrowing it |
| Site CTR | 0.8% on 475K impressions | Flat, and **not a target** — the high-impression SERPs are AI-Overview dominated (baseline §6b) |
| Commercial-term visibility | APOE 4 impressions at 25.5; brand the only converting query | The real gap. Absent on buying terms, visible on definitional ones |
| APOE position | 25.5, 4 impressions | Flat. If it moves, something larger changed |
| Breadcrumb / Organization valid items | — | Improvement |
| `ScholarlyArticle` parses | — | Valid, no rich result (none exists) |

Four weeks is the earliest edge for ranking movement on a site this size, so a
null result means little. AI Overview content changes ~70% for the same query,
so a four-week citation read is mostly noise.
