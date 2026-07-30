/**
 * Citation-friendly AI Answer block for priority gene hubs.
 */

import Link from 'next/link';

export type GeneHubAiAnswerBlockProps = {
  mouseSymbol: string;
  humanSymbol: string;
  catalogCount: number;
  /** Display names of catalog mods present (e.g. Knockout, Conditional Knockout). */
  modTypesPresent: string[];
  familyLabel?: string;
};

const MOD_PATHS: Array<{
  label: string;
  matches: (modLower: string) => boolean;
}> = [
  {
    label: 'Knockout',
    // Plain KO only — do not treat conditional knockout as constitutive KO.
    matches: (m) =>
      (m.includes('knockout') || m === 'ko') && !m.includes('conditional') && !m.includes('inducible'),
  },
  {
    label: 'Conditional knockout',
    matches: (m) => m.includes('conditional') || m.includes('floxed') || m.includes('cko'),
  },
  {
    label: 'Knockin',
    matches: (m) => m.includes('knockin') || m.includes('knock-in') || m.includes('knock in'),
  },
  {
    label: 'Humanized',
    matches: (m) => m.includes('humanized') || m.includes('humanisation') || m.includes('humanization'),
  },
  {
    label: 'Transgenic/overexpression',
    matches: (m) =>
      m.includes('transgenic') || m.includes('overexpression') || m.includes('over-expression'),
  },
];

function isCatalogPath(
  matches: (modLower: string) => boolean,
  modTypesPresent: string[],
): boolean {
  return modTypesPresent.some((t) => matches(t.toLowerCase()));
}

function buildDirectAnswer(props: GeneHubAiAnswerBlockProps): string {
  const { mouseSymbol, humanSymbol, catalogCount, modTypesPresent, familyLabel } = props;
  const familyBit = familyLabel ? ` in the ${familyLabel} family` : '';
  const typesBit =
    modTypesPresent.length > 0
      ? ` Catalog paths include ${modTypesPresent.slice(0, 3).join(', ').toLowerCase()}.`
      : '';

  if (catalogCount > 0) {
    return (
      `ingenious targeting laboratory lists ${catalogCount} ${mouseSymbol} (${humanSymbol}) ` +
      `catalog mouse model${catalogCount === 1 ? '' : 's'}${familyBit}.${typesBit} ` +
      `Order ready catalog lines or request a custom knockout, knockin, humanized, or transgenic allele ` +
      `with documented germline transmission and U.S. QC.`
    );
  }

  return (
    `No ${mouseSymbol} (${humanSymbol}) catalog inventory is listed yet${familyBit}. ` +
    `ingenious targeting laboratory designs and generates knockout, conditional knockout, knockin, ` +
    `humanized, and transgenic or overexpression alleles to your specification, with quotes in about ` +
    `24 hours and 100% germline transmission.`
  );
}

export default function GeneHubAiAnswerBlock(props: GeneHubAiAnswerBlockProps) {
  const { mouseSymbol, humanSymbol, catalogCount, modTypesPresent } = props;
  const answer = buildDirectAnswer(props);
  const orderHref = `/order-catalog-models?gene=${encodeURIComponent(mouseSymbol)}`;
  const quoteHref = `/request-quote/?gene=${encodeURIComponent(mouseSymbol)}`;

  return (
    <section
      aria-labelledby="gene-hub-ai-answer-heading"
      style={{ background: '#fff', padding: '56px 20px', borderBottom: '1px solid #eee' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p
          style={{
            display: 'inline-block',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '.75rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#008080',
            marginBottom: '10px',
          }}
        >
          AI Answer
        </p>

        <h2
          id="gene-hub-ai-answer-heading"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.45rem',
            fontWeight: 700,
            color: '#0a253c',
            marginBottom: '16px',
            lineHeight: 1.3,
          }}
        >
          {mouseSymbol} mouse models: what ingenious targeting laboratory offers
        </h2>

        <p style={{ color: '#333', fontSize: '.95rem', lineHeight: 1.75, marginBottom: '20px' }}>
          {answer}
        </p>

        <p style={{ color: '#444', fontSize: '.92rem', lineHeight: 1.7, marginBottom: '28px' }}>
          <strong style={{ color: '#0a253c' }}>Definition:</strong>{' '}
          The mouse gene symbol is <strong>{mouseSymbol}</strong>; the human ortholog symbol is{' '}
          <strong>{humanSymbol}</strong>. Catalog and custom model generation pages on this site use the
          mouse symbol for allele naming and ordering.
        </p>

        <h3
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#0a253c',
            marginBottom: '12px',
          }}
        >
          Modification paths for {mouseSymbol}
        </h3>

        <div style={{ overflowX: 'auto', marginBottom: '28px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '.9rem',
              minWidth: '480px',
            }}
          >
            <thead>
              <tr style={{ background: '#f7f7f7' }}>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#0a253c',
                    borderBottom: '2px solid #e0e0e0',
                  }}
                >
                  Path
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#0a253c',
                    borderBottom: '2px solid #e0e0e0',
                  }}
                >
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>
              {MOD_PATHS.map((row, index) => {
                const inCatalog = isCatalogPath(row.matches, modTypesPresent);
                return (
                  <tr
                    key={row.label}
                    style={{
                      background: index % 2 === 0 ? '#fff' : '#fafafa',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <td style={{ padding: '12px 16px', color: '#333', fontWeight: 500 }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ color: inCatalog ? '#008080' : '#134978', fontWeight: 600 }}>
                        {inCatalog ? 'Catalog' : 'Custom generation'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#0a253c',
            marginBottom: '12px',
          }}
        >
          Why researchers choose ingenious targeting laboratory
        </h3>
        <ul
          style={{
            margin: '0 0 28px',
            paddingLeft: '1.25rem',
            color: '#444',
            fontSize: '.92rem',
            lineHeight: 1.8,
          }}
        >
          <li>Mouse model generation since 1998 with U.S. based QC</li>
          <li>2,800+ completed projects across knockout, knockin, and humanized designs</li>
          <li>100% germline transmission guarantee on generated alleles</li>
          <li>800+ peer reviewed publications citing ITL models</li>
          {catalogCount > 0 ? (
            <li>
              {catalogCount} {mouseSymbol} catalog model{catalogCount === 1 ? '' : 's'} available to
              order, with custom builds when your allele is not listed
            </li>
          ) : (
            <li>
              Custom {mouseSymbol} allele design when catalog inventory does not yet list this gene
            </li>
          )}
        </ul>

        <p style={{ color: '#333', fontSize: '.95rem', lineHeight: 1.75, margin: 0 }}>
          {catalogCount > 0 ? (
            <>
              To order a listed {mouseSymbol} line, visit{' '}
              <Link href={orderHref} style={{ color: '#008080', fontWeight: 600 }}>
                Order catalog models
              </Link>
              . For a generated knockout, knockin, humanized, or transgenic allele,{' '}
              <Link href={quoteHref} style={{ color: '#008080', fontWeight: 600 }}>
                request a quote
              </Link>
              .
            </>
          ) : (
            <>
              Start a {mouseSymbol} project by{' '}
              <Link href={quoteHref} style={{ color: '#008080', fontWeight: 600 }}>
                requesting a quote
              </Link>
              , or browse related catalog inventory at{' '}
              <Link href={orderHref} style={{ color: '#008080', fontWeight: 600 }}>
                Order catalog models
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </section>
  );
}
