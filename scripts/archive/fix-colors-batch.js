#!/usr/bin/env node

/**
 * Batch Color Pattern Fixer for ITL Website
 * Automatically detects and fixes consecutive same-color section backgrounds
 * across all pages to ensure proper alternating pattern
 */

const fs = require('fs');
const path = require('path');

// Color mappings
const COLORS = {
  WHITE: ['white', '#ffffff', '#fff'],
  GREY: ['#f8f9fa', '#f7f7f7', '#f5f5f5'],
  DARK_BLUE: ['#0a253c', '#134978'],
  TEAL: ['#008080', 'teal'],
  GRADIENT: ['linear-gradient']
};

// Check if a color is white
function isWhite(color) {
  if (!color) return false;
  const normalized = color.toLowerCase().trim();
  return COLORS.WHITE.some(c => normalized.includes(c)) && !normalized.includes('rgba') && !normalized.includes('gradient');
}

// Check if a color is grey
function isGrey(color) {
  if (!color) return false;
  const normalized = color.toLowerCase().trim();
  return COLORS.GREY.some(c => normalized.includes(c));
}

// Check if a color is dark (accent)
function isDark(color) {
  if (!color) return false;
  const normalized = color.toLowerCase().trim();
  return COLORS.DARK_BLUE.some(c => normalized.includes(c)) || COLORS.TEAL.some(c => normalized.includes(c));
}

// Check if a color is gradient
function isGradient(color) {
  if (!color) return false;
  return color.toLowerCase().includes('gradient');
}

// Get alternate color
function getAlternateColor(currentColor) {
  if (isWhite(currentColor)) return '#f8f9fa';
  if (isGrey(currentColor)) return 'white';
  return currentColor; // Don't change dark or gradient colors
}

// Extract section backgrounds from file content
function extractSections(content) {
  const sections = [];
  
  // Match section tags with style attributes
  const sectionRegex = /<section[^>]*style=\{?\{?[^}]*background(?:Color)?:\s*['"`]([^'"`]+)['"`][^}]*\}?\}?[^>]*>/g;
  let match;
  
  while ((match = sectionRegex.exec(content)) !== null) {
    sections.push({
      fullMatch: match[0],
      color: match[1],
      index: match.index
    });
  }
  
  return sections;
}

// Analyze and fix a single file
function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let changes = [];
    
    const sections = extractSections(content);
    
    // Skip files with very few sections
    if (sections.length < 3) {
      return { filePath, fixed: false, reason: 'Too few sections' };
    }
    
    // Detect consecutive same colors
    for (let i = 1; i < sections.length; i++) {
      const prev = sections[i - 1];
      const curr = sections[i];
      
      // Skip if previous is gradient (hero section)
      if (isGradient(prev.color)) continue;
      
      // Skip if current is dark/accent color
      if (isDark(curr.color)) continue;
      
      // Check for consecutive whites
      if (isWhite(prev.color) && isWhite(curr.color)) {
        const newColor = '#f8f9fa';
        newContent = newContent.replace(curr.fullMatch, 
          curr.fullMatch.replace(curr.color, newColor));
        changes.push(`Section ${i + 1}: ${curr.color} → ${newColor} (after white)`);
      }
      
      // Check for consecutive greys
      else if (isGrey(prev.color) && isGrey(curr.color)) {
        const newColor = 'white';
        newContent = newContent.replace(curr.fullMatch, 
          curr.fullMatch.replace(curr.color, newColor));
        changes.push(`Section ${i + 1}: ${curr.color} → ${newColor} (after grey)`);
      }
    }
    
    if (changes.length > 0) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return { filePath, fixed: true, changes };
    }
    
    return { filePath, fixed: false, reason: 'No issues found' };
    
  } catch (error) {
    return { filePath, fixed: false, error: error.message };
  }
}

// Process all page files
function processAllPages() {
  const appDir = path.join(__dirname, 'itl-website/src/app');
  const results = {
    fixed: [],
    skipped: [],
    errors: []
  };
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file === 'page.tsx') {
        const result = fixFile(filePath);
        
        if (result.error) {
          results.errors.push(result);
        } else if (result.fixed) {
          results.fixed.push(result);
        } else {
          results.skipped.push(result);
        }
      }
    }
  }
  
  walkDir(appDir);
  return results;
}

// Main execution
console.log('🎨 ITL Color Pattern Batch Fixer\n');
console.log('Scanning all page.tsx files for consecutive same-color sections...\n');

const results = processAllPages();

console.log('═'.repeat(60));
console.log('\n✅ FIXED FILES (' + results.fixed.length + '):\n');
results.fixed.forEach(r => {
  console.log(`📄 ${r.filePath.replace(process.cwd(), '.')}`);
  r.changes.forEach(c => console.log(`   └─ ${c}`));
  console.log('');
});

console.log('═'.repeat(60));
console.log('\n⏭️  SKIPPED FILES (' + results.skipped.length + '):\n');
results.skipped.slice(0, 10).forEach(r => {
  console.log(`   ${r.filePath.replace(process.cwd(), '.')} - ${r.reason}`);
});
if (results.skipped.length > 10) {
  console.log(`   ... and ${results.skipped.length - 10} more`);
}

if (results.errors.length > 0) {
  console.log('\n═'.repeat(60));
  console.log('\n❌ ERRORS (' + results.errors.length + '):\n');
  results.errors.forEach(r => {
    console.log(`   ${r.filePath.replace(process.cwd(), '.')} - ${r.error}`);
  });
}

console.log('\n═'.repeat(60));
console.log('\n📊 SUMMARY:');
console.log(`   Fixed: ${results.fixed.length}`);
console.log(`   Skipped: ${results.skipped.length}`);
console.log(`   Errors: ${results.errors.length}`);
console.log(`   Total: ${results.fixed.length + results.skipped.length + results.errors.length}`);
console.log('\n✨ Done!\n');
