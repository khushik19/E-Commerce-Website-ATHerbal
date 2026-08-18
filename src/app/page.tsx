import Link from 'next/link';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { IngredientsSection } from '../components/sections/IngredientsSection';
import { HowToUseSection } from '../components/sections/HowToUseSection';
import { ReviewsSection } from '../components/sections/ReviewsSection';

export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[calc(100vh-60px)] md:min-h-screen flex flex-col justify-end pb-8">
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

        {/* ── ORDER NOW CTA – pinned to bottom of hero ── */}
        <div className="relative z-20 flex justify-center px-6 mt-auto">
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
      </section>

      {/* ── SCROLLABLE SECTIONS BELOW HOME ── */}
      <section id="benefits" className="scroll-mt-16">
        <BenefitsSection />
      </section>

      <section id="ingredients" className="scroll-mt-16">
        <IngredientsSection />
      </section>

      <section id="how-to-use" className="scroll-mt-16">
        <HowToUseSection />
      </section>

      <section id="reviews" className="scroll-mt-16">
        <ReviewsSection />
      </section>
    </main>
  );
}
