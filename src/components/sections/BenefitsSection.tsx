// src/components/sections/BenefitsSection.tsx
import Link from 'next/link';

const benefits = [
  { num: 1,  label: 'Boosts Stamina & Endurance',          desc: 'Increases physical stamina for longer performance' },
  { num: 2,  label: 'Improves Sexual Performance',          desc: 'Supports healthy libido and sexual function' },
  { num: 3,  label: 'Enhances Energy & Vitality',           desc: 'Reduces weakness, all-day natural energy' },
  { num: 4,  label: 'Supports Sperm Count & Quality',       desc: 'Improves reproductive health naturally' },
  { num: 5,  label: 'Reduces Stress & Improves Mood',       desc: 'Adaptogenic herbs calm stress and anxiety' },
  { num: 6,  label: '100% Natural & Safe',                  desc: 'No chemicals, no side effects, safe for regular use' },
  { num: 7,  label: 'Better Performance',                   desc: 'Enhances confidence and daily performance' },
  { num: 8,  label: 'Healthy Libido',                       desc: 'Supports healthy desire and drive naturally' },
  { num: 9,  label: 'Hormonal Balance',                     desc: 'Supports natural testosterone and hormone levels' },
  { num: 10, label: 'Reproductive Health',                  desc: 'Complete support for male reproductive system' },
  { num: 11, label: 'Overall Well-being',                   desc: 'Nourishes the whole body from within' },
  { num: 12, label: 'Supports Immune System',               desc: 'Strengthens immunity with powerful herbs' },
];

export function BenefitsSection() {
  return (
    <div className="king-bg py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-center text-[#FFD700] font-bold text-xl mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
          BENEFITS OF AFRICAN KING HERBAL POWER
        </h2>

        {/* Benefits list */}
        <div className="space-y-3">
          {benefits.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-4 rounded-xl px-4 py-3"
              style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-[#1A0F00] font-black text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8B6914, #D4A017)' }}
              >
                {b.num}
              </div>
              <div>
                <div className="text-[#F5E6C8] font-bold text-sm">{b.label}</div>
                <div className="text-[#F5E6C8]/60 text-xs mt-0.5">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="text-center mt-6 space-y-2">
          <div className="text-[#FFD700] font-bold text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
            100% NATURAL | 15+ HERBS | NO CHEMICALS
          </div>
          <Link href="/cart">
            <button className="btn-gold mt-3 px-10 py-3">ORDER NOW — ₹1,199</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
