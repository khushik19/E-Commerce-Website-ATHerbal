// src/components/sections/HowToUseSection.tsx
import Link from 'next/link';

const steps = [
  {
    step: 1,
    title: 'Morning Dose',
    desc: 'Take 1 spoon after breakfast with warm milk.',
    time: 'After Breakfast',
  },
  {
    step: 2,
    title: 'Evening Dose',
    desc: 'Take 1 spoon after dinner with warm milk.',
    time: 'After Dinner',
  },
  {
    step: 3,
    title: 'Healthy Diet',
    desc: 'Maintain a healthy diet and proper routine for best results. Avoid junk food and alcohol.',
    time: 'Daily',
  },
  {
    step: 4,
    title: 'Stay Active',
    desc: 'Light exercise and a regular sleep routine will significantly speed up results.',
    time: 'Daily',
  },
  {
    step: 5,
    title: 'Use Regularly',
    desc: 'Use consistently without missing doses. Results improve significantly with regular use.',
    time: 'Every Day',
  },
];

export function HowToUseSection() {
  return (
    <div className="king-bg py-10 px-4 border-t border-[#D4A017]/20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-[#FFD700] text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>How to Use</h2>
          <p className="text-[#F5E6C8]/60 text-sm mt-1">Simple steps for the best results</p>
          <div
            className="mt-3 inline-block rounded-full px-4 py-1.5 text-[#FFD700] text-xs font-medium"
            style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            1 Spoon Twice Daily with Warm Milk
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex gap-4 rounded-2xl p-4"
              style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.25)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-[#1A0F00] font-black text-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8B6914, #D4A017)' }}
              >
                {s.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#F5E6C8] font-bold text-sm">{s.title}</span>
                  <span
                    className="text-[#F5E6C8]/60 text-xs ml-auto px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(212,160,23,0.12)' }}
                  >
                    {s.time}
                  </span>
                </div>
                <p className="text-[#F5E6C8]/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div
          className="rounded-2xl p-5 mb-5"
          style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.3)' }}
        >
          <h3 className="text-[#FFD700] font-bold mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Important Notes</h3>
          <ul className="text-[#F5E6C8]/70 text-sm space-y-2">
            <li className="flex gap-2"><span className="text-[#D4A017]">•</span> Drink at least 8 glasses of water daily</li>
            <li className="flex gap-2"><span className="text-[#D4A017]">•</span> This is a natural support product — consistency is key</li>
            <li className="flex gap-2"><span className="text-[#D4A017]">•</span> Do not skip doses for best results</li>
            <li className="flex gap-2"><span className="text-[#D4A017]">•</span> Consult your doctor if you have an existing medical condition</li>
            <li className="flex gap-2"><span className="text-[#D4A017]">•</span> Keep out of reach of children</li>
          </ul>
        </div>

        <Link href="/cart">
          <button className="btn-gold w-full py-4 text-base">Order Now — ₹1,199</button>
        </Link>

        <p className="text-center text-[#F5E6C8]/50 text-xs mt-3">
          Free shipping | Pan India delivery | COD available
        </p>
      </div>
    </div>
  );
}
