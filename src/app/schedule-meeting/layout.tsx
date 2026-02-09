import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule a Meeting | ingenious targeting laboratory',
  description: 'Book a free consultation with ITL scientific consultants to discuss your mouse model project. Get expert advice on targeting strategies, timelines, and more.',
  keywords: 'schedule consultation, mouse model meeting, ITL consultation, scientific consultation, gene targeting meeting',
  openGraph: {
    title: 'Schedule a Meeting | ingenious targeting laboratory',
    description: 'Book a free consultation with ITL scientific consultants to discuss your mouse model project.',
    type: 'website',
  },
};

export default function ScheduleMeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
