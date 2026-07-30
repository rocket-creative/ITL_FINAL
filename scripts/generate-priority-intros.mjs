#!/usr/bin/env node
/**
 * Generate curated gene intros for PRIORITY_GENES missing from curatedIntros.ts,
 * then append non-morphogen hub lines to public/llms.txt.
 *
 * Preserves handwritten flagship + morphogen Tier A intros.
 * Regenerates all other priority gene intros on each run.
 *
 * Run: node scripts/generate-priority-intros.mjs
 */

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INTROS_PATH = join(ROOT, 'src/lib/seo/curatedIntros.ts');
const LLMS_PATH = join(ROOT, 'public/llms.txt');

const FLAGSHIP_KEEP = new Set([
  'Trp53', 'Pten', 'Brca1', 'Brca2', 'Kras', 'Apoe', 'Pdcd1', 'Cd274', 'Myc',
  'App', 'Htt', 'Sod1', 'Tnf', 'Il6', 'Foxp3',
]);

function loadPriorityGenes() {
  const helper = `
import { PRIORITY_GENES } from ${JSON.stringify(join(ROOT, 'src/data/priorityGenes.ts'))};
const out = PRIORITY_GENES.map((g) => ({
  mouseSymbol: g.mouseSymbol,
  humanSymbol: g.humanSymbol,
  aliases: g.aliases ?? [],
  cohort: g.cohort,
  tier: g.tier,
  family: g.family ?? null,
}));
process.stdout.write(JSON.stringify(out));
`;
  const tmp = join(ROOT, `.priority-genes-dump-${process.pid}.mts`);
  writeFileSync(tmp, helper);
  try {
    const raw = execFileSync(
      process.execPath,
      ['--experimental-strip-types', tmp],
      { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 },
    );
    const start = raw.indexOf('[');
    return JSON.parse(raw.slice(start));
  } finally {
    try {
      unlinkSync(tmp);
    } catch {
      /* ignore */
    }
  }
}

function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(arr, h, salt = 0) {
  return arr[(h + salt * 17) % arr.length];
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const ROLE_EXACT = {
  Egfr: 'receptor tyrosine kinase signaling that drives epithelial growth and many solid tumor programs',
  Vegfa: 'angiogenic ligand biology that shapes vascular supply in tumors, retina, and ischemic tissue',
  Mthfr: 'folate one carbon metabolism tied to homocysteine tone and developmental risk genetics',
  Esr1: 'estrogen receptor alpha transcription programs in breast, bone, and metabolic tissues',
  Akt1: 'Pi3K Akt survival signaling that couples growth factor input to cell survival',
  Braf: 'MAPK cascade kinase activity central to melanoma and other MAPK driven cancers',
  Nras: 'Ras GTPase signaling overlapping Kras biology with distinct tissue preferences',
  Hras: 'Ras GTPase signaling historically tied to skin and bladder tumor genetics',
  Mycn: 'Myc family transcriptional amplification in neuroblastoma and developmental lineages',
  Mycl: 'Myc family transcriptional programs with lung and neuroendocrine relevance',
  Pik3ca: 'catalytic Pi3K alpha signaling that is a frequent solid tumor driver',
  Mtor: 'nutrient sensing kinase control of growth, autophagy, and metabolic reprogramming',
  Rb1: 'pocket protein restraint of E2F driven cell cycle entry',
  Atm: 'DNA double strand break sensing that coordinates repair and checkpoint arrest',
  Atr: 'replication stress checkpoint signaling that protects genome integrity during S phase',
  Apc: 'Wnt destruction complex scaffolding and colorectal tumor suppressor biology',
  Ctnnb1: 'beta catenin transcriptional output downstream of Wnt pathway activation',
  Stat3: 'Jak Stat transcriptional programs linking inflammation to tumor and stem niches',
  Hif1a: 'hypoxia inducible transcription that rewires metabolism under low oxygen',
  Notch1: 'Notch receptor cleavage signaling in lymphocyte and epithelial fate control',
  Ptch1: 'Hedgehog reception and restraint of Smoothened activity in development and cancer',
  Cdkn2a: 'INK4 ARF locus control of CDK and p53 axis cell cycle brakes',
};

const ROLE_PREFIX = [
  [/^Tlr/, 'Toll like receptor innate sensing that alerts myeloid and epithelial cells to microbial patterns'],
  [/^Il\d|^Il1|^Il2|^Il6|^Il10|^Il12|^Il17|^Il23|^Il27|^Il33/, 'interleukin cytokine signaling that tunes immune cell communication'],
  [/^Ccl|^Cxcl|^Ccr|^Cxcr/, 'chemokine gradient biology that directs leukocyte trafficking'],
  [/^Cd\d/, 'immune cell surface receptor biology used for lineage marking and checkpoint studies'],
  [/^Hla|^H2/, 'antigen presentation machinery that shapes adaptive immune recognition'],
  [/^Ifn|^Ifnar|^Ifngr|^Irf/, 'interferon pathway signaling that programs antiviral and inflammatory states'],
  [/^Jak|^Stat|^Tyk/, 'Jak Stat kinase transcription cascades downstream of cytokine receptors'],
  [/^Mapk|^Map2k|^Map3k|^Raf|^Mek/, 'MAPK cascade phosphorylation that relays growth and stress cues'],
  [/^Pik3|^Pten|^Akt|^Mtor|^Tsc|^Rheb|^Rictor|^Rptor/, 'Pi3K Akt mTOR growth control linking nutrients to protein synthesis'],
  [/^Cdk|^Ccnd|^Ccne|^Cdkn|^Rb|^E2f/, 'cell cycle kinase and pocket protein control of G1 S progression'],
  [/^Brca|^Rad|^Fanc|^Palb|^Mlh|^Msh|^Pms|^Chek|^Atm|^Atr/, 'DNA repair and checkpoint biology that maintains genome stability'],
  [/^Wnt|^Fzd|^Lrp|^Dkk|^Axin|^Gsk3/, 'Wnt pathway ligand receptor and destruction complex signaling'],
  [/^Bmp|^Gdf|^Smad|^Acvr|^Tgfb|^Tgfbr|^Inhb|^Nodal|^Lefty/, 'TGF beta superfamily Smad signaling in patterning and fibrosis'],
  [/^Fgf|^Fgfr/, 'FGF receptor tyrosine kinase signaling in morphogenesis and repair'],
  [/^Notch|^Dll|^Jag|^Hes|^Hey/, 'Notch ligand receptor lateral inhibition and fate commitment'],
  [/^Shh|^Ihh|^Dhh|^Ptch|^Smo|^Gli/, 'Hedgehog pathway patterning of midline, limb, and oncogenic niches'],
  [/^Egf|^Erbb|^Nrg/, 'EGF family receptor signaling in epithelial growth and HER2 aligned oncology'],
  [/^Tnf|^Tnfr|^Tnfsf|^Tnfrsf/, 'TNF superfamily inflammation and cell death receptor signaling'],
  [/^Casp|^Bcl|^Bax|^Bak|^Mcl|^Xiap/, 'apoptotic and survival rheostat control of programmed cell death'],
  [/^App|^Psen|^Mapt|^Apoe|^Snca|^Pink|^Park|^Lrrk|^Htt|^Sod1|^Tardbp|^Fus|^C9orf/, 'neurodegeneration pathway biology spanning proteostasis and neuronal stress'],
  [/^Grin|^Gria|^Gab|^Slc6|^Chat|^Th|^Drd|^Htr|^Oprm|^Bdnf|^Ntrk/, 'synaptic transmission and neuromodulator signaling in circuit physiology'],
  [/^Insr|^Ins|^Gck|^G6pc|^Pck|^Foxo|^Sirt|^Prkaa|^Prkab|^Prkag|^Ppar|^Srebf|^Ldlr|^Pcsk/, 'metabolic endocrine control of glucose, lipids, and energy sensing'],
  [/^Abca|^Abcg|^Apo[a-z]|^Cetp|^Lpl/, 'lipoprotein and lipid transport biology in cardiovascular risk'],
  [/^Col|^Mmp|^Timp|^Fn1|^Lama|^Itga|^Itgb/, 'extracellular matrix remodeling and adhesion signaling'],
  [/^Vegf|^Flt|^Kdr|^Tek|^Angpt/, 'angiogenesis and vascular stability signaling'],
  [/^Nos|^Ptgs|^Alox|^Cybb/, 'inflammatory mediator and redox enzyme biology'],
  [/^Udp|^Cyp|^Gst|^Nat|^Sult/, 'xenobiotic and steroid metabolism enzyme activity'],
  [/^Adr|^Adrb|^Agtr|^Ace|^Nppa|^Nppb/, 'cardiovascular hormone and receptor signaling'],
  [/^Lep|^Lepr|^Ghsr|^Mc4r|^Npy|^Pomc/, 'central appetite and energy balance circuit biology'],
  [/^Grem|^Nog|^Chrd|^Sost|^Fst|^Cer|^Dand/, 'BMP antagonist and extracellular morphogen buffer activity'],
  [/^Aldh|^Cyp26|^Rar|^Rxr/, 'retinoic acid synthesis, clearance, or nuclear receptor sensing'],
];

function roleForGene(gene) {
  if (ROLE_EXACT[gene.mouseSymbol]) return ROLE_EXACT[gene.mouseSymbol];
  for (const [re, phrase] of ROLE_PREFIX) {
    if (re.test(gene.mouseSymbol)) return phrase;
  }
  const cohortDefaults = {
    signaling: 'core intracellular signaling that couples extracellular cues to transcription and growth',
    immune: 'immune pathway activity that shapes host defense, tolerance, or inflammatory disease',
    cancer: 'cancer relevant pathway activity spanning driver signaling, repair, or tumor microenvironment',
    neuroscience: 'nervous system pathway activity relevant to circuit function or neurodegeneration',
    metabolism: 'metabolic or cardiovascular pathway activity tied to energy balance and organ stress',
    morphogen: 'developmental morphogen or modulator activity that patterns tissues during organogenesis',
  };
  return cohortDefaults[gene.cohort] || cohortDefaults.signaling;
}

/** ~20+ templates per cohort slot; sentences are long enough to hit ~110-150 words at 4 sentences. */
const BANKS = {
  signaling: {
    open: [
      '{mouse} ({human}) is a priority signaling hub for mouse modeling because it participates in {role}, which means allele choice quickly decides whether you can score adult pharmacology or only developmental collapse.',
      'Teams requesting {mouse} usually need clean genetics around {role}, so the first decision is whether human {human} biology is better served by a null, a floxed conditional, or a disease relevant knockin.',
      '{mouse} is the mouse ortholog of human {human} and sits in {role}. Model design should therefore separate pathway collapse from pathway activation and from epitope matched humanization.',
      'Decision oriented work on {mouse} begins with {role}. That framing tells you whether conventional knockout is informative or whether tissue timed deletion is mandatory for usable cohorts.',
      'Commercial demand for {mouse} tracks {role}. Investigators typically compare knockout severity against conditional strategies before committing production scale colonies.',
    ],
    mod: [
      'Conventional knockout clarifies systemic loss when the allele is viable, while floxed {mouse} with inducible or tissue Cre is the safer path when developmental compensation or early lethality is likely.',
      'Prefer conditional knockout when whole body deletion risks early phenotypes, and keep a reference null only when you need allele severity benchmarks or rescue studies.',
      'Point mutant knockins answer activating versus loss of function questions that a clean null cannot, especially when human {human} variants are kinase, GTPase, or scaffolding changes rather than total absence.',
      'Timed deletion after organogenesis finishes separates developmental requirement from adult pathway tone, which is usually what combination drug studies actually need.',
      'If redundancy with related pathway members is expected, plan compound conditional genetics early rather than discovering masked phenotypes after a single locus knockout.',
    ],
    human: [
      'Humanized {mouse} becomes relevant when therapeutic antibodies, degraders, or binders discriminate human {human} from the mouse protein at the epitope level.',
      'For antibody and PROTAC style programs, humanized or human exon knockin alleles reduce false negatives caused by species sequence drift at the binding surface.',
      'Transgenic overexpression or knockin reporters help map dosage and expression domains without removing every endogenous {mouse} transcript, which is useful when complete loss is too harsh.',
      'Pairing {mouse} alleles with pathway partner genetics is often more informative than studying the locus in isolation, especially for signaling nodes with known cooperativity.',
      'When the therapeutic modality is sequence selective, design humanized {mouse} first and treat mouse only nulls as supporting mechanism tools rather than efficacy workhorses.',
    ],
    close: [
      'Choose KO versus cKO based on viability first, then match knockin or humanized designs to the modality you actually need to test in vivo.',
      'Model selection should follow whether you need pathway collapse, disease allele mimicry, or human epitope fidelity for the primary endpoint.',
      'A well chosen floxed line plus the right Cre usually shortens the path from genetics to interpretable signaling and efficacy cohorts.',
      'Keep the endpoint in view: signaling readouts, tumor latency, and drug response each favor different allele classes at {mouse}.',
      'Quote packages for {mouse} commonly include knockout, conditional knockout, knockin, humanized, and transgenic options so the program can escalate without remaking the project plan.',
    ],
  },
  immune: {
    open: [
      '{mouse} ({human}) contributes to {role}, so immune modeling decisions turn on which cell compartment must lose or gain function without collapsing the whole host response.',
      'Immune model design for {mouse} centers on {role}. Human {human} aligned questions then push the plan toward humanized targets when antibodies are the product.',
      '{mouse} is widely requested because it supports {role}. Global deletion can be informative, yet cell restricted conditional alleles usually give cleaner mechanism readouts.',
      'Human {human} maps to mouse {mouse}, a locus used to study {role}. Early consults should name the immune compartment and whether checkpoint, cytokine, or innate sensing biology dominates.',
      'Programs that touch {mouse} typically need cohorts that survive long enough for infection, autoimmunity, or tumor challenge, which favors thoughtful cKO timing over blunt nulls.',
    ],
    mod: [
      'Global knockout can unleash systemic inflammation or immunodeficiency, so tissue restricted or cell type specific conditional alleles often yield cleaner mechanism readouts for {mouse}.',
      'Conditional deletion in T cells, B cells, myeloid cells, or epithelium assigns which compartment actually drives the phenotype when {mouse} is broadly expressed.',
      'Inducible Cre after immune education completes helps separate developmental lineage effects from adult effector function during challenge models.',
      'Compound mutants with checkpoint or cytokine partners are common when monotherapy genetics understate combination immuno oncology biology around {mouse}.',
      'Reporter and lineage tracing alleles help track {mouse} positive cells during infection, autoimmunity, or tumor challenge without permanently removing pathway tone.',
    ],
    human: [
      'Humanized {mouse} lines matter when clinical antibodies bind human {human} epitopes poorly conserved in mouse, which is a frequent failure mode in checkpoint and cytokine programs.',
      'Human immune system engraftment hosts plus humanized {mouse} targets are frequently paired for biologics efficacy studies that cannot rely on mouse sequence alone.',
      'Knockin alleles that preserve expression under native regulation beat random transgenic overexpression for dosage sensitive cytokines and receptors such as {mouse}.',
      'If your primary assay is antibody blockade of {human}, plan humanized {mouse} early and use mouse nulls mainly to prove pathway necessity.',
      'Epitope matched humanization at {mouse} also helps when diagnostic reagents and clinical candidates share human selective binding surfaces.',
    ],
    close: [
      'Pick cell restricted cKO when systemic loss confounds interpretation, and reserve humanized designs for epitope matched antibody work on {human}.',
      'The practical question for {mouse} is whether you need a sterile null, a timed deletion, or a human sequence matched target for translational studies.',
      'Align Cre driver choice with the immune compartment named in your primary endpoint before locking production alleles.',
      'For translational immuno oncology, humanized targets plus syngeneic or humanized immune contexts usually outperform mouse only nulls at this locus.',
      'A decision oriented package for {mouse} should state KO, cKO, knockin, and humanized paths up front so viability and epitope needs do not collide mid study.',
    ],
  },
  cancer: {
    open: [
      '{mouse} ({human}) is prioritized in oncology modeling because of {role}. Allele class should follow whether the human genetics story is loss of a suppressor or gain of a driver.',
      'Cancer genetics programs treat {mouse} as a handle on {role}. Tissue restricted and inducible designs usually beat constitutive alleles for adult tumor windows.',
      '{mouse}, the mouse form of {human}, informs models built around {role}. The modeling decision is less about novelty and more about matching mutation timing to patient somatic events.',
      'When the brief is tumor biology at {mouse}, start from {role} and ask whether knockout, activating knockin, or humanized epitope fidelity is the binding constraint.',
      'Oncology demand for {mouse} stays high because {role} sits on common therapy and resistance paths that need genetically defined mouse cohorts.',
    ],
    mod: [
      'Tissue restricted and inducible alleles let tumors arise after development, which better mirrors somatic mutation timing in patients carrying {human} pathway lesions.',
      'Conventional knockout is useful for tumor suppressor dosage studies when homozygous loss of {mouse} is tolerated long enough to score cancer endpoints.',
      'Activating knockins and floxed stop cassettes are preferred for oncogenes where simple deletion of {mouse} answers the wrong biological question.',
      'Crossing {mouse} alleles to Kras, Trp53, or Myc backgrounds remains a standard way to test cooperation, latency, and therapy response.',
      'If embryonic lethality blocks colony expansion, do not force a homozygous null for an adult oncology endpoint; move to conditional or mosaic strategies.',
    ],
    human: [
      'Humanized {mouse} supports antibody, ADC, and degrader programs that require human {human} extracellular or epitope sequence inside a murine host.',
      'Patient variant knockins move beyond null alleles into genotype aligned pharmacology and resistance studies that better match clinical {human} mutations.',
      'Humanized immune checkpoint partners are often combined when the readout is immunotherapy rather than tumor genetics alone at {mouse}.',
      'Orthotopic and autochthonous designs using engineered {mouse} alleles usually beat subcutaneous overexpression grafts for microenvironmental questions.',
      'When biologics fail to cross react with mouse {mouse}, humanization is not optional polish; it is the efficacy model.',
    ],
    close: [
      'Match allele class to genetics: null or floxed for suppressors, activating knockin for drivers, humanized for biologics aimed at {human}.',
      'Start with conditional control if embryonic lethality or developmental compensation will erase your adult tumor window for {mouse}.',
      'Therapy studies benefit from inducible timing so treatment starts against established disease rather than nascent lesions.',
      'Define success as latent tumor control, metastasis metrics, or drug response before locking the {mouse} allele plan.',
      'Commercial hubs for {mouse} should offer knockout, conditional knockout, knockin, humanized, and transgenic routes so oncology programs can escalate cleanly.',
    ],
  },
  neuroscience: {
    open: [
      '{mouse} ({human}) is used in neuroscience pipelines focused on {role}. Adult circuit and neurodegeneration endpoints usually punish harsh developmental nulls.',
      'Neuro model requests for {mouse} typically cite {role}. Region restricted conditional alleles and disease knockins are the default tools for usable behavior cohorts.',
      '{mouse} encodes the mouse counterpart of {human} and participates in {role}. The key modeling fork is developmental wiring versus adult proteinopathy or synaptic physiology.',
      'Circuit and disease teams approach {mouse} through {role}. Prefer progressive, cell type limited alleles when behavior or neurodegeneration is the primary readout.',
      'Demand for {mouse} rises when programs need genetically precise handles on {role} without wiping out the animal before aging windows open.',
    ],
    mod: [
      'Conditional and region restricted deletion avoids developmental circuit wiring defects that can mask adult neurodegeneration or behavior endpoints at {mouse}.',
      'Inducible neuronal or glial Cre drivers separate cell autonomous stress from non cell autonomous support cell contributions when interpreting {mouse} phenotypes.',
      'Knockin disease alleles often outperform overexpression transgenes when dosage and splicing fidelity matter for proteotoxicity linked to human {human}.',
      'Aged cohorts and progressive phenotyping windows should drive whether you need a strong null or a milder hypomorphic knockin at {mouse}.',
      'Neurodegeneration tips favor adult inducible loss or human variant knockins over constitutive KO whenever motor, memory, or survival curves are the deliverable.',
    ],
    human: [
      'Humanized {mouse} is valuable when pathology depends on human specific isoforms, epitopes, or aggregation sequences present in {human}.',
      'For antibody and ASO programs, human sequence at the {mouse} locus reduces translational gaps versus mouse only genetics.',
      'Reporter alleles help map {mouse} expression across neuron and glia subtypes without ablating function during circuit mapping.',
      'Pairing {mouse} models with known neurodegeneration alleles can reveal synergy that single locus genetics miss in aging cohorts.',
      'If the therapeutic binder only recognizes human {human}, build humanized {mouse} before investing in large behavior pharmacology studies.',
    ],
    close: [
      'Prefer cKO or disease knockins for adult brain questions, and use humanized alleles when the therapeutic modality is sequence selective for {human}.',
      'Neurodegeneration tips favor progressive, region limited alleles over harsh developmental nulls whenever behavior is the primary readout for {mouse}.',
      'Confirm whether your endpoint is developmental wiring, acute injury, or chronic proteinopathy before choosing KO versus knockin.',
      'Cell type specificity usually matters more in brain than bulk pathway collapse, so Cre choice is part of the {mouse} product definition.',
      'A complete {mouse} offer should include knockout, conditional knockout, knockin, humanized, and transgenic paths for neuroscience programs.',
    ],
  },
  metabolism: {
    open: [
      '{mouse} ({human}) anchors metabolic modeling around {role}. Organ restricted conditional alleles usually outperform untimed global nulls under diet challenge.',
      'Cardio metabolic programs select {mouse} when the biology is {role}. Clarify whether glucose, lipid, or cardiovascular readouts dominate before locking Cre geography.',
      '{mouse} is the mouse ortholog of {human} involved in {role}. Inducible adult deletion reduces developmental set point confounds that appear in constitutive knockouts.',
      'Diet, drug, and physiology studies lean on {mouse} because of {role}. Model choice should map ligand source and sensing tissue rather than assume whole body loss is enough.',
      'Commercial interest in {mouse} follows {role}, especially when humanized alleles are needed for biologics built on human {human} sequence.',
    ],
    mod: [
      'Liver, adipose, muscle, or kidney restricted conditional alleles assign which organ supplies the {mouse} phenotype under diet or drug challenge.',
      'Whole body knockout remains useful for circulating factor genetics when tissue source is secondary to systemic loss of {mouse}.',
      'Inducible deletion in adult mice reduces developmental metabolic set point confounds that appear in constitutive {mouse} nulls.',
      'Knockin alleles that mimic human {human} coding variants support precision genetics beyond simple loss of function at this locus.',
      'If compensation through related metabolic nodes is likely, design challenge diets and compound genetics together with the primary {mouse} allele.',
    ],
    human: [
      'Humanized {mouse} helps when clinical antibodies, enzyme replacements, or peptide analogs are built on human {human} sequence rather than mouse protein.',
      'Pharmacodynamic studies often need humanized targets plus diet inducible disease backgrounds for translational alignment around {mouse}.',
      'Transgenic overexpression can model gain of circulating factor tone when the therapeutic hypothesis is pathway agonism rather than loss of {mouse}.',
      'Reporter knockins clarify tissue induction during fasting, obesity, or atherosclerosis without altering coding sequence at {mouse}.',
      'Sequence selective metabolic biologics should treat humanized {mouse} as the efficacy chassis and mouse nulls as supporting mechanism tools.',
    ],
    close: [
      'Choose organ restricted cKO for source mapping, humanized alleles for biologics, and diet aligned cohorts for physiological stress at {mouse}.',
      'Metabolic endpoints reward inducible adult alleles that avoid developmental compensation in energy balance circuits involving {mouse}.',
      'Clarify whether glucose, lipid, or cardiovascular readouts dominate before locking Cre and allele class for {mouse}.',
      'A clean tissue specific deletion plus controlled diet usually beats an untimed global null for drug studies on this pathway.',
      'Offer knockout, conditional knockout, knockin, humanized, and transgenic {mouse} options so cardio metabolic programs can escalate without restarting genetics.',
    ],
  },
  morphogen: {
    open: [
      '{mouse} ({human}) contributes to {role}. Global knockout often ends before adult questions can be asked, so conditional timing is the default commercial request.',
      'Developmental modeling of {mouse} starts from {role}. Tissue restricted Cre after the critical morphogenetic window is usually required for postnatal cohorts.',
      '{mouse} is requested for projects centered on {role}. Hypomorphic knockins can mimic human dosage syndromes better than complete nulls when partial function is clinical.',
      'Human {human} corresponds to mouse {mouse}, involved in {role}. Patterning genes reward spatial and temporal control more than blunt systemic deletion.',
      'Teams building {mouse} models should assume early lethality risk whenever {role} touches gastrulation, axis formation, or organ budding.',
    ],
    mod: [
      'Global knockout often disrupts early patterning, so conditional deletion of {mouse} after the critical morphogenetic window is usually required for adult questions.',
      'Tissue restricted Cre drivers isolate whether {mouse} acts from epithelium, mesenchyme, or a discrete organizing center during organogenesis.',
      'Hypomorphic knockins can mimic human {human} dosage syndromes better than complete nulls when partial function is the clinical picture.',
      'Timed inducible alleles separate embryonic patterning failure from adult repair or oncogenic niche signaling involving {mouse}.',
      'If redundancy with sibling morphogens is expected, plan compound conditional strategies rather than trusting a single locus null to reveal adult biology.',
    ],
    human: [
      'Humanized {mouse} matters for biologics and ligand traps that bind human {human} more tightly than the mouse protein.',
      'Knockin reporters map source domains during development and regeneration without removing ligand or antagonist activity at {mouse}.',
      'Transgenic overexpression tests gain of morphogen tone when ectopic signaling is the disease hypothesis around {mouse}.',
      'Compound genetics with pathway partners reduce redundancy risk that single morphogen knockouts can leave behind.',
      'Antibody programs against human {human} should prioritize humanized {mouse} once developmental viability of the conditional plan is proven.',
    ],
    close: [
      'Default to cKO for postnatal work, and add humanized or disease knockins when epitope fidelity or variant modeling is required for {mouse}.',
      'If embryogenesis collapses the cohort, do not force a conventional KO for an adult endpoint at {mouse}.',
      'Match Cre geography to the developmental field that actually expresses {mouse} in your system of interest.',
      'Patterning genes reward spatial and temporal control more than blunt systemic deletion, and quotes should say that clearly.',
      'A full {mouse} menu of knockout, conditional knockout, knockin, humanized, and transgenic alleles covers most morphogen program escalations.',
    ],
  },
};

const ORDERINGS = [
  ['open', 'mod', 'human', 'close'],
  ['open', 'human', 'mod', 'close'],
  ['open', 'mod', 'close', 'human'],
  ['open', 'close', 'mod', 'human'],
  ['open', 'mod', 'human', 'close'],
  ['open', 'human', 'close', 'mod'],
];

function fill(template, ctx) {
  return template
    .replaceAll('{mouse}', ctx.mouse)
    .replaceAll('{human}', ctx.human)
    .replaceAll('{role}', ctx.role);
}

function generateIntro(gene, salt = 0) {
  const h = hashString(`${gene.mouseSymbol}|${gene.cohort}|${salt}`);
  const bank = BANKS[gene.cohort] || BANKS.signaling;
  let role = roleForGene(gene);
  if (gene.aliases?.length) {
    const alias = String(gene.aliases[0]).replace(/-/g, ' ');
    if (salt % 2 === 0 && alias && alias.toUpperCase() !== gene.humanSymbol.toUpperCase()) {
      role = `${role}; also referenced as ${alias} in some literature`;
    }
  }
  const ctx = {
    mouse: gene.mouseSymbol,
    human: gene.humanSymbol,
    role,
  };
  const order = pick(ORDERINGS, h, 1);
  const used = new Set();
  const sentences = [];
  for (let i = 0; i < order.length; i++) {
    const key = order[i];
    let sentence = fill(pick(bank[key], h, i + 2), ctx);
    let guard = 0;
    while (used.has(sentence) && guard < 8) {
      sentence = fill(pick(bank[key], h, i + 2 + guard + 3), ctx);
      guard++;
    }
    used.add(sentence);
    sentences.push(sentence);
  }
  let text = sentences.join(' ');

  // Pad short intros toward ~120 words
  let pad = 0;
  while (wordCount(text) < 110 && pad < 4) {
    const extraKey = pick(['mod', 'human', 'close'], h, 10 + pad);
    let extra = fill(pick(bank[extraKey], h, 20 + pad), ctx);
    if (!text.includes(extra.slice(0, 48))) {
      text = `${text} ${extra}`;
    }
    pad++;
  }

  let parts = text.match(/[^.]+[.]/g) || [text];
  while (wordCount(text) > 180 && parts.length > 3) {
    parts = parts.slice(0, -1);
    text = parts.map((p) => p.trim()).join(' ');
    if (!text.endsWith('.')) text += '.';
  }

  text = text.replace(/\u2013|\u2014/g, ',');
  text = text.replace(/\bleverage\b/gi, 'use').replace(/\butilize\b/gi, 'use');
  // strip hyphenated compounds used as punctuation style (keep gene symbols intact)
  return text;
}

function parseExistingIntros(source) {
  const map = {};
  const re = /^ {2}([A-Za-z][A-Za-z0-9]*):\s*\n {4}'((?:\\'|[^'])*)'/gm;
  let m;
  while ((m = re.exec(source))) {
    map[m[1]] = m[2].replace(/\\'/g, "'");
  }
  return map;
}

function escapeTsSingle(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatIntrosTs(intros) {
  const keys = Object.keys(intros).sort((a, b) => a.localeCompare(b));
  const lines = [
    '/**',
    ' * Hand written intros for flagship genes (~200 words target). No hyphen style per brand rules.',
    ' * Priority cohort intros may be generated via scripts/generate-priority-intros.mjs and then curated.',
    ' */',
    '',
    'export const curatedGeneIntros: Record<string, string> = {',
  ];
  for (const key of keys) {
    lines.push(`  ${key}:`);
    lines.push(`    '${escapeTsSingle(intros[key])}',`);
  }
  lines.push('};');
  lines.push('');
  lines.push('export const CURATED_INTRO_GENES = new Set(Object.keys(curatedGeneIntros));');
  lines.push('');
  lines.push('export function getCuratedIntro(gene: string): string | undefined {');
  lines.push('  return curatedGeneIntros[gene];');
  lines.push('}');
  lines.push('');
  return lines.join('\n');
}

function morphogenListedInLlms(llms) {
  const set = new Set();
  const section = llms.split('## Priority morphogen gene hubs')[1] || '';
  const stop = section.search(/\n## /);
  const body = stop >= 0 ? section.slice(0, stop) : section;
  for (const line of body.split('\n')) {
    const m = line.match(/^- ([A-Za-z0-9]+) \(/);
    if (m) set.add(m[1]);
  }
  return set;
}

function hubLine(gene) {
  return `- ${gene.mouseSymbol} (${gene.humanSymbol}): knockout, conditional knockout, knockin, humanized, and transgenic generation. Hub: https://www.genetargeting.com/all-catalog-mouse-models/gene/${gene.mouseSymbol}/`;
}

function isHandwrittenKeep(gene, existingText) {
  if (FLAGSHIP_KEEP.has(gene.mouseSymbol)) return true;
  // morphogen Tier A handwritten pass: keep if already present and cohort morphogen tier A
  if (gene.cohort === 'morphogen' && gene.tier === 'A' && existingText) return true;
  return false;
}

function main() {
  const genes = loadPriorityGenes();
  const source = readFileSync(INTROS_PATH, 'utf8');
  const existing = parseExistingIntros(source);

  const keep = {};
  for (const gene of genes) {
    if (isHandwrittenKeep(gene, existing[gene.mouseSymbol]) && existing[gene.mouseSymbol]) {
      keep[gene.mouseSymbol] = existing[gene.mouseSymbol];
    }
  }
  // Also preserve non-priority handwritten (Foxp3, Htt, etc.)
  for (const [k, v] of Object.entries(existing)) {
    if (FLAGSHIP_KEEP.has(k)) keep[k] = v;
  }

  const toGenerate = genes.filter((g) => !keep[g.mouseSymbol]);
  const missingBefore = genes.filter((g) => !existing[g.mouseSymbol]);

  console.log(`Priority genes: ${genes.length}`);
  console.log(`Handwritten kept: ${Object.keys(keep).length}`);
  console.log(`Missing before (no intro at all): ${missingBefore.length}`);
  console.log(`To generate/regenerate: ${toGenerate.length}`);

  const merged = { ...keep };
  let added = 0;
  const seenIntros = new Set(Object.values(keep));
  const generatedSymbols = [];

  for (const gene of toGenerate) {
    let intro = generateIntro(gene, 0);
    let bounce = 0;
    while (seenIntros.has(intro) && bounce < 20) {
      bounce++;
      intro = generateIntro(gene, bounce);
    }
    if (seenIntros.has(intro)) {
      const h = hashString(gene.mouseSymbol + ':tail');
      const tails = [
        ` Investigators often compare floxed ${gene.mouseSymbol} against a reference null before scaling production cohorts.`,
        ` Quote ready packages typically include knockout, conditional knockout, and humanized options at this locus.`,
        ` Early consults should specify whether developmental viability or adult inducible control is the binding constraint.`,
        ` Catalog adjacent custom work can start from existing backbones when a close allele already exists.`,
      ];
      intro = `${intro.replace(/\.$/, '')}.${pick(tails, h, 3)}`.replace(/\.\./g, '.');
    }
    seenIntros.add(intro);
    merged[gene.mouseSymbol] = intro;
    generatedSymbols.push(gene.mouseSymbol);
    added++;
  }

  writeFileSync(INTROS_PATH, formatIntrosTs(merged));

  const afterMap = parseExistingIntros(readFileSync(INTROS_PATH, 'utf8'));
  const missingAfter = genes.filter((g) => !afterMap[g.mouseSymbol]);
  const generatedTexts = generatedSymbols.map((s) => afterMap[s]);
  const wc = generatedTexts.map(wordCount);
  const avg = wc.reduce((a, b) => a + b, 0) / (wc.length || 1);

  console.log(`Intros generated: ${added}`);
  console.log(`Total intros now: ${Object.keys(afterMap).length}`);
  console.log(`Missing after: ${missingAfter.length}`);
  console.log(
    `Generated word count avg: ${avg.toFixed(1)} (min ${Math.min(...wc)} max ${Math.max(...wc)})`,
  );
  console.log(`Unique generated intros: ${new Set(generatedTexts).size} / ${generatedTexts.length}`);

  // llms.txt: rewrite commercial section with all non-morphogen priority genes not in morphogen section
  let llms = readFileSync(LLMS_PATH, 'utf8');
  const morphogenListed = morphogenListedInLlms(llms);
  const sectionHeader =
    '## Priority commercial gene hubs (signaling, immune, cancer, neuroscience, metabolism)';

  const nonMorph = genes.filter((g) => g.cohort !== 'morphogen');
  const forLlms = nonMorph
    .filter((g) => !morphogenListed.has(g.mouseSymbol))
    .sort((a, b) => a.mouseSymbol.localeCompare(b.mouseSymbol));

  // Strip prior commercial section if present, then append fresh
  if (llms.includes(sectionHeader)) {
    const idx = llms.indexOf(sectionHeader);
    const after = llms.slice(idx + sectionHeader.length);
    const next = after.search(/\n## /);
    const before = llms.slice(0, idx).replace(/\s+$/, '\n');
    const rest = next >= 0 ? after.slice(next) : '';
    llms = `${before}\n${sectionHeader}\n\n${forLlms.map(hubLine).join('\n')}\n${rest}`;
  } else {
    if (!llms.endsWith('\n')) llms += '\n';
    llms += `\n${sectionHeader}\n\n${forLlms.map(hubLine).join('\n')}\n`;
  }
  writeFileSync(LLMS_PATH, llms);

  // Count how many of those lines are "new" vs already in morphogen section (all forLlms are by definition not morphogen-listed)
  console.log(`llms.txt commercial hub lines: ${forLlms.length}`);
  console.log(
    JSON.stringify({
      priorityGenes: genes.length,
      handwrittenKept: Object.keys(keep).length,
      missingBefore: missingBefore.length,
      generated: added,
      missingAfter: missingAfter.length,
      totalIntros: Object.keys(afterMap).length,
      llmsCommercialLines: forLlms.length,
      wordAvg: Number(avg.toFixed(1)),
      wordMin: Math.min(...wc),
      wordMax: Math.max(...wc),
      uniqueGenerated: new Set(generatedTexts).size,
    }),
  );
}

main();
