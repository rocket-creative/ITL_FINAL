# SEO / AEO / schema: what moves the needle, and what we changed

Written 2026-11-10. Covers the state of play as of Google's May 2026 guidance,
what was implemented in this pass, and how to run a four-week test that can
actually be read.

---

## 1. The premise, corrected

The brief for this pass was "schema is big." The evidence does not support
that, and building on the assumption would waste the four weeks. Setting it out
plainly first, because every decision below follows from it.

**Schema has never been a ranking factor.** It makes a page *eligible* for a
rich result. A rich result changes how a listing looks, which affects
click-through rate — not position.

**Most of the rich results are gone.**

| Type | Status |
|---|---|
| FAQPage | Limited to government/health sites Aug 2023; **stopped showing entirely 7 May 2026** |
| HowTo | Removed desktop and mobile Sept 2023; no surface as of May 2026 |
| Book Actions, Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing | Retired June 2025 |

This site carries **14 `FAQPage` blocks and 1 `HowTo`**. As of May 2026 they
produce no search feature at all. They are not harmful and the questions are
real visible copy, so they stay — but they are not an asset, and adding more is
not work.

**Google's own May 2026 guidance says AEO and GEO are just SEO.** It states
explicitly that you do *not* need AI-specific markup, you do *not* need to
chunk content for AI systems, and you do *not* need `llms.txt` or AI text
files. We shipped an `llms.txt` expansion on 2026-11-10 (commit `88b7454c`). It
is harmless, and it may help non-Google answer engines, but it should not be
counted as SEO work.

**Adding schema did not increase AI citations.** A May 2026 study found no
measurable lift in AI Overview citations from adding JSON-LD to pages already
surfacing there. A Trakkr analysis found schema *types* do not predict citation
volume; content quality and structure do.

So: schema hygiene is worth keeping clean, and it is cheap. It is not the lever.

---

## 2. What the evidence actually supports

Caveat up front: most of the figures below come from vendors with products to
sell, and they disagree with each other. Treat them as directional, not as
numbers to plan against. The one academic source is flagged.

- **Answers belong in the top third of the page.** CXL's analysis of 100 AI
  Overview citations found 55% came from the first 30% of the source page; a
  2026 SparkToro figure puts it at 44%. This is the most consistent finding
  across sources.
- **Structured formats get cited more.** Lists, tables and step sequences are
  reported at ~2.5× the citation probability of paragraph-only content.
- **Embedded statistics help.** +22% citations for passages carrying figures
  (Aggarwal et al., KDD 2024 — the one peer-reviewed source in this list).
- **Off-site presence dominates.** Muck Rack's analysis of 1M+ prompts found
  **over 85% of non-paid AI citations come from earned media**. SE Ranking
  reports 3× ChatGPT citation odds for domains with third-party profiles.
- **Ranking and citation are decoupling.** AI Overview citations overlapping
  the top-10 organic results fell from 76% (late 2024) to 38% (early 2026)
  — Ahrefs, via Search Engine Journal.
- **Citations are unstable.** AI Overview content changes ~70% of the time for
  the same query (Ahrefs). This matters enormously for the test design in §5.

The uncomfortable implication: the single largest lever — earned media and
third-party presence — is not a code change. It is PR, publication credit, and
getting listed where researchers look. Nothing in this repo can move it.

---

## 3. What this site already had

Worth stating, because the prior work was better than a fresh audit assumes:

- One canonical `Organization` node emitted once in the root layout, with
  pages referencing it by `@id`. NAP single-sourced in `src/lib/seo/organization.ts`.
- A `WebSite` node with `SearchAction`.
- `BreadcrumbList` across the catalog tiers.
- An answer-first AEO lead on gene × modification pages
  (`GeneModAiAnswerLead`) — question H2, direct answer sentence, fact strip.
  This is exactly what §2's first bullet asks for, already shipped.
- A 22KB JSON-LD auditor (`scripts/audit-schema.mjs`) with a static and an
  `--html` mode, gating on errors. It reported **0 errors, 19 warnings**.

## 4. What changed in this pass

Ranked by what I actually expect from each.

**1. A citation graph from 713 real publications.** `src/lib/seo/citationSchema.ts`
converts `publicationsData.ts` records into `ScholarlyArticle` nodes carrying
journal, year, author list and **PMID**, keyed by PubMed URL so one paper is
one node across every page citing it. Wired into the build-inquiry graph and
the catalog gene pages, drawing on the same `getGeneMatchedPublications` array
those pages already render visibly — schema may only describe visible content.

This is the one genuinely differentiated asset on the site: 713 peer-reviewed
papers citing ITL-generated models, previously invisible to anything parsing
the page. Nothing is generated; a paper with no stored link emits no `url` and
no identifier, because inventing a citation ID is worse than omitting one.

**2. Entity consolidation.** The build-inquiry `Service` node re-declared
`Organization` inline as `provider` rather than referencing `ORG_ID`. Across
the repo there were **112 `Organization` declarations**. Now `organizationRef`.

**3. Stable `@id`s** on `Service`, `BreadcrumbList`, `FAQPage` and a new
`CollectionPage` anchor on catalog gene pages, which previously emitted a bag
of `Product` nodes with nothing saying what the page was about.

**4. A rendered breadcrumb on `/mouse-breeding-services/`.** `metadata.ts` had
exported `breadcrumbSchema` since the page was written and the page never
rendered it. Breadcrumb is one of the types Google still displays.

**5. FAQ's dead status documented in code,** so nobody counts it as a win or
adds more.

### What I deliberately did not do

- **No new FAQ or HowTo markup.** No surface shows it.
- **No `llms.txt` expansion.** Google says it is not needed.
- **No `Product` price or availability.** Product rich results require them and
  the catalog has neither. Fabricating prices to earn a rich result would be
  both wrong and a policy violation.
- **No author or reviewer bylines.** There is a `TODO(byline)` in
  `mouse-breeding-services/page.tsx` waiting on Ops to assign a named PhD
  scientist and reviewer date. **This is the largest remaining E-E-A-T gap on
  the site** and it cannot be closed in code — it needs a real named person
  with real credentials. Inventing one would be fabrication.

---

## 5. The four-week test

### The blocking problem

**RESOLVED 2026-11-10.** Search Console was read; the baseline is in
`search-console-baseline-2026-11.md`. Up to that point everything in this
document and the 2026-11 audit was structural inference from reading code and
crawling pages.

It was going to distinguish two possible APOE diagnoses:

- the hub gets impressions and loses on click-through → a titles/snippets problem
- the hub gets no impressions at all → a relevance or authority problem

**It is the second.** APOE queries draw 4 impressions and 0 clicks at average
position 25.5 over three months. The hub is not surfaced, so no amount of
snippet work reaches it.

The site-wide picture is the opposite, and is where the opportunity is: 475,000
impressions at 0.8% CTR. Visibility exists and is not converting — just not on
the pages or the queries this engagement was aimed at.

### Four weeks is short, and partly the wrong instrument

- **Schema validity**: visible in days. Legitimate read.
- **Ranking movement**: 4–12 weeks on a site this size. Four weeks is the
  earliest edge, so a null result means nothing.
- **AI citations**: ~70% volatility for the same query. A four-week citation
  read is mostly noise. If you track it, track presence/absence across many
  queries repeatedly, never a single check.

### What to measure

| Metric | Source | Expect by week 4 |
|---|---|---|
| Breadcrumb / Organization valid items | GSC Enhancements | Improvement, incl. `/mouse-breeding-services/` |
| `ScholarlyArticle` parses cleanly | Rich Results Test | Valid, no rich result (none exists for it) |
| Impressions + position, Cre driver/tissue cluster | GSC | **Most likely real movement** — these 67 pages were orphaned until `88b7454c` linked them |
| Impressions + position, catalog gene hubs | GSC | Flat to slightly up |
| APOE query set | GSC | Probably flat. See below. |
| Indexed page count | GSC Pages | Watch for *drops*, not gains |

### The honest forecast

The schema work will show up as valid enhancements and little else. The change
most likely to move rankings is not in this pass at all — it is the internal
linking of the 67 orphaned Cre pages shipped in `88b7454c`.

**WITHDRAWN.** This section argued that 8,061 templated humanized pages were
holding the site back, and recommended noindexing the thin tiers. Search
Console was read on 2026-11-10, after this document was written, and
contradicts it — see `search-console-baseline-2026-11.md`.

The catalog delivers 2,440 of the site's 3,900 clicks at a 1.6% CTR against a
site-wide 0.8%. It is the main click driver, not dead weight. The humanized
tier is weaker but alive: 234 clicks at position 9.4.

What Google does report is 24,345 URLs "Discovered – currently not indexed" and
9,182 "Crawled – currently not indexed". Those 33,527 are the safe pruning
target; pages earning clicks are not.

The binding constraint is not indexing at all. It is **475,000 impressions
converting at 0.8%**, on definitional queries answered by glossary and blog
pages. That is a titles, snippets and positioning problem, and it is larger
than anything in this document.

---

## Sources

- [Schema & Rich Result Deprecations: The Full Timeline](https://patrickstox.com/technical-seo/on-page/structured-data/schema-deprecations/)
- [Google Structured Data 2026: What Changed (FAQ, How-To Removed)](https://webwise.digital/blog/google-structured-data-guidelines-2026-update)
- [Google FAQ Structured Data Guidelines 2026: Rich Results Removed](https://www.elementera.com/blog/google-has-removed-faq-rich-results)
- [Every structured data type Google still rewards in 2026](https://spaceandstory.co/blog/structured-data-types-google-2026)
- [Structured Data After I/O 2026: Schema Cheat Sheet](https://www.digitalapplied.com/blog/structured-data-after-io-2026-schema-updates)
- [GEO and AEO are still SEO: get cited in AI Overviews](https://ecorpit.com/google-geo-aeo-still-seo-ai-overviews-citations-2026/)
- [Answer Engine Optimization (AEO): The comprehensive guide for 2026 — CXL](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/)
- [The State of AI Search in 2026: What the Data Actually Shows](https://geotoolbox.ai/blog/state-of-ai-search-2026)
- [Is AEO Measurable? What the 2026 Research Shows](https://www.jarredsmith.com/blog/is-aeo-measurable-what-the-2026-research-shows-about-tracking-ai-citations)
- [GEO, AEO, and SEO in 2026: enterprise guide to AI visibility — Writer](https://writer.com/blog/geo-aeo-optimization/)

Third-party blogs, not Google documentation. Verify against Search Central
before relying on any single figure.
