# Vercel Deployment Guide

**Project:** itl-website  
**Production URL:** https://getargeting-2026.vercel.app/  
**Last Updated:** February 9, 2026

---

## Current Setup

**Vercel Project:** `itl-website`  
**Domain:** `getargeting-2026.vercel.app`  
**Status:** ✅ Working

The site is deployed via the `itl-website` Vercel project with the custom domain `getargeting-2026.vercel.app` attached.

---

## How to Deploy

### Option 1: CLI Deployment (Recommended)

```bash
cd itl-website
npx vercel --prod --yes
```

This deploys directly from the `itl-website/` folder.

### Option 2: Manual Vercel Dashboard

1. Go to: https://vercel.com/georges-projects-3ea4d6aa/itl-website
2. Click "Redeploy" on any deployment

---

## Git Integration

To enable automatic deployments from GitHub:

1. Go to: https://vercel.com/georges-projects-3ea4d6aa/itl-website/settings/git
2. Click "Connect Git Repository"
3. Select: `rocket-creative/getargeting-2026`
4. Set Root Directory: `itl-website`
5. Save

After setup, pushing to `main` will automatically deploy.

---

## Project Structure

```
ITL_2026/                  ← Git repo root
├── itl-website/           ← Next.js app (deploy from here)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── next.config.ts
├── .vercelignore          ← Excludes dev assets from upload
└── docs/                  ← Documentation
```

---

## Important Notes

1. **Always deploy from `itl-website/` folder** when using CLI
2. **Do NOT set Root Directory in Vercel dashboard** if deploying from CLI
3. **DO set Root Directory = `itl-website`** if using Git integration
4. The domain `getargeting-2026.vercel.app` is attached to the `itl-website` project

---

## Troubleshooting

### 404 on homepage
- Verify deploying from correct directory
- Check that build completed successfully
- Run: `npx vercel inspect <deployment-url>`

### 401 Authentication Required
- Domain not properly attached to project
- Run: `npx vercel domains add getargeting-2026.vercel.app`

### Build fails
- Check `npm run build` works locally first
- Verify all dependencies are in package.json

---

## URLs

- **Production:** https://getargeting-2026.vercel.app/
- **Project Dashboard:** https://vercel.com/georges-projects-3ea4d6aa/itl-website
- **Deployment Logs:** https://vercel.com/georges-projects-3ea4d6aa/itl-website/deployments
