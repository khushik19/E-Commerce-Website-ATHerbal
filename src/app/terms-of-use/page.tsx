// src/app/terms-of-use/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | African King Herbal Power Powder',
  description: 'Terms of use for African King Herbal Power Powder website.',
};

export default function TermsOfUsePage() {
  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-[#FFD700] text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Cinzel, serif' }}>Terms of Use</h1>
        <div className="rounded-2xl p-5 space-y-4 text-[#F5E6C8]/70 text-sm leading-relaxed"
          style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
          <p className="text-[#D4A017] font-bold">Last updated: August 2026</p>
          <p>By using this website, you agree to the following terms. If you do not agree, please do not use this site.</p>
          <h2 className="text-[#FFD700] font-bold">Product Use</h2>
          <p>African King Herbal Power Powder is a dietary supplement. Results may vary from person to person. It is not intended to diagnose, treat, cure, or prevent any disease. Consult your doctor before use if you have a medical condition.</p>
          <h2 className="text-[#FFD700] font-bold">Orders and Payments</h2>
          <p>All orders are subject to availability. Prices are in Indian Rupees (INR) and are inclusive of all applicable taxes. We reserve the right to modify prices at any time without prior notice.</p>
          <h2 className="text-[#FFD700] font-bold">Intellectual Property</h2>
          <p>All content on this website including images, text, and design is the property of African King Herbal and may not be reproduced without written permission.</p>
          <h2 className="text-[#FFD700] font-bold">Limitation of Liability</h2>
          <p>African King Herbal shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
          <h2 className="text-[#FFD700] font-bold">Contact</h2>
          <p>For any queries: <a href="mailto:atherbal75@gmail.com" className="text-[#D4A017] underline">atherbal75@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
