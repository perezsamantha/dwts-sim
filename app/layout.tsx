import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DWTS Sim',
  description: 'Dancing with the Stars Simulator',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['dwts sim', 'dwts', 'dancing with the stars', 'simulator'],
  authors: [{ name: 'Samantha Perez' }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: 'rgb(24,29,38)' },
  ],
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
        <Analytics />
      </body>
    </html>
  );
}
