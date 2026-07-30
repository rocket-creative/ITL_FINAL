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
      className={className}
      aria-label="Company trust facts"
      style={{
        background: '#f0f9f9',
        borderTop: '1px solid #d0e8e8',
        borderBottom: '1px solid #d0e8e8',
        padding: '14px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px 0',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '.82rem',
          fontWeight: 500,
          color: '#0a253c',
          lineHeight: 1.5,
        }}
      >
        {ITEMS.map((item, i) => (
          <span key={item} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {i > 0 ? (
              <span
                aria-hidden="true"
                style={{ margin: '0 10px', color: '#008080', fontWeight: 400 }}
              >
                ·
              </span>
            ) : null}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </aside>
  );
}
