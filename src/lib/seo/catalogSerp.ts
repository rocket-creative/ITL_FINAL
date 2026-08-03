/**
 * Catalog gene SERP title and description builders.
 * Brand suffix is applied only by the root layout title template.
 * Titles target ≤60 chars. Descriptions target 150 to 160 chars.
 */

const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

const SHORT_TYPE: Record<string, string> = {
  Knockout: 'Knockout',
  'Conditional Knockout': 'Conditional KO',
  Knockin: 'Knockin',
  Humanized: 'Humanized',
  Transgenic: 'Transgenic',
  'Xenograft-Applicable': 'Xenograft',
  Immunodeficient: 'Immunodeficient',
  'cDNA Knockin': 'cDNA Knockin',
  'Point Mutation': 'Point Mutation',
};

function trimToMax(text: string, max: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > max * 0.55 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.trim()}…`;
}

function padDescription(text: string): string {
  let out = text.replace(/\s+/g, ' ').trim();
  if (out.length > DESC_MAX) return trimToMax(out, DESC_MAX);
  if (out.length >= DESC_MIN) return out;

  const fillers = [
    ' U.S. QC included.',
    ' Quote in 24 hours.',
    ' Browse catalog or generate.',
    ' Peer reviewed since 1998.',
  ];
  for (const f of fillers) {
    if (out.length >= DESC_MIN) break;
    if (out.length + f.length <= DESC_MAX) out += f;
  }
  if (out.length < DESC_MIN) {
    out = trimToMax(`${out} Contact us for allele design.`, DESC_MAX);
  }
  return out.length > DESC_MAX ? trimToMax(out, DESC_MAX) : out;
}

/** True when the catalog gene symbol looks like a humanized allele (hSOST, hCFH, HLA-A2). */
export function looksHumanizedAllele(geneName: string): boolean {
  const g = geneName.trim();
  if (/^HLA/i.test(g)) return true;
  if (/^h[A-Z0-9][A-Za-z0-9._()-]{1,10}$/.test(g)) return true;
  return false;
}

/**
 * Hub title. Prefer short type list; surface humanized naming when relevant.
 */
export function buildCatalogGeneTitle(
  geneName: string,
  modelTypes: string[],
  options?: { focusType?: string; humanSymbol?: string },
): string {
  if (options?.focusType) {
    return trimToMax(`${geneName} ${options.focusType} mouse models`, TITLE_MAX);
  }

  const types = modelTypes.filter(Boolean);
  const hasHumanized = types.some((t) => /humanized/i.test(t));
  const shortTypes = types.map((t) => SHORT_TYPE[t] || t).slice(0, 3);

  const candidates: string[] = [];

  if (looksHumanizedAllele(geneName) || hasHumanized) {
    candidates.push(`${geneName} humanized mouse models`);
    if (options?.humanSymbol) {
      candidates.push(`${geneName} (${options.humanSymbol}) humanized mice`);
    }
  }

  if (shortTypes.length > 0) {
    const typeStr = shortTypes.join(shortTypes.length === 2 ? ' & ' : ', ');
    candidates.push(`${geneName} ${typeStr} mouse models`);
    candidates.push(`${geneName} ${shortTypes[0]} mouse models`);
  }

  candidates.push(`${geneName} mouse models`);
  candidates.push(`${geneName} models`);

  for (const c of candidates) {
    if (c.length <= TITLE_MAX) return c;
  }
  return trimToMax(`${geneName} mouse models`, TITLE_MAX);
}

/**
 * Hub description from catalog facts (count, types, ready stock).
 */
export function buildCatalogGeneDescription(
  geneName: string,
  modelCount: number,
  modelTypes: string[],
  options?: { hasReady?: boolean; humanSymbol?: string },
): string {
  const types = modelTypes.filter(Boolean);
  const typeStr =
    types.length > 0
      ? types
          .slice(0, 3)
          .map((t) => t.toLowerCase())
          .join(', ')
      : 'knockout, knockin, humanized';

  const ready = options?.hasReady ? ' Ready stock available.' : '';
  const human =
    options?.humanSymbol && options.humanSymbol.toLowerCase() !== geneName.toLowerCase()
      ? ` (${options.humanSymbol})`
      : '';

  const lead =
    modelCount > 0
      ? `${modelCount} ${geneName}${human} catalog mouse model${modelCount === 1 ? '' : 's'} including ${typeStr}.${ready}`
      : `Generate ${geneName}${human} knockout, knockin, and humanized mouse models.`;

  const body = `${lead} Since 1998, 100% germline. Request a quote or order catalog lines.`;
  return padDescription(body);
}

/**
 * Gene × modification title.
 */
export function buildCatalogModTitle(geneName: string, modCanon: string): string {
  const short = SHORT_TYPE[modCanon] || modCanon;
  const candidates = [
    `${geneName} ${short} mouse models`,
    `${geneName} ${short.toLowerCase()} mice`,
    `${geneName} ${short} models`,
  ];
  for (const c of candidates) {
    if (c.length <= TITLE_MAX) return c;
  }
  return trimToMax(`${geneName} ${short} models`, TITLE_MAX);
}

/**
 * Gene × modification description.
 */
export function buildCatalogModDescription(
  geneName: string,
  modCanon: string,
  modelCount?: number,
): string {
  const countBit =
    modelCount && modelCount > 0
      ? `${modelCount} ${geneName} ${modCanon.toLowerCase()} catalog line${modelCount === 1 ? '' : 's'}.`
      : `Browse ${geneName} ${modCanon.toLowerCase()} catalog lines.`;
  return padDescription(
    `${countBit} Catalog numbers, live availability, and quotes in about twenty four hours. Since 1998, 100% germline.`,
  );
}

/**
 * Hand written SERP overrides for measured CTR underperformers and the humanized query cluster.
 * Keyed by gene symbol as it appears in the URL path (decoded).
 */
export const CATALOG_SERP_OVERRIDES: Record<
  string,
  { title: string; description: string }
> = {
  Tmem173: {
    title: 'Tmem173 (STING) knockout mouse models',
    description:
      'Tmem173 (STING) knockout and conditional knockout mice for innate immunity and interferon signaling. Catalog lines ready. Quote in 24 hours.',
  },
  Batf3: {
    title: 'Batf3 knockout mouse models',
    description:
      'Batf3 knockout mice for dendritic cell and CD8 T cell cross presentation studies. Catalog availability and quotes in about twenty four hours.',
  },
  Parp1: {
    title: 'Parp1 knockout mouse models',
    description:
      'Parp1 knockout and conditional knockout mice for DNA repair and PARP inhibitor research. Browse catalog lines or request model generation.',
  },
  Oxct1: {
    title: 'Oxct1 knockout mouse models',
    description:
      'Oxct1 (SCOT) knockout mice for ketone metabolism and cardiac energy studies. Catalog numbers, availability, and quotes in twenty four hours.',
  },
  Tub: {
    title: 'Tub knockout mouse models',
    description:
      'Tub knockout mice for obesity, retinal degeneration, and tubby related phenotypes. Order catalog lines or request a custom allele design.',
  },
  Il17a: {
    title: 'Il17a knockout mouse models',
    description:
      'Il17a knockout and conditional knockout mice for Th17 and inflammatory disease research. Catalog ready. Quote in about twenty four hours.',
  },
  Prrx1: {
    title: 'Prrx1 knockout mouse models',
    description:
      'Prrx1 knockout and Cre driver related alleles for mesenchymal and skeletal lineage studies. Browse catalog or generate a custom model.',
  },
  Nos1: {
    title: 'Nos1 knockout mouse models',
    description:
      'Nos1 (nNOS) knockout mice for nitric oxide signaling in brain and muscle. Catalog lines with quotes in about twenty four hours.',
  },
  Fos: {
    title: 'Fos knockout mouse models',
    description:
      'Fos (c-Fos) knockout mice for immediate early gene and activity dependent transcription studies. Catalog availability and fast quotes.',
  },
  Rag2: {
    title: 'Rag2 knockout mouse models',
    description:
      'Rag2 knockout immunodeficient mice for engraftment and immune reconstitution studies. Live and cryopreserved catalog options available.',
  },
  Cdk9: {
    title: 'Cdk9 knockout mouse models',
    description:
      'Cdk9 conditional knockout mice for transcriptional elongation and CDK9 inhibitor programs. Request catalog details or a custom allele quote.',
  },
  Bin1: {
    title: 'Bin1 knockout mouse models',
    description:
      'Bin1 knockout and conditional knockout mice for membrane curvature and Alzheimer disease related research. Catalog lines and custom generation.',
  },
  Nr4a1: {
    title: 'Nr4a1 knockout mouse models',
    description:
      'Nr4a1 (Nur77) knockout mice for T cell tolerance and myeloid lineage studies. Browse catalog models or request a quote in twenty four hours.',
  },
  Cd19: {
    title: 'Cd19 conditional knockout mouse models',
    description:
      'Cd19 conditional knockout and B cell specific alleles for B lineage targeting. Catalog and tissue specific options with quotes in 24 hours.',
  },
  R26: {
    title: 'R26 knockin reporter mouse models',
    description:
      'Rosa26 (R26) knockin and reporter mouse models for ubiquitous expression and lineage tracing. Catalog lines ready to order or customize.',
  },
  HLA: {
    title: 'HLA humanized mouse models',
    description:
      'HLA humanized mouse models including MHC class I and class II alleles for immunology and transplant research. Catalog and custom options.',
  },
  // Humanized h-prefix cluster (Search Console impressions, near zero clicks)
  hCFH: {
    title: 'hCFH humanized mouse models',
    description:
      'hCFH humanized mice carrying human complement factor H for AMD and complement research. Catalog availability and quotes in twenty four hours.',
  },
  hICOS: {
    title: 'hICOS humanized mouse models',
    description:
      'hICOS humanized mice for T cell costimulation and immuno oncology studies. Browse catalog lines or request custom allele generation.',
  },
  hPLG: {
    title: 'hPLG humanized mouse models',
    description:
      'hPLG humanized mice expressing human plasminogen for fibrinolysis and cardiovascular research. Catalog and custom model options available.',
  },
  hHBB: {
    title: 'hHBB humanized mouse models',
    description:
      'hHBB humanized mice carrying human beta globin for hemoglobinopathy and sickle cell research. Request catalog details or a generation quote.',
  },
  hEPOR: {
    title: 'hEPOR humanized mouse models',
    description:
      'hEPOR humanized mice expressing human erythropoietin receptor for EPO biology and anemia programs. Catalog lines and custom generation.',
  },
  hKHK: {
    title: 'hKHK humanized mouse models',
    description:
      'hKHK humanized mice carrying human ketohexokinase for fructose metabolism and NAFLD research. Quotes in about twenty four hours.',
  },
  hSOST: {
    title: 'hSOST humanized mouse models',
    description:
      'hSOST humanized mice expressing human sclerostin for bone anabolic and osteoporosis antibody programs. Catalog and custom options.',
  },
  hSTING: {
    title: 'hSTING humanized mouse models',
    description:
      'hSTING (hTMEM173) humanized mice for STING agonist and innate immunity pharmacology. Browse catalog or request a custom allele quote.',
  },
  hMET: {
    title: 'hMET humanized mouse models',
    description:
      'hMET humanized mice expressing human MET receptor for oncology and HGF pathway studies. Catalog availability and fast quotes.',
  },
  hNGF: {
    title: 'hNGF humanized mouse models',
    description:
      'hNGF humanized mice carrying human nerve growth factor for pain and neurodegeneration research. Request a quote in twenty four hours.',
  },
  hB2M: {
    title: 'hB2M humanized mouse models',
    description:
      'hB2M humanized mice expressing human beta 2 microglobulin for MHC class I and engraftment studies. Catalog and custom generation.',
  },
  hAGT: {
    title: 'hAGT humanized mouse models',
    description:
      'hAGT humanized mice carrying human angiotensinogen for hypertension and RAAS drug programs. Catalog lines with quotes in 24 hours.',
  },
  hXDH: {
    title: 'hXDH humanized mouse models',
    description:
      'hXDH humanized mice expressing human xanthine dehydrogenase for gout and purine metabolism research. Browse catalog or generate custom.',
  },
  hPLAU: {
    title: 'hPLAU humanized mouse models',
    description:
      'hPLAU humanized mice expressing human urokinase plasminogen activator for fibrinolysis research. Catalog availability and quotes in 24 hours.',
  },
  hIGHE: {
    title: 'hIGHE humanized mouse models',
    description:
      'hIGHE humanized mice carrying human IgE heavy chain for allergy and Fc epsilon receptor programs. Browse catalog or request generation.',
  },
  Gba: {
    title: 'Gba knockout mouse models',
    description:
      'Gba knockout mice for Gaucher disease and glucocerebrosidase deficiency research. Catalog lines with quotes in about twenty four hours.',
  },
  Sidt2: {
    title: 'Sidt2 knockout mouse models',
    description:
      'Sidt2 knockout mice for lysosomal RNA transport and metabolic phenotype studies. Request catalog details or a custom allele quote.',
  },
  Notch3: {
    title: 'Notch3 knockout mouse models',
    description:
      'Notch3 knockout and conditional knockout mice for CADASIL and vascular smooth muscle research. Catalog and custom generation options.',
  },
  Plcb4: {
    title: 'Plcb4 knockout mouse models',
    description:
      'Plcb4 knockout mice for PLC beta 4 signaling and neurological phenotype studies. Catalog availability and quotes in twenty four hours.',
  },
  Cd163: {
    title: 'Cd163 knockout mouse models',
    description:
      'Cd163 knockout mice for scavenger receptor and macrophage biology research. Browse catalog lines or request a generation quote.',
  },
  Hmgb1: {
    title: 'Hmgb1 knockout mouse models',
    description:
      'Hmgb1 conditional knockout mice for damage associated molecular pattern and inflammation studies. Catalog and custom allele options.',
  },
  Chat: {
    title: 'Chat knockout mouse models',
    description:
      'Chat (choline acetyltransferase) knockout mice for cholinergic neuron and autonomic nervous system research. Quotes in 24 hours.',
  },
  Trem2: {
    title: 'Trem2 knockout mouse models',
    description:
      'Trem2 knockout and humanized mice for microglial biology and Alzheimer disease research. Catalog lines ready. Quote in twenty four hours.',
  },
  Il10: {
    title: 'Il10 knockout mouse models',
    description:
      'Il10 knockout mice for anti inflammatory cytokine and IBD related research. Catalog availability and custom model generation quotes.',
  },
  Atf4: {
    title: 'Atf4 knockout mouse models',
    description:
      'Atf4 knockout mice for integrated stress response and metabolic gene regulation studies. Browse catalog or request a custom allele.',
  },
  Pten: {
    title: 'Pten knockout mouse models',
    description:
      'Pten knockout and conditional knockout mice for tumor suppressor and PI3K pathway research. Catalog lines and tissue specific options.',
  },
  Prkdc: {
    title: 'Prkdc knockout mouse models',
    description:
      'Prkdc (DNA-PKcs) knockout and SCID related alleles for DNA repair and immunodeficient host studies. Catalog and custom generation.',
  },
  Sox9: {
    title: 'Sox9 knockout mouse models',
    description:
      'Sox9 conditional knockout mice for chondrogenesis and sex determination research. Catalog availability and quotes in twenty four hours.',
  },
  Egfr: {
    title: 'Egfr knockout mouse models',
    description:
      'Egfr knockout and conditional knockout mice for receptor tyrosine kinase and oncology programs. Browse catalog or generate custom.',
  },
  Vav1: {
    title: 'Vav1 knockout mouse models',
    description:
      'Vav1 knockout mice for T cell signaling and guanine nucleotide exchange factor research. Catalog lines with quotes in 24 hours.',
  },
  Calca: {
    title: 'Calca knockout mouse models',
    description:
      'Calca (CGRP) knockout mice for migraine, pain, and sensory neuron research. Catalog availability and custom allele generation.',
  },
  Myd88: {
    title: 'Myd88 knockout mouse models',
    description:
      'Myd88 knockout mice for Toll like receptor and innate immune signaling studies. Catalog lines ready. Request a quote in 24 hours.',
  },
  Mki67: {
    title: 'Mki67 knockout mouse models',
    description:
      'Mki67 (Ki-67) knockout and reporter related alleles for cell proliferation studies. Browse catalog or request model generation.',
  },
};

/** Case insensitive lookup for SERP overrides. */
export function getCatalogSerpOverride(
  geneName: string,
): { title: string; description: string } | undefined {
  if (CATALOG_SERP_OVERRIDES[geneName]) return CATALOG_SERP_OVERRIDES[geneName];
  const lower = geneName.toLowerCase();
  for (const [key, value] of Object.entries(CATALOG_SERP_OVERRIDES)) {
    if (key.toLowerCase() === lower) return value;
  }
  return undefined;
}
