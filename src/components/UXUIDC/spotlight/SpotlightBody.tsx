import type { Spotlight } from '@/content/spotlights/_schema';
import { SpotlightPullquote } from './SpotlightPullquote';

interface SpotlightBodyProps {
  spotlight: Spotlight;
}

function renderParagraphs(source: string, firstClass?: string) {
  const paragraphs = source
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((html, idx) => (
    <p
      key={idx}
      className={idx === 0 && firstClass ? firstClass : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ));
}

function buildAttribution(spotlight: Spotlight): string {
  const first = spotlight.paperCitation.split(',')[0] ?? spotlight.piLastName;
  const lead = first.trim().split(/\s+/)[0] || spotlight.piLastName;
  const year = new Date(spotlight.publishDate).getFullYear();
  return `${lead} et al., ${spotlight.journal}, ${year}`;
}

export function SpotlightBody({ spotlight }: SpotlightBodyProps) {
  const { bodyIntro, bodyTheModel, bodyTheResult, bodyWhyItMatters, pullQuote, subtitle } =
    spotlight;

  const hasAnyBody = Boolean(
    bodyIntro.trim() || bodyTheModel.trim() || bodyTheResult.trim() || bodyWhyItMatters.trim(),
  );

  if (!hasAnyBody) {
    return null;
  }

  const attribution = buildAttribution(spotlight);
  const showPullquoteAfterResult = Boolean(pullQuote && bodyTheResult.trim() && bodyWhyItMatters.trim());
  const showPullquoteFallback = Boolean(pullQuote) && !showPullquoteAfterResult;

  return (
    <section className="spotlight-body-section" aria-label="The science">
      <div className="spotlight-container">
        <div className="spotlight-body-grid">
          <aside className="spotlight-body-label">The Science</aside>

          <div className="spotlight-body-content">
            <h2>{subtitle}</h2>

            {bodyIntro.trim() ? renderParagraphs(bodyIntro, 'spotlight-body-first') : null}

            {bodyTheModel.trim() ? (
              <>
                <h3>The model</h3>
                {renderParagraphs(bodyTheModel)}
              </>
            ) : null}

            {bodyTheResult.trim() ? (
              <>
                <h3>The result</h3>
                {renderParagraphs(bodyTheResult)}
              </>
            ) : null}

            {showPullquoteAfterResult ? (
              <SpotlightPullquote quote={pullQuote} attribution={attribution} />
            ) : null}

            {bodyWhyItMatters.trim() ? (
              <>
                <h3>Why it matters</h3>
                {renderParagraphs(bodyWhyItMatters)}
              </>
            ) : null}

            {showPullquoteFallback ? (
              <SpotlightPullquote quote={pullQuote} attribution={attribution} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpotlightBody;
