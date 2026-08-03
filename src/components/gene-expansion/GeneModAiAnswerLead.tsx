/**
 * AEO lead for gene × model-type pages.
 * Question H2 + answer-first inventory sentence + three column fact strip.
 */

export type GeneModAiAnswerLeadProps = {
  geneSymbol: string;
  modLabel: string;
  /** Catalog inventory count for this gene × mod (0 for build_inquiry). */
  catalogCount: number;
  /** True when this page is a build_inquiry (no ready catalog SKU for this combo). */
  isBuildInquiry?: boolean;
  humanSymbol?: string;
  commonName?: string;
};

function entityLabel(geneSymbol: string, humanSymbol?: string, commonName?: string): string {
  if (commonName && commonName.toLowerCase() !== geneSymbol.toLowerCase()) {
    return `${geneSymbol} (${commonName})`;
  }
  if (humanSymbol && humanSymbol.toLowerCase() !== geneSymbol.toLowerCase()) {
    return `${geneSymbol} (${humanSymbol})`;
  }
  return geneSymbol;
}

export function buildGeneModDirectAnswer(props: GeneModAiAnswerLeadProps): string {
  const { geneSymbol, modLabel, catalogCount, isBuildInquiry, humanSymbol, commonName } = props;
  const entity = entityLabel(geneSymbol, humanSymbol, commonName);
  const modLower = modLabel.toLowerCase();

  if (!isBuildInquiry && catalogCount > 0) {
    return (
      `ingenious targeting laboratory offers ${catalogCount} distinct ${entity} ${modLower} catalog mouse ` +
      `model${catalogCount === 1 ? '' : 's'}. Researchers can order pre-developed catalog lines or request ` +
      `a custom mouse model, including humanized, knockin, and transgenic variations with verified ` +
      `germline transmission.`
    );
  }

  return (
    `ingenious targeting laboratory designs and generates ${entity} ${modLower} mouse models to your ` +
    `specification. Quotes return in about 24 hours with documented germline transmission and strict ` +
    `United States QC guidelines.`
  );
}

export default function GeneModAiAnswerLead(props: GeneModAiAnswerLeadProps) {
  const { geneSymbol, modLabel, catalogCount, isBuildInquiry } = props;
  const answer = buildGeneModDirectAnswer(props);

  const availability =
    !isBuildInquiry && catalogCount > 0
      ? `${catalogCount} Ready Catalog Line${catalogCount === 1 ? '' : 's'}`
      : 'Model Generation On Request';

  return (
    <section
      aria-labelledby="gene-mod-ai-answer-heading"
      style={{ background: '#fff', padding: '48px 20px 8px', fontFamily: 'Poppins, sans-serif' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          id="gene-mod-ai-answer-heading"
          style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            color: '#0a253c',
            marginBottom: '14px',
            lineHeight: 1.3,
          }}
        >
          What {geneSymbol} {modLabel} mouse models are available?
        </h2>
        <p style={{ color: '#333', lineHeight: 1.75, fontSize: '.95rem', marginBottom: '24px' }}>
          {answer}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: '#e8e8e8',
            border: '1px solid #e8e8e8',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '8px',
          }}
        >
          {(
            [
              ['Model Availability', availability],
              ['Allele Class Options', modLabel],
              ['Quality Control Standards', 'Documented Germline Transmission'],
            ] as const
          ).map(([label, value]) => (
            <div key={label} style={{ background: '#fff', padding: '16px 18px' }}>
              <p
                style={{
                  margin: '0 0 6px',
                  fontSize: '.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#666',
                }}
              >
                {label}
              </p>
              <p style={{ margin: 0, fontSize: '.92rem', fontWeight: 600, color: '#0a253c' }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
