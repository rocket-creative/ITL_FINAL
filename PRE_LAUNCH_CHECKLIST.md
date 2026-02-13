# 🚀 ITL Website Pre-Launch Checklist
**Date:** February 12, 2026  
**Status:** Ready for Production Launch

---

## ✅ Build & Deployment Status

### Code Quality
- [x] **Production build passes** - All 349 pages generated successfully
- [x] **TypeScript compilation** - No errors
- [x] **Git repository clean** - All changes committed and pushed
- [x] **Latest commit:** `011_fix_vercel-branch-names` (9008000d)

### Git Status
- [x] Branch: `ITL_MAIN` (production branch)
- [x] Remote: `git@github.com:rocket-creative/ITL_FINAL.git`
- [x] All changes pushed to remote
- [x] Vercel branch names corrected

---

## 📋 Required Pre-Launch Actions

### 1. Vercel Deployment Setup
**Status:** ⚠️ NEEDS CONFIGURATION

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import Git Repository: `rocket-creative/ITL_FINAL`
   - Set Production Branch: `ITL_MAIN`
   - Framework Preset: Next.js (auto-detected)

2. **Configure Environment Variables in Vercel**
   Navigate to: Project Settings → Environment Variables

   **Required for tracking:**
   ```
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=3977953
   NEXT_PUBLIC_GA_MEASUREMENT_ID=(add from Google Analytics)
   NEXT_PUBLIC_FB_PIXEL_ID=(add from Facebook)
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=(add from LinkedIn)
   ```

   **Optional (can add later):**
   ```
   NEXT_PUBLIC_TWITTER_PIXEL_ID=
   NEXT_PUBLIC_ADROLL_ADV_ID=
   NEXT_PUBLIC_ADROLL_PIX_ID=
   GOOGLE_SHEETS_API_KEY=(for catalog search)
   ```

3. **Deploy to Production**
   - Push any commit to `ITL_MAIN` branch
   - OR click "Deploy" in Vercel dashboard
   - Wait for build to complete (~2-3 minutes)

---

### 2. Domain Configuration
**Status:** ⚠️ NEEDS SETUP

1. **Add Domain in Vercel**
   - Settings → Domains
   - Add: `www.genetargeting.com`
   - Add: `genetargeting.com` (redirect to www)

2. **Update DNS Records**
   Point domain to Vercel:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

3. **SSL Certificate**
   - Auto-provisioned by Vercel
   - Usually takes 5-10 minutes

---

### 3. Tracking Setup
**Status:** ⚠️ NEEDS IDS

**Get these tracking IDs:**

1. **Google Analytics** (Required)
   - Go to: https://analytics.google.com
   - Create property for `genetargeting.com`
   - Copy Measurement ID (G-XXXXXXXXXX)

2. **Facebook Pixel** (Required)
   - Go to: https://business.facebook.com/events_manager
   - Create new Pixel
   - Copy Pixel ID (16 digits)

3. **LinkedIn Insight Tag** (Highly Recommended)
   - Go to: https://www.linkedin.com/campaignmanager
   - Create Insight Tag
   - Copy Partner ID (7 digits)

**Add these to Vercel Environment Variables**

---

### 4. Search Engine Submission
**Status:** ⏱️ DO AFTER LAUNCH

1. **Google Search Console**
   - Add property: `https://www.genetargeting.com`
   - Verify ownership (HTML meta tag method)
   - Submit sitemap: `https://www.genetargeting.com/sitemap.xml`
   - Request indexing for homepage

2. **Bing Webmaster Tools**
   - Import from Google Search Console (easiest)
   - Submit sitemap

---

## 🔍 Pre-Launch Verification

### Files Ready
- [x] `robots.txt` - Configured for production
- [x] `sitemap.xml` - Generated dynamically (349 pages)
- [x] Security headers configured in `next.config.ts`
- [x] SEO metadata on all pages
- [x] Mobile responsive design
- [x] Performance optimizations enabled

### Known Issues
- [ ] Some tracking IDs not configured (will be added post-deploy)
- [ ] Google Sheets API key for catalog search not set (optional feature)

---

## 🎯 Launch Steps (Tonight)

### Step 1: Deploy to Vercel (15 minutes)
1. Connect GitHub repo to Vercel
2. Set production branch to `ITL_MAIN`
3. Add environment variables (at minimum: HubSpot Portal ID)
4. Click "Deploy"
5. Wait for build to complete

### Step 2: Configure Domain (10 minutes)
1. Add domain in Vercel
2. Update DNS records
3. Wait for SSL certificate
4. Verify site loads at domain

### Step 3: Add Tracking IDs (15 minutes)
1. Get Google Analytics ID
2. Get Facebook Pixel ID
3. Get LinkedIn Partner ID
4. Add to Vercel environment variables
5. Redeploy (or wait for auto-deploy)

### Step 4: Test Live Site (10 minutes)
1. Visit site in incognito mode
2. Test homepage loads
3. Test navigation works
4. Test forms submit (HubSpot)
5. Check browser console for errors
6. Verify tracking fires (use browser dev tools)

### Step 5: Submit to Search Engines (15 minutes)
1. Set up Google Search Console
2. Submit sitemap
3. Request homepage indexing
4. Set up Bing (import from Google)

**Total Time: ~65 minutes**

---

## 📊 Post-Launch Monitoring

### First 24 Hours
- Monitor Vercel deployment logs
- Check Google Analytics real-time reports
- Verify tracking pixels firing
- Monitor for any 404 errors
- Check Core Web Vitals

### First Week
- Review traffic sources
- Check page performance
- Monitor conversion tracking
- Review search console data
- Fix any issues found

---

## 🆘 Emergency Contacts

**Vercel Support:** support@vercel.com  
**DNS Provider:** (add your DNS provider)  
**HubSpot Support:** (add if needed)

---

## ✅ Ready to Launch?

**All Code:** ✅ Ready  
**Build:** ✅ Passing  
**Git:** ✅ Pushed  
**Vercel Config:** ✅ Correct  

**Next Steps:** Deploy to Vercel and configure tracking

---

**Last Updated:** February 12, 2026  
**Commit:** 9008000d
