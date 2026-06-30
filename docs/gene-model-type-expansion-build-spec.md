# Gene × Model Type Expansion — Build Spec

**Site:** genetargeting.com
**Stack:** Next.js App Router, TypeScript strict, Tailwind, Supabase (Postgres + RLS), Vercel
**Build agent:** Cursor
**Status:** Implementation spec. Research and planning complete.

> **Primary objective: capture "{gene} {modification} mouse" search traffic and convert it into build inquiries.**
> The page identity and all on-page copy target the actual search term, which is gene plus modification type plus "mouse" or "mice" (for example "Trp53 conditional knockout mouse"). The conversion goal is an inquiry to the build pipeline.
>
> **Language policy, non-negotiable:** "custom" and "model" as a category are internal fulfillment classification, the Custom Models versus Catalog Models split in the nav. Researchers do not search those words. They are banned from H1s, title tags, section headings, and hero copy. Whether a given line is built to order or pulled from the shelf is plumbing the searcher does not care about. The page leads with the gene, the modification, and the science. The build capability is expressed through the offer and CTA, not by labeling the page "custom." ("mouse model" stays allowed in titles and body where it matches a real query; what is banned is highlighting "custom" or framing the page around the "Custom Models" classification.)

---

## 0. Read this first: what already exists

The `[gene] + [model type]` page the science team described is **already live on the catalog side**. Before building anything, understand the three layers that exist today, because this project extends them rather than replacing them.

**Layer 1 — Gene hub**
`/all-catalog-mouse-models/gene/{Gene}/`
Lists every catalog model for a gene, broken out by the model types that have catalog inventory. Links down to the type pages and tissue routes.

**Layer 2 — Gene × type**
`/all-catalog-mouse-models/gene/{Gene}/{model-type}/`
The exact `[gene] + [type]` page. Has a gene specific intro, a type rationale, a real catalog table, a gene plus type FAQ, related routes. This is the page that ranks for "Trp53 conditional knockout mouse."

**Layer 3 — Gene × type × tissue**
`/all-catalog-mouse-models/gene/{Gene}/{model-type}/{tissue}-specific/`
A third axis already firing for conditional knockout (liver, intestine, pancreas, heart, stem cell, etc.).

### The actual gap

Every Layer 2 and Layer 3 page is **catalog gated**. A type page generates only when the catalog holds a model of that type for that gene. Trp53 shows four type pages (conditional knockout, knockin, knockout, xenograft) because those four have inventory. It shows no reporter, humanized, tag, or point mutation type page even though every one of those is a real custom capability for Trp53.

So a researcher searching "Sox2 floxed mouse" or "Cftr humanized mouse" where there is no matching catalog line lands on nothing, or at best the bare gene hub.

### What this build does, in one sentence

Decouple the Layer 2 page from catalog inventory so a `{gene} {type} mouse` page generates for every modification a gene can support, point each page at a build inquiry as its conversion, and where catalog inventory happens to exist show it as proof and a faster path rather than the headline, all governed by a per gene eligibility gate that keeps thin pages out of the index.

This is a template extension, a generation rule change, and an additive awareness banner, not a parallel page system and not a rebuild of anything that works today. Note the internal term: generated pages are stored as `page_mode = build_inquiry`. That is build-side classification only. The word "custom" never reaches the rendered page.

The pages with no catalog match are not a fallback. They are the strategic core of this build. "Sox2 floxed mouse," "Cftr humanized mouse," the thousands of exact match long tail queries with no shelf product behind them, are precisely the demand this surface is built to capture.

---

## 1. Three template defects to fix in the new build_inquiry template

These exist on the live catalog pages today. Per the "do not touch the catalog pages" rule, we are not fixing them on the existing pages in this build. But the new build_inquiry template is cloned from the same shell, so fix them in the clone or the new pages inherit them.

(If you later want the existing catalog pages cleaned up too, that is a separate, approved backfill. Flagged, not assumed.)

**1.1 Unfilled tissue variable defaulting to "liver"**
On `/gene/Trp53/conditional-knockout/`, a `{{tissue}}` token falls through to a hardcoded "liver" default ("keeps liver as the experimental theater"). In the new template the tissue clause must render only when a tissue route is active, and be omitted entirely on the bare modification page.

**1.2 Duplicated rationale block**
The "Why this approach" paragraph renders twice on the live type page. The new template renders it once.

**1.3 "point mutantion" misspelling in the catalog category feed**
The string "point mutantion" appears in the category data. Add a normalization pass at ingest mapping `point mutantion` to `point mutation`, so any data the new pages read is clean. Fix at the ingest layer, not by hand.

---

## 2. Canonical model type taxonomy

The science team's list of 19 contains synonyms and parent/child pairs that will cannibalize each other if each becomes its own indexable URL. Collapse to the canonical set below. Synonyms become H2s, FAQ entries, and schema `alternateName`, not separate pages. Children either get their own pages or live as on page sections depending on the cross product risk noted in each row.

### 2.1 Canonical types (the per gene grid)

| Canonical slug | Display name | Absorbs / synonyms | Per gene page? | Eligibility gate |
|---|---|---|---|---|
| `knockout` | Knockout | constitutive, conventional, global, complete | Yes | All genes |
| `conditional-knockout` | Conditional Knockout | floxed, tissue specific, cKO | Yes | All genes |
| `inducible-knockout` | Inducible Knockout | CreERT2, tamoxifen inducible, Tet On/Off, doxycycline | Yes | Gene viable as conditional; default child of conditional |
| `knockin` | Knockin | targeted insertion (hub) | Yes (hub) | All genes |
| `point-mutation` | Point Mutation Knockin | single nucleotide, patient variant | Yes | Indexed only when pathogenic variant data exists (ClinVar/OMIM); otherwise custom-only, noindex |
| `cdna-knockin` | cDNA Knockin | coding sequence insertion | Yes | All genes (custom-eligible) |
| `humanized` | Humanized | gene humanization, gene replacement, partial humanization | Yes | Indexed only when human ortholog exists; gene humanization, NOT humanized immune system |
| `reporter` | Reporter | fluorescent and enzymatic reporters (hub) | Yes (hub) | All genes |
| `overexpression` | Overexpression / Safe Harbor | transgenic (targeted), Rosa26 payload, safe harbor insertion | Yes | Indexed when overexpression is a recognized use; merges transgenic + Rosa26 + safe harbor as payload at a locus |
| `cre-driver` | Cre Driver Line | gene-Cre, promoter driven Cre | Yes | Indexed ONLY for genes with cell type or tissue restricted expression. Housekeeping genes excluded |
| `tag-knockin` | Epitope Tag Knockin | HA, FLAG, Myc, V5 tag | Yes | All genes (custom-eligible) |

### 2.2 Reporter children — sections, not per gene URLs

Do **not** mint `gene × fluorophore` URLs. One gene times seven fluorophores is the fastest path to a doorway penalty. The reporter options render as on page sections and schema variants inside the single `/{gene}/reporter/` page:

GFP, YFP, RFP, mCherry, tdTomato, lacZ, luciferase.

Add lacZ and luciferase to the existing fluorophore set. They were missing and are heavily searched.

### 2.3 Cross cutting methods — technology hubs, not grid pages

These are recombination systems and loci that combine with the types above. They stay as single technology hub pages (already live), referenced by the grid pages as modifiers. They are not `gene × method` grid URLs.

- `cre-lox-system` (live)
- `flp-frt-system` (live, and the house specialty — make sure conditional and knockout type pages reference FRT derivative alleles in Zone 2)
- `rosa26` (live; per gene Rosa26 intent is captured by `overexpression`)

### 2.4 Net effect

The science team's 19 collapse to **11 canonical per gene types** plus the reporter hub's internal variants. The grid is `genes × 11`, gated per cell, not `genes × 19+` ungated.

---

## 3. URL grammar and canonicalization

### 3.1 Routes

Keep the existing namespace. Do not invent a `/custom/` tree. The page mode is decided by data, not by URL.

```
/all-catalog-mouse-models/gene/{Gene}/                      # hub (exists)
/all-catalog-mouse-models/gene/{Gene}/{canonical-type}/     # gene × type (extend)
/all-catalog-mouse-models/gene/{Gene}/conditional-knockout/{tissue}-specific/   # tissue (exists)
```

`{Gene}` uses MGI canonical symbol casing exactly as the catalog uses today (e.g. `Trp53`, `Gt(ROSA)26Sor`).

### 3.2 Synonym handling — 301, never duplicate

Synonym slugs must 301 to the canonical, so the same intent never has two indexable URLs:

```
/{gene}/constitutive-knockout/   → 301 → /{gene}/knockout/
/{gene}/conventional-knockout/   → 301 → /{gene}/knockout/
/{gene}/global-knockout/         → 301 → /{gene}/knockout/
/{gene}/floxed/                  → 301 → /{gene}/conditional-knockout/
/{gene}/transgenic/              → 301 → /{gene}/overexpression/
/{gene}/rosa26/                  → 301 → /{gene}/overexpression/
/{gene}/gfp/  /{gene}/yfp/  ...  → 301 → /{gene}/reporter/
```

Reason: modern search maps these variants to one intent on its own. One strong canonical page beats three thin competitors for all three queries.

### 3.3 Canonical tags

Every type page self canonicals to its own URL. Tissue pages canonical to themselves, not up to the type page (they target distinct tissue queries). The hub canonicals to itself.

---

## 4. Eligibility and generation logic (the core of the build)

This is what prevents 275,000 thin doorway pages, and it is also what keeps the build off the existing catalog pages. For each `gene × canonical-type` cell, the generation job first asks whether a page already exists, then whether to build one.

### 4.1 Build decision

```
if catalog_count(gene, type) >= 1:
    action = "skip"          # a catalog-backed page already exists and converts.
                             # do NOT generate, do NOT rebuild, do NOT reorder.
                             # leave it exactly as is. it inherits the sitewide banner (§6b).
else:
    action = "generate"      # no page exists for this combo. build the inquiry page.
    page_mode = "build_inquiry"
```

The existing catalog pages are out of scope for generation. The only pages this job creates are the net-new `build_inquiry` pages for combos that currently have nothing. This is the "leave what works alone" rule made literal.

### 4.2 Index flag (build_inquiry pages only)

A generated page is `index, follow` only if it clears the thinness gate. Otherwise `noindex, follow` (still crawlable for internal linking, promotable later).

```
indexable =
    type.gate(gene) == PASS              # per type gate from §2.1
    AND gene has >= 2 of:                # gene-level data signals
        impc_viability known,
        expression profile present,
        human_ortholog present,
        existing_allele_count present,
        disease_association present
```

Rationale: the catalog table is what kept the live Trp53 page from being thin. A build_inquiry page has no table, so it must lean on gene level biology instead. No biology, no index, until the data fills in or impressions justify promotion.

### 4.3 Per type gates (from §2.1, expressed as rules)

- `point-mutation`: indexable only if `clinvar_pathogenic_count > 0` OR `omim_ids` present.
- `humanized`: indexable only if `has_human_ortholog == true`.
- `cre-driver`: indexable only if `expression_specificity == "restricted"`. Exclude ubiquitous/housekeeping expression.
- `overexpression`: indexable only if gene has a recognized gain of function or expression use signal, else noindex.
- All others: gate is the §4.2 two-of-five data signal test.

### 4.4 Expected scale

Ungated cross product is roughly genes × 19 ≈ 280k. Subtract the combos that already have catalog pages (skipped, not rebuilt). Collapse the remainder to 11 canonical types and apply the gates, and the indexable net-new set lands in the rough order of 60k to 100k pages, each with a defensible reason to exist. The rest generate as `noindex, follow` and wait. Do not index everything on day one. See phasing in §9.

---

## 5. Data model

### 5.1 Supabase schema (Postgres)

Plain SQL migrations, run in the Supabase SQL editor or as a migration file. No ORM. The web app reads these tables with the Supabase client; the generation job writes them with the service role key.

```sql
-- enums
create type impc_viability as enum ('viable', 'subviable', 'lethal', 'unknown');
create type expression_specificity as enum ('restricted', 'broad', 'ubiquitous', 'unknown');
create type page_mode as enum ('build_inquiry');  -- only generated pages are stored; catalog combos are skipped, not rowed

-- gene registry + biology (the third data layer)
create table gene (
  id                       uuid primary key default gen_random_uuid(),
  symbol                   text not null unique,          -- MGI canonical, e.g. 'Trp53'
  mgi_id                   text unique,
  name                     text,
  synonyms                 text[] default '{}',
  -- ortholog
  human_ortholog_symbol    text,
  human_ortholog_hgnc      text,
  has_human_ortholog       boolean not null default false,
  -- biology
  impc_viability           impc_viability not null default 'unknown',
  impc_zygosity            text,
  expression_profile       jsonb,                         -- top tissues + specificity bucket
  expression_specificity   expression_specificity not null default 'unknown',
  clinvar_pathogenic_count integer not null default 0,
  omim_ids                 text[] default '{}',
  disease_associated       boolean not null default false,
  -- existing-allele landscape (MGI/IMPC/JAX/MMRRC)
  existing_allele_count        integer not null default 0,
  existing_conditional_count   integer not null default 0,
  existing_knockout_count      integer not null default 0,
  updated_at               timestamptz not null default now()
);

-- canonical model types, with hub/spoke tree
create table model_type (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,        -- 'conditional-knockout'
  display_name text not null,               -- 'Conditional Knockout'
  parent_id    uuid references model_type(id),   -- knockin -> point-mutation
  is_per_gene  boolean not null default true,
  synonyms     text[] default '{}',         -- drives 301 map + schema alternateName
  gate_rule    text not null               -- 'all' | 'ortholog' | 'variant' | 'expression_restricted' | 'gain_of_function'
);

-- the source of truth for which pages exist and whether they index
create table gene_type_page (
  id            uuid primary key default gen_random_uuid(),
  gene_id       uuid not null references gene(id) on delete cascade,
  model_type_id uuid not null references model_type(id) on delete cascade,
  page_mode     page_mode not null,
  catalog_count integer not null default 0,
  is_indexable  boolean not null default false,
  canonical_url text not null,
  generated_at  timestamptz not null default now(),
  unique (gene_id, model_type_id)
);

create index on gene_type_page (is_indexable);
create index on gene_type_page (page_mode);
create index on gene_type_page (gene_id);
```

```sql
-- RLS: web role reads, only the service role writes
alter table gene            enable row level security;
alter table model_type      enable row level security;
alter table gene_type_page  enable row level security;

create policy "public read gene"
  on gene for select using (true);
create policy "public read model_type"
  on model_type for select using (true);
create policy "public read gene_type_page"
  on gene_type_page for select using (true);
-- no insert/update/delete policies: writes go through the service role key,
-- which bypasses RLS. the generation job uses that key; the web app never does.
```

`gene_type_page` is the source of truth for which pages exist and whether they are indexed. The generation job (§4) writes it with the service role key. The route handler reads it with the anon key. The `catalog_count` column is populated from your existing catalog feed during generation, so no foreign key into the catalog table is required here; if you prefer one, join on `gene_id` against the catalog table you already have.

### 5.2 Data sources for the biology fields

| Field | Source | Notes |
|---|---|---|
| `impc_viability`, `impc_zygosity` | IMPC viability API | drives conditional rationale ("constitutive null is lethal, conditional is the viable route") |
| `expression_profile`, `expression_specificity` | Bgee or MGI GXD | drives cre-driver and conditional relevance |
| `humanOrthologSymbol`, `hasHumanOrtholog` | MGI/HGNC ortholog table | gates humanized |
| `clinvarPathogenicCount`, `omimIds` | ClinVar + OMIM | gates point-mutation |
| `existing_allele_*` | MGI alleles, IMPC, JAX, MMRRC | powers the gap line ("12 alleles exist, none conditional, we build that") |
| `catalog_count` | existing catalog feed | already in the system; drives page mode |

Ingest as scheduled jobs writing to `gene`. The generation job runs after ingest and rewrites `gene_type_page`.

---

## 6. Page template — the build_inquiry page

This section describes the one page type this build generates: the `build_inquiry` page for a `{gene} {modification}` combo that has no catalog page today. Existing catalog pages are not described here because they are not touched. They keep their current template and behavior; the only thing they gain is the sitewide banner in §6b.

The page follows the three zone architecture from the content system. It does not use the word "custom" or frame itself as a "Custom Models" page. See the language policy in the objective banner and §8.

### 6.1 Zone 1 — Trust and positioning

- H1: `{Gene} {Modification Display Name} Mouse` (or `Mice`). This is the search term. Do not prepend "Custom." Do not build the H1 around "Models" as a category label. "{Gene} {Modification} Mouse Models" is acceptable where it reads naturally, since "mouse model" is itself searched, but the gene and the modification carry the H1, not the classification.
- Opening line carries quantified credibility: since 1998, 2,800+ projects delivered, 100% germline transmission guarantee, 800+ publications. State the track record, not the fulfillment bucket.
- Gene specific framing paragraph: what this gene is, why this modification fits it, and that iTL designs and delivers the line to your specification. Express the build capability through what is delivered, not by labeling it "custom."
- Pull the biology, do not invent it. No methodology, no named nucleases here.

### 6.2 Zone 2 — Scientific content

The design block is the spine of the page. Its on-page copy never says "custom"; it describes the modification and how the line is designed and delivered. Build it from the gene biology:

- **Viability note** (from `impc_viability`): if lethal, state the constitutive null is embryonic lethal and position conditional as the viable route. If viable, say so plainly.
- **Existing allele gap** (from `existing_allele_*`): "N alleles exist for {gene}; M are conditional" and what is missing that iTL builds to specification.
- **Modification rationale** with full technical depth: loxP sites, FRT derivative alleles (tm1a → tm1c → tm1d), critical exon selection, reading frame, regulatory element preservation. Frame ES cell methodology as pre germline characterization advantage. Never position defensively against any other method.
- For `humanized`: ortholog note (from `human_ortholog_symbol`). For `point-mutation`: known variant note (from ClinVar/OMIM). For `cre-driver`: expression note (from `expression_profile`).

No catalog table renders on these pages, because by definition there is no catalog inventory for the combo. Never render an empty table.

The page carries the build timeline and quote language (quote in about 24 hours, study ready cohorts near 26 weeks when breeding is direct).

### 6.3 Credibility block (before Zone 3)

- 1 to 2 testimonials with full attribution (Plumley, Basson, Dunaief from the testimonials set).
- 3 to 5 publications with citations, ending with the link to `/publications/`.

### 6.4 Zone 3 — Navigation and CTA

- Related modifications for the same gene (sibling pages that are indexable, plus the existing catalog-backed modification pages where they exist, so the new pages link into the live catalog pages and vice versa).
- Related genes (the existing related gene cluster).
- Up link to the gene hub.
- **Primary CTA:** "Request a Quote," prefilled with gene and modification: `/request-quote/?gene={Gene}&type={slug}`. Label it "Request a Quote" or "Get a Quote in 24 Hours," not "Request Custom Quote." The prefill carries the intent; the button does not need the internal word.

### 6.5 Conversion note

The page converts to a build inquiry. The conversion is the prefilled quote with gene and modification already populated. This is the mechanism behind the leads-per-month engine, not a cart. The page exists to turn "{gene} {modification} mouse" searches into inquiries, by ranking for the real query and matching the searcher's intent.

---

## 6b. Sitewide build-awareness banner

A single global component, above the fold on every page across the site, catalog pages and the new build_inquiry pages alike. This is the awareness lever, and it is additive: a header strip, not a content change, so it does not rework any page that already converts.

### 6b.1 Purpose

Most researchers who land on a catalog page eventually need a line that does not exist on the shelf. The banner makes sure they know iTL builds exactly that, so they return here instead of leaving to source it elsewhere. It is the one place the build capability is surfaced on the catalog pages, by design, since those pages are otherwise untouched.

### 6b.2 Copy (locked)

> **"We build the exact model your study needs."**
> Subline: "Designed and delivered by ingenious targeting laboratory. Quote in 24 hours."
> CTA: **Get a Quote**

This is the approved banner copy. It frames the capability around what gets delivered, not the fulfillment bucket, and carries no "custom" or "Custom Models" classification language.

### 6b.3 Behavior

- Renders on every page including the existing catalog pages. On catalog pages it is the sole build-capability surface.
- On a `build_inquiry` page the banner is redundant with the page's own offer, so suppress it there or swap it for a thinner contextual variant to avoid doubling the same CTA above the fold.
- Dismissable per session, sticky or static per the design system. No layout shift, no interference with the existing catalog page structure.
- Links to `/request-quote/` (or the capability hub), carrying no gene prefill from catalog pages since the gene context there is ambiguous; on build_inquiry pages, if shown, it inherits the page's gene and modification.

---

## 7. Schema.org

Emit per page:

- `Product` or `Service` for the model type offering, with `name` = `{Gene} {Type} Mouse Model`, `provider` = ingenious targeting laboratory.
- `alternateName` array populated from the type's synonyms (constitutive, conventional, global for knockout, etc.) so the synonym intents resolve to this canonical page.
- `FAQPage` from the gene plus type FAQ block.
- `BreadcrumbList` matching the visible breadcrumb (Home › Catalog › {Gene} › {Type}).

---

## 8. Copy rules (enforced, from the content system)

These are non negotiable and a lint pass must enforce them on generated copy.

- **Search terms, not internal classification.** "custom" is banned from H1s, title tags, headings, and hero copy. So is framing any page as a "Custom Models" or "Catalog Models" page. Those are fulfillment buckets, not search terms. The page targets `{gene} {modification} mouse` and `{gene} {modification} mice`. The lint fails any indexable page where "custom" appears in the H1, title, or an H2/H3. ("mouse model" is permitted, since it is a real query; "Models" as a standalone category label in the H1 is discouraged.)
- **No hyphens in prose copy.** tissue specific, study ready, loss of function, peer reviewed, pre germline. (Slugs and code identifiers keep their hyphens; the rule is about rendered prose.)
- **Brand name:** `ingenious targeting laboratory`, lowercase, written in full in body copy. Note: the live title tags currently mix "ITL" and the full name. Decide one convention and normalize. Recommend the full name in titles for consistency with the house rule; flag for sign off.
- **Prohibited terms:** cutting edge, state of the art, best, leading, validated (use characterized or confirmed), purchase today (use request consultation), innovative, novel, breakthrough, revolutionary.
- **Terminology:** knockout and knockin as one word. loxP (lowercase l). Cre recombinase (capital C). FRT (all caps). germline transmission.
- **Named tools:** do not name specific nucleases on these product pages. Reference ES cell targeting and recombination systems only.
- **Voice:** no stacked short fragments for effect, no repeated em dash structures, no AI tells. Every generated page passes the copy lint before it is allowed to render as indexable.

---

## 9. Indexation strategy (full execution)

### 9.1 Build and index everything that clears the gate

Generate all 11 canonical modifications across all 14,500 gene names in one run. There is no human-staged rollout. The only thing standing between a generated page and the index is the automated thinness and eligibility gate from §4, which runs by itself: a page with the data to support it indexes, a page without it is written `noindex, follow` and waits for the promotion loop. This protects the domain from thin pages without any manual cluster-by-cluster gating.

### 9.2 Sitemaps

Segment XML sitemaps by modification (one sitemap per canonical modification, indexed in a sitemap index) so coverage stays legible per cluster in Search Console. Every `is_indexable` page across all modifications enters its sitemap at launch.

### 9.3 Internal linking

The gene hub's "Modifications available" section already lists the modifications that have catalog pages. Extend it to also list the new indexable build_inquiry pages, with keyword rich anchors (`{Gene} {Modification}`), so the catalog hub links into the new pages and the new pages link back to the catalog pages. This cross-linking is the crawl path that gets the new pages discovered, and it is the one allowed edit to the hub: an added list of links, not a restructure.

### 9.4 Promotion loop

Re run the generation job on a schedule. When a `noindex` build_inquiry page's gene gains data (a new IMPC viability call, a new ClinVar variant) or the page starts drawing impressions, flip it to `index`. Demote any indexed page that comes back thin or draws nothing after a fair window. Also re check `catalog_count`: if a combo gains catalog inventory, retire the build_inquiry page in favor of the catalog page (301 to it) so the two never compete.

---

## 10. Acceptance criteria

- [ ] Existing catalog pages are not modified, reordered, or regenerated. The generation job only creates net-new `build_inquiry` pages for combos with `catalog_count = 0`.
- [ ] The three template defects (tissue "liver" leak, duplicated block, "point mutantion") are fixed in the new build_inquiry template so new pages do not inherit them.
- [ ] All 11 canonical modifications generated across all 14,500 gene names; the 8 synonym/child slugs 301 to canonical; no two indexable URLs share one intent.
- [ ] Reporter fluorophores and lacZ/luciferase render as sections inside `/{gene}/reporter/`, not as separate URLs.
- [ ] `gene_type_page` holds generated build_inquiry pages only; route handler reads the index flag from it.
- [ ] No indexable page contains "custom" in its H1, title tag, or any H2/H3. No page is framed as "Custom Models."
- [ ] H1 follows `{Gene} {Modification} Mouse` / `Mice`; gene and modification carry it, not a category label.
- [ ] build_inquiry pages render the biology driven block (viability, gap, rationale) and never an empty table.
- [ ] Eligibility gates enforced: no indexed humanized page without an ortholog, no indexed point-mutation page without variant data, no indexed cre-driver page for ubiquitous expression.
- [ ] Thinness gate enforced: pages without sufficient gene data are `noindex, follow`.
- [ ] Copy lint passes on every indexable page (search-term rule, hyphens, prohibited terms, brand name, terminology).
- [ ] Schema emitted: Product/Service with synonym alternateName, FAQPage, BreadcrumbList.
- [ ] Primary CTA is the quote, prefilled with gene and modification, labeled without the word "custom."
- [ ] Sitewide build-awareness banner renders above the fold on every page; on catalog pages it is additive only and causes no layout shift; on build_inquiry pages it is suppressed or thinned to avoid a doubled CTA.
- [ ] Sitemaps segmented by modification; all indexable pages submitted.

---

## 11. Locked decisions (no sign off required)

1. **Title tags:** full brand name `ingenious targeting laboratory`. No "ITL" suffix anywhere.
2. **Gene universe:** the existing 14,500 catalog gene names. Ingest enriches those gene rows with biology data; no expansion beyond that set in this build.
3. **Inducible:** its own canonical modification (`inducible-knockout`), gated on conditional viability, per §2.1.
4. **Thinness gate:** 2 of 5 data signals. Fixed.
5. **Banner copy:** "We build the exact model your study needs." Locked, per §6b.2.
