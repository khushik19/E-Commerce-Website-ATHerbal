'use client';
// src/app/about/page.tsx
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-24">
      <div className="max-w-lg mx-auto space-y-6">

        <div className="text-center mb-6">
          <h1 className="text-[#F5E6C8] text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>About Us</h1>
          <p className="text-[#F5E6C8]/60 text-sm mt-2 leading-relaxed">
            Rooted in Ayurveda. Committed to men&apos;s natural strength.
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/home_hero.png"
            alt="African King Herbal logo"
            width={96}
            height={96}
            className="rounded-2xl object-contain"
            style={{ border: '1px solid rgba(212,160,23,0.4)' }}
          />
        </div>

        {/* Brand Story */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
          <p className="text-[#FFD700] font-bold text-sm mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Our Story</p>
          <p className="text-[#F5E6C8]/70 text-xs leading-relaxed">
            African King Herbal was born from a deep belief that nature provides the most powerful solutions
            for men&apos;s health. We blend 15+ time-tested Ayurvedic herbs into a single, potent formula
            designed to support stamina, energy, strength and reproductive health — without any added
            chemicals or synthetic fillers.
          </p>
        </div>

        {/* Mission */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
          <p className="text-[#FFD700] font-bold text-sm mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Our Mission</p>
          <p className="text-[#F5E6C8]/70 text-xs leading-relaxed">
            To make genuine Ayurvedic men&apos;s wellness accessible to every household in India. We are
            committed to transparency, quality, and honesty — from our ingredients to our pricing.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
          <p className="text-[#FFD700] font-bold text-sm mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Why Choose Us?</p>
          <div className="space-y-2 text-[#F5E6C8]/70 text-xs">
            {[
              'Made with 15+ Powerful Herbal Ingredients',
              '100% Natural & Herbal Formula',
              'No Harmful Chemicals Added',
              'Supports Energy & Stamina Naturally',
              'Safe & Effective for Regular Use',
              'Premium Quality Herbal Blend',
            ].map((item) => (
              <div key={item} className="flex gap-2 items-start">
                <span className="text-[#D4A017] font-bold shrink-0">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact teaser */}
        <div
          className="rounded-xl p-4 text-[#F5E6C8]/60 text-xs text-center leading-relaxed"
          style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}
        >
          Have questions? Visit our{' '}
          <a href="/contact" className="text-[#D4A017] underline font-semibold">Contact page</a>
          {' '}or reach us on WhatsApp — we&apos;re happy to help.
        </div>

      </div>
    </div>
  );
}
