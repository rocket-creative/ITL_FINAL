'use client';

/**
 * FAQ Hub Page - Comprehensive Frequently Asked Questions
 * Centralized FAQ with search, filtering, and categorization
 * Built following RULES_2026 guidelines
 */

import { useState, useMemo } from 'react';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  UXUIDCAnimatedFAQ,
  GlossaryTermLink,
  IconSearch,
  IconChevronRight,
  UXUIDCStartProjectCTA,
  FAQPageSchema,
  BreadcrumbSchema,
} from '@/components/UXUIDC';

// Brand colors
const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  blue: '#2384da',
  lightGray: '#f7f7f7',
  white: '#ffffff',
  text: '#333333',
};

// FAQ Categories
type FAQCategory = 
  | 'Getting Started'
  | 'Model Types'
  | 'Technology'
  | 'Strain Backgrounds'
  | 'Services'
  | 'Quality & Support';

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
  category: FAQCategory;
}

// Comprehensive FAQ Data
const allFAQs: FAQ[] = [
  // Getting Started (8 questions)
  {
    category: 'Getting Started',
    question: 'How long does it take to generate a custom mouse model?',
    answer: (
      <>
        Timeline depends on model complexity. Conventional <GlossaryTermLink term="knockout-mouse-models">knockout mice</GlossaryTermLink> typically take 9 to 12 months from design to germline transmission. <GlossaryTermLink term="conditional-knockout-mouse-models">Conditional knockout mice</GlossaryTermLink> with LoxP sites take 12 to 15 months. Point mutations and reporter knockins take 10 to 14 months. Timeline includes targeting vector design, ES cell targeting, founder generation, and germline verification.
      </>
    )
  },
  {
    category: 'Getting Started',
    question: 'What information do I need to start a project?',
    answer: 'To begin, we need your target gene name or Ensembl ID, desired modification type (knockout, knockin, point mutation, etc.), preferred mouse strain background (C57BL/6, 129, BALB/c), and research application. Our team will guide you through allele design strategy, selection strategy, and timeline planning during initial consultation.'
  },
  {
    category: 'Getting Started',
    question: 'What is the cost of generating a custom mouse model?',
    answer: 'Project cost varies based on model complexity, allele design, and additional services required. Conventional knockouts start around $15,000 to $20,000. Conditional knockouts with LoxP sites range from $25,000 to $35,000. Complex models with multiple modifications or humanization may cost more. Contact us for a detailed quote based on your specific project requirements.'
  },
  {
    category: 'Getting Started',
    question: 'What happens after I submit a project request?',
    answer: 'After submission, a project manager contacts you within 1 business day to discuss your research goals. We provide allele design recommendations, timeline estimates, and a detailed quote. Once approved, we begin targeting vector design, proceed through ES cell targeting, generate founders, and verify germline transmission. You receive regular progress updates at each milestone.'
  },
  {
    category: 'Getting Started',
    question: 'Do you provide breeding and colony management support?',
    answer: 'Yes. We offer speed expansion breeding to rapidly generate cohorts, backcrossing services to achieve desired background purity, cryopreservation for colony backup, and full colony management services. Our breeding schemes are optimized for germline stability and reproducible phenotypes.'
  },
  {
    category: 'Getting Started',
    question: 'Can I get help designing my allele strategy?',
    answer: 'Absolutely. Our scientific team provides expert consultation on allele design strategy at no additional cost. We help select critical exons, optimize LoxP placement, choose appropriate selection markers, and design verification strategies. All designs are reviewed for germline stability and experimental utility before proceeding.'
  },
  {
    category: 'Getting Started',
    question: 'What strain background should I choose for my model?',
    answer: (
      <>
        <GlossaryTermLink term="c57bl6-mouse-background">C57BL/6</GlossaryTermLink> is the most common background, offering excellent breeding performance, robust phenotypes, and extensive published data. 129 strains excel for ES cell targeting efficiency. BALB/c is preferred for immunology studies. FVB/N is ideal for transgenics and pronuclear injection. Background choice depends on your research application and phenotyping requirements.
      </>
    )
  },
  {
    category: 'Getting Started',
    question: 'Do you guarantee germline transmission?',
    answer: 'Yes. We guarantee germline transmission for all custom mouse models. If initial founders fail to transmit, we generate additional founders at no extra cost until germline transmission is achieved. All germline founders are verified by PCR genotyping and breeding analysis before delivery.'
  },

  // Model Types (10 questions)
  {
    category: 'Model Types',
    question: 'What is the difference between knockout and knockin mice?',
    answer: (
      <>
        <GlossaryTermLink term="knockout-mouse-models">Knockout mice</GlossaryTermLink> have gene function eliminated through deletion or disruption, revealing loss of function phenotypes. <GlossaryTermLink term="knockin-mouse-models">Knockin mice</GlossaryTermLink> have new DNA sequences inserted at specific loci, enabling gain of function studies, reporter expression, or humanization. Knockouts study what happens when a gene is removed; knockins study what happens when something is added.
      </>
    )
  },
  {
    category: 'Model Types',
    question: 'When should I use conditional knockout instead of conventional knockout?',
    answer: (
      <>
        Use <GlossaryTermLink term="conditional-knockout-mouse-models">conditional knockout</GlossaryTermLink> when: (1) conventional knockout causes embryonic lethality, (2) you need tissue-specific gene deletion, (3) you want temporal control over deletion timing, or (4) you need to study adult-onset disease without developmental confounds. Conditional models use <GlossaryTermLink term="cre-lox-system">Cre-lox system</GlossaryTermLink> to delete genes only in specific cells or at specific times.
      </>
    )
  },
  {
    category: 'Model Types',
    question: 'What are reporter knockin mice used for?',
    answer: (
      <>
        <GlossaryTermLink term="reporter-knockin">Reporter knockin mice</GlossaryTermLink> express fluorescent proteins (GFP, tdTomato, mCherry) or enzymatic reporters (LacZ, luciferase) under endogenous gene control. They enable: cell lineage tracing, live imaging of gene expression, isolation of specific cell populations by FACS, and visualization of tissue-specific expression patterns. Reporters reveal where and when genes are naturally expressed.
      </>
    )
  },
  {
    category: 'Model Types',
    question: 'What is a floxed mouse?',
    answer: (
      <>
        A <GlossaryTermLink term="floxed-gene-loxp-site">floxed mouse</GlossaryTermLink> has LoxP sites flanking a critical gene region (exon). By itself, the floxed allele is functional and shows no phenotype. When bred with Cre recombinase expressing mice, Cre deletes the floxed region, creating a knockout. This two-component system enables tissue-specific or inducible gene deletion depending on which Cre driver is used.
      </>
    )
  },
  {
    category: 'Model Types',
    question: 'Can I create point mutations to model human disease variants?',
    answer: 'Yes. Point mutation mice introduce single nucleotide changes, small insertions, or deletions to model human disease-associated variants. This approach preserves gene expression levels while altering protein function, making it ideal for studying dominant mutations, gain of function variants, or drug resistance mutations found in human patients.'
  },
  {
    category: 'Model Types',
    question: 'What are humanized mouse models?',
    answer: (
      <>
        <GlossaryTermLink term="humanized-mouse-models">Humanized mice</GlossaryTermLink> have mouse gene sequences replaced with human orthologs, enabling testing of human-specific therapeutics. Common targets include immune checkpoints (PD-1, PD-L1, CTLA-4), cytokines, antibody targets, and drug metabolism genes. Humanization is critical for antibody therapeutic testing, as human antibodies often do not recognize mouse proteins.
      </>
    )
  },
  {
    category: 'Model Types',
    question: 'What is the difference between knockin and transgenic mice?',
    answer: 'Knockin mice have DNA inserted at a specific genomic location through homologous recombination, ensuring single-copy integration at a defined locus. Transgenic mice have DNA randomly integrated, often in multiple copies at unknown locations. Knockins provide controlled expression from endogenous regulatory elements; transgenics may show variable or ectopic expression.'
  },
  {
    category: 'Model Types',
    question: 'Can I combine multiple modifications in one mouse?',
    answer: 'Yes. We can generate mice with multiple knockouts, combined knockout plus knockin, or multiple knockins at different loci. Complex models are typically built by breeding separate single-modification lines together rather than targeting multiple loci simultaneously. Our breeding scheme architects help plan optimal breeding strategies for multi-allele models.'
  },
  {
    category: 'Model Types',
    question: 'What are tag knockin mice used for?',
    answer: 'Tag knockin mice have epitope tags (FLAG, HA, V5, Myc) or affinity purification tags fused to endogenous proteins. This enables: protein localization by immunostaining, co-immunoprecipitation for interaction studies, ChIP-seq for DNA binding analysis, and biochemical purification at physiological expression levels. Tags reveal native protein behavior without overexpression artifacts.'
  },
  {
    category: 'Model Types',
    question: 'What is a safe harbor locus and when should I use it?',
    answer: (
      <>
        <GlossaryTermLink term="rosa26">ROSA26</GlossaryTermLink>, H11, and Hprt are safe harbor loci that permit transgene insertion without disrupting endogenous gene function. Use safe harbors for: ubiquitous reporter expression, inducible transgene systems, Cre recombinase expression, or any application requiring predictable, position-independent expression. ROSA26 is the most commonly used safe harbor for these purposes.
      </>
    )
  },

  // Technology (8 questions)
  {
    category: 'Technology',
    question: 'How does the Cre-lox system work?',
    answer: (
      <>
        <GlossaryTermLink term="cre-lox-system">Cre-lox system</GlossaryTermLink> uses Cre recombinase enzyme to delete DNA between LoxP sites. When Cre is expressed in specific tissues (using tissue-specific promoters), it deletes the floxed region only in those cells. This enables tissue-specific gene knockout. Inducible Cre systems (tamoxifen-inducible) add temporal control, allowing deletion at specific developmental stages or experimental timepoints.
      </>
    )
  },
  {
    category: 'Technology',
    question: 'What is the difference between Cre-lox and Flp-FRT systems?',
    answer: 'Cre-lox uses Cre recombinase and LoxP sites. Flp-FRT uses Flp recombinase and FRT sites. Both enable conditional deletion, but use different recombination sites. Flp-FRT is often used to remove selection cassettes during targeting, while Cre-lox is typically used for experimental gene deletion. The two systems can be combined for sequential deletions or complex allele manipulation.'
  },
  {
    category: 'Technology',
    question: 'How do I choose the right Cre driver line?',
    answer: 'Cre driver selection depends on target tissue and timing requirements. For constitutive tissue-specific deletion, choose drivers with well-characterized expression patterns (Alb-Cre for liver, Nestin-Cre for neural). For inducible deletion, use tamoxifen-inducible CreERT2 drivers. Verify Cre expression pattern matches your target using reporter crosses before experimental use. Check for known Cre-associated phenotypes in your chosen driver line.'
  },
  {
    category: 'Technology',
    question: 'What is germline transmission and why does it matter?',
    answer: 'Germline transmission occurs when targeted ES cells contribute to germ cells (sperm/eggs) in chimeric founders, passing the mutation to offspring. Only germline-transmitted alleles can establish stable mouse lines. We verify germline transmission by breeding chimeras and genotyping offspring. All delivered founders are guaranteed to show germline transmission.'
  },
  {
    category: 'Technology',
    question: 'What is the critical exon and how is it selected?',
    answer: 'Critical exon is the exon whose deletion causes frameshift or removes essential protein domains, ensuring complete loss of function. Selection considers: reading frame disruption potential, proximity to translation start, domain disruption, and isoform analysis. We analyze all isoforms to ensure chosen exon deletion eliminates function in all transcript variants.'
  },
  {
    category: 'Technology',
    question: 'Can inducible systems control gene expression timing?',
    answer: (
      <>
        Yes. <GlossaryTermLink term="tamoxifen-inducible-cre">Tamoxifen-inducible Cre</GlossaryTermLink> (CreERT2) enables temporal control over gene deletion. Cre remains inactive until tamoxifen administration activates it, allowing deletion at any chosen timepoint. This is essential for studying adult-onset disease, avoiding developmental lethality, or comparing effects of early versus late gene deletion.
      </>
    )
  },
  {
    category: 'Technology',
    question: 'What QC steps ensure model quality?',
    answer: 'Quality control includes: targeting vector sequence verification, Southern blot confirmation of correct integration, PCR genotyping of founders, germline transmission verification through breeding, karyotype analysis to ensure normal chromosomes, and expression analysis to confirm expected mRNA/protein changes. All QC data is provided with delivered animals.'
  },
  {
    category: 'Technology',
    question: 'What is the difference between ES cell targeting and CRISPR?',
    answer: 'ES cell targeting uses homologous recombination in embryonic stem cells, offering precise control over complex modifications (conditional alleles, large insertions). CRISPR uses genome editing in zygotes, offering faster timelines but less control over insertion sites. We primarily use ES cell targeting for conditional alleles and complex modifications requiring precise allele structure.'
  },

  // Strain Backgrounds (6 questions)
  {
    category: 'Strain Backgrounds',
    question: 'What is the difference between C57BL/6J and C57BL/6N?',
    answer: (
      <>
        C57BL/6J (Jackson Laboratory) and C57BL/6N (NIH/Taconic) are C57BL/6 substrains with minor genetic differences from decades of separate breeding. C57BL/6N is commonly used for ES cell targeting. C57BL/6J is preferred for behavioral and metabolic studies. Differences include: Nnt deletion in C57BL/6J affecting metabolism, Crb1 mutation in C57BL/6N affecting retina. See our <GlossaryTermLink term="c57bl6j-vs-c57bl6n">C57BL/6J vs C57BL/6N comparison</GlossaryTermLink> for details.
      </>
    )
  },
  {
    category: 'Strain Backgrounds',
    question: 'Why is C57BL/6 the most common strain?',
    answer: 'C57BL/6 dominates because of: extensive phenotypic characterization, complete genome sequencing, robust breeding performance, consistent behavioral phenotypes, and the majority of published mouse studies use this background. Using C57BL/6 enables direct comparison with existing literature and publicly available resource strains.'
  },
  {
    category: 'Strain Backgrounds',
    question: 'What is backcrossing and when is it needed?',
    answer: 'Backcrossing breeds targeted mice to a desired background strain repeatedly to eliminate unwanted genetic contributions from ES cell strain (typically 129). Each generation removes approximately 50% of residual 129 DNA. N5 backcross (5 generations) achieves ~97% background purity. N10 achieves >99.9%. Backcrossing is essential when strain background affects phenotype or when comparing to literature using pure backgrounds.'
  },
  {
    category: 'Strain Backgrounds',
    question: 'Can I use BALB/c or other backgrounds?',
    answer: 'Yes. While C57BL/6 is most common, we can generate models on BALB/c (immunology studies), FVB/N (transgenics, imaging), 129 (cancer studies), or other backgrounds. Background choice depends on application-specific requirements. We can also backcross existing models from one background to another through speed backcrossing programs.'
  },
  {
    category: 'Strain Backgrounds',
    question: 'Does strain background affect phenotype?',
    answer: 'Absolutely. Genetic background profoundly affects phenotype penetrance, disease susceptibility, and therapeutic response. The same mutation on different backgrounds can show dramatically different phenotypes. This is why background control and proper backcrossing are critical for reproducible research. Always use littermate controls from the same background.'
  },
  {
    category: 'Strain Backgrounds',
    question: 'What are speed congenic methods?',
    answer: 'Speed congenic uses marker-assisted selection to accelerate backcrossing from 10+ generations to 5 to 6 generations while achieving equivalent background purity. We genotype SNP markers across the genome and select breeders with maximum background recovery each generation, dramatically reducing time and cost to achieve pure background strains.'
  },

  // Services (7 questions)
  {
    category: 'Services',
    question: 'Do you provide breeding services?',
    answer: 'Yes. Services include: speed expansion breeding to rapidly generate experimental cohorts, maintenance breeding to preserve colonies, breeding scheme design for complex genetics, and full colony management. Our breeding facilities maintain strict pathogen-free conditions and detailed genealogy tracking for all animals.'
  },
  {
    category: 'Services',
    question: 'Can you cryopreserve my mouse line?',
    answer: 'Yes. We offer sperm cryopreservation and embryo cryopreservation for colony backup and long-term storage. Cryopreservation protects against colony loss from disease, genetic drift, or facility disruption. Frozen samples can be recovered years later through IVF or embryo transfer to re-establish lines when needed.'
  },
  {
    category: 'Services',
    question: 'What is rederivation and when is it needed?',
    answer: 'Rederivation cleans mouse lines of pathogens through embryo transfer or cesarean derivation into pathogen-free environments. It is needed when: importing mice from external facilities, eliminating specific pathogens from colonies, or upgrading health status. All rederived animals undergo extensive health monitoring before facility integration.'
  },
  {
    category: 'Services',
    question: 'Do you offer genotyping services?',
    answer: 'Yes. We provide PCR genotyping, Southern blot analysis, and copy number determination for all standard and custom alleles. Routine genotyping uses tail or ear DNA. We provide primers, protocols, and positive control DNA to enable in-house genotyping, or can perform genotyping as an ongoing service.'
  },
  {
    category: 'Services',
    question: 'Can you help with breeding scheme design?',
    answer: 'Absolutely. Our Breeding Scheme Architect service designs optimal breeding strategies for: creating double or triple mutants, maintaining compound heterozygotes, minimizing generations to experimental genotypes, and preserving rare allele combinations. We calculate expected genotype frequencies and provide detailed breeding protocols.'
  },
  {
    category: 'Services',
    question: 'Do you provide animals for immediate use or just founders?',
    answer: 'Both. We can deliver: germline-verified founders (F1 generation), expanded cohorts of specific genotypes, age-matched experimental cohorts, or ongoing colony management with regular shipments. Many researchers prefer receiving expanded cohorts ready for experiments rather than breeding founders themselves.'
  },
  {
    category: 'Services',
    question: 'Can I order catalog models for immediate delivery?',
    answer: 'Yes. Our catalog models are maintained as live colonies and available for rapid delivery. Most catalog strains ship within 2 to 4 weeks. Catalog includes: humanized immune checkpoint mice (PD-1, PD-L1, CTLA-4), reporter lines, and disease models. Browse our complete catalog online.'
  },

  // Quality & Support (6 questions)
  {
    category: 'Quality & Support',
    question: 'What characterization do you provide with delivered mice?',
    answer: 'All mice include: complete genotyping data, germline transmission verification, targeting strategy documentation, breeding genealogy, health certificates, and recommended breeding schemes. For knockouts, we can provide RT-PCR or Western blot confirming reduced/absent expression. Custom characterization packages available upon request.'
  },
  {
    category: 'Quality & Support',
    question: 'What if my mice do not show the expected phenotype?',
    answer: 'We guarantee proper genetic modification and germline transmission, verified by molecular analysis. Phenotype expression depends on many factors including background strain, husbandry conditions, age, and environmental variables. Our team provides consultation on troubleshooting phenotype expression, background effects, and experimental design optimization.'
  },
  {
    category: 'Quality & Support',
    question: 'Do you provide ongoing support after delivery?',
    answer: 'Yes. All projects include lifetime technical support for: breeding questions, genotyping troubleshooting, primer design, background strain considerations, and experimental design consultation. Our scientific team has decades of mouse genetics expertise and is available to help optimize your research outcomes.'
  },
  {
    category: 'Quality & Support',
    question: 'How do you ensure germline stability?',
    answer: 'Germline stability is ensured through: targeted integration site selection in stable genomic regions, avoiding repetitive sequences, karyotype verification, multi-generation breeding confirmation, and analysis of germline transmission rates. We only deliver founders with verified stable germline transmission across multiple litters.'
  },
  {
    category: 'Quality & Support',
    question: 'What publications support your technology?',
    answer: 'Our models appear in over 800 peer-reviewed publications across all major journals. Publications span oncology, neuroscience, immunology, metabolism, cardiovascular disease, and rare disease research. Browse our publications database organized by disease area, model type, and year to find relevant examples for your research area.'
  },
  {
    category: 'Quality & Support',
    question: 'Can I visit your facility?',
    answer: 'Yes. We welcome facility tours for potential and current clients. Tours showcase our ES cell culture facility, microinjection suite, breeding facility, and quality control laboratory. Virtual tours and consultations are also available. Contact us to schedule a visit or virtual meeting with our scientific team.'
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'All'>('All');

  const categories: Array<FAQCategory | 'All'> = [
    'All',
    'Getting Started',
    'Model Types',
    'Technology',
    'Strain Backgrounds',
    'Services',
    'Quality & Support',
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = allFAQs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group FAQs by category for display
  const groupedFAQs = useMemo(() => {
    const groups: Record<FAQCategory, FAQ[]> = {
      'Getting Started': [],
      'Model Types': [],
      'Technology': [],
      'Strain Backgrounds': [],
      'Services': [],
      'Quality & Support': [],
    };

    filteredFAQs.forEach(faq => {
      groups[faq.category].push(faq);
    });

    return groups;
  }, [filteredFAQs]);

  return (
    <div>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section 
        className="flex flex-col justify-center items-center"
        style={{ 
          backgroundColor: BRAND.navy, 
          padding: '100px 20px 80px',
          minHeight: '400px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            color: BRAND.white,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '3.5rem',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '25px',
            letterSpacing: '-1px',
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.2rem',
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto 50px',
            fontFamily: 'var(--system-ui)',
          }}>
            Everything you need to know about custom mouse models, gene targeting technology, and our services
          </p>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              <IconSearch size={24} color="#999" />
            </div>
            <input
              type="text"
              placeholder="Search all questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 20px 18px 60px',
                fontSize: '1.05rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontFamily: 'var(--system-ui)',
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: BRAND.text,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = BRAND.teal;
                e.target.style.boxShadow = '0 6px 16px rgba(0, 128, 128, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ backgroundColor: BRAND.lightGray, padding: '30px 20px', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '10px 20px',
                  fontSize: '.9rem',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === category ? BRAND.teal : BRAND.white,
                  color: selectedCategory === category ? BRAND.white : BRAND.text,
                  transition: 'all 0.2s ease',
                }}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Results Count */}
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#666',
            fontSize: '.9rem',
          }}>
            Showing {filteredFAQs.length} of {allFAQs.length} questions
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{ backgroundColor: BRAND.white, padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {selectedCategory === 'All' ? (
            // Show all categories
            categories.slice(1).map((category) => {
              const categoryFAQs = groupedFAQs[category as FAQCategory];
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={category} style={{ marginBottom: '50px' }}>
              <h2 style={{
                color: BRAND.blue,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '25px',
                paddingBottom: '10px',
                borderBottom: `2px solid ${BRAND.teal}`,
              }}>
                {category}
              </h2>
              <UXUIDCAnimatedFAQ faqs={categoryFAQs} showViewAllLink={false} />
                </div>
              );
            })
          ) : (
            // Show selected category only
            <div>
              <h2 style={{
                color: BRAND.blue,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '25px',
                paddingBottom: '10px',
                borderBottom: `2px solid ${BRAND.teal}`,
              }}              >
                {selectedCategory}
              </h2>
              {filteredFAQs.length > 0 ? (
                <UXUIDCAnimatedFAQ faqs={filteredFAQs} showViewAllLink={false} />
              ) : (
                <p style={{
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '1.1rem',
                  padding: '40px 20px',
                }}>
                  No questions found matching your search.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Resources Sidebar */}
      <section style={{ backgroundColor: BRAND.lightGray, padding: '50px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            color: BRAND.navy,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            Related Resources
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '30px',
          }}>
            <a href="/glossary" style={{
              backgroundColor: BRAND.white,
              padding: '20px',
              borderRadius: '4px',
              textDecoration: 'none',
              border: '1px solid #e0e0e0',
              transition: 'transform 0.2s ease',
            }}>
              <h3 style={{
                color: BRAND.teal,
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '10px',
              }}>
                Mouse Genetics Glossary
              </h3>
              <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.5' }}>
                60+ terms with detailed definitions, examples, and cross-references
              </p>
            </a>

            <a href="/resources" style={{
              backgroundColor: BRAND.white,
              padding: '20px',
              borderRadius: '4px',
              textDecoration: 'none',
              border: '1px solid #e0e0e0',
              transition: 'transform 0.2s ease',
            }}>
              <h3 style={{
                color: BRAND.teal,
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '10px',
              }}>
                Strategy Guides
              </h3>
              <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.5' }}>
                Step by step guides for knockout strategy, Cre line selection, and more
              </p>
            </a>

            <a href="/publications" style={{
              backgroundColor: BRAND.white,
              padding: '20px',
              borderRadius: '4px',
              textDecoration: 'none',
              border: '1px solid #e0e0e0',
              transition: 'transform 0.2s ease',
            }}>
              <h3 style={{
                color: BRAND.teal,
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '10px',
              }}>
                Publications Database
              </h3>
              <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.5' }}>
                800+ peer reviewed publications using our models
              </p>
            </a>

            <a href="/contact" style={{
              backgroundColor: BRAND.white,
              padding: '20px',
              borderRadius: '4px',
              textDecoration: 'none',
              border: '1px solid #e0e0e0',
              transition: 'transform 0.2s ease',
            }}>
              <h3 style={{
                color: BRAND.teal,
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '10px',
              }}>
                Contact Our Team
              </h3>
              <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.5' }}>
                Speak with a scientist about your specific research needs
              </p>
            </a>
          </div>
        </div>
      </section>

        {/* CTA */}
        <UXUIDCStartProjectCTA />
      </main>

      <UXUIDCFooter />
      <UXUIDCCookieConsent />

      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFAQs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: typeof faq.answer === 'string' ? faq.answer : faq.question,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
