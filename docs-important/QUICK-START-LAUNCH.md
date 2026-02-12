# ⚡ Quick Start: Launch in 1 Hour

**The bare minimum to launch with tracking + indexing.**

---

## Step 1: Get Your Tracking IDs (20 minutes)

### Google Analytics (Required)
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create account → Create property
3. Select "Web" → Enter website URL
4. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

### Facebook Pixel (Required for Retargeting)
1. Go to [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
2. Click **Connect Data Sources** → **Web** → **Meta Pixel**
3. Name it "ITL Website"
4. Copy **Pixel ID** (16 digits)

### LinkedIn Insight Tag (Highly Recommended - B2B!)
1. Go to [linkedin.com/campaignmanager](https://www.linkedin.com/campaignmanager)
2. Click **Analyze** → **Insight Tag**
3. Click **See tag** or **Create**
4. Copy **Partner ID** (7 digits)

---

## Step 2: Add to Environment File (5 minutes)

Create `.env.local` in your project root:

```bash
# Required
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456

# Highly Recommended
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567

# Optional (can add later)
NEXT_PUBLIC_TWITTER_PIXEL_ID=
NEXT_PUBLIC_ADROLL_ADV_ID=
NEXT_PUBLIC_ADROLL_PIX_ID=
```

---

## Step 3: Deploy to Production (5 minutes)

```bash
# Build and test locally first
npm run build
npm run dev

# Visit http://localhost:3000 and verify:
# - Site loads correctly
# - Forms work
# - No console errors

# Deploy to Vercel
git add .
git commit -m "feat: launch with tracking and redirects"
git push origin main

# Vercel will auto-deploy
```

---

## Step 4: Verify Tracking (10 minutes)

### Test Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Open **Real-time** report
3. Visit your site in incognito window
4. Confirm you see yourself in Real-time

### Test Facebook Pixel
1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper)
2. Visit your site
3. Click extension - should show green checkmark
4. Should see "PageView" event

---

## Step 5: Submit to Google (15 minutes)

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add Property**
3. Enter your domain
4. Verify ownership (HTML meta tag - easiest)
5. Go to **Sitemaps**
6. Submit: `https://www.genetargeting.com/sitemap.xml`
7. Go to **URL Inspection**
8. Test homepage URL
9. Click **Request Indexing**

### Bing Webmaster Tools (Bonus)
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Click **Import from Google Search Console** (instant!)
3. Submit sitemap (same URL as Google)

---

## Step 6: Create Retargeting Audiences (5 minutes)

### Facebook
1. Go to **Ads Manager** → **Audiences**
2. Click **Create Audience** → **Custom Audience** → **Website**
3. Select: "All website visitors" - 180 days
4. Name: "All Website Visitors"
5. Click **Create**

### LinkedIn
1. Go to **Campaign Manager** → **Matched Audiences**
2. Click **Create Audience**
3. Select: **Website Visitors**
4. Name: "Website Visitors - 180 days"
5. Click **Create**

---

## ✅ Done! You're Live!

Your site is now:
- ✅ Live and trackable
- ✅ Submitted to Google for indexing
- ✅ Building retargeting audiences
- ✅ Ready for traffic

---

## What Happens Next?

### First 24 Hours
- Google will crawl your sitemap
- 10-50 pages will be indexed
- Pixels will start collecting data
- Retargeting audiences begin building

### First Week
- 50+ pages indexed
- 100+ visitors tracked
- Retargeting audience: 100+
- Ready to launch retargeting ads

### First Month
- 100+ pages indexed
- Organic traffic growing
- Retargeting audience: 1,000+
- Conversion tracking active

---

## Next Steps (Do These Next Week)

### Week 2: Launch First Retargeting Campaign
1. Create display ads (300x250, 728x90)
2. Target: "All Website Visitors"
3. Budget: $50-100/day
4. Run for 30 days

### Week 3: Content Marketing
1. Publish 2-3 blog posts
2. Share on social media
3. Email to customer list
4. Build more organic traffic

### Week 4: Optimization
1. A/B test quote form
2. Optimize slow pages
3. Fix any 404 errors
4. Improve meta descriptions

---

## 🆘 Quick Troubleshooting

**Pixels not firing?**
- Check `.env.local` has correct IDs
- Accept cookie consent on your site
- Clear browser cache

**Google not indexing?**
- Wait 48 hours
- Check `robots.txt` allows crawling
- Resubmit sitemap

**Forms not working?**
- Check email deliverability
- Test with real email address
- Check spam folder

---

## 📚 Full Documentation

For detailed guides, see:
- `LAUNCH-PLAN.md` - Complete launch strategy
- `LAUNCH-CHECKLIST.md` - Printable checklist
- `REDIRECTS.md` - 301 redirect docs
- `TRACKING-PIXELS-SETUP.md` - Detailed pixel setup

---

**That's it! Launch now, optimize later. 🚀**
