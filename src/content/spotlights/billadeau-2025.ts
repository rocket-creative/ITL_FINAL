import type { Spotlight } from './_schema';

export const billadeau2025: Spotlight = {
  slug: 'billadeau-2025',
  spotlightNumber: 'No. 003',
  publishDate: '2026-08-01',
  status: 'published',

  featureTag: 'Oncology · Tumor Immunology',
  title: 'A Lysosomal Brake That <em>Sustains</em> Anti-Tumor Immunity',
  subtitle:
    'Inside the Billadeau lab at Mayo Clinic, where a knockout mouse reveals how lysosomal NKG7 restrains mTORC1 to preserve CD8 T cell durability and the capacity to control tumors over time.',

  piName: 'Daniel D. Billadeau, PhD',
  piFirstName: 'Daniel',
  piLastName: 'Billadeau',
  institution: 'Mayo Clinic',
  institutionLink:
    'https://www.mayo.edu/research/faculty/billadeau-daniel-d-ph-d/bio-00027265',
  labBio: `Daniel D. Billadeau, PhD is Professor of Immunology at Mayo Clinic. The Billadeau lab studies the intracellular signaling and trafficking pathways that shape T cell and NK cell function, with a focus on translational opportunities in immuno oncology.`,
  collaborators: '',

  paperTitle:
    'Lysosomal NKG7 restrains mTORC1 activity to promote CD8+ T cell durability and tumor control',
  paperCitation:
    'Ham H, Hirdler JB, Bihnam DT, Mao Z, Gicobi JK, Macedo BG, et al. Lysosomal NKG7 restrains mTORC1 activity to promote CD8+ T cell durability and tumor control. <em>Nat Commun</em>. 2025;16(1):1628.',
  journal: 'Nature Communications',
  journalYear: 'Nature Communications, 2025',
  pubmedId: '39952956',
  pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/39952956/',
  doi: '10.1038/s41467-025-56923-8',
  doiUrl: 'https://doi.org/10.1038/s41467-025-56923-8',
  pullQuote: 'Lysosomal NKG7 restrains mTORC1 to sustain CD8 T cell durability and tumor control.',
  funding: 'NIH NCI, plus additional support (full funding to be confirmed from paper).',

  modelType: 'knockout',
  modelTypeDisplay: 'NKG7 knockout',
  modelTypePageUrl: '/knockout-mouse-models/',
  therapeuticArea: 'oncology',
  modelDetails: [
    { label: 'Model Type', value: 'Knockout (confirm conventional vs conditional from Methods)' },
    { label: 'Target Gene', value: '<em>Nkg7</em> (orthologous to human <em>NKG7</em>)' },
    {
      label: 'Strategy',
      value:
        'Loss of function allele at the endogenous <em>Nkg7</em> locus, profiled in CD8 T cells and in tumor bearing cohorts',
    },
    { label: 'Background', value: 'C57BL/6' },
    {
      label: 'Validation',
      value:
        'Deletion confirmed at the protein level; immune cell populations and tumor growth kinetics compared against littermate controls (verify specifics from Methods)',
    },
    { label: 'Therapeutic Area', value: 'Immuno oncology, CD8 T cell biology, mTORC1 signaling' },
  ],

  bodyIntro: '',
  bodyTheModel: '',
  bodyTheResult: '',
  bodyWhyItMatters: '',

  metaTitle:
    'Researcher Spotlight: Daniel Billadeau, Mayo Clinic | ingenious targeting laboratory',
  metaDescription:
    'How the Billadeau lab at Mayo Clinic used an NKG7 knockout to show how a lysosomal brake on mTORC1 sustains CD8 T cell durability and tumor control.',
};
