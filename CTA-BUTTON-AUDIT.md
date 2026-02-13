# CTA Button Color Audit

**Date:** February 12, 2026  
**Issue:** Inconsistent CTA button colors across site  
**Page:** Colony Management Services

---

## Problem

The colony management services page has **three different CTA button colors** appearing in close proximity, causing brand inconsistency:

### Current State (Line References):

1. **Hero Section CTAs** (lines 244-274):
   - Primary: `backgroundColor: 'white'` with `color: '#0a253c'` (navy text)
   - Secondary: Transparent with white border

2. **Bottom Section CTA** (lines 658-687):
   - Primary: `backgroundColor: '#008080'` (teal) with white text
   - Secondary: Transparent with white border

3. **Breeding Scheme Architect CTA** (line 774):
   - Special: Orange/gold gradient (`#ffb800` to `#ff8c00`)

---

## The Issue

**Three different primary button styles on one page:**

```tsx
// Hero section - WHITE with navy text
<Link style={{ backgroundColor: 'white', color: '#0a253c' }}>
  Request a Quote
</Link>

// Bottom CTA - TEAL with white text  
<Link style={{ backgroundColor: '#008080', color: 'white' }}>
  Request a Quote
</Link>

// Breeding tool - ORANGE/GOLD gradient
<Link style={{ 
  background: 'linear-gradient(135deg, #ffb800 0%, #ff8c00 100%)'
}}>
  Try It Free
</Link>
```

---

## Brand Hierarchy (Correct)

According to your design system, CTAs should follow this hierarchy:

### **Tier 1: Primary Action CTAs**
- Color: **Teal `#008080`** (on light backgrounds) OR **White** (on dark backgrounds)
- Use: Main conversion actions (Request Quote, Contact, Start Project)
- Example: `backgroundColor: '#008080', color: 'white'`

### **Tier 2: Secondary CTAs**
- Color: **Outlined/Transparent** with border matching context
- Use: Alternative actions, learn more links
- Example: `border: '2px solid white', backgroundColor: 'transparent'`

### **Tier 3: Special Branded Tools**
- Color: **Orange/Gold Gradient** (ONLY for Breeding Scheme Architect)
- Use: Exclusive to the BSA tool promotion
- Example: `background: 'linear-gradient(135deg, #ffb800 0%, #ff8c00 100%)'`

---

## Recommended Fix

### **Rule:** Background color determines button color

| Section Background | Primary CTA | Secondary CTA |
|-------------------|-------------|---------------|
| **Dark** (navy, gradient) | White bg + navy text | Outlined white |
| **Light** (white, gray) | Teal bg + white text | Outlined teal |
| **Teal background** | White bg + teal text | Outlined white |
| **Special (BSA only)** | Orange gradient | Outlined matching |

---

## Colony Management Page Fixes

### **Fix 1: Hero Section CTAs** (Lines 244-274)

**Current:** White background with navy text  
**Should be:** **Teal background with white text** (consistent with bottom CTA)

```tsx
// ❌ BEFORE (line 247)
style={{
  backgroundColor: 'white',
  color: '#0a253c',
  padding: '10px 20px',
}}

// ✅ AFTER  
style={{
  backgroundColor: '#008080',
  color: 'white',
  padding: '10px 20px',
}}
```

**Reasoning:** Dark gradient background = teal primary button (not white)

### **Fix 2: Bottom CTA Section** (Lines 658-687)

**Current:** Teal background ✅ CORRECT  
**No change needed** - this is the proper pattern

```tsx
// ✅ CORRECT (line 662)
style={{
  backgroundColor: '#008080',
  color: 'white',
}}
```

### **Fix 3: Consistency Across Similar Pages**

All service pages with dark hero backgrounds should use **teal primary CTAs**, not white.

---

## Site-Wide CTA Pattern

### **Pages with Dark Hero Backgrounds:**

Should ALL use this pattern:

```tsx
{/* Primary CTA */}
<Link
  href="/request-quote"
  style={{
    backgroundColor: '#008080',  // Teal
    color: 'white',
    padding: '12px 30px',
  }}
>
  Request a Quote →
</Link>

{/* Secondary CTA */}
<Link
  href="/contact"
  style={{
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '12px 30px',
  }}
>
  Talk to a Scientist →
</Link>
```

### **Pages with Light Hero Backgrounds:**

Should use this pattern:

```tsx
{/* Primary CTA */}
<Link
  href="/request-quote"
  style={{
    backgroundColor: '#008080',  // Still teal!
    color: 'white',
    padding: '12px 30px',
  }}
>
  Request a Quote →
</Link>

{/* Secondary CTA */}
<Link
  href="/contact"
  style={{
    backgroundColor: 'transparent',
    color: '#008080',
    border: '2px solid #008080',
    padding: '12px 30px',
  }}
>
  Talk to a Scientist →
</Link>
```

---

## Exception: Breeding Scheme Architect Only

The orange/gold gradient is **ONLY** for the Breeding Scheme Architect tool:

```tsx
// ✅ ONLY for BSA promotion
<Link
  href="/breeding-scheme-architect"
  style={{
    background: 'linear-gradient(135deg, #ffb800 0%, #ff8c00 100%)',
    color: '#ffffff',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  }}
>
  Try It Free →
</Link>
```

**Do NOT use orange/gold for:**
- Request Quote
- Contact Us
- Schedule Meeting  
- Any other CTAs

---

## Implementation

### **Step 1: Fix Colony Management Page**

Change lines 244-258 from white to teal:

```bash
# File: /src/app/colony-management-services/page.tsx
# Line 247-248: Change backgroundColor
```

### **Step 2: Audit All Service Pages**

Check these pages for same issue:

- `/src/app/cryopreservation-services/page.tsx`
- `/src/app/rederivation-services/page.tsx`
- `/src/app/speed-expansion-breeding/page.tsx`
- `/src/app/mouse-genotyping-service/page.tsx`
- `/src/app/backcrossing-services/page.tsx`
- `/src/app/preclinical-services/page.tsx`
- `/src/app/phenotyping-services/page.tsx`

### **Step 3: Create Reusable CTA Component**

To prevent future inconsistencies, create a standard CTA component:

```tsx
// /src/components/UXUIDC/CTAButton.tsx

interface CTAButtonProps {
  href: string;
  variant: 'primary' | 'secondary' | 'bsa';
  children: React.ReactNode;
  darkBackground?: boolean;
}

export function CTAButton({ href, variant, children, darkBackground = true }: CTAButtonProps) {
  const styles = {
    primary: darkBackground 
      ? { backgroundColor: '#008080', color: 'white' }
      : { backgroundColor: '#008080', color: 'white' },
    secondary: darkBackground
      ? { backgroundColor: 'transparent', color: 'white', border: '2px solid white' }
      : { backgroundColor: 'transparent', color: '#008080', border: '2px solid #008080' },
    bsa: {
      background: 'linear-gradient(135deg, #ffb800 0%, #ff8c00 100%)',
      color: '#ffffff',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
    }
  };

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        ...styles[variant],
        padding: '12px 30px',
        fontSize: '.9rem',
        fontWeight: 500,
      }}
    >
      {children}
      <span>→</span>
    </Link>
  );
}
```

---

## Summary

**The Problem:**
- Hero CTAs use **white background** (inconsistent)
- Bottom CTAs use **teal background** (correct)
- Creates visual confusion about primary action

**The Fix:**
- Change hero CTAs to **teal background** to match bottom CTAs
- **Teal `#008080`** is THE primary CTA color site-wide
- **Orange/gold** is ONLY for Breeding Scheme Architect
- White CTAs should only be used on teal backgrounds

**Next Steps:**
1. Fix colony management page (lines 247-248)
2. Audit all service pages for same pattern
3. Consider creating reusable CTA component
4. Update design system docs with CTA hierarchy

---

## Decision Needed

Should I:

A. **Fix just colony management page** (quick fix)  
B. **Audit and fix all service pages** (comprehensive)  
C. **Create reusable CTA component** (prevent future issues)  
D. **All of the above** (recommended)
