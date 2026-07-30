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

const LINK_CLASS =
  'font-semibold text-[#008080] underline-offset-2 hover:text-[#006666] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008080]';

function isCatalogPath(
  matches: (modLower: string) => boolean,
  modTypesPresent: string[],
): boolean {
  return modTypesPresent.some((t) => matches(t.toLowerCase()));
}

function availabilityLabel(inCatalog: boolean): string {
  return inCatalog ? 'In catalog' : 'Request a quote';
}

function availabilityClassName(inCatalog: boolean): string {
  return inCatalog ? 'font-semibold text-[#008080]' : 'font-semibold text-[#134978]';
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

function ModPathRows({ modTypesPresent }: { modTypesPresent: string[] }) {
  return (
    <>
      {MOD_PATHS.map((row, index) => {
        const inCatalog = isCatalogPath(row.matches, modTypesPresent);
        const availability = availabilityLabel(inCatalog);
        const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]';

        return (
          <tr key={row.label} className={`${rowBg} border-b border-[#f0f0f0]`}>
            <td className="px-4 py-3 font-medium text-[#333]">{row.label}</td>
            <td className="px-4 py-3">
              <span className={availabilityClassName(inCatalog)}>{availability}</span>
            </td>
          </tr>
        );
      })}
    </>
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
      className="border-b border-[#eee] bg-white px-5 py-14"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-2.5 inline-block text-xs font-semibold uppercase tracking-[0.06em] text-[#008080]">
          AI Answer
        </p>

        <h2
          id="gene-hub-ai-answer-heading"
          className="mb-4 text-xl font-bold leading-snug text-[#0a253c] min-[810px]:text-[1.45rem]"
        >
          {mouseSymbol} mouse models: what ingenious targeting laboratory offers
        </h2>

        <p className="mb-5 text-[.95rem] leading-[1.75] text-[#333]">{answer}</p>

        <p className="mb-7 text-[.92rem] leading-[1.7] text-[#444]">
          <strong className="text-[#0a253c]">Definition:</strong>{' '}
          The mouse gene symbol is <strong>{mouseSymbol}</strong>; the human ortholog symbol is{' '}
          <strong>{humanSymbol}</strong>. Catalog and custom model generation pages on this site use the
          mouse symbol for allele naming and ordering.
        </p>

        <h3 className="mb-3 text-lg font-bold text-[#0a253c] min-[810px]:text-[1.1rem]">
          Modification paths for {mouseSymbol}
        </h3>

        {/* Mobile: stacked path + availability rows */}
        <div className="mb-7 min-[810px]:hidden">
          <ul className="divide-y divide-[#f0f0f0] border border-[#f0f0f0]">
            {MOD_PATHS.map((row, index) => {
              const inCatalog = isCatalogPath(row.matches, modTypesPresent);
              const availability = availabilityLabel(inCatalog);
              const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]';

              return (
                <li key={row.label} className={rowBg}>
                  <div className="px-4 py-3">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0a253c]">
                      Path
                    </p>
                    <p className="mb-3 text-[.9rem] font-medium text-[#333]">{row.label}</p>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0a253c]">
                      Availability
                    </p>
                    <p className={`text-[.9rem] ${availabilityClassName(inCatalog)}`}>{availability}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* md+: table layout */}
        <div className="mb-7 hidden min-[810px]:block">
          <table className="w-full border-collapse text-[.9rem]">
            <thead>
              <tr className="bg-[#f7f7f7]">
                <th
                  scope="col"
                  className="border-b-2 border-[#e0e0e0] px-4 py-3 text-left font-semibold text-[#0a253c]"
                >
                  Path
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-[#e0e0e0] px-4 py-3 text-left font-semibold text-[#0a253c]"
                >
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>
              <ModPathRows modTypesPresent={modTypesPresent} />
            </tbody>
          </table>
        </div>

        <h3 className="mb-3 text-lg font-bold text-[#0a253c] min-[810px]:text-[1.1rem]">
          Why researchers choose ingenious targeting laboratory
        </h3>
        <ul className="mb-7 list-disc pl-5 text-[.92rem] leading-[1.8] text-[#444]">
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

        <p className="m-0 text-[.95rem] leading-[1.75] text-[#333]">
          {catalogCount > 0 ? (
            <>
              To order a listed {mouseSymbol} line, visit{' '}
              <Link href={orderHref} className={LINK_CLASS}>
                Order
              </Link>
              . For a generated knockout, knockin, humanized, or transgenic allele,{' '}
              <Link href={quoteHref} className={LINK_CLASS}>
                Request a quote
              </Link>
              .
            </>
          ) : (
            <>
              Start a {mouseSymbol} project with{' '}
              <Link href={quoteHref} className={LINK_CLASS}>
                Request a quote
              </Link>
              , or browse related catalog inventory at{' '}
              <Link href={orderHref} className={LINK_CLASS}>
                Order
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </section>
  );
}
