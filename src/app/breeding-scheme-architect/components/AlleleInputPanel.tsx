'use client';

/**
 * Allele Input Panel - Add and manage starting alleles
 */

import { useState } from 'react';
import {
  Allele,
  AlleleType,
  StartingGenotype,
  ALLELE_TYPE_LABELS,
  GENOTYPE_LABELS,
} from './lib/types';
import { IconPlus, IconX } from '@/components/UXUIDC/Icons';

interface AlleleInputPanelProps {
  alleles: Allele[];
  onAllelesChange: (alleles: Allele[]) => void;
}

const ALLELE_TYPES: AlleleType[] = [
  'conventional-knockout',
  'conditional-knockout',
  'cre-constitutive',
  'cre-inducible',
  'reporter-fluorescent',
  'reporter-lacz',
  'knockin-point-mutation',
  'knockin-cdna',
  'humanized',
];

const STARTING_GENOTYPES: StartingGenotype[] = [
  'homozygous',
  'heterozygous',
  'hemizygous',
];

export default function AlleleInputPanel({
  alleles,
  onAllelesChange,
}: AlleleInputPanelProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newAllele, setNewAllele] = useState<Partial<Allele>>({
    geneName: '',
    alleleType: 'conditional-knockout',
    startingGenotype: 'heterozygous',
    chromosome: '',
  });

  const handleAddAllele = () => {
    if (!newAllele.geneName?.trim()) return;

    const allele: Allele = {
      id: `allele-${Date.now()}`,
      geneName: newAllele.geneName.trim(),
      alleleType: newAllele.alleleType as AlleleType,
      startingGenotype: newAllele.startingGenotype as StartingGenotype,
      chromosome: newAllele.chromosome?.trim() || undefined,
    };

    onAllelesChange([...alleles, allele]);
    setNewAllele({
      geneName: '',
      alleleType: 'conditional-knockout',
      startingGenotype: 'heterozygous',
      chromosome: '',
    });
    setIsAdding(false);
  };

  const handleRemoveAllele = (id: string) => {
    onAllelesChange(alleles.filter((a) => a.id !== id));
  };

  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        border: '.5px solid #e0e0e0',
        borderTop: '4px solid #008080',
        padding: '25px',
        marginBottom: '20px',
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            color: '#333',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 600,
            margin: 0,
          }}
        >
          Your Starting Alleles
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#008080',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--system-ui)',
              fontSize: '.85rem',
              fontWeight: 500,
              transition: 'all 0.3s',
            }}
            className="hover:-translate-y-1 hover:shadow-md"
          >
            <IconPlus size={16} color="white" />
            Add Allele
          </button>
        )}
      </div>

      {/* Existing Alleles */}
      {alleles.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '15px',
            marginBottom: isAdding ? '20px' : '0',
          }}
        >
          {alleles.map((allele) => (
            <div
              key={allele.id}
              style={{
                backgroundColor: 'white',
                border: '.5px solid #e0e0e0',
                padding: '15px',
                position: 'relative',
              }}
            >
              <button
                onClick={() => handleRemoveAllele(allele.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  opacity: 0.6,
                  transition: 'opacity 0.3s',
                }}
                className="hover:opacity-100"
                aria-label="Remove allele"
              >
                <IconX size={16} color="#666" />
              </button>

              <div
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#008080',
                  marginBottom: '8px',
                }}
              >
                {allele.geneName}
              </div>

              <div
                style={{
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  color: '#666',
                  lineHeight: '1.5',
                }}
              >
                <div>{ALLELE_TYPE_LABELS[allele.alleleType]}</div>
                <div>{GENOTYPE_LABELS[allele.startingGenotype]}</div>
                {allele.chromosome && (
                  <div style={{ color: '#999' }}>{allele.chromosome}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {alleles.length === 0 && !isAdding && (
        <div
          style={{
            textAlign: 'center',
            padding: '30px',
            color: '#999',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
          }}
        >
          No alleles added yet. Click &quot;Add Allele&quot; to start building your
          breeding scheme.
        </div>
      )}

      {/* Add Allele Form */}
      {isAdding && (
        <div
          style={{
            backgroundColor: 'white',
            border: '2px solid #008080',
            padding: '20px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '15px',
            }}
          >
            {/* Gene Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '6px',
                }}
              >
                Gene Name *
              </label>
              <input
                type="text"
                value={newAllele.geneName}
                onChange={(e) =>
                  setNewAllele({ ...newAllele, geneName: e.target.value })
                }
                placeholder="e.g., Gpr84, Brca1"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
              />
            </div>

            {/* Allele Type */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '6px',
                }}
              >
                Allele Type *
              </label>
              <select
                value={newAllele.alleleType}
                onChange={(e) =>
                  setNewAllele({
                    ...newAllele,
                    alleleType: e.target.value as AlleleType,
                  })
                }
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                {ALLELE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {ALLELE_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </div>

            {/* Starting Genotype */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '6px',
                }}
              >
                Starting Genotype *
              </label>
              <select
                value={newAllele.startingGenotype}
                onChange={(e) =>
                  setNewAllele({
                    ...newAllele,
                    startingGenotype: e.target.value as StartingGenotype,
                  })
                }
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                {STARTING_GENOTYPES.map((gt) => (
                  <option key={gt} value={gt}>
                    {GENOTYPE_LABELS[gt]}
                  </option>
                ))}
              </select>
            </div>

            {/* Chromosome (optional) */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '6px',
                }}
              >
                Chromosome <span style={{ color: '#999' }}>(optional)</span>
              </label>
              <input
                type="text"
                value={newAllele.chromosome}
                onChange={(e) =>
                  setNewAllele({ ...newAllele, chromosome: e.target.value })
                }
                placeholder="e.g., Chr 11"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setIsAdding(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: '#666',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                fontWeight: 500,
                transition: 'all 0.3s',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddAllele}
              disabled={!newAllele.geneName?.trim()}
              style={{
                padding: '10px 20px',
                backgroundColor: newAllele.geneName?.trim() ? '#008080' : '#ccc',
                color: 'white',
                border: 'none',
                cursor: newAllele.geneName?.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                fontWeight: 500,
                transition: 'all 0.3s',
              }}
            >
              Add Allele
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
