/**
 * PI search taxonomy matrix for priority gene hubs.
 */

import PiTaxonomyEqualCardGrid from '@/components/gene-expansion/PiTaxonomyEqualCardGrid';

export type GeneHubPiTaxonomyMatrixProps = {
  mouseSymbol: string;
  humanSymbol: string;
  catalogByModSlug: Record<string, number>;
};

export default function GeneHubPiTaxonomyMatrix({
  mouseSymbol,
  humanSymbol,
  catalogByModSlug,
}: GeneHubPiTaxonomyMatrixProps) {
  return (
    <section
      className="px-4 py-10 md:px-5 md:py-14"
      aria-labelledby="gene-hub-pi-taxonomy-heading"
      style={{ background: '#f5f5f4', fontFamily: 'Poppins, sans-serif' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          id="gene-hub-pi-taxonomy-heading"
          className="mb-2 text-xl font-bold text-[#0a253c] md:text-[1.45rem]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {mouseSymbol} allele types
        </h2>
        <p style={{ color: '#555', fontSize: '.92rem', lineHeight: 1.7, marginBottom: '32px' }}>
          Knockout, conditional, knockin, humanized, and related paths for {mouseSymbol} (human{' '}
          {humanSymbol}). Catalog lines ship when inventory exists. Everything else is a generation
          quote.
        </p>
        <PiTaxonomyEqualCardGrid
          mode="gene-hub"
          mouseSymbol={mouseSymbol}
          catalogByModSlug={catalogByModSlug}
        />
      </div>
    </section>
  );
}
