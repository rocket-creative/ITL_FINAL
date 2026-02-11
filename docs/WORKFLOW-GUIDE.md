# ITL Website Development Workflow Guide

**Version:** 1.0  
**Date:** February 9, 2026  
**For:** Year-long iterative development

---

## Branch Strategy

### Production Branch: `main`
- **Purpose:** Live production code deployed to Vercel
- **URL:** https://getargeting-2026.vercel.app (or your custom domain)
- **Protection:** Never force push, always merge from development
- **Deployment:** Automatic on every push

### Development Branch: `ITL_2026_MAIN`
- **Purpose:** Main development branch for all work
- **Where:** All commits go here first
- **Testing:** Test locally before merging to `main`
- **Merge to main:** Only when features are ready for production

### Feature Branches (Optional)
- **Pattern:** `feature/description` or `fix/description`
- **Purpose:** Isolate large features
- **Lifecycle:** Branch from `ITL_2026_MAIN` → merge back to `ITL_2026_MAIN`

---

## Daily Workflow

### Starting Your Day

```bash
# 1. Make sure you're on development branch
git checkout ITL_2026_MAIN

# 2. Pull latest changes
git pull origin ITL_2026_MAIN

# 3. Check status
git status
```

### Making Changes

```bash
# 1. Make your code changes

# 2. Test locally
cd itl-website
npm run dev
# Test at http://localhost:3000

# 3. Build locally to catch errors
npm run build

# 4. Stage your changes
git add .

# 5. Commit with proper format
git commit -m "NNN_type_description"
# Types: feat, fix, update, refactor, chore
# Example: 011_feat_add-contact-form-validation

# 6. Push to development branch
git push origin ITL_2026_MAIN
```

### Deploying to Production

```bash
# 1. Make sure development branch is ready
git checkout ITL_2026_MAIN
git status  # Should be clean

# 2. Switch to production
git checkout main

# 3. Merge development into production
git merge ITL_2026_MAIN

# 4. Push to trigger deployment
git push origin main

# 5. Switch back to development
git checkout ITL_2026_MAIN

# 6. Monitor deployment at vercel.com/dashboard
```

---

## Commit Number System

### Format: `NNN_type_description`

**Counter:** Starts at 001, increment for each commit

**Types:**
- `feat` - New feature
- `fix` - Bug fix  
- `update` - Update existing feature
- `refactor` - Code restructure (no feature change)
- `chore` - Maintenance (deps, configs)
- `docs` - Documentation only

**Examples:**
```
011_feat_add-newsletter-signup
012_fix_navigation-mobile-menu
013_update_homepage-hero-text
014_refactor_contact-form-component
015_chore_update-dependencies
016_docs_add-api-documentation
```

---

## Git Commands Cheat Sheet

### Basic Operations
```bash
# Check current branch
git branch

# Check status
git status

# See recent commits
git log --oneline -10

# See what changed
git diff
```

### Branch Management
```bash
# Switch branches
git checkout ITL_2026_MAIN
git checkout main

# Create new feature branch
git checkout -b feature/new-feature
git push -u origin feature/new-feature

# Delete merged branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Undoing Changes
```bash
# Discard uncommitted changes
git checkout -- filename.tsx

# Unstage files
git reset HEAD filename.tsx

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - DANGEROUS
git reset --hard HEAD~1
```

### Syncing
```bash
# Pull latest from remote
git pull origin ITL_2026_MAIN

# Push local commits
git push origin ITL_2026_MAIN

# Fetch without merging
git fetch origin
```

---

## Vercel Configuration

### Dashboard Settings (Already Configured)
- **Root Directory:** `itl-website`
- **Framework:** Next.js (auto-detected)
- **Build Command:** Auto-detected
- **Output Directory:** `.next` (auto-detected)

### Files in Repo
- ✅ `.vercelignore` - Excludes dev assets
- ❌ NO `vercel.json` - Dashboard settings are used

### Environment Variables
Set in Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_*` - Client-side variables
- Other secrets - Server-side only

---

## Project Structure

```
ITL_2026/
├── itl-website/              # Next.js application (deployed)
│   ├── src/
│   │   ├── app/              # App router pages
│   │   ├── components/       # React components
│   │   └── lib/              # Utilities
│   ├── public/               # Static assets
│   ├── package.json
│   └── next.config.ts
│
├── .vercelignore             # Files to exclude from deployment
├── .gitignore                # Files to exclude from git
│
├── docs/                     # Documentation (not deployed)
├── scientific-diagrams/      # Design assets (not deployed)
└── *.md                      # Documentation files (not deployed)
```

---

## Clean Repo Checklist

### Before Starting Work
- [ ] No uncommitted changes (`git status` is clean)
- [ ] On correct branch (`ITL_2026_MAIN` for development)
- [ ] Up to date with remote (`git pull`)
- [ ] Local build works (`cd itl-website && npm run build`)

### Before Committing
- [ ] Code tested locally (`npm run dev`)
- [ ] Build successful (`npm run build`)
- [ ] No lint errors (optional: `npm run lint`)
- [ ] Proper commit message format (`NNN_type_description`)

### Before Deploying to Production
- [ ] All changes committed on `ITL_2026_MAIN`
- [ ] Pushed to GitHub
- [ ] Local test passed
- [ ] Ready for users to see

---

## Troubleshooting

### Issue: "Your branch is behind"
```bash
git pull origin ITL_2026_MAIN
```

### Issue: Merge conflict
```bash
# 1. Open conflicted files
# 2. Look for <<<<<<< HEAD markers
# 3. Choose which version to keep
# 4. Remove conflict markers
# 5. git add conflicted-file.tsx
# 6. git commit
```

### Issue: Vercel build fails
1. Check build logs in Vercel Dashboard
2. Run `npm run build` locally to reproduce
3. Fix the error
4. Commit and push

### Issue: Need to undo a deployment
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Issue: Git history too large
- Don't commit large files (images, zips, videos)
- Use `.gitignore` for generated files
- Keep `node_modules`, `.next`, etc. out of git

---

## Monthly Maintenance

### Once per month:
```bash
# 1. Update dependencies
cd itl-website
npm update

# 2. Test thoroughly
npm run build
npm run dev  # Manual testing

# 3. Commit updates
git add package.json package-lock.json
git commit -m "NNN_chore_update-dependencies"
git push origin ITL_2026_MAIN

# 4. If all good, merge to production
git checkout main
git merge ITL_2026_MAIN
git push origin main
git checkout ITL_2026_MAIN
```

---

## Emergency Procedures

### Rollback Production
```bash
# Option 1: Vercel Dashboard (easiest)
# Go to Deployments → Find last good deployment → Promote

# Option 2: Git revert
git checkout main
git revert HEAD  # Reverts last commit
git push origin main
```

### Fix Broken Development Branch
```bash
# Reset to production state
git checkout ITL_2026_MAIN
git reset --hard origin/main
git push origin ITL_2026_MAIN --force
```

### Clean Local Repo
```bash
# Remove untracked files
git clean -fd

# Remove all local changes
git reset --hard HEAD

# Start fresh
git pull origin ITL_2026_MAIN
```

---

## Key Rules

### ✅ DO
- Work on `ITL_2026_MAIN` branch
- Commit often with good messages
- Test before pushing
- Merge to `main` only when ready
- Keep commits small and focused

### ❌ DON'T
- Force push to `main` (unless emergency)
- Commit directly to `main`
- Commit large binary files
- Skip testing before deploying
- Use ambiguous commit messages

---

## Quick Reference

### Current Setup Status
- ✅ Main branch: `main` (production)
- ✅ Development branch: `ITL_2026_MAIN`
- ✅ Vercel Root Directory: `itl-website`
- ✅ `.vercelignore` configured
- ✅ Git history cleaned (229MB)

### Support Files
- `WORKFLOW-GUIDE.md` (this file)
- `BUILD-OPTIMIZATION-REPORT.md` - Build details
- `VERCEL-DASHBOARD-SETUP.md` - Vercel configuration
- `GIT-CLEANUP-GUIDE.md` - Git maintenance

---

## Contact & Resources

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** github.com/rocket-creative/getargeting-2026
- **Next.js Docs:** https://nextjs.org/docs
- **Git Documentation:** https://git-scm.com/doc

---

**Remember:** This workflow is designed for solo or small team development. Adjust as your team grows!
