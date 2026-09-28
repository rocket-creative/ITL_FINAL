import { cache } from 'react';
import Link from 'next/link';
import { getModelsByAbbrevPrefixes } from '@/lib/catalog/serverCatalog';
import CatalogReadyToShipBanner from '@/components/catalog/CatalogReadyToShipBanner';
import { modelTypeAbbrev } from '@/lib/catalog/modelType';
import { availabilityColor, availabilityLabel, availabilityShortLabel } from '@/lib/catalog/availability';

const loadModels = cache((key: string) => getModelsByAbbrevPrefixes(key.split('|')));

function modelKey(prefixes: string[]) {
  return prefixes.join('|');
}

/** Stock line for a dark marketing hero. */
export async function MarketingReadyToShip({ prefixes }: { prefixes: string[] }) {
  const models = await loadModels(modelKey(prefixes));
  if (models.length === 0) return null;
  return <CatalogReadyToShipBanner availabilities={models.map((model) => model.availability)} />;
}

/** Abbreviated catalog table that stays inside the page column. */
export async function MarketingCatalogTable({ prefixes }: { prefixes: string[] }) {
  const models = await loadModels(modelKey(prefixes));
  if (models.length === 0) return null;

  return (
    <div style={{ marginBottom: '28px' }}>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#0a253c', margin: '0 0 12px' }}>
        Ready catalog models
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontSize: '.85rem' }}>
        <colgroup>
          <col style={{ width: '36%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
        </colgroup>
        <thead>
          <tr style={{ background: '#f7f7f7' }}>
            {['Model', 'Type', 'Status', 'Catalog', ''].map((heading) => (
              <th
                key={heading || 'action'}
                style={{
                  padding: '10px 8px',
                  textAlign: heading ? 'left' : 'center',
                  fontWeight: 600,
                  color: '#333',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((model, index) => (
            <tr key={model.id} style={{ background: index % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee', verticalAlign: 'top' }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 600, color: '#0a253c', overflowWrap: 'anywhere' }}>
                  {model.modelAbbrev}
                </div>
                {model.description ? (
                  <div style={{ marginTop: '4px', color: '#555', fontSize: '.8rem', lineHeight: 1.45 }}>
                    {model.description}
                  </div>
                ) : null}
              </td>
              <td title={model.modelType} style={{ padding: '10px 8px', borderBottom: '1px solid #eee', fontWeight: 700, color: '#134978', verticalAlign: 'top' }}>
                {modelTypeAbbrev(model.modelType)}
              </td>
              <td title={availabilityLabel(model.availability)} style={{ padding: '10px 8px', borderBottom: '1px solid #eee', color: availabilityColor(model.availability), fontWeight: 600, verticalAlign: 'top' }}>
                {availabilityShortLabel(model.availability)}
              </td>
              <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee', fontFamily: 'monospace', color: '#134978', verticalAlign: 'top', overflowWrap: 'anywhere' }}>
                {model.catalogNumber}
              </td>
              <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee', textAlign: 'center', verticalAlign: 'top' }}>
                <Link
                  href={`/order-catalog-models?model=${encodeURIComponent(model.modelAbbrev)}&catalog=${encodeURIComponent(model.catalogNumber)}`}
                  style={{ display: 'inline-block', background: '#008080', color: '#fff', padding: '6px 10px', borderRadius: '4px', fontSize: '.78rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  Inquire
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
