-- ============================================================
-- Migration: add itl_catalog_number to catalog_models.search_vector
-- Run in: Supabase Dashboard -> SQL Editor -> New query
--
-- search_vector is a GENERATED ALWAYS ... STORED column, so dropping and
-- re-adding it recomputes the value for every existing row automatically.
-- No CSV re-upload is required for this change.
-- ============================================================

-- 1. Drop the existing generated column (the GIN index on it is dropped with it).
ALTER TABLE catalog_models DROP COLUMN IF EXISTS search_vector;

-- 2. Re-add it, now including the catalog number (weight C).
ALTER TABLE catalog_models
  ADD COLUMN search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce(gene_name, '')),           'A') ||
    setweight(to_tsvector('simple', coalesce(model_abbreviation, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(itl_catalog_number, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(model_type, '')),         'C') ||
    setweight(to_tsvector('simple', coalesce(category, '')),           'D')
  ) STORED;

-- 3. Recreate the GIN index used for full-text search.
CREATE INDEX IF NOT EXISTS catalog_models_search_idx
  ON catalog_models USING GIN(search_vector);
