'use client';

/**
 * |UXUIDC| AutoAnimate Component
 * Automatic scroll-triggered animations using Intersection Observer
 * 
 * Usage:
 * <AutoAnimate animation="animate-fade-in-up" delay={300}>
 *   <h1>Content</h1>
 * </AutoAnimate>
 */

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AutoAnimateProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'animate-fade-in-up' | 'animate-fade-in-down' | 'animate-fade-in' | 'animate-scale-x';
  delay?: 0 | 100 | 150 | 200 | 300 | 400 | 450 | 500 | 600 | 700 | 800;
  threshold?: number;
}

export function AutoAnimate({ 
  children, 
  className = '', 
  animation = 'animate-fade-in-up',
  delay = 0,
  threshold = 0.1
}: AutoAnimateProps) {
  const ref = useScrollAnimation<HTMLDivElement>(threshold);
  const delayClass = delay ? `animate-delay-${delay}` : '';
  
  return (
    <div ref={ref} className={`animate-initial ${animation} ${delayClass} ${className}`}>
      {children}
    </div>
  );
}

export default AutoAnimate;
