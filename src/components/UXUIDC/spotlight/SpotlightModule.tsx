import Link from 'next/link';
import { getSpotlightsByModelType } from '@/content/spotlights';
import type { ModelType } from '@/content/spotlights/_schema';

interface SpotlightModuleProps {
  modelType: ModelType;
  limit?: number;
  heading?: string;
}

export function SpotlightModule({
  modelType,
  limit = 3,
  heading = 'Researchers Using This Model',
}: SpotlightModuleProps) {
  const items = getSpotlightsByModelType(modelType, limit);
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="spotlight-scope">
      <style>{SPOTLIGHT_MODULE_TOKENS}</style>
      <div className="spotlight-module">
        <div className="spotlight-container">
          <div className="spotlight-module-heading">
            <div className="spotlight-eyebrow">
              <span>Researcher Spotlight</span>
              <span className="spotlight-arrow-diag" aria-hidden="true">
                &rarr;
              </span>
            </div>
            <h2 className="spotlight-module-h2">{heading}</h2>
          </div>

          <div className="spotlight-module-grid">
            {items.map((spotlight) => (
              <Link
                key={spotlight.slug}
                href={`/researcher-spotlight/${spotlight.slug}`}
                className="spotlight-module-card"
              >
                <div className="spotlight-module-tag">{spotlight.featureTag}</div>
                <h3
                  className="spotlight-module-title"
                  dangerouslySetInnerHTML={{ __html: spotlight.title }}
                />
                <div className="spotlight-module-pi">
                  {spotlight.piName} &middot; {spotlight.institution}
                </div>
                <span className="spotlight-module-cta">
                  Read Spotlight <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SPOTLIGHT_MODULE_TOKENS = `
.spotlight-scope {
  --sp-ink: #111111;
  --sp-ink-soft: #2a2a2a;
  --sp-paper: #fafaf7;
  --sp-rule: #1a1a1a;
  --sp-rule-soft: #cfcfc8;
  --sp-accent: #8b1a1a;
}
.spotlight-module {
  padding: 96px 0;
  border-top: 1px solid var(--sp-rule-soft);
  background: var(--sp-paper);
  color: var(--sp-ink);
  font-family: var(--font-poppins), system-ui, sans-serif;
}
.spotlight-module .spotlight-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 64px;
}
@media (max-width: 768px) {
  .spotlight-module { padding: 64px 0; }
  .spotlight-module .spotlight-container { padding: 0 24px; }
}
.spotlight-module .spotlight-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-weight: 600;
  margin-bottom: 24px;
}
.spotlight-module .spotlight-arrow-diag {
  display: inline-block;
  transform: rotate(-45deg);
  font-size: 14px;
}
.spotlight-module-h2 {
  font-family: var(--font-poppins), system-ui, sans-serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--sp-ink);
  margin: 0 0 48px;
}
.spotlight-module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (max-width: 900px) {
  .spotlight-module-grid { grid-template-columns: 1fr; gap: 24px; }
}
.spotlight-module-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 28px 32px;
  border-top: 1px solid var(--sp-rule);
  text-decoration: none;
  color: var(--sp-ink);
  transition: background 0.2s ease;
  min-height: 220px;
}
.spotlight-module-card:hover,
.spotlight-module-card:focus-visible {
  background: #f2f0e8;
  outline: none;
}
.spotlight-module-tag {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-weight: 600;
}
.spotlight-module-title {
  font-family: var(--font-poppins), system-ui, sans-serif;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 400;
  letter-spacing: -0.005em;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.spotlight-module-title em {
  font-style: italic;
  color: var(--sp-accent);
}
.spotlight-module-pi {
  font-size: 13px;
  line-height: 1.5;
  color: var(--sp-ink-soft);
  margin-top: auto;
  padding-top: 12px;
}
.spotlight-module-cta {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sp-accent);
  font-weight: 600;
  padding-top: 4px;
}
`;

export default SpotlightModule;
