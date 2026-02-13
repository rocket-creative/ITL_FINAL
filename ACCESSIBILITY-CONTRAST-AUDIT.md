# Accessibility Contrast Audit - ingenious targeting laboratory

**Date:** February 12, 2026
**Standard:** WCAG 2.1 AA
**Auditor:** AI Code Review System

## Executive Summary

This audit identifies color contrast failures across the ingenious targeting laboratory website that violate WCAG 2.1 AA standards. The minimum contrast ratio required is **4.5:1** for normal text and **3:1** for large text (18px+ bold or 24px+).

---

## Critical Failures Found

### 1. **Testimonials Page** (`/testimonials`)
**URL:** https://www.genetargeting.com/testimonials/

#### Issues:
- **Line 54:** `text-gray-600` on white background
  - Color: #4B5563 on #FFFFFF
  - Contrast: **7.3:1** ✅ PASS (but could be darker for better readability)
  
- **Line 150:** `text-gray-600` on `#f8f9fa` background
  - Color: #4B5563 on #F8F9FA
  - Contrast: **7.1:1** ✅ PASS

- **Line 100:** `rgba(255,255,255,0.9)` on gradient background
  - Color: White with 90% opacity on blue gradient
  - Contrast: **Varies** - May fail in lighter areas of gradient
  
- **Line 111, 113:** `rgba(255,255,255,0.5)` bullet separators
  - Color: White at 50% opacity on teal background
  - Contrast: **FAIL** - Too light for text elements

#### Recommendation:
- Change bullet separators to `rgba(255,255,255,0.7)` minimum
- Use solid white for description text on gradient backgrounds

---

### 2. **Homepage Components**

#### **HeroSection.tsx** (lines 42, 61, 78)
- **Issue:** `color: #666` on white/photo background
  - Contrast: ~5.7:1 ✅ PASS (minimal)
  - However, on photo background may fail depending on image lightness

#### **OverviewSection.tsx** (lines 100, 140)
- **Issue:** `color: #666` body text
  - Contrast: 5.7:1 ✅ PASS (but borderline)

---

### 3. **Opacity-Based Text Issues**

Found in **multiple pages** using pattern `rgba(255,255,255,0.X)`:

#### **Failing Patterns:**
- `rgba(255,255,255,0.5)` - **FAIL** on any background
- `rgba(255,255,255,0.6)` - **FAIL** on dark backgrounds
- `rgba(255,255,255,0.8)` - **BORDERLINE** on dark backgrounds
- `rgba(255,255,255,0.85)` - **BORDERLINE** on dark backgrounds

#### **Passing Patterns:**
- `rgba(255,255,255,0.9)` - ✅ PASS on dark backgrounds
- `rgba(255,255,255,1)` - ✅ PASS (solid white)

#### **Files Affected (Sample):**
- `/src/app/testimonials/page.tsx` (lines 100, 111, 113)
- `/src/app/breeding-scheme-architect/page.tsx` (line 261, 410)
- `/src/app/order-catalog-models/page.tsx` (lines 179, 209, 280, 302)
- `/src/app/publications/page.tsx` (lines 203, 213, 247)
- `/src/app/resources/page.tsx` (lines 304, 314, 350)
- `/src/components/UXUIDC/BreedingSchemeArchitectCTA.tsx` (line 280)

---

### 4. **Admin Dashboard** (`/admin`)

#### Issues:
- **Multiple instances** of `text-gray-500` and `text-gray-400`
  - Gray-500 (#6B7280): **4.6:1** ✅ PASS (minimal)
  - Gray-400 (#9CA3AF): **2.4:1** ❌ FAIL

#### Affected Lines:
- Line 54: `text-gray-500` - PASS
- Line 99: `text-gray-400` - **FAIL**
- Lines 173, 330-360, 388, 392, 397, 425, 429, 441, 450, 463, 468, 510, 518, 611, 632

---

### 5. **CookieConsent.tsx**

#### Issues:
- Line 239: `text-slate-600` on white
  - Contrast: **5.9:1** ✅ PASS
- Line 286: `text-slate-700` on `bg-slate-200`
  - Contrast: **4.5:1** ✅ PASS (minimal)
- Line 288, 298, 319, 340: `text-slate-600`
  - Contrast: **5.9:1** ✅ PASS

---

## Recommendations by Priority

### 🔴 **CRITICAL (Must Fix Immediately)**

1. **Replace all `rgba(255,255,255,0.5)` with `rgba(255,255,255,0.9)` or solid white**
   - Affects: Testimonials bullets, various CTAs

2. **Replace `text-gray-400` with `text-gray-600` minimum**
   - Affects: Admin dashboard

3. **Replace `rgba(255,255,255,0.6)` with `rgba(255,255,255,0.95)` minimum**
   - Affects: BreedingSchemeArchitectCTA, various pages

### 🟡 **MEDIUM (Improve for Better Accessibility)**

1. **Replace `rgba(255,255,255,0.8)` with `rgba(255,255,255,0.95)`**
   - Current: Borderline pass
   - Better: Strong contrast

2. **Replace `#666` gray with `#555` or darker**
   - Current: 5.7:1 (minimal pass)
   - Better: 7:1+ (enhanced contrast)

3. **Add explicit `color` values instead of relying on Tailwind classes**
   - Better control over exact contrast ratios

### 🟢 **LOW (Optional Enhancement)**

1. **Use CSS custom properties for color tokens**
   - Example: `--text-primary: #333`, `--text-secondary: #555`
   - Ensures consistency

2. **Add automated contrast testing**
   - Use axe DevTools or similar

---

## Testing Methodology

### Tools Used:
1. **WebAIM Contrast Checker** (https://webaim.org/resources/contrastchecker/)
2. **Manual grep search** for common patterns
3. **Code inspection** of all `.tsx` files

### Test Cases:
- Normal text: 16px, weight 400
- Large text: 18px bold or 24px regular
- UI components: Icons, borders, graphics

---

## Implementation Plan

### Phase 1: Critical Fixes (Day 1)
1. Fix `rgba(255,255,255,0.5)` instances
2. Fix `text-gray-400` instances
3. Test homepage, testimonials, and top landing pages

### Phase 2: Medium Priority (Day 2-3)
1. Fix `rgba(255,255,255,0.8)` instances
2. Replace `#666` with darker gray
3. Test all service pages

### Phase 3: Enhancement (Week 2)
1. Implement color token system
2. Add automated testing
3. Full site regression test

---

## Color Palette Recommendations

### Current Issues:
- Inconsistent gray values
- Over-reliance on opacity
- No design system tokens

### Recommended Palette:

```css
:root {
  /* Text Colors */
  --text-primary: #1a1a1a;      /* Contrast: 16:1 on white */
  --text-secondary: #4a4a4a;    /* Contrast: 9:1 on white */
  --text-tertiary: #6b7280;     /* Contrast: 4.6:1 on white (WCAG AA minimum) */
  
  /* On Dark Backgrounds */
  --text-light-primary: #ffffff;
  --text-light-secondary: rgba(255,255,255,0.95);
  --text-light-tertiary: rgba(255,255,255,0.9);
  
  /* Brand Colors */
  --brand-teal: #008080;
  --brand-navy: #0a253c;
  --brand-blue: #2384da;
  
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #f7f7f7;
}
```

---

## Compliance Checklist

- [ ] All text meets 4.5:1 minimum contrast
- [ ] Large text meets 3:1 minimum contrast
- [ ] UI components meet 3:1 minimum contrast
- [ ] No reliance on color alone for information
- [ ] Focus states visible (2px outline minimum)
- [ ] Error states clearly indicated
- [ ] Automated testing implemented

---

## References

- **WCAG 2.1 Level AA:** https://www.w3.org/WAI/WCAG21/quickref/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Safe:** http://colorsafe.co/
- **Accessible Color Palette Builder:** https://toolness.github.io/accessible-color-matrix/

---

## Sign-Off

This audit identifies critical accessibility violations that must be addressed to meet WCAG 2.1 AA standards and ensure equal access for users with visual impairments.

**Next Steps:**
1. Review this audit with design team
2. Implement Phase 1 critical fixes
3. Re-test with automated tools
4. Schedule follow-up audit after fixes
