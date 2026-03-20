import UXUIDCNavigation from './Navigation';
import UXUIDCFooter from './Footer';

/** Same outer frame as request-quote, contact, and start-your-project: 1200px column with nav and footer inside. */
export function ThankYouPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-wrapper" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      {children}
      <UXUIDCFooter />
    </div>
  );
}
