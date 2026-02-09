'use client';

/**
 * Target Genotype Panel - Define experimental and control genotypes
 */

import { useEffect } from 'react';
import {
  Allele,
  AlleleState,
  TargetGenotype,
  SexRequirement,
  SEX_REQUIREMENT_LABELS,
} from './lib/types';

interface TargetGenotypePanelProps {
  alleles: Allele[];
  targetGenotypes: TargetGenotype[];
  onTargetGenotypesChange: (targets: TargetGenotype[]) => void;
}

const ALLELE_STATES: AlleleState[] = ['homozygous', 'heterozygous', 'wildtype', 'hemizygous'];

// Context-aware labels based on allele type
function getStateLabel(state: AlleleState, allele?: Allele): string {
  const isConditional = allele?.alleleType === 'conditional-knockout';
  
  switch (state) {
    case 'homozygous':
      return isConditional ? 'Homozygous (fl/fl)' : 'Homozygous (mut/mut)';
    case 'heterozygous':
      return isConditional ? 'Heterozygous (+/fl)' : 'Heterozygous (+/mut)';
    case 'wildtype':
      return 'Wild-type (+/+)';
    case 'hemizygous':
      return 'Hemizygous (Tg+)';
    default:
      return state;
  }
}

const SEX_REQUIREMENTS: SexRequirement[] = ['any', 'male', 'female', 'balanced'];

export default function TargetGenotypePanel({
  alleles,
  targetGenotypes,
  onTargetGenotypesChange,
}: TargetGenotypePanelProps) {
  // Initialize target genotypes when alleles change
  useEffect(() => {
    if (alleles.length === 0) {
      onTargetGenotypesChange([]);
      return;
    }

    // Create default experimental and control if not exists
    const experimental = targetGenotypes.find((t) => t.isExperimental);
    const control = targetGenotypes.find((t) => !t.isExperimental);

    const newTargets: TargetGenotype[] = [];

    if (!experimental) {
      const defaultAlleleStates: Record<string, AlleleState> = {};
      alleles.forEach((allele) => {
        // Default: homozygous for knockouts/conditional, hemizygous for Cre/transgenes
        if (
          allele.alleleType === 'cre-constitutive' ||
          allele.alleleType === 'cre-inducible' ||
          allele.alleleType === 'reporter-fluorescent' ||
          allele.alleleType === 'reporter-lacz'
        ) {
          defaultAlleleStates[allele.id] = 'hemizygous';
        } else {
          defaultAlleleStates[allele.id] = 'homozygous';
        }
      });

      newTargets.push({
        id: 'experimental',
        label: 'Experimental',
        isExperimental: true,
        alleleStates: defaultAlleleStates,
        numberNeeded: 10,
        sexRequirement: 'any',
      });
    } else {
      // Update existing experimental with new alleles
      const updatedStates = { ...experimental.alleleStates };
      alleles.forEach((allele) => {
        if (!updatedStates[allele.id]) {
          if (
            allele.alleleType === 'cre-constitutive' ||
            allele.alleleType === 'cre-inducible'
          ) {
            updatedStates[allele.id] = 'hemizygous';
          } else {
            updatedStates[allele.id] = 'homozygous';
          }
        }
      });
      newTargets.push({ ...experimental, alleleStates: updatedStates });
    }

    if (!control) {
      const defaultAlleleStates: Record<string, AlleleState> = {};
      alleles.forEach((allele) => {
        // Control: typically same as experimental but Cre-negative
        if (
          allele.alleleType === 'cre-constitutive' ||
          allele.alleleType === 'cre-inducible'
        ) {
          defaultAlleleStates[allele.id] = 'wildtype';
        } else if (
          allele.alleleType === 'reporter-fluorescent' ||
          allele.alleleType === 'reporter-lacz'
        ) {
          defaultAlleleStates[allele.id] = 'hemizygous';
        } else {
          defaultAlleleStates[allele.id] = 'homozygous';
        }
      });

      newTargets.push({
        id: 'control',
        label: 'Control',
        isExperimental: false,
        alleleStates: defaultAlleleStates,
        numberNeeded: 10,
        sexRequirement: 'any',
      });
    } else {
      const updatedStates = { ...control.alleleStates };
      alleles.forEach((allele) => {
        if (!updatedStates[allele.id]) {
          if (
            allele.alleleType === 'cre-constitutive' ||
            allele.alleleType === 'cre-inducible'
          ) {
            updatedStates[allele.id] = 'wildtype';
          } else {
            updatedStates[allele.id] = 'homozygous';
          }
        }
      });
      newTargets.push({ ...control, alleleStates: updatedStates });
    }

    onTargetGenotypesChange(newTargets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alleles]);

  const updateTarget = (
    targetId: string,
    updates: Partial<TargetGenotype>
  ) => {
    onTargetGenotypesChange(
      targetGenotypes.map((t) =>
        t.id === targetId ? { ...t, ...updates } : t
      )
    );
  };

  const updateAlleleState = (
    targetId: string,
    alleleId: string,
    state: AlleleState
  ) => {
    onTargetGenotypesChange(
      targetGenotypes.map((t) =>
        t.id === targetId
          ? {
              ...t,
              alleleStates: { ...t.alleleStates, [alleleId]: state },
            }
          : t
      )
    );
  };

  if (alleles.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#f7f7f7',
          border: '.5px solid #e0e0e0',
          borderTop: '4px solid #134978',
          padding: '25px',
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
            marginBottom: '15px',
          }}
        >
          Define Target Genotypes
        </h3>
        <div
          style={{
            textAlign: 'center',
            padding: '30px',
            color: '#999',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
          }}
        >
          Add alleles above to define your target genotypes.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        border: '.5px solid #e0e0e0',
        borderTop: '4px solid #134978',
        padding: '25px',
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
          marginBottom: '15px',
        }}
      >
        Define Target Genotypes
      </h3>

      {/* Educational Info */}
      <div
        style={{
          backgroundColor: '#e8f4f8',
          border: '1px solid #008080',
          padding: '12px 15px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--system-ui)',
            fontSize: '.8rem',
            color: '#333',
            lineHeight: '1.6',
          }}
        >
          <strong>💡 Genotype Notation Guide:</strong> "fl" = floxed (conditional knockout), "mut" = mutant (conventional knockout), "+" = wild-type allele, "Tg+" = transgene positive (Cre drivers, reporters)
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '20px',
        }}
      >
        {targetGenotypes.map((target) => (
          <div
            key={target.id}
            style={{
              backgroundColor: 'white',
              border: `.5px solid #e0e0e0`,
              borderLeft: `4px solid ${target.isExperimental ? '#008080' : '#134978'}`,
              padding: '20px',
            }}
          >
            {/* Target Label */}
            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: target.isExperimental ? '#008080' : '#134978',
                marginBottom: '15px',
              }}
            >
              {target.isExperimental ? 'Experimental Genotype' : 'Control Genotype'}
            </div>

            {/* Allele States */}
            <div style={{ marginBottom: '15px' }}>
              {alleles.map((allele) => (
                <div key={allele.id} style={{ marginBottom: '12px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--system-ui)',
                      fontSize: '.85rem',
                      fontWeight: 500,
                      color: '#333',
                      marginBottom: '4px',
                    }}
                  >
                    {allele.geneName}
                  </label>
                  <select
                    value={target.alleleStates[allele.id] || 'wildtype'}
                    onChange={(e) =>
                      updateAlleleState(
                        target.id,
                        allele.id,
                        e.target.value as AlleleState
                      )
                    }
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: '1px solid #e0e0e0',
                      fontFamily: 'var(--system-ui)',
                      fontSize: '.85rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    {ALLELE_STATES.map((state) => (
                      <option key={state} value={state}>
                        {getStateLabel(state, allele)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Number Needed */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '4px',
                }}
              >
                Number of Mice Needed
              </label>
              <input
                type="number"
                min="1"
                value={target.numberNeeded}
                onChange={(e) =>
                  updateTarget(target.id, {
                    numberNeeded: parseInt(e.target.value) || 1,
                  })
                }
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  border: '1px solid #e0e0e0',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                }}
              />
            </div>

            {/* Sex Requirement */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '4px',
                }}
              >
                Sex Requirement
              </label>
              <select
                value={target.sexRequirement}
                onChange={(e) =>
                  updateTarget(target.id, {
                    sexRequirement: e.target.value as SexRequirement,
                  })
                }
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  border: '1px solid #e0e0e0',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                {SEX_REQUIREMENTS.map((sex) => (
                  <option key={sex} value={sex}>
                    {SEX_REQUIREMENT_LABELS[sex]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
