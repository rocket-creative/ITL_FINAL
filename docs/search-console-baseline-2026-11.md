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
| CTR is the binding constraint | **Supported.** 0.8% on 475K impressions |

Re-measure these exact figures at week 4. The specific things to watch:

1. **CTR on the glossary and blog pages.** This is the largest available win
   and needs no new content: 475K impressions at 0.8%. Title and snippet work
   on the ten pages above would move more than anything shipped in this
   engagement.
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
