# HubSpot Forms - Page Navigation Fix

**Fixed:** Forms not loading on client-side navigation (Next.js)

---

## The Problem

When navigating from one page to another using Next.js client-side routing (e.g., Contact → Request Quote), HubSpot forms would not load and the container would collapse to a tiny size.

**Root Cause:** The inline script approach using `dangerouslySetInnerHTML` does not work with client-side navigation because:
1. React does not execute `<script>` tags inside `dangerouslySetInnerHTML` on client-side updates
2. The form only loaded on initial page load (SSR)
3. On subsequent navigation, the script wouldn't run and the form container stayed empty

---

## The Solution

Created a proper React client component (`HubSpotFormSimple.tsx`) that:
1. Uses `useEffect` to execute form loading on every mount
2. Dynamically loads the HubSpot script if not already present
3. Properly cleans up on unmount
4. Works on both initial load AND client-side navigation

---

## Implementation

### New Component: `HubSpotFormSimple.tsx`

```typescript
'use client';

export default function HubSpotFormSimple({
  formId,
  portalId = '3977953',
  region = 'na1',
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load script if needed
    // Create form in container
    // Clean up on unmount
  }, [formId, portalId, region]);

  return <div ref={containerRef} id={uniqueId} />;
}
```

### Usage

Replace inline scripts with component:

**Before (broken on navigation):**
```tsx
<div dangerouslySetInnerHTML={{
  __html: `
    <script src="//js.hsforms.net/forms/embed/v2.js"></script>
    <script>hbspt.forms.create({...})</script>
  `
}} />
```

**After (works everywhere):**
```tsx
<HubSpotForm
  formId="efefc866-97ec-4500-a380-4cf28e733f54"
  portalId="3977953"
  region="na1"
/>
```

---

## Pages Updated

All four form pages now use the new component:

1. `/contact` - Contact form (efefc866-97ec-4500-a380-4cf28e733f54)
2. `/request-quote` - Quote request (b854ed46-fed3-4b54-9d01-62173106ad8c)
3. `/order-catalog-models` - Catalog order (33db5512-e78d-493c-be5b-ebc4e82cfc51)
4. `/schedule-meeting` - Meeting scheduler (c0c02dc8-960c-4d14-acff-eaa43b8c7b6a)

---

## Why This Works

1. **Script Loading:** Component checks if HubSpot script is already loaded, loads it once if needed, reuses it on subsequent pages
2. **Form Creation:** Each form gets a unique container ID and creates the form in that container using `window.hbspt.forms.create()`
3. **React Lifecycle:** `useEffect` runs on every mount, so navigation triggers form creation
4. **Cleanup:** Component properly cleans up (sets `mounted = false`) to prevent memory leaks
5. **Loading State:** Shows "Loading form..." while script loads and form initializes
6. **Error Handling:** Catches errors and logs them, prevents crashes

---

## Testing

Navigate between form pages in this order:
1. Contact → Request Quote ✓
2. Request Quote → Order Catalog ✓
3. Order Catalog → Schedule Meeting ✓
4. Schedule Meeting → Contact ✓

Forms should load correctly on every navigation.

---

## Technical Notes

- **Singleton Script:** Only one HubSpot script loads globally, shared across all forms
- **Unique IDs:** Each form gets `hs-form-{formId}` as its container ID
- **Min Height:** Container has `minHeight: 500px` to prevent collapse while loading
- **SSR Safe:** Component only runs client-side (`'use client'` directive)
- **No Hydration Issues:** No SSR/client mismatch because everything happens post-hydration

---

## Comparison to Previous Approaches

| Approach | Initial Load | Navigation | Complexity |
|----------|--------------|------------|------------|
| Inline Script (dangerouslySetInnerHTML) | ✓ | ✗ | Low |
| **Client Component (useEffect)** | ✓ | ✓ | Low |
| Complex Multi-step Hydration | ✓ | ✓ | High |

The client component approach is the sweet spot: simple to maintain, works everywhere.

---

**Author:** UXUI Design Corp  
**Date:** Feb 2026  
**Version:** 2.0.0
