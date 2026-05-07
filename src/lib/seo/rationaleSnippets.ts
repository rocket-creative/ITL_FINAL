/**
 * Short rationale blocks keyed by modification plus tissue context.
 */

export function rationaleForModTissue(modCanonical: string, tissueKey: string | undefined): string {
  const t = tissueKey ?? 'your target tissue';
  const m = modCanonical.toLowerCase();
  if (m.includes('conditional')) {
    return `Conditional knockout keeps ${t} as the experimental theater while the rest of the animal retains a wild type allele. That pattern mirrors somatic mutation in patients and avoids systemic compensation that can erase subtle phenotypes. It is often preferred when a germline null is lethal, weak, or confounded by developmental rescue.`;
  }
  if (m.includes('knockin') || m.includes('humanized')) {
    return `Knockin and humanized formats preserve regulatory context at the endogenous locus. For ${t} focused programs, that matters when expression timing, splice isoforms, or allele dosage drive biology. Random integration transgenics can still help, but targeted alleles usually give cleaner pharmacology readouts.`;
  }
  if (m.includes('knockout') && !m.includes('conditional')) {
    return `A conventional knockout answers whether the gene is required broadly. When ${t} is the organ of interest, a global null can still be informative if viability is acceptable and you want the simplest genotype. If the null is harsh, a floxed allele with a regional Cre is the safer long term platform.`;
  }
  return `We help teams pick alleles that match the experimental question, the organ system, and future breeding plans. For ${t} centric work, Cre specificity, flox placement, and baseline controls matter as much as the gene edit itself.`;
}
