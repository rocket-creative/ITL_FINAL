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
  Egfr: 'EGF receptor signaling in epithelial growth and solid tumors',
  Vegfa: 'VEGF driven angiogenesis in tumors, retina, and ischemic tissue',
  Mthfr: 'folate metabolism linked to homocysteine and developmental risk',
  Esr1: 'estrogen receptor alpha programs in breast, bone, and metabolism',
  Akt1: 'Pi3K Akt survival signaling downstream of growth factors',
  Braf: 'MAPK kinase activity common in melanoma and related cancers',
  Nras: 'Ras GTPase signaling related to Kras, with its own tissue bias',
  Hras: 'Ras GTPase signaling long studied in skin and bladder tumors',
  Mycn: 'Myc family transcription amplified in neuroblastoma',
  Mycl: 'Myc family transcription with lung and neuroendocrine relevance',
  Pik3ca: 'Pi3K alpha catalytic signaling, a frequent solid tumor driver',
  Mtor: 'nutrient sensing control of growth, autophagy, and metabolism',
  Rb1: 'Rb pocket protein restraint of E2F cell cycle entry',
  Atm: 'DNA double strand break sensing and checkpoint control',
  Atr: 'replication stress checkpoint signaling in S phase',
  Apc: 'Wnt destruction complex scaffolding and colorectal tumor suppression',
  Ctnnb1: 'beta catenin transcription downstream of Wnt',
  Stat3: 'Jak Stat transcription linking inflammation to tumor niches',
  Hif1a: 'hypoxia inducible transcription under low oxygen',
  Notch1: 'Notch signaling in lymphocyte and epithelial fate',
  Ptch1: 'Hedgehog reception and Smoothened restraint in development and cancer',
  Cdkn2a: 'INK4 ARF control of CDK and p53 cell cycle brakes',
};

const ROLE_PREFIX = [
  [/^Tlr/, 'Toll like receptor sensing of microbial patterns'],
  [/^Il\d|^Il1|^Il2|^Il6|^Il10|^Il12|^Il17|^Il23|^Il27|^Il33/, 'interleukin cytokine signaling between immune cells'],
  [/^Ccl|^Cxcl|^Ccr|^Cxcr/, 'chemokine signaling that directs leukocyte traffic'],
  [/^Cd\d/, 'immune cell surface receptor biology'],
  [/^Hla|^H2/, 'antigen presentation for adaptive immunity'],
  [/^Ifn|^Ifnar|^Ifngr|^Irf/, 'interferon signaling in antiviral and inflammatory states'],
  [/^Jak|^Stat|^Tyk/, 'Jak Stat signaling downstream of cytokine receptors'],
  [/^Mapk|^Map2k|^Map3k|^Raf|^Mek/, 'MAPK cascade signaling for growth and stress cues'],
  [/^Pik3|^Pten|^Akt|^Mtor|^Tsc|^Rheb|^Rictor|^Rptor/, 'Pi3K Akt mTOR growth control'],
  [/^Cdk|^Ccnd|^Ccne|^Cdkn|^Rb|^E2f/, 'cell cycle control at the G1 to S transition'],
  [/^Brca|^Rad|^Fanc|^Palb|^Mlh|^Msh|^Pms|^Chek|^Atm|^Atr/, 'DNA repair and checkpoint biology'],
  [/^Wnt|^Fzd|^Lrp|^Dkk|^Axin|^Gsk3/, 'Wnt pathway ligand and destruction complex signaling'],
  [/^Bmp|^Gdf|^Smad|^Acvr|^Tgfb|^Tgfbr|^Inhb|^Nodal|^Lefty/, 'TGF beta family Smad signaling in patterning and fibrosis'],
  [/^Fgf|^Fgfr/, 'FGF receptor signaling in morphogenesis and repair'],
  [/^Notch|^Dll|^Jag|^Hes|^Hey/, 'Notch ligand receptor fate commitment'],
  [/^Shh|^Ihh|^Dhh|^Ptch|^Smo|^Gli/, 'Hedgehog pathway patterning in development and cancer'],
  [/^Egf|^Erbb|^Nrg/, 'EGF family receptor signaling in epithelial growth'],
  [/^Tnf|^Tnfr|^Tnfsf|^Tnfrsf/, 'TNF family inflammation and cell death signaling'],
  [/^Casp|^Bcl|^Bax|^Bak|^Mcl|^Xiap/, 'apoptotic and survival control of cell death'],
  [/^App|^Psen|^Mapt|^Apoe|^Snca|^Pink|^Park|^Lrrk|^Htt|^Sod1|^Tardbp|^Fus|^C9orf/, 'neurodegeneration biology spanning proteostasis and neuronal stress'],
  [/^Grin|^Gria|^Gab|^Slc6|^Chat|^Th|^Drd|^Htr|^Oprm|^Bdnf|^Ntrk/, 'synaptic transmission and neuromodulator signaling'],
  [/^Insr|^Ins|^Gck|^G6pc|^Pck|^Foxo|^Sirt|^Prkaa|^Prkab|^Prkag|^Ppar|^Srebf|^Ldlr|^Pcsk/, 'metabolic control of glucose, lipids, and energy sensing'],
  [/^Abca|^Abcg|^Apo[a-z]|^Cetp|^Lpl/, 'lipoprotein and lipid transport biology'],
  [/^Col|^Mmp|^Timp|^Fn1|^Lama|^Itga|^Itgb/, 'extracellular matrix remodeling and adhesion'],
  [/^Vegf|^Flt|^Kdr|^Tek|^Angpt/, 'angiogenesis and vascular stability signaling'],
  [/^Nos|^Ptgs|^Alox|^Cybb/, 'inflammatory mediator and redox enzyme biology'],
  [/^Udp|^Cyp|^Gst|^Nat|^Sult/, 'xenobiotic and steroid metabolism'],
  [/^Adr|^Adrb|^Agtr|^Ace|^Nppa|^Nppb/, 'cardiovascular hormone and receptor signaling'],
  [/^Lep|^Lepr|^Ghsr|^Mc4r|^Npy|^Pomc/, 'central appetite and energy balance circuits'],
  [/^Grem|^Nog|^Chrd|^Sost|^Fst|^Cer|^Dand/, 'BMP antagonist and morphogen buffer activity'],
  [/^Aldh|^Cyp26|^Rar|^Rxr/, 'retinoic acid synthesis, clearance, or nuclear sensing'],
];

function roleForGene(gene) {
  if (ROLE_EXACT[gene.mouseSymbol]) return ROLE_EXACT[gene.mouseSymbol];
  for (const [re, phrase] of ROLE_PREFIX) {
    if (re.test(gene.mouseSymbol)) return phrase;
  }
  const cohortDefaults = {
    signaling: 'intracellular signaling that links extracellular cues to growth',
    immune: 'immune signaling in host defense, tolerance, or inflammation',
    cancer: 'cancer pathway biology spanning drivers, repair, or tumor niche',
    neuroscience: 'nervous system biology relevant to circuits or neurodegeneration',
    metabolism: 'metabolic or cardiovascular biology tied to energy balance',
    morphogen: 'developmental signaling that patterns tissues during organogenesis',
  };
  return cohortDefaults[gene.cohort] || cohortDefaults.signaling;
}

/** Short colleague-tone sentences; ~80–120 words across 3–4 sentences. */
const BANKS = {
  signaling: {
    open: [
      '{mouse} is the mouse form of human {human} and takes part in {role}.',
      'Labs ask about {mouse} when the question centers on {role}.',
      '{mouse} ({human}) sits in {role}, so allele choice tends to matter early.',
      'Most {mouse} projects start from a simple read of {role}.',
      'If your work touches {role}, {mouse} is usually on the short list.',
    ],
    mod: [
      'A whole body knockout works when the allele is viable. If early lethality shows up, a floxed {mouse} line with tissue or inducible Cre is usually the safer route.',
      'Many groups flox {mouse} first, then keep a null only if they need a severity benchmark or a rescue cross.',
      'Point mutant knockins help when human {human} variants change activity rather than remove the protein entirely.',
      'Deleting {mouse} after development finishes often gives cleaner adult readouts than a constitutive null.',
      'Related pathway members can mask a single locus knockout, so dual conditional crosses are worth planning if redundancy is likely.',
    ],
    human: [
      'Humanized {mouse} helps when an antibody or degrader binds human {human} better than the mouse protein.',
      'For antibody work, a human exon knockin at {mouse} can avoid false negatives from sequence drift.',
      'Reporter knockins map where {mouse} is expressed without wiping out every transcript.',
      'Crossing {mouse} alleles to a pathway partner often says more than studying the gene alone.',
      'If the drug only recognizes human {human}, build the humanized allele first and use mouse nulls for mechanism checks.',
    ],
    close: [
      'Check viability first, then pick knockout, knockin, or humanized {mouse} based on what you need to measure.',
      'Whether you need loss of function, a disease allele, or human sequence at {mouse} usually settles the design.',
      'A floxed line plus a well chosen Cre is often enough to get usable signaling cohorts.',
      'Signaling readouts, tumor latency, and drug response each favor different allele classes at {mouse}.',
      'We commonly quote knockout, conditional knockout, knockin, and humanized options for {mouse}.',
    ],
  },
  immune: {
    open: [
      '{mouse} ({human}) contributes to {role}.',
      'Immune work on {mouse} usually starts from {role}.',
      '{mouse} supports {role}, so people ask which cell type should lose or gain function.',
      'Human {human} maps to mouse {mouse}, a locus used to study {role}.',
      '{mouse} comes up often in infection, autoimmunity, and tumor challenge studies.',
    ],
    mod: [
      'A global knockout can scramble the whole immune response. Cell type restricted conditional alleles at {mouse} usually give clearer answers.',
      'Deleting {mouse} in T cells, B cells, myeloid cells, or epithelium helps pin down which compartment drives the phenotype.',
      'Inducible Cre after immune education finishes separates developmental effects from adult effector function.',
      'Checkpoint or cytokine partner crosses are common when a single {mouse} mutant understates combination biology.',
      'Reporter alleles let you track {mouse} positive cells during challenge without permanently removing the pathway.',
    ],
    human: [
      'Humanized {mouse} matters when clinical antibodies bind human {human} epitopes that mouse protein lacks.',
      'Human immune engraftment hosts plus a humanized {mouse} target are a frequent pair for biologics studies.',
      'Knockins under native regulation beat random overexpression for dosage sensitive cytokines like {mouse}.',
      'If the assay is antibody blockade of {human}, plan humanized {mouse} early and use mouse nulls to show pathway need.',
      'Human sequence at {mouse} also helps when diagnostic reagents only recognize the human protein.',
    ],
    close: [
      'Use cell restricted cKO when systemic loss confounds the read. Save humanized designs for antibody work on {human}.',
      'For {mouse}, the practical choice is usually a null, a timed deletion, or a human sequence matched target.',
      'Pick the Cre that matches the immune compartment in your primary assay before locking the allele.',
      'For immuno oncology, humanized targets in the right immune context usually beat mouse only nulls at this locus.',
      'We can quote KO, cKO, knockin, and humanized paths for {mouse} so viability and epitope needs stay aligned.',
    ],
  },
  cancer: {
    open: [
      '{mouse} ({human}) shows up in oncology modeling because of {role}.',
      'Cancer genetics work treats {mouse} as a handle on {role}.',
      '{mouse} is the mouse form of {human} and informs models built around {role}.',
      'Tumor biology at {mouse} usually starts from {role}.',
      '{mouse} sits on therapy and resistance paths that need genetically defined cohorts.',
    ],
    mod: [
      'Tissue restricted and inducible alleles let tumors arise after development, closer to how patients acquire {human} pathway lesions.',
      'A conventional knockout helps for tumor suppressor dosage studies when homozygous loss of {mouse} is tolerated long enough to score tumors.',
      'Activating knockins fit oncogenes better than simple deletion of {mouse}.',
      'Crossing {mouse} to Kras, Trp53, or Myc backgrounds remains a standard way to test cooperation and therapy response.',
      'If the null is embryonic lethal, move to conditional or mosaic strategies instead of forcing a homozygous knockout for an adult tumor study.',
    ],
    human: [
      'Humanized {mouse} supports antibody, ADC, and degrader programs that need human {human} sequence in a mouse host.',
      'Patient variant knockins move beyond nulls into pharmacology that matches clinical {human} mutations.',
      'Humanized checkpoint partners are often added when the readout is immunotherapy rather than tumor genetics alone.',
      'Orthotopic designs with engineered {mouse} alleles usually beat simple overexpression grafts for niche questions.',
      'When a biologic fails to cross react with mouse {mouse}, humanization is the efficacy model, not a nice to have.',
    ],
    close: [
      'Null or floxed for suppressors, activating knockin for drivers, humanized for biologics aimed at {human}.',
      'Start with conditional control if early lethality would erase your adult tumor window for {mouse}.',
      'Inducible timing helps therapy studies start against established disease rather than nascent lesions.',
      'Decide whether success means tumor control, metastasis metrics, or drug response before locking the {mouse} allele.',
      'Knockout, conditional knockout, knockin, and humanized routes cover most oncology escalations at {mouse}.',
    ],
  },
  neuroscience: {
    open: [
      '{mouse} ({human}) is used in neuroscience work focused on {role}.',
      'Neuro requests for {mouse} usually cite {role}.',
      '{mouse} encodes the mouse counterpart of {human} and participates in {role}.',
      'Circuit and disease teams approach {mouse} through {role}.',
      '{mouse} comes up when programs need clean genetics around {role} without losing animals before aging windows open.',
    ],
    mod: [
      'Region restricted deletion avoids developmental wiring defects that can hide adult neurodegeneration phenotypes at {mouse}.',
      'Inducible neuronal or glial Cre helps separate cell autonomous stress from support cell contributions.',
      'Disease knockins often beat overexpression transgenes when dosage and splicing matter for human {human} proteotoxicity.',
      'Aged cohorts should drive whether you need a strong null or a milder hypomorphic knockin at {mouse}.',
      'For motor, memory, or survival curves, adult inducible loss or human variant knockins usually beat constitutive KO.',
    ],
    human: [
      'Humanized {mouse} helps when pathology depends on human specific isoforms or aggregation sequences in {human}.',
      'For antibody and ASO programs, human sequence at {mouse} closes a gap that mouse only genetics leave open.',
      'Reporter alleles map {mouse} across neuron and glia subtypes without removing function.',
      'Pairing {mouse} with known neurodegeneration alleles can reveal synergy that single locus genetics miss.',
      'If the binder only recognizes human {human}, build humanized {mouse} before a large behavior study.',
    ],
    close: [
      'Prefer cKO or disease knockins for adult brain questions. Use humanized alleles when the drug is sequence selective for {human}.',
      'Progressive, region limited alleles beat harsh developmental nulls when behavior is the primary readout for {mouse}.',
      'Say whether the endpoint is wiring, acute injury, or chronic proteinopathy before choosing KO versus knockin.',
      'In brain work, Cre choice is part of the {mouse} design, not an afterthought.',
      'Knockout, conditional knockout, knockin, and humanized paths cover most neuroscience programs at {mouse}.',
    ],
  },
  metabolism: {
    open: [
      '{mouse} ({human}) sits in {role}.',
      'Metabolic programs pick {mouse} when the biology is {role}.',
      '{mouse} is the mouse ortholog of {human} and is involved in {role}.',
      'Diet and physiology studies lean on {mouse} because of {role}.',
      'Interest in {mouse} often rises when humanized alleles are needed for biologics built on human {human}.',
    ],
    mod: [
      'Liver, adipose, muscle, or kidney restricted alleles help show which organ supplies the {mouse} phenotype under diet challenge.',
      'Whole body knockout still helps for circulating factors when tissue source matters less than systemic loss of {mouse}.',
      'Inducible adult deletion reduces developmental metabolic confounds that show up in constitutive {mouse} nulls.',
      'Knockins that mimic human {human} coding variants go beyond simple loss of function.',
      'If related metabolic nodes may compensate, plan challenge diets and partner genetics with the primary {mouse} allele.',
    ],
    human: [
      'Humanized {mouse} helps when antibodies, enzyme replacements, or peptides are built on human {human} rather than mouse protein.',
      'Pharmacodynamic studies often need a humanized target plus a diet inducible disease background.',
      'Transgenic overexpression can model pathway gain when the hypothesis is agonism rather than loss of {mouse}.',
      'Reporter knockins clarify tissue induction during fasting or obesity without changing coding sequence.',
      'For sequence selective biologics, use humanized {mouse} for efficacy and mouse nulls for mechanism checks.',
    ],
    close: [
      'Use organ restricted cKO to map the source tissue, humanized alleles for biologics, and diet aligned cohorts for stress at {mouse}.',
      'Inducible adult alleles avoid developmental compensation in energy balance circuits involving {mouse}.',
      'Say whether glucose, lipid, or cardiovascular readouts dominate before locking Cre and allele class.',
      'A clean tissue specific deletion plus controlled diet usually beats an untimed global null for drug studies.',
      'We can quote knockout, conditional knockout, knockin, and humanized {mouse} options for cardio metabolic work.',
    ],
  },
  morphogen: {
    open: [
      '{mouse} ({human}) contributes to {role}.',
      'Developmental modeling of {mouse} starts from {role}.',
      '{mouse} is requested for projects centered on {role}.',
      'Human {human} corresponds to mouse {mouse}, involved in {role}.',
      'Teams building {mouse} models should expect early lethality risk when {role} touches gastrulation or organ budding.',
    ],
    mod: [
      'Global knockout often disrupts early patterning, so conditional deletion of {mouse} after the critical window is usually required for adult questions.',
      'Tissue restricted Cre helps show whether {mouse} acts from epithelium, mesenchyme, or an organizing center.',
      'Hypomorphic knockins can mimic human {human} dosage syndromes better than complete nulls when partial function is the clinical picture.',
      'Timed inducible alleles separate embryonic patterning failure from adult repair involving {mouse}.',
      'If sibling morphogens may compensate, plan dual conditional strategies rather than trusting a single locus null.',
    ],
    human: [
      'Humanized {mouse} matters for biologics and ligand traps that bind human {human} more tightly than mouse protein.',
      'Knockin reporters map source domains during development without removing ligand activity at {mouse}.',
      'Transgenic overexpression tests gain of morphogen tone when ectopic signaling is the disease idea around {mouse}.',
      'Partner genetics reduce redundancy risk that single morphogen knockouts can leave behind.',
      'Antibody programs against human {human} should prioritize humanized {mouse} once the conditional plan looks viable.',
    ],
    close: [
      'Default to cKO for postnatal work. Add humanized or disease knockins when you need human sequence or a patient variant at {mouse}.',
      'If embryogenesis collapses the cohort, do not force a conventional KO for an adult endpoint at {mouse}.',
      'Match Cre geography to the field that actually expresses {mouse} in your system.',
      'Patterning genes reward spatial and temporal control more than blunt systemic deletion.',
      'Knockout, conditional knockout, knockin, and humanized alleles cover most morphogen program escalations at {mouse}.',
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
        ` Many labs compare floxed ${gene.mouseSymbol} against a reference null before scaling colonies.`,
        ` We often quote knockout, conditional knockout, and humanized options at this locus.`,
        ` It helps to say up front whether you need developmental viability or adult inducible control.`,
        ` If a close allele already exists in catalog, generation work can sometimes start from that backbone.`,
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
