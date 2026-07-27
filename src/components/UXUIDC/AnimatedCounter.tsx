'use client';

/**
 * |UXUIDC| Animated Counter Component  
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 * Displays stats with CSS fade-in animation
 * Used for stats like "2,800+ Models Generated", "800+ Publications"
 *
 * Supports two usage patterns:
 * 1. Array mode: <UXUIDCAnimatedCounter stats={[{ number: "2,800+", label: "Model Generation Projects" }]} />
 * 2. Single value mode: <UXUIDCAnimatedCounter end={2800} suffix="+" />
 */

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Stat {
  number: string; // e.g., "2,800+", "800+", "25+"
  label: string;
}

interface AnimatedCounterPropsArray {
  stats: Stat[];
  className?: string;
  end?: never;
  suffix?: never;
}

interface AnimatedCounterPropsSingle {
  end: number;
  suffix?: string;
  stats?: never;
  className?: never;
}

type AnimatedCounterProps = AnimatedCounterPropsArray | AnimatedCounterPropsSingle;

// Single counter component for end/suffix usage
function SingleCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  // Format number with commas
  const formatted = end >= 1000 ? end.toLocaleString() : end.toString();
  const displayValue = formatted + suffix;

  return (
    <span className="animate-initial animate-fade-in">
      {displayValue}
    </span>
  );
}

// Full stats grid component
function StatsGrid({ stats, className = '' }: { stats: Stat[]; className?: string }) {
  // Create refs for each stat
  const statRefs = stats.map(() => useScrollAnimation<HTMLDivElement>(0.1));

  return (
    <div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {stats.map((stat, i) => (
        <div 
          key={i}
          ref={statRefs[i]}
          className={`stat-item text-center animate-initial animate-fade-in-up animate-delay-${Math.min(i * 100 + 100, 400)}`}
        >
          <div
            style={{
              color: '#008080',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {stat.number}
          </div>
          <div
            style={{
              color: '#666',
              fontFamily: 'var(--system-ui)',
              fontSize: '.85rem',
              fontWeight: 400,
              marginTop: '5px',
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function UXUIDCAnimatedCounter(props: AnimatedCounterProps) {
  // Single value mode
  if ('end' in props && props.end !== undefined) {
    return <SingleCounter end={props.end} suffix={props.suffix} />;
  }
  
  // Array mode
  if ('stats' in props && props.stats) {
    return <StatsGrid stats={props.stats} className={props.className} />;
  }

  return null;
}

export default UXUIDCAnimatedCounter;
