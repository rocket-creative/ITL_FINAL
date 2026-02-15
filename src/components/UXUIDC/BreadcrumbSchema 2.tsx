/**
 * Breadcrumb Schema Component
 * Renders Schema.org BreadcrumbList structured data
 * Used site-wide for SEO enhancement
 */

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BASE_URL = 'https://www.genetargeting.com';

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const normalizedPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
      const fullUrl = `${BASE_URL}${normalizedPath}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
