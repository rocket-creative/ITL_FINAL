# ITL 2026 Website

Next.js website for ITL 2026, built with TypeScript, Tailwind CSS, and modern web standards.

## Quick Start

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## Project Structure

```
ITL_2026/
├── src/                    # Application source code
├── public/                 # Static assets
├── scripts/                # Build and utility scripts
├── docs-important/         # Current active documentation
├── archive/                # Historical docs and test files (git-ignored)
└── docs/                   # Additional documentation
```

## Documentation

### Active Documentation
All current, relevant documentation is in `docs-important/`:
- Launch checklists and plans
- SEO audits and implementation guides
- HubSpot and analytics integration
- Redirect management
- OG image and alt text guidelines
- Design system documentation

See `docs-important/README.md` for the complete index.

### Historical Archive
Old reports, test files, and deprecated documentation are in `archive/` (excluded from Git).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Database:** PostgreSQL (Vercel Postgres)

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Git Workflow

**Branches:**
- `ITL_MAIN` - Production (default)
- `ITL_DEV` - Development work

**Commit Format:** `NNN_type_brief-description`

Types: chore, feat, fix, update, refactor, docs, test, style, perf

**Examples:**
- `001_chore_initial-setup`
- `002_feat_homepage`
- `003_fix_nav-mobile`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
