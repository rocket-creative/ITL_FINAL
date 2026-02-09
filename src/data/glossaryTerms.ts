// Complete ITL Mouse Genetics Glossary - 60 Terms across 7 Categories
// Source: ITL_Mouse_Genetics_Glossary_Complete.md

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category: GlossaryCategory;
}

export type GlossaryCategory =
  | "Core Genetics & Mechanisms"
  | "Mouse Model Strategies & Allele Types"
  | "Recombination Systems & Tools"
  | "Vectors, ES Cells & Delivery"
  | "Validation, QC & Genotyping"
  | "Immunology & Humanization"
  | "Study Design & Applications";

export const glossaryCategories: GlossaryCategory[] = [
  "Core Genetics & Mechanisms",
  "Mouse Model Strategies & Allele Types",
  "Recombination Systems & Tools",
  "Vectors, ES Cells & Delivery",
  "Validation, QC & Genotyping",
  "Immunology & Humanization",
  "Study Design & Applications",
];

export const glossaryTerms: GlossaryTerm[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 1: Core Genetics & Mechanisms (12 terms)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    term: "Point Mutation",
    slug: "point-mutation",
    definition: "A single-nucleotide change in a DNA sequence that can modify how a gene is expressed or how its protein product functions. Even a one-base change can dramatically alter phenotype, making point mutations crucial to understanding genetic disease, evolution, and therapeutic intervention.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Missense and Nonsense Mutations",
    slug: "missense-nonsense-mutation",
    definition: "Missense mutations change a single nucleotide in a coding region, resulting in a different amino acid in the protein sequence. Nonsense mutations convert a codon into a premature stop signal, producing truncated and often nonfunctional proteins.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Frameshift Mutation",
    slug: "frameshift-mutation",
    definition: "A genetic alteration caused by the insertion or deletion of nucleotides that shifts the reading frame of a gene's coding sequence. This shift changes the downstream amino acid sequence and often introduces premature stop codons, resulting in truncated or nonfunctional proteins.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Gain-of-Function vs. Loss-of-Function Mutations",
    slug: "gain-of-function-vs-loss-of-function-mutation",
    definition: "A gain-of-function mutation increases or creates a new activity for a gene or protein, while a loss-of-function mutation reduces or abolishes normal function. Both mutation types play central roles in disease biology and are critical tools in genetic research.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Allele / Genotype / Phenotype",
    slug: "allele-genotype-phenotype",
    definition: "An allele is a specific version of a gene, a genotype is the combination of alleles an organism carries, and a phenotype is the observable outcome of that genetic makeup interacting with environmental factors.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Promoter / Enhancer / Regulatory Element",
    slug: "promoter-enhancer-regulatory-element",
    definition: "Non-coding DNA sequences that control when, where, and how genes are expressed. They function as molecular switches that coordinate transcriptional activity by interacting with transcription factors, chromatin modifiers, and the basal transcription machinery.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Open Reading Frame (ORF)",
    slug: "open-reading-frame",
    definition: "A continuous stretch of DNA or RNA sequence that can be translated into a protein. It begins with a start codon (typically AUG in mRNA) and ends with a stop codon (UAA, UAG, or UGA). ORFs represent the protein-coding potential of a gene.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Homologous Recombination",
    slug: "homologous-recombination",
    definition: "A precise DNA repair and genetic engineering mechanism that uses a homologous sequence as a template to exchange or replace genetic material. It allows for accurate correction or insertion of DNA sequences at defined genomic loci.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Non-Homologous End Joining (NHEJ)",
    slug: "non-homologous-end-joining",
    definition: "A DNA double-strand break repair pathway that directly ligates broken DNA ends without requiring a homologous template. It is an efficient but error-prone mechanism that can introduce small insertions or deletions (indels).",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Homology-Directed Repair (HDR)",
    slug: "homology-directed-repair",
    definition: "A high-fidelity DNA repair mechanism that uses a homologous DNA sequence as a template to accurately fix double-strand breaks. Unlike NHEJ, HDR ensures precise integration or correction of genetic material.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Mosaicism (Genetic Mosaic)",
    slug: "mosaicism",
    definition: "The presence of two or more genetically distinct cell populations within the same organism that originated from a single fertilized egg. In genetic engineering, mosaicism arises when not all cells carry the intended genetic modification.",
    category: "Core Genetics & Mechanisms",
  },
  {
    term: "Germline Transmission",
    slug: "germline-transmission",
    definition: "The process by which a genetic modification introduced into an organism is passed on to its offspring through reproductive (germ) cells. It confirms that the engineered change is stably integrated into the genome and can be inherited by future generations.",
    category: "Core Genetics & Mechanisms",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 2: Mouse Model Strategies & Allele Types (12 terms)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    term: "Knockout (KO) Mouse Models",
    slug: "knockout-mouse-models",
    definition: "A genetically engineered mouse in which a specific gene has been permanently inactivated ('knocked out') to study its biological function, role in disease, and potential as a therapeutic target.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Conditional Knockout (cKO) Mouse Models",
    slug: "conditional-knockout-mouse-models",
    definition: "A genetically engineered mouse in which a specific gene can be selectively inactivated in chosen tissues, cell types, or developmental stages—enabling precise studies of gene function while avoiding embryonic lethality or systemic effects.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Conventional (Constitutive) Knockout Mouse Models",
    slug: "conventional-knockout-mouse-models",
    definition: "A genetically engineered mouse in which a target gene is permanently deleted or disrupted in every cell of the body from the earliest stages of development. This classical approach provides foundational insight into gene function.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Knockin (KI) Mouse Models",
    slug: "knockin-mouse-models",
    definition: "A genetically engineered mouse in which a specific DNA sequence—such as a gene, cDNA, mutation, reporter, or human ortholog—is inserted into a defined genomic locus to add or modify gene function.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Humanized Mouse Models",
    slug: "humanized-mouse-models",
    definition: "A genetically engineered mouse in which one or more human genes, immune system components, or biological pathways have been introduced to replicate aspects of human physiology, bridging the gap between basic research and clinical translation.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Reporter Gene / Reporter Allele",
    slug: "reporter-gene-reporter-allele",
    definition: "A reporter gene is an easily detectable genetic marker—such as GFP, LacZ, or luciferase—inserted into a mouse genome to visualize gene expression, monitor cellular activity, or trace lineage in vivo.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Inducible Allele (Cre-ER Systems)",
    slug: "inducible-allele-cre-er",
    definition: "A genetically engineered version of a gene that can be activated or deleted at a specific time by an external stimulus. The most widely used approach is the Cre-ER system, allowing researchers to precisely control the timing of gene modification in vivo.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Hypomorphic / Null Allele",
    slug: "hypomorphic-null-allele",
    definition: "Hypomorphic alleles partially reduce gene function, and null alleles abolish it entirely. Both are critical tools in mouse model research for studying gene dosage and loss-of-function effects.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Dominant Negative",
    slug: "dominant-negative",
    definition: "A mutant allele that encodes a protein that not only loses its normal function but also interferes with the activity of the wild-type protein. The resulting phenotype mimics or exceeds the severity of a full loss-of-function mutation.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Rescue Allele / Complementation",
    slug: "rescue-allele-complementation",
    definition: "A genetic construct introduced to restore the normal function of a gene that has been disrupted, deleted, or mutated. Complementation confirms that an observed phenotype results directly from loss of that gene's function.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Safe Harbor Locus",
    slug: "safe-harbor-locus",
    definition: "A defined region of the genome where a transgene or targeted DNA sequence can be inserted without disrupting endogenous genes or regulatory networks. Integration at a safe harbor site allows stable, predictable expression.",
    category: "Mouse Model Strategies & Allele Types",
  },
  {
    term: "Rosa26 Locus",
    slug: "rosa26-locus",
    definition: "A well-characterized safe harbor site in the mouse genome, located on chromosome 6. It supports stable and ubiquitous expression of inserted genes without interfering with nearby genomic functions and is the standard integration site for transgenic constructs.",
    category: "Mouse Model Strategies & Allele Types",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 3: Recombination Systems & Tools (10 terms)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    term: "Cre-lox System",
    slug: "cre-lox-system",
    definition: "A bacteriophage P1-derived site-specific recombination technology that utilizes Cre recombinase to mediate genomic modifications at engineered LoxP sequences. This technology underpins conditional gene engineering approaches in mammalian genetics.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Cre Driver Line (Tissue-Specific Cre)",
    slug: "cre-driver-line",
    definition: "A mouse line that expresses Cre recombinase from a promoter specific to certain tissues, cell types, or developmental stages, enabling targeted genomic recombination only in those cells.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Floxed Gene / LoxP Site",
    slug: "floxed-gene-loxp-site",
    definition: "A floxed gene contains two LoxP sites flanking an essential DNA segment, allowing Cre recombinase to mediate excision or inversion for conditional gene regulation. LoxP sites are 34 base pair sequences recognized by Cre recombinase.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Lox-STOP-Lox (LSL) Cassette",
    slug: "lox-stop-lox-cassette",
    definition: "A cassette containing a transcriptional STOP sequence flanked by LoxP sites that blocks gene expression until excised by Cre recombinase. This molecular 'gatekeeper' design is essential for gain-of-function models requiring precise gene induction.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Flp-FRT System",
    slug: "flp-frt-system",
    definition: "A yeast-derived site-specific recombination mechanism enabling targeted DNA excision, inversion, or integration through the interaction of Flp recombinase with FRT sites. It serves as an orthogonal complement to Cre-lox in mammalian genetics.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Dre-rox System (Alternate Recombinase)",
    slug: "dre-rox-system",
    definition: "An independent site-specific recombination platform derived from bacteriophage D6, using Dre recombinase to recognize rox sites for DNA rearrangements orthogonal to both Cre-lox and Flp-FRT.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Tet-On / Tet-Off (Tetracycline Systems)",
    slug: "tet-on-tet-off-systems",
    definition: "Tetracycline-responsive transcription systems that regulate gene expression reversibly through doxycycline administration, allowing dose- and time-dependent control of transgene activity.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Inducible Cre (Cre-ERT2 / Tamoxifen)",
    slug: "inducible-cre-ert2",
    definition: "A system that fuses Cre recombinase to a modified estrogen-receptor ligand-binding domain (ERT2), confining it to the cytoplasm until activation by tamoxifen, thus providing temporal control of recombination.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Inversion vs Excision (Recombination Outcomes)",
    slug: "inversion-vs-excision",
    definition: "The orientation of recombination sites determines genetic outcomes: direct repeats drive excision (deletion) of the intervening DNA, whereas inverted repeats cause inversion of the DNA segment.",
    category: "Recombination Systems & Tools",
  },
  {
    term: "Recombination Leakiness (Background Activity)",
    slug: "recombination-leakiness",
    definition: "Unintended recombinase activity occurring without inducer presence or outside targeted tissues, leading to unwanted genomic alterations or mosaicism. Understanding its sources is essential for accurate genetic modeling.",
    category: "Recombination Systems & Tools",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 4: Vectors, ES Cells & Delivery (8 terms)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    term: "Targeting Vector (Homology Arms)",
    slug: "targeting-vector",
    definition: "A synthetic DNA construct designed to introduce specific genetic modifications into a genome through homologous recombination or HDR. It contains sequences known as homology arms that align precisely with the genomic target locus.",
    category: "Vectors, ES Cells & Delivery",
  },
  {
    term: "Selection Markers (NeoR, PuroR)",
    slug: "selection-markers",
    definition: "Genes incorporated into targeting vectors to identify and isolate cells that have successfully integrated a genetic modification. Common markers include neomycin resistance (NeoR) and puromycin resistance (PuroR).",
    category: "Vectors, ES Cells & Delivery",
  },
  {
    term: "Blastocyst Injection / Chimera Production",
    slug: "blastocyst-injection-chimera",
    definition: "The process of introducing genetically modified cells into a developing mouse blastocyst to create a chimera—an organism composed of cells from both the host embryo and the engineered cells.",
    category: "Vectors, ES Cells & Delivery",
  },
  {
    term: "Pronuclear Injection (Transgenics)",
    slug: "pronuclear-injection",
    definition: "A technique used to generate transgenic mice by directly introducing foreign DNA into the pronucleus of a fertilized one-cell embryo. The injected DNA integrates randomly into the mouse genome.",
    category: "Vectors, ES Cells & Delivery",
  },
  {
    term: "Single-Copy Integration",
    slug: "single-copy-integration",
    definition: "The precise insertion of a single copy of a DNA construct into a defined location within the genome. This approach prevents the variability, gene silencing, and expression artifacts associated with random multi-copy insertions.",
    category: "Vectors, ES Cells & Delivery",
  },
  {
    term: "Large-Fragment / BAC Targeting",
    slug: "large-fragment-bac-targeting",
    definition: "Introducing extended genomic DNA segments—often spanning 100–300 kilobases—into the mouse genome using bacterial artificial chromosomes (BACs) to preserve native gene context and regulatory elements.",
    category: "Vectors, ES Cells & Delivery",
  },
  {
    term: "Safe-Harbor Targeted Transgenesis",
    slug: "safe-harbor-targeted-transgenesis",
    definition: "A precise genome engineering strategy in which a transgene is inserted into a well-characterized, transcriptionally active, and non-disruptive genomic locus to ensure predictable and stable expression.",
    category: "Vectors, ES Cells & Delivery",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 5: Validation, QC & Genotyping (8 terms)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    term: "Genotyping PCR / qPCR",
    slug: "genotyping-pcr-qpcr",
    definition: "Molecular methods used to detect, confirm, and quantify genetic modifications in engineered mouse models. These assays verify whether the targeted allele, wild-type allele, or transgene is present in an individual animal's DNA.",
    category: "Validation, QC & Genotyping",
  },
  {
    term: "Southern Blot / Copy Number Confirmation",
    slug: "southern-blot-copy-number",
    definition: "A classical DNA analysis method that remains the gold standard for verifying correct targeting, integration patterns, and copy number of inserted constructs in engineered mouse models.",
    category: "Validation, QC & Genotyping",
  },
  {
    term: "Sanger / NGS Validation of Junctions",
    slug: "sanger-ngs-validation",
    definition: "Sequencing tools for verifying the accuracy of DNA junctions at targeted integration sites. These assays confirm that homologous recombination or HDR occurred precisely without insertions, deletions, or rearrangements.",
    category: "Validation, QC & Genotyping",
  },
  {
    term: "Off-Target Assessment / Allele Integrity",
    slug: "off-target-assessment",
    definition: "Procedures to determine whether unintended genomic changes have occurred during editing, while also verifying that the targeted locus remains structurally sound and functionally unaffected.",
    category: "Validation, QC & Genotyping",
  },
  {
    term: "Germline Confirmation / Coat Color Markers",
    slug: "germline-confirmation-coat-color",
    definition: "Ensures that a targeted genetic modification has been successfully passed through reproductive cells to offspring. Coat-color markers serve as a visible indicator of ES cell contribution in chimeric founder animals.",
    category: "Validation, QC & Genotyping",
  },
  {
    term: "Breeding Scheme (Hetero × Hetero, etc.)",
    slug: "breeding-scheme",
    definition: "Planned mating strategies used to generate offspring of specific genotypes—such as heterozygous, homozygous, or compound mutant combinations—from established genetically modified lines.",
    category: "Validation, QC & Genotyping",
  },
  {
    term: "Colony Management / Backcrossing",
    slug: "colony-management-backcrossing",
    definition: "Procedures necessary to maintain healthy and genetically defined mouse lines. Backcrossing involves introducing a targeted mutation onto a standardized inbred background to minimize genetic variability.",
    category: "Validation, QC & Genotyping",
  },
  {
    term: "Zygosity (Heterozygous vs Homozygous)",
    slug: "zygosity",
    definition: "Describes whether the two copies of a gene in an organism are identical (homozygous) or different (heterozygous). Determining zygosity is crucial for interpreting phenotypes and designing experiments.",
    category: "Validation, QC & Genotyping",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 6: Immunology & Humanization (5 terms)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    term: "Humanized Immune Checkpoint (PD-1 / PD-L1 / CTLA-4)",
    slug: "humanized-immune-checkpoint",
    definition: "Genetically engineered mice with key inhibitory immune receptors—such as PD-1, PD-L1, and CTLA-4—replaced with their human equivalents. Essential for evaluating antibody and biologic therapies targeting immune checkpoint pathways.",
    category: "Immunology & Humanization",
  },
  {
    term: "Cytokine / Receptor Humanization",
    slug: "cytokine-receptor-humanization",
    definition: "The genetic replacement of mouse cytokines, receptors, or ligand–receptor pairs with their human equivalents. These models recreate critical components of the human immune network for accurate evaluation of human biologics.",
    category: "Immunology & Humanization",
  },
  {
    term: "HLA Humanized Models",
    slug: "hla-humanized-models",
    definition: "Genetically engineered mice in which murine major histocompatibility complex (MHC) genes are replaced with human leukocyte antigen (HLA) alleles. These models recapitulate key aspects of human antigen presentation and adaptive immunity.",
    category: "Immunology & Humanization",
  },
  {
    term: "Single vs Double Humanized Targets",
    slug: "single-vs-double-humanized-targets",
    definition: "Single humanized models express one human gene of an interacting pair, while double humanized models replace both receptor and ligand to achieve full human-to-human signaling compatibility within the mouse system.",
    category: "Immunology & Humanization",
  },
  {
    term: "Graft-versus-Host / Engraftment Considerations",
    slug: "graft-versus-host-engraftment",
    definition: "Immunological compatibility factors that influence successful transplantation and maintenance of human cells or tissues in humanized mouse models. These parameters determine whether engrafted human immune systems function properly.",
    category: "Immunology & Humanization",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 7: Study Design & Applications (5 terms)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    term: "Baseline Phenotyping",
    slug: "baseline-phenotyping",
    definition: "Comprehensive evaluation of an engineered mouse line's physiological, molecular, and behavioral traits before any experimental intervention. This establishes a reference dataset that differentiates inherent strain variability from phenotypic changes.",
    category: "Study Design & Applications",
  },
  {
    term: "Tissue-Specific Knockout (Examples: Liver, Neuron)",
    slug: "tissue-specific-knockout",
    definition: "A genetically engineered mouse model in which a target gene is selectively deleted or inactivated in a specific tissue or cell type, rather than throughout the entire organism. Typically relies on the Cre-LoxP recombination system.",
    category: "Study Design & Applications",
  },
  {
    term: "Temporal Control (Induction Windows, Dosing)",
    slug: "temporal-control",
    definition: "The activation or deactivation of a genetic modification at a specific time or during a defined developmental window. This strategy allows researchers to study gene function dynamically and distinguish developmental effects from later ones.",
    category: "Study Design & Applications",
  },
  {
    term: "Reporter Readouts (GFP, LacZ, Luc)",
    slug: "reporter-readouts",
    definition: "Measurable signals—typically fluorescent, enzymatic, or luminescent—produced by genetically encoded reporter genes such as GFP, LacZ, and luciferase. These are integrated into mouse models to visualize gene expression and track cell lineages.",
    category: "Study Design & Applications",
  },
  {
    term: "Translational Relevance / Disease Modeling",
    slug: "translational-relevance-disease-modeling",
    definition: "How effectively a mouse model replicates key aspects of human biology, ensuring findings are predictive of clinical outcomes. Disease modeling involves engineering mice to mimic specific human pathological conditions for studying mechanisms and testing therapies.",
    category: "Study Design & Applications",
  },
];

// Helper function to get terms by category
export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return glossaryTerms.filter((term) => term.category === category);
}

// Helper function to get all unique first letters
export function getAlphabetWithTerms(): string[] {
  const letters = new Set(glossaryTerms.map((term) => term.term[0].toUpperCase()));
  return Array.from(letters).sort();
}

// Helper function to group terms by first letter
export function getTermsGroupedByLetter(): Record<string, GlossaryTerm[]> {
  return glossaryTerms.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);
}

// Helper function to find a term by slug
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.slug === slug);
}

// Helper function to search terms
export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
  );
}
