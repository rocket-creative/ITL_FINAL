# Publications Sync Guide

**Purpose:** Ensure page-specific publications from approved Google docs (content files) correctly appear on the built site.

## Full Sync from Master List (Feb 2026)

The master publications list lives at `~/Downloads/publications.md`. To fully sync:

```bash
node scripts/sync-publications.js --full
```

This regenerates `src/app/publications/publicationsData.ts` from the master markdown. The script parses all `## YYYY Publications` sections and converts each entry to the Publication format. Run after updating the master list.

## The Problem

- **Source of truth:** `src/content/pages/*.md` files contain the approved "Selected Publications" from Google docs
- **Built pages:** `src/app/[page-name]/page.tsx` components have **hardcoded** `publicationsData` arrays
- **Gap:** Page components do NOT automatically pull from content files. Publications can drift when:
  - AI or developers copy-paste from templates
  - The 1999 Clausen (LysMcre) publication was incorrectly inserted on many pages where it doesn't belong

## Root Cause: Wrong Publication Proliferation

The Clausen BE et al. 1999 publication ("Conditional gene targeting in macrophages and granulocytes using LysMcre mice") is correct **only** for:
- Cre-Lox System page
- Cre Recombinase Mice page
- Possibly conditional knockout / tissue-specific pages

It was incorrectly added to: transgenic-mouse-service, Alzheimer's, diabetes, oncology, immunology, and many other pages that need **page-specific** publications.

## How to Fix a Page

1. **Open the content file** (source of truth): `src/content/pages/[page-slug].md`
2. **Find the "Selected Publications" section** – it has the approved list from Google docs
3. **Copy the publications** into the page component: `src/app/[page-slug]/page.tsx`
4. **Update the `publicationsData` array** to match exactly (authors, year, title, journal, volume, PubMed link)

## Verification Checklist

When updating publications on any page:

- [ ] Read `src/content/pages/[page-slug].md` for the Selected Publications section
- [ ] Ensure each publication has a valid PubMed link
- [ ] Match author formatting (full list or "et al.") to the content file
- [ ] Verify journal and volume/issue format

## Pages with Content Files (Have Approved Publications)

These content files have a "Selected Publications" section that should match the built page:

- `transgenic-mouse-service.md` → Rosa26 models (Jiang 2025, Serrano 2024, Kim 2023)
- `cre-lox-system.md`
- `conditional-knockout-mouse-models.md`
- `knockout-mouse-models.md`
- `knockin-mouse-models.md`
- `gene-replacement.md`
- And 25+ other pages (see `src/content/pages/*.md`)

## Future Improvement: Central Data File

To prevent drift, consider creating `src/data/pagePublications.ts`:

```ts
// Maps page path → publications for that page
export const pagePublications: Record<string, Publication[]> = {
  '/transgenic-mouse-service': [ /* Jiang, Serrano, Kim */ ],
  '/cre-lox-system': [ /* Cre-specific pubs */ ],
  // ...
};
```

Then each page would `import { pagePublications } from '@/data/pagePublications'` instead of hardcoding. This single file could be the sync point when Google docs are updated.

## Transgenic Mouse Service – Fixed (Feb 2026)

The transgenic-mouse-service page has been updated with the correct Rosa26 publications:

1. Jiang Y et al. 2025 – APPL1, J Neurosci
2. Serrano J et al. 2024 – TAS1R2 glucose sensor, Nat Commun
3. Kim JS et al. 2023 – Na(V) 1.9 airway C-fibres, J Physiol

The incorrect 1999 Clausen publication has been removed.
