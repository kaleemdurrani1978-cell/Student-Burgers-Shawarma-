import type { Metadata, Viewport } from 'next';
import './globals.css';
import SiteShell from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Student Burgers & Shawarmas | Shawarma, Burgers & Deals (Lahore)',
  description:
    'Authentic chicken shawarma, zinger burgers, platters, paratha rolls, and budget student deals at 61 Shalimar Link Road, Ramgarh, Lahore. Order direct on WhatsApp or Dine-In with QR.',
  keywords: [
    'Student Burgers & Shawarmas',
    'Student Burgers & Shawarmas Lahore',
    'Student Burgers and Shawarmas Lahore',
    '61 Shalimar Link Road Ramgarh Lahore food',
    'Zinger burger Lahore',
    'Shawarma delivery Lahore',
    'Student Deals fast food',
  ],
  authors: [{ name: 'Student Burgers & Shawarmas' }],
  creator: 'Durrani Web Developers',
  publisher: 'Student Burgers & Shawarmas',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Student Burgers & Shawarmas | 61 Shalimar Link Road, Ramgarh, Lahore',
    description:
      'Craving fresh, spicy chicken shawarma and crispy zinger burgers? View our verified menu and order directly via WhatsApp or scan table QR to dine in!',
    url: '/',
    siteName: 'Student Burgers & Shawarmas',
    images: [
      {
        url: '/images/hero/hero-shawarma.webp',
        width: 1200,
        height: 630,
        alt: 'Fresh chicken shawarma',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/branding/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#f59e0b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FastFoodRestaurant',
    name: 'Student Burgers & Shawarmas',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    telephone: '+923094222283',
    servesCuisine: ['Fast Food', 'Pakistani', 'Shawarma', 'Burgers'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '61 Shalimar Link Road',
      addressLocality: 'Ramgarh, Lahore',
      addressRegion: 'Punjab',
      postalCode: '54000',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.5796',
      longitude: '74.3792',
    },
    priceRange: 'PKR 150 - PKR 1700',
    sameAs: ['https://www.facebook.com/people/Student-pizza-Fastfood/100089295146903/'],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0c0a09] text-zinc-100 antialiased selection:bg-amber-500 selection:text-zinc-950">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
