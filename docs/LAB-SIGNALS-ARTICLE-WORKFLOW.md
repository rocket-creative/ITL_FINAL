# Lab Signals Article Workflow

Quick reference for adding and staging Lab Signals articles. For Cursor-driven workflows, use the `lab-signals-article` skill.

## Filename Format

Articles are MD files. Use this naming:

```
YYYY-MM-DD-article-title-slug.md
```

- Date = release date (`publishedAt`)
- Rest = slug (kebab-case)

Example: `2026-03-15-advances-in-crispr-mouse-models.md`

## Team Preview Links

Share with the team to preview staged articles (no Flodesk gate). No env vars or setup required.

```
https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview
```

Example: `https://www.genetargeting.com/lab-signals/bac-transgenic-mice-large-fragment-insertion-models?preview=itl-team-preview`

Preview shows a "Team Preview" banner. Public URLs stay gated.

## Staging System

- **Staged**: `publishedAt` in future → hidden from public; team preview only
- **Live**: `publishedAt` <= today → visible on listing, RSS, direct URL

No deploy needed to "release." Change `publishedAt` to today and redeploy.

## Adding a New Article (2 per month)

1. **Edit** `src/data/newsletterArticles.ts`
2. **Add** from MD: parse date and slug from filename, convert body to HTML
3. **Share** preview link with team
4. **Optional**: Add to `labSignalsArticles` in `LabSignalsSignup.tsx` for cross-linking

## Content Gating

- **Public**: Flodesk signup required; cookie grants 90-day access
- **Team**: `?preview=SECRET` bypasses gate for internal review
