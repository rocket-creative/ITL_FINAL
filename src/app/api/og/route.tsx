/**
 * Dynamic OG Image Generator
 * Generates 1200x630px OG images on demand
 * Based on Figma design specifications
 */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export const runtime = 'nodejs';

// iTL Brand Colors (from Figma design)
const COLORS = {
  blue: '#1E88E5',        // Primary blue for headline
  navy: '#1a2332',        // Dark navy for line 2
  teal: '#008080',        // iTL teal for line 3
  background: '#e3e3e3',  // Background grey
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get text from URL parameters
    const line1 = searchParams.get('line1') || 'Custom Mouse Models Since 1998';
    const line2 = searchParams.get('line2') || '2,800+ Custom Projects  |  800+ Publications';
    const line3 = searchParams.get('line3') || 'Expert Gene Targeting Solutions';

    // Load background image (it's actually a JPEG)
    const backgroundPath = path.join(process.cwd(), 'public', 'images', 'og', 'background.png');
    const backgroundBuffer = fs.readFileSync(backgroundPath);
    const backgroundBase64 = `data:image/jpeg;base64,${backgroundBuffer.toString('base64')}`;

    // Load logo
    const logoPath = path.join(process.cwd(), 'public', 'images', 'og', 'logo.png');
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'relative',
            background: `url(${backgroundBase64})`,
            backgroundSize: '1200px 630px',
          }}
        >

          {/* Content Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '54px',
            }}
          >
            {/* Text Content - Top Left - All left justified */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxWidth: '950px',
              }}
            >
              {/* Line 1 - Primary Headline - iTL Blue - BOLD look via size */}
              <div
                style={{
                  fontSize: '62px',
                  color: COLORS.blue,
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                {line1}
              </div>

              {/* Line 2 - Supporting Stats - Dark Navy - THIN look via opacity */}
              <div
                style={{
                  fontSize: '50px',
                  color: COLORS.navy,
                  lineHeight: 1.2,
                  textAlign: 'left',
                  opacity: 0.7,
                  letterSpacing: '0.01em',
                }}
              >
                {line2}
              </div>

              {/* Line 3 - CTA - iTL Teal - Smaller + Regular */}
              <div
                style={{
                  fontSize: '40px',
                  color: COLORS.teal,
                  lineHeight: 1.2,
                  textAlign: 'left',
                  opacity: 0.95,
                }}
              >
                {line3}
              </div>
            </div>

            {/* Logo - Bottom Left - Left aligned - Bigger */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}
            >
              <img
                src={logoBase64}
                alt="iTL"
                width="550"
                height="110"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left',
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response(`Failed to generate image: ${error}`, { status: 500 });
  }
}
