import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ITL | Custom Mouse Models Since 1998',
  description: 'Since 1998, ingenious targeting laboratory has generated 2,500+ custom mouse, rat, and rabbit models for researchers worldwide. All work performed in the USA.',
  alternates: {
    canonical: 'https://www.genetargeting.com/about-itl',
  },
  openGraph: {
    title: 'About ingenious targeting laboratory',
    description: 'Leading provider of custom genetically modified mouse models. 2,500+ projects completed, 800+ publications, 26+ years experience.',
    url: 'https://www.genetargeting.com/about-itl',
    siteName: 'ingenious targeting laboratory',
    images: [{
      url: 'https://www.genetargeting.com/images/mouse-hero-blue.jpg',
      width: 1200,
      height: 630,
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ingenious targeting laboratory',
    description: 'Custom mouse models since 1998. 2,500+ projects, 800+ publications. All work performed in the USA.',
    images: ['https://www.genetargeting.com/images/mouse-hero-blue.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
