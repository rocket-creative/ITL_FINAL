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

/** Short biology phrases for PI to PI openers (fit after "the question is"). */
const ROLE_EXACT = {
  Egfr: 'EGF receptor driven epithelial growth and solid tumors',
  Vegfa: 'VEGF driven angiogenesis in tumors, retina, or ischemic tissue',
  Mthfr: 'folate metabolism and homocysteine balance',
  Esr1: 'estrogen receptor programs in breast, bone, or metabolism',
  Akt1: 'Pi3K Akt survival signaling after growth factor input',
  Braf: 'MAPK signaling in melanoma and related cancers',
  Nras: 'Ras signaling related to Kras, with its own tissue bias',
  Hras: 'Ras signaling in skin and bladder tumor genetics',
  Mycn: 'Myc driven transcription in neuroblastoma',
  Mycl: 'Myc family transcription in lung and neuroendocrine lineages',
  Pik3ca: 'Pi3K alpha signaling as a solid tumor driver',
  Mtor: 'nutrient sensing, growth, and autophagy control',
  Rb1: 'Rb restraint of E2F at the G1 to S transition',
  Atm: 'DNA double strand break sensing and checkpoint control',
  Atr: 'replication stress checkpoints in S phase',
  Apc: 'the main brake on Wnt in the gut and a classic colorectal tumor suppressor',
  Ctnnb1: 'beta catenin, the transcriptional effector of Wnt',
  Stat3: 'Jak Stat transcription linking inflammation to tumor niches',
  Hif1a: 'hypoxia driven transcriptional rewiring',
  Notch1: 'Notch decisions in lymphocytes and epithelium',
  Ptch1: 'Hedgehog reception and Smoothened restraint',
  Cdkn2a: 'INK4 ARF brakes on CDK and p53 pathways',
};

const ROLE_PREFIX = [
  [/^Tlr/, 'sensing microbial patterns through Toll like receptors'],
  [/^Il\d|^Il1|^Il2|^Il6|^Il10|^Il12|^Il17|^Il23|^Il27|^Il33/, 'interleukin signaling between immune cells'],
  [/^Ccl|^Cxcl|^Ccr|^Cxcr/, 'chemokine directed leukocyte traffic'],
  [/^Cd\d/, 'immune cell surface receptor function'],
  [/^Hla|^H2/, 'antigen presentation to adaptive immune cells'],
  [/^Ifn|^Ifnar|^Ifngr|^Irf/, 'interferon responses in infection and inflammation'],
  [/^Jak|^Stat|^Tyk/, 'Jak Stat signaling downstream of cytokines'],
  [/^Mapk|^Map2k|^Map3k|^Raf|^Mek/, 'MAPK cascade responses to growth and stress'],
  [/^Pik3|^Pten|^Akt|^Mtor|^Tsc|^Rheb|^Rictor|^Rptor/, 'Pi3K Akt mTOR growth control'],
  [/^Cdk|^Ccnd|^Ccne|^Cdkn|^Rb|^E2f/, 'moving cells through the G1 to S transition'],
  [/^Brca|^Rad|^Fanc|^Palb|^Mlh|^Msh|^Pms|^Chek|^Atm|^Atr/, 'DNA repair and checkpoint control'],
  [/^Wnt|^Fzd|^Lrp|^Dkk|^Axin|^Gsk3/, 'Wnt pathway control of growth and patterning'],
  [/^Bmp|^Gdf|^Smad|^Acvr|^Tgfb|^Tgfbr|^Inhb|^Nodal|^Lefty/, 'TGF beta family signaling in patterning and fibrosis'],
  [/^Fgf|^Fgfr/, 'FGF receptor signaling in morphogenesis and repair'],
  [/^Notch|^Dll|^Jag|^Hes|^Hey/, 'Notch mediated fate decisions'],
  [/^Shh|^Ihh|^Dhh|^Ptch|^Smo|^Gli/, 'Hedgehog patterning in development and cancer'],
  [/^Egf|^Erbb|^Nrg/, 'EGF family receptor signaling in epithelial growth'],
  [/^Tnf|^Tnfr|^Tnfsf|^Tnfrsf/, 'TNF family inflammation and cell death'],
  [/^Casp|^Bcl|^Bax|^Bak|^Mcl|^Xiap/, 'deciding whether a cell survives or dies'],
  [/^App|^Psen|^Mapt|^Apoe|^Snca|^Pink|^Park|^Lrrk|^Htt|^Sod1|^Tardbp|^Fus|^C9orf/, 'neurodegeneration and neuronal stress'],
  [/^Grin|^Gria|^Gab|^Slc6|^Chat|^Th|^Drd|^Htr|^Oprm|^Bdnf|^Ntrk/, 'synaptic transmission and neuromodulation'],
  [/^Insr|^Ins|^Gck|^G6pc|^Pck|^Foxo|^Sirt|^Prkaa|^Prkab|^Prkag|^Ppar|^Srebf|^Ldlr|^Pcsk/, 'glucose, lipid, and energy sensing'],
  [/^Abca|^Abcg|^Apo[a-z]|^Cetp|^Lpl/, 'lipoprotein and lipid transport'],
  [/^Col|^Mmp|^Timp|^Fn1|^Lama|^Itga|^Itgb/, 'matrix remodeling and cell adhesion'],
  [/^Vegf|^Flt|^Kdr|^Tek|^Angpt/, 'angiogenesis and vessel stability'],
  [/^Nos|^Ptgs|^Alox|^Cybb/, 'inflammatory mediators and redox enzymes'],
  [/^Udp|^Cyp|^Gst|^Nat|^Sult/, 'xenobiotic and steroid metabolism'],
  [/^Adr|^Adrb|^Agtr|^Ace|^Nppa|^Nppb/, 'cardiovascular hormone signaling'],
  [/^Lep|^Lepr|^Ghsr|^Mc4r|^Npy|^Pomc/, 'appetite and energy balance circuits'],
  [/^Grem|^Nog|^Chrd|^Sost|^Fst|^Cer|^Dand/, 'buffering BMP and related morphogens'],
  [/^Aldh|^Cyp26|^Rar|^Rxr/, 'making, clearing, or sensing retinoic acid'],
];

function roleForGene(gene) {
  if (ROLE_EXACT[gene.mouseSymbol]) return ROLE_EXACT[gene.mouseSymbol];
  for (const [re, phrase] of ROLE_PREFIX) {
    if (re.test(gene.mouseSymbol)) return phrase;
  }
  const cohortDefaults = {
    signaling: 'linking extracellular cues to growth and transcription',
    immune: 'host defense, tolerance, and inflammatory signaling',
    cancer: 'driver signaling, DNA repair, or tumor niche biology',
    neuroscience: 'circuit function or neurodegeneration',
    metabolism: 'energy balance and organ level metabolism',
    morphogen: 'patterning tissues during organogenesis',
  };
  return cohortDefaults[gene.cohort] || cohortDefaults.signaling;
}

/** PI explaining to another PI. No sales fluff. No em dashes. */
const BANKS = {
  signaling: {
    open: [
      '{mouse} is the mouse ortholog of human {human}. The question people bring is usually {role}.',
      '{mouse} ({human}) is the locus I would reach for when the experiment needs {role}.',
      '{mouse} is {role}. That is the mouse form of {human}.',
      '{mouse} is the mouse form of {human}. Most adult work here is really about {role}.',
      'For {role}, start with {mouse} rather than a random overexpression construct.',
    ],
    mod: [
      'A constitutive null is fine if the animals live. If they do not, flox {mouse} and delete with tissue or inducible Cre.',
      'I flox {mouse} first. Keep a null only if you need a severity benchmark or a rescue cross.',
      'Point mutant knockins make sense when human {human} variants change activity instead of removing the protein.',
      'Adult deletion of {mouse} is usually cleaner than taking it out from birth.',
      'If a related family member can compensate, plan the second conditional cross up front or the phenotype will look cleaner than it is.',
    ],
    human: [
      'Humanize {mouse} when your antibody or degrader prefers human {human} over mouse protein.',
      'A human exon knockin at {mouse} avoids false negatives from sequence drift in antibody studies.',
      'Reporter knockins tell you where {mouse} is expressed without removing every transcript.',
      'A {mouse} allele crossed to a pathway partner often beats studying the gene alone.',
      'If the compound only binds human {human}, humanize first and use a mouse null for mechanism.',
    ],
    close: [
      'If viability is unclear, flox first. Do not sink a colony into a constitutive null until you know.',
      'Floxed {mouse} plus a Cre you trust is enough for most adult signaling readouts.',
      'Add a point mutant or humanized allele only when a clean null will not answer the question.',
      'Cre specificity matters as much as the flox design. Validate the driver before you scale.',
      'Most programs need some mix of null, floxed, knockin, and humanized {mouse} alleles as the question evolves.',
    ],
  },
  immune: {
    open: [
      '{mouse} is the mouse ortholog of human {human}. Think {role}.',
      'For immune work on {role}, {mouse} is the allele most people build.',
      '{mouse} ({human}) comes up constantly in infection, autoimmunity, and tumor challenge.',
      'Human {human} maps to mouse {mouse}. That is the locus for {role}.',
      'If you need genetics for {role}, start with {mouse}.',
    ],
    mod: [
      'A global {mouse} knockout can scramble the whole immune system. Restrict the deletion to the cell type you care about.',
      'Delete {mouse} in T cells, B cells, myeloid cells, or epithelium if you need to know which compartment drives the phenotype.',
      'Inducible Cre after immune education finishes separates developmental effects from adult effector function.',
      'Single locus mutants often understate combination biology. Checkpoint or cytokine partner crosses are common with {mouse}.',
      'Reporter alleles let you track {mouse} positive cells during challenge without permanently removing the pathway.',
    ],
    human: [
      'Humanize {mouse} when clinical antibodies see human {human} epitopes that mouse protein lacks.',
      'Pair a humanized {mouse} target with a human immune engraftment host if the readout is a biologic.',
      'Native regulation knockins beat random overexpression for dosage sensitive cytokines like {mouse}.',
      'If the assay is antibody blockade of {human}, humanize {mouse} early. Use mouse nulls to show pathway need.',
      'Human sequence at {mouse} also helps when your diagnostic reagent only recognizes the human protein.',
    ],
    close: [
      'If systemic loss confounds the read, restrict the deletion. Do not force a global null for a cell type question.',
      'Humanize for antibody work on {human}. Use mouse nulls when you only need pathway necessity.',
      'Pick the Cre that matches the compartment in your primary assay before you lock the allele.',
      'For immuno oncology, humanized targets in the right immune context beat mouse only nulls.',
      'KO, cKO, knockin, and humanized {mouse} alleles are what most immune programs actually need.',
    ],
  },
  cancer: {
    open: [
      '{mouse} is the mouse ortholog of human {human}. Oncology work here is about {role}.',
      'If the genetics story is {role}, {mouse} is the allele I would build.',
      '{mouse} ({human}) shows up on therapy and resistance paths that need defined cohorts.',
      'Tumor studies of {mouse} start from {role}.',
      'For {role} in a mouse, build {mouse} as the ortholog of {human}.',
    ],
    mod: [
      'Tissue restricted or inducible alleles let tumors arise after development, closer to how patients acquire {human} lesions.',
      'A conventional knockout works for tumor suppressor dosage if homozygous {mouse} loss is tolerated long enough to score tumors.',
      'For oncogenes, activating knockins beat simple deletion of {mouse}.',
      'Crossing {mouse} to Kras, Trp53, or Myc is still the standard way to test cooperation and therapy response.',
      'If the null is embryonic lethal, go conditional or mosaic. Do not force a homozygous knockout for an adult tumor study.',
    ],
    human: [
      'Humanize {mouse} when the antibody, ADC, or degrader needs human {human} sequence in a mouse host.',
      'Patient variant knockins get you into pharmacology that matches clinical {human} mutations.',
      'Add humanized checkpoint partners when the readout is immunotherapy rather than tumor genetics alone.',
      'Orthotopic designs with engineered {mouse} alleles beat simple overexpression grafts for niche questions.',
      'If the biologic fails to cross react with mouse {mouse}, humanization is required, not optional.',
    ],
    close: [
      'Suppressors: flox or null. Drivers: activating knockin. Biologics aimed at {human}: humanize.',
      'If early lethality kills the adult tumor window, start with conditional {mouse}.',
      'Inducible timing lets you treat established disease instead of nascent lesions.',
      'Decide the readout first. Tumor control, metastasis, and drug response point to different alleles.',
      'Most oncology programs escalate across null, floxed, knockin, and humanized {mouse} alleles.',
    ],
  },
  neuroscience: {
    open: [
      '{mouse} is the mouse ortholog of human {human}. Neuro work here is about {role}.',
      'If the question is {role}, {mouse} is the locus I would build.',
      '{mouse} ({human}) comes up when you need clean genetics for {role}.',
      'Circuit and disease studies of {mouse} are really about {role}.',
      'For {role}, you want precise {mouse} genetics without losing animals before aging windows open.',
    ],
    mod: [
      'Region restricted deletion avoids developmental wiring defects that hide adult neurodegeneration phenotypes at {mouse}.',
      'Inducible neuronal or glial Cre separates cell autonomous stress from support cell contributions.',
      'Disease knockins beat overexpression transgenes when dosage and splicing matter for human {human} proteotoxicity.',
      'If you need aged cohorts, decide early whether you want a strong null or a milder hypomorphic knockin at {mouse}.',
      'For motor, memory, or survival curves, adult inducible loss or human variant knockins beat constitutive KO.',
    ],
    human: [
      'Humanize {mouse} when pathology depends on human specific isoforms or aggregation sequences in {human}.',
      'Antibody and ASO programs need human sequence at {mouse}. Mouse only genetics leave a gap.',
      'Reporter alleles map {mouse} across neuron and glia subtypes without removing function.',
      'Pairing {mouse} with a known neurodegeneration allele can reveal synergy that single locus genetics miss.',
      'If the binder only recognizes human {human}, humanize {mouse} before you invest in a large behavior study.',
    ],
    close: [
      'For adult brain questions, cKO or disease knockins beat harsh developmental nulls.',
      'Humanize when the drug needs human {human} sequence.',
      'Wiring, acute injury, and chronic proteinopathy need different KO versus knockin choices.',
      'In brain work, Cre choice is part of the design. Do not treat it as an afterthought.',
      'Most neuroscience programs need some mix of null, floxed, knockin, and humanized {mouse} alleles.',
    ],
  },
  metabolism: {
    open: [
      '{mouse} is the mouse ortholog of human {human}. The biology is {role}.',
      'If you are running diet or physiology studies on {role}, {mouse} is the allele.',
      '{mouse} ({human}) is what I would build for {role}.',
      'Metabolic work on {mouse} is almost always about {role}.',
      'For {role}, build {mouse} as the mouse form of {human}.',
    ],
    mod: [
      'Liver, adipose, muscle, or kidney restricted alleles tell you which organ supplies the {mouse} phenotype under diet challenge.',
      'Whole body knockout still helps for circulating factors when tissue source matters less than systemic loss of {mouse}.',
      'Inducible adult deletion cuts developmental metabolic confounds that show up in constitutive {mouse} nulls.',
      'Knockins that mimic human {human} coding variants go beyond simple loss of function.',
      'If related metabolic nodes may compensate, plan challenge diets and partner genetics with the primary {mouse} allele.',
    ],
    human: [
      'Humanize {mouse} when antibodies, enzyme replacements, or peptides are built on human {human} rather than mouse protein.',
      'Pharmacodynamic studies often need a humanized target plus a diet inducible disease background.',
      'Transgenic overexpression models pathway gain when the hypothesis is agonism rather than loss of {mouse}.',
      'Reporter knockins show tissue induction during fasting or obesity without changing coding sequence.',
      'For sequence selective biologics, humanize {mouse} for efficacy and keep mouse nulls for mechanism.',
    ],
    close: [
      'Organ restricted cKO maps the source. Humanize when the therapeutic is built on human {human}.',
      'Inducible adult alleles avoid developmental compensation in energy balance circuits involving {mouse}.',
      'Glucose, lipid, and cardiovascular readouts often need different Cre geography.',
      'Tissue specific deletion plus a controlled diet beats an untimed global null for most drug studies.',
      'Most cardio metabolic programs need some mix of null, floxed, knockin, and humanized {mouse} alleles.',
    ],
  },
  morphogen: {
    open: [
      '{mouse} is the mouse ortholog of human {human}. The biology is {role}.',
      'Developmental work on {mouse} is about {role}. Expect early lethality risk.',
      '{mouse} ({human}) is the locus for {role}.',
      'Human {human} maps to mouse {mouse}. That is where {role} is modeled.',
      'If the gene touches gastrulation or organ budding, assume a constitutive {mouse} null may not give you adults.',
    ],
    mod: [
      'Global knockout often wrecks early patterning. Conditional deletion of {mouse} after the critical window is usually required for adult questions.',
      'Tissue restricted Cre tells you whether {mouse} acts from epithelium, mesenchyme, or an organizing center.',
      'Hypomorphic knockins can mimic human {human} dosage syndromes better than complete nulls when partial function is the clinical picture.',
      'Timed inducible alleles separate embryonic patterning failure from adult repair involving {mouse}.',
      'If sibling morphogens may compensate, plan dual conditional strategies. A single locus null can miss the adult phenotype.',
    ],
    human: [
      'Humanize {mouse} for biologics and ligand traps that bind human {human} more tightly than mouse protein.',
      'Knockin reporters map source domains during development without removing ligand activity at {mouse}.',
      'Transgenic overexpression tests gain of morphogen activity when ectopic signaling is the disease idea.',
      'Partner genetics reduce redundancy risk that single morphogen knockouts leave behind.',
      'If the antibody is against human {human}, humanize {mouse} once the conditional plan looks viable.',
    ],
    close: [
      'For postnatal work, start with cKO. Add humanized or disease knockins only if you need human sequence or a patient variant.',
      'If embryogenesis collapses the cohort, do not force a conventional KO for an adult endpoint at {mouse}.',
      'Match Cre geography to the field that actually expresses {mouse}.',
      'Patterning genes need spatial and temporal control. Blunt systemic deletion rarely helps.',
      'Most morphogen programs need some mix of null, floxed, knockin, and humanized {mouse} alleles.',
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
  const role = roleForGene(gene);
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

  // Alias as its own plain sentence, never spliced into the role phrase.
  if (gene.aliases?.length && salt % 2 === 0) {
    const alias = String(gene.aliases[0]).replace(/-/g, ' ');
    if (alias && alias.toUpperCase() !== gene.humanSymbol.toUpperCase()) {
      sentences.splice(1, 0, `Some papers also call it ${alias}.`);
    }
  }

  let text = sentences.join(' ');

  // Pad short intros toward ~80–120 words
  let pad = 0;
  while (wordCount(text) < 80 && pad < 3) {
    const extraKey = pick(['mod', 'human', 'close'], h, 10 + pad);
    let extra = fill(pick(bank[extraKey], h, 20 + pad), ctx);
    if (!text.includes(extra.slice(0, 48))) {
      text = `${text} ${extra}`;
    }
    pad++;
  }

  let parts = text.match(/[^.]+[.]/g) || [text];
  while (wordCount(text) > 130 && parts.length > 3) {
    parts = parts.slice(0, -1);
    text = parts.map((p) => p.trim()).join(' ');
    if (!text.endsWith('.')) text += '.';
  }

  // No em dash, en dash, or spaced hyphen-as-dash. Brand rule.
  text = text.replace(/[\u2013\u2014\u2015]/g, ',');
  text = text.replace(/\s+-\s+/g, ', ');
  text = text.replace(/\bleverage\b/gi, 'use').replace(/\butilize\b/gi, 'use');
  text = text.replace(/\bingenious targeting laboratory can quote\b[^.]*\./gi, '');
  text = text.replace(/\s{2,}/g, ' ').trim();
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
        ` Compare floxed ${gene.mouseSymbol} against a reference null before you scale colonies.`,
        ` Null, floxed, and humanized options at this locus cover most study designs.`,
        ` Decide up front whether you need developmental viability or adult inducible control.`,
        ` If a close allele already exists in catalog, you can sometimes start from that backbone.`,
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
