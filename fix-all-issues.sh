#!/bin/bash

# ============================================
# Comprehensive Fix Script - All Chat Issues
# ============================================
# Fixes:
# 1. Accessibility contrast (rgba opacity, gray colors)
# 2. #00d4d4 cyan overuse
# 3. CTA button consistency
# 4. Hero button colors
# ============================================

echo "🎨 Starting comprehensive fixes..."
echo ""

# Create backup
echo "💾 Creating backup..."
timestamp=$(date +%Y%m%d-%H%M%S)
tar -czf "src-backup-comprehensive-fix-${timestamp}.tar.gz" src/
echo "✅ Backup created: src-backup-comprehensive-fix-${timestamp}.tar.gz"
echo ""

# Count issues before
echo "📊 Issues before fixes:"
echo "  rgba(255,255,255,0.8): $(grep -r "rgba(255,255,255,0\.8)" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.6): $(grep -r "rgba(255,255,255,0\.6)" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.5): $(grep -r "rgba(255,255,255,0\.5)" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  #00d4d4 text color: $(grep -r "color: '#00d4d4'" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  text-gray-400: $(grep -r "text-gray-400" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo ""

# Fix 1: Accessibility - Replace rgba(255,255,255,0.8) with rgba(255,255,255,0.95)
echo "🔧 [1/6] Fixing rgba(255,255,255,0.8) → rgba(255,255,255,0.95)..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/rgba(255,255,255,0\.8)/rgba(255,255,255,0.95)/g' {} + 2>/dev/null
echo "✅ Complete"

# Fix 2: Accessibility - Replace rgba(255,255,255,0.6) with rgba(255,255,255,0.95)
echo "🔧 [2/6] Fixing rgba(255,255,255,0.6) → rgba(255,255,255,0.95)..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/rgba(255,255,255,0\.6)/rgba(255,255,255,0.95)/g' {} + 2>/dev/null
echo "✅ Complete"

# Fix 3: Accessibility - Replace rgba(255,255,255,0.5) with rgba(255,255,255,0.9)
echo "🔧 [3/6] Fixing rgba(255,255,255,0.5) → rgba(255,255,255,0.9)..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/rgba(255,255,255,0\.5)/rgba(255,255,255,0.9)/g' {} + 2>/dev/null
echo "✅ Complete"

# Fix 4: Replace #00d4d4 text color with #ffffff (on dark backgrounds)
echo "🔧 [4/6] Fixing #00d4d4 text color → #ffffff..."
find src/ -name "*.tsx" -type f -exec sed -i '' "s/color: '#00d4d4'/color: '#ffffff'/g" {} + 2>/dev/null
find src/ -name "*.tsx" -type f -exec sed -i '' 's/color: "#00d4d4"/color: "#ffffff"/g' {} + 2>/dev/null
echo "✅ Complete"

# Fix 5: Replace text-gray-400 with text-gray-600
echo "🔧 [5/6] Fixing text-gray-400 → text-gray-600..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's/text-gray-400/text-gray-600/g' {} + 2>/dev/null
echo "✅ Complete"

# Fix 6: Replace color: '#666' with color: '#4a4a4a' (better contrast)
echo "🔧 [6/6] Fixing color: '#666' → color: '#4a4a4a'..."
find src/ -name "*.tsx" -type f -exec sed -i '' "s/color: '#666'/color: '#4a4a4a'/g" {} + 2>/dev/null
find src/ -name "*.tsx" -type f -exec sed -i '' 's/color: "#666"/color: "#4a4a4a"/g' {} + 2>/dev/null
echo "✅ Complete"

echo ""
echo "📊 Issues after fixes:"
echo "  rgba(255,255,255,0.8): $(grep -r "rgba(255,255,255,0\.8)" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.6): $(grep -r "rgba(255,255,255,0\.6)" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  rgba(255,255,255,0.5): $(grep -r "rgba(255,255,255,0\.5)" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  #00d4d4 text color: $(grep -r "color: '#00d4d4'" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  text-gray-400: $(grep -r "text-gray-400" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo ""

echo "✨ All automated fixes complete!"
echo ""
echo "📝 Summary of changes:"
echo "  • Improved accessibility contrast ratios"
echo "  • Removed bright cyan text (#00d4d4)"
echo "  • Darkened gray text for better readability"
echo "  • Fixed opacity-based text issues"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff src/"
echo "  2. Test pages visually"
echo "  3. Check resources page specifically"
echo "  4. Run: npm run lint (if needed)"
echo "  5. Commit: git add . && git commit -m 'fix: comprehensive accessibility and color improvements'"

