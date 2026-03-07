/**
 * Catalog Mouse Models Layout
 * Exports metadata for SEO (page is client component and cannot export metadata)
 */

export { metadata } from './metadata';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
