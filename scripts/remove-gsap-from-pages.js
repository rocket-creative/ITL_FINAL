#!/usr/bin/env node

/**
 * Batch remove GSAP useEffect blocks from all page.tsx files
 * This script removes the loadGSAP function and its useEffect wrapper
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get list of files with loadGSAP
const filesOutput = execSync(
  `grep -l "loadGSAP" src/app/**/page.tsx 2>/dev/null`,
  { cwd: process.cwd(), encoding: 'utf-8' }
);

const files = filesOutput.trim().split('\n').filter(Boolean);

console.log(`Found ${files.length} files with GSAP code\n`);

let successCount = 0;
let errorCount = 0;

files.forEach((file, index) => {
  try {
    const filePath = path.join(process.cwd(), file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Pattern to match the entire useEffect block with loadGSAP
    // This matches from "useEffect(() => {" through the closing "}, []);" or "}, [heroData]);"
    const gsapPattern = /\s*useEffect\(\(\) => \{[\s\S]*?const loadGSAP = async \(\) => \{[\s\S]*?loadGSAP\(\);[\s\S]*?\}, \[[^\]]*\]\);?\n*/g;
    
    let modified = content.replace(gsapPattern, '');
    
    // Also remove standalone loadGSAP definitions if they exist
    const standalonePattern = /\s*const loadGSAP = async \(\) => \{[\s\S]*?\};?\n*/g;
    modified = modified.replace(standalonePattern, '');
    
    // Remove useEffect and useRef imports if they're now unused
    // Check if useEffect is still used elsewhere
    const hasOtherUseEffect = /useEffect\s*\(/.test(modified);
    const hasUseRef = /useRef\s*</.test(modified) || /useRef\s*\(/.test(modified);
    
    if (!hasOtherUseEffect && !hasUseRef) {
      // Remove both useEffect and useRef
      modified = modified.replace(
        /import\s+\{[^}]*useEffect[^}]*,\s*useRef[^}]*\}\s+from\s+['"]react['"];?\n/,
        ''
      );
      modified = modified.replace(
        /import\s+\{[^}]*useRef[^}]*,\s*useEffect[^}]*\}\s+from\s+['"]react['"];?\n/,
        ''
      );
    } else if (!hasOtherUseEffect) {
      // Remove just useEffect
      modified = modified.replace(
        /(import\s+\{[^}]*)useEffect,?\s*/,
        '$1'
      );
      modified = modified.replace(
        /(import\s+\{[^}]*),\s*useEffect([^}]*\}\s+from\s+['"]react['"])/,
        '$1$2'
      );
    }
    
    // Clean up any double commas or trailing commas in imports
    modified = modified.replace(/,\s*,/g, ',');
    modified = modified.replace(/\{\s*,/g, '{');
    modified = modified.replace(/,\s*\}/g, '}');
    
    if (content !== modified) {
      // Create backup
      const backupPath = filePath + '.gsap.backup';
      fs.writeFileSync(backupPath, content);
      
      // Write modified file
      fs.writeFileSync(filePath, modified);
      
      console.log(`✓ [${index + 1}/${files.length}] ${file}`);
      successCount++;
    } else {
      console.log(`⚠ [${index + 1}/${files.length}] No changes: ${file}`);
    }
    
  } catch (error) {
    console.error(`✗ [${index + 1}/${files.length}] Error in ${file}:`, error.message);
    errorCount++;
  }
});

console.log(`\n✅ Successfully processed: ${successCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`\nBackups created with .gsap.backup extension`);
console.log(`\nNote: Review changes and test before committing.`);
