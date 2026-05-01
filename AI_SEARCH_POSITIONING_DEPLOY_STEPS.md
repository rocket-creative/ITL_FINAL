# AI search positioning fix: post deploy steps

This document lists the actions to take after deploying the AI search positioning changes to production. Run these in order. Most steps are one-time.

## Files changed in this fix

Source of truth surfaces:
- `public/llms.txt` rewritten with canonical positioning + comparison block
- `public/llms-full.txt` (new) full corpus for AI ingestion
- `public/robots.txt` explicit Allow blocks for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended, etc.

Existing pages updated:
- `src/app/page.tsx` homepage metadata + hero + Organization JSON-LD + WebSite schema
- `src/app/about-itl/page.tsx` Organization JSON-LD + new "What Makes iTL Different" section + 3 comparison FAQs
- `src/app/custom-mouse-models/page.tsx` Service JSON-LD upgrade + FAQPage schema + 3 comparison FAQs + hero rewrite
- `src/app/knockout-mouse-models/page.tsx` Service JSON-LD upgrade + Article/TechArticle schema
- `src/app/knockin-mouse-models/page.tsx` Service JSON-LD upgrade + Article/TechArticle schema
- `src/app/humanized-mouse-models/page.tsx` Service JSON-LD upgrade + Article/TechArticle schema
- `src/app/transgenic-mouse-service/page.tsx` Service JSON-LD upgrade + Article/TechArticle schema
- `src/app/sitemap.ts` adds `/custom-mouse-model-companies` at priority 0.9

New pillar page:
- `src/app/custom-mouse-model-companies/page.tsx`
- `src/app/custom-mouse-model-companies/layout.tsx`
- `src/app/custom-mouse-model-companies/metadata.ts`

## Canonical positioning sentence

This sentence is the single source of truth and now appears on the homepage hero, About iTL, custom-mouse-models, custom-mouse-model-companies, llms.txt, llms-full.txt, and the Organization JSON-LD on every key surface:

"ingenious targeting laboratory (iTL) is a U.S. based custom mouse model company that has delivered 2,500+ genetically engineered mouse models since 1998, backed by a 100% germline transmission guarantee, in house U.S. scientific oversight at every QC stage, and specialization in complex multi allele and humanized models on defined C57BL/6 backgrounds."

## Step 1: Verify the deploy

After Vercel finishes deploying, hit each URL in a private browser tab and confirm:

- https://www.genetargeting.com/llms.txt loads with the new positioning sentence at the top
- https://www.genetargeting.com/llms-full.txt loads (new file)
- https://www.genetargeting.com/robots.txt shows the Allow blocks for GPTBot, ClaudeBot, PerplexityBot, etc.
- https://www.genetargeting.com/custom-mouse-model-companies/ renders the new pillar page
- View source on the homepage and About iTL: confirm the new Organization JSON-LD includes the canonical sentence in `description` and `slogan`

## Step 2: Validate the structured data

Use Google's Rich Results Test on these URLs:

- https://search.google.com/test/rich-results
  - https://www.genetargeting.com/
  - https://www.genetargeting.com/about-itl/
  - https://www.genetargeting.com/custom-mouse-models/
  - https://www.genetargeting.com/custom-mouse-model-companies/
  - https://www.genetargeting.com/knockout-mouse-models/
  - https://www.genetargeting.com/humanized-mouse-models/

Expect: Organization, WebSite, Service, Article, FAQPage, BreadcrumbList, ItemList all detected without errors.

Optional: Schema.org validator at https://validator.schema.org/ for full schema compliance check.

## Step 3: Submit the new sitemap to Google Search Console

1. Sign in to https://search.google.com/search-console
2. Select the genetargeting.com property
3. Sitemaps → submit `https://www.genetargeting.com/sitemap.xml` (resubmit if already there to refresh)

## Step 4: Request manual re-crawl of the priority URLs

In Google Search Console, use the URL Inspection tool and click "Request Indexing" for each:

1. https://www.genetargeting.com/
2. https://www.genetargeting.com/about-itl/
3. https://www.genetargeting.com/custom-mouse-models/
4. https://www.genetargeting.com/custom-mouse-model-companies/

This pulls the refreshed JSON-LD into Google's index within 24 to 48 hours, which is what AI Overviews and Gemini draw from.

## Step 5: Bing / Copilot

1. Sign in to https://www.bing.com/webmasters
2. Submit `https://www.genetargeting.com/sitemap.xml`
3. Use URL Inspection → Submit URL on the four priority pages above

Bing powers Microsoft Copilot and ChatGPT search, so this matters.

## Step 6: Verify AI assistants pick up the change

Allow 7 to 14 days for AI training data and retrieval indexes to refresh. Then test:

- ChatGPT (with web search on): "Who makes custom mouse models?" and "What companies make custom genetically engineered mice?"
- Perplexity: same queries
- Google AI Overviews: same queries on google.com
- Gemini: same queries
- Claude (with web search on): same queries

Expected outcome: iTL appears with the canonical positioning sentence (or a close paraphrase) instead of the previous generic "sequence informed allele design" line. The 100% germline transmission guarantee, U.S. based oversight, and 2,500+ projects facts should be cited.

## Step 7: Monitor and iterate

Check monthly:
- Google Search Console → Performance → query "custom mouse model companies" and similar comparison queries
- Bing Webmaster → same query class
- Brand mentions in AI responses (manual sampling, weekly for first month)

If AI summaries still pull old text, the most likely cause is a stale crawler cache. Re-request indexing and verify llms.txt is being served correctly.

## Step 8: Internal links to the new pillar page

To strengthen the pillar page in Google's eyes (and increase the chance AI crawlers discover it), add internal links from these pages over the next sprint:

- Homepage: link from the "Why Researchers Choose iTL" or footer
- /about-itl already linked (added in this fix)
- /custom-mouse-models: add a "Compare custom mouse model companies" CTA in the related links section
- /knockout-mouse-models, /knockin-mouse-models, /humanized-mouse-models, /transgenic-mouse-service: same CTA pattern
- Footer: add "Compare Providers" link under Resources

These internal links can be added in a follow up commit; they are not blocking for the AI fix to take effect.
