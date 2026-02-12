# 🚀 ITL Website Launch Plan

**Version:** 1.0  
**Date:** February 12, 2026  
**Status:** Pre-Launch Checklist

---

## 📋 Table of Contents

1. [Pre-Launch Checklist](#pre-launch-checklist)
2. [Google Indexing Strategy](#google-indexing-strategy)
3. [Retargeting Setup](#retargeting-setup)
4. [Day 1 Launch Actions](#day-1-launch-actions)
5. [Week 1 Monitoring](#week-1-monitoring)
6. [30-Day Growth Plan](#30-day-growth-plan)

---

## ✅ Pre-Launch Checklist

### Technical SEO (Complete Before Launch)

- [ ] **Sitemap Configured** ✅ Already done (`/sitemap.ts`)
- [ ] **Robots.txt Updated** ⚠️ Needs domain update
- [ ] **301 Redirects Live** ✅ Already done (153 redirects)
- [ ] **SSL Certificate** - Verify HTTPS working
- [ ] **Meta Tags** - All pages have title/description
- [ ] **Open Graph** - Social sharing images configured
- [ ] **Canonical URLs** - All pages have proper canonical tags
- [ ] **XML Sitemap Accessible** - Test `/sitemap.xml`

### Analytics & Tracking

- [ ] **Google Analytics 4** - Install and verify
- [ ] **Google Search Console** - Add property and verify
- [ ] **Facebook Pixel** - Install and test
- [ ] **LinkedIn Insight Tag** - Install and test (B2B critical!)
- [ ] **Twitter/X Pixel** - Install and test
- [ ] **AdRoll Pixel** - Install and test
- [ ] **Google Tag Manager** (Optional) - Centralized tracking

### Performance

- [ ] **Core Web Vitals** - Test with PageSpeed Insights
- [ ] **Mobile Responsiveness** - Test on real devices
- [ ] **Image Optimization** - All images WebP/AVIF
- [ ] **CDN Active** - Vercel edge network working

### Content

- [ ] **Legal Pages** - Privacy policy, Terms, Accessibility
- [ ] **Contact Forms** - All forms working and delivering
- [ ] **Phone Numbers** - All clickable and correct
- [ ] **Email Links** - All working
- [ ] **Social Links** - All correct and working

---

## 🔍 Google Indexing Strategy

### Immediate Actions (Launch Day)

#### 1. Google Search Console Setup (30 minutes)

**A. Add Property**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property**
3. Enter: `https://www.genetargeting.com` (or your new domain)
4. Choose **Domain** property (covers www, non-www, http, https)

**B. Verify Ownership**
Method 1: DNS Verification (Recommended)
- Add TXT record to DNS: `google-site-verification=YOUR_CODE`
- Or use Vercel's DNS if hosting there

Method 2: HTML Meta Tag
- Add to `<head>`: Already in place via Next.js

Method 3: HTML File Upload
- Download verification file
- Place in `/public` folder

**C. Submit Sitemap**
1. In Search Console, go to **Sitemaps**
2. Submit: `https://www.genetargeting.com/sitemap.xml`
3. Status should show "Success" within minutes

#### 2. Request Immediate Indexing (15 minutes)

**Method A: URL Inspection Tool (First 10 URLs)**
1. In Search Console, use **URL Inspection**
2. Enter key URLs one by one:
   - Homepage: `/`
   - Quote page: `/request-quote`
   - Services: `/mouse-model-services`
   - Knockout: `/knockout-mouse-models`
   - Humanized: `/humanized-mouse-models`
   - Catalog: `/catalog-mouse-models`
   - About: `/about-itl`
   - Contact: `/contact`
3. Click **Request Indexing** for each

**Method B: Google Indexing API (Bulk - Recommended)**

Create this script: `scripts/submit-to-google.js`

```javascript
// Google Indexing API - Submits URLs for immediate crawling
// Requires: Google Cloud Project + Service Account

const { google } = require('googleapis');
const fs = require('fs');

// Your service account key (download from Google Cloud Console)
const key = require('./service-account-key.json');

// Initialize auth
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

// Priority URLs to index immediately
const urlsToIndex = [
  'https://www.genetargeting.com/',
  'https://www.genetargeting.com/request-quote/',
  'https://www.genetargeting.com/knockout-mouse-models/',
  'https://www.genetargeting.com/humanized-mouse-models/',
  'https://www.genetargeting.com/catalog-mouse-models/',
  'https://www.genetargeting.com/mouse-model-services/',
  'https://www.genetargeting.com/about-itl/',
  'https://www.genetargeting.com/contact/',
  // Add your top 100 pages
];

async function submitUrl(url) {
  try {
    await jwtClient.authorize();
    
    const res = await google.indexing('v3').urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: url,
        type: 'URL_UPDATED'
      }
    });
    
    console.log(`✓ Submitted: ${url}`);
    return res.data;
  } catch (error) {
    console.error(`✗ Failed: ${url}`, error.message);
  }
}

async function submitAll() {
  console.log('Submitting URLs to Google...\n');
  
  for (const url of urlsToIndex) {
    await submitUrl(url);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
  }
  
  console.log('\n✓ All URLs submitted!');
}

submitAll();
```

**Setup Google Indexing API:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: "ITL Website Indexing"
3. Enable **Indexing API**
4. Create **Service Account**
5. Download JSON key
6. Add service account to Search Console (Settings → Users)
7. Run script: `node scripts/submit-to-google.js`

#### 3. Bing Webmaster Tools (5 minutes)

Don't forget Bing! 10-15% of B2B traffic comes from Bing.

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://www.genetargeting.com`
3. Verify via Google Search Console (instant import)
4. Submit sitemap: `/sitemap.xml`
5. Use **URL Submission API** for instant indexing

#### 4. Create High-Value Backlinks (Day 1)

**Immediate Link Building:**

1. **Company Profiles** (30 minutes)
   - LinkedIn Company Page → Add website
   - Facebook Business Page → Add website
   - Twitter/X Profile → Add website
   - Crunchbase → Create/update profile
   - G2, Capterra, TrustRadius → Create profiles

2. **Industry Directories** (1 hour)
   - Scientific directories
   - Biotech industry listings
   - Chamber of Commerce
   - Better Business Bureau

3. **Press Release** (if applicable)
   - PRWeb, PRNewswire
   - Include website link
   - Google News pickup = fast indexing

4. **Social Signals** (15 minutes)
   - Post launch announcement on all social channels
   - Include link to homepage
   - Tag relevant industry accounts
   - Use hashtags: #biotech #research #mousemodels

---

## 📊 Retargeting Setup

### Facebook/Meta Pixel Implementation

#### Setup (Already Done ✅)
Your Facebook Pixel is already implemented in:
- `src/components/analytics/FacebookPixel.tsx`
- Loads in `src/app/layout.tsx` via `<AllPixels />`

#### Configuration Required

**1. Get Your Pixel ID**
```bash
# Add to .env.local
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

**2. Create Your Pixel**
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Click **Connect Data Sources** → **Web** → **Meta Pixel**
3. Name: "ITL Website - Production"
4. Copy Pixel ID
5. Add to `.env.local`

**3. Verify Installation**
- Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper) Chrome extension
- Visit your site
- Extension should show green checkmark
- Events should show: PageView

**4. Set Up Custom Audiences**

Create these audiences in Ads Manager:

| Audience Name | Rules | Use Case |
|--------------|-------|----------|
| All Website Visitors | Anyone who visited any page in last 180 days | Broad retargeting |
| Service Page Viewers | Visited any `/mouse-model-services/*` page | Service-focused ads |
| Knockout Researchers | Visited knockout or conditional knockout pages | Specific model ads |
| Humanized Model Interest | Visited humanized mouse pages | Humanized model ads |
| Quote Started | Visited `/request-quote` but didn't submit | High-intent, abandoned |
| Converted Leads | Visited `/request-quote/thank-you` | Exclude from ads |

**5. Create Lookalike Audiences**
- Once you have 100+ website visitors
- Create 1% lookalike in US
- Target similar researchers

### LinkedIn Insight Tag (Critical for B2B!)

#### Why LinkedIn Matters
- 80%+ of your leads are B2B decision makers
- Best platform for pharma/biotech targeting
- Highest quality retargeting for scientific audience

#### Setup

**1. Get Your Partner ID**
```bash
# Add to .env.local
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567
```

**2. Create Tag**
1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager)
2. Click **Analyze** → **Insight Tag**
3. Copy Partner ID
4. Add to `.env.local`

**3. Create Matched Audiences**

| Audience | Definition | Size Target |
|----------|-----------|-------------|
| Website Visitors (180 days) | All pages | 300+ |
| Service Researchers | Service pages, 90 days | 100+ |
| High-Intent Leads | Quote page visitors, 60 days | 50+ |

**4. LinkedIn Lead Gen Forms**
- Create in-platform lead forms
- Pre-fill with LinkedIn data
- 3x higher conversion than landing pages
- Syncs directly to CRM

### Google Ads Remarketing

#### Setup

**1. Link Google Ads to Analytics**
1. In GA4, go to **Admin** → **Google Ads Links**
2. Link your Google Ads account
3. Enable auto-tagging

**2. Create Remarketing Audiences**

In Google Ads:
- **Tools** → **Audience Manager** → **Create Audience**

| Audience | Rules | Duration |
|----------|-------|----------|
| All Visitors | Any page view | 540 days (max) |
| Service Pages | URL contains `/mouse-model-services/` | 180 days |
| Knockout Researchers | URL contains `knockout` | 180 days |
| Humanized Researchers | URL contains `humanized` | 180 days |
| Cart Abandoners | Visited quote form, no thank you page | 30 days |

**3. RLSA (Remarketing Lists for Search Ads)**
- Bid higher when past visitors search for your keywords
- Best ROI in paid search
- Set up immediately

### AdRoll (Display Retargeting)

#### Why AdRoll
- Reaches users on 100+ ad networks
- Includes Facebook, Instagram, web display
- Simple dashboard
- Good for cross-platform campaigns

#### Setup (Already Done ✅)
Already implemented in `src/components/analytics/AdRollPixel.tsx`

**1. Get Your IDs**
```bash
# Add to .env.local
NEXT_PUBLIC_ADROLL_ADV_ID=ABCDEFGHIJKLMNOPQRST
NEXT_PUBLIC_ADROLL_PIX_ID=UVWXYZ1234567890ABCD
```

**2. Create Account**
1. Go to [AdRoll](https://app.adroll.com)
2. Create account
3. Add website
4. Copy Advertiser ID and Pixel ID

**3. Create Display Ads**
- 300x250 (medium rectangle)
- 728x90 (leaderboard)
- 160x600 (wide skyscraper)
- 320x50 (mobile banner)

**Ad Creative Ideas:**
- "Still researching knockout mice? Get a quote in 5 minutes"
- "2,500+ successful mouse models since 1998"
- "Don't settle for off-the-shelf. Custom models in 6-9 months"

### Twitter/X Pixel

**Setup**
```bash
# Add to .env.local
NEXT_PUBLIC_TWITTER_PIXEL_ID=abcd1
```

Already implemented in `src/components/analytics/TwitterPixel.tsx`

**Retargeting Strategy:**
- Target science Twitter community
- Promote blog content to researchers
- Academic/research-focused messaging

---

## 🎯 Conversion Tracking Setup

### Events to Track on ALL Platforms

Implement these unified tracking calls:

**1. Quote Request (Highest Value)**
```typescript
// In your quote form component
import { trackQuoteRequestAllPlatforms } from '@/components/analytics';

async function handleSubmit(data) {
  // Track conversion on all platforms
  trackQuoteRequestAllPlatforms({
    modelType: data.modelType,
    serviceType: 'custom-model',
    value: 100, // Estimated lead value
  });
  
  // Submit form...
}
```

**2. Contact Form**
```typescript
trackContactAllPlatforms({
  formType: 'general-inquiry',
  value: 50,
});
```

**3. Phone Call Click**
```typescript
trackPhoneCallAllPlatforms();
```

**4. Email Click**
```typescript
trackEmailClickAllPlatforms();
```

**5. Catalog Download**
```typescript
trackCatalogDownloadAllPlatforms({
  catalogType: 'humanized-mice',
});
```

### Assign Dollar Values

Set estimated values for each conversion:

| Conversion | Value | Reasoning |
|------------|-------|-----------|
| Quote Request | $100 | High-intent lead, 20% close rate |
| Contact Form | $50 | General inquiry, 10% close rate |
| Phone Call | $75 | Direct conversation, 15% close rate |
| Catalog Download | $25 | Early research stage |
| Newsletter Signup | $10 | Long-term nurture |

These values help algorithms optimize for revenue, not just clicks.

---

## 📅 Day 1 Launch Actions

### Hour 1: Go Live

- [ ] Deploy to production (Vercel)
- [ ] Verify site loads on HTTPS
- [ ] Test 3-5 key pages manually
- [ ] Verify all redirects working
- [ ] Check mobile rendering

### Hour 2: Submit to Search Engines

- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for top 10 URLs
- [ ] Submit to Bing Webmaster Tools
- [ ] Post on social media (creates backlinks)

### Hour 3: Analytics Verification

- [ ] Test Google Analytics (check Real-time)
- [ ] Test Facebook Pixel (use Pixel Helper extension)
- [ ] Test LinkedIn Insight Tag
- [ ] Test AdRoll pixel
- [ ] Submit test quote request to verify conversion tracking

### Hour 4: Initial Outreach

- [ ] Email announcement to existing customers (include link)
- [ ] Post on LinkedIn Company Page
- [ ] Post on Twitter/X
- [ ] Update email signatures with new URL
- [ ] Update business cards/marketing materials

---

## 📈 Week 1 Monitoring

### Daily Checks (Days 1-7)

**Google Search Console:**
- Coverage: Any indexing errors?
- Performance: Any impressions/clicks yet?
- Sitemap status: All URLs discovered?

**Analytics:**
- Traffic sources
- Top landing pages
- Bounce rate
- Conversion rate

**Technical:**
- Any 404 errors?
- Any slow-loading pages?
- Any console errors?

### Immediate Fixes

If Google hasn't crawled after 48 hours:
1. Check robots.txt isn't blocking
2. Resubmit sitemap
3. Request indexing again for key pages
4. Check server is responding (not down)

---

## 🚀 30-Day Growth Plan

### Week 1: Foundation

**SEO:**
- ✅ Site indexed by Google
- ✅ 301 redirects working
- ✅ Sitemap submitted
- Submit site to industry directories
- Create Google My Business listing

**Paid:**
- Launch Google Search retargeting campaign
- Launch Facebook retargeting to website visitors
- Set daily budget: $50-100/day to start

### Week 2: Content & Links

**Content:**
- Publish 2-3 blog posts
- Share on social media
- Email to customer list

**Link Building:**
- Reach out to past publications
- Update citations with new URL
- Submit to .edu resource pages
- Update supplier directories

### Week 3: Optimization

**Conversion Rate:**
- A/B test quote form
- Test different CTAs
- Optimize mobile experience

**SEO:**
- Monitor Search Console for opportunities
- Fix any crawl errors
- Update meta descriptions based on CTR data

**Paid:**
- Analyze retargeting performance
- Add negative keywords
- Expand to lookalike audiences

### Week 4: Scale

**Expand Retargeting:**
- Launch LinkedIn campaigns
- Add more display placements
- Create video ads

**Content:**
- Weekly blog posts
- Case studies
- Customer testimonials

**Email:**
- Welcome series for new visitors
- Abandoned cart sequence
- Educational drip campaign

---

## 📊 Success Metrics

### Week 1 Goals

| Metric | Target | How to Check |
|--------|--------|--------------|
| Pages Indexed | 50+ | Google Search Console → Coverage |
| Organic Traffic | 50+ visits | Google Analytics → Acquisition |
| Retargeting Pool | 100+ users | Meta Ads Manager → Audiences |
| Conversions | 2-5 | GA4 → Conversions |

### Month 1 Goals

| Metric | Target |
|--------|--------|
| Pages Indexed | 100+ (all pages) |
| Organic Traffic | 500+ visits |
| Retargeting Pool | 1,000+ users |
| Conversions | 15-25 |
| Returning Visitors | 20% |

### Month 3 Goals

| Metric | Target |
|--------|--------|
| Organic Traffic | 2,000+ visits/month |
| Top 10 Rankings | 5-10 keywords |
| Conversion Rate | 3%+ |
| Cost Per Lead | < $150 |

---

## 🛠️ Required Environment Variables

Create `.env.local` file:

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Ads (optional)
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Facebook/Meta Pixel
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456

# LinkedIn Insight Tag
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567

# Twitter/X Pixel
NEXT_PUBLIC_TWITTER_PIXEL_ID=abcd1

# AdRoll
NEXT_PUBLIC_ADROLL_ADV_ID=ABCDEFGHIJKLMNOPQRST
NEXT_PUBLIC_ADROLL_PIX_ID=UVWXYZ1234567890ABCD
```

---

## ✅ Pre-Flight Final Checklist

Before you flip the switch:

- [ ] All pixels have valid IDs in `.env.local`
- [ ] Tested one conversion on staging
- [ ] Robots.txt allows crawling
- [ ] Sitemap.xml loads successfully
- [ ] SSL certificate valid
- [ ] All 301 redirects working
- [ ] Contact forms deliver emails
- [ ] Phone numbers are clickable
- [ ] Mobile site works perfectly
- [ ] Privacy policy updated
- [ ] Cookie consent working
- [ ] Google Search Console verified
- [ ] Analytics shows real-time data

---

## 🆘 Emergency Contacts

### If Something Goes Wrong

**Site Down:**
- Check Vercel dashboard
- Check DNS settings
- Check domain registrar

**Google Not Indexing:**
- Verify robots.txt allows crawling
- Check Search Console for errors
- Resubmit sitemap
- Request indexing manually

**Pixels Not Firing:**
- Check browser console for errors
- Verify environment variables loaded
- Check cookie consent is granted
- Use platform-specific debug tools

---

## 📞 Next Steps

1. **Get Pixel IDs** - Set up accounts for all platforms
2. **Add to Environment** - Update `.env.local`
3. **Test Locally** - Verify pixels fire
4. **Deploy** - Push to production
5. **Verify** - Check pixels on live site
6. **Submit to Google** - Search Console + Indexing API
7. **Launch Retargeting** - Create first campaigns

---

**Ready to launch?** Follow this checklist step-by-step and you'll have fast indexing + comprehensive retargeting within 24 hours of going live!
