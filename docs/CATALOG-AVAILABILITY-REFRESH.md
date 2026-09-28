# Catalog Availability Refresh

How the "Availability" column on the catalog search comes to be, and how to keep it in sync with SMOC.

## Where the data comes from

The availability value shown on the site (Live, F0 live, Sperm, Embryo, etc.) is the SMOC **Status** column, captured at the time of the last data load. It is a snapshot, not a live feed. The pipeline:

```
SMOC export (CSV or xlsx Total sheet)
   -> scripts/transform-smoc-catalog.js   (Status -> Availability, rebrands catalog numbers, keeps descriptions)
   -> scripts/data/itl-catalog-ready.csv
   -> scripts/upload-catalog-to-supabase.js  (wipes + reloads the table)
   -> Supabase catalog_models
   -> /api/catalog and /api/search read it and the UI renders it
```

Because it is a snapshot, the site drifts from SMOC over time. When the team reports availability that does not match SMOC, the fix is to run the refresh below with a current SMOC export.

The mouse catalog is the workbook's **Total** sheet. Rat models live on a separate tab and are not loaded.

## One-time setup

Add the Supabase service-role key to `.env.local` (the public anon key cannot write because row-level security only grants public read):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Get the service-role key from Supabase: Project Settings -> API -> `service_role` secret. Keep it out of git (`.env.local` is already gitignored).

Before the first upload that includes descriptions, run [scripts/migration-add-description-to-catalog.sql](../scripts/migration-add-description-to-catalog.sql) in the Supabase SQL editor. That file is about 1.6KB. It adds `catalog_models.description` and rebuilds `search_vector` so description text is searchable. Fresh databases can use [scripts/supabase-schema.sql](../scripts/supabase-schema.sql) instead.

Do not paste `scripts/data/itl-catalog-ready.csv` into the SQL editor. That file is about 3.5MB, and the editor refuses queries over about 1MB with "Query is too large to be run via the SQL Editor". The CSV is loaded by `npm run catalog:upload`, which inserts a few hundred rows at a time.

## Refresh steps

1. Save the current SMOC workbook (`.xlsx`) or export the Total sheet to CSV. Note the export date so you can confirm it later.

2. Run the refresh, pointing at the file:

   ```bash
   SMOC_CSV="/absolute/path/to/Total_Mice_List.xlsx" npm run catalog:refresh
   ```

   Or run the two steps separately:

   ```bash
   node scripts/transform-smoc-catalog.js "/absolute/path/to/Total_Mice_List.xlsx"
   npm run catalog:upload
   ```

   The transform prints the SMOC export path and the detected export date so you can confirm you loaded the right file.

3. The upload wipes `catalog_models` and re-inserts every row. When it finishes it reports the number of rows inserted.

4. Deploy the app changes that read `description` (or, if that code is already deployed, the new rows are live immediately because the API reads Supabase directly). Spot-check a few models in the site search against SMOC.

## What the transform keeps

Columns are matched by header name.

| SMOC column | Site field |
| --- | --- |
| Catalog Number | ITL Catalog # (`NM-KI-253470` becomes `KI 253470`) |
| Model Abbreviation | Model Abbreviation, and the gene name taken from the first hyphen segment |
| Status | Availability (Live, Sperm Cryopreserved, Embryo Cryopreserved, In Development, …) |
| Category | Category |
| Model Description | Description |

The SMOC **Availability** column (only `Available` or blank) is ignored. Using it as the site availability value would collapse the Live / sperm / embryo filters.

Descriptions are rewritten before they are stored: embedded catalog numbers such as `NM-HU-241765` become `HU 241765`, and the supplier name is replaced with iTL. Gene names that contain those letters (for example Smoc1) are left alone.

## Recommended cadence

Refresh whenever SMOC availability changes materially, and on a fixed cadence (for example monthly, or at the start of each quarter) so the site never drifts far. Always record which SMOC export date was loaded.

## Notes

- Input resolution order for the transform: first CLI argument, then the `SMOC_CSV` environment variable, then the legacy default `~/Downloads/total and humanized 2026.1.16.xlsx - Total.csv`.
- `.xlsx` input reads the Total sheet only. CSV input is also accepted.
- Output is always `scripts/data/itl-catalog-ready.csv`.
- Blank rows (no catalog number) are skipped.
- Latest prepared export: Total sheet of `Total_Mice_List_8.12.2026_EN_Descriptions.xlsx` (2026-08-12), mice only. Run the description migration, then `npm run catalog:upload`, to publish that snapshot.
