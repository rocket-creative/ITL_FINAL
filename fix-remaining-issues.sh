#!/bin/bash

echo "🔧 Fixing remaining color and contrast issues..."
echo ""

# Fix inline styles with single quotes
find src/ -name "*.tsx" -type f -print0 2>/dev/null | while IFS= read -r -d '' file; do
  # Fix single-quoted rgba
  sed -i '' "s/color: '#00d4d4'/color: '#ffffff'/g" "$file" 2>/dev/null
  sed -i '' "s/rgba(255, 255, 255, 0\.8)/rgba(255, 255, 255, 0.95)/g" "$file" 2>/dev/null
  sed -i '' "s/rgba(255, 255, 255, 0\.6)/rgba(255, 255, 255, 0.95)/g" "$file" 2>/dev/null
  sed -i '' "s/rgba(255, 255, 255, 0\.5)/rgba(255, 255, 255, 0.9)/g" "$file" 2>/dev/null
  
  # Fix double-quoted versions
  sed -i '' 's/color: "#00d4d4"/color: "#ffffff"/g' "$file" 2>/dev/null
  sed -i '' 's/rgba(255, 255, 255, 0\.8)/rgba(255, 255, 255, 0.95)/g' "$file" 2>/dev/null
done

echo "✅ Fixed all remaining instances"
echo ""
echo "Verification:"
echo "  Remaining cyan text: $(grep -r "color: '#00d4d4'" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Remaining low opacity: $(grep -r "rgba(255, 255, 255, 0\.[568])" src/ --include="*.tsx" 2>/dev/null | wc -l | tr -d ' ')"

