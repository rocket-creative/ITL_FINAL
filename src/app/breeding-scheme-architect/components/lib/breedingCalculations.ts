/**
 * Breeding Scheme Architect - Calculation Engine
 * Mendelian genetics calculations for multi-allele breeding schemes
 */

import {
  Allele,
  AlleleState,
  TargetGenotype,
  BreedingPlan,
  BreedingGeneration,
  OffspringOutcome,
  BreedingParameters,
  DEFAULT_BREEDING_PARAMS,
} from './types';

/**
 * Calculate Mendelian ratios for a single allele cross
 */
function calculateSingleAlleleCross(
  parentA: AlleleState,
  parentB: AlleleState
): Record<AlleleState, number> {
  // Standard Punnett square logic
  const results: Record<AlleleState, number> = {
    homozygous: 0,
    heterozygous: 0,
    wildtype: 0,
    hemizygous: 0,
  };

  // Handle hemizygous (X-linked or transgene) separately
  if (parentA === 'hemizygous' || parentB === 'hemizygous') {
    // Simplified: treat as 50% positive, 50% negative
    results.hemizygous = 0.5;
    results.wildtype = 0.5;
    return results;
  }

  // Standard autosomal inheritance
  if (parentA === 'homozygous' && parentB === 'homozygous') {
    results.homozygous = 1.0;
  } else if (parentA === 'homozygous' && parentB === 'heterozygous') {
    results.homozygous = 0.5;
    results.heterozygous = 0.5;
  } else if (parentA === 'heterozygous' && parentB === 'homozygous') {
    results.homozygous = 0.5;
    results.heterozygous = 0.5;
  } else if (parentA === 'heterozygous' && parentB === 'heterozygous') {
    results.homozygous = 0.25;
    results.heterozygous = 0.5;
    results.wildtype = 0.25;
  } else if (parentA === 'homozygous' && parentB === 'wildtype') {
    results.heterozygous = 1.0;
  } else if (parentA === 'wildtype' && parentB === 'homozygous') {
    results.heterozygous = 1.0;
  } else if (parentA === 'heterozygous' && parentB === 'wildtype') {
    results.heterozygous = 0.5;
    results.wildtype = 0.5;
  } else if (parentA === 'wildtype' && parentB === 'heterozygous') {
    results.heterozygous = 0.5;
    results.wildtype = 0.5;
  } else if (parentA === 'wildtype' && parentB === 'wildtype') {
    results.wildtype = 1.0;
  }

  return results;
}

/**
 * Calculate combined probabilities for multi-allele cross
 */
function calculateMultiAlleleCross(
  parentA: Record<string, AlleleState>,
  parentB: Record<string, AlleleState>,
  alleleIds: string[],
  alleles?: Allele[]
): OffspringOutcome[] {
  const outcomes: OffspringOutcome[] = [];

  // Generate all possible combinations
  function generateCombinations(
    index: number,
    currentGenotype: Record<string, AlleleState>,
    currentProbability: number
  ) {
    if (index >= alleleIds.length) {
      if (currentProbability > 0) {
        outcomes.push({
          genotype: { ...currentGenotype },
          probability: currentProbability,
          label: generateGenotypeLabel(currentGenotype, alleleIds, alleles),
          category: 'cull', // Will be categorized later
        });
      }
      return;
    }

    const alleleId = alleleIds[index];
    const crossResults = calculateSingleAlleleCross(
      parentA[alleleId] || 'wildtype',
      parentB[alleleId] || 'wildtype'
    );

    for (const [state, probability] of Object.entries(crossResults)) {
      if (probability > 0) {
        currentGenotype[alleleId] = state as AlleleState;
        generateCombinations(
          index + 1,
          currentGenotype,
          currentProbability * probability
        );
      }
    }
  }

  generateCombinations(0, {}, 1);

  // Combine identical genotypes
  const combined = new Map<string, OffspringOutcome>();
  for (const outcome of outcomes) {
    const key = outcome.label;
    if (combined.has(key)) {
      combined.get(key)!.probability += outcome.probability;
    } else {
      combined.set(key, outcome);
    }
  }

  return Array.from(combined.values()).sort((a, b) => b.probability - a.probability);
}

/**
 * Generate human-readable genotype label
 * Uses context-aware notation: 'fl' for conditional knockouts, 'mut' for conventional
 */
function generateGenotypeLabel(
  genotype: Record<string, AlleleState>,
  alleleIds: string[],
  alleles?: Allele[]
): string {
  const parts: string[] = [];

  for (const id of alleleIds) {
    const state = genotype[id] || 'wildtype';
    const allele = alleles?.find(a => a.id === id);
    const isConditional = allele?.alleleType === 'conditional-knockout';
    
    let notation = '';
    switch (state) {
      case 'homozygous':
        notation = isConditional ? 'fl/fl' : 'mut/mut';
        break;
      case 'heterozygous':
        notation = isConditional ? '+/fl' : '+/mut';
        break;
      case 'wildtype':
        notation = '+/+';
        break;
      case 'hemizygous':
        notation = 'Tg+';
        break;
    }
    parts.push(notation);
  }

  return parts.join('; ');
}

/**
 * Detect potential warnings for breeding scheme
 */
export function detectWarnings(
  alleles: Allele[],
  targetGenotypes: TargetGenotype[]
): string[] {
  const warnings: string[] = [];

  // Check for homozygous Cre (often lethal)
  for (const target of targetGenotypes) {
    for (const allele of alleles) {
      if (
        (allele.alleleType === 'cre-constitutive' ||
          allele.alleleType === 'cre-inducible') &&
        target.alleleStates[allele.id] === 'homozygous'
      ) {
        warnings.push(
          `Homozygous Cre (${allele.geneName}) may cause toxicity or lethality. Consider using hemizygous Cre instead.`
        );
      }
    }
  }

  // Check for potential linkage
  const chromosomes = alleles
    .filter((a) => a.chromosome)
    .map((a) => a.chromosome);
  const duplicateChromosomes = chromosomes.filter(
    (c, i) => chromosomes.indexOf(c) !== i
  );
  if (duplicateChromosomes.length > 0) {
    warnings.push(
      `Multiple alleles on chromosome ${duplicateChromosomes[0]} may be linked, affecting recombination rates.`
    );
  }

  // Check for constitutive Cre with conditional allele on same chromosome
  const creAlleles = alleles.filter(
    (a) => a.alleleType === 'cre-constitutive' || a.alleleType === 'cre-inducible'
  );
  const floxedAlleles = alleles.filter(
    (a) => a.alleleType === 'conditional-knockout'
  );

  if (creAlleles.length > 0 && floxedAlleles.length > 0) {
    for (const cre of creAlleles) {
      if (cre.alleleType === 'cre-constitutive') {
        warnings.push(
          `${cre.geneName} is a constitutive Cre driver. Deletion will occur in all Cre-expressing tissues from development.`
        );
      }
    }
  }

  // Check for more than 4 alleles (complex breeding)
  if (alleles.length > 4) {
    warnings.push(
      `Breeding schemes with ${alleles.length} alleles are complex and may require many generations. Consider simplifying if possible.`
    );
  }

  return warnings;
}

/**
 * Categorize offspring outcomes based on target genotypes
 * Identifies experimental, control, keeper (useful for next generation), and cull mice
 */
function categorizeOutcomes(
  outcomes: OffspringOutcome[],
  alleles: Allele[],
  targetGenotypes: TargetGenotype[],
  isIntermediateGeneration: boolean = false
): OffspringOutcome[] {
  return outcomes.map((outcome) => {
    // Check if matches experimental genotype
    const experimental = targetGenotypes.find((t) => t.isExperimental);
    const control = targetGenotypes.find((t) => !t.isExperimental);

    let category: 'experimental' | 'control' | 'keeper' | 'cull' = 'cull';

    if (experimental) {
      const matchesExp = alleles.every((allele) => {
        const targetState = experimental.alleleStates[allele.id];
        const outcomeState = outcome.genotype[allele.id];
        return targetState === outcomeState;
      });
      if (matchesExp) category = 'experimental';
    }

    if (control && category === 'cull') {
      const matchesCtrl = alleles.every((allele) => {
        const targetState = control.alleleStates[allele.id];
        const outcomeState = outcome.genotype[allele.id];
        return targetState === outcomeState;
      });
      if (matchesCtrl) category = 'control';
    }

    // For intermediate generations, mark useful genotypes as "keeper"
    if (isIntermediateGeneration && category === 'cull') {
      // Check if this genotype will be useful for future crosses
      // Examples: homozygous floxed (for Gen 3), heterozygous with Cre (for Gen 3)
      const hasFloxed = alleles.some((a) => a.alleleType === 'conditional-knockout');
      const hasCre = alleles.some((a) => a.alleleType === 'cre-constitutive' || a.alleleType === 'cre-inducible');

      if (hasFloxed && !hasCre) {
        // In Gen 1: homozygous floxed are keepers (needed for Gen 3)
        const isHomozygousFloxed = alleles
          .filter((a) => a.alleleType === 'conditional-knockout')
          .every((a) => outcome.genotype[a.id] === 'homozygous');
        if (isHomozygousFloxed) category = 'keeper';
      }

      if (hasFloxed && hasCre) {
        // In Gen 2: heterozygous with Cre are keepers (needed for Gen 3)
        const floxedAllele = alleles.find((a) => a.alleleType === 'conditional-knockout');
        const creAllele = alleles.find((a) => a.alleleType === 'cre-constitutive' || a.alleleType === 'cre-inducible');
        
        if (floxedAllele && creAllele) {
          const isHetWithCre = 
            outcome.genotype[floxedAllele.id] === 'heterozygous' &&
            outcome.genotype[creAllele.id] === 'hemizygous';
          if (isHetWithCre) category = 'keeper';
        }
      }
    }

    return { ...outcome, category };
  });
}

/**
 * Determine optimal breeding strategy
 * Implements proper 3-generation Cre/loxP breeding scheme when needed
 */
function determineBreedingStrategy(
  alleles: Allele[],
  targetGenotypes: TargetGenotype[]
): BreedingGeneration[] {
  const generations: BreedingGeneration[] = [];
  const experimental = targetGenotypes.find((t) => t.isExperimental);

  if (!experimental || alleles.length === 0) {
    return generations;
  }

  // Strategy: Fix alleles to homozygosity first, then introduce Cre last

  // Separate alleles by type
  const floxedAlleles = alleles.filter(
    (a) => a.alleleType === 'conditional-knockout'
  );
  const creAlleles = alleles.filter(
    (a) => a.alleleType === 'cre-constitutive' || a.alleleType === 'cre-inducible'
  );
  const otherAlleles = alleles.filter(
    (a) =>
      a.alleleType !== 'conditional-knockout' &&
      a.alleleType !== 'cre-constitutive' &&
      a.alleleType !== 'cre-inducible'
  );

  let genNumber = 1;

  // Handle Cre/loxP breeding schemes (most complex)
  if (floxedAlleles.length > 0 && creAlleles.length > 0) {
    const floxed = floxedAlleles[0];
    const cre = creAlleles[0];

    // Generation 1: If starting with heterozygous floxed, intercross to get homozygous
    if (floxed.startingGenotype === 'heterozygous') {
      const parentA: Record<string, AlleleState> = { [floxed.id]: 'heterozygous' };
      const parentB: Record<string, AlleleState> = { [floxed.id]: 'heterozygous' };

      const outcomes = calculateMultiAlleleCross(parentA, parentB, [floxed.id], [floxed]);
      const categorizedOutcomes = categorizeOutcomes(outcomes, [floxed], targetGenotypes, true);

      generations.push({
        number: genNumber++,
        cross: {
          parentA,
          parentB,
          parentALabel: `${floxed.geneName} +/fl`,
          parentBLabel: `${floxed.geneName} +/fl`,
        },
        offspringRatios: categorizedOutcomes,
        purpose: `Fix ${floxed.geneName} floxed allele to homozygosity`,
      });
    }

    // Generation 2: Introduce Cre transgene
    // Cross homozygous floxed (no Cre) with Cre-positive
    // This creates heterozygous-with-Cre or homozygous-with-Cre depending on vendor genotype
    const gen2ParentA: Record<string, AlleleState> = {
      [floxed.id]: 'homozygous',
      [cre.id]: 'wildtype',
    };
    const gen2ParentB: Record<string, AlleleState> = {
      [floxed.id]: 'wildtype', // Assuming vendor sells wild-type for floxed gene
      [cre.id]: 'hemizygous',
    };

    const gen2Outcomes = calculateMultiAlleleCross(
      gen2ParentA,
      gen2ParentB,
      [floxed.id, cre.id],
      [floxed, cre]
    );
    const categorizedGen2Outcomes = categorizeOutcomes(gen2Outcomes, [floxed, cre], targetGenotypes, true);

    generations.push({
      number: genNumber++,
      cross: {
        parentA: gen2ParentA,
        parentB: gen2ParentB,
        parentALabel: `${floxed.geneName} fl/fl; ${cre.geneName}-`,
        parentBLabel: `${floxed.geneName} +/+; ${cre.geneName}+`,
      },
      offspringRatios: categorizedGen2Outcomes,
      purpose: `Introduce ${cre.geneName} transgene`,
    });

    // Generation 3: Generate final experimental and control cohorts
    // Cross heterozygous-with-Cre (from Gen 2) with homozygous-no-Cre (from Gen 1)
    const gen3ParentA: Record<string, AlleleState> = {
      [floxed.id]: 'heterozygous',
      [cre.id]: 'hemizygous',
    };
    const gen3ParentB: Record<string, AlleleState> = {
      [floxed.id]: 'homozygous',
      [cre.id]: 'wildtype',
    };

    const gen3Outcomes = calculateMultiAlleleCross(
      gen3ParentA,
      gen3ParentB,
      [floxed.id, cre.id],
      [floxed, cre]
    );

    // Categorize outcomes for final generation
    const categorizedOutcomes = categorizeOutcomes(gen3Outcomes, [floxed, cre], targetGenotypes);

    generations.push({
      number: genNumber++,
      cross: {
        parentA: gen3ParentA,
        parentB: gen3ParentB,
        parentALabel: `${floxed.geneName} +/fl; ${cre.geneName}+`,
        parentBLabel: `${floxed.geneName} fl/fl; ${cre.geneName}-`,
      },
      offspringRatios: categorizedOutcomes,
      purpose: 'Generate experimental and control cohorts',
    });
  } 
  // Handle simple floxed-only (no Cre) or other breeding schemes
  else {
    // Generation 1: If starting with heterozygous floxed, intercross to get homozygous
    for (const allele of floxedAlleles) {
      if (allele.startingGenotype === 'heterozygous') {
        const parentA: Record<string, AlleleState> = { [allele.id]: 'heterozygous' };
        const parentB: Record<string, AlleleState> = { [allele.id]: 'heterozygous' };

        const outcomes = calculateMultiAlleleCross(parentA, parentB, [allele.id], [allele]);
        const categorizedOutcomes = categorizeOutcomes(outcomes, [allele], targetGenotypes);

        generations.push({
          number: genNumber++,
          cross: {
            parentA,
            parentB,
            parentALabel: `${allele.geneName} +/fl`,
            parentBLabel: `${allele.geneName} +/fl`,
          },
          offspringRatios: categorizedOutcomes,
          purpose: `Fix ${allele.geneName} floxed allele to homozygosity`,
        });
      }
    }

    // Handle other alleles (knockouts, knockins, etc.)
    for (const allele of otherAlleles) {
      if (allele.startingGenotype === 'heterozygous') {
        const parentA: Record<string, AlleleState> = { [allele.id]: 'heterozygous' };
        const parentB: Record<string, AlleleState> = { [allele.id]: 'heterozygous' };

        const outcomes = calculateMultiAlleleCross(parentA, parentB, [allele.id], [allele]);
        const categorizedOutcomes = categorizeOutcomes(outcomes, [allele], targetGenotypes);

        generations.push({
          number: genNumber++,
          cross: {
            parentA,
            parentB,
            parentALabel: `${allele.geneName} +/-`,
            parentBLabel: `${allele.geneName} +/-`,
          },
          offspringRatios: categorizedOutcomes,
          purpose: `Generate ${allele.geneName} homozygous mutants`,
        });
      }
    }

    // If no generations were created, create a simple breeding plan
    if (generations.length === 0 && alleles.length > 0) {
      const alleleIds = alleles.map((a) => a.id);
      const parentA: Record<string, AlleleState> = {};
      const parentB: Record<string, AlleleState> = {};

      alleles.forEach((allele) => {
        parentA[allele.id] = allele.startingGenotype === 'hemizygous' ? 'hemizygous' : 'heterozygous';
        parentB[allele.id] = 'wildtype';
      });

      const outcomes = calculateMultiAlleleCross(parentA, parentB, alleleIds, alleles);
      const categorizedOutcomes = categorizeOutcomes(outcomes, alleles, targetGenotypes);

      generations.push({
        number: 1,
        cross: {
          parentA,
          parentB,
          parentALabel: alleles.map((a) => `${a.geneName}+`).join('; '),
          parentBLabel: 'Wild-type',
        },
        offspringRatios: categorizedOutcomes,
        purpose: 'Initial breeding cross',
      });
    }
  }

  return generations;
}

/**
 * Calculate estimated resources needed
 */
function calculateResources(
  generations: BreedingGeneration[],
  targetGenotypes: TargetGenotype[],
  params: BreedingParameters = DEFAULT_BREEDING_PARAMS
): {
  estimatedBreedingPairs: number;
  estimatedTotalMice: number;
  estimatedWeeks: number;
  targetGenotypeFrequency: number;
  micePerGenotype: Record<string, number>;
} {
  const experimental = targetGenotypes.find((t) => t.isExperimental);
  const control = targetGenotypes.find((t) => !t.isExperimental);

  // Find target genotype frequency from last generation
  let targetFrequency = 0;
  if (generations.length > 0) {
    const lastGen = generations[generations.length - 1];
    const expOutcome = lastGen.offspringRatios.find(
      (o) => o.category === 'experimental'
    );
    targetFrequency = expOutcome?.probability || 0.25;
  }

  // Calculate mice needed
  const expNeeded = experimental?.numberNeeded || 10;
  const ctrlNeeded = control?.numberNeeded || 10;
  
  // For het × het crosses, both experimental and control come from same cross
  // We need enough pups to get BOTH experimental AND control requirements
  // However, they usually occur at the same frequency (e.g., 25% hom vs 25% wt in het×het)
  // So we calculate based on the single genotype needed (they're independent outcomes)
  const miceNeeded = expNeeded; // Calculate for experimental genotype

  // Account for sex requirements
  let sexMultiplier = 1;
  if (experimental?.sexRequirement === 'male' || experimental?.sexRequirement === 'female') {
    sexMultiplier = 2; // Only half the mice are the right sex
  } else if (experimental?.sexRequirement === 'balanced') {
    sexMultiplier = 1.2; // Some buffer for balancing
  }

  // Calculate breeding pairs needed using proper formula:
  // 1. Apply sex multiplier to target number
  // 2. Divide by genotype frequency to get total pups needed
  // 3. Divide by lower-end litter size to get litters needed
  // 4. Divide by breeding efficiency to account for failed matings
  const miceNeededAfterSex = miceNeeded * sexMultiplier;
  const totalPupsNeeded = miceNeededAfterSex / (targetFrequency || 0.25);
  const littersNeeded = totalPupsNeeded / params.lowerEndLitterSize;
  const breedingPairsNeeded = littersNeeded / params.breedingEfficiency;
  
  // Round up to whole number of breeding pairs
  const breedingPairs = Math.ceil(breedingPairsNeeded);

  // Calculate total mice using average litter size for estimates
  // Only count successful breeding pairs (apply breeding efficiency)
  const successfulPairs = breedingPairs * params.breedingEfficiency;
  const totalMice = Math.round(successfulPairs * params.averageLitterSize);

  // Timeline: 9 weeks per generation (3 gestation + 3 weaning + 3 to breeding age)
  const weeks = generations.length * params.weeksPerGeneration;

  // Calculate expected mice per genotype based on actual breeding pairs and frequencies
  const estimatedExpMice = totalMice * targetFrequency;
  const estimatedCtrlMice = totalMice * targetFrequency; // Same frequency for het×het crosses
  
  return {
    estimatedBreedingPairs: Math.max(breedingPairs, 2),
    estimatedTotalMice: totalMice,
    estimatedWeeks: weeks,
    targetGenotypeFrequency: targetFrequency,
    micePerGenotype: {
      experimental: Math.round(estimatedExpMice),
      control: Math.round(estimatedCtrlMice),
    },
  };
}

/**
 * Main function: Generate complete breeding plan
 */
export function generateBreedingPlan(
  alleles: Allele[],
  targetGenotypes: TargetGenotype[],
  params: BreedingParameters = DEFAULT_BREEDING_PARAMS
): BreedingPlan {
  const warnings = detectWarnings(alleles, targetGenotypes);
  const generations = determineBreedingStrategy(alleles, targetGenotypes);
  const resources = calculateResources(generations, targetGenotypes, params);

  return {
    generations,
    totalGenerations: generations.length,
    ...resources,
    warnings,
  };
}

/**
 * Format probability as percentage string
 */
export function formatProbability(prob: number): string {
  return `${(prob * 100).toFixed(1)}%`;
}

/**
 * Get color for outcome category
 */
export function getCategoryColor(category: string): string {
  switch (category) {
    case 'experimental':
      return '#008080'; // teal
    case 'control':
      return '#134978'; // nav-blue
    case 'keeper':
      return '#2384da'; // section heading blue
    case 'cull':
      return '#999'; // gray
    default:
      return '#666';
  }
}

/**
 * Get label for outcome category
 */
export function getCategoryLabel(category: string): string {
  switch (category) {
    case 'experimental':
      return 'Experimental';
    case 'control':
      return 'Control';
    case 'keeper':
      return 'Keeper';
    case 'cull':
      return 'Not needed';
    default:
      return category;
  }
}
