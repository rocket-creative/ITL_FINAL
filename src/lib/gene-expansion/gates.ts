/**
 * Eligibility gates for build_inquiry indexation.
 */

import type { GeneRow, GateRule, ModelTypeRow } from './db';

export interface GateResult {
  pass: boolean;
  dataSignalCount: number;
  reason?: string;
}

export function countDataSignals(gene: GeneRow): number {
  let count = 0;
  if (gene.impc_viability !== 'unknown') count++;
  if (gene.expression_profile && Object.keys(gene.expression_profile).length > 0) count++;
  if (gene.has_human_ortholog) count++;
  if (gene.existing_allele_count > 0) count++;
  if (gene.disease_associated) count++;
  return count;
}

function passesInducibleGate(gene: GeneRow): boolean {
  if (gene.impc_viability === 'lethal' || gene.impc_viability === 'subviable') return true;
  if (gene.existing_conditional_count > 0) return true;
  return false;
}

function passesGainOfFunctionGate(gene: GeneRow): boolean {
  if (gene.expression_specificity === 'broad' || gene.expression_specificity === 'ubiquitous') {
    return true;
  }
  if (gene.disease_associated) return true;
  const profile = gene.expression_profile as { gain_of_function?: boolean } | null;
  if (profile?.gain_of_function) return true;
  return false;
}

export function passesTypeGate(gene: GeneRow, modelType: ModelTypeRow): boolean {
  switch (modelType.gate_rule) {
    case 'all':
      if (modelType.slug === 'inducible-knockout') return passesInducibleGate(gene);
      return true;
    case 'ortholog':
      return gene.has_human_ortholog;
    case 'variant':
      return gene.clinvar_pathogenic_count > 0 || (gene.omim_ids?.length ?? 0) > 0;
    case 'expression_restricted':
      return gene.expression_specificity === 'restricted';
    case 'gain_of_function':
      return passesGainOfFunctionGate(gene);
    case 'conditional_viability':
      return passesInducibleGate(gene);
    default:
      return true;
  }
}

export function computeIsIndexable(gene: GeneRow, modelType: ModelTypeRow): GateResult {
  const dataSignalCount = countDataSignals(gene);
  const typePass = passesTypeGate(gene, modelType);

  if (!typePass) {
    return { pass: false, dataSignalCount, reason: `type gate failed: ${modelType.slug}` };
  }

  if (dataSignalCount < 2) {
    return { pass: false, dataSignalCount, reason: 'thinness gate: fewer than 2 data signals' };
  }

  return { pass: true, dataSignalCount };
}
