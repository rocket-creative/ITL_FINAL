import { stockFormsFor } from '@/lib/catalog/availability';

/**
 * Off-the-shelf catalog hero banner. Forms are derived from the availability
 * values already loaded for the models on this page, so a catalog refresh
 * updates the line on the next render.
 */
export default function CatalogReadyToShipBanner({
  availabilities,
}: {
  availabilities: readonly (string | null | undefined)[];
}) {
  const formLine = stockFormsFor(availabilities).join(' · ');

  return (
    <div style={{ marginBottom: '18px' }}>
      <p
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
          fontWeight: 800,
          letterSpacing: '0.04em',
          color: '#fff',
          margin: formLine ? '0 0 8px' : 0,
          lineHeight: 1.1,
        }}
      >
        READY TO SHIP!
      </p>
      {formLine ? (
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#00d4d4',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {formLine}
        </p>
      ) : null}
    </div>
  );
}
