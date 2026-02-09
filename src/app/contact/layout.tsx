import type { Metadata } from 'next';

// META from contact.md lines 1-4
export const metadata: Metadata = {
  title: 'Contact ingenious targeting laboratory | Request Quote, Schedule Consultation',
  description: 'Contact ingenious targeting laboratory for custom mouse model projects. Request quotes, schedule consultations, and discuss research needs.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
