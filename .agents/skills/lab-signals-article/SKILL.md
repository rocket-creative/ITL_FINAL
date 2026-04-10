---
name: lab-signals-article
description: Add, stage, and publish Lab Signals newsletter articles. Use when adding new Lab Signals articles, staging content for future release, formatting article content, converting MD to HTML, or when the user mentions Lab Signals, newsletter articles, or biweekly content.
---

# Lab Signals Article Workflow

**Full documentation in: `LAB SIGNALS/` folder**

See the `LAB SIGNALS/` folder at project root for:
- `SKILL.md` - Main workflow and formatting guide
- `ARTICLE-TEMPLATE.md` - Copy/paste template for new articles
- `REFERENCE-FORMATS.md` - Reference citation examples
- `SCHEDULE.md` - Release schedule tracking

## Quick Reference

| Item | Value |
|------|-------|
| Data file | `src/data/newsletterArticles.ts` |
| Release schedule | Every 2 weeks |
| Early preview password | `KristenITL3165!` |
| Team bypass URL | `?preview=itl-team-preview` |

## How Staging Works

1. Set `publishedAt` to future date
2. Article shows blurred with "Coming [date]" banner
3. Password `KristenITL3165!` unlocks early preview for Kristen
4. On release date, article automatically goes live

## Preview URLs (Always Output Both)

```
For the [Article Title] article releasing [Day], [Month] [Date]:

Early preview (password: KristenITL3165!):
https://www.genetargeting.com/lab-signals/{slug}

Team bypass (no password needed):
https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview
```

## Key Files

| Purpose | Path |
|---------|------|
| Article data | `src/data/newsletterArticles.ts` |
| Skills folder | `LAB SIGNALS/` |
| Article page | `src/app/lab-signals/[slug]/page.tsx` |
| Client component | `src/app/lab-signals/[slug]/LabSignalsArticleClient.tsx` |

## Client-approved copy (important)

Read [`LAB SIGNALS/SKILL.md`](LAB SIGNALS/SKILL.md) **Content Rules**. For supplied final articles:

- Preserve **wording** verbatim (hyphens, **CAR-T**, em dashes). Project-wide “no hyphen” rules do **not** apply.
- Preserve **references** as provided: do **not** merge duplicate bibliography entries, renumber in-text citations, or remove uncited references unless the client asks.
- Convert structure to HTML and `<sup>[n]</sup>` only; do not “clean up” citations or copy for style.
