import type { Spotlight } from '@/content/spotlights/_schema';

interface SpotlightHeroProps {
  spotlight: Spotlight;
}

function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function SpotlightHero({ spotlight }: SpotlightHeroProps) {
  return (
    <>
      <div className="spotlight-meta-bar">
        <div className="spotlight-container">
          <div className="spotlight-meta-bar-inner">
            <div className="spotlight-meta-bar-left">
              <span className="spotlight-meta-tag">ingenious targeting laboratory</span>
              <span>/ Researcher Spotlight</span>
            </div>
            <div>
              {spotlight.spotlightNumber} &middot; {formatMonthYear(spotlight.publishDate)}
            </div>
          </div>
        </div>
      </div>

      <section className="spotlight-hero">
        <div className="spotlight-container">
          <div className="spotlight-hero-label">
            <span>Feature</span>
            <span className="spotlight-thin-rule" aria-hidden="true" />
            <span>{spotlight.featureTag}</span>
          </div>

          <div className="spotlight-hero-grid">
            <div>
              <h1
                className="spotlight-hero-title"
                dangerouslySetInnerHTML={{ __html: spotlight.title }}
              />
              <p className="spotlight-hero-subtitle">{spotlight.subtitle}</p>
            </div>

            <aside className="spotlight-hero-aside" aria-label="Spotlight metadata">
              <div className="spotlight-hero-aside-item">
                <div className="spotlight-hero-aside-label">Principal Investigator</div>
                <div className="spotlight-hero-aside-value">{spotlight.piName}</div>
              </div>
              <div className="spotlight-hero-aside-item">
                <div className="spotlight-hero-aside-label">Institution</div>
                <div className="spotlight-hero-aside-value">{spotlight.institution}</div>
              </div>
              <div className="spotlight-hero-aside-item">
                <div className="spotlight-hero-aside-label">Published</div>
                <div
                  className="spotlight-hero-aside-value"
                  dangerouslySetInnerHTML={{
                    __html: `<em>${spotlight.journal}</em>, ${formatMonthYear(spotlight.publishDate)}`,
                  }}
                />
              </div>
              <div className="spotlight-hero-aside-item">
                <div className="spotlight-hero-aside-label">ingenious Contribution</div>
                <div className="spotlight-hero-aside-value">{spotlight.modelTypeDisplay}</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default SpotlightHero;
