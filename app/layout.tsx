import type { Metadata } from 'next';
import { LayoutWrapper } from '@components/templates/LayoutWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'Book your beauty appointments online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
