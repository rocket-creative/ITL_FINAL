# OG Image Implementation Guide

## ✅ What's Been Completed

- ✅ Dynamic OG image generation system (`/api/og`)
- ✅ All 151 pages configured with custom text
- ✅ Helper functions created
- ✅ Preview tool available at `/og-preview`
- ✅ Committed and pushed to GitHub

## 📋 Next Steps (To Implement OG Images on Pages)

### Step 1: Update Homepage Metadata

Edit `src/app/page.tsx` and update the metadata section:

```typescript
import { generateOGMetadata } from '@/lib/og-helpers';

export const metadata = generateOGMetadata('/', {
  title: 'Custom Mouse Models | Knockout, Knockin & Humanized Mice | ingenious targeting laboratory',
  description: 'Custom mouse models since 1998. 2,500+ projects, 800+ publications. Knockout, knockin, humanized and transgenic models for research.',
  canonical: 'https://www.genetargeting.com/',
});
```

### Step 2: Update Other Pages

For each page, replace the existing metadata export with:

```typescript
import { generateOGMetadata } from '@/lib/og-helpers';

export const metadata = generateOGMetadata('/your-page-path', {
  title: 'Your Page Title',
  description: 'Your page description...',
});
```

### Step 3: Test Locally

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3002/og-preview`
3. Check that images generate correctly

### Step 4: Test on Social Media

Use these validators to test your OG images:

- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

## 🎨 Design Specifications

- **Size:** 1200 x 630px
- **Line 1 (Blue):** 62px, bold look, tighter spacing
- **Line 2 (Navy):** 50px, thin look, 70% opacity
- **Line 3 (Teal):** 40px, regular weight
- **Logo:** 550px wide, bottom-left
- **Background:** Wavy white/grey pattern

## 🔧 Customization

### Change Text for a Page

Edit `src/data/ogImageConfig.ts`:

```typescript
'/your-page': {
  slug: 'your-page',
  line1: 'Main Headline',
  line2: 'Stats or Supporting Text',
  line3: 'Call to Action',
  tier: 1,
},
```

### Add a New Page

1. Add entry to `ogImageConfig.ts`
2. Use `generateOGMetadata()` in your page component
3. Test at `/og-preview`

## 📊 Current Status

- **Total Pages:** 151 configured
- **Tier 1 (Critical):** 20 pages
- **Tier 2 (High Priority):** 50+ pages  
- **Tier 3 (Nice to Have):** 80+ pages

## 🚀 Deployment

When you deploy to Vercel:

1. OG images will generate automatically
2. First request generates the image
3. Subsequent requests use cached version
4. No build-time generation needed
5. Zero maintenance required

## 📝 URLs

- **API Route:** `/api/og`
- **Preview Tool:** `/og-preview`
- **Test Single:** `/api/og?line1=Test&line2=Text&line3=Here`

## ✨ Benefits

- ✅ No static files to manage
- ✅ Consistent design across all pages
- ✅ Easy to update (one config file)
- ✅ SEO optimized
- ✅ CDN cached for fast loading
- ✅ Automatic generation on demand

## Need Help?

Refer to `OG-IMAGE-README.md` for complete documentation.
