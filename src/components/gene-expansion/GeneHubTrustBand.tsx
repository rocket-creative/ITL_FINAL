/**
 * Compact trust strip for priority gene hubs.
 */

type Props = {
  className?: string;
};

const ITEMS = [
  'Since 1998',
  '2,800+ projects',
  '100% germline transmission',
  '800+ publications',
  'U.S. QC',
] as const;

export default function GeneHubTrustBand({ className }: Props) {
  return (
    <aside
      className={`border-y border-[#d0e8e8] bg-[#f0f9f9] px-5 py-3.5 sm:py-4 ${className ?? ''}`}
      aria-label="Company trust facts"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <ul className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-4 gap-y-2.5 text-[0.82rem] font-medium leading-normal text-[#0a253c] sm:gap-x-6">
        {ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
