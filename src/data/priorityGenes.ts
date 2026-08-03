/**
 * Priority gene registry for model-generation hubs.
 * Morphogen Tier A genes receive the first deep hub pass; commercial cohorts are Tier A.
 * Deduped by humanSymbol (case-insensitive), morphogen first.
 */

export type PriorityTier = 'A' | 'B';

export type GeneCohort =
  | 'morphogen'
  | 'signaling'
  | 'immune'
  | 'cancer'
  | 'neuroscience'
  | 'metabolism';

export type MorphogenFamily =
  | 'hedgehog'
  | 'wnt'
  | 'bmp-gdf'
  | 'tgfb-activin-nodal'
  | 'fgf'
  | 'retinoic'
  | 'notch-ligand'
  | 'modulator';

export type PriorityGene = {
  humanSymbol: string;
  mouseSymbol: string;
  aliases: string[];
  family?: MorphogenFamily; // only for morphogen
  cohort: GeneCohort;
  tier: PriorityTier;
};

export interface PiTaxonomyChild {
  id: string;
  label: string;
  canonicalModSlug?: string;
  siteHref?: string;
  quoteNote?: string;
}

export interface PiTaxonomyGroup {
  id: string;
  label: string;
  children: PiTaxonomyChild[];
}

const TIER_A_HUMAN_SYMBOLS = new Set<string>([
  // Hedgehog (3)
  'SHH', 'IHH', 'DHH',
  // Wnt (14)
  'WNT1', 'WNT3A', 'WNT4', 'WNT5A', 'WNT7A', 'WNT7B', 'WNT9B', 'WNT10B', 'WNT11',
  'WNT2', 'WNT2B', 'WNT6', 'WNT8A', 'WNT16',
  // BMP/GDF (16)
  'BMP2', 'BMP4', 'BMP7', 'BMP6', 'BMP1', 'BMP5', 'BMP8A',
  'GDF5', 'GDF9', 'GDF11', 'GDF15', 'GDF2', 'GDF1', 'GDF3', 'AMH', 'BMP15',
  // TGF-beta/Activin/Nodal (9)
  'TGFB1', 'TGFB2', 'TGFB3', 'INHBA', 'INHBB', 'NODAL', 'LEFTY1', 'LEFTY2', 'INHA',
  // FGF (14)
  'FGF1', 'FGF2', 'FGF8', 'FGF9', 'FGF10', 'FGF3', 'FGF4', 'FGF7',
  'FGF18', 'FGF21', 'FGF23', 'FGF5', 'FGF19', 'FGF20',
  // Retinoic (5)
  'ALDH1A2', 'ALDH1A1', 'CYP26A1', 'CYP26B1', 'RARA',
  // Notch ligands (2)
  'DLL1', 'JAG1',
  // Modulators (2)
  'NOG', 'GREM1',
]);

/** Known human→mouse symbols that differ from simple title-case mapping. */
const HUMAN_TO_MOUSE_OVERRIDES: Record<string, string> = {
  TP53: 'Trp53',
  TNF: 'Tnf',
  APOE: 'Apoe',
};

/** MGI-style mouse symbol: first letter upper, remainder lower (Wnt3a, Fgf10, Aldh1a2). */
export function humanToMouseSymbol(humanSymbol: string): string {
  const override = HUMAN_TO_MOUSE_OVERRIDES[humanSymbol.toUpperCase()];
  if (override) return override;
  return humanSymbol.charAt(0).toUpperCase() + humanSymbol.slice(1).toLowerCase();
}

const GENE_ALIASES: Partial<Record<string, string[]>> = {
  GDF2: ['BMP9'],
  ALDH1A2: ['RALDH2'],
};

function defineGene(
  humanSymbol: string,
  family: MorphogenFamily,
  aliases: string[] = GENE_ALIASES[humanSymbol] ?? [],
): PriorityGene {
  return {
    humanSymbol,
    mouseSymbol: humanToMouseSymbol(humanSymbol),
    aliases,
    family,
    cohort: 'morphogen',
    tier: TIER_A_HUMAN_SYMBOLS.has(humanSymbol) ? 'A' : 'B',
  };
}

function defineCohortGene(
  humanSymbol: string,
  cohort: Exclude<GeneCohort, 'morphogen'>,
  aliases: string[] = [],
  tier: PriorityTier = 'A',
): PriorityGene {
  return {
    humanSymbol,
    mouseSymbol: humanToMouseSymbol(humanSymbol),
    aliases,
    cohort,
    tier,
  };
}

const HEDGEHOG_GENES = ['SHH', 'IHH', 'DHH'] as const;

const WNT_GENES = [
  'WNT1', 'WNT2', 'WNT2B', 'WNT3', 'WNT3A', 'WNT4', 'WNT5A', 'WNT5B', 'WNT6',
  'WNT7A', 'WNT7B', 'WNT8A', 'WNT8B', 'WNT9A', 'WNT9B', 'WNT10A', 'WNT10B', 'WNT11', 'WNT16',
] as const;

const BMP_GDF_GENES = [
  'BMP1', 'BMP2', 'BMP3', 'BMP4', 'BMP5', 'BMP6', 'BMP7', 'BMP8A', 'BMP8B', 'BMP10', 'BMP15',
  'GDF1', 'GDF2', 'GDF3', 'GDF5', 'GDF6', 'GDF7', 'GDF9', 'GDF10', 'GDF11', 'GDF15', 'AMH',
] as const;

const TGFB_ACTIVIN_NODAL_GENES = [
  'TGFB1', 'TGFB2', 'TGFB3', 'INHBA', 'INHBB', 'INHBC', 'INHBE', 'INHA', 'NODAL', 'LEFTY1', 'LEFTY2',
] as const;

const FGF_GENES = [
  'FGF1', 'FGF2', 'FGF3', 'FGF4', 'FGF5', 'FGF6', 'FGF7', 'FGF8', 'FGF9', 'FGF10',
  'FGF11', 'FGF12', 'FGF13', 'FGF14', 'FGF16', 'FGF17', 'FGF18', 'FGF19', 'FGF20',
  'FGF21', 'FGF22', 'FGF23',
] as const;

const RETINOIC_GENES = [
  'ALDH1A1', 'ALDH1A2', 'ALDH1A3', 'CYP26A1', 'CYP26B1', 'CYP26C1', 'RARA', 'RXRA',
] as const;

const NOTCH_LIGAND_GENES = ['DLL1', 'DLL3', 'DLL4', 'JAG1', 'JAG2'] as const;

const MODULATOR_GENES = ['CHRD', 'NOG', 'GREM1', 'GREM2', 'SOST', 'FST', 'CER1', 'DAND5'] as const;

const MORPHOGEN_GENES: PriorityGene[] = [
  ...HEDGEHOG_GENES.map((symbol) => defineGene(symbol, 'hedgehog')),
  ...WNT_GENES.map((symbol) => defineGene(symbol, 'wnt')),
  ...BMP_GDF_GENES.map((symbol) => defineGene(symbol, 'bmp-gdf')),
  ...TGFB_ACTIVIN_NODAL_GENES.map((symbol) => defineGene(symbol, 'tgfb-activin-nodal')),
  ...FGF_GENES.map((symbol) => defineGene(symbol, 'fgf')),
  ...RETINOIC_GENES.map((symbol) => defineGene(symbol, 'retinoic')),
  ...NOTCH_LIGAND_GENES.map((symbol) => defineGene(symbol, 'notch-ligand')),
  ...MODULATOR_GENES.map((symbol) => defineGene(symbol, 'modulator')),
];

const SIGNALING_GENE_SPECS: ReadonlyArray<{ human: string; aliases?: readonly string[] }> = [
  { human: "TP53" },
  { human: "TNF" },
  { human: "EGFR" },
  { human: "VEGFA" },
  { human: "APOE" },
  { human: "IL6" },
  { human: "TGFB1" },
  { human: "MTHFR" },
  { human: "ESR1" },
  { human: "AKT1" },
  { human: "KRAS" },
  { human: "BRAF" },
  { human: "NRAS" },
  { human: "HRAS" },
  { human: "MYC" },
  { human: "MYCN" },
  { human: "MYCL" },
  { human: "PIK3CA" },
  { human: "PIK3CB" },
  { human: "PIK3CD" },
  { human: "PIK3R1" },
  { human: "PTEN" },
  { human: "MTOR" },
  { human: "AKT2" },
  { human: "AKT3" },
  { human: "PDK1" },
  { human: "RPS6KB1" },
  { human: "RPS6KB2" },
  { human: "EIF4EBP1" },
  { human: "CCND1" },
  { human: "CCNE1" },
  { human: "CDK4" },
  { human: "CDK6" },
  { human: "CDK2" },
  { human: "CDKN2A" },
  { human: "CDKN2B" },
  { human: "RB1" },
  { human: "E2F1" },
  { human: "E2F2" },
  { human: "E2F3" },
  { human: "ATM" },
  { human: "ATR" },
  { human: "CHEK1" },
  { human: "CHEK2" },
  { human: "BRCA1" },
  { human: "BRCA2" },
  { human: "PALB2" },
  { human: "RAD51" },
  { human: "RAD52" },
  { human: "FANCA" },
  { human: "FANCD2" },
  { human: "MLH1" },
  { human: "MSH2" },
  { human: "MSH6" },
  { human: "PMS2" },
  { human: "APC" },
  { human: "CTNNB1", aliases: ["beta catenin"] },
  { human: "AXIN1" },
  { human: "AXIN2" },
  { human: "GSK3B" },
  { human: "MAPK1" },
  { human: "MAPK3" },
  { human: "MAPK8" },
  { human: "MAPK14" },
  { human: "MAP2K1" },
  { human: "MAP2K2" },
  { human: "RAF1" },
  { human: "SOS1" },
  { human: "GRB2" },
  { human: "SHC1" },
  { human: "SRC" },
  { human: "YES1" },
  { human: "FYN" },
  { human: "LCK" },
  { human: "JAK1" },
  { human: "JAK2" },
  { human: "JAK3" },
  { human: "TYK2" },
  { human: "STAT1" },
  { human: "STAT3" },
  { human: "STAT5A" },
  { human: "STAT5B" },
  { human: "NFKB1" },
  { human: "NFKB2" },
  { human: "RELA" },
  { human: "RELB" },
  { human: "IKBKB" },
  { human: "IKBKG" },
  { human: "HIF1A" },
  { human: "EPAS1" },
  { human: "ARNT" },
  { human: "PPARG" },
  { human: "PPARGC1A" },
  { human: "SREBF1" },
  { human: "SREBF2" },
  { human: "LDLR" },
  { human: "PCSK9" },
  { human: "INS" },
  { human: "INSR" },
  { human: "GCK" },
  { human: "G6PC" },
  { human: "PCK1" },
  { human: "FOXO1" },
  { human: "FOXO3" },
  { human: "SIRT1" },
  { human: "PRKAA1", aliases: ["AMPK"] },
  { human: "PRKAA2" },
  { human: "PRKAB1" },
  { human: "PRKAB2" },
  { human: "PRKAG1" },
  { human: "PRKAG2" },
  { human: "TSC1" },
  { human: "TSC2" },
  { human: "RHEB" },
  { human: "RICTOR" },
  { human: "RPTOR" },
  { human: "MLST8" },
  { human: "DEPTOR" },
  { human: "PRR5" },
  { human: "WNT1" },
  { human: "WNT3A" },
  { human: "FZD1" },
  { human: "FZD2" },
  { human: "FZD7" },
  { human: "LRP5" },
  { human: "LRP6" },
  { human: "DKK1" },
  { human: "NOTCH1" },
  { human: "NOTCH2" },
  { human: "NOTCH3" },
  { human: "NOTCH4" },
  { human: "JAG1" },
  { human: "JAG2" },
  { human: "DLL1" },
  { human: "DLL3" },
  { human: "DLL4" },
  { human: "HES1" },
  { human: "HEY1" },
  { human: "SHH" },
  { human: "PTCH1" },
  { human: "PTCH2" },
  { human: "SMO" },
  { human: "GLI1" },
  { human: "GLI2" },
  { human: "GLI3" },
  { human: "BMP2" },
  { human: "BMP4" },
  { human: "BMP7" },
  { human: "ACVR1" },
  { human: "ACVR2A" },
  { human: "ACVR2B" },
  { human: "SMAD1" },
  { human: "SMAD2" },
  { human: "SMAD3" },
  { human: "SMAD4" },
  { human: "SMAD5" },
  { human: "SMAD9" },
  { human: "TGFB2" },
  { human: "TGFB3" },
  { human: "TGFBR1" },
  { human: "TGFBR2" },
  { human: "FGF1" },
  { human: "FGF2" },
  { human: "FGF4" },
  { human: "FGF8" },
  { human: "FGFR1" },
  { human: "FGFR2" },
  { human: "FGFR3" },
  { human: "FGFR4" },
  { human: "EGF" },
  { human: "ERBB2" },
  { human: "ERBB3" },
  { human: "ERBB4" },
  { human: "NRG1" },
  { human: "NRG2" },
  { human: "NRG3" },
];

const IMMUNE_GENE_SPECS: ReadonlyArray<{ human: string; aliases?: readonly string[] }> = [
  { human: "TLR1" },
  { human: "TLR2" },
  { human: "TLR3" },
  { human: "TLR4" },
  { human: "TLR5" },
  { human: "TLR6" },
  { human: "TLR7" },
  { human: "TLR8" },
  { human: "TLR9" },
  { human: "TLR10" },
  { human: "MYD88" },
  { human: "TICAM1" },
  { human: "IRAK1" },
  { human: "IRAK4" },
  { human: "TRAF6" },
  { human: "TAB1" },
  { human: "TAB2" },
  { human: "TAB3" },
  { human: "NFKBIA" },
  { human: "NFKBIB" },
  { human: "IKBKE" },
  { human: "TBK1" },
  { human: "IRF3" },
  { human: "IRF5" },
  { human: "IRF7" },
  { human: "IFNA1" },
  { human: "IFNB1" },
  { human: "IFNG" },
  { human: "IL1A" },
  { human: "IL1B" },
  { human: "IL1RN" },
  { human: "IL2" },
  { human: "IL4" },
  { human: "IL5" },
  { human: "IL10" },
  { human: "IL12A" },
  { human: "IL12B" },
  { human: "IL13" },
  { human: "IL17A" },
  { human: "IL17F" },
  { human: "IL18" },
  { human: "IL22" },
  { human: "IL23A" },
  { human: "IL27" },
  { human: "TNFRSF1A" },
  { human: "TNFRSF1B" },
  { human: "FAS" },
  { human: "FASLG" },
  { human: "CASP1" },
  { human: "CASP3" },
  { human: "CASP8" },
  { human: "CASP9" },
  { human: "BCL2" },
  { human: "BCL2L1" },
  { human: "BAX" },
  { human: "BAK1" },
  { human: "BID" },
  { human: "PMAIP1" },
  { human: "BBC3" },
  { human: "XIAP" },
  { human: "CFLAR" },
  { human: "TRADD" },
  { human: "TRAF2" },
  { human: "TRAF3" },
  { human: "TRAF5" },
  { human: "RIPK1" },
  { human: "RIPK3" },
  { human: "MLKL" },
  { human: "GSDMD" },
  { human: "NLRP3" },
  { human: "NLRP1" },
  { human: "AIM2" },
  { human: "PYCARD" },
  { human: "CSTB" },
  { human: "CTSB" },
  { human: "CTSG" },
  { human: "ELANE" },
  { human: "MPO" },
  { human: "S100A8" },
  { human: "S100A9" },
  { human: "S100A12" },
  { human: "CD14" },
  { human: "CD163" },
  { human: "MRC1", aliases: ["CD206"] },
  { human: "CD80" },
  { human: "CD86" },
  { human: "CD28" },
  { human: "CTLA4" },
  { human: "PDCD1", aliases: ["PD-1", "PD1"] },
  { human: "CD274", aliases: ["PD-L1", "PDL1"] },
  { human: "PDCD1LG2", aliases: ["PD-L2", "PDL2"] },
  { human: "LAG3" },
  { human: "TIGIT" },
  { human: "HAVCR2", aliases: ["TIM-3", "TIM3"] },
  { human: "SIRPA" },
  { human: "FCGR1A" },
  { human: "FCGR2A" },
  { human: "FCGR3A" },
  { human: "FCGR3B" },
  { human: "FCER1A" },
  { human: "FCER1G" },
  { human: "C1QA" },
  { human: "C1QB" },
  { human: "C1QC" },
  { human: "C3" },
  { human: "C4A" },
  { human: "C4B" },
  { human: "C5" },
  { human: "C5AR1" },
  { human: "C3AR1" },
  { human: "CFH" },
  { human: "CFI" },
  { human: "CFB" },
  { human: "CFD" },
  { human: "CFHR1" },
  { human: "CFHR3" },
  { human: "SERPING1" },
  { human: "PROC" },
  { human: "PROS1" },
  { human: "F2" },
  { human: "F5" },
  { human: "F7" },
  { human: "F9" },
  { human: "F10" },
  { human: "F11" },
  { human: "F12" },
  { human: "F13A1" },
  { human: "F13B" },
  { human: "SERPINC1" },
  { human: "SERPIND1" },
  { human: "SERPINE1" },
  { human: "SERPINF1" },
  { human: "SERPINF2" },
  { human: "PLG" },
  { human: "PLAT" },
  { human: "PLAU" },
  { human: "MMP1" },
  { human: "MMP2" },
  { human: "MMP3" },
  { human: "MMP7" },
  { human: "MMP9" },
  { human: "MMP12" },
  { human: "MMP13" },
  { human: "MMP14" },
  { human: "TIMP1" },
  { human: "TIMP2" },
  { human: "TIMP3" },
  { human: "TIMP4" },
];

const CANCER_GENE_SPECS: ReadonlyArray<{ human: string; aliases?: readonly string[] }> = [
  { human: "TP53" },
  { human: "RB1" },
  { human: "CDKN2A" },
  { human: "CDKN2B" },
  { human: "PTEN" },
  { human: "APC" },
  { human: "SMAD4" },
  { human: "STK11", aliases: ["LKB1"] },
  { human: "NF1" },
  { human: "NF2" },
  { human: "VHL" },
  { human: "MEN1" },
  { human: "RET" },
  { human: "MET" },
  { human: "KIT" },
  { human: "PDGFRA" },
  { human: "PDGFRB" },
  { human: "ALK" },
  { human: "ROS1" },
  { human: "NTRK1" },
  { human: "NTRK2" },
  { human: "NTRK3" },
  { human: "BRAF" },
  { human: "KRAS" },
  { human: "NRAS" },
  { human: "HRAS" },
  { human: "EGFR" },
  { human: "ERBB2" },
  { human: "ERBB3" },
  { human: "ERBB4" },
  { human: "PIK3CA" },
  { human: "PIK3R1" },
  { human: "MTOR" },
  { human: "AKT1" },
  { human: "AKT2" },
  { human: "CCND1" },
  { human: "CCNE1" },
  { human: "MYC" },
  { human: "MYCN" },
  { human: "MYCL" },
  { human: "BCL2" },
  { human: "BCL6" },
  { human: "MLLT3", aliases: ["AF9"] },
  { human: "KMT2A", aliases: ["MLL"] },
  { human: "RUNX1" },
  { human: "RUNX1T1", aliases: ["ETO"] },
  { human: "CBFB" },
  { human: "PML" },
  { human: "RARA" },
  { human: "ZBTB16", aliases: ["PLZF"] },
  { human: "NPM1" },
  { human: "FLT3" },
  { human: "IDH1" },
  { human: "IDH2" },
  { human: "TET2" },
  { human: "DNMT3A" },
  { human: "ASXL1" },
  { human: "EZH2" },
  { human: "SETD2" },
  { human: "ARID1A" },
  { human: "SMARCA4" },
  { human: "SMARCB1" },
  { human: "CHD4" },
  { human: "KDM6A", aliases: ["UTX"] },
  { human: "KMT2C" },
  { human: "KMT2D" },
  { human: "CREBBP" },
  { human: "EP300" },
  { human: "MED12" },
  { human: "SF3B1" },
  { human: "SRSF2" },
  { human: "U2AF1" },
  { human: "ZRSR2" },
  { human: "DNMT1" },
  { human: "DNMT3B" },
  { human: "TERT" },
  { human: "ATRX" },
  { human: "DAXX" },
  { human: "H3F3A" },
  { human: "H3F3B" },
  { human: "HIST1H3B" },
  { human: "HIST1H3C" },
  { human: "HIST1H3D" },
  { human: "HIST1H3E" },
  { human: "HIST1H3F" },
  { human: "HIST1H3G" },
  { human: "HIST1H3H" },
  { human: "HIST1H3I" },
  { human: "HIST1H3J" },
  { human: "HIST1H3K" },
  { human: "HIST1H3L" },
  { human: "HIST1H3M" },
  { human: "HIST1H3N" },
  { human: "HIST1H3O" },
  { human: "HIST1H3P" },
  { human: "HIST1H4A" },
  { human: "HIST1H4B" },
  { human: "HIST1H4C" },
  { human: "HIST1H4D" },
  { human: "HIST1H4E" },
  { human: "HIST1H4F" },
  { human: "HIST1H4G" },
  { human: "HIST1H4H" },
  { human: "HIST1H4I" },
  { human: "HIST1H4J" },
  { human: "HIST1H4K" },
  { human: "HIST1H4L" },
  { human: "HIST1H4M" },
  { human: "HIST1H4N" },
  { human: "HIST1H4O" },
  { human: "HIST1H4P" },
];

const NEUROSCIENCE_GENE_SPECS: ReadonlyArray<{ human: string; aliases?: readonly string[] }> = [
  { human: "APP" },
  { human: "PSEN1" },
  { human: "PSEN2" },
  { human: "MAPT" },
  { human: "SNCA" },
  { human: "LRRK2" },
  { human: "PRKN", aliases: ["PARK2"] },
  { human: "PINK1" },
  { human: "PARK7", aliases: ["DJ1", "DJ-1"] },
  { human: "ATP13A2" },
  { human: "VPS35" },
  { human: "GBA" },
  { human: "SOD1" },
  { human: "TARDBP", aliases: ["TDP43", "TDP-43"] },
  { human: "FUS" },
  { human: "C9orf72" },
  { human: "GRN" },
  { human: "SQSTM1" },
  { human: "OPTN" },
  { human: "VCP" },
  { human: "UBQLN2" },
  { human: "HNRNPA1" },
  { human: "HNRNPA2B1" },
  { human: "TIA1" },
  { human: "MATR3" },
  { human: "CHCHD10" },
  { human: "CHCHD2" },
  { human: "SIGMAR1" },
  { human: "VAPB" },
  { human: "ANG" },
  { human: "SETX" },
  { human: "SPG11" },
  { human: "SPG15" },
  { human: "FAHN" },
  { human: "PLA2G6" },
  { human: "PANK2" },
  { human: "COQ2" },
  { human: "COQ8A", aliases: ["ADCK3"] },
  { human: "COQ9" },
  { human: "COQ6" },
  { human: "COQ4" },
  { human: "COQ5" },
  { human: "COQ7" },
  { human: "COQ3" },
  { human: "COQ8B" },
  { human: "GRIN1" },
  { human: "GRIN2A" },
  { human: "GRIN2B" },
  { human: "GRIN2C" },
  { human: "GRIN2D" },
  { human: "GRIA1" },
  { human: "GRIA2" },
  { human: "GRIA3" },
  { human: "GRIA4" },
  { human: "GABRA1" },
  { human: "GABRA2" },
  { human: "GABRA3" },
  { human: "GABRA4" },
  { human: "GABRA5" },
  { human: "GABRB1" },
  { human: "GABRB2" },
  { human: "GABRB3" },
  { human: "GABRG2" },
  { human: "GABRD" },
  { human: "GABRP" },
  { human: "GABRQ" },
  { human: "GABRE" },
  { human: "SLC6A4" },
  { human: "SLC6A3" },
  { human: "SLC6A1" },
  { human: "SLC6A2" },
  { human: "SLC1A2" },
  { human: "SLC1A3" },
  { human: "SLC17A6" },
  { human: "SLC17A7" },
  { human: "SLC17A8" },
  { human: "DLG1" },
  { human: "DLG2" },
  { human: "DLG3" },
  { human: "DLG4", aliases: ["PSD-95", "PSD95"] },
  { human: "SHANK1" },
  { human: "SHANK2" },
  { human: "SHANK3" },
  { human: "SYNGAP1" },
  { human: "NRXN1" },
  { human: "NRXN2" },
  { human: "NRXN3" },
  { human: "NLGN1" },
  { human: "NLGN2" },
  { human: "NLGN3" },
  { human: "NLGN4X" },
  { human: "NLGN4Y" },
  { human: "CNTNAP2" },
  { human: "KCTD12" },
  { human: "KCTD13" },
  { human: "KCTD15" },
  { human: "CACNA1C" },
  { human: "CACNA1A" },
  { human: "CACNA1B" },
  { human: "CACNA1D" },
  { human: "CACNA1E" },
  { human: "CACNB1" },
  { human: "CACNB2" },
  { human: "CACNB3" },
  { human: "CACNB4" },
  { human: "CACNG1" },
  { human: "CACNG2" },
  { human: "CACNG3" },
  { human: "CACNG4" },
  { human: "CACNG5" },
  { human: "CACNG6" },
  { human: "CACNG7" },
  { human: "CACNG8" },
  { human: "SCN1A" },
  { human: "SCN2A" },
  { human: "SCN8A" },
  { human: "SCN9A" },
  { human: "SCN1B" },
  { human: "SCN2B" },
  { human: "SCN3B" },
  { human: "KCNQ1" },
  { human: "KCNQ2" },
  { human: "KCNQ3" },
  { human: "KCNQ4" },
  { human: "KCNQ5" },
  { human: "KCNH2" },
  { human: "KCNH3" },
  { human: "KCNH5" },
  { human: "KCNH6" },
  { human: "KCNH7" },
  { human: "KCNH8" },
  { human: "KCNH9" },
  { human: "KCNJ1" },
  { human: "KCNJ2" },
  { human: "KCNJ3" },
  { human: "KCNJ4" },
  { human: "KCNJ5" },
  { human: "KCNJ6" },
  { human: "KCNJ10" },
  { human: "KCNJ11" },
  { human: "KCNJ12" },
  { human: "KCNJ13" },
  { human: "KCNJ14" },
  { human: "KCNJ15" },
  { human: "KCNJ16" },
];

const METABOLISM_GENE_SPECS: ReadonlyArray<{ human: string; aliases?: readonly string[] }> = [
  { human: "INS" },
  { human: "INSR" },
  { human: "IGF1" },
  { human: "IGF1R" },
  { human: "IGF2" },
  { human: "IGF2R" },
  { human: "GCK" },
  { human: "GCKR" },
  { human: "G6PC" },
  { human: "G6PC2" },
  { human: "PCK1" },
  { human: "PCK2" },
  { human: "FBP1" },
  { human: "FBP2" },
  { human: "HK1" },
  { human: "HK2" },
  { human: "HK3" },
  { human: "HKDC1" },
  { human: "PFKM" },
  { human: "PFKL" },
  { human: "PFKP" },
  { human: "ALDOA" },
  { human: "ALDOB" },
  { human: "ALDOC" },
  { human: "GAPDH" },
  { human: "PGK1" },
  { human: "ENO1" },
  { human: "ENO2" },
  { human: "ENO3" },
  { human: "PKM" },
  { human: "PKLR" },
  { human: "LDHA" },
  { human: "LDHB" },
  { human: "LDHC" },
  { human: "LDHD" },
  { human: "PDK1" },
  { human: "PDK2" },
  { human: "PDK3" },
  { human: "PDK4" },
  { human: "PDHA1" },
  { human: "PDHB" },
  { human: "DLAT" },
  { human: "DLD" },
  { human: "PDHX" },
  { human: "SDHA" },
  { human: "SDHB" },
  { human: "SDHC" },
  { human: "SDHD" },
  { human: "SDHAF1" },
  { human: "SDHAF2" },
  { human: "SDHAF3" },
  { human: "SDHAF4" },
  { human: "UQCRFS1" },
  { human: "UQCRB" },
  { human: "UQCRC1" },
  { human: "UQCRC2" },
  { human: "UQCRH" },
  { human: "UQCRQ" },
  { human: "UQCR10" },
  { human: "UQCR11" },
  { human: "NDUFS1" },
  { human: "NDUFS2" },
  { human: "NDUFS3" },
  { human: "NDUFS4" },
  { human: "NDUFS5" },
  { human: "NDUFS6" },
  { human: "NDUFS7" },
  { human: "NDUFS8" },
  { human: "NDUFA1" },
  { human: "NDUFA2" },
  { human: "NDUFA3" },
  { human: "NDUFA4" },
  { human: "NDUFA5" },
  { human: "NDUFA6" },
  { human: "NDUFA7" },
  { human: "NDUFA8" },
  { human: "NDUFA9" },
  { human: "NDUFA10" },
  { human: "NDUFA11" },
  { human: "NDUFA12" },
  { human: "NDUFA13" },
  { human: "NDUFV1" },
  { human: "NDUFV2" },
  { human: "NDUFV3" },
  { human: "NDUFB1" },
  { human: "NDUFB2" },
  { human: "NDUFB3" },
  { human: "NDUFB4" },
  { human: "NDUFB5" },
  { human: "NDUFB6" },
  { human: "NDUFB7" },
  { human: "NDUFB8" },
  { human: "NDUFB9" },
  { human: "NDUFB10" },
  { human: "NDUFB11" },
  { human: "COX4I1" },
  { human: "COX4I2" },
  { human: "COX5A" },
  { human: "COX5B" },
  { human: "COX6A1" },
  { human: "COX6A2" },
  { human: "COX6B1" },
  { human: "COX6C" },
  { human: "COX7A1" },
  { human: "COX7A2" },
  { human: "COX7B" },
  { human: "COX7C" },
  { human: "COX8A" },
  { human: "COX8C" },
  { human: "COX10" },
  { human: "COX11" },
  { human: "COX14" },
  { human: "COX15" },
  { human: "COX16" },
  { human: "COX17" },
  { human: "COX18" },
  { human: "COX19" },
  { human: "COX20" },
  { human: "ATP5F1A" },
  { human: "ATP5F1B" },
  { human: "ATP5F1C" },
  { human: "ATP5F1D" },
  { human: "ATP5F1E" },
  { human: "ATP5PO", aliases: ["ATP5F1"] },
  { human: "ATP5MG" },
  { human: "ATP5MF" },
  { human: "ATP5MD" },
  { human: "ATP5ME" },
  { human: "ATP5MH" },
  { human: "ATP5MJ" },
  { human: "ATP5MK" },
  { human: "ATP5ML" },
  { human: "ATP5MO" },
  { human: "ATP5MP" },
  { human: "ATP5MQ" },
  { human: "ATP5MR" },
  { human: "ATP5MS" },
  { human: "ATP5MT" },
  { human: "ATP5MU" },
  { human: "ATP5MV" },
  { human: "ATP5MW" },
  { human: "ATP5MX" },
  { human: "ATP5MY" },
  { human: "ATP5MZ" },
];

function dedupeByHumanSymbol(genes: PriorityGene[]): PriorityGene[] {
  const seen = new Set<string>();
  const out: PriorityGene[] = [];
  for (const gene of genes) {
    const key = gene.humanSymbol.toUpperCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(gene);
  }
  return out;
}

export const PRIORITY_GENES: PriorityGene[] = dedupeByHumanSymbol([
  ...MORPHOGEN_GENES,
  ...SIGNALING_GENE_SPECS.map((spec) =>
    defineCohortGene(spec.human, 'signaling', [...(spec.aliases ?? [])], 'A'),
  ),
  ...IMMUNE_GENE_SPECS.map((spec) =>
    defineCohortGene(spec.human, 'immune', [...(spec.aliases ?? [])], 'A'),
  ),
  ...CANCER_GENE_SPECS.map((spec) =>
    defineCohortGene(spec.human, 'cancer', [...(spec.aliases ?? [])], 'A'),
  ),
  ...NEUROSCIENCE_GENE_SPECS.map((spec) =>
    defineCohortGene(spec.human, 'neuroscience', [...(spec.aliases ?? [])], 'A'),
  ),
  ...METABOLISM_GENE_SPECS.map((spec) =>
    defineCohortGene(spec.human, 'metabolism', [...(spec.aliases ?? [])], 'A'),
  ),
]);

export const TIER_A_GENES: PriorityGene[] = PRIORITY_GENES.filter((gene) => gene.tier === 'A');

export function getPriorityGenesByCohort(cohort: GeneCohort): PriorityGene[] {
  return PRIORITY_GENES.filter((gene) => gene.cohort === cohort);
}

const MOUSE_SYMBOL_INDEX = new Map<string, PriorityGene>();
for (const gene of PRIORITY_GENES) {
  const key = gene.mouseSymbol.toLowerCase();
  if (!MOUSE_SYMBOL_INDEX.has(key)) {
    MOUSE_SYMBOL_INDEX.set(key, gene);
  }
}

const HUMAN_SYMBOL_INDEX = new Map<string, PriorityGene>();
for (const gene of PRIORITY_GENES) {
  for (const key of [gene.humanSymbol, ...gene.aliases]) {
    const upper = key.toUpperCase();
    if (!HUMAN_SYMBOL_INDEX.has(upper)) {
      HUMAN_SYMBOL_INDEX.set(upper, gene);
    }
  }
}

export function getPriorityGeneByMouseSymbol(symbol: string): PriorityGene | undefined {
  return MOUSE_SYMBOL_INDEX.get(symbol.toLowerCase());
}

export function getPriorityGeneByHumanSymbol(symbol: string): PriorityGene | undefined {
  return HUMAN_SYMBOL_INDEX.get(symbol.toUpperCase());
}

export function isPriorityGene(symbol: string): boolean {
  return (
    MOUSE_SYMBOL_INDEX.has(symbol.toLowerCase()) ||
    HUMAN_SYMBOL_INDEX.has(symbol.toUpperCase())
  );
}

export function isTierAGene(symbol: string): boolean {
  const gene =
    getPriorityGeneByMouseSymbol(symbol) ?? getPriorityGeneByHumanSymbol(symbol);
  return gene?.tier === 'A';
}

const MORPHOGEN_FAMILY_LABELS: Record<MorphogenFamily, string> = {
  hedgehog: 'Hedgehog',
  wnt: 'Wnt',
  'bmp-gdf': 'BMP/GDF',
  'tgfb-activin-nodal': 'TGF-beta/Activin/Nodal',
  fgf: 'FGF',
  retinoic: 'Retinoic acid axis',
  'notch-ligand': 'Notch ligand',
  modulator: 'Antagonist/modulator',
};

export function getMorphogenFamilyLabel(family: MorphogenFamily): string {
  return MORPHOGEN_FAMILY_LABELS[family];
}

const COHORT_LABELS: Record<GeneCohort, string> = {
  morphogen: 'Morphogen / developmental patterning',
  signaling: 'Core signaling and cell cycle',
  immune: 'Immune and host response',
  cancer: 'Cancer drivers and DNA repair',
  neuroscience: 'Neuroscience and neurodegeneration',
  metabolism: 'Metabolism and cardiovascular',
};

export function getCohortLabel(cohort: GeneCohort): string {
  return COHORT_LABELS[cohort];
}


/** PI search taxonomy groups for hub UI matrix (synonym coverage without thin URLs). */
export const PI_TAXONOMY_GROUPS: PiTaxonomyGroup[] = [
  {
    id: 'knockout',
    label: 'Knockout',
    children: [
      { id: 'conventional-ko', label: 'Conventional / global / constitutive KO', canonicalModSlug: 'knockout' },
      { id: 'conditional-ko', label: 'Conditional KO (floxed / loxP)', canonicalModSlug: 'conditional-knockout' },
      { id: 'inducible-cko', label: 'Inducible conditional KO (CreER / tet)', canonicalModSlug: 'inducible-knockout' },
      {
        id: 'tissue-specific-ko',
        label: 'Tissue specific KO',
        canonicalModSlug: 'conditional-knockout',
        quoteNote: 'Specify tissue or Cre driver on quote',
      },
      {
        id: 'knockout-first',
        label: 'Knockout first (tm1a / IKMC)',
        canonicalModSlug: 'knockout',
        quoteNote: 'Convertible floxed allele pathway',
      },
      {
        id: 'compound-ko',
        label: 'Double / compound KO',
        quoteNote: 'Multi allele / compound knockout project',
      },
      {
        id: 'bac-deletion',
        label: 'Large scale / BAC deletion',
        siteHref: '/bac-to-bac-large-scale-targeting',
        quoteNote: 'BAC scale deletion or targeting',
      },
    ],
  },
  {
    id: 'knockin',
    label: 'Knockin',
    children: [
      { id: 'point-mutation-ki', label: 'Point mutation KI', canonicalModSlug: 'point-mutation' },
      { id: 'cdna-ki', label: 'cDNA KI', canonicalModSlug: 'cdna-knockin' },
      {
        id: 'reporter-ki',
        label: 'Reporter KI (GFP, YFP, RFP, mCherry, tdTomato, lacZ, luciferase)',
        canonicalModSlug: 'reporter',
      },
      { id: 'tag-ki', label: 'Tag KI (FLAG, HA, Myc, V5)', canonicalModSlug: 'tag-knockin' },
      {
        id: 'conditional-ki',
        label: 'Conditional KI (e.g. Rosa26 LSL)',
        canonicalModSlug: 'overexpression',
        quoteNote: 'LSL or conditional expression knockin',
      },
      {
        id: 'gene-replacement-ki',
        label: 'Gene replacement KI',
        canonicalModSlug: 'humanized',
      },
    ],
  },
  {
    id: 'humanized',
    label: 'Humanized',
    children: [
      { id: 'full-humanized', label: 'Full gene replacement', canonicalModSlug: 'humanized' },
      {
        id: 'partial-humanized',
        label: 'Partial / domain humanized',
        canonicalModSlug: 'humanized',
        quoteNote: 'Domain or partial humanization scope',
      },
      {
        id: 'checkpoint-humanized',
        label: 'Immune checkpoint humanized',
        canonicalModSlug: 'humanized',
        siteHref: '/double-checkpoint-mice',
        quoteNote: 'Checkpoint IO humanization when gene is a checkpoint target',
      },
      { id: 'single-humanized', label: 'Single humanized', canonicalModSlug: 'humanized' },
      {
        id: 'multi-humanized',
        label: 'Double / multi humanized',
        quoteNote: 'Multi humanized / combination IO project',
      },
    ],
  },
  {
    id: 'transgenic',
    label: 'Transgenic',
    children: [
      {
        id: 'random-integration-tg',
        label: 'Random integration transgenic',
        canonicalModSlug: 'overexpression',
      },
      {
        id: 'safe-harbor',
        label: 'Safe harbor (ROSA26, HPRT, H11, Col1a1)',
        canonicalModSlug: 'overexpression',
      },
      { id: 'overexpression-tg', label: 'Overexpression transgenic', canonicalModSlug: 'overexpression' },
      {
        id: 'bac-transgenic',
        label: 'BAC transgenic',
        siteHref: '/bac-to-bac-large-scale-targeting',
        quoteNote: 'BAC transgenic or large fragment insert',
      },
    ],
  },
  {
    id: 'cre',
    label: 'Cre / recombinase',
    children: [
      {
        id: 'constitutive-cre',
        label: 'Constitutive Cre driver',
        canonicalModSlug: 'cre-driver',
        siteHref: '/cre-driver-catalog',
      },
      {
        id: 'inducible-cre',
        label: 'Inducible Cre (CreER / tet)',
        canonicalModSlug: 'cre-driver',
        quoteNote: 'Tamoxifen or dox inducible Cre',
      },
      {
        id: 'dual-recombinase',
        label: 'Dual recombinase (Cre+Dre / Cre+Flp)',
        siteHref: '/flp-frt-system',
        quoteNote: 'Dual recombinase breeding scheme',
      },
      {
        id: 'flp-driver',
        label: 'Flp driver',
        siteHref: '/flp-frt-system',
        quoteNote: 'Flp or FRT derivative allele pairing',
      },
    ],
  },
  {
    id: 'reporter',
    label: 'Reporter',
    children: [
      {
        id: 'reporter-ki-hub',
        label: 'Reporter knockin (gene specific)',
        canonicalModSlug: 'reporter',
      },
      {
        id: 'standalone-reporter-catalog',
        label: 'Standalone reporter catalog (lineage tracing, constitutive, dual reporter)',
        siteHref: '/all-catalog-mouse-models',
        quoteNote: 'Catalog reporter lines not tied to a single gene allele',
      },
    ],
  },
  {
    id: 'species-background',
    label: 'Species / background',
    children: [
      {
        id: 'rat-models',
        label: 'Rat KO / KI / transgenic',
        siteHref: '/rat-models',
        quoteNote: 'Specify rat on quote',
      },
      {
        id: 'rabbit-models',
        label: 'Rabbit models',
        siteHref: '/custom-rabbit-models',
        quoteNote: 'Specify rabbit on quote',
      },
      {
        id: 'c57bl6-background',
        label: 'C57BL/6 (B6J / B6N)',
        siteHref: '/c57bl6-mouse-background',
        quoteNote: 'Background substrain on quote',
      },
      {
        id: 'balbc-background',
        label: 'BALB/c',
        siteHref: '/balbc-mouse-background',
      },
      {
        id: 'other-backgrounds',
        label: '129, NOD, NSG, FVB, CD1, DBA/2',
        quoteNote: 'Background strain on quote',
      },
    ],
  },
];

// Approximate unique priority gene count after morphogen-first dedupe: 771
