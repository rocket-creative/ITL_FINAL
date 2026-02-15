---
name: lab-signals-article
description: Add, stage, and publish Lab Signals newsletter articles. Use when adding new Lab Signals articles, staging content for future release, formatting article content, converting MD to HTML, or when the user mentions Lab Signals, newsletter articles, or biweekly content.
---

# Lab Signals Article Workflow

Lab Signals is a gated newsletter blog for ingenious targeting laboratory. Content is collected via Flodesk; subscribers get access to articles. Articles are staged until their release date (2 per month).

## Input: Markdown Files

Articles are provided as **MD files**. Filename format:

```
YYYY-MM-DD-article-title-slug.md
```

- **Date** (YYYY-MM-DD) = release date → `publishedAt`
- **Rest** = slug (kebab-case) → `slug`
- Example: `2026-03-15-advances-in-crispr-mouse-models.md`

Convert MD to HTML for the `body` field.

## Article URLs (Output Both)

When adding an article, **output both URLs** in the summary for copy/paste:

| Link | URL | When to use |
|------|-----|-------------|
| **Public** | `https://www.genetargeting.com/lab-signals/{slug}` | Live link (after release date). Gated by Flodesk for subscribers. |
| **Team preview** | `https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview` | Pre-publish review. Bypasses gate; shows "Team Preview" banner. No env vars. |

Output format (exact):

```
For the [Article Title] article releasing [Day], [Month] [Date]:
Public:
https://www.genetargeting.com/lab-signals/{slug}
Team preview:
https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview
```

Staged articles (`publishedAt` in future) are hidden from public; team preview works immediately.

## Quick Start

When adding a new Lab Signals article (from MD file):

1. Parse date from filename → `publishedAt`
2. Parse slug from filename → `slug`
3. Convert MD body to HTML
4. Add to `src/data/newsletterArticles.ts`
5. Add to `labSignalsArticles` in `LabSignalsSignup.tsx` if cross-linking desired
6. **Output both URLs** in the summary using this exact format:

```
For the [Article Title] article releasing [Day], [Month] [Date]:
Public:
https://www.genetargeting.com/lab-signals/{slug}
Team preview:
https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview
```

Example (BAC Transgenic Mice, Tuesday Feb 17):

```
For the BAC Transgenic Mice article releasing Tuesday, Feb 17:
Public:
https://www.genetargeting.com/lab-signals/bac-transgenic-mice-large-fragment-insertion-models
Team preview:
https://www.genetargeting.com/lab-signals/bac-transgenic-mice-large-fragment-insertion-models?preview=itl-team-preview
```

## Article Schema

```typescript
{
  id: string;           // Same as slug, kebab-case
  slug: string;         // URL-safe, e.g. "my-article-title"
  title: string;        // Full title
  subtitle: string;    // Short optional
  description: string; // 150–160 chars for SEO
  category: string;    // Neuroscience, Metabolic, Oncology, etc.
  relatedPage: string; // e.g. "/conditional-knockout-mouse-models"
  body: string;        // HTML content
  publishedAt: string; // YYYY-MM-DD (future = staged)
}
```

## Zero Config

No env vars or Vercel setup. Add article, push to main, deploy. Articles auto-release on their `publishedAt` date (force-dynamic rendering). Team preview uses hardcoded token.

## Staging (Release Date)

- **publishedAt** controls public visibility:
  - `publishedAt <= today` → article is live (listing, RSS, direct URL)
  - `publishedAt > today` → article is staged (hidden from public; team preview only)

- To stage: set `publishedAt` to e.g. `"2026-03-15"` (next newsletter date)
- To publish: change `publishedAt` to today or past date
- No deploy needed to "release" — the date check runs at runtime

## Formatting Rules

- **Body HTML**: Use `<p>`, `<h3>`, `<h4>`, `<ul>`, `<ol>`, `<strong>`, `<em>`, `<sup>` for citations
- **Links**: Internal links use `/lab-signals/slug` or `/service-page`; external links full URL
- **Citations**: Use `<sup>[1]</sup>` or `<a href="...">[1]</a>` format
- **No hyphens** in copy (per Cursor rules)
- **No AI giveaways**: "leverage", "dive into", "it's important to note", etc.

## References (Required for Articles With Citations)

When an article cites sources, include a formal References section at the end. **All Lab Signals articles with citations must follow this format.**

### Structure

Wrap the entire References section in the `lab-signals-references` div (enables tight, smaller font styling):

```html
<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>Author A, et al. Title. <em>Journal</em>. Year;vol(issue):pages. <a href="https://doi.org/XXX" target="_blank" rel="noopener noreferrer">doi:XXX</a></li>
<li>...</li>
</ol></div>
```

### Format Per Reference

- **Style**: Author(s). Title. <em>Journal</em>. Year;vol(issue):pages.
- **Links**: Every reference must have a clickable link. Use DOI (`https://doi.org/10.XXXX/...`) or PubMed (`https://pubmed.ncbi.nlm.nih.gov/XXXXX/`) when available.
- **Link attributes**: Always include `target="_blank" rel="noopener noreferrer"`.
- **Journal abbreviations**: Use standard abbreviations (e.g. <em>Nat Commun</em>, <em>Sci Rep</em>, <em>Proc Natl Acad Sci USA</em>).

### Example

```html
<li>Mogi K, Tomita H, Yoshihara M, et al. Advances in bacterial artificial chromosome (BAC) transgenic mice for gene analysis and disease research. <em>Gene</em>. 2025;934:149014. <a href="https://doi.org/10.1016/j.gene.2024.149014" target="_blank" rel="noopener noreferrer">doi:10.1016/j.gene.2024.149014</a></li>
```

### Styling (Automatic)

The `lab-signals-references` class applies: smaller font (0.9rem), tight line-height (1.35), minimal spacing between items. No extra markup needed.

## Related Articles

- **Same category**: Up to 3 related articles shown in RelatedArticles (same category, different slug)
- **Cross-linking**: Add to `labSignalsArticles` in `src/components/UXUIDC/LabSignalsSignup.tsx` with `relatedPages` array for service pages that should show this article

## Ingenious Ad

- Automatic: `IngeniousAd` uses `article.relatedPage` and `article.category`
- Appears inside gated content (after article body)
- Custom headline: `IngeniousAd` has `category`-based headlines; override with `headline` prop if needed

## File Locations

| Purpose | File |
|---------|------|
| Article data | `src/data/newsletterArticles.ts` |
| Cross-link config | `src/components/UXUIDC/LabSignalsSignup.tsx` (labSignalsArticles) |
| Article page | `src/app/lab-signals/[slug]/page.tsx` |
| Ad component | `src/components/UXUIDC/IngeniousAd.tsx` |

## Checklist

- [ ] Article added to `newsletterArticles` array
- [ ] `publishedAt` from filename (future = staged)
- [ ] `relatedPage` points to correct iTL service
- [ ] Body HTML from MD (proper tags)
- [ ] Description 150–160 chars
- [ ] Slug from filename, URL-safe, unique
- [ ] **Both URLs output** in chat for copy/paste: Public + Team preview
- [ ] Added to `labSignalsArticles` in LabSignalsSignup if cross-linking desired
- [ ] No hyphens in copy
- [ ] No AI giveaway phrases
- [ ] **If article has citations**: References section wrapped in `<div class="lab-signals-references">`, each ref has DOI/PubMed link with `target="_blank" rel="noopener noreferrer"`

## Content Gating

- **Public**: Flodesk form collects email → cookie sets → content unlocks
- **Team**: `?preview=itl-team-preview` bypasses gate for internal review
