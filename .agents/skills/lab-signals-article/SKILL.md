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

## Team Preview Links

Staged articles are hidden from the public but **team can preview** via (no env vars):

```
https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview
```

Share the full URL with the team. Preview shows "Team Preview" banner; no Flodesk gate. Public URLs stay gated.

## Quick Start

When adding a new Lab Signals article (from MD file):

1. Parse date from filename → `publishedAt`
2. Parse slug from filename → `slug`
3. Convert MD body to HTML
4. Add to `src/data/newsletterArticles.ts`
5. Generate preview link for team: `.../lab-signals/{slug}?preview=itl-team-preview`
6. Add to `labSignalsArticles` in `LabSignalsSignup.tsx` if cross-linking desired
7. **Output the full team preview URL** in the summary so the user can copy and paste:

```
https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview
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
- [ ] Full preview URL output in chat for copy/paste: `https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview`
- [ ] Added to `labSignalsArticles` in LabSignalsSignup if cross-linking desired
- [ ] No hyphens in copy
- [ ] No AI giveaway phrases

## Content Gating

- **Public**: Flodesk form collects email → cookie sets → content unlocks
- **Team**: `?preview=itl-team-preview` bypasses gate for internal review
