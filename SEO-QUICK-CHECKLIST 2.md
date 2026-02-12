# ⚡ SEO Quick Checklist - ITL_2026

**Use this checklist to track progress on SEO fixes**

---

## 🔴 BLOCKING ISSUES (Fix Before Launch)

### Issue 1: OpenGraph Images (0/156)
- [ ] Create default OG image template (1200x630px)
- [ ] Design service-specific images for top 20 pages
- [ ] Set up OG image generation system
- [ ] Update metadata.ts files with ogImage paths
- [ ] Test social sharing on:
  - [ ] LinkedIn
  - [ ] Twitter/X
  - [ ] Facebook
- [ ] Verify image rendering in social debugger tools

**Priority Pages for Custom OG Images:**
- [ ] Homepage
- [ ] Knockout mouse models
- [ ] Conditional knockout
- [ ] Knockin models
- [ ] Humanized models
- [ ] Transgenic service
- [ ] Oncology models
- [ ] Neuroscience models
- [ ] Alzheimer's models
- [ ] Cardiovascular models
- [ ] Immunology models
- [ ] Therapeutic areas
- [ ] Technologies
- [ ] About ITL
- [ ] Why Choose ITL
- [ ] Request Quote
- [ ] FAQ
- [ ] Publications
- [ ] Cre-Lox system
- [ ] Resources

---

### Issue 2: BreadcrumbList Not Rendering (146/156)
- [ ] **CHOOSE APPROACH:**
  - [ ] Option A: Auto-inject via layout wrapper (RECOMMENDED)
  - [ ] Option B: Manual add to all 156 pages
- [ ] Implement chosen approach
- [ ] Test on sample pages
- [ ] Validate with Google Rich Results Test
- [ ] Deploy to all pages
- [ ] Verify in browser source code (view page source)

**Test Pages:**
- [ ] Homepage
- [ ] Top 5 service pages
- [ ] Sample disease page
- [ ] Sample technology page
- [ ] Sample guide page

---

### Issue 3: FAQPage Schema (0/50 needed)
- [ ] Create FAQPageSchema component
- [ ] Add to main FAQ page
- [ ] Add to top 20 service pages:
  - [ ] Knockout mouse models
  - [ ] Conditional knockout
  - [ ] Knockin models
  - [ ] Humanized models
  - [ ] Transgenic service
  - [ ] Tissue specific knockout
  - [ ] Conventional knockout
  - [ ] Cre-Lox system
  - [ ] Technologies
  - [ ] Therapeutic areas
  - [ ] Oncology models
  - [ ] Neuroscience models
  - [ ] Immunology models
  - [ ] Cardiovascular models
  - [ ] Metabolic disease
  - [ ] Diabetes models
  - [ ] Research applications
  - [ ] Mouse model services
  - [ ] Preclinical services
  - [ ] Support services
- [ ] Validate with Rich Results Test
- [ ] Monitor for FAQ rich snippets in SERP

---

### Issue 4: Canonical URL Conflict
- [ ] Open `src/app/layout.tsx`
- [ ] Remove line 52: `<link rel="canonical" href="https://www.genetargeting.com" />`
- [ ] Save file
- [ ] Test homepage - verify no duplicate canonical
- [ ] Test sample pages - verify correct canonical
- [ ] Deploy

**Verification:**
- [ ] View source on homepage - should see ONE canonical (from metadata)
- [ ] View source on sample page - should see correct page canonical

---

### Issue 5: Missing Metadata (5 pages)
- [ ] Create metadata.ts for `/quality-control`
- [ ] Create metadata.ts for `/scientific-leadership`
- [ ] Create metadata.ts for `/conditional-knockout-vs-conventional-knockout`
- [ ] Verify `/catalog-mouse-models` has metadata
- [ ] Verify `/pricing-overview` page exists and has metadata

**Template for each:**
```typescript
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Page Title (50-60 chars)',
  description: 'Compelling description 150-160 chars with CTA and keywords for better CTR from SERP...',
  path: '/page-path',
});
```

---

## 🟡 HIGH PRIORITY (Fix Week 2-3)

### Lab Signals Article Schema (~50 articles)
- [ ] Create Article schema template
- [ ] Add to Lab Signals article template
- [ ] Include author name
- [ ] Include publish date
- [ ] Include modified date
- [ ] Include OG image
- [ ] Validate schema
- [ ] Deploy to all articles

---

### Service Schema Missing (46 pages)
- [ ] Audit all service pages for Service schema
- [ ] Create template for Service schema
- [ ] Add to catalog pages
- [ ] Add to guide pages
- [ ] Add to application pages
- [ ] Validate with Rich Results Test

---

### Metadata Description Optimization (~90 pages)
- [ ] Audit all metadata descriptions
- [ ] Identify descriptions < 150 chars
- [ ] Identify descriptions > 160 chars
- [ ] Rewrite to 150-160 chars optimal
- [ ] Include compelling CTAs
- [ ] Include primary keywords
- [ ] Test A/B if possible

**Priority rewrites:**
- [ ] Top 20 service pages
- [ ] All therapeutic area pages
- [ ] All technology pages
- [ ] Homepage (currently 117 chars - expand to 155)

---

### WebSite Search Schema
- [ ] Add WebSite schema to homepage
- [ ] Include SearchAction
- [ ] Configure search URL pattern
- [ ] Validate schema
- [ ] Test sitelinks search box appearance

---

### Remaining FAQPage Schema (30 more pages)
- [ ] Add to all remaining service pages with FAQs
- [ ] Add to disease model pages
- [ ] Add to technology pages
- [ ] Validate all implementations

---

## 🟢 ONGOING OPTIMIZATION (Month 2-3)

### Internal Linking
- [ ] Audit top 50 pages for internal link opportunities
- [ ] Add 5-10 contextual links per page
- [ ] Link disease pages to relevant technologies
- [ ] Link technologies to applications
- [ ] Link services to related guides
- [ ] Create content clusters

**Example clusters:**
- Knockout models → Technologies → Applications → Disease models
- Cre-Lox → Conditional knockout → Tissue specific → Inducible
- Therapeutic areas → Disease models → Research applications

---

### AI Search Optimization
- [ ] Add "People Also Ask" sections to top 50 pages
- [ ] Create 10 new comparison pages:
  - [ ] CRISPR vs ES cell targeting (expand existing)
  - [ ] Knockout vs knockin
  - [ ] Transgenic vs knockin
  - [ ] C57BL/6J vs C57BL/6N (expand existing)
  - [ ] Rosa26 vs H11 vs HPRT
  - [ ] Tamoxifen vs doxycycline inducible
  - [ ] Conventional vs conditional (expand existing)
  - [ ] FLP-FRT vs Cre-Lox
  - [ ] BAC transgenic vs lentiviral
  - [ ] Tag knockin options (FLAG vs HA vs GFP)
- [ ] Create 5 definitive guides:
  - [ ] Complete Guide to Mouse Model Selection
  - [ ] Definitive Guide to Breeding Strategies  
  - [ ] Ultimate Guide to Genotyping
  - [ ] Comprehensive Cre Driver Selection Guide
  - [ ] Complete Guide to Allele Design
- [ ] Add 3 new tools/calculators:
  - [ ] Timeline calculator
  - [ ] Cost estimator
  - [ ] Sample size calculator

---

### Image Optimization
- [ ] Audit all images for format (PNG/JPG → WebP/AVIF)
- [ ] Verify lazy loading implementation
- [ ] Check alt text on all images
- [ ] Use descriptive filenames
- [ ] Optimize image sizes
- [ ] Implement responsive images (srcset)

**Priority images:**
- [ ] Hero images on top pages
- [ ] Scientific diagrams
- [ ] Logo optimizations
- [ ] Icon sets

---

### Core Web Vitals
- [ ] Run Lighthouse audit on production
- [ ] Measure baseline LCP, FID, CLS
- [ ] Optimize LCP to < 2.5s
- [ ] Optimize FID to < 100ms
- [ ] Optimize CLS to < 0.1
- [ ] Implement performance monitoring
- [ ] Set up RUM (Real User Monitoring)

**Optimization targets:**
- [ ] Preload critical fonts
- [ ] Optimize image loading
- [ ] Minimize JavaScript
- [ ] Reduce render-blocking resources
- [ ] Optimize server response time

---

## 📊 VALIDATION CHECKLIST

### Before Launch
- [ ] All 5 blocking issues fixed
- [ ] Random sample of 20 pages tested
- [ ] Social sharing tested on 5 pages
- [ ] Schema validated with Rich Results Test
- [ ] Canonical URLs verified
- [ ] Metadata present on all pages

### Tools to Use
- [ ] Google Rich Results Test - https://search.google.com/test/rich-results
- [ ] Facebook Sharing Debugger - https://developers.facebook.com/tools/debug/
- [ ] Twitter Card Validator - https://cards-dev.twitter.com/validator
- [ ] LinkedIn Post Inspector - https://www.linkedin.com/post-inspector/
- [ ] Lighthouse (Chrome DevTools)
- [ ] Google Search Console (post-launch)

### Week 1 Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify indexing starting
- [ ] Check for crawl errors
- [ ] Monitor Core Web Vitals
- [ ] Track initial rankings

### Month 1 Post-Launch
- [ ] Review organic traffic trends
- [ ] Check rich snippet appearance
- [ ] Analyze social sharing metrics
- [ ] Review conversion rate changes
- [ ] Identify improvement opportunities
- [ ] Adjust strategy as needed

---

## 🎯 SUCCESS METRICS TRACKING

### Week 1
- [ ] All pages indexed in Google
- [ ] No crawl errors
- [ ] Rich snippets appearing for FAQ pages
- [ ] OG images rendering in social shares

### Month 1
- [ ] Baseline traffic established
- [ ] 10+ pages with rich snippets
- [ ] Social shares increasing
- [ ] Core Web Vitals passing

### Month 3
- [ ] +25% organic traffic vs baseline
- [ ] 20+ pages with rich snippets
- [ ] +100% social shares
- [ ] Top 5 rankings for 5+ keywords

### Month 6
- [ ] +50% organic traffic vs baseline
- [ ] 30+ pages with rich snippets
- [ ] +200% social shares
- [ ] Top 3 rankings for 20+ keywords
- [ ] +25% conversion rate

---

## 📞 QUICK REFERENCE

### Key Files to Modify
- `src/app/layout.tsx` - Remove canonical conflict
- `src/lib/seo/generateMetadata.ts` - Already good
- `src/components/UXUIDC/BreadcrumbSchema.tsx` - Already exists
- All `src/app/**/metadata.ts` files - Add ogImage parameter

### Key URLs to Test
- Homepage: https://www.genetargeting.com
- Sample service: https://www.genetargeting.com/knockout-mouse-models
- Sample disease: https://www.genetargeting.com/alzheimers-mouse-models
- FAQ page: https://www.genetargeting.com/faq
- Blog post: https://www.genetargeting.com/lab-signals/[any-article]

### Validation Tools
- Schema: https://search.google.com/test/rich-results
- Social: https://developers.facebook.com/tools/debug/
- Speed: https://pagespeed.web.dev/
- Mobile: https://search.google.com/test/mobile-friendly

---

## ✅ DEFINITION OF DONE

**Site is ready to launch when:**
- [ ] All 5 blocking issues resolved
- [ ] Top 20 pages have OG images
- [ ] All 156 pages rendering breadcrumbs
- [ ] Top 20 pages have FAQPage schema
- [ ] No canonical conflicts
- [ ] All pages have metadata
- [ ] Schema validates in Rich Results Test
- [ ] Social sharing works correctly
- [ ] Lighthouse score > 80
- [ ] No console errors

**Site is fully optimized when:**
- [ ] All 156 pages have OG images
- [ ] All pages have appropriate schema
- [ ] All descriptions 150-160 chars
- [ ] Internal linking strategy complete
- [ ] AI search content added
- [ ] Images optimized
- [ ] Core Web Vitals green
- [ ] Ranking for target keywords
- [ ] Rich snippets appearing regularly

---

**Print this checklist and track your progress!**

**Estimated completion:**
- Blocking issues: 5-7 days
- High priority: 2-3 weeks  
- Full optimization: 2-3 months

**Remember:** Perfect is the enemy of good. Fix blockers first, optimize later!
