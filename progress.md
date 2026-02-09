# ITL Website Rebuild - Progress Log

## Project: Ingenious Targeting Laboratory Website
**URL**: genetargeting.com  
**Started**: January 9, 2026  
**Framework**: Next.js 15 with TypeScript, Tailwind CSS  
**Hosting**: Vercel + Supabase (planned)

---

## Session 1 - January 9, 2026 (Updated)

### Key Documents Reference
- **START-HERE.docx.md** - Complete sitemap (130 pages total)
- **design-screenshot.png** - Approved design to match
- **CSS extract.md** - Brand colors
- **page-text/*.docx** - 60 pages done (out of 130)

### Design Notes
- **NO GRADIENTS** - Use flat colors only
- Primary: #0a253c (dark blue)
- Accent: #2384da (blue) 
- CTA: #008080 (teal)
- Text on blue titles, teal buttons

### Completed Tasks

#### 1. Project Initialization ✅
- Created Next.js project with TypeScript and Tailwind CSS
- Installed dependencies: GSAP, mammoth (for docx extraction)
- Set up folder structure:
  ```
  /src
    /app - Next.js App Router pages
    /components/UXUIDC - Reusable components
    /lib/UXUIDC - Utilities and GSAP config
    /content/pages - Extracted markdown content
  /scripts - Build tools
  /public/images - Static assets
  ```

#### 2. Content Extraction ✅
- Created `extract-docx.js` script using mammoth
- Successfully extracted all 60 .docx files to markdown
- Content saved to `/src/content/pages/` with frontmatter

#### 3. Design System Implementation ✅
- Configured brand colors from CSS extract:
  - `--dk-blue: #0a253c` (Primary)
  - `--blue: #2384da` (Accent)
  - `--med-blue: #134978` (Secondary)
  - `--green: teal` (CTA)
- Set up Poppins font for headings
- Implemented 1440px max-width constraint
- Created CSS custom properties for theming

#### 4. Core Components Built ✅
All components follow `|UXUIDC|` naming convention:

| Component | Description | Status |
|-----------|-------------|--------|
| Navigation | Dark blue header with search, mega-menus, mobile hamburger | ✅ |
| Footer | Multi-column footer with legal links | ✅ |
| AnnouncementBar | Green scrolling announcement banner | ✅ |
| HeroSection | Split layout hero with CTA buttons | ✅ |
| ServiceCard | Grid cards for services | ✅ |
| FeatureGrid | 2x2 feature display with optional image | ✅ |
| WorkflowSection | Timeline/step display | ✅ |
| TrustBadges | Stats and trust indicators | ✅ |
| TestimonialCard | Customer testimonials | ✅ |
| CookieConsent | GDPR-compliant cookie banner | ✅ |

#### 5. Homepage Built ✅
Matches approved design screenshot with:
- Announcement bar (NIH funding message)
- Hero section with headline and CTAs
- Core Research Services (4 cards)
- Overview section with "Why Choose ITL"
- Modern Model-Generation Landscape (dark section)
- High-Level Approach (4 features)
- Conceptual Workflow (5 steps)
- Trust Badges with stats
- Testimonials section
- FAQ section with Schema.org markup
- Final CTA section

#### 6. SEO Implementation ✅
- Meta tags (title, description, OG, Twitter)
- Schema.org structured data (Organization, FAQPage)
- Proper heading hierarchy (H1-H6)
- Semantic HTML throughout
- Skip to main content link

---

## Next Session Tasks

### Priority 1: Finish Homepage Polish
- [ ] Add actual hero images (need higher resolution)
- [ ] Test responsive design at all breakpoints
- [ ] Add GSAP scroll animations
- [ ] Verify accessibility (keyboard nav, screen reader)

### Priority 2: Build Additional Pages
Pages to build (in order):
1. `/about-itl` - About page
2. `/request-quote` - Contact/quote form
3. `/custom-mouse-models` - Main services page
4. `/knockout-mouse-models` - Service detail
5. `/catalog-mouse-models` - Catalog (needs database)

### Priority 3: Catalog Database
- [ ] Set up Supabase project
- [ ] Design model schema
- [ ] Locate and import 10,000+ models CSV
- [ ] Build searchable catalog UI
- [ ] Implement full-text search

### Priority 4: Site Infrastructure
- [ ] Set up sitemap.xml generation
- [ ] Configure robots.txt
- [ ] Set up GitHub repository
- [ ] Configure Vercel deployment
- [ ] Add Google Analytics (after cookie consent)

---

## Technical Decisions Log

### Why Next.js App Router?
- Better SEO with Server Components
- Built-in metadata API
- Static generation for content pages
- Server-side rendering for catalog search

### Why Tailwind CSS?
- Rapid prototyping with utility classes
- CSS variables integration for brand colors
- Responsive design utilities
- Small production bundle

### Why GSAP?
- Industry-standard animation library
- ScrollTrigger for scroll-based effects
- Excellent performance
- Familiar to development team

### Why Supabase for Catalog?
- Full-text search built-in
- PostgreSQL reliability
- Easy integration with Next.js
- Free tier sufficient for launch

---

## File Reference

### Key Files
- `/src/app/layout.tsx` - Root layout with fonts and metadata
- `/src/app/page.tsx` - Homepage
- `/src/app/globals.css` - Global styles and design tokens
- `/src/components/UXUIDC/index.ts` - Component exports
- `/scripts/extract-docx.js` - Content extraction script

### Content Files (60 total)
All extracted to `/src/content/pages/*.md`
- homepage.md
- about-itl.md
- custom-mouse-models.md
- ... (57 more)

---

## Notes for Next Developer

1. **Don't change page-text content** - These are final approved texts
2. **Use glossary PDF** - Check `itl_glossary_60-terms-webflow_enhanced.pdf` for terminology
3. **Follow design screenshot** - Reference `design-screenshot.png` for visual guidance
4. **Component naming** - Always use `|UXUIDC|` prefix for custom components
5. **1440px constraint** - All content must respect max-width

---

## Commands Reference

```bash
# Start dev server
cd itl-website && npm run dev

# Build for production
npm run build

# Extract docx content (if needed again)
node scripts/extract-docx.js

# Run linting
npm run lint
```

---

*Last updated: January 9, 2026*
