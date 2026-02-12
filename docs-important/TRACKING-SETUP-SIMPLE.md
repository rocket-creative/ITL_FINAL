# Super Simple Tracking Setup Guide

Get all your tracking pixels working in 30 minutes. This guide shows you exactly what to click on each platform.

**Time Required:** 25-30 minutes total

---

## Quick Reference Checklist

Copy your IDs here as you get them:

```
┌─────────────────────────────────────────────────┐
│ TRACKING IDS CHECKLIST                          │
├─────────────────────────────────────────────────┤
│ ☐ Google Analytics:  G-__________              │
│ ☐ Google Ads:        AW-__________             │
│ ☐ Facebook Pixel:    ________________          │
│ ☐ LinkedIn Partner:  _______                   │
│ ☐ HubSpot Portal:    3977953 ✅ (done!)        │
├─────────────────────────────────────────────────┤
│ ☐ Added to .env.local                          │
│ ☐ Tested locally (npm run dev)                 │
│ ☐ Added to Vercel                              │
│ ☐ Redeployed                                   │
└─────────────────────────────────────────────────┘
```

---

# PART 1: Get Your Tracking IDs

Do these in any order. Each takes 3-5 minutes.

---

## 1. Google Analytics 4 (GA4)

**What you're getting:** Your website analytics tracking ID

### Step 1: Go to Google Analytics
🔗 **Open:** https://analytics.google.com

### Step 2: Find Admin Settings
1. Click the **gear icon** (⚙️) in the bottom left corner
2. You'll see three columns: Account, Property, View

### Step 3: Open Data Streams
1. In the middle column (Property), click **Data Streams**
2. You'll see a list of your data streams
3. Click on your **web stream** (should say "Web" type)

### Step 4: Copy Your Measurement ID
1. Look for **Measurement ID** at the top right
2. It starts with `G-` followed by letters/numbers
3. Click the copy icon next to it

**Example format:** `G-ABC123XYZ9`

### ✅ Done! Write it in your checklist above.

**What if I don't have a property yet?**
1. Click **Create Property** in Admin
2. Name it "ITL Website"
3. Select your timezone
4. Click **Create Stream** → choose Web
5. Enter your URL: `https://www.genetargeting.com`
6. Then follow steps above

---

## 2. Google Ads

**What you're getting:** Your conversion tracking ID

### Step 1: Go to Google Ads
🔗 **Open:** https://ads.google.com

### Step 2: Open Tools Menu
1. Click the **wrench icon** (🔧) in the top right
2. This opens "Tools & Settings"

### Step 3: Go to Conversions
1. Under the **Measurement** section, click **Conversions**
2. You'll see your conversion actions (or empty if new)

### Step 4: Get Your Conversion ID

**If you already have conversions:**
1. Click on any existing conversion
2. Click **Tag setup**
3. Choose **Install the tag yourself**
4. Look for the code snippet
5. Find the line with `AW-XXXXXXXXXX`
6. Copy just the `AW-XXXXXXXXXX` part

**If you need to create conversions:**
1. Click **+ New conversion action**
2. Select **Website**
3. Choose **Code it manually** or **Add a conversion manually**
4. Create conversion for "Quote Request":
   - Category: **Lead**
   - Name: **Quote Request**
   - Value: Use dynamic value
   - Click **Done**
5. Click **Tag setup** → **Install tag yourself**
6. Copy the `AW-XXXXXXXXXX` from the code

**Example format:** `AW-123456789`

### Optional: Get Conversion Labels
If you want detailed conversion tracking:
1. After creating each conversion, click on it
2. Click **Tag setup**
3. Look for the event snippet
4. Find `send_to: 'AW-XXXXXXXXXX/AbCdEfGhIj'`
5. Copy the part after the `/` (that's your label)
6. Quote Label example: `AbCdEfGhIj`
7. Contact Label example: `XyZaBcDeFg`

### ✅ Done! Write it in your checklist above.

---

## 3. Facebook/Meta Pixel

**What you're getting:** Your Facebook advertising pixel ID

### Step 1: Go to Meta Events Manager
🔗 **Open:** https://business.facebook.com/events_manager

(You'll need a Facebook Business account. If you don't have one, create it first at business.facebook.com)

### Step 2: Find or Create Your Pixel
1. In the left sidebar, look for **Data Sources**
2. You'll see any existing pixels listed

**If you have a pixel already:**
1. Click on your pixel name
2. Look at the top - you'll see **Pixel ID: 1234567890123456**
3. Copy that number

**If you need to create a pixel:**
1. Click **Connect Data Sources** (green button)
2. Select **Web**
3. Select **Meta Pixel**
4. Click **Connect**
5. Name it "ITL Website"
6. Skip the setup wizard (we'll use code)
7. You'll see your new pixel with its ID

**Example format:** `1234567890123456` (16 digits)

### ✅ Done! Write it in your checklist above.

---

## 4. LinkedIn Insight Tag

**What you're getting:** Your LinkedIn Partner ID for B2B tracking

### Step 1: Go to LinkedIn Campaign Manager
🔗 **Open:** https://www.linkedin.com/campaignmanager

(You'll need a LinkedIn Campaign Manager account. Create one at linkedin.com/campaignmanager if needed)

### Step 2: Open Insight Tag
1. Click **Analyze** in the top menu
2. Click **Insight Tag** from the dropdown

### Step 3: Get Your Partner ID
1. You'll see your Insight Tag status
2. Look for **Partner ID:** followed by a 7-digit number
3. Click to copy it

**If you don't have a tag yet:**
1. Click **Install my Insight Tag**
2. Accept the terms
3. Your Partner ID will appear
4. Copy the 7-digit number

**Example format:** `1234567` (7 digits)

### Optional: Create Conversion Events
If you want to track specific conversions:
1. Go back to **Analyze** menu
2. Click **Conversion Tracking**
3. Click **Create conversion**
4. For Quote Request:
   - Name: Quote Request
   - Goal: Lead
   - Click **Create**
   - Copy the conversion ID (8 digits)
5. Repeat for Contact Form if desired

### ✅ Done! Write it in your checklist above.

---

# PART 2: Configure Your Website Locally

Now that you have your IDs, let's add them to your project.

## Step 1: Open Your Environment File

1. In your project folder, open the file: `.env.local`
2. You'll see it already has your HubSpot ID configured

## Step 2: Add Your IDs

Find each section and paste your IDs:

```bash
# ====================================
# GOOGLE ANALYTICS & ADS
# ====================================

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789

# Optional - only if you got the labels:
NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL=AbCdEfGhIj
NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL=XyZaBcDeFg

# ====================================
# FACEBOOK/META PIXEL
# ====================================

NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456

# ====================================
# LINKEDIN INSIGHT TAG
# ====================================

NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567

# Optional - only if you created conversions:
NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID=12345678
NEXT_PUBLIC_LINKEDIN_CONTACT_CONVERSION_ID=12345679
```

## Step 3: Save the File

Press `Cmd+S` (Mac) or `Ctrl+S` (Windows) to save.

## Step 4: Restart Your Dev Server

1. In your terminal, press `Ctrl+C` to stop the server
2. Run: `npm run dev`
3. Wait for it to say "Ready"

### ✅ Done! Your tracking is now active locally.

---

# PART 3: Test Your Tracking Locally

Let's make sure everything works before deploying.

## Test 1: Google Analytics

1. Open your site: http://localhost:3000
2. Press `F12` to open browser console
3. Type: `gtag`
4. Press Enter
5. **Success:** You see a function definition (not "undefined")

## Test 2: Facebook Pixel

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
2. Visit: http://localhost:3000
3. Click the extension icon
4. **Success:** Shows your pixel ID and "PageView" event

## Test 3: LinkedIn Insight Tag

1. Visit: http://localhost:3000
2. Press `F12` to open browser console
3. Go to **Network** tab
4. Filter by "px.ads.linkedin.com"
5. **Success:** You see network requests to LinkedIn

## Test 4: HubSpot

1. Visit: http://localhost:3000
2. Press `F12` to open browser console
3. Type: `_hsq`
4. Press Enter
5. **Success:** You see an array with tracking data

### ✅ All working? Great! Let's deploy to production.

---

# PART 4: Deploy to Vercel

Now let's add these same IDs to your production site on Vercel.

## Step 1: Go to Vercel

🔗 **Open:** https://vercel.com/dashboard

1. Log in to your Vercel account
2. Click on your **ITL project**

## Step 2: Open Settings

1. Click the **Settings** tab at the top
2. In the left sidebar, click **Environment Variables**

## Step 3: Add Each Variable

For each ID you have, click **Add New** and enter:

### Google Analytics
- **Key:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Value:** Your G-XXXXXXXXXX ID
- **Environment:** Select all (Production, Preview, Development)
- Click **Save**

### Google Ads
- **Key:** `NEXT_PUBLIC_GOOGLE_ADS_ID`
- **Value:** Your AW-XXXXXXXXXX ID
- **Environment:** Select all
- Click **Save**

### Google Ads Labels (if you have them)
- **Key:** `NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL`
- **Value:** Your label (e.g., AbCdEfGhIj)
- **Environment:** Select all
- Click **Save**

- **Key:** `NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL`
- **Value:** Your label (e.g., XyZaBcDeFg)
- **Environment:** Select all
- Click **Save**

### Facebook Pixel
- **Key:** `NEXT_PUBLIC_FB_PIXEL_ID`
- **Value:** Your 16-digit number
- **Environment:** Select all
- Click **Save**

### LinkedIn Partner ID
- **Key:** `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- **Value:** Your 7-digit number
- **Environment:** Select all
- Click **Save**

### LinkedIn Conversion IDs (if you have them)
- **Key:** `NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID`
- **Value:** Your conversion ID
- **Environment:** Select all
- Click **Save**

- **Key:** `NEXT_PUBLIC_LINKEDIN_CONTACT_CONVERSION_ID`
- **Value:** Your conversion ID
- **Environment:** Select all
- Click **Save**

## Step 4: Redeploy

1. Go back to the **Deployments** tab
2. Click the three dots (...) next to your latest deployment
3. Click **Redeploy**
4. Confirm by clicking **Redeploy** again
5. Wait 2-3 minutes for deployment to complete

### ✅ Done! Your production site now has full tracking.

---

# PART 5: Verify Production Tracking

Let's make sure everything works on your live site.

## Visit Your Live Site

Go to: https://www.genetargeting.com (or your Vercel URL)

## Check Each Platform

### Google Analytics
1. Go to: https://analytics.google.com
2. Click **Reports** → **Realtime**
3. Keep your site open in another tab
4. **Success:** You see your visit appear in real-time

### Facebook Pixel
1. Keep Meta Pixel Helper extension installed
2. Visit your live site
3. Click the extension icon
4. **Success:** Shows your pixel firing

### LinkedIn
1. Go to: https://www.linkedin.com/campaignmanager
2. Click **Analyze** → **Insight Tag**
3. Look for "Status"
4. **Success:** Shows "Active" with recent activity

### HubSpot
1. Go to: https://app.hubspot.com
2. Navigate to **Reports** → **Analytics Tools** → **Traffic Analytics**
3. Wait a few minutes for data
4. **Success:** You see recent page views

---

# Troubleshooting

## IDs Not Working?

### Check 1: Format
- Google Analytics: Must start with `G-`
- Google Ads: Must start with `AW-`
- Facebook: Exactly 16 digits
- LinkedIn: Exactly 7 digits

### Check 2: Environment Variables
1. Check `.env.local` for typos
2. Make sure variable names match exactly
3. No spaces before or after the `=`
4. No quotes around values needed

### Check 3: Restart
- Stop dev server (`Ctrl+C`)
- Run `npm run dev` again
- Hard refresh browser (`Cmd+Shift+R` or `Ctrl+Shift+R`)

### Check 4: Cookie Consent
- Some pixels won't fire until you accept cookies
- On your site, accept "Marketing" cookies
- Then test again

## Still Not Working?

### Clear Everything
```bash
# Stop server
Ctrl+C

# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

### Check Browser Console
1. Press `F12`
2. Go to **Console** tab
3. Look for red errors
4. Common issues:
   - "gtag is not defined" = Google Analytics not loading
   - "fbq is not defined" = Facebook pixel not loading
   - Cookie consent blocking = Accept cookies first

### Verify Variable Names
Double-check these exact names in Vercel:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_FB_PIXEL_ID`
- `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`

All must start with `NEXT_PUBLIC_` to work in the browser.

---

# What Gets Tracked Automatically

Once set up, your site automatically tracks:

## Page Views
- Every page a visitor views
- Time spent on each page
- Pages visited in sequence

## User Behavior
- Scroll depth (25%, 50%, 75%, 100%)
- Engaged sessions (10+ seconds)
- Outbound link clicks
- File downloads (PDFs)

## Conversions
When someone:
- Submits quote request form
- Submits contact form
- Clicks phone number
- Clicks email address

All tracked across all platforms simultaneously.

---

# Next Steps

## 1. Set Up Conversion Goals

In each platform, create specific conversion goals:

**Google Analytics:**
- Go to Admin → Events → Mark as conversions
- Mark: `generate_lead`, `contact_submission`

**Facebook:**
- Events Manager → Custom Conversions
- Create conversions for your events

**LinkedIn:**
- Already done if you created conversions earlier

## 2. Create Remarketing Audiences

Use your pixel data to retarget visitors:
- People who viewed services but didn't convert
- People who started but didn't complete forms
- People who visited specific product pages

## 3. Monitor Performance

Check your dashboards weekly:
- Which pages get most traffic?
- Where do conversions happen?
- Which campaigns drive best leads?

---

# Quick Reference: Testing Commands

## Check if tracking is loaded (Browser Console)

```javascript
// Google Analytics
typeof gtag !== 'undefined'

// Facebook Pixel
typeof fbq !== 'undefined'

// LinkedIn
typeof _linkedin_partner_id !== 'undefined'

// HubSpot
typeof _hsq !== 'undefined'
```

All should return `true` if loaded correctly.

---

# Need More Help?

See detailed guides in `docs-important/`:
- `GOOGLE-ANALYTICS-SETUP.md` - Comprehensive GA4 guide
- `TRACKING-PIXELS-SETUP.md` - Detailed pixel documentation
- `HUBSPOT-SETUP.md` - HubSpot integration guide

---

**You're done!** 🎉 All tracking pixels are now active and working.
