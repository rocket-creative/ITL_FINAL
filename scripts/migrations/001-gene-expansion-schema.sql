-- ============================================================
-- Gene × Modification Expansion — Schema
-- Run in Supabase SQL Editor after catalog_models exists
-- ============================================================

-- enums
DO $$ BEGIN
  CREATE TYPE impc_viability AS ENUM ('viable', 'subviable', 'lethal', 'unknown');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE expression_specificity AS ENUM ('restricted', 'broad', 'ubiquitous', 'unknown');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE page_mode AS ENUM ('build_inquiry');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- gene registry + biology
CREATE TABLE IF NOT EXISTS gene (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol                   TEXT NOT NULL UNIQUE,
  mgi_id                   TEXT UNIQUE,
  name                     TEXT,
  synonyms                 TEXT[] DEFAULT '{}',
  human_ortholog_symbol    TEXT,
  human_ortholog_hgnc      TEXT,
  has_human_ortholog       BOOLEAN NOT NULL DEFAULT false,
  impc_viability           impc_viability NOT NULL DEFAULT 'unknown',
  impc_zygosity            TEXT,
  expression_profile       JSONB,
  expression_specificity   expression_specificity NOT NULL DEFAULT 'unknown',
  clinvar_pathogenic_count INTEGER NOT NULL DEFAULT 0,
  omim_ids                 TEXT[] DEFAULT '{}',
  disease_associated       BOOLEAN NOT NULL DEFAULT false,
  existing_allele_count        INTEGER NOT NULL DEFAULT 0,
  existing_conditional_count   INTEGER NOT NULL DEFAULT 0,
  existing_knockout_count      INTEGER NOT NULL DEFAULT 0,
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gene_symbol_idx ON gene (symbol);

-- canonical model types
CREATE TABLE IF NOT EXISTS model_type (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  parent_id    UUID REFERENCES model_type(id),
  is_per_gene  BOOLEAN NOT NULL DEFAULT true,
  synonyms     TEXT[] DEFAULT '{}',
  gate_rule    TEXT NOT NULL
);

-- generated build_inquiry pages
CREATE TABLE IF NOT EXISTS gene_type_page (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gene_id       UUID NOT NULL REFERENCES gene(id) ON DELETE CASCADE,
  model_type_id UUID NOT NULL REFERENCES model_type(id) ON DELETE CASCADE,
  page_mode     page_mode NOT NULL,
  catalog_count INTEGER NOT NULL DEFAULT 0,
  is_indexable  BOOLEAN NOT NULL DEFAULT false,
  canonical_url TEXT NOT NULL,
  generated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (gene_id, model_type_id)
);

CREATE INDEX IF NOT EXISTS gene_type_page_is_indexable_idx ON gene_type_page (is_indexable);
CREATE INDEX IF NOT EXISTS gene_type_page_page_mode_idx ON gene_type_page (page_mode);
CREATE INDEX IF NOT EXISTS gene_type_page_gene_id_idx ON gene_type_page (gene_id);

-- RLS: public read, service role writes
ALTER TABLE gene            ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_type      ENABLE ROW LEVEL SECURITY;
ALTER TABLE gene_type_page  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read gene" ON gene;
CREATE POLICY "public read gene"
  ON gene FOR SELECT USING (true);

DROP POLICY IF EXISTS "public read model_type" ON model_type;
CREATE POLICY "public read model_type"
  ON model_type FOR SELECT USING (true);

DROP POLICY IF EXISTS "public read gene_type_page" ON gene_type_page;
CREATE POLICY "public read gene_type_page"
  ON gene_type_page FOR SELECT USING (true);
