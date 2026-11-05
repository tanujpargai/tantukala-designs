import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/ecommerce/CartDrawer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tantukala Designs | Where Heritage Becomes Art | Handcrafted Indian Textiles & Folk Art',
  description:
    'Contemporary Indian craft house celebrating authentic handlooms, sacred Madhubani art panels, Sujni running-stitch, and Kutch nomad weaves. Direct artisan provenance.',
  keywords: [
    'Tantukala Designs',
    'Indian handloom',
    'Madhubani art',
    'Tussar silk saree',
    'Sujni embroidery',
    'Kutch Rabari craft',
    'Bela block print',
    'artisan textiles',
    'luxury Indian heritage',
  ],
  authors: [{ name: 'Tantukala Designs' }],
  metadataBase: new URL('https://tantukaladesigns.com'),
  openGraph: {
    title: 'Tantukala Designs | Threads of a Living Heritage',
    description:
      'Discover rare authentic Indian handlooms, sacred Madhubani art panels, and artisanal living textiles.',
    url: 'https://tantukaladesigns.com',
    siteName: 'Tantukala Designs',
    images: [
      {
        url: '/images/craft-hero.avif',
        width: 1200,
        height: 630,
        alt: 'Tantukala Designs - Indian Handloom & Folk Art',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

import { ClientExperienceShell } from '@/components/layout/ClientExperienceShell';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-ivory-100 text-charcoal selection:bg-terracotta selection:text-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ClientExperienceShell>
                <AnnouncementBar />
                <Navbar />
                <main className="flex-1">{children}</main>
                <CartDrawer />
                <Footer />
              </ClientExperienceShell>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
