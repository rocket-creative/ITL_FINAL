/**
 * Biology driven copy for build_inquiry pages — spec §6.
 */

import type { GeneRow, ModelTypeRow } from './db';
import { REPORTER_FLUOROPHORES } from './synonymRedirects';

export interface PageCopy {
  h1: string;
  heroIntro: string;
  geneFraming: string;
  viabilityNote: string;
  alleleGap: string;
  modificationRationale: string;
  typeSpecificNote: string;
  timeline: string;
  headings: string[];
  bodyParagraphs: string[];
  reporterSections?: Array<{ title: string; body: string }>;
}

function viabilityNote(gene: GeneRow): string {
  switch (gene.impc_viability) {
    case 'lethal':
      return `Constitutive null alleles of ${gene.symbol} are embryonic lethal in published IMPC data. A conditional knockout strategy preserves a floxed allele for tissue or temporal control while avoiding global loss.`;
    case 'subviable':
      return `Homozygous ${gene.symbol} null animals show reduced viability in IMPC summaries. Conditional or inducible designs help stage loss of function after development.`;
    case 'viable':
      return `Published viability data support viable ${gene.symbol} null or hypomorphic alleles, so constitutive and conditional routes are both feasible depending on your experimental readout.`;
    default:
      return `${gene.symbol} is a well studied locus in mouse genetics. Allele design follows your phenotype goals and the published landscape for this gene.`;
  }
}

function alleleGap(gene: GeneRow): string {
  const total = gene.existing_allele_count;
  const cond = gene.existing_conditional_count;
  const ko = gene.existing_knockout_count;

  if (total === 0) {
    return `No published alleles are indexed for ${gene.symbol} in the sources we track. ingenious targeting laboratory designs the first targeted line to your specification with ES cell based targeting and pre germline characterization.`;
  }

  const parts = [`${total} existing allele${total === 1 ? '' : 's'} are indexed for ${gene.symbol}`];
  if (cond > 0) parts.push(`${cond} conditional`);
  if (ko > 0) parts.push(`${ko} knockout`);
  const summary = parts.join(', including ') + '.';
  return `${summary} Where the published set lacks the modification you need, ingenious targeting laboratory builds that allele with documented germline transmission.`;
}

function modificationRationale(modelType: ModelTypeRow): string {
  const slug = modelType.slug;
  if (slug === 'conditional-knockout' || slug === 'inducible-knockout') {
    return `Conditional alleles place loxP sites around critical exons while preserving reading frame until Cre recombinase excision. FRT flanked derivative alleles (tm1a to tm1c to tm1d) allow flexible conversion before breeding to your Cre driver. Critical exon choice and regulatory element preservation are validated in ES cells prior to germline transmission.`;
  }
  if (slug === 'knockout') {
    return `Knockout alleles remove or disrupt coding sequence at the ${modelType.display_name.toLowerCase()} locus using ES cell targeting. Critical exon selection and frame considerations are confirmed before microinjection so founders carry a defined null or hypomorphic allele.`;
  }
  if (slug === 'knockin' || slug === 'cdna-knockin' || slug === 'tag-knockin') {
    return `Knockin alleles insert sequence at the endogenous locus under native regulation. ES cell based targeting confirms junction integrity and expression pattern before germline transmission, preserving physiological control compared with random integration.`;
  }
  if (slug === 'point-mutation') {
    return `Point mutation knockin recreates patient relevant nucleotide changes at the endogenous locus. Homology arms and silent restriction sites are engineered so the variant is expressed from the native promoter with pre germline sequence confirmation.`;
  }
  if (slug === 'humanized') {
    return `Humanization replaces mouse coding sequence with human ortholog sequence at the endogenous locus, maintaining native regulatory context. ES cell targeting documents junctions and expression before germline transmission.`;
  }
  if (slug === 'reporter') {
    return `Reporter alleles fuse a detectable marker to endogenous regulation so expression mirrors the native locus. ES cell characterization confirms signal location before germline transmission.`;
  }
  if (slug === 'overexpression') {
    return `Targeted overexpression places your transgene at a safe harbor or Rosa26 locus with defined copy number and expression control, avoiding random integration position effects documented during ES cell screening.`;
  }
  if (slug === 'cre-driver') {
    return `Cre driver lines express Cre recombinase from ${modelType.display_name.toLowerCase()} regulatory elements. Promoter choice follows published expression data so recombination aligns with your tissue or cell type of interest.`;
  }
  return `Allele design follows published structure for this locus with ES cell based targeting and pre germline characterization.`;
}

function typeSpecificNote(gene: GeneRow, modelType: ModelTypeRow): string {
  const slug = modelType.slug;
  if (slug === 'humanized' && gene.human_ortholog_symbol) {
    return `Human ortholog ${gene.human_ortholog_symbol} guides humanization design so human coding sequence replaces the mouse exons under endogenous control.`;
  }
  if (slug === 'point-mutation' && (gene.clinvar_pathogenic_count > 0 || gene.omim_ids.length > 0)) {
    const omim = gene.omim_ids.length ? ` OMIM entries ${gene.omim_ids.slice(0, 3).join(', ')} inform variant choice.` : '';
    return `ClinVar lists ${gene.clinvar_pathogenic_count} pathogenic or likely pathogenic variant${gene.clinvar_pathogenic_count === 1 ? '' : 's'} for the human ortholog.${omim}`;
  }
  if (slug === 'cre-driver' && gene.expression_profile) {
    const profile = gene.expression_profile as { top_tissues?: string[] };
    const tissues = profile.top_tissues?.slice(0, 4).join(', ') ?? 'restricted tissues';
    return `Expression data support ${gene.symbol} activity in ${tissues}, supporting a promoter driven Cre driver for tissue restricted recombination.`;
  }
  if (slug === 'inducible-knockout') {
    return `Inducible systems (CreERT2, tamoxifen, or Tet regulated) pair with a floxed ${gene.symbol} allele so loss of function is timed after development.`;
  }
  return '';
}

export function buildPageCopy(gene: GeneRow, modelType: ModelTypeRow): PageCopy {
  const h1 = `${gene.symbol} ${modelType.display_name} Mouse`;
  const heroIntro =
    'Since 1998, ingenious targeting laboratory has delivered 2,800+ projects with 100% germline transmission guarantee and 800+ peer reviewed publications.';
  const geneFraming = `${gene.symbol}${gene.name ? ` (${gene.name})` : ''} is a focus locus for ${modelType.display_name.toLowerCase()} mouse models. ingenious targeting laboratory designs and delivers the line to your study specification with ES cell based targeting and documented milestones.`;
  const viab = viabilityNote(gene);
  const gap = alleleGap(gene);
  const rationale = modificationRationale(modelType);
  const typeNote = typeSpecificNote(gene, modelType);
  const timeline =
    'Quotes return in about 24 hours. Study ready cohorts often arrive near 26 weeks from contract start when breeding is direct.';

  const headings = [
    'Scientific design',
    'Why this approach',
    'Build timeline and quote',
    'FAQ',
    'Related modifications',
  ];

  const bodyParagraphs = [heroIntro, geneFraming, viab, gap, rationale, typeNote, timeline].filter(Boolean);

  const reporterSections =
    modelType.slug === 'reporter'
      ? REPORTER_FLUOROPHORES.map((f) => ({
          title: `${gene.symbol} ${f.name} reporter`,
          body: `${f.label} fused to ${gene.symbol} regulatory elements reports native expression. ingenious targeting laboratory engineers the knockin and confirms pattern in ES cells before germline transmission.`,
        }))
      : undefined;

  if (reporterSections) {
    for (const s of reporterSections) {
      headings.push(s.title);
      bodyParagraphs.push(s.body);
    }
  }

  return {
    h1,
    heroIntro,
    geneFraming,
    viabilityNote: viab,
    alleleGap: gap,
    modificationRationale: rationale,
    typeSpecificNote: typeNote,
    timeline,
    headings,
    bodyParagraphs,
    reporterSections,
  };
}
