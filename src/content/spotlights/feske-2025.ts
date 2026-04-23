import type { Spotlight } from './_schema';

export const feske2025: Spotlight = {
  slug: 'feske-2025',
  spotlightNumber: 'No. 002',
  publishDate: '2026-07-01',
  status: 'published',

  featureTag: 'Immunology · Autoimmunity',
  title: 'The Splicing Factor That <em>Safeguards</em> the T Cell',
  subtitle:
    'How a T cell specific deletion of CLNS1A reveals a previously unrecognized control point for genome stability, cell cycle progression, and the boundary between healthy immunity and autoimmunity.',

  piName: 'Stefan Feske, MD',
  piFirstName: 'Stefan',
  piLastName: 'Feske',
  institution: 'NYU Grossman School of Medicine',
  institutionLink: 'https://med.nyu.edu/faculty/stefan-feske',
  labBio: `Stefan Feske, MD is Professor of Pathology at NYU Grossman School of Medicine. The Feske lab studies calcium signaling, gene expression, and cell cycle control in T cells, with a translational focus on primary immunodeficiency and autoimmune disease.`,
  collaborators: '',

  paperTitle:
    'CLNS1A regulates genome stability and cell cycle progression to control CD4 T cell function and autoimmunity',
  paperCitation:
    'Wang L, Noyer L, Jishage M, Wang YH, Tao AY, McDermott M, et al. CLNS1A regulates genome stability and cell cycle progression to control CD4 T cell function and autoimmunity. <em>Sci Immunol</em>. 2025;10(108):eadq8860.',
  journal: 'Science Immunology',
  journalYear: 'Science Immunology, 2025',
  pubmedId: '40540585',
  pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/40540585/',
  doi: '10.1126/sciimmunol.adq8860',
  doiUrl: 'https://doi.org/10.1126/sciimmunol.adq8860',
  pullQuote: 'CLNS1A is essential for genome stability and CD4 T cell function.',
  funding: 'NIH NIAID, plus additional support (full funding to be confirmed from paper).',

  modelType: 'conditional_knockout',
  modelTypeDisplay: 'Conditional knockout (T cell specific)',
  modelTypePageUrl: '/conditional-knockout-mouse-models/',
  therapeuticArea: 'immunology',
  modelDetails: [
    { label: 'Model Type', value: 'Conditional knockout (T cell specific deletion)' },
    { label: 'Target Gene', value: '<em>Clns1a</em> (orthologous to human <em>CLNS1A</em>)' },
    {
      label: 'Strategy',
      value:
        'Floxed <em>Clns1a</em> allele crossed to CD4-Cre to restrict deletion to CD4 T cells while preserving expression in other lineages',
    },
    { label: 'Background', value: 'C57BL/6' },
    {
      label: 'Validation',
      value:
        'Deletion confirmed at the protein level in sorted CD4 T cells; litter matched controls used in all comparisons (verify specifics from Methods)',
    },
    { label: 'Therapeutic Area', value: 'Autoimmunity, T cell biology, genome stability' },
  ],

  bodyIntro: '',
  bodyTheModel: '',
  bodyTheResult: '',
  bodyWhyItMatters: '',

  metaTitle:
    'Researcher Spotlight: Stefan Feske, NYU Grossman School of Medicine | ingenious targeting laboratory',
  metaDescription:
    'How the Feske lab at NYU used a T cell specific conditional knockout to place CLNS1A at the intersection of genome stability, cell cycle control, and autoimmunity.',
};
