/**
 * Hand written intros for flagship genes (~200 words target). No hyphen style per brand rules.
 */

export const curatedGeneIntros: Record<string, string> = {
  Trp53:
    'Trp53 is the guardian of the genome. Stress signals push this tumor suppressor toward cell cycle arrest, senescence, or apoptosis, so the pathway sits at the center of cancer biology. Mouse models let you test somatic mutation timing, cooperation with Kras or Myc, and therapeutic windows in DNA damage driven disease. Conditional alleles matter because complete loss can reshape development while adult onset deletion better mirrors human oncology. Humanized and point mutant variants support antibody and small molecule programs where epitope fidelity matters.',
  Pten:
    'Pten is a lipid phosphatase that restrains Pi3K Akt signaling. Loss drives hyperproliferation and survival in many solid tumors while also altering metabolism in liver and brain. Floxed Pten mice made tissue specific cancer models routine long before CRISPR editing was common. A conventional knockout helps when you need strong pathway activation everywhere it is viable, while liver or neural restricted loss models human PTEN syndromes more faithfully. Pairings with Cre drivers remain the standard way to separate developmental compensation from adult disease.',
  Brca1:
    'Brca1 maintains genome integrity through homologous recombination repair. Pathogenic variants raise breast and ovarian cancer risk, so mouse models support BRCA directed therapy development and synthetic lethality screens. Tissue restricted knockouts help isolate mammary biology without early embryonic complications that can complicate whole body loss. Humanized alleles are useful when antibodies are human epitope selective. Well chosen floxed lines shorten the path from genetics to pharmacology cohorts.',
  Brca2:
    'Brca2 works alongside Brca1 in DNA repair and drives similar clinical risk profiles. Engineered mice test platinum sensitivity, PARP combinations, and resistance mechanisms that emerge after treatment. Conditional approaches keep lethality manageable while still yielding tumors with clear repair deficits. Models are frequently crossed to tissue specific promoters so investigators can align organ site with the human syndrome.',
  Kras:
    'Kras is an iconic oncogene in pancreatic, lung, and colorectal cancers. Inducible and tissue restricted alleles made it possible to trigger tumors after development, which clarified driver status versus adaptation. Mouse work here informs combination trials, immune engagement, and biomarker timing. Floxed and point mutant lines each answer different questions: removal versus activating mutation, temporal control versus constitutive signaling.',
  Apoe:
    'Apoe influences lipoprotein metabolism and is a cornerstone of cardiovascular and Alzheimer disease research. The humanized alleles at this locus helped translate diet studies and immunotherapy ideas into preclinical formats that match human isoforms. Knockout and tissue restricted designs still matter when the question is receptor biology in liver versus microglia. Many cohorts now combine humanized Apoe with pathological transgenes for head to head comparisons.',
  Pdcd1:
    'Pdcd1 encodes PD1, a major immune checkpoint. Mouse models of Pdcd1 clarified how blockade reinvigorates T cells and set expectations that human trials later confirmed. Conditional alleles help dissect tissue resident versus circulating pools of PD1 signaling. Humanized lines align murine epitopes with therapeutic antibodies. These animals remain core infrastructure for combination oncology and for mechanistic studies of exhaustion.',
  Cd274:
    'Cd274 encodes PD L1, the ligand that engages PD1 on T cells. Models at this locus support tumor microenvironment studies, myeloid versus tumor expression split experiments, and combination regimens with chemotherapy or other checkpoints. Tissue selective deletion separates systemic biology from tumor intrinsic signaling. Humanized variants matter when programs need faithful binding to clinical antibodies.',
  Myc:
    'Myc is a transcriptional amplifier tied to growth programs across cancers. Mouse genetics made it possible to turn Myc dependent tumors on and off, revealing surprising regressions in some settings. Conditional control is important because constitutive misexpression is often not viable. These models inform synthetic lethality screens and rational combinations that exploit addiction rather than bulk cytotoxicity.',
  App:
    'App sits at the heart of Alzheimer disease genetics. Mouse lines that alter App dosage or sequence support amyloid centric hypotheses while newer knockin alleles aim to express human like isoforms under native regulation. Conditional designs help separate developmental effects from adult plaque dynamics. These models pair naturally with tau and microglia programs for multimodal studies.',
  Htt:
    'Htt is linked to Huntington disease through CAG expansion toxicity. Engineered mice helped translate human expansion alleles into measurable motor and molecular phenotypes. Conditional deletion and inducible expression lines separate developmental requirement from adult toxicity pathways. They remain central to huntingtin lowering and gene therapy evaluation.',
  Sod1:
    'Sod1 mutations cause familial ALS through gain of toxic function mechanisms. Mouse models clarified the non cell autonomous roles of glia and guided antisense trials. Tissue restricted knockouts distinguish motor neuron intrinsic stress from surrounding support cells. Models at this locus remain reference tools for motor neuron disease pipelines.',
  Tnf:
    'Tnf drives acute inflammation and underpins approved biologics for autoimmune disease. Global and tissue restricted mouse alleles clarified where neutralization helps versus impairs host defense. Conditional alleles help model cytokine storms and chronic ileitis with more anatomical precision. These lines still anchor many immunology screens.',
  Il6:
    'Il6 is a pleiotropic cytokine in infection, cancer, and metabolic stress. Mouse genetics separated classical from trans signaling hypotheses and informed trial design for neutralizing antibodies. Tissue selective alleles isolate liver versus immune contributions. Humanized variants appear in translationally aligned inflammation models.',
  Foxp3:
    'Foxp3 defines regulatory T cell identity. Engineered mice clarified how Treg loss unleashes autoimmunity and how targeted modulation might treat cancer without catastrophic inflammation. Cre lines under Foxp3 regulatory elements are reference tools across immunology. Conditional timing experiments separate development from homeostasis in tolerance.',
};

export const CURATED_INTRO_GENES = new Set(Object.keys(curatedGeneIntros));

export function getCuratedIntro(gene: string): string | undefined {
  return curatedGeneIntros[gene];
}
