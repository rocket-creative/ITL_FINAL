# Dynamic OG Image System

## Overview

This project uses a **dynamic OG image generation system** that creates OpenGraph images on-demand for all 151 pages. No static image files needed!

## How It Works

1. **API Route** (`/api/og`) generates images using `@vercel/og`
2. **Config File** (`src/data/ogImageConfig.ts`) contains text for all pages
3. **Helper Functions** (`src/lib/og-helpers.ts`) make it easy to add OG images to pages

## Design Specifications

- **Size:** 1200 x 630 pixels
- **Background:** Wavy white/grey abstract pattern
- **Logo:** iTL logo in bottom-left corner (550px wide)
- **Text:** 3 lines, left-aligned
  - **Line 1:** Blue (#1E88E5), 62px, bold look
  - **Line 2:** Navy (#1a2332), 50px, thin/light look (70% opacity)
  - **Line 3:** Teal (#008080), 40px, regular weight

## Usage

### Option 1: Use Helper Function (Recommended)

```typescript
import { generateOGMetadata } from '@/lib/og-helpers';

export const metadata = generateOGMetadata('/', {
  title: 'Custom Mouse Models | iTL',
  description: 'Expert gene targeting since 1998...',
  canonical: 'https://www.genetargeting.com/',
});
```

### Option 2: Manual Implementation

```typescript
import { getPageOGImage } from '@/lib/og-helpers';

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your description...',
  openGraph: {
    images: [
      {
        url: getPageOGImage('/your-page'),
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

## Adding New Pages

1. Edit `src/data/ogImageConfig.ts`
2. Add your page URL and text:

```typescript
'/new-page': {
  slug: 'new-page',
  line1: 'Your Main Headline',
  line2: 'Supporting Text or Stats',
  line3: 'Call to Action',
  tier: 1,
},
```

3. Use the helper function in your page component

## Testing

- **View Single Image:** `http://localhost:3002/api/og`
- **View All Images:** `http://localhost:3002/og-preview`
- **Custom Text:** `http://localhost:3002/api/og?line1=Text&line2=More&line3=CTA`

## Updating the Config

To regenerate the config from `OG-IMAGE-GUIDE.md`:

```bash
node scripts/parse-og-data.js
```

## Deployment

The system works automatically on Vercel:
- Images are generated on first request
- Cached by Vercel's CDN
- No build-time image generation needed
- Zero maintenance required

## Files

- `src/app/api/og/route.tsx` - Image generation API
- `src/data/ogImageConfig.ts` - Text configuration for all pages
- `src/lib/og-helpers.ts` - Helper functions
- `src/app/og-preview/page.tsx` - Preview tool
- `public/images/og/background.png` - Background image
- `public/images/og/logo.png` - iTL logo
- `scripts/parse-og-data.js` - Config generator

## Benefits

✅ **No Static Files** - Images generated on demand  
✅ **Easy Updates** - Change text in one config file  
✅ **Consistent Design** - Same template for all pages  
✅ **SEO Optimized** - Perfect dimensions for all platforms  
✅ **Low Maintenance** - No image files to manage  
✅ **Fast Loading** - Cached by Vercel CDN  

## Support

All 151 pages are configured and ready to use!
