// src/app/contact/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | African King Herbal Power Powder',
  description:
    'Contact African King Herbal. Call: +91 88894 44157. Email: atherbal75@gmail.com',
};

const phones = [
  { number: '+91 88894 44157', href: 'tel:+918889444157', primary: true },
  { number: '+91 88892 44456', href: 'tel:+918889244456', primary: false },
  { number: '+91 88892 44452', href: 'tel:+918889244452', primary: false },
];

export default function ContactPage() {
  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">

        <div className="text-center mb-6">
          <h1 className="text-[#F5E6C8] text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>Contact Us</h1>
          <p className="text-[#F5E6C8]/60 text-sm mt-1">We&apos;re here to help you</p>
        </div>

        <div className="space-y-4">

          {/* Phone */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
            <h2 className="text-[#FFD700] font-bold text-base mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Call Us</h2>
            <div className="space-y-2">
              {phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 transition"
                  style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.25)' }}
                >
                  <span className="text-[#F5E6C8] font-mono text-sm">{p.number}</span>
                  <span className="text-[#D4A017] text-xs">{p.primary ? 'Primary →' : 'Tap to Call →'}</span>
                </a>
              ))}
            </div>
            <p className="text-[#F5E6C8]/50 text-xs mt-3">
              Available: Monday–Saturday, 9 AM – 7 PM
            </p>
          </div>

          {/* Email */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
            <h2 className="text-[#FFD700] font-bold text-base mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Email Us</h2>
            <a
              href="mailto:atherbal75@gmail.com"
              className="flex items-center justify-between rounded-xl px-4 py-3 transition"
              style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.25)' }}
            >
              <span className="text-[#F5E6C8] text-sm">atherbal75@gmail.com</span>
              <span className="text-[#D4A017] text-xs">Tap →</span>
            </a>
          </div>

          {/* WhatsApp */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
            <h2 className="text-[#FFD700] font-bold text-base mb-3" style={{ fontFamily: 'Cinzel, serif' }}>WhatsApp</h2>
            <a
              href="https://wa.me/918889444157?text=Hello!%20I%20have%20a%20query%20about%20African%20King%20Herbal%20Power%20Powder."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-4 py-3 transition"
              style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.25)' }}
            >
              <span className="text-[#F5E6C8] text-sm">Chat on WhatsApp</span>
              <span className="text-green-400 text-xs">Open WhatsApp →</span>
            </a>
          </div>

          {/* Note */}
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}
          >
            <p className="text-[#F5E6C8]/60 text-xs leading-relaxed text-center">
              For order-related queries, please keep your order details ready.<br />
              For product queries, our team is happy to guide you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
