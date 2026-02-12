/**
 * OG Image Preview Tool
 * View generated OG images for all pages
 */

import { OG_IMAGE_DATA } from '@/data/ogImageConfig';

export default function OGPreviewPage() {
  const configs = Object.entries(OG_IMAGE_DATA);

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
        OG Image Preview Tool
      </h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        Preview all dynamically generated OG images (1200 x 630px)
      </p>

      <div style={{ display: 'grid', gap: '40px' }}>
        {configs.map(([path, config]) => {
          const imageUrl = `/api/og?line1=${encodeURIComponent(config.line1)}&line2=${encodeURIComponent(config.line2)}&line3=${encodeURIComponent(config.line3)}`;
          
          return (
            <div
              key={path}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fafafa',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                  {path}
                </h2>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Tier {config.tier} • {config.slug}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#fff',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={imageUrl}
                  alt={`OG Image for ${path}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>

              <div style={{ marginTop: '12px', fontSize: '13px', color: '#888' }}>
                <div><strong>Line 1:</strong> {config.line1}</div>
                <div><strong>Line 2:</strong> {config.line2}</div>
                <div><strong>Line 3:</strong> {config.line3}</div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0066cc',
                    textDecoration: 'underline',
                    fontSize: '14px',
                  }}
                >
                  Open full size →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
