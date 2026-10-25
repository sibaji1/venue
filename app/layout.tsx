import type {Metadata} from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AuraFeast - AI Wedding Catering & Vendor Matchmaker',
  description: 'Smart wedding catering, marriage halls, and decor vendor marketplace with AI budget matching, custom menu planning, and instant package quotes.',
  openGraph: {
    title: 'AuraFeast - AI Wedding Catering & Vendor Matchmaker',
    description: 'Smart wedding catering, marriage halls, and decor vendor marketplace with AI budget matching, custom menu planning, and instant package quotes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraFeast - AI Wedding Catering & Vendor Matchmaker',
    description: 'Smart wedding catering, marriage halls, and decor vendor marketplace with AI budget matching, custom menu planning, and instant package quotes.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
