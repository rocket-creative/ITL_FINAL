# AdRoll Retargeting Setup Guide

**Budget:** $250/mo for retargeting website visitors

---

## What is AdRoll?

AdRoll shows your ads to people who have already visited your website. They see your ads on:
- Other websites (display network)
- Facebook and Instagram
- Email campaigns

This is called "retargeting" - you're re-engaging warm leads who already know about ITL.

---

## Step 1: Create AdRoll Account

1. Go to: https://www.adroll.com
2. Click **Get Started Free**
3. Sign up with your business email
4. Verify your email
5. Complete business profile:
   - Company: Ingenious Targeting Laboratory
   - Website: https://www.genetargeting.com
   - Industry: Biotechnology / Life Sciences

---

## Step 2: Get Your Pixel IDs

After account creation:

1. Click **Audiences** in the left menu
2. Click **Install Pixel** or **Pixel Setup**
3. You'll see two values:
   - **Advertiser ID** (adroll_adv_id): 20-character alphanumeric
   - **Pixel ID** (adroll_pix_id): 20-character alphanumeric

Example format:
```
Advertiser ID: ABCDEFGHIJKLMNOPQRST
Pixel ID: 12345ABCDE67890FGHIJ
```

**Copy both of these values!**

---

## Step 3: Add to Environment Variables

### Local Development (.env.local)

Open `.env.local` in your project and add:

```bash
# AdRoll Retargeting
NEXT_PUBLIC_ADROLL_ADV_ID=your_advertiser_id_here
NEXT_PUBLIC_ADROLL_PIX_ID=your_pixel_id_here
```

### Production (Vercel)

1. Go to: https://vercel.com/dashboard
2. Click on your **ITL project**
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_ADROLL_ADV_ID` | Your Advertiser ID | All |
| `NEXT_PUBLIC_ADROLL_PIX_ID` | Your Pixel ID | All |

5. Click **Save** for each
6. **Redeploy** your site

---

## Step 4: Verify Pixel is Working

The AdRoll pixel is already enabled in your codebase. After adding the environment variables:

1. Redeploy your site (Vercel will auto-deploy on env var change)
2. Visit your live site
3. Go to AdRoll dashboard → **Audiences** → **Pixel**
4. Check status shows **Active** with recent activity

### Browser Console Test

1. Open your site
2. Press F12 → Console
3. Type: `window.__adroll_loaded`
4. Should return `true`

---

## Step 5: Create Audience Segments in AdRoll

Your pixel automatically tracks page types. Now create segments in AdRoll:

1. Go to **Audiences** → **Segments**
2. Click **Create Segment**

### Segment 1: High Intent Visitors

- Name: `High Intent - Product Pages`
- Rule: URL contains `/knockout` OR `/knockin` OR `/humanized`
- Lookback: 30 days
- This captures visitors who viewed specific service pages

### Segment 2: Quote Page Abandoners

- Name: `Quote Abandoners`
- Rule: URL contains `request-quote` AND did NOT convert
- Lookback: 14 days
- These are your hottest leads - they almost converted!

### Segment 3: Service Browsers

- Name: `Service Browsers`
- Rule: URL contains `-services` OR `-service`
- Lookback: 30 days
- Visitors interested in services but haven't requested a quote

### Segment 4: Disease Model Interest

- Name: `Disease Model Researchers`
- Rule: URL contains `-mouse-models` OR `-mice`
- Lookback: 45 days
- Researchers looking for specific disease models

### Segment 5: All Visitors (Exclude Converters)

- Name: `All Visitors`
- Rule: Visited any page
- Exclude: Visitors who converted
- Lookback: 60 days

---

## Step 6: Create Retargeting Campaigns

### Campaign Structure ($250/mo)

| Campaign | Segment | Budget | Priority |
|----------|---------|--------|----------|
| Hot Leads | Quote Abandoners | $100 (40%) | Highest |
| Warm Leads | Product Pages | $87.50 (35%) | Medium |
| Nurture | All Visitors | $62.50 (25%) | Lower |

### Create Campaign 1: Hot Leads

1. Click **Campaigns** → **Create Campaign**
2. Campaign type: **Web Retargeting**
3. Name: `ITL - Quote Abandoners`
4. Audience: Select `Quote Abandoners` segment
5. Budget: $3.30/day (~$100/mo)
6. Bid strategy: **Optimize for Conversions**

### Create Campaign 2: Warm Leads

1. Create new campaign
2. Name: `ITL - Product Interest`
3. Audience: `High Intent - Product Pages`
4. Budget: $2.90/day (~$87.50/mo)
5. Bid strategy: **Balanced**

### Create Campaign 3: Nurture

1. Create new campaign
2. Name: `ITL - Brand Awareness`
3. Audience: `All Visitors`
4. Budget: $2.10/day (~$62.50/mo)
5. Bid strategy: **Maximize Reach**

---

## Step 7: Create Ad Creatives

### Ad Sizes Needed

Create these sizes for maximum reach:
- 300x250 (medium rectangle) - Most common
- 728x90 (leaderboard)
- 160x600 (wide skyscraper)
- 300x600 (half page)

### Ad Copy Guidelines

**Hot Leads (Quote Abandoners):**
- Headline: "Ready to Start Your Project?"
- Body: "Complete your quote request. Expert team standing by."
- CTA: "Get Your Quote"

**Warm Leads (Product Interest):**
- Headline: "Custom Mouse Models"
- Body: "26+ years. 2,500+ projects. Guaranteed results."
- CTA: "Request Consultation"

**Nurture (All Visitors):**
- Headline: "Ingenious Targeting Laboratory"
- Body: "The mouse model experts since 1998."
- CTA: "Learn More"

### Design Tips

- Use ITL brand colors
- Include logo prominently
- Clear call-to-action button
- Simple, uncluttered design
- Mobile-friendly (clear text, large buttons)

---

## Step 8: Set Up Conversion Tracking

In AdRoll:

1. Go to **Measure** → **Conversions**
2. Click **Create Conversion**
3. Create conversions:

**Quote Request Conversion:**
- Name: Quote Request
- URL contains: `/thank-you` or `/confirmation` 
- Value: $100

**Contact Conversion:**
- Name: Contact Form
- URL contains: `/contact-thank-you`
- Value: $50

Your pixel already fires conversion events - this tells AdRoll what to optimize for.

---

## Step 9: Launch and Monitor

### Pre-Launch Checklist

- [ ] AdRoll account created
- [ ] Pixel IDs added to environment variables
- [ ] Site redeployed
- [ ] Pixel shows "Active" in AdRoll
- [ ] Audience segments created
- [ ] Ad creatives uploaded
- [ ] Campaigns created with correct budgets
- [ ] Conversion tracking configured

### Weekly Monitoring

1. Check **Dashboard** for:
   - Impressions
   - Clicks
   - CTR (aim for 0.1-0.3% for display)
   - Conversions
   - Cost per conversion

2. Optimize:
   - Pause underperforming ads
   - Increase budget on high-performing segments
   - Refresh ad creatives every 4-6 weeks

---

## Troubleshooting

### Pixel Not Firing?

1. Check environment variables are set correctly
2. Clear browser cache and cookies
3. Accept marketing cookies on site
4. Check browser console for errors

### Low Traffic?

- AdRoll needs 1,000+ monthly visitors for effective retargeting
- If traffic is low, extend lookback windows to 90 days
- Consider combining with Google Ads Display campaigns

### No Conversions?

- Check conversion URL tracking is correct
- Verify conversion pixel fires on thank you pages
- Allow 1-2 weeks for optimization to kick in

---

## Budget Optimization Tips

### If Budget is Tight ($250/mo)

1. Focus 60% on quote abandoners
2. Use only top 2-3 ad sizes
3. Limit to US geography
4. Use automatic bidding

### Signs to Increase Budget

- Cost per conversion < $50
- Positive ROI on retargeting
- Quote abandoner segment filling up

---

## Integration Status

Your website already has:

- [x] AdRoll pixel component (`src/components/analytics/AdRollPixel.tsx`)
- [x] Page type categorization (homepage, product, services, conversion)
- [x] Conversion tracking integration (`trackConversion.ts`)
- [x] Cookie consent handling
- [x] Environment variable placeholders

**All you need to do is add your AdRoll IDs and redeploy!**

---

## Need Help?

- AdRoll Support: https://help.adroll.com
- AdRoll Academy: https://www.adroll.com/academy (free courses)
- Account Manager: Available on paid plans

---

## Related Documentation

- `GOOGLE-ADS-RESTRUCTURE-GUIDE.md` - Google Ads optimization
- `TRACKING-SETUP-SIMPLE.md` - All tracking pixels overview
- `TRACKING-PIXELS-SETUP.md` - Technical implementation details
