import type { Spotlight } from '@/content/spotlights/_schema';

interface SpotlightResearcherCardProps {
  spotlight: Spotlight;
}

function renderParagraphs(source: string) {
  return source
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((html, idx) => <p key={idx} dangerouslySetInnerHTML={{ __html: html }} />);
}

export function SpotlightResearcherCard({ spotlight }: SpotlightResearcherCardProps) {
  const linkLabel = spotlight.institution
    ? `${spotlight.institution} Faculty Profile`
    : 'Lab Website';

  return (
    <section className="spotlight-researcher-section" aria-label="About the lab">
      <div className="spotlight-container">
        <div className="spotlight-researcher-grid">
          <aside className="spotlight-body-label">About the Lab</aside>

          <div className="spotlight-researcher-card">
            <h2>The {spotlight.piLastName} Lab</h2>
            {renderParagraphs(spotlight.labBio)}
            {spotlight.collaborators ? renderParagraphs(spotlight.collaborators) : null}

            <div className="spotlight-researcher-links">
              <div className="spotlight-researcher-link-row">
                <div className="spotlight-researcher-link-label">Lab Website</div>
                <div>
                  <a
                    href={spotlight.institutionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkLabel} &rarr;
                  </a>
                </div>
              </div>
              <div className="spotlight-researcher-link-row">
                <div className="spotlight-researcher-link-label">Published In</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<em>${spotlight.journal}</em>, ${new Date(spotlight.publishDate).getFullYear()}`,
                  }}
                />
              </div>
              <div className="spotlight-researcher-link-row">
                <div className="spotlight-researcher-link-label">DOI</div>
                <div>
                  <a href={spotlight.doiUrl} target="_blank" rel="noopener noreferrer">
                    {spotlight.doi}
                  </a>
                </div>
              </div>
              <div className="spotlight-researcher-link-row">
                <div className="spotlight-researcher-link-label">Funding</div>
                <div>{spotlight.funding}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpotlightResearcherCard;
