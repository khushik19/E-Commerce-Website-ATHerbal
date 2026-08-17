// src/app/refund-policy/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | African King Herbal Power Powder',
  description: 'Refund and return policy for African King Herbal Power Powder.',
};

export default function RefundPolicyPage() {
  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-[#FFD700] text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Cinzel, serif' }}>Refund Policy</h1>
        <div className="rounded-2xl p-5 space-y-4 text-[#F5E6C8]/70 text-sm leading-relaxed"
          style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}>
          <p className="text-[#D4A017] font-bold">Last updated: August 2026</p>
          <h2 className="text-[#FFD700] font-bold">Returns</h2>
          <p>We offer a 7-day return window from the date of delivery. To be eligible for a return, the product must be unused and in the same condition it was received in its original packaging.</p>
          <h2 className="text-[#FFD700] font-bold">Refunds</h2>
          <p>Once your return is received and inspected, we will notify you via WhatsApp or phone. If approved, your refund will be processed within 5–7 business days to the original payment method.</p>
          <h2 className="text-[#FFD700] font-bold">Non-Returnable Items</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Opened or used products</li>
            <li>Products without original packaging</li>
            <li>Products damaged due to misuse</li>
          </ul>
          <h2 className="text-[#FFD700] font-bold">COD Orders</h2>
          <p>For Cash on Delivery orders, the refund amount will be credited to a bank account provided by you. Please contact us within 7 days of delivery.</p>
          <h2 className="text-[#FFD700] font-bold">Contact Us</h2>
          <p>To initiate a return, call or WhatsApp: <a href="tel:+918889444157" className="text-[#D4A017] underline">+91 88894 44157</a></p>
        </div>
      </div>
    </div>
  );
}
