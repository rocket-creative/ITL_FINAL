# Complete Tracking & Analytics Setup Guide

This guide walks you through setting up comprehensive multi-platform tracking for the ITL website.

## Platforms Included

| Platform | Purpose | Tracking |
|----------|---------|----------|
| **Google Analytics 4** | Website analytics | Page views, behavior, conversions |
| **Google Ads** | Paid search ads | Conversions, remarketing |
| **Meta (Facebook/Instagram)** | Social ads | Leads, retargeting audiences |
| **LinkedIn** | B2B advertising | Professional audience insights |
| **Twitter/X** | Social ads | Engagement, conversions |
| **AdRoll** | Cross-platform retargeting | Display ads, email retargeting |

## What You'll Be Tracking

### Automatic Tracking (Built-in)
- **Page Views** - Every page visit with full URL and title
- **Time on Page** - How long users spend on each page
- **Scroll Depth** - 25%, 50%, 75%, 90%, 100% scroll milestones
- **Engaged Sessions** - Users who stay 10+ seconds
- **Outbound Clicks** - Links to external sites
- **Site Search** - Search queries on your site
- **File Downloads** - PDF/doc downloads

### Conversion Tracking (All Platforms)
- **Quote Requests** - Primary lead generation
- **Contact Form Submissions** - General inquiries
- **CTA Button Clicks** - Call-to-action engagement
- **Phone Calls** - Click-to-call tracking
- **Email Clicks** - Mailto link clicks

---

## Step 1: Set Up Google Analytics 4 (GA4)

### Create a GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon)
3. Click **+ Create Property**
4. Enter property name: "ITL Website"
5. Select your time zone and currency
6. Choose "Web" as your platform
7. Enter your website URL: `https://www.genetargeting.com`
8. Click **Create Stream**

### Get Your Measurement ID

1. In your new property, go to **Admin > Data Streams**
2. Click on your web stream
3. Copy the **Measurement ID** (starts with `G-`)
4. It looks like: `G-XXXXXXXXXX`

---

## Step 2: Set Up Google Ads Conversion Tracking

### Link Google Ads to GA4

1. In GA4, go to **Admin > Product Links > Google Ads Links**
2. Click **Link**
3. Select your Google Ads account
4. Enable **Enable Personalized Advertising**
5. Click **Submit**

### Get Your Google Ads Conversion ID

1. Go to [Google Ads](https://ads.google.com)
2. Click **Tools & Settings** (wrench icon)
3. Under **Measurement**, click **Conversions**
4. Click **+ New conversion action**
5. Select **Website**
6. Enter your domain: `genetargeting.com`
7. Click **Scan** to detect existing tags
8. Create these conversions:
   - **Quote Request** (Primary, Lead)
   - **Contact Form** (Secondary, Lead)
   - **Phone Call** (Secondary, Lead)

### Find Your Conversion IDs

After creating conversions:
1. Click on each conversion
2. Click **Tag setup**
3. Choose **Use Google Tag Manager** or **Install tag manually**
4. Copy the **Conversion ID** (format: `AW-XXXXXXXXXX`)
5. Copy each **Conversion Label** (you'll need these later)

---

## Step 3: Configure the Website

### Add Environment Variables

Create a `.env.local` file in the `itl-website` folder:

```bash
# ============================================
# Google Analytics & Ads
# ============================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# ============================================
# Meta (Facebook/Instagram) Pixel
# Get from: Meta Events Manager > Data Sources > Pixels
# ============================================
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXXX

# ============================================
# LinkedIn Insight Tag
# Get from: LinkedIn Campaign Manager > Analyze > Insight Tag
# ============================================
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=XXXXXXX
# Optional: Conversion tracking IDs
NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID=XXXXXXX
NEXT_PUBLIC_LINKEDIN_CONTACT_CONVERSION_ID=XXXXXXX

# ============================================
# Twitter/X Pixel
# Get from: X Ads Manager > Tools > Events Manager
# ============================================
NEXT_PUBLIC_TWITTER_PIXEL_ID=XXXXX

# ============================================
# AdRoll Retargeting
# Get from: AdRoll Dashboard > Audiences > Pixel
# ============================================
NEXT_PUBLIC_ADROLL_ADV_ID=XXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADROLL_PIX_ID=XXXXXXXXXXXXXXXXXXXX

# ============================================
# Catalog Search (Google Sheets)
# Required for catalog model search on /catalog-mouse-models, /all-catalog-mouse-models, etc.
# Get from: Google Cloud Console → APIs & Services → Credentials → Create API key
# Enable "Google Sheets API" for the project. See CATALOG-SETUP.md for details.
# ============================================
GOOGLE_SHEETS_API_KEY=your-google-sheets-api-key

# ============================================
# Admin Dashboard
# ============================================
ADMIN_PASSWORD=your-secure-password
```

Replace the X's with your actual IDs from each platform.

### Update Conversion Labels (Optional)

For more precise conversion tracking, update the conversion events in:
`src/components/analytics/GoogleAnalytics.tsx`

Find the `trackQuoteRequest` function and update:
```typescript
gtag('event', 'conversion', {
  send_to: `${GOOGLE_ADS_ID}/YOUR_CONVERSION_LABEL`,
  value: 100,
  currency: 'USD',
});
```

---

## Step 4: Verify Installation

### Use Google Tag Assistant

1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Connect your website
3. Browse your site and verify:
   - GA4 tag is firing
   - Page views are being recorded
   - Consent mode is working

### Check Real-Time Reports

1. Go to GA4 > **Reports > Real-time**
2. Open your website in another tab
3. You should see yourself as an active user
4. Navigate between pages to see page view events

### Test Conversions

1. Submit a test quote request
2. Check GA4 > **Reports > Real-time > Conversions**
3. Check Google Ads > **Tools > Conversions** for the test

---

## Step 5: Set Up Key Reports in GA4

### Create Custom Reports

1. **Lead Funnel Report**
   - Go to **Explore > Blank**
   - Add dimensions: Page path, Event name
   - Add metrics: Users, Conversions
   - Filter to: quote_request, contact_submission events

2. **Traffic Sources Report**
   - Go to **Reports > Acquisition**
   - View traffic by Source/Medium
   - Filter by your conversion events

3. **Content Performance**
   - Go to **Reports > Engagement > Pages and screens**
   - Sort by views, engagement time
   - See which pages drive conversions

### Set Up Audiences for Remarketing

1. Go to **Admin > Audiences**
2. Create these audiences:
   - **All Visitors** (last 30 days)
   - **Quote Request Started** (viewed quote page)
   - **High Intent** (viewed 3+ service pages)
   - **Converters** (submitted a form)

---

## Using Analytics in Your Code

### Track CTA Buttons

```tsx
import { TrackedCTAButton } from '@/components/analytics';

<TrackedCTAButton 
  href="/request-quote" 
  ctaName="hero_get_quote"
>
  Get a Quote
</TrackedCTAButton>
```

### Track Forms

```tsx
import { TrackedForm, handleQuoteFormSubmit } from '@/components/analytics';

<TrackedForm 
  formName="quote_request" 
  onSubmit={async (formData) => {
    handleQuoteFormSubmit({
      modelType: formData.get('model_type'),
      serviceType: formData.get('service'),
    });
    // Your form submission logic
  }}
>
  {/* Form fields */}
</TrackedForm>
```

### Track Custom Events

```tsx
import { useAnalytics } from '@/components/analytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();
  
  const handleVideoPlay = () => {
    trackEvent('video_play', { video_title: 'About ITL' });
  };
  
  return <video onPlay={handleVideoPlay} />;
}
```

---

## Google Ads Optimization Tips

### Bid on Conversions

1. In Google Ads, go to **Campaigns**
2. Select your campaigns
3. Go to **Settings > Bidding**
4. Choose **Maximize Conversions** or **Target CPA**
5. Use "Quote Request" as your primary conversion

### Create Remarketing Campaigns

1. Go to **Campaigns > + > Display Campaign**
2. Select **Website traffic**
3. Use your GA4 audiences
4. Target users who visited but didn't convert

### Link Search Console

1. Go to GA4 **Admin > Product Links > Search Console**
2. Link your Search Console property
3. See organic search queries in GA4

---

## Troubleshooting

### Tags Not Firing

1. Check if consent was granted (cookie banner)
2. Verify environment variables are set
3. Check browser console for errors
4. Use GA4 Debug View: **Admin > Debug View**

### Conversions Not Showing

1. Wait 24-48 hours for data to appear in Google Ads
2. Check real-time reports in GA4 first
3. Verify conversion labels match exactly
4. Test with Tag Assistant

### Consent Mode Issues

1. Clear localStorage and refresh
2. Accept all cookies in the consent banner
3. Check `analytics_storage` status in console:
   ```javascript
   // In browser console
   console.log(localStorage.getItem('itl-cookie-preferences'))
   ```

---

## Key Metrics to Monitor

### Weekly Review
- Total sessions and users
- Conversion rate (forms submitted / sessions)
- Top landing pages
- Traffic sources (Google Ads vs organic)
- Average engagement time

### Monthly Review
- Cost per conversion (in Google Ads)
- Which pages drive most conversions
- Audience growth
- Search query performance

---

---

## Admin Dashboard Setup

The website includes a custom admin dashboard at `/admin` where you can view analytics without logging into Google.

### Access the Dashboard

1. Go to `https://yourdomain.com/admin`
2. Enter the admin password (default: `itl-admin-2026`)
3. View your metrics!

### Change the Admin Password

Set the `ADMIN_PASSWORD` environment variable:

```bash
# In .env.local
ADMIN_PASSWORD=your-secure-password-here
```

### Connect Real GA4 Data (Optional)

By default, the dashboard shows demo data. To connect to your real GA4:

#### 1. Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the **Google Analytics Data API**
4. Go to **IAM & Admin > Service Accounts**
5. Click **Create Service Account**
6. Name it "ITL Analytics Dashboard"
7. Click **Create and Continue**
8. Skip roles (we'll add in GA4)
9. Click **Done**
10. Click on the service account
11. Go to **Keys > Add Key > Create New Key**
12. Choose JSON and download

#### 2. Add Service Account to GA4

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon)
3. Under **Property**, click **Property Access Management**
4. Click **+** and add the service account email
5. Give it **Viewer** access

#### 3. Configure Environment Variables

```bash
# In .env.local

# Path to the downloaded JSON key file
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

# Your GA4 Property ID (found in Admin > Property Settings)
GA4_PROPERTY_ID=123456789

# Set to false to use real data
USE_MOCK_ANALYTICS=false
```

#### 4. Install the GA4 Package

```bash
cd itl-website
npm install @google-analytics/data
```

### Dashboard Features

- **Real-time active users** - Live count updated every 30 seconds
- **Traffic overview** - Users, sessions, page views, bounce rate
- **Top pages** - Most visited pages with time on page
- **Traffic sources** - Where visitors come from
- **Conversions** - Quote requests, contact forms, total leads
- **Google Ads metrics** - Clicks, impressions, cost, conversions
- **Recent events** - Latest tracked events

---

## Support

For technical issues with the integration, check:
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Ads Help](https://support.google.com/google-ads)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)
