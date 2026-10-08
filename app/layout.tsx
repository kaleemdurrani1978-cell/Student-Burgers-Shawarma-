import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import TableParamDetector from '@/components/TableParamDetector';

export const metadata: Metadata = {
  title: 'Student Shawarma & Fast Food | Authentic Shawarma, Burgers & Deals (Lahore)',
  description:
    'Authentic chicken shawarma, zinger burgers, platters, paratha rolls, and budget student deals in Shalimar Link Road, Lahore. Order direct on WhatsApp or Dine-In with QR.',
  keywords: [
    'Student Shawarma',
    'Student Shawarma Lahore',
    'Student Pizza Fastfood',
    'Shalimar Link Road Lahore food',
    'Zinger burger Lahore',
    'Shawarma delivery Lahore',
    'Student Deals fast food',
  ],
  authors: [{ name: 'Student Shawarma' }],
  creator: 'Student Shawarma',
  publisher: 'Student Shawarma',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Student Shawarma | Shalimar Link Road, Lahore',
    description:
      'Craving fresh, spicy chicken shawarma and crispy zinger burgers? View our verified menu and order directly via WhatsApp or scan table QR to dine in!',
    url: '/',
    siteName: 'Student Shawarma',
    images: [
      {
        url: '/images/hero/hero-food-banner.webp',
        width: 1200,
        height: 630,
        alt: 'Student Shawarma Fast Food Feast',
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
    name: 'Student Shawarma & Fast Food',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    telephone: '+923094222283',
    servesCuisine: ['Fast Food', 'Pakistani', 'Shawarma', 'Burgers'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shalimar Link Road, Ramgarh',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      postalCode: '54000',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.5796',
      longitude: '74.3792',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '13:00',
        closes: '01:00',
      },
    ],
    priceRange: 'PKR 120 - PKR 2100',
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
        <CartProvider>
          <TableParamDetector />
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
