import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';
import ErrorBoundary from '@/components/error-boundary';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  display: 'swap',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-medium focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <Providers>
            <Header />
            <main id="main-content" className="min-h-screen" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </Providers>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}