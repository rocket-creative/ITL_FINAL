# Complete Tracking Pixels Setup Guide

Quick reference for setting up all tracking platforms.

---

## 1. Meta (Facebook/Instagram) Pixel

### Create Your Pixel
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Click **Connect Data Sources** → **Web**
3. Select **Meta Pixel** → **Connect**
4. Name your pixel "ITL Website"
5. Copy your **Pixel ID** (16-digit number)

### Add to Environment
```bash
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

### Events Tracked
| Event | When Triggered |
|-------|---------------|
| `PageView` | Every page load |
| `Lead` | Quote request submitted |
| `Contact` | Contact form submitted |
| `ViewContent` | Service page viewed |
| `Search` | Site search performed |

### Set Up Conversions
1. In Events Manager, go to **Custom Conversions**
2. Create conversions for:
   - Lead (Quote Request)
   - Contact Form Submission
3. Use these in your Facebook Ads campaigns

---

## 2. LinkedIn Insight Tag

### Create Your Tag
1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
2. Click **Analyze** → **Insight Tag**
3. Click **See tag** or create new
4. Copy your **Partner ID** (7-digit number)

### Add to Environment
```bash
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567
```

### Set Up Conversion Tracking
1. In Campaign Manager, go to **Analyze** → **Conversion Tracking**
2. Click **Create conversion**
3. Create conversions for:
   - **Quote Request** (Goal: Lead)
   - **Contact Form** (Goal: Lead)
4. Copy each conversion ID and add:
```bash
NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID=12345678
NEXT_PUBLIC_LINKEDIN_CONTACT_CONVERSION_ID=12345679
```

### Events Tracked
| Event | When Triggered |
|-------|---------------|
| Page View | Automatic on every page |
| Lead Conversion | Quote request submitted |
| Contact Conversion | Contact form submitted |

### B2B Insights Available
- Company name
- Industry
- Company size
- Job function
- Seniority level

---

## 3. Twitter/X Pixel

### Create Your Pixel
1. Go to [X Ads Manager](https://ads.twitter.com/)
2. Click **Tools** → **Events manager**
3. Click **Add event source** → **Install with pixel code**
4. Name it "ITL Website"
5. Copy your **Pixel ID** (5-character alphanumeric)

### Add to Environment
```bash
NEXT_PUBLIC_TWITTER_PIXEL_ID=abcd1
```

### Events Tracked
| Event | When Triggered |
|-------|---------------|
| `PageView` | Every page load |
| `Lead` | Quote request submitted |
| `CompleteRegistration` | Contact form submitted |
| `ViewContent` | Service page viewed |
| `Search` | Site search performed |

### Set Up Conversion Events
1. In Events Manager, click **Create new event**
2. Create events for:
   - Lead (Quote Request)
   - Complete Registration (Contact Form)
3. Use "Pixel" as the tracking method

---

## 4. AdRoll Retargeting

### Create Your Pixel
1. Go to [AdRoll Dashboard](https://app.adroll.com/)
2. Click **Audiences** → **Install Pixel**
3. Copy your **Advertiser ID** and **Pixel ID**

### Add to Environment
```bash
NEXT_PUBLIC_ADROLL_ADV_ID=ABCDEFGHIJKLMNOPQRST
NEXT_PUBLIC_ADROLL_PIX_ID=UVWXYZ1234567890ABCD
```

### Page Segments Created Automatically
| Segment | Pages |
|---------|-------|
| `homepage` | / |
| `product` | knockout, knockin, humanized pages |
| `services` | Service pages |
| `conversion` | Request quote page |
| `contact` | Contact pages |

### Conversion Tracking
1. In AdRoll, go to **Conversions**
2. Create conversion events for:
   - Quote Request (value: $100)
   - Contact Form (value: $50)
3. Conversions are tracked automatically when forms submit

### Retargeting Campaigns
1. Go to **Campaigns** → **Create Campaign**
2. Select your audience segments
3. Create display ads or email campaigns
4. Target users who visited but didn't convert

---

## 5. Unified Conversion Tracking

### Track Conversions on ALL Platforms at Once

Use the unified tracking function in your forms:

```tsx
import { trackQuoteRequestAllPlatforms } from '@/components/analytics';

// In your quote form submit handler:
async function handleQuoteSubmit(formData) {
  // Track on Google, Facebook, LinkedIn, Twitter, AdRoll
  trackQuoteRequestAllPlatforms({
    modelType: 'knockout',
    serviceType: 'custom-model',
    value: 100,
  });
  
  // Submit the form...
}
```

### Available Unified Functions

```typescript
// Track quote request on ALL platforms
trackQuoteRequestAllPlatforms(data?)

// Track contact form on ALL platforms
trackContactAllPlatforms(data?)

// Track phone call click on ALL platforms
trackPhoneCallAllPlatforms()

// Track email click on ALL platforms
trackEmailClickAllPlatforms()

// Identify user across platforms (for personalization)
identifyUserAllPlatforms(email)
```

---

## Verification Checklist

### Test Each Platform

1. **Google Analytics**
   - Go to GA4 → Real-time
   - Visit your site
   - Confirm page views appear

2. **Meta Pixel**
   - Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
   - Visit your site
   - Confirm pixel fires

3. **LinkedIn**
   - Go to Campaign Manager → Insight Tag
   - Check "Tag validation" status
   - Should show "Active"

4. **Twitter**
   - Go to Events Manager
   - Check pixel status
   - Should show events flowing

5. **AdRoll**
   - Go to Audiences
   - Check pixel status
   - Should show "Active"

### Test Conversions

1. Submit a test quote request
2. Submit a test contact form
3. Check each platform for conversion events:
   - GA4: Conversions report
   - Facebook: Events Manager → Events
   - LinkedIn: Conversion Tracking
   - Twitter: Events Manager → Events
   - AdRoll: Conversions

---

## Troubleshooting

### Pixels Not Firing

1. **Check cookie consent** - Accept marketing cookies
2. **Verify environment variables** - Check `.env.local`
3. **Clear browser cache** - Hard refresh (Cmd+Shift+R)
4. **Check browser console** - Look for errors

### Conversions Not Tracking

1. Wait 24-48 hours for data to appear
2. Use platform-specific debug tools:
   - GA4: Debug View
   - Facebook: Events Manager → Test Events
   - LinkedIn: Tag validation
   - Twitter: Event debugging mode

### GDPR/Consent Issues

- Pixels only load when user accepts "Marketing Cookies"
- Google Analytics uses Consent Mode v2
- Facebook uses Limited Data Use mode until consent

---

## Platform Links

| Platform | Dashboard | Documentation |
|----------|-----------|---------------|
| Google Analytics | [analytics.google.com](https://analytics.google.com) | [Docs](https://developers.google.com/analytics) |
| Google Ads | [ads.google.com](https://ads.google.com) | [Docs](https://support.google.com/google-ads) |
| Meta Events Manager | [business.facebook.com/events_manager](https://business.facebook.com/events_manager) | [Docs](https://developers.facebook.com/docs/meta-pixel) |
| LinkedIn | [linkedin.com/campaignmanager](https://www.linkedin.com/campaignmanager) | [Docs](https://www.linkedin.com/help/lms/answer/a418880) |
| Twitter/X Ads | [ads.twitter.com](https://ads.twitter.com) | [Docs](https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html) |
| AdRoll | [app.adroll.com](https://app.adroll.com) | [Docs](https://help.adroll.com/) |
