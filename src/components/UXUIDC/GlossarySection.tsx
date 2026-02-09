'use client';

import Link from 'next/link';
import { IconChevronRight, IconLayers } from './Icons';

interface GlossaryTerm {
  term: string;
  definition: string;
}

interface GlossarySectionProps {
  title?: string;
  description?: string;
  terms: GlossaryTerm[];
  columns?: 1 | 2;
  showViewAll?: boolean;
}

/**
 * GlossarySection Component
 * 
 * A reusable component for adding inline glossary definitions to technical pages.
 * Helps with SEO by providing rich content with relevant terminology.
 * 
 * Usage:
 * <GlossarySection
 *   terms={[
 *     { term: "Conditional Knockout", definition: "A gene targeting strategy..." },
 *     { term: "Cre Recombinase", definition: "A site-specific recombinase enzyme..." }
 *   ]}
 * />
 */
export function UXUIDCGlossarySection({
  title = "Key Terms",
  description,
  terms,
  columns = 2,
  showViewAll = true
}: GlossarySectionProps) {
  return (
    <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: '16px' 
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(0,128,128,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IconLayers size={20} color="#008080" />
          </div>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#2384da',
            margin: 0
          }}>
            {title}
          </h2>
        </div>

        {description && (
          <p style={{
            fontSize: '.9rem',
            color: '#666',
            marginBottom: '30px',
            lineHeight: 1.6,
            maxWidth: '800px'
          }}>
            {description}
          </p>
        )}

        {/* Terms Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: columns === 2 ? 'repeat(2, 1fr)' : '1fr', 
          gap: '20px' 
        }}>
          {terms.map((item, index) => (
            <div 
              key={index} 
              style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                borderLeft: '4px solid #008080'
              }}
            >
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#333',
                marginBottom: '10px'
              }}>
                {item.term}
              </h3>
              <p style={{
                fontSize: '.9rem',
                color: '#666',
                lineHeight: 1.6,
                margin: 0
              }}>
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        {/* View All Link */}
        {showViewAll && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link 
              href="/glossary" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '.9rem',
                fontWeight: 600,
                color: '#008080',
                textDecoration: 'none'
              }}
            >
              View Complete Glossary
              <IconChevronRight size={16} color="#008080" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Pre-defined term collections for common page types
export const knockoutTerms: GlossaryTerm[] = [
  {
    term: "Knockout",
    definition: "A gene targeting strategy that inactivates a gene by deleting critical sequences, disrupting the reading frame, or inserting stop sequences."
  },
  {
    term: "Null Allele",
    definition: "An allele that produces no functional gene product, created by deleting critical exons or introducing premature stop codons."
  },
  {
    term: "Homologous Recombination",
    definition: "A precise DNA repair mechanism where a sequence is exchanged between two similar DNA molecules. Used to insert modifications at specific genomic locations."
  },
  {
    term: "ES Cells",
    definition: "Embryonic stem cells that can contribute to all tissues including the germline when injected into host blastocysts."
  }
];

export const conditionalTerms: GlossaryTerm[] = [
  {
    term: "Conditional Knockout",
    definition: "A gene targeting strategy where gene inactivation is controlled by a recombinase system, allowing tissue-specific or temporally-controlled gene deletion."
  },
  {
    term: "Floxed Allele",
    definition: "A gene with LoxP sites flanking a critical region. The allele functions normally until Cre recombinase excises the flanked region."
  },
  {
    term: "Cre Recombinase",
    definition: "A site-specific recombinase enzyme that catalyzes recombination between LoxP sites, used in conditional knockout systems."
  },
  {
    term: "LoxP Site",
    definition: "A 34 base pair DNA sequence recognized by Cre recombinase. Two LoxP sites in the same orientation enable excision of the flanked sequence."
  }
];

export const knockinTerms: GlossaryTerm[] = [
  {
    term: "Knockin",
    definition: "A gene targeting strategy that inserts a specific DNA sequence at a defined genomic location, such as reporter genes, point mutations, or human sequences."
  },
  {
    term: "Reporter Gene",
    definition: "A gene encoding an easily detectable protein used to visualize gene expression patterns. Common reporters include fluorescent proteins and LacZ."
  },
  {
    term: "Point Mutation",
    definition: "A change in a single nucleotide within a gene sequence. Point mutation knockin models introduce specific mutations to study disease mechanisms."
  },
  {
    term: "Safe Harbor Locus",
    definition: "A genomic location where transgene insertion does not disrupt essential gene functions and supports stable expression."
  }
];

export const humanizationTerms: GlossaryTerm[] = [
  {
    term: "Humanized Mouse",
    definition: "A mouse model where a mouse gene or genomic region has been replaced with the corresponding human sequence, enabling study of human-specific biology."
  },
  {
    term: "Gene Replacement",
    definition: "A targeting strategy that substitutes mouse genomic sequences with human equivalents to model human-specific biology or test human-targeted therapies."
  },
  {
    term: "BAC (Bacterial Artificial Chromosome)",
    definition: "A DNA construct used for cloning large DNA fragments (100-300 kb) in bacteria, used for large-scale humanization projects."
  },
  {
    term: "Chimera",
    definition: "An organism composed of cells derived from two or more different sources, used to establish germline transmission of targeted alleles."
  }
];

export const inducibleTerms: GlossaryTerm[] = [
  {
    term: "Cre-ERT2",
    definition: "A tamoxifen-inducible form of Cre recombinase fused to a modified estrogen receptor, enabling temporal control of gene deletion."
  },
  {
    term: "Tamoxifen",
    definition: "A synthetic estrogen receptor modulator used to activate Cre-ERT2 recombinase, triggering gene deletion upon administration."
  },
  {
    term: "Tet-On System",
    definition: "An inducible expression system where gene expression is activated when doxycycline is present (using rtTA)."
  },
  {
    term: "Doxycycline-Inducible System",
    definition: "A gene expression control system using the tetracycline transactivator to regulate gene expression in response to doxycycline."
  }
];

export const transgenicTerms: GlossaryTerm[] = [
  {
    term: "Transgenic Mouse",
    definition: "A mouse carrying an exogenous DNA sequence integrated into its genome, generated by pronuclear injection or targeted knockin approaches."
  },
  {
    term: "Transgene",
    definition: "An exogenous gene introduced into an organism's genome, which may integrate randomly or at specific sites."
  },
  {
    term: "Pronuclear Injection",
    definition: "A microinjection technique delivering DNA directly into the pronucleus of a fertilized egg to generate transgenic animals."
  },
  {
    term: "Rosa26 Locus",
    definition: "A genomic safe harbor locus that supports ubiquitous gene expression without disrupting essential genes."
  }
];

export default UXUIDCGlossarySection;
