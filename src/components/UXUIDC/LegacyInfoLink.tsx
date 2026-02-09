'use client';

import Link from 'next/link';

interface LegacyInfoLinkProps {
  href: string;
  label?: string;
}

/**
 * MORE INFO → Link Component
 * Links to legacy content pages from the old genetargeting.com site
 */
export default function LegacyInfoLink({ href, label = 'MORE INFO' }: LegacyInfoLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
      style={{
        backgroundColor: '#f0f9f9',
        color: '#008080',
        padding: '10px 20px',
        fontSize: '.85rem',
        fontWeight: 600,
        border: '1px solid #008080',
        borderRadius: '4px',
      }}
    >
      <span>{label}</span>
      <span 
        className="transition-transform duration-300 group-hover:translate-x-1"
        style={{ fontSize: '1.1rem' }}
      >
        →
      </span>
    </Link>
  );
}
