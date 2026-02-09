'use client';

/**
 * Statistics Panel - Display estimated breeding resources
 */

import { BreedingPlan } from './lib/types';
import { formatProbability } from './lib/breedingCalculations';
import { IconCalendar, IconMouse, IconUsers, IconBarChart, IconClock } from '@/components/UXUIDC/Icons';

interface StatisticsPanelProps {
  plan: BreedingPlan;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

function StatCard({ icon, label, value, color = '#008080' }: StatCardProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '.5px solid #e0e0e0',
        padding: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: '#0a253c',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: color,
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontFamily: 'var(--system-ui)',
            fontSize: '.85rem',
            color: '#666',
            marginTop: '4px',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function StatisticsPanel({ plan }: StatisticsPanelProps) {
  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        border: '.5px solid #e0e0e0',
        borderTop: '4px solid #008080',
        padding: '25px',
        marginTop: '30px',
      }}
    >
      <h3
        style={{
          color: '#333',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 600,
          margin: 0,
          marginBottom: '20px',
        }}
      >
        Estimated Resources
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '15px',
          marginBottom: '20px',
        }}
      >
        <StatCard
          icon={<IconCalendar size={24} color="white" />}
          label="Generations to target genotype"
          value={plan.totalGenerations}
        />
        <StatCard
          icon={<IconUsers size={24} color="white" />}
          label="Estimated breeding pairs needed"
          value={plan.estimatedBreedingPairs}
          color="#134978"
        />
        <StatCard
          icon={<IconMouse size={24} color="white" />}
          label="Estimated total mice generated"
          value={plan.estimatedTotalMice}
        />
        <StatCard
          icon={<IconClock size={24} color="white" />}
          label="Estimated timeline (weeks)"
          value={plan.estimatedWeeks}
          color="#134978"
        />
        <StatCard
          icon={<IconBarChart size={24} color="white" />}
          label="Target genotype frequency"
          value={formatProbability(plan.targetGenotypeFrequency)}
        />
      </div>

      {/* Warnings */}
      {plan.warnings.length > 0 && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            padding: '15px 20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.9rem',
              fontWeight: 600,
              color: '#856404',
              marginBottom: '8px',
            }}
          >
            Warnings
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.85rem',
              color: '#856404',
              lineHeight: '1.6',
            }}
          >
            {plan.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Educational Information */}
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          padding: '15px',
          marginBottom: '15px',
        }}
      >
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '.9rem',
            fontWeight: 600,
            color: '#008080',
            marginBottom: '8px',
          }}
        >
          📚 Understanding the Calculations
        </div>
        <div
          style={{
            fontFamily: 'var(--system-ui)',
            fontSize: '.85rem',
            color: '#666',
            lineHeight: '1.7',
          }}
        >
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Timeline:</strong> Each generation takes approximately 9 weeks: 3 weeks gestation + 3 weeks weaning + 3 weeks to breeding age.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Breeding Efficiency:</strong> We plan for 80% breeding success (not all pairs produce litters). We use the lower end of litter size (6 pups) for conservative planning, then average (7 pups) for total estimates.
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>Why More Breeders?</strong> To account for Mendelian ratios, sex requirements, and breeding efficiency, we need more breeding pairs than your target number. This ensures you get enough mice of the correct genotype.
          </p>
        </div>
      </div>

      {/* Best Practices for PIs */}
      {plan.totalGenerations >= 3 && (
        <div
          style={{
            backgroundColor: '#e8f4f8',
            border: '1px solid #008080',
            padding: '15px',
            marginBottom: '15px',
          }}
        >
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.9rem',
              fontWeight: 600,
              color: '#008080',
              marginBottom: '8px',
            }}
          >
            💡 Best Practices for Multi-Generation Breeding
          </div>
          <div
            style={{
              fontFamily: 'var(--system-ui)',
              fontSize: '.85rem',
              color: '#333',
              lineHeight: '1.7',
            }}
          >
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Key Principle:</strong> Always cross Cre-positive mice back to "clean" (Cre-negative) genotypes. Never cross Cre+ × Cre+ for conditional knockout experiments.
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Intermediate Generations:</strong> Keep homozygous floxed mice from Generation 1 for use in Generation 3. These serve as your "clean" breeding stock.
            </p>
            <p style={{ margin: '0 0 0 0' }}>
              <strong>Cost Saving Tip:</strong> Consider purchasing homozygous floxed mice from commercial vendors to skip Generation 1 and reduce breeding time from 27 to 18 weeks.
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div
        style={{
          fontFamily: 'var(--system-ui)',
          fontSize: '.8rem',
          color: '#999',
          lineHeight: '1.5',
          fontStyle: 'italic',
        }}
      >
        Estimates are based on standard C57BL/6 breeding parameters (average litter
        size 6 to 8 pups, 80% breeding efficiency). Actual results may vary based on
        strain background, allele effects on fertility, and environmental factors.
      </div>
    </div>
  );
}
