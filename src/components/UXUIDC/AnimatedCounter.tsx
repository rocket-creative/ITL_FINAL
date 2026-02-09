'use client';

/**
 * |UXUIDC| Animated Counter Component
 * Counts up to the target number when scrolled into view
 * Used for stats like "2,500+ Projects", "800+ Publications"
 * 
 * Supports two usage patterns:
 * 1. Array mode: <UXUIDCAnimatedCounter stats={[{ number: "2,500+", label: "Projects" }]} />
 * 2. Single value mode: <UXUIDCAnimatedCounter end={2500} suffix="+" />
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  number: string; // e.g., "2,500+", "800+", "25+"
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
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);

        const startNum = Math.floor(end * 0.7);
        const counter = { value: startNum };

        gsap.to(counter, {
          value: end,
          duration: 2.5,
          ease: 'power1.out',
          onUpdate: () => {
            let displayVal = Math.floor(counter.value).toString();
            
            // Add comma formatting for thousands
            if (counter.value >= 1000) {
              displayVal = Math.floor(counter.value).toLocaleString();
            }
            
            setDisplayValue(displayVal + suffix);
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, suffix, hasAnimated]);

  return <span ref={containerRef}>{displayValue}</span>;
}

// Full stats grid component
function StatsGrid({ stats, className = '' }: { stats: Stat[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState<string[]>(stats.map(() => '0'));

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);

        stats.forEach((stat, index) => {
          // Parse the number from string like "2,500+" or "100%"
          const numStr = stat.number.replace(/[^0-9.]/g, '');
          const targetNum = parseFloat(numStr);
          const hasPlus = stat.number.includes('+');
          const hasPercent = stat.number.includes('%');
          const hasComma = stat.number.includes(',');

          // Start from a reasonable lower bound (about 70-80% of target)
          const startNum = Math.floor(targetNum * 0.7);
          const counter = { value: startNum };

          gsap.to(counter, {
            value: targetNum,
            duration: 3.5,
            ease: 'power1.out',
            onUpdate: () => {
              let displayVal = Math.floor(counter.value).toString();
              
              // Add comma formatting for thousands
              if (hasComma || counter.value >= 1000) {
                displayVal = Math.floor(counter.value).toLocaleString();
              }
              
              // Add suffix
              if (hasPlus) displayVal += '+';
              if (hasPercent) displayVal += '%';

              setDisplayValues(prev => {
                const newValues = [...prev];
                newValues[index] = displayVal;
                return newValues;
              });
            },
          });
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [stats, hasAnimated]);

  return (
    <div 
      ref={containerRef}
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}
    >
      {stats.map((stat, i) => (
        <div key={i} className="stat-item text-center">
          <div
            style={{
              color: '#008080',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {displayValues[i]}
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
