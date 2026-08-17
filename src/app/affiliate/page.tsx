'use client';
// src/app/affiliate/page.tsx
import { useForm } from 'react-hook-form';
import { submitAffiliateRequest } from '../../lib/firestore';
import toast from 'react-hot-toast';
import { useState } from 'react';

type AffiliateData = {
  fullName: string;
  phone: string;
  instagramHandle: string;
  instagramFollowers: number;
  facebookHandle: string;
  facebookFollowers: number;
  city: string;
  message: string;
};

export default function AffiliatePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AffiliateData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: AffiliateData) => {
    try {
      await submitAffiliateRequest({ ...data, createdAt: new Date() });
      toast.success("Request submitted! We'll contact you within 2–3 days.");
      setSubmitted(true);
      reset();
    } catch {
      toast.error('Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="king-bg min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.4)' }}
          >
            <span className="text-[#FFD700] text-3xl">✓</span>
          </div>
          <h2 className="text-[#F5E6C8] text-2xl font-bold mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Request Submitted!</h2>
          <p className="text-[#F5E6C8]/60 text-sm leading-relaxed">
            Our team will verify your social media accounts and contact you within
            2–3 business days with your unique coupon code.
          </p>
          <div
            className="mt-4 rounded-xl p-4 text-left"
            style={{ background: 'rgba(45,26,0,0.6)', border: '1px solid rgba(212,160,23,0.25)' }}
          >
            <p className="text-[#D4A017] text-xs font-bold mb-2">What happens next?</p>
            <ol className="text-[#F5E6C8]/60 text-xs space-y-1 list-decimal list-inside">
              <li>Admin reviews your social media profile</li>
              <li>If approved, a unique coupon code is generated for you</li>
              <li>We WhatsApp you the code and commission details</li>
              <li>Share with your followers and earn on every sale!</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">

        <div className="text-center mb-6">
          <div
            className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            <span className="text-[#FFD700] text-2xl">🤝</span>
          </div>
          <h1 className="text-[#F5E6C8] text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            Become an Affiliate
          </h1>
          <p className="text-[#F5E6C8]/60 text-sm mt-2 leading-relaxed">
            Promote African King Herbal with your unique coupon code and earn commission on every sale.
          </p>
        </div>

        {/* How it works */}
        <div
          className="rounded-2xl p-4 mb-5"
          style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.25)' }}
        >
          <p className="text-[#FFD700] font-bold text-sm mb-2" style={{ fontFamily: 'Cinzel, serif' }}>How it works</p>
          <div className="space-y-1.5 text-[#F5E6C8]/60 text-xs">
            <div className="flex gap-2"><span className="text-[#D4A017]">1.</span><span>Submit your Instagram/Facebook details below</span></div>
            <div className="flex gap-2"><span className="text-[#D4A017]">2.</span><span>Admin verifies your account (2–3 days)</span></div>
            <div className="flex gap-2"><span className="text-[#D4A017]">3.</span><span>You receive a unique discount coupon code</span></div>
            <div className="flex gap-2"><span className="text-[#D4A017]">4.</span><span>Share with followers — earn on every order placed with your code</span></div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl p-5 space-y-3"
          style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}
        >
          {[
            { label: 'Full Name *',          name: 'fullName',          type: 'text',   placeholder: 'Your full name',                  required: true },
            { label: 'WhatsApp Number *',    name: 'phone',             type: 'tel',    placeholder: '10-digit WhatsApp number',         required: true },
            { label: 'Instagram Username *', name: 'instagramHandle',   type: 'text',   placeholder: '@yourusername (without @)',         required: true },
            { label: 'Instagram Followers',  name: 'instagramFollowers',type: 'number', placeholder: 'e.g. 5000',                       required: false },
            { label: 'Facebook Profile URL', name: 'facebookHandle',    type: 'url',    placeholder: 'https://facebook.com/yourprofile', required: false },
            { label: 'Facebook Followers',   name: 'facebookFollowers', type: 'number', placeholder: 'e.g. 3000',                       required: false },
            { label: 'City *',               name: 'city',              type: 'text',   placeholder: 'Your city',                       required: true },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-[#F5E6C8]/60 text-xs font-medium block mb-1">{field.label}</label>
              <input
                {...register(field.name as keyof AffiliateData, { required: field.required })}
                placeholder={field.placeholder}
                type={field.type}
                className="input-field"
              />
            </div>
          ))}

          <div>
            <label className="text-[#F5E6C8]/60 text-xs font-medium block mb-1">
              Why do you want to partner with us?
            </label>
            <textarea
              {...register('message')}
              placeholder="Tell us about yourself and your audience..."
              className="input-field"
              rows={3}
            />
          </div>

          <div
            className="rounded-xl p-3 text-[#F5E6C8]/50 text-xs"
            style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}
          >
            Note: Your social media accounts will be reviewed by our admin before your coupon code is
            generated. Only genuine influencers with active audiences will be approved.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full py-3 text-sm disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Affiliate Request →'}
          </button>
        </form>
      </div>
    </div>
  );
}
