/**
 * Service and FAQPage JSON-LD for /mouse-breeding-services.
 * Emitted from the server layout so both nodes are in the initial HTML.
 */

import { buildFAQSchema, buildServiceSchema } from '@/lib/seo/schemaBlocks';

export const BREEDING_PAGE_PATH = '/mouse-breeding-services';

export const breedingFaqData = [
  {
    question: 'Can I outsource my mouse breeding to ingenious targeting laboratory?',
    answer:
      'Yes. We provide contract mouse breeding for genetically engineered lines, including colony maintenance, cohort production, complex multi allele schemes, and rapid expansion, from a U.S. barrier facility with in house PCR genotyping.',
  },
  {
    question: 'Do you breed lines you did not create?',
    answer:
      'Yes. Most contract breeding clients send us lines generated elsewhere or obtained from a repository. We review the allele and the genotyping assay on intake.',
  },
  {
    question: 'How do I transfer my mouse line to your facility?',
    answer:
      'Lines can be shipped as live animals with health certification or as cryopreserved embryos or sperm. All incoming animals are quarantined and health tested before entering the main colony. We coordinate logistics with your institutional vivarium.',
  },
  {
    question: 'Who owns the line and the data?',
    answer:
      'You do. We breed and maintain the colony under contract. Animals, pedigree, and genotype records belong to you and are returned or shipped on request.',
  },
  {
    question: 'What does contract mouse breeding cost?',
    answer:
      'Pricing depends on colony size, genotype complexity, genotyping volume, and whether you need maintenance only or scaled cohort production. We quote per project after a scheme review. There is no charge for the initial consultation.',
  },
  {
    question: 'Can you manage conditional knockout breeding with Cre drivers?',
    answer:
      'Yes. We design the cross path, check for linkage between the floxed allele and the Cre transgene, and produce experimental animals with matched littermate controls.',
  },
  {
    question: 'How is my colony reported?',
    answer:
      'Monthly, covering census by genotype and sex, litters born and weaned, genotype distribution against expected ratios, pair productivity, and projected availability against your target date.',
  },
  {
    question: 'What happens if my line stops breeding?',
    answer:
      'We review pair productivity continuously and flag decline early. Options include pair rotation, increasing pair count, and rederivation. Discuss known fertility problems with us during scoping so the scheme accounts for them.',
  },
];

export const breedingServiceSchema = buildServiceSchema({
  name: 'Mouse Breeding Services',
  path: BREEDING_PAGE_PATH,
  serviceType: 'Contract mouse breeding',
  description:
    'Contract breeding of genetically engineered mouse lines from a U.S. barrier facility, including colony maintenance, cohort production, multi allele breeding schemes, PCR genotyping, health monitoring, and monthly colony reporting.',
  alternateName: [
    'Contract colony breeding',
    'Contract mouse breeding',
    'Outsourced mouse colony management',
    'GEM colony management',
  ],
  keywords:
    'mouse breeding services, contract mouse breeding, contract colony breeding, outsource mouse breeding, mouse colony management, GEM colony management, mouse colony husbandry, genetically engineered mouse breeding, PCR genotyping service',
  audienceType: 'Academic laboratories, biotechnology companies, preclinical drug discovery teams',
  offerCatalogName: 'Contract breeding scopes',
  offerCatalog: [
    { name: 'Colony maintenance', path: '/colony-management-services/' },
    { name: 'Cohort production', path: '/mouse-cohort-development/' },
    { name: 'Speed expansion breeding', path: '/speed-expansion-breeding/' },
    { name: 'Backcrossing to defined background', path: '/backcrossing-services/' },
    { name: 'Rederivation', path: '/rederivation-services/' },
    { name: 'Cryopreservation', path: '/cryopreservation-services/' },
  ],
});

export const breedingFaqSchema = buildFAQSchema(BREEDING_PAGE_PATH, breedingFaqData);
