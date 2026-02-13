// Quick test to verify publications data structure
const fs = require('fs');
const path = require('path');

// Read the data file
const dataPath = path.join(__dirname, 'src/app/publications/publicationsData.ts');
const content = fs.readFileSync(dataPath, 'utf8');

// Extract year entries
const yearMatches = content.match(/"(\d{4})":\s*\[/g);
if (yearMatches) {
  const years = yearMatches.map(m => m.match(/"(\d{4})"/)[1]).sort((a, b) => parseInt(b) - parseInt(a));
  console.log('✅ Years found in file:', years.length);
  console.log('📅 All years:', years.join(', '));
  console.log('📊 Oldest year:', years[years.length - 1]);
  console.log('📊 Newest year:', years[0]);
  
  // Check years before 2015
  const pre2015 = years.filter(y => parseInt(y) < 2015);
  console.log('\n🔍 Years before 2015:', pre2015.length);
  console.log('📋 Pre-2015 years:', pre2015.join(', '));
} else {
  console.log('❌ No year entries found');
}
