# Search visibility: own-site audit + competitor scan

**Date:** 2026-11-10
**Scope:** genetargeting.com search visibility, following the APOE investigation.
**Method:** production site read live; catalog read from Supabase; five competitor
scans run in parallel against live pages. Figures are measured, not estimated.
Where a claim could not be verified it is marked as such.

> Durable record of work done across two sessions ("APOE search visibility
> research" and its fork). Written to the repo because scratchpad files are
> session-scoped and would be lost on archive.

---

## 1. The question

Does keying the site on *gene × modification* under-serve how scientists
actually search? The concern as put: "most scientists imagine how they need it
in the mouse for their research", so "gene" may be too simple a description.

**Answer: half right, and the half that is wrong is good news.**

---

## 2. Measured shape of the site

Sitemap composition (26,366 URLs):

| layer | URLs | share |
|---|---|---|
| catalog root | 1 | — |
| `/gene/<gene>/` | 10,033 | 38.0% |
| `/gene/<gene>/<modification>/` | 15,734 | 59.7% |
| `/gene/<gene>/<mod>/<tissue>/` | 51 | **0.2%** |
| non-catalog (editorial/service) | 547 | 2.1% |

97.7% of indexed URLs are gene × modification. The experiment-shaped axis
(tissue, Cre driver) is 51 URLs.

`llms.txt` lists 743 URLs, **738 of them gene-grid (99.3%)**. Zero cre-lines,
zero cre-drivers, zero tissue-specific, zero humanized-checkpoint, zero
antibody-therapeutics. The one file published to tell an AI what the site *is*
describes it as nothing but a gene grid.

### But the intent layer already exists

All live and indexable: `/tissue-specific-knockout/`,
`/tissue-specific-cre-lines/`, `/tamoxifen-inducible-cre/`,
`/inducible-conditional-knockout/`, `/inducible-gene-expression/`,
`/inducible-rosa26/`, `/reporter-knockin/`, `/reporter-selection-guide/`,
`/reporter-mouse-catalog/`, `/cre-line-selection-guide/`,
`/critical-exon-selection/`, `/loxp-site-design/`,
`/lineage-tracing-mouse-models/`, `/cre-lox-system/`, `/flp-frt-system/`,
`/conditional-knockout-cohort-breeding/`, `/mouse-strain-backgrounds/`,
`/cre-lines/<tissue>/` (28 in sitemap), `/cre-drivers/<driver>/` (39 in sitemap).

So the problem is not missing topics.

---

## 3. Product line

18,540 catalog models, **~3,050 live**.

| model_type | models | live | genes |
|---|---|---|---|
| Knockout | 9,297 | 629 | 8,187 |
| Conditional Knockout | 5,982 | 1,328 | 5,853 |
| Knockin | 1,543 | 486 | 787 |
| Humanized | 1,127 | 422 | 980 |
| Xenograft-Applicable | 503 | 155 | 384 |
| Transgenic | 64 | 13 | 47 |
| Immunodeficient | 14 | 9 | 13 |

Application axis (`category`), i.e. the "how I need it" dimension:

| application | models | live |
|---|---|---|
| KO | 9,363 | 659 |
| CKO | 6,103 | 1,347 |
| Target-Humanized | 1,620 | 578 |
| **Cre/Dre Toolbox** | **850** | **303** |
| Disease Model | 820 | 194 |
| **Fluorescent Model** | **524** | **147** |
| Overexpression | 374 | 122 |
| Point Mutation | 265 | 78 |
| Immunodeficient (category) | 141 | 65 |
| Random Transgenic | 96 | 32 |

850 Cre/Dre toolbox and 524 fluorescent lines are exactly what experiment-shaped
searches want.

---

## 4. The strategic finding

**No competitor has the intent layer, and the market leader deliberately keeps
its grid thin.**

- **Taconic** has 4,605 gene × modification pages — the equivalent of our
  15,734 — and keeps them minimal: model number, MGI link, "Inquire for
  genotype", an empty Deliverables heading, a disclaimer that knockout status
  cannot be guaranteed, one CTA, no price, no figures. All conversion machinery
  (figures with n-values, decision tables, published prices, guarantees,
  experiment-shaped FAQs) sits on ~60 portfolio/platform pages above the grid.
- **JAX** has 1,500 Cre strains reachable only through a JS app on
  `mice.jax.org` with no `href`s, on a subdomain that drops query strings. Their
  working sitemap contains **zero** `/strain/` URLs; both sitemaps declared in
  `robots.txt` return 404.
- **Charles River** conditional/Cre content is ~8.5 years old. No reporter,
  lineage-tracing, tamoxifen or tissue-Cre page. ~130–150 off-the-shelf models
  total (4 genetically engineered).
- **Cyagen** has no tissue page, no inducible-Cre page, and never writes
  "floxed".
- **GemPharmatech** has no inducible-Cre page and no reporter page.
- **genOway** has no exon-selection, cost, timeline or conditional-vs-conventional
  page — design is punted to a sales call.
- **Ozgene** asks "What part of the gene should we flox?" and never answers.

**Implication:** the work is deepening roughly fifteen pages we already own, not
rebuilding 26,000. We already hold `/critical-exon-selection/` and
`/cre-line-selection-guide/`, which both named custom competitors have
explicitly declined to write.

---

## 5. Where we are genuinely losing

1. **Humanized / antibody drug development — the highest commercial-intent
   class, and we are absent.** Not ranking for "humanized mouse model for
   antibody testing", "humanized PD-1 mouse", "humanized target bispecific".
   GemPharmatech, Biocytogen, CrownBio, JAX and genOway all rank. We hold 1,620
   Target-Humanized models (578 live).
   Competitors win with *data*: dosing schedules, day numbers, TGI figures,
   named clinical comparators (trontinemab vs lecanemab; pembrolizumab and
   atezolizumab analog tumour-growth curves on the model page itself).
2. **No modality layer.** Biocytogen ships seven (`/product/adc`,
   `/bispecific-antibodies`, `/cell-therapy`, `/gene-therapy`, `/oligonucleotide`,
   `/vaccine`, `/small-molecule`). Taconic ships **none** — so this space is only
   partly contested.
3. **No published numbers.** Ozgene headlines "Fastest 20 wk; Average 29 wk" on
   its own URL and backs its germline claim with a mechanism (100% ES-cell-derived
   offspring), a figure (88% germline in month one, ISTT2019) and a record ("all
   projects to date"). Cyagen publishes 6–8 vs 10–14 months. We publish neither a
   timeline nor evidence for our 100% germline claim.
4. **Inventory status invisible.** We know which 3,050 are live. GemPharmatech
   monetises this with a site-wide "In Stock. Ready to Ship" badge; Cyagen and
   Taconic expose it as a filter.
5. **No per-paper publication layer.** genOway 693 URLs, Ozgene ~635, each one a
   page. Ours is an aggregate "800+" claim.
6. **Intent facets.** Biocytogen's catalog filters include Drug Types, "Cell Types
   Targeted by Drugs" (T cells, Tregs, macrophages, ILC3) and "Target Molecule
   Types" (GPCR, chemokine, immune checkpoint, integrin) — a scientist finds a
   model *without knowing a gene name*. That is the thesis made operational, and
   it is a product feature, not content.

### Our strongest uncontested asset

Our 100% germline transmission guarantee is the strongest claim of the three
custom vendors — Biocytogen publishes no guarantee and no turnaround at all — and
it has no dedicated page stating scope and remedy.

---

## 6. Defects verified on production

| # | defect | evidence |
|---|---|---|
| 1 | `/cre-drivers/` returns 404 while 39 children are sitemapped | orphaned cluster; `/cre-recombinase-mice/` exists but links **zero** of them |
| 2 | `/cre-lines/` returns 404 while 28 children are sitemapped | same |
| 3 | Case-variant duplicates self-canonicalise | `/cre-drivers/alb-cre/`, `/Alb-Cre/`, `/ALB-CRE/` all 200, identical content (md5 `9d81a0a739a1`), **each declaring itself canonical**. Same on `/cre-lines/<tissue>/`. Affects 41 drivers + 21 tissues; any casing works, so the duplicate space is unbounded |
| 4 | Intent pages render zero inventory | `/reporter-mouse-catalog/` 0 SKUs (147 live fluorescent exist); `/tissue-specific-cre-lines/` 0 (303 live); `/tissue-specific-knockout/` 0 (1,328 live) |
| 5 | 25 `/legacy/` pages indexable with no canonical tag | `/legacy/` itself 404s; `/legacy/conventional-knockout-mouse-models/` is 2,097 words, indexable, no canonical |
| 6 | Homepage has no canonical tag | also `/tigit-humanized-mice/` |
| 7 | Tier 4 tissue pages are shells | `/gene/Trp53/conditional-knockout/liver-specific/` says "liver" **once**, "Alb-Cre" **zero** times. `rationaleForModTissue()` is an 18-line template interpolating the tissue name |
| 8 | Keyword cannibalisation on our strongest query | 6 live pages on "conditional knockout vs conventional knockout" (751/972/1,522/1,672/1,801/2,097 words), all indexable, all self-canonical. **We hold all 10 results** |
| 9 | Pricing page publishes no prices | `/custom-mouse-model-pricing/` indexable, ranks, shows no figures, while university cores publish real numbers (MUSC $7,500 KO / $13,500 cKO; Münster €10,600/€20,100) |
| 10 | Fabricated human-ortholog claims on 8,060 indexable pages | `gene.human_ortholog_symbol` is the mouse symbol uppercased for **8,072 of the 8,073** rows that carry it (exactly **1** real ortholog in 11,105 rows). `typeSpecificNote()` printed it as "Human ortholog R26 guides humanization design" / "Human ortholog PD …" — a scientific claim, to geneticists, that was false by construction |

Our deep content is excellent but scarce: `geneModNotes.ts` (380 lines) names
Pdx1-Cre, p48-Cre, K14-Cre, WAP-Cre, GFAP-Cre for Trp53 conditional, warns that
Cre itself triggers a p53 damage response so Cre-only littermates are mandatory,
and specifies Cdkn1a/Mdm2 readouts. It covers ~10–15 of 15,734 gene × mod pages.
`rationaleSnippets.ts` — the tissue axis — is 18 lines.

---

## 7. Recommendations *against*

These are corrections to recommendations that came back from the scans.

- **Do not consolidate the conventional-vs-conditional cluster yet.** One scan
  called it "the cheapest win". We hold all ten results for that query; merging
  six pages risks exactly the traction being protected. Needs Search Console
  first. (It is cannibalisation, not duplication — all six have distinct content
  — so the fix is canonical/consolidation strategy, not dedup.)
- **Do not build per-model pages at scale.** Named as the single biggest gap by
  one scan, and structurally correct — JAX's whole commercial surface is
  `/strain/{stock}` and we have no `/model/CKO-220617`. But only **70 of 18,540**
  models have 50+ word descriptions (5 have 120+; mean is 19 words). At 3,050×
  that manufactures thin content — the same failure that got the humanized tier
  noindexed. **The blocker is data, not code.**
- **Do not chase xenograft / immunodeficient host strains.** We do not own
  NSG/NOG/NCG inventory; that is competing on someone else's product.
- **Do not force humanized APOE4 / Alzheimer's.** MODEL-AD consortium plus
  patents own it.

### A second honesty item: what the ortholog fix traded

Commit `88b7454c` stopped the false claim by gating it behind
`hasRealHumanOrtholog()`. That is the right call — removing a fabricated
scientific claim from 8,060 indexable pages beats keeping it — but the commit
message's "no existing content rewritten" is **wrong**, and the trade should be
stated plainly rather than buried.

Measured on `gene_type_page` (model type `humanized`): **10,125** rows,
**8,061** indexable. Of those, **8,060** previously rendered the false ortholog
sentence and **1** carries a genuine ortholog. The replacement paragraph
interpolates nothing, so:

> ~8,060 near-duplicate sentences (varying only by the interpolated symbol)
> became ~8,060 **byte-identical** ones.

That is a net improvement in truthfulness and a net *worsening* in
distinctiveness. It is acceptable only because the prior text was boilerplate
too. What it actually exposes is the real finding:

**8,061 indexable pages of templated humanized copy exist at all.** That is the
same thin-content pattern section 7 argues against scaling to per-model pages —
except it is already shipped. No wording change fixes it; either those pages
earn distinct content (ITL-supplied design detail per target) or the tier's
indexability should be revisited. Decide it on Search Console data: if the tier
earns no impressions, 8,061 identical paragraphs are a liability, not an asset.

Credit: this correction came from the APOE search-visibility session
reviewing the commit on production, not from the session that wrote it.

### An honesty item

"Humanized" means two different products. Ours is gene humanization. Taconic and
Biocytogen also sell human-cell engraftment (huNOG-EXL, huPBMC, NeoThy) with
donor selection, chimerism QC thresholds, study windows and published risk
allocation. If we do not offer that, the pages should say so rather than letting
"Humanized 1,127" imply it.

---

## 8. Staged plan

Ordered by blast radius. Each stage is reversible and testable before the next.

**Stage 0 — repair only. Nothing retitled, removed or redirected; cannot cost a ranking.**
1. Normalize the canonical on `/cre-drivers/<driver>/` and `/cre-lines/<tissue>/`
   so case variants stop self-canonicalising
2. Link the 41 driver and 21 tissue pages from the existing
   `/cre-recombinase-mice/` hub, parenting the orphans *without* adding a
   competing hub page
3. Resolve the `/cre-drivers/` and `/cre-lines/` 404s
4. Add canonical tags where missing (25 `/legacy/` pages, homepage)
5. Add the experiment layer to `llms.txt`

**Stage 1 — wire inventory into pages that already rank. Additive only.**
Reporter catalog → 147 live fluorescent lines; tissue-specific Cre → 303 live;
tissue-specific knockout → 1,328 live. Live badging. Assert the catalog total.

**Stage 2 — deepen what competitors declined to write.**
`/critical-exon-selection/` as the definitive cited answer; use-when/avoid-when
tables and references on `/cre-line-selection-guide/`; real tissue × driver
content replacing the template. Published timelines and germline evidence —
**numbers must come from ITL.**

**Stage 3 — measured expansion, after 1–2 show movement.**
Immunodeficient/xenograft comparison page; more Tier 4 combos.

**Stage 4 — blocked on ITL data.**
Modality pages (CAR-T, ADC, TCE, checkpoint) and per-target humanization need
real dosing/TGI figures. MGI gene-axis import last — it touches identity of
~26,000 URLs.

---

## 9. The MGI gene-reference question

There is no gene authority in the database: `mgi_id` NULL for all 11,105 rows,
`name` NULL for all, `synonyms` empty, and `human_ortholog_symbol` is
`upper(symbol)` for 8,072 of 8,073 — so `R26`→"R26" and `Pd`→"PD" rendered as
"Human ortholog R26 guides humanization design" on live pages.

Measured against MGI's own files (`MRK_List2.rpt`, 656,606 official markers,
258,827 synonyms; `HOM_ProteinCoding.rpt`, 16,537 one-to-one orthologs):

- 9,495 of 11,005 catalog gene_names (86.3%) are already official MGI symbols —
  **their URLs would not change**
- 193 (1.8%) resolve only via a synonym — this is the URL churn, roughly 400–500
  URLs, *not* the ~26,000 first estimated
- 1,317 (12.0%) have no MGI match, and are not genes: 1,196 humanized product
  strings, 451 crosses with "/", 345 with parentheses, 64 others (`CAG`, `pAlb`,
  `pThy1`, `HLA`, `huPBMC`, `huHSC`) — promoters, transgenes and engraftment
  platforms. **They are products, which is exactly the catalog-vs-gene
  distinction.**

MGI resolves the cases previously flagged as needing human judgement:
`Rosa26`→`Gt(ROSA)26Sor`, `PD-1`→`Pdcd1`, `PD-L1`→`Cd274`, `4-1BB`→`Tnfrsf9`,
`CTLA-4`→`Ctla4`, `TDP-43`→`Tardbp`.

It also catches deprecated symbols in our own curated SEO: **`Tmem173`→`Sting1`**
and **`Gba`→`Gba1`**.

Ortholog repair: of 8,072 fabricated claims, MGI supplies a real ortholog for
7,316 and correctly supplies none for 756.

**Refresh is automatable.** `MRK_List2.rpt.gz` sits at a stable URL and returns
`ETag` and `Last-Modified`, so a weekly conditional GET re-imports only on
change. MouseMine (InterMine) is live for queries. **License: CC-BY 4.0** —
commercial use and redistribution permitted, **attribution required**.

---

## 10. What this analysis cannot settle

- **No traffic data.** Every finding here is structural. Before any consolidation
  or retitling, Search Console is needed to show which page in a cannibalised
  cluster earns the clicks.
- **SERP findings used a web-search tool, not Google.** No true positions, no
  search volumes, no SERP features; the `site:` operator was ignored. Result
  *composition* (which page types and vendors exist in a space) is informative;
  rank claims are not.
- **Charles River blocks automated access** (Cloudflare 403). Their findings come
  from `emodels.criver.com` and search snippets, so page-anatomy detail is
  thinner and partly inferred.
- **PolyGene could not be read** — every page returns HTTP 200 with a zero-length
  body. Findings are from sitemap structure only. **Applied StemCell has exited
  mouse models** entirely (its TARGATT page no longer mentions mice).
