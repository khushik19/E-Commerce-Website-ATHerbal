'use client';
// src/components/popups/LoginPopup.tsx
import { useState, useEffect } from 'react';
import { PhoneOTPForm } from './PhoneOTPForm';

export function LoginPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user dismissed the popup in the current tab session
    const dismissed = sessionStorage.getItem('ak_popup_dismissed');
    if (dismissed) return;

    // Show popup after 2 seconds on page load
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('ak_popup_dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(26,15,0,0.85)' }}
    >
      <div
        className="w-full max-w-md shadow-2xl relative rounded-2xl p-6 sm:p-8"
        style={{ background: '#1A0F00', border: '1px solid rgba(212,160,23,0.45)' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-[#FFD700] flex items-center justify-center font-bold text-lg border border-[#D4A017]/40 hover:bg-black transition-colors"
          aria-label="Close popup"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="text-4xl mb-2">👑</div>
          <h2 className="text-[#FFD700] font-bold text-2xl leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
            GET EXCLUSIVE OFFER
          </h2>
          <p className="text-[#F5E6C8]/70 text-sm mt-1.5 leading-relaxed">
            Enter your details below &amp; our team will call you with a special deal!
          </p>
        </div>

        {/* Form */}
        <PhoneOTPForm onSuccess={handleClose} />
      </div>
    </div>
  );
}
