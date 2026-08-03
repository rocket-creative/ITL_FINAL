/**
 * Deterministic template rotation for Tier 1–4 body copy (avoids duplicate clusters).
 */

function hashInput(parts: string[]): number {
  const s = parts.join('|').toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function pickTemplate(gene: string, mod: string, tissueKey: string | undefined): number {
  return hashInput([gene, mod, tissueKey ?? '']) % 4;
}

const TEMPLATES: Record<string, readonly string[]> = {
  'Conditional Knockout': [
    '{gene} conditional knockout mice carry a floxed allele so you delete function only where Cre is active. The germline allele stays intact until you cross to a tissue specific Cre. Labs reach for this design when a global knockout is lethal, when they need adult onset loss, or when regional redundancy hides a whole body phenotype.',
    'A floxed {gene} allele paired with Cre gives spatial control that whole body knockouts cannot offer. People use it to separate developmental roles from adult homeostasis, to model somatic mutations, and to match disease that begins in one organ.',
    'Conditional deletion of {gene} limits the genetic change to the lineage you choose. That helps in oncology, immunology, and metabolic work where systemic loss would muddy the read. After you confirm Cre specificity, crossing to {gene} floxed stock yields usable cohorts.',
    'Tissue restricted knockout of {gene} keeps wild type function everywhere else. Breeding is often more robust, and the setup mirrors patient biology where mutations arise in a subset of cells.',
  ],
  Knockout: [
    'A conventional {gene} knockout removes gene function in all cells that inherit the allele. It is a proven first pass for target validation when redundancy is low.',
    'Whole body loss of {gene} gives the clearest readout when the question is whether the gene is required at all. Follow up tissue work can still move to a conditional allele if lethality or compensation appears.',
    '{gene} null animals are straightforward to genotype and phenotype when survival is acceptable. They remain a standard background for pharmacology, biomarker, and rescue studies.',
    'Global {gene} deletion answers broad mechanism questions quickly. If timing or site matters, conditional alleles are a natural next step after the null is characterized.',
  ],
  Knockin: [
    '{gene} knockin models place a defined sequence at the endogenous locus. Expression stays under native regulation, which matters for reporters, tags, and precise allele swaps.',
    'An engineered {gene} allele can introduce a human coding region, a point change, or a fluorescent reporter without random transgene integration noise.',
    'Targeting {gene} preserves positional context compared with viral or BAC approaches. That helps when you quantify expression or map chromatin.',
    'Knockin designs at {gene} support head to head comparisons between wild type and modified alleles because regulatory DNA stays in place.',
  ],
  Humanized: [
    'Humanized {gene} mice substitute the human ortholog sequence so drug binding sites and pathway feedback match the clinic more closely.',
    '{gene} humanization is common when the therapeutic is a human specific antibody or small molecule with species selectivity.',
    'These models bridge mouse genetics with translational readouts on human biology at the {gene} locus.',
    'Humanized {gene} lines support efficacy and pharmacodynamic studies where the wild type mouse protein would not engage the clinical candidate.',
  ],
  Transgenic: [
    'Transgenic approaches add copies of {gene} under a chosen promoter or as a genomic BAC. They help when you need graded overexpression or locus independent deployment.',
    '{gene} transgenic lines complement knockins when the question is dosage or compartment specific expression rather than editing the native allele.',
    'Random or targeted integration strategies exist for {gene} transgenes. Selection depends on expression level, copy number control, and whether you need a defined safe harbor.',
    'Transgenic {gene} models support rescue experiments, pathway saturation studies, and human promoter driven expression in mouse tissue.',
  ],
  Immunodeficient: [
    '{gene} changes in an immunodeficient background support human cell engraftment and tumor model workflows that need reduced host immunity.',
    'Combining {gene} edits with immunodeficient stocks expands adoptive transfer and xenograft options.',
    'These lines trade intact immunity for experimental access when the study design demands it.',
    'Plan cohort immunophenotyping carefully because background alleles interact with {gene} dependent processes.',
  ],
  'Xenograft-Applicable': [
    '{gene} engineered hosts can be tuned for xenograft take rate and growth kinetics depending on tumor lineage.',
    'Baseline {gene} loss or humanization may change engraftment. Pilot cohorts de risk larger studies.',
    'Work with your strain choice to align human tumor models with the immune profile you need.',
    'Orthotopic and subcutaneous routes both benefit from consistent {gene} genetics across cages.',
  ],
};

const DEFAULT_KEY = 'Knockout';

export function buildTemplateIntro(params: {
  gene: string;
  modCanonical: string;
  tissueLabel?: string;
}): string {
  const key = TEMPLATES[params.modCanonical] ? params.modCanonical : DEFAULT_KEY;
  const idx = pickTemplate(params.gene, params.modCanonical, params.tissueLabel);
  let t = TEMPLATES[key][idx] ?? TEMPLATES[DEFAULT_KEY][idx];
  t = t.replace(/\{gene\}/g, params.gene);
  if (params.tissueLabel) {
    t += ` For ${params.tissueLabel} work, plan Cre specificity, reporter crosses, and baseline phenotyping before you scale.`;
  }
  return t;
}

export function countWords(text: string): number {
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!plain) return 0;
  return plain.split(/\s+/).length;
}
