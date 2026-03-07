# Noindex Pages Audit

This document lists all pages with `noindex` (or `index: false`) and confirms intent. Per the ITL Internal Gap Analysis (Mar 2026), 26 pages were reported as "Excluded by noindex tag." This audit verifies each is intentional.

## Intentional Noindex (Correct)

| Page | Route | Reason |
|------|-------|--------|
| Thank You | `/thank-you/` | Form confirmation page; no standalone value; avoids duplicate content |
| Admin Dashboard | `/admin/*` | Internal tool; must not appear in search |
| Admin Login | `/admin/login/` | Same as above |
| OG Preview | `/og-preview/*` | Internal tool for previewing Open Graph images |
| Lab Signals Welcome | `/lab-signals-welcome/` | Post-signup confirmation; not useful in search |
| Staged Lab Signals | `/lab-signals/[slug]/` (when staged) | Articles with future `publishedAt`; hidden until release |

## Staged Lab Signals Count

The "26 noindex pages" in GSC likely includes multiple staged Lab Signals articles. Each article with `publishedAt` in the future receives `robots: { index: false, follow: false }` dynamically. This is correct behavior.

## Verification Steps

1. In Google Search Console, go to **Coverage** > **Excluded** > "Excluded by 'noindex' tag"
2. Export the list of URLs
3. Confirm each URL matches one of the intentional categories above
4. If any URL should be indexable, remove `noindex` from its metadata and redeploy

## Pages That Should Remain Indexed

- `/accessibility/` – index: true
- `/privacy/` – index: true
- `/terms/` – index: true
- `/quality-control/` – index: true
- `/scientific-leadership/` – index: true
- `/conditional-knockout-vs-conventional-knockout/` – index: true
- `/about-itl/` – index: true

All other service, catalog, blog, and glossary pages use default `index: true` from the SEO utility or page metadata.
