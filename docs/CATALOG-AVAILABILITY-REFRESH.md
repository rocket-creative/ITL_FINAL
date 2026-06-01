# Catalog Availability Refresh

How the "Availability" column on the catalog search comes to be, and how to keep it in sync with SMOC.

## Where the data comes from

The availability value shown on the site (Live, F0 live, Sperm, Embryo, etc.) is the SMOC **Status** column, captured at the time of the last data load. It is a snapshot, not a live feed. The pipeline:

```
SMOC export (CSV)
   -> scripts/transform-smoc-catalog.js   (Status -> Availability, rebrands catalog numbers)
   -> scripts/data/itl-catalog-ready.csv
   -> scripts/upload-catalog-to-supabase.js  (wipes + reloads the table)
   -> Supabase catalog_models.availability
   -> /api/catalog and /api/search read it and the UI renders it
```

Because it is a snapshot, the site drifts from SMOC over time. When the team reports availability that does not match SMOC, the fix is to run the refresh below with a current SMOC export.

## One-time setup

Add the Supabase service-role key to `.env.local` (the public anon key cannot write because row-level security only grants public read):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Get the service-role key from Supabase: Project Settings -> API -> `service_role` secret. Keep it out of git (`.env.local` is already gitignored).

## Refresh steps

1. Export the current SMOC catalog sheet to CSV (in Google Sheets / Excel: File -> Download -> Comma-separated values). Note the export date so you can confirm it later.

2. Run the refresh, pointing at the exported file:

   ```bash
   SMOC_CSV="/absolute/path/to/SMOC export.csv" npm run catalog:refresh
   ```

   Or run the two steps separately:

   ```bash
   node scripts/transform-smoc-catalog.js "/absolute/path/to/SMOC export.csv"
   npm run catalog:upload
   ```

   The transform prints the SMOC export path and the detected export date so you can confirm you loaded the right file.

3. The upload wipes `catalog_models` and re-inserts every row. When it finishes it reports the number of rows inserted.

4. Deploy (or, if already deployed, the change is live immediately since the API reads Supabase directly). Spot-check a few models in the site search against SMOC.

## Recommended cadence

Refresh whenever SMOC availability changes materially, and on a fixed cadence (for example monthly, or at the start of each quarter) so the site never drifts far. Always record which SMOC export date was loaded.

## Notes

- Input resolution order for the transform: first CLI argument, then the `SMOC_CSV` environment variable, then the legacy default `~/Downloads/total and humanized 2026.1.16.xlsx - Total.csv`.
- Output is always `scripts/data/itl-catalog-ready.csv`.
- The SMOC column order the transform expects: `[0] Catalog Number  [1] Model Abbreviation  [2] Status  [3] Category  [4] Verification`. If SMOC changes its export layout, update the field indexes in `scripts/transform-smoc-catalog.js`.
