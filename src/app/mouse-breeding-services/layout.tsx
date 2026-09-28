import { breedingFaqSchema, breedingServiceSchema } from './structuredData';

export { metadata } from './metadata';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breedingServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breedingFaqSchema) }}
      />
      {children}
    </>
  );
}
