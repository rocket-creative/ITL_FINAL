import type { Metadata } from 'next';
import LabSignalsWelcomeClient from './LabSignalsWelcomeClient';

export const metadata: Metadata = {
  title: 'Welcome to Lab Signals | ingenious targeting laboratory',
  description: 'Thank you for subscribing to Lab Signals. You now have full access to expert research insights and biweekly newsletters.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LabSignalsWelcomePage() {
  return <LabSignalsWelcomeClient />;
}
