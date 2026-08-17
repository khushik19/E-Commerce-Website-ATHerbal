'use client';
// src/components/popups/LoginPopup.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PhoneOTPForm } from './PhoneOTPForm';

export function LoginPopup() {
  const [show, setShow]   = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || user) return;
    // Show after 2.5 seconds for logged-out visitors
    const timer = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(timer);
  }, [user, loading]);

  if (loading || !show || user) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-4"
      style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(26,15,0,0.85)' }}
    >
      <div
        className="w-full max-w-md shadow-2xl relative rounded-t-3xl sm:rounded-2xl max-h-[95vh] overflow-y-auto"
        style={{ background: '#1A0F00', border: '1px solid rgba(212,160,23,0.4)' }}
      >
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-[#FFD700] flex items-center justify-center font-bold text-lg border border-[#D4A017]/40 hover:bg-black transition-colors"
          aria-label="Close popup"
        >
          ×
        </button>

        {/* Contact info popup image — acts as header banner */}
        <div className="relative w-full overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
          <picture>
            <source media="(min-width: 640px)" srcSet="/images/laptop_contact_info_popup.png" />
            <img
              src="/images/mobile_contact_info_popup.png"
              alt="Get exclusive offer from African King Herbal"
              className="w-full object-cover"
              style={{ maxHeight: '220px', objectPosition: 'top' }}
            />
          </picture>
          {/* Fade to form area */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1A0F00] to-transparent" />
        </div>

        {/* OTP Form */}
        <div className="px-6 pt-2 pb-6">
          <div className="text-center mb-4">
            <h2 className="text-[#FFD700] font-bold text-xl leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
              👑 Get Exclusive Offer
            </h2>
            <p className="text-[#F5E6C8]/70 text-sm mt-1">
              Our team will call you with a special deal
            </p>
          </div>

          <PhoneOTPForm onSuccess={() => setShow(false)} />
        </div>
      </div>
    </div>
  );
}
