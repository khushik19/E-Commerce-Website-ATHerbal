import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      className="relative w-full overflow-x-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Art-directed background image */}
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 768px)" srcSet="/images/laptop_hero.png" />
        <source media="(max-width: 767px)" srcSet="/images/mobile_hero.png" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mobile_hero.png"
          alt="African King Herbal Power Powder — 15+ Ayurvedic herbs for men's strength and stamina"
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
        />
      </picture>

      {/* Subtle bottom gradient so CTA button pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

      {/* ── ORDER NOW CTA – pinned to bottom centre ── */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center px-6">
        <Link href="/cart" className="w-full max-w-[300px]">
          <button
            id="home-order-btn"
            className="btn-gold w-full py-3.5"
            style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }}
          >
            ORDER NOW — ₹1,199
          </button>
        </Link>
      </div>
    </main>
  );
}
