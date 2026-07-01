/**
 * Sitewide page hero — mobile-first, solid gradient background, clear typography.
 * Use on every marketing page for consistent above-the-fold layout.
 */

import type { ReactNode } from 'react';

export interface PageHeroProps {
  title: string;
  badge?: ReactNode;
  intro?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** solid = navy only; gradient = brand gradient (default) */
  variant?: 'gradient' | 'solid';
  align?: 'left' | 'center';
  className?: string;
}

export default function PageHero({
  title,
  badge,
  intro,
  description,
  children,
  variant = 'gradient',
  align = 'left',
  className = '',
}: PageHeroProps) {
  const alignClass = align === 'center' ? 'page-hero--center' : '';

  return (
    <section
      className={`page-hero ${variant === 'solid' ? 'page-hero--solid' : ''} ${alignClass} ${className}`.trim()}
    >
      <div className="page-hero-inner">
        {badge ? <div className="page-hero-badge">{badge}</div> : null}
        <h1 className="page-hero-title">{title}</h1>
        {intro ? <p className="page-hero-intro">{intro}</p> : null}
        {description ? <p className="page-hero-description">{description}</p> : null}
        {children ? <div className="page-hero-actions">{children}</div> : null}
      </div>
    </section>
  );
}
