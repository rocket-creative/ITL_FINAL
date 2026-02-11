# ITL Website Launch Checklist
## Zero-Downtime, Zero-SEO-Loss Migration

**Old Domain:** www.genetargeting.com  
**New Domain:** www.ingenious.com (update as needed)  
**Launch Date:** _____________

---

## ✅ PRE-LAUNCH (1 Week Before)

### DNS & Hosting Setup
- [ ] New domain registered and ready
- [ ] Vercel project configured for new domain
- [ ] SSL certificate will auto-provision on Vercel
- [ ] DNS records prepared but NOT yet pointed (do this on launch day)
- [ ] Keep old site accessible during transition

### SEO Preparation
- [ ] **Run URL mapping:** `node scripts/01-url-mapping-generator.js`
  - Result: ✅ 57/57 old URLs accounted for (29 exact, 28 redirected, 0 missing)
- [ ] **Review redirects in:** `itl-website/src/lib/legacy/redirects.json`
  - Current count: 29 redirects configured
  - All redirects use `permanent: true` (301 status)
- [ ] **Generate sitemap:** `node scripts/02-sitemap-generator.js https://www.ingenious.com`
  - Result: ✅ 148 pages, 26KB sitemap generated
- [ ] **Audit metadata:** `node scripts/03-metadata-audit.js https://www.ingenious.com`
  - ⚠️ **CRITICAL:** 3 pages have wrong canonical (accessibility, privacy, terms)
  - ⚠️ **ACTION NEEDED:** 145 pages need metadata (only 3% have it currently)

### Critical Fixes Required
- [ ] **Fix wrong canonicals** on these 3 pages:
  - `/accessibility` - Change canonical from genetargeting.com to ingenious.com
  - `/privacy` - Change canonical from genetargeting.com to ingenious.com
  - `/terms` - Change canonical from genetargeting.com to ingenious.com
- [ ] **Add metadata to all pages** (currently only 5/148 pages have it)
  - See: `METADATA-AUDIT-REPORT.json` for full list
  - Priority: Service pages first, then disease pages, then support pages

### Google Search Console
- [ ] Add new domain (www.ingenious.com) to Google Search Console
- [ ] Verify ownership via DNS TXT record (recommended)
- [ ] DO NOT remove old domain (genetargeting.com) from Search Console
- [ ] Both domains will coexist during transition

### Google Analytics
- [ ] Update GA4 property to track new domain OR
- [ ] Create new GA4 property and keep both active during transition
- [ ] Update `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` and Vercel
- [ ] Test tracking in staging environment

### Tracking Pixels
- [ ] Verify all pixel IDs in environment variables:
  - Google Analytics 4
  - Meta Pixel (Facebook)
  - LinkedIn Insight Tag
  - AdRoll
  - TikTok Pixel
  - Reddit Pixel
  - Quora Pixel
- [ ] Test tracking fires correctly in staging

### Content Verification
- [ ] All forms work (contact, quote request, catalog order)
- [ ] Email notifications configured and tested
- [ ] Images load correctly
- [ ] No broken internal links
- [ ] Admin dashboard accessible at `/admin`

### Performance Testing
- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Test Core Web Vitals
  - LCP < 2.5s
  - FID/INP < 100ms
  - CLS < 0.1
- [ ] Test on mobile devices
- [ ] Test page load times < 2 seconds

### Staging Verification
- [ ] Deploy to Vercel staging environment
- [ ] **Test redirects:** `node scripts/04-redirect-tester.js https://staging-url.vercel.app`
- [ ] Walk through top 20 pages manually
- [ ] Test all forms submit successfully
- [ ] Verify analytics tracking

---

## 🚀 LAUNCH DAY

### Pre-Launch (2-4 hours before DNS change)
- [ ] Final deployment to production (Vercel)
- [ ] Verify deployment successful
- [ ] Take final backup of old site
- [ ] Communicate with stakeholders: "Going live in X hours"
- [ ] Have rollback plan ready (point DNS back to old site if critical issues)

### DNS Cutover (Recommended: 2-4 AM EST for low traffic)
- [ ] **Point DNS A record** to Vercel's IP (or CNAME to Vercel)
- [ ] **Add www subdomain** if using (CNAME to same)
- [ ] **Verify DNS propagation** (use dnschecker.org)
  - Typically takes 15-60 minutes
  - Can take up to 48 hours for global propagation
- [ ] **DO NOT delete old domain** - keep it for redirects

### Immediate Verification (First 30 Minutes)
- [ ] Homepage loads at new domain
- [ ] SSL certificate active (green padlock)
- [ ] Test 5 random service pages load
- [ ] Test contact form submits
- [ ] Test quote request form submits
- [ ] Verify GA4 tracking fires (check Real-Time report)
- [ ] **Test redirects:** `node scripts/04-redirect-tester.js https://www.ingenious.com`
- [ ] Test old URLs redirect properly:
  - https://www.genetargeting.com/knockout-mouse-models → new site
  - https://www.genetargeting.com/contact → new site
  - https://www.genetargeting.com/rosa26 → new site
- [ ] Admin dashboard accessible at /admin
- [ ] robots.txt accessible at new domain

### Google Search Console (First 2 Hours)
- [ ] **CRITICAL: Submit Change of Address**
  1. Open OLD domain (genetargeting.com) in Search Console
  2. Settings → Change of Address
  3. Select new domain from dropdown
  4. Google will verify 301 redirects are working
  5. Submit request
  - ⚠️ This transfers all rankings to new domain
- [ ] Submit new sitemap.xml to NEW domain
- [ ] Request indexing of homepage on new domain
- [ ] Set up email alerts for crawl errors

### Monitoring Setup
- [ ] Enable Vercel Analytics
- [ ] Check error logs for any 500s
- [ ] Monitor GA4 Real-Time for traffic
- [ ] Watch for any alerts

---

## 📊 POST-LAUNCH MONITORING

### First 6 Hours (Check Every 30-60 Minutes)
- [ ] **Monitor 404s:** `vercel logs production | node scripts/05-404-monitor.js`
- [ ] Check Google Search Console for crawl errors
- [ ] Verify traffic levels in GA4 (should be 90-100% of normal)
- [ ] Test organic search: Google "ingenious targeting laboratory"
- [ ] Check server response times
- [ ] Monitor for any error spikes

### Day 1 (Check Every 2-4 Hours)
- [ ] Review 404 report, add any missing redirects
- [ ] Check top 20 keyword rankings (Search Console Performance)
- [ ] Verify backlinks are being followed through redirects
- [ ] Test forms are receiving submissions
- [ ] Check email deliverability
- [ ] Review social media links (update if needed)

### Day 2-3 (Check 2x Daily)
- [ ] Google Search Console coverage report
- [ ] URL Inspection tool on top pages (verify indexing)
- [ ] Check for redirect chains (should be direct 301s)
- [ ] Monitor Core Web Vitals
- [ ] Review traffic trends (minor dip is normal, 5-15%)

### Week 1 (Daily Checks)
- [ ] Run 404 monitor daily, fix any new issues
- [ ] Check ranking positions for top 50 keywords
- [ ] Request indexing for any pages Google hasn't crawled
- [ ] Review analytics for conversion rates
- [ ] Check that old URLs show "Redirected" status in Search Console
- [ ] Verify new URLs are being indexed

### Week 2-4 (Every 2-3 Days)
- [ ] Monitor organic traffic recovery
- [ ] Check Google Search Console "Links" report (backlink transfer)
- [ ] Review any manual actions or warnings
- [ ] Update sitemap if pages added/removed
- [ ] Check schema markup validates on new domain
- [ ] Monitor competitor rankings (should maintain position)

### Month 2-3 (Weekly)
- [ ] Weekly 404 monitoring
- [ ] Traffic trend analysis (should return to baseline or exceed)
- [ ] Keyword ranking progress
- [ ] Core Web Vitals trends
- [ ] Conversion rate tracking

---

## 🔧 TROUBLESHOOTING

### If Traffic Drops >20%
1. Check DNS is pointing correctly
2. Verify all redirects working: `node scripts/04-redirect-tester.js`
3. Check Google Search Console for manual actions
4. Verify Change of Address was submitted
5. Check that important pages are indexed (URL Inspection)
6. Review for any site-wide technical issues (robots.txt, noindex tags)

### If Getting 404 Errors
1. Run: `vercel logs production | node scripts/05-404-monitor.js`
2. Review top 404s in report
3. Add missing redirects to `redirects.json`
4. Deploy fix
5. Re-run redirect tester

### If Redirects Not Working
1. Check `next.config.js` has redirects configured
2. Verify deployment successful
3. Clear CDN cache (Vercel auto-clears)
4. Test specific URL with curl: `curl -I https://www.ingenious.com/old-url`
5. Should see: `HTTP/2 301` and `location: /new-url/`

### If Pages Not Indexing
1. Use URL Inspection tool in Search Console
2. Check for:
   - robots.txt blocking
   - noindex meta tags
   - Canonical pointing elsewhere
   - Redirect chains
3. Request indexing manually
4. Give Google 3-7 days to process

### Emergency Rollback
If critical issues in first 24 hours:
1. Point DNS back to old site immediately
2. Announce temporary reversion to stakeholders
3. Keep new site at staging URL
4. Fix issues in new site
5. Re-attempt launch in 48-72 hours
6. Google Change of Address can be canceled within 180 days

---

## ✨ SUCCESS METRICS

### Week 1 Goals
- ✅ Zero 404 errors for old URLs
- ✅ 90-100% traffic maintained
- ✅ Top 20 pages indexed on new domain
- ✅ Forms receiving submissions
- ✅ Google acknowledged Change of Address

### Week 4 Goals
- ✅ 100% traffic recovered (or exceeded)
- ✅ All important pages indexed
- ✅ Backlinks transferred (check "Links" report)
- ✅ Core Web Vitals in "Good" range
- ✅ Old URLs showing "Redirected" in Search Console

### Week 12 Goals
- ✅ Traffic exceeds old baseline (faster site = better SEO)
- ✅ Rankings improved on target keywords
- ✅ New content pages indexed
- ✅ Old domain stable (but keep redirects forever)
- ✅ Can reduce monitoring frequency

---

## 📝 NOTES & LESSONS LEARNED

_Use this space to document what went well, what didn't, and what to improve for next time_

**What Worked:**


**Issues Encountered:**


**Would Do Differently:**


**Timeline Actual:**
- DNS cutover:
- First indexing:
- Traffic recovery:
- Full stabilization:

---

## 🎯 FINAL REMINDERS

1. ✅ **NEVER delete old domain** - Keep redirects forever
2. ✅ **301 redirects are permanent** - Don't use 302
3. ✅ **Keep monitoring for 90 days** - SEO takes time
4. ✅ **Update all branded materials** with new domain
5. ✅ **Communicate with partners** about domain change
6. ✅ **Update email signatures** to new domain
7. ✅ **Update social media bios** with new URL
8. ✅ **Notify major backlink sources** (optional, but helpful)

---

**Launch Captain:** _____________  
**Technical Lead:** _____________  
**SEO Lead:** _____________  
**Approval:** _____________ (Date)

---

## AUTOMATION COMMANDS QUICK REFERENCE

```bash
# Pre-launch
node scripts/01-url-mapping-generator.js
node scripts/02-sitemap-generator.js https://www.ingenious.com
node scripts/03-metadata-audit.js https://www.ingenious.com

# Test redirects (staging)
node scripts/04-redirect-tester.js https://staging.vercel.app

# Launch day
node scripts/04-redirect-tester.js https://www.ingenious.com

# Post-launch monitoring
vercel logs production | node scripts/05-404-monitor.js

# Or with saved logs
vercel logs production > logs.txt
node scripts/05-404-monitor.js logs.txt
```

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-09
