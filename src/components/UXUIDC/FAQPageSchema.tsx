/**
 * FAQPage Schema Component
 * Generates JSON-LD FAQPage schema for rich snippets in search results
 * Use on any page with FAQ sections to enable FAQ rich results
 */

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQPageSchemaProps {
  faqs: FAQ[];
}

export default function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  // Convert React nodes to plain text for schema
  const cleanAnswer = (answer: string | React.ReactNode): string => {
    if (typeof answer === 'string') {
      return answer;
    }
    // For React nodes, try to extract text content
    // This is a simplified approach - for complex React nodes, 
    // consider passing a separate plainTextAnswer prop
    return String(answer);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: cleanAnswer(faq.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
