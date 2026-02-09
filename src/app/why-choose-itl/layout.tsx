import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Choose ingenious targeting laboratory | 28 Years of Mouse Model Expertise',
  description:
    'Why researchers choose ingenious targeting laboratory for custom mouse models. 2,500+ projects, 800+ publications, pre germline characterization since 1998.',
  keywords:
    'why choose ingenious targeting laboratory, mouse model expertise, gene targeting experience, ES cell advantages, trusted mouse model provider',
};

export default function WhyChooseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
