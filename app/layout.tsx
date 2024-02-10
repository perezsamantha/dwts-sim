import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DWTS Sim',
  description: 'Dancing with the Stars Simulator',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'dwts sim',
    'dancing with the stars sim',
    'dwts simulator',
    'dancing with the stars simulator',
    'simulator',
    'dwtssim',
  ],
  authors: [{ name: 'Samantha Perez' }],
};

export const viewport: Viewport = {
  themeColor: '#CBD5E0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="icons/icon-256x256.png"
          type="image/png"
          sizes="256x256"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
