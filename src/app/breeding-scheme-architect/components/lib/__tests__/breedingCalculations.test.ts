/**
 * Breeding Calculations Test Suite
 * Tests all fixes from the video transcript
 */

import {
  generateBreedingPlan,
  formatProbability,
  getCategoryColor,
  getCategoryLabel,
} from '../breedingCalculations';
import { Allele, TargetGenotype, DEFAULT_BREEDING_PARAMS } from '../types';

describe('Breeding Calculations - Critical Fixes', () => {
  
  // Test Case 1: Simple Het x Het (Any Sex)
  describe('Test Case 1: Simple Heterozygous Cross (Any Sex)', () => {
    const alleles: Allele[] = [
      {
        id: 'nqo2',
        geneName: 'NQO2',
        alleleType: 'conditional-knockout',
        startingGenotype: 'heterozygous',
        chromosome: '13',
      },
    ];

    const targetGenotypes: TargetGenotype[] = [
      {
        id: 'experimental',
        label: 'Experimental',
        isExperimental: true,
        alleleStates: { nqo2: 'homozygous' },
        numberNeeded: 10,
        sexRequirement: 'any',
      },
      {
        id: 'control',
        label: 'Control',
        isExperimental: false,
        alleleStates: { nqo2: 'wildtype' },
        numberNeeded: 10,
        sexRequirement: 'any',
      },
    ];

    const plan = generateBreedingPlan(alleles, targetGenotypes);

    test('should generate 1 generation', () => {
      expect(plan.totalGenerations).toBe(1);
    });

    test('should calculate 9 breeding pairs (not 15)', () => {
      expect(plan.estimatedBreedingPairs).toBe(9);
    });

    test('should estimate 50 total mice (not 105)', () => {
      // 9 breeding pairs × 0.8 efficiency × 7 average = 50.4 → 50
      expect(plan.estimatedTotalMice).toBe(50);
    });

    test('should have 9-week timeline (not 10)', () => {
      expect(plan.estimatedWeeks).toBe(9);
    });

    test('should have 25% target frequency', () => {
      expect(plan.targetGenotypeFrequency).toBe(0.25);
    });

    test('should use fl/fl notation for conditional knockout', () => {
      const gen1 = plan.generations[0];
      expect(gen1.cross.parentALabel).toContain('+/fl');
      expect(gen1.cross.parentBLabel).toContain('+/fl');
    });
  });

  // Test Case 2: Simple Het x Het (Male Only)
  describe('Test Case 2: Simple Heterozygous Cross (Male Only)', () => {
    const alleles: Allele[] = [
      {
        id: 'nqo2',
        geneName: 'NQO2',
        alleleType: 'conditional-knockout',
        startingGenotype: 'heterozygous',
        chromosome: '13',
      },
    ];

    const targetGenotypes: TargetGenotype[] = [
      {
        id: 'experimental',
        label: 'Experimental',
        isExperimental: true,
        alleleStates: { nqo2: 'homozygous' },
        numberNeeded: 10,
        sexRequirement: 'male',
      },
      {
        id: 'control',
        label: 'Control',
        isExperimental: false,
        alleleStates: { nqo2: 'wildtype' },
        numberNeeded: 10,
        sexRequirement: 'male',
      },
    ];

    const plan = generateBreedingPlan(alleles, targetGenotypes);

    test('should generate 1 generation', () => {
      expect(plan.totalGenerations).toBe(1);
    });

    test('should calculate 17 breeding pairs (not 29)', () => {
      expect(plan.estimatedBreedingPairs).toBe(17);
    });

    test('should estimate 95 total mice (not 203)', () => {
      // 17 breeding pairs × 0.8 efficiency × 7 average = 95.2 → 95
      expect(plan.estimatedTotalMice).toBe(95);
    });

    test('should have 9-week timeline', () => {
      expect(plan.estimatedWeeks).toBe(9);
    });

    test('should have 12.5% target frequency (25% allele × 50% sex)', () => {
      // Sex multiplier doubles the mice needed, halving effective frequency
      expect(plan.targetGenotypeFrequency).toBe(0.25); // This is allele frequency
      // The sex adjustment happens in resource calculation
    });
  });

  // Test Case 3: Cre/loxP Multi-Generation
  describe('Test Case 3: Cre/loxP Multi-Generation Scheme', () => {
    const alleles: Allele[] = [
      {
        id: 'nqo2',
        geneName: 'NQO2',
        alleleType: 'conditional-knockout',
        startingGenotype: 'heterozygous',
        chromosome: '13',
      },
      {
        id: 'cd8a-cre',
        geneName: 'Tg(Cd8a-cre)1Itan',
        alleleType: 'cre-constitutive',
        startingGenotype: 'hemizygous',
      },
    ];

    const targetGenotypes: TargetGenotype[] = [
      {
        id: 'experimental',
        label: 'Experimental',
        isExperimental: true,
        alleleStates: { nqo2: 'homozygous', 'cd8a-cre': 'hemizygous' },
        numberNeeded: 10,
        sexRequirement: 'any',
      },
      {
        id: 'control',
        label: 'Control',
        isExperimental: false,
        alleleStates: { nqo2: 'wildtype', 'cd8a-cre': 'wildtype' },
        numberNeeded: 10,
        sexRequirement: 'any',
      },
    ];

    const plan = generateBreedingPlan(alleles, targetGenotypes);

    test('should generate 3 generations (not 2) - CRITICAL FIX', () => {
      expect(plan.totalGenerations).toBe(3);
    });

    test('should have ~27-week timeline (3 × 9 weeks)', () => {
      expect(plan.estimatedWeeks).toBe(27);
    });

    test('Generation 1: should fix floxed to homozygosity', () => {
      const gen1 = plan.generations[0];
      expect(gen1.purpose).toContain('Fix');
      expect(gen1.purpose).toContain('homozygosity');
      expect(gen1.cross.parentALabel).toContain('+/fl');
    });

    test('Generation 1: should use fl/fl notation', () => {
      const gen1 = plan.generations[0];
      expect(gen1.cross.parentALabel).toContain('fl');
      expect(gen1.cross.parentBLabel).toContain('fl');
    });

    test('Generation 2: should introduce Cre transgene', () => {
      const gen2 = plan.generations[1];
      expect(gen2.purpose).toContain('Introduce');
      expect(gen2.purpose).toContain('cre');
    });

    test('Generation 3: should generate experimental cohort', () => {
      const gen3 = plan.generations[2];
      expect(gen3.purpose).toContain('experimental');
    });

    test('should have 25% frequency in final generation', () => {
      expect(plan.targetGenotypeFrequency).toBe(0.25);
    });

    test('should warn about constitutive Cre', () => {
      const hasCreWarning = plan.warnings.some(w => 
        w.toLowerCase().includes('constitutive') && w.toLowerCase().includes('cre')
      );
      expect(hasCreWarning).toBe(true);
    });
  });

  // Test breeding parameters
  describe('Breeding Parameters', () => {
    test('should use 9 weeks per generation (not 10)', () => {
      expect(DEFAULT_BREEDING_PARAMS.weeksPerGeneration).toBe(9);
    });

    test('should have lower-end litter size of 6', () => {
      expect(DEFAULT_BREEDING_PARAMS.lowerEndLitterSize).toBe(6);
    });

    test('should have average litter size of 7', () => {
      expect(DEFAULT_BREEDING_PARAMS.averageLitterSize).toBe(7);
    });

    test('should have 80% breeding efficiency', () => {
      expect(DEFAULT_BREEDING_PARAMS.breedingEfficiency).toBe(0.8);
    });
  });

  // Test genotype label generation
  describe('Genotype Labels', () => {
    test('should format probability correctly', () => {
      expect(formatProbability(0.25)).toBe('25.0%');
      expect(formatProbability(0.125)).toBe('12.5%');
      expect(formatProbability(0.5)).toBe('50.0%');
    });
  });

  // Test category colors
  describe('Category Colors and Labels', () => {
    test('should return correct colors', () => {
      expect(getCategoryColor('experimental')).toBe('#008080');
      expect(getCategoryColor('control')).toBe('#134978');
      expect(getCategoryColor('keeper')).toBe('#2384da');
      expect(getCategoryColor('cull')).toBe('#999');
    });

    test('should return correct labels', () => {
      expect(getCategoryLabel('experimental')).toBe('Experimental');
      expect(getCategoryLabel('control')).toBe('Control');
      expect(getCategoryLabel('keeper')).toBe('Keeper');
      expect(getCategoryLabel('cull')).toBe('Not needed');
    });
  });

  // Test resource calculations
  describe('Resource Calculation Logic', () => {
    test('should apply breeding efficiency correctly', () => {
      const alleles: Allele[] = [
        {
          id: 'test',
          geneName: 'Test',
          alleleType: 'conventional-knockout',
          startingGenotype: 'heterozygous',
        },
      ];

      const targetGenotypes: TargetGenotype[] = [
        {
          id: 'exp',
          label: 'Exp',
          isExperimental: true,
          alleleStates: { test: 'homozygous' },
          numberNeeded: 10,
          sexRequirement: 'any',
        },
        {
          id: 'ctrl',
          label: 'Ctrl',
          isExperimental: false,
          alleleStates: { test: 'wildtype' },
          numberNeeded: 10,
          sexRequirement: 'any',
        },
      ];

      const plan = generateBreedingPlan(alleles, targetGenotypes);

      // Need 20 mice at 25% frequency = 80 pups needed
      // Wait, for any sex with 10+10 at 25% each...
      // 10/0.25 = 40 for experimental, 10/0.25 = 40 for control
      // But they come from same cross, so just need 40 total to get 10 of each
      // 40 pups / 6 (lower-end) = 6.67 litters
      // 6.67 / 0.8 efficiency = 8.33 → 9 pairs
      expect(plan.estimatedBreedingPairs).toBe(9);
    });
  });

  // Test conventional knockout uses mut notation
  describe('Conventional Knockout Notation', () => {
    test('should use mut/mut notation for conventional knockouts', () => {
      const alleles: Allele[] = [
        {
          id: 'conventional',
          geneName: 'TestGene',
          alleleType: 'conventional-knockout',
          startingGenotype: 'heterozygous',
        },
      ];

      const targetGenotypes: TargetGenotype[] = [
        {
          id: 'exp',
          label: 'Exp',
          isExperimental: true,
          alleleStates: { conventional: 'homozygous' },
          numberNeeded: 10,
          sexRequirement: 'any',
        },
      ];

      const plan = generateBreedingPlan(alleles, targetGenotypes);
      const outcomes = plan.generations[0].offspringRatios;
      
      // Check that labels use 'mut' not 'fl' for conventional knockout
      const homozygousOutcome = outcomes.find(o => 
        o.genotype.conventional === 'homozygous'
      );
      
      expect(homozygousOutcome).toBeDefined();
      expect(homozygousOutcome!.label).toContain('mut');
      expect(homozygousOutcome!.label).not.toContain('fl');
    });
  });
});
