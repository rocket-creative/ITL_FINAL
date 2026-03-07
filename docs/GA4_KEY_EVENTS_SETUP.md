# GA4 Key Events Setup Guide

This guide explains how to mark conversion events as Key Events (formerly "Conversions") in Google Analytics 4. The ITL website fires the following events that should be marked as Key Events for proper conversion tracking.

## Events Fired by the Website

| Event Name | When It Fires | Source |
|------------|---------------|--------|
| `generate_lead` | HubSpot form submission (quote or contact) | Layout HubSpot postMessage listener |
| `generate_lead` | Custom fallback form submission (quote) | Request Quote page |
| `generate_lead` | Custom fallback form submission (contact) | Contact page |
| `generate_lead` | Thank You page visit | Thank You page useEffect |

## Step-by-Step: Mark as Key Event

1. Log in to [Google Analytics](https://analytics.google.com)
2. Select the ITL property (genetargeting.com)
3. Go to **Admin** (gear icon, bottom left)
4. In the Property column, click **Events**
5. Find `generate_lead` in the list (may take 24–48 hours to appear after first firing)
6. Toggle **Mark as key event** to ON

## Verification

After marking the event:

1. Go to **Reports** > **Engagement** > **Events**
2. Confirm `generate_lead` appears with the Key Event badge
3. In **Reports** > **Engagement** > **Conversions**, `generate_lead` should appear as a conversion

## Event Parameters

The `generate_lead` event may include:

- `method`: `hubspot` | `contact_form` | `thank_you_page`
- `model_type`, `service_type`: (quote form only, when available)
- `inquiry_type`: (contact form only, when available)

## Related: Google Ads Conversion

The website also fires Google Ads conversion events via the same form submissions. Those are configured in Google Ads (Goals > Conversions). This guide covers GA4 only.

## Troubleshooting

- **Event not showing**: Allow 24–48 hours for new events to appear in GA4
- **No data**: Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in production
- **Duplicate events**: HubSpot and custom forms both fire; only one fires per submission depending on which form loads
