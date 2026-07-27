# HubSpot Integration Guide

This document explains how to connect the ITL website forms to HubSpot CRM.

---

## Overview

The ITL website has several forms that can be integrated with HubSpot:

| Form | Page URL | API Route |
|------|----------|-----------|
| Custom Quote Request | `/request-quote` | `/api/send-quote` |
| Catalog Order | `/order-catalog-models` | HubSpot form `a422e900-2fd9-4bbb-95c0-fb9299852ecf` |
| Contact Form | `/contact` | `/api/contact` (if exists) |
| Newsletter Signup | Various pages | `/api/newsletter` (if exists) |

---

## Integration Options

### Option 1: HubSpot Form Submissions API (Recommended)

Submit form data to HubSpot while keeping custom form designs. Data creates/updates contacts in HubSpot CRM.

**Pros:**
- Keep beautiful custom form designs
- Full control over form validation and UX
- Data syncs to HubSpot CRM as contacts
- Can trigger HubSpot workflows
- Works alongside existing email notifications

**Cons:**
- Requires API setup
- Need to map fields manually

### Option 2: HubSpot Tracking Code + Events

Add HubSpot tracking script for analytics, then push custom events on form submission.

**Pros:**
- Easy to implement
- Get visitor analytics
- Track page views and conversions

**Cons:**
- Less reliable for CRM data capture
- Requires additional event tracking code

### Option 3: Native HubSpot Embedded Forms

Replace custom forms with HubSpot's embedded form widgets.

**Pros:**
- Zero backend code needed
- Automatic CRM sync
- Built-in spam protection

**Cons:**
- Limited design customization
- Doesn't match site design
- Less control over UX

---

## Setup Instructions (Option 1 - Recommended)

### Step 1: Get HubSpot Credentials

1. Log in to your HubSpot account
2. Go to **Settings** (gear icon) > **Integrations** > **Private Apps**
3. Click **Create a private app**
4. Name it: `ITL Website Forms`
5. Under **Scopes**, enable:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `forms` (if using Forms API)
6. Click **Create app**
7. Copy the **Access Token** (starts with `pat-na1-...`)

### Step 2: Get Portal ID

1. In HubSpot, go to **Settings** > **Account Setup** > **Account Defaults**
2. Your **Hub ID** (Portal ID) is displayed at the top (e.g., `12345678`)

### Step 3: Create HubSpot Forms (Optional but Recommended)

Creating forms in HubSpot allows you to:
- Use HubSpot's form analytics
- Trigger workflows based on form submissions
- Track conversion rates

**To create forms:**

1. Go to **Marketing** > **Forms**
2. Click **Create form** > **Embedded form**
3. Create two forms:

#### Form 1: Custom Quote Request
- Form name: `Website - Custom Quote Request`
- Add fields:
  - Email (required)
  - First Name
  - Last Name
  - Phone Number
  - Company
  - Gene Symbol (create custom property)
  - Model Type (create custom property)
  - Strain Background (create custom property)
  - Project Scope (create custom property)
  - Timeline (create custom property)
  - Message (use default "Message" field)

#### Form 2: Catalog Model Inquiry
- Form name: `Website - Catalog Model Inquiry`
- Add fields:
  - Email (required)
  - First Name
  - Last Name
  - Phone Number
  - Company
  - Model Name (create custom property)
  - Model Number (create custom property)
  - Gene Symbol (create custom property)
  - Model Category (create custom property)
  - Quantity (create custom property)
  - Message

4. After creating each form, click **Embed** and copy the **Form ID** (GUID)

### Step 4: Set Environment Variables

Add these to your Vercel project (or `.env.local` for development):

```bash
# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HUBSPOT_PORTAL_ID=12345678

# Form GUIDs (optional - only if using Forms API)
HUBSPOT_QUOTE_FORM_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HUBSPOT_CATALOG_FORM_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Existing email configuration
RESEND_API_KEY=re_xxxxxxxxxx
QUOTE_TO_EMAIL=inquiry@genetargeting.com
QUOTE_FROM_EMAIL=quotes@genetargeting.com
```

**In Vercel:**
1. Go to your project > **Settings** > **Environment Variables**
2. Add each variable for Production, Preview, and Development

---

## Code Implementation

### Method A: Using HubSpot Forms API

This submits data to a specific HubSpot form (recommended for tracking/workflows).

```typescript
// lib/hubspot.ts

interface HubSpotFormSubmission {
  portalId: string;
  formId: string;
  fields: { name: string; value: string }[];
  context?: {
    pageUri?: string;
    pageName?: string;
  };
}

export async function submitToHubSpotForm(data: HubSpotFormSubmission) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${data.portalId}/${data.formId}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: data.fields,
      context: data.context,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`HubSpot form submission failed: ${JSON.stringify(error)}`);
  }

  return response.json();
}
```

### Method B: Using HubSpot Contacts API

This creates/updates contacts directly (simpler, no form setup needed).

```typescript
// lib/hubspot.ts

interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  [key: string]: string | undefined;
}

export async function createOrUpdateHubSpotContact(contact: HubSpotContact) {
  const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
  
  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('HubSpot access token not configured');
    return null;
  }

  const url = 'https://api.hubapi.com/crm/v3/objects/contacts';
  
  // Format properties for HubSpot
  const properties: Record<string, string> = {};
  Object.entries(contact).forEach(([key, value]) => {
    if (value) properties[key] = value;
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties }),
  });

  // If contact exists, update instead
  if (response.status === 409) {
    // Contact exists, search and update
    const searchUrl = `https://api.hubapi.com/crm/v3/objects/contacts/search`;
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: contact.email,
          }],
        }],
      }),
    });

    const searchData = await searchResponse.json();
    if (searchData.results?.[0]?.id) {
      const contactId = searchData.results[0].id;
      const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
      
      return fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });
    }
  }

  if (!response.ok) {
    const error = await response.json();
    console.error('HubSpot API error:', error);
    throw new Error(`HubSpot contact creation failed`);
  }

  return response.json();
}
```

---

## Updated API Routes

### `/api/send-quote/route.ts` with HubSpot

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateHubSpotContact } from '@/lib/hubspot';

// ... existing code ...

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Split name into first/last
    const nameParts = data.name.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    // 1. Send to HubSpot
    try {
      await createOrUpdateHubSpotContact({
        email: data.email,
        firstname,
        lastname,
        phone: data.phone,
        company: data.institution,
        // Custom properties (must be created in HubSpot first)
        gene_symbol: data.geneSymbol,
        model_type: data.modelType,
        strain_background: data.strainBackground,
        project_scope: data.projectScope,
        timeline_requirements: data.timelineRequirements,
        lead_source: 'Website - Custom Quote Form',
        last_form_submission: 'Custom Quote Request',
        message: data.additionalNotes,
      });
      console.log('Contact synced to HubSpot');
    } catch (hubspotError) {
      console.error('HubSpot sync failed:', hubspotError);
      // Continue with email - don't fail the whole request
    }

    // 2. Send email notification (existing code)
    // ... rest of your existing email code ...

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## Custom Properties in HubSpot

Before the integration works, create these custom contact properties in HubSpot:

1. Go to **Settings** > **Properties**
2. Select **Contact properties**
3. Click **Create property** for each:

| Property Name | Internal Name | Field Type | Group |
|--------------|---------------|------------|-------|
| Gene Symbol | `gene_symbol` | Single-line text | Contact information |
| Model Type | `model_type` | Dropdown select | Contact information |
| Strain Background | `strain_background` | Dropdown select | Contact information |
| Project Scope | `project_scope` | Dropdown select | Contact information |
| Timeline Requirements | `timeline_requirements` | Single-line text | Contact information |
| Model Name | `model_name` | Single-line text | Contact information |
| Model Number | `model_number` | Single-line text | Contact information |
| Model Category | `model_category` | Dropdown select | Contact information |
| Quantity Needed | `quantity_needed` | Single-line text | Contact information |
| Deliverable Type | `deliverable_type` | Dropdown select | Contact information |
| Lead Source | `lead_source` | Single-line text | Contact information |
| Last Form Submission | `last_form_submission` | Single-line text | Contact information |

---

## HubSpot Tracking Code (Optional)

Add HubSpot's tracking script to capture page views and enable chat:

### In `layout.tsx`:

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* HubSpot Tracking Code */}
        <Script
          id="hs-script-loader"
          src="//js.hs-scripts.com/YOUR_PORTAL_ID.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Replace `YOUR_PORTAL_ID` with your actual HubSpot Portal ID.

---

## Testing the Integration

### 1. Test Locally

```bash
# Add to .env.local
HUBSPOT_ACCESS_TOKEN=your_token
HUBSPOT_PORTAL_ID=your_portal_id

# Run dev server
npm run dev
```

Submit a test form and check HubSpot Contacts.

### 2. Verify in HubSpot

1. Go to **Contacts** > **Contacts**
2. Search for the email you submitted
3. Verify all properties are populated
4. Check **Activity** tab for form submission record

### 3. Test Workflows (Optional)

Create a workflow in HubSpot:
1. Go to **Automation** > **Workflows**
2. Create workflow triggered by "Form submission" or "Contact property change"
3. Add actions like:
   - Send internal notification email
   - Assign to sales rep
   - Add to list
   - Create deal/task

---

## Troubleshooting

### "Contact already exists" error
The code handles this by updating existing contacts instead of creating duplicates.

### Properties not appearing
Make sure custom properties are created in HubSpot before submitting forms.

### API rate limits
HubSpot allows 100 requests per 10 seconds. The website forms won't hit this limit under normal use.

### Token expired
Private app tokens don't expire, but if you rotate the token, update the environment variable.

---

## Security Notes

1. **Never commit tokens to git** - Use environment variables only
2. **Use server-side API routes** - Never call HubSpot API from client-side code
3. **Validate input** - Sanitize form data before sending to HubSpot
4. **Rate limit forms** - Consider adding rate limiting to prevent spam

---

## Files to Modify

When ready to implement, these files need updates:

1. **Create:** `itl-website/src/lib/hubspot.ts` - HubSpot utility functions
2. **Update:** `itl-website/src/app/api/send-quote/route.ts` - Add HubSpot sync
3. **Update:** `itl-website/src/app/layout.tsx` - Add tracking script (optional)
4. **Add:** Environment variables in Vercel

---

## Quick Start Checklist

- [ ] Create HubSpot Private App and get Access Token
- [ ] Note your HubSpot Portal ID
- [ ] Create custom contact properties in HubSpot
- [ ] (Optional) Create HubSpot forms and get Form GUIDs
- [ ] Add environment variables to Vercel
- [ ] Create `lib/hubspot.ts` utility file
- [ ] Update API routes to sync with HubSpot
- [ ] Test with a sample submission
- [ ] Verify contact appears in HubSpot
- [ ] (Optional) Set up workflows for notifications

---

## Support

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [HubSpot Forms API](https://developers.hubspot.com/docs/api/marketing/forms)
- [HubSpot Contacts API](https://developers.hubspot.com/docs/api/crm/contacts)
- [HubSpot Private Apps](https://developers.hubspot.com/docs/api/private-apps)
