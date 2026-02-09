// Extended Glossary Term Data for Individual Pages
// Contains full content, FAQs, and related information

import { glossaryTerms, type GlossaryTerm } from './glossaryTerms';

export interface GlossaryTermFAQ {
  question: string;
  answer: string;
}

export interface RelatedService {
  title: string;
  href: string;
}

export interface GlossaryTermExtended extends GlossaryTerm {
  metaTitle: string;
  metaDescription: string;
  introduction: string;
  sections?: {
    title: string;
    content: string;
  }[];
  faqs: GlossaryTermFAQ[];
  relatedTermSlugs: string[];
  relatedServices: RelatedService[];
}

// Extended content for all 60 glossary terms
export const glossaryTermsExtended: Record<string, Partial<GlossaryTermExtended>> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 1: Core Genetics & Mechanisms
  // ═══════════════════════════════════════════════════════════════════════════
  "point-mutation": {
    metaTitle: "Point Mutation | Definition, Mechanism, and Role in Mouse Model Research",
    metaDescription: "Explore how point mutations alter gene function, drive disease, and power preclinical discovery. Learn how engineered point mutation mice advance biomedical research.",
    introduction: "Despite their small scale, point mutations are among the most powerful tools in genetics and biomedical research. They occur when one nucleotide—adenine (A), cytosine (C), guanine (G), or thymine (T)—is substituted, inserted, or deleted within a DNA sequence. Such changes can have minimal impact (as in silent mutations) or severe consequences, such as loss of gene function, altered protein structure, or disease initiation.",
    sections: [
      {
        title: "Types of Point Mutations",
        content: "Point mutations include substitution mutations (silent, missense, nonsense), insertion and deletion (indel) mutations that can cause frameshifts, and regulatory mutations in promoters, enhancers, or splice sites that affect gene expression without changing the protein sequence."
      },
      {
        title: "Functional Consequences",
        content: "Point mutations can cause loss-of-function (reduced or abolished protein activity), gain-of-function (new or enhanced activity), dominant-negative effects (mutant interferes with wild-type), or conditional effects that manifest only under certain conditions."
      },
      {
        title: "Research Applications",
        content: "Point mutation mouse models are vital for disease modeling, protein function analysis, regulatory element studies, therapeutic development and validation, and precision medicine/pharmacogenomics research."
      }
    ],
    faqs: [
      {
        question: "How does a point mutation differ from a larger genetic alteration?",
        answer: "A point mutation alters only one nucleotide, whereas larger alterations involve substantial DNA insertions, deletions, or rearrangements. Despite their small size, point mutations can produce dramatic biological effects."
      },
      {
        question: "Are all point mutations harmful?",
        answer: "No. Many point mutations are neutral or silent, having no observable effect. Others can be beneficial, deleterious, or context-dependent depending on the gene, location, and environmental conditions."
      }
    ],
    relatedTermSlugs: ["missense-nonsense-mutation", "frameshift-mutation", "gain-of-function-vs-loss-of-function-mutation", "knockin-mouse-models"],
    relatedServices: [
      { title: "Point Mutation Mouse Models", href: "/point-mutation-mice" },
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
    ]
  },

  "missense-nonsense-mutation": {
    metaTitle: "Missense and Nonsense Mutations | Mechanisms, Examples, and Research Applications",
    metaDescription: "Explore how missense and nonsense mutations alter gene function, drive disease, and power preclinical research. Learn their molecular consequences and applications in engineered mouse models.",
    introduction: "Not all point mutations are created equal. Even a single base substitution can profoundly alter how a protein is built—changing its structure, activity, stability, or localization. Missense mutations lead to a single amino acid change, while nonsense mutations create a premature stop codon, truncating translation and often destroying protein activity altogether.",
    faqs: [
      {
        question: "Which is more severe—a missense or a nonsense mutation?",
        answer: "It depends on context. Nonsense mutations usually result in truncated, nonfunctional proteins, but a single missense mutation in a crucial domain can be equally damaging or even more pathogenic."
      },
      {
        question: "Can nonsense mutations be treated?",
        answer: "Some nonsense mutations respond to readthrough therapies, which allow ribosomes to bypass premature stop codons and produce full-length proteins."
      }
    ],
    relatedTermSlugs: ["point-mutation", "frameshift-mutation", "knockin-mouse-models"],
    relatedServices: [
      { title: "Point Mutation Mouse Models", href: "/point-mutation-mice" },
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
    ]
  },

  "frameshift-mutation": {
    metaTitle: "Frameshift Mutation | Mechanism, Disease Impact, and Mouse Model Applications",
    metaDescription: "Learn how frameshift mutations disrupt protein coding, contribute to human disease, and power functional genomics in engineered mouse models.",
    introduction: "The genetic code is read in triplets—groups of three nucleotides called codons—each specifying a single amino acid. The reading frame is therefore essential for translating a gene into a functional protein. When insertions or deletions occur in multiples not divisible by three, the reading frame shifts, altering every downstream codon.",
    faqs: [
      {
        question: "Are frameshift mutations always harmful?",
        answer: "Most frameshift mutations are highly deleterious, resulting in truncated or nonfunctional proteins. In rare cases, they can produce novel functional outcomes."
      },
      {
        question: "How do frameshift mutations differ from nonsense mutations?",
        answer: "Nonsense mutations introduce a premature stop codon but preserve the upstream sequence. Frameshift mutations alter the downstream reading frame, usually leading to more severe disruptions in protein function."
      }
    ],
    relatedTermSlugs: ["point-mutation", "missense-nonsense-mutation", "knockout-mouse-models"],
    relatedServices: [
      { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
      { title: "Point Mutation Mouse Models", href: "/point-mutation-mice" }
    ]
  },

  "gain-of-function-vs-loss-of-function-mutation": {
    metaTitle: "Gain-of-Function vs. Loss-of-Function Mutations | Mechanisms, Examples, and Research Insights",
    metaDescription: "Understand how gain-of-function and loss-of-function mutations in mice shape gene activity, drive disease, and guide therapeutic development.",
    introduction: "Genetic mutations can influence how a protein behaves in a cell—not just whether it is present, but how much of it is produced, how active it is, or what it does. Gain-of-function mutations enhance normal activity or create new functions, while loss-of-function mutations reduce or eliminate normal gene product function.",
    faqs: [
      {
        question: "Can the same mutation be both gain- and loss-of-function?",
        answer: "Not the same mutation, but different mutations in the same gene can have opposite effects—one increasing protein activity, another eliminating it."
      },
      {
        question: "How do researchers determine if a mutation is gain-of-function or loss-of-function?",
        answer: "Researchers use biochemical assays, signaling readouts, and phenotype characterization in cell or mouse models to assess whether a mutation increases, reduces, or abolishes function."
      }
    ],
    relatedTermSlugs: ["point-mutation", "knockout-mouse-models", "knockin-mouse-models"],
    relatedServices: [
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
    ]
  },

  "allele-genotype-phenotype": {
    metaTitle: "Allele, Genotype, and Phenotype | Clear Definitions for Mouse Model Research",
    metaDescription: "Explore the relationship between allele, genotype, and phenotype—and how these core genetic concepts guide mouse model design, breeding strategies, and experimental interpretation.",
    introduction: "At the heart of every genetic experiment—from basic Mendelian crosses to advanced preclinical mouse modeling—lie three foundational concepts: allele, genotype, and phenotype. These terms describe different layers of biological information: the sequence variants that define genes (alleles), the combinations of those variants in an organism (genotype), and the observable traits that result (phenotype).",
    faqs: [
      {
        question: "Does genotype always predict phenotype?",
        answer: "Not always. Modifiers, environmental factors, incomplete penetrance, and epigenetic influences can all contribute to variation in phenotypic outcomes, even among organisms with identical genotypes."
      },
      {
        question: "What's the difference between heterozygous and homozygous?",
        answer: "Heterozygous organisms carry two different alleles at a genetic locus, whereas homozygous organisms carry two identical alleles."
      }
    ],
    relatedTermSlugs: ["zygosity", "breeding-scheme", "germline-transmission"],
    relatedServices: [
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
    ]
  },

  "promoter-enhancer-regulatory-element": {
    metaTitle: "Promoter, Enhancer, and Regulatory Element | Gene Expression Control in Mouse Models",
    metaDescription: "Learn how promoters, enhancers, and regulatory elements control gene expression and enable precise genetic engineering in transgenic and knockout mouse models.",
    introduction: "Promoters, enhancers, and other regulatory elements are non-coding DNA sequences that control when, where, and how genes are expressed. They function as molecular switches that coordinate transcriptional activity by interacting with transcription factors, chromatin modifiers, and the basal transcription machinery.",
    faqs: [
      {
        question: "What is the difference between a promoter and an enhancer?",
        answer: "Promoters are proximal regulatory regions located immediately upstream of a gene's transcription start site that initiate transcription. Enhancers are distal elements that can be thousands of base pairs away and function independently of position to increase transcription."
      }
    ],
    relatedTermSlugs: ["open-reading-frame", "safe-harbor-locus", "rosa26-locus"],
    relatedServices: [
      { title: "Transgenic Mouse Service", href: "/transgenic-mouse-service" },
      { title: "Rosa26 Locus Targeting", href: "/rosa26" }
    ]
  },

  "open-reading-frame": {
    metaTitle: "Open Reading Frame (ORF) | Definition and Importance in Mouse Model Design",
    metaDescription: "Discover how open reading frames (ORFs) define protein-coding genes, ensure correct translation, and influence transgene design in genetically engineered mouse models.",
    introduction: "An open reading frame (ORF) is a continuous stretch of DNA or RNA sequence that can be translated into a protein. It begins with a start codon (typically AUG in mRNA) and ends with a stop codon (UAA, UAG, or UGA). ORFs represent the protein-coding potential of a gene and define the framework through which genetic information is converted into functional polypeptides.",
    faqs: [
      {
        question: "Why is maintaining the ORF important in gene targeting?",
        answer: "In mouse model design, precise definition of the ORF is vital when constructing knock-in, reporter, or humanized alleles. Maintaining ORF integrity ensures proper translation and prevents frameshift mutations."
      }
    ],
    relatedTermSlugs: ["frameshift-mutation", "knockin-mouse-models", "targeting-vector"],
    relatedServices: [
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
      { title: "cDNA Knockin", href: "/cdna-knockin" }
    ]
  },

  "homologous-recombination": {
    metaTitle: "Homologous Recombination | Precise Gene Targeting in Mouse Models",
    metaDescription: "Learn how homologous recombination enables precise DNA repair and targeted gene modification in embryonic stem cells, forming the foundation of engineered mouse models.",
    introduction: "Homologous recombination (HR) is a precise DNA repair and genetic engineering mechanism that uses a homologous sequence as a template to exchange or replace genetic material. It allows for accurate correction or insertion of DNA sequences at defined genomic loci, preserving reading frames and regulatory integrity.",
    faqs: [
      {
        question: "How does homologous recombination differ from NHEJ?",
        answer: "Homologous recombination uses a template sequence for precise repair, while NHEJ directly ligates broken DNA ends without a template, often introducing small insertions or deletions."
      }
    ],
    relatedTermSlugs: ["non-homologous-end-joining", "homology-directed-repair", "es-cell-targeting", "targeting-vector"],
    relatedServices: [
      { title: "Knockout Mouse Models", href: "/knockout-mouse-models" }
    ]
  },

  "non-homologous-end-joining": {
    metaTitle: "Non-Homologous End Joining (NHEJ) | Fast but Error-Prone DNA Repair in Mouse Models",
    metaDescription: "Explore how non-homologous end joining (NHEJ) repairs DNA double-strand breaks, enabling knockout mouse model creation through efficient but imprecise gene disruption.",
    introduction: "Non-homologous end joining (NHEJ) is a DNA double-strand break (DSB) repair pathway that directly ligates broken DNA ends without requiring a homologous template. It is an efficient but error-prone mechanism that can introduce small insertions or deletions (indels), making it a fundamental process for both natural DNA repair and targeted genome modification.",
    faqs: [
      {
        question: "When is NHEJ preferred over homologous recombination?",
        answer: "NHEJ is preferred when high precision is not essential and rapid model generation is needed. It does not require donor templates and creates gene knockouts via small insertions or deletions."
      }
    ],
    relatedTermSlugs: ["homologous-recombination", "homology-directed-repair", "knockout-mouse-models"],
    relatedServices: [
      { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
      { title: "Custom Mouse Models", href: "/custom-mouse-models" }
    ]
  },

  "homology-directed-repair": {
    metaTitle: "Homology-Directed Repair (HDR) | High-Fidelity Gene Editing in Mouse Models",
    metaDescription: "Discover how homology-directed repair (HDR) uses homologous templates to achieve precise DNA correction and targeted gene integration in genetically engineered mouse models.",
    introduction: "Homology-directed repair (HDR) is a high-fidelity DNA repair mechanism that uses a homologous DNA sequence as a template to accurately fix double-strand breaks (DSBs). Unlike non-homologous end joining (NHEJ), HDR ensures precise integration or correction of genetic material, making it a cornerstone of advanced genome editing.",
    faqs: [
      {
        question: "When does HDR occur in the cell cycle?",
        answer: "HDR is activated during the S and G2 phases of the cell cycle, when a sister chromatid or donor DNA template is available for use as a repair template."
      }
    ],
    relatedTermSlugs: ["homologous-recombination", "non-homologous-end-joining", "knockin-mouse-models", "targeting-vector"],
    relatedServices: [
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
      { title: "Point Mutation Mouse Models", href: "/point-mutation-mice" }
    ]
  },

  "mosaicism": {
    metaTitle: "Mosaicism (Genetic Mosaic) | Definition and Role in Mouse Model Generation",
    metaDescription: "Learn how genetic mosaicism occurs in engineered mice, how it affects phenotype consistency, and why breeding and validation are essential for achieving germline transmission.",
    introduction: "Mosaicism refers to the presence of two or more genetically distinct cell populations within the same organism that originated from a single fertilized egg. In genetic engineering, mosaicism arises when not all cells carry the intended genetic modification, resulting in a mixture of modified and unmodified genotypes across tissues or developmental stages.",
    faqs: [
      {
        question: "How does mosaicism affect mouse model quality?",
        answer: "Mosaicism can complicate phenotypic interpretation due to variable gene dosage and tissue-specific expression differences. Researchers typically breed mosaic founders to establish germline-transmitted lines with uniform alleles."
      }
    ],
    relatedTermSlugs: ["germline-transmission", "blastocyst-injection-chimera", "genotyping-pcr-qpcr"],
    relatedServices: [
      { title: "Speed Expansion Breeding", href: "/speed-expansion-breeding" },
      { title: "Colony Management Services", href: "/colony-management-services" }
    ]
  },

  "germline-transmission": {
    metaTitle: "Germline Transmission | Heritable Genetic Modification in Mouse Models",
    metaDescription: "Understand germline transmission in genetically engineered mice—the process confirming heritable genome integration and establishing stable, reproducible mouse model lines.",
    introduction: "Germline transmission is the process by which a genetic modification introduced into an organism—such as a mouse—is passed on to its offspring through reproductive (germ) cells. It confirms that the engineered change is stably integrated into the genome and can be inherited by future generations.",
    faqs: [
      {
        question: "How is germline transmission confirmed?",
        answer: "Germline transmission is typically confirmed by breeding chimeric founders with wild-type mice and genotyping the progeny. If offspring inherit the modified allele, germline transmission has occurred."
      }
    ],
    relatedTermSlugs: ["mosaicism", "blastocyst-injection-chimera", "breeding-scheme"],
    relatedServices: [
      { title: "Speed Expansion Breeding", href: "/speed-expansion-breeding" },
      { title: "Colony Management Services", href: "/colony-management-services" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 2: Mouse Model Strategies & Allele Types
  // ═══════════════════════════════════════════════════════════════════════════
  "knockout-mouse-models": {
    metaTitle: "Knockout Mouse Models | Applications, Strategies, and Custom Development",
    metaDescription: "Learn how knockout mouse models are engineered, why they're vital for disease research, and how ingenious targeting laboratory designs precise, ES cell-based KO models for functional genomics.",
    introduction: "Understanding what a gene does often begins with seeing what happens when it's missing. Knockout (KO) mouse models are among the most fundamental tools in biomedical research, allowing scientists to eliminate a gene's function and observe the resulting effects on physiology, behavior, and disease development.",
    sections: [
      {
        title: "What Is a Knockout Mouse?",
        content: "A knockout mouse is a genetically engineered organism in which a target gene has been permanently disrupted or deleted in every cell of the body. This is typically achieved by replacing part or all of the gene's coding sequence with a nonfunctional segment of DNA during embryonic stem (ES) cell targeting."
      },
      {
        title: "Types of Knockout Models",
        content: "Constitutive (conventional) knockouts permanently inactivate the gene in all tissues throughout life. Conditional knockouts (cKO) use site-specific recombination (e.g., Cre-lox) to inactivate the gene only in specific tissues or at specific developmental stages."
      }
    ],
    faqs: [
      {
        question: "What's the difference between a knockout and a knockdown model?",
        answer: "A knockout completely eliminates gene function through targeted deletion or disruption, while a knockdown model reduces gene expression without fully abolishing it."
      },
      {
        question: "How long does it take to generate a knockout mouse model?",
        answer: "A typical knockout mouse project takes approximately 6 to 8 months from design to delivery, depending on complexity and validation requirements."
      }
    ],
    relatedTermSlugs: ["conditional-knockout-mouse-models", "conventional-knockout-mouse-models", "knockin-mouse-models"],
    relatedServices: [
      { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
      { title: "Custom Mouse Models", href: "/custom-mouse-models" }
    ]
  },

  "conditional-knockout-mouse-models": {
    metaTitle: "Conditional Knockout Mouse Models | Tissue-Specific Gene Inactivation",
    metaDescription: "Learn how conditional knockout mouse models enable tissue- or time-specific gene deletion. Explore Cre-lox strategies, research applications, and advanced cKO development services.",
    introduction: "While traditional knockout models are powerful tools for gene function analysis, they have a critical limitation: permanent gene deletion in all cells where the gene is active. Conditional knockout (cKO) models solve this problem by controlling when and where a gene is inactivated using site-specific recombinases.",
    sections: [
      {
        title: "How Conditional Knockouts Work",
        content: "The most widely used system is Cre-lox recombination. A floxed allele is created with LoxP sites flanking an essential exon. When crossed with Cre-expressing mice, the gene is deleted only in tissues where Cre is active."
      },
      {
        title: "Advantages",
        content: "Conditional knockouts avoid embryonic lethality, enable tissue-specific studies, allow temporal control of gene deletion, reduce confounding systemic effects, and better model diseases with tissue-restricted pathologies."
      }
    ],
    faqs: [
      {
        question: "What's the difference between a conditional and a constitutive knockout?",
        answer: "A constitutive knockout removes a gene in every cell throughout the organism's life. A conditional knockout removes the gene only in specific tissues or at specific developmental stages."
      },
      {
        question: "How is a conditional knockout triggered?",
        answer: "Conditional knockout is triggered by Cre recombinase expressed under a tissue-specific or inducible promoter, which excises the floxed exon in target cells."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "floxed-gene-loxp-site", "inducible-cre-ert2", "knockout-mouse-models"],
    relatedServices: [
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
      { title: "Cre-Lox System", href: "/cre-lox-system" },
      { title: "Tissue-Specific Knockout", href: "/tissue-specific-knockout" }
    ]
  },

  "conventional-knockout-mouse-models": {
    metaTitle: "Conventional Knockout Mouse Models | Global Gene Deletion Strategies",
    metaDescription: "Discover how conventional knockout mouse models are engineered to permanently inactivate genes across all tissues, enabling fundamental insights into gene function and disease mechanisms.",
    introduction: "Before conditional and inducible systems were developed, the conventional knockout was the primary strategy for studying gene function—and it remains one of the most powerful tools in modern genetics. By completely inactivating a specific gene across all tissues, researchers can observe the full range of biological consequences.",
    faqs: [
      {
        question: "When is a conventional knockout better than a conditional knockout?",
        answer: "Conventional knockouts are ideal for understanding fundamental gene functions and modeling diseases caused by complete gene loss. Conditional approaches are better when the gene is essential or has tissue-specific effects."
      },
      {
        question: "Can a conventional knockout model be converted into a conditional one?",
        answer: "No. Conventional knockouts involve permanent gene deletion. Conditional knockouts must be designed with site-specific recombination elements, such as LoxP sites, from the start."
      }
    ],
    relatedTermSlugs: ["knockout-mouse-models", "conditional-knockout-mouse-models", "es-cell-targeting"],
    relatedServices: [
      { title: "Conventional Knockout Mouse Models", href: "/conventional-knockout-mouse-models" },
      { title: "Knockout Mouse Models", href: "/knockout-mouse-models" }
    ]
  },

  "knockin-mouse-models": {
    metaTitle: "Knockin Mouse Models | Targeted Gene Insertion and Precision Engineering",
    metaDescription: "Explore how knockin mouse models enable precise gene insertion, humanized allele replacement, and advanced functional studies.",
    introduction: "While knockout mouse models reveal what happens when a gene is missing, knockin mouse models answer a different question: What happens when we add or change something? By introducing new genetic material into a specific location in the mouse genome, scientists can explore gene regulation, model human disease variants, express therapeutic targets, or introduce reporter systems.",
    sections: [
      {
        title: "Types of Knockins",
        content: "Common types include gene replacements (replacing mouse genes with human counterparts), point mutations (specific disease-associated changes), reporter integrations (GFP, LacZ markers), and conditional knockins combined with Cre-lox systems."
      }
    ],
    faqs: [
      {
        question: "What's the difference between a knockin and a transgenic mouse?",
        answer: "A knockin involves precise insertion of a gene into a specific genomic locus, ensuring predictable and regulated expression. A transgenic mouse introduces DNA randomly, which can result in variable expression and unpredictable phenotypes."
      },
      {
        question: "How long does it take to generate a knockin mouse?",
        answer: "Generating a knockin mouse typically takes 6-10 months from design through validation and breeding, depending on project complexity."
      }
    ],
    relatedTermSlugs: ["point-mutation", "humanized-mouse-models", "reporter-gene-reporter-allele", "homology-directed-repair"],
    relatedServices: [
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
      { title: "Point Mutation Mouse Models", href: "/point-mutation-mice" },
      { title: "cDNA Knockin", href: "/cdna-knockin" }
    ]
  },

  "humanized-mouse-models": {
    metaTitle: "Humanized Mouse Models | Human Gene Replacement & Immune System Engineering",
    metaDescription: "Discover how humanized mouse models enable translational research by integrating human genes, cells, or immune components.",
    introduction: "Traditional mouse models provide powerful insights into gene function and disease mechanisms—but their biology can differ significantly from humans. Humanized mouse models solve this challenge by integrating human genetic material or biological components directly into the mouse genome or immune system.",
    sections: [
      {
        title: "Types of Humanized Models",
        content: "Gene replacement models replace mouse genes with human orthologs. Immune system humanization integrates human immune components. Cell and tissue engraftment models use human hematopoietic stem cells or tumor tissues in immunodeficient mice."
      }
    ],
    faqs: [
      {
        question: "What's the difference between a knockin and a humanized mouse model?",
        answer: "A knockin mouse model introduces a new sequence into a specific genomic locus. A humanized mouse model specifically incorporates human genes, proteins, or immune components to replicate human biology."
      },
      {
        question: "Are humanized mice suitable for preclinical drug testing?",
        answer: "Yes. Humanized mice are commonly used for preclinical testing because they express human-specific targets and pathways, enabling accurate evaluation of biologics, gene therapies, and targeted drugs."
      }
    ],
    relatedTermSlugs: ["knockin-mouse-models", "humanized-immune-checkpoint", "cytokine-receptor-humanization"],
    relatedServices: [
      { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
      { title: "PD-1 Humanized Mice", href: "/pd1-humanized-mice" },
      { title: "Immuno-Oncology Mouse Models", href: "/immuno-oncology-mouse-models" }
    ]
  },

  "reporter-gene-reporter-allele": {
    metaTitle: "Reporter Gene & Reporter Allele Mouse Models | In Vivo Tracking & Gene Expression Analysis",
    metaDescription: "Learn how reporter genes enable visualization of gene activity, lineage tracing, and in vivo expression studies.",
    introduction: "Understanding when, where, and how a gene is expressed is a cornerstone of functional genomics. Reporter mouse models solve this problem by linking gene activity to a visible signal—such as fluorescence, enzymatic activity, or luminescence—enabling researchers to study gene expression dynamically in living organisms.",
    faqs: [
      {
        question: "What's the difference between a reporter gene and a reporter allele?",
        answer: "A reporter gene is the detectable marker (such as GFP or LacZ), while a reporter allele refers to the engineered genomic locus where the reporter is inserted to reflect the activity of a specific promoter or gene."
      },
      {
        question: "Can reporter genes affect normal gene function?",
        answer: "When carefully integrated into non-coding regions or downstream of regulatory elements, reporter genes usually do not disrupt normal gene function."
      }
    ],
    relatedTermSlugs: ["reporter-readouts", "conditional-knockout-mouse-models", "rosa26-locus"],
    relatedServices: [
      { title: "Reporter Knockin", href: "/reporter-knockin" },
      { title: "GFP Knockin Mice", href: "/gfp-knockin-mice" },
      { title: "LacZ Knockin Mice", href: "/lacz-knockin-mice" }
    ]
  },

  "inducible-allele-cre-er": {
    metaTitle: "Inducible Alleles & Cre-ER Mouse Models | Temporal Gene Control in Vivo",
    metaDescription: "Explore how inducible alleles and Cre-ER systems enable precise temporal control of gene expression in mouse models.",
    introduction: "Traditional knockout or knockin models provide powerful insights into gene function—but their effects are fixed from conception. Inducible alleles solve these problems by putting researchers in control. By triggering genetic modification when they choose, scientists can study gene function in adult tissues, dissect disease progression over time, and model therapeutic interventions.",
    faqs: [
      {
        question: "How precise is temporal control with Cre-ER?",
        answer: "Temporal control with Cre-ER is highly precise. Recombination typically occurs within 24–72 hours after tamoxifen administration, and timing can be adjusted by dosage and delivery method."
      },
      {
        question: "Can inducible alleles be combined with tissue-specific promoters?",
        answer: "Yes. Cre-ER can be driven by tissue-specific promoters, allowing both spatial and temporal control in a single model."
      }
    ],
    relatedTermSlugs: ["inducible-cre-ert2", "conditional-knockout-mouse-models", "temporal-control"],
    relatedServices: [
      { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" },
      { title: "Tamoxifen-Inducible Cre", href: "/tamoxifen-inducible-cre" }
    ]
  },

  "hypomorphic-null-allele": {
    metaTitle: "Hypomorphic and Null Alleles | Functional Gene Knockout Strategies in Mice",
    metaDescription: "Understand how hypomorphic and null alleles differ in gene activity, and how these engineered variants help researchers model partial or complete loss-of-function.",
    introduction: "Hypomorphic alleles partially reduce gene function, and null alleles abolish it entirely. Understanding whether an allele is hypomorphic or null helps determine how much gene activity is required for normal biological function and can clarify the mechanistic basis of disease phenotypes.",
    faqs: [
      {
        question: "When would you use a hypomorphic allele instead of a null?",
        answer: "Hypomorphic alleles are valuable when full knockout leads to embryonic lethality or severe developmental defects, allowing investigation of partial loss-of-function states similar to human recessive diseases."
      }
    ],
    relatedTermSlugs: ["knockout-mouse-models", "gain-of-function-vs-loss-of-function-mutation", "conditional-knockout-mouse-models"],
    relatedServices: [
      { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
    ]
  },

  "dominant-negative": {
    metaTitle: "Dominant Negative | Functional Inhibition and Protein Interaction Studies in Mouse Models",
    metaDescription: "Learn how dominant negative alleles suppress wild-type protein function, offering powerful tools for pathway analysis and conditional gene inhibition.",
    introduction: "A dominant negative allele encodes a mutant protein that not only loses its normal function but also interferes with the activity of the wild-type protein. The resulting phenotype mimics or exceeds the severity of a full loss-of-function mutation, even when the wild-type allele is still present.",
    faqs: [
      {
        question: "How do dominant negative mutations work?",
        answer: "Dominant negative effects typically arise in genes whose products function as multimers or in signaling pathways where the mutant protein competes with or blocks normal components."
      }
    ],
    relatedTermSlugs: ["hypomorphic-null-allele", "gain-of-function-vs-loss-of-function-mutation", "knockin-mouse-models"],
    relatedServices: [
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
      { title: "Custom Mouse Models", href: "/custom-mouse-models" }
    ]
  },

  "rescue-allele-complementation": {
    metaTitle: "Rescue Allele / Complementation | Phenotype Validation in Mouse Model Genetics",
    metaDescription: "Explore how rescue alleles and complementation confirm gene function by restoring activity in knockout mice.",
    introduction: "A rescue allele is a genetic construct introduced to restore the normal function of a gene that has been disrupted, deleted, or mutated. The process of complementation confirms that an observed phenotype results directly from loss of that gene's function.",
    faqs: [
      {
        question: "What is the purpose of a rescue allele?",
        answer: "Rescue alleles are designed to test whether a specific phenotype results directly from loss of a particular gene's function by reintroducing functional gene copies."
      }
    ],
    relatedTermSlugs: ["knockout-mouse-models", "humanized-mouse-models", "safe-harbor-locus"],
    relatedServices: [
      { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
      { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
    ]
  },

  "safe-harbor-locus": {
    metaTitle: "Safe Harbor Locus | Stable and Predictable Transgene Integration in Mouse Models",
    metaDescription: "Learn how safe harbor loci provide stable and neutral genomic sites for transgene integration, enabling consistent and heritable expression.",
    introduction: "A safe harbor locus is a defined region of the genome where a transgene or targeted DNA sequence can be inserted without disrupting endogenous genes or regulatory networks. Integration at a safe harbor site allows stable, predictable expression of the introduced construct while maintaining overall genomic integrity.",
    faqs: [
      {
        question: "What makes a locus a 'safe harbor'?",
        answer: "Safe harbor loci are characterized by transcriptional accessibility, genomic stability across generations, and neutrality with respect to nearby gene regulation."
      }
    ],
    relatedTermSlugs: ["rosa26-locus", "single-copy-integration", "safe-harbor-targeted-transgenesis"],
    relatedServices: [
      { title: "Safe Harbor Locus Targeting", href: "/safe-harbor-locus" },
      { title: "Rosa26 Targeting", href: "/rosa26" }
    ]
  },

  "rosa26-locus": {
    metaTitle: "Rosa26 Locus | Gold Standard Safe Harbor Site for Mouse Genetic Engineering",
    metaDescription: "Discover the Rosa26 locus, the standard safe harbor integration site for transgenic mouse models.",
    introduction: "The Rosa26 locus is a well-characterized safe harbor site in the mouse genome, located on chromosome 6. It supports stable and ubiquitous expression of inserted genes without interfering with nearby genomic functions and has become the standard integration site for transgenic and conditional constructs.",
    faqs: [
      {
        question: "Why is Rosa26 the most commonly used safe harbor?",
        answer: "Rosa26 offers open chromatin structure, ubiquitous expression across tissues, and genomic neutrality—making it ideal for reporter constructs, Cre-inducible alleles, and human gene integrations."
      }
    ],
    relatedTermSlugs: ["safe-harbor-locus", "reporter-gene-reporter-allele", "safe-harbor-targeted-transgenesis"],
    relatedServices: [
      { title: "Rosa26 Targeting", href: "/rosa26" },
      { title: "Inducible Rosa26", href: "/inducible-rosa26" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 3: Recombination Systems & Tools
  // ═══════════════════════════════════════════════════════════════════════════
  "cre-lox-system": {
    metaTitle: "Cre-lox System | Site-Specific Recombination for Conditional Gene Engineering",
    metaDescription: "Learn how the Cre-lox system enables conditional gene knockout, activation, and lineage tracing in mouse models.",
    introduction: "The Cre-lox system is a bacteriophage P1-derived site-specific recombination technology that utilizes Cre recombinase to mediate genomic modifications at engineered LoxP sequences. This technology underpins conditional gene engineering approaches that are foundational in contemporary mammalian genetics.",
    faqs: [
      {
        question: "What determines whether Cre-lox produces excision or inversion?",
        answer: "The relative orientation of LoxP sites: parallel orientation yields excision, while inverted orientation yields inversion."
      },
      {
        question: "Can Cre-lox be combined with other recombinases?",
        answer: "Yes. Cre-lox is often paired with Flp-FRT or Dre-rox for multi-layered control of complex genetic events."
      }
    ],
    relatedTermSlugs: ["floxed-gene-loxp-site", "cre-driver-line", "conditional-knockout-mouse-models"],
    relatedServices: [
      { title: "Cre-Lox System", href: "/cre-lox-system" },
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
    ]
  },

  "cre-driver-line": {
    metaTitle: "Cre Driver Lines | Tissue-Specific Recombination in Mouse Models",
    metaDescription: "Learn how Cre driver lines enable tissue-specific and temporal gene knockout through controlled recombinase expression.",
    introduction: "Cre driver lines allow spatial and temporal control of gene editing by restricting recombinase expression to defined cell populations. When crossed with mice carrying floxed alleles, recombination occurs only in targeted cells, preventing the widespread effects of whole-body knockouts.",
    faqs: [
      {
        question: "How do I choose a Cre driver line?",
        answer: "Select based on promoter specificity, timing, and validation data. Use reporter crosses to confirm activity patterns."
      },
      {
        question: "How do I verify tissue specificity?",
        answer: "Cross to a Cre-reporter mouse and confirm labeled cells match expected expression domains."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "tissue-specific-knockout", "conditional-knockout-mouse-models"],
    relatedServices: [
      { title: "Tissue-Specific Cre Lines", href: "/tissue-specific-cre-lines" },
      { title: "Cre Line Selection Guide", href: "/cre-line-selection-guide" }
    ]
  },

  "floxed-gene-loxp-site": {
    metaTitle: "Floxed Genes & LoxP Sites | Conditional Gene Control Elements",
    metaDescription: "Understand how floxed genes and LoxP sites enable conditional gene regulation through Cre-mediated recombination.",
    introduction: "A floxed gene contains two LoxP sites flanking an essential DNA segment, allowing Cre recombinase to mediate excision or inversion for conditional gene regulation. LoxP sites are 34 base pair sequences recognized by Cre recombinase.",
    faqs: [
      {
        question: "Where should LoxP sites be placed for a null allele?",
        answer: "Typically in introns flanking an essential exon to generate a nonfunctional transcript after excision."
      },
      {
        question: "How far apart can LoxP sites be?",
        answer: "Shorter distances favor efficient recombination; long segments may recombine less predictably."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "conditional-knockout-mouse-models", "lox-stop-lox-cassette"],
    relatedServices: [
      { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
      { title: "LoxP Site Design", href: "/loxp-site-design" }
    ]
  },

  "lox-stop-lox-cassette": {
    metaTitle: "Lox-STOP-Lox (LSL) Cassette | Conditional Gene Activation",
    metaDescription: "Learn how LSL cassettes enable conditional gene activation by blocking expression until Cre-mediated excision.",
    introduction: "An LSL cassette contains a transcriptional STOP sequence flanked by LoxP sites that blocks gene expression until excised by Cre recombinase. This molecular 'gatekeeper' design is essential for gain-of-function models requiring precise spatial and temporal gene induction.",
    faqs: [
      {
        question: "What is inside an LSL cassette?",
        answer: "STOP and polyA termination sequences, often accompanied by selectable markers, flanked by LoxP sites."
      },
      {
        question: "When should I use LSL designs?",
        answer: "For conditional gene activation or lineage tracing where spatial or temporal control is essential."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "reporter-gene-reporter-allele", "conditional-knockout-mouse-models"],
    relatedServices: [
      { title: "Conditional Knockin Mice", href: "/conditional-knockin-mice" },
      { title: "Reporter Knockin", href: "/reporter-knockin" }
    ]
  },

  "flp-frt-system": {
    metaTitle: "Flp-FRT System | Orthogonal Recombination for Mouse Genetics",
    metaDescription: "Explore the Flp-FRT system as an independent recombination tool for cassette removal and dual-recombinase experiments.",
    introduction: "The Flp-FRT system is a yeast-derived site-specific recombination mechanism enabling targeted DNA excision, inversion, or integration through the interaction of Flp recombinase with FRT sites. It serves as an orthogonal complement to Cre-lox in mammalian genetics.",
    faqs: [
      {
        question: "What is FlpO?",
        answer: "A thermostable Flp recombinase variant optimized for efficient activity in mammalian systems at 37°C."
      },
      {
        question: "When to use Flp-FRT vs Cre-lox?",
        answer: "Use Flp-FRT for cassette removal, dual-recombinase logic, or intersectional experiments requiring non-overlapping target sites."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "dre-rox-system", "selection-markers"],
    relatedServices: [
      { title: "Flp-FRT System", href: "/flp-frt-system" },
    ]
  },

  "dre-rox-system": {
    metaTitle: "Dre-rox System | Third-Generation Recombination Platform",
    metaDescription: "Learn about the Dre-rox system for orthogonal recombination independent of Cre-lox and Flp-FRT.",
    introduction: "The Dre-rox system is an independent site-specific recombination platform derived from bacteriophage D6, using Dre recombinase to recognize rox sites for DNA rearrangements orthogonal to both Cre-lox and Flp-FRT.",
    faqs: [
      {
        question: "Does Dre recombine LoxP or FRT sites?",
        answer: "No. Dre acts exclusively on rox sites, ensuring complete orthogonality."
      },
      {
        question: "Why add Dre-rox to a Cre/Flp design?",
        answer: "To enable triple-layer logic or intersectional control without recombinase interference."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "flp-frt-system", "inversion-vs-excision"],
    relatedServices: [
      { title: "Custom Mouse Models", href: "/custom-mouse-models" }
    ]
  },

  "tet-on-tet-off-systems": {
    metaTitle: "Tet-On / Tet-Off Systems | Doxycycline-Controlled Gene Expression",
    metaDescription: "Explore tetracycline-responsive systems for reversible, dose-dependent gene expression control in mouse models.",
    introduction: "Tet-On and Tet-Off are tetracycline-responsive transcription systems that regulate gene expression reversibly through doxycycline administration, allowing dose- and time-dependent control of transgene activity.",
    faqs: [
      {
        question: "What is the difference between Tet-On and Tet-Off?",
        answer: "Tet-On activates gene expression in the presence of doxycycline; Tet-Off activates in its absence."
      },
      {
        question: "Is expression reversible?",
        answer: "Yes. Gene expression can be toggled on or off by administering or withdrawing doxycycline."
      }
    ],
    relatedTermSlugs: ["inducible-allele-cre-er", "doxycycline-inducible-systems", "temporal-control"],
    relatedServices: [
      { title: "Inducible Gene Expression", href: "/inducible-gene-expression" }
    ]
  },

  "inducible-cre-ert2": {
    metaTitle: "Inducible Cre (Cre-ERT2) | Tamoxifen-Controlled Recombination",
    metaDescription: "Learn how Cre-ERT2 systems provide temporal control of recombination through tamoxifen induction.",
    introduction: "Inducible Cre fuses Cre recombinase to a modified estrogen-receptor ligand-binding domain (ERT2), confining it to the cytoplasm until activation by tamoxifen. This provides temporal control of recombination for conditional genetic studies.",
    faqs: [
      {
        question: "How fast does recombination occur after tamoxifen?",
        answer: "Significant recombination typically appears within 24–72 hours, depending on tissue and dosage."
      },
      {
        question: "How do I reduce leakiness?",
        answer: "Use validated Cre-ERT2 lines, optimize dosing, and include no-tamoxifen controls with a reporter allele."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "inducible-allele-cre-er", "temporal-control"],
    relatedServices: [
      { title: "Tamoxifen-Inducible Cre", href: "/tamoxifen-inducible-cre" },
      { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" }
    ]
  },

  "inversion-vs-excision": {
    metaTitle: "Inversion vs Excision | Recombination Outcome Principles",
    metaDescription: "Understand how recombination site orientation determines whether DNA is excised or inverted.",
    introduction: "The orientation of recombination sites determines genetic outcomes: direct repeats drive excision (deletion) of the intervening DNA, whereas inverted repeats cause inversion of the DNA segment. This principle underlies most conditional strategies.",
    faqs: [
      {
        question: "How do I force excision rather than inversion?",
        answer: "Sites must be in the same orientation (direct repeats) and on the same DNA strand."
      },
      {
        question: "Is inversion reversible?",
        answer: "Yes. Inversions can revert if recombinase activity continues."
      }
    ],
    relatedTermSlugs: ["cre-lox-system", "flp-frt-system", "floxed-gene-loxp-site"],
    relatedServices: [
      { title: "Cre-Lox System", href: "/cre-lox-system" }
    ]
  },

  "recombination-leakiness": {
    metaTitle: "Recombination Leakiness | Background Activity in Conditional Systems",
    metaDescription: "Learn about recombination leakiness and strategies to minimize unintended activity in conditional mouse models.",
    introduction: "Recombination leakiness refers to unintended recombinase activity occurring without inducer presence or outside targeted tissues, leading to unwanted genomic alterations or mosaicism. Understanding its sources and mitigation strategies is essential for accurate genetic modeling.",
    faqs: [
      {
        question: "What causes recombination without inducer?",
        answer: "Basal promoter activity, ligand-independent nuclear entry, or high transgene copy number."
      },
      {
        question: "How can I detect leakiness early?",
        answer: "Include Cre-reporter crosses and vehicle-only controls; quantify background recombination by PCR or imaging."
      }
    ],
    relatedTermSlugs: ["inducible-cre-ert2", "cre-driver-line", "mosaicism"],
    relatedServices: [
      { title: "Custom Mouse Models", href: "/custom-mouse-models" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 4: Vectors & Delivery
  // ═══════════════════════════════════════════════════════════════════════════
  "targeting-vector": {
    metaTitle: "Targeting Vector (Homology Arms) | Precision Gene Targeting in Mouse Models",
    metaDescription: "Learn how targeting vectors with 5′ and 3′ homology arms enable precise gene replacement and knockin modifications.",
    introduction: "A targeting vector is a synthetic DNA construct designed to introduce specific genetic modifications into a genome through homologous recombination or HDR. It contains sequences known as homology arms that align precisely with the genomic target locus, enabling accurate exchange or insertion of DNA.",
    faqs: [
      {
        question: "How long should homology arms be?",
        answer: "Homology arms typically range from 1–10 kilobases for ES cell targeting. Longer arms generally increase recombination efficiency."
      }
    ],
    relatedTermSlugs: ["homologous-recombination", "homology-directed-repair", "es-cell-targeting", "selection-markers"],
    relatedServices: [
      { title: "Custom Mouse Models", href: "/custom-mouse-models" }
    ]
  },

  "selection-markers": {
    metaTitle: "Selection Markers (NeoR, PuroR) | Antibiotic Selection in Mouse ES Cell Targeting",
    metaDescription: "Explore how NeoR and PuroR selection markers are used to isolate correctly targeted ES cells.",
    introduction: "Selection markers are genes incorporated into targeting vectors to identify and isolate cells that have successfully integrated a genetic modification. Common markers include neomycin resistance (NeoR) and puromycin resistance (PuroR), which confer survival advantages under antibiotic selection.",
    faqs: [
      {
        question: "Can selection markers be removed after targeting?",
        answer: "Yes. Markers are often flanked by LoxP or FRT sites for removal via Cre or Flp recombinase once correctly targeted clones are established."
      }
    ],
    relatedTermSlugs: ["targeting-vector", "es-cell-targeting", "flp-frt-system"],
    relatedServices: [
      { title: "Custom Mouse Models", href: "/custom-mouse-models" }
    ]
  },

  "blastocyst-injection-chimera": {
    metaTitle: "Blastocyst Injection and Chimera Production | Germline Transmission in Mouse Models",
    metaDescription: "Understand how blastocyst injection transfers targeted ES cell modifications into the germline.",
    introduction: "Blastocyst injection is the process of introducing genetically modified cells into a developing mouse blastocyst to create a chimera—an organism composed of cells derived from both the host embryo and the engineered cells. This step is essential for transferring targeted genetic modifications into the germline.",
    faqs: [
      {
        question: "How do you identify high-contribution chimeras?",
        answer: "Chimeric offspring typically display coat color patterns reflecting ES cell contribution vs. host embryo strain, which can be visually assessed at birth."
      }
    ],
    relatedTermSlugs: ["es-cell-targeting", "germline-transmission", "germline-confirmation-coat-color"],
    relatedServices: [
      { title: "Speed Expansion Breeding", href: "/speed-expansion-breeding" }
    ]
  },

  "pronuclear-injection": {
    metaTitle: "Pronuclear Injection (Transgenics) | Classical Method for Generating Transgenic Mice",
    metaDescription: "Learn how pronuclear injection introduces DNA into fertilized embryos to create transgenic mice.",
    introduction: "Pronuclear injection is a technique used to generate transgenic mice by directly introducing foreign DNA into the pronucleus of a fertilized one-cell embryo. The injected DNA integrates randomly into the mouse genome, resulting in offspring that carry and express the transgene.",
    faqs: [
      {
        question: "What is the main limitation of pronuclear injection?",
        answer: "DNA integrates randomly, resulting in variable expression and copy number. This can lead to position effects and unpredictable phenotypes."
      }
    ],
    relatedTermSlugs: ["single-copy-integration", "transgenic-mouse-service", "safe-harbor-targeted-transgenesis"],
    relatedServices: [
      { title: "Transgenic Mouse Service", href: "/transgenic-mouse-service" }
    ]
  },

  "single-copy-integration": {
    metaTitle: "Single-Copy Integration | Stable and Reproducible Transgene Expression",
    metaDescription: "Discover how single-copy integration eliminates variability and position effects.",
    introduction: "Single-copy integration refers to the precise insertion of a single copy of a DNA construct into a defined location within the genome. This approach prevents the variability, gene silencing, and expression artifacts often associated with random multi-copy insertions.",
    faqs: [
      {
        question: "How is single-copy integration achieved?",
        answer: "Through targeted genome editing—most commonly homologous recombination, HDR, or recombinase-mediated cassette exchange (RMCE)—to insert one construct into a defined locus."
      }
    ],
    relatedTermSlugs: ["safe-harbor-locus", "rosa26-locus", "safe-harbor-targeted-transgenesis"],
    relatedServices: [
      { title: "Safe Harbor Locus Targeting", href: "/safe-harbor-locus" },
      { title: "Rosa26 Targeting", href: "/rosa26" }
    ]
  },

  "large-fragment-bac-targeting": {
    metaTitle: "Large-Fragment / BAC Targeting | Full Locus Gene Integration",
    metaDescription: "Learn how BAC targeting enables insertion of large genomic fragments with native regulatory elements.",
    introduction: "Large-fragment or BAC (bacterial artificial chromosome) targeting involves introducing extended genomic DNA segments—often spanning 100–300 kilobases—into the mouse genome to preserve native gene context and regulatory elements.",
    faqs: [
      {
        question: "When should BAC targeting be used?",
        answer: "BAC targeting is particularly valuable for humanized gene models, reporter lines, rescue constructs, and multigene loci where cDNA constructs cannot capture regulatory complexity."
      }
    ],
    relatedTermSlugs: ["targeting-vector", "humanized-mouse-models", "bac-to-bac-large-scale-targeting"],
    relatedServices: [
      { title: "BAC-to-BAC Large Scale Targeting", href: "/bac-to-bac-large-scale-targeting" }
    ]
  },

  "safe-harbor-targeted-transgenesis": {
    metaTitle: "Safe-Harbor Targeted Transgenesis | Precise, Reproducible Gene Integration",
    metaDescription: "Discover how safe-harbor targeted transgenesis inserts transgenes into neutral genomic loci.",
    introduction: "Safe-harbor targeted transgenesis is a precise genome engineering strategy in which a transgene is inserted into a well-characterized, transcriptionally active, and non-disruptive genomic locus—a 'safe harbor'—to ensure predictable and stable expression.",
    faqs: [
      {
        question: "What are the most common safe harbor loci?",
        answer: "The Rosa26 locus is the most widely used, followed by H11 and TIGRE, each characterized by neutrality and broad compatibility with diverse promoters."
      }
    ],
    relatedTermSlugs: ["safe-harbor-locus", "rosa26-locus", "single-copy-integration"],
    relatedServices: [
      { title: "Safe Harbor Locus Targeting", href: "/safe-harbor-locus" },
      { title: "Rosa26 Targeting", href: "/rosa26" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 5: Validation, QC & Genotyping
  // ═══════════════════════════════════════════════════════════════════════════
  "genotyping-pcr-qpcr": {
    metaTitle: "Genotyping PCR / qPCR | Genetic Verification and Copy Number Analysis",
    metaDescription: "Learn how genotyping PCR and qPCR confirm targeted alleles and determine zygosity.",
    introduction: "Genotyping PCR and quantitative PCR (qPCR) are molecular methods used to detect, confirm, and quantify genetic modifications in engineered mouse models. These assays verify whether the targeted allele, wild-type allele, or transgene is present in an individual animal's DNA.",
    faqs: [
      {
        question: "What is the difference between PCR and qPCR genotyping?",
        answer: "Genotyping PCR identifies alleles based on PCR product size differences. qPCR provides quantitative analysis of gene copy number and zygosity."
      }
    ],
    relatedTermSlugs: ["southern-blot-copy-number", "zygosity", "breeding-scheme"],
    relatedServices: [
      { title: "Mouse Genotyping Service", href: "/mouse-genotyping-service" },
      { title: "Colony Management Services", href: "/colony-management-services" }
    ]
  },

  "southern-blot-copy-number": {
    metaTitle: "Southern Blot / Copy Number Confirmation | Gold Standard for Integration Validation",
    metaDescription: "Explore how Southern blot analysis confirms correct gene targeting and copy number.",
    introduction: "Southern blotting is a classical DNA analysis method that remains the gold standard for verifying correct targeting, integration patterns, and copy number of inserted constructs in engineered mouse models.",
    faqs: [
      {
        question: "Is Southern blotting still necessary with modern sequencing?",
        answer: "While modern tools like qPCR and NGS have supplemented Southern blots, the technique remains valuable for ES cell validation before chimera generation due to its ability to detect both on-target and random integration events."
      }
    ],
    relatedTermSlugs: ["genotyping-pcr-qpcr", "sanger-ngs-validation", "es-cell-targeting"],
    relatedServices: [
      { title: "Mouse Genotyping Service", href: "/mouse-genotyping-service" }
    ]
  },

  "sanger-ngs-validation": {
    metaTitle: "Sanger / NGS Validation of Junctions | Sequence-Level Verification",
    metaDescription: "Confirm precise integration and junction accuracy using Sanger and NGS sequencing.",
    introduction: "Sanger sequencing and next-generation sequencing (NGS) are essential tools for verifying the accuracy of DNA junctions at targeted integration sites. These assays confirm that homologous recombination or HDR occurred precisely without insertions, deletions, or rearrangements.",
    faqs: [
      {
        question: "When is NGS preferred over Sanger sequencing?",
        answer: "NGS offers deep coverage for detecting minor allelic variants and is valuable for humanized constructs and large-fragment integrations where Sanger reads are insufficient."
      }
    ],
    relatedTermSlugs: ["southern-blot-copy-number", "off-target-assessment", "homology-directed-repair"],
    relatedServices: [
      { title: "Mouse Genotyping Service", href: "/mouse-genotyping-service" }
    ]
  },

  "off-target-assessment": {
    metaTitle: "Off-Target Assessment / Allele Integrity | Ensuring Specific and Accurate Genome Editing",
    metaDescription: "Learn how off-target analysis and allele integrity validation confirm specificity and accuracy.",
    introduction: "Off-target assessment determines whether unintended genomic changes have occurred during editing, while allele integrity verifies that the targeted locus remains structurally sound and functionally unaffected.",
    faqs: [
      {
        question: "How are off-target effects detected?",
        answer: "Through in silico prediction, GUIDE-seq, or whole-genome sequencing (WGS) to identify potential off-target loci, combined with junction PCR and Southern blot to verify allele structure."
      }
    ],
    relatedTermSlugs: ["sanger-ngs-validation", "southern-blot-copy-number", "genotyping-pcr-qpcr"],
    relatedServices: [
      { title: "Mouse Genotyping Service", href: "/mouse-genotyping-service" }
    ]
  },

  "germline-confirmation-coat-color": {
    metaTitle: "Germline Confirmation / Coat Color Markers | Validating Transmission in Chimeric Mice",
    metaDescription: "Understand how germline confirmation and coat color markers verify heritable transmission.",
    introduction: "Germline confirmation ensures that a targeted genetic modification has been successfully passed through reproductive cells to offspring. Coat-color markers serve as a visible indicator of ES cell contribution in chimeric founder animals.",
    faqs: [
      {
        question: "How does coat color indicate ES cell contribution?",
        answer: "After blastocyst injection, ES-cell–derived mice exhibit mixed coat colors based on parental strain background (e.g., agouti × albino), helping identify high-contribution chimeras."
      }
    ],
    relatedTermSlugs: ["germline-transmission", "blastocyst-injection-chimera", "breeding-scheme"],
    relatedServices: [
      { title: "Speed Expansion Breeding", href: "/speed-expansion-breeding" }
    ]
  },

  "breeding-scheme": {
    metaTitle: "Breeding Scheme | Designing Crosses for Controlled Genotypes",
    metaDescription: "Learn how defined breeding schemes manage genotype ratios and ensure efficient generation of desired genotypes.",
    introduction: "Breeding schemes describe the planned mating strategies used to generate offspring of specific genotypes—such as heterozygous, homozygous, or compound mutant combinations—from established genetically modified lines.",
    faqs: [
      {
        question: "What genotype ratios does a heterozygous × heterozygous cross produce?",
        answer: "On average: 25% homozygous wild-type (+/+), 50% heterozygous (+/−), and 25% homozygous mutant (−/−)."
      }
    ],
    relatedTermSlugs: ["zygosity", "colony-management-backcrossing", "germline-transmission"],
    relatedServices: [
      { title: "Speed Expansion Breeding", href: "/speed-expansion-breeding" },
      { title: "Colony Management Services", href: "/colony-management-services" }
    ]
  },

  "colony-management-backcrossing": {
    metaTitle: "Colony Management / Backcrossing | Maintaining Genetic Stability",
    metaDescription: "Explore best practices for colony management and backcrossing to preserve genetic integrity.",
    introduction: "Colony management includes all procedures necessary to maintain healthy and genetically defined mouse lines. Backcrossing involves introducing a targeted mutation onto a standardized inbred background to minimize genetic variability and ensure consistency.",
    faqs: [
      {
        question: "How many generations of backcrossing are needed?",
        answer: "Backcrossing for ≥10 generations achieves >99% background purity on the chosen inbred strain."
      }
    ],
    relatedTermSlugs: ["breeding-scheme", "zygosity", "genotyping-pcr-qpcr"],
    relatedServices: [
      { title: "Colony Management Services", href: "/colony-management-services" },
      { title: "Backcrossing Services", href: "/backcrossing-services" }
    ]
  },

  "zygosity": {
    metaTitle: "Zygosity (Heterozygous vs Homozygous) | Understanding Allele Combinations",
    metaDescription: "Learn how zygosity status impacts gene dosage, phenotype, and breeding outcomes.",
    introduction: "Zygosity describes whether the two copies of a gene in an organism are identical (homozygous) or different (heterozygous). Determining zygosity is crucial for interpreting phenotypes and designing experiments involving genetically modified mice.",
    faqs: [
      {
        question: "Why does zygosity matter for phenotype?",
        answer: "Zygosity affects gene dosage, expression level, and resulting phenotype severity. Some phenotypes only manifest in homozygous animals."
      }
    ],
    relatedTermSlugs: ["allele-genotype-phenotype", "breeding-scheme", "genotyping-pcr-qpcr"],
    relatedServices: [
      { title: "Mouse Genotyping Service", href: "/mouse-genotyping-service" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 6: Immunology & Humanization
  // ═══════════════════════════════════════════════════════════════════════════
  "humanized-immune-checkpoint": {
    metaTitle: "Humanized Immune Checkpoint (PD-1 / PD-L1 / CTLA-4) | Translational Immuno-Oncology Models",
    metaDescription: "Discover how humanized immune-checkpoint mouse models enable precise evaluation of immunotherapies.",
    introduction: "Humanized immune-checkpoint mouse models are genetically engineered to replace key inhibitory immune receptors—such as PD-1, PD-L1, and CTLA-4—with their human equivalents. These models faithfully replicate human immune-regulatory pathways and are essential for evaluating antibody and biologic therapies.",
    faqs: [
      {
        question: "Why humanize immune checkpoints?",
        answer: "Mouse and human checkpoint proteins differ structurally, preventing direct translation of therapeutic results. Humanization enables human antibody binding and accurate mechanistic studies."
      }
    ],
    relatedTermSlugs: ["humanized-mouse-models", "single-vs-double-humanized-targets", "cytokine-receptor-humanization"],
    relatedServices: [
      { title: "PD-1 Humanized Mice", href: "/pd1-humanized-mice" },
      { title: "PD-L1 Humanized Mice", href: "/pdl1-humanized-mice" },
      { title: "CTLA-4 Humanized Mice", href: "/ctla4-humanized-mice" }
    ]
  },

  "cytokine-receptor-humanization": {
    metaTitle: "Cytokine / Receptor Humanization | Functional Human Immune Signaling",
    metaDescription: "Learn how cytokine and receptor humanization enables cross-reactive immune signaling.",
    introduction: "Cytokine and receptor humanization refers to the genetic replacement of mouse cytokines, receptors, or ligand–receptor pairs with their human equivalents. These models recreate critical components of the human immune network for accurate evaluation of human biologics.",
    faqs: [
      {
        question: "Why are cytokine humanizations important?",
        answer: "Human cytokines often fail to interact efficiently with murine receptors due to species-specific signaling differences. Humanization enables functional human immune cell engraftment and signaling."
      }
    ],
    relatedTermSlugs: ["humanized-immune-checkpoint", "humanized-mouse-models", "hla-humanized-models"],
    relatedServices: [
      { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
      { title: "Immuno-Oncology Mouse Models", href: "/immuno-oncology-mouse-models" }
    ]
  },

  "hla-humanized-models": {
    metaTitle: "HLA Humanized Models | Human Antigen Presentation and Immune Response Studies",
    metaDescription: "Explore HLA humanized mouse models for T-cell activation and immunotherapy development.",
    introduction: "HLA humanized models are genetically engineered mice in which murine major histocompatibility complex (MHC) genes are replaced with human leukocyte antigen (HLA) alleles. These models recapitulate key aspects of human antigen presentation and adaptive immunity.",
    faqs: [
      {
        question: "What applications benefit from HLA humanization?",
        answer: "Vaccine development, cancer immunotherapy research, autoimmunity studies, and evaluation of HLA-restricted T-cell receptor therapies."
      }
    ],
    relatedTermSlugs: ["humanized-immune-checkpoint", "cytokine-receptor-humanization", "graft-versus-host-engraftment"],
    relatedServices: [
      { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
    ]
  },

  "single-vs-double-humanized-targets": {
    metaTitle: "Single vs Double Humanized Targets | Precision Immune Pathway Modeling",
    metaDescription: "Understand how single and double humanized models replicate human immune interactions.",
    introduction: "Single humanized models express one human gene of an interacting pair (e.g., PD-1), while double humanized models replace both receptor and ligand (e.g., PD-1 and PD-L1) to achieve full human-to-human signaling compatibility within the mouse system.",
    faqs: [
      {
        question: "When is double humanization necessary?",
        answer: "Double humanization is needed when both molecules are species-specific and cross-reactivity between mouse and human versions is poor, providing a fully functional ligand–receptor axis."
      }
    ],
    relatedTermSlugs: ["humanized-immune-checkpoint", "humanized-mouse-models", "double-checkpoint-mice"],
    relatedServices: [
      { title: "Double Checkpoint Mice", href: "/double-checkpoint-mice" },
      { title: "Humanized Immune Checkpoint Mice", href: "/humanized-immune-checkpoint-mice" }
    ]
  },

  "graft-versus-host-engraftment": {
    metaTitle: "Graft-versus-Host / Engraftment Considerations | Optimizing Humanized Mouse Models",
    metaDescription: "Learn how graft-versus-host and engraftment parameters affect humanized mouse model success.",
    introduction: "Graft-versus-host (GvH) and engraftment considerations refer to the immunological compatibility factors that influence successful transplantation and maintenance of human cells or tissues in humanized mouse models.",
    faqs: [
      {
        question: "How can GvH reactions be minimized?",
        answer: "Using specialized immunodeficient mouse strains (NSG, NOG, BRG) that lack adaptive immune components, and adding human cytokine knock-ins or HLA replacements to support engraftment."
      }
    ],
    relatedTermSlugs: ["hla-humanized-models", "cytokine-receptor-humanization", "humanized-mouse-models"],
    relatedServices: [
      { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 7: Study Design & Applications
  // ═══════════════════════════════════════════════════════════════════════════
  "baseline-phenotyping": {
    metaTitle: "Baseline Phenotyping | Establishing Reference Data in Mouse Model Validation",
    metaDescription: "Learn how baseline phenotyping characterizes physiological and molecular traits of new mouse models.",
    introduction: "Baseline phenotyping refers to the comprehensive evaluation of an engineered mouse line's physiological, molecular, and behavioral traits before any experimental intervention. This establishes a reference dataset that differentiates inherent strain variability from phenotypic changes caused by the targeted genetic modification.",
    faqs: [
      {
        question: "What does baseline phenotyping include?",
        answer: "Physical traits, clinical chemistry, behavioral assessments, immunophenotyping, and histopathological review of major organs."
      }
    ],
    relatedTermSlugs: ["tissue-specific-knockout", "translational-relevance-disease-modeling", "reporter-readouts"],
    relatedServices: [
      { title: "Phenotyping Services", href: "/phenotyping-services" }
    ]
  },

  "tissue-specific-knockout": {
    metaTitle: "Tissue-Specific Knockout | Conditional Gene Deletion for Organ-Specific Studies",
    metaDescription: "Explore how tissue-specific knockout mouse models use Cre-LoxP recombination for selective gene deletion.",
    introduction: "A tissue-specific knockout is a genetically engineered mouse model in which a target gene is selectively deleted or inactivated in a specific tissue or cell type, rather than throughout the entire organism. This typically relies on the Cre-LoxP recombination system.",
    faqs: [
      {
        question: "What are common tissue-specific Cre drivers?",
        answer: "Albumin-Cre for liver, Nestin-Cre for neurons, Myh6-Cre for heart, and LysM-Cre for myeloid cells are commonly used."
      }
    ],
    relatedTermSlugs: ["cre-driver-line", "conditional-knockout-mouse-models", "temporal-control"],
    relatedServices: [
      { title: "Tissue-Specific Knockout", href: "/tissue-specific-knockout" },
      { title: "Tissue-Specific Cre Lines", href: "/tissue-specific-cre-lines" }
    ]
  },

  "temporal-control": {
    metaTitle: "Temporal Control (Induction Windows, Dosing) | Time-Regulated Gene Manipulation",
    metaDescription: "Learn how inducible systems enable precise temporal control of gene expression.",
    introduction: "Temporal control enables the activation or deactivation of a genetic modification at a specific time or during a defined developmental or experimental window. This strategy allows researchers to study gene function dynamically and distinguish developmental effects from those occurring later.",
    faqs: [
      {
        question: "What induction systems provide temporal control?",
        answer: "Cre-ER (tamoxifen-inducible), Tet-On/Tet-Off (doxycycline), and chemical or heat-shock inducible promoters."
      }
    ],
    relatedTermSlugs: ["inducible-cre-ert2", "tet-on-tet-off-systems", "inducible-allele-cre-er"],
    relatedServices: [
      { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" }
    ]
  },

  "reporter-readouts": {
    metaTitle: "Reporter Readouts (GFP, LacZ, Luc) | Visualizing Gene Expression in Mouse Models",
    metaDescription: "Learn how reporter genes enable visualization and quantification of gene activity.",
    introduction: "Reporter readouts are measurable signals—typically fluorescent, enzymatic, or luminescent—produced by genetically encoded reporter genes such as GFP, LacZ, and luciferase. These are integrated into mouse models to visualize gene expression, track cell lineages, or monitor biological processes in real time.",
    faqs: [
      {
        question: "What are the advantages of each reporter type?",
        answer: "GFP: direct fluorescence visualization. LacZ: colorimetric histological staining. Luciferase: noninvasive in vivo bioluminescence imaging."
      }
    ],
    relatedTermSlugs: ["reporter-gene-reporter-allele", "baseline-phenotyping", "tissue-specific-knockout"],
    relatedServices: [
      { title: "Reporter Knockin", href: "/reporter-knockin" },
      { title: "GFP Knockin Mice", href: "/gfp-knockin-mice" },
      { title: "tdTomato Knockin Mice", href: "/tdtomato-knockin-mice" }
    ]
  },

  "translational-relevance-disease-modeling": {
    metaTitle: "Translational Relevance / Disease Modeling | Bridging Mouse Models and Human Medicine",
    metaDescription: "Discover how translationally relevant mouse models replicate human disease mechanisms.",
    introduction: "Translational relevance refers to how effectively a mouse model replicates key aspects of human biology, ensuring findings are predictive of clinical outcomes. Disease modeling involves engineering mice to mimic specific human pathological conditions for studying mechanisms and testing therapies.",
    faqs: [
      {
        question: "What makes a mouse model translationally relevant?",
        answer: "Faithful replication of human pathophysiology, genetic basis of disease, appropriate biomarkers, and predictable therapeutic responsiveness."
      }
    ],
    relatedTermSlugs: ["humanized-mouse-models", "baseline-phenotyping", "tissue-specific-knockout"],
    relatedServices: [
      { title: "Therapeutic Areas", href: "/therapeutic-areas" },
      { title: "Disease Model Catalog", href: "/disease-model-catalog" },
      { title: "Preclinical Services", href: "/preclinical-services" }
    ]
  }
};

// Function to get full extended term data by merging base and extended data
export function getExtendedTerm(slug: string): GlossaryTermExtended | null {
  const baseTerm = glossaryTerms.find(t => t.slug === slug);
  if (!baseTerm) return null;

  const extended = glossaryTermsExtended[slug] || {};
  
  return {
    ...baseTerm,
    metaTitle: extended.metaTitle || `${baseTerm.term} | Mouse Genetics Glossary`,
    metaDescription: extended.metaDescription || baseTerm.definition,
    introduction: extended.introduction || baseTerm.definition,
    sections: extended.sections || [],
    faqs: extended.faqs || [],
    relatedTermSlugs: extended.relatedTermSlugs || [],
    relatedServices: extended.relatedServices || []
  };
}

// Function to get all slugs for static generation
export function getAllGlossarySlugs(): string[] {
  return glossaryTerms.map(t => t.slug);
}

// Function to get related terms as full objects
export function getRelatedTerms(slugs: string[]): GlossaryTerm[] {
  return slugs
    .map(slug => glossaryTerms.find(t => t.slug === slug))
    .filter((t): t is GlossaryTerm => t !== undefined);
}
