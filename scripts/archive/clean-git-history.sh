#!/bin/bash

# Git History Cleanup Script
# This removes large files from git history to reduce repo size

echo "⚠️  WARNING: This will rewrite git history!"
echo "Make sure you have a backup and all team members are aware."
echo ""
echo "Files to remove:"
echo "  - *.zip files (21MB + 18MB)"
echo "  - Large PDFs and images in webflow-assets-2026-02-02/"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo "Creating backup branch..."
git branch backup-before-cleanup

echo "Removing large files from history..."

# Remove zip files
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch "*.zip"' \
  --prune-empty --tag-name-filter cat -- --all

# Remove large webflow assets folder
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch -r "webflow-assets-2026-02-02/"' \
  --prune-empty --tag-name-filter cat -- --all

# Remove images/sci-draw folder
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch -r "images/sci-draw/"' \
  --prune-empty --tag-name-filter cat -- --all

echo "Cleaning up refs..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "✓ Git history cleaned!"
echo ""
echo "Old size:"
du -sh .git
echo ""
echo "Next steps:"
echo "1. Verify everything works: git log, git status"
echo "2. Force push to remote: git push origin --force --all"
echo "3. Force push tags: git push origin --force --tags"
echo "4. All team members must re-clone or reset their repos"
