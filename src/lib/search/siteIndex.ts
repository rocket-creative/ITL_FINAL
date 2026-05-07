/**
 * Shared site content index for search
 * Used by /api/search and search page
 */

import type { ParsedQuery } from './parseQuery';
import { CRE_DRIVERS } from './creDrivers';
import { FILLER_STOPWORDS, allMatchingModificationPatterns, TISSUE_CELL_SYNONYMS } from './dictionaries';

const CRE_GUIDE_EXTRA = [
  ...new Set(CRE_DRIVERS.flatMap((d) => [d.driver, ...d.aliases]).map((k) => k.toLowerCase())),
];
const TISSUE_KW_EXTRA = [...new Set(Object.keys(TISSUE_CELL_SYNONYMS).map((k) => k.toLowerCase()))];

export interface SiteIndexEntry {
  title: string;
  description: string;
  url: string;
  category: string;
  keywords?: readonly string[];
}

// Lab Signals articles for search (curated list scientists search for)
const labSignalsEntries: SiteIndexEntry[] = [
  { title: "Insights into Neurodegenerative Diseases: Alzheimer's Disease Progression and Treatments", description: 'Lab Signals article on Alzheimer disease research and treatments.', url: '/lab-signals/insights-into-neurodegenerative-diseases-alzheimers-disease-progression-and-treatments', category: 'Lab Signals' },
  { title: 'Advances in Metabolic Disorders Research: Obesity and Diabetes', description: 'Lab Signals article on metabolic disease and diabetes research.', url: '/lab-signals/article-2-advances-in-metabolic-disorders-research-obesity-and-diabetes', category: 'Lab Signals' },
  { title: 'Developments in Immune and Infectious Diseases: Insights from Humanized Models', description: 'Lab Signals article on humanized models for immunology research.', url: '/lab-signals/article-3-developments-in-immune-and-infectious-diseases-insights-from-humanized-models', category: 'Lab Signals' },
  { title: 'Breakthroughs in Cancer Research: Innovations in Immunotherapy', description: 'Lab Signals article on immuno oncology and cancer research.', url: '/lab-signals/article-4-breakthroughs-in-cancer-research-innovations-in-immunotherapy', category: 'Lab Signals' },
  { title: 'Advancements in Gene Editing Technologies: Enhancements in CRISPR-Cas9', description: 'Lab Signals article on CRISPR and gene editing.', url: '/lab-signals/article-5-advancements-in-gene-editing-technologies-enhancements-in-crispr-cas9', category: 'Lab Signals' },
  { title: 'Building Better Floxed Alleles for Conditional Knockout Mice', description: 'Lab Signals article on floxed allele design for conditional knockout.', url: '/lab-signals/building-better-floxed-alleles-for-conditional-knockout-mice', category: 'Lab Signals' },
  { title: 'Conventional vs. Conditional Knockout Mice', description: 'Lab Signals article comparing conventional and conditional knockout strategies.', url: '/lab-signals/conventional-vs-conditional-knockout-mice', category: 'Lab Signals' },
  { title: 'Cre-Lox: 6 Facts You May Not Know', description: 'Lab Signals article on Cre lox recombination system.', url: '/lab-signals/cre-lox-6-facts-you-may-not-know', category: 'Lab Signals' },
  { title: 'How Humanized Mouse Models Are Transforming Pre-clinical R&D', description: 'Lab Signals article on humanized mouse models in drug development.', url: '/lab-signals/how-humanized-mouse-models-are-transforming-pre-clinical-r-d', category: 'Lab Signals' },
  { title: 'How a Knockout Mouse Is Made', description: 'Lab Signals article on knockout mouse generation process.', url: '/lab-signals/how-a-knockout-mouse-is-made', category: 'Lab Signals' },
  { title: 'Knock-In Mice vs. Transgenic Mice: What You Need to Know', description: 'Lab Signals article comparing knock in and transgenic approaches.', url: '/lab-signals/knock-in-mice-vs-transgenic-mice-what-you-need-to-know', category: 'Lab Signals' },
  { title: 'BAC Transgenic Mice: Large-Fragment Insertion Models for Gene Regulation and Disease Research', description: 'Lab Signals article on BAC transgenic mice.', url: '/lab-signals/bac-transgenic-mice-large-fragment-insertion-models', category: 'Lab Signals' },
  { title: 'Modeling Human Disease: The Expanding Role of Knockout Mice in Precision Medicine', description: 'Lab Signals article on knockout mice in precision medicine.', url: '/lab-signals/modeling-human-disease-knockout-mice-precision-medicine', category: 'Lab Signals' },
  { title: 'The FDA Modernization Act 2.0: What It Means for Mouse Model Providers and Researchers', description: 'Lab Signals article on FDA regulatory changes.', url: '/lab-signals/fda-modernization-act-2-mouse-models-regulatory', category: 'Lab Signals' },
  { title: 'Leveraging Mouse Models for Point Mutation Diseases: R&D Landscape', description: 'Lab Signals article on point mutation disease models.', url: '/lab-signals/leveraging-mouse-models-for-point-mutation-diseases-r-d-landscape', category: 'Lab Signals' },
  { title: 'Top 5 Lab Mouse Colony Management Software Options For 2025', description: 'Lab Signals article on colony management software.', url: '/lab-signals/top-5-lab-mouse-colony-management-software-options-for-2025', category: 'Lab Signals' },
];

// Key blog posts scientists commonly search for
const blogEntries: SiteIndexEntry[] = [
  { title: 'Cre lox conditional knockout mouse models', description: 'Design guide for Cre lox conditional knockout models and strategy selection.', url: '/ingenious-blog/cre-lox-conditional-knockout-mouse-models', category: 'Blog' },
  { title: 'How a knockout mouse is made', description: 'Overview of knockout mouse generation methods including CRISPR and ES cells.', url: '/ingenious-blog/how-a-knockout-mouse-is-made', category: 'Blog' },
  { title: 'Humanized mice', description: 'Article on humanized mouse models for translational research.', url: '/ingenious-blog/humanized-mice', category: 'Blog' },
  { title: 'Conventional vs conditional knockout', description: 'Comparison of conventional and conditional knockout strategies.', url: '/ingenious-blog/conventional-vs-conditional-knockout', category: 'Blog' },
  { title: 'Cre lox facts', description: 'Key facts about the Cre lox recombination system.', url: '/ingenious-blog/cre-lox-facts', category: 'Blog' },
  { title: 'Cre recombinase', description: 'Overview of Cre recombinase and its applications in mouse genetics.', url: '/ingenious-blog/cre-recombinase', category: 'Blog' },
  { title: 'Floxed allele', description: 'Understanding floxed alleles for conditional gene knockout.', url: '/ingenious-blog/floxed-allele', category: 'Blog' },
  { title: 'Gene knockout', description: 'Gene knockout methods and applications in mouse models.', url: '/ingenious-blog/gene-knockout', category: 'Blog' },
  { title: 'Knock in vs knockout mice', description: 'Key differences between knock in and knockout mice and when to use each.', url: '/ingenious-blog/difference-between-knock-in-and-knockout', category: 'Blog' },
  { title: 'CRISPR gene targeting', description: 'CRISPR Cas9 gene targeting for mouse model generation.', url: '/ingenious-blog/crispr-gene-targeting', category: 'Blog' },
  { title: 'Point mutation diseases', description: 'Diseases caused by point mutations and mouse models for research.', url: '/ingenious-blog/point-mutation-diseases', category: 'Blog' },
  { title: 'Rosa26 mice', description: 'Rosa26 locus targeting for transgene expression and knockin.', url: '/ingenious-blog/rosa26-mice', category: 'Blog' },
  { title: 'Why make a humanized mouse', description: 'Reasons to use humanized mouse models in preclinical research.', url: '/ingenious-blog/why-make-a-humanized-mouse', category: 'Blog' },
  { title: 'Transgenic mice', description: 'Transgenic mouse models and random integration approaches.', url: '/ingenious-blog/transgenic-mice', category: 'Blog' },
  { title: 'BAC transgenic', description: 'BAC transgenic mice for large fragment insertion.', url: '/ingenious-blog/bac-transgenic', category: 'Blog' },
];

export const siteIndex: SiteIndexEntry[] = [
  // Custom Mouse Models
  { title: 'Custom mouse models', description: 'Design and generate custom genetically modified mouse models tailored to your research needs.', url: '/custom-mouse-models', category: 'Services' },
  { title: 'Knockout mouse models', description: 'Create knockout mice with complete gene deletion for functional studies and phenotyping.', url: '/knockout-mouse-models', category: 'Services' },
  { title: 'Conditional knockout mouse models', description: 'Tissue specific and temporally controlled gene deletion using Cre lox technology.', url: '/conditional-knockout-mouse-models', category: 'Services', keywords: ['floxed', 'Cre conditional', 'CKO', 'loxP', 'conditional KO', 'flox', 'Cre-lox'] as const },
  { title: 'Conventional knockout mouse models', description: 'Whole body gene knockout mice for studying gene function across all tissues.', url: '/conventional-knockout-mouse-models', category: 'Services', keywords: ['null allele', 'global knockout', 'whole body knockout'] as const },
  { title: 'Knockin mouse models', description: 'Insert specific sequences, tags, or mutations into the mouse genome with precision.', url: '/knockin-mouse-models', category: 'Services', keywords: ['knock in', 'KI', 'reporter allele'] as const },
  { title: 'Point mutation mice', description: 'Generate mice carrying specific point mutations to model human disease variants.', url: '/point-mutation-mice', category: 'Services', keywords: ['missense', 'patient mutation'] as const },
  { title: 'Reporter knockin', description: 'Express fluorescent proteins or enzymes under endogenous promoter control.', url: '/reporter-knockin', category: 'Services', keywords: ['GFP', 'tdTomato', 'lacZ'] as const },
  { title: 'Tag knockin mice', description: 'Add epitope tags to endogenous proteins for detection and purification.', url: '/tag-knockin-mice', category: 'Services', keywords: ['epitope tag', 'FLAG', 'HA tag'] as const },
  { title: 'Humanized mouse models', description: 'Replace mouse genes with human sequences for translational research.', url: '/humanized-mouse-models', category: 'Services', keywords: ['humanization', 'gene replacement'] as const },
  { title: 'Transgenic mouse service', description: 'Random integration of transgenes for overexpression studies.', url: '/transgenic-mouse-service', category: 'Services' },
  // Technology
  { title: 'Cre lox system', description: 'Site specific recombination for conditional gene modification in mice.', url: '/cre-lox-system', category: 'Technology', keywords: ['Crelox', 'flox', 'loxP flanked'] as const },
  { title: 'Flp FRT system', description: 'Alternative recombination system for complex genetic manipulations.', url: '/flp-frt-system', category: 'Technology' },
  // Therapeutic Areas
  { title: 'Oncology mouse models', description: 'Mouse models for cancer research and immuno oncology studies.', url: '/oncology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Immuno oncology mouse models', description: 'Models for studying immune responses to tumors and immunotherapy.', url: '/immuno-oncology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Neuroscience mouse models', description: 'Models for neurological disease research including Alzheimer and Parkinson.', url: '/neuroscience-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Alzheimers mouse models', description: 'Transgenic and knockin models for Alzheimer disease research.', url: '/alzheimers-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Cardiovascular mouse models', description: 'Models for heart disease and vascular research.', url: '/cardiovascular-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Immunology mouse models', description: 'Models for studying immune system function and autoimmune disease.', url: '/immunology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Metabolic disease mouse models', description: 'Models for diabetes, obesity, and metabolic syndrome research.', url: '/metabolic-disease-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Rare disease mouse models', description: 'Custom models for orphan and rare disease research.', url: '/rare-disease-mouse-models', category: 'Therapeutic Areas' },
  // Catalog
  { title: 'Catalog mouse models', description: 'Ready made mouse models available for immediate order.', url: '/catalog-mouse-models', category: 'Catalog' },
  { title: 'Humanized immune checkpoint mice', description: 'Pre made humanized PD1, PDL1, CTLA4, and other checkpoint models.', url: '/humanized-immune-checkpoint-mice', category: 'Catalog' },
  { title: 'PD1 humanized mice', description: 'Humanized PD1 mice for immuno oncology research.', url: '/pd1-humanized-mice', category: 'Catalog' },
  { title: 'PDL1 humanized mice', description: 'Humanized PDL1 mice for checkpoint inhibitor studies.', url: '/pdl1-humanized-mice', category: 'Catalog' },
  { title: 'CTLA4 humanized mice', description: 'Humanized CTLA4 mice for immunotherapy research.', url: '/ctla4-humanized-mice', category: 'Catalog' },
  { title: 'LAG3 humanized mice', description: 'Humanized LAG3 mice for next generation checkpoint studies.', url: '/lag3-humanized-mice', category: 'Catalog' },
  { title: 'TIM3 humanized mice', description: 'Humanized TIM3 mice for immune checkpoint research.', url: '/tim3-humanized-mice', category: 'Catalog' },
  { title: 'Single checkpoint mice', description: 'Single humanized immune checkpoint models including PD1, PDL1, CTLA4, LAG3, TIM3, and more.', url: '/single-checkpoint-mice', category: 'Catalog' },
  { title: 'Double checkpoint mice', description: 'Dual humanized checkpoint mice for combination therapy studies.', url: '/double-checkpoint-mice', category: 'Catalog' },
  // Support Services
  { title: 'Colony management services', description: 'Professional breeding and colony maintenance for your mouse lines.', url: '/colony-management-services', category: 'Support Services' },
  { title: 'Cryopreservation services', description: 'Preserve your valuable mouse lines through sperm or embryo freezing.', url: '/cryopreservation-services', category: 'Support Services' },
  { title: 'Rederivation services', description: 'Clean up mouse lines by rederivation into SPF facilities.', url: '/rederivation-services', category: 'Support Services' },
  { title: 'Speed expansion breeding', description: 'Rapid expansion of mouse cohorts for studies.', url: '/speed-expansion-breeding', category: 'Support Services' },
  { title: 'Mouse genotyping service', description: 'Fast and accurate genotyping for your mouse colonies.', url: '/mouse-genotyping-service', category: 'Support Services' },
  { title: 'Phenotyping services', description: 'Comprehensive phenotyping of your mouse models.', url: '/phenotyping-services', category: 'Support Services' },
  // Resources
  { title: 'Resources', description: 'Guides, protocols, and educational content for mouse model research.', url: '/resources', category: 'Resources' },
  { title: 'Mouse genetics glossary', description: 'Comprehensive glossary of mouse genetics terminology.', url: '/glossary', category: 'Resources' },
  { title: 'Conditional vs conventional guide', description: 'Guide to choosing between conditional and conventional knockouts.', url: '/conditional-vs-conventional-guide', category: 'Resources' },
  { title: 'Cre line selection guide', description: 'How to choose the right Cre driver line for your research.', url: '/cre-line-selection-guide', category: 'Resources', keywords: CRE_GUIDE_EXTRA },
  { title: 'Ingenious Blog', description: 'Blog articles on mouse model research and technology.', url: '/ingenious-blog', category: 'Resources' },
  { title: 'Lab Signals Newsletter', description: 'Biweekly newsletter with research insights.', url: '/lab-signals', category: 'Resources' },
  { title: 'Breeding Scheme Architect', description: 'Free interactive tool for planning single allele breeding schemes.', url: '/breeding-scheme-architect', category: 'Resources' },
  { title: 'All FAQs', description: 'Frequently asked questions about mouse models.', url: '/faq', category: 'Resources' },
  // Company
  { title: 'About ingenious targeting laboratory', description: 'Learn about ingenious targeting laboratory and our 26+ years of experience.', url: '/about-itl', category: 'Company' },
  { title: 'Why choose ingenious targeting laboratory', description: 'Discover why researchers trust ingenious targeting laboratory for custom mouse model generation.', url: '/why-choose-itl', category: 'Company' },
  { title: 'Contact', description: 'Get in touch with our team for project inquiries.', url: '/contact', category: 'Company' },
  { title: 'Request a quote', description: 'Submit a project inquiry and receive a custom quote.', url: '/request-quote', category: 'Company' },
  { title: 'Pricing overview', description: 'Information about pricing for mouse model generation services.', url: '/pricing-overview', category: 'Company' },
  { title: 'Order catalog models', description: 'Order ready made mouse models from our catalog.', url: '/order-catalog-models', category: 'Company' },
  { title: 'Schedule meeting', description: 'Schedule a call with our team.', url: '/schedule-meeting', category: 'Company' },
  { title: 'All catalog mouse models', description: 'Browse all catalog models available for order.', url: '/all-catalog-mouse-models', category: 'Catalog' },
  { title: 'Disease model catalog', description: 'Disease models available for research.', url: '/disease-model-catalog', category: 'Catalog' },
  { title: 'Syngeneic tumor models', description: 'Syngeneic tumor models for oncology research.', url: '/syngeneic-tumor-models', category: 'Catalog' },
  // Additional key pages scientists search for
  { title: 'Video library', description: 'Educational videos on mouse model generation and research.', url: '/video-library', category: 'Resources' },
  { title: 'Scientific leadership', description: 'Meet our scientific team and leadership.', url: '/scientific-leadership', category: 'Company' },
  { title: 'Quality control', description: 'Quality control and validation for mouse model generation.', url: '/quality-control', category: 'Company' },
  { title: 'Mouse strain backgrounds', description: 'C57BL/6, BALB/c, and other mouse strain background information.', url: '/mouse-strain-backgrounds', category: 'Resources' },
  { title: 'C57BL/6 mouse background', description: 'C57BL/6 strain characteristics and use in research.', url: '/c57bl6-mouse-background', category: 'Resources' },
  { title: 'BALB/c mouse background', description: 'BALB/c strain for immunology and oncology research.', url: '/balbc-mouse-background', category: 'Resources' },
  {
    title: 'Tissue specific knockout',
    description: 'Tissue specific gene knockout using Cre driver lines.',
    url: '/tissue-specific-knockout',
    category: 'Services',
    keywords: [
      'liver specific',
      'T cell specific',
      'B cell specific',
      'cardiomyocyte',
      'neuron specific',
      'endothelial',
      'myeloid',
      'microglia',
      'hepatocyte',
      'intestinal',
      'kidney',
      'skin',
      'keratinocyte',
      ...TISSUE_KW_EXTRA,
    ],
  },
  {
    title: 'Inducible conditional knockout',
    description: 'Tamoxifen and doxycycline inducible Cre systems.',
    url: '/inducible-conditional-knockout',
    category: 'Services',
    keywords: ['tamoxifen', 'CreERT2', 'doxycycline', 'tet-on', 'tet-off', 'inducible cre', 'inducible knockout'],
  },
  { title: 'Parkinsons mouse models', description: 'Mouse models for Parkinson disease research.', url: '/parkinsons-mouse-models', category: 'Therapeutic Areas' },
  { title: 'ALS mouse models', description: 'Amyotrophic lateral sclerosis mouse models.', url: '/als-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Diabetes mouse models', description: 'Type 1 and type 2 diabetes mouse models.', url: '/diabetes-mouse-models', category: 'Therapeutic Areas' },
  { title: 'NASH MASH mouse models', description: 'Nonalcoholic steatohepatitis and metabolic disease models.', url: '/nash-mash-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Lupus mouse models', description: 'Systemic lupus erythematosus mouse models.', url: '/lupus-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Heart failure mouse models', description: 'Mouse models for heart failure research.', url: '/heart-failure-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Ophthalmology mouse models', description: 'Mouse models for eye disease and vision research.', url: '/ophthalmology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Allergy asthma mouse models', description: 'Models for allergic disease and asthma research.', url: '/allergy-asthma-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Preclinical services', description: 'Preclinical study support and CRO services.', url: '/preclinical-services', category: 'Support Services' },
  { title: 'Mouse model services', description: 'Full range of custom mouse model generation services.', url: '/mouse-model-services', category: 'Services' },
  { title: 'BAC to BAC large scale targeting', description: 'Large scale gene targeting using BAC vectors.', url: '/bac-to-bac-large-scale-targeting', category: 'Technology' },
  { title: 'CDNA knockin', description: 'CDNA knockin for gene expression studies.', url: '/cdna-knockin', category: 'Services' },
  { title: 'Gene replacement', description: 'Gene replacement and humanization strategies.', url: '/gene-replacement', category: 'Services' },
  { title: 'Doxycycline inducible systems', description: 'Tet on Tet off inducible gene expression.', url: '/doxycycline-inducible-systems', category: 'Technology' },
  { title: 'Conditional knockin mice', description: 'Conditional knockin for tissue specific expression.', url: '/conditional-knockin-mice', category: 'Services' },
  { title: 'Tumor suppressor knockout mice', description: 'Tumor suppressor gene knockout models for oncology.', url: '/tumor-suppressor-knockout-mice', category: 'Catalog' },
  { title: 'Humanization strategy guide', description: 'Guide to humanization strategy selection.', url: '/humanization-strategy-guide', category: 'Resources' },
  {
    title: 'Knockout strategy guide',
    description: 'Guide to knockout strategy and design.',
    url: '/knockout-strategy-guide',
    category: 'Resources',
  },
  {
    title: 'Cre recombinase mouse lines',
    description: 'Cre strains for conditional targeting. Mate with floxed alleles for tissue knockout.',
    url: '/cre-recombinase-mice',
    category: 'Catalog',
    keywords: ['Cre recombinase', 'Cre mouse', 'flox crossing', 'tissue knockout'],
  },
  {
    title: 'loxP site design guide',
    description: 'loxP flank layout for conditional alleles.',
    url: '/loxp-site-design',
    category: 'Resources',
    keywords: ['loxP', 'flox allele', 'Cre conditional'],
  },
  {
    title: 'Critical exon selection guide',
    description: 'Choosing critical exons for conditional knockout design.',
    url: '/critical-exon-selection',
    category: 'Resources',
    keywords: ['critical exon', 'floxed', 'Cre lox'],
  },
  {
    title: 'Tissue specific Cre driver lines',
    description: 'Cre drivers for liver, brain, immune subsets, heart, intestine, kidney, microglia, and skin.',
    url: '/tissue-specific-cre-lines',
    category: 'Services',
    keywords: [...TISSUE_KW_EXTRA],
  },
  {
    title: 'Rosa26 targeting',
    description: 'Rosa26 safe harbor knockin insertion for reporters and lineage tracing.',
    url: '/rosa26',
    category: 'Technology',
    keywords: ['safe harbor', 'Rosa26 lineage', 'reporter cassette'],
  },
  {
    title: 'Tamoxifen inducible Cre systems',
    description: 'CreERT2 and MerCreMer approaches for temporal control.',
    url: '/tamoxifen-inducible-cre',
    category: 'Technology',
    keywords: ['CreERT2', 'MerCreMer', '4-OHT', 'tamoxifen inducible'],
  },
  { title: 'Current openings', description: 'Career opportunities at ingenious targeting laboratory.', url: '/current-openings', category: 'Company' },
  ...labSignalsEntries,
  ...blogEntries,
];

function entryHaystack(item: SiteIndexEntry): string {
  const kw = (item.keywords ?? []).join(' ');
  return `${item.title} ${item.description} ${item.category} ${kw}`.toLowerCase().replace(/\//g, ' ');
}

/** Normalize query for scientific terms: "Cre/lox" -> "cre lox" */
function normalizeSearchTerm(t: string): string {
  return t.replace(/\//g, ' ').trim();
}

function tokenizeQuery(term: string): string[] {
  return term
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeSearchTerm);
}

/** Tokens kept for substring ranking; filler dropped only when substitutes remain */
function meaningfulTokensForMatch(term: string): string[] {
  const tokens = tokenizeQuery(term);
  const filtered = tokens.filter((tok) => {
    const plain = tok.replace(/[^a-z0-9-]/g, '');
    return plain.length > 0 && !FILLER_STOPWORDS.has(plain);
  });
  return filtered.length > 0 ? filtered : tokens;
}

function cloneEntry(entry: SiteIndexEntry, url: string): SiteIndexEntry {
  return { ...entry, url };
}

function lookupBasePath(pathOnly: string): SiteIndexEntry | undefined {
  return siteIndex.find((e) => e.url.split('?')[0] === pathOnly.split('?')[0]);
}

function pinnedFromParsed(parsed: ParsedQuery): SiteIndexEntry[] {
  const pinned: SiteIndexEntry[] = [];

  const bump = (url: string, fallback?: Partial<SiteIndexEntry>) => {
    if (pinned.some((p) => p.url === url)) return;
    const base = lookupBasePath(url);
    if (base) {
      pinned.push(cloneEntry(base, url));
      return;
    }
    pinned.push({
      title: fallback?.title ?? 'Suggested page',
      description: fallback?.description ?? '',
      url,
      category: fallback?.category ?? 'Pages',
      keywords: fallback?.keywords ?? [],
    });
  };

  const modHits = allMatchingModificationPatterns(parsed.cleaned);
  for (const p of [...new Set(modHits.map((m) => m.fallbackPage))]) {
    bump(p);
  }

  if (parsed.tissueCellCandidates.length > 0 && parsed.geneCandidates.length === 0) {
    const t = parsed.tissueCellCandidates[0]!;
    bump(`/tissue-specific-knockout?tissue=${encodeURIComponent(t)}`);
    bump(`/tissue-specific-cre-lines?tissue=${encodeURIComponent(t)}`);
  }

  if (parsed.modifiers.includes('inducible') || /\b(tamoxifen|creert2)\b/i.test(parsed.cleaned)) {
    bump('/tamoxifen-inducible-cre');
    bump('/inducible-conditional-knockout');
  }

  if (/\b(cre[\s-]?conditional|floxed|\bloxp\b|flox\b)\b/i.test(parsed.cleaned)) {
    bump('/conditional-knockout-mouse-models');
    bump('/cre-lox-system');
    bump('/loxp-site-design');
    bump('/critical-exon-selection');
  }

  if (parsed.geneCandidates.length === 0 && parsed.creDriverCandidates.length > 0) {
    bump(`/cre-line-selection-guide?driver=${encodeURIComponent(parsed.creDriverCandidates[0]!)}`);
  }

  if (parsed.geneCandidates.length > 0 && parsed.creDriverCandidates.length > 0) {
    const g = parsed.geneCandidates[0]!;
    const d = parsed.creDriverCandidates[0]!;
    bump(`/cre-line-selection-guide?driver=${encodeURIComponent(d)}&gene=${encodeURIComponent(g)}`);
    if (parsed.tissueCellCandidates[0]) {
      const t = parsed.tissueCellCandidates[0]!;
      bump(`/tissue-specific-knockout?tissue=${encodeURIComponent(t)}&gene=${encodeURIComponent(g)}`);
    }
  }

  return pinned;
}

export interface SiteSearchOptions {
  parsed?: ParsedQuery;
}

export function searchSiteIndex(
  query: string,
  maxResults = 8,
  opts?: SiteSearchOptions
): SiteIndexEntry[] {
  const term = query.toLowerCase().trim();
  if (!term) return [];

  const meaningful = meaningfulTokensForMatch(term);

  const baseFiltered = siteIndex.filter((item) =>
    meaningful.every((tok) => entryHaystack(item).includes(tok))
  );

  const pins = opts?.parsed ? pinnedFromParsed(opts.parsed) : [];
  const merged: SiteIndexEntry[] = [];
  const seen = new Set<string>();

  for (const p of pins) {
    if (!seen.has(p.url)) {
      seen.add(p.url);
      merged.push(p);
    }
  }
  for (const b of baseFiltered) {
    if (!seen.has(b.url)) {
      seen.add(b.url);
      merged.push(b);
    }
  }

  return merged.slice(0, maxResults);
}
