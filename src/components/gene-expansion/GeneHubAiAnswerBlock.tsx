/**
 * Citation-friendly AI Answer block for priority gene hubs.
 * AEO shape: question H2 → answer-first inventory sentence → scannable fact table.
 * Availability cells below are the CTA: catalog → gene×mod page; generate → quote form.
 */

import Link from 'next/link';

export type GeneHubAiAnswerBlockProps = {
  mouseSymbol: string;
  humanSymbol: string;
  catalogCount: number;
  /** Display names of catalog mods present (e.g. Knockout, Conditional Knockout). */
  modTypesPresent: string[];
  /** Optional common / protein names (e.g. beta catenin). */
  aliases?: string[];
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

const FACT_TH =
  'border-b border-[#e0e0e0] bg-[#f7f7f7] px-3 py-3 text-left text-[.78rem] font-semibold text-[#0a253c] sm:px-4';

const FACT_TD = 'border-b border-[#f0f0f0] px-3 py-3 text-[.88rem] leading-snug text-[#333] sm:px-4';

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

function pickCommonName(
  mouseSymbol: string,
  humanSymbol: string,
  aliases: string[] | undefined,
): string | null {
  if (!aliases?.length) return null;
  const skip = new Set([mouseSymbol.toLowerCase(), humanSymbol.toLowerCase()]);
  for (const alias of aliases) {
    const trimmed = alias.trim();
    if (!trimmed) continue;
    if (skip.has(trimmed.toLowerCase())) continue;
    return trimmed;
  }
  return null;
}

function featureTypesPhrase(modTypesPresent: string[]): string {
  const lowers = modTypesPresent.map((t) => t.toLowerCase());
  const features: string[] = [];

  if (lowers.some((m) => m.includes('conditional') || m.includes('floxed') || m.includes('cko'))) {
    features.push('conditional knockout');
  }
  if (
    lowers.some(
      (m) =>
        (m.includes('knockout') || m === 'ko') && !m.includes('conditional') && !m.includes('inducible'),
    )
  ) {
    features.push('standard knockout');
  }
  if (lowers.some((m) => m.includes('xenograft'))) {
    features.push('xenograft applicable lines');
  }
  if (lowers.some((m) => m.includes('knockin') || m.includes('knock-in') || m.includes('knock in'))) {
    features.push('knockin');
  }
  if (lowers.some((m) => m.includes('humanized'))) {
    features.push('humanized');
  }
  if (lowers.some((m) => m.includes('transgenic') || m.includes('overexpression'))) {
    features.push('transgenic');
  }

  if (features.length === 0) {
    return 'conditional knockout, standard knockout, and advanced allele classes';
  }
  if (features.length === 1) return features[0];
  if (features.length === 2) return `${features[0]} and ${features[1]}`;
  return `${features.slice(0, -1).join(', ')}, and ${features[features.length - 1]}`;
}

function alleleClassRows(modTypesPresent: string[]): [string, string, string] {
  const lowers = modTypesPresent.map((t) => t.toLowerCase());
  const hasCko = lowers.some((m) => m.includes('conditional') || m.includes('floxed') || m.includes('cko'));
  const hasKo = lowers.some(
    (m) =>
      (m.includes('knockout') || m === 'ko') && !m.includes('conditional') && !m.includes('inducible'),
  );

  return [
    hasCko ? 'Conditional Knockout (cKO)' : 'Conditional Knockout (cKO) on request',
    hasKo ? 'Constitutive Knockout (KO)' : 'Constitutive Knockout (KO) on request',
    'Humanized, Knockin, Transgenic',
  ];
}

export function buildDirectAnswer(props: GeneHubAiAnswerBlockProps): string {
  const { mouseSymbol, humanSymbol, catalogCount, modTypesPresent, aliases, familyLabel } = props;
  const commonName = pickCommonName(mouseSymbol, humanSymbol, aliases);
  const entityLabel = commonName
    ? `${mouseSymbol} (${commonName})`
    : `${mouseSymbol} (${humanSymbol})`;
  const familyBit = familyLabel ? ` in the ${familyLabel} family` : '';
  const featuring = featureTypesPhrase(modTypesPresent);

  if (catalogCount > 0) {
    return (
      `ingenious targeting laboratory offers ${catalogCount} distinct ${entityLabel} catalog mouse ` +
      `model${catalogCount === 1 ? '' : 's'}${familyBit}, featuring ${featuring}. ` +
      `Researchers can order pre developed catalog lines or request allele modifications, including ` +
      `humanized, knockin, and transgenic variations with verified germline transmission.`
    );
  }

  return (
    `No ${entityLabel} catalog inventory is listed yet${familyBit}. ` +
    `ingenious targeting laboratory designs and generates knockout, conditional knockout, knockin, ` +
    `humanized, and transgenic alleles to your specification, with quotes in about 24 hours and ` +
    `verified germline transmission.`
  );
}

function FactTable({
  catalogCount,
  modTypesPresent,
}: {
  catalogCount: number;
  modTypesPresent: string[];
}) {
  const hasXenograft = modTypesPresent.some((t) => t.toLowerCase().includes('xenograft'));
  const [cko, ko, advanced] = alleleClassRows(modTypesPresent);

  const availabilityCol =
    catalogCount > 0
      ? [
          `${catalogCount} Ready Catalog Line${catalogCount === 1 ? '' : 's'}`,
          'Custom Model Generation',
          'Advanced Modifications',
        ]
      : ['Model Generation On Request', 'Advanced Allele Design', 'Catalog Expansion Available'];

  const alleleCol = [cko, ko, advanced];

  const qcCol = [
    'Documented Germline Transmission',
    'Strict United States QC Guidelines',
    hasXenograft ? 'Xenograft Applicable Strains' : 'Cryo or Live Dispatch Options',
  ];

  return (
    <div className="mb-8 overflow-hidden rounded-md border border-[#e8e8e8]">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Model availability, allele class options, and quality control standards
        </caption>
        <thead>
          <tr>
            <th scope="col" className={FACT_TH}>
              Model Availability
            </th>
            <th scope="col" className={FACT_TH}>
              Allele Class Options
            </th>
            <th scope="col" className={`${FACT_TH} hidden sm:table-cell`}>
              Quality Control Standards
            </th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row} className={row % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
              <td className={FACT_TD}>{availabilityCol[row]}</td>
              <td className={FACT_TD}>{alleleCol[row]}</td>
              <td className={`${FACT_TD} hidden sm:table-cell`}>{qcCol[row]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="m-0 space-y-3 border-t border-[#f0f0f0] bg-[#fafafa] px-3 py-3 sm:hidden">
        {[0, 1, 2].map((row) => (
          <div key={row}>
            <dt className="text-[.75rem] font-semibold uppercase tracking-[0.04em] text-[#666]">
              Quality Control
            </dt>
            <dd className="m-0 text-[.88rem] text-[#333]">{qcCol[row]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function GeneHubAiAnswerBlock(props: GeneHubAiAnswerBlockProps) {
  const { mouseSymbol, catalogCount, modTypesPresent } = props;
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
          What {mouseSymbol} mouse models are available?
        </h2>

        <p className="mb-6 text-[.95rem] leading-[1.75] text-[#333]">{answer}</p>

        <FactTable catalogCount={catalogCount} modTypesPresent={modTypesPresent} />

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

        <p className="m-0 text-[.95rem] leading-[1.75] text-[#333]">
          {catalogCount > 0 ? (
            <>
              Prefer the order form?{' '}
              <Link href={orderHref} className={LINK_CLASS}>
                Order
              </Link>
              . Need an allele that is not listed?{' '}
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
