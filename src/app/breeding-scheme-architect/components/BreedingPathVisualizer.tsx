'use client';

/**
 * Breeding Path Visualizer - Generation-by-generation breeding diagram
 */

import {
  BreedingPlan,
  BreedingGeneration,
} from './lib/types';
import {
  formatProbability,
  getCategoryColor,
  getCategoryLabel,
} from './lib/breedingCalculations';

interface BreedingPathVisualizerProps {
  plan: BreedingPlan;
}

function GenerationCard({ generation }: { generation: BreedingGeneration }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '.5px solid #e0e0e0',
        marginBottom: '20px',
        overflow: 'hidden',
      }}
    >
      {/* Generation Header */}
      <div
        style={{
          backgroundColor: '#0a253c',
          color: 'white',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          Generation {generation.number}
        </span>
        <span
          style={{
            fontFamily: 'var(--system-ui)',
            fontSize: '.85rem',
            opacity: 0.8,
          }}
        >
          {generation.purpose}
        </span>
      </div>

      {/* Cross Diagram */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          backgroundColor: '#f7f7f7',
          borderBottom: '.5px solid #e0e0e0',
        }}
      >
        {/* Parent A */}
        <div
          style={{
            backgroundColor: 'white',
            border: '2px solid #008080',
            padding: '12px 20px',
            textAlign: 'center',
            minWidth: '150px',
          }}
        >
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.9rem',
              fontWeight: 600,
              color: '#008080',
            }}
          >
            {generation.cross.parentALabel}
          </div>
        </div>

        {/* Cross Symbol */}
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#333',
          }}
        >
          ×
        </div>

        {/* Parent B */}
        <div
          style={{
            backgroundColor: 'white',
            border: '2px solid #134978',
            padding: '12px 20px',
            textAlign: 'center',
            minWidth: '150px',
          }}
        >
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.9rem',
              fontWeight: 600,
              color: '#134978',
            }}
          >
            {generation.cross.parentBLabel}
          </div>
        </div>
      </div>

      {/* Offspring Results */}
      <div style={{ padding: '20px' }}>
        <div
          style={{
            fontFamily: 'var(--system-ui)',
            fontSize: '.85rem',
            fontWeight: 500,
            color: '#666',
            marginBottom: '12px',
          }}
        >
          Expected Offspring:
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          {generation.offspringRatios.map((outcome, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                backgroundColor: '#f7f7f7',
                border: `.5px solid #e0e0e0`,
                borderLeft: `4px solid ${getCategoryColor(outcome.category)}`,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    color: '#333',
                  }}
                >
                  {outcome.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.75rem',
                    color: getCategoryColor(outcome.category),
                    fontWeight: 500,
                  }}
                >
                  {getCategoryLabel(outcome.category)}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  color: '#333',
                  backgroundColor: 'white',
                  padding: '4px 10px',
                  border: '.5px solid #e0e0e0',
                }}
              >
                {formatProbability(outcome.probability)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BreedingPathVisualizer({
  plan,
}: BreedingPathVisualizerProps) {
  if (plan.generations.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: '#999',
          fontFamily: 'var(--system-ui)',
          fontSize: '.9rem',
        }}
      >
        No breeding path generated. Add alleles and target genotypes above.
      </div>
    );
  }

  return (
    <div>
      <h3
        style={{
          color: '#333',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '20px',
        }}
      >
        Generation by Generation Breeding Path
      </h3>

      {/* Legend with Educational Tooltips */}
      <div
        style={{
          backgroundColor: '#f7f7f7',
          border: '1px solid #e0e0e0',
          padding: '15px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '.9rem',
            fontWeight: 600,
            color: '#333',
            marginBottom: '10px',
          }}
        >
          Offspring Categories
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          {[
            { 
              cat: 'experimental', 
              description: 'Mice with your target experimental genotype' 
            },
            { 
              cat: 'control', 
              description: 'Littermate controls without Cre or with wild-type genotype' 
            },
            { 
              cat: 'keeper', 
              description: 'Mice needed as breeders for subsequent generations' 
            },
            { 
              cat: 'cull', 
              description: 'Not needed for study or future breeding' 
            },
          ].map(({ cat, description }) => (
            <div
              key={cat}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: getCategoryColor(cat),
                  borderRadius: '2px',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.85rem',
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  {getCategoryLabel(cat)}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.75rem',
                    color: '#666',
                    lineHeight: '1.4',
                  }}
                >
                  {description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generation Cards */}
      {plan.generations.map((generation) => (
        <GenerationCard key={generation.number} generation={generation} />
      ))}
    </div>
  );
}
