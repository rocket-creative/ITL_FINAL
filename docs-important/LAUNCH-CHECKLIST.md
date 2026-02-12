# 🚀 Launch Day Checklist

**Print this and check off as you go!**

---

## ⏰ T-Minus 24 Hours (Day Before Launch)

### Analytics Setup
- [ ] Created Google Analytics 4 property
- [ ] Added GA4 Measurement ID to `.env.local`
- [ ] Created Facebook Business Manager account
- [ ] Created Meta Pixel and added ID to `.env.local`
- [ ] Created LinkedIn Campaign Manager account
- [ ] Added LinkedIn Partner ID to `.env.local`
- [ ] Created Twitter Ads account (optional)
- [ ] Added Twitter Pixel ID to `.env.local` (optional)
- [ ] Created AdRoll account
- [ ] Added AdRoll IDs to `.env.local`

### Google Search Console
- [ ] Created Search Console property
- [ ] Verified ownership (DNS or meta tag)
- [ ] Ready to submit sitemap on launch day

### Bing Webmaster Tools
- [ ] Created Bing Webmaster account
- [ ] Verified site (can import from Google)
- [ ] Ready to submit sitemap

### Testing
- [ ] Tested site on staging environment
- [ ] All forms submit correctly
- [ ] All pixels fire (use browser extensions)
- [ ] Mobile site works perfectly
- [ ] All pages load under 3 seconds

### Content
- [ ] Privacy policy updated with new domain
- [ ] Terms of service reviewed
- [ ] Cookie consent banner working
- [ ] Contact information correct
- [ ] Social media profiles updated

---

## 🎯 Launch Day - Hour 1

**Time: ___:___ AM/PM**

### Deploy to Production
- [ ] Pushed code to main branch
- [ ] Vercel deployment successful
- [ ] Site loads at production URL
- [ ] HTTPS certificate valid
- [ ] No console errors in browser

### Quick Verification
- [ ] Homepage loads correctly
- [ ] `/request-quote` page works
- [ ] `/contact` page works
- [ ] At least 5 key pages checked
- [ ] Mobile site works
- [ ] All images loading

---

## 🔍 Launch Day - Hour 2

**Time: ___:___ AM/PM**

### Google Search Console
- [ ] Logged into Search Console
- [ ] Confirmed property verified
- [ ] Submitted sitemap: `/sitemap.xml`
- [ ] Sitemap shows "Success" status
- [ ] Used URL Inspection tool on homepage
- [ ] Clicked "Request Indexing" for homepage
- [ ] Requested indexing for `/request-quote`
- [ ] Requested indexing for `/knockout-mouse-models`
- [ ] Requested indexing for `/humanized-mouse-models`
- [ ] Requested indexing for `/catalog-mouse-models`

### Bing Webmaster Tools
- [ ] Logged into Bing Webmaster
- [ ] Submitted sitemap: `/sitemap.xml`
- [ ] Verified sitemap accepted

---

## 📊 Launch Day - Hour 3

**Time: ___:___ AM/PM**

### Analytics Verification
- [ ] Opened Google Analytics 4
- [ ] Navigated to "Real-time" report
- [ ] Visited site in incognito window
- [ ] Confirmed page view appears in GA4
- [ ] Installed Meta Pixel Helper Chrome extension
- [ ] Visited site with Pixel Helper
- [ ] Confirmed Facebook Pixel fires (green checkmark)
- [ ] Confirmed PageView event tracked
- [ ] Checked LinkedIn Campaign Manager
- [ ] Confirmed Insight Tag status shows "Active"

### Test Conversions
- [ ] Submitted test quote request form
- [ ] Confirmed form delivered to email
- [ ] Checked GA4 for conversion event
- [ ] Checked Facebook Events Manager for Lead event
- [ ] Checked LinkedIn for conversion (may take 24h)

---

## 📢 Launch Day - Hour 4

**Time: ___:___ AM/PM**

### Announcements
- [ ] Posted launch announcement on LinkedIn Company Page
- [ ] Posted on Twitter/X
- [ ] Posted on Facebook Business Page
- [ ] Sent email to customer database
- [ ] Updated email signatures with new URL
- [ ] Updated business cards (if applicable)

### Create Backlinks
- [ ] Updated LinkedIn Company Page website URL
- [ ] Updated Facebook Business Page website URL
- [ ] Updated Twitter/X profile link
- [ ] Submitted to Crunchbase
- [ ] Submitted to relevant industry directories

---

## 🎬 Launch Day - End of Day

**Time: ___:___ PM**

### Final Verification
- [ ] Site has been live for 8+ hours
- [ ] No major errors reported
- [ ] At least 10 page views in GA4
- [ ] Pixels collecting data
- [ ] No 404 errors in Search Console

### Monitor
- [ ] Checked Google Search Console - no critical errors
- [ ] Checked Analytics - traffic looks normal
- [ ] Checked Vercel dashboard - no errors
- [ ] All redirects working (test 5-10 old URLs)

---

## 📅 Day 2 After Launch

### Google Indexing
- [ ] Checked Search Console → Coverage
- [ ] Noted how many pages indexed (target: 10+)
- [ ] If 0 pages indexed, resubmitted sitemap
- [ ] Used URL Inspection on 5 more key pages

### Analytics Review
- [ ] Reviewed yesterday's traffic
- [ ] Top pages
- [ ] Traffic sources
- [ ] Bounce rate
- [ ] Any conversions?

### Fix Any Issues
- [ ] Fixed any 404 errors found
- [ ] Fixed any slow-loading pages
- [ ] Addressed any console errors

---

## 📅 Day 7 After Launch

### SEO Progress
- [ ] Pages indexed: _____ out of 170+
- [ ] Impressions in Search Console: _____
- [ ] Clicks from Google: _____
- [ ] Average position: _____

### Analytics
- [ ] Total visitors week 1: _____
- [ ] Conversions week 1: _____
- [ ] Top landing pages identified
- [ ] Top traffic sources identified

### Retargeting
- [ ] Retargeting audience size: _____ (target: 100+)
- [ ] Created first Facebook retargeting campaign
- [ ] Set daily budget: $_____
- [ ] Campaign status: Active / Pending

---

## 📅 Day 30 After Launch

### SEO Milestones
- [ ] 100+ pages indexed
- [ ] 1,000+ impressions
- [ ] 50+ clicks from organic search
- [ ] Top 3 ranking keywords identified

### Retargeting Performance
- [ ] Audience size: _____ (target: 1,000+)
- [ ] Retargeting campaigns running on:
  - [ ] Facebook/Instagram
  - [ ] LinkedIn
  - [ ] Google Display
  - [ ] AdRoll
- [ ] Cost per conversion: $_____
- [ ] ROAS: _____x

### Optimization
- [ ] Identified top performing pages
- [ ] Identified underperforming pages
- [ ] A/B tested quote form CTA
- [ ] Updated meta descriptions based on CTR data
- [ ] Created 4+ blog posts for SEO

---

## 🆘 Emergency Troubleshooting

### Site Down
**Symptom:** Site not loading  
**Fix:**
1. Check Vercel dashboard for errors
2. Check domain DNS settings
3. Check SSL certificate status
4. Check recent deployments for issues

### Google Not Indexing
**Symptom:** 0 pages indexed after 48 hours  
**Fix:**
1. Check `robots.txt` - should allow crawling
2. Verify sitemap is accessible: `/sitemap.xml`
3. Check Search Console for crawl errors
4. Resubmit sitemap
5. Manually request indexing for top 10 URLs

### Pixels Not Firing
**Symptom:** No data in Meta/LinkedIn/etc.  
**Fix:**
1. Check `.env.local` has correct IDs
2. Verify environment variables loaded: `console.log(process.env.NEXT_PUBLIC_FB_PIXEL_ID)`
3. Check browser console for errors
4. Verify cookie consent granted (accept marketing cookies)
5. Clear browser cache and retry
6. Use platform debug tools (Meta Pixel Helper, etc.)

### Conversions Not Tracking
**Symptom:** Forms submit but no conversion events  
**Fix:**
1. Verify tracking code in form submit handler
2. Check browser console for tracking function errors
3. Wait 24-48 hours (some platforms have delay)
4. Use platform test modes:
   - GA4: DebugView
   - Facebook: Test Events
   - LinkedIn: Event debugging

### Redirects Not Working
**Symptom:** Old URLs return 404 instead of redirecting  
**Fix:**
1. Verify redirects.json is valid JSON
2. Rebuild site: `npm run build`
3. Check `next.config.ts` imports redirects correctly
4. Test specific URLs with curl: `curl -I https://domain.com/old-url`
5. Clear CDN cache (Vercel automatically does this)

---

## 📞 Support Resources

### Documentation
- `LAUNCH-PLAN.md` - Full launch strategy
- `REDIRECTS.md` - 301 redirect documentation
- `TRACKING-PIXELS-SETUP.md` - Pixel setup guide

### Platform Links
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Facebook Events Manager](https://business.facebook.com/events_manager)
- [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Vercel Dashboard](https://vercel.com/dashboard)

### Testing Tools
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Structured Data Testing Tool](https://validator.schema.org/)
- [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper)
- [Tag Assistant](https://tagassistant.google.com/)

---

## ✅ Success Criteria

### Week 1
- ✅ 50+ pages indexed by Google
- ✅ Site loads in under 3 seconds
- ✅ 100+ retargeting pixel fires
- ✅ 2+ conversions tracked

### Month 1
- ✅ 100+ pages indexed
- ✅ 500+ organic visitors
- ✅ 1,000+ retargeting audience
- ✅ 15+ conversions

### Month 3
- ✅ All pages indexed
- ✅ 2,000+ organic visitors/month
- ✅ 5-10 top 10 keyword rankings
- ✅ 3%+ conversion rate
- ✅ < $150 cost per lead

---

**Good luck with your launch! 🚀**

*Remember: Perfect is the enemy of good. Launch now, optimize later.*
