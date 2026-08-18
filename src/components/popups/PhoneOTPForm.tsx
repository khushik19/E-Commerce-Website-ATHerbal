'use client';
// src/components/popups/PhoneOTPForm.tsx
import { useState } from 'react';
import { saveLead } from '../../lib/firestore';
import toast from 'react-hot-toast';

export function PhoneOTPForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName]     = useState('');
  const [phone, setPhone]   = useState('');
  const [city, setCity]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error('Please enter your full name'); return; }
    if (phone.length !== 10) { toast.error('Enter a valid 10-digit mobile number'); return; }
    if (!city.trim()) { toast.error('Please enter your city'); return; }

    setLoading(true);

    try {
      await saveLead({
        uid: `lead_${Date.now()}`,
        name,
        phone,
        email: '',
        leadType: 'deal_request',
        source: 'login_popup',
        utmSource:
          typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('utm_source') || 'direct'
            : 'direct',
        utmCampaign:
          typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('utm_campaign') || ''
            : '',
        contacted: false,
        createdAt: new Date(),
      });

      toast.success('Request Submitted! Our team will call you shortly with your exclusive deal. 👑');
      onSuccess();
    } catch (err) {
      console.error('Lead save error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const btnStyle = {
    background: 'linear-gradient(135deg, #8B6914, #D4A017, #FFD700)',
    color: '#1A0F00',
    fontWeight: 900,
    width: '100%',
    padding: '0.85rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    opacity: loading ? 0.6 : 1,
    fontFamily: 'Cinzel, serif',
    fontSize: '1rem',
    letterSpacing: '0.03em',
  };

  return (
    <div className="space-y-3.5">
      <div>
        <label className="text-[#F5E6C8]/80 text-xs font-medium block mb-1">Full Name *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="input-field"
          autoComplete="name"
        />
      </div>

      <div>
        <label className="text-[#F5E6C8]/80 text-xs font-medium block mb-1">Mobile Number *</label>
        <div className="flex">
          <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 text-sm font-semibold select-none">
            +91
          </span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="10-digit mobile number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className="input-field rounded-l-none"
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label className="text-[#F5E6C8]/80 text-xs font-medium block mb-1">City *</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          className="input-field"
          autoComplete="address-level2"
        />
      </div>

      <button onClick={handleSubmit} disabled={loading} style={btnStyle} className="mt-2">
        {loading ? 'Submitting…' : 'GET SPECIAL OFFER →'}
      </button>

      <p className="text-center text-[11px] text-[#F5E6C8]/50 pt-1">
        🔒 Your information is 100% safe &amp; confidential
      </p>
    </div>
  );
}
