---
name: lab-signals-workflow
description: Add, stage, and publish Lab Signals newsletter articles with consistent formatting. Use when adding new Lab Signals articles, staging content for future release, formatting article content, or when the user mentions Lab Signals, newsletter articles, or biweekly content.
---

# Lab Signals Article Workflow

Lab Signals is a gated newsletter blog for Ingenious Targeting Laboratory. Articles release biweekly (every 2 weeks). Content is staged until release date, showing a blurred preview with password unlock for early access.

## Quick Reference

| Item | Value |
|------|-------|
| Data file | `src/data/newsletterArticles.ts` |
| Release schedule | Every 2 weeks |
| Early preview password | `KristenITL3165!` (env: `NEXT_PUBLIC_LAB_SIGNALS_PREVIEW_PASSWORD`) |
| Team bypass URL | `?preview=itl-team-preview` |

## How Staging Works

1. **Future `publishedAt` date** = Article is staged (not in public listing)
2. **Staged articles show**:
   - Gold "Coming [date]" banner
   - Blurred content with password unlock form
   - Password: `KristenITL3165!` unlocks full article
3. **On release date**: Article automatically goes live (no deploy needed)

## Adding a New Article

### Step 1: Parse the Input

Articles come as MD files with filename format:
```
YYYY-MM-DD-article-title-slug.md
```

- **Date** → `publishedAt` (future date = staged)
- **Rest** → `slug` (kebab-case, URL-safe)

### Step 2: Create the Article Object

```typescript
{
  id: "article-slug-here",           // Same as slug
  slug: "article-slug-here",         // From filename
  title: "Full Article Title",       // From MD frontmatter or H1
  subtitle: "Short Subtitle",        // Optional, can be empty string
  description: "150-160 char SEO description...",
  category: "Technical Guide",       // See categories below
  relatedPage: "/service-page-url",  // Related iTL service
  body: `<p>HTML content...</p>`,    // Converted from MD
  publishedAt: "2026-03-17",         // YYYY-MM-DD from filename
}
```

### Step 3: Add to Data File

Add to the `newsletterArticles` array in `src/data/newsletterArticles.ts`.

### Step 4: Output URLs

Always output both URLs for Kristen:

```
For the [Article Title] article releasing [Day], [Month] [Date]:

Early preview (password: KristenITL3165!):
https://www.genetargeting.com/lab-signals/{slug}

Team bypass (no password needed):
https://www.genetargeting.com/lab-signals/{slug}?preview=itl-team-preview
```

## Article Categories

Use one of these categories:
- `Technical Guide` - How-to, methodology, techniques
- `Neuroscience` - Brain, neurodegeneration, behavior
- `Metabolic` - Obesity, diabetes, metabolism
- `Oncology` - Cancer research
- `Immunology` - Immune system, infectious disease
- `Industry Insights` - Regulatory, business, trends
- `Technology` - CRISPR, gene editing tools

## Related Pages (Common)

| Category | Related Page |
|----------|--------------|
| Conditional KO | `/conditional-knockout-mouse-models` |
| Knockout | `/knockout-mouse-models` |
| Humanized | `/humanized-mouse-models` |
| Transgenic | `/transgenic-mouse-service` |
| Cre-Lox | `/cre-lox-system` |
| Alzheimer's | `/alzheimers-mouse-models` |
| Cancer | `/immuno-oncology-mouse-models` |
| Metabolic | `/metabolic-disease-mouse-models` |

## HTML Formatting Rules

### Body Structure

```html
<p>Opening paragraph introducing the topic.</p>

<h3>Section Heading</h3>
<p>Section content with <strong>bold</strong> and <em>italic</em> text.</p>

<h4>Subsection Heading</h4>
<p>More detailed content.</p>

<ul>
<li>Bullet point one</li>
<li>Bullet point two</li>
</ul>

<ol>
<li>Numbered item one</li>
<li>Numbered item two</li>
</ol>
```

### Citations in Body

Use superscript format:
```html
<p>Research shows this finding<sup>[1]</sup> and this other finding<sup>[2,3]</sup>.</p>
```

### References Section (Required for Cited Articles)

**Format A: Simple (no links)** - Use when source doc has no DOIs:
```html
<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>Author A, et al. Title. <em>Journal Name.</em> Year;vol(issue):pages.</li>
<li>Author B, et al. Title. <em>Journal Name.</em> Year;vol(issue):pages.</li>
</ol></div>
```

**Format B: With DOI links** - Use when DOIs are available:
```html
<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>Author A, et al. Title. <em>Journal Name.</em> Year;vol(issue):pages. <a href="https://doi.org/10.XXXX/..." target="_blank" rel="noopener noreferrer">doi:10.XXXX/...</a></li>
</ol></div>
```

**Important**: Match the reference format from the source document. If the source has no DOI links, don't add them.

### Content Rules

- **No hyphens** in copy (rewrite to avoid)
- **No AI giveaway phrases**: "dive into", "leverage", "it's important to note", "let's explore"
- **Active voice** preferred
- **Sentence case** for headings

## Example Complete Article

```typescript
{
  id: "fda-modernization-act-2-what-it-means-for-researchers",
  slug: "fda-modernization-act-2-what-it-means-for-researchers",
  title: "The FDA Modernization Act 2.0: What It Means for Researchers",
  subtitle: "Regulatory Evolution, NAMs, and the Enduring Role of Mouse Models",
  description: "FDA Modernization Act 2.0 and the 2025 FDA roadmap are reshaping preclinical testing. Learn why mouse models remain indispensable for complex disease research.",
  category: "Industry Insights",
  relatedPage: "/humanized-mouse-models",
  body: `<p>In December 2022, Congress passed the <strong>FDA Modernization Act 2.0</strong>...</p>

<h3>Understanding the FDA's New Direction</h3>
<p>The FDA Modernization Act 2.0 amended...</p>

<h3>Conclusion</h3>
<p>The FDA Modernization Act 2.0 represents an evolution in regulatory science.<sup>[1]</sup>...</p>

<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>FDA Modernization Act of 2022, Pub L No. 117-328 (2022).</li>
<li>U.S. Food and Drug Administration. <em>Roadmap to Reducing Animal Testing.</em> 2025.</li>
</ol></div>`,
  publishedAt: "2026-03-17",
}
```

## Checklist

Before completing an article addition:

- [ ] `id` and `slug` match, are kebab-case, unique
- [ ] `publishedAt` is future date (for staging)
- [ ] `description` is 150-160 characters
- [ ] `category` is from approved list
- [ ] `relatedPage` points to valid iTL service
- [ ] Body HTML uses proper tags (`<p>`, `<h3>`, `<h4>`, `<ul>`, `<ol>`)
- [ ] Citations use `<sup>[1]</sup>` format
- [ ] References section matches source document format
- [ ] No hyphens in copy
- [ ] No AI giveaway phrases
- [ ] **Output both URLs** with password reminder

## File Locations

| Purpose | Path |
|---------|------|
| Article data | `src/data/newsletterArticles.ts` |
| Article page | `src/app/lab-signals/[slug]/page.tsx` |
| Client component | `src/app/lab-signals/[slug]/LabSignalsArticleClient.tsx` |
| Cross-link config | `src/components/UXUIDC/LabSignalsSignup.tsx` |
| Skills folder | `LAB SIGNALS/` |
