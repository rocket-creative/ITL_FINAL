import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Thank You for Your Quote Request',
  description:
    'Your quote request was received. A scientific consultant will contact you within one business day.',
  path: '/request-quote/thank-you',
  index: false,
  follow: false,
});
