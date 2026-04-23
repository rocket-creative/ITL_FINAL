import type { Spotlight } from '@/content/spotlights/_schema';

interface SpotlightCitationProps {
  spotlight: Spotlight;
}

export function SpotlightCitation({ spotlight }: SpotlightCitationProps) {
  return (
    <section className="spotlight-citation" aria-label="Citation">
      <div className="spotlight-container">
        <div className="spotlight-citation-inner">
          <div className="spotlight-citation-label">Citation</div>
          <div
            className="spotlight-citation-text"
            dangerouslySetInnerHTML={{ __html: spotlight.paperCitation }}
          />
          <a
            href={spotlight.pubmedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotlight-citation-action"
          >
            Read on PubMed &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

export default SpotlightCitation;
