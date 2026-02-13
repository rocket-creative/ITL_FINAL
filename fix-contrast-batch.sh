#!/bin/bash

# ============================================
# Batch Accessibility Contrast Fix Script
# ============================================
# Fixes remaining rgba opacity and gray color issues
# across all TypeScript React files
# WCAG 2.1 AA Compliance
# ============================================

echo "🎨 Starting accessibility contrast batch fixes..."
echo ""

# Count instances before fixes
echo "📊 Counting issues before fixes:"
echo "  rgba(255,255,255,0.8): $(grep -r "rgba(255,255,255,0\.8)" src/ | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.6): $(grep -r "rgba(255,255,255,0\.6)" src/ | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.5): $(grep -r "rgba(255,255,255,0\.5)" src/ | wc -l | tr -d ' ')"
echo ""

# Backup source directory
echo "💾 Creating backup..."
tar -czf "src-backup-$(date +%Y%m%d-%H%M%S).tar.gz" src/
echo "✅ Backup created"
echo ""

# Fix 1: Replace rgba(255,255,255,0.8) with rgba(255,255,255,0.95)
echo "🔧 Fixing rgba(255,255,255,0.8) → rgba(255,255,255,0.95)..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/rgba(255,255,255,0\.8)/rgba(255,255,255,0.95)/g' {} +
echo "✅ Complete"

# Fix 2: Replace rgba(255,255,255,0.6) with rgba(255,255,255,0.95)
echo "🔧 Fixing rgba(255,255,255,0.6) → rgba(255,255,255,0.95)..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/rgba(255,255,255,0\.6)/rgba(255,255,255,0.95)/g' {} +
echo "✅ Complete"

# Fix 3: Replace rgba(255,255,255,0.5) with rgba(255,255,255,0.9)
# Note: Using 0.9 instead of 0.95 for decorative elements
echo "🔧 Fixing rgba(255,255,255,0.5) → rgba(255,255,255,0.9)..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/rgba(255,255,255,0\.5)/rgba(255,255,255,0.9)/g' {} +
echo "✅ Complete"

# Fix 4: Replace color: '#666' with color: '#4a4a4a'
echo "🔧 Fixing color: '#666' → color: '#4a4a4a'..."
find src/ -name "*.tsx" -type f -exec sed -i '' "s/color: '#666'/color: '#4a4a4a'/g" {} +
echo "✅ Complete"

# Fix 5: Replace color: "#666" with color: "#4a4a4a" (double quotes)
echo "🔧 Fixing color: \"#666\" → color: \"#4a4a4a\"..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/color: "#666"/color: "#4a4a4a"/g' {} +
echo "✅ Complete"

# Fix 6: Replace text-gray-400 with text-gray-600
echo "🔧 Fixing text-gray-400 → text-gray-600..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/text-gray-400/text-gray-600/g' {} +
echo "✅ Complete"

echo ""
echo "📊 Counting remaining issues after fixes:"
echo "  rgba(255,255,255,0.8): $(grep -r "rgba(255,255,255,0\.8)" src/ | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.6): $(grep -r "rgba(255,255,255,0\.6)" src/ | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.5): $(grep -r "rgba(255,255,255,0\.5)" src/ | wc -l | tr -d ' ')"
echo "  color: '#666': $(grep -r "color: '#666'" src/ | wc -l | tr -d ' ')"
echo "  text-gray-400: $(grep -r "text-gray-400" src/ | wc -l | tr -d ' ')"
echo ""

# Generate report of files changed
echo "📝 Generating change report..."
echo "Files modified:" > contrast-fixes-report.txt
find src/ -name "*.tsx" -type f -newer src-backup-*.tar.gz >> contrast-fixes-report.txt 2>/dev/null
echo "✅ Report saved to contrast-fixes-report.txt"
echo ""

echo "✨ Batch fixes complete!"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff"
echo "  2. Test visually: npm run dev"
echo "  3. Run linter: npm run lint"
echo "  4. Run accessibility audit: npm run audit"
echo "  5. Commit changes: git add . && git commit -m 'fix: improve color contrast for WCAG 2.1 AA compliance'"
echo ""
echo "📚 See ACCESSIBILITY-FIXES-APPLIED.md for details"
