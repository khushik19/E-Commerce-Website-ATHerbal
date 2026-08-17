import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { BottomBar } from '@/components/layout/BottomBar';
import { LoginPopup } from '@/components/popups/LoginPopup';
import { CallButton } from '@/components/ui/CallButton';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'African King Herbal Power Powder | Boost Stamina, Strength & Energy — 15+ Herbs',
  description:
    'African King Herbal Power Powder — 100% natural herbal supplement for men. 15+ powerful Ayurvedic herbs. Boost stamina, energy, strength and performance. Pan India delivery. Prepaid ₹1,199 | COD ₹1,599.',
  keywords:
    'african king herbal, herbal power powder for men, stamina booster, ayurvedic supplement men, sexual strength herbal, ashwagandha safed musli, male vitality powder, boost energy men india',
  openGraph: {
    title: 'African King Herbal Power Powder | 15+ Herbs | ₹1,199',
    description:
      'Naturally boost strength, stamina & energy. Made with 15+ Ayurvedic herbs. 100% natural. Pan India shipping.',
    images: ['/images/mobile_hero.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'African King Herbal Power Powder',
    images: ['/images/mobile_hero.png'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'African King Herbal Power Powder',
  description:
    '100% natural herbal supplement for men made with 15+ Ayurvedic herbs. Boosts stamina, energy, strength and reproductive health.',
  brand: { '@type': 'Brand', name: 'African King Herbal' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '1199',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'African King Herbal' },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '300',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A0F00" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="African King" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:wght@300;400;700;900&family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {/* Fixed background — always visible behind every page */}
        <div className="global-bg-layer" aria-hidden="true" />

        {/* All page content sits above the background */}
        <div className="page-content">
          <Navbar />
          <main className="pt-[72px] pb-24">{children}</main>
          <BottomBar />
          <CallButton />
          <LoginPopup />
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </div>
      </body>
    </html>
  );
}
