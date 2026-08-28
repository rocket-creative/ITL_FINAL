import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule a Meeting',
  description: 'Book a free consultation with ingenious targeting laboratory scientific consultants to discuss your mouse model project. Get expert advice on targeting strategies, timelines, and more.',
  keywords: 'schedule consultation, mouse model meeting, ingenious consultation, scientific consultation, gene targeting meeting',
  openGraph: {
    title: 'Schedule a Meeting',
    description: 'Book a free consultation with ingenious targeting laboratory scientific consultants to discuss your mouse model project.',
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
