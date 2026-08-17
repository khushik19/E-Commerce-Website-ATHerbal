'use client';
// src/components/popups/PhoneOTPForm.tsx
import { useState, useEffect, useRef } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { saveUserProfile, saveLead } from '../../lib/firestore';
import toast from 'react-hot-toast';

type Step = 'details' | 'otp';

export function PhoneOTPForm({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep]         = useState<Step>('details');
  const [name, setName]         = useState('');
  const [phone, setPhone]       = useState('');
  const [otp, setOtp]           = useState('');
  const [loading, setLoading]   = useState(false);
  const [countdown, setCountdown] = useState(0);

  const confirmRef  = useRef<ConfirmationResult | null>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const clearVerifier = () => {
    try {
      verifierRef.current?.clear();
    } catch {
      // ignore clear errors
    }
    verifierRef.current = null;
  };

  const getVerifier = (): RecaptchaVerifier => {
    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(
        auth,
        'recaptcha-anchor',
        { size: 'invisible' }
      );
    }
    return verifierRef.current;
  };

  const sendOTP = async () => {
    if (!name.trim()) { toast.error('Please enter your name'); return; }
    if (phone.length !== 10) { toast.error('Enter a valid 10-digit number'); return; }

    setLoading(true);

    // 1. Immediately save lead to Firestore so sales team gets phone number instantly
    try {
      await saveLead({
        uid: `lead_${Date.now()}`,
        name,
        phone,
        email: '',
        leadType: 'otp_registration',
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
    } catch (e) {
      console.warn('Lead pre-save note:', e);
    }

    // 2. Try Firebase Phone OTP
    try {
      clearVerifier();
      const verifier = getVerifier();
      const result   = await signInWithPhoneNumber(auth, `+91${phone}`, verifier);
      confirmRef.current = result;
      setStep('otp');
      setCountdown(30);
      toast.success('OTP sent! Check your messages 📲');
    } catch (err: unknown) {
      console.error('Phone OTP error:', err);
      clearVerifier();
      // Tele-calling fallback: lead is already saved in Firestore!
      toast.success("Request Submitted! Our team will call you shortly with your exclusive deal. 👑");
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) { toast.error('Enter the 6-digit OTP'); return; }
    if (!confirmRef.current) return;

    setLoading(true);
    try {
      const cred  = await confirmRef.current.confirm(otp);
      const uid   = cred.user.uid;
      await saveUserProfile({ uid, name, phone, email: '' });
      toast.success('Welcome! You now have full access. 👑');
      onSuccess();
    } catch {
      toast.error('Incorrect OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    clearVerifier();
    setOtp('');
    await sendOTP();
  };

  const btnStyle = {
    background: 'linear-gradient(135deg, #8B6914, #D4A017, #FFD700)',
    color: '#1A0F00',
    fontWeight: 900,
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    opacity: loading ? 0.6 : 1,
  };

  return (
    <div className="space-y-4">
      {/* Invisible reCAPTCHA anchor */}
      <div id="recaptcha-anchor" />

      {step === 'details' ? (
        <>
          <div>
            <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Full Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="input-field"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Mobile Number *</label>
            <div className="flex">
              <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm font-medium select-none">
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

          <button onClick={sendOTP} disabled={loading} style={btnStyle}>
            {loading ? 'Submitting…' : 'Get OTP / Submit Deal Request →'}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-[#F5E6C8]/80 text-center">
            OTP sent to <span className="font-semibold text-[#FFD700]">+91 {phone}</span>
          </p>

          <div>
            <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Enter OTP *</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="● ● ● ● ● ●"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              className="input-field text-center text-2xl tracking-[0.5em] font-bold"
              autoFocus
              autoComplete="one-time-code"
            />
          </div>

          <button onClick={verifyOTP} disabled={loading || otp.length !== 6} style={btnStyle}>
            {loading ? 'Verifying…' : 'Verify & Continue ✓'}
          </button>

          <div className="flex justify-between text-xs text-[#F5E6C8]/60">
            <button onClick={() => { setStep('details'); setOtp(''); }} className="underline">
              ← Change number
            </button>
            {countdown > 0 ? (
              <span>Resend in {countdown}s</span>
            ) : (
              <button onClick={resendOTP} className="text-[#D4A017] underline font-medium">
                Resend OTP
              </button>
            )}
          </div>
        </>
      )}

      <p className="text-center text-[11px] text-[#F5E6C8]/50">
        🔒 Your information is safe &amp; never shared
      </p>
    </div>
  );
}
