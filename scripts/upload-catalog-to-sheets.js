/**
 * Upload ITL Catalog to Google Sheets
 *
 * Uses the existing service account to clear and repopulate the
 * ITL-Cat-24-25 tab with the transformed catalog data.
 *
 * Usage:
 *   node scripts/upload-catalog-to-sheets.js
 *
 * Requirements:
 *   - scripts/data/itl-catalog-ready.csv must exist (run transform-smoc-catalog.js first)
 *   - scripts/google-service-account.json must be present
 *   - The service account email must have Editor access to the spreadsheet
 */

const fs   = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.CATALOG_SPREADSHEET_ID ?? '1DG54nHKf-A-7Ii8nSHvps74nCXbmNsPk51uL15JzuRU';
const SHEET_TAB      = process.env.CATALOG_SHEET_NAME     ?? 'ITL-Cat-24-25';
const BATCH_SIZE     = 500; // rows per API write call (stay well under 10MB limit)

const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'google-service-account.json');
const CSV_PATH             = path.join(__dirname, 'data', 'itl-catalog-ready.csv');

// ─── CSV → 2D array ──────────────────────────────────────────────────────────
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
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function csvTo2DArray(csvText) {
  return csvText
    .split('\n')
    .filter(l => l.trim().length > 0)
    .map(parseCSVLine);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Validate files
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`ERROR: Service account not found at:\n  ${SERVICE_ACCOUNT_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`ERROR: CSV not found. Run first:\n  node scripts/transform-smoc-catalog.js`);
    process.exit(1);
  }

  // Auth
  const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  // Parse CSV
  console.log('Reading CSV...');
  const rows = csvTo2DArray(fs.readFileSync(CSV_PATH, 'utf8'));
  console.log(`  ${rows.length} rows (including header)`);

  // ── Step 1: Get the sheet ID (needed for clearValues) ──────────────────────
  console.log('\nFetching spreadsheet info...');
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const sheetMeta = meta.data.sheets?.find(s => s.properties?.title === SHEET_TAB);
  if (!sheetMeta) {
    console.error(`ERROR: Tab "${SHEET_TAB}" not found in the spreadsheet.`);
    console.error('Available tabs:', meta.data.sheets?.map(s => s.properties?.title).join(', '));
    process.exit(1);
  }
  console.log(`  Found tab: ${SHEET_TAB}`);

  // ── Step 2: Clear existing data ────────────────────────────────────────────
  console.log('\nClearing existing sheet data...');
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SPREADSHEET_ID,
    range:         `${SHEET_TAB}!A:Z`,
  });
  console.log('  Cleared.');

  // ── Step 3: Write in batches ───────────────────────────────────────────────
  const chunks = chunkArray(rows, BATCH_SIZE);
  console.log(`\nUploading ${rows.length} rows in ${chunks.length} batches of ${BATCH_SIZE}...`);

  let rowsWritten = 0;
  for (let i = 0; i < chunks.length; i++) {
    const startRow = rowsWritten + 1;
    const range    = `${SHEET_TAB}!A${startRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId:     SPREADSHEET_ID,
      range,
      valueInputOption:  'RAW',
      requestBody:       { values: chunks[i] },
    });

    rowsWritten += chunks[i].length;
    process.stdout.write(`\r  Batch ${i + 1}/${chunks.length} — ${rowsWritten} rows written`);

    // Polite pause between batches to avoid rate limits
    if (i < chunks.length - 1) await sleep(300);
  }

  console.log('\n\nUpload complete!');
  console.log('─────────────────────────────────────');
  console.log(`Rows written:   ${rowsWritten}`);
  console.log(`Spreadsheet:    https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
  console.log(`Tab:            ${SHEET_TAB}`);
  console.log('\nDeploy to Vercel to see the new catalog live.');
}

main().catch(err => {
  // Surface helpful message for the most common error
  if (err.code === 403) {
    console.error(`\nPERMISSION DENIED (403)\n`);
    console.error(`The service account needs Editor access to this spreadsheet.`);
    console.error(`\nFix:`);
    console.error(`  1. Open the spreadsheet in Google Sheets`);
    console.error(`  2. Share → Add: genetargeting@symbolic-button-487316-a3.iam.gserviceaccount.com`);
    console.error(`  3. Role: Editor`);
    console.error(`  4. Re-run this script\n`);
  } else {
    console.error('\nERROR:', err.message);
  }
  process.exit(1);
});
