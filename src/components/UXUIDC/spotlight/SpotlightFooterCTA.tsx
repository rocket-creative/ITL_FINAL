import Link from 'next/link';
import type { ModelType } from '@/content/spotlights/_schema';

interface SpotlightFooterCTAProps {
  modelType: ModelType;
}

const FOOTER_CTA_HEADLINES: Record<ModelType, string> = {
  knockin: 'Planning a knockin that needs to preserve endogenous regulation?',
  conditional_knockout: 'Planning a conditional knockout for tissue specific studies?',
  knockout: 'Planning a knockout model for your target gene?',
  humanized: 'Building a humanized model for translational research?',
  transgenic: 'Considering a transgenic for your research question?',
  rat: 'Designing a rat model for your study?',
};

export function SpotlightFooterCTA({ modelType }: SpotlightFooterCTAProps) {
  return (
    <section className="spotlight-footer-cta" aria-label="Start your project">
      <div className="spotlight-container">
        <div className="spotlight-footer-cta-inner">
          <h2>{FOOTER_CTA_HEADLINES[modelType]}</h2>
          <Link href="/request-quote/" className="spotlight-primary-link">
            <span>Start Your Project</span>
            <span className="spotlight-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SpotlightFooterCTA;
