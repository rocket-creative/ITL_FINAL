# Search Console baseline — 10 November 2026

Read from Google Search Console (property `sc-domain:genetargeting.com`) on
2026-11-10. Performance window is the last 3 months, **9 Aug – 8 Nov 2026**.
Indexing figures carry Google's own "Last update: 11/5/26".

This is the week-0 baseline for the four-week test, and it is the first
measured data in this engagement. Everything written before it — in
`engagement-report-2026-11.md`, `seo-aeo-schema-framing-2026-11.md` and
`seo-competitive-audit-2026-11.md` — was structural inference. Where the two
disagree, this file wins.

**Caveat Google prints itself**: "Chart totals and table results might be
partial when filters are applied." The filtered rows below (catalog, humanized)
are directional, not exact.

---

## 1. Site totals, 9 Aug – 8 Nov 2026

| Metric | Value |
|---|---|
| Total clicks | 3,900 |
| Total impressions | 475,000 |
| Average CTR | **0.8%** |
| Average position | 9.7 |

475K impressions converting at 0.8% is the headline problem. The site is
visible and is not being clicked.

## 2. Indexing

| | Pages |
|---|---|
| **Indexed** | **45,400** |
| **Not indexed** | **58,900** |

Reasons not indexed:

| Reason | Source | Pages |
|---|---|---|
| Discovered – currently not indexed | Google systems | **24,345** |
| Excluded by 'noindex' tag | Website | 11,981 |
| Crawled – currently not indexed | Google systems | **9,182** |
| Alternate page with proper canonical tag | Website | 8,807 |
| Page with redirect | Website | 3,089 |
| Duplicate, Google chose different canonical than user | Google systems | 1,091 |
| Not found (404) | Website | 355 |
| Duplicate without user-selected canonical | Website | 4 |
| Soft 404 | Website | 2 |
| Blocked due to access forbidden (403) | Website | 2 |

**The two numbers that matter most are the first and third.** "Discovered –
currently not indexed" means Google found the URL and decided not to spend a
crawl on it. "Crawled – currently not indexed" means it looked and declined to
index. Together that is **33,527 URLs Google has seen and refused**, 24,345 of
them without even crawling.

That is a crawl-budget and site-quality signal, and it is the clearest
empirical support for the thin-content concern. It is also the correction to
how that concern was acted on — see §5.

`Duplicate, Google chose different canonical than user` at 1,091 means Google
is overriding declared canonicals on a thousand pages.

## 3. What the traffic actually is

Top queries:

| Query | Clicks | Impressions | CTR |
|---|---|---|---|
| ingenious targeting laboratory | 119 | 242 | 49% |
| conditional mutation | 12 | 439 | 2.7% |
| cre-ert2 | 9 | 261 | 3.4% |
| **point mutation** | **5** | **17,228** | **0.03%** |
| point mutation example | 5 | 1,406 | 0.4% |
| conditional alleles | 5 | 117 | 4.3% |
| point mutations | 4 | 3,166 | 0.1% |
| types of point mutations | 4 | 1,792 | 0.2% |
| conditional mutations | 4 | 163 | 2.5% |
| conditional mutants | 4 | 117 | 3.4% |

Top pages:

| Page | Clicks | Impressions |
|---|---|---|
| `/` | 205 | 2,277 |
| `/mouse-genetics-glossary/tamoxifen-inducible-cre/` | 128 | 22,932 |
| `/ingenious-blog/what-is-a-point-mutation/` | 85 | **67,963** |
| `/ingenious-blog/point-mutation-diseases/` | 78 | 3,950 |
| `/ingenious-blog/top-5-lab-mouse-colony-management-software-options-for-2023/` | 61 | 5,606 |
| `/mouse-genetics-glossary/c57bl6j-vs-c57bl6n/` | 57 | 7,568 |
| `/mouse-genetics-glossary/inducible-cre-ert2/` | 52 | 5,851 |
| `/ingenious-blog/conditional-mutation/` | 52 | 3,335 |
| `/tamoxifen-inducible-cre/` | 41 | 9,831 |
| `/ingenious-blog/difference-between-knock-in-and-knockout/` | 38 | 9,224 |

**Every page in the top ten except the homepage is a glossary entry or a blog
explainer.** The queries behind them — "point mutation", "types of point
mutations", "difference between knock-in and knockout" — are people looking up
definitions, largely students. They are not sourcing a mouse model.

The only query converting properly is the brand name, at 49% CTR.

## 4. The APOE answer

The brief that started this engagement was "why don't we rank for APOE".

| Query | Clicks | Impressions |
|---|---|---|
| apoe knockout mice | 0 | 2 |
| apoe knockout mouse | 0 | 2 |
| **Total** | **0** | **4** |

Average position **25.5**.

You do not rank for APOE because you are not in the running: page three, four
impressions in a quarter, no clicks. This is the "no impressions at all"
branch, which means a relevance and authority problem rather than a titles or
snippets problem. Fixing the inventory so the hub could display its own models
was necessary and did not address this.

## 5. The correction: the catalog is not dead weight

Earlier documents recommended noindexing the thin tiers, on the structural
argument that 8,061 templated humanized pages were suppressing the site.
**That recommendation is withdrawn.** The data contradicts it.

| Segment | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| Whole site | 3,900 | 475,000 | 0.8% | 9.7 |
| `/all-catalog-mouse-models/` | **2,440** | 148,000 | **1.6%** | 10.5 |
| `…/humanized/` | 234 | 17,700 | 1.3% | 9.4 |

The catalog delivers **63% of all site clicks** at double the site-wide CTR.
Noindexing it would have removed most of the organic clicks the site earns.

The humanized tier is weaker but not dead: 234 clicks across roughly 8,061
indexable pages, at position 9.4 — the edge of page one. For scale, the single
blog post `/ingenious-blog/what-is-a-point-mutation/` earns 85 clicks on its
own, about a third of what the entire humanized tier produces.

So the thin-content concern was pointed at the wrong target. The 33,527 URLs
Google has already refused are the safe thing to prune; the pages earning
clicks are not.

## 6. What this means for the four-week test

The test design changes, because the diagnosis changed.

| Hypothesis | Status after this baseline |
|---|---|
| The APOE hub loses on click-through | **Rejected.** 4 impressions at position 25.5 — it is not surfaced |
| Templated pages suppress the site | **Unproven, and partly contradicted.** The catalog is the main click driver |
| Crawl budget is being spent on low-value URLs | **Supported.** 24,345 discovered-not-crawled |
| CTR is the binding constraint, fixable with titles | **REJECTED — see §6b** |

## 6b. The CTR recommendation, tested and struck

An earlier version of this file said title and snippet work on the
high-impression pages was "the largest available win". **That was wrong, and
it was challenged and then tested on 2026-11-10 rather than argued.** Position
data per query and per page was missing from the first read; with it, the
recommendation collapses.

Two explanations for a 0.8% CTR were in play: the pages rank far below what the
site average implies, or the SERPs are zero-click. Position data settles it.

| Query | Impressions | Clicks | Position | CTR |
|---|---|---|---|---|
| point mutation | 17,228 | 5 | **9.3** | 0.029% |
| point mutations | 3,166 | 4 | 9.3 | 0.126% |
| types of point mutations | 1,792 | 4 | **5.9** | 0.22% |
| point mutation example | 1,406 | 5 | **5.4** | 0.36% |
| conditional mutation | 439 | 12 | 2.9 | 2.7% |
| ingenious targeting laboratory | 242 | 119 | 1.0 | 49% |

**Positions are fine.** 5.4 and 5.9 are top-of-page-one. A position-5 listing
normally earns 5–7%; these earn 0.2–0.4%. The ranking explanation is rejected.

The page view makes it sharper still:

| Page | Impressions | Clicks | Position | CTR |
|---|---|---|---|---|
| `/` | 2,277 | 205 | 8.5 | **9.0%** |
| `/ingenious-blog/point-mutation-diseases/` | 3,950 | 78 | 6.7 | 1.97% |
| `/ingenious-blog/what-is-a-point-mutation/` | 67,963 | 85 | 8.2 | **0.125%** |
| `/mouse-genetics-glossary/tamoxifen-inducible-cre/` | 22,932 | 128 | 6.0 | 0.56% |

The homepage earns **9% at position 8.5**. The site converts perfectly well at
that depth. `what-is-a-point-mutation` earns 0.125% at a near-identical
position 8.2 — roughly 70× worse on the same site. And `point-mutation-diseases`
earns a normal 1.97% at position 6.7, on the same topic, from the same blog.

So the anomaly is **query-specific, not page-specific**. No title rewrite
explains a 70× gap between two pages of the same site at the same position.

**The SERPs confirm why.** Checked directly:

- **"point mutation"** — AI Overview with a full definition and a "Types of
  Point Mutations" breakdown, a knowledge panel, a six-image block, then People
  Also Ask. Organic results sit beneath all of it. The AI Overview cites the
  National Human Genome Research Institute and ScienceDirect.
- **"tamoxifen inducible cre"** — same shape. AI Overview on top, and the first
  visible organic results are **Nature** and **The Jackson Laboratory**. ITL's
  page is at 6.0, below both and below the fold.

The question is answered before a user ever reaches an organic listing. Titles
and meta descriptions cannot fix that; they change the appearance of a listing
nobody scrolls to.

**Struck, not deferred.** Do not spend the four weeks on it and do not measure
it at week 4. Credit for the challenge goes to the competitive-audit session,
which identified the missing position data and named the zero-click SERP as the
likely cause before any of it was measured.

Two things follow. First, on these queries the only remaining prize is being
*cited in the AI Overview*, which the sources above suggest goes to
institutional authority (NHGRI, Nature, JAX) — an authority problem, not a
markup one, consistent with `seo-aeo-schema-framing-2026-11.md`. Second, and
more important: even a tripled CTR here would have delivered students looking
up a definition. The catalog's 2,440 clicks are buyer-adjacent and the brand
query converts at 49%; definitional traffic is the largest *traffic* win
available and close to the smallest *revenue* win. A 300% traffic increase that
moves no quotes reads as success in a report and failure in the pipeline.

## 6b-ii. A cannibalisation claim, tested and rejected — and what it found instead

The competitive-audit session read the page table and proposed that the
glossary entry was cannibalising the service page on a commercial term:

| Page | Impressions | Clicks | Position |
|---|---|---|---|
| `/mouse-genetics-glossary/tamoxifen-inducible-cre/` | 22,932 | 128 | 6.0 |
| `/tamoxifen-inducible-cre/` | 9,831 | 41 | 6.6 |

A reasonable read of page-level totals, and it does not survive the query-level
check. Filtering to the query **"tamoxifen inducible cre"** itself:

| Page | Impressions | Clicks | Position |
|---|---|---|---|
| `/tamoxifen-inducible-cre/` (the service page) | 105 | 0 | **5.3** |
| `/mouse-genetics-glossary/tamoxifen-inducible-cre/` | 42 | 0 | 13.2 |

**Google picks the service page, by eight positions.** There is no
cannibalisation on that query. The glossary page's 22,932 impressions come from
a different family — `creert2`, `creert2 system`, `cre ert2 system`,
`tamoxifen cre`, `creert2 tamoxifen inducible recombination review` — 98
reported queries plus a long anonymised tail. The lesson is procedural: page
totals aggregate across queries, so a page-level comparison cannot support a
query-level claim. Do not consolidate these two pages.

**What the check found instead is worse than cannibalisation.** On
"tamoxifen inducible cre" the service page holds **position 5.3 and earns 0
clicks from 105 impressions**. That is a commercial query — a researcher
scoping an inducible system, which ITL sells — and the AI Overview answers it
before any organic listing. The glossary page's technical queries show the same
shape: positions 4.1 to 8.6, CTR at or near zero.

So the suppression established in §6b is **not confined to definitional
queries**. It reaches the buying terms too. This closes off the easy reading of
§6b — that the site merely attracts the wrong audience — and replaces it with a
harder one: ITL ranks on page one for the right queries and earns nothing from
them, because the SERP resolves the question above the fold.

## 6c. What to watch instead

Re-measure these exact figures at week 4:

1. **Commercial-term absence, which is the real pattern.** APOE at 4
   impressions and position 25.5 is not an anomaly — it is what the site looks
   like on every buying term. 475K impressions and the only high-converting
   query is the company's own name. The competitive audit found ITL missing
   from high-intent humanized and antibody-target queries while holding 1,620
   Target-Humanized models, 578 of them live. Both reads agree: the site is
   visible on definitional terms and absent on commercial ones.
2. **"Discovered – currently not indexed" (24,345).** If it falls, crawl budget
   is being recovered. If it rises, the footprint is still growing faster than
   Google will take it.
3. **Cre driver and tissue cluster.** 67 pages were orphaned until 2026-11-10;
   this is the clean before/after in the whole engagement.
4. **Catalog clicks (2,440).** The floor to protect. Any pruning that moves this
   number down is a loss, whatever it does to indexing counts.
5. **APOE position (25.5).** Not expected to move in four weeks. If it does,
   something larger changed.

## 7. How to reproduce

Search Console → property `sc-domain:genetargeting.com`. Performance report,
3-month window. Segment filters used:

- catalog: page filter, URL contains `all-catalog-mouse-models`
- humanized: page filter, URL contains `/humanized/`
- APOE: query filter, query contains `apoe`

Indexing figures: Indexing → Pages, "Why pages aren't indexed" table.
