import Link from 'next/link';
import type { Spotlight } from '@/content/spotlights/_schema';

interface SpotlightIndexCardProps {
  spotlight: Spotlight;
}

export function SpotlightIndexCard({ spotlight }: SpotlightIndexCardProps) {
  const year = new Date(spotlight.publishDate).getFullYear();
  return (
    <Link
      href={`/researcher-spotlight/${spotlight.slug}`}
      className="spotlight-index-card"
      aria-label={`Read Spotlight: ${spotlight.piName}, ${spotlight.institution}`}
    >
      <div className="spotlight-index-meta">
        <div className="spotlight-index-number">{spotlight.spotlightNumber}</div>
        <div className="spotlight-index-tag">{spotlight.featureTag}</div>
        <div className="spotlight-index-pi">{spotlight.piName}</div>
        <div className="spotlight-index-institution">
          {spotlight.institution} &middot; {year}
        </div>
      </div>

      <div className="spotlight-index-body">
        <h3
          className="spotlight-index-title"
          dangerouslySetInnerHTML={{ __html: spotlight.title }}
        />
        <p className="spotlight-index-subtitle">{spotlight.subtitle}</p>
        <span className="spotlight-index-cta">
          Read Spotlight <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

export default SpotlightIndexCard;
