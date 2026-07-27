import Link from 'next/link';
import type { Spotlight } from '@/content/spotlights/_schema';

interface SpotlightModelSectionProps {
  spotlight: Spotlight;
}

const MODEL_HEADLINE: Record<string, string> = {
  knockin: 'Point mutation knockin, endogenous locus, C57BL/6.',
  knockout: 'Knockout at the endogenous locus, ready for functional interrogation.',
  conditional_knockout: 'Tissue specific conditional knockout, Cre driven, C57BL/6.',
  humanized: 'Humanized allele, endogenous regulation, C57BL/6.',
  transgenic: 'Transgenic overexpression, characterized cohorts, C57BL/6.',
  rat: 'Generated rat model, endogenous locus, defined background.',
};

const MODEL_CTA: Record<string, string> = {
  knockin: 'Explore Knockin Models',
  knockout: 'Explore Knockout Models',
  conditional_knockout: 'Explore Conditional Knockout Models',
  humanized: 'Explore Humanized Models',
  transgenic: 'Explore Transgenic Services',
  rat: 'Explore Rat Models',
};

export function SpotlightModelSection({ spotlight }: SpotlightModelSectionProps) {
  const headline = MODEL_HEADLINE[spotlight.modelType] ?? spotlight.modelTypeDisplay;
  const ctaLabel = MODEL_CTA[spotlight.modelType] ?? 'Explore Model Types';

  return (
    <section className="spotlight-model-section" aria-label="The model">
      <div className="spotlight-model-section-inner">
        <div className="spotlight-model-grid">
          <div className="spotlight-model-heading-col">
            <div className="spotlight-eyebrow">
              <span>The Model</span>
              <span className="spotlight-arrow-diag" aria-hidden="true">
                &rarr;
              </span>
            </div>
            <h2>{headline}</h2>
            <Link href={spotlight.modelTypePageUrl} className="spotlight-model-cta">
              <span>{ctaLabel}</span>
              <span className="spotlight-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>

          <div className="spotlight-model-detail-rows">
            {spotlight.modelDetails.map((row, idx) => (
              <div key={`${row.label}-${idx}`} className="spotlight-model-detail-row">
                <div className="spotlight-model-detail-label">{row.label}</div>
                <div
                  className="spotlight-model-detail-value"
                  dangerouslySetInnerHTML={{ __html: row.value }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpotlightModelSection;
