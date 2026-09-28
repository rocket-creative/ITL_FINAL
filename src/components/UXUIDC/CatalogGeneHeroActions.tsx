import Link from 'next/link';
import { IconChevronRight } from '@/components/UXUIDC/Icons';

const filled = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: '#008080',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  fontSize: '.9rem',
  fontWeight: 600,
  textDecoration: 'none',
} as const;

const outline = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: 'transparent',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  fontSize: '.9rem',
  fontWeight: 600,
  textDecoration: 'none',
  border: '2px solid rgba(255,255,255,0.3)',
} as const;

/**
 * Catalog-first actions for marketing heroes that link to a gene or the full catalog.
 */
export default function CatalogGeneHeroActions({
  gene,
  searchHref = '/all-catalog-mouse-models',
}: {
  gene?: string;
  searchHref?: string;
}) {
  const orderHref = gene
    ? `/order-catalog-models?gene=${encodeURIComponent(gene)}`
    : '/order-catalog-models';
  const quoteHref = gene
    ? `/request-quote?gene=${encodeURIComponent(gene)}`
    : '/request-quote';

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Link href={orderHref} style={filled}>
        Order catalog model
        <IconChevronRight size={16} color="#ffffff" />
      </Link>
      <Link href={searchHref} style={outline}>
        Search All Models
      </Link>
      <Link href={quoteHref} style={outline}>
        Request a Quote
      </Link>
    </div>
  );
}
