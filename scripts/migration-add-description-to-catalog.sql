-- ============================================================
-- Migration: add description to catalog_models and search_vector
-- Run in: Supabase Dashboard -> SQL Editor -> New query
-- Paste this file only. Do not paste scripts/data/itl-catalog-ready.csv here
-- (the editor rejects queries over about 1MB). Load the CSV with:
--   npm run catalog:upload
--
-- search_vector is a GENERATED ALWAYS ... STORED column, so dropping and
-- re-adding it recomputes the value for every existing row automatically.
-- Re-upload the catalog after this so description values are populated.
-- ============================================================

-- 1. Store the SMOC model description (supplier catalog numbers already rewritten).
ALTER TABLE catalog_models
  ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';

-- 2. Drop the existing generated column (the GIN index on it is dropped with it).
ALTER TABLE catalog_models DROP COLUMN IF EXISTS search_vector;

-- 3. Re-add it, now including the description (weight D, below gene name).
ALTER TABLE catalog_models
  ADD COLUMN search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce(gene_name, '')),           'A') ||
    setweight(to_tsvector('simple', coalesce(model_abbreviation, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(itl_catalog_number, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(model_type, '')),         'C') ||
    setweight(to_tsvector('simple', coalesce(category, '')),           'D') ||
    setweight(to_tsvector('simple', coalesce(description, '')),        'D')
  ) STORED;

-- 4. Recreate the GIN index used for full-text search.
CREATE INDEX IF NOT EXISTS catalog_models_search_idx
  ON catalog_models USING GIN(search_vector);
