# 🔴 SEO CRITICAL FIXES REQUIRED - ITL_2026

**AUDIT DATE:** February 11, 2026  
**STATUS:** Pre-Launch - DO NOT DEPLOY WITHOUT THESE FIXES

---

## 📊 AUDIT SUMMARY

| Metric | Status | Count |
|--------|--------|-------|
| **Total Pages** | ✅ | 156 |
| **Pages with Metadata** | 🟡 | 138/156 (88%) |
| **Pages with BreadcrumbList** | 🔴 | 10/156 (6%) |
| **Pages with OG Images** | 🔴 | 0/156 (0%) |
| **Pages with FAQPage Schema** | 🔴 | 0/156 (0%)* |
| **Pages with Service Schema** | 🟡 | ~110/156 (71%) |

*Note: FAQPage string found 49 times but appears to be in comments/imports, not actual schema rendering

---

## 🚨 TOP 5 BLOCKING ISSUES

### 1. NO OPENGRAPH IMAGES (0/156)
**Impact:** CRITICAL - Zero social media visibility  
**Effort:** 2-3 days  
**Status:** 🔴 BLOCKING LAUNCH

**What's Missing:**
- No OG images for any page
- No Twitter card images
- No social share previews
- Missing 1200x630px images

**What To Do:**
1. Create default OG image template
2. Generate service-specific images for top 20 pages
3. Add ogImage parameter to all metadata.ts files
4. Test social sharing on LinkedIn, Facebook, Twitter

**Files to Update:** All 138 metadata.ts files

---

### 2. BREADCRUMBLIST NOT RENDERING (10/156)
**Impact:** CRITICAL - Google can't understand site hierarchy  
**Effort:** 1 day  
**Status:** 🔴 BLOCKING LAUNCH

**What's Missing:**
- BreadcrumbSchema component exists but not used
- Only 10 pages actually render breadcrumbs
- 146 pages missing breadcrumb schema in HTML

**What To Do:**
- **OPTION A (RECOMMENDED):** Create auto-injecting layout wrapper
- **OPTION B:** Manually add `<BreadcrumbSchema>` to all 156 page.tsx files

**Example Fix:**
```tsx
// Add to every page.tsx
import { BreadcrumbSchema } from '@/components/UXUIDC';

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Current Page', path: '/current-page' }
      ]} />
      {/* rest of page */}
    </>
  );
}
```

---

### 3. NO FAQPAGE SCHEMA (0/156)
**Impact:** HIGH - Missing FAQ rich snippets (30-40% CTR boost)  
**Effort:** 1-2 days  
**Status:** 🔴 BLOCKING LAUNCH

**What's Missing:**
- FAQ sections exist but have no FAQPage schema
- Missing opportunity for rich snippets
- Competitor sites WILL have this

**What To Do:**
1. Create FAQPageSchema component
2. Add to main /faq page
3. Add to all service pages with FAQ sections (~50 pages)

**Example:**
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is a knockout mouse?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A knockout mouse is..."
    }
  }]
}
</script>
```

---

### 4. CANONICAL URL CONFLICT IN ROOT LAYOUT
**Impact:** MEDIUM - All pages have wrong canonical  
**Effort:** 5 minutes  
**Status:** 🔴 BLOCKING LAUNCH

**Problem:**
```tsx
// src/app/layout.tsx line 52
<link rel="canonical" href="https://www.genetargeting.com" />
```
This hardcodes homepage canonical on EVERY page.

**Fix:**
```tsx
// REMOVE the <link rel="canonical"> from layout.tsx
// Next.js metadata API handles this automatically
```

---

### 5. MISSING METADATA ON 18 PAGES
**Impact:** MEDIUM - Pages have no SEO metadata  
**Effort:** 1 hour  
**Status:** 🟡 SHOULD FIX BEFORE LAUNCH

**Pages Missing Metadata:**

1. `/quality-control` - No metadata export
2. `/scientific-leadership` - No metadata export  
3. `/conditional-knockout-vs-conventional-knockout` - No metadata export
4. `/catalog-mouse-models` - Has page.tsx but no metadata.ts
5. Plus 14 more pages (need full audit)

**What To Do:**
Create metadata.ts file for each:
```typescript
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Page Title Here',
  description: 'Compelling 150-160 character description with CTA...',
  path: '/page-path',
});
```

---

## 🟡 HIGH PRIORITY (Fix Within 2 Weeks Post-Launch)

### 6. Lab Signals Blog Missing Article Schema
**Impact:** MEDIUM-HIGH  
**Location:** `/src/app/lab-signals/[slug]/`  
**Count:** ~50 articles

**What's Missing:**
```tsx
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "...",
  "publisher": { "@type": "Organization", ... }
}
```

---

### 7. Service Schema Missing on ~46 Pages
**Impact:** MEDIUM  
**Pages:** Catalog pages, guide pages, some service pages

**Need to add Service schema:**
```tsx
{
  "@type": "Service",
  "name": "Service Name",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "ingenious targeting laboratory"
  }
}
```

---

### 8. Metadata Descriptions Too Short
**Impact:** MEDIUM-HIGH (affects CTR)  
**Problem:** Many descriptions < 150 chars

**Examples:**
- "Alzheimer's Mouse Models from ingenious targeting laboratory. Custom mouse model engineering since 1998." (111 chars)
- Need: 150-160 chars with compelling CTA

**Fix:** Rewrite all descriptions to optimal length

---

### 9. Missing WebSite Search Schema
**Impact:** MEDIUM  
**Location:** Homepage only

**Add to homepage:**
```tsx
{
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.genetargeting.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## 🟢 OPTIMIZE LATER (60-90 Days)

### 10. Internal Linking Strategy
- Add 5-10 contextual links per page
- Create content clusters
- Link related services/technologies

### 11. AI Search Optimization
- Add "People Also Ask" sections
- Create comparison pages
- Build definitive guides
- Add interactive calculators

### 12. Image Optimization
- WebP/AVIF format
- Lazy loading verification
- Alt text audit
- Descriptive filenames

### 13. Core Web Vitals
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- PageSpeed 90+ score

---

## 📋 IMPLEMENTATION CHECKLIST

### Week 1: Pre-Launch Blockers

- [ ] **DAY 1-2:** Create OpenGraph images
  - [ ] Design default template
  - [ ] Create 20 service-specific images
  - [ ] Add to all metadata.ts files
  - [ ] Test social sharing

- [ ] **DAY 3:** Fix BreadcrumbList rendering
  - [ ] Choose implementation approach
  - [ ] Add to all 156 pages
  - [ ] Test in Google Rich Results
  
- [ ] **DAY 4:** Add FAQPage schema
  - [ ] Create FAQPageSchema component
  - [ ] Add to /faq page
  - [ ] Add to top 20 service pages
  - [ ] Validate schema

- [ ] **DAY 5:** Quick fixes
  - [ ] Remove canonical from layout.tsx
  - [ ] Add metadata to 18 missing pages
  - [ ] Final QA pass

### Week 2-3: High Priority Post-Launch

- [ ] Add Article schema to Lab Signals
- [ ] Add Service schema to remaining pages
- [ ] Optimize all metadata descriptions
- [ ] Add WebSite search schema
- [ ] Begin internal linking improvements

### Month 2-3: Ongoing Optimization

- [ ] AI search optimization content
- [ ] Image optimization
- [ ] Core Web Vitals improvements
- [ ] Advanced schema markup

---

## 🎯 SUCCESS METRICS

**6 Months Post-Launch Goals:**
- **Organic Traffic:** +50% vs baseline
- **Top 3 Rankings:** 20+ primary keywords
- **Rich Snippets:** 30+ pages in SERPs
- **Social Shares:** +200% from OG images
- **PageSpeed Score:** 90+
- **Conversion Rate:** +25%

---

## 📊 CURRENT STATE SUMMARY

### ✅ What's Working:
1. Metadata infrastructure exists
2. Canonical URLs properly formatted
3. Organization schema on homepage
4. Service schema on most pages
5. robots.txt and sitemap.xml configured
6. High-quality content
7. Verified testimonials & publications

### 🔴 What's Broken:
1. NO OpenGraph images (0/156)
2. BreadcrumbList not rendering (10/156)
3. NO FAQPage schema (0/156)
4. Canonical conflict in root layout
5. 18 pages missing metadata

### 🟡 What Needs Improvement:
1. Metadata descriptions too short
2. Missing Service schema on 46 pages
3. No Article schema for blog
4. Limited internal linking
5. No WebSite search schema

---

## 🚀 RECOMMENDATION

**DO NOT LAUNCH** until Issues #1-4 are fixed:
1. Add OpenGraph images
2. Fix BreadcrumbList rendering  
3. Add FAQPage schema
4. Remove canonical conflict

**Estimated Time to Fix:** 5-7 days with focused effort

**Alternative:** Launch with known SEO gaps, but expect:
- Poor social media performance
- Lost rich snippet opportunities
- 30-40% lower organic traffic potential
- Competitive disadvantage

**The call is yours, but fixing these BEFORE launch will:**
- Start strong in search results
- Build authority faster
- Maximize social sharing
- Create better user experience
- Beat competitors from day one

---

**Next Step:** Review this report and decide on launch timeline.

If proceeding with fixes, start with OpenGraph images (biggest impact, longest task).
