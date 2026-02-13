# HubSpot Forms in Next.js: A 4+ Hour Debugging Journey

**TL;DR:** Spent 4+ hours debugging HubSpot forms in Next.js 15. Problem wasn't what I thought. Forms worked on initial load but broke on client-side navigation. Also had CSP blocking submissions and React hydration conflicts causing `removeChild` errors.

---

## The Problem

### Symptoms
1. **Forms didn't show when navigating between pages** (Contact → Request Quote)
   - Form worked on initial page load
   - On client-side navigation, form container was tiny/empty
   
2. **Form submissions blocked after reCAPTCHA**
   - Console error: `Sending form data to 'https://forms.hsforms.com/...' violates Content Security Policy`
   
3. **Random `removeChild` errors**
   - `Runtime NotFoundError: Failed to execute 'removeChild' on 'Node'`
   - Forms would sometimes work, sometimes not

### Initial (Wrong) Hypothesis
"It's probably GSAP causing conflicts" ❌

Spent time removing GSAP thinking it was interfering with form rendering. Narrator: *It wasn't.*

---

## Root Causes (All 3 Were Separate Issues)

### Issue #1: Client-Side Navigation
**The Mistake:**
```tsx
// This only works on SSR, not client-side navigation
<div dangerouslySetInnerHTML={{
  __html: `
    <script src="//js.hsforms.net/forms/embed/v2.js"></script>
    <script>
      hbspt.forms.create({
        portalId: "3977953",
        formId: "efefc866-..."
      });
    </script>
  `
}} />
```

**Why It Failed:**
- React doesn't re-execute `<script>` tags in `dangerouslySetInnerHTML` on client-side updates
- Script only runs on server-side render or full page reload
- On navigation (Contact → Request Quote), the script div renders but scripts don't execute
- Result: Empty form container

### Issue #2: Content Security Policy (CSP)
**The Config:**
```typescript
// next.config.ts
"form-action 'self' https://api.hsforms.com"
```

**The Problem:**
HubSpot forms actually submit to `https://forms.hsforms.com/submissions/v3/public/submit/...`, not `api.hsforms.com`.

CSP blocked the submission. Form looked fine, filled out fine, but couldn't submit.

### Issue #3: React Hydration Conflicts
**The Error:**
```
Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

**What Was Happening:**
1. Server renders initial HTML
2. React hydrates and takes control of DOM
3. HubSpot script also tries to manipulate same DOM nodes
4. Both fight for control → `removeChild` errors

Using `Date.now()` in element IDs made it worse:
```tsx
// Server generates: hs-form-abc-1234567890
// Client generates: hs-form-abc-1234567891
// React: "These don't match!" → Hydration error
```

---

## The Solution(s)

### Fix #1: Proper React Component with `useEffect`
```tsx
'use client';

export default function HubSpotFormSimple({ formId, portalId, region }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load script if needed
    if (!window.hbspt?.forms) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      script.onload = () => createForm();
      document.body.appendChild(script);
    } else {
      createForm();
    }

    function createForm() {
      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: `#hs-form-${formId}`,
      });
    }
  }, [formId, portalId, region]);

  return (
    <div
      ref={containerRef}
      id={`hs-form-${formId}`}
      suppressHydrationWarning // KEY: Tell React to not validate this node
      style={{ minHeight: '500px' }}
    >
      <div>Loading form...</div>
    </div>
  );
}
```

**Why This Works:**
- `useEffect` runs on every mount (including after navigation)
- Script loads once globally, reused on subsequent pages
- `suppressHydrationWarning` tells React "HubSpot is managing children, don't interfere"

### Fix #2: Update CSP
```typescript
// next.config.ts
"form-action 'self' https://api.hsforms.com https://forms.hsforms.com"
//                                            ^^^^^^^^^^^^^^^^^^^^^^^^^ Added this
```

### Fix #3: Avoid State in `useEffect` (ESLint Gotcha)
**First Attempt (Failed Build):**
```tsx
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true); // ❌ ESLint error: react-hooks/set-state-in-effect
}, []);
```

**ESLint Error:**
> Calling setState synchronously within an effect can trigger cascading renders

**Final Fix:**
Use refs instead of state:
```tsx
const isLoadingRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  // Hide loading with direct DOM manipulation
  if (isLoadingRef.current) {
    isLoadingRef.current.style.display = 'none';
  }
  
  // Load form...
}, []);
```

---

## Timeline (4+ Hours)

| Time | What I Did | Outcome |
|------|------------|---------|
| 0:00 | "Forms don't load on navigation" | Started debugging |
| 0:30 | Blamed GSAP, started removing it | Waste of time ❌ |
| 1:30 | Realized it's not GSAP | Back to square one |
| 2:00 | Tried `dangerouslySetInnerHTML` inline scripts | Didn't work |
| 2:30 | Built React component with `useEffect` | Forms load! 🎉 |
| 3:00 | Forms load but won't submit | Found CSP issue |
| 3:15 | Updated CSP config | Submissions work! 🎉 |
| 3:30 | `removeChild` errors appear | New problem |
| 3:45 | Added `suppressHydrationWarning` | Errors gone! 🎉 |
| 4:00 | Pushed to production | Build fails ❌ |
| 4:15 | ESLint blocks `setState` in `useEffect` | Are you kidding me |
| 4:30 | Switched to refs, rebuilt | **Finally done** ✅ |

---

## Lessons Learned

### 1. **`dangerouslySetInnerHTML` doesn't execute scripts on navigation**
If you need scripts to run on client-side routing, use `useEffect` with dynamic script injection.

### 2. **Always check CSP when third-party integrations fail**
Form might look perfect but silently fail due to CSP. Check browser console for violations.

### 3. **HubSpot + React = Hydration Hell**
HubSpot's script manipulates DOM directly. React doesn't like that. Use `suppressHydrationWarning` to tell React to back off.

### 4. **ESLint `react-hooks/set-state-in-effect` is strict**
Even innocent-looking `setIsClient(true)` in `useEffect` will fail production builds. Use refs for DOM manipulation instead.

### 5. **Debug one thing at a time**
I wasted 30+ minutes removing GSAP because "it might be interfering." It wasn't. Should have isolated the actual problem first.

---

## The Working Implementation

**File Structure:**
```
src/
  components/
    UXUIDC/
      HubSpotFormSimple.tsx      # Main component
      HubSpotFormStyles.css      # Custom styling
      index.ts                   # Export
  app/
    contact/page.tsx             # Uses <HubSpotForm />
    request-quote/page.tsx       # Uses <HubSpotForm />
    thank-you/page.tsx           # Post-submission page (noindex)
```

**Usage:**
```tsx
import { HubSpotForm } from '@/components/UXUIDC';

<HubSpotForm
  formId="efefc866-97ec-4500-a380-4cf28e733f54"
  portalId="3977953"
  region="na1"
/>
```

**CSP Config:**
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "form-action 'self' https://api.hsforms.com https://forms.hsforms.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.hsforms.net",
      "connect-src 'self' https://*.hsforms.com",
      // ... other directives
    ].join('; '),
  },
];
```

---

## Questions for Senior Devs

1. **Was `dangerouslySetInnerHTML` ever the right approach here?** Or should I have gone straight to `useEffect` + dynamic script loading?

2. **Is `suppressHydrationWarning` a code smell?** Or is it the correct pattern when integrating third-party scripts that manipulate DOM?

3. **The ESLint rule `react-hooks/set-state-in-effect`** - I get why it exists (prevent cascading renders), but is using refs for client-only rendering really the best pattern? Or is there a cleaner way?

4. **Should I have just used an iframe?** Like, seriously. Would `<iframe src="https://share.hsforms.com/..." />` have saved me 4 hours?

---

## Conclusion

HubSpot forms in Next.js are deceptively simple. They "just work" on first load, which gives false confidence. The real problems emerge with:
- Client-side navigation (Next.js Link)
- Strict CSP policies (production)
- React hydration (SSR)
- Strict ESLint rules (production builds)

**Final commit:** `007_fix_eslint-error-hubspot-form`  
**Lines changed:** ~200  
**Coffee consumed:** Too much  
**Will to live:** Hanging on

If you're dealing with HubSpot forms in Next.js, just use the component above and save yourself 4 hours.

---

**Tech Stack:**
- Next.js 15.2.8 (App Router)
- React 19
- TypeScript (strict mode)
- Vercel deployment
- HubSpot Forms API v2

**GitHub:** [Link to repo if you want to share]

---

*Posted so others don't suffer the same fate. Also so senior devs can tell me if I'm doing this completely wrong.*
