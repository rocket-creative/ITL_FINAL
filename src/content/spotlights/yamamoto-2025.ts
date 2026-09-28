import type { Spotlight } from './_schema';

export const yamamoto2025: Spotlight = {
  slug: 'yamamoto-2025',
  spotlightNumber: 'No. 001',
  publishDate: '2026-06-01',
  status: 'published',

  featureTag: "Neurodegeneration · Huntington's Disease",
  title: 'A Single Variant That <em>Delays</em> the Inevitable',
  subtitle:
    "Inside the Yamamoto lab's arc from a Venezuelan pedigree to a shared therapeutic target across Huntington's, Parkinson's, and tauopathies, and the point mutation knockin that recapitulated 23 years of protection in a mouse.",

  piName: 'Ai Yamamoto, PhD',
  piFirstName: 'Ai',
  piLastName: 'Yamamoto',
  institution: 'Columbia University',
  institutionLink: 'https://www.neurology.columbia.edu/profile/ai-yamamoto-phd',
  labBio: `Ai Yamamoto, PhD is Associate Professor of Neurology and Pathology & Cell Biology at Columbia University. The Yamamoto lab studies the role of autophagy in neurodegeneration, with a focus on selective autophagy pathways and their potential as therapeutic targets across Huntington's, Parkinson's, and related proteinopathies.`,
  collaborators: `The work was conducted in collaboration with Nancy Wexler (Columbia, Hereditary Disease Foundation), whose decades of work on the Venezuelan Huntington's pedigree made the underlying human genetics possible, along with teams at MIT, Stanford, UCLA, the University of Oslo, and the New York Genome Center.`,

  paperTitle:
    'A rare genetic variant confers resistance to neurodegeneration across multiple neurological disorders by augmenting selective autophagy',
  paperCitation:
    'Croce KR, Ng C, Pankiv S, Albarran E, Langfelder P, Ramos de Jesus A, et al. A rare genetic variant confers resistance to neurodegeneration across multiple neurological disorders by augmenting selective autophagy. <em>Neuron</em>. 2025 Nov 19;113(22):3780-3797.e7.',
  journal: 'Neuron',
  journalYear: 'Neuron, November 2025',
  pubmedId: '40945514',
  pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/40945514/',
  doi: '10.1016/j.neuron.2025.08.018',
  doiUrl: 'https://doi.org/10.1016/j.neuron.2025.08.018',
  pullQuote: 'A shared therapeutic target across a broad range of neurodegenerative diseases.',
  funding:
    'NIH NINDS (R01 NS113612, NS101663, NS103037, NS077111, NS089076, NS091144, NS127186), NIA (R01 AG090542), NINDS Program Project (P01 NS092525), plus additional support.',

  modelType: 'knockin',
  modelTypeDisplay: 'Point mutation knockin + Rosa26 cDNA knockin',
  modelTypePageUrl: '/knockin-mouse-models/',
  therapeuticArea: 'neuroscience',
  modelDetails: [
    { label: 'Model Type', value: 'Point mutation knockin + Rosa26 cDNA knockin (hALFY)' },
    { label: 'Target Gene', value: '<em>Wdfy3</em> (orthologous to human <em>WDFY3</em>)' },
    {
      label: 'Strategy',
      value:
        'Introduce orthologous SNP (A to G) into exon 57 of murine <em>Wdfy3</em>; separate Rosa26 knockin for ectopic hALFY overexpression',
    },
    {
      label: 'Background',
      value:
        'C57BL/6 for <em>Wdfy3</em> variant; Bl6/129Sv for Rosa26 knockin; crossed onto Q140, N171-82Q, and PS19 disease model backgrounds',
    },
    {
      label: 'Validation',
      value:
        'RT-qPCR and immunoblot confirmed elevated <em>Wdfy3</em> transcript and ALFY protein; germline transmitting cohorts used in all comparisons',
    },
    { label: 'Therapeutic Area', value: 'Neurodegeneration, proteinopathy, selective autophagy' },
  ],

  bodyIntro: `Huntington's disease is one of the most mechanistically well defined neurodegenerative disorders in medicine. The CAG repeat expansion in HTT is the cause. The age at which symptoms appear, however, varies significantly across patients with similar repeat lengths. Something else is going on.

Working from a Venezuelan pedigree, the Yamamoto lab at Columbia, with collaborators at MIT, Stanford, UCLA, the University of Oslo, and the New York Genome Center, identified a rare single nucleotide polymorphism in <em>WDFY3</em> associated with an onset delay of up to 23 years in carriers.

The next question was whether the variant itself was causal, or merely correlated with protection. Answering that required moving from human genetics to a mouse model with the exact variant introduced at the orthologous position.`,

  bodyTheModel: `Ingenious targeting laboratory generated the <strong>point mutation knockin</strong> introducing the orthologous SNP into the endogenous mouse <em>Wdfy3</em> locus. The team also built a <strong>Rosa26 cDNA knockin</strong> overexpressing human ALFY, the protein encoded by WDFY3. Both models were generated on a C57BL/6 background.

The point mutation strategy was the critical piece. A transgenic would have introduced the variant at a random locus with variable expression; a straight knockout would have told them nothing about the SNP specifically. The knockin preserved endogenous regulation and made the resulting phenotype directly attributable to the variant.`,

  bodyTheResult: `Both models recapitulated the human phenotype. Mice carrying the variant showed delayed neuropathological and behavioral dysfunction in two independent Huntington's models (Q140 and N171-82Q). Ectopic overexpression of hALFY from the Rosa26 locus produced the same neuroprotective effect, which was the mechanistic proof that elevated ALFY expression was the operative change.

Then the study expanded. The same Alfy elevation protected against phospho-α-synuclein accumulation in a Parkinson's PFF model and AT8-positive tau pathology in the PS19 tauopathy model. What started as a Huntington's modifier ended as a candidate therapeutic target across multiple proteinopathies.`,

  bodyWhyItMatters: `Huntington's, Parkinson's, and Alzheimer's have historically been studied as separate diseases. This work, grounded in a natural human variant and validated in mouse models that preserved endogenous regulation, identified a single pathway whose augmentation provides protection across all three. The translational implication is significant: one therapeutic target, multiple disease contexts.`,

  metaTitle:
    'Researcher Spotlight: Ai Yamamoto, Columbia University | ingenious targeting laboratory',
  metaDescription:
    "How the Yamamoto lab at Columbia used an ingenious targeting laboratory point mutation knockin and Rosa26 knockin to uncover a shared therapeutic target across Huntington's, Parkinson's, and tauopathies.",
};
