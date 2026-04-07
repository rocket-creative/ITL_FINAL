-- ============================================================
-- ITL Catalog — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Enable trigram extension (fuzzy/partial matching)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Create the catalog table
CREATE TABLE IF NOT EXISTS catalog_models (
  id                  BIGSERIAL PRIMARY KEY,
  gene_name           TEXT NOT NULL DEFAULT '',
  model_abbreviation  TEXT NOT NULL DEFAULT '',
  model_type          TEXT NOT NULL DEFAULT '',
  category            TEXT NOT NULL DEFAULT '',
  availability        TEXT NOT NULL DEFAULT '',
  itl_catalog_number  TEXT NOT NULL DEFAULT '',

  -- Auto-computed full-text search vector
  -- gene_name weighted A (highest), model_abbreviation B, type/category C/D
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce(gene_name, '')),           'A') ||
    setweight(to_tsvector('simple', coalesce(model_abbreviation, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(model_type, '')),         'C') ||
    setweight(to_tsvector('simple', coalesce(category, '')),           'D')
  ) STORED,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Indexes ─────────────────────────────────────────────────

-- Full-text search (GIN on computed tsvector)
CREATE INDEX IF NOT EXISTS catalog_models_search_idx
  ON catalog_models USING GIN(search_vector);

-- Trigram index on gene_name (handles "Flt" → "Flt4", case-insensitive)
CREATE INDEX IF NOT EXISTS catalog_models_gene_trgm
  ON catalog_models USING GIN(gene_name gin_trgm_ops);

-- Trigram index on model_abbreviation
CREATE INDEX IF NOT EXISTS catalog_models_abbrev_trgm
  ON catalog_models USING GIN(model_abbreviation gin_trgm_ops);

-- B-tree index for catalog number lookups and sorting
CREATE INDEX IF NOT EXISTS catalog_models_catalog_num_idx
  ON catalog_models (itl_catalog_number);

-- B-tree index for availability filtering (live vs cryo)
CREATE INDEX IF NOT EXISTS catalog_models_availability_idx
  ON catalog_models (availability);

-- 4. Row Level Security — public read, no write ──────────────
ALTER TABLE catalog_models ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON catalog_models;
CREATE POLICY "Public read access"
  ON catalog_models
  FOR SELECT
  USING (true);

-- 5. Aggregate stats view (for the catalog stats counters) ──
CREATE OR REPLACE VIEW catalog_stats AS
SELECT
  COUNT(*)                                                          AS total_models,
  COUNT(DISTINCT gene_name)                                         AS unique_genes,
  COUNT(DISTINCT model_type)                                        AS model_types,
  COUNT(DISTINCT category)                                          AS categories,
  COUNT(*) FILTER (WHERE availability ILIKE '%live%')               AS live_models,
  COUNT(*) FILTER (WHERE availability ILIKE '%sperm%')              AS sperm_cryo_models,
  COUNT(*) FILTER (WHERE availability ILIKE '%embryo%')             AS embryo_cryo_models
FROM catalog_models;

-- 6. AFTER running this schema, import the CSV:
--    Table Editor → catalog_models → Import data → select itl-catalog-ready.csv
--    Map columns:
--      "Gene Name"          → gene_name
--      "Model Abbreviation" → model_abbreviation
--      "Model Type"         → model_type
--      "Category"           → category
--      "Availability"       → availability
--      "ITL Catalog #"      → itl_catalog_number
