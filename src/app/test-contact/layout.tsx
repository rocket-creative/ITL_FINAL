import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Contact (Internal) | ingenious targeting laboratory',
  description: 'Internal team only page for testing HubSpot contact form embeds. Not for public use.',
  alternates: {
    canonical: 'https://www.genetargeting.com/test-contact/',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function TestContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
