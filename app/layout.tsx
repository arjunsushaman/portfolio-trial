import type { Metadata } from 'next';
import { Syne, Space_Grotesk, Fira_Code } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sushaman — Senior Frontend Developer',
  description:
    'Senior freelance frontend developer specializing in Next.js, React, and Shopify. Building performant, pixel-perfect web experiences for ambitious brands.',
  keywords: ['frontend developer', 'Next.js', 'React', 'Shopify', 'freelance', 'web development', 'TypeScript'],
  authors: [{ name: 'Arjun Sushaman Lakshmanan' }],
  creator: 'Arjun Sushaman Lakshmanan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sushaman — Senior Frontend Developer',
    description: 'Senior freelance frontend developer specializing in Next.js, React, and Shopify.',
    siteName: 'Sushaman Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sushaman — Senior Frontend Developer',
    description: 'Senior freelance frontend developer specializing in Next.js, React, and Shopify.',
    creator: '@sushaman',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
