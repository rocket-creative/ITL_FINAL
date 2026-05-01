# GTM Setup Guide for ITL (genetargeting.com)

This is the one time setup the marketing team performs inside the GTM container at [tagmanager.google.com](https://tagmanager.google.com). The site code already pushes named events to `dataLayer`. GTM listens for those events and fires the actual Google Ads Conversion Tracking tags.

After this is published, adding or editing a conversion is a GTM workspace change, not a code deploy.

---

## 1. Container ID

1. Open the GTM container for genetargeting.com (or create one).
2. Copy the container ID. It looks like `GTM-XXXXXXX`.
3. In Vercel, set `NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX` in Production (and Preview if you want test deploys to push events).
4. Redeploy. View source on the live site and confirm the GTM script tag appears in `<head>` and the `<noscript>` iframe appears at the top of `<body>`.

---

## 2. Variables (GTM workspace → Variables)

### Built in variables to enable

Click "Configure" in the Built In Variables panel and turn on:

- Page URL
- Page Path
- Page Hostname
- Click URL
- Form ID

### User Defined Variables to create

Create two Data Layer Variable types:

| Name | Type | Data Layer Variable Name | Default |
|---|---|---|---|
| `dlv.value` | Data Layer Variable | `value` | `1` |
| `dlv.currency` | Data Layer Variable | `currency` | `USD` |

These read the `value` and `currency` keys that the site pushes alongside each conversion event.

---

## 3. Triggers (GTM workspace → Triggers)

Create six Custom Event triggers. Trigger Type for all six is **Custom Event**, "This trigger fires on **All Custom Events**".

| Trigger name | Event name (exact match) | Tier |
|---|---|---|
| `CE - itl_quote_submit` | `itl_quote_submit` | Primary |
| `CE - itl_catalog_order` | `itl_catalog_order` | Primary |
| `CE - itl_meeting_request` | `itl_meeting_request` | Primary |
| `CE - itl_start_project` | `itl_start_project` | Secondary |
| `CE - itl_contact_submit` | `itl_contact_submit` | Secondary |
| `CE - itl_newsletter_signup` | `itl_newsletter_signup` | Secondary |

(Optional seventh: `CE - itl_generic_thank_you` for the legacy `/thank-you/` route.)

---

## 4. Tags (GTM workspace → Tags)

For each trigger above, create one **Google Ads Conversion Tracking** tag. Open Google Ads → Goals → Conversions → click into each conversion action → Tag Setup → Use Google Tag Manager — that page shows the **Conversion ID** (`AW-XXXXXXXXXX`) and the per action **Conversion Label**.

Field reference for each tag:

| Field | Value |
|---|---|
| Tag Type | Google Ads Conversion Tracking |
| Conversion ID | `AW-XXXXXXXXXX` (same for all tags) |
| Conversion Label | the per action label slug from Google Ads |
| Conversion Value | `{{dlv.value}}` |
| Currency Code | `{{dlv.currency}}` |
| Order ID | (leave blank unless you wire one in) |
| Triggering | the matching `CE - itl_*` trigger above |

Suggested tag names mirror the triggers, e.g. `Ads - Conversion - Quote Submit`, `Ads - Conversion - Catalog Order`, etc.

The conversion label slugs you previously had in Vercel (`NEXT_PUBLIC_GOOGLE_ADS_*_LABEL`) are exactly what goes in the Conversion Label field of the matching tag.

---

## 5. Optional: GA4 inside GTM

Currently GA4 is loaded directly in [src/app/layout.tsx](../src/app/layout.tsx) via gtag.js, which keeps GA4 working independently of the GTM publish state. If you later want GA4 inside GTM too:

1. Add a Google Tag (configuration) in GTM with your GA4 Measurement ID, trigger Initialization - All Pages.
2. Remove the inline gtag.js Script blocks in `layout.tsx` lines 84-104.
3. Verify in GA4 DebugView that page views still appear.

This is not required for the conversion fix and can be deferred.

---

## 6. Preview, then Publish

1. Click **Preview** in the GTM workspace. This opens Tag Assistant connected to your container.
2. Enter `https://www.genetargeting.com` and Connect.
3. In the connected window, submit a real form (use a noindexable test value) and reach the matching thank you page.
4. In Tag Assistant, confirm:
   - The GTM container loaded.
   - The matching `itl_*` event appears in the dataLayer ribbon on the right.
   - The Google Ads Conversion tag fires (green check) with the correct Conversion ID, Conversion Label, value, and currency.
5. Repeat for each conversion path:
   - `/request-quote/` → `/request-quote/thank-you/` → `itl_quote_submit`
   - `/order-catalog-models/` → `/order-catalog-models/thank-you/` → `itl_catalog_order`
   - `/schedule-meeting/` → `/schedule-meeting/thank-you/` → `itl_meeting_request`
   - `/start-your-project/` → `/start-your-project/thank-you/` → `itl_start_project`
6. When all four primary paths fire correctly in Preview, click **Submit** → name the version → **Publish**.
7. In Google Ads, the conversion action status flips from "No recent conversions" to "Recording conversions" within 3 to 24 hours.

---

## 7. What this does not change

- GA4 measurement, page views, scroll depth, engagement events.
- HubSpot tracking and form integration.
- AdRoll, Facebook, LinkedIn, Twitter pixels (still gated on env vars in [AllPixels.tsx](../src/components/analytics/AllPixels.tsx)).
- Cookie consent UX. The existing `gtag('consent', 'update', ...)` calls in [CookieConsent.tsx](../src/components/UXUIDC/CookieConsent.tsx) keep working. If you later want GTM managed Consent Mode v2, add a CookieYes / Cookiebot template inside GTM and remove the manual updates.

---

## 8. Adding a new conversion later

1. Site engineer adds a new helper in [src/lib/analytics/gtmEvents.ts](../src/lib/analytics/gtmEvents.ts), e.g. `pushDemoBooked()`, and calls it on the new thank you page.
2. Marketing creates a Custom Event trigger in GTM with the matching event name and a Google Ads Conversion Tracking tag pointing at the new conversion action.
3. Publish the GTM workspace. No code redeploy is needed once the helper exists.
