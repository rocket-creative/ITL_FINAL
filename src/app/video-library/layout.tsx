import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Library',
  description: 'Watch educational videos about mouse model generation, gene targeting technologies, humanized mice, and research applications from ingenious targeting laboratory.',
  keywords: 'mouse model videos, gene targeting education, humanized mice tutorial, knockout mouse video, ingenious videos',
  openGraph: {
    title: 'Video Library',
    description: 'Watch educational videos about mouse model generation, gene targeting technologies, and research applications.',
    type: 'website',
  },
};

export default function VideoLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
