/**
 * FAQ blocks for Tier pages + FAQPage JSON-LD.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildTierGeneModFaqs(params: {
  gene: string;
  modLabel: string;
  tissueOrDriver?: string;
}): FaqItem[] {
  const { gene, modLabel, tissueOrDriver } = params;
  const ctx = tissueOrDriver ? `${tissueOrDriver.replace(/-/g, ' ')} focused ` : '';
  return [
    {
      question: `Is ${gene} knockout embryonic lethal in mice?`,
      answer: `Lethality depends on genetic background and exact allele design. Some ${gene} germline knockouts are viable, others require conditional alleles or mixed backgrounds. We review publications and our own experience, then recommend floxed versus null approaches before you commit.`,
    },
    {
      question: `Which Cre driver is best for ${ctx}experiments?`,
      answer: `Driver choice depends on onset timing, recombination efficiency, and known leak patterns. We map your organ and cell type to a short list of proven Cre lines, then discuss reporter crosses and controls. ${tissueOrDriver ? `Your query highlights ${tissueOrDriver.replace(/-/g, ' ')} as a primary axis, which we treat as the starting point for driver selection.` : 'We prioritize drivers with strong community validation for your tissue.'}`,
    },
    {
      question: `Do you ship live ${gene} animals?`,
      answer: `When catalog lines are live, we ship with health certificates and QC documentation. If your exact combo is not listed, we quote a model generation project with cryo or live dispatch options depending on cohort timing and geography.`,
    },
    {
      question: `How do I request a quote for ${gene}?`,
      answer: `Use the catalog inquire buttons or the request quote form with your allele goal, Cre plan if any, strain background, and cohort size. A PhD led team responds with pricing, milestones, and the fastest path to experimental animals.`,
    },
  ];
}

export function buildCreLineFaqs(params: { tissueLabel: string }): FaqItem[] {
  const t = params.tissueLabel;
  return [
    {
      question: `What does ${t} specific Cre mean?`,
      answer: `${t} specific Cre drivers recombine floxed alleles primarily in that lineage. Practical work still demands reporter crosses to verify efficiency in your facility because genetic background and copy number nudge leak profiles.`,
    },
    {
      question: `Should I use inducible CreERT2 for ${t} studies?`,
      answer: `Inducible systems help when developmental deletion confounds adult phenotypes or when you need tight timing around injury or tumor onset. Tamoxifen protocols carry their own controls, which we document in project planning.`,
    },
    {
      question: `Where do I find floxed models to pair with these drivers?`,
      answer: `Our catalog lists floxed conditional lines by gene. If your favorite target is not listed, we quote generated flox builds and crossing plans so you reach cohort size on a clear schedule.`,
    },
  ];
}

export function buildCreDriverFaqs(params: { driver: string; tissueLabel: string }): FaqItem[] {
  return [
    {
      question: `What animals express ${params.driver}?`,
      answer: `${params.driver} is used for ${params.tissueLabel} biased recombination in community standard protocols. We recommend reporter validation on your background before large experiments.`,
    },
    {
      question: `Is ${params.driver} inducible?`,
      answer: `Some lines in the CreERT2 family need tamoxifen for nuclear access. Tell us your timing goals and we help pick tamoxifen versus constitutive strategies.`,
    },
    {
      question: `Which floxed genes pair with ${params.driver}?`,
      answer: `Top pairs depend on your disease model. We link common conditional alleles in our catalog and can suggest three to five references genes that match ${params.tissueLabel} biology.`,
    },
  ];
}
