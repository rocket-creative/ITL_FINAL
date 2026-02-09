/**
 * Breeding Scheme Architect - Type Definitions
 */

export type AlleleType =
  | 'conventional-knockout'
  | 'conditional-knockout'
  | 'cre-constitutive'
  | 'cre-inducible'
  | 'reporter-fluorescent'
  | 'reporter-lacz'
  | 'knockin-point-mutation'
  | 'knockin-cdna'
  | 'humanized';

export type StartingGenotype = 'homozygous' | 'heterozygous' | 'hemizygous';

export type AlleleState = 'homozygous' | 'heterozygous' | 'wildtype' | 'hemizygous';

export type SexRequirement = 'any' | 'male' | 'female' | 'balanced';

export interface Allele {
  id: string;
  geneName: string;
  alleleType: AlleleType;
  startingGenotype: StartingGenotype;
  chromosome?: string;
}

export interface TargetGenotype {
  id: string;
  label: string;
  isExperimental: boolean;
  alleleStates: Record<string, AlleleState>;
  numberNeeded: number;
  sexRequirement: SexRequirement;
}

export interface OffspringOutcome {
  genotype: Record<string, AlleleState>;
  probability: number;
  label: string;
  category: 'keeper' | 'experimental' | 'control' | 'cull';
}

export interface BreedingCross {
  parentA: Record<string, AlleleState>;
  parentB: Record<string, AlleleState>;
  parentALabel: string;
  parentBLabel: string;
}

export interface BreedingGeneration {
  number: number;
  cross: BreedingCross;
  offspringRatios: OffspringOutcome[];
  purpose: string;
}

export interface BreedingPlan {
  generations: BreedingGeneration[];
  totalGenerations: number;
  estimatedBreedingPairs: number;
  estimatedTotalMice: number;
  estimatedWeeks: number;
  targetGenotypeFrequency: number;
  warnings: string[];
  micePerGenotype: Record<string, number>;
}

export interface BreedingParameters {
  averageLitterSize: number;
  lowerEndLitterSize: number; // Conservative estimate for planning
  breedingEfficiency: number;
  weeksPerGeneration: number;
}

export const DEFAULT_BREEDING_PARAMS: BreedingParameters = {
  averageLitterSize: 7, // C57BL/6 average (6-8 pups per litter)
  lowerEndLitterSize: 6, // Conservative lower-end estimate for resource planning
  breedingEfficiency: 0.8, // 80% of breeding pairs successfully produce litters
  weeksPerGeneration: 9, // 3 weeks gestation + 3 weeks weaning + 3 weeks to breeding age
};

export const ALLELE_TYPE_LABELS: Record<AlleleType, string> = {
  'conventional-knockout': 'Conventional Knockout',
  'conditional-knockout': 'Conditional Knockout (floxed)',
  'cre-constitutive': 'Cre Driver (constitutive)',
  'cre-inducible': 'Cre Driver (inducible)',
  'reporter-fluorescent': 'Reporter (fluorescent)',
  'reporter-lacz': 'Reporter (LacZ)',
  'knockin-point-mutation': 'Knockin (point mutation)',
  'knockin-cdna': 'Knockin (cDNA)',
  'humanized': 'Humanized',
};

export const GENOTYPE_LABELS: Record<StartingGenotype, string> = {
  homozygous: 'Homozygous',
  heterozygous: 'Heterozygous',
  hemizygous: 'Hemizygous',
};

export const SEX_REQUIREMENT_LABELS: Record<SexRequirement, string> = {
  any: 'Any',
  male: 'Male only',
  female: 'Female only',
  balanced: 'Balanced (equal male and female)',
};
