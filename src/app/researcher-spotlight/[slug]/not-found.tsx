import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Spotlight Not Found | ingenious targeting laboratory',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="spotlight-notfound">
      <div className="spotlight-container">
        <h1>Spotlight Not Found</h1>
        <p>We could not locate that Researcher Spotlight. It may have been moved or retitled.</p>
        <Link href="/researcher-spotlight/">Back to Researcher Spotlight</Link>
      </div>
    </div>
  );
}
