/**
 * Featured Model of the Month Layout
 * Exports metadata for SEO (page is client component and cannot export metadata)
 */

export { metadata } from './metadata';

export default function FeaturedModelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
