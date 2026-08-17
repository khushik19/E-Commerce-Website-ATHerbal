// src/app/ingredients/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Key Ingredients | African King Herbal Power Powder',
  description:
    '15+ Ayurvedic herbs including Ashwagandha, Safed Musli, Shatavari, Gokshura, Vidarikand, Kaunch Beej, Kapikachhu, Jaiphal, Musli Safed, Bala and more.',
};

const ingredients = [
  { name: 'Ashwagandha',  benefit: 'Reduces stress & boosts stamina',          image: '/images/herb_ashwagandha.png' },
  { name: 'Safed Musli',  benefit: 'Improves vitality & strength',              image: '/images/herb_safed_musli.png' },
  { name: 'Shatavari',    benefit: 'Boosts libido & hormonal balance',          image: '/images/herb_shatavari.png' },
  { name: 'Gokshura',     benefit: 'Enhances testosterone & stamina',           image: '/images/herb_gokshura.png' },
  { name: 'Vidarikand',   benefit: 'Nourishes body & boosts energy',            image: '/images/herb_vidarikand.png' },
  { name: 'Kaunch Beej',  benefit: 'Improves sperm quality & desire',           image: '/images/herb_kaunch_beej.png' },
  { name: 'Kapikachhu',   benefit: 'Supports healthy libido & sperm',           image: '/images/herb_kapikachhu.png' },
  { name: 'Jaiphal',      benefit: 'Improves circulation & performance',        image: '/images/herb_jaiphal.png' },
  { name: 'Musli Safed',  benefit: 'Boosts stamina & physical strength',        image: '/images/herb_musli_safed.png' },
  { name: 'Bala',         benefit: 'Relieves weakness & improves endurance',    image: '/images/herb_bala.png' },
];

const extraBenefits = [
  { title: '100% HERBAL', desc: 'Only natural Ayurvedic herbs' },
  { title: 'NO CHEMICALS', desc: 'Safe for regular use' },
  { title: '15+ HERBS', desc: 'Powerful multi-herb formula' },
];

export default function IngredientsPage() {
  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">


        <h1 className="text-center text-[#FFD700] font-bold text-lg mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
          KEY INGREDIENTS — 15+ HERBS
        </h1>

        {/* Ingredient grid with images */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {ingredients.map((ing) => (
            <div
              key={ing.name}
              className="rounded-xl overflow-hidden flex flex-col"
              style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={ing.image}
                  alt={ing.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 200px"
                />
                {/* Gold overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1A0F00]/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="text-[#FFD700] font-bold text-xs leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                    {ing.name}
                  </div>
                </div>
              </div>
              <div className="px-2 py-2">
                <span className="text-[#F5E6C8]/65 text-xs leading-tight">{ing.benefit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Extra benefits row */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {extraBenefits.map((b) => (
            <div
              key={b.title}
              className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              <div className="text-[#FFD700] font-bold text-xs leading-tight">{b.title}</div>
              <div className="text-[#F5E6C8]/60 text-xs mt-0.5">{b.desc}</div>
            </div>
          ))}
        </div>

        {/* 15+ herbs banner */}
        <div
          className="rounded-xl p-4 text-center mb-5"
          style={{ background: 'rgba(45,26,0,0.8)', border: '1px solid rgba(212,160,23,0.3)' }}
        >
          <div className="text-[#FFD700] font-bold text-sm mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
            15+ POWERFUL HERBAL FORMULA
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Boosts Stamina', 'Improves Libido', 'Increases Energy',
              'Hormonal Balance', 'Reproductive Health', 'Reduces Stress',
            ].map((tag) => (
              <span
                key={tag}
                className="text-[#F5E6C8]/80 text-xs px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.25)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center text-[#FFD700] text-sm font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
          NATURAL STRENGTH | BETTER YOU
        </div>

        <Link href="/cart">
          <button className="btn-gold w-full py-3">ORDER NOW — ₹1,199</button>
        </Link>
      </div>
    </div>
  );
}
