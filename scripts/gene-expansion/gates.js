/**
 * Gate logic for generation job (mirrors src/lib/gene-expansion/gates.ts).
 */

function countDataSignals(gene) {
  let count = 0;
  if (gene.impc_viability && gene.impc_viability !== 'unknown') count++;
  if (gene.expression_profile && Object.keys(gene.expression_profile).length > 0) count++;
  if (gene.has_human_ortholog) count++;
  if (gene.existing_allele_count > 0) count++;
  if (gene.disease_associated) count++;
  return count;
}

function passesInducibleGate(gene) {
  if (gene.impc_viability === 'lethal' || gene.impc_viability === 'subviable') return true;
  if (gene.existing_conditional_count > 0) return true;
  return false;
}

function passesGainOfFunctionGate(gene) {
  if (gene.expression_specificity === 'broad' || gene.expression_specificity === 'ubiquitous') return true;
  if (gene.disease_associated) return true;
  if (gene.expression_profile?.gain_of_function) return true;
  return false;
}

function passesTypeGate(gene, modelType) {
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

function computeIsIndexable(gene, modelType) {
  const dataSignalCount = countDataSignals(gene);
  const typePass = passesTypeGate(gene, modelType);
  return {
    isIndexable: typePass && dataSignalCount >= 2,
    dataSignalCount,
    typePass,
  };
}

module.exports = { countDataSignals, computeIsIndexable };
