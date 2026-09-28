/**
 * SMOC → ITL Catalog Transformation Script
 *
 * Reads a SMOC export (CSV, or the Total sheet of an .xlsx), strips supplier
 * branding, rebrands catalog numbers to ITL format, extracts gene names, and
 * writes scripts/data/itl-catalog-ready.csv.
 *
 * Usage:
 *   node scripts/transform-smoc-catalog.js [path-to-smoc-export.csv|xlsx]
 *
 * Input:  first CLI arg, else SMOC_CSV env var, else the default Downloads path.
 *         .xlsx files use the "Total" sheet only (mouse catalog).
 * Output: scripts/data/itl-catalog-ready.csv
 *
 * Site availability is the SMOC Status column (Live, Sperm Cryopreserved, …).
 * The newer Availability column is only Available/blank and is ignored.
 */

const fs   = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DEFAULT_INPUT_PATH = path.join(
  process.env.HOME || '',
  'Downloads',
  'total and humanized 2026.1.16.xlsx - Total.csv'
);

const INPUT_PATH = path.resolve(
  process.argv[2] || process.env.SMOC_CSV || DEFAULT_INPUT_PATH
);
const OUTPUT_DIR  = path.join(__dirname, 'data');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'itl-catalog-ready.csv');

function detectExportDate(filePath) {
  const name = path.basename(filePath);
  const stamp = (y, mo, d) => `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const ymd = name.match(/(\d{4})[.\-_/](\d{1,2})[.\-_/](\d{1,2})/);
  if (ymd) return stamp(ymd[1], ymd[2], ymd[3]);
  // Total_Mice_List_8.12.2026_… uses month.day.year
  const mdy = name.match(/(?:^|[^\d])(\d{1,2})[.\-_/](\d{1,2})[.\-_/](\d{4})/);
  if (mdy) return stamp(mdy[3], mdy[1], mdy[2]);
  return null;
}

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

// NM-KI-253470, NMX-KI-252468, NR-KO-264010, and doubled codes like NM-KO-NM-KO-200714.
// Trailing letters stay (malformed "2000052to") with a space inserted before them.
const CATALOG_TOKEN = /(?:NMX?|NR)-(?:[A-Z]+-)*([A-Z]+)[-\s]+(\d+)/g;
const EXCEL_ERROR = /^#(N\/A|NAME\?|REF!|VALUE!|NULL!|DIV\/0!)$/i;

function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = false;
      } else {
        current += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(current);
      current = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(current);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      current = '';
    } else {
      current += ch;
    }
  }

  row.push(current);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function renameCatalogNumber(smocNum) {
  return smocNum.replace(/^NMX?-/, '').replace(/-/g, ' ');
}

function extractGeneName(abbrev) {
  if (!abbrev) return '';
  return abbrev.split('-')[0].trim();
}

function deriveModelType(smocNum) {
  const m = smocNum.match(/^NMX?-([A-Z]+)-/);
  if (!m) return 'Other';
  return MODEL_TYPE_MAP[m[1]] || m[1];
}

function cleanCategory(raw) {
  return String(raw ?? '').replace(/^["'\s]+|["'\s]+$/g, '').trim();
}

function rebrandDescription(raw) {
  let text = String(raw ?? '').replace(/\s+/g, ' ').trim();
  if (!text || EXCEL_ERROR.test(text)) return '';
  text = text.replace(CATALOG_TOKEN, (match, type, digits, offset) => {
    const next = text[offset + match.length] || '';
    return `${type} ${digits}${/[A-Za-z]/.test(next) ? ' ' : ''}`;
  });
  text = text.replace(/shanghai model organisms?(?:\s+center)?/gi, 'iTL');
  text = text.replace(/\bsmoc\b/gi, 'iTL');
  return text.trim();
}

function csvField(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function toCSVRow(fields) { return fields.map(csvField).join(','); }

function colIndex(headers, name) {
  const target = name.toLowerCase();
  return headers.findIndex((h) => String(h).trim().toLowerCase() === target);
}

function columnMap(headers) {
  const catalog = colIndex(headers, 'Catalog Number');
  if (catalog === -1) {
    return { catalog: 0, abbrev: 1, status: 2, category: 3, description: -1, named: false };
  }
  const status = colIndex(headers, 'Status');
  const availability = colIndex(headers, 'Availability');
  return {
    catalog,
    abbrev: colIndex(headers, 'Model Abbreviation'),
    // Status is the live/cryo/development value. The Availability column is only Available/blank.
    status: status !== -1 ? status : availability,
    category: colIndex(headers, 'Category'),
    description: colIndex(headers, 'Model Description'),
    named: true,
  };
}

function cell(row, index) {
  if (index < 0) return '';
  return String(row[index] ?? '').trim();
}

const XLSX_READER = String.raw`
import json, sys, zipfile, xml.etree.ElementTree as ET
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
path = sys.argv[1]
z = zipfile.ZipFile(path)
ss = []
root = ET.fromstring(z.read("xl/sharedStrings.xml"))
for si in root.findall("m:si", NS):
    texts = [t.text or "" for t in si.iter("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t")]
    ss.append("".join(texts))

def cell_val(c):
    t = c.attrib.get("t")
    v = c.find("m:v", NS)
    if v is None or v.text is None:
        is_el = c.find("m:is", NS)
        if is_el is None:
            return ""
        return "".join(x.text or "" for x in is_el.iter("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t"))
    if t == "s":
        return ss[int(v.text)]
    return v.text

def col_idx(ref):
    col = "".join(ch for ch in ref if ch.isalpha())
    n = 0
    for ch in col:
        n = n * 26 + (ord(ch) - 64)
    return n - 1

wb = ET.fromstring(z.read("xl/workbook.xml"))
rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
rid_to_target = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels}
target = None
for sh in wb.find("m:sheets", NS):
    if sh.attrib.get("name") == "Total":
        target = rid_to_target[sh.attrib[REL]]
        break
if not target:
    sys.stderr.write("Total sheet not found\n")
    sys.exit(2)
sheet_path = target if target.startswith("xl/") else "xl/" + target.lstrip("/")
sheet = ET.fromstring(z.read(sheet_path))
for row in sheet.findall(".//m:sheetData/m:row", NS):
    vals = {}
    width = 0
    for c in row.findall("m:c", NS):
        i = col_idx(c.attrib.get("r", "A1"))
        vals[i] = cell_val(c)
        if i + 1 > width:
            width = i + 1
    if not any(str(v).strip() for v in vals.values()):
        continue
    out = [vals.get(i, "") for i in range(width)]
    sys.stdout.write(json.dumps(out, ensure_ascii=False) + "\n")
`;

function readXlsxTotal(filePath) {
  const res = spawnSync('python3', ['-c', XLSX_READER, filePath], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.error) {
    throw new Error(`Could not read xlsx (python3 required): ${res.error.message}`);
  }
  if (res.status !== 0) {
    throw new Error((res.stderr || '').trim() || `python3 exited ${res.status}`);
  }
  return res.stdout
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
}

function readInput(filePath) {
  if (filePath.toLowerCase().endsWith('.xlsx')) {
    return readXlsxTotal(filePath);
  }
  return parseCSV(fs.readFileSync(filePath, 'utf8'));
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`\nERROR: Input file not found:\n  ${INPUT_PATH}\n`);
    console.error('Pass the SMOC export path as the first argument, e.g.:');
    console.error('  node scripts/transform-smoc-catalog.js "/path/to/SMOC export.xlsx"\n');
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const exportDate = detectExportDate(INPUT_PATH);
  console.log(`\nSMOC export:  ${INPUT_PATH}`);
  console.log(`Export date:  ${exportDate ?? 'unknown (no date in filename)'}`);

  let rows;
  try {
    rows = readInput(INPUT_PATH);
  } catch (err) {
    console.error(`\nERROR: ${err.message}\n`);
    process.exit(1);
  }

  if (!rows.length) {
    console.error('\nERROR: Export has no rows.\n');
    process.exit(1);
  }

  const headers = rows[0].map((h) => String(h).trim());
  const cols = columnMap(headers);
  const dataRows = rows.slice(1);
  console.log(`Columns:      ${headers.filter(Boolean).join(' | ')}`);
  console.log(`Availability: ${cols.named && colIndex(headers, 'Status') !== -1 ? 'Status column' : 'positional / Availability fallback'}`);

  const outputRows = [
    toCSVRow(['Gene Name', 'Model Abbreviation', 'Model Type', 'Category', 'Availability', 'ITL Catalog #', 'Description']),
  ];

  let processed = 0;
  let skipped = 0;
  let withDescription = 0;

  for (const fields of dataRows) {
    const smocNum = cell(fields, cols.catalog);
    const abbrev = cell(fields, cols.abbrev);
    const status = cell(fields, cols.status);
    const rawCat = cell(fields, cols.category);
    const description = rebrandDescription(cell(fields, cols.description));

    if (!smocNum || !abbrev) { skipped++; continue; }

    if (description) withDescription++;
    outputRows.push(toCSVRow([
      extractGeneName(abbrev),
      abbrev,
      deriveModelType(smocNum),
      cleanCategory(rawCat),
      status,
      renameCatalogNumber(smocNum),
      description,
    ]));
    processed++;
  }

  fs.writeFileSync(OUTPUT_PATH, outputRows.join('\n'), 'utf8');

  console.log(`
Transform complete
──────────────────────────────────────
Input rows:        ${dataRows.length}
Processed:         ${processed}
With description:  ${withDescription}
Skipped:           ${skipped}
Output:            ${OUTPUT_PATH}
`);
}

main();
