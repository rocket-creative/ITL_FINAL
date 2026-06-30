# Gene × Modification Expansion — Completion Report

**Date:** 2026-06-30  
**Pipeline:** Full run post pagination fix (`npm run gene-expansion:pipeline`)

## Scale

| Metric | Pre fix (~1k row cap) | Post fix |
|--------|----------------------|----------|
| Genes in DB | 8,879 | 8,879 |
| Theoretical grid (genes × 11 mods) | 97,669 | 97,669 |
| `gene_type_page` rows | ~10,861 | **84,344** (86% of grid) |
| Indexable | ~2,773 | **46,913** |
| Noindex | ~8,088 | **37,431** |
| Catalog skips | — | **13,325** |
| Retired (catalog took over URL) | — | **1,427** |

**Note:** Marketing “14,500 genes” vs **8,879** symbols from `catalog_models` — seed uses catalog universe only.

## Indexable by modification

| Mod slug | Generated | Indexable | Catalog skipped |
|----------|-----------|-----------|-----------------|
| cdna-knockin | 8,879 | 7,326 | 0 |
| conditional-knockout | 4,715 | 3,459 | 4,164 |
| cre-driver | 8,342 | 2 | 537 |
| humanized | 8,128 | 6,665 | 751 |
| inducible-knockout | 8,879 | 3,867 | 0 |
| knockin | 8,281 | 6,763 | 598 |
| knockout | 1,811 | 1,010 | 7,068 |
| overexpression | 8,794 | 3,164 | 85 |
| point-mutation | 8,757 | 5 | 122 |
| reporter | 8,879 | 7,326 | 0 |
| tag-knockin | 8,879 | 7,326 | 0 |

## Ingest coverage (latest run)

- IMPC viability: 5 / 8,879 genes with known viability
- Expression: 3,190 profiles; 17 tissue restricted; 3,173 broad/ubiquitous
- Orthologs: 6,667 / 8,879 with human ortholog
- ClinVar/OMIM: stub/heuristic (see ingest logs)

## §10 acceptance

All validator checks **pass** after word-boundary copy lint fix (gene symbols like `Best1` no longer false-positive on “best”).

- Pagination: `fetchAllGenes` / `fetchAllRows` in all generate + ingest + lint paths
- Banner: suppressed on `build_inquiry` only via `BannerVisibilityContext`
- Template: deduped rationale, Dunaief testimonial, catalog sibling links in Zone 3
- Gene hub: renders for build_inquiry-only genes (no catalog rows)
- Retirement: logged to `retirement-log.json`; same URL serves catalog when inventory appears
- CI: `copy-lint.yml` + weekly `gene-expansion-weekly.yml` with Supabase secrets
- Build: `npm run build` succeeds

## Deploy checklist

1. Merge PR to `ITL_MAIN`
2. Confirm Supabase migration `001-gene-expansion-schema.sql` applied on prod
3. Vercel env: `NEXT_PUBLIC_SUPABASE_URL`, anon key, `SUPABASE_SERVICE_ROLE_KEY`
4. GitHub secrets for weekly workflow (same three)
5. Deploy Vercel production build
6. **GSC:** Submit sitemap index only:  
   `https://www.genetargeting.com/sitemaps/gene-modifications/sitemap-index.xml`

## Sitemap index

Listed in `public/robots.txt`. Segmented per modification under `/sitemaps/gene-modifications/{modSlug}/sitemap.xml`.
