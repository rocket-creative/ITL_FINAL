/**
 * Citation-friendly AI Answer block for priority gene hubs.
 * Availability cells are the CTA: catalog → gene×mod page; generate → quote form.
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
  slug: string;
  matches: (modLower: string) => boolean;
}> = [
  {
    label: 'Knockout',
    slug: 'knockout',
    matches: (m) =>
      (m.includes('knockout') || m === 'ko') && !m.includes('conditional') && !m.includes('inducible'),
  },
  {
    label: 'Conditional knockout',
    slug: 'conditional-knockout',
    matches: (m) => m.includes('conditional') || m.includes('floxed') || m.includes('cko'),
  },
  {
    label: 'Knockin',
    slug: 'knockin',
    matches: (m) => m.includes('knockin') || m.includes('knock-in') || m.includes('knock in'),
  },
  {
    label: 'Humanized',
    slug: 'humanized',
    matches: (m) => m.includes('humanized') || m.includes('humanisation') || m.includes('humanization'),
  },
  {
    label: 'Transgenic / overexpression',
    slug: 'overexpression',
    matches: (m) =>
      m.includes('transgenic') || m.includes('overexpression') || m.includes('over-expression'),
  },
];

const LINK_CLASS =
  'font-semibold text-[#008080] underline-offset-2 hover:text-[#006666] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008080]';

const AVAIL_BTN_BASE =
  'inline-flex min-h-11 items-center justify-center rounded-md px-3.5 py-2 text-[.82rem] font-semibold no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function isCatalogPath(
  matches: (modLower: string) => boolean,
  modTypesPresent: string[],
): boolean {
  return modTypesPresent.some((t) => matches(t.toLowerCase()));
}

function catalogHref(mouseSymbol: string, slug: string): string {
  return `/all-catalog-mouse-models/gene/${encodeURIComponent(mouseSymbol)}/${slug}/`;
}

function quoteHref(mouseSymbol: string, slug: string): string {
  return `/request-quote/?gene=${encodeURIComponent(mouseSymbol)}&type=${encodeURIComponent(slug)}`;
}

function AvailabilityCta({
  inCatalog,
  mouseSymbol,
  slug,
}: {
  inCatalog: boolean;
  mouseSymbol: string;
  slug: string;
}) {
  if (inCatalog) {
    return (
      <Link
        href={catalogHref(mouseSymbol, slug)}
        className={`${AVAIL_BTN_BASE} bg-[#008080] text-white hover:bg-[#006666] focus-visible:outline-[#008080]`}
      >
        View catalog
      </Link>
    );
  }

  return (
    <Link
      href={quoteHref(mouseSymbol, slug)}
      className={`${AVAIL_BTN_BASE} bg-[#0a253c] text-white hover:bg-[#134978] focus-visible:outline-[#0a253c]`}
    >
      Request a quote
    </Link>
  );
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
  const quoteAllHref = `/request-quote/?gene=${encodeURIComponent(mouseSymbol)}`;

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
          <strong className="text-[#0a253c]">Definition:</strong> The mouse gene symbol is{' '}
          <strong>{mouseSymbol}</strong>; the human ortholog symbol is <strong>{humanSymbol}</strong>.
          Catalog and custom model generation pages on this site use the mouse symbol for allele
          naming and ordering.
        </p>

        <h3 className="mb-3 text-lg font-bold text-[#0a253c] min-[810px]:text-[1.1rem]">
          Modification paths for {mouseSymbol}
        </h3>

        <div className="mb-7 min-[810px]:hidden">
          <ul className="divide-y divide-[#f0f0f0] border border-[#f0f0f0]">
            {MOD_PATHS.map((row, index) => {
              const inCatalog = isCatalogPath(row.matches, modTypesPresent);
              const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]';

              return (
                <li key={row.label} className={rowBg}>
                  <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0a253c]">
                        Path
                      </p>
                      <p className="text-[.9rem] font-medium text-[#333]">{row.label}</p>
                    </div>
                    <AvailabilityCta
                      inCatalog={inCatalog}
                      mouseSymbol={mouseSymbol}
                      slug={row.slug}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

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
              {MOD_PATHS.map((row, index) => {
                const inCatalog = isCatalogPath(row.matches, modTypesPresent);
                const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]';
                return (
                  <tr key={row.label} className={`${rowBg} border-b border-[#f0f0f0]`}>
                    <td className="px-4 py-3 font-medium text-[#333]">{row.label}</td>
                    <td className="px-4 py-3">
                      <AvailabilityCta
                        inCatalog={inCatalog}
                        mouseSymbol={mouseSymbol}
                        slug={row.slug}
                      />
                    </td>
                  </tr>
                );
              })}
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
              Prefer the order form?{' '}
              <Link href={orderHref} className={LINK_CLASS}>
                Order
              </Link>
              . Need a custom allele?{' '}
              <Link href={quoteAllHref} className={LINK_CLASS}>
                Request a quote
              </Link>
              .
            </>
          ) : (
            <>
              Start a {mouseSymbol} project with{' '}
              <Link href={quoteAllHref} className={LINK_CLASS}>
                Request a quote
              </Link>
              , or open the{' '}
              <Link href={orderHref} className={LINK_CLASS}>
                Order
              </Link>{' '}
              form for related catalog lines.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
