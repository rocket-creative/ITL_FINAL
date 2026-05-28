'use client';

/**
 * |UXUIDC| Equal weight catalog + custom dual path buttons.
 */

import Link from 'next/link';
import {
  EQUAL_WEIGHT_BUTTONS,
  commercialUtmHref,
  type CtaButton,
} from '@/data/commercialCtas';

export type CatalogCustomCtaVariant = 'dark' | 'light' | 'banner';

interface CatalogCustomCtaButtonsProps {
  variant?: CatalogCustomCtaVariant;
  layout?: 'row' | 'stack';
  buttons?: CtaButton[];
  utmMedium?: string;
  utmCampaign?: string;
  slug?: string;
  className?: string;
}

const BTN_PADDING = '12px 24px';
const BTN_FONT = '0.9rem';

function buttonStyles(variant: CatalogCustomCtaVariant, role: 'catalog' | 'custom') {
  if (variant === 'banner') {
    return role === 'catalog'
      ? {
          backgroundColor: '#ffffff',
          color: '#0a253c',
          border: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
        }
      : {
          backgroundColor: '#0a253c',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
        };
  }
  if (variant === 'light') {
    return role === 'catalog'
      ? { backgroundColor: '#008080', color: '#ffffff', border: 'none' }
      : { backgroundColor: '#0a253c', color: '#ffffff', border: 'none' };
  }
  // dark (on navy/gradient heroes and closing sections)
  return role === 'catalog'
    ? { backgroundColor: '#008080', color: '#ffffff', border: 'none' }
    : { backgroundColor: '#0a253c', color: '#ffffff', border: '2px solid rgba(255,255,255,0.25)' };
}

export default function CatalogCustomCtaButtons({
  variant = 'dark',
  layout = 'row',
  buttons = EQUAL_WEIGHT_BUTTONS,
  utmMedium,
  utmCampaign,
  slug,
  className = '',
}: CatalogCustomCtaButtonsProps) {
  const campaign = utmCampaign ?? (slug ? `dual-cta-${slug}` : 'dual-cta');

  return (
    <div
      className={`flex flex-wrap justify-center gap-3 sm:gap-4 ${className}`}
      style={{
        flexDirection: layout === 'stack' ? 'column' : 'row',
        alignItems: layout === 'stack' ? 'stretch' : 'center',
      }}
    >
      {buttons.map((btn, i) => {
        const role = i === 0 ? 'catalog' : 'custom';
        const href = commercialUtmHref(btn.href, {
          source: 'organic',
          medium: utmMedium,
          campaign,
        });
        const styles = buttonStyles(variant, role);

        return (
          <Link
            key={`${btn.href}-${btn.label}`}
            href={href}
            data-cta={role === 'catalog' ? 'dual-cta-catalog' : 'dual-cta-custom-quote'}
            data-cta-slug={slug}
            className="group inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              ...styles,
              padding: BTN_PADDING,
              fontFamily: 'var(--system-ui)',
              fontSize: BTN_FONT,
              fontWeight: 600,
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '0.3px',
              textAlign: 'center',
            }}
          >
            <span>{btn.label}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
