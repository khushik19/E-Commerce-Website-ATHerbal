// src/app/privacy-policy/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | African King Herbal Power Powder',
  description: 'Privacy policy for African King Herbal Power Powder.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-[#FFD700] text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Cinzel, serif' }}>Privacy Policy</h1>
        <div className="rounded-2xl p-5 space-y-4 text-[#F5E6C8]/70 text-sm leading-relaxed"
          style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
          <p className="text-[#D4A017] font-bold">Last updated: August 2026</p>
          <p>African King Herbal respects your privacy. This policy explains how we collect and use your information.</p>
          <h2 className="text-[#FFD700] font-bold">Information We Collect</h2>
          <p>We collect your name, phone number, address, and age when you register or place an order. We also collect UTM parameters to understand which ads brought you to our site.</p>
          <h2 className="text-[#FFD700] font-bold">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To process and deliver your orders</li>
            <li>To contact you about your order status</li>
            <li>To send you special offers (only if you opt in)</li>
            <li>To improve our website and services</li>
          </ul>
          <h2 className="text-[#FFD700] font-bold">Data Security</h2>
          <p>Your data is stored securely in Firebase (Google Cloud). We do not sell or share your personal information with third parties.</p>
          <h2 className="text-[#FFD700] font-bold">Contact</h2>
          <p>For privacy concerns, email us at: <a href="mailto:atherbal75@gmail.com" className="text-[#D4A017] underline">atherbal75@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
