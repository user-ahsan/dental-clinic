import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SmileCare Dental',
  description:
    'Your trusted dental clinic for comprehensive oral care — from routine cleanings to advanced cosmetic dentistry.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}