/**
 * SMOC → ITL Catalog Transformation Script
 *
 * Reads the SMOC CSV, strips all supplier branding, rebrands catalog numbers
 * to ITL format, extracts gene names, and outputs a Google Sheets-ready CSV.
 *
 * Usage:
 *   node scripts/transform-smoc-catalog.js [path-to-smoc-export.csv]
 *
 * Input:  first CLI arg, else SMOC_CSV env var, else the default Downloads path
 *         (~/Downloads/total and humanized 2026.1.16.xlsx - Total.csv)
 * Output: scripts/data/itl-catalog-ready.csv
 *
 * Then upload to Google Sheets:
 *   1. Open spreadsheet ID: 1DG54nHKf-A-7Ii8nSHvps74nCXbmNsPk51uL15JzuRU
 *   2. Click the "ITL-Cat-24-25" tab
 *   3. File → Import → Upload → select scripts/data/itl-catalog-ready.csv
 *   4. Import location: "Replace current sheet" | Separator: Comma
 */

const fs   = require('fs');
const path = require('path');

const DEFAULT_INPUT_PATH = path.join(
  process.env.HOME || '',
  'Downloads',
  'total and humanized 2026.1.16.xlsx - Total.csv'
);

// Resolve the SMOC export: CLI arg > SMOC_CSV env var > default Downloads path.
const INPUT_PATH = path.resolve(
  process.argv[2] || process.env.SMOC_CSV || DEFAULT_INPUT_PATH
);
const OUTPUT_DIR  = path.join(__dirname, 'data');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'itl-catalog-ready.csv');

// Best-effort export date detection from the filename (e.g. "2026.1.16" or "2026-01-16").
function detectExportDate(filePath) {
  const name = path.basename(filePath);
  const m = name.match(/(\d{4})[.\-_/](\d{1,2})[.\-_/](\d{1,2})/);
  if (!m) return null;
  const [, y, mo, d] = m;
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// ─── Model type lookup (from SMOC type code) ──────────────────────────────────
const MODEL_TYPE_MAP = {
  KO:  'Knockout',
  CKO: 'Conditional Knockout',
  KI:  'Knockin',
  HU:  'Humanized',
  TG:  'Transgenic',
  NSG: 'Immunodeficient',
  XA:  'Xenograft-Applicable',
  NR:  'Nuclear Reporter',
  GM:  'Gene Model',
  CM:  'Cell Model',
};

// ─── CSV parser (handles quoted fields with embedded commas) ──────────────────
function parseCSVLine(line) {
  const fields = [];
  let current  = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

// ─── Transformers ─────────────────────────────────────────────────────────────

// NM-KI-253470  →  KI 253470
// NMX-KI-252468 →  KI 252468
function renameCatalogNumber(smocNum) {
  return smocNum.replace(/^NMX?-/, '').replace(/-/g, ' ');
}

// Wnt1-IRES-CreERT2 → Wnt1
// CAG-LSL-dCas9-Tg  → CAG
function extractGeneName(abbrev) {
  if (!abbrev) return '';
  return abbrev.split('-')[0].trim();
}

// NM-KI-253470 → extract "KI" → "Knockin"
function deriveModelType(smocNum) {
  const m = smocNum.match(/^NMX?-([A-Z]+)-/);
  if (!m) return 'Other';
  return MODEL_TYPE_MAP[m[1]] || m[1];
}

// Strip stray quotes/spaces from multi-value category fields
function cleanCategory(raw) {
  return raw.replace(/^["'\s]+|["'\s]+$/g, '').trim();
}

// ─── CSV writer ───────────────────────────────────────────────────────────────
function csvField(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function toCSVRow(fields) { return fields.map(csvField).join(','); }

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`\nERROR: Input file not found:\n  ${INPUT_PATH}\n`);
    console.error('Pass the SMOC export path as the first argument, e.g.:');
    console.error('  node scripts/transform-smoc-catalog.js "/path/to/SMOC export.csv"\n');
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const exportDate = detectExportDate(INPUT_PATH);
  console.log(`\nSMOC export:  ${INPUT_PATH}`);
  console.log(`Export date:  ${exportDate ?? 'unknown (no date in filename)'}`);

  const lines     = fs.readFileSync(INPUT_PATH, 'utf8').split('\n').filter(l => l.trim());
  const dataLines = lines.slice(1); // skip SMOC header row

  const outputRows = [
    // Column order MUST match CatalogSearch.tsx row[] mapping
    toCSVRow(['Gene Name', 'Model Abbreviation', 'Model Type', 'Category', 'Availability', 'ITL Catalog #']),
  ];

  let processed = 0, skipped = 0;

  for (const line of dataLines) {
    const fields = parseCSVLine(line);
    // SMOC columns: [0] Catalog Number  [1] Model Abbreviation  [2] Status  [3] Category  [4] Verification
    const smocNum    = fields[0] || '';
    const abbrev     = (fields[1] || '').trim();
    const status     = (fields[2] || '').trim();
    const rawCat     = fields[3] || '';

    if (!smocNum || !abbrev) { skipped++; continue; }

    outputRows.push(toCSVRow([
      extractGeneName(abbrev),          // Gene Name     → row[0]
      abbrev,                           // Model Abbrev  → row[1]
      deriveModelType(smocNum),         // Model Type    → row[2]
      cleanCategory(rawCat),            // Category      → row[3]
      status,                           // Availability  → row[4]
      renameCatalogNumber(smocNum),     // ITL Catalog # → row[5]
    ]));
    processed++;
  }

  fs.writeFileSync(OUTPUT_PATH, outputRows.join('\n'), 'utf8');

  console.log(`
Transform complete
──────────────────────────────────────
Input rows:  ${dataLines.length}
Processed:   ${processed}
Skipped:     ${skipped}
Output:      ${OUTPUT_PATH}

Next step — upload to Google Sheets:
  1. Open spreadsheet ID: 1DG54nHKf-A-7Ii8nSHvps74nCXbmNsPk51uL15JzuRU
  2. Select the "ITL-Cat-24-25" tab
  3. File → Import → Upload → scripts/data/itl-catalog-ready.csv
  4. Import location: Replace current sheet | Separator: Comma
  `);
}

main();
