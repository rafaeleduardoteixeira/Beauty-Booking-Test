import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { Providers } from './providers/providers';

const inter = Roboto({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Beauty Booking',
  description: 'Book your beauty appointments online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
