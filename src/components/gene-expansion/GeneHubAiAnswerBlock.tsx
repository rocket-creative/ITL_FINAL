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

/** Quiet section label — not a display heading. Keep weight/size near body. */
const SECTION_LABEL =
  'mb-3.5 text-[.92rem] font-semibold leading-snug tracking-normal text-[#0a253c]';

const AVAIL_BTN_BASE =
  'inline-flex h-11 w-full items-center justify-center rounded-md px-4 text-[.82rem] font-semibold leading-none no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[12.75rem]';

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
      className="border-b border-[#eee] bg-white px-4 py-10 sm:px-5 md:py-14"
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

        <p className="mb-8 text-[.92rem] leading-[1.7] text-[#444]">
          <strong className="font-semibold text-[#0a253c]">Definition:</strong> The mouse gene
          symbol is <strong className="font-semibold">{mouseSymbol}</strong>; the human ortholog
          symbol is <strong className="font-semibold">{humanSymbol}</strong>. Catalog and custom
          model generation pages on this site use the mouse symbol for allele naming and ordering.
        </p>

        <h3 className={SECTION_LABEL}>Modification paths for {mouseSymbol}</h3>

        <div className="mb-8 overflow-hidden rounded-md border border-[#e8e8e8]">
          <div className="hidden grid-cols-[1fr_auto] gap-4 border-b border-[#e0e0e0] bg-[#f7f7f7] px-4 py-3 text-[.8rem] font-semibold text-[#0a253c] sm:grid">
            <span>Path</span>
            <span className="w-[12.75rem] text-center">Availability</span>
          </div>
          <ul className="m-0 list-none p-0">
            {MOD_PATHS.map((row, index) => {
              const inCatalog = isCatalogPath(row.matches, modTypesPresent);
              const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]';

              return (
                <li
                  key={row.label}
                  className={`${rowBg} border-b border-[#f0f0f0] last:border-b-0`}
                >
                  <div className="flex flex-col gap-3 px-4 py-3.5 sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4">
                    <p className="m-0 text-[.9rem] font-medium leading-snug text-[#333]">
                      {row.label}
                    </p>
                    <div className="w-full sm:w-[12.75rem] sm:justify-self-end">
                      <AvailabilityCta
                        inCatalog={inCatalog}
                        mouseSymbol={mouseSymbol}
                        slug={row.slug}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <h3 className={SECTION_LABEL}>
          Why researchers choose ingenious targeting laboratory
        </h3>
        <ul className="mb-8 list-disc space-y-1.5 pl-5 text-[.92rem] leading-[1.7] text-[#444]">
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
