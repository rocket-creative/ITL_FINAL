/**
 * Canonical Cre driver lines mapped to tissues for search routing (seed list).
 */

export interface CreDriver {
  driver: string;
  aliases: readonly string[];
  tissue: string;
  inducible: boolean;
  inducer?: 'tamoxifen' | 'doxycycline' | 'interferon';
  onset?: string;
  /** Optional narrative for Tier 4 driver pairing (specificity, timing, citations). */
  notes?: string;
}

export const CRE_DRIVERS: readonly CreDriver[] = [
  { driver: 'Albumin-Cre', aliases: ['Alb-Cre', 'AlbCre', 'alb cre', 'albumin cre'], tissue: 'liver', inducible: false, notes: 'Hepatocyte directed Albumin promoter driven Cre. Widely used for liver specific recombination with minimal reported extrahepatic activity in most Cre reporter studies. Pair with floxed alleles for late stage metabolic and oncology experiments.' },
  { driver: 'Alfp-Cre', aliases: ['Alfp Cre'], tissue: 'liver', inducible: false },
  { driver: 'TTR-CreERT2', aliases: ['Ttr CreERT2'], tissue: 'liver', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Villin-Cre', aliases: ['Vil1-Cre', 'vil cre', 'villin cre'], tissue: 'intestine', inducible: false },
  { driver: 'Villin-CreERT2', aliases: [], tissue: 'intestine', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Lgr5-CreERT2', aliases: ['lgr5 cre', 'lgr5 creert2'], tissue: 'stem-cell', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Cdx2-CreERT2', aliases: ['cdx2 cre'], tissue: 'intestine', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Pdx1-Cre', aliases: ['pdx1 cre', 'pd x1 cre'], tissue: 'pancreas', inducible: false },
  { driver: 'Ins1-Cre', aliases: ['rip cre', 'ins1 cre', 'ins 1 cre'], tissue: 'pancreas-beta', inducible: false },
  { driver: 'Ins2-Cre', aliases: ['ins2 cre'], tissue: 'pancreas-beta', inducible: false },
  { driver: 'MIP-CreERT2', aliases: [], tissue: 'pancreas-beta', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Myh6-Cre', aliases: ['αmhc cre', 'amhc cre', 'mhc cre', 'alphamhc cre', 'alphamhc', 'αmhc', 'α mhc cre'], tissue: 'heart', inducible: false },
  { driver: 'Myh6-CreERT2', aliases: [], tissue: 'heart', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Mlc2v-Cre', aliases: [], tissue: 'heart', inducible: false },
  { driver: 'Nestin-Cre', aliases: ['nestin cre', 'nes cre'], tissue: 'neuron', inducible: false },
  { driver: 'CD4-Cre', aliases: ['cd4 cre'], tissue: 't-cell', inducible: false, notes: 'Labels T cell lineages under Cd4 regulatory elements. Useful when temporal control is less critical than broad T lineage specificity. Compare with inducible CD4 variants if you need late onset deletion.' },
  { driver: 'CD8-Cre', aliases: [], tissue: 't-cell', inducible: false },
  { driver: 'CD19-Cre', aliases: ['cd19 cre'], tissue: 'b-cell', inducible: false },
  { driver: 'Mb1-Cre', aliases: ['cd79a cre', 'mb 1 cre'], tissue: 'b-cell', inducible: false },
  { driver: 'LysM-Cre', aliases: ['lyzm cre', 'lysm cre'], tissue: 'myeloid', inducible: false },
  { driver: 'Vav1-Cre', aliases: ['vav cre', 'vav1 cre', 'vav icre'], tissue: 'hematopoietic', inducible: false },
  { driver: 'Mx1-Cre', aliases: ['mx cre'], tissue: 'hematopoietic', inducible: false },
  { driver: 'Tie2-Cre', aliases: ['tek cre', 'tie2 cre'], tissue: 'endothelial', inducible: false },
  { driver: 'VE-Cadherin-Cre', aliases: ['ve cadherin cre', 'cdh5 cre'], tissue: 'endothelial', inducible: false },
  { driver: 'Cdh5-CreERT2', aliases: [], tissue: 'endothelial', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Foxp3-Cre', aliases: ['foxp3 ire cre', 'foxp3 irescre', 'foxp3 cre'], tissue: 'treg', inducible: false },
  { driver: 'Foxp3-CreERT2', aliases: [], tissue: 'treg', inducible: true, inducer: 'tamoxifen' },
  { driver: 'GFAP-Cre', aliases: ['gfap cre'], tissue: 'astrocyte', inducible: false },
  { driver: 'GFAP-CreERT2', aliases: [], tissue: 'astrocyte', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Olig2-Cre', aliases: [], tissue: 'oligodendrocyte', inducible: false },
  { driver: 'CNP-Cre', aliases: ['cnp1 cre', 'cnp cre'], tissue: 'oligodendrocyte', inducible: false },
  { driver: 'K14-Cre', aliases: ['krt14 cre', 'keratinocyte cre'], tissue: 'skin', inducible: false },
  { driver: 'K14-CreERT2', aliases: [], tissue: 'skin', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Pod-Cre', aliases: ['nphs2 cre', 'podocyte cre'], tissue: 'kidney', inducible: false },
  { driver: 'Cx3cr1-Cre', aliases: ['cx3cr1 cre'], tissue: 'microglia', inducible: false },
  { driver: 'CamKIIα-CreERT2', aliases: [], tissue: 'forebrain', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Rosa26-CreERT2', aliases: [], tissue: 'stem-cell', inducible: true, inducer: 'tamoxifen' },
  { driver: 'Dhh-Cre', aliases: [], tissue: 'Schwann-cell', inducible: false },
  { driver: 'MMTV-Cre', aliases: [], tissue: 'mammary', inducible: false },
];

function normalizeMatchKey(s: string): string {
  return s.toLowerCase().replace(/[^\w\s\-]+/gu, '').replace(/\s+/g, ' ').trim();
}

/** Longest-alias-first match passes for Cre driver substring search. */
export function resolveCreDriversInText(cleaned: string): readonly CreDriver[] {
  const n = normalizeMatchKey(cleaned);
  if (!n) return [];
  type Hit = { d: CreDriver; len: number };
  const hits: Hit[] = [];
  const consumed: [number, number][] = []; // naive overlap guard

  const entries: { needle: string; d: CreDriver }[] = [];
  for (const d of CRE_DRIVERS) {
    entries.push({ needle: normalizeMatchKey(d.driver), d });
    for (const a of d.aliases) {
      entries.push({ needle: normalizeMatchKey(a.replace(/\-/g, ' ')), d });
    }
  }
  entries.sort((a, b) => b.needle.length - a.needle.length);

  for (const { needle, d } of entries) {
    if (needle.length < 3 && needle !== 'mhc') continue;
    let idx = 0;
    while (idx !== -1) {
      idx = n.indexOf(needle, idx);
      if (idx === -1) break;
      const end = idx + needle.length;
      const overlaps = consumed.some(([a, b]) => !(end <= a || idx >= b));
      if (!overlaps) {
        consumed.push([idx, end]);
        hits.push({ d, len: needle.length });
        break;
      }
      idx++;
    }
  }

  const seen = new Set<string>();
  const out: CreDriver[] = [];
  hits.sort((a, b) => b.len - a.len);
  for (const { d } of hits) {
    if (!seen.has(d.driver)) {
      seen.add(d.driver);
      out.push(d);
    }
  }
  return out;
}

export function getTopCreDriversForTissue(tissue: string, limit = 3): readonly CreDriver[] {
  const t = tissue.toLowerCase();
  return CRE_DRIVERS.filter((d) => d.tissue === t).slice(0, limit);
}

export function getDisplayLabelForTissueKey(key: string): string {
  const map: Record<string, string> = {
    liver: 'liver',
    intestine: 'intestinal',
    'pancreas-beta': 'pancreatic beta cell',
    pancreas: 'pancreatic',
    heart: 'cardiac',
    neuron: 'neural',
    't-cell': 'T cell',
    'b-cell': 'B cell',
    treg: 'regulatory T cell',
    myeloid: 'myeloid',
    microglia: 'microglial',
    oligodendrocyte: 'oligodendrocyte',
    skin: 'skin',
    kidney: 'kidney',
    endothelial: 'endothelial',
    hematopoietic: 'hematopoietic',
    'stem-cell': 'stem cell',
    astrocyte: 'astrocyte',
    forebrain: 'forebrain',
    mammary: 'mammary',
    'Schwann-cell': 'Schwann cell',
  };
  return map[key] ?? key.replace(/-/g, ' ');
}
