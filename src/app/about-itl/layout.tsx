import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ingenious targeting laboratory | Custom Mouse Model Experts Since 1998',
  description: 'ingenious targeting laboratory has generated 2,500+ custom mouse models since 1998, contributing to 800+ publications. Learn about our mission and expertise.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
