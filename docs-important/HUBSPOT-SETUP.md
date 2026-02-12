# HubSpot Analytics & CRM Integration Guide

**Complete setup for HubSpot tracking, lead management, and CRM integration**

---

## 🎯 Why HubSpot for ITL?

### Perfect for B2B Life Sciences
- **Lead Scoring:** Identify high-intent researchers automatically
- **CRM Integration:** Track every interaction with potential customers
- **Email Marketing:** Nurture leads through educational content
- **Forms:** Native forms that pre-fill and sync to CRM
- **Chat Widget:** Live chat with researchers
- **Company Insights:** See which institutions visit your site

### What HubSpot Tracks
1. **Page Views:** Which services researchers view
2. **Form Submissions:** Quote requests, contact forms
3. **Email Opens:** Track email engagement
4. **CRM Records:** Automatic contact creation
5. **Lead Scoring:** Qualify leads based on behavior
6. **Company Info:** LinkedIn data enrichment

---

## 🚀 Quick Setup (15 minutes)

### Step 1: Get Your HubSpot Portal ID

**Option A: Existing HubSpot Account**
1. Log in to [HubSpot](https://app.hubspot.com)
2. Click Settings (gear icon) → Account Setup
3. Find your **Hub ID** or **Portal ID** (7-8 digit number)
4. Copy it

**Option B: New HubSpot Account**
1. Go to [HubSpot.com](https://www.hubspot.com)
2. Sign up for free account (Marketing Hub Free)
3. Complete onboarding
4. Go to Settings → Account Setup
5. Copy your **Hub ID**

### Step 2: Add to Environment Variables

Edit `.env.local`:

```bash
# HubSpot Analytics & CRM
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=12345678
```

### Step 3: Deploy

```bash
npm run build
npm run dev
# Or push to production
```

### Step 4: Verify Installation

**Test Locally:**
1. Start dev server: `npm run dev`
2. Open browser console (F12)
3. Visit: `http://localhost:3000`
4. In console, type: `_hsq`
5. Should see array with tracking data

**Test on Live Site:**
1. Install [HubSpot Tracking Code Debugger](https://chrome.google.com/webstore/detail/hubspot-tracking-code-deb/dncmmcidkknimdpiapgepocbcgekeieh) Chrome extension
2. Visit your site
3. Extension shows green checkmark if tracking works
4. Click extension to see page views

---

## ✅ Implementation Status

### Already Implemented ✅

Your site already has HubSpot ready to go!

**Files Created:**
- ✅ `src/components/analytics/HubSpotTracking.tsx`
- ✅ Updated `src/components/analytics/AllPixels.tsx`
- ✅ Updated `src/components/analytics/index.ts`
- ✅ Updated `src/components/analytics/trackConversion.ts`

**Features Available:**
- ✅ Automatic page view tracking
- ✅ Form submission tracking
- ✅ Lead identification
- ✅ Custom event tracking
- ✅ CRM integration
- ✅ Chat widget support
- ✅ Unified tracking (all platforms at once)

**What You Need:**
- Just add your Portal ID to `.env.local`
- Deploy
- That's it!

---

## 📊 What Gets Tracked Automatically

### Page Views
Every page visit is tracked with:
- URL visited
- Time on page
- Referrer source
- Device type
- Browser
- Location (city/state)

### Lead Identification
When a user submits a form with email:
- Creates/updates contact in HubSpot CRM
- Links all previous anonymous activity to contact
- Enriches with company data (if available)
- Starts lead scoring

### Custom Events
Pre-configured events:
- `pe_quote_request` - Quote form submission
- `pe_contact_form` - Contact form submission
- `pe_phone_click` - Phone number clicked
- `pe_email_click` - Email link clicked
- `pe_catalog_download` - Catalog PDF download
- `pe_service_view` - Specific service page viewed

---

## 🎨 Using HubSpot Tracking in Your Code

### Basic Usage (Already Implemented)

**Quote Form:**
```typescript
import { trackQuoteRequestAllPlatforms } from '@/components/analytics';

async function handleQuoteSubmit(formData) {
  // This now includes HubSpot!
  trackQuoteRequestAllPlatforms({
    email: formData.email,
    modelType: formData.modelType,
    serviceType: 'custom',
    timeline: formData.timeline,
    value: 100,
  });
  
  // Submit form...
}
```

**Contact Form:**
```typescript
import { trackContactAllPlatforms } from '@/components/analytics';

async function handleContactSubmit(formData) {
  // This now includes HubSpot!
  trackContactAllPlatforms({
    email: formData.email,
    name: formData.name,
    company: formData.company,
    phone: formData.phone,
    message: formData.message,
  });
  
  // Submit form...
}
```

### HubSpot-Specific Functions

**Track Custom Event:**
```typescript
import { trackHubSpotEvent } from '@/components/analytics';

trackHubSpotEvent('viewed_pricing', {
  model_type: 'knockout',
  interest_level: 'high',
});
```

**Identify User (Manual):**
```typescript
import { identifyHubSpotUser } from '@/components/analytics';

identifyHubSpotUser('researcher@university.edu', {
  firstname: 'Jane',
  lastname: 'Smith',
  company: 'Stanford University',
  phone: '555-123-4567',
  website: 'stanford.edu',
});
```

**Track Service Page View (for lead scoring):**
```typescript
import { trackHubSpotServiceView } from '@/components/analytics';

// On service page load
useEffect(() => {
  trackHubSpotServiceView('Conditional Knockout Mice');
}, []);
```

---

## 🏆 Lead Scoring Setup

### Create Scoring Rules in HubSpot

1. Go to HubSpot → Settings → Properties → Contact Properties
2. Find or create "HubSpot Score"
3. Go to Marketing → Lead Scoring
4. Create these rules:

**Page Views (Behavioral)**
| Page Visited | Points | Why |
|--------------|--------|-----|
| /request-quote | +15 | High intent |
| /knockout-mouse-models | +10 | Service interest |
| /humanized-mouse-models | +10 | Service interest |
| /catalog-mouse-models | +8 | Ready to buy |
| Any service page | +5 | Research phase |
| Blog post | +2 | Early education |

**Custom Events**
| Event | Points | Why |
|-------|--------|-----|
| pe_quote_request | +20 | Highest intent |
| pe_contact_form | +15 | Direct contact |
| pe_phone_click | +12 | Very interested |
| pe_catalog_download | +10 | Collecting info |
| pe_email_click | +8 | Engagement |

**Form Submissions**
| Form | Points | Why |
|------|--------|-----|
| Quote Request Form | +25 | Highest value |
| Contact Form | +15 | Direct interest |
| Newsletter Signup | +5 | Awareness |

**Company Size (Firmographic)**
| Employees | Points | Why |
|-----------|--------|-----|
| 500+ | +10 | Large pharma |
| 100-499 | +8 | Mid-size biotech |
| 10-99 | +5 | Small lab |

### Lead Status Automation

**Create Workflows:**

1. **MQL (Marketing Qualified Lead) - Score 50+**
   - Trigger: Contact score ≥ 50
   - Action: Set lifecycle stage to "MQL"
   - Action: Send internal notification to sales
   - Action: Add to "Hot Leads" list

2. **SQL (Sales Qualified Lead) - Form + Score 75+**
   - Trigger: Form submitted + Score ≥ 75
   - Action: Set lifecycle stage to "SQL"
   - Action: Create task for sales rep
   - Action: Send follow-up email within 1 hour

3. **Re-engagement - Went Cold**
   - Trigger: No activity in 30 days + Score 30-50
   - Action: Add to re-engagement email sequence
   - Action: Offer case study or whitepaper

---

## 📧 Email Marketing Setup

### Welcome Series

**Trigger:** Email submitted on any form

**Sequence:**
1. **Day 0:** Welcome + Resource link
2. **Day 2:** Educational content (blog post)
3. **Day 5:** Case study
4. **Day 7:** Call-to-action (schedule consultation)
5. **Day 14:** Success story
6. **Day 21:** Special offer or discount

### Newsletter

**Purpose:** Stay top-of-mind with researchers

**Content Ideas:**
- New blog posts about mouse models
- Customer success stories
- Scientific breakthroughs using your models
- Technical tips and best practices
- Industry news and trends

**Frequency:** Bi-weekly or monthly

---

## 💬 Chat Widget Setup (Optional)

### Enable Live Chat

1. Go to HubSpot → Conversations → Chatflows
2. Click "Create chatflow" → "Website"
3. Configure chat widget:
   - Welcome message: "Hi! Looking for mouse models? How can we help?"
   - Office hours: Set your availability
   - Routing: Assign to sales team
4. Install on website (already done via tracking code)

### Open Chat Programmatically

```typescript
import { openHubSpotChat } from '@/components/analytics';

// On button click
<button onClick={openHubSpotChat}>
  Chat with a Scientist
</button>
```

---

## 📋 HubSpot Forms (Native Integration)

### Why Use HubSpot Forms?

**Benefits:**
- Pre-fills with known contact data
- Auto-syncs to CRM
- No form spam
- Better data quality
- Progressive profiling (ask different questions on repeat visits)

### Create HubSpot Form

1. Go to Marketing → Lead Capture → Forms
2. Click "Create form" → "Embedded form"
3. Add fields:
   - Email (required)
   - First Name
   - Last Name
   - Company
   - Phone
   - Model Type (custom field)
   - Project Timeline
   - Message
4. Copy embed code

### Embed in Next.js

```typescript
'use client';

import { useEffect } from 'react';

export default function HubSpotQuoteForm() {
  useEffect(() => {
    // Load HubSpot form
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/v2.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "YOUR_PORTAL_ID",
          formId: "YOUR_FORM_ID"
        });
      }
    };
  }, []);

  return <div id="hubspot-form" />;
}
```

---

## 📈 Reports & Dashboards

### Create Marketing Dashboard

1. Go to Reports → Dashboards
2. Click "Create dashboard" → "Marketing"
3. Add these reports:

**Traffic Sources**
- Sessions by source
- New vs. returning visitors
- Top pages by views
- Bounce rate by page

**Lead Generation**
- Form submissions over time
- Conversion rate by page
- Lead source breakdown
- MQL/SQL counts

**Lead Engagement**
- Email open rates
- Click-through rates
- Time to MQL
- Time to SQL

**ROI**
- Customers by source
- Revenue by source
- Cost per lead
- Customer acquisition cost

---

## 🔗 Integrations

### Connect to Other Tools

**Email (Gmail/Outlook):**
- Settings → Integrations → Email
- Connect your email
- Track email opens/clicks in CRM

**Calendar (Google/Outlook):**
- Settings → Integrations → Calendar
- Sync meetings to contact timeline

**Zoom:**
- Settings → Integrations → Zoom
- Record meetings in CRM

**Slack:**
- Get notifications when high-score leads submit forms
- Settings → Integrations → Slack

---

## 🎯 Example: Complete Quote Request Flow

### What Happens When Someone Requests a Quote

1. **User visits site** (anonymous)
   - HubSpot tracks pages viewed
   - Anonymous cookie set

2. **User explores services**
   - Views knockout mouse page (+10 points)
   - Views humanized mice page (+10 points)
   - Views pricing page (+8 points)
   - Current score: 28 points (anonymous)

3. **User submits quote request**
   - Form submitted (+25 points)
   - Email provided: researcher@mit.edu
   - All previous anonymous activity linked to contact
   - Total score: 53 points → **MQL**

4. **HubSpot automatically:**
   - Creates contact in CRM
   - Enriches with LinkedIn data (MIT, PhD, etc.)
   - Sets lifecycle stage to "MQL"
   - Notifies sales team
   - Adds to "Hot Leads" list
   - Sends welcome email

5. **Sales team:**
   - Sees complete timeline of pages visited
   - Knows they're interested in knockout & humanized mice
   - Follows up within 1 hour
   - References their specific interests

---

## 🔍 Analytics in HubSpot

### View Contact Activity

1. Go to Contacts → Contacts
2. Find any contact
3. View their timeline:
   - Every page they visited
   - Forms they submitted
   - Emails they opened
   - Times they visited
   - Source of acquisition

### Reports You Can Create

**Traffic Analytics:**
- Which pages drive the most leads?
- What's the conversion rate by page?
- Where do visitors drop off?

**Lead Source Analysis:**
- Google Organic vs. Paid
- LinkedIn vs. Facebook
- Direct vs. Referral
- Which source has highest close rate?

**Content Performance:**
- Which blog posts generate leads?
- What CTAs convert best?
- Which pages have highest engagement?

**Sales Analytics:**
- Lead-to-customer conversion rate
- Average deal size by source
- Time to close by lead source
- Revenue by marketing channel

---

## 📱 Mobile App (Optional)

### HubSpot Mobile App

- View real-time notifications when leads come in
- See contact timeline on mobile
- Respond to chat messages
- Log calls and meetings
- Available on iOS and Android

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] HubSpot Portal ID added to `.env.local`
- [ ] Deployed to production
- [ ] Verified tracking code loads (browser console)
- [ ] Submitted test form
- [ ] Confirmed contact created in CRM
- [ ] Set up lead scoring rules
- [ ] Created welcome email sequence
- [ ] Configured chat widget (optional)
- [ ] Created marketing dashboard
- [ ] Connected email integration
- [ ] Trained team on CRM usage

---

## 🆘 Troubleshooting

### Tracking Code Not Loading

**Check:**
1. Verify Portal ID in `.env.local`
2. Rebuild: `npm run build`
3. Check browser console for errors
4. Verify `_hsq` is defined in console

**Fix:**
```bash
# Verify environment variable
echo $NEXT_PUBLIC_HUBSPOT_PORTAL_ID

# Should output your Portal ID
# If blank, check .env.local
```

### Forms Not Creating Contacts

**Check:**
1. Email field is included in form
2. Email is valid format
3. Wait 5-10 minutes (processing delay)
4. Check spam score in HubSpot

### Events Not Appearing

**Check:**
1. Go to Reports → Analytics Tools → Events
2. May take 24 hours to appear
3. Custom events need to be created first
4. Check browser console for tracking calls

---

## 📚 Resources

**HubSpot Documentation:**
- [Tracking Code](https://knowledge.hubspot.com/reports/install-the-hubspot-tracking-code)
- [Events API](https://developers.hubspot.com/docs/api/analytics/events)
- [Forms API](https://developers.hubspot.com/docs/api/marketing/forms)
- [Lead Scoring](https://knowledge.hubspot.com/contacts/use-lead-scoring-to-prioritize-contacts)

**HubSpot Academy (Free Training):**
- [HubSpot CRM](https://academy.hubspot.com/courses/hubspot-crm)
- [Marketing Hub](https://academy.hubspot.com/courses/marketing-hub)
- [Inbound Marketing](https://academy.hubspot.com/courses/inbound-marketing)

---

## 💰 Pricing

**Free Plan (Marketing Hub):**
- ✅ Unlimited contacts
- ✅ Email marketing (2,000 sends/month)
- ✅ Forms
- ✅ Landing pages
- ✅ Live chat
- ✅ Ad management
- ✅ Basic reporting

**Starter Plan ($20/month):**
- Everything in Free
- ✅ Email marketing (1,000 contacts)
- ✅ Marketing automation
- ✅ Simple automation
- ✅ Conversational bots

**Professional Plan ($890/month):**
- Everything in Starter
- ✅ Marketing automation
- ✅ Social media tools
- ✅ Blog
- ✅ SEO
- ✅ Advanced reporting

**Recommendation for ITL:**
- Start with **Free plan**
- Upgrade to **Starter** when you hit 1,000 contacts
- Upgrade to **Professional** when you need automation

---

## 🎉 You're Ready!

HubSpot is now fully integrated with your ITL website!

**What happens next:**
1. Add Portal ID to `.env.local`
2. Deploy
3. Start collecting leads
4. Set up lead scoring
5. Create email workflows
6. Watch your CRM fill up!

**Questions?** Check the [HubSpot Knowledge Base](https://knowledge.hubspot.com) or contact HubSpot support (excellent support even on free plan!).
