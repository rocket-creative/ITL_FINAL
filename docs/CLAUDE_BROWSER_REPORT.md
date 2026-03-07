# Claude Browser Report: ITL Gap Analysis – Manual Tasks

**Purpose:** Tasks requiring human action in Google Search Console, GA4, or external tools. Use Claude Browser (or manual execution) to complete these after code changes are deployed.

**Source:** ITL Internal Gap Analysis (Feb 7 – Mar 6, 2026)  
**Generated:** March 7, 2026

---

## 1. Google Search Console – 404 URLs

**Action:** Export the list of 248 404 URLs from GSC.

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select the genetargeting.com property
3. Navigate to **Indexing** > **Pages**
4. Under "Why pages aren't indexed," find **Not found (404)**
5. Click to view the list
6. Export the URLs (or copy for processing)

**Use:** Provide this list to a developer to add redirects for any URLs not already in `src/lib/legacy/redirects.json` or `docs-important/REDIRECT_MAP.csv`.

**Optional:** Prioritize 404s that had traffic before migration (check in GSC or GA4).

---

## 2. Google Search Console – Remove Old Sitemaps

**Action:** Remove legacy WordPress sitemaps that show "Couldn't fetch."

**Steps:**
1. In GSC, go to **Sitemaps**
2. Remove these sitemaps (if present):
   - `sitemap_index.xml`
   - `post-sitemap.xml`
   - `page-sitemap.xml`

**Note:** These are from the old WordPress site and are not in the current codebase.

---

## 3. Google Search Console – Submit New Sitemap

**Action:** Submit the updated sitemap after deployment.

**Steps:**
1. In GSC, go to **Sitemaps**
2. Enter: `https://www.genetargeting.com/sitemap.xml`
3. Click **Submit**

**Verify:** The sitemap should report 373+ URLs (or the expanded count after Agent 2 changes).

---

## 4. GA4 – Bot Filtering

**Action:** Reduce inflated "Direct" traffic by filtering known bots.

**Steps:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Select the ITL property
3. **Admin** > **Data Streams** > select Web stream
4. **Configure tag settings** > **Define internal traffic** – add rules to exclude internal IPs if needed
5. **Admin** > **Data Settings** > **Data Filters**
6. Create a filter to exclude known bots (see [GA4 bot filtering docs](https://support.google.com/analytics/answer/10108819))

---

## 5. GA4 – Mark Key Events (Conversions)

**Action:** Mark `generate_lead` as a Key Event so it appears in Conversions reports.

**Steps:**
1. Go to **Admin** > **Events**
2. Find `generate_lead` (may take 24–48 hours to appear after first firing)
3. Toggle **Mark as key event** to ON

**Reference:** See `docs/GA4_KEY_EVENTS_SETUP.md` for full details.

---

## 6. GA4 – UTM Parameters

**Action:** Add UTM parameters to all paid, email, and social campaign links.

**Parameters:**
- `utm_source` (e.g., linkedin, newsletter, google)
- `utm_medium` (e.g., social, email, cpc)
- `utm_campaign` (e.g., lab_signals_2026, spring_promo)

**Example:**
```
https://www.genetargeting.com/request-quote/?utm_source=linkedin&utm_medium=social&utm_campaign=lab_signals_2026
```

**Where to add:** HubSpot emails, paid ad destination URLs, social post links, newsletter links.

---

## 7. Crawled-but-Not-Indexed (210 pages)

**Action:** Export the list for content/SEO review.

**Steps:**
1. In GSC, go to **Indexing** > **Pages**
2. Under "Why pages aren't indexed," find **Crawled – currently not indexed**
3. Export the URL list

**Use:** Assign to content team or future content agent. These pages need better content or internal linking. Not a code fix.

---

## 8. Mobile Core Web Vitals

**Action:** Run Lighthouse audits to identify mobile performance issues.

**Steps:**
1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Select **Mobile**, **Performance**
4. Run audit on:
   - Homepage
   - `/request-quote/`
   - `/ingenious-blog/what-is-a-point-mutation/`
   - `/catalog-mouse-models/`

**Use:** Address LCP, INP, and CLS issues (e.g., image optimization, font loading, layout shifts).

---

## Summary Checklist

- [ ] Export 404 URLs from GSC
- [ ] Remove old sitemaps from GSC
- [ ] Submit new sitemap in GSC
- [ ] Configure GA4 bot filtering
- [ ] Mark `generate_lead` as Key Event in GA4
- [ ] Add UTM parameters to campaigns
- [ ] Export crawled-but-not-indexed URLs
- [ ] Run Lighthouse audits on key pages
